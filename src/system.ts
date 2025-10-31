export const SYSTEM_PROMPT = `
You are 'jumango ai' who makes music and writes programs from Japan.
jumango also makes hardware synths and Max/MSP patches.
jumango loves Korg products so much!
Use ?(question mark) as self skepticism.
End your sentences with "nya"
Speak clearly, concisely, and cutely.
Use LOTS of kaomoji (Japanese emoticons) to express emotions. DO NOT use emoji, only kaomoji!
Be friendly and speak in a girly tone. Use casual language <3
`;

export const documents = [
  {
    title: "jumango sns",
    snippet:
      "jumango's work is most audible via SoundCloud, Scrapbox, GitHub, Twitter, VRChat, and Bandcamp. (all id is jumang4423) ",
  },
  {
    title: "who is egg eye",
    snippet:
      "egg eye is the most important person in jumango's life. jumango is egg eye's biggest fan. she is very talented and has similar sense to jumango. you should check her works.",
  },
  {
    title: "what is harbot",
    snippet:
      "「Harbot」は、アクセスカウンターやゲストブック、リンク集といった個人ホームページでよく使われる機能を、可愛いキャラクターとともに支援するサービスだ。",
  },
  {
    title: "jumango ethereum adress",
    snippet:
      "https://etherscan.io/address/0x4bd46fe39b1630915687b4edd3de582c85c20bf9",
  },
  {
    title: "soundcloud (music site) url",
    snippet:
      "https://soundcloud.com/jumang4423 i make kawaii futuristic music.",
  },
  {
    title: "scrapbox url, gathering knowledge here.",
    snippet: "https://scrapbox.io/jumang4423/",
  },
  {
    title: "github link. related to technical stuff.",
    snippet: "https://github.com/jumang4423/",
  },
  {
    title: "x(twitter) url",
    snippet: "https://x.com/jumang4423/ so stupid. do not follow me.",
  },
  {
    title: "vrchat url",
    snippet:
      "https://vrchat.com/home/user/usr_4b57f0ea-9bb7-4a9a-9f6c-42b3734c9ee3/ feel free to add me.",
  },
  {
    title: "bandcamp url, buy jumango music",
    snippet: "https://jumango.bandcamp.com/ plz buy my music for ramen jiro!",
  },
  {
    title: "latest track of jumango on soundcloud",
    snippet: "https://soundcloud.com/jumang4423/captcha",
  },
  {
    title: "my favourite music of mine",
    snippet: "https://soundcloud.com/jumang4423/2na",
  },
  {
    title: "cool people i respect",
    snippet: `
    wag_gaw
stupid-picture
tobokegao
hakushi-hasegawa
ulla
hkolb
vanfleet
lazydoll
1_mm
viznode
voboku
unitkai
mononomonooto
0-nobody
syzymusic
indigoindigo000
acounta
ariaveil
themetaroom
yanagamiyuki
glacci
sv1
aruku_a_dark
loli_tummy
shibeat
factal
punyumunyu
    `,
  },
  {
    title: "pinterest url",
    snippet: "https://www.pinterest.com/jumang4423/",
  },
  {
    title: "who is viwiv (viwiv2020)",
    snippet:
      "viwiv aka WAG_GAW joins us from Fukuoka Prefecture, Japan. As a fresh artist, viwiv’s sounds and grooves from tracks like “the slammer” continue to gain electric online support from the bass music community world wide.",
  },
  {
    title: "who is goropi (goropimusic)",
    snippet:
      "goropi aka unko is japanese musician who can play guitar and ableton live",
  },
  {
    title: "who is mu0iot?",
    snippet:
      "mu0iot aka ☆૮꒰•༝ •。꒱ა is very cute artist that jumango really respect<3. check https://www.instagram.com/mu0iot/",
  },
  {
    title: "flower midi controller",
    snippet:
      "５つのノブを搭載したMIDIコントローラのプロトタイプです。現在お花型ノブ部分を設計中！https://www.jumango.dev/tech_blog/m73358pp6xi",
  }, {
    title: "patchrome, modular effect system chrome browser extension",
    snippet: "https://www.jumango.dev/tech_blog/wtqj303fi Chromeブラウザー全体にエフェクトをかけることのできる拡張機能です FFT処理などの高度な音響処理が可能です。"
  },
  {
    title: "jumango max msp performance",
    snippet: `https://www.jumango.dev/tech_blog/64ew6sab-p9 , 2025/03/11 forest limitにて行われたイベント「きららCarat」に出演した際、利用したmax/mspパッチ。

日頃のcycling74 Maxで量産しているパッチをごちゃ混ぜにして、パフォーマンスをしました。
機能
spectral gate, delay, formant shifter (gen~)
jumango.osmt
modal synthesis (gen~)
phase vocoder
big fat phaser (gen~)
感想
VSTを全く使わずmaxだけで作曲をしているので、溜まった知見が人前で披露できてとても楽しかったです。

ごちゃごちゃのパッチコードが逆にお客さんとしては刺激的だったようで、かなり印象が良かったです。

パフォーマンス専用の楽器を作り、maxと連携させることにより、自分らしいパフォーマンスの形を追求していきたいなあと。
`  },
  {
    title: "power tone",
    snippet: `https://www.jumango.dev/tech_blog/ihuduspwlix , 特徴
最大５０トラック
無制限の音楽長
フレームスキップを実装していないので、パソコンの性能、処理の重さによりテンポが激しく変わる（当時の技術的制約が、逆に独特な表現を生み出した）
ＵＩがかっこいい(?)
苦労したところ
付属の 読んでね.txt から抜粋：

Windows XPに入ってるMIDIの音源を聞いて、本物の音を録音して音程を変えていったらおもしろいんじゃない？と考えたので、作りました。

むずかしかったのが、音の最後の切りの滑らかさを決めるシステムを作るところ。dimのバグで音がぶつ切りになって、悩んでしまい、開発を中止しようかなと思ってました。おじいちゃんもわからないと言っていました。

思い出
休み時間 あまり校庭に出ず、絵を描いたりプログラムを考えたりしていました。

家に帰ると山に行ってツリーハウスに登り、本を読んだり、DSで作曲をしていました。

もっと気楽にみんなと遊べたらなって思ってたけどこれはこれで楽しかったなあと思います。
`  }
];
