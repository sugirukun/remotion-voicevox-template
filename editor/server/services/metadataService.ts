import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images');
const CONFIG_PATH = path.join(ROOT_DIR, 'src', 'config.ts');

export interface CharacterInfo {
  id: string;
  name: string;
  speakerId: number | null;
}

export interface Metadata {
  characters: CharacterInfo[];
  emotions: Record<string, string[]>;
  animations: string[];
  visualTypes: string[];
}

// Known character configurations
const KNOWN_CHARACTERS: Record<string, { name: string; speakerId: number | null }> = {
  zundamon: { name: 'ずんだもん', speakerId: 3 },
  metan: { name: '四国めたん', speakerId: 2 },
  kuro_zunda: { name: 'くろずんだ', speakerId: null },
};

// Animation types
const ANIMATIONS = ['none', 'fadeIn', 'slideUp', 'slideLeft', 'zoomIn', 'bounce'];

// Visual types
const VISUAL_TYPES = ['none', 'image', 'text'];

// Scan character folders to detect available characters
function scanCharacters(): CharacterInfo[] {
  const characters: CharacterInfo[] = [];

  if (!fs.existsSync(IMAGES_DIR)) {
    return characters;
  }

  const dirs = fs.readdirSync(IMAGES_DIR).filter((name) => {
    const stat = fs.statSync(path.join(IMAGES_DIR, name));
    return stat.isDirectory() && !name.startsWith('.');
  });

  for (const dir of dirs) {
    const known = KNOWN_CHARACTERS[dir];
    characters.push({
      id: dir,
      name: known?.name || dir,
      speakerId: known?.speakerId ?? null,
    });
  }

  return characters;
}

// Scan available emotions (image files) for each character
function scanEmotions(): Record<string, string[]> {
  const emotions: Record<string, string[]> = {};

  if (!fs.existsSync(IMAGES_DIR)) {
    return emotions;
  }

  const dirs = fs.readdirSync(IMAGES_DIR).filter((name) => {
    const stat = fs.statSync(path.join(IMAGES_DIR, name));
    return stat.isDirectory() && !name.startsWith('.');
  });

  for (const dir of dirs) {
    const charDir = path.join(IMAGES_DIR, dir);
    const files = fs.readdirSync(charDir).filter(f => f.endsWith('.png'));

    // Extract emotion names from files
    // Expected format: {emotion}_open.png, {emotion}_close.png, or mouth_open.png, mouth_close.png
    const emotionSet = new Set<string>();

    for (const file of files) {
      const baseName = file.replace('.png', '');

      // Handle standard mouth_open/mouth_close as "normal"
      if (baseName === 'mouth_open' || baseName === 'mouth_close') {
        emotionSet.add('normal');
      } else {
        // Handle {emotion}_open or {emotion}_close
        const match = baseName.match(/^(.+)_(open|close)$/);
        if (match) {
          emotionSet.add(match[1]);
        }
      }
    }

    emotions[dir] = Array.from(emotionSet);
  }

  return emotions;
}

export function getCharacters(): CharacterInfo[] {
  return scanCharacters();
}

export function getEmotions(characterId: string): string[] {
  const all = scanEmotions();
  return all[characterId] || ['normal'];
}

export function getAnimations(): string[] {
  return ANIMATIONS;
}

export function getVisualTypes(): string[] {
  return VISUAL_TYPES;
}

export function getAllMetadata(): Metadata {
  return {
    characters: scanCharacters(),
    emotions: scanEmotions(),
    animations: ANIMATIONS,
    visualTypes: VISUAL_TYPES,
  };
}
