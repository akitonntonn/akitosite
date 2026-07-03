"use client";

import GlassPanel from "./GlassPanel";
import { titlePresets, moodOptions } from "@/lib/titlePresets";
import type { Mood } from "@/types/poster";

interface ProfileInputScreenProps {
  nickname: string;
  title: string;
  mood: Mood | null;
  onNicknameChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onMoodChange: (value: Mood) => void;
  onBack: () => void;
  onNext: () => void;
}

/**
 * 4. 名前・称号入力画面
 * お客様を「主人公」にするための情報を入力。
 */
export default function ProfileInputScreen({
  nickname,
  title,
  mood,
  onNicknameChange,
  onTitleChange,
  onMoodChange,
  onBack,
  onNext,
}: ProfileInputScreenProps) {
  // 次に進める条件：名前・称号・雰囲気がすべて入力済み
  const canProceed = nickname.trim() !== "" && title.trim() !== "" && mood !== null;

  return (
    <div className="flex flex-1 animate-fade-up flex-col">
      <header className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white">今夜のあなたを教えてください</h2>
        <p className="mt-2 text-xs text-white/60">
          名前と称号で、あなたが主役のポスターに
        </p>
      </header>

      <div className="flex-1 space-y-5">
        {/* 名前 */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-white/80">
            名前 / ニックネーム
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="例：AKITO"
            maxLength={20}
            className="glass w-full rounded-2xl px-4 py-3.5 text-base text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-neon-purple/70"
          />
        </div>

        {/* 称号 */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-white/80">
            今日の称号
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="下から選ぶ or 自由入力"
            maxLength={20}
            className="glass w-full rounded-2xl px-4 py-3.5 text-base text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-neon-pink/70"
          />
          {/* プリセット */}
          <div className="mt-3 flex flex-wrap gap-2">
            {titlePresets.map((preset) => {
              const active = title === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onTitleChange(preset)}
                  className={[
                    "rounded-full px-3 py-1.5 text-[11px] font-medium transition-all",
                    active
                      ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-neon"
                      : "btn-glass text-white/85",
                  ].join(" ")}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* 雰囲気 */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-white/80">
            雰囲気
          </label>
          <div className="grid grid-cols-3 gap-2">
            {moodOptions.map((option) => {
              const active = mood === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onMoodChange(option.id)}
                  className={[
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-xs font-medium transition-all",
                    active
                      ? "bg-gradient-to-br from-neon-purple/40 to-neon-blue/40 text-white ring-2 ring-neon-purple shadow-neon"
                      : "btn-glass text-white/80",
                  ].join(" ")}
                >
                  <span className="text-lg">{option.emoji}</span>
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {!canProceed && (
        <GlassPanel className="mt-4 px-4 py-2.5">
          <p className="text-center text-[11px] text-white/55">
            名前・称号・雰囲気を入力すると次へ進めます
          </p>
        </GlassPanel>
      )}

      {/* ナビゲーション */}
      <div className="mt-5 space-y-3">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-neon w-full rounded-2xl py-4 text-base font-bold text-white"
        >
          このポスターを生成する
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
