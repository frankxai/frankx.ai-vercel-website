#!/usr/bin/env node

/**
 * Image Generation Script for FrankX.AI
 * Uses Nano Banana MCP to generate custom hero and header images
 */

import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyB-raRd6EKVd82aa9S9mwK6bwvEnN6Ek9g';
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict';

// Image definitions
const images = [
  {
    filename: 'hero-ai-hub-v4.png',
    width: 1920,
    height: 1080,
    prompt: 'Cinematic wide shot of a futuristic AI command center at night, holographic displays showing code snippets and music waveforms, deep purples and cyans with gold accents, oracle-like mystical atmosphere where consciousness meets technology, volumetric lighting, photorealistic, dramatic rim lighting, epic scale, ARRI Alexa quality, anamorphic lens bokeh, 8k resolution',
    negativePrompt: 'cartoonish, anime, low quality, blurry, text, watermark, corporate logo, generic stock photo, bright daylight, cluttered'
  },
  {
    filename: 'blog-ai-tech-header.png',
    width: 1200,
    height: 630,
    prompt: 'Futuristic neural network visualization with interconnected nodes glowing in cyan and blue, Oracle cloud infrastructure holographic interfaces in background, enterprise AI architecture floating diagrams, consciousness-inspired sacred geometry patterns, professional yet spiritual aesthetic, wide angle perspective, cinematic lighting, photorealistic, 8k quality',
    negativePrompt: 'cartoonish, anime, corporate stock photo, clipart, text overlay, watermark, bright colors, messy'
  },
  {
    filename: 'blog-conscious-header.png',
    width: 1200,
    height: 630,
    prompt: 'Ethereal scene where consciousness meets artificial intelligence, sacred geometry patterns merging seamlessly with neural network circuits, purple and gold light emanating from center, cosmic starfield background with circuit board mandala, spiritual technology aesthetic, mystical yet high-tech, cinematic composition, photorealistic rendering, 8k',
    negativePrompt: 'cartoonish, new age cliche, cheap 3D render, text, watermark, overly bright, cluttered composition'
  },
  {
    filename: 'blog-creator-header.png',
    width: 1200,
    height: 630,
    prompt: 'Bird\'s eye view of a modern digital creator workspace, multiple curved monitors displaying content creation tools and AI interfaces, glowing AI assistant orbs floating around workspace, warm amber and cyan accent lighting, sleek futuristic studio meets cozy creative space, inspirational and aspirational, photorealistic, shallow depth of field, cinematic quality, 8k',
    negativePrompt: 'messy desk, cluttered, dark and moody, corporate office, text on screens, watermark, low quality'
  },
  {
    filename: 'blog-music-header.png',
    width: 1200,
    height: 630,
    prompt: 'AI-powered music production studio, holographic waveforms and 3D sound visualization floating in space, Suno AI interface aesthetic with purple and cyan neon accents, musical notes transforming into binary code and back, futuristic synthesizer with glowing controls, cinematic music production vibe, photorealistic, volumetric lighting, 8k resolution',
    negativePrompt: 'realistic instruments, traditional studio, cartoonish, text overlay, watermark, cluttered, dark and depressing'
  },
  {
    filename: 'blog-personal-dev-header.png',
    width: 1200,
    height: 630,
    prompt: 'Visualization of growth and consciousness expansion, silhouette of human figure ascending through translucent layers of knowledge and light, AI guides as gentle glowing presences, warm gradient from gold at bottom to cyan at top, inspirational and epic, particle effects suggesting transformation, photorealistic quality, cinematic composition, 8k',
    negativePrompt: 'cartoonish, cliche motivational poster, cheap 3D, text overlay, watermark, dark mood, cluttered'
  }
];

/**
 * Generate image using Gemini Imagen API
 */
async function generateImage(config) {
  console.log(`\nGenerating: ${config.filename}`);
  console.log(`Dimensions: ${config.width}x${config.height}`);
  console.log(`Prompt: ${config.prompt.substring(0, 80)}...`);

  try {
    const requestBody = {
      instances: [
        {
          prompt: config.prompt
        }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: `${config.width}:${config.height}`,
        negativePrompt: config.negativePrompt,
        safetySetting: 'block_some'
      }
    };

    const response = await fetch(
      `${API_ENDPOINT}?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();

    // Extract base64 image data
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No image data in API response');
    }

    const imageBase64 = data.predictions[0].bytesBase64Encoded || data.predictions[0].image;

    if (!imageBase64) {
      throw new Error('No image data found in prediction');
    }

    // Convert base64 to buffer and save
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const outputPath = join(__dirname, '..', 'public', 'images', config.filename);

    await writeFile(outputPath, imageBuffer);

    console.log(`✅ Saved: ${outputPath}`);
    console.log(`   Size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);

    return outputPath;
  } catch (error) {
    console.error(`❌ Error generating ${config.filename}:`, error.message);
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(80));
  console.log('FrankX.AI Image Generation via Nano Banana MCP');
  console.log('='.repeat(80));
  console.log(`\nGenerating ${images.length} images...`);

  const results = {
    success: [],
    failed: []
  };

  for (const imageConfig of images) {
    try {
      // Add delay between requests to avoid rate limiting
      if (results.success.length > 0) {
        console.log('\nWaiting 3 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      const path = await generateImage(imageConfig);
      results.success.push({ filename: imageConfig.filename, path });
    } catch (error) {
      results.failed.push({ filename: imageConfig.filename, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('GENERATION SUMMARY');
  console.log('='.repeat(80));
  console.log(`\n✅ Successful: ${results.success.length}/${images.length}`);

  if (results.success.length > 0) {
    console.log('\nGenerated Images:');
    results.success.forEach(({ filename, path }) => {
      console.log(`  • ${filename}`);
      console.log(`    ${path}`);
    });
  }

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed: ${results.failed.length}/${images.length}`);
    results.failed.forEach(({ filename, error }) => {
      console.log(`  • ${filename}: ${error}`);
    });
  }

  console.log('\n' + '='.repeat(80));

  // Exit with error code if any failed
  if (results.failed.length > 0) {
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { generateImage, images };
