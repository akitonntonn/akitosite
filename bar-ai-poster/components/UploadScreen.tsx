"use client";

import { useRef } from "react";
import GlassPanel from "./GlassPanel";

interface UploadScreenProps {
  imagePreview: string | null;
  onImageChange: (dataUrl: string | null) => void;
  onBack: () => void;
  onNext: () => void;
  /** 写真なしで「デモ画像で進む」 */
  onSkip: () => void;
}

/**
 * 2. 写真アップロード画面
 * ブラウザ上の preview のみ（保存はしない）。
 */
export default function UploadScreen({
  imagePreview,
  onImageChange,
  onBack,
  onNext,
  onSkip,
}: UploadScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-1 animate-fade-up flex-col">
      <header className="mb-2 text-center">
        <h2 className="text-xl font-bold text-white">
          お客様の写真を1枚選んでください
        </h2>
        <p className="mt-2 text-xs text-white/60">
          顔が見えやすい写真がおすすめです
        </p>
      </header>

      {/* アップロード領域 */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative aspect-[4/5] w-64 overflow-hidden rounded-3xl border border-dashed border-white/25 glass transition-all hover:border-neon-purple/70 hover:shadow-neon"
        >
          {imagePreview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="アップロードした写真のプレビュー"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/90 backdrop-blur">
                タップして選び直す
              </span>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
              {/* カメラ／人物アイコン（SVG） */}
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-blue/30 shadow-neon">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-white"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </span>
              <p className="text-sm font-medium text-white/90">
                タップして写真を選択
              </p>
              <p className="text-[11px] text-white/50">
                カメラロールから選べます
              </p>
            </div>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleFile}
          className="hidden"
        />

        {imagePreview && (
          <button
            type="button"
            onClick={() => onImageChange(null)}
            className="mt-4 text-xs text-white/50 underline underline-offset-4"
          >
            写真を削除する
          </button>
        )}
      </div>

      <GlassPanel className="mt-4 px-4 py-3">
        <p className="text-center text-[11px] text-white/55">
          ※ 写真はこの端末のブラウザ内でのみ表示され、サーバーには保存されません。
        </p>
      </GlassPanel>

      {/* ナビゲーション */}
      <div className="mt-6 space-y-3">
        <button
          onClick={onNext}
          disabled={!imagePreview}
          className="btn-neon w-full rounded-2xl py-4 text-base font-bold text-white"
        >
          次へ
        </button>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="btn-glass flex-1 rounded-2xl py-3 text-sm font-medium text-white"
          >
            ← 戻る
          </button>
          <button
            onClick={onSkip}
            className="btn-glass flex-1 rounded-2xl py-3 text-sm font-medium text-white/90"
          >
            デモ画像で進む
          </button>
        </div>
      </div>
    </div>
  );
}
