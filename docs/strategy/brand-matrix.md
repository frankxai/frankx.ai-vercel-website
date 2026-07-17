# Brand Coordination Matrix

**Status:** Draft v0.1 — `[[NEEDS ALIGNMENT]]` markers indicate questions for Frank
**Last updated:** 2026-04-19
**Owner:** Frank
**Purpose:** Single source of truth for which brand owns which topic, which repo, which product surface. Prevents cross-pollution when running multi-brand orchestration (`/arco`, `/ao`, `/morning-brief`, `/research-all`).

---

## The 6 Brands

### 1. FrankX (personal brand)
- **One-liner:** Elite Creator. AI Architect. Humble Excellence.
- **Positioning:** Personal AI Center of Excellence frameworks, made free for individuals/creators/families. Bridge from Oracle enterprise work to the public.
- **Domain:** frankx.ai
- **Dev repo:** `C:/Users/frank/frankx`
- **Prod repo:** `frankxai/frankx.ai-vercel-website` (deploys via Vercel)
- **Primary audience:** Creators, entrepreneurs, individuals wanting personal AI CoE
- **Products:** ACOS (Agentic Creator OS), Prompt Library, Research Hub, Watch OS (shorts), Ikigai Workshop, AI Architect Academy
- **Content pillars:** AI Architect work, personal AI systems, creator productivity, music, consciousness, family
- **Revenue model:** Free resources + premium products + affiliate

### 2. Arcanea (platform & deep lore)
- **One-liner:** The mythological platform layer where consciousness meets computation.
- **Positioning:** The narrative and philosophical engine. Arcanea provides the "Deep Lore" and Guardians (mentors) that give the technical tools of FrankX and GenCreator their emotional resonance and soul.
- **Domain:** arcanea.ai
- **Dev repo:** `C:/Users/frank/Arcanea` (multi-repo monorepo-ish structure)
- **Related repos seen:** arcanea.ai, arcanea-agents, arcanea-claw, arcanea-code, arcanea-companion, arcanea-ecosystem, arcanea-flow, arcanea-orchestrator, arcanea-platform
- **Primary audience:** The philosophical creators, seekers, and aesthetes who want technical execution wrapped in profound meaning.
- **Products:** Guardian system (10 guardians), Ten Gate Guardian Protocol, Publishing House, Author System, companions
- **Content pillars:** Agent architecture, consciousness-tech bridge, cosmology/worldbuilding, publishing
- **Revenue model:** Subscriptions (Platform Access), Interactive Media Licensing, Story-driven APIs

### 3. Starlight Intelligence (enterprise AI)
- **One-liner:** Strategic AI orchestration and purpose-driven system design.
- **Positioning:** Enterprise AI Architect tier — the productization of Frank's Oracle CoE consulting. Formal methodology, not a product.
- **Domain:** starlightintelligence.org
- **Dev repo:** `[[NEEDS ALIGNMENT: which repo?]]` (no standalone repo found 2026-04-19 — may live inside FrankX or Arcanea)
- **Primary audience:** Enterprises evaluating AI CoE, decision-makers at Fortune 500
- **Products:** Methodology docs, Oracle ADK/OAS expertise, strategic advisory
- **Content pillars:** AGI, enterprise AI governance, Oracle stack, Quantum Computing enterprise applications, C-suite advisory
- **Revenue model:** Oracle day-job amplification + advisory/licensing

### 4. GenCreator (creator Center of Excellence)
- **One-liner:** The CoE framework for generative creators — Whop storefront + Skool community + Notion templates.
- **Positioning:** Concrete productization of the CoE idea applied to content creators. Tiered membership.
- **Domain:** gencreator.ai
- **Dev repo:** `C:/Users/frank/gencreator.ai` (87 files, code-complete, awaiting `pnpm go-live` per HANDOVER-2026-04-16.md)
- **Prod repo:** `frankxai/gencreator.ai` (to be created during go-live)
- **Primary audience:** Content creators, solopreneurs, freelancers
- **Products:** 3-tier membership (Free Skool → Paid Skool → Inner Circle), 14-product OS catalog, VibeOS shell, Studio
- **Content pillars:** AI-human creation workflows, creator economy, personal productivity for creators
- **Revenue model:** Whop subscriptions + Stripe Studio application fees
- **Launch target:** 2026-04-28

### 5. AnimeLegends.ai (IP / anime)
- **One-liner:** `[[NEEDS ALIGNMENT: one-sentence positioning]]`
- **Positioning guess:** Anime/manga IP brand — possibly AI-generated legends, characters, worldbuilding tied to Arcanea cosmology
- **Domain:** animelegends.ai
- **Dev repo:** `C:/Users/frank/AnimeLegends.ai` (Next.js app, early stage based on minimal file tree)
- **Primary audience:** `[[NEEDS ALIGNMENT: anime fans? collectors? creators?]]`
- **Products:** `[[NEEDS ALIGNMENT]]`
- **Content pillars:** `[[NEEDS ALIGNMENT]]`
- **Revenue model:** `[[NEEDS ALIGNMENT]]`

