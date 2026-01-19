#!/usr/bin/env node
/**
 * PDF Generation Script
 *
 * Converts HTML templates to beautiful PDFs using Puppeteer.
 * Usage: node scripts/generate-pdfs.mjs
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, 'pdf-templates');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'downloads');

const templates = [
  {
    input: 'soulbook-guide.html',
    output: 'soulbook-guide.pdf',
    title: "The Creator's Soulbook"
  },
  {
    input: 'vibe-os-guide.html',
    output: 'vibe-os-guide.pdf',
    title: 'Vibe OS Guide'
  }
];

async function generatePDF(browser, template) {
  const inputPath = path.join(TEMPLATES_DIR, template.input);
  const outputPath = path.join(OUTPUT_DIR, template.output);

  console.log(`\n📄 Generating: ${template.title}`);
  console.log(`   Input:  ${inputPath}`);
  console.log(`   Output: ${outputPath}`);

  const page = await browser.newPage();

  // Read the HTML file
  const htmlContent = fs.readFileSync(inputPath, 'utf-8');

  // Set the content
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });

  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    displayHeaderFooter: false
  });

  await page.close();

  // Get file size
  const stats = fs.statSync(outputPath);
  const fileSizeKB = (stats.size / 1024).toFixed(1);

  console.log(`   ✅ Generated: ${fileSizeKB} KB`);

  return outputPath;
}

async function main() {
  console.log('🎨 Vibe OS PDF Generator');
  console.log('========================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
  }

  // Launch browser
  console.log('🚀 Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const generatedFiles = [];

  try {
    for (const template of templates) {
      const outputPath = await generatePDF(browser, template);
      generatedFiles.push(outputPath);
    }
  } finally {
    await browser.close();
  }

  console.log('\n========================');
  console.log('✨ PDF Generation Complete!');
  console.log('\nGenerated files:');
  generatedFiles.forEach(file => {
    console.log(`   • ${path.basename(file)}`);
  });

  console.log('\n📤 Next step: Upload to Vercel Blob storage');
  console.log('   Run: node scripts/upload-to-blob.mjs');
}

main().catch(console.error);
