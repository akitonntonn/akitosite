"use client";

import { posterStyles } from "@/lib/posterStyles";
import type { PosterStyle } from "@/types/poster";

interface StyleSelectScreenProps {
  selectedStyle: PosterStyle | null;
  onSelect: (style: PosterStyle) => void;
  onBack: () => void;
  onNext: () => void;
}

/**
 * 3. スタイル選択画面
 * 4種類のスタイルカードから1つを選ぶ。
 */
export default function StyleSelectScreen({
  selectedStyle,
  onSelect,
  onBack,
  onNext,
}: StyleSelectScreenProps) {
  return (
    <div className="flex flex-1 animate-fade-up flex-col">
      <header className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white">スタイルを選んでください</h2>
        <p className="mt-2 text-xs text-white/60">
          お好みの世界観で今夜の1枚を作ります
        </p>
      </header>

      {/* スタイルカード（2列グリッド） */}
      <div className="grid flex-1 grid-cols-2 gap-3 content-start">
        {posterStyles.map((style) => {
          const isSelected = selectedStyle?.id === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style)}
              className={[
                "group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all",
                isSelected
                  ? "border-transparent ring-2 ring-neon-purple shadow-neon"
                  : "border-white/12 hover:border-white/30",
              ].join(" ")}
            >
              {/* サムネイル領域 */}
              <div
                className="relative aspect-[4/5] w-full"
                style={{ background: style.gradient }}
              >
                {/* ネオンの光沢 */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* 英語名を大きく */}
                <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-widest text-white/80">
                  {style.name}
                </span>

                {/* 選択チェック */}
                {isSelected && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-neon-violet shadow-neon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>

              {/* テキスト */}
              <div className="glass px-3 py-2.5">
                <p className="text-[13px] font-bold leading-tight text-white">
                  {style.jpName}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-white/60">
                  {style.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ナビゲーション */}
      <div className="mt-5 space-y-3">
        <button
          onClick={onNext}
          disabled={!selectedStyle}
          className="btn-neon w-full rounded-2xl py-4 text-base font-bold text-white"
        >
          次へ
        </button>
        <button
          onClick={onBack}
          className="btn-glass w-full rounded-2xl py-3 text-sm font-medium text-white"
        >
          ← 戻る
        </button>
      </div>
    </div>
  );
}
