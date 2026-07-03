import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BAR AI Poster｜あなたを今夜の主役にする、来店記念AIポスター",
  description:
    "写真1枚から、BARの来店記念AIポスターを生成。ファンタジー・K-POP・漫画風・ネオンポスターなど、SNSに載せたくなる記念画像をその場で作成できます。（プロトタイプ版）",
};

export const viewport: Viewport = {
  themeColor: "#05050b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="relative min-h-dvh overflow-x-hidden font-sans">
        {/* 背景のネオン・ブロブ（ぼかし） */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-neon-purple/30 blur-[100px] animate-float-slow" />
          <div className="absolute right-[-6rem] top-1/4 h-96 w-96 rounded-full bg-neon-blue/25 blur-[120px] animate-float-slow [animation-delay:-4s]" />
          <div className="absolute bottom-[-8rem] left-1/4 h-96 w-96 rounded-full bg-neon-pink/25 blur-[120px] animate-float-slow [animation-delay:-8s]" />
          {/* 微細なノイズ／ビネットで夜のバー感 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.12),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(3,3,8,0.9),_transparent_70%)]" />
        </div>

        {/* アプリ本体：スマホ幅で中央寄せ */}
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
