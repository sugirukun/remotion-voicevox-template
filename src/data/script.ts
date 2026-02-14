import { CharacterId } from "../config";

// アニメーションの型定義
export type AnimationType = "none" | "fadeIn" | "slideUp" | "slideLeft" | "zoomIn" | "bounce";

// ビジュアルの型定義
export interface VisualContent {
  type: "image" | "text" | "none";
  src?: string;
  text?: string;
  fontSize?: number;
  color?: string;
  animation?: AnimationType;
}

// 効果音の型定義
export interface SoundEffect {
  src: string;
  volume?: number;
}

// BGM設定
export interface BGMConfig {
  src: string;
  volume?: number;
  loop?: boolean;
}

// BGMトラック設定（複数トラック対応）
export interface BGMTrack {
  src: string;
  volume: number;
  loop: boolean;
  startId?: number;
  endId?: number;
  fadeIn: number;
  fadeOut: number;
}

// BGM設定（動画全体で使用 - 後方互換）
export const bgmConfig: BGMConfig | null = null;

// BGMトラック一覧
export const bgmTracks: BGMTrack[] = [
  {
    "src": "bgm1かえるのピアノ.mp3",
    "volume": 0.25,
    "loop": true,
    "startId": 1,
    "endId": 45,
    "fadeIn": 1,
    "fadeOut": 2
  },
  {
    "src": "bgm2Pappa_Parappa.mp3",
    "volume": 0.12,
    "loop": true,
    "startId": 46,
    "endId": 68,
    "fadeIn": 2,
    "fadeOut": 3
  }
];

// セリフデータの型定義
export interface ScriptLine {
  id: number;
  character: CharacterId;
  text: string;
  displayText?: string;
  scene: number;
  voiceFile: string;
  durationInFrames: number;
  pauseAfter: number;
  emotion?: "normal" | "happy" | "surprised" | "thinking" | "sad";
  visual?: VisualContent;
  se?: SoundEffect;
}

// シーン定義
export interface SceneInfo {
  id: number;
  title: string;
  background: string;
}

export const scenes: SceneInfo[] = [
  { id: 1, title: "オープニング", background: "gradient" },
  { id: 2, title: "メインコンテンツ", background: "solid" },
  { id: 3, title: "エンディング", background: "gradient" },
];

