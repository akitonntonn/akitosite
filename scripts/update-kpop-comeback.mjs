// K-POPカムバカレンダーのデータ更新スクリプト（GitHub Actionsで毎日実行）
// データ元：MusicBrainz（https://musicbrainz.org/ 、データはCC0）＋ 手動追加ファイル
// 画像・歌詞は取得しない。日付・アーティスト名・作品名・種類だけを保存する。
// 使い方: node scripts/update-kpop-comeback.mjs
import { readFile, writeFile } from "node:fs/promises";

const DIR = new URL("../kpop-comeback/", import.meta.url);
const UA = "akitosite-kpop-comeback/1.0 ( https://akitosite.pages.dev/kpop-comeback/ )";
const PAST_DAYS = 60, FUTURE_DAYS = 240;
const SKIP_SECONDARY = ["Compilation", "Live", "Remix", "DJ-mix", "Mixtape/Street", "Interview", "Spokenword", "Demo", "Audiobook"];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const day = d => d.toISOString().slice(0, 10);
const norm = s => s.toLowerCase().replace(/[\s'’"“”\-_.!?~()（）\[\]]/g, "");

async function mb(path, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch("https://musicbrainz.org/ws/2/" + path, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (r.ok) return r.json();
    await sleep(3000 * (i + 1)); // 503 = 混雑。少し待って再試行
  }
  throw new Error("MusicBrainz request failed: " + path);
}

const artists = JSON.parse(await readFile(new URL("artists.json", DIR), "utf8"));
const manual = JSON.parse(await readFile(new URL("manual.json", DIR), "utf8"));
let prev = { items: [] };
try { prev = JSON.parse(await readFile(new URL("data.json", DIR), "utf8")); } catch {}

const now = new Date();
const from = day(new Date(now - PAST_DAYS * 864e5)), to = day(new Date(+now + FUTURE_DAYS * 864e5));
const items = [], failed = [];

// mbid（MusicBrainzのID）が空のグループは名前で探して埋める。
// 名前が完全一致し、韓国/日本/中国のグループを優先。見つからなければ空のまま（ログに出す）
let resolved = 0;
for (const a of artists) {
  if (a.mbid) continue;
  await sleep(1100);
  try {
    const j = await mb(`artist?fmt=json&limit=10&query=${encodeURIComponent(`artist:"${a.search || a.name}"`)}`);
    const want = norm(a.search || a.name);
    const c = (j.artists || []).filter(x => norm(x.name) === want || (x.aliases || []).some(al => norm(al.name) === want));
    const best = c.find(x => ["KR", "JP", "CN"].includes(x.country) && x.type === "Group") || c.find(x => ["KR", "JP", "CN"].includes(x.country));
    if (best) { a.mbid = best.id; resolved++; console.log(`resolved ${a.name} -> ${best.id} (${best.name})`); }
    else console.warn(`not found on MusicBrainz: ${a.name}`);
  } catch (e) { console.warn(String(e)); }
}
if (resolved) await writeFile(new URL("artists.json", DIR), JSON.stringify(artists, null, 1) + "\n");

for (const a of artists) {
  if (!a.mbid) continue;
  await sleep(1100); // MusicBrainzのルール：1秒に1回まで
  try {
    const q = `arid:${a.mbid} AND firstreleasedate:[${from} TO ${to}]`;
    const j = await mb(`release-group?fmt=json&limit=50&query=${encodeURIComponent(q)}`);
    for (const g of j["release-groups"] || []) {
      const date = g["first-release-date"] || "";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue; // 日付が日単位でわからないものは載せない
      if ((g["secondary-types"] || []).some(t => SKIP_SECONDARY.includes(t))) continue;
      const type = g["primary-type"] || "Other";
      if (!["Album", "EP", "Single"].includes(type)) continue;
      items.push({ date, artist: a.name, title: g.title, type, src: "musicbrainz", url: "https://musicbrainz.org/release-group/" + g.id });
    }
  } catch (e) { failed.push(a.name); console.warn(String(e)); }
}

// 手動追加分（発表直後でDBにまだないカムバなど）。同じ日・同じグループのものは手動を優先
for (const m of manual) {
  if (!m.date || !m.artist) continue;
  items.push({ date: m.date, artist: m.artist, title: m.title || "（タイトル未発表）", type: m.type || "Comeback", note: m.note || "", src: "manual", url: m.url || "" });
}
const seen = new Map();
for (const it of items) {
  const k = it.date + "|" + norm(it.artist) + "|" + norm(it.title);
  const k2 = it.date + "|" + norm(it.artist);
  if (seen.has(k)) continue;
  if (it.src === "musicbrainz" && [...seen.values()].some(o => o.src === "manual" && o.date + "|" + norm(o.artist) === k2)) continue;
  seen.set(k, it);
}
// 失敗したアーティストは前回のデータを残す（一時的な障害で消えないように）
for (const o of prev.items || []) {
  if (o.src === "musicbrainz" && failed.includes(o.artist)) seen.set(o.date + "|" + norm(o.artist) + "|" + norm(o.title), o);
}
const out = [...seen.values()]
  .filter(it => it.date >= from)
  .sort((a, b) => a.date.localeCompare(b.date) || a.artist.localeCompare(b.artist));

const same = JSON.stringify(out) === JSON.stringify(prev.items);
const data = { updated: same && prev.updated ? prev.updated : now.toISOString(), items: out };
await writeFile(new URL("data.json", DIR), JSON.stringify(data, null, 1) + "\n");
console.log(`items: ${out.length}, failed: ${failed.length ? failed.join(", ") : "none"}`);
