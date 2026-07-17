# FrankX Hero Reboot — Controlled Pilot Review

**Date:** 2026-07-17
**Status:** Direction validated for further art direction; not approved for production integration
**Method:** One source frame at a time, independent visual QA after each render, then deterministic social-card composition.

## What this pilot was meant to prove

The previous 20-image batch treated a blog visual as a technically clean background plate. This pilot tests the replacement hypothesis:

> A FrankX article becomes more understandable and attractive when a real human consequence or an actual system decision is paired with exact, deterministic editorial typography.

The pilot deliberately covers three different editorial territories rather than recolouring one metaphor:

| Article | Territory | Audience need | Source-frame result | Social-card result |
|---|---|---|---|---|
| `agentic-creator-os-complete-guide` | Studio Documentary | “I need a coherent creative practice, not more tools.” | PASS v2 | PASS as a deterministic-typography proof |
| `production-agentic-ai-systems` | Evidence in Context | “I need to distinguish a good demo from a safe, accountable production choice.” | PASS v2 | PASS as a deterministic-typography proof |
| `golden-age-of-creators-why-now-is-different` | Editorial Point of View | “Can one person build a meaningful creative system now?” | PASS v3 | PASS as a deterministic-typography proof |

## Evidence of actual iteration

The process did not accept first generations because they were technically valid files.

| Pilot | Rejected / iterated version | Reason | Accepted version change |
|---|---|---|---|
| ACOS | v1 REJECT | Generated paper text, exit sign, clutter, literal diagonal split, no viable title relationship. | v2 removes typography/noise and uses human attention plus spatial order. |
| Production | v1 ITERATE | Looked like a generic electronics lab; production thesis was not legible. | v2 centres an accountable architect and material fragile→governed decision. |
| Golden Age | v1 REJECT, v2 ITERATE | Visible generated marks/signs/clutter, then an attractive but generic maker portrait. | v3 makes visible audio/microphone/guitar practice meet a wider dawn horizon. |

The rejected frames are retained under `assets/rejected/` as review evidence. They are not publishable assets.

## What passed

1. **Meaning now precedes mood.** Each accepted frame has a reader-specific situation, not merely a themed object.
2. **People are conditional, not forbidden.** Every person has a role and action; none looks like a generic laptop-stock model.
3. **Exact public text is deterministic.** The source images contain no requested public copy; the 1200×630 cards add exact headlines, category, and article-title trace via FFmpeg.
4. **The three cards feel like FrankX without being the same picture.** A coherent dark editorial posture, strong type, and purposeful accent color connect studio documentary, technical review, and creator-culture cover art.
5. **The original failure is materially addressed.** A reader can now identify the subject and claim from the social card in seconds.

## What did **not** pass as a universal solution

The three social cards intentionally share a dark left-type / right-scene architecture to test deterministic typography. It is **not** the next universal template.

If every FrankX hero uses this split, it becomes a new monoculture. Future art direction must vary:

- text placement and proportion;
- image-only vs title-led surface;
- human scene vs designed system evidence;
- warm craft / technical / conscious palette posture;
- use of diagram, portrait, place, or cultural scene.

## Non-production gates still open

- [ ] Obtain/generate an approved source master at least 1920×1080; all current source frames are `1280×720` pilots.
- [ ] Re-compose—not centre-crop—4:5 and 9:16 versions.
- [ ] Test the live blog-card and article-page context beside semantic HTML H1.
- [ ] Add alt text, provenance, and final reviewer record.
- [ ] Obtain editorial approval before editing frontmatter, image mapping, metadata, deployment, or external publication.

## Files

- Creative doctrine: `../HERO_ART_DIRECTION_SYSTEM.md`
- Per-article briefs: `./agentic-creator-os-complete-guide.md`, `./production-agentic-ai-systems.md`, `./golden-age-of-creators.md`
- Controlled generation cards: `./pilot-jobs.json`
- Deterministic composer: `./compose_social_cards.py`
- Independent QA: `./qa-*.md`
- Final pilot source frames: `./assets/`
- Deterministic 1200×630 social review cards: `./social/`
