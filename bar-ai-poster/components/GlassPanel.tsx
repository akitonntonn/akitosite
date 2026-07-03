import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** ネオン枠を強調する（選択状態など） */
  glow?: boolean;
}

/**
 * glassmorphism の半透明カード。
 * アプリ全体のカード見た目をここで統一しています。
 */
export default function GlassPanel({
  children,
  className = "",
  glow = false,
}: GlassPanelProps) {
  return (
    <div
      className={[
        "glass rounded-3xl shadow-glass",
        glow ? "ring-2 ring-neon-purple/70 shadow-neon" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
