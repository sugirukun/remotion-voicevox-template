import { useState, useRef } from 'react';
import type { ScriptLine, CharacterInfo } from '../../types';

interface ScriptRowProps {
  line: ScriptLine;
  characters: CharacterInfo[];
  startTime: number;
  endTime: number;
  onEdit: () => void;
  onDelete: () => void;
  onInsertAfter: () => void;
  onQuickUpdate: (field: keyof ScriptLine, value: number | string) => void;
}

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toFixed(1).padStart(4, '0');
  return `${m}:${s}`;
};

export function ScriptRow({ line, characters, startTime, endTime, onEdit, onDelete, onInsertAfter, onQuickUpdate }: ScriptRowProps) {
  const [editingField, setEditingField] = useState<'pauseAfter' | 'text' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const character = characters.find((c) => c.id === line.character);
  const characterName = character?.name || line.character;

  // Get character color
  const characterColor = line.character === 'zundamon' ? 'bg-green-100 text-green-800' :
                         line.character === 'metan' ? 'bg-pink-100 text-pink-800' :
                         'bg-gray-100 text-gray-800';

  // フレーム ↔ 秒 変換（fps=30, playbackRate=1.2）
  const FRAMES_PER_SEC = 36;
  const framesToSec = (frames: number) => (frames / FRAMES_PER_SEC).toFixed(1);
  const secToFrames = (sec: number) => Math.round(sec * FRAMES_PER_SEC);

  const startEditing = (field: 'pauseAfter' | 'text', e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingField(field);
    setEditValue(field === 'pauseAfter' ? framesToSec(line.pauseAfter) : String(line[field]));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && editingField !== 'text') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingField(null);
    }
  };

  const saveEdit = () => {
    if (editingField === 'pauseAfter') {
      const sec = parseFloat(editValue);
      if (!isNaN(sec) && sec >= 0) {
        onQuickUpdate(editingField, secToFrames(sec));
      }
    } else if (editingField === 'text') {
      if (editValue.trim()) {
        onQuickUpdate('text', editValue);
      }
    }
    setEditingField(null);
  };

  const playVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }
    const audio = new Audio(`/static/voices/${line.voiceFile}`);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      setIsPlaying(false);
      alert('音声ファイルが見つかりません');
    };
    audio.play();
    setIsPlaying(true);
  };

  const toggleCharacter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const chars = characters.map(c => c.id);
    const currentIdx = chars.indexOf(line.character);
    const nextIdx = (currentIdx + 1) % chars.length;
    onQuickUpdate('character', chars[nextIdx]);
  };

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={onEdit}>
      <td className="px-2 py-2 text-xs text-gray-400 tabular-nums whitespace-nowrap">
        <div>{formatTime(startTime)}</div>
        <div>{formatTime(endTime)}</div>
      </td>
      <td className="px-2 py-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <button
            onClick={playVoice}
            className={`w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 ${isPlaying ? 'text-blue-600' : 'text-gray-400'}`}
            title="音声を再生"
          >
            {isPlaying ? '■' : '▶'}
          </button>
          <span className="w-6 text-right">{line.id}</span>
        </div>
      </td>
      <td className="px-2 py-2" onClick={toggleCharacter}>
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer hover:opacity-80 ${characterColor}`}>
          {characterName}
        </span>
      </td>
      <td className="px-3 py-2 text-sm text-gray-900" onClick={(e) => startEditing('text', e)}>
        {editingField === 'text' ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => { if (e.key === 'Escape') setEditingField(null); }}
            className="w-full px-2 py-1 border border-blue-400 rounded text-sm resize-none"
            rows={2}
            autoFocus
          />
        ) : (
          <>
            <div className="max-w-md truncate hover:bg-blue-50 px-1 rounded">
              {line.displayText || line.text}
            </div>
            {line.displayText && (
              <div className="text-xs text-gray-400 truncate max-w-md">
                Voice: {line.text}
              </div>
            )}
          </>
        )}
      </td>
      <td className="px-2 py-2 text-xs text-gray-500">
        {line.visual?.type === 'image' && (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded truncate max-w-36" title={line.visual.src}>
            🖼️ {line.visual.src}
          </span>
        )}
        {line.visual?.type === 'text' && (
          <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded truncate max-w-36" title={line.visual.text}>
            📝 {line.visual.text?.split('\n')[0]}
          </span>
        )}
      </td>
      <td className="px-2 py-2 text-sm text-gray-400 text-right tabular-nums">
        {line.durationInFrames}
      </td>
      <td className="px-2 py-2 text-sm text-gray-500 text-right tabular-nums" onClick={(e) => startEditing('pauseAfter', e)}>
        {editingField === 'pauseAfter' ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            className="w-16 px-1 py-0 text-right border border-blue-400 rounded text-sm"
            autoFocus
            min={0}
            step={0.1}
          />
        ) : (
          <span className="cursor-pointer hover:bg-blue-100 px-1 rounded">{framesToSec(line.pauseAfter)}s</span>
        )}
      </td>
      <td className="px-2 py-2 text-sm">
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onInsertAfter}
            className="text-green-600 hover:text-green-800 font-bold text-base leading-none"
            title="この行の後に挿入"
          >+</button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700">Del</button>
        </div>
      </td>
    </tr>
  );
}
