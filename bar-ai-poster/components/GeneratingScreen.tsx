"use client";

import { useEffect, useState } from "react";
import GlassPanel from "./GlassPanel";

interface GeneratingScreenProps {
  /** 疑似生成が完了したら呼ばれる */
  onDone: () => void;
}

const MESSAGES = [
  "写真の雰囲気を読み取り中",
  "BAR & の世界観を反映中",
  "ポスターを仕上げています",
];

/**
 * 5. 生成中画面
 * 実際のAPIは呼ばず、約2秒の疑似ローディングで結果へ進む。
 */
export default function GeneratingScreen({ onDone }: GeneratingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // メッセージを順番に切り替え
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1 < MESSAGES.length ? i + 1 : i));
    }, 700);

    // 約2秒後に結果画面へ
    const timeout = setTimeout(onDone, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <div className="flex flex-1 animate-fade-up flex-col items-center justify-center">
      <GlassPanel className="w-full px-6 py-10 text-center">
        {/* 回転するネオンリング */}
        <div className="relative mx-auto mb-8 h-28 w-28">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-neon-pink border-r-neon-purple shadow-neon" />
          <div className="absolute inset-2 animate-spin-slower rounded-full border-2 border-transparent border-b-neon-blue border-l-neon-sky" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse-glow">✨</span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-white neon-text">
          AIが今夜の一枚を生成中...
        </h2>

        {/* 切り替わるメッセージ */}
        <p
          key={messageIndex}
          className="mt-3 animate-fade-up text-sm text-white/70"
        >
          {MESSAGES[messageIndex]}
        </p>

        {/* 光るプログレスバー */}
        <div className="mt-7 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="shimmer-bar h-full animate-progress rounded-full" />
        </div>
      </GlassPanel>

      <p className="mt-6 text-[11px] text-white/40">
        ※ プロトタイプのため疑似的な生成演出です
      </p>
    </div>
  );
}
