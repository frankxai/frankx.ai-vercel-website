# Page briefs

**State:** proposal, 5 November 2026. One brief per key page and hub. Each brief answers six things: the goal, the reader, the proof the page must show, the one primary action, the measure, and the next move. Facts come from the audits in [`audits/`](audits/); anything unverified says so.

Shared rules for every page:

- One primary action. A second action is a text link, never a second equal button (`taste.md`).
- Every number has a source file and, when it moves, an "as of" date.
- Every SEO page ends in exactly one of three waitlists or the newsletter, chosen by topic.
- Visual density: one meaningful visual per screen of scroll on hubs; at least two per 1,000 words on articles (see [VISUAL-SYSTEM.md](VISUAL-SYSTEM.md)).
- Sentence case. No emoji. Voice per [VOICE-LIBRARY.md](../VOICE-LIBRARY.md).

Measures below are events or states the site can already record (`TrackedLink` events, waitlist intents in `lib/diagnostic/waitlist-intents.ts`, newsletter confirmation). Page views alone are never the measure.

---

## Front door

### Home `/` (protected)
- **Goal:** recognise Frank, then route by intent. Seven jobs from the preservation contract survive: identity, orientation, portfolio proof, founder relevance, human proof, trust, conversion.
- **Proof:** a featured release, one research investigation, one open repository.
- **Primary action:** Find your starting point (`/start`).
- **Measure:** route selection by intent; newsletter confirmation.
- **Next move:** only through `docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md`: baseline captures, preservation matrix, three directions, Frank's approval. Open PRs #1064 (founder story) and #1116 (assistant entry points) already compete for this surface; resolve them first.

### Start `/start`
- **Goal:** ten private questions identify the current constraint and send the reader to one route.
- **Reader:** all three, especially women building with AI who want a calm entry with no call.
- **Proof:** the result page explains why it chose the route.
- **Primary action:** answer the first question.
- **Measure:** completion; route chosen.
- **Next move:** becomes the header action. Link `/start-here` (first agent) as one of its routes.

---

## Evidence

