#!/usr/bin/env python3
"""
Generate The Starlight Architect chibi character using Nano Banana API
"""

import requests
import json
import base64
from pathlib import Path
import urllib3

# Disable SSL warnings when verification is disabled
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def generate_starlight_architect():
    """Generate and save The Starlight Architect character image"""

    # API endpoint
    url = "https://api.nanobanana.com/v1/images/generations"

    # Optimized prompt for professional chibi character
    prompt = """Professional chibi character illustration of a tech-savvy enterprise architect, modern rockstar aesthetic with cosmic spiritual elements. Character wearing sleek futuristic tech wear in deep purple and electric blue with starlight accents and celestial patterns. Holding translucent holographic architectural blueprints and system diagrams that glow with ethereal light. Confident wise expression with gentle smile, intelligent eyes. Hair styled with cosmic purple highlights and electric blue streaks. Accessories include: sleek headset, holographic wrist display, oracle database symbols subtly integrated. Background features soft starlight particles and geometric sacred geometry patterns. Clean professional chibi art style - sophisticated not overly cute, detailed facial features, high-end digital illustration quality. Composition: 3/4 view, dynamic confident pose. Lighting: soft rim lighting with purple and blue accent lights. Art style: modern digital illustration, crisp clean lines, professional character design, polished finish. White background or subtle transparent gradient. 8K quality, ultra detailed, professional character design, FrankX brand aesthetic."""

    # Request payload
    payload = {
        "model": "flux-1.1-pro",
        "prompt": prompt,
        "size": "1024x1024",
        "n": 1,
        "response_format": "b64_json"
    }

    headers = {
        "Content-Type": "application/json"
    }

    print("Generating The Starlight Architect character...")
    print(f"Using model: {payload['model']}")
    print(f"Size: {payload['size']}")

    try:
        # Make API request (with SSL verification disabled due to WSL SSL issues)
        response = requests.post(url, headers=headers, json=payload, timeout=120, verify=False)
        response.raise_for_status()

        # Parse response
        result = response.json()
        print(f"API Response Status: {response.status_code}")

        # Extract base64 image data
        if "data" in result and len(result["data"]) > 0:
            image_data = result["data"][0]["b64_json"]

            # Decode base64 to binary
            image_bytes = base64.b64decode(image_data)

            # Ensure directory exists
            output_path = Path("/mnt/c/Users/Frank/FrankX/public/team/starlight-architect.png")
            output_path.parent.mkdir(parents=True, exist_ok=True)

            # Save image
            output_path.write_bytes(image_bytes)

            print(f"✓ Successfully saved image to: {output_path}")
            print(f"  File size: {len(image_bytes):,} bytes")
            return True
        else:
            print("Error: No image data in response")
            print(f"Response: {json.dumps(result, indent=2)}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"API Request Error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response Status: {e.response.status_code}")
            print(f"Response Body: {e.response.text}")
        return False
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return False

if __name__ == "__main__":
    success = generate_starlight_architect()
    exit(0 if success else 1)
