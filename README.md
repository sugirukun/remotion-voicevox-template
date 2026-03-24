# Remotion + VOICEVOX 動画テンプレート

ずんだもん＆めたんの掛け合い紹介動画を簡単に作成できるテンプレートです。

![デフォルトの黒板風デザイン](https://img.shields.io/badge/デザイン-黒板風-2d5a3d)
![解像度](https://img.shields.io/badge/解像度-1920x1080-blue)
![フレームレート](https://img.shields.io/badge/FPS-30-green)

## 特徴

- **対話的な動画作成** - Claude Codeと会話しながら動画を作成
- **自動音声生成** - VOICEVOXで高品質な音声を自動生成
- **口パクアニメーション** - キャラクターが自然に話しているように見える
- **表情差分対応** - happy, surprised, thinking, sad などの表情切り替え
- **BGM・効果音対応** - 場面に合わせた音声演出
- **動画埋め込み対応** - スクリーンレコーディングなどの動画を黒板エリアに埋め込み再生
- **複数動画クリップ連結** - 複数の動画ファイルを1つのセリフにシームレスに繋げて再生
- **動画内字幕** - 動画再生中に時刻指定で字幕を重ねて表示
- **カスタマイズ可能** - YAMLファイルでフォント、色、レイアウトを簡単変更

---

## クイックスタート

### 1. 必要なもの

| ソフト | 説明 |
|--------|------|
| [Node.js 18+](https://nodejs.org/) | JavaScript実行環境 |
| [VOICEVOX](https://voicevox.hiroshiba.jp/) | 無料の音声合成ソフト |
| [Claude Code](https://claude.ai/code) | 対話的に動画を作成（推奨） |

### 2. セットアップ

```bash
git clone https://github.com/nyanko3141592/remotion-voicevox-template.git my-video
cd my-video
npm install
```

### 3. VOICEVOXを起動

VOICEVOXアプリを起動しておいてください（音声生成に必要）。

### 4. プレビューサーバーを起動

```bash
npm start
```

ブラウザで http://localhost:3000 を開くとプレビューが表示されます。
デモ用のセリフと音声が含まれているので、すぐに動作確認できます。

### 5. 動画を作成（Claude Code使用時）

```bash
claude  # 別ターミナルでClaude Codeを起動
```

Claude Codeに話しかけるだけ：

```
「〇〇の紹介動画を作りたい」
```

---

## 作業フロー

```
┌─────────────────────────────────────────────────────────────────┐
│                         準備                                    │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                 │
│  │ Node.js  │    │ VOICEVOX │    │  Claude  │                 │
│  │ インストール│    │   起動   │    │   起動   │                 │
│  └──────────┘    └──────────┘    └──────────┘                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. セリフ作成                                                   │
│     「〇〇の紹介動画を作りたい」                                  │
│                              │                                  │
│                              ▼                                  │
│     Claude がセリフを自動生成 → src/data/script.ts               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. 音声生成                                                     │
│     「音声を生成して」                                            │
│                              │                                  │
│                              ▼                                  │
│     VOICEVOX API で音声生成 → public/voices/*.wav               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. プレビュー・修正                                              │
│     「プレビュー見せて」                                          │
│                              │                                  │
│              ┌───────────────┴───────────────┐                  │
│              ▼                               ▼                  │
│         問題なし                          修正あり               │
│              │                    「ID 3のセリフを変えて」        │
│              │                               │                  │
│              │                               ▼                  │
│              │                    セリフ修正 → 音声再生成         │
│              │                               │                  │
│              └───────────────┬───────────────┘                  │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. 動画出力                                                     │
│     「動画を出力して」                                            │
│                              │                                  │
│                              ▼                                  │
│     Remotion でレンダリング → out/video.mp4  🎉                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## よく使う指示

| やりたいこと | 指示の例 |
|-------------|---------|
| 新規作成 | 「〇〇の紹介動画を作って」 |
| セリフ修正 | 「ID 3のセリフを変更して」 |
| 発音修正 | 「GitHubをギットハブって発音して」 |
| 音声生成 | 「音声を生成して」 |
| プレビュー | 「プレビュー見せて」 |
| 動画出力 | 「動画を出力して」 |

---

## コマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm start` | プレビュー（http://localhost:3000） |
| `npm run voices` | 音声生成 |
| `npm run build` | 動画出力（out/video.mp4） |
| `npm run init` | 新規プロジェクト初期化 |
| `npm run editor` | GUIエディター起動（http://localhost:3001） |
| `npm run editor:install` | GUIエディターの依存関係インストール（初回のみ） |

---

## GUIエディター

ブラウザからスクリプトをリアルタイム編集できます。

```bash
npm run editor:install  # 初回のみ
npm run editor          # 起動
```

- **エディター**: http://localhost:3001
- **API**: http://localhost:3002

### Script画面の機能

| 機能 | 説明 |
|------|------|
| 行の追加 | 各行の **+** ボタンで直後に挿入（全ID自動再採番） |
| 行の編集 | 行クリックで編集モーダルを開く |
| 行の削除 | Del ボタンで削除 |
| タイム列 | 各行の開始→終了時刻を秒単位で表示 |
| 間（秒） | pauseAfter を秒単位で入力（フレーム換算は自動） |
| 画像選択 | `public/content/` 内の画像をドロップダウンで選択＋プレビュー表示 |
| 動画クリップ管理 | 動画ファイル（.mp4/.mov/.webm）を複数追加・並べ替え、「長さ取得」で再生時間を自動入力 |
| 合計長さ合わせ | 「🎬 全動画の合計長さに合わせる」ボタンで pauseAfter を自動計算 |
| 自動sync | 保存時に `sync-script` を自動実行 → Remotionプレビューに即反映 |

### 行の途中に挿入する

各行の右端にある **+** ボタンをクリックすると、その行の直後に新しい行を挿入できます。
全IDは挿入後に自動で再採番されます。

---

## キャラクター画像

`video-settings.yaml`で`useImages: true`に設定し、画像を配置：

```
public/images/
├── zundamon/
│   ├── mouth_open.png   # 口開き（必須）
│   ├── mouth_close.png  # 口閉じ（必須）
│   ├── happy_open.png   # 表情差分（任意）
│   └── ...
└── metan/
    └── ...
```

画像がない場合はプレースホルダーが表示されます。

---

## カスタマイズ

`video-settings.yaml`でスタイルを変更できます：

```yaml
font:
  family: "Noto Sans JP"
  size: 48
  color: "#ffffff"

character:
  height: 367
  useImages: true

colors:
  zundamon: "#228B22"
  metan: "#FF1493"
```

---

## 字幕・ビジュアル機能

### 字幕の改行・切り替え

`displayText` に `\n` を入れると、セリフの再生時間に合わせて字幕が段階的に切り替わります。

```yaml
# config/script.yaml
- id: 5
  text: "まず設定画面を開いて、次にVPNをオンにするのだ！"
  displayText: "まず設定画面を開いて\n次にVPNをオンにするのだ！"
```

セリフ前半で1行目、後半で2行目が表示されます。

### ビジュアルの持続表示

`visual` を設定した行が終わっても、次に別の `visual` が来るまで画像・テキストは表示され続けます（`lastVisual`）。
セリフ数行にわたって同じ画像を表示したい場合、最初の行にだけ `visual` を設定すれば十分です。

### 画像の表示

`public/content/` 内の画像を黒板エリア全体に `contain` で表示します。

```yaml
visual:
  type: image
  src: screenshot.png   # public/content/ 内のファイル名
  animation: fadeIn
```

### 動画の埋め込み

`public/content/` に `.mp4` ファイルを置いて、`visual` で指定します。
動画再生中はキャラクターが黒板下の余白エリアに自動で縮小移動します。

```yaml
visual:
  type: video
  animation: fadeIn
  videos:
    - src: demo1.mp4
      durationSec: 30
    - src: demo2.mp4
      durationSec: 45
```

複数クリップは `videos` 配列に追加すると自動で繋がります。

#### 動画内字幕

動画の特定時刻に字幕を重ねて表示できます：

```yaml
visual:
  type: video
  videos:
    - src: demo.mp4
      durationSec: 60
  captions:
    - startSec: 0
      endSec: 5
      text: ここがポイントです
    - startSec: 10
      endSec: 20
      text: 複数クリップの場合は\n累積秒数で指定します
```

> **エディターで設定する場合**：Visual Content タブで動画ファイルを追加 → 「長さ取得」で自動入力 → 「🎬 全動画の合計長さに合わせる」でセリフ時間を自動調整。

> **変換について**：`.mov` は Chrome で再生できないため、`ffmpeg -i input.mov output.mp4` で変換してから使用してください。

---

## BGM・効果音

効果音を追加して動画をより魅力的に：

```typescript
// セリフに効果音を追加
{
  text: "ここがポイントなのだ！",
  se: { src: "point.mp3", volume: 0.8 },
}
```

効果音の入手方法は **[効果音ガイド](./docs/sound-effects-guide.md)** を参照してください。

---

## 新しい動画を作る流れ

### ブランチで作る（推奨）

動画ごとにブランチを切ると、**動画を作りながらテンプレートも育てられます**。

```bash
# 1. このリポジトリをclone（初回のみ）
git clone https://github.com/sugirukun/remotion-voicevox-template.git
cd remotion-voicevox-template
npm install
npm run editor:install
```

```bash
# 2. 動画ごとにブランチを切る
git checkout master
git checkout -b my-new-video
```

```bash
# 3. セリフ・画像を追加して動画を作る
npm run editor   # GUIエディターで編集
npm run voices   # 音声生成
npm start        # プレビュー確認
npm run build    # 動画出力
```

```bash
# 4. 動画完成後、テンプレートへ機能を還元する
#    （新機能・エディター改善などをmasterにマージ）
git checkout master
git merge my-new-video --no-ff
#    コンテンツ（セリフ・画像）はリセットしてmasterをクリーンに保つ
```

**ブランチ戦略のイメージ：**

```
master（テンプレート）─────────────────────────► 育ち続ける
        │                          ↑
        ├─► video-1ブランチ ───────┘ 機能だけ還元
        │
        ├─► video-2ブランチ ───────┘ 機能だけ還元
        │
        └─► video-3ブランチ（制作中）
```

動画を作るたびにテンプレートが進化していく形です。

---

### シンプルに使う場合

毎回cloneして独立したフォルダで作業することもできます。

```bash
git clone https://github.com/sugirukun/remotion-voicevox-template.git 動画タイトル
cd 動画タイトル
npm install && npm run editor:install
npm run editor   # GUIエディターでセリフ編集
npm run voices   # 音声生成
npm run build    # 動画出力（out/video.mp4）
```

キャラクター画像（ずんだもん・めたん・つむぎ）と設定は最初から含まれているので、セリフを書くだけで動画が作れます。

---

## 詳しい使い方

詳細は **[CLAUDE.md](./CLAUDE.md)** を参照してください。

---

## ライセンス

MIT License

キャラクター（ずんだもん・四国めたん）の利用規約は各公式サイトをご確認ください。
