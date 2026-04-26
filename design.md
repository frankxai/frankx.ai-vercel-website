---
version: alpha
name: FrankX
description: >
  Dual-spectrum dark-first design system for the FrankX creator + AI architect
  brand. Tech (emerald/cyan) and Soul (amber/gold) live side by side on a deep
  obsidian foundation. Built for restraint, technical rigor, and humble
  excellence.
colors:
  # ---------- canonical aliases (required for spec compliance) ----------
  primary: "#10b981"        # alias of tech-primary; the working CTA color
  secondary: "#f59e0b"      # alias of soul-primary
  tertiary: "#AB47C7"       # alias of bridge-purple
  neutral: "#0a0a0b"        # alias of void

  # ---------- foundation (solid hex; alpha layers documented in prose) ----------
  void: "#0a0a0b"           # page background — almost-black, never pure
  space: "#111113"          # primary elevated surface
  elevated: "#1a1a1f"       # secondary elevated; cards on cards
  subtle: "#252530"         # hover states
  border: "#1E1E1E"         # precomputed: white at 8% over void
  border-strong: "#2F2F2F"  # precomputed: white at 15% over void

  # ---------- ink (text) ----------
  ink: "#FFFFFF"            # high-emphasis text
  ink-muted: "#A9A9AA"      # body copy (white at 65% over void)
  ink-subtle: "#787878"     # captions (white at 45% over void)
  ink-faint: "#535354"      # disabled (white at 30% over void)

  # ---------- tech spectrum (emerald + cyan) ----------
  tech-primary: "#10b981"   # emerald-500 — primary CTAs, AI/technical accents
  tech-secondary: "#06b6d4" # cyan-500 — highlights, intelligence cues
  tech-light: "#34d399"     # emerald-400 — hover
  tech-dark: "#059669"      # emerald-600 — pressed
  tech-glow: "#0F1F1A"      # emerald at 15% over void

  # ---------- soul spectrum (amber + gold) ----------
  soul-primary: "#f59e0b"   # amber-500 — Soulbook, warmth, music
  soul-secondary: "#fbbf24" # amber-400 — highlights
  soul-light: "#fcd34d"     # amber-300 — hover
  soul-dark: "#d97706"      # amber-600 — pressed
  soul-glow: "#241B0F"      # amber at 15% over void

  # ---------- bridge (creative/spiritual) ----------
  bridge-purple: "#AB47C7"  # brand purple — creative worlds, Arcanea
  bridge-blue: "#43BFE3"    # brand blue — clarity, flow
  bridge-magenta: "#E040FB" # brand magenta — energy, transformation
  bridge-violet: "#7C3AED"  # arcanea glow

  # ---------- semantic ----------
  success: "#22c55e"
  warning: "#f59e0b"
  error: "#ef4444"
  info: "#06b6d4"

typography:
  # display — Poppins, used only at ≥18px
  display-2xl:
    fontFamily: Poppins
    fontSize: 5.653rem
    lineHeight: "1"
    letterSpacing: "-0.02em"
    fontWeight: 800
  display-xl:
    fontFamily: Poppins
    fontSize: 4.243rem
    lineHeight: "1"
    letterSpacing: "-0.02em"
    fontWeight: 800
  display-lg:
    fontFamily: Poppins
    fontSize: 3.183rem
    lineHeight: "1.05"
    letterSpacing: "-0.01em"
    fontWeight: 700

  # headings — Poppins, perfect-fourth scale (1.333)
  h1:
    fontFamily: Poppins
    fontSize: 2.369rem
    lineHeight: "1.1"
    letterSpacing: "-0.01em"
    fontWeight: 700
  h2:
    fontFamily: Poppins
    fontSize: 1.777rem
    lineHeight: "1.2"
    letterSpacing: "-0.005em"
    fontWeight: 600
  h3:
    fontFamily: Poppins
    fontSize: 1.333rem
    lineHeight: "1.3"
    fontWeight: 600
  h4:
    fontFamily: Poppins
    fontSize: 1rem
    lineHeight: "1.4"
    fontWeight: 600

  # body — Inter, the workhorse
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    lineHeight: "1.7"
    fontWeight: 400
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: "1.6"
    fontWeight: 400
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: "1.5"
    fontWeight: 400

  # labels — Inter, all-caps tracking for eyebrows
  label-eyebrow:
    fontFamily: Inter
    fontSize: 0.6875rem
    lineHeight: "1.4"
    letterSpacing: "0.25em"
    fontWeight: 500
    textTransform: uppercase
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: "1.4"
    letterSpacing: "0.01em"
    fontWeight: 500

  # quote — Playfair Display italic, used sparingly
  quote:
    fontFamily: Playfair Display
    fontSize: 1.5rem
    lineHeight: "1.4"
    fontStyle: italic

  # code — JetBrains Mono
  code:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    lineHeight: "1.5"

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  "4xl": 96px

