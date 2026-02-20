# FrankX Intelligence Hub Blueprint (Creator-First)

## Purpose
Make frankx.ai the daily command center for creators who want to build, release, and sustain work with AI-guided rituals, stories, and systems.

## Audience Operating System
| Segment | Core Needs | Primary Assets | Search Intent Keywords |
| --- | --- | --- | --- |
| Creator Architects (Pro) | Hands-on system design, analytics cadence, ritual accountability | [Agentic Creator OS](/products/agentic-creator-os), [Realm Membership](/realm) | `ai creator operating system`, `creator os playbook`, `agentic workflow` |
| Emerging Creators | Fast wins, guided prompts, publishing momentum | [Creative AI Toolkit](/products/creative-ai-toolkit), [Creation Chronicles Product](/products/creation-chronicles) | `ai prompts for creators`, `build creator system`, `creative ai toolkit` |
| Music Explorers | Suno session recipes, licensing guidance, storytelling | [Vibe OS](/products/vibe-os), [Resources -> Music Drops](/resources#music) | `ai music workflow`, `suno prompts`, `ai music template` |
| Inner Circle Allies | Community cadence, live labs, premium drops | [Realm Membership](/realm), [Creation Chronicles Hub](/creation-chronicles) | `ai creator membership`, `inner circle creators`, `ai mastermind` |
| Agent Builders | Automation diagrams, prompt governance, QA loops | [Guides Library](/guides), [Generative Creator OS](/products/generative-creator-os) | `ai agent workflow`, `creator automation`, `agent builder playbook` |

## Search & SEO Architecture
| Cluster | Primary Keyword | Supporting Signals | Destination |
| --- | --- | --- | --- |
| Creator Operating Systems | `ai creator operating system` | `creator os`, `content lab`, `automation ritual` | [Agentic Creator OS](/products/agentic-creator-os) |
| AI Music Rituals | `ai music workflow` | `suno session`, `music ai toolkit`, `vibe os` | [Vibe OS](/products/vibe-os) |
| Prompt & Template Vault | `ai prompts for creators` | `creative ai toolkit`, `prompt library`, `multi agent prompts` | [Creative AI Toolkit](/products/creative-ai-toolkit) |
| Creation Chronicles | `ai creator stories` | `creator case study`, `agent builder playbook`, `creative intelligence essay` | [Creation Chronicles Hub](/creation-chronicles) |
| Membership & Community | `ai creator membership` | `realm waitlist`, `inner circle`, `creator mastermind` | [Realm Membership](/realm) |

## Content Modules
- Hero command deck with mission headline, quick actions, and live metrics panel.
- Persona band with five segment cards and contextual CTAs.
- Latest drops carousel highlighting Creation Chronicles essays, music releases, and toolkit updates.
- Resource vault broken into Free Guides, Templates, Premium Systems, and Membership unlocks.
- Analytics ticker exposing `creator_funnel_step`, `music_session_play`, and `realm_waitlist_join` counts.
- Project log for current pods, experiments, and upcoming releases.
- Agent protocol shelf giving the rules of engagement for Strategist, Builder, and QA agents.

## Interlinking Map
- Hero quick actions -> `/resources`, `/creation-chronicles`, `/products/creative-ai-toolkit`.
- Segment CTAs -> `/products/agentic-creator-os`, `/products/creative-ai-toolkit`, `/products/vibe-os`, `/realm`, `/guides`.
- Latest drops -> `/blog`, `/resources#music`, `/creation-chronicles`.
- Resource vault -> `/guides`, `/templates`, `/products`, `/realm`.
- Project log -> `/pods`, `/docs/pods`, `/creation-chronicles#log`.
- Agent protocols -> `/docs/agents`, `/guides`, `/realm#cadence`.
- Footer anchors -> `/#updates`, `/#resources`, `/#rituals`, `/realm`, `/start`.

## Experience Flows
1. Creator ignition -> Hero CTA -> Creative AI Toolkit -> Prompt ritual checklist -> Toolkit upsell inside Realm.
2. System build -> Segment (Creator Architects) -> Agentic Creator OS page -> Offer stack -> Realm application.
3. Music release -> Segment (Music Explorers) -> Vibe OS page -> Latest Sessions grid -> Realm studio invite.
4. Story immersion -> Hero quick action -> Creation Chronicles hub -> Essay or drop -> Inner Circle CTA.
5. Agent builder loop -> Persona band (Agent Builders) -> Guides library -> Automation article -> Creator Lab OS cohort application.

## Measurement Signals
- `creator_funnel_step` counts by location (hero, offer, final-cta, realm).
- `music_session_play` interactions on Vibe OS and Resources music sections.
- Waitlist submissions tagged `realm_waitlist_join` and `music_academy_waitlist`.
- Template and guide downloads tracked via `toolkit_download`.
- Newsletter opt-ins segmented by persona tag.

## Agent Enablement Notes
- `lib/analytics.ts` buffers events so Strategist and Analytics agents can review funnels before pushing upstream.
- `data/products.json` keeps offers, CTAs, and guarantees in sync across product pages.
- Pods are documented in `docs/pods/*` with KPIs and cadences; agents should log wins and blockers there.
- `docs/strategy/v2` holds the live blueprint; archive material sits under `docs/strategy/v1` for reference.
- Agents should refresh interlinking each sprint to keep momentum focused on creators, music explorers, and realm allies.
