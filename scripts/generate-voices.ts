#!/usr/bin/env npx ts-node

/**
 * VOICEVOX音声一括生成スクリプト
 *
 * 使用方法:
 *   npx ts-node scripts/generate-voices.ts
 *
 * 前提条件:
 *   - VOICEVOXがlocalhost:50021で起動していること
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { execSync } from "child_process";

const ROOT_DIR = process.cwd();

// 設定読み込み
const CONFIG_PATH = path.join(ROOT_DIR, "src/config.ts");
const SCRIPT_PATH = path.join(ROOT_DIR, "src/data/script.ts");
const OUTPUT_DIR = path.join(ROOT_DIR, "public/voices");

interface VoiceGenerationConfig {
  host: string;
  playbackRate: number;
  fps: number;
}

interface ScriptLine {
  id: number;
  character: string;
  text: string;
  voiceFile: string;
}

interface CharacterConfig {
  id: string;
  voicevoxSpeakerId: number;
}

// VOICEVOXが起動しているか確認
async function checkVoicevox(host: string): Promise<boolean> {
  try {
    const response = await fetch(`${host}/version`);
    if (response.ok) {
      const version = await response.text();
      console.log(`VOICEVOX version: ${version}`);
      return true;
    }
  } catch (e) {
    console.error("VOICEVOXに接続できません。VOICEVOXを起動してください。");
  }
  return false;
}

// 音声クエリを取得
async function getAudioQuery(
  host: string,
  text: string,
  speakerId: number
): Promise<any> {
  const encodedText = encodeURIComponent(text);
  const response = await fetch(
    `${host}/audio_query?speaker=${speakerId}&text=${encodedText}`,
    { method: "POST" }
  );
  if (!response.ok) {
    throw new Error(`audio_query failed: ${response.statusText}`);
  }
  return response.json();
}

// 音声を合成
async function synthesize(
  host: string,
  query: any,
  speakerId: number
): Promise<ArrayBuffer> {
  const response = await fetch(`${host}/synthesis?speaker=${speakerId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    throw new Error(`synthesis failed: ${response.statusText}`);
  }
  return response.arrayBuffer();
}

// WAVファイルの長さを取得（秒）- WAVヘッダーを直接解析
function getWavDuration(filePath: string): number {
  try {
    const buffer = fs.readFileSync(filePath);
    // WAVヘッダー: バイト24-27にサンプルレート、バイト28-31にバイトレート
    // バイト40-43にデータサイズ（"data"チャンク）
    // 簡易的にバイトレートとファイルサイズから計算
    const sampleRate = buffer.readUInt32LE(24);
    const bitsPerSample = buffer.readUInt16LE(34);
    const numChannels = buffer.readUInt16LE(22);
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    // dataチャンクを探す
    let dataOffset = 12;
    while (dataOffset < buffer.length - 8) {
      const chunkId = buffer.toString("ascii", dataOffset, dataOffset + 4);
      const chunkSize = buffer.readUInt32LE(dataOffset + 4);
      if (chunkId === "data") {
        return chunkSize / byteRate;
      }
      dataOffset += 8 + chunkSize;
    }
    // フォールバック: ヘッダー44バイトを除いたサイズで計算
    return (buffer.length - 44) / byteRate;
  } catch (e) {
    console.error(`Failed to get duration for ${filePath}`);
    return 0;
  }
}

// マニフェスト: テキスト+キャラクターのハッシュを保存し、変更検知に使う
interface VoiceManifest {
  [voiceFile: string]: {
    hash: string;
    frames: number;
  };
}

const MANIFEST_PATH = path.join(OUTPUT_DIR, "voices-manifest.json");

function computeHash(text: string, character: string): string {
  return crypto.createHash("md5").update(`${character}:${text}`).digest("hex");
}

function loadManifest(): VoiceManifest {
  try {
    if (fs.existsSync(MANIFEST_PATH)) {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    }
  } catch (e) {
    // マニフェストが壊れている場合は空で開始
  }
  return {};
}

function saveManifest(manifest: VoiceManifest): void {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

// メイン処理
async function main() {
  const host = "http://localhost:50021";
  const fps = 30;
  const playbackRate = 1.2;
  const forceAll = process.argv.includes("--force");

  // VOICEVOX確認
  if (!(await checkVoicevox(host))) {
    process.exit(1);
  }

  // 出力ディレクトリ作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // スクリプトデータを動的に読み込み
  console.log("スクリプトデータを読み込んでいます...");

  const scriptData: ScriptLine[] = [];
  const characters: Map<string, number> = new Map([
    ["zundamon", 3],
    ["metan", 2],
  ]);

  // script.tsを読み込んでパース
  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf-8");
  const scriptDataMatch = scriptContent.match(
    /export const scriptData[^=]*=\s*\[([\s\S]*?)\];/
  );

  if (scriptDataMatch) {
    const dataStr = scriptDataMatch[1];
    const lineMatches = dataStr.matchAll(
      /\{\s*"?id"?:\s*(\d+),\s*"?character"?:\s*"([^"]+)",\s*"?text"?:\s*"([^"]+)"[\s\S]*?"?voiceFile"?:\s*"([^"]+)"/g
    );

    for (const match of lineMatches) {
      scriptData.push({
        id: parseInt(match[1]),
        character: match[2],
        text: match[3],
        voiceFile: match[4],
      });
    }
  }

  console.log(`${scriptData.length}件のセリフを処理します...`);

  // マニフェスト読み込み
  const manifest = loadManifest();

  const durationsArray: { id: number; file: string; duration: number; frames: number }[] = [];
  const durationsMap: Record<string, number> = {};
  const newManifest: VoiceManifest = {};
  let generatedCount = 0;
  let skippedCount = 0;

  for (const line of scriptData) {
    const speakerId = characters.get(line.character);
    if (speakerId === undefined) {
      console.error(`Unknown character: ${line.character}`);
      continue;
    }

    const outputPath = path.join(OUTPUT_DIR, line.voiceFile);
    const currentHash = computeHash(line.text, line.character);
    const existing = manifest[line.voiceFile];

    // 変更なし & ファイルが存在 → スキップ
    if (!forceAll && existing && existing.hash === currentHash && fs.existsSync(outputPath)) {
      skippedCount++;
      durationsMap[line.voiceFile] = existing.frames;
      newManifest[line.voiceFile] = existing;

      const duration = existing.frames / (fps * playbackRate);
      durationsArray.push({
        id: line.id,
        file: line.voiceFile,
        duration,
        frames: existing.frames,
      });
      continue;
    }

    try {
      console.log(`Generating: ${line.voiceFile} - "${line.text.substring(0, 30)}..."`);

      // 音声クエリ取得
      const query = await getAudioQuery(host, line.text, speakerId);

      // 音声合成
      const audio = await synthesize(host, query, speakerId);

      // ファイル保存
      fs.writeFileSync(outputPath, Buffer.from(audio));

      // 長さを取得してフレーム数を計算
      const duration = getWavDuration(outputPath);
      const frames = Math.ceil(duration * fps * playbackRate);

      durationsArray.push({
        id: line.id,
        file: line.voiceFile,
        duration,
        frames,
      });
      durationsMap[line.voiceFile] = frames;
      newManifest[line.voiceFile] = { hash: currentHash, frames };
      generatedCount++;

      console.log(`  -> ${duration.toFixed(2)}s, ${frames} frames`);

    } catch (e) {
      console.error(`Error generating ${line.voiceFile}:`, e);
    }
  }

  // マニフェスト保存
  saveManifest(newManifest);

  console.log(`\n📊 結果: ${generatedCount}件生成, ${skippedCount}件スキップ（変更なし）`);

  // 結果をJSONで保存（sync-script.tsが期待するオブジェクト形式）
  const resultPath = path.join(OUTPUT_DIR, "durations.json");
  fs.writeFileSync(resultPath, JSON.stringify(durationsMap, null, 2));
  console.log(`Duration data saved to: ${resultPath}`);

  // script.ts更新用のコードを出力
  console.log("\n=== script.ts更新用 ===");
  for (const d of durationsArray) {
    console.log(`ID ${d.id}: durationInFrames: ${d.frames}, // ${d.duration.toFixed(2)}s`);
  }
}

main().catch(console.error);
