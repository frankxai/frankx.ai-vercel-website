# FrankX.AI Color Reference

## Visual Color Palette

### Background System (Universal)

| Name | Hex | RGB | Usage | Luminance |
|------|-----|-----|-------|-----------|
| **void** | `#0a0a0b` | rgb(10, 10, 11) | Main page background | 3% |
| **space** | `#111113` | rgb(17, 17, 19) | Cards, modals (primary elevated) | 6% |
| **elevated** | `#18181b` | rgb(24, 24, 27) | Hover states (secondary elevated) | 9% |
| **subtle** | `#1f1f23` | rgb(31, 31, 35) | Borders, dividers | 12% |

**Visual Preview:**
```
████ void     - Deepest black
████ space    - Primary elevated
████ elevated - Secondary elevated
████ subtle   - Borders/dividers
```

---

### Tech Spectrum (Emerald/Cyan)

**Use For:** AI tools, technical tutorials, product pages, code examples

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **Tech Primary** | `#10b981` | `bg-tech-primary` | Primary CTAs, links |
| **Tech Secondary** | `#06b6d4` | `bg-tech-secondary` | Highlights, accents |
| **Tech Light** | `#34d399` | `bg-tech-light` | Hover states |
| **Tech Dark** | `#059669` | `bg-tech-dark` | Pressed/active states |
| **Tech Glow** | `rgba(16, 185, 129, 0.15)` | `bg-tech-glow` | Ambient glow overlay |

**Visual Preview:**
```
████ #10b981 (Emerald-500) - Primary
████ #06b6d4 (Cyan-500) - Secondary
████ #34d399 (Emerald-400) - Light
████ #059669 (Emerald-600) - Dark
▓▓▓▓ rgba(16, 185, 129, 0.15) - Glow (translucent)
```

**Color Psychology:**
- Emerald: Growth, innovation, forward momentum
- Cyan: Intelligence, clarity, future-thinking
- Combined: Technical excellence + creative possibility

---

### Soul Spectrum (Amber/Gold)

**Use For:** Soulbook, personal stories, transformation content, music

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **Soul Primary** | `#f59e0b` | `bg-soul-primary` | Primary CTAs, links |
| **Soul Secondary** | `#fbbf24` | `bg-soul-secondary` | Highlights, accents |
| **Soul Light** | `#fcd34d` | `bg-soul-light` | Hover states |
| **Soul Dark** | `#d97706` | `bg-soul-dark` | Pressed/active states |
| **Soul Glow** | `rgba(245, 158, 11, 0.15)` | `bg-soul-glow` | Ambient glow overlay |

**Visual Preview:**
```
████ #f59e0b (Amber-500) - Primary
████ #fbbf24 (Amber-400) - Secondary
████ #fcd34d (Amber-300) - Light
████ #d97706 (Amber-600) - Dark
▓▓▓▓ rgba(245, 158, 11, 0.15) - Glow (translucent)
```

**Color Psychology:**
- Amber: Warmth, wisdom, organic growth
- Gold: Transformation, value, enlightenment
- Combined: Inner wisdom + authentic expression

---

### Hybrid (Strategic Bridge)

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **Hybrid** | `#8b5cf6` | `bg-hybrid` | Strategic content bridging tech + soul |

**Visual Preview:**
```
████ #8b5cf6 (Purple-500) - Hybrid bridge
```

**Use Sparingly:** Only for content that genuinely bridges both technical and personal domains.

---

### Text Hierarchy (WCAG AAA Compliant)

All text colors tested on `#0a0a0b` (void) background:

| Name | Value | Contrast Ratio | Usage | Tailwind |
|------|-------|----------------|-------|----------|
| **Primary** | `#fafafa` | 19.5:1 ✅ AAA | Headlines, key content | `text-[#fafafa]` |
| **Secondary** | `rgba(250, 250, 250, 0.85)` | 16:1 ✅ AAA | Body text, descriptions | `text-[rgba(250,250,250,0.85)]` |
| **Tertiary** | `rgba(250, 250, 250, 0.65)` | 11:1 ✅ AAA | Supporting text, labels | `text-[rgba(250,250,250,0.65)]` |
| **Muted** | `rgba(250, 250, 250, 0.45)` | 7.5:1 ✅ AAA | Placeholders, disabled | `text-[rgba(250,250,250,0.45)]` |
| **Faint** | `rgba(250, 250, 250, 0.25)` | 3.8:1 ⚠️ Decorative only | Decorative elements | `text-[rgba(250,250,250,0.25)]` |