rounded:
  sm: 6px
  md: 12px
  lg: 16px
  xl: 24px
  "2xl": 32px
  full: 9999px

shadow:
  none: "none"
  sm: "0 1px 2px rgba(0,0,0,0.4)"
  md: "0 4px 16px rgba(0,0,0,0.4)"
  lg: "0 12px 40px rgba(0,0,0,0.5)"
  glow-tech: "0 0 40px rgba(16,185,129,0.25)"
  glow-soul: "0 0 40px rgba(245,158,11,0.25)"

components:
  page:
    backgroundColor: "{colors.void}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.border}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-tech:
    backgroundColor: "{colors.tech-primary}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-tech-pressed:
    backgroundColor: "{colors.tech-dark}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-soul:
    backgroundColor: "{colors.soul-primary}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-soul-hover:
    backgroundColor: "{colors.soul-light}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-soul-pressed:
    backgroundColor: "{colors.soul-dark}"
    textColor: "#000000"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-md}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.space}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-elevated:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.xl}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-tech:
    backgroundColor: "{colors.tech-glow}"
    textColor: "{colors.tech-light}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-tech-secondary:
    backgroundColor: "{colors.tech-glow}"
    textColor: "{colors.tech-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-soul:
    backgroundColor: "{colors.soul-glow}"
    textColor: "{colors.soul-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-bridge:
    backgroundColor: "{colors.bridge-violet}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  badge-arcanea:
    backgroundColor: "{colors.bridge-purple}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  badge-magenta:
    backgroundColor: "{colors.bridge-magenta}"
    textColor: "{colors.void}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  surface-page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-md}"
  link-primary:
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  link-secondary:
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
  link-tertiary:
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  caption:
    textColor: "{colors.ink-subtle}"
    typography: "{typography.body-sm}"
  meta:
    textColor: "{colors.ink-faint}"
    typography: "{typography.label-md}"
  divider:
    backgroundColor: "{colors.border-strong}"
    height: "1px"
  alert-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.void}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  alert-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.void}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  alert-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.void}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  alert-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.void}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  link-bridge:
    textColor: "{colors.bridge-blue}"
    typography: "{typography.body-md}"
  input:
    backgroundColor: "{colors.space}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# FrankX — Design System

> **For coding agents:** Read this file once at session start before generating any visual code. Pair it with `taste.md` (philosophy and restraint). Source-of-truth tokens live in `tailwind.config.js`; this file is the canonical agent-readable contract.

## Overview

FrankX is the personal hub of an AI architect, music creator, and writer. The design carries three jobs at once and refuses to compromise any of them:

- **Excellence** — every detail considered. Nothing here looks AI-generated.
- **Craft** — Inter for clarity, Poppins for presence, Playfair for soul, JetBrains for proof. Each font earns its place.
- **Humility** — restraint over flash. The work speaks; the chrome stays out of the way.

The system is **dark-first** because the audience reads at night, in studios, on the bridge between work and craft. The foundation (`void`, `space`, `elevated`, `subtle`) is a four-step ladder of near-black surfaces that lets accent colors land precisely.

Color identity is **dual-spectrum**:
- **Tech** (emerald + cyan) for AI, technical, architecture, code.
- **Soul** (amber + gold) for music, writing, transformation, story.
- **Bridge** (purple/blue/magenta) for the worlds where they meet — Arcanea, creative AI, generative storytelling.

A page should pick one spectrum and stay loyal to it. Mixing tech and soul in the same hero is a smell.

## Colors

### Foundation

The four-step background ladder is the most important decision in the system. Always go *deeper* than instinct suggests; FrankX is darker than most dark themes by design.

| Token | Hex | Use |
|---|---|---|
| `void` | `#0a0a0b` | Page background. Never pure black — the warm tint matters. |
| `space` | `#111113` | Cards, modals, primary elevated surface. |
| `elevated` | `#1a1a1f` | Hover states, secondary cards. |
| `subtle` | `#252530` | Borders, dividers, the faintest separation. |

Borders use **white at low alpha** (`rgba(255,255,255,0.08)`) — never a literal grey. This keeps the surface feeling lit from within rather than painted on.

