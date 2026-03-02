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
      "text": "アプリは全て無料！\n外出先からMac miniをリモート\niPadとiPhone で実現！",
      "fontSize": 90,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "01_zundamon.wav",
    "durationInFrames": 53
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
    "durationInFrames": 44
  },
  {
    "id": 3,
    "character": "zundamon",
    "text": "そうなのだ！テールスケールとラストデスクを使えば、モバイル回線でも安全に接続できるのだ！",
    "displayText": "そうなのだ！TailscaleとRustDeskを使えば、モバイル回線でも安全に接続できるのだ！",
    "scene": 1,
    "pauseAfter": 20,
    "emotion": "happy",
    "voiceFile": "03_zundamon.wav",
    "durationInFrames": 123
  },
  {
    "id": 4,
    "character": "zundamon",
    "text": "まず全体の構成を説明するのだ！",
    "scene": 2,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "📱モバイル回線iPhone\n（Tailscale + 📶テザリング　Claude Code Remoteなどで指示）\nコントローラー　（⌨️キーボード代わり　🎙️音声入力がおすすめ）\n↓\n📱iPad　Wi-FIモデルで大丈夫（iPhoneで📶テザリング接続）\n（Tailscale +RustDesk）主に画面で確認\nモニター代わり　Macminiの画面を外出先で\n↓\n🖥️Mac mini\n　　 （Tailscale +RustDesk　🏠自宅・常時起動　🔌電源もON Amphetaminでスリープ防止）",
      "fontSize": 45,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "04_zundamon.wav",
    "durationInFrames": 60
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
    "durationInFrames": 60
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
    "durationInFrames": 60
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
    "durationInFrames": 60
  },
  {
    "id": 8,
    "character": "metan",
    "text": "何を準備すればいいの？",
    "scene": 3,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "08_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 9,
    "character": "zundamon",
    "text": "マックミニに次の３つをインストールするのだ。",
    "displayText": "Mac miniに次の３つをインストールするのだ。",
    "scene": 3,
    "pauseAfter": 15,
    "voiceFile": "09_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 10,
    "character": "zundamon",
    "text": "テールスケール、ラストデスク、アンフェタミンなのだ！",
    "displayText": "Tailscale・RustDesk・Amphetamine\nの３つをインストール！",
    "scene": 3,
    "pauseAfter": 15,
    "visual": {
      "type": "text",
      "text": "① Tailscale をインストール\n② RustDesk をインストール\n③ Amphetamine をインストール",
      "fontSize": 60,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "10_zundamon.wav",
    "durationInFrames": 60
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
    "durationInFrames": 60
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
    "durationInFrames": 60
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
    "durationInFrames": 60
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
    "durationInFrames": 60
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
    "durationInFrames": 60
  },
  {
    "id": 16,
    "character": "metan",
    "text": "これね。ラストデスクもアンフェタミンもここに表示されていたらオーケーね。",
    "scene": 3,
    "pauseAfter": 15,
    "displayText": "これね。RustDeskもAmphetamineもここに表示されていたらOKね。",
    "voiceFile": "16_metan.wav",
    "durationInFrames": 60
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
    "durationInFrames": 60
  },
  {
    "id": 18,
    "character": "zundamon",
    "text": "アイフォンにも同じようにテールスケールのアプリはインストールしておくのだ。",
    "scene": 4,
    "pauseAfter": 15,
    "displayText": "iPhoneにも同じようにTailscaleのアプリはインストールしておくのだ。",
    "voiceFile": "18_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 19,
    "character": "zundamon",
    "text": "ステップ1！設定からモバイル通信をオンにするのだ！普通、スマホを使う人は当然オンになっているから、ここは特に意識しなくてもいいはずなのだ。",
    "scene": 4,
    "pauseAfter": 10,
    "displayText": "ステップ1！設定からモバイル通信を\nONにするのだ！普通、スマホを使う人は\n当然ONになっているから、\nここは特に意識しなくてもいいはずなのだ。",
    "voiceFile": "19_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 20,
    "character": "zundamon",
    "text": "ステップ2！テールスケールアプリを開いてコネクトボタンをタップするのだ！コネクテッドになるまで待つのだ！",
    "displayText": "STEP 2！Tailscaleアプリを開いてConnectボタンをタップするのだ！Connectedになるまで待つのだ！",
    "scene": 4,
    "pauseAfter": 10,
    "voiceFile": "20_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 21,
    "character": "metan",
    "text": "ヴィーピーエヌマークが画面上部に出るまで待てばいいのね。",
    "displayText": "VPNマークが画面上部に出るまで待てばいいのね。",
    "scene": 4,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "21_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 22,
    "character": "zundamon",
    "text": "ステップ3！設定のインターネット共有から\nほかの人の接続を許可をオンにするのだ！\nこれでアイパッドにテザリングできるのだ！",
    "scene": 4,
    "pauseAfter": 20,
    "voiceFile": "22_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 23,
    "character": "zundamon",
    "text": "次はアイパッドの手順なのだ！",
    "displayText": "次はiPadの手順なのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "【iPad】\n外出先での手順",
      "fontSize": 80,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "23_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 24,
    "character": "zundamon",
    "text": "ステップ1！設定のワイファイからアイフォンの名前を選んで接続するのだ！",
    "displayText": "STEP 1！設定のWi-FiからiPhoneの名前を選んで接続するのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "voiceFile": "24_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 25,
    "character": "metan",
    "text": "テザリングワイファイのパスワードはアイフォンで自分で作成して、最初にアイパッドにパスワードを入力すれば次からは自動で接続されるのね。",
    "scene": 5,
    "pauseAfter": 15,
    "displayText": "テザリングWi-Fiのパスワードは\niPhoneで自分で作成して、\n最初にiPadにパスワードを入力すれば\n次からは自動で接続されるのね。",
    "voiceFile": "25_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 26,
    "character": "zundamon",
    "text": "ステップ2！ラストデスクアプリを起動して、接続先入力欄にマックミニのリモートアイディを入力するのだ！",
    "displayText": "STEP 2！RustDeskアプリを起動して、接続先入力欄にMac miniのリモートIDを入力するのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "voiceFile": "26_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 27,
    "character": "metan",
    "text": "固定パスワードを入力すれば接続完了ね！",
    "scene": 5,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "27_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 28,
    "character": "zundamon",
    "text": "テールスケールが両デバイスで接続済みなら、リモートアイディで接続しても自動的にテールスケール経由で通信されるから安全なのだ！",
    "displayText": "Tailscaleが両デバイスで接続済みなら、\nリモートIDで接続しても自動的にTailscale経由で\n通信されるから安全なのだ！",
    "scene": 5,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "28_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 29,
    "character": "metan",
    "text": "マックミニの画面がアイパッドに表示されれば成功ね！",
    "displayText": "Mac miniの画面がiPadに表示されれば成功ね！",
    "scene": 5,
    "pauseAfter": 20,
    "emotion": "happy",
    "voiceFile": "29_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 30,
    "character": "zundamon",
    "text": "さらにアイフォンをコントローラーとして使う方法も紹介するのだ！ターミウスというアプリを使うのだ！",
    "displayText": "さらにiPhoneをコントローラーとして使う方法も紹介するのだ！Termiusというアプリを使うのだ！",
    "scene": 6,
    "pauseAfter": 10,
    "visual": {
      "type": "text",
      "text": "【iPhone】\nTermius × Claude Code\nでコントローラーに！",
      "fontSize": 64,
      "color": "#ffffff",
      "animation": "slideUp"
    },
    "voiceFile": "30_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 31,
    "character": "metan",
    "text": "ターミウスってなに？",
    "displayText": "Termiusってなに？",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "31_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 32,
    "character": "zundamon",
    "text": "アイフォンで使えるエスエスエイチクライアントなのだ！マックミニにターミナルでリモート接続できるアプリなのだ！",
    "displayText": "iPhoneで使えるSSHクライアントなのだ！\nMac miniにターミナルでリモート接続できるアプリなのだ！",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "32_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 33,
    "character": "zundamon",
    "text": "アプリストアからターミウスをインストールして、ホスト設定にマックミニのテールスケールアドレスを登録するのだ！",
    "displayText": "App StoreからTermiusをインストールして、\nホスト設定にMac miniのTailscaleアドレスを登録するのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "visual": {
      "type": "text",
      "text": "Termius ホスト設定\n・ホスト: 100.x.x.x\n・ユーザー名・パスワードを入力",
      "fontSize": 52,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "33_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 34,
    "character": "metan",
    "text": "接続できたらどうするの？",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "34_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 35,
    "character": "zundamon",
    "text": "ターミナルでクロードと入力してクロードコードを起動するのだ！それだけなのだ！",
    "displayText": "ターミナルで「claude」と入力してClaude Codeを起動するのだ！それだけなのだ！",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "$ claude",
      "fontSize": 72,
      "color": "#00ff88",
      "animation": "fadeIn"
    },
    "voiceFile": "35_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 36,
    "character": "metan",
    "text": "起動したらどうやって指示を出すの？",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "thinking",
    "voiceFile": "36_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 37,
    "character": "zundamon",
    "text": "アイフォンのキーボードの音声入力ボタンをタップして、しゃべるだけなのだ！日本語でもちゃんと認識されるのだ！",
    "displayText": "iPhoneのキーボードの音声入力ボタンをタップして、\nしゃべるだけなのだ！日本語でもちゃんと認識されるのだ！",
    "scene": 6,
    "pauseAfter": 15,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "🎙️ 音声入力で指示\n「デスクトップに新しいフォルダを作って」",
      "fontSize": 70,
      "color": "#ffffff",
      "animation": "fadeIn"
    },
    "voiceFile": "37_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 38,
    "character": "zundamon",
    "text": "アイパッドがモニター代わり、アイフォンがキーボード代わりなのだ！音声入力で完全ハンズフリーのコーディングが実現するのだ！",
    "displayText": "iPadがモニター代わり、\niPhoneがキーボード代わりなのだ！\n音声入力で完全ハンズフリーの\nコーディングが実現するのだ！",
    "scene": 6,
    "pauseAfter": 20,
    "emotion": "happy",
    "visual": {
      "type": "text",
      "text": "📱iPhone = コントローラー（Termius）🎙️ 音声入力で指示　　\n📱iPad = モニター（RustDesk）\n🖥️ Mac mini が実行！",
      "fontSize": 60,
      "color": "#ffffff",
      "animation": "zoomIn"
    },
    "voiceFile": "38_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 39,
    "character": "metan",
    "text": "キーボードなしでコーディングやファイル操作、ブラウザ操作ができちゃうのね！",
    "scene": 6,
    "pauseAfter": 10,
    "emotion": "surprised",
    "displayText": "キーボードなしでコーディングやファイル操作、ブラウザ操作ができちゃうのね！",
    "voiceFile": "39_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 40,
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
    "voiceFile": "40_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 41,
    "character": "metan",
    "text": "カフェや図書館でも、自宅のマックミニで本格的な作業ができるわね！",
    "displayText": "カフェや図書館でも、自宅のMac miniで本格的な作業ができるわね！",
    "scene": 8,
    "pauseAfter": 10,
    "emotion": "happy",
    "voiceFile": "41_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 42,
    "character": "zundamon",
    "text": "さずがにカフェや図書館ではキーボードを使った方がいいと思うのだ。",
    "scene": 8,
    "pauseAfter": 15,
    "displayText": "さずがにカフェや図書館ではキーボードを使った方がいいと思うのだ。",
    "voiceFile": "42_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 43,
    "character": "metan",
    "text": "確かに、ちょっと危ない人に見られるわね。",
    "scene": 8,
    "pauseAfter": 15,
    "displayText": "確かに、ちょっと危ない人に見られるわね。",
    "voiceFile": "43_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 44,
    "character": "zundamon",
    "text": "簡単な説明だけどこれで説明はおわりなのだ。家で眠っているアイパッドがあれば試して欲しいのだ。それじゃあバイバイなのだ。",
    "scene": 8,
    "pauseAfter": 15,
    "displayText": "簡単な説明だけどこれで説明はおわりなのだ。\n家で眠っているiPadがあれば試して欲しいのだ。\nそれじゃあバイバイなのだ。",
    "voiceFile": "44_zundamon.wav",
    "durationInFrames": 60
  },
  {
    "id": 45,
    "character": "metan",
    "text": "バイバイ！",
    "scene": 8,
    "pauseAfter": 0,
    "emotion": "happy",
    "voiceFile": "45_metan.wav",
    "durationInFrames": 60
  },
  {
    "id": 46,
    "character": "zundamon",
    "text": "バイバイなのだ！",
    "scene": 8,
    "pauseAfter": 60,
    "emotion": "happy",
    "voiceFile": "46_zundamon.wav",
    "durationInFrames": 60
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
