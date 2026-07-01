const workCategories = [
  {
    category: "AI Videos",
    description: "AI生成や編集ツールで制作したショート動画。",
    items: [
      {
        title: "Barアニメ",
        description: "bar & ~and~の世界観をアニメ風に見せるWeb作品。",
        tag: "AI Videos",
        url: "https://movie-bar.pages.dev/",
        buttonText: "見る",
        external: true,
      },
    ],
  },
  {
    category: "Web / Tools",
    description: "体験として使えるWebサイトやツール。",
    items: [
      {
        title: "どこでも飲みゲー",
        description: "飲み会やBarで使えるゲームをまとめたポータルサイト。",
        tag: "Web / Tools",
        url: "https://coruscating-mermaid-1fe091.netlify.app/",
        buttonText: "見る",
        external: true,
      },
      {
        title: "bar & ~and~ 公式サイト",
        description: "心斎橋の隠れ家バーを紹介する、店舗向けWebサイト。",
        tag: "Web / Tools",
        url: "https://soft-fire-7501.matudairakinomasa.workers.dev/",
        buttonText: "見る",
        external: true,
      },
      {
        title: "スーパーマルチ診断",
        description: "MBTI、ビッグファイブ、動物占い、風水、血液型診断がまとめてできます。",
        tag: "Web / Tools",
        url: "https://personaly.pages.dev/",
        buttonText: "見る",
        external: true,
      },
    ],
  },
  {
    category: "Media",
    description: "発信、記事、コミュニティ導線。",
    items: [
      {
        title: "Instagram Portfolio",
        description: "制作物、Barの日常、ショート動画をまとめるメインSNS。",
        tag: "Media",
        url: "https://www.instagram.com/smnakito/",
        buttonText: "見る",
        external: true,
      },
      {
        title: "bar & Reels",
        description: "短尺動画やAIコンテンツの配信用リンク。",
        tag: "Media",
        url: "https://www.instagram.com/bar.and_/",
        buttonText: "見る",
        external: true,
      },
    ],
  },
];

const mediaLinks = [
  {
    name: "Instagram",
    icon: "IG",
    description: "日常と出勤諸々",
    url: "https://www.instagram.com/smnakito/",
  },
  {
    name: "bar & Instagram",
    icon: "&",
    description: "ショート動画",
    url: "https://www.instagram.com/bar.and_/",
  },
  {
    name: "Apple Music",
    icon: "AM",
    description: "配信楽曲",
    url: "https://music.apple.com/jp/artist/akito-sakai/1809053486",
  },
  {
    name: "Spotify",
    icon: "SP",
    description: "音楽配信",
    url: "https://open.spotify.com/intl-ja/artist/5DAs9z85JBI1dCH0Y0AnnX",
  },
  {
    name: "bar & Official LINE",
    icon: "LN",
    description: "予約・連絡",
    url: "https://lin.ee/vfnVSVE",
  },
];

const aiVideos = [
  {
    title: "barは動物園？",
    description: "Barの賑やかさをショート動画化したAI作品。",
    tag: "AI Video",
    src: "assets/videos/bar-zoo.mp4",
  },
  {
    title: "まるで宗教",
    description: "Barの熱量や一体感を少し誇張して見せる、AI生成ショート。",
    tag: "AI Short",
    src: "assets/videos/cult-like.mp4",
  },
];

const musicTracks = [
  {
    title: "Blurred Lines",
    duration: "3:08",
    description: "Akito Sakaiのトップソングとして表示されている1曲。",
    url: "https://music.apple.com/jp/song/blurred-lines/6763681060",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f9/0d/c5/f90dc5da-f27f-caa2-f659-521f3eb24b4a/199999625476.png/600x600bb.jpg",
  },
  {
    title: "Fading Light",
    duration: "3:42",
    description: "少し切なさのあるタイトル。",
    url: "https://music.apple.com/jp/song/fading-light/6763681064",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f9/0d/c5/f90dc5da-f27f-caa2-f659-521f3eb24b4a/199999625476.png/600x600bb.jpg",
  },
  {
    title: "Almost Mine",
    duration: "3:43",
    description: "2026年6月公開の楽曲。恋する人の心情を歌に。",
    url: "https://music.apple.com/jp/song/almost-mine/6776739467",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/dc/01/35/dc01353b-a9b7-f086-a76b-57b8be62b2c1/199999667551.png/600x600bb.jpg",
  },
  {
    title: "Over Drive",
    duration: "3:04",
    description: "テンションを上がるトラック。",
    url: "https://music.apple.com/jp/song/over-drive/6763681063",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f9/0d/c5/f90dc5da-f27f-caa2-f659-521f3eb24b4a/199999625476.png/600x600bb.jpg",
  },
];

