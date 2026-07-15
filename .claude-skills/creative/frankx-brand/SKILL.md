---
name: frankx-brand
description: Apply official FrankX brand standards to all artifacts, ensuring visual consistency across content, products, and communications. Use this skill for any FrankX-related content creation, design work, or communication.
version: 2.0.0
last_updated: 2026-01-24
changelog: |
  - 2.0.0: Rebrand to professional focus - "Top Creator. Top AI Architect. Humble Excellence."
  - 1.0.0: Initial skill
---

# FrankX Brand Guidelines & Voice
*Premium Quality System*

## Brand Statement
**Top Creator. Top AI Architect. Humble Excellence.**

## Core Mission
Help creators build with AI through technical excellence, practical systems, and results-driven content. No hype. No fluff. Just shipping excellent work.

---

## Brand Pillars

### 1. Technical Excellence
Lead with demonstrated expertise - Oracle-level AI architecture, production-grade systems, real results.

### 2. Creator-First
Empower independent creators with practical tools and knowledge. No corporate jargon, no overwhelming complexity.

### 3. Action-Oriented
Every piece of content ends with a clear next step. No inspiration without implementation.

### 4. Studio Energy
Communicate with the warmth of a late-night studio session - practical, focused, collaborative.

### 5. Humble Confidence
Let the work speak. Show, don't tell. Results over claims.

---

## Visual Identity

### Color Palette - Dark OLED Luxury

**Foundation:**
```css
/* Backgrounds */
--void: #0a0a0b;        /* Primary background */
--space: #111113;       /* Secondary background */
--surface: #1a1a1c;     /* Cards, elevated surfaces */
--border: #2a2a2c;      /* Subtle borders */

/* Text */
--text-primary: #fafafa;
--text-secondary: #a0a0a0;
--text-muted: #666666;
```

**Tech Spectrum:**
```css
/* Primary accent - Technical excellence */
--tech-emerald: #10b981;
--tech-cyan: #06b6d4;
--tech-blue: #3b82f6;
```

**Warm Spectrum:**
```css
/* Secondary accent - Creativity, energy */
--warm-amber: #f59e0b;
--warm-gold: #eab308;
--warm-orange: #f97316;
```

