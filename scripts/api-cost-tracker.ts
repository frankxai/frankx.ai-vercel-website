#!/usr/bin/env npx tsx
/**
 * FrankX API Cost Tracker
 *
 * Tracks API usage and costs for:
 * - Nano Banana (Gemini 2.5 Flash Image)
 * - Claude API usage (from Claude Code)
 *
 * Usage: npx tsx scripts/api-cost-tracker.ts
 */

import fs from 'fs';
import path from 'path';

// Cost constants (January 2026)
const COSTS = {
  gemini: {
    flash_image_1024: 0.039,      // per image
    flash_image_2k: 0.08,         // per image
    flash_image_4k: 0.24,         // per image
    pro_image_1024: 0.12,         // per image (estimate)
    input_per_mtok: 0.10,
    output_per_mtok: 0.30,
  },
  claude: {
    opus_45_input: 5.00,          // per MTok
    opus_45_output: 25.00,        // per MTok
    sonnet_input: 3.00,           // per MTok
    sonnet_output: 15.00,         // per MTok
    haiku_input: 1.00,            // per MTok
    haiku_output: 5.00,           // per MTok
  }
};

// Database paths
const NANOBANANA_DB = '/mnt/c/Users/Frank/nanobanana-mcp/generations.db';
const OUTPUT_DIR = '/mnt/c/Users/Frank/FrankX/generated_imgs';

interface ImageStats {
  total_images: number;
  total_size_mb: number;
  by_model: Record<string, number>;
  estimated_cost: number;
  images_by_date: Record<string, number>;
}

async function getImageStats(): Promise<ImageStats> {
  const stats: ImageStats = {
    total_images: 0,
    total_size_mb: 0,
    by_model: { flash: 0, pro: 0 },
    estimated_cost: 0,
    images_by_date: {},
  };

  try {
    // Count images in output directory
    const files = fs.readdirSync(OUTPUT_DIR);
    const pngFiles = files.filter(f => f.endsWith('.png') || f.endsWith('.jpeg'));

    stats.total_images = pngFiles.length;

    for (const file of pngFiles) {
      const filePath = path.join(OUTPUT_DIR, file);
      const stat = fs.statSync(filePath);
      stats.total_size_mb += stat.size / (1024 * 1024);

      // Extract date from filename or mtime
      const date = stat.mtime.toISOString().split('T')[0];
      stats.images_by_date[date] = (stats.images_by_date[date] || 0) + 1;
    }

    // Estimate cost (assume mostly flash at 1024px)
    stats.estimated_cost = stats.total_images * COSTS.gemini.flash_image_1024;

  } catch (error) {
    console.error('Error reading image directory:', error);
  }

  return stats;
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           FrankX API Cost Tracker Dashboard                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Image Generation Stats
  const imgStats = await getImageStats();

  console.log('📸 NANO BANANA (Gemini 2.5 Flash Image)');
  console.log('─────────────────────────────────────────');
  console.log(`   Total Images Generated: ${imgStats.total_images}`);
  console.log(`   Total Size: ${imgStats.total_size_mb.toFixed(2)} MB`);
  console.log(`   Estimated Cost: ${formatCurrency(imgStats.estimated_cost)}`);
  console.log('');

  console.log('   Recent Activity:');
  const sortedDates = Object.entries(imgStats.images_by_date)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 7);

  for (const [date, count] of sortedDates) {
    const cost = count * COSTS.gemini.flash_image_1024;
    console.log(`     ${date}: ${count} images (${formatCurrency(cost)})`);
  }

  console.log('\n');
  console.log('💰 COST REFERENCE');
  console.log('─────────────────────────────────────────');
  console.log('   Gemini 2.5 Flash Image:');
  console.log(`     1024×1024: ${formatCurrency(COSTS.gemini.flash_image_1024)}/image`);
  console.log(`     2K res:    ${formatCurrency(COSTS.gemini.flash_image_2k)}/image`);
  console.log(`     4K res:    ${formatCurrency(COSTS.gemini.flash_image_4k)}/image`);
  console.log('');
  console.log('   Claude API (per million tokens):');
  console.log(`     Opus 4.5:  ${formatCurrency(COSTS.claude.opus_45_input)} input / ${formatCurrency(COSTS.claude.opus_45_output)} output`);
  console.log(`     Sonnet:    ${formatCurrency(COSTS.claude.sonnet_input)} input / ${formatCurrency(COSTS.claude.sonnet_output)} output`);
  console.log(`     Haiku:     ${formatCurrency(COSTS.claude.haiku_input)} input / ${formatCurrency(COSTS.claude.haiku_output)} output`);

  console.log('\n');
  console.log('📊 QUICK ESTIMATES');
  console.log('─────────────────────────────────────────');
  console.log('   Generate all 20 missing blog images:');
  console.log(`     Flash (1024px): ${formatCurrency(20 * COSTS.gemini.flash_image_1024)}`);
  console.log(`     Pro (high-res): ${formatCurrency(20 * COSTS.gemini.pro_image_1024)}`);
  console.log('');
  console.log('   Weekly content (5 blogs + 10 social):');
  console.log(`     Estimated: ${formatCurrency(15 * COSTS.gemini.flash_image_1024)}/week`);

  console.log('\n');
}

main().catch(console.error);
