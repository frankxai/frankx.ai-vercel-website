#!/usr/bin/env python3

"""
FrankX.AI V4 Image Generation Script
Generates high-quality images using Google Gemini API (Nano Banana)

Usage: python scripts/generate-v4-images.py
"""

import os
import base64
import json
import time
from pathlib import Path
import requests

# Get API key from environment variable for security
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY environment variable not set")
    print("\nPlease set your API key:")
    print("  export GEMINI_API_KEY='your-api-key-here'")
    print("\nOr run with:")
    print("  GEMINI_API_KEY='your-key' python3 scripts/generate-v4-images.py")
    exit(1)
API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent'
OUTPUT_DIR = Path(__file__).parent.parent / 'public' / 'images'

# Image specifications
images = [
    {
        'filename': 'hero-ai-hub-v4.png',
        'width': 1920,
        'height': 1080,
        'prompt': 'Cinematic ultra-wide establishing shot of a futuristic AI command center at night, massive curved holographic displays showing flowing code streams, ethereal music waveforms, and glowing constellation patterns, deep royal purples and electric cyans with gold accents, oracle-like mystical atmosphere, consciousness meets cutting-edge technology, photorealistic rendering, dramatic volumetric lighting with god rays, epic cinematic scale, 8k quality, shot on ARRI Alexa, anamorphic lens flare',
        'negative': 'cartoon, anime, illustration, corporate office, boring, daytime, flat lighting, people, text, watermark, low quality, blurry'
    },
    {
        'filename': 'blog-ai-tech-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'Futuristic neural network visualization in 3D space, interconnected glowing nodes in cyan and electric blue with data flowing between them, Oracle cloud infrastructure towers in deep background with dramatic fog, enterprise AI architecture blueprint hologram, floating code displays with technical diagrams, professional yet consciousness-inspired aesthetic, wide angle cinematic shot, depth of field, volumetric lighting, photorealistic, tech noir atmosphere',
        'negative': 'cartoon, flat, 2D, people, text overlay, corporate stock photo, boring, daytime, low quality'
    },
    {
        'filename': 'blog-conscious-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'Ethereal consciousness merging with artificial intelligence, intricate sacred geometry patterns seamlessly blending with glowing neural networks, rich purple and luminous gold light rays, cosmic nebula background with circuit board mandala design, spiritual technology aesthetic, photorealistic mystical atmosphere, cinematic lighting with lens flare, depth and dimension, particles of light, consciousness as code visualization, 8k quality',
        'negative': 'cartoon, flat, people, text, watermark, corporate, sci-fi spaceship, low quality, oversaturated'
    },
    {
        'filename': 'blog-creator-header.png',
        'width': 1200,
        'height': 630,
        'prompt': "Bird's eye view of digital creator workspace, multiple curved monitors displaying content creation tools and creative software, AI assistants visualized as floating glowing ethereal orbs with particle trails, warm amber studio lighting mixed with cyan holographic accents, modern creative studio meets futuristic technology, inspirational and aspirational mood, cinematic depth of field, photorealistic rendering, professional photography, cozy yet high-tech atmosphere",
        'negative': 'messy, cluttered, cartoon, people visible, text on screens, corporate office, boring, flat lighting, low quality'
    },
    {
        'filename': 'blog-music-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'AI-powered music production studio in cyberspace, three-dimensional sound waveforms and frequency visualization floating in space, Suno AI interface aesthetic with glowing purple and cyan neon elements, musical notes and staff notation dynamically transforming into code streams and back to music, volumetric fog with particle effects, cinematic music production vibe, photorealistic rendering, dramatic lighting, depth and atmosphere, futuristic yet artistic',
        'negative': 'cartoon, flat 2D, people, instruments in foreground, text, watermark, corporate, boring, low quality'
    },
    {
        'filename': 'blog-personal-dev-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'Growth mindset visualization, silhouette of human figure ascending through multiple translucent layers of consciousness and flowing knowledge streams, AI assistants as gentle guiding lights surrounding the path, warm gradient color transition from golden sunrise to electric cyan zenith, inspirational and epic atmosphere, photorealistic with ethereal elements, cinematic lighting with god rays, particles of light representing insights, depth and dimension, uplifting heroic mood, 8k quality',
        'negative': "cartoon, corporate stock photo, cheesy, text overlay, people's faces, low quality, flat, boring"
    }
]