### Research `/research`
- **Goal:** prove the frontier position with instruments a reader can open.
- **Reader:** solo founders running agent fleets; anyone who needs proof before buying.
- **Proof:** Model Arena receipts, the Observatory dataset, graded investigations. Shipped in wave 1.
- **Primary action:** Read the investigations.
- **Measure:** `research_investigation_open`; newsletter confirmation from the hub.
- **State now:** leads with five published investigations; 99 generated topic maps on hold behind `docs/research/PUBLICATION-BOUNDARY.md`.
- **Next move:** land the dossier branch (PR #949) one dossier at a time once the attestation verifier exists; restore the prose of the top four agentic domains labelled "analysis, unreviewed" with primary sources only; route the seven authored MDX briefs.

### Model Arena `/research/model-arena`
- **Goal:** answer "which model for which task" with receipts.
- **Proof:** seven published receipt rounds, last measured 28 August 2026 (from `/research/model-arena/receipts.json`).
- **Primary action:** open a receipt.
- **Next move:** a new round every month, published with its receipt; the hub card updates itself from the manifest.

### Blog `/blog`
- **Goal:** rank for the questions founders and creators ask, then hand off to one hub.
- **Proof:** the October voice-typing posts set the bar: reading goal, TL;DR, question headings, first person, a test the reader can run.
- **Primary action:** the article's single next step.
- **Measure:** waitlist intents from articles (15 of 288 posts link a product or waitlist today).
- **Next move:** a related-product block by tag using `components/funnel/FunnelCTA`; a visual pass on the top 20 posts by search demand; the 2026-08-18 cluster (about 18 thin posts) rewritten or consolidated through redirects with approval.

### Signals `/signals`, Journal `/journal`, Intelligence atlas `/intelligence-atlas`
- **Goal:** show work in progress daily without overclaiming.
- **Primary action:** subscribe to the stream.
- **Next move:** sit under the Research door.

---

## Build

### AI architecture `/ai-architecture`
- **Goal:** own "ai architecture" (2,400 US searches per month, KD 61, Semrush, 20 August 2026) and route to blueprints, ACOS and the studio.
- **Reader:** solo founders running agent fleets.
- **Proof:** blueprints with diagrams, the architecture review tool at `/ai-architect`.
- **Primary action:** Run the architecture review.
- **Next move:** one diagram per pattern, generated from source; LLM gateway spoke page (KD 23).

### ACOS `/acos`
- **Goal:** install the system in one command.
- **Proof:** the open repository; the new README diagram.
- **Primary action:** copy the install command.
- **Measure:** install-command copy events; GitHub referrals.
- **State now:** two conflicting count sets on one page ("99 agents. 35+ skills. 117+ commands" and "38 agents, 75+ skills"); the repository says 81, 176 and 85. Draft PR #1097 derives counts from source.
- **Next move:** remove hand-typed counts or land #1097; adopt the "pick one install path" table from the ACOS README; host the Founder Kit ([FOUNDER-KIT-PRD.md](FOUNDER-KIT-PRD.md)).

### Agent hub `/agent-hub` and LLM hub `/llm-hub`
- **Goal:** compare platforms and models with sources and dates.
- **Proof:** model specifications from provider docs; first-party results only from Model Arena.
- **Primary action:** compare two options.
- **Next move:** both enter the Build door (LLM hub is in no menu today); each comparison links its Arena receipt where one exists.

### Founder setup `/stack`
- **Goal:** the setup Frank would start with, and nothing else.
- **Proof:** one line per tool on what Frank uses it for; affiliate status beside the link; one non-affiliate alternative per row.
- **Primary action:** open the tool.
- **State now:** 33 hardcoded tools; three raw referral links bypass `/go`; disclosure only in the hero. Wave 1 fixed the `/go` 404 and the "Curated, not sponsored" contradiction.
- **Next move:** 8 to 10 tools Frank names; links through `/go` from `data/affiliate/programs.json`; `components/affiliate-disclosure.tsx` beside each affiliate link. `data/subscriptions.json` stays private.

### Templates `/templates` and starter kits
- **Goal:** the home of the Founder Kit.
- **Primary action:** install the kit, or deploy one template.
- **Next move:** per [FOUNDER-KIT-PRD.md](FOUNDER-KIT-PRD.md); Vercel button plus Cloudflare static export per template.

### Work with Frank `/work-with-me`
- **Goal:** qualified applications only.
- **Proof:** the five-phase approach; case pages under `/partnerships`.
- **Primary action:** apply for a fit call.
- **Next move:** confirm or remove the "110+ solution designs" stat still at `StudioClient.tsx:158` and `ConsultingClient.tsx:332`.

---

## Commerce and partners

### Products `/products` and Shop `/shop`
- **Goal:** show what exists, what is on a waitlist, and nothing that cannot be fulfilled.
- **State now:** about 20 waitlist products; nothing purchasable by design (checkout gated per SKU).
- **Primary action:** join one waitlist.
- **Next move:** three flagship waitlists in front; the rest under "Also planned". Products without a record (for example `/products/life-architecture`, linked from a post) get one or lose the link.

### Partners `/partners`, Affiliates `/affiliates`, Collaborations `/partnerships`
- **Goal:** honest, dated partner links that pay for the site without steering the reader.
- **Proof:** verification date per link from `data/affiliate/programs.json`.
- **State now:** three lists disagree; `/partners` claims programs the registry marks closed (Notion); Riverside, Cloudflare, Supabase, Suno and Vercel have no registry entry.
- **Next move:** one registry renders both pages; only dated links show; disclosure before the click; partners Frank works with but earns nothing from (Cloudflare, Supabase, Riverside unless approved) listed as "tools I use" without referral parameters.

### Ecosystem `/ecosystem`
- **Goal:** one place where FrankX, GenCreator, Arcanea, Starlight and Vibe OS sit together, each with its job.
- **Next move:** a five-card brand block from `data/ecosystem.ts`; no Arcanea canon outside Arcanea's card.

---

## Create and music

### GenCreator `/gencreator`
- **Goal:** send creators to gencreator.ai with the right expectation: private alpha, no public checkout (gencreator.ai ADR-010).
- **Primary action:** join the GenCreator waitlist.

### Music `/music`
- **Goal:** human proof. Unchanged door; never autoplay.

---

## Identity and agents

### About `/about`
- **Goal:** who Frank is, in facts. Wave 1 replaced the "sovereign systems for a freer world" hero with what he builds.
- **Primary action:** see current work.
- **Next move:** the authority line from `docs/strategy/frankx-authority-positioning.md` and the Oracle independence disclaimer in one place.

### Ask Frank `/ask`
- **Goal:** a grounded AI representative that answers from published work and routes to the right page.
- **Primary action:** ask a question.
- **Measure:** cited-link clicks; refusal rate; spend per day under cap.
- **Next move:** per [ASK-FRANK-AGENT-PRD.md](ASK-FRANK-AGENT-PRD.md).

### Newsletter `/newsletter`
- **Goal:** the one retention channel.
- **Next move:** one name instead of three (Creation Chronicles, Signal Loop, "the briefs"); Frank's decision.