// このファイルは config/script.yaml から自動生成されます
// 編集する場合は config/script.yaml を編集して npm run sync-script を実行してください
export const scriptData: ScriptLine[] = [
  {
    "id": 1,
    "character": "zundamon",
    "text": "今日はエヌエイチケー受信契約の解約について解説するのだ！",
    "displayText": "今日はNHK受信契約の解約について解説するのだ！",
    "scene": 1,
    "pauseAfter": 10,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "NHK受信契約の解約\n完全ガイド",
      "fontSize": 80,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "01_zundamon.wav",
    "durationInFrames": 180
  },
  {
    "id": 2,
    "character": "metan",
    "text": "最近、解約する人が増えてるみたいね。詳しく教えてほしいわ。",
    "scene": 1,
    "pauseAfter": 10,
    "voiceFile": "02_metan.wav",
    "durationInFrames": 189
  },
  {
    "id": 3,
    "character": "zundamon",
    "text": "手続きや代替案、法的な問題まで、さくっと説明するのだ！",
    "scene": 1,
    "pauseAfter": 15,
    "voiceFile": "03_zundamon.wav",
    "durationInFrames": 204
  },
  {
    "id": 4,
    "character": "metan",
    "text": "まず、どうして解約したい人が増えてるのかしら？",
    "scene": 2,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "なぜ解約？\n2つの理由",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "04_metan.wav",
    "durationInFrames": 129
  },
  {
    "id": 5,
    "character": "zundamon",
    "text": "大きく分けて二つの理由があるのだ。エヌエイチケーへの不信感と、個人のライフスタイルの変化なのだ。",
    "displayText": "大きく分けて二つの理由があるのだ。NHKへの不信感と、個人のライフスタイルの変化なのだ。",
    "scene": 2,
    "pauseAfter": 10,
    "voiceFile": "05_zundamon.wav",
    "durationInFrames": 296
  },
  {
    "id": 6,
    "character": "metan",
    "text": "不信感って、具体的にはどういうこと？",
    "scene": 2,
    "pauseAfter": 8,
    "voiceFile": "06_metan.wav",
    "durationInFrames": 113
  },
  {
    "id": 7,
    "character": "zundamon",
    "text": "まず、偏向報道への懸念なのだ。報道で高市政権のことを取り上げるときはダッチアングルが使われたり、報道のやり方に偏りがあるとの指摘があるのだ。",
    "scene": 2,
    "pauseAfter": 10,
    "voiceFile": "07_zundamon.wav",
    "durationInFrames": 457
  },
  {
    "id": 8,
    "character": "metan",
    "text": "紅白歌合戦でも問題があったわよね。",
    "scene": 2,
    "pauseAfter": 8,
    "voiceFile": "08_metan.wav",
    "durationInFrames": 105
  },
  {
    "id": 9,
    "character": "zundamon",
    "text": "そうなのだ。2025年の紅白に出場するエスパのメンバーが、過去に原爆のキノコ雲に似た画像をアップし「かわいいライトを買ったよーどう？」という内容を投稿し物議を醸したのだ。",
    "displayText": "そうなのだ。2025年の紅白に出場するaespaのメンバーが、過去に原爆のキノコ雲に似た画像をアップし「かわいいライトを買ったよーどう？」という内容を投稿し物議を醸したのだ。",
    "scene": 2,
    "pauseAfter": 10,
    "voiceFile": "09_zundamon.wav",
    "durationInFrames": 540
  },
  {
    "id": 10,
    "character": "metan",
    "text": "それに対するエヌエイチケーの対応も批判されたのよね。",
    "displayText": "それに対するNHKの対応も批判されたのよね。",
    "scene": 2,
    "pauseAfter": 8,
    "voiceFile": "10_metan.wav",
    "durationInFrames": 135
  },
  {
    "id": 11,
    "character": "metan",
    "text": "不信感が1つ目の理由ね。2つ目の理由は何かしら？",
    "scene": 2,
    "pauseAfter": 8,
    "voiceFile": "11_metan.wav",
    "durationInFrames": 159
  },
  {
    "id": 12,
    "character": "zundamon",
    "text": "子供が成長してイーテレを見なくなったり、テレビ自体が古くなって故障寸前になったりするケースが多いのだ。それと同時に、動画配信サービスの普及でテレビ離れも進んでいるのだ。",
    "displayText": "子供が成長してEテレを見なくなったり、テレビ自体が古くなって故障寸前になったりするケースが多いのだ。それと同時に、動画配信サービスの普及でテレビ離れも進んでいるのだ。",
    "scene": 2,
    "pauseAfter": 12,
    "voiceFile": "12_zundamon.wav",
    "durationInFrames": 513
  },
  {
    "id": 13,
    "character": "metan",
    "text": "確かに、オールドメディアはもう視聴しない人がふえてるわね。視聴しない人はスクランブル方式で観れなくすればいいだけなのに。",
    "displayText": "確かに、オールドメディアはもう視聴しない人が増えてるわね。視聴しない人はスクランブル方式で観れなくすればいいだけなのに。",
    "scene": 2,
    "pauseAfter": 10,
    "voiceFile": "13_metan.wav",
    "durationInFrames": 300
  },
  {
    "id": 14,
    "character": "zundamon",
    "text": "次に、エヌエイチケーの受信料徴収強化について説明するのだ！",
    "displayText": "次に、NHKの受信料徴収強化について説明するのだ！",
    "scene": 3,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "受信料徴収の強化\nその実態は？",
      "fontSize": 68,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "14_zundamon.wav",
    "durationInFrames": 204
  },
  {
    "id": 15,
    "character": "metan",
    "text": "どのくらい強化されてるのかしら？",
    "scene": 3,
    "pauseAfter": 8,
    "voiceFile": "15_metan.wav",
    "durationInFrames": 82
  },
  {
    "id": 16,
    "character": "zundamon",
    "text": "2024年10月に受信料特別対策センターという専門部署が設置されたのだ。",
    "scene": 3,
    "pauseAfter": 10,
    "voiceFile": "16_zundamon.wav",
    "durationInFrames": 247
  },
  {
    "id": 17,
    "character": "metan",
    "text": "専門部署まで作ったの？本気ね。",
    "scene": 3,
    "pauseAfter": 8,
    "emotion": "surprised",
    "voiceFile": "17_metan.wav",
    "durationInFrames": 101
  },
  {
    "id": 18,
    "character": "zundamon",
    "text": "しかも、支払督促の件数がすごいのだ。2024年度は約120件だったのが、2025年度にはなんと10倍超に拡大する見通しなのだ！",
    "scene": 3,
    "pauseAfter": 12,
    "emotion": "surprised",
    "visual": {
      "type": "text",
      "text": "支払督促件数\n120件 → 1,200件超\n(10倍以上!)",
      "fontSize": 64,
      "color": "#ffff00",
      "animation": "bounce"
    },
    "voiceFile": "18_zundamon.wav",
    "durationInFrames": 448
  },
  {
    "id": 19,
    "character": "metan",
    "text": "10倍！？それはかなりの強化ね。2026年度はさらに増えるの？",
    "scene": 3,
    "pauseAfter": 8,
    "emotion": "surprised",
    "voiceFile": "19_metan.wav",
    "durationInFrames": 194
  },
  {
    "id": 20,
    "character": "zundamon",
    "text": "そうなのだ。さらに件数を増やす方針なのだ。1年以上未払いの世帯は簡易裁判所を通じた強制執行もあり得るのだ。さらに、元エヌエイチケー党の立花孝志氏の逮捕後、受信料の徴収がかなり強硬になったのだ。",
    "displayText": "そうなのだ。さらに件数を増やす方針なのだ。1年以上未払いの世帯は簡易裁判所を通じた強制執行もあり得るのだ。さらに、元NHK党の立花孝志氏の逮捕後、受信料の徴収がかなり強硬になったのだ。",
    "scene": 3,
    "pauseAfter": 12,
    "voiceFile": "20_zundamon.wav",
    "durationInFrames": 661
  },
  {
    "id": 21,
    "character": "metan",
    "text": "強制執行まで来ると、もう無視できないわね。",
    "scene": 3,
    "pauseAfter": 10,
    "voiceFile": "21_metan.wav",
    "durationInFrames": 122
  },
  {
    "id": 22,
    "character": "zundamon",
    "text": "じゃあ、実際の解約手続きの手順を説明するのだ！",
    "scene": 4,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "解約手続き\n3つのステップ",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "22_zundamon.wav",
    "durationInFrames": 173
  },
  {
    "id": 23,
    "character": "metan",
    "text": "オンラインで簡単にできるの？",
    "scene": 4,
    "pauseAfter": 8,
    "voiceFile": "23_metan.wav",
    "durationInFrames": 74
  },
  {
    "id": 24,
    "character": "zundamon",
    "text": "残念ながら、オンラインでは完結しないのだ。意図的に煩雑にされているのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "voiceFile": "24_zundamon.wav",
    "durationInFrames": 231
  },
  {
    "id": 25,
    "character": "metan",
    "text": "え、それはちょっと大変ね。",
    "scene": 4,
    "pauseAfter": 8,
    "voiceFile": "25_metan.wav",
    "durationInFrames": 98
  },
  {
    "id": 26,
    "character": "zundamon",
    "text": "ステップ1。まずエヌエイチケーに電話して、テレビを廃棄したことを伝えて解約書類の送付を依頼するのだ。",
    "displayText": "ステップ1。まずNHKに電話して、テレビを廃棄したことを伝えて解約書類の送付を依頼するのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "Step 1\nNHKに電話連絡",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "slideLeft"
    },
    "voiceFile": "26_zundamon.wav",
    "durationInFrames": 315
  },
  {
    "id": 27,
    "character": "metan",
    "text": "ネットで書類を請求することはできないのね。",
    "scene": 4,
    "pauseAfter": 8,
    "voiceFile": "27_metan.wav",
    "durationInFrames": 107
  },
  {
    "id": 28,
    "character": "zundamon",
    "text": "ステップ2。テレビを処分した証明書類、主に家電リサイクル券を用意するのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "Step 2\n廃棄証明を準備",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "slideLeft"
    },
    "voiceFile": "28_zundamon.wav",
    "durationInFrames": 249
  },
  {
    "id": 29,
    "character": "metan",
    "text": "家電リサイクル券というのはどうやって手に入れるの？",
    "scene": 4,
    "pauseAfter": 8,
    "voiceFile": "29_metan.wav",
    "durationInFrames": 121
  },
  {
    "id": 30,
    "character": "zundamon",
    "text": "リサイクルショップで売るなら無料。自分で指定引取場所に持ち込むなら約3000円。家電量販店に頼むと約6000円なのだ。自分で指定取引所に持っていくときは郵便局で家電リサイクル券というのを約3000円で購入する必要があるのだ。指定取引所は各自治体によるので事前にネットで調べておくのだ。",
    "scene": 4,
    "pauseAfter": 12,
    "voiceFile": "30_zundamon.wav",
    "durationInFrames": 887
  },
  {
    "id": 31,
    "character": "metan",
    "text": "リサイクルショップだと無料なんだ？",
    "scene": 4,
    "pauseAfter": 8,
    "voiceFile": "31_metan.wav",
    "durationInFrames": 78
  },
  {
    "id": 32,
    "character": "zundamon",
    "text": "そうなのだ！ただし、製造日から10年を越えたテレビは買い取ってもらえないのだ。家のテレビが9年目とかの人はとにかく無料でテレビが手放せるチャンスともいえるのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "voiceFile": "32_zundamon.wav",
    "durationInFrames": 469
  },
  {
    "id": 33,
    "character": "zundamon",
    "text": "ステップ3。解約書類に必要事項を記入して、廃棄証明を同封してエヌエイチケーに郵送するのだ。",
    "displayText": "ステップ3。解約書類に必要事項を記入して、廃棄証明を同封してNHKに郵送するのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "Step 3\n書類を記入して郵送",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "slideLeft"
    },
    "voiceFile": "33_zundamon.wav",
    "durationInFrames": 316
  },
  {
    "id": 34,
    "character": "metan",
    "text": "全部アナログな手続きなのね。時代遅れな感じがするわ。",
    "scene": 4,
    "pauseAfter": 10,
    "voiceFile": "34_metan.wav",
    "durationInFrames": 148
  },
  {
    "id": 35,
    "character": "zundamon",
    "text": "テレビを廃棄した後の代替機器について説明するのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "テレビの代わりは？\nおすすめ代替機器",
      "fontSize": 64,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "35_zundamon.wav",
    "durationInFrames": 157
  },
  {
    "id": 36,
    "character": "metan",
    "text": "テレビがなくなったら動画は何で見ればいいの？スマホだけだと画面が小さいし目には悪いわね。ゲームをするのにもテレビの代わりが必要ね。",
    "scene": 5,
    "pauseAfter": 8,
    "voiceFile": "36_metan.wav",
    "durationInFrames": 344
  },
  {
    "id": 37,
    "character": "zundamon",
    "text": "一番のおすすめはチューナーレステレビなのだ！地上波チューナーがないから、エヌエイチケーの契約対象外なのだ。ゲームもガチ勢以外は遅延の影響はほとんど気にしなくていいのだ。",
    "displayText": "一番のおすすめはチューナーレステレビなのだ！地上波チューナーがないから、NHKの契約対象外なのだ。ゲームもガチ勢以外は遅延の影響はほとんど気にしなくていいのだ。",
    "scene": 5,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "37_zundamon.wav",
    "durationInFrames": 495
  },
  {
    "id": 38,
    "character": "metan",
    "text": "それは便利ね。すぐに動画配信サービスが使えるの？",
    "scene": 5,
    "pauseAfter": 8,
    "voiceFile": "38_metan.wav",
    "durationInFrames": 151
  },
  {
    "id": 39,
    "character": "zundamon",
    "text": "アンドロイドオーエスがプリインストールされてるから、買ってすぐにユーチューブやネットフリックスが見られるのだ！",
    "displayText": "Android OSがプリインストールされてるから、買ってすぐにYouTubeやNetflixが見られるのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "39_zundamon.wav",
    "durationInFrames": 270
  },
  {
    "id": 40,
    "character": "metan",
    "text": "クロームキャストとかの外部機器もいらないのね。",
    "displayText": "Chromecastとかの外部機器もいらないのね。",
    "scene": 5,
    "pauseAfter": 8,
    "voiceFile": "40_metan.wav",
    "durationInFrames": 102
  },
  {
    "id": 41,
    "character": "zundamon",
    "text": "ピーシーモニターも候補に入るけど、注意点があるのだ。",
    "displayText": "PCモニターも候補に入るけど、注意点があるのだ。",
    "scene": 5,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "PCモニターの注意点\n・価格が高い場合も\n・画面サイズが小さめ\n・スピーカー非搭載が多い\n・OS非搭載→別途機器が必要",
      "fontSize": 44,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "41_zundamon.wav",
    "durationInFrames": 168
  },
  {
    "id": 42,
    "character": "metan",
    "text": "値段が高くて、画面も小さいし、スピーカーがないと音も出ないのは盲点だったわ。",
    "scene": 5,
    "pauseAfter": 8,
    "voiceFile": "42_metan.wav",
    "durationInFrames": 216
  },
  {
    "id": 43,
    "character": "zundamon",
    "text": "そうなのだ。オーエスも入ってないと、結局クロームキャストとかが必要になるから、チューナーレステレビがおすすめなのだ！",
    "displayText": "そうなのだ。OSも入ってないと、結局Chromecastとかが必要になるから、チューナーレステレビがおすすめなのだ！",
    "scene": 5,
    "pauseAfter": 5,
    "voiceFile": "43_zundamon.wav",
    "durationInFrames": 332
  },
  {
    "id": 44,
    "character": "zundamon",
    "text": "個人的におすすめなのがジェーブイシーのチューナーレステレビなのだ。ジェーブイシーは日本の船井電機が展開していたブランドだったんだけど、最近倒産してしまったのだ。",
    "displayText": "個人的におすすめなのがJVCのチューナーレステレビなのだ。JVCは日本の船井電機が展開していたブランドだったんだけど、最近倒産してしまったのだ。",
    "scene": 5,
    "pauseAfter": 5,
    "voiceFile": "44_zundamon.wav",
    "durationInFrames": 455
  },
  {
    "id": 45,
    "character": "zundamon",
    "text": "現在メーカー保証がないからめちゃくちゃお安いのだ。保証がないのは痛いけど、かなり安くなっているのだ。あくまでも個人的なおすすめであって故障が怖い人にはお勧めしないのだ。若干、博打要素はあるのだ。リスクを許容して安く買いたい人向けなのだ。",
    "scene": 5,
    "pauseAfter": 12,
    "voiceFile": "45_zundamon.wav",
    "durationInFrames": 729
  },
  {
    "id": 46,
    "character": "metan",
    "text": "テレビを全部処分しても、まだ問題があるって聞いたわ。",
    "scene": 6,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "カーナビのワンセグ問題\n意外な落とし穴",
      "fontSize": 64,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "46_metan.wav",
    "durationInFrames": 138
  },
  {
    "id": 47,
    "character": "zundamon",
    "text": "そうなのだ！ワンセグ機能付きのカーナビを持っていると、現行法では契約義務があるとされているのだ！",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "surprised",
    "voiceFile": "47_zundamon.wav",
    "durationInFrames": 293
  },
  {
    "id": 48,
    "character": "metan",
    "text": "テレビを見るつもりがなくても？それはおかしいわ。",
    "scene": 6,
    "pauseAfter": 8,
    "voiceFile": "48_metan.wav",
    "durationInFrames": 125
  },
  {
    "id": 49,
    "character": "zundamon",
    "text": "岐阜県の江崎知事もそう考えていて、公に異議を唱えているのだ！",
    "scene": 6,
    "pauseAfter": 10,
    "voiceFile": "49_zundamon.wav",
    "durationInFrames": 201
  },
  {
    "id": 50,
    "character": "metan",
    "text": "知事がどんな主張をしているの？",
    "scene": 6,
    "pauseAfter": 8,
    "voiceFile": "50_metan.wav",
    "durationInFrames": 78
  },
  {
    "id": 51,
    "character": "zundamon",
    "text": "視聴予定のない機器にまで税金を払い続けるのは適切ではない、と明確に主張しているのだ。",
    "scene": 6,
    "pauseAfter": 10,
    "voiceFile": "51_zundamon.wav",
    "durationInFrames": 274
  },
  {
    "id": 52,
    "character": "metan",
    "text": "実際に未払いの対応もしてるのかしら？",
    "scene": 6,
    "pauseAfter": 8,
    "voiceFile": "52_metan.wav",
    "durationInFrames": 104
  },
  {
    "id": 53,
    "character": "zundamon",
    "text": "公用車のカーナビなど50台分の受信料を支払っていないのだ。県と市町村合わせた未払い額は約5000万円にもなるのだ！",
    "scene": 6,
    "pauseAfter": 12,
    "emotion": "surprised",
    "visual": {
      "type": "text",
      "text": "岐阜県の対応\n未払い: 約50台分\n総額: 約5,000万円",
      "fontSize": 56,
      "color": "#ffff00",
      "animation": "bounce"
    },
    "voiceFile": "53_zundamon.wav",
    "durationInFrames": 361
  },
  {
    "id": 54,
    "character": "metan",
    "text": "5000万円！それはすごい金額ね。全国に広がる可能性はあるの？",
    "scene": 6,
    "pauseAfter": 8,
    "emotion": "surprised",
    "voiceFile": "54_metan.wav",
    "durationInFrames": 207
  },
  {
    "id": 55,
    "character": "zundamon",
    "text": "江崎知事はエヌエイチケーを直接訪問して見直しを求めると表明していて、全国知事会でも議論を促す予定なのだ。",
    "displayText": "江崎知事はNHKを直接訪問して見直しを求めると表明していて、全国知事会でも議論を促す予定なのだ。",
    "scene": 6,
    "pauseAfter": 10,
    "voiceFile": "55_zundamon.wav",
    "durationInFrames": 351
  },
  {
    "id": 56,
    "character": "metan",
    "text": "法律の見直しにつながるといいわね。",
    "scene": 6,
    "pauseAfter": 10,
    "voiceFile": "56_metan.wav",
    "durationInFrames": 92
  },
  {
    "id": 57,
    "character": "zundamon",
    "text": "ちなみに個人の対策としては、カーナビを廃棄してスマートフォンのナビ機能で代替するのが確実なのだ！",
    "scene": 6,
    "pauseAfter": 10,
    "voiceFile": "57_zundamon.wav",
    "durationInFrames": 289
  },
  {
    "id": 58,
    "character": "metan",
    "text": "解約した後に訪問員が来たらどうすればいいの？",
    "scene": 7,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "解約後の訪問員対策",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "58_metan.wav",
    "durationInFrames": 126
  },
  {
    "id": 59,
    "character": "zundamon",
    "text": "視聴できる機器は一切ないと明確に伝えて、帰るように要求するのだ。",
    "scene": 7,
    "pauseAfter": 10,
    "voiceFile": "59_zundamon.wav",
    "durationInFrames": 213
  },
  {
    "id": 60,
    "character": "metan",
    "text": "もし帰ってくれなかったら？",
    "scene": 7,
    "pauseAfter": 8,
    "voiceFile": "60_metan.wav",
    "durationInFrames": 65
  },
  {
    "id": 61,
    "character": "zundamon",
    "text": "不退去罪に該当する可能性があるから、ためらわず警察に通報することが推奨されているのだ！",
    "scene": 7,
    "pauseAfter": 12,
    "visual": {
      "type": "text",
      "text": "帰らない場合は\n→ 警察に通報\n（不退去罪の可能性）",
      "fontSize": 56,
      "color": "#ff4444",
      "animation": "bounce"
    },
    "voiceFile": "61_zundamon.wav",
    "durationInFrames": 282
  },
  {
    "id": 62,
    "character": "metan",
    "text": "なるほど、覚えておくわ。",
    "scene": 7,
    "pauseAfter": 10,
    "voiceFile": "62_metan.wav",
    "durationInFrames": 71
  },
  {
    "id": 63,
    "character": "zundamon",
    "text": "まとめると、解約にはテレビの廃棄証明が必要で、代替にはチューナーレステレビがおすすめなのだ！",
    "scene": 7,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "まとめ\n1. 廃棄証明を用意\n2. NHKに電話→書類郵送\n3. チューナーレステレビに乗換え\n4. カーナビも要注意！",
      "fontSize": 48,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "63_zundamon.wav",
    "durationInFrames": 292
  },
  {
    "id": 64,
    "character": "metan",
    "text": "カーナビのワンセグにも気をつけないとね。",
    "scene": 7,
    "pauseAfter": 8,
    "voiceFile": "64_metan.wav",
    "durationInFrames": 93
  },
  {
    "id": 65,
    "character": "zundamon",
    "text": "この動画が参考になったら嬉しいのだ！",
    "scene": 7,
    "pauseAfter": 5,
    "emotion": "happy",
    "voiceFile": "65_zundamon.wav",
    "durationInFrames": 113
  },
  {
    "id": 66,
    "character": "metan",
    "text": "みなさんもぜひ参考にしてね。",
    "scene": 7,
    "pauseAfter": 5,
    "emotion": "happy",
    "voiceFile": "66_metan.wav",
    "durationInFrames": 75
  },
  {
    "id": 67,
    "character": "zundamon",
    "text": "バイバイなのだ〜！",
    "scene": 7,
    "pauseAfter": 0,
    "emotion": "happy",
    "voiceFile": "67_zundamon.wav",
    "durationInFrames": 46
  },
  {
    "id": 68,
    "character": "metan",
    "text": "バイバイ〜！",
    "scene": 7,
    "pauseAfter": 60,
    "emotion": "happy",
    "voiceFile": "68_metan.wav",
    "durationInFrames": 25
  }
];

// VOICEVOXスクリプト生成用
export const generateVoicevoxScript = (
  data: ScriptLine[],
  characterSpeakerMap: Record<CharacterId, number>
) => {
  return data.map((line) => ({
    id: line.id,
    character: line.character,
    speakerId: characterSpeakerMap[line.character],
    text: line.text,
    outputFile: line.voiceFile,
  }));
};
