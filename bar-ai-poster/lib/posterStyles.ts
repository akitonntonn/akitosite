import type { PosterStyle } from "@/types/poster";

/**
 * ポスターのスタイル定義。
 *
 * ▼ スタイルを追加したいとき
 *   1. この配列に新しいオブジェクトを1つ追加するだけで、
 *      スタイル選択画面・結果画面に自動で反映されます。
 *   2. `gradient` は結果ポスターの背景に使う CSS linear-gradient 文字列。
 *   3. `mockPrompt` は将来 画像生成API に渡すプロンプトの雛形（現在は未使用）。
 */
export const posterStyles: PosterStyle[] = [
  {
    id: "fantasy-tavern",
    name: "Fantasy Tavern",
    jpName: "ファンタジー酒場の主人公",
    description: "異世界の酒場に現れた伝説の旅人風",
    gradient:
      "linear-gradient(155deg, #2a1206 0%, #6d28d9 45%, #b45309 100%)",
    mockPrompt:
      "A stylish portrait of the customer as a legendary traveler in a fantasy tavern, cinematic lighting, luxurious bar atmosphere, dramatic, social media poster",
  },
  {
    id: "kpop-poster",
    name: "K-POP Poster",
    jpName: "K-POPアイドル風ポスター",
    description: "ネオンライトに包まれたステージ主役風",
    gradient:
      "linear-gradient(155deg, #1e1b4b 0%, #db2777 50%, #38bdf8 100%)",
    mockPrompt:
      "A glamorous K-pop idol style poster of the customer, neon stage lights, luxury nightlife, confident pose, cinematic poster",
  },
  {
    id: "manga-memory",
    name: "Manga Memory",
    jpName: "漫画風来店記念カード",
    description: "今日の飲み会を漫画の1シーン風に",
    gradient:
      "linear-gradient(155deg, #0f172a 0%, #334155 50%, #ec4899 100%)",
    mockPrompt:
      "A manga-style memory card of the customer enjoying a night at a bar, expressive, fun, black and white comic details with neon accents",
  },
  {
    id: "neon-vip",
    name: "Neon VIP",
    jpName: "ネオンBARポスター",
    description: "夜の街に映えるVIPポスター風",
    gradient:
      "linear-gradient(155deg, #0b1020 0%, #4c1d95 45%, #2563eb 100%)",
    mockPrompt:
      "A luxury neon bar poster featuring the customer as the VIP of the night, dark background, purple and blue lights, premium nightlife atmosphere",
  },
];

/** ID からスタイルを引く補助関数（将来のルーティング等で使用） */
export function getStyleById(id: string): PosterStyle | undefined {
  return posterStyles.find((style) => style.id === id);
}
