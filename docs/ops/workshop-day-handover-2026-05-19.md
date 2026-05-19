# Workshop-day handover — 2026-05-19 (NL Digital)

**For Frank, when you wake up.**

Overnight build complete. Three deliverables shipped to prod, validated, tested.

---

## What shipped overnight

### 1. Canonical refinement — `/workshops/ikigai-branding`
Two new sections after the brushstroke:
- **"Five concrete things in 90 min"** — sets the outcome contract before attendees see the framework. Each outcome maps to one module.
- **"Mirror · Explorer · Researcher · Not ground truth"** — your AI-as-mirror framing, distilled to three cards + closing line about context engineering across sessions.

Both sections live above-the-fold-ish (after the brushstroke hero, before the Venn).

### 2. QR code presentation surface — `/go/qr/ikigai-branding`
Pull this up on your tablet or the projector when attendees arrive. Big white QR square on dark, encodes the canonical workshop URL with high error-correction (scans reliably from across the room). Workshop title above, URL below, "~90 min · Free" tag. noindex.

Backup assets:
- `/images/qr/workshops-ikigai-branding.svg` (26.5 KB, vector)
- `/images/qr/workshops-ikigai-branding.png` (720 B, raster fallback)

---

## Validation done overnight

- **Coach prompt tested across 3 labs.** Pasted via OpenRouter to GPT-5-mini, Claude Sonnet 4.6, Gemini 2.5 Flash. All three respond identically with: *"What's the smallest reason you'd want to wake up tomorrow?"* Proof that the Socratic "ONE question at a time" instruction holds across model providers.
- **Type-check clean** against affected file graph (new + modified files all type-pass).
- **Mobile + desktop simulated** via curl with iPhone User-Agent. Outcomes panel, AI framing, Coach GPT button, bridge image all present in mobile HTML.
- **WorkshopProgressRail mobile hang FIXED.** It was stuck on "Map · 1/7" forever because SECTIONS still referenced V5-era IDs that don't exist on canonical. Replaced with `module-1` through `module-7`, plus the "Skip to ship" link now points to `#module-6`.

---

## URLs for tomorrow

**Live to attendees:**
| URL | When to use |
|---|---|
| `https://www.frankx.ai/workshops/ikigai-branding` | The main page. Walks attendees through everything. |
| `https://www.frankx.ai/go/qr/ikigai-branding` | Pull up on tablet/projector — attendees scan with phone. |
| `https://www.frankx.ai/workshops/ikigai-branding/present` | Your facilitator/presenter mode. |
| `https://www.frankx.ai/go/ikigai-coach` | Direct link to the custom Coach GPT (also reachable via the workshop page CTAs). |

**For post-workshop / advanced users:**
| URL | When to share |
|---|---|
| `https://www.frankx.ai/research/blue-zones-ikigai-ai-era` | Flagship research for the depth-seekers. |
| `https://www.frankx.ai/prompt-library` | The prompt-library — daily practice continuation. |
| `https://www.frankx.ai/library` | Annotated books — Kamiya, Mogi, García & Miralles, Buettner. |
| `https://www.frankx.ai/workshops/ikigai/v1` | (Facilitator-only, unlinked) the design-thinking-composed V1 archive — kept noindex for reference. |

---

## What to do morning-of

1. **Open `/workshops/ikigai-branding` on your phone.** Read it like an attendee would. The hero + outcomes + AI framing should set expectations in under 60 seconds.
2. **Test the QR.** Pull up `/go/qr/ikigai-branding` on your laptop, point your phone at it, confirm it lands on the workshop.
3. **Open Coach GPT once.** Confirm `/go/ikigai-coach` redirects to the ChatGPT custom GPT. Say "hi" — see it ask the opening question.
4. **(Optional) Spot-check `/workshops/ikigai-branding/present`** if you're going to use presenter mode.

If any of these feels wrong, ping me in the morning and we patch before doors open.

---

## Open issues / known limitations

- **WorkshopProgressRail sticky pill** — fixed the underlying bug but didn't visually QA on a real mobile device (only via curl + iPhone UA). If the pill behaves weird live, the rail can be hidden via `display: none` in CSS — it's purely decorative.
- **QR code** — generated via qrserver.com API at build time. The SVG is shipped in-tree, so no runtime dep. If you ever change the canonical URL, regenerate via: `curl -s "https://api.qrserver.com/v1/create-qr-code/?data=URL&size=800x800&format=svg&ecc=H" -o public/images/qr/...svg`.

---

## Commits + PRs

| PR | Merge SHA | Summary |
|---|---|---|
| #82 | `36295834` | V8 ship — Coach-driven prompts + PromptCard duplication fix |
| #83 | `c3cad152` | Canonical refresh — kanji left rail + V8 prompts + 7 modules |
| #84 | `157d77eb` | Refine — kanji monochrome, GPT CTA, SVG Venn, flow image, progress rail fix |
| #85 | `d75f4d53` | Workshop-day bundle — 5 outcomes, AI framing, V9, QR code |
| #86 | `00b10ca2` | **v2 truthful copy + V4 kanji cards + restored original Venn raster** (last ship before workshop) |

## What's different on canonical after PR #86

- Email block is "Stay in the loop" — no fake "Resource Pack" promise. Email template subject says "Your Ikigai & Branding Coach is open".
- Bottom 4 cards show kanji: 究 (research) · 型 (patterns) · 本 (library) · 塾 (workshops)
- Venn is the original raster `ikigai-venn.jpg`, not the SVG
- "Five tangible artefacts" not "Five concrete things, not a feeling"
- "Mirror, explorer, researcher" not "Mirror. Explorer. Researcher. Not ground truth."
- "The Prompt Library" (no count) not "98 patterns, red-teamed"

---

🤖 Built overnight by Claude Code. All deliverables on prod main.

Have a great workshop.
