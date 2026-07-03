# BAR AI Poster（プロトタイプ）

> あなたを今夜の主役にする、来店記念AIポスター。

BARに来店したお客様の写真をもとに、来店記念のAIポスターを生成する Web アプリの **UIプロトタイプ**です。
社長・決裁者向けのデモを目的としており、**画像生成APIはまだ接続していません**（ダミー画像・モック結果で体験の流れを再現しています）。

## 技術スタック

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS 3
- 状態管理は `useState` のみ（外部API / DB / ログインなし）

## 画面の流れ（6ステップ）

1. **トップ** … 何のアプリか一目で伝える入口
2. **写真アップロード** … ブラウザ内プレビューのみ（保存しない）／「デモ画像で進む」あり
3. **スタイル選択** … 4種のスタイルカードから1つ選択（ネオン枠で選択表示）
4. **名前・称号入力** … 名前／称号（プリセット＋自由入力）／雰囲気
5. **生成中** … ネオンリング＋プログレスバーで約2.2秒の疑似ローディング
6. **結果** … Instagramストーリー風の縦長ポスター（写真は半透明で反映）

## ディレクトリ構成

```
bar-ai-poster/
├─ app/
│  ├─ layout.tsx          # 全体レイアウト・背景ネオン・メタ情報
│  ├─ page.tsx            # ステップ遷移のオーケストレーター（useState）
│  └─ globals.css         # Tailwind + glassmorphism ユーティリティ
├─ components/
│  ├─ StepIndicator.tsx   # 進捗ステップ表示
│  ├─ GlassPanel.tsx      # 半透明ガラスカード（共通）
│  ├─ StartScreen.tsx     # 1. トップ
│  ├─ UploadScreen.tsx    # 2. 写真アップロード
│  ├─ StyleSelectScreen.tsx  # 3. スタイル選択
│  ├─ ProfileInputScreen.tsx # 4. 名前・称号入力
│  ├─ GeneratingScreen.tsx   # 5. 生成中（疑似ローディング）
│  ├─ ResultScreen.tsx       # 6. 結果（ボタン・訴求文・トースト）
│  └─ PosterPreview.tsx      # 結果ポスターカード本体
├─ lib/
│  ├─ posterStyles.ts     # 4スタイルのモックデータ（gradient / mockPrompt）
│  └─ titlePresets.ts     # 称号プリセット・雰囲気オプション
├─ types/
│  └─ poster.ts           # PosterStyle / PosterForm / Mood 型
└─ next.config.mjs        # 静的エクスポート設定（Cloudflare Pages 用）
```

## 起動方法

```bash
cd bar-ai-poster
npm install
npm run dev          # http://localhost:3000（開発）
```

本番（静的エクスポート）:

```bash
npm run build        # out/ に静的ファイルを出力
```

## スタイルを追加するには

`lib/posterStyles.ts` の `posterStyles` 配列に1件追加するだけです。
スタイル選択画面・結果ポスター・Prompt表示にすべて自動で反映されます。

```ts
{
  id: "cyberpunk-night",          // 一意なID
  name: "Cyberpunk Night",        // 英語名（カード見出し・ロゴ）
  jpName: "サイバーパンクの夜",     // 日本語名
  description: "電脳都市の主役風",  // 説明
  gradient: "linear-gradient(155deg, #0f0c29 0%, #302b63 50%, #24c6dc 100%)",
  mockPrompt: "A cyberpunk night portrait of the customer ...", // 将来API用
}
```

- 称号プリセット・雰囲気は `lib/titlePresets.ts` を編集。

## 将来、画像生成APIを接続する場合

現状は「入力 → 疑似生成 → ダミーポスター」という枠だけが動いています。
本番化の際の主な追加ポイントは以下です。

1. **生成トリガー** … `components/GeneratingScreen.tsx` の `setTimeout`（疑似ローディング）を、
   実際の生成API呼び出し（`fetch`）に置き換える。
2. **プロンプト** … `lib/posterStyles.ts` の `mockPrompt` に、名前・称号・雰囲気（`PosterForm`）を
   差し込んで最終プロンプトを組み立てる関数を追加。
3. **入力画像** … `PosterForm.imagePreview`（Data URL）を、API/ストレージへ送る形式に変換。
4. **結果表示** … `components/PosterPreview.tsx` の丸アイコン／背景領域に、生成された画像URLを差し込む。
5. **保存・QR・SNS共有** … `ResultScreen.tsx` の「本番版で実装予定です」ボタンに実装を追加。

> ※ 静的エクスポート（`output: "export"`）ではサーバー処理が持てないため、
> 生成APIを呼ぶ場合は「クライアントから外部API直叩き」か、
> 「Cloudflare Pages Functions / 別のAPIサーバー」を併用する構成に切り替えます。

## Cloudflare Pages へのデプロイ

`next.config.mjs` で静的エクスポート（`output: "export"`）を有効化済みです。

| 設定項目 | 値 |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `bar-ai-poster`（このリポジトリはサブフォルダ構成のため） |
| 環境変数 | `NODE_VERSION=20` |

**注意点**

- このリポジトリのルートには別の静的サイトが存在するため、Cloudflare Pages の
  **Root directory は `bar-ai-poster` を指定**してください（仕様書では「空欄」想定でしたが、
  当プロトタイプはサブフォルダに独立配置しています。単独リポジトリに切り出す場合は空欄でOK）。
- 画像最適化はオフ（`images.unoptimized: true`）。`next/image` は使わず `<img>` を使用しています。
- `trailingSlash: true` のため、ルーティングは `/path/` 形式で出力されます。
- 現状は 100% 静的。サーバーサイド処理・APIルートは含みません。