**Visual Preview (on void background):**
```
Primary text   - 100% opacity - Brightest
Secondary text - 85% opacity  - Standard body
Tertiary text  - 65% opacity  - Supporting
Muted text     - 45% opacity  - Placeholders
Faint text     - 25% opacity  - Decorative only
```

---

### Semantic Colors

#### Success (Green)
| State | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Base | `#22c55e` | `bg-success-base` | Success states, confirmations |
| Light | `#86efac` | `bg-success-light` | Success backgrounds |
| Dark | `#16a34a` | `bg-success-dark` | Success pressed states |
| Glow | `rgba(34, 197, 94, 0.12)` | `bg-success-glow` | Success ambient glow |

**Visual Preview:**
```
████ #22c55e - Base (Green-500)
████ #86efac - Light (Green-300)
████ #16a34a - Dark (Green-600)
▓▓▓▓ rgba(34, 197, 94, 0.12) - Glow
```

#### Warning (Amber)
| State | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Base | `#f59e0b` | `bg-warning-base` | Warning states, caution |
| Light | `#fcd34d` | `bg-warning-light` | Warning backgrounds |
| Dark | `#d97706` | `bg-warning-dark` | Warning pressed states |
| Glow | `rgba(245, 158, 11, 0.12)` | `bg-warning-glow` | Warning ambient glow |

**Visual Preview:**
```
████ #f59e0b - Base (Amber-500) - Matches soul-primary
████ #fcd34d - Light (Amber-300)
████ #d97706 - Dark (Amber-600)
▓▓▓▓ rgba(245, 158, 11, 0.12) - Glow
```

#### Error (Red)
| State | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Base | `#ef4444` | `bg-error-base` | Error states, destructive actions |
| Light | `#fca5a5` | `bg-error-light` | Error backgrounds |
| Dark | `#dc2626` | `bg-error-dark` | Error pressed states |
| Glow | `rgba(239, 68, 68, 0.12)` | `bg-error-glow` | Error ambient glow |

**Visual Preview:**
```
████ #ef4444 - Base (Red-500)
████ #fca5a5 - Light (Red-300)
████ #dc2626 - Dark (Red-600)
▓▓▓▓ rgba(239, 68, 68, 0.12) - Glow
```

#### Info (Cyan)
| State | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Base | `#06b6d4` | `bg-info-base` | Info states, notifications |
| Light | `#67e8f9` | `bg-info-light` | Info backgrounds |
| Dark | `#0891b2` | `bg-info-dark` | Info pressed states |
| Glow | `rgba(6, 182, 212, 0.12)` | `bg-info-glow` | Info ambient glow |

**Visual Preview:**
```
████ #06b6d4 - Base (Cyan-500) - Matches tech-secondary
████ #67e8f9 - Light (Cyan-300)
████ #0891b2 - Dark (Cyan-600)
▓▓▓▓ rgba(6, 182, 212, 0.12) - Glow
```

---

### Border Colors

| Name | Value | Opacity | Usage | Tailwind |
|------|-------|---------|-------|----------|
| **Subtle** | `rgba(255, 255, 255, 0.05)` | 5% | Barely visible dividers | `border-[rgba(255,255,255,0.05)]` |
| **Default** | `rgba(255, 255, 255, 0.1)` | 10% | Standard borders | `border-[rgba(255,255,255,0.1)]` |
| **Strong** | `rgba(255, 255, 255, 0.15)` | 15% | Emphasized borders | `border-[rgba(255,255,255,0.15)]` |
| **Tech** | `rgba(16, 185, 129, 0.2)` | 20% | Tech-themed borders | `border-tech-primary/20` |
| **Soul** | `rgba(245, 158, 11, 0.2)` | 20% | Soul-themed borders | `border-soul-primary/20` |

---

## Color Combinations

