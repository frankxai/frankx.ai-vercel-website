#!/usr/bin/env python3
"""
FrankX.AI Image Generation Script using Gemini 2.5 Flash Image
Generates epic, cinematic images for personal AI Hub

USAGE:
1. Update GEMINI_API_KEY with a valid API key (with quota available)
2. Run: python3 generate_website_images.py
3. Images will be saved to ../public/images/

API Keys needed: https://ai.google.dev/gemini-api/docs/api-key
Quota info: https://ai.google.dev/gemini-api/docs/rate-limits
"""

import google.generativeai as genai
import time
import os
from pathlib import Path

# ============================================================================
# CONFIGURATION
# ============================================================================

# TODO: Update this with your Gemini API key
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"

# Output directory (relative to script location)
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR.parent / "public" / "images"

# ============================================================================
# IMAGE SPECIFICATIONS
# Epic, cinematic prompts for FrankX.AI personal hub
# ============================================================================

IMAGES = [
    {
        "filename": "hero-ai-hub-v4.png",
        "description": "Hero image for homepage - Frank's AI Hub",
        "prompt": "Cinematic ultra-wide establishing shot of a futuristic AI command center at night, massive curved holographic displays showing flowing code streams, ethereal music waveforms, and glowing constellation patterns, deep royal purples and electric cyans with gold accents, oracle-like mystical atmosphere, consciousness meets cutting-edge technology, photorealistic rendering, dramatic volumetric lighting with god rays, epic cinematic scale, 8k quality, shot on ARRI Alexa, anamorphic lens flare",
    },
    {
        "filename": "blog-ai-tech-header.png",
        "description": "AI & Technology category header",
        "prompt": "Futuristic neural network visualization in 3D space, interconnected glowing nodes in cyan and electric blue with data flowing between them, Oracle cloud infrastructure towers in deep background with dramatic fog, enterprise AI architecture blueprint hologram, floating code displays with technical diagrams, professional yet consciousness-inspired aesthetic, wide angle cinematic shot, depth of field, volumetric lighting, photorealistic, tech noir atmosphere",
    },
    {
        "filename": "blog-conscious-header.png",
        "description": "Conscious AI category header",
        "prompt": "Ethereal consciousness merging with artificial intelligence, intricate sacred geometry patterns seamlessly blending with glowing neural networks, rich purple and luminous gold light rays, cosmic nebula background with circuit board mandala design, spiritual technology aesthetic, photorealistic mystical atmosphere, cinematic lighting with lens flare, depth and dimension, particles of light, consciousness as code visualization, 8k quality",
    },
    {
        "filename": "blog-creator-header.png",
        "description": "Creator Economy category header",
        "prompt": "Bird's eye view of digital creator workspace, multiple curved monitors displaying content creation tools and creative software, AI assistants visualized as floating glowing ethereal orbs with particle trails, warm amber studio lighting mixed with cyan holographic accents, modern creative studio meets futuristic technology, inspirational and aspirational mood, cinematic depth of field, photorealistic rendering, professional photography, cozy yet high-tech atmosphere",
    },
    {
        "filename": "blog-music-header.png",
        "description": "AI Music category header",
        "prompt": "AI-powered music production studio in cyberspace, three-dimensional sound waveforms and frequency visualization floating in space, Suno AI interface aesthetic with glowing purple and cyan neon elements, musical notes and staff notation dynamically transforming into code streams and back to music, volumetric fog with particle effects, cinematic music production vibe, photorealistic rendering, dramatic lighting, depth and atmosphere, futuristic yet artistic",
    },
    {
        "filename": "blog-personal-dev-header.png",
        "description": "Personal Development category header",
        "prompt": "Growth mindset visualization, silhouette of human figure ascending through multiple translucent layers of consciousness and flowing knowledge streams, AI assistants as gentle guiding lights surrounding the path, warm gradient color transition from golden sunrise to electric cyan zenith, inspirational and epic atmosphere, photorealistic with ethereal elements, cinematic lighting with god rays, particles of light representing insights, depth and dimension, uplifting heroic mood, 8k quality",
    }
]

# ============================================================================
# GENERATION FUNCTIONS
# ============================================================================

def generate_image_gemini(prompt):
    """Generate image using Gemini 2.5 Flash Image API"""

    print(f"  Prompt: {prompt[:100]}...")

    try:
        # Use the official SDK
        model = genai.GenerativeModel("gemini-2.5-flash-image-preview")
        response = model.generate_content(prompt)

        # Extract image data from response
        if hasattr(response, 'candidates') and response.candidates:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                for part in candidate.content.parts:
                    if hasattr(part, 'inline_data') and part.inline_data:
                        image_data = part.inline_data.data
                        return image_data

        print(f"  WARNING: No image data in response")
        print(f"  Response: {response}")
        return None

    except Exception as e:
        print(f"  ERROR: Generation failed: {e}")
        return None

def save_image(image_data, output_path):
    """Save base64 image data to file"""

    try:
        import base64
        # Decode base64 if it's a string
        if isinstance(image_data, str):
            image_bytes = base64.b64decode(image_data)
        else:
            image_bytes = image_data

        with open(output_path, 'wb') as f:
            f.write(image_bytes)

        print(f"  ✓ Saved to {output_path}")

        # Get file size
        size_kb = len(image_bytes) / 1024
        print(f"  ✓ File size: {size_kb:.1f} KB")
        return True
    except Exception as e:
        print(f"  ERROR: Failed to save: {e}")
        return False

# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Generate all FrankX.AI images"""

    print("=" * 80)
    print("FrankX.AI Image Generation")
    print("Powered by Gemini 2.5 Flash Image")
    print("=" * 80)
    print()

    # Validate API key
    if GEMINI_API_KEY == "YOUR_GEMINI_API_KEY_HERE":
        print("ERROR: Please update GEMINI_API_KEY in the script")
        print()
        print("Get your API key from: https://ai.google.dev/gemini-api/docs/api-key")
        print()
        return

    # Configure Gemini
    genai.configure(api_key=GEMINI_API_KEY)

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    print()

    results = []

    for i, spec in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] Generating: {spec['filename']}")
        print(f"Description: {spec['description']}")
        print("-" * 80)

        # Generate image
        image_data = generate_image_gemini(prompt=spec["prompt"])

        if not image_data:
            print(f"  ✗ FAILED: Could not generate image")
            results.append({
                "filename": spec["filename"],
                "success": False,
                "error": "Generation failed"
            })
            print()
            continue

        # Save to file
        output_path = OUTPUT_DIR / spec["filename"]
        success = save_image(image_data, str(output_path))

        results.append({
            "filename": spec["filename"],
            "path": str(output_path) if success else None,
            "success": success
        })

        print()

        # Pause between requests to respect rate limits
        if i < len(IMAGES):
            wait_seconds = 8
            print(f"  ⏱ Waiting {wait_seconds} seconds before next generation...")
            print()
            time.sleep(wait_seconds)

    # Print summary
    print("=" * 80)
    print("GENERATION COMPLETE")
    print("=" * 80)
    print()

    successful = [r for r in results if r["success"]]
    failed = [r for r in results if not r["success"]]

    print(f"Successful: {len(successful)}/{len(IMAGES)}")
    print()

    if successful:
        print("✓ Generated Images:")
        for result in successful:
            print(f"  - {result['path']}")
        print()

    if failed:
        print(f"✗ Failed: {len(failed)}")
        for result in failed:
            print(f"  - {result['filename']}: {result.get('error', 'Unknown error')}")
        print()

    if successful:
        print(f"Images saved to: {OUTPUT_DIR}")
        print()

if __name__ == "__main__":
    main()
