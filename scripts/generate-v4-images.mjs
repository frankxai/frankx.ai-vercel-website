#!/usr/bin/env node

/**
 * FrankX.AI V4 Image Generation Script
 * Generates high-quality images using Google Gemini API (Nano Banana)
 *
 * Usage: node scripts/generate-v4-images.mjs
 */

import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GEMINI_API_KEY = 'AIzaSyB-raRd6EKVd82aa9S9mwK6bwvEnN6Ek9g';
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';
const OUTPUT_DIR = join(__dirname, '../public/images');

// Image specifications
const images = [
  {
    filename: 'hero-ai-hub-v4.png',
    width: 1920,
    height: 1080,
    prompt: 'Cinematic ultra-wide establishing shot of a futuristic AI command center at night, massive curved holographic displays showing flowing code streams, ethereal music waveforms, and glowing constellation patterns, deep royal purples and electric cyans with gold accents, oracle-like mystical atmosphere, consciousness meets cutting-edge technology, photorealistic rendering, dramatic volumetric lighting with god rays, epic cinematic scale, 8k quality, shot on ARRI Alexa, anamorphic lens flare',
    negative: 'cartoon, anime, illustration, corporate office, boring, daytime, flat lighting, people, text, watermark, low quality, blurry'
  },
  {
    filename: 'blog-ai-tech-header.png',
    width: 1200,
    height: 630,
    prompt: 'Futuristic neural network visualization in 3D space, interconnected glowing nodes in cyan and electric blue with data flowing between them, Oracle cloud infrastructure towers in deep background with dramatic fog, enterprise AI architecture blueprint hologram, floating code displays with technical diagrams, professional yet consciousness-inspired aesthetic, wide angle cinematic shot, depth of field, volumetric lighting, photorealistic, tech noir atmosphere',
    negative: 'cartoon, flat, 2D, people, text overlay, corporate stock photo, boring, daytime, low quality'
  },
  {
    filename: 'blog-conscious-header.png',
    width: 1200,
    height: 630,
    prompt: 'Ethereal consciousness merging with artificial intelligence, intricate sacred geometry patterns seamlessly blending with glowing neural networks, rich purple and luminous gold light rays, cosmic nebula background with circuit board mandala design, spiritual technology aesthetic, photorealistic mystical atmosphere, cinematic lighting with lens flare, depth and dimension, particles of light, consciousness as code visualization, 8k quality',
    negative: 'cartoon, flat, people, text, watermark, corporate, sci-fi spaceship, low quality, oversaturated'
  },
  {
    filename: 'blog-creator-header.png',
    width: 1200,
    height: 630,
    prompt: "Bird's eye view of digital creator workspace, multiple curved monitors displaying content creation tools and creative software, AI assistants visualized as floating glowing ethereal orbs with particle trails, warm amber studio lighting mixed with cyan holographic accents, modern creative studio meets futuristic technology, inspirational and aspirational mood, cinematic depth of field, photorealistic rendering, professional photography, cozy yet high-tech atmosphere",
    negative: 'messy, cluttered, cartoon, people visible, text on screens, corporate office, boring, flat lighting, low quality'
  },
  {
    filename: 'blog-music-header.png',
    width: 1200,
    height: 630,
    prompt: 'AI-powered music production studio in cyberspace, three-dimensional sound waveforms and frequency visualization floating in space, Suno AI interface aesthetic with glowing purple and cyan neon elements, musical notes and staff notation dynamically transforming into code streams and back to music, volumetric fog with particle effects, cinematic music production vibe, photorealistic rendering, dramatic lighting, depth and atmosphere, futuristic yet artistic',
    negative: 'cartoon, flat 2D, people, instruments in foreground, text, watermark, corporate, boring, low quality'
  },
  {
    filename: 'blog-personal-dev-header.png',
    width: 1200,
    height: 630,
    prompt: 'Growth mindset visualization, silhouette of human figure ascending through multiple translucent layers of consciousness and flowing knowledge streams, AI assistants as gentle guiding lights surrounding the path, warm gradient color transition from golden sunrise to electric cyan zenith, inspirational and epic atmosphere, photorealistic with ethereal elements, cinematic lighting with god rays, particles of light representing insights, depth and dimension, uplifting heroic mood, 8k quality',
    negative: 'cartoon, corporate stock photo, cheesy, text overlay, people\'s faces, low quality, flat, boring'
  }
];

async function generateImage(imageSpec) {
  console.log(`\n🎨 Generating: ${imageSpec.filename}`);
  console.log(`   Dimensions: ${imageSpec.width}x${imageSpec.height}`);
  console.log(`   Prompt: ${imageSpec.prompt.substring(0, 100)}...`);

  try {
    const requestBody = {
      contents: [{
        parts: [{
          text: `Generate a high-quality professional image with these specifications:

PROMPT: ${imageSpec.prompt}

NEGATIVE PROMPT (avoid these): ${imageSpec.negative}

TECHNICAL REQUIREMENTS:
- Aspect ratio: ${imageSpec.width}x${imageSpec.height}
- Style: Photorealistic, cinematic, professional
- Quality: Maximum detail, 8K quality
- Lighting: Dramatic, volumetric, professional cinematography
- Composition: Rule of thirds, depth, visual interest

Create a stunning image that exceeds expectations.`
        }]
      }],
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "image/png"
      }
    };

    const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();

    // Extract image data from response
    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const parts = result.candidates[0].content.parts;

      // Look for inline_data with image
      for (const part of parts) {
        if (part.inline_data && part.inline_data.data) {
          const imageBuffer = Buffer.from(part.inline_data.data, 'base64');
          const outputPath = join(OUTPUT_DIR, imageSpec.filename);

          await writeFile(outputPath, imageBuffer);
          console.log(`   ✅ Saved to: ${outputPath}`);
          console.log(`   📦 Size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);

          return {
            success: true,
            filename: imageSpec.filename,
            path: outputPath,
            size: imageBuffer.length
          };
        }
      }
    }

    throw new Error('No image data found in API response');

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return {
      success: false,
      filename: imageSpec.filename,
      error: error.message
    };
  }
}

async function main() {
  console.log('🖼️  FrankX.AI V4 Image Generation System');
  console.log('==========================================\n');
  console.log('Using Google Gemini 2.5 Flash Image API (Nano Banana)');
  console.log(`Output Directory: ${OUTPUT_DIR}\n`);

  // Ensure output directory exists
  try {
    await mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  const results = [];

  // Generate images sequentially to avoid rate limits
  for (const imageSpec of images) {
    const result = await generateImage(imageSpec);
    results.push(result);

    // Wait a bit between requests
    if (imageSpec !== images[images.length - 1]) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n==========================================');
  console.log('📊 Generation Summary\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}/${images.length}`);
  console.log(`❌ Failed: ${failed.length}/${images.length}`);

  if (successful.length > 0) {
    const totalSize = successful.reduce((sum, r) => sum + r.size, 0);
    console.log(`📦 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed images:');
    failed.forEach(r => {
      console.log(`   - ${r.filename}: ${r.error}`);
    });
  }

  console.log('\n✅ Image generation complete!');
}

main().catch(console.error);
