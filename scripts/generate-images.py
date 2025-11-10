#!/usr/bin/env python3
"""
Image Generation Script for FrankX.AI
Uses Google Gemini Imagen API via Nano Banana to generate custom hero and header images
"""

import os
import json
import base64
import time
import requests
from pathlib import Path

# Configuration
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyB-raRd6EKVd82aa9S9mwK6bwvEnN6Ek9g')
API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict'

# Output directory
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR.parent / 'public' / 'images'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Image definitions
IMAGES = [
    {
        'filename': 'hero-ai-hub-v4.png',
        'width': 1920,
        'height': 1080,
        'prompt': 'Cinematic wide shot of a futuristic AI command center at night, holographic displays showing code snippets and music waveforms, deep purples and cyans with gold accents, oracle-like mystical atmosphere where consciousness meets technology, volumetric lighting, photorealistic, dramatic rim lighting, epic scale, ARRI Alexa quality, anamorphic lens bokeh, 8k resolution',
        'negative_prompt': 'cartoonish, anime, low quality, blurry, text, watermark, corporate logo, generic stock photo, bright daylight, cluttered'
    },
    {
        'filename': 'blog-ai-tech-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'Futuristic neural network visualization with interconnected nodes glowing in cyan and blue, Oracle cloud infrastructure holographic interfaces in background, enterprise AI architecture floating diagrams, consciousness-inspired sacred geometry patterns, professional yet spiritual aesthetic, wide angle perspective, cinematic lighting, photorealistic, 8k quality',
        'negative_prompt': 'cartoonish, anime, corporate stock photo, clipart, text overlay, watermark, bright colors, messy'
    },
    {
        'filename': 'blog-conscious-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'Ethereal scene where consciousness meets artificial intelligence, sacred geometry patterns merging seamlessly with neural network circuits, purple and gold light emanating from center, cosmic starfield background with circuit board mandala, spiritual technology aesthetic, mystical yet high-tech, cinematic composition, photorealistic rendering, 8k',
        'negative_prompt': 'cartoonish, new age cliche, cheap 3D render, text, watermark, overly bright, cluttered composition'
    },
    {
        'filename': 'blog-creator-header.png',
        'width': 1200,
        'height': 630,
        'prompt': "Bird's eye view of a modern digital creator workspace, multiple curved monitors displaying content creation tools and AI interfaces, glowing AI assistant orbs floating around workspace, warm amber and cyan accent lighting, sleek futuristic studio meets cozy creative space, inspirational and aspirational, photorealistic, shallow depth of field, cinematic quality, 8k",
        'negative_prompt': 'messy desk, cluttered, dark and moody, corporate office, text on screens, watermark, low quality'
    },
    {
        'filename': 'blog-music-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'AI-powered music production studio, holographic waveforms and 3D sound visualization floating in space, Suno AI interface aesthetic with purple and cyan neon accents, musical notes transforming into binary code and back, futuristic synthesizer with glowing controls, cinematic music production vibe, photorealistic, volumetric lighting, 8k resolution',
        'negative_prompt': 'realistic instruments, traditional studio, cartoonish, text overlay, watermark, cluttered, dark and depressing'
    },
    {
        'filename': 'blog-personal-dev-header.png',
        'width': 1200,
        'height': 630,
        'prompt': 'Visualization of growth and consciousness expansion, silhouette of human figure ascending through translucent layers of knowledge and light, AI guides as gentle glowing presences, warm gradient from gold at bottom to cyan at top, inspirational and epic, particle effects suggesting transformation, photorealistic quality, cinematic composition, 8k',
        'negative_prompt': 'cartoonish, cliche motivational poster, cheap 3D, text overlay, watermark, dark mood, cluttered'
    }
]


def generate_image(config):
    """Generate a single image using Gemini Imagen API"""
    print(f"\nGenerating: {config['filename']}")
    print(f"Dimensions: {config['width']}x{config['height']}")
    print(f"Prompt: {config['prompt'][:80]}...")

    try:
        # Prepare API request
        request_body = {
            "instances": [
                {
                    "prompt": config['prompt']
                }
            ],
            "parameters": {
                "sampleCount": 1,
                "aspectRatio": f"{config['width']}:{config['height']}",
                "negativePrompt": config['negative_prompt'],
                "safetySetting": "block_some"
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

        data = response.json()

        # Extract image data
        if 'predictions' not in data or len(data['predictions']) == 0:
            raise Exception('No image data in API response')

        prediction = data['predictions'][0]
        image_base64 = prediction.get('bytesBase64Encoded') or prediction.get('image')

        if not image_base64:
            raise Exception('No image data found in prediction')

        # Decode and save image
        image_bytes = base64.b64decode(image_base64)
        output_path = OUTPUT_DIR / config['filename']

        with open(output_path, 'wb') as f:
            f.write(image_bytes)

        size_kb = len(image_bytes) / 1024
        print(f"✅ Saved: {output_path}")
        print(f"   Size: {size_kb:.2f} KB")

        return str(output_path)

    except Exception as e:
        print(f"❌ Error generating {config['filename']}: {str(e)}")
        raise


def main():
    """Main execution"""
    print('=' * 80)
    print('FrankX.AI Image Generation via Gemini Imagen API')
    print('=' * 80)
    print(f"\nGenerating {len(IMAGES)} images...")

    results = {
        'success': [],
        'failed': []
    }

    for i, image_config in enumerate(IMAGES):
        try:
            # Add delay between requests to avoid rate limiting
            if i > 0:
                print('\nWaiting 3 seconds before next generation...')
                time.sleep(3)

            path = generate_image(image_config)
            results['success'].append({
                'filename': image_config['filename'],
                'path': path
            })

        except Exception as e:
            results['failed'].append({
                'filename': image_config['filename'],
                'error': str(e)
            })

    # Summary
    print('\n' + '=' * 80)
    print('GENERATION SUMMARY')
    print('=' * 80)
    print(f"\n✅ Successful: {len(results['success'])}/{len(IMAGES)}")

    if results['success']:
        print('\nGenerated Images:')
        for item in results['success']:
            print(f"  • {item['filename']}")
            print(f"    {item['path']}")

    if results['failed']:
        print(f"\n❌ Failed: {len(results['failed'])}/{len(IMAGES)}")
        for item in results['failed']:
            print(f"  • {item['filename']}: {item['error']}")

    print('\n' + '=' * 80)

    # Exit with error code if any failed
    if results['failed']:
        exit(1)


if __name__ == '__main__':
    main()