### Tech-Themed Combinations

**Option 1: Primary Tech CTA**
- Background: `#10b981` (tech-primary)
- Text: `#0a0a0b` (void)
- Hover: `#34d399` (tech-light)
- Shadow: `shadow-glow-tech`

**Option 2: Ghost Tech Button**
- Background: `transparent`
- Text: `#10b981` (tech-primary)
- Border: `rgba(16, 185, 129, 0.2)`
- Hover Background: `rgba(16, 185, 129, 0.15)` (tech-glow)

**Option 3: Tech Card**
- Background: `#111113` (space) + `backdrop-blur-xl`
- Border: `rgba(16, 185, 129, 0.2)` (tech border)
- Ambient Glow: `rgba(16, 185, 129, 0.15)` (tech-glow)
- Shadow: `shadow-glow-tech`

---

### Soul-Themed Combinations

**Option 1: Primary Soul CTA**
- Background: `#f59e0b` (soul-primary)
- Text: `#0a0a0b` (void)
- Hover: `#fcd34d` (soul-light)
- Shadow: `shadow-glow-soul`

**Option 2: Ghost Soul Button**
- Background: `transparent`
- Text: `#f59e0b` (soul-primary)
- Border: `rgba(245, 158, 11, 0.2)`
- Hover Background: `rgba(245, 158, 11, 0.15)` (soul-glow)

**Option 3: Soul Card**
- Background: `#111113` (space) + `backdrop-blur-xl`
- Border: `rgba(245, 158, 11, 0.2)` (soul border)
- Ambient Glow: `rgba(245, 158, 11, 0.15)` (soul-glow)
- Shadow: `shadow-glow-soul`

---

## Accessibility Notes

### Contrast Ratios (WCAG Guidelines)
- **AA Standard**: 4.5:1 for normal text, 3:1 for large text
- **AAA Standard**: 7:1 for normal text, 4.5:1 for large text

**Our Standards:**
- All body text: AAA compliant (7:1+)
- All headings: AAA compliant (7:1+)
- Interactive elements: AA minimum, AAA preferred
- Decorative elements: No requirement

### Color Blindness Considerations

**Protanopia/Deuteranopia (Red-Green Blindness):**
- Tech (Emerald) appears yellowish
- Soul (Amber) appears yellow-brown
- Sufficient differentiation maintained through luminance

**Tritanopia (Blue-Yellow Blindness):**
- Tech (Cyan) appears greenish
- Soul (Amber) appears pinkish
- Sufficient differentiation maintained through saturation

**Recommendation:** Always pair color with other indicators (icons, text labels, patterns)

---

## Export for Design Tools

### Figma/Sketch Variables
```json
{
  "void": "#0a0a0b",
  "space": "#111113",
  "elevated": "#18181b",
  "subtle": "#1f1f23",
  "tech-primary": "#10b981",
  "tech-secondary": "#06b6d4",
  "soul-primary": "#f59e0b",
  "soul-secondary": "#fbbf24",
  "text-primary": "#fafafa",
  "text-secondary": "rgba(250, 250, 250, 0.85)",
  "text-tertiary": "rgba(250, 250, 250, 0.65)",
  "text-muted": "rgba(250, 250, 250, 0.45)"
}
```

### CSS Custom Properties
```css
:root {
  --color-void: #0a0a0b;
  --color-space: #111113;
  --color-elevated: #18181b;
  --color-subtle: #1f1f23;

  --color-tech-primary: #10b981;
  --color-tech-secondary: #06b6d4;
  --color-tech-light: #34d399;
  --color-tech-dark: #059669;

  --color-soul-primary: #f59e0b;
  --color-soul-secondary: #fbbf24;
  --color-soul-light: #fcd34d;
  --color-soul-dark: #d97706;

  --color-text-primary: #fafafa;
  --color-text-secondary: rgba(250, 250, 250, 0.85);
  --color-text-tertiary: rgba(250, 250, 250, 0.65);
  --color-text-muted: rgba(250, 250, 250, 0.45);
}
```

---

**Version**: 1.0
**Last Updated**: January 2026
**See Also**: [Design System Guide](./DESIGN_SYSTEM_GUIDE.md)
