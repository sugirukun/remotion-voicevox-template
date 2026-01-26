import { useState } from 'react';
import type { ScriptLine, CharacterInfo } from '../../types';

interface ScriptRowProps {
  line: ScriptLine;
  characters: CharacterInfo[];
  onEdit: () => void;
  onDelete: () => void;
  onQuickUpdate: (field: keyof ScriptLine, value: number) => void;
}

export function ScriptRow({ line, characters, onEdit, onDelete, onQuickUpdate }: ScriptRowProps) {
  const [editingField, setEditingField] = useState<'pauseAfter' | null>(null);
  const [editValue, setEditValue] = useState('');

  const character = characters.find((c) => c.id === line.character);
  const characterName = character?.name || line.character;

  // Get character color
  const characterColor = line.character === 'zundamon' ? 'bg-green-100 text-green-800' :
                         line.character === 'metan' ? 'bg-pink-100 text-pink-800' :
                         'bg-gray-100 text-gray-800';

  const startEditing = (field: 'pauseAfter', e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingField(field);
    setEditValue(String(line[field]));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingField(null);
    }
  };

  const saveEdit = () => {
    if (editingField) {
      const value = parseInt(editValue, 10);
      if (!isNaN(value) && value >= 0) {
        onQuickUpdate(editingField, value);
      }
    }
    setEditingField(null);
  };

  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={onEdit}>
      <td className="px-3 py-2 text-sm text-gray-500">
        {line.id}
      </td>
      <td className="px-3 py-2">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${characterColor}`}>
          {characterName}
        </span>
      </td>
      <td className="px-3 py-2 text-sm text-gray-900">
        <div className="max-w-md truncate">
          {line.displayText || line.text}
        </div>
        {line.displayText && (
          <div className="text-xs text-gray-400 truncate max-w-md">
            Voice: {line.text}
          </div>
        )}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 text-center">
        {line.scene}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500">
        {line.emotion || '-'}
      </td>
      <td className="px-3 py-2 text-sm text-gray-400 text-right tabular-nums">
        {line.durationInFrames}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 text-right tabular-nums" onClick={(e) => startEditing('pauseAfter', e)}>
        {editingField === 'pauseAfter' ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            className="w-14 px-1 py-0 text-right border border-blue-400 rounded text-sm"
            autoFocus
            min={0}
          />
        ) : (
          <span className="cursor-pointer hover:bg-blue-100 px-1 rounded">{line.pauseAfter}</span>
        )}
      </td>
      <td className="px-3 py-2 text-sm">
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            Del
          </button>
        </div>
      </td>
    </tr>
  );
}