const createImages = [
  { title: "Dragon", caption: "巨大な竜と崩壊する大地。", src: "assets/create/dragon.png" },
  { title: "Demon", caption: "暗闇から手を伸ばす悪魔。", src: "assets/create/demon.png" },
  { title: "Fantasy Rebirth", caption: "異世界に誘われる一人称視点。", src: "assets/create/fantasy-rebirth.png" },
  { title: "Earth from Mars", caption: "火星の地表から地球を見上げるSFビジュアル。", src: "assets/create/earth-from-mars.png" },
  { title: "Coral Reef", caption: "水中探索の視点で描いた鮮やかな珊瑚礁。", src: "assets/create/coral-reef.png" },
  { title: "Battle", caption: "海辺で激突する2人のアニメ風バトルシーン。", src: "assets/create/battle.png" },
  { title: "Amanohashidate Sunset", caption: "天橋立の夕焼けをアニメ映画のように描いた風景。", src: "assets/create/amanohashidate-sunset.png" },
  { title: "Dinosaur World", caption: "古代恐竜がいた時代の風景。", src: "assets/create/ancient-adventure-in-the-dinosaur-world.png" },
  { title: "Idol Stage View", caption: "選ばれしアイドルの景色。", src: "assets/create/idol-stage-view.png" },
  { title: "Arashiyama", caption: "京都が誇る絶景。", src: "assets/create/Arashiyama.png" },
  { title: "Sky", caption: "遥か上空から眺める小笠原諸島。", src: "assets/create/sky-diving.png" },
  { title: "Pisa View", caption: "上から眺めたピサの斜塔。", src: "assets/create/view-from-the-leaning-tower-of-pisa.png" },
  { title: "After Humanity", caption: "人間が絶滅した頃の金閣寺。", src: "assets/create/kinkakuji-after-humanity.png" },
  { title: "Onomichi", caption: "絶景なる尾道。", src: "assets/create/onomichi-view.png" },
  { title: "Lord of the Castle", caption: "与えられた城主の名。", src: "assets/create/lord-of-the-castle.png" },
  { title: "Cats", caption: "猫に囲まれる幸せな日々。", src: "assets/create/world-surrounded-by-cats.png" },
];

const workContainer = document.querySelector("#workContainer");
const createTrack = document.querySelector("#createTrack");
const videoShowcase = document.querySelector("#videoShowcase");
const mediaLinksContainer = document.querySelector("#mediaLinks");
const musicTracksContainer = document.querySelector("#musicTracks");
const year = document.querySelector("#year");

const createCard = (item, index) => {
  const card = document.createElement("article");
  card.className = "card";
  const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  const buttonText = item.buttonText || "開く";
  card.innerHTML = `
    <div>
      <span class="tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
    <div class="card-footer">
      <a class="open-link" href="${item.url}" aria-label="${item.title}を開く"${target}>${buttonText}</a>
    </div>
    <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
  `;
  return card;
};

const renderWork = () => {
  workCategories.forEach((category) => {
    const block = document.createElement("section");
    block.className = "category-block";
    block.setAttribute("aria-label", category.category);

    const cards = category.items.map((item, index) => createCard(item, index).outerHTML).join("");
    block.innerHTML = `
      <div class="category-title-row">
        <h3>${category.category}</h3>
        <p>${category.description}</p>
      </div>
      <div class="card-grid">${cards}</div>
    `;

    workContainer.appendChild(block);
  });
};

const renderCreateGallery = () => {
  const galleryItems = [...createImages, ...createImages];
  galleryItems.forEach((image, index) => {
    const figure = document.createElement("figure");
    figure.className = "create-card";
    figure.innerHTML = `
      <img src="${image.src}" alt="${image.title}" loading="${index < 4 ? "eager" : "lazy"}" />
      <figcaption>
        <span>${image.title}</span>
        <small>${image.caption}</small>
      </figcaption>
    `;
    createTrack.appendChild(figure);
  });
};

const renderVideoShowcase = () => {
  aiVideos.forEach((video) => {
    const article = document.createElement("article");
    article.className = "video-card";
    article.innerHTML = `
      <div class="video-frame">
        <video src="${video.src}" muted loop playsinline autoplay preload="metadata"></video>
      </div>
      <div class="video-card__body">
        <span class="tag">${video.tag}</span>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
      </div>
    `;
    videoShowcase.appendChild(article);
  });
};

const renderMusicTracks = () => {
  musicTracks.forEach((track, index) => {
    const card = document.createElement("a");
    card.className = "track-card";
    card.href = track.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${track.title}をApple Musicで聴く`);
    card.innerHTML = `
      <span class="track-card__index">${String(index + 1).padStart(2, "0")}</span>
      <span class="track-card__content">
        <span class="tag">Music / Apple Music</span>
        <h3>${track.title}</h3>
        <p>${track.description}</p>
      </span>
      <span class="track-card__footer">
        <span>${track.duration}</span>
        <span>Listen</span>
      </span>
    `;
    musicTracksContainer.appendChild(card);
  });
};

const renderMediaLinks = () => {
  mediaLinks.forEach((link) => {
    const card = document.createElement("a");
    card.className = "media-card";
    card.href = link.url;
    if (link.url !== "#") {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }
    card.setAttribute("aria-label", `${link.name}を開く`);
    card.innerHTML = `
      <span class="media-icon">${link.icon}</span>
      <span>
        <h3>${link.name}</h3>
        <p>${link.description}</p>
      </span>
    `;
    mediaLinksContainer.appendChild(card);
  });
};

const hydrateSocialShortcuts = () => {
  document.querySelectorAll("[data-social-link]").forEach((anchor) => {
    const targetName = anchor.dataset.socialLink;
    const link = mediaLinks.find((item) => item.name === targetName);
    if (link) {
      anchor.href = link.url;
    }
  });
};

year.textContent = new Date().getFullYear();
renderWork();
renderVideoShowcase();
renderCreateGallery();
renderMusicTracks();
renderMediaLinks();
hydrateSocialShortcuts();
