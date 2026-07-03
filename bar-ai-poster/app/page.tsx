"use client";

import { useMemo, useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import StartScreen from "@/components/StartScreen";
import UploadScreen from "@/components/UploadScreen";
import StyleSelectScreen from "@/components/StyleSelectScreen";
import ProfileInputScreen from "@/components/ProfileInputScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import ResultScreen from "@/components/ResultScreen";
import type { Mood, PosterForm, PosterStyle } from "@/types/poster";

/** ウィザードのステップ */
type Step =
  | "start"
  | "upload"
  | "style"
  | "profile"
  | "generating"
  | "result";

/** StepIndicator に渡す 0始まりのインデックス（写真/スタイル/情報/完成） */
const STEP_INDEX: Partial<Record<Step, number>> = {
  upload: 0,
  style: 1,
  profile: 2,
  generating: 3,
  result: 3,
};

const INITIAL_FORM: PosterForm = {
  imagePreview: null,
  selectedStyle: null,
  nickname: "",
  title: "",
  mood: null,
};

export default function Home() {
  const [step, setStep] = useState<Step>("start");
  const [form, setForm] = useState<PosterForm>(INITIAL_FORM);

  // 来店記念日（今日の日付を 2026.07.01 形式で）
  const dateLabel = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}.${m}.${d}`;
  }, []);

  // フォーム部分更新のヘルパー
  function update<K extends keyof PosterForm>(key: K, value: PosterForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // 最初からやり直す（入力は保持せずリセット）
  function restart() {
    setForm(INITIAL_FORM);
    setStep("start");
  }

  const showIndicator = step in STEP_INDEX;

  return (
    <main className="flex flex-1 flex-col">
      {showIndicator && <StepIndicator current={STEP_INDEX[step] ?? 0} />}

      {step === "start" && <StartScreen onStart={() => setStep("upload")} />}

      {step === "upload" && (
        <UploadScreen
          imagePreview={form.imagePreview}
          onImageChange={(v) => update("imagePreview", v)}
          onBack={() => setStep("start")}
          onNext={() => setStep("style")}
          onSkip={() => {
            // 写真なしでもデモを止めない
            update("imagePreview", null);
            setStep("style");
          }}
        />
      )}

      {step === "style" && (
        <StyleSelectScreen
          selectedStyle={form.selectedStyle}
          onSelect={(style: PosterStyle) => update("selectedStyle", style)}
          onBack={() => setStep("upload")}
          onNext={() => setStep("profile")}
        />
      )}

      {step === "profile" && (
        <ProfileInputScreen
          nickname={form.nickname}
          title={form.title}
          mood={form.mood}
          onNicknameChange={(v) => update("nickname", v)}
          onTitleChange={(v) => update("title", v)}
          onMoodChange={(v: Mood) => update("mood", v)}
          onBack={() => setStep("style")}
          onNext={() => setStep("generating")}
        />
      )}

      {step === "generating" && (
        <GeneratingScreen onDone={() => setStep("result")} />
      )}

      {step === "result" && (
        <ResultScreen
          form={form}
          dateLabel={dateLabel}
          onRestart={restart}
          onChangeStyle={() => setStep("style")}
        />
      )}
    </main>
  );
}
