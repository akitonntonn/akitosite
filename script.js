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
      {
        title: "相性診断",
        description: "二人の関係がどこまでなのかを診断。今宵の関係はどうなるのか！",
        tag: "Web / Tools",
        url: "https://aisyou-shindan-8xb.pages.dev/",
        buttonText: "見る",
        external: true,
      },
      {
        title: "NBA選手タイプ診断",
        description: "バスケを知らなくても答えられる10問で、NBA30チームのスター選手からあなたに似た1人がわかります。",
        tag: "Web / Tools",
        url: "/nba-shindan/",
        buttonText: "見る",
        external: false,
      },
      {
        title: "おすすめK-POP診断",
        description: "K-POPを知らなくても答えられる10問で、この1年チャート上位に入った50組からあなたにぴったりのアーティストと最初の1曲がわかります。",
        tag: "Web / Tools",
        url: "/kpop-shindan/",
        buttonText: "見る",
        external: false,
      },
      {
        title: "ポモドーロ勉強タイマー",
        description: "25分集中して5分休むをくり返す勉強タイマー。今日の勉強時間と直近7日の記録が自動で残ります。",
        tag: "Web / Tools",
        url: "/pomodoro/",
        buttonText: "使う",
        external: false,
      },
      {
        title: "bar & card collection",
        description: "bar &の世界観をカードコレクションとして楽しめるWebコンテンツ。",
        tag: "Web / Tools",
        url: "https://bar--cardcollection.pages.dev/",
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
    artwork: "assets/music/blurred-lines.jpg",
  },
  {
    title: "Fading Light",
    duration: "3:42",
    description: "少し切なさのあるタイトル。",
    url: "https://music.apple.com/jp/song/fading-light/6763681064",
    artwork: "assets/music/blurred-lines.jpg",
  },
  {
    title: "Almost Mine",
    duration: "3:43",
    description: "2026年6月公開の楽曲。恋する人の心情を歌に。",
    url: "https://music.apple.com/jp/song/almost-mine/6776739467",
    artwork: "assets/music/almost-mine.jpg",
  },
  {
    title: "Over Drive",
    duration: "3:04",
    description: "テンションを上がるトラック。",
    url: "https://music.apple.com/jp/song/over-drive/6763681063",
    artwork: "assets/music/blurred-lines.jpg",
  },
];

const createImages = [
  { title: "Dragon", caption: "巨大な竜と崩壊する大地。", src: "assets/create-optimized/dragon.jpg" },
  { title: "Demon", caption: "暗闇から手を伸ばす悪魔。", src: "assets/create-optimized/demon.jpg" },
  { title: "Fantasy Rebirth", caption: "異世界に誘われる一人称視点。", src: "assets/create-optimized/fantasy-rebirth.jpg" },
  { title: "Earth from Mars", caption: "火星の地表から地球を見上げるSFビジュアル。", src: "assets/create-optimized/earth-from-mars.jpg" },
  { title: "Coral Reef", caption: "水中探索の視点で描いた鮮やかな珊瑚礁。", src: "assets/create-optimized/coral-reef.jpg" },
  { title: "Battle", caption: "海辺で激突する2人のアニメ風バトルシーン。", src: "assets/create-optimized/battle.jpg" },
  { title: "Amanohashidate Sunset", caption: "天橋立の夕焼けをアニメ映画のように描いた風景。", src: "assets/create-optimized/amanohashidate-sunset.jpg" },
  { title: "Dinosaur World", caption: "古代恐竜がいた時代の風景。", src: "assets/create-optimized/ancient-adventure-in-the-dinosaur-world.jpg" },
  { title: "Idol Stage View", caption: "選ばれしアイドルの景色。", src: "assets/create-optimized/idol-stage-view.jpg" },
  { title: "Arashiyama", caption: "京都が誇る絶景。", src: "assets/create-optimized/Arashiyama.jpg" },
  { title: "Sky", caption: "遥か上空から眺める小笠原諸島。", src: "assets/create-optimized/sky-diving.jpg" },
  { title: "Pisa View", caption: "上から眺めたピサの斜塔。", src: "assets/create-optimized/view-from-the-leaning-tower-of-pisa.jpg" },
  { title: "After Humanity", caption: "人間が絶滅した頃の金閣寺。", src: "assets/create-optimized/kinkakuji-after-humanity.jpg" },
  { title: "Onomichi", caption: "絶景なる尾道。", src: "assets/create-optimized/onomichi-view.jpg" },
  { title: "Lord of the Castle", caption: "与えられた城主の名。", src: "assets/create-optimized/lord-of-the-castle.jpg" },
  { title: "Cats", caption: "猫に囲まれる幸せな日々。", src: "assets/create-optimized/world-surrounded-by-cats.jpg" },
];

