import GlassPanel from "./GlassPanel";

interface StartScreenProps {
  onStart: () => void;
}

/**
 * 1. トップ画面
 * 何のアプリかひと目で伝える入口。
 */
export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-1 animate-fade-up flex-col">
      {/* ロゴ */}
      <div className="mb-8 mt-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/50">
          BAR AI Poster
        </p>
      </div>

      {/* メインコピー */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold leading-tight neon-text">
          あなたを
          <br />
          <span className="gradient-text">今夜の主役</span>に。
        </h1>

        <p className="mt-5 text-sm leading-relaxed text-white/80">
          写真1枚から、BARの
          <br />
          来店記念AIポスターを生成。
        </p>

        <GlassPanel className="mt-7 px-5 py-4">
          <p className="text-xs leading-relaxed text-white/70">
            ファンタジー、K-POP、漫画風、ネオンポスターなど、
            SNSに載せたくなる記念画像をその場で作成できます。
          </p>
        </GlassPanel>

        {/* スタイルのちらり見せ */}
        <div className="mt-6 flex gap-2">
          {["#6d28d9", "#db2777", "#334155", "#2563eb"].map((c, i) => (
            <span
              key={i}
              className="h-14 w-11 rounded-xl border border-white/15 shadow-glass animate-pulse-glow"
              style={{
                background: `linear-gradient(160deg, ${c}, #0b1020)`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <button
          onClick={onStart}
          className="btn-neon w-full rounded-2xl py-4 text-base font-bold text-white"
        >
          デモをはじめる
        </button>
        <p className="mt-3 text-center text-[11px] text-white/40">
          現在はプロトタイプ版です。画像生成APIは未接続です。
        </p>
      </div>

      {/* 社長向け訴求 */}
      <GlassPanel className="mt-6 px-5 py-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-neon-rose/80">
          For Business
        </p>
        <p className="text-[11px] leading-relaxed text-white/65">
          本番版では、画像生成APIを接続することで、お客様の写真をもとに実際のAIポスターを生成できます。
          まずは小規模テストでSNS投稿率・お客様反応・1枚あたりコストを検証します。
        </p>
      </GlassPanel>
    </div>
  );
}
