// K-POPカムバカレンダーのデータ更新スクリプト（GitHub Actionsで毎日実行）
// データ元：
//  1) Wikipedia英語版「20xx in South Korean music」のリリース表（発表済みの予定に強い）
//  2) MusicBrainz（https://musicbrainz.org/ 、データはCC0。登録グループの作品を確実に拾う）
//  3) 手動追加ファイル kpop-comeback/manual.json
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

// Wikipedia：今年と来年（1月は去年も）のページのリリース表を読む。ページがなければ飛ばす
const wpPage = y => `${y}_in_South_Korean_music`;
const years = [now.getFullYear(), now.getFullYear() + 1];
if (now.getMonth() < 2) years.unshift(now.getFullYear() - 1);
const wpOk = [];
for (const y of years) {
  try {
    const r = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${wpPage(y)}&prop=wikitext&format=json&formatversion=2`, { headers: { "User-Agent": UA } });
    const j = await r.json();
    if (j.error) { console.log(`wikipedia: ${wpPage(y)} ${j.error.code}`); continue; }
    const rows = parseWikiReleases(j.parse.wikitext, y);
    wpOk.push(y);
    console.log(`wikipedia: ${wpPage(y)} ${rows.length} rows`);
    for (const w of rows) {
      if (w.date < from || w.date > to) continue;
      items.push({ date: w.date, artist: w.artist, title: w.title, type: "Other", src: "wikipedia", url: `https://en.wikipedia.org/wiki/${wpPage(y)}` });
    }
  } catch (e) { console.warn("wikipedia failed: " + e); }
}

// 登録グループは表記をそろえる（Wikipediaの「Ive」→「IVE」など）
const canon = new Map(artists.map(a => [norm(a.name), a.name]));
for (const it of items) it.artist = canon.get(norm(it.artist)) || it.artist;

// 手動追加分（発表直後でDBにまだないカムバなど）。同じ日・同じグループのものは手動を優先
for (const m of manual) {
  if (!m.date || !m.artist) continue;
  items.push({ date: m.date, artist: m.artist, title: m.title || "（タイトル未発表）", type: m.type || "Comeback", note: m.note || "", src: "manual", url: m.url || "" });
}
const seen = new Map();
const srcRank = { manual: 0, musicbrainz: 1, wikipedia: 2 };
items.sort((a, b) => srcRank[a.src] - srcRank[b.src]);
for (const it of items) {
  const k = it.date + "|" + norm(it.artist) + "|" + norm(it.title);
  const k2 = it.date + "|" + norm(it.artist);
  if (seen.has(k)) { const o = seen.get(k); if (o.type === "Other" && it.type !== "Other") o.type = it.type; continue; }
  // 手動で入れた日・グループと同じものは手動を優先
  if (it.src !== "manual" && [...seen.values()].some(o => o.src === "manual" && o.date + "|" + norm(o.artist) === k2)) continue;
  seen.set(k, it);
}
// 失敗したアーティストは前回のデータを残す（一時的な障害で消えないように）
for (const o of prev.items || []) {
  if ((o.src === "musicbrainz" && failed.includes(o.artist)) || (o.src === "wikipedia" && !wpOk.length)) seen.set(o.date + "|" + norm(o.artist) + "|" + norm(o.title), o);
}
const out = [...seen.values()]
  .filter(it => it.date >= from)
  .sort((a, b) => a.date.localeCompare(b.date) || a.artist.localeCompare(b.artist));

const same = JSON.stringify(out) === JSON.stringify(prev.items);
const data = { updated: same && prev.updated ? prev.updated : now.toISOString(), items: out };
await writeFile(new URL("data.json", DIR), JSON.stringify(data, null, 1) + "\n");
console.log(`items: ${out.length}, failed: ${failed.length ? failed.join(", ") : "none"}`);

function parseWikiReleases(wt, year) {
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const clean = s => s
    .replace(/<ref[^>]*\/>/g, "").replace(/<ref[\s\S]*?<\/ref>/g, "").replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<br\s*\/?>/gi, ", ").replace(/<[^>]+>/g, "")
    .replace(/\{\{(?:nowrap|nobr|lang|transl)\|(?:[a-z-]+\|)?([^{}|]*)[^{}]*\}\}/gi, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1").replace(/\[https?:\/\/\S+\s([^\]]*)\]/g, "$1")
    .replace(/'''?/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  // セル先頭の属性（style="..." | や rowspan="2" | ）を外す
  const cellVal = c => { const m = c.match(/^\s*((?:[a-z-]+\s*=\s*"[^"]*"\s*)+)\|(?!\|)([\s\S]*)$/i); return m ? { attr: m[1], v: m[2] } : { attr: "", v: c }; };
  const out = [];
  const parts = wt.split(/^====\s*([A-Za-z]+)\s*====\s*$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const mi = MONTHS.indexOf(parts[i]); if (mi < 0) continue;
    const table = parts[i + 1].split(/^\{\|/m)[1]; if (!table) continue;
    const rows = table.split(/^\|-.*$/m).slice(1);
    let span = 0, curDay = null;
    for (const row of rows) {
      const cells = [];
      for (const line of row.split("\n")) {
        if (/^\|\}/.test(line) || /^!/.test(line)) continue;
        if (line.startsWith("|")) line.slice(1).split("||").forEach(c => cells.push(c));
        else if (cells.length) cells[cells.length - 1] += "\n" + line;
      }
      if (!cells.length) continue;
      let c = cells.map(cellVal);
      // 列は Date / Album / Artist / Ref。日付セルが rowspan で省略される行がある
      if (span > 0 && c.length <= 3) { span--; }
      else {
        const d = c.shift(); const day = parseInt(clean(d.v), 10);
        curDay = isNaN(day) ? null : day;
        const rs = d.attr.match(/rowspan\s*=\s*"?(\d+)/i); span = rs ? Number(rs[1]) - 1 : 0;
      }
      if (c.length < 2 || !curDay) continue;
      const title = clean(c[0].v), artist = clean(c[1].v);
      if (!title || !artist) continue;
      out.push({ date: `${year}-${String(mi + 1).padStart(2, "0")}-${String(curDay).padStart(2, "0")}`, artist, title });
    }
  }
  return out;
}
