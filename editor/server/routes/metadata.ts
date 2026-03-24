import { Router, Request, Response } from 'express';
import { execSync } from 'child_process';
import * as path from 'path';
import {
  getCharacters,
  getEmotions,
  getAnimations,
  getContentImages,
  getContentVideos,
  getAllMetadata,
} from '../services/metadataService.js';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'public', 'content');

export const metadataRouter = Router();

// GET /api/metadata/all - Get all metadata (for Claude Code)
metadataRouter.get('/all', (_req: Request, res: Response) => {
  try {
    const metadata = getAllMetadata();
    res.json(metadata);
  } catch (error) {
    console.error('Error getting metadata:', error);
    res.status(500).json({ error: 'Failed to get metadata' });
  }
});

// GET /api/metadata/characters - Get available characters
metadataRouter.get('/characters', (_req: Request, res: Response) => {
  try {
    const characters = getCharacters();
    res.json(characters);
  } catch (error) {
    console.error('Error getting characters:', error);
    res.status(500).json({ error: 'Failed to get characters' });
  }
});

// GET /api/metadata/emotions/:characterId - Get emotions for a character
metadataRouter.get('/emotions/:characterId', (req: Request, res: Response) => {
  try {
    const { characterId } = req.params;
    const emotions = getEmotions(characterId);
    res.json(emotions);
  } catch (error) {
    console.error('Error getting emotions:', error);
    res.status(500).json({ error: 'Failed to get emotions' });
  }
});

// GET /api/metadata/animations - Get available animations
metadataRouter.get('/animations', (_req: Request, res: Response) => {
  try {
    const animations = getAnimations();
    res.json(animations);
  } catch (error) {
    console.error('Error getting animations:', error);
    res.status(500).json({ error: 'Failed to get animations' });
  }
});

// GET /api/metadata/content-images - List images in public/content/
metadataRouter.get('/content-images', (_req: Request, res: Response) => {
  try {
    res.json(getContentImages());
  } catch (error) {
    console.error('Error getting content images:', error);
    res.status(500).json({ error: 'Failed to get content images' });
  }
});

// GET /api/metadata/content-videos - List videos in public/content/
metadataRouter.get('/content-videos', (_req: Request, res: Response) => {
  try {
    res.json(getContentVideos());
  } catch (error) {
    console.error('Error getting content videos:', error);
    res.status(500).json({ error: 'Failed to get content videos' });
  }
});

// GET /api/metadata/video-duration?src=filename - Get video duration in seconds
metadataRouter.get('/video-duration', (req: Request, res: Response) => {
  try {
    const src = req.query.src as string;
    if (!src) return res.status(400).json({ error: 'src is required' });
    const filePath = path.join(CONTENT_DIR, path.basename(src));
    const result = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`
    ).toString().trim();
    const duration = parseFloat(result);
    if (isNaN(duration)) return res.status(500).json({ error: 'Could not parse duration' });
    res.json({ duration });
  } catch (error) {
    console.error('Error getting video duration:', error);
    res.status(500).json({ error: 'Failed to get video duration' });
  }
});
