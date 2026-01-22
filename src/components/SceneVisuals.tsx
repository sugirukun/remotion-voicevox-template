import { interpolate } from "remotion";
import { COLORS } from "../config";
import { scenes } from "../data/script";

interface SceneVisualsProps {
  scene: number;
  lineId: number | null;
  frame: number;
  fps: number;
}

export const SceneVisuals: React.FC<SceneVisualsProps> = ({
  scene,
  lineId,
  frame,
  fps,
}) => {
  const sceneInfo = scenes.find((s) => s.id === scene) || scenes[0];

  // 中央コンテンツ用のコンテナスタイル（黒板内に収まるよう調整）
  const centerContainer: React.CSSProperties = {
    position: "absolute",
    top: 60,      // 黒板上端 + 余白
    left: 80,     // 黒板左端 + 余白
    right: 80,    // 黒板右端 + 余白
    bottom: 180,  // 黒板下端 + 余白
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  switch (scene) {
    case 1:
      return <Scene1Visuals frame={frame} fps={fps} lineId={lineId} centerContainer={centerContainer} />;
    case 2:
      return <Scene2Visuals frame={frame} fps={fps} lineId={lineId} centerContainer={centerContainer} />;
    case 3:
      return <Scene3Visuals frame={frame} fps={fps} lineId={lineId} centerContainer={centerContainer} />;
    default:
      return (
        <div style={centerContainer}>
          <div style={{ fontSize: 64, color: COLORS.text }}>
            {sceneInfo.title}
          </div>
        </div>
      );
  }
};

// シーン1: オープニング
const Scene1Visuals = ({
  frame,
  fps,
  lineId,
  centerContainer,
}: {
  frame: number;
  fps: number;
  lineId: number | null;
  centerContainer: React.CSSProperties;
}) => {
  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ ...centerContainer, flexDirection: "column", gap: 20, opacity }}>
      <div style={{ fontSize: 72, fontWeight: "bold", color: COLORS.primary }}>
        タイトルをここに
      </div>
      <div style={{ fontSize: 36, color: COLORS.textMuted }}>
        サブタイトル
      </div>
    </div>
  );
};

// シーン2: メインコンテンツ
const Scene2Visuals = ({
  frame,
  fps,
  lineId,
  centerContainer,
}: {
  frame: number;
  fps: number;
  lineId: number | null;
  centerContainer: React.CSSProperties;
}) => {
  return (
    <div style={{ ...centerContainer, flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.text }}>
        メインコンテンツ
      </div>
      <div style={{ fontSize: 36, color: COLORS.textMuted }}>
        ここに説明やデモを表示
      </div>
    </div>
  );
};

// シーン3: エンディング
const Scene3Visuals = ({
  frame,
  fps,
  lineId,
  centerContainer,
}: {
  frame: number;
  fps: number;
  lineId: number | null;
  centerContainer: React.CSSProperties;
}) => {
  return (
    <div style={{ ...centerContainer, flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 64, fontWeight: "bold", color: COLORS.success }}>
        ありがとうございました！
      </div>
      <div style={{ fontSize: 36, color: COLORS.textMuted }}>
        チャンネル登録・高評価よろしくね
      </div>
    </div>
  );
};
