#!/usr/bin/env node
/**
 * Suno Track Import Helper
 *
 * This script helps you import Suno tracks into the music inventory.
 *
 * USAGE OPTIONS:
 *
 * 1. From a text file with Suno URLs (one per line):
 *    node scripts/import-suno-tracks.mjs --file suno-urls.txt
 *
 * 2. From a CSV with columns: title,url,genre,mood,date
 *    node scripts/import-suno-tracks.mjs --csv suno-tracks.csv
 *
 * 3. Interactive mode (paste URLs one by one):
 *    node scripts/import-suno-tracks.mjs --interactive
 *
 * 4. From Suno profile URL (limited - may require manual auth):
 *    node scripts/import-suno-tracks.mjs --profile https://suno.com/@username
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MUSIC_FILE = path.join(ROOT, 'data', 'inventories', 'frankx', 'music.json');

// Extract Suno ID from URL
function extractSunoId(url) {
  const match = url.match(/suno\.com\/s\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

// Create track entry
function createTrackEntry(url, title = '', genre = [], mood = [], date = null) {
  const sunoId = extractSunoId(url);
  const id = title ? generateSlug(title) : sunoId || `track-${Date.now()}`;

  return {
    id,
    type: 'music',
    title: title || `Untitled Track (${sunoId || 'unknown'})`,
    description: '',
    brand: 'frankx',
    status: 'published',
    tags: [...genre, ...mood].filter(Boolean),
    createdAt: date || new Date().toISOString().split('T')[0],
    platform: 'suno',
    sunoId: sunoId || null,
    sunoUrl: url,
    thumbnail: null,
    genre: genre,
    mood: mood,
    vibeOsSession: false,
    usageRights: 'commercial',
  };
}

// Import from text file
async function importFromFile(filePath) {
  console.log(`\n📂 Importing from file: ${filePath}\n`);

  const content = fs.readFileSync(filePath, 'utf-8');
  const urls = content.split('\n').filter(line => line.trim().includes('suno.com'));

  console.log(`Found ${urls.length} Suno URLs\n`);

  const tracks = urls.map(url => createTrackEntry(url.trim()));
  return tracks;
}

// Import from CSV
async function importFromCsv(filePath) {
  console.log(`\n📊 Importing from CSV: ${filePath}\n`);

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  // Skip header
  const dataLines = lines.slice(1);

  const tracks = dataLines.map(line => {
    const [title, url, genre, mood, date] = line.split(',').map(s => s.trim());
    return createTrackEntry(
      url,
      title,
      genre ? genre.split('|') : [],
      mood ? mood.split('|') : [],
      date
    );
  });

  console.log(`Parsed ${tracks.length} tracks from CSV\n`);
  return tracks;
}

// Interactive mode
async function importInteractive() {
  console.log(`\n🎹 Interactive Suno Import Mode`);
  console.log(`Enter Suno URLs one per line. Type 'done' when finished.\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const tracks = [];

  return new Promise(resolve => {
    const askForUrl = () => {
      rl.question('Suno URL (or "done"): ', answer => {
        if (answer.toLowerCase() === 'done') {
          rl.close();
          resolve(tracks);
          return;
        }

        if (answer.includes('suno.com')) {
          rl.question('  Title (optional): ', title => {
            rl.question('  Genre (comma-separated, optional): ', genreStr => {
              rl.question('  Mood (comma-separated, optional): ', moodStr => {
                const genre = genreStr ? genreStr.split(',').map(s => s.trim()) : [];
                const mood = moodStr ? moodStr.split(',').map(s => s.trim()) : [];
                tracks.push(createTrackEntry(answer.trim(), title, genre, mood));
                console.log(`  ✓ Added track #${tracks.length}\n`);
                askForUrl();
              });
            });
          });
        } else {
          console.log('  ⚠️ Invalid URL, please enter a Suno URL\n');
          askForUrl();
        }
      });
    };

    askForUrl();
  });
}

// Save tracks to inventory
function saveToInventory(newTracks) {
  // Load existing inventory
  let inventory = { tracks: [] };
  if (fs.existsSync(MUSIC_FILE)) {
    inventory = JSON.parse(fs.readFileSync(MUSIC_FILE, 'utf-8'));
  }

  // Get existing IDs to avoid duplicates
  const existingIds = new Set(inventory.tracks.map(t => t.sunoId).filter(Boolean));
  const existingUrls = new Set(inventory.tracks.map(t => t.sunoUrl).filter(Boolean));

  // Filter out duplicates
  const uniqueTracks = newTracks.filter(track => {
    if (track.sunoId && existingIds.has(track.sunoId)) {
      console.log(`  ⏭️ Skipping duplicate: ${track.sunoId}`);
      return false;
    }
    if (track.sunoUrl && existingUrls.has(track.sunoUrl)) {
      console.log(`  ⏭️ Skipping duplicate URL: ${track.sunoUrl}`);
      return false;
    }
    return true;
  });

  // Merge
  inventory.tracks = [...inventory.tracks, ...uniqueTracks];
  inventory._count = inventory.tracks.length;
  inventory._lastUpdated = new Date().toISOString().split('T')[0];

  // Save
  fs.writeFileSync(MUSIC_FILE, JSON.stringify(inventory, null, 2));

  console.log(`\n✅ Added ${uniqueTracks.length} new tracks`);
  console.log(`📊 Total tracks in inventory: ${inventory.tracks.length}`);
  console.log(`📁 Saved to: ${MUSIC_FILE}\n`);
}

// Main
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🎵 Suno Track Import Helper

USAGE:
  node scripts/import-suno-tracks.mjs --file <urls.txt>
  node scripts/import-suno-tracks.mjs --csv <tracks.csv>
  node scripts/import-suno-tracks.mjs --interactive

CSV FORMAT:
  title,url,genre,mood,date
  Track Name,https://suno.com/s/abc123,ambient|electronic,calm|focused,2025-01-15

TEXT FILE FORMAT:
  https://suno.com/s/abc123
  https://suno.com/s/def456
  ...
`);
    return;
  }

  let tracks = [];

  if (args[0] === '--file' && args[1]) {
    tracks = await importFromFile(args[1]);
  } else if (args[0] === '--csv' && args[1]) {
    tracks = await importFromCsv(args[1]);
  } else if (args[0] === '--interactive') {
    tracks = await importInteractive();
  } else if (args[0] === '--profile') {
    console.log(`
⚠️ Profile scraping requires authentication.

Instead, try:
1. Go to your Suno profile
2. Copy all track URLs to a text file
3. Run: node scripts/import-suno-tracks.mjs --file your-urls.txt
`);
    return;
  }

  if (tracks.length > 0) {
    saveToInventory(tracks);
  }
}

main().catch(console.error);