def generate_image(image_spec):
    """Generate a single image using Gemini API."""
    print(f"\n🎨 Generating: {image_spec['filename']}")
    print(f"   Dimensions: {image_spec['width']}x{image_spec['height']}")
    print(f"   Prompt: {image_spec['prompt'][:100]}...")

    try:
        # Construct the API request
        prompt_text = f"""Generate a high-quality professional image.

{image_spec['prompt']}

AVOID: {image_spec['negative']}

Technical requirements: {image_spec['width']}x{image_spec['height']}, photorealistic, cinematic, professional, maximum detail."""

        request_body = {
            "contents": [{
                "parts": [{
                    "text": prompt_text
                }]
            }],
            "generationConfig": {
                "temperature": 0.9,
                "topK": 40,
                "topP": 0.95,
            }
        }

        # Make API request
        response = requests.post(
            f"{API_ENDPOINT}?key={GEMINI_API_KEY}",
            headers={'Content-Type': 'application/json'},
            json=request_body,
            timeout=60
        )

        if not response.ok:
            raise Exception(f"API request failed: {response.status_code} {response.text}")

        result = response.json()

        # Extract image data from response
        if 'candidates' in result and len(result['candidates']) > 0:
            candidate = result['candidates'][0]
            if 'content' in candidate and 'parts' in candidate['content']:
                for part in candidate['content']['parts']:
                    if 'inline_data' in part and 'data' in part['inline_data']:
                        # Decode base64 image data
                        image_data = base64.b64decode(part['inline_data']['data'])

                        # Save to file
                        output_path = OUTPUT_DIR / image_spec['filename']
                        output_path.write_bytes(image_data)

                        size_kb = len(image_data) / 1024
                        print(f"   ✅ Saved to: {output_path}")
                        print(f"   📦 Size: {size_kb:.2f} KB")

                        return {
                            'success': True,
                            'filename': image_spec['filename'],
                            'path': str(output_path),
                            'size': len(image_data)
                        }

        raise Exception('No image data found in API response')

    except Exception as error:
        print(f"   ❌ Error: {str(error)}")
        return {
            'success': False,
            'filename': image_spec['filename'],
            'error': str(error)
        }


def main():
    print('🖼️  FrankX.AI V4 Image Generation System')
    print('==========================================\n')
    print('Using Google Gemini 2.5 Flash Image API (Nano Banana)')
    print(f'Output Directory: {OUTPUT_DIR}\n')

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    results = []

    # Generate images sequentially to avoid rate limits
    for i, image_spec in enumerate(images):
        result = generate_image(image_spec)
        results.append(result)

        # Wait between requests
        if i < len(images) - 1:
            time.sleep(2)

    # Summary
    print('\n==========================================')
    print('📊 Generation Summary\n')

    successful = [r for r in results if r['success']]
    failed = [r for r in results if not r['success']]

    print(f"✅ Successful: {len(successful)}/{len(images)}")
    print(f"❌ Failed: {len(failed)}/{len(images)}")

    if successful:
        total_size = sum(r['size'] for r in successful)
        print(f"📦 Total size: {total_size / 1024 / 1024:.2f} MB")

    if failed:
        print('\n❌ Failed images:')
        for r in failed:
            print(f"   - {r['filename']}: {r['error']}")

    print('\n✅ Image generation complete!')

    # Print file paths for successful images
    if successful:
        print('\n📁 Generated files:')
        for r in successful:
            print(f"   - {r['path']}")


if __name__ == '__main__':
    main()
