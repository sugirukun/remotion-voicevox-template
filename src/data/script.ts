import { CharacterId } from "../config";

// アニメーションの型定義
export type AnimationType = "none" | "fadeIn" | "slideUp" | "slideLeft" | "zoomIn" | "bounce";

// ビジュアルの型定義
export interface VideoCaption {
  startSec: number;
  endSec: number;
  text: string;
}

export interface VideoClip {
  src: string;
  durationSec: number;
}

export interface VisualContent {
  type: "image" | "text" | "video" | "none";
  src?: string;
  videos?: VideoClip[];
  text?: string;
  fontSize?: number;
  color?: string;
  animation?: AnimationType;
  captions?: VideoCaption[];
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
export const bgmTracks: BGMTrack[] = [];

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
    "text": "今日はアイパッドを使って、外出先から自宅のマックミニをリモート操作する方法を紹介するのだ！",
    "displayText": "今日はiPadを使って、外出先から自宅のMac miniをリモート操作する方法を紹介するのだ！",
    "scene": 1,
    "pauseAfter": 36,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "外出先からMac miniをリモート\niPadとiPhone で実現！",
      "fontSize": 90,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "01_zundamon.wav",
    "durationInFrames": 284
  },
  {
    "id": 2,
    "character": "metan",
    "text": "へえ、アイパッドやアイフォンから自宅のパソコンを操作できるの？",
    "displayText": "へえ、iPadやiPhoneから自宅のパソコンを操作できるの？",
    "scene": 1,
    "pauseAfter": 11,
    "emotion": "surprised",
    "voiceFile": "02_metan.wav",
    "durationInFrames": 162
  },
  {
    "id": 3,
    "character": "zundamon",
    "text": "そうなのだ！テールスケールとラストデスクを使えば、モバイル回線でも安全に接続できるのだ！",
    "displayText": "そうなのだ！Tailscale（無料）とRustDesk（無料）\nを使えば、モバイル回線でも安全に接続できるのだ！",
    "scene": 1,
    "pauseAfter": 20,
    "emotion": "happy",
    "voiceFile": "03_zundamon.wav",
    "durationInFrames": 271
  },
  {
    "id": 4,
    "character": "zundamon",
    "text": "まず全体の構成を説明するのだ！",
    "scene": 2,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "📱モバイル回線iPhone\n（Tailscale + 📶テザリング　Claude cowork DispatchでClaudeとチャットでやりとり）\n\n↓\n📱iPad　Wi-FIモデルで大丈夫（iPhoneで📶テザリング接続）\n（Tailscale +RustDesk）主に画面で確認\nモニター代わり　Macminiの画面を外出先で確認\n↓\n🖥️Mac mini\n　　 （Tailscale +RustDesk　🏠自宅・常時起動　🔌電源もON Amphetaminでスリープ防止）",
      "fontSize": 45,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "displayText": "まず全体の構成を説明するのだ！",
    "voiceFile": "04_zundamon.wav",
    "durationInFrames": 111
  },
  {
    "id": 5,
    "character": "metan",
    "text": "アイフォンがテザリングしながらテールスケールでヴィーピーエヌを張るのね。",
    "displayText": "iPhoneがテザリングしながらTailscaleでVPNを張るのね。",
    "scene": 2,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "05_metan.wav",
    "durationInFrames": 148
  },
  {
    "id": 6,
    "character": "zundamon",
    "text": "そうなのだ！アイフォンがモバイル回線とヴィーピーエヌのゲートウェイになるのだ！アイパッドは直接モバイル通信しなくていいのだ！",
    "displayText": "そうなのだ！\nアイフォンがモバイル回線と\nVPNのゲートウェイになるのだ！\niPadは直接モバイル通信しなくていいのだ！",
    "scene": 2,
    "pauseAfter": 20,
    "emotion": "happy",
    "voiceFile": "06_zundamon.wav",
    "durationInFrames": 338
  },
  {
    "id": 7,
    "character": "zundamon",
    "text": "まず自宅のマックミニで事前準備をするのだ！これは一度だけやればいいのだ！",
    "displayText": "まず自宅のMac miniで事前準備をするのだ！これは一度だけやればいいのだ！",
    "scene": 3,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "【Mac mini】\n事前準備\n（自宅で一度だけ）",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "07_zundamon.wav",
    "durationInFrames": 208
  },
  {
    "id": 8,
    "character": "metan",
    "text": "何を準備すればいいの？",
    "scene": 3,
    "pauseAfter": 10,
    "emotion": "thinking",
    "displayText": "何を準備すればいいの？",
    "voiceFile": "08_metan.wav",
    "durationInFrames": 66
  },
  {
    "id": 9,
    "character": "zundamon",
    "text": "まずはグーグルでジーメールアカウントを作っておく。\nそしてマックミニに次の３つをインストールするのだ。",
    "displayText": "まずはGoogleでGmailアカウントを作っておく。\nそしてMac miniに次の３つをインストールするのだ。",
    "scene": 3,
    "pauseAfter": 15,
    "voiceFile": "09_zundamon.wav",
    "durationInFrames": 281
  },
  {
    "id": 10,
    "character": "zundamon",
    "text": "テールスケール、ラストデスク、アンフェタミンなのだ！",
    "displayText": "Tailscale（無料）・RustDesk（無料）・Amphetamine（無料）\nの３つをインストール！",
    "scene": 3,
    "pauseAfter": 15,
    "visual": {
      "type": "text",
      "text": "① Tailscale をインストール\n② RustDesk をインストール\n③ Amphetamine をインストール",
      "fontSize": 77,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "10_zundamon.wav",
    "durationInFrames": 156
  },
  {
    "id": 11,
    "character": "zundamon",
    "text": "テールスケールを起動してコネクテッドになっているか確認するのだ！",
    "displayText": "Tailscaleを起動してConnectedになっているか確認するのだ！",
    "scene": 3,
    "pauseAfter": 10,
    "visual": {
      "type": "image",
      "src": "tailscale-appstore.png",
      "animation": "fadeIn"
    },
    "voiceFile": "11_zundamon.wav",
    "durationInFrames": 170
  },
  {
    "id": 12,
    "character": "zundamon",
    "text": "次にラストデスクを起動するのだ！ログイン項目に追加しておくと自動起動して便利なのだ！",
    "displayText": "次にRustDeskを起動するのだ！ログイン項目に追加しておくと自動起動して便利なのだ！",
    "scene": 3,
    "pauseAfter": 10,
    "visual": {
      "type": "image",
      "src": "rustdesk-launch.png",
      "animation": "fadeIn"
    },
    "voiceFile": "12_zundamon.wav",
    "durationInFrames": 255
  },
  {
    "id": 13,
    "character": "zundamon",
    "text": "アンフェタミンなど、スリープ防止アプリも有効にしておくのだ！マックミニが寝てしまうと接続できなくなるのだ！",
    "displayText": "Amphetamineなど、スリープ防止アプリも有効にしておくのだ！Mac miniが寝てしまうと接続できなくなるのだ！",
    "scene": 3,
    "pauseAfter": 10,
    "emotion": "surprised",
    "visual": {
      "type": "image",
      "src": "amphetamine.png",
      "animation": "fadeIn"
    },
    "voiceFile": "13_zundamon.wav",
    "durationInFrames": 307
  },
  {
    "id": 14,
    "character": "metan",
    "text": "テールスケールのアイピーアドレスも確認しておく必要があるのかしら？",
    "displayText": "TailscaleのIPアドレスも確認しておく必要があるのかしら？",
    "scene": 3,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "14_metan.wav",
    "durationInFrames": 164
  },
  {
    "id": 15,
    "character": "zundamon",
    "text": "テールスケールのアイコンから自分のマシン名の横に表示されるアドレスをメモしておくのだ！ヒャクてんから始まるやつなのだ！",
    "displayText": "Tailscaleのアイコンから\n自分のマシン名の横に表示されるアドレスを\nメモしておくのだ！100.x.x.xで始まるやつなのだ！",
    "scene": 3,
    "pauseAfter": 20,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "💡 Tailscaleの\n100.x.x.x\nをメモしておく！",
      "fontSize": 64,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "15_zundamon.wav",
    "durationInFrames": 326
  },
  {
    "id": 16,
    "character": "metan",
    "text": "これね。ラストデスクもアンフェタミンもここに表示されていたらオーケーね。",
    "scene": 3,
    "pauseAfter": 15,
    "displayText": "これね。RustDeskもAmphetamineもここに表示されていたらOKね。",
    "visual": {
      "type": "image",
      "src": "TailscaleIP.png",
      "animation": "fadeIn"
    },
    "voiceFile": "16_metan.wav",
    "durationInFrames": 169
  },
  {
    "id": 17,
    "character": "zundamon",
    "text": "次にアイフォンの手順を説明するのだ！",
    "displayText": "次にiPhoneの手順を説明するのだ！",
    "scene": 4,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "【iPhone】\n外出先での手順",
      "fontSize": 80,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "17_zundamon.wav",
    "durationInFrames": 108
  },
  {
    "id": 18,
    "character": "zundamon",
    "text": "アイフォンにも同じようにテールスケールのアプリはインストールしておくのだ。",
    "scene": 4,
    "pauseAfter": 15,
    "displayText": "iPhoneにも同じようにTailscaleのアプリはインストールしておくのだ。",
    "visual": {
      "type": "image",
      "src": "tailscaleアイコン.PNG"
    },
    "voiceFile": "18_zundamon.wav",
    "durationInFrames": 180
  },
  {
    "id": 19,
    "character": "zundamon",
    "text": "ステップ1！設定からモバイル通信をオンにするのだ！普通、スマホを使う人は当然オンになっているから、ここは特に意識しなくてもいいはずなのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "displayText": "ステップ1！設定からモバイル通信を\nONにするのだ！普通、スマホを使う人は\n当然ONになっているから、\nここは特に意識しなくてもいいはずなのだ。",
    "voiceFile": "19_zundamon.wav",
    "durationInFrames": 443
  },
  {
    "id": 20,
    "character": "zundamon",
    "text": "ステップ2！テールスケールアプリを開いてコネクトボタンをタップするのだ！コネクテッドになるまで待つのだ！",
    "displayText": "STEP 2！Tailscaleアプリを開いてConnectボタンをタップするのだ！Connectedになるまで待つのだ！",
    "scene": 4,
    "pauseAfter": 10,
    "visual": {
      "type": "image",
      "src": "tailscale画面.PNG"
    },
    "voiceFile": "20_zundamon.wav",
    "durationInFrames": 281
  },
  {
    "id": 21,
    "character": "metan",
    "text": "ヴィーピーエヌマークが画面上部に出るまで待てばいいのね。",
    "displayText": "VPNマークが画面上部に出るまで待てばいいのね。",
    "scene": 4,
    "pauseAfter": 10,
    "emotion": "thinking",
    "visual": {
      "type": "image",
      "src": "VPN.jpeg"
    },
    "voiceFile": "21_metan.wav",
    "durationInFrames": 128
  },
  {
    "id": 22,
    "character": "zundamon",
    "text": "ステップ3！設定のインターネット共有からほかの人の接続を許可をオンにするのだ！これでアイパッドにテザリングできるのだ！",
    "scene": 4,
    "pauseAfter": 20,
    "visual": {
      "type": "image",
      "src": "テザリング1.jpeg"
    },
    "displayText": "ステップ3！設定のインターネット共有からほかの人の接続を許可をオンにするのだ！これでiPadにテザリングできるのだ！",
    "voiceFile": "22_zundamon.wav",
    "durationInFrames": 352
  },
  {
    "id": 23,
    "character": "zundamon",
    "text": "ここもおん",
    "scene": 4,
    "pauseAfter": 15,
    "displayText": "ここもオン！",
    "visual": {
      "type": "image",
      "src": "テザリング2.PNG"
    },
    "voiceFile": "23_zundamon.wav",
    "durationInFrames": 37
  },
  {
    "id": 24,
    "character": "zundamon",
    "text": "次はアイパッドの手順なのだ！アイパッドもテイルスケールをインストールしておくのだ",
    "displayText": "次はiPadの手順なのだ！\niPadもTailscale をインストールしておくのだ",
    "scene": 5,
    "pauseAfter": 10,
    "visual": {
      "type": "image",
      "text": "【iPad】\n外出先での手順",
      "fontSize": 80,
      "color": "#ffffff",
      "animation": "slideUp",
      "src": "ipad tailscale.jpg"
    },
    "voiceFile": "24_zundamon.wav",
    "durationInFrames": 220
  },
  {
    "id": 25,
    "character": "zundamon",
    "text": "ステップ1！設定のワイファイからアイフォンの名前を選んで接続するのだ！",
    "displayText": "STEP 1！設定のWi-FiからiPhoneの名前を選んで接続するのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "visual": {
      "type": "image",
      "src": "wifi1.PNG"
    },
    "voiceFile": "25_zundamon.wav",
    "durationInFrames": 216
  },
  {
    "id": 26,
    "character": "metan",
    "text": "テザリングワイファイのパスワードはアイフォンで自分で作成して、最初にアイパッドにパスワードを入力すれば次からは自動で接続されるのね。",
    "scene": 5,
    "pauseAfter": 15,
    "displayText": "テザリングWi-Fiのパスワードは\niPhoneで自分で作成して、\n最初にiPadにパスワードを入力すれば\n次からは自動で接続されるのね。",
    "visual": {
      "type": "image",
      "src": "wifi2.PNG"
    },
    "voiceFile": "26_metan.wav",
    "durationInFrames": 331
  },
  {
    "id": 27,
    "character": "zundamon",
    "text": "ステップ2！アイパッドにもインストールした、ラストデスクアプリを起動して、接続先入力欄にマックミニのラストデスクに表示されたリモートアイディを入力するのだ！",
    "displayText": "STEP 2！iPadにもインストールした、RustDeskアプリを起動して、接続先入力欄にMac miniのRustDeskに表示されたリモートIDを入力するのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "visual": {
      "type": "image",
      "src": "Rustdesk.jpg"
    },
    "voiceFile": "27_zundamon.wav",
    "durationInFrames": 455
  },
  {
    "id": 28,
    "character": "metan",
    "text": "固定パスワードを入力すれば接続完了ね！",
    "scene": 5,
    "pauseAfter": 10,
    "emotion": "happy",
    "displayText": "固定パスワードを入力すれば接続完了ね！",
    "voiceFile": "28_metan.wav",
    "durationInFrames": 118
  },
  {
    "id": 29,
    "character": "zundamon",
    "text": "テールスケールが両デバイスで接続済みなら、リモートアイディで接続しても自動的にテールスケール経由で通信されるから安全なのだ！",
    "displayText": "Tailscaleが両デバイスで接続済みなら、\nリモートIDで接続しても自動的にTailscale経由で\n通信されるから安全なのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "29_zundamon.wav",
    "durationInFrames": 365
  },
  {
    "id": 30,
    "character": "metan",
    "text": "マックミニの画面がアイパッドに表示されれば成功ね！",
    "displayText": "Mac miniの画面がiPadに表示されれば成功ね！",
    "scene": 5,
    "pauseAfter": 20,
    "emotion": "happy",
    "voiceFile": "30_metan.wav",
    "durationInFrames": 129
  },
  {
    "id": 31,
    "character": "zundamon",
    "text": "ではアイフォンをリモートコントローラーとして使う方法も紹介するのだ！\nクロードの子ウォーク　ディスパッチという機能をつかうのだ。",
    "displayText": "ではiPhoneをリモートコントローラーとして使う方法も紹介するのだ！\nClaudeのcowork Dispatchという機能をつかうのだ。",
    "scene": 6,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "【iPhone】\nClaude cowork Dispatch\nでリモートコントローラーに！",
      "fontSize": 64,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "31_zundamon.wav",
    "durationInFrames": 353
  },
  {
    "id": 32,
    "character": "metan",
    "text": "クロードの子ウォーク　ディスパッチってなに？",
    "displayText": "Claudeのcowork Dispatchってなに？",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "thinking",
    "visual": {
      "type": "image",
      "src": "Dispatch.png"
    },
    "voiceFile": "32_metan.wav",
    "durationInFrames": 105
  },
  {
    "id": 33,
    "character": "zundamon",
    "text": "スマホからマックミニのクロードにタスクを指示できる機能なのだ！2026年3月19日にリリースされた新機能なのだ！",
    "displayText": "スマホからMac miniのClaudeに\nタスクを指示できる機能なのだ！\n2026年3月19日にリリースされた新機能なのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "emotion": "happy",
    "visual": {
      "type": "image",
      "text": "Claude cowork Dispatch\nスマホ → Mac miniのClaudeに\nタスクを指示！",
      "fontSize": 60,
      "color": "#ffffff",
      "animation": "fadeIn",
      "src": "Dispatch.png"
    },
    "voiceFile": "33_zundamon.wav",
    "durationInFrames": 345
  },
  {
    "id": 34,
    "character": "zundamon",
    "text": "まずマックミニのクロードデスクトップを最新版に更新して、コワークの画面からディスパッチを選んでキューアールコードを表示するのだ！",
    "displayText": "まずMac miniのClaude Desktopを最新版に更新して、\nCoworkからDispatchを選んで\nQRコードを表示するのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "visual": {
      "type": "text",
      "text": "【Mac mini 側の設定】\n① Claude Desktop を最新版に更新\n② Cowork → Dispatch を選択\n③ QRコードを表示",
      "fontSize": 52,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "34_zundamon.wav",
    "durationInFrames": 348
  },
  {
    "id": 35,
    "character": "metan",
    "text": "アイフォンでそのキューアールコードを読み取るの？",
    "displayText": "iPhoneでそのQRコードを読み取るの？",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "35_metan.wav",
    "durationInFrames": 101
  },
  {
    "id": 36,
    "character": "zundamon",
    "text": "そうなのだ！アイフォンのクロードアプリでキューアールコードをスキャンするとペアリング完了なのだ！それだけなのだ！",
    "displayText": "そうなのだ！iPhoneのClaudeアプリで\nQRコードをスキャンすると\nペアリング完了なのだ！それだけなのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "【iPhone 側の設定】\nClaudeアプリでQRコードをスキャン\n→ ペアリング完了！",
      "fontSize": 60,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "36_zundamon.wav",
    "durationInFrames": 284
  },
  {
    "id": 37,
    "character": "metan",
    "text": "ペアリングしたらどうやって指示を出すの？",
    "displayText": "ペアリングしたらどうやって指示を出すの？",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "37_metan.wav",
    "durationInFrames": 93
  },
  {
    "id": 38,
    "character": "zundamon",
    "text": "クロードアプリのディスパッチ画面でチャット形式でお願いするだけなのだ！ログインとか難しい操作は一切いらないのだ！",
    "displayText": "ClaudeアプリのDispatch画面で\nチャット形式でお願いするだけなのだ！\nログインなど難しい操作は\n一切いらないのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "📱 ClaudeアプリのDispatch画面で\nチャット形式でお願いするだけ！\n難しい操作は一切なし！",
      "fontSize": 60,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "38_zundamon.wav",
    "durationInFrames": 315
  },
  {
    "id": 39,
    "character": "zundamon",
    "text": "ファイル削除などの危険な操作はアイフォンに承認通知が届くから安心なのだ！",
    "displayText": "ファイル削除などの危険な操作は\niPhoneに承認通知が届くから安心なのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "⚠️ 危険な操作は\niPhoneに承認通知が届く！\n安心・安全なのだ",
      "fontSize": 64,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "39_zundamon.wav",
    "durationInFrames": 212
  },
  {
    "id": 40,
    "character": "zundamon",
    "text": "実際に動かすとこんな感じなのだ。",
    "displayText": "実際に動かすとこんな感じなのだ。\niPadにMacの画面をRustDesk で接続して表示中。\niPhone《動画のものはMacにiPhone をミラーリングしたもの》\nのDispatchのチャットがMacのDispatchの\n画面とシンクロして動いています",
    "scene": 6,
    "pauseAfter": 12076,
    "emotion": "happy",
    "visual": {
      "type": "video",
      "text": "🎙️ 音声入力で指示\nもちろん📱iPhoneの⌨️ソフトウェアキーボードも使えます",
      "fontSize": 70,
      "color": "#ffffff",
      "animation": "fadeIn",
      "videos": [
        {
          "src": "ScreenRecording_03-23-2026 01-15-18_1_edited5_mosaic_cut2.mp4",
          "durationSec": 124
        },
        {
          "src": "Rec2.mp4",
          "durationSec": 77.1
        },
        {
          "src": "Rec3.mp4",
          "durationSec": 136
        }
      ],
      "captions": [
        {
          "startSec": 0,
          "endSec": 5,
          "text": "iPadでRustDeskを使いMacにリモート接続します。"
        },
        {
          "startSec": 7,
          "endSec": 24,
          "text": "iPhoneでclaudeを開きます。\n※この動画ではiPhoneをMacでミラーリングしています。"
        },
        {
          "startSec": 25,
          "endSec": 29,
          "text": "ClaudeのDispatchを使います。"
        },
        {
          "startSec": 30,
          "endSec": 35,
          "text": "MacでもDispatchを開いておきましょう。"
        },
        {
          "startSec": 36,
          "endSec": 41,
          "text": "MacのなかにあるObsidian（オブシディアン）というメモファイルがあります。\n私はここにX（Twitter）の記事を溜め込んでいます。"
        },
        {
          "startSec": 42,
          "endSec": 48,
          "text": "毎日、X twitterの記事を何件か保存しています。\nあのメモの中のあの記事どこだっけ？みたいなことになりがちです。"
        },
        {
          "startSec": 49,
          "endSec": 65,
          "text": "糸井重里さんがなんか最近記事書いてたなー？なんやったっけ？\nこんなこと出先で気になったとします。"
        },
        {
          "startSec": 66,
          "endSec": 105,
          "text": "Dispatchくんに聞いてみましょう。"
        },
        {
          "startSec": 110,
          "endSec": 117,
          "text": "Macの方でもDispatchくんが同じ内容で動いてます。"
        },
        {
          "startSec": 118,
          "endSec": 124,
          "text": "Dispatchくんから返答が来ました。\n無事にiPhoneから出先で曖昧なお願いでMacのメモ情報が取れましたね。便利になりました。"
        },
        {
          "startSec": 124,
          "endSec": 139,
          "text": "このままさらにMacに作業をしてもらいましょう。\n毎日膨大な量のX Twitterの投稿を保存しています。\n二日間だけでもこれだけのメモが溜まりました。"
        },
        {
          "startSec": 140,
          "endSec": 171,
          "text": "二日間のメモの中から、Claudeについてだけの記事をリスト化して、\n投稿者・見出し・内容の要約に分けて\nNumbers（Excelのようなもの）のスプレッドシートに\n新しいファイルで作成してもらいましょう。"
        },
        {
          "startSec": 171,
          "endSec": 179,
          "text": "iPhoneからお願いしています。\n3月23日と3月22日の中から探してもらっています。\n日付表記をあえて統一せず、3月23日を先に書いてお願いしていますが、うまくいくでしょうか？"
        },
        {
          "startSec": 180,
          "endSec": 201,
          "text": "無事できたようです。中身を確認してみましょう。"
        },
        {
          "startSec": 201,
          "endSec": 215,
          "text": "画面左側が作成されたスプレッドシートです。画面右側がObsidianのメモのリストです。\nObsidianの上から3つの内容はClaudeに関係するものではないようですね。\n当然スプレッドシートの中にはないようです。"
        },
        {
          "startSec": 216,
          "endSec": 238,
          "text": "4つ目の記事はうまくスプレッドシートに入ってますね。\nClaudeについて書かれた内容のようです。\nスプレッドシートの内容とメモの内容が一致してますね。"
        },
        {
          "startSec": 239,
          "endSec": 242,
          "text": "5つ目のメモはゲームの記事のようなので取り込めていません。\n6つ目はどうでしょうか？"
        },
        {
          "startSec": 242,
          "endSec": 258,
          "text": "6つ目のメモはチャエンさんのClaudeについての記事のようです。\nスプレッドシートにも記入されてますね。"
        },
        {
          "startSec": 259,
          "endSec": 282,
          "text": "7つ目のメモは別のAIの記事なので違いました。\n8つ目のメモはClaude Codeのスキル自動改善プラグインについての記事です。\nスプレッドシートにもバッチリ反映されてますね。"
        },
        {
          "startSec": 283,
          "endSec": 290,
          "text": "3月22日のメモはどうでしょうか？"
        },
        {
          "startSec": 291,
          "endSec": 319,
          "text": "3月22日もチャエンさんからの投稿をメモしていました。\nこちらもスプレッドシートにバッチリ入ってます。"
        },
        {
          "startSec": 320,
          "endSec": 337,
          "text": "残りの記事も問題なく取り込めています。\nこんな感じでメモの中から特定の記事だけを取り込んで\nスプレッドシートに転記して見やすくすることが可能です。\n外出先のiPhoneのチャット画面からお願いするとMacが作業してくれるので大変便利です。\niPadの大きい画面でパソコンの画面を確認できるのもいいですね。"
        }
      ]
    },
    "voiceFile": "40_zundamon.wav",
    "durationInFrames": 103
  },
  {
    "id": 41,
    "character": "zundamon",
    "text": "アイパッドがモニター代わり、アイフォンがディスパッチのコントローラー代わりなのだ！ディスパッチでリモート環境でピーシー操作の指示やコーディングが実現するのだ！",
    "displayText": "iPadがモニター代わり、\niPhoneがDispatchのコントローラー（代用物理キーボード）なのだ！\nDispatchでリモート環境でPC操作の指示やコーディングが実現するのだ！",
    "scene": 6,
    "pauseAfter": 20,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "📱iPhone = コントローラー（Dispatch）\n📱iPad = モニター（RustDesk）\n🖥️ Mac mini が実行！",
      "fontSize": 60,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "41_zundamon.wav",
    "durationInFrames": 411
  },
  {
    "id": 42,
    "character": "metan",
    "text": "キーボードなしでコーディングやファイル操作がリモートでできちゃうのね！",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "surprised",
    "displayText": "（物理）キーボードなしでコーディングやファイル操作がリモートでできちゃうのね！",
    "voiceFile": "42_metan.wav",
    "durationInFrames": 142
  },
  {
    "id": 43,
    "character": "zundamon",
    "text": "これで外出先からアイパッドとアイフォンでマックミニをフル活用できるのだ！",
    "displayText": "これで外出先からiPadとiPhoneでMac miniをフル活用できるのだ！",
    "scene": 8,
    "pauseAfter": 10,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "iPad × Mac mini\nで最強の\nモバイル環境！",
      "fontSize": 72,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "43_zundamon.wav",
    "durationInFrames": 195
  },
  {
    "id": 44,
    "character": "metan",
    "text": "カフェや図書館でも、自宅のマックミニで本格的な作業ができるわね！",
    "displayText": "カフェや図書館でも、自宅のMac miniで本格的な作業ができるわね！",
    "scene": 8,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "44_metan.wav",
    "durationInFrames": 175
  },
  {
    "id": 45,
    "character": "zundamon",
    "text": "簡単な説明だけどこれで説明はおわりなのだ。家で眠っているアイパッドがあれば試して欲しいのだ。それじゃあバイバイなのだ。",
    "scene": 8,
    "pauseAfter": 15,
    "displayText": "簡単な説明だけどこれで説明はおわりなのだ。\n家で眠っているiPadがあれば試して欲しいのだ。\nそれじゃあバイバイなのだ。",
    "voiceFile": "45_zundamon.wav",
    "durationInFrames": 350
  },
  {
    "id": 46,
    "character": "metan",
    "text": "バイバイ！",
    "scene": 8,
    "pauseAfter": 0,
    "emotion": "happy",
    "displayText": "バイバイ！",
    "voiceFile": "46_metan.wav",
    "durationInFrames": 25
  },
  {
    "id": 47,
    "character": "zundamon",
    "text": "バイバイなのだ！",
    "scene": 8,
    "pauseAfter": 60,
    "emotion": "happy",
    "displayText": "バイバイなのだ！",
    "voiceFile": "47_zundamon.wav",
    "durationInFrames": 46
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