### Ink (text)

| Token | Alpha | Use |
|---|---|---|
| `ink` | 100% | Headings, primary statements |
| `ink-muted` | 65% | Body copy |
| `ink-subtle` | 45% | Captions, helper text |
| `ink-faint` | 30% | Disabled, decorative meta |

Body copy lives at 65% alpha, not pure white. Pure white on `void` reads as a screenshot of a screen — not a designed surface. Drop to 65% and the page breathes.

### Tech spectrum

`tech-primary` (`#10b981`) is the working color of any AI/architecture/code surface. CTA buttons, links, accent rings, focus states. `tech-secondary` (`#06b6d4`, cyan) supports — it does not lead. Glow uses tech at 15% alpha for ambient halos behind hero content.

### Soul spectrum

`soul-primary` (`#f59e0b`) leads anywhere the topic is music, story, transformation, hope. The Soulbook, the music lab, the personal essays. Same supporting role for `soul-secondary` (`#fbbf24`) — never give it the lead.

### Bridge spectrum

Purple-violet-magenta combinations belong to creative worlds (Arcanea, Ultraworld, generative fiction). Use sparingly; this spectrum is intentionally rare so it carries weight when it appears.

### Semantic

`success`, `warning`, `error`, `info` exist for status and feedback only. Never use them decoratively.

## Typography

Four faces, four jobs:

- **Inter** — body, UI, labels. The workhorse. Variable, ships fast, reads on every screen.
- **Poppins** — display + headings. Used **only at ≥18px** (geometric sans-serifs collapse below that). Every page above the fold uses Poppins for its h1.
- **Playfair Display** — italic quotes, editorial pull-quotes, hero blockquotes. Never as a heading.
- **JetBrains Mono** — code blocks, terminal output, command examples, anywhere we are showing engineering proof.

Scale follows **Perfect Fourth (1.333)**. The exact values are in the `typography` frontmatter — agents should reference those tokens, not invent intermediate sizes.

### Letter-spacing rules
- Display sizes: `-0.02em` (negative tracking pulls Poppins together at large sizes)
- Headings: `-0.01em` to `-0.005em`
- Body: `0`
- Eyebrows / caps labels: `0.25em` (this wide tracking is the most recognizable FrankX shape)

### The eyebrow pattern

`label-eyebrow` (11px, 0.25em tracking, uppercase, 60% alpha) above the h2 of a section is a near-universal pattern in this system. It announces "section incoming" without claiming heading hierarchy.

## Layout

### Spacing

`xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96)` — every gap, padding, and stack uses these tokens. There are no `12px`, `20px`, `40px` values in this system. If a number isn't on the scale, the answer isn't a new number — it's the closer existing one.

### Container widths

| Use | Max width |
|---|---|
| Reading prose (blog, essays) | `max-w-3xl` (768px) |
| Hub pages, generic content | `max-w-5xl` (1024px) |
| Marketing hero, full sections | `max-w-6xl` (1152px) |
| Wide grids (templates, libraries) | `max-w-7xl` (1280px) |

Default to `max-w-6xl` if unsure. Never let a paragraph run wider than `3xl` — readability collapses past 70 characters per line.

### Section rhythm

Each top-level section uses `py-24 lg:py-32` (96–128px vertical), separated by `border-t border-white/5`. This creates the long-scroll cadence the homepage and hubs depend on.

### Grid behavior

Cards default to `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-4` to `gap-6`. Five-column rails (Library, books) use `lg:grid-cols-5`. Avoid 4-column unless content demands it.

## Elevation & Depth

Elevation is achieved through **two stacked techniques**, never one:

1. **Background brightness step-up** — `void` → `space` → `elevated` → `subtle`. Each step is roughly +3% luminance. This is the primary depth signal.
2. **Border at low alpha** — `rgba(255,255,255,0.08)` for resting, `0.15` for hover/focus. Borders frame elevation; they don't carry it.

**Drop shadows are a third layer**, used sparingly:
- `shadow-md` for cards that float above their context (modals, sticky CTAs).
- `shadow-glow-tech` / `shadow-glow-soul` for hero buttons and feature highlights — single-use accents, not decoration.

### Backdrop blur

`backdrop-blur-xl` over translucent surfaces (`bg-white/5`) gives the signature glassmorphic feeling. Use for: floating navigation, overlays on imagery, in-content banners. Never for static cards on flat backgrounds — the blur has nothing to blur, and the surface looks dirty.

## Shapes

