import { Img, OffthreadVideo, Sequence, staticFile, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../config";
import { VisualContent, AnimationType } from "../data/script";

interface SceneVisualsProps {
  scene: number;
  lineId: number | null;
  frame: number;
  fps: number;
  visual?: VisualContent;
  lineStartFrame?: number;
}

// アニメーションスタイルを計算
const useAnimationStyle = (
  frame: number,
  fps: number,
  animation: AnimationType = "fadeIn"
): React.CSSProperties => {
  const progress = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const springProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  switch (animation) {
    case "none":
      return { opacity: 1 };

    case "fadeIn":
      return { opacity: progress };

    case "slideUp":
      return {
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [50, 0])}px)`,
      };

    case "slideLeft":
      return {
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`,
      };

    case "zoomIn":
      return {
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
      };

    case "bounce":
      return {
        opacity: Math.min(1, frame / (fps * 0.1)),
        transform: `scale(${springProgress})`,
      };

    default:
      return { opacity: progress };
  }
};

export const SceneVisuals: React.FC<SceneVisualsProps> = ({
  scene,
  lineId,
  frame,
  fps,
  visual,
  lineStartFrame = 0,
}) => {
  const animationStyle = useAnimationStyle(frame, fps, visual?.animation);

  // コンテンツコンテナ（黒板内に収まるよう調整）
  const contentContainer: React.CSSProperties = {
    position: "absolute",
    top: 60,
    left: 80,
    right: 80,
    bottom: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...animationStyle,
  };

  // ビジュアルがない場合はデフォルト表示
  if (!visual || visual.type === "none") {
    return null;
  }

  // 画像表示（黒板と同じ座標に合わせる）
  if (visual.type === "image" && visual.src) {
    return (
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          right: 60,
          bottom: 160,
          overflow: "hidden",
          borderRadius: 8,
          ...animationStyle,
        }}
      >
        <Img
          src={staticFile(`content/${visual.src}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  // 動画表示（複数クリップ対応）
  if (visual.type === "video") {
    // videos配列 or 後方互換 src を統一して扱う
    const clips = visual.videos && visual.videos.length > 0
      ? visual.videos
      : visual.src
        ? [{ src: visual.src, durationSec: 999999 }]
        : [];

    if (clips.length === 0) return null;

    const videoRelativeSec = (frame - lineStartFrame) / fps;

    // アクティブなクリップを特定
    let cumSec = 0;
    let activeClip: { src: string; durationSec: number } | null = null;
    let clipStartSec = 0;
    for (const clip of clips) {
      if (videoRelativeSec >= cumSec && videoRelativeSec < cumSec + clip.durationSec) {
        activeClip = clip;
        clipStartSec = cumSec;
        break;
      }
      cumSec += clip.durationSec;
    }

    const activeCaption = visual.captions?.find(
      (c) => videoRelativeSec >= c.startSec && videoRelativeSec < c.endSec
    );

    const clipStartFrame = lineStartFrame + Math.round(clipStartSec * fps);

    return (
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          right: 60,
          bottom: 160,
          overflow: "hidden",
          borderRadius: 8,
          ...animationStyle,
        }}
      >
        {activeClip && (
          <Sequence from={clipStartFrame}>
            <OffthreadVideo
              src={staticFile(`content/${activeClip.src}`)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Sequence>
        )}
        {activeCaption && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 16,
              right: 16,
              background: "rgba(0,0,0,0.65)",
              borderRadius: 6,
              padding: "10px 16px",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
          >
            {activeCaption.text}
          </div>
        )}
      </div>
    );
  }

  // テキスト表示
  if (visual.type === "text" && visual.text) {
    return (
      <div style={contentContainer}>
        <div
          style={{
            fontSize: visual.fontSize || 64,
            fontWeight: "bold",
            color: visual.color || COLORS.text,
            textAlign: "center",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {visual.text}
        </div>
      </div>
    );
  }

  return null;
};