**Usage Guidelines:**
- Void (#0a0a0b) for all backgrounds - true OLED black
- Tech emerald/cyan for primary CTAs and highlights
- Amber/gold for premium accents and badges
- High contrast (7:1+) for accessibility
- Never use pure white backgrounds

### Typography

**Font Families:**
```css
/* Display - Modern, Bold */
--font-display: 'Syne', sans-serif;

/* Body - Clean, Professional */
--font-body: 'Outfit', sans-serif;

/* Serif - Premium Accents */
--font-serif: 'Playfair Display', serif;

/* Code - Technical Content */
--font-code: 'JetBrains Mono', monospace;
```

**Type Scale:**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Visual Style

**Design Principles:**
1. **Dark OLED Luxury** - True black backgrounds, luminous accents
2. **Glassmorphism** - Subtle blur and transparency for depth
3. **Minimal Elegance** - Clean, purposeful, no clutter
4. **Tech-Forward** - Modern, precise, sophisticated
5. **Premium Feel** - Every detail considered

**Visual Effects:**
```css
/* Glassmorphic Cards */
background: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.08) 0%,
  rgba(255, 255, 255, 0.02) 100%
);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);

/* Premium Gradients */
background: linear-gradient(
  135deg,
  rgba(16, 185, 129, 0.15) 0%,
  rgba(6, 182, 212, 0.1) 100%
);

/* Depth Shadows */
box-shadow:
  0 25px 60px rgba(0, 0, 0, 0.5),
  0 12px 25px rgba(0, 0, 0, 0.3);
```

---

## Voice & Tone

### Core Voice Attributes

**Direct** - Clear, concise, no filler words
*"Here's how to build a production-ready AI agent in 30 minutes."*

**Technical but Accessible** - Expert knowledge made approachable
*"LangGraph orchestrates agents like a producer balances stems - each voice clear, all working together."*

**Results-Focused** - Show outcomes, not promises
*"This system processed 10,000 requests with 99.9% uptime."*

**Humble Expertise** - Let work speak for itself
*"Built 500+ AI-generated tracks. Here's what actually works."*

### Tone by Content Type

**Blog Articles:**
- Lead with the practical value
- Use technical examples and code
- End with actionable takeaways
- Example: "Here's the exact architecture that handles 100k concurrent users..."

**Product Copy:**
- Focus on outcomes, not features
- Show real results and metrics
- Clear, honest pricing
- Example: "Production-ready templates. Ship faster."

**Social Media:**
- Short, punchy insights
- Behind-the-scenes building
- Real progress updates
- Example: "Shipped today: AI agent that writes itself. 200 lines of code. Full breakdown →"

**Technical Docs:**
- Clear, structured, comprehensive
- Code examples that work
- Step-by-step guidance
- Example: "Step 1: Initialize the StateGraph..."

### Words We Use
✅ Build, ship, craft, architect, design
✅ Excellence, precision, mastery, quality
✅ Create, develop, implement, execute
✅ Results, metrics, performance, scale
✅ Professional, production-ready, enterprise-grade

### Words We Avoid
❌ Soul-aligned, consciousness, awakening
❌ Transformation (spiritual context)
❌ Vibration, frequency (spiritual context)
❌ Sacred, divine, cosmic
❌ Disrupt, revolutionary, game-changing
❌ Synergy, leverage, utilize
❌ Just, simply, easily (undermines complexity)

---

## Content Structure Patterns

### Blog Article Template
```markdown
# [Clear Headline - What You'll Learn]

[Hook - The problem or opportunity - 1-2 sentences]

**TL;DR:** [50-word summary for AI extraction]

## The Challenge
[What creators struggle with - 1 paragraph]

## The Solution
[Technical approach with code/examples]

## Implementation
[Step-by-step guide with working code]

## Results
[Metrics, outcomes, what you can expect]

## Next Steps
[One clear action to take now]

---
**FAQ Section** (for AI discoverability)
```

### Product Landing Page Structure
```markdown
# Hero Section
- Headline: Clear value proposition (7 words max)
- Subhead: Who it's for + outcome (15 words max)
- CTA: Action-oriented (2-3 words)

# Results/Proof
- Specific metrics
- Real testimonials
- Case studies

# How It Works
- 3-step process max
- Clear visuals

# Features as Benefits
- Outcome-focused descriptions

# Pricing
- Transparent, honest
- Clear tiers

# FAQ
- Address real objections
```

---

## Quality Checklist

Before delivering any FrankX content, verify:

**Visual:**
- [ ] Uses void (#0a0a0b) background
- [ ] Typography follows system (Syne/Outfit/Playfair)
- [ ] Meets WCAG AAA contrast (7:1+)
- [ ] Tech emerald/cyan for primary accents
- [ ] Premium, minimal aesthetic

**Content:**
- [ ] Leads with practical value
- [ ] Technical accuracy verified
- [ ] Clear next action provided
- [ ] No spiritual/consciousness language
- [ ] Results and metrics included

**Structure:**
- [ ] TL;DR in first 100 words
- [ ] Clear hierarchy (H1 → H2 → H3)
- [ ] FAQ section for discoverability
- [ ] Mobile-responsive layout

**Brand Alignment:**
- [ ] Humble, confident tone
- [ ] Technical excellence demonstrated
- [ ] Action-oriented outcome
- [ ] Professional quality throughout

---

## Examples in Action

### ❌ OLD Style (Don't Use)
*"Align your soul-purpose with AI consciousness to transform your creative awakening journey."*

**Issues:** Spiritual language, vague promises, no practical value

### ✅ NEW Style (Use This)
*"Build production-ready AI agents in 30 minutes. Here's the exact architecture that powers 500+ automated workflows."*

**Why it works:** Specific, technical, results-focused, humble expertise

---

### ❌ OLD Style (Don't Use)
*"Tap into the vibrational frequency of conscious creation to manifest your highest potential."*

### ✅ NEW Style (Use This)
*"500+ AI-generated tracks. $50k in licensing revenue. Here's the Suno workflow that actually works."*

---

## When to Use This Skill

Activate `frankx-brand` when creating:
- Blog articles or technical content for FrankX
- Product pages or marketing materials
- Course content for AI Music Academy
- Social media content
- Design assets or visual content
- Any artifact representing the FrankX brand

This skill ensures every output reflects the FrankX brand: technically excellent, practically valuable, humbly confident.

**Core Principle:** Show, don't tell. Let the work speak.

---

**Skill Version:** 2.0.0
**Last Updated:** January 24, 2026
**Brand Position:** Top Creator. Top AI Architect. Humble Excellence.
