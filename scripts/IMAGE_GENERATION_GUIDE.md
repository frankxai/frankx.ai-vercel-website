# FrankX.AI Image Generation Guide

## Overview
This guide provides everything needed to generate epic, cinematic images for the FrankX.AI website using AI image generation tools.

## Status: API Quota Exceeded
Both available Gemini API keys have exceeded their free tier quota. You have the following options:

### Option 1: Wait for Quota Reset
- Free tier quotas reset daily
- Try again after 24 hours
- Run `python3 scripts/generate_website_images.py` (after updating API key)

### Option 2: Upgrade to Paid Tier
- Visit https://ai.google.dev/pricing
- Enable billing for Gemini API
- Update `GEMINI_API_KEY` in `scripts/generate_website_images.py`

### Option 3: Use Alternative Services
Generate images manually using these optimized prompts on other platforms:
- Midjourney (https://midjourney.com)
- DALL-E 3 (https://openai.com/dall-e-3)
- Stable Diffusion XL
- Leonardo.ai
- Any other AI image generator

---

## Image Specifications

### 1. Hero Image - Main Homepage
**Filename:** `hero-ai-hub-v4.png`
**Size:** 1920x1080 (16:9)
**Purpose:** Homepage hero section - represents Frank's AI Hub

**Prompt:**
```
Cinematic ultra-wide establishing shot of a futuristic AI command center at night, massive curved holographic displays showing flowing code streams, ethereal music waveforms, and glowing constellation patterns, deep royal purples and electric cyans with gold accents, oracle-like mystical atmosphere, consciousness meets cutting-edge technology, photorealistic rendering, dramatic volumetric lighting with god rays, epic cinematic scale, 8k quality, shot on ARRI Alexa, anamorphic lens flare
```

**Negative Prompt:**
```
cartoon, anime, illustration, corporate office, boring, daytime, flat lighting, people, text, watermark, low quality, blurry
```

---

### 2. AI & Technology Category Header
**Filename:** `blog-ai-tech-header.png`
**Size:** 1200x630 (16:9 approximation)
**Purpose:** Header for AI & Technology blog category

**Prompt:**
```
Futuristic neural network visualization in 3D space, interconnected glowing nodes in cyan and electric blue with data flowing between them, Oracle cloud infrastructure towers in deep background with dramatic fog, enterprise AI architecture blueprint hologram, floating code displays with technical diagrams, professional yet consciousness-inspired aesthetic, wide angle cinematic shot, depth of field, volumetric lighting, photorealistic, tech noir atmosphere
```

**Negative Prompt:**
```
cartoon, flat, 2D, people, text overlay, corporate stock photo, boring, daytime, low quality
```

---

### 3. Conscious AI Category Header
**Filename:** `blog-conscious-header.png`
**Size:** 1200x630
**Purpose:** Header for Conscious AI blog category

**Prompt:**
```
Ethereal consciousness merging with artificial intelligence, intricate sacred geometry patterns seamlessly blending with glowing neural networks, rich purple and luminous gold light rays, cosmic nebula background with circuit board mandala design, spiritual technology aesthetic, photorealistic mystical atmosphere, cinematic lighting with lens flare, depth and dimension, particles of light, consciousness as code visualization, 8k quality
```

**Negative Prompt:**
```
cartoon, flat, people, text, watermark, corporate, sci-fi spaceship, low quality, oversaturated
```

---

### 4. Creator Economy Category Header
**Filename:** `blog-creator-header.png`
**Size:** 1200x630
**Purpose:** Header for Creator Economy blog category

**Prompt:**
```
Bird's eye view of digital creator workspace, multiple curved monitors displaying content creation tools and creative software, AI assistants visualized as floating glowing ethereal orbs with particle trails, warm amber studio lighting mixed with cyan holographic accents, modern creative studio meets futuristic technology, inspirational and aspirational mood, cinematic depth of field, photorealistic rendering, professional photography, cozy yet high-tech atmosphere
```

**Negative Prompt:**
```
messy, cluttered, cartoon, people visible, text on screens, corporate office, boring, flat lighting, low quality
```

---

### 5. AI Music Category Header
**Filename:** `blog-music-header.png`
**Size:** 1200x630
**Purpose:** Header for AI Music blog category

**Prompt:**
```
AI-powered music production studio in cyberspace, three-dimensional sound waveforms and frequency visualization floating in space, Suno AI interface aesthetic with glowing purple and cyan neon elements, musical notes and staff notation dynamically transforming into code streams and back to music, volumetric fog with particle effects, cinematic music production vibe, photorealistic rendering, dramatic lighting, depth and atmosphere, futuristic yet artistic
```

**Negative Prompt:**
```
cartoon, flat 2D, people, instruments in foreground, text, watermark, corporate, boring, low quality
```

---

### 6. Personal Development Category Header
**Filename:** `blog-personal-dev-header.png`
**Size:** 1200x630
**Purpose:** Header for Personal Development blog category

**Prompt:**
```
Growth mindset visualization, silhouette of human figure ascending through multiple translucent layers of consciousness and flowing knowledge streams, AI assistants as gentle guiding lights surrounding the path, warm gradient color transition from golden sunrise to electric cyan zenith, inspirational and epic atmosphere, photorealistic with ethereal elements, cinematic lighting with god rays, particles of light representing insights, depth and dimension, uplifting heroic mood, 8k quality
```

**Negative Prompt:**
```
cartoon, corporate stock photo, cheesy, text overlay, people's faces, low quality, flat, boring
```

---

## Design Guidelines

### Color Palette
- **Primary:** Deep royal purple (#6B46C1)
- **Secondary:** Electric cyan (#00D9FF)
- **Accent:** Luminous gold (#FFD700)
- **Mood:** Consciousness meets technology

### Style Direction
- **Cinematic:** Epic, dramatic, wide-angle shots
- **Lighting:** Volumetric lighting, god rays, lens flare
- **Quality:** Photorealistic, 8k quality
- **Atmosphere:** Mystical yet professional, not corporate
- **Tone:** Personal AI Hub, not a product site

### Key Elements
- Holographic displays
- Flowing data/code streams
- Music waveforms (for hero)
- Neural networks
- Sacred geometry (for conscious category)
- Futuristic technology
- Consciousness/spiritual tech aesthetic

---

## Automated Generation Script

### Prerequisites
```bash
pip install google-generativeai
```

### Usage
1. Get Gemini API key: https://ai.google.dev/gemini-api/docs/api-key
2. Update `GEMINI_API_KEY` in `scripts/generate_website_images.py`
3. Run:
```bash
cd /mnt/c/Users/Frank/FrankX/FrankX.AI\ -\ Vercel\ Website
python3 scripts/generate_website_images.py
```

### Output
Images will be saved to: `/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website/public/images/`

---

## Alternative Manual Generation

### Using Midjourney
1. Join Midjourney Discord
2. Use `/imagine` command with prompts above
3. Add `--ar 16:9` for aspect ratio
4. Use `--quality 2` for higher quality
5. Download and save to `public/images/`

### Using DALL-E 3
1. Use ChatGPT Plus or API
2. Paste prompts above
3. Download generated images
4. Resize to specified dimensions if needed
5. Save to `public/images/`

### Using Stable Diffusion XL
1. Use ComfyUI or Automatic1111
2. Use SDXL model
3. Paste prompts above
4. Set dimensions to 1024x1024 or use ControlNet for specific sizes
5. Save to `public/images/`

---

## Image Optimization

After generating, optimize images for web:
```bash
# Install optimization tools
npm install -g sharp-cli

# Optimize images
sharp -i hero-ai-hub-v4.png -o hero-ai-hub-v4-optimized.png --webp
```

---

## Current Status
- **Script Location:** `/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website/scripts/generate_website_images.py`
- **Prompts:** Optimized for Gemini 2.5 Flash Image model
- **API Status:** Quota exceeded - retry tomorrow or upgrade to paid
- **Manual Alternative:** Use prompts above with Midjourney/DALL-E/SD

---

## Notes
- All prompts are optimized for epic, cinematic feel
- NOT corporate - personal hub aesthetic
- Consciousness-inspired technology theme
- Purple/cyan/gold color scheme
- Photorealistic quality
- No people, text, or watermarks
