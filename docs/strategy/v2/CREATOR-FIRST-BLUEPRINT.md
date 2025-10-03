# Creator-First Blueprint (v2)
_Last updated: 2025-09-28_
_Owner: Frank + Codex_

## 1. Purpose
FrankX.ai exists to help **creators** (musicians, storytellers, independent founders, creative technologists) wield AI as a co-creator. Every surface, product, and communication must:
- Spark momentum in a creative practice within 24 hours.
- Feel like a premium studio session with Frank as guide, not a corporate roadmap.
- Translate complex AI capability into soulful, repeatable rituals.

## 2. Audience Lanes
| Lane | Description | Primary Needs | Flagship CTA |
| --- | --- | --- | --- |
| **Launch Artists** | Musicians & multimedia creators releasing work | Sonic prompts, release rituals, creative accountability | `/products/vibe-os` |
| **Creator Architects** | Builders turning workflows into products/services | Systems design, automation kits, AI briefings | `/products/agentic-creator-os` (reframed as Creator Lab) |
| **Storyteller-Poets** | Writers, educators, community leaders | Narrative frameworks, prompt libraries, inspiration cycles | `/creation-chronicles` |
| **Allies & Family (Supportive Tier)** | Friends, family, patrons who want to understand the journey | Orientation guides, vocabulary primers | `/blog` curated posts (no dedicated funnels) |

Enterprise material now lives in `docs/strategy/v1`. Do not reintroduce unless explicitly greenlit.

## 3. Offer Ladder
1. **Free Signal** - Creation Chronicles dispatch, blog essays, Suno sessions.
2. **Entry Kits ($27 - $97)** - Creative AI Toolkit, Vibe OS sessions, template drops.
3. **Deep Practice ($297 - $997)** - Creator Lab OS (cohort/consulting), Creator Systems Studio.
4. **Inner Circle / Realm ($49/mo +)** - Private vault, live labs, agent desk support.

Each product page must:
- Speak directly to creator outcomes (flow, release cadence, revenue, community).
- Use testimonials and case studies from creators, not enterprise teams.
- Offer a clear "next ritual" CTA (+ analytics event `creator_funnel_step`).

## 4. Content & Experience Rules
- **Voice:** cinematic, intimate, brave. Write as Frank speaking to peers.
- **Cadence:** 1 x longform essay (Creation Chronicles) + 1 x tactical guide + 1 x music drop each week.
- **Visual Language:** aurora gradients + studio textures; no corporate stock imagery.
- **Navigation:** Primary menu = Creation Chronicles, Products, Music Lab, Realm, Start. Family/Enterprise items move to Resource subpages.
- **Analytics:** Track `creator_funnel_step`, `music_session_play`, `toolkit_download`, `realm_waitlist_join`. Use `lib/analytics.ts`.

## 5. Agent Collaboration Ground Rules
- **Creative Systems Architect (Codex/Gemini)** - builds tools, templates, and site flows that let creators ship faster.
- **Story & Resonance Lead (Claude)** - crafts copy, essays, and prompts that carry emotional weight.
- **Experience Guardian (shared)** - ensures accessibility, responsiveness, and delight.
- **Research Scout (Claude/Gemini)** - validates creator pain points, captures case studies, curates inspiration.

Every task starts with: _What does this help a creator release, publish, or monetize?_ If unclear, escalate before building.

## 6. Operating Rhythm
- **Daily:** Ship one creator-facing asset or improvement, log in `docs/DAILY_INTELLIGENCE_OPERATIONS.md`.
- **Weekly:** Update product pods with metrics, surface learnings from analytics, rotate spotlight stories on home.
- **Monthly:** Drop a flagship project (album, toolkit expansion, immersive story) tied to Realm activation.

## 7. Guardrails
- No enterprise jargon (`governance`, `compliance`, `stakeholder alignment`) in creator funnels.
- Family content = supportive bonus, never primary CTA.
- If a request conflicts with the blueprint, flag it in pod backlog with `needs-alignment` tag before execution.
- Keep scope tight: choose creator outcomes over more dashboards.

Align every new brief, PRD, or launch outline with this blueprint before coding.


