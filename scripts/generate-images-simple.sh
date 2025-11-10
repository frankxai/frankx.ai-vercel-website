#!/bin/bash

# Simple script to generate images using available APIs
# Try Nano Banana first, fallback to Gemini

SAVE_DIR="/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website/public/images"
mkdir -p "$SAVE_DIR"

echo "Generating FrankX.AI images..."
echo "Save directory: $SAVE_DIR"

# Check if we can access Nano Banana or Gemini API
if command -v python3 &> /dev/null; then
    echo "Python3 found, attempting to generate images..."
    python3 scripts/generate-images.py
else
    echo "Python3 not found. Please install Python 3 to generate images."
    exit 1
fi
