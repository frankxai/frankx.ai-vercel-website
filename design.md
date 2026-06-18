# FrankX Website Design Handoff (frankx.ai-vercel-website)

> Local visual specifications. Consumes the global design operating contract at [starlight/design.md](file:///C:/Users/frank/starlight/design.md).

---

## 1 · Brand & Audience
- **Brand Identity:** FrankX (Personal authority + learning ecosystem).
- **Target Audience:** AI architects, ambitious software engineers, tech creators.
- **Key Emotions:** Restraint, technical depth, high intelligence.

---

## 2 · Target Asset Queue
These are the assets required for the production website.

| Page / Placement | Asset Description | Aspect Ratio | Dimensions | Preferred Model |
|---|---|---|---|---|
| **Landing Hero** | Abstract obsidian structure with glowing emerald and cyan data lines | `16:9` | 2K / 4K | `nano_banana_pro`; existing upscaled candidate available |
| **Academy Header** | Ethereal tech-glow library with floating starlight equations | `16:9` | 2K | `nano_banana_pro` |
| **Default OG Image** | Editorial grid containing brand logo and subtle emerald light leaks | `1.91:1` | 1200×630 | `recraft-v4-1` |
| **SaaS Tool Dashboard preview** | Bento grid mockup illustrating code and graph nodes | `16:9` | 2K | `nano_banana_pro` |

Existing candidate asset:
`C:\Users\frank\starlight\higgsfield\assets\frankx\landing_hero_premium_upscaled.png`

---

## 3 · Visual Rules & Forbidden Aesthetics
- **Rules:** Clear typographical separation, minimal containers, high contrast ratio. Use the Tech Spectrum (emerald `#10b981` / cyan `#06b6d4` / obsidian void `#0a0a0b`).
- **Forbidden:** No bright neon blocks, no circular face portraits, and no default artificial intelligence shapes.

---

## 4 · Rendering Pipelines (Higgsfield)
To generate the Landing Hero:
1. Review the existing premium/upscaled candidate before generating a replacement.
2. If replacement is needed, run `nano_banana_pro` with the prompt in `C:\Users\frank\starlight\higgsfield\experiments\frankx-landing-hero.md`.
3. Generate a 2K draft, review, and upscale to 4K using `upscale_image`.
4. Log preflight, generation, result URL, and next action in the global [ledger.jsonl](file:///C:/Users/frank/starlight/higgsfield/ledger.jsonl).
