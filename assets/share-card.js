// 結果画像カード（1200x630）を作ってシェア／保存するための小さな共通関数
window.ShareCard = {
  W: 1200, H: 630,
  // 画像に使う文字のフォントを先に読み込む（Google Fontsは文字ごとに分割配信されるため）
  async fonts(list) {
    try { await Promise.all(list.map(([f, t]) => document.fonts.load(f, t))); } catch (e) {}
  },
  make() {
    const c = document.createElement("canvas");
    c.width = this.W; c.height = this.H;
    return [c, c.getContext("2d")];
  },
  rr(x, X, Y, w, h, r) {
    x.beginPath();
    if (x.roundRect) x.roundRect(X, Y, w, h, r);
    else { x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  },
  // 外枠のカード（墨色の影つき）
  panel(x, bg, ink) {
    this.rr(x, 52, 52, this.W - 92, this.H - 92, 30); x.fillStyle = ink; x.fill();
    this.rr(x, 40, 40, this.W - 92, this.H - 92, 30); x.fillStyle = bg; x.fill();
    x.lineWidth = 5; x.strokeStyle = ink; x.stroke();
  },
  // 長い名前は横幅に収まるまで文字を小さくする
  fit(x, text, font, size, maxW, min = 20) {
    let s = size;
    for (;;) { x.font = font.replace("{s}", s); if (x.measureText(text).width <= maxW || s <= min) return s; s -= 2; }
  },
  // 日本語向けに1文字ずつ折り返す。maxLinesを超えたら「…」
  wrap(x, text, X, Y, maxW, lh, maxLines) {
    const lines = []; let line = "";
    for (const ch of text) {
      if (x.measureText(line + ch).width > maxW && line) { lines.push(line); line = ch; } else line += ch;
    }
    if (line) lines.push(line);
    if (lines.length > maxLines) {
      lines.length = maxLines; let l = lines[maxLines - 1];
      while (l && x.measureText(l + "…").width > maxW) l = l.slice(0, -1);
      lines[maxLines - 1] = l + "…";
    }
    lines.forEach((l, i) => x.fillText(l, X, Y + i * lh));
    return lines.length;
  },
  pill(x, text, X, Y, font, bg, fg, ink) {
    x.font = font; const w = x.measureText(text).width + 40;
    this.rr(x, X, Y, w, 50, 25); x.fillStyle = bg; x.fill(); x.lineWidth = 3; x.strokeStyle = ink; x.stroke();
    x.fillStyle = fg; x.textBaseline = "middle"; x.fillText(text, X + 20, Y + 26); x.textBaseline = "alphabetic";
    return w;
  },
  blob(c) { return new Promise(r => c.toBlob(r, "image/png")); },
  // スマホ：共有メニュー（Xやインスタに画像つきで投稿できる）／PC：画像を保存
  async share(c, name, text) {
    const b = await this.blob(c);
    try {
      const f = new File([b], name, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        await navigator.share({ files: [f], text });
        return "shared";
      }
    } catch (e) { if (e && e.name === "AbortError") return "cancel"; }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    return "saved";
  }
};
