import type { PosterForm } from "@/types/poster";

interface PosterPreviewProps {
  form: PosterForm;
  /** 来店記念日（表示用 例：2026.07.01） */
  dateLabel: string;
}

/**
 * Instagramストーリー風の縦長ポスターカード。
 * 結果画面の主役。将来はこの領域にAI生成画像を差し込む想定。
 */
export default function PosterPreview({ form, dateLabel }: PosterPreviewProps) {
  const gradient =
    form.selectedStyle?.gradient ??
    "linear-gradient(155deg, #0b1020 0%, #4c1d95 45%, #2563eb 100%)";

  return (
    <div
      className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      style={{ background: gradient }}
    >
      {/* ネオンの光 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.3),transparent_50%)]" />
      <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/65" />

      {/* アップロード画像を半透明で反映 */}
      {form.imagePreview && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={form.imagePreview}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div
            className="absolute inset-0"
            style={{ background: gradient, opacity: 0.35 }}
          />
        </>
      )}

      {/* ガラスの内枠 */}
      <div className="glass absolute inset-3 rounded-[22px] border-white/15" />

      {/* コンテンツ */}
      <div className="relative flex h-full flex-col p-6 text-white">
        {/* 上部：ロゴ */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/85">
            BAR AI Poster
          </p>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] tracking-widest backdrop-blur">
            VIP
          </span>
        </div>

        {/* 中央：アイコン＋名前＋称号＋スタイル */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* アップロード画像の丸アイコン */}
          <div className="mb-5 h-24 w-24 overflow-hidden rounded-full border-2 border-white/40 shadow-neon">
            {form.imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.imagePreview}
                alt="お客様"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/10 text-3xl">
                🌟
              </div>
            )}
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Tonight&apos;s Star
          </p>
          <h3 className="mt-1 text-4xl font-black leading-none neon-text">
            {form.nickname || "YOU"}
          </h3>
          <p className="mt-3 rounded-full bg-black/30 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            {form.title || "今夜の主人公"}
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
            {form.selectedStyle?.name ?? "Neon VIP"}
          </p>
          {form.selectedStyle && (
            <p className="mt-0.5 text-[10px] text-white/55">
              {form.selectedStyle.jpName}
            </p>
          )}
        </div>

        {/* 下部：日付など */}
        <div className="text-center">
          <div className="mx-auto mb-3 h-px w-24 bg-white/25" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
            Generated for tonight
          </p>
          <p className="mt-1 text-sm font-semibold tracking-widest text-white">
            {dateLabel}
          </p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/45">
            Prototype Demo
          </p>
        </div>
      </div>

      {/* デモ表記のバッジ */}
      <span className="absolute right-3 top-14 rotate-6 rounded-md bg-black/45 px-2 py-0.5 text-[9px] tracking-wide text-white/70 backdrop-blur">
        これはデモ画像です
      </span>
    </div>
  );
}
