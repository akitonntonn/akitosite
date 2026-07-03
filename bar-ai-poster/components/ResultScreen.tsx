"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GlassPanel from "./GlassPanel";
import PosterPreview from "./PosterPreview";
import type { PosterForm } from "@/types/poster";

interface ResultScreenProps {
  form: PosterForm;
  dateLabel: string;
  /** 最初から作り直す */
  onRestart: () => void;
  /** スタイル選択に戻る */
  onChangeStyle: () => void;
}

/**
 * 6. 結果画面
 * 生成結果（ダミー）のポスターを表示。
 */
export default function ResultScreen({
  form,
  dateLabel,
  onRestart,
  onChangeStyle,
}: ResultScreenProps) {
  // 未実装機能を押したときのトースト
  const [toast, setToast] = useState<string | null>(null);
  // ポータル用（静的エクスポート時の SSR を避けるためマウント後に有効化）
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function showComingSoon() {
    setToast("本番版で実装予定です");
    window.setTimeout(() => setToast(null), 2200);
  }

  return (
    <div className="flex flex-1 animate-fade-up flex-col">
      <header className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white neon-text">
          今夜の1枚が完成しました
        </h2>
        <p className="mt-2 text-xs text-white/60">
          Instagramストーリーに載せたくなる仕上がりに
        </p>
      </header>

      {/* ポスター */}
      <PosterPreview form={form} dateLabel={dateLabel} />

      {/* 将来のAI生成指示例（mockPrompt） */}
      {form.selectedStyle && (
        <GlassPanel className="mt-4 px-4 py-3">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-neon-sky/80">
            将来のAI生成指示例（Prompt）
          </p>
          <p className="text-[10px] leading-relaxed text-white/55">
            {form.selectedStyle.mockPrompt}
          </p>
        </GlassPanel>
      )}

      {/* ボタン群 */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={onRestart}
          className="btn-glass rounded-2xl py-3.5 text-sm font-semibold text-white"
        >
          もう一度作る
        </button>
        <button
          onClick={onChangeStyle}
          className="btn-glass rounded-2xl py-3.5 text-sm font-semibold text-white"
        >
          別スタイルで作る
        </button>
        <button
          onClick={showComingSoon}
          className="btn-neon rounded-2xl py-3.5 text-sm font-bold text-white"
        >
          画像を保存する
        </button>
        <button
          onClick={showComingSoon}
          className="btn-neon rounded-2xl py-3.5 text-sm font-bold text-white"
        >
          QRで受け取る
        </button>
      </div>

      <p className="mt-3 text-center text-[10px] text-white/40">
        「画像を保存」「QRで受け取る」は本番版で実装予定です
      </p>

      {/* 社長向け訴求 */}
      <GlassPanel className="mt-5 px-5 py-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-neon-rose/80">
          For Business
        </p>
        <p className="text-[11px] leading-relaxed text-white/65">
          本番版では、画像生成APIを接続することで、お客様の写真をもとに実際のAIポスターを生成できます。
          まずは小規模テストでSNS投稿率・お客様反応・1枚あたりコストを検証します。
        </p>
      </GlassPanel>

      {/* トースト（transform を持つ祖先の影響を避けるため body へポータル） */}
      {mounted &&
        toast &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-6">
            <div className="animate-fade-up flex items-center gap-2 rounded-full border border-neon-purple/60 bg-[#12081f]/95 px-5 py-3 text-sm font-semibold text-white shadow-neon backdrop-blur-xl">
              <span aria-hidden>🔒</span>
              {toast}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
