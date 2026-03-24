// アニメーションの型定義
export type AnimationType = "none" | "fadeIn" | "slideUp" | "slideLeft" | "zoomIn" | "bounce";

// 動画字幕
export interface VideoCaption {
  startSec: number;
  endSec: number;
  text: string;
}

// 動画クリップ
export interface VideoClip {
  src: string;
  durationSec: number;
}

// ビジュアルの型定義
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

// セリフデータの型定義
export interface ScriptLine {
  id: number;
  character: string;
  text: string;
  displayText?: string;
  scene: number;
  voiceFile: string;
  durationInFrames: number;
  pauseAfter: number;
  emotion?: string;
  visual?: VisualContent;
  se?: SoundEffect;
}

// キャラクター情報
export interface CharacterInfo {
  id: string;
  name: string;
  speakerId: number | null;
}

// メタデータ
export interface Metadata {
  characters: CharacterInfo[];
  emotions: Record<string, string[]>;
  animations: string[];
  visualTypes: string[];
  contentImages: string[];
  contentVideos: string[];
}

// video-settings.yaml の型定義
export interface VideoSettings {
  font: {
    family: string;
    size: number;
    weight: string;
    color: string;
    outlineColor: string;
    innerOutlineColor: string;
  };
  subtitle: {
    bottomOffset: number;
    maxWidthPercent: number;
    maxWidthPixels: number;
    outlineWidth: number;
    innerOutlineWidth: number;
  };
  character: {
    height: number;
    useImages: boolean;
    imagesBasePath: string;
  };
  content: {
    topPadding: number;
    sidePadding: number;
    bottomPadding: number;
  };
  video: {
    width: number;
    height: number;
    fps: number;
    playbackRate: number;
  };
  colors: Record<string, string>;
}
