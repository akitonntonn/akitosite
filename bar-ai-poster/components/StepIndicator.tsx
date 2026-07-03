interface StepIndicatorProps {
  /** 現在のステップ（0始まり） */
  current: number;
}

/** ウィザードの進捗表示に使うステップ名 */
const STEPS = ["写真", "スタイル", "情報", "完成"] as const;

/**
 * 進捗ステップ表示。
 * アップロード〜結果までの現在位置を示します。
 */
export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <nav
      aria-label="進捗"
      className="mb-6 flex items-center justify-center gap-2"
    >
      {STEPS.map((label, index) => {
        const isDone = index < current;
        const isActive = index === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <span
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  isActive
                    ? "bg-gradient-to-br from-neon-pink to-neon-purple text-white shadow-neon"
                    : isDone
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-white/40",
                ].join(" ")}
              >
                {isDone ? "✓" : index + 1}
              </span>
              <span
                className={[
                  "text-[10px] transition-colors",
                  isActive
                    ? "text-white"
                    : isDone
                      ? "text-white/70"
                      : "text-white/30",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <span
                className={[
                  "mb-4 h-px w-6 transition-colors",
                  index < current ? "bg-neon-purple/70" : "bg-white/15",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
