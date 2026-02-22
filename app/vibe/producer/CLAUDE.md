# /vibe/producer — Music Producer: Suno AI Prompt Engineering

**Route**: `/vibe/producer`
**Status**: Live (Free Beta)
**Created**: Feb 20, 2026
**Component**: MusicProducerPage (`page.tsx`)

---

## Purpose

Hub page for the Music Producer agent — a Suno AI prompt engineering guide and interactive gateway. Educates users on how to generate professional music matched to their creative state (Alpha, Beta, Theta, Delta brainwaves).

---

## Content Structure

### Hero Section
- Primary CTA: "Start Creating" → `/vibe` (Music Producer agent)
- Secondary CTA: "Learn More" → `/vibe` (info section)
- Brand colors: Purple (#8B5CF6), cyan, emerald gradient

### 1. Brain State Reference (4 sections)
Maps four brainwave states to music parameters:
- **Alpha** (8-12 Hz): Relaxed focus → 60-80 BPM, ambient
- **Beta** (12-30 Hz): Deep work → 120-140 BPM, D Dorian
- **Theta** (4-8 Hz): Creative flow → 80-100 BPM, C Major/A Major
- **Delta** (0.5-4 Hz): Rest/sleep → 50-70 BPM, A Minor/F Major

### 2. Three Core Workflows (with example Suno prompts)
1. **Deep Work Session Music** (coding, writing)
   - Prompt: "Electronic ambient, 128 BPM, D Dorian, layered synthesizers..."

2. **Creative Flow State Music** (brainstorming, sketching)
   - Prompt: "Acoustic indie, 92 BPM, C Major, fingerpicked guitar..."

3. **Recovery & Rest Music** (meditation, sleep)
   - Prompt: "Ambient drone, 60 BPM, A Minor, sustained pads..."

### 3. 6-Part Prompt Formula
Educational breakdown of effective Suno prompts:
1. Genre/Style
2. Tempo/Energy
3. Instruments
4. Vocal Style
5. Mood/Emotion
6. Special Elements

### 4. Learn & Go Deeper (Resource Links)
Links to 4 related blog articles:
- Suno Prompt Engineering Complete Guide
- Suno Music Production Workflow
- The Science of State-Change Music
- Music as Consciousness Technology

### 5. Pricing & CTA Section
- Free tier: 10 prompts/day
- Vibe Club upgrade link
- CTA buttons to `/vibe` and `/products/vibe-os`

---

## Data Sources

### From `data/vibe-agents.json`
```json
{
  "id": "music-producer",
  "name": "Music Producer",
  "personality": "Collaborative studio partner...",
  "specialty": "Suno AI prompt engineering",
  "workflows": [
    { "id": "deep-work-music", ... },
    { "id": "creative-flow-music", ... },
    { "id": "recovery-music", ... }
  ]
}
```

All data on this page is hardcoded based on the agent definition. No dynamic data fetching.

---

## Design System

**Colors**:
- Primary: Purple (#8B5CF6) — matches Music Producer agent color
- Accents: Cyan (#43BFE3), emerald (#10B981), violet
- Background: Dark navy (#02030b)

**Typography**:
- H1: 4xl (sm:5xl lg:6xl), bold
- H2: 3xl, bold
- Body: 16-18px, slate-300/400

**Animations**:
- Hero: staggered opacity + y-offset
- Sections: whileInView with delays
- Background: animated gradient orbs (motion.div)

**Components**:
- Framer Motion for animations
- Lucide icons: Music, Zap, Brain, Sparkles, etc.
- Custom gradient text (bg-clip-text)

---

## Links & Navigation

**Internal Links**:
- `/vibe` → Music Producer agent (primary CTA)
- `/products/vibe-os` → Vibe OS product page
- `/blog/suno-prompt-engineering-complete-guide` → Resource
- `/blog/suno-music-production-workflow` → Resource
- `/blog/science-of-state-change-music` → Resource
- `/blog/music-as-consciousness-technology` → Resource

**External Links**: None

---

## SEO & Metadata

**Title**: "Music Producer — Suno AI Prompt Engineering | Vibe OS"
**Description**: "Generate professional-quality music matched to your creative state. Free tier: 10 prompts/day. Deep focus, creative flow, meditation, and motivation music."
**Keywords**: suno ai, music production, prompt engineering, creative workflows, vibe os, music for focus

---

## Future Enhancements

1. **Interactive Suno Embed Section**: Add 3-5 example tracks (Suno iframe embeds)
2. **Prompt Generator Tool**: Interactive form to generate custom prompts
3. **Success Stories**: User-generated music examples
4. **Advanced Features Section**: DeltaWave frequencies, binaural beats, etc.

---

## Notes

- Page inherits layout from `/app/vibe/layout.tsx`
- All hero CTAs link to `/vibe` agent hub (Music Producer agent)
- Design matches premium Vibe OS aesthetic
- Part of larger Vibe OS ecosystem (3 agents: Music Producer, Coming Soon, Q2 2026)
- Badge shows "Free Beta" status
