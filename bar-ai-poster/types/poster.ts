/**
 * BAR AI Poster — 型定義
 *
 * 将来 画像生成API を接続する際も、この型を軸に拡張していきます。
 */

/** 生成する雰囲気（トーン）の種類 */
export type Mood = "cool" | "cute" | "funny" | "luxury" | "mysterious";

/** 各雰囲気の表示ラベル（UI用） */
export interface MoodOption {
  id: Mood;
  label: string;
  emoji: string;
}

/**
 * ポスターのスタイル（テンプレート）。
 * lib/posterStyles.ts に実データを定義しています。
 */
export interface PosterStyle {
  /** 内部ID（英数字・URL/状態管理で使用） */
  id: string;
  /** 英語スタイル名（ロゴ・カード見出し用） */
  name: string;
  /** 日本語名（お客様向け表示） */
  jpName: string;
  /** 説明文（このスタイルで何が作れるか） */
  description: string;
  /** 背景グラデーション（CSS の linear-gradient 文字列） */
  gradient: string;
  /**
   * 将来 画像生成APIに渡すためのプロンプト雛形。
   * 今回は使用せず、結果画面で「AI生成指示例」として参照表示するのみ。
   */
  mockPrompt: string;
}

/**
 * ウィザード全体で保持するフォーム状態。
 * page.tsx の useState で管理します。
 */
export interface PosterForm {
  /** アップロード画像のプレビュー（Data URL）。未選択なら null */
  imagePreview: string | null;
  /** 選択中のスタイル。未選択なら null */
  selectedStyle: PosterStyle | null;
  /** 名前 or ニックネーム */
  nickname: string;
  /** 今日の称号 */
  title: string;
  /** 雰囲気。未選択なら null */
  mood: Mood | null;
}
