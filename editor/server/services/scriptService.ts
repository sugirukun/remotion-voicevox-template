import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const SCRIPT_PATH = path.join(ROOT_DIR, 'src', 'data', 'script.ts');

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

// Parse scriptData from TypeScript file
function parseScriptData(content: string): ScriptLine[] {
  // Extract the scriptData array
  const match = content.match(/export const scriptData:\s*ScriptLine\[\]\s*=\s*(\[[\s\S]*?\]);(?=\s*(?:\/\/|export|$))/);
  if (!match) {
    throw new Error('Could not find scriptData in script.ts');
  }

  const arrayStr = match[1];

  // Convert to valid JSON by handling:
  // 1. Remove comments
  // 2. Add quotes to unquoted keys
  // 3. Handle trailing commas
  let jsonStr = arrayStr
    // Remove single-line comments
    .replace(/\/\/[^\n]*/g, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Quote unquoted keys (matches word characters before colons)
    .replace(/(\s*)(\w+)(\s*:\s*)/g, '$1"$2"$3')
    // Remove trailing commas before } or ]
    .replace(/,(\s*[}\]])/g, '$1');

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Fallback: use eval in a safe way
    const evalStr = `(${arrayStr})`;
    return eval(evalStr);
  }
}

// Serialize scriptData back to TypeScript format
function serializeScriptData(data: ScriptLine[]): string {
  const lines = data.map((item, index) => {
    const entries: string[] = [];

    entries.push(`    id: ${item.id}`);
    entries.push(`    character: "${item.character}"`);
    entries.push(`    text: ${JSON.stringify(item.text)}`);
    if (item.displayText) {
      entries.push(`    displayText: ${JSON.stringify(item.displayText)}`);
    }
    entries.push(`    scene: ${item.scene}`);
    entries.push(`    voiceFile: "${item.voiceFile}"`);
    entries.push(`    durationInFrames: ${item.durationInFrames}`);
    entries.push(`    pauseAfter: ${item.pauseAfter}`);
    if (item.emotion) {
      entries.push(`    emotion: "${item.emotion}"`);
    }
    if (item.visual && item.visual.type !== 'none') {
      const visualLines: string[] = [];
      visualLines.push(`      type: "${item.visual.type}"`);
      if (item.visual.src) {
        visualLines.push(`      src: ${JSON.stringify(item.visual.src)}`);
      }
      if (item.visual.text) {
        visualLines.push(`      text: ${JSON.stringify(item.visual.text)}`);
      }
      if (item.visual.fontSize) {
        visualLines.push(`      fontSize: ${item.visual.fontSize}`);
      }
      if (item.visual.color) {
        visualLines.push(`      color: "${item.visual.color}"`);
      }
      if (item.visual.animation) {
        visualLines.push(`      animation: "${item.visual.animation}"`);
      }
      entries.push(`    visual: {\n${visualLines.join(',\n')},\n    }`);
    }
    if (item.se) {
      const seLines: string[] = [];
      seLines.push(`      src: ${JSON.stringify(item.se.src)}`);
      if (item.se.volume !== undefined) {
        seLines.push(`      volume: ${item.se.volume}`);
      }
      entries.push(`    se: {\n${seLines.join(',\n')},\n    }`);
    }

    return `  {\n${entries.join(',\n')},\n  }`;
  });

  return `[\n${lines.join(',\n')},\n]`;
}

export function getScript(): ScriptLine[] {
  const content = fs.readFileSync(SCRIPT_PATH, 'utf-8');
  return parseScriptData(content);
}

export function getScriptLine(id: number): ScriptLine | undefined {
  const script = getScript();
  return script.find(line => line.id === id);
}

export function updateScriptLine(id: number, data: Partial<ScriptLine>): ScriptLine {
  const content = fs.readFileSync(SCRIPT_PATH, 'utf-8');
  const script = parseScriptData(content);

  const index = script.findIndex(line => line.id === id);
  if (index === -1) {
    throw new Error(`Script line with id ${id} not found`);
  }

  script[index] = { ...script[index], ...data, id }; // Preserve original id

  const serialized = serializeScriptData(script);
  const newContent = content.replace(
    /export const scriptData:\s*ScriptLine\[\]\s*=\s*\[[\s\S]*?\];(?=\s*(?:\/\/|export|$))/,
    `export const scriptData: ScriptLine[] = ${serialized};`
  );

  fs.writeFileSync(SCRIPT_PATH, newContent);
  return script[index];
}

export function createScriptLine(data: Omit<ScriptLine, 'id'>): ScriptLine {
  const content = fs.readFileSync(SCRIPT_PATH, 'utf-8');
  const script = parseScriptData(content);

  // Generate new id
  const maxId = Math.max(0, ...script.map(line => line.id));
  const newLine: ScriptLine = { ...data, id: maxId + 1 };

  // Generate voiceFile if not provided
  if (!newLine.voiceFile) {
    newLine.voiceFile = `${String(newLine.id).padStart(2, '0')}_${newLine.character}.wav`;
  }

  script.push(newLine);

  const serialized = serializeScriptData(script);
  const newContent = content.replace(
    /export const scriptData:\s*ScriptLine\[\]\s*=\s*\[[\s\S]*?\];(?=\s*(?:\/\/|export|$))/,
    `export const scriptData: ScriptLine[] = ${serialized};`
  );

  fs.writeFileSync(SCRIPT_PATH, newContent);
  return newLine;
}

export function deleteScriptLine(id: number): void {
  const content = fs.readFileSync(SCRIPT_PATH, 'utf-8');
  const script = parseScriptData(content);

  const index = script.findIndex(line => line.id === id);
  if (index === -1) {
    throw new Error(`Script line with id ${id} not found`);
  }

  script.splice(index, 1);

  const serialized = serializeScriptData(script);
  const newContent = content.replace(
    /export const scriptData:\s*ScriptLine\[\]\s*=\s*\[[\s\S]*?\];(?=\s*(?:\/\/|export|$))/,
    `export const scriptData: ScriptLine[] = ${serialized};`
  );

  fs.writeFileSync(SCRIPT_PATH, newContent);
}

export function reorderScript(ids: number[]): ScriptLine[] {
  const content = fs.readFileSync(SCRIPT_PATH, 'utf-8');
  const script = parseScriptData(content);

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

  // Add any remaining lines that weren't in the ids array
  for (const line of script) {
    if (!ids.includes(line.id)) {
      reordered.push(line);
    }
  }

  const serialized = serializeScriptData(reordered);
  const newContent = content.replace(
    /export const scriptData:\s*ScriptLine\[\]\s*=\s*\[[\s\S]*?\];(?=\s*(?:\/\/|export|$))/,
    `export const scriptData: ScriptLine[] = ${serialized};`
  );

  fs.writeFileSync(SCRIPT_PATH, newContent);
  return reordered;
}
