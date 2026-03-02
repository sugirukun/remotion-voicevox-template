import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { exec } from 'child_process';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const SCRIPT_YAML_PATH = path.join(ROOT_DIR, 'config', 'script.yaml');

function syncScript() {
  exec('npm run sync-script', { cwd: ROOT_DIR }, (err) => {
    if (err) console.error('sync-script failed:', err.message);
  });
}
const DEFAULTS_YAML_PATH = path.join(ROOT_DIR, 'config', 'defaults.yaml');
const DURATIONS_PATH = path.join(ROOT_DIR, 'public', 'voices', 'durations.json');

export interface ScriptLine {
  id: number;
  character: string;
  text: string;
  displayText?: string;
  scene: number;
  voiceFile?: string;
  durationInFrames?: number;
  pauseAfter: number;
  emotion?: string;
  visual?: {
    type: "image" | "text" | "none";
    src?: string;
    text?: string;
    fontSize?: number;
    color?: string;
    animation?: string;
  };
  se?: {
    src: string;
    volume?: number;
  };
}

interface Defaults {
  newLine: {
    character: string;
    pauseAfter: number;
    durationInFrames: number;
    scene: number;
  };
  automation: {
    voiceOnSave: boolean;
    autoVoiceFileName: boolean;
  };
}

function loadDefaults(): Defaults {
  const content = fs.readFileSync(DEFAULTS_YAML_PATH, 'utf-8');
  return yaml.parse(content);
}

function loadDurations(): Record<string, number> {
  if (fs.existsSync(DURATIONS_PATH)) {
    const content = fs.readFileSync(DURATIONS_PATH, 'utf-8');
    return JSON.parse(content);
  }
  return {};
}

function processLine(line: ScriptLine, defaults: Defaults, durations: Record<string, number>): ScriptLine {
  const voiceFile = `${String(line.id).padStart(2, '0')}_${line.character}.wav`;
  const durationInFrames = durations[voiceFile] || defaults.newLine.durationInFrames;

  return {
    ...line,
    voiceFile,
    durationInFrames,
    pauseAfter: line.pauseAfter ?? defaults.newLine.pauseAfter,
  };
}

export function getScript(): ScriptLine[] {
  const content = fs.readFileSync(SCRIPT_YAML_PATH, 'utf-8');
  const rawScript: ScriptLine[] = yaml.parse(content) || [];
  const defaults = loadDefaults();
  const durations = loadDurations();

  return rawScript.map(line => processLine(line, defaults, durations));
}

export function getScriptLine(id: number): ScriptLine | undefined {
  const script = getScript();
  return script.find(line => line.id === id);
}

export function updateScriptLine(id: number, data: Partial<ScriptLine>): ScriptLine {
  const content = fs.readFileSync(SCRIPT_YAML_PATH, 'utf-8');
  const script: ScriptLine[] = yaml.parse(content) || [];

  const index = script.findIndex(line => line.id === id);
  if (index === -1) {
    throw new Error(`Script line with id ${id} not found`);
  }

  // Update only allowed fields (don't store computed fields)
  const { voiceFile, durationInFrames, ...updateData } = data;
  script[index] = { ...script[index], ...updateData, id };

  // Write back to YAML
  const yamlContent = yaml.stringify(script, { lineWidth: 0 });
  fs.writeFileSync(SCRIPT_YAML_PATH, `# スクリプトデータ\n# 編集後 npm run sync-script で反映\n\n${yamlContent}`);
  syncScript();

  // Return processed line
  const defaults = loadDefaults();
  const durations = loadDurations();
  return processLine(script[index], defaults, durations);
}

export function createScriptLine(data: Omit<ScriptLine, 'id'>, insertAfterId?: number): ScriptLine {
  const content = fs.readFileSync(SCRIPT_YAML_PATH, 'utf-8');
  const script: ScriptLine[] = yaml.parse(content) || [];
  const defaults = loadDefaults();

  const newLine: ScriptLine = {
    id: 0, // Will be renumbered below
    character: data.character || defaults.newLine.character,
    text: data.text || '',
    scene: data.scene ?? defaults.newLine.scene,
    pauseAfter: data.pauseAfter ?? defaults.newLine.pauseAfter,
  };

  // Add optional fields if present
  if (data.displayText) newLine.displayText = data.displayText;
  if (data.emotion) newLine.emotion = data.emotion;
  if (data.visual) newLine.visual = data.visual;
  if (data.se) newLine.se = data.se;

  // Insert at position or append
  if (insertAfterId !== undefined) {
    const insertIdx = script.findIndex(line => line.id === insertAfterId);
    if (insertIdx !== -1) {
      script.splice(insertIdx + 1, 0, newLine);
    } else {
      script.push(newLine);
    }
  } else {
    script.push(newLine);
  }

  // Renumber all lines sequentially
  script.forEach((line, i) => { line.id = i + 1; });
  const savedLine = script.find(l => l.character === newLine.character && l.text === newLine.text && l.scene === newLine.scene) || script[script.length - 1];

  // Write back to YAML
  const yamlContent = yaml.stringify(script, { lineWidth: 0 });
  fs.writeFileSync(SCRIPT_YAML_PATH, `# スクリプトデータ\n# 編集後 npm run sync-script で反映\n\n${yamlContent}`);
  syncScript();

  // Return processed line
  const durations = loadDurations();
  return processLine(savedLine, defaults, durations);
}

export function deleteScriptLine(id: number): void {
  const content = fs.readFileSync(SCRIPT_YAML_PATH, 'utf-8');
  const script: ScriptLine[] = yaml.parse(content) || [];

  const index = script.findIndex(line => line.id === id);
  if (index === -1) {
    throw new Error(`Script line with id ${id} not found`);
  }

  script.splice(index, 1);

  // Write back to YAML
  const yamlContent = yaml.stringify(script, { lineWidth: 0 });
  fs.writeFileSync(SCRIPT_YAML_PATH, `# スクリプトデータ\n# 編集後 npm run sync-script で反映\n\n${yamlContent}`);
  syncScript();
}

export function reorderScript(ids: number[]): ScriptLine[] {
  const content = fs.readFileSync(SCRIPT_YAML_PATH, 'utf-8');
  const script: ScriptLine[] = yaml.parse(content) || [];
  const defaults = loadDefaults();
  const durations = loadDurations();

  // Create a map of id to script line
  const scriptMap = new Map(script.map(line => [line.id, line]));

  // Reorder based on provided ids
  const reordered: ScriptLine[] = [];
  for (const id of ids) {
    const line = scriptMap.get(id);
    if (line) {
      reordered.push(line);
    }
  }

  // Add any remaining lines
  for (const line of script) {
    if (!ids.includes(line.id)) {
      reordered.push(line);
    }
  }

  // Write back to YAML
  const yamlContent = yaml.stringify(reordered, { lineWidth: 0 });
  fs.writeFileSync(SCRIPT_YAML_PATH, `# スクリプトデータ\n# 編集後 npm run sync-script で反映\n\n${yamlContent}`);

  return reordered.map(line => processLine(line, defaults, durations));
}