const workContainer = document.querySelector("#workContainer");
const mobilePortfolioTabs = document.querySelector("#mobilePortfolioTabs");
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
    block.dataset.mobileTabSource = category.category;

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

const createMusicTrackCard = (track, index) => {
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
    <span class="track-card__art" aria-hidden="true">
      <img src="${track.artwork}" alt="" loading="eager" />
    </span>
    <span class="track-card__footer">
      <span>${track.duration}</span>
      <span>Listen</span>
    </span>
  `;
  return card;
};

const renderMobilePortfolioTabs = () => {
  if (!mobilePortfolioTabs) return;

  const webTools = workCategories.find((category) => category.category === "Web / Tools");
  const media = workCategories.find((category) => category.category === "Media");
  const groups = [
    {
      id: "web-tools",
      label: "Web / Tools",
      description: webTools?.description || "",
      contentClass: "card-grid",
      content: webTools?.items.map((item, index) => createCard(item, index).outerHTML).join("") || "",
    },
    {
      id: "media-projects",
      label: "Media",
      description: media?.description || "",
      contentClass: "card-grid",
      content: media?.items.map((item, index) => createCard(item, index).outerHTML).join("") || "",
    },
    {
      id: "music-projects",
      label: "Music",
      description: "Apple Musicで配信している楽曲。",
      contentClass: "track-list",
      content: musicTracks.map((track, index) => createMusicTrackCard(track, index).outerHTML).join(""),
    },
  ];

  const tabs = groups
    .map(
      (group, index) => `
        <button
          class="mobile-tab${index === 0 ? " is-active" : ""}"
          type="button"
          role="tab"
          id="tab-${group.id}"
          aria-selected="${index === 0 ? "true" : "false"}"
          aria-controls="panel-${group.id}"
          data-tab-target="${group.id}"
        >
          ${group.label}
        </button>
      `,
    )
    .join("");

  const panels = groups
    .map(
      (group, index) => `
        <section
          class="mobile-tab-panel"
          role="tabpanel"
          id="panel-${group.id}"
          aria-labelledby="tab-${group.id}"
          ${index === 0 ? "" : "hidden"}
        >
          <div class="mobile-tab-heading">
            <h3>${group.label}</h3>
            <p>${group.description}</p>
          </div>
          <div class="${group.contentClass}">${group.content}</div>
        </section>
      `,
    )
    .join("");

  mobilePortfolioTabs.innerHTML = `
    <div class="mobile-tab-list" role="tablist" aria-label="作品カテゴリ">
      ${tabs}
    </div>
    ${panels}
  `;

  const tabButtons = Array.from(mobilePortfolioTabs.querySelectorAll("[data-tab-target]"));
  const tabPanels = Array.from(mobilePortfolioTabs.querySelectorAll(".mobile-tab-panel"));

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tabTarget;
      tabButtons.forEach((tab) => {
        const isActive = tab === button;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });
      tabPanels.forEach((panel) => {
        panel.hidden = panel.id !== `panel-${targetId}`;
      });
    });
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
    const card = createMusicTrackCard(track, index);
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

const syncMobileNavTargets = () => {
  const isMobile = window.matchMedia("(max-width: 620px)").matches;
  document.querySelectorAll("[data-mobile-target]").forEach((anchor) => {
    if (!anchor.dataset.defaultTarget) {
      anchor.dataset.defaultTarget = anchor.getAttribute("href");
    }
    anchor.setAttribute("href", isMobile ? anchor.dataset.mobileTarget : anchor.dataset.defaultTarget);
  });
};

year.textContent = new Date().getFullYear();
renderWork();
renderMobilePortfolioTabs();
renderVideoShowcase();
renderCreateGallery();
renderMusicTracks();
renderMediaLinks();
hydrateSocialShortcuts();
syncMobileNavTargets();
window.addEventListener("resize", syncMobileNavTargets);
