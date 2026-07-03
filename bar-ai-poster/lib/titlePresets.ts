import type { MoodOption } from "@/types/poster";

/**
 * 「今日の称号」プリセット。
 * ボタンで即入力できるようにし、手入力も可能。
 * 文言を足したい場合はこの配列に追記するだけでOK。
 */
export const titlePresets: string[] = [
  "乾杯の支配者",
  "今夜の主人公",
  "テキーラに愛された者",
  "笑顔の着火剤",
  "伝説の一杯を持つ者",
  "夜を変えるVIP",
];

/**
 * 雰囲気（トーン）の選択肢。
 * 将来 画像生成API のプロンプトへ反映する想定。
 */
export const moodOptions: MoodOption[] = [
  { id: "cool", label: "かっこいい", emoji: "🕶️" },
  { id: "cute", label: "かわいい", emoji: "🌸" },
  { id: "funny", label: "面白い", emoji: "🎉" },
  { id: "luxury", label: "高級感", emoji: "🥂" },
  { id: "mysterious", label: "ミステリアス", emoji: "🌙" },
];

/** Mood ID から日本語ラベルを引く補助関数 */
export function getMoodLabel(id: string | null): string {
  return moodOptions.find((mood) => mood.id === id)?.label ?? "";
}
