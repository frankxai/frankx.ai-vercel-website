# Quick Start: Image Generation

## Generate All 6 Images in 3 Steps

### 1. Get Your API Key
Visit: https://aistudio.google.com/app/apikey
- Sign in
- Click "Create API Key"
- Copy the key

### 2. Run the Script
```bash
cd "/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website"

# Option A: One-line command
GEMINI_API_KEY='your-api-key-here' python3 scripts/generate-v4-images.py

# Option B: Export first
export GEMINI_API_KEY='your-api-key-here'
python3 scripts/generate-v4-images.py
```

### 3. Done!
Images will be saved to: `/public/images/`

## What Gets Generated

1. `hero-ai-hub-v4.png` (1920x1080) - Main hero image
2. `blog-ai-tech-header.png` (1200x630) - AI & Tech category
3. `blog-conscious-header.png` (1200x630) - Conscious AI category
4. `blog-creator-header.png` (1200x630) - Creator Economy category
5. `blog-music-header.png` (1200x630) - AI Music category
6. `blog-personal-dev-header.png` (1200x630) - Personal Dev category

## Time & Cost

- Time: ~60 seconds total
- Cost: $0.23 for all 6 images
- Quality: Photorealistic, cinematic, 8K

## Full Details

See `IMAGE-GENERATION-REPORT.md` for:
- Complete prompt specifications
- Alternative generation methods
- Optimization recommendations
- Security best practices