### 6. VibeClubs (LiveKit video rooms)
- **One-liner:** Live video drop-in rooms for creators.
- **Positioning:** Feature of GenCreator stack (per ADR-003 in gencreator.ai/docs/DECISIONS.md), also runs as standalone brand.
- **Domain:** vibeclubs.ai
- **Dev repo:** Inside `gencreator.ai/app/vibeos/` + `/app/vibeos/app/` shell
- **Primary audience:** Creators hosting live sessions, community members
- **Products:** Live rooms, vibe_states + vibe_sessions (schema in gencreator.ai/lib/supabase/schema.sql)
- **Content pillars:** Live video, real-time collaboration, community
- **Revenue model:** Bundled with GenCreator tiers initially; `[[NEEDS ALIGNMENT: standalone pricing?]]`

---

## Topic → Brand Ownership (primary / secondary)

For `/morning-brief` and `/research-all`, each research topic maps to a primary brand (owns the content push) and optionally secondary brands (cross-promotes).

| Topic | Primary | Secondary | Evidence / example channel |
|-------|---------|-----------|---------------------------|
| AGI progress & timelines | Starlight | FrankX, Arcanea | Starlight enterprise briefings; FrankX personal AI framing |
| AI Architect / Enterprise AI | Starlight | FrankX | Oracle CoE work, AI Architect Academy |
| Quantum Computing (technical) | Starlight | FrankX | Enterprise quantum-AI bridge |
| Quantum Philosophy | FrankX | Arcanea | Consciousness-tech bridge content |
| Quantum Jumping / Personal Dev | FrankX | Arcanea | FrankX personal-dev content stream |
| Biotech / Longevity | FrankX | — | Personal dev stream |
| Synthetic Intelligence | Arcanea | Starlight | Arcanea platform positioning |
| Chemistry / Physics / Black Holes | FrankX | Arcanea | Curiosity-content stream |
| Space Exploration | FrankX | Arcanea | Weekly curated brief |
| Starlight Intelligence (meta) | Starlight | — | Methodology posts |
| Music production (AI) | FrankX | Arcanea | Suno work, 12k+ songs |
| Consciousness / Spirituality | FrankX | Arcanea | Consciousness content, Guardians |
| Creator Economy / AI-Human | GenCreator | FrankX | GenCreator primary channel |
| Anime / IP / Characters | AnimeLegends | Arcanea | Arcanea cosmology crossover |
| Live Video / Community | VibeClubs | GenCreator | Vibeclubs rooms |
| Personal AI CoE / ACOS | FrankX | Starlight | The defining narrative |

---

## Cross-brand rules

1. **No ghost-writing across brands.** If content is primarily Starlight (enterprise AI governance), it publishes on starlightintelligence.org first and only gets repackaged for FrankX/Arcanea with explicit cross-link.
2. **The Personal AI CoE narrative is FrankX-canonical.** Don't publish "personal CoE" content on Arcanea without framing it as FrankX x Arcanea.
3. **GenCreator ≠ FrankX.** GenCreator has its own voice (tiered membership, creator-specific). FrankX is the AI Architect personal brand. Do not use FrankX content verbatim in GenCreator.
4. **Enterprise voice ≠ Personal voice.** Starlight speaks to CTOs; FrankX speaks to creators. Different register, different vocabulary.
5. **Arcanea is the platform layer.** It powers features for FrankX + GenCreator + AnimeLegends; it does not compete with them on content.

---

## Questions for Frank `[[NEEDS ALIGNMENT]]`

## Questions for Frank `[[NEEDS ALIGNMENT]]`

1. **Starlight repo** — does it have its own repo or live inside FrankX/Arcanea?
2. **AnimeLegends everything** — positioning, audience, products, revenue. Marked TBD.
3. **VibeClubs standalone pricing** — does it ever sell separately from GenCreator?
4. **Brand hierarchy question** — is Arcanea the "parent holding co" and FrankX/Starlight/GenCreator/AnimeLegends are children? Or is FrankX the umbrella and others are sub-brands? This affects morning briefing lead-order.

---

## How this file is consumed

- `/arco` reads this to pick the right repo for a task
- `/morning-brief` reads this to order the daily brief (primary brand first per topic)
- `/research-all` reads this to route research results into the right brand's content pipeline
- `/sprint-plan` reads this to balance weekly goals across brands

Update this file whenever a brand-level positioning decision changes. Low-friction: just edit the table.