### Rounded scale

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 6px | Small chips, inline tags |
| `rounded-md` | 12px | Inputs, buttons, small cards |
| `rounded-lg` | 16px | Standard cards |
| `rounded-xl` | 24px | Hero cards, feature blocks |
| `rounded-2xl` | 32px | Large promotional surfaces |
| `rounded-full` | 9999px | Pills, eyebrows, primary CTAs |

Primary CTAs are **always `rounded-full`**. This is the most recognizable button shape in the system.

### Aspect ratios

- Book covers: `aspect-[2/3]`
- Article thumbnails: `aspect-video` (16:9)
- Square avatars / icons: `aspect-square`
- Hero imagery: `aspect-[16/9]` desktop, `aspect-[4/5]` mobile

## Components

The frontmatter `components` map defines token bindings. Implementation lives in `components/` — agents read tokens, then look at the existing component for layout. Never re-implement a component without first checking `components/` for the existing one.

### Button hierarchy

- **`button-primary`** (white background, black text, full radius) — only one per viewport. The unmistakable next-action.
- **`button-tech`** (emerald background, black text) — when the page is tech-spectrum and the action is the technical CTA.
- **`button-secondary`** (white at 5% alpha, white text, soft border) — supporting action.
- **`button-ghost`** (transparent, muted text) — tertiary, often inline.

Buttons in the same row have *one* primary maximum. Two equal-weight CTAs is design indecision made visible.

### Cards

Default card is `rounded-xl bg-space border border-white/5 p-6`. Hover transitions `bg-elevated` and `border-white/10`. Don't reach for shadow on cards inside a card grid — the background ladder already creates depth.

### Eyebrow + headline

The signature section opener:

```jsx
<p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
  {SECTION_LABEL}
</p>
<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
  {HEADLINE}
</h2>
<p className="text-base text-white/60 max-w-xl">
  {DECK}
</p>
```

Recognize this pattern. Reuse it. Don't reinvent it.

### Form inputs

`bg-space text-ink rounded-md px-4 py-3 ring-1 ring-white/10 focus:ring-tech-primary/60`. Labels above, helper text below at `body-sm` and `ink-subtle`. No floating labels — they read as gimmick on this brand.

## Do's and Don'ts

### Do
- ✅ Pick one spectrum (tech *or* soul) per page and stay loyal
- ✅ Use the eyebrow + headline + deck section opener consistently
- ✅ Drop body copy to `ink-muted` (65%) — pure white reads harsh
- ✅ Use `rounded-full` for primary CTAs — it's the brand-recognizable shape
- ✅ Respect the spacing scale; if you need 20px, you actually need 16px or 24px
- ✅ Prefer the four-step background ladder for elevation; reach for shadow last
- ✅ Show technical proof with JetBrains Mono — code samples, command outputs, file paths
- ✅ Use `prefers-reduced-motion` guards on every animation

### Don't
- ❌ Use Poppins below 18px (it collapses; switch to Inter)
- ❌ Mix tech (emerald) and soul (amber) accents in the same hero
- ❌ Reach for pure black (`#000`) — `void` (`#0a0a0b`) is always the answer
- ❌ Use a literal grey for borders — `white at 0.08–0.15 alpha` is the convention
- ❌ Stack two equal-weight CTAs side by side (one primary maximum)
- ❌ Use Playfair for headings — quotes only
- ❌ Create new spacing values — the scale is the scale
- ❌ Use Tailwind's default `slate-*` for body text — drop to `ink-muted` instead
- ❌ Auto-play video, parallax-scroll bands, full-page color washes, glassmorphism without imagery underneath
- ❌ Use emojis as design elements (they belong in copy, never in chrome)

## Validation

This file should pass `npx @google/design.md lint` (Google Labs CLI). For every visual change:

1. Read this file + `taste.md`
2. Build to existing tokens; if a value isn't here, the value doesn't exist yet
3. Verify WCAG contrast: 4.5:1 for body text, 3:1 for UI elements
4. Verify touch targets ≥ 44×44px on interactive elements
5. Run `prefers-reduced-motion` audit on any animation
6. Compare to nearest existing component before scaffolding new

## Provenance

- Spec: [Google Labs DESIGN.md](https://github.com/google-labs-code/design.md) (Apache 2.0, alpha, 2026-04-21)
- Source-of-truth values: `tailwind.config.js` + `lib/design-system.ts`
- Brand voice: `docs/brand-voice.md`
- Color reference: `docs/COLOR_REFERENCE.md`
- Aesthetic philosophy: `taste.md` (companion file — read together)

Last reviewed: 2026-04-25
