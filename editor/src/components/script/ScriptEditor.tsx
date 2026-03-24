import { useState, useEffect } from 'react';
import type { ScriptLine, Metadata } from '../../types';

interface ScriptEditorProps {
  line: ScriptLine;
  metadata: Metadata;
  isNew: boolean;
  insertAfterId?: number;
  onSave: (data: Partial<ScriptLine>) => Promise<void>;
  onClose: () => void;
}

// fps=30, playbackRate=1.2
const FRAMES_PER_SEC = 36;
const framesToSec = (f: number) => (f / FRAMES_PER_SEC).toFixed(1);
const secToFrames = (s: string) => Math.round(parseFloat(s) * FRAMES_PER_SEC);

export function ScriptEditor({
  line,
  metadata,
  isNew,
  insertAfterId,
  onSave,
  onClose,
}: ScriptEditorProps) {
  const [formData, setFormData] = useState<ScriptLine>(line);
  const [pauseSecStr, setPauseSecStr] = useState(framesToSec(line.pauseAfter));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(line);
    setPauseSecStr(framesToSec(line.pauseAfter));
  }, [line]);

  const handleChange = (field: keyof ScriptLine, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVisualChange = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      visual: {
        ...prev.visual,
        type: prev.visual?.type || 'none',
        [field]: value,
      },
    }));
  };

  const handleSeChange = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      se: {
        ...prev.se,
        src: prev.se?.src || '',
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  const emotions = metadata.emotions[formData.character] || ['normal'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isNew
              ? insertAfterId !== undefined
                ? `Insert After #${insertAfterId}`
                : 'Add Script Line (末尾)'
              : `Edit Line #${line.id}`}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Character */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Character
            </label>
            <select
              value={formData.character}
              onChange={(e) => handleChange('character', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {metadata.characters.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name} ({char.id})
                </option>
              ))}
            </select>
          </div>

          {/* Text (for voice) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text (Voice)
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Voice generation text (use katakana for English)"
            />
          </div>

          {/* Display Text (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Text (optional)
            </label>
            <textarea
              value={formData.displayText || ''}
              onChange={(e) => handleChange('displayText', e.target.value || undefined)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Subtitle text (if different from voice)"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Scene */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scene
              </label>
              <input
                type="number"
                value={formData.scene}
                onChange={(e) => handleChange('scene', parseInt(e.target.value, 10))}
                min={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Emotion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emotion
              </label>
              <select
                value={formData.emotion || 'normal'}
                onChange={(e) => handleChange('emotion', e.target.value === 'normal' ? undefined : e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {emotions.map((emotion) => (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                ))}
              </select>
            </div>

            {/* Pause After */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                間（秒）
              </label>
              <input
                type="number"
                value={pauseSecStr}
                onChange={(e) => {
                  setPauseSecStr(e.target.value);
                  const frames = secToFrames(e.target.value);
                  if (!isNaN(frames) && frames >= 0) {
                    handleChange('pauseAfter', frames);
                  }
                }}
                min={0}
                step={0.1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Visual Content */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Content</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Type</label>
                <select
                  value={formData.visual?.type || 'none'}
                  onChange={(e) => handleVisualChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {metadata.visualTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Animation</label>
                <select
                  value={formData.visual?.animation || 'fadeIn'}
                  onChange={(e) => handleVisualChange('animation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {metadata.animations.map((anim) => (
                    <option key={anim} value={anim}>
                      {anim}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formData.visual?.type === 'image' && (
              <div className="mt-2">
                <label className="block text-xs text-gray-500 mb-1">Image Source</label>
                {metadata.contentImages && metadata.contentImages.length > 0 ? (
                  <select
                    value={formData.visual?.src || ''}
                    onChange={(e) => handleVisualChange('src', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">-- 画像を選択 --</option>
                    {metadata.contentImages.map((img) => (
                      <option key={img} value={img}>{img}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.visual?.src || ''}
                    onChange={(e) => handleVisualChange('src', e.target.value)}
                    placeholder="filename.png (in public/content/)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                )}
                {formData.visual?.src && (
                  <img
                    src={`/static/content/${formData.visual.src}`}
                    alt="preview"
                    className="mt-2 max-h-32 rounded border border-gray-200 object-contain"
                  />
                )}
              </div>
            )}

            {formData.visual?.type === 'video' && (
              <div className="mt-2 space-y-2">
                <label className="block text-xs text-gray-500 mb-1">動画クリップ（順番に再生）</label>

                {/* クリップ一覧 */}
                {(formData.visual.videos ?? (formData.visual.src ? [{ src: formData.visual.src, durationSec: 0 }] : [])).map((clip, idx) => {
                  const clips = formData.visual!.videos ?? (formData.visual!.src ? [{ src: formData.visual!.src, durationSec: 0 }] : []);
                  return (
                    <div key={idx} className="border border-gray-200 rounded-lg p-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
                        <select
                          value={clip.src}
                          onChange={(e) => {
                            const newClips = clips.map((c, i) => i === idx ? { ...c, src: e.target.value } : c);
                            handleVisualChange('videos', newClips);
                            handleVisualChange('src', undefined);
                          }}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="">-- 動画を選択 --</option>
                          {(metadata.contentVideos ?? []).map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!clip.src) return;
                            const res = await fetch(`/api/metadata/video-duration?src=${encodeURIComponent(clip.src)}`);
                            if (!res.ok) { alert('取得失敗'); return; }
                            const { duration } = await res.json();
                            const newClips = clips.map((c, i) => i === idx ? { ...c, durationSec: Math.round(duration * 10) / 10 } : c);
                            handleVisualChange('videos', newClips);
                            handleVisualChange('src', undefined);
                          }}
                          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 whitespace-nowrap"
                        >
                          長さ取得
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newClips = clips.filter((_, i) => i !== idx);
                            handleVisualChange('videos', newClips.length > 0 ? newClips : []);
                            handleVisualChange('src', undefined);
                          }}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          削除
                        </button>
                      </div>
                      {clip.src && (
                        <div className="text-xs text-gray-500 pl-5">
                          {clip.durationSec > 0 ? `⏱ ${clip.durationSec}秒` : '⚠️ 「長さ取得」を押してください'}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* 追加ボタン */}
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.visual!.videos ?? (formData.visual!.src ? [{ src: formData.visual!.src, durationSec: 0 }] : []);
                    handleVisualChange('videos', [...current, { src: '', durationSec: 0 }]);
                    handleVisualChange('src', undefined);
                  }}
                  className="w-full px-3 py-2 border-2 border-dashed border-purple-300 text-purple-600 text-sm rounded-lg hover:bg-purple-50"
                >
                  ＋ 動画を追加
                </button>

                {/* 合計長さに合わせる */}
                <button
                  type="button"
                  onClick={async () => {
                    const clips = formData.visual!.videos ?? [];
                    if (clips.length === 0) return;
                    const totalSec = clips.reduce((s, c) => s + c.durationSec, 0);
                    const speechFrames = formData.durationInFrames || 0;
                    const pauseFrames = Math.max(0, Math.round(totalSec * FRAMES_PER_SEC) - speechFrames);
                    setPauseSecStr((pauseFrames / FRAMES_PER_SEC).toFixed(1));
                    handleChange('pauseAfter', pauseFrames);
                  }}
                  className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                >
                  🎬 全動画の合計長さに合わせる（間を自動設定）
                </button>
                <p className="text-xs text-gray-400">動画ファイルを public/content/ に置いてください（.mp4 推奨）</p>
              </div>
            )}

            {formData.visual?.type === 'text' && (
              <div className="mt-2 space-y-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Visual Text（改行OK）</label>
                  <textarea
                    value={formData.visual?.text || ''}
                    onChange={(e) => handleVisualChange('text', e.target.value)}
                    placeholder="Text to display&#10;改行して複数行にできます"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                    <input
                      type="number"
                      value={formData.visual?.fontSize || 72}
                      onChange={(e) => handleVisualChange('fontSize', parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Color</label>
                    <input
                      type="color"
                      value={formData.visual?.color || '#ffffff'}
                      onChange={(e) => handleVisualChange('color', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sound Effect */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sound Effect</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">SE Source</label>
                <input
                  type="text"
                  value={formData.se?.src || ''}
                  onChange={(e) => handleSeChange('src', e.target.value)}
                  placeholder="filename.mp3 (in public/se/)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Volume (0-1)</label>
                <input
                  type="number"
                  value={formData.se?.volume || 1}
                  onChange={(e) => handleSeChange('volume', parseFloat(e.target.value))}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
