# frankx.ai editorial audit: voice, slop, blog, voice library

Read-only audit of `frankxai/frankx.ai-vercel-website` (checked 2026-11-05). Nothing was edited, committed or pushed. Replacements below use only facts that already appear in the repo; slots in [brackets] need a fact the repo does not hold.

---

## 1. The voice, as a spec

### 1.1 Which documents actually rule

| Rank | Source | Status |
|---|---|---|
| 1 | `design.md`, `taste.md` (local) | Outrank every skill (CLAUDE.md). `taste.md` last reviewed 2026-04-25. |
| 2 | `CREATOR.md` = pinned copy of `starlight-design-intelligence/brand-packs/frankx/COPY.md` (commit 851a11be) | Editorial gate. Newest and most specific. |
| 3 | `brand-packs/frankx/POINT_OF_VIEW.md` (approved by Frank 2026-10-23) | Six stances, proof rules, AGI-claim rules, `scripts/check-frankx-voice.mjs` pre-check. |
| 4 | `docs/strategy/FOUNDER-LANGUAGE-CODE.md` | Founder as the one avatar; Human Layer lenses; register boundaries. |
| 5 | `lib/voice/frankx-voice.ts` (reviewed 2026-06-25), `BRAND_IDENTITY.md` | Older. Still useful for the CTA and banned-word lists. |
| 6 | `docs/strategy/CONTENT_VOICE_DNA.md` (Feb 2026) | Oldest. Parts now contradict items 2 and 3 (see 1.5). |

### 1.2 What to do

1. Sound like one alert person talking to another. Write for a founder choosing a tool, system or offer. Give Frank's actual view plus enough evidence to decide (COPY.md).
2. First 120 words of a high-value page: why this page exists for this reader; what Frank saw, made, tested or learned; the smallest honest next step (COPY.md "Order of Truth").
3. Concrete noun, active verb, one claim per sentence, proof next to the claim. Vary sentence length.
4. First person when the judgment is Frank's. "I built this" beats "we built this" when one person built it (taste.md).
5. CTAs are human choices: reply, compare, try, inspect, meet (COPY.md).
6. Name prices, trade-offs, failures, dates, and what a source does not show. Date every "current" claim.
7. Humor is dry and observational, never performed (DNA doc).
8. Sentence case for every label and heading (CREATOR.md editorial contract).
9. Attribute every forecast (who, when, venue). Pair every capability claim with its bottleneck (POINT_OF_VIEW).
10. Human Layer claims carry exactly one lens: established, emerging, experiential or symbolic (FOUNDER-LANGUAGE-CODE).

### 1.3 Four tests (COPY.md) to run on every line

- Name-swap: swap the person or product. If it still works, it is generic.
- Builder-taxonomy: strip AI, agent, skill, infrastructure, ecosystem, sovereign, substrate. If the meaning goes, the sentence was hiding.
- Concrete anchor: one observable moment, artifact, decision, result or working behavior per claim.
- Deletion: delete the grandest adjective and the most abstract noun. If it improves, keep the deletion.

### 1.4 What is banned (union of all authorities)

- Slop phrases enforced by `scripts/audit-ai-slop.mjs` (24 patterns): delve into, dive deep, deep dive, dive into, it's worth noting, in conclusion, navigate the landscape, unleash, harness the power, unlock the power, unlock your potential, empower your team, take your X to the next level, next-level, cutting-edge solution, game-changing, revolutionary, and "Certainly," / "Absolutely," at the start of a line.
- Additional bans in `taste.md`, `COPY.md`, `frankx-voice.ts`, `FOUNDER-LANGUAGE-CODE.md` that nothing enforces: leverage, harness, utilize, unlock (any), reimagine, elevate, transform without a measurable object, sovereign / Godmode as unearned superlatives, rhetorical contrast "X, not Y", slogan fragments, invented labels ("tool intelligence", "operating-role routes"), filler verbs (helps, enables, allows, empowers), vague CTAs (Learn More, Click Here, Explore, Discover), em dashes ("estate writing standard", `check-frankx-voice.mjs` errors on them), emoji as chrome, fake scarcity, income or earnings claims, "journey/awakening/manifest" guru language, "AI Systems Architect" (the title is "AI Architect"), Arcanea mythology on FrankX surfaces.

### 1.5 Gaps and conflicts in the authorities (worth fixing before agents lean on them)

1. **The audit gate is much narrower than the rules.** `pnpm run ai-slop:audit:strict` reports "2729 files scanned, 0 hits" (run today). That is a pass on 24 phrases. It does not check: sovereign, arsenal, unmatched, unbeatable, battle-tested, production-grade, leverage, ecosystem, transform, em dashes, contrast formulas, "Explore" CTAs, title-case labels, or hyphenated variants (the blog index FAQ still says "technical deep-dives" at `app/blog/(index)/page.tsx:30` because the regex `deep dive` needs a space).
2. **Allow-list exemptions.** `content/2-ready-to-publish/`, `content/strategy/`, `docs/ops/` and others are skipped. Staged drafts get no check until they move.
3. **CONTENT_VOICE_DNA.md contradicts COPY.md.** DNA's "signature move" is "Not a launch. Not a hot take." fragment rhythm and the "Subverted Expectation" hook. COPY.md bans contrast formulas and slogan fragments. DNA's own Anti-Patterns table also says to avoid "Not X. Y." so the doc disagrees with itself. DNA hook examples include "Built this to $12K MRR" (POINT_OF_VIEW bans income claims) and "12,000 songs" (the gencreator.ai CLAUDE.md in this estate marks "12,000+ songs" as unsourced). Treat DNA as a rhythm reference only, not a template library.
4. **Ownership verbs differ.** `frankx-voice.ts` proof list says "Built Oracle EMEA AI CoE". Frank's own 2026-05-01 LinkedIn post (`content/social/linkedin/2026-05-01-departure-announcement.md:27`) says "helped architect". Use the softer verb (SIS Metrics Truth Rule: built / contributed to / influenced / supported).
5. **Newsletter name drift.** `BlogPageClient.tsx:327` says "Join Creation Chronicles"; `app/start/page.tsx:78` and FOUNDER-LANGUAGE-CODE use "Signal Loop"; the research hub says "Get the briefs". One reader-facing name needed.

### 1.6 Good lines that already exist (use as calibration)

| Line | Where | Why it works |
|---|---|---|
| "Monday plan, ten minutes. Friday review, fifteen." | `app/foundry/page.tsx:98` | Two numbers, two verbs, nothing else. |
| "If nobody runs the Friday review, the install is shelf-ware. We decline rather than ship that." | `app/foundry/page.tsx:110` | States a cost to Frank. |
| "We take businesses that win by being right, not loud." | `app/foundry/page.tsx:114` | A real selection rule (note: it is a contrast formula, but the claim is a decision). |
| "Find the constraint. Then make the next move count." | `app/founder-stack/page.tsx:54-56` | Imperative, one idea. |
| "A decision aid, not a diagnosis." plus the sentence naming what it does not do | `app/founder-stack/page.tsx:137-142` | Boundary stated, then specifics. |
| "Build something inspectable before making a large claim." | `app/about/page.tsx:78` | A rule Frank holds himself to. |
| "A generated draft is not a FrankX position." | `app/about/page.tsx:85` | Plain, checkable. |
| "Longevity research from Okinawa and Sardinia, read as a systems question: what keeps work meaningful when AI does more of it." | `app/research/research-hub-client.tsx:473` | Names the object and the question. |
| "There is no measured universal winner in this hub." | `app/llm-hub/page.tsx` FAQ (line 31) | Refuses the easy answer. |
| "I use Wispr Flow every day, mostly to speak long briefs into Claude Code agents." | `content/blog/voice-typing-for-founders.mdx:15` | First person, specific habit. |
| "Treat that as their marketing claim. Your real number is time to a sendable message." | `content/blog/voice-typing-for-founders.mdx:21` | Separates vendor claim from the reader's measurement. |
| "Value over revenue. If a platform is the right tool but has poor affiliate economics, we still recommend it, without a referral link." | `app/partners/page.tsx:213-215` | Policy as a promise with a cost. |

---

## 2. Surface audit

Severity key: **P0** wrong or unearned claim, or a gate the brand itself names; **P1** slop or contrast formula; **P2** style (title case, em dash, vague CTA). Line numbers are current as of this audit.

### Systemic findings (apply to every surface)

- **Vague "Explore" CTAs** despite the repo's own rule: `app/about/page.tsx:121` "Explore current work"; `app/start/page.tsx:53,62` "Explore the Foundry", "Explore the Circle"; `app/research/research-hub-client.tsx:109` "Explore research hubs"; `app/llm-hub/page.tsx:152` "Explore all models"; `app/affiliates/page.tsx:243` "Explore Tool"; `app/templates/page.tsx:334` "Explore 19 v0 Interactive Prototypes".
- **Title-case labels** where sentence case is required: "Choose Your Path" (`acos:446`), "Start Building with the Agentic Creator OS" (`acos:544`), "Read Latest Articles" (`research-hub-client:455`), "Stay Current" (`:428`), "Featured Articles" / "More Articles" (`BlogPageClient:235,271`), "Weekly Insights" (`:324`), "What Gets Installed" (`foundry:328`), "Join Waitlist" (`waitlist:59`), "Free Developer & Creator Templates" (`templates:404`).
- **Em dashes** in visible copy. Counts in the audited app trees: research 157, foundry 46, acos 39, products 24, llm-hub 18, partners 17, work-with-me 10, stack 7. Blog: 4,494 across 281 posts (about 16 per post).
- **Contrast formulas** ("X, not Y") on at least 9 headings: foundry (240, 243, 373, 440), work-with-me (313), founder-stack (137), llm-hub (259), partners ("a decision aid"), ACOS FAQ.
- **Third-person / "we" / "I" mixing on one page**: `app/partners/page.tsx` says "We are applying" (26), "Frank is applying" (334), "How I build" (413).
- **Invented labels** that hide a simple action: "Intelligence Arsenal", "Canonical v0 Sovereign Design Engine", "Autonomous Swarm Workstation", "Digital Estate and Architecture Solutions" (products JSON-LD).

### 2.1 /research (`app/research/page.tsx`, `research-hub-client.tsx`, `research-hub-lead.tsx`)

State of play: the most recently cleaned surface. Hub questions in `lib/research/hubs.ts` ("What can you delegate?", "What runs underneath?") and the hub FAQ are strong. Remaining problems are in the hero and bottom CTA.

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `research-hub-client.tsx:92-94` | "Research what matters. Build what comes next." | Passes the name-swap test for any research site; slogan fragment pair. | "Seven research hubs. Sources shown, limits stated." (matches lead.tsx:34 "Seven research hubs." and the lede at :99-101) |
| `:87` | "FrankX Research · Science, systems & human potential" | Abstract triad hides the topics. | "FrankX Research · AI systems, creative work, human potential" (hubs.ts titles) |
| `:428-432` | "Stay Current / Get weekly intelligence briefs synthesizing the most important developments across AI architecture, production patterns, and emerging technology." | Title case; "intelligence briefs" is an invented label; "synthesizing the most important" is an unearned superlative. | "Get the weekly briefs. New research on AI architecture, production patterns and emerging technology, with sources linked." |
| `:455` | "Read Latest Articles" | Title case. | "Read the latest articles" |
| `:650` | "The research maps the landscape. These portals curate the videos, docs, and expert channels to actually build with each platform." | "maps the landscape" is on the taste.md refusal list in spirit; "actually" is filler. | "These portals collect the videos, docs and expert channels for building with each platform." |
| `research-hub-lead.tsx:28` | "Choose your field" | Fine, but "field" vs "hub" vs "domain" vs "topic map" vary across the page (5 words for one thing). | Pick "hub" and "brief"; use them everywhere. |

### 2.2 /blog index (`app/blog/(index)/page.tsx`, `BlogPageClient.tsx`)

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `page.tsx:14` | "New articles cover a range of topics including AI implementation guides, enterprise architecture patterns..." | Answers "how often" with no cadence. Generic. | State the real cadence from the publish log ([cadence]); otherwise: "Articles publish when a build or a source is ready. The newsletter sends the weekly summary." |
| `page.tsx:30` | "articles range from beginner-friendly introductions to advanced technical deep-dives" | "deep-dives" slips past the audit (hyphen). | "Each article opens with a one-paragraph summary and a reading goal, so you can tell in ten seconds whether it fits your level." (true of recent posts: `tldr`, `readingGoal` frontmatter) |
| `BlogPageClient.tsx:324-330` | "Weekly Insights / Join Creation Chronicles / Get weekly insights on AI, creativity, and building in public." | Title case; "insights" is filler; newsletter name conflicts with Signal Loop. | "Weekly note / Get the weekly note / One email a week on what I built, what broke and what I learned." |
| `BlogPageClient.tsx:235,271` | "Featured Articles", "More Articles" | Title case. | "Featured", "More articles" |
| `page.tsx:22` | "covers enterprise AI architecture, agentic systems, creative AI tools like Suno and Midjourney, AI implementation strategies, venture building, and insights from building production AI systems." | List of nouns, 4 of 6 say "AI". | "AI architecture, agent workflows, AI music with Suno, and the business of building alone." (only if venture-building posts exist; otherwise drop it) |

Hero "Inside the build." (`BlogPageClient.tsx:93`) is good.

### 2.3 /acos (`app/acos/page.tsx`)

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `205` vs `51-55`, `107`, `137` | Hero: "99 agents. 35+ skills. 117+ commands. 11 pillars." FAQ/JSON-LD/tiers: "35+ commands, 75+ skills, 38 agents". | Two incompatible sets of counts on one page. Neither matches `frankxai/agentic-creator-os/CLAUDE.md` (85 commands, 176 skills, 81 agents). Blog guide says "25 commands, 80+ skills, 40+ agents". Unearned claim. | Remove counts until generated from ACOS metrics; then "as of [date]". Interim: "Commands, skills and agents for Claude Code, covering writing, music and publishing. Type /acos to see what is installed." |
| `197-203`, `229` | "The operating system for generative creators." / "ACOS v10.2 loaded" | Slogan; ACOS is at v11 in its own CLAUDE.md. | "A command set for Claude Code. One entry point: /acos." (facts: lines 342-347, 547) |
| `127` | "Absolutely. Every agent is a markdown file, every skill is a configuration." | Chatbot tell at the start of an answer (the audit only catches "Absolutely," at line start of source text, not inside a string). | "Yes. Every agent is a markdown file and every skill is a configuration file. Edit, add or remove any of them." |
| `372-375` | "Gets smarter every session." / "pure local intelligence built from your own usage patterns" | Unearned: the mechanism described (lines 383-386) is recording tool sequences and re-injecting them. "Smarter" overclaims; "intelligence" is the invented label. | "Remembers what worked. It records which tool sequences succeeded and loads them as context for similar tasks, locally." |
| `446`, `544` | "Choose Your Path", "Start Building with the Agentic Creator OS" | Title case; second is a vague CTA. | "Pick a tier", "Clone the repo and type /acos" |
| `449` | "Premium adds guides, templates, support, and direct access." | "Premium", "direct access" are vague. | "The code is free. Paid tiers add video walkthroughs, templates and email support." (lines 70-77) |

### 2.4 /products (`app/products/(index)/page.tsx`)

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `403-405` | "Operational systems. / Engineered for production." | Name-swap: fits any template shop. "Engineered" is a prestige verb. | "Skill packs, prompt libraries, vaults and repo templates." |
| `415` | "Inspectable skill packs, prompt libraries, Obsidian vaults, and repository templates with clear file manifests." | Good facts, but "clear" is self-grading. | "Each product lists its files before you get it." |
| `866-869` | Badge "Sovereign architecture"; H2 "Run inspectable AI architectures in your own stack" | "Sovereign" is on the unearned list; "AI architectures" is taxonomy. | Drop the badge. H2: "Start with the free starter kits" (line 872 says exactly that). |
| `346-348` (JSON-LD) | "FrankX AI Digital Estate and Architecture Solutions"; "Production agent frameworks, system prompt suites, multi-modal workflows, and enterprise AI blueprints" | Invented label; "production" claim for products that line 842 says may be on a waitlist. | "FrankX products: skill packs, prompt libraries and templates" |
| `892` | "Read the dispatch" | "Dispatch" is an invented noun for the newsletter. | "Read the newsletter" |
| `595` | "Search systems and blueprints..." | Same invented nouns. | "Search products" |

### 2.5 /llm-hub (`app/llm-hub/page.tsx`)

State of play: calibrated and honest (evidence grades, "no measured universal winner"). Few fixes.

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `259` | "Creators don’t pick a model — they assemble a stack." | Contrast formula plus em dash. | "A creator picks one model per modality. Here is what to use for each, and the workflow." |
| `74` | "Categorized directory of every major LLM provider" | "every" is unearned; page elsewhere says coverage is "selected". | "Directory of LLM providers: frontier models, agent platforms, pricing and capabilities, with sources." |
| `73` | "LLM Provider Hub 2026" | Title case in a heading. | "LLM provider hub, 2026" |
| `188` | "GPT-6 Astra: model facts before accepted work" | "accepted work" is house jargon; reader will not decode it. | "GPT-6 Astra: what is documented, and what we have not tested" (line 189 states 12 cases defined, none run) |
| `152` | "Explore all models" | Vague CTA. | "Compare all models" |

### 2.6 /agent-hub (`app/agent-hub/page.tsx`)

State of play: the FAQ (lines 38-55) is some of the best copy on the site ("The question is underspecified, and that is the useful answer."; "Because the leaderboards are known to be gameable.").

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `166`, `51` | "See the 99-agent catalog" / "the 99-agent Creator OS actually built and run on this stack" | Count conflicts with ACOS page (38 / 81) and carries an "actually". | "See the agent catalog" until the count is generated. |
| `150-151` | "...— what each is for, and where each stops being the right answer." | Em dash; otherwise good. | Replace dash with a full stop: "...build them with. What each is for, and where each stops being the right answer." |
| `99` | "Agent Hub 2026" | Title case. | "Agent hub, 2026" |
| `156` | "Read this before the tables" | Fine. Keep. | n/a |

### 2.7 /founder-stack and /stack

`founder-stack/page.tsx` is largely clean (the model surface for the founder lens). Issues are in `/stack`.

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `stack/page.tsx:7,14,25,31` | "The FrankX Stack — Curated AI Tools & Templates" | Title case plus "Curated" (the DNA doc lists "curated" as filler). Used 4 times in metadata. | "Tools I use for AI work" |
| `stack/page.tsx:9` | "Hand-curated gallery of the best AI tools... Battle-tested picks" | "best", "battle-tested" unearned. | "The AI tools, templates and infrastructure I use, with the reason for each." |
| `StackGalleryClient.tsx:531` | "Battle-tested across shipped products." | Prestige idiom; no anchor. | "Used on frankx.ai and the projects linked from /products." (only if true; else delete) |
| `StackGalleryClient.tsx:60` | "Production-grade scaffolds that save you weeks." | Unearned time claim. | "Starter repositories I would clone first." |
| `StackGalleryClient.tsx:72` | "From edge functions to GPU clusters — the boring stuff that matters." | Em dash; "the stuff that matters" is filler. | "Edge functions to GPU clusters: where the work runs." |
| `StackGalleryClient.tsx:109` | "AI-powered UI generation. Describe a component, get production-ready React and Tailwind." | Vendor copy repeated as Frank's voice; "production-ready" claim about a third party. | Describe what Frank does with it, in first person. |
| `founder-stack/page.tsx:100-101` | "Founder is the avatar." | Internal jargon on a public page. | "I write for founders. Entrepreneur, solopreneur and coach describe the company shape, not a different reader." |

### 2.8 /partners and /affiliates

`/partners` is mostly honest (a good "value over revenue" policy). `/affiliates` is the worst slop on the audited surfaces and sits beside a page that says the opposite.

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `affiliates:121,125,128-130` | Badge "Expert-Curated Intelligence Arsenal"; H1 "Intelligence Arsenal"; "The exact tools and systems powering the FrankX intelligence stack. Tested, validated, and recommended by our agentic experts." | Invented label, "arsenal", "agentic experts" (there is one person), "exact", "validated" unearned. Title case. | H1: "Tools I use, and which links pay me." Lede: "Each entry says what I use it for. Links marked as affiliate earn a commission." |
| `affiliates:50` | "Core engine for our agentic systems. Unmatched reasoning depth." | Unmatched = unprovable superlative. | "I use Claude Code as my daily build harness." (`partners/page.tsx:344`) |
| `affiliates:72` | "Our hosting platform of choice. Unbeatable developer experience." | Same. | "Every frankx.ai surface ships on Vercel." (`partners:340`) |
| `affiliates:61`, `:94` | "Effortless infrastructure." / "Clean metrics that respect user privacy. No bloat." | Ad copy. | Say what Frank runs on it. |
| `affiliates:259` | "Our Intelligence Arsenal represents tools we genuinely use... All expert insights reflect real implementation experience across our agentic systems." | "Genuinely" is a protest word. Disclosure sits in a footer paragraph, the pattern `agenticincome/CLAUDE.md` forbids ("Never use footer-only disclosures"). The 5-star ratings (`rating: 5` on every entry) are not evidence. | Inline label next to each affiliate link ("Affiliate link") and drop the star ratings. |
| `affiliates:243` | "Explore Tool" | Vague CTA, title case. | "Open Railway" (name the tool) |
| `partners:352` | "Nominee pathway. Munich EBC contacts and Oracle × NVIDIA partner event 2025 co-architect history anchor the conversation." | Names Oracle; "co-architect" is an ownership verb needing verification; reads as borrowed status. | Remove or restate with a verified, dated fact from Frank. |
| `partners:26` vs `:334` vs `:413` | "We are applying..." / "Frank is applying..." / "How I build..." | Three narrators. | Use "I" throughout. |

### 2.9 /about (`app/about/page.tsx`)

State of play: the FAQ and "trust needs clear boundaries" blocks are strong. The hero undermines them.

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `107-108` | "Building sovereign systems for a freer world." | Fails the taxonomy and name-swap tests. "Sovereign" is on the unearned list. Guru register. | "AI architect and musician in Amsterdam." (eyebrow at :104 already says it; use the H1 for what he does) or "I build agent workflows, research, books and music, and publish the work." (FAQ :32) |
| `114` | "...my mission is singular: empower builders and creators to achieve total economic, creative, and technical independence." | "Empower", "total", "independence" with no object; grand claim next to "Builder since age 5". Contradicts the page's own FAQ ("Frank considers bounded architecture and partnership work..."). | "I translate enterprise experience into inspectable architectures, agent workflows and practical build decisions." (:60, already on the page) |
| `111` | "Builder since age 5. Former AI architect at Oracle. Prolific musician." | Fragment stack; "prolific" is a self-grade. | "Builder since I was five. Former AI architect at Oracle, now independent. I release music." (add a count only from a verified inventory) |
| `121`, `128` | "Explore current work", "See how the workspace runs" | Vague CTA; "workspace" unexplained. | "Read the latest work", "See how the agent team works" |
| `211` | "The site looks broad because these modes constantly inform one another." | Fine. Keep. | n/a |

### 2.10 /work-with-me (`StudioClient.tsx`, `page.tsx`)

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `252` | "Focused engagements designed to move your AI ambitions from vision to production." | Consultant language; name-swap fails. | "Five engagements. Each has a named deliverable and a starting price." (lines 87-133) |
| `133` | "Demystify AI, identify high-value use cases, and align on an actionable AI strategy." | "Demystify", "high-value", "actionable" are stock. | "A workshop for your leadership team. You leave with a ranked list of use cases to test and a plan for the first one." (deliverables, :134) |
| `346` | "Deep domain knowledge across regulated and high-complexity industries." | Unanchored; no industry named. | List the industries that appear in the cards below it. |
| `385`, `158` | "A proven five-phase approach refined across 110+ solution designs." | "Proven" and the count need a source. `lib/hub.ts:111` holds the number; the 2026-05-01 LinkedIn post says Frank "contributed to solution designs", not owned them. Ownership-verb risk. | "A five-phase approach. [N] solution designs I contributed to at Oracle informed it." (needs Frank to confirm N and verb) |
| `123` | "...like having a fractional AI Architect on your team." | Simile cliche. | "Architecture reviews, design sessions and team coaching, billed monthly from EUR 3,000." |
| `313` | "Some businesses need an operating system, not a session." | Contrast formula. | "If you need the whole system installed, see the Foundry." |
| `app/work-with-me/page.tsx:8` | "I architect systems, coach builders, and create what doesn't exist yet." | "create what doesn't exist yet" is a slogan. | "I architect AI systems and coach the people who build them." |

### 2.11 /start

State of play: the cleanest surface. "One founder. Five operating layers." and "Choose the next useful move." are on-voice. Two items:

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `start/page.tsx:42` | "...voice, judgment, and earned beliefs your AI systems should amplify rather than average away." | Contrast formula; "AI systems" taxonomy. | "A scan for the voice and beliefs you want AI tools to keep, not smooth out." |
| `:53,62` | "Explore the Foundry", "Explore the Circle" | Vague CTA. | "Read the Foundry guide", "See what the Circle includes" |

### 2.12 /ask (`app/ask/[slug]/page.tsx`, `data/ask-questions.ts`)

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `page.tsx:352-353` | "Want to discuss this for your specific situation?" / "Want to go further?" | Template question headings. | "Bring your own case" / "Next step" |
| `ask-questions.ts:77` | "Your prompt is less 'describe what you want' and more 'activate the right latent patterns in the model.'" | Contrast formula; unverifiable claim about model internals. | Describe the prompt structure that works, with an example. |
| `ask-questions.ts:491` | "A content engine is a system, not a tool." | Contrast formula. | Delete the sentence; the next one carries the point. |
| `ask-questions.ts:35` | Answers begin with definitions ("A multi-agent system is an architecture where..."). | Violates "Order of Truth": reason and Frank's experience come second. | Open with what Frank built or saw, then define. |

### 2.13 /waitlist

Clean. "Get launch updates" and "Join once and get launch updates for planned courses and product releases." are plain and honest. Only fix: button `Join Waitlist` (`waitlist/page.tsx:59`) to "Join the waitlist". Intent labels (`:17-24`: "Conscious AI Foundations", "Aurora UI Kit") are product names; check they match live product titles.

### 2.14 /templates (`app/templates/page.tsx`)

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `316-318` | "Sovereign Business Starter Kits & Templates / Fork, Own, and Launch Globally." | Title case, "sovereign", imperative trio, "globally" unearned. | "Starter kits you can read before you use them." |
| `324` | "Modular architectures built on local-first principles. Launch micro-SaaS tools, digital asset marketplaces, autonomous swarms, and creator knowledge hubs with zero SaaS cage lock-in." | Taxonomy pile; "SaaS cage" is a coined insult; "autonomous swarms" unexplained. | "Free templates download today. Commercial kits are on a launch list." (labels at :36-143) |
| `362` | "Canonical v0 Sovereign Design Engine" | Invented label. | "Live demos in v0" |
| `119` | "Autonomous Swarm Workstation (ACOS Core)" | Invented label. | "ACOS: commands and agents for Claude Code" |
| `334` | "Explore 19 v0 Interactive Prototypes" | Vague CTA; verify the 19. | "Open the v0 prototypes" |
| `313` (eyebrow) | "AI Architect for a More Free World · Starter Kits & Blueprints" | Slogan; "More Free World" is not idiomatic. | "AI architect · Starter kits and blueprints" |
| `90` | "...launching sovereign AI tools." | "sovereign". | "...for launching small AI tools." |

### 2.15 /foundry (`app/foundry/page.tsx`)

State of play: the strongest commercial surface. The selection rules (lines 106-114) and weekly rhythm are exactly the voice. Remaining items are contrast formulas and title case.

| Line | Quote | Why it fails | Replacement |
|---|---|---|---|
| `240-243` | "Three layers. Every one of them public. The claim is substance, not marketing: ..." | Contrast formula. | "Three layers, all in public repositories. Read them before you apply." |
| `373` | "The receipts, not the pitch." | Contrast formula; slogan. | "What you can inspect" |
| `440` | "Evaluated, not transactional." | Contrast formula. | "How applications are reviewed" |
| `334-336` | "Most companies use AI as a blank chatbot. An installed OS is a repository that teaches the AI who you are — so every session works like a trained team member." | First sentence is an unattributed generalization; "trained team member" is a simile cliche. | "An installed OS is a repository that tells the AI who you are, so each session starts with your rules and your history." |
| `250`, `269`, `309` | "LAYER 0 — SUBSTRATE", "THE AGENTIC OS FAMILY", "LAYER 2 — THE SERVICE" | All caps taxonomy; "substrate" is on the builder-taxonomy list. | "Layer 0: Starlight Intelligence System" and say what it does in the first clause. |
| `328` | "What Gets Installed" | Title case. | "What gets installed" |
| `204` | "Apply for an Install" | Title case plus noun-as-verb. | "Apply for an install" |

### 2.16 Pattern across surfaces

- Pages that Frank rewrote recently against a stated rule (research, llm-hub, agent-hub, founder-stack, start, about FAQ) are strong; pages last touched during the 2025 "sovereign / intelligence / ecosystem" naming era (affiliates, templates, products badge, ACOS hero) are weak.
- Weak copy clusters in **three places**: hero H1s, commercial feature cards, and vendor-borrowed one-liners.
- The strongest lines always contain a number, a name, or a refusal.

---

## 3. Blog audit

Method: sorted `content/blog/*.mdx` by `date` frontmatter (281 posts with frontmatter; 288 files). Computed per post: word count (code excluded), visuals per 1,000 words (body images, `<Diagram>`, `<ArticleFigure>`, mermaid, plus 1 for a frontmatter hero), slop-word density (broad list: unlock, leverage, seamless, robust, transform, landscape, ecosystem, journey, sovereign, orchestrat..., so more than the 24-phrase gate), contrast-formula count, em dashes, title-case H2s. Then read the openings.

Scores are 1-5 (5 best). Slop: **5 = clean**. Visual richness: 1 = hero only, 5 = a diagram or figure every 300-400 words.

### 3.1 The 10 most recent posts

| Date | Post | Words | Voice | Structure | Visual | Slop | Note |
|---|---|---|---|---|---|---|---|
| 2026-11-02 | llm-gateway-architecture-guide | 1,159 | 3 | 4 | 2 | 4 | Dense bold TL;DR; 17 em dashes; no architecture diagram for an architecture guide; "$400 overnight" example is unlabelled as hypothetical. |
| 2026-10-20 | wispr-flow-vs-superwhisper-vs-macwhisper-vs-willow | 1,426 | 4 | 4 | 2 | 5 | Three tables, hero only. |
| 2026-10-20 | voice-writing-for-authors | 1,788 | 4 | 4 | 2 | 5 | 0 em dashes. |
| 2026-10-20 | voice-typing-for-founders | 1,819 | 5 | 5 | 2 | 5 | Model post: `readingGoal`, `tldr`, question H2s, first person, a testable seven-day protocol, vendor claim separated from reader's own number. |
| 2026-10-20 | voice-typing-for-creators | 1,620 | 4 | 4 | 2 | 5 | No table or diagram. |
| 2026-10-20 | voice-typing-for-ceos | 1,704 | 4 | 4 | 2 | 5 | Same template as founders; risk of sibling-post sameness (see 3.4). |
| 2026-10-20 | voice-prompting-for-ai-architects | 2,042 | 4 | 4 | 2 | 4 | One "transforms" (product feature name). |
| 2026-10-20 | speaking-vs-typing-speed | 1,342 | 4 | 4 | 2 | 5 | Good: tells the reader to run a five-minute test. |
| 2026-10-16 | vercel-ship-2026-builder-decisions | 1,122 | 3 | 3 | 1 | 5 | No hero image in frontmatter; link-chain paragraphs; strong "checked against vercel.com on 16 Oct 2026" opener. |
| 2026-10-14 | official-openai-plugins-guide | 1,901 | 4 | 4 | 2 | 4 | Ten tables; "ecosystem"; good scope paragraph on what "official" means. |

Average: voice 3.9, structure 4.0, visual 1.9, slop 4.7.

### 3.2 Five older flagship posts

| Date | Post | Words | Voice | Structure | Visual | Slop | Note |
|---|---|---|---|---|---|---|---|
| 2026-08-27 | 4-hour-ai-architect-deal-framework-2026 | 4,140 | 4 | 4 | 5 | 3 | 6 mermaid + 7 figures (3.4 per 1k words, best on the site); "leverage" repeated; opens with a human problem ("You can feel the paradox by late afternoon"). |
| 2026-03-21 | prompt-engineering-2026-what-still-works | 3,048 | 4 | 4 | 1 | 3 | 32 em dashes; "this is a crucial distinction"; "highest-leverage insight"; no figures at all in 3,000 words. Opening reports a real number ("74-prompt library", "60% included compensatory language"). |
| 2026-03-21 | how-to-write-claude-md-that-works | 839 | 4 | 4 | 3 | 3 | 22 em dashes in 839 words; 7 of 16 H2s in title case ("What CLAUDE.md Actually Is"); "170+ pages" claim needs a date. |
| 2026-01-27 | agentic-creator-os-complete-guide (v6) | 1,891 | 2 | 3 | 4 | 1 | "superintelligent operating system", "transforms"; counts (25 commands, 80+ skills, 40+ agents) conflict with every other ACOS count; but 5 diagrams + 2 mermaid. |
| 2025-09-19 | 08-golden-age-of-intelligence | 13,676 | 1 | 2 | 1 | 1 | 65 broad-list slop hits (4.8 per 1k), 33 title-case H2s, "Executive Briefing", "household name", "Authority Positioning"; one image per 13,000 words. Fails the audit's own spirit while passing its 24 phrases. |

Extra older samples: ai-capability-abundant-architecture-still-the-work (2026-08-31): voice 4, structure 4, visual 2, slop 4, strongest thesis on the site, heavy contrast formulas ("It is not drawing a beautiful diagram around a pile of software"); ai-architect-guide-2026: 4/5/2/4 (23 table blocks, no diagram); ai-engineering-without-hype-willison: 2/2/2/3 (449 words, video summary with title-case H2s and "gold rush"/"magic doesn't scale"); agentic-ai-roadmap-2026: 2/3/1/2 ("The numbers are staggering", unlinked statistics like "72% of enterprise AI projects"); the 2026-08-18 cluster (sovereign-creator-wealth-operating-system-2026, intent-compilers-dynamic-model-orchestration-2026 and about 16 siblings, 318-700 words): 1-2/2/2/1, up to 25.8 slop hits per 1k words, ASCII box diagrams in place of figures.

### 3.3 What drives quality

**Raises it (every 4-5 post has these):**
1. A reader decision in the first 120 words (`readingGoal` frontmatter plus a `tldr` that ends with an instruction).
2. First-person evidence: "I use Wispr Flow every day..." and a named number ("74-prompt library").
3. A test the reader can run themselves (seven-day protocol, five-minute speed test) instead of a verdict.
4. H2s phrased as the reader's question ("Which messages should a founder dictate first?").
5. Separation of source and interpretation, dated ("Checked against vercel.com on 16 Oct 2026").
6. Tables for comparison and a real diagram when the content is a mechanism.

**Drags it down:**
1. Era: posts from Sep 2025 to Jan 2026 and the 2026-08-18 batch carry the "intelligence / sovereign / orchestrat / ecosystem" register. Recent posts (Aug 2026 on) do not.
2. Thinness plus ASCII diagrams: 39 of 281 posts are under 700 words; the 2026-08-18 batch reads as templated.
3. Visuals: recent posts average 0.5-0.9 visuals per 1,000 words (hero plus tables). Only 4-hour-ai-architect, best-ai-app-builders and a few ACOS posts exceed 1.5. No recent voice-* post has a single diagram or screenshot of the protocol it describes.
4. Em dashes: 4,494 in the corpus, about 16 per post; 22 in the 839-word CLAUDE.md post.
5. Contrast formulas used as the thesis device in otherwise strong posts.
6. Unlinked statistics (72%, $52B by 2030) and conflicting product counts.
7. Template sibling posts (founders / creators / CEOs / authors voice-typing) share an opening shape; risk of reading as programmatic.

### 3.4 Blog fixes ranked by leverage

1. Add one figure per 600 words to the ten recent posts: for voice-typing-for-founders, a timeline of the seven-day protocol; for llm-gateway, a plane diagram; for vercel-ship, the decision matrix as a figure.
2. Retire or merge the 2026-08-18 cluster (without deleting URLs; CLAUDE.md forbids "consolidating" by deletion). Expand the strongest into 1,200+ words with Frank's own run data, or add a `noindex`/"archive" flag after approval.
3. Rewrite the ACOS v6 guide opening; remove counts; link to the live `/acos`.
4. Pull the title-case H2s in 08-golden-age, how-to-write-claude-md and Willison into sentence case.
5. Add the em dash and contrast patterns to the gate as warnings first.

---

## 4. Voice library: skeleton

Suggested home: `docs/strategy/VOICE-LIBRARY.md`, linked from `CREATOR.md` and `lib/voice/frankx-voice.ts`. This file would become the only place that holds lexicon and exemplars; the DNA doc would be marked "rhythm reference only".

### 4.1 Voice principles

1. **Observation before mechanism.** Say what Frank saw or made, then what it is called.
2. **One claim, one proof.** The anchor sits in the same sentence or the next.
3. **Say the cost.** Name the price, the time, the failure and the step that is still done by hand.
4. **The reader decides.** Offer a test, a boundary and a next step. Never a verdict the reader cannot check.
5. **Dry, not clever.** Humor only when it is an observation.
6. **Plain labels.** Sentence case, no coined nouns, no all-caps taxonomy.
7. **Sources visible, forecasts attributed, income never promised.**
8. **Inclusive by default.** Describe the work, not the worker. No "guys", no hustle or warrior metaphors, no scarcity.

### 4.2 Lexicon

| Avoid | Use instead | Rule behind it |
|---|---|---|
| sovereign (systems, architecture, creator) | owned, self-hosted, in your repository, or name the specific control | unearned superlative |
| intelligence arsenal / intelligence stack | the tools I use | invented label |
| unlock, unleash, empower, elevate, supercharge | the verb for what happens: draft, cut, ship, test, find | filler verb |
| leverage (noun or verb) | reuse, multiply, delegate, "one person does the work of a small team" only with evidence | on frankx-voice banned list |
| transform / transformation | name the change: from X to Y, with a number | needs measurable object |
| ecosystem | the list of products, with links | taxonomy |
| landscape | the comparison or the map, named | taste.md refusal |
| seamless, effortless, robust | what it does when it fails | unprovable |
| battle-tested, production-grade, world-class | "I run it on [site]" / "it passed [check]" | unearned |
| Explore, Discover, Learn more | Read, Compare, Try, Inspect, Open [name] | vague CTA |
| journey, awakening | the practice or the steps | guru register |
| "X, not Y" headings | state the positive thing | contrast formula |
| agentic experts, our team (when it is Frank) | I / Frank | honest narrator |
| "Absolutely", "Certainly" | Yes. | chatbot tell |
| em dash | a full stop, comma or colon | estate standard |
| Title Case Labels | Sentence case labels | CREATOR.md |
| 12,000 songs, 110+ designs, 99 agents (undated) | the number with "as of [date]" and its source file | Metrics Truth Rule |
| Oracle co-architect / built the AI CoE | "helped architect", "contributed to" | ownership verbs |

### 4.3 Twenty exemplar lines

Facts come from the repo. Slots are in [brackets].

**Hero (4)**
1. "AI architect and musician in Amsterdam. I build the work in public so you can inspect it." (about:104, 32)
2. "Find the constraint. Then make the next move count." (founder-stack:54-56, existing)
3. "Inside the build." (blog:93, existing)
4. "We install operating systems into businesses we believe in." (foundry:190, existing)

**Section head (3)**
5. "Monday plan, ten minutes. Friday review, fifteen." (foundry:98, existing)
6. "What is the best AI coding agent in 2026? The question is underspecified." (agent-hub:38, existing, reduced)
7. "Which messages should a founder dictate first?" (voice-typing-for-founders, existing)

**CTA (4)**
8. "Run the signal scan"
9. "Map my Founder Stack"
10. "Read the Foundry guide"
11. "Open the v0 prototypes"

**Card description (3)**
12. "Ten private questions identify the current constraint across State, Signal, Systems, Scale and Stewardship." (start:33, existing)
13. "Lab-style briefs on [topic]. Each lists its sources and what they do not show."
14. "[Tool]. I use it for [job]. [Affiliate link / no affiliate]."

**Research abstract (2)**
15. "Question: [question]. Sources read: [N], dated [range]. Finding: [one sentence]. Limit: [what this does not show]."
16. "Model specifications come from linked provider documentation. First-party experiments are published separately in Model Arena." (hubs.ts:118, existing)

**Blog intro (2)**
17. "I use [tool] every day, mostly to [job]. This post gives you a [N]-day test so you can find out whether it earns a place in your week."
18. "[Source] said [claim] on [date]. Here is what shipped this quarter, what the claim still needs, and what I would build now either way." (POINT_OF_VIEW specimen, filled with slots)

**Email (2)**
19. Subject: "[Specific thing] and what broke". Opening: "This week I [did X]. It [result]. Below is the step I still do by hand."
20. "If this feels true to your process, reply with one sentence about the step you repeat most. I read every reply."

### 4.4 Audience registers

Rules shared by all three: sentence case; no income promises; no urgency without a reason; no "guys"; one next step per message.

**Solo founders running agent fleets**
- Reader: carries the risk, makes the consequential calls, has a small number of agents doing real work and wants to stop being the approval layer.
- Tone: peer to peer; terse; numbers and failure modes.
- Lead with: the handoff that failed, the cost cap, the permission boundary, the human review point.
- Words to keep: runs, checks, cap, review, permission, receipt. Words to avoid: swarm, army, autonomous (unless the page defines the limits), sovereign.
- Proof: a named run with time, cost and the check that caught a mistake (POINT_OF_VIEW stance 2).
- Sample: "One agent pipeline did [task] in [time] for [cost]. The check that caught its mistake was [check]. I still review [step] by hand."

**Women building with AI**
- Evidence in the repo: none specific. A repo-wide search for "women" or "female founder" returns only fiction and one draft. Do not invent audience facts; interview first.
- Tone: concrete and unhurried; assumes expertise; never "even you can"; never rescue or empowerment framing; no gendered metaphors for the tools or the work.
- Lead with: the workflow she already runs, what she keeps control of, and what she owns when the tool changes.
- Words to avoid: empower, "break the glass ceiling", hustle, boss-babe, grind, warrior, "no tech skills needed".
- Offer: examples drawn from a named builder with her permission, labelled as such. Credit people by name. Offer a small test that does not need a call.
- Sample: "Bring one workflow you already run. We will find the single step worth handing to an agent, and the step you keep." (no outcome promised)

**Large-audience creators**
- Reader: has distribution, a posting cadence and a voice at risk of averaging out.
- Tone: practical, craft-first, honest about volume. Draws on the Founder Signal Scan language ("the voice and beliefs you want AI tools to keep").
- Lead with: a voice test (name-swap on their own post), an editing workflow, a rule for what the model never writes.
- Words to avoid: viral, hack, 10x, "content engine" without a definition, growth tricks, fake scarcity.
- Proof: before and after of one real post, with what Frank changed by hand (NARRATIVE.md "Work someone else can learn from").
- Sample: "Take your last post. Swap in a stranger's name. If it still works, the model wrote the voice, not you. Here is the three-step edit I use."

### 4.5 Process fit

- Run `node frankxai/starlight-design-intelligence/scripts/check-frankx-voice.mjs <file>` on copy before the editorial gate. It currently false-positives on YAML frontmatter `tags: [...]` lines in `.mdx` as "unfilled-slot"; strip frontmatter first or pass `--template`.
- Add the lexicon above to `lib/voice/frankx-voice.ts` `bannedPhrases` and the audit script as `warn` rules (em dash, "Explore", contrast formula, title case in headings, hyphenated variants of existing phrases). Changing `scripts/audit-ai-slop.mjs` requires normal branch/PR flow in this repo.
- Do not touch `app/page.tsx` or `components/home/**` for copy fixes (Homepage Preservation Contract). The homepage was not audited.

---

## 5. The ten most damaging lines (ranked)

1. `app/about/page.tsx:107-114`: "Building sovereign systems for a freer world." / "my mission is singular: empower builders and creators to achieve total economic, creative, and technical independence." Fix: "AI architect and musician in Amsterdam. I build agent workflows, research, books and music, and publish the work."
2. `app/affiliates/page.tsx:121-130`: "Expert-Curated Intelligence Arsenal" / "recommended by our agentic experts". Fix: "Tools I use, and which links pay me."
3. `app/affiliates/page.tsx:50,72`: "Unmatched reasoning depth." / "Unbeatable developer experience." Fix: "I use Claude Code as my daily build harness." / "Every frankx.ai surface ships on Vercel."
4. `app/acos/page.tsx:205` vs `:51-55,107,137`: "99 agents. 35+ skills. 117+ commands" vs "35+ commands, 75+ skills, 38 agents" (ACOS repo says 85 / 176 / 81). Fix: remove counts until generated, then date them.
5. `app/templates/page.tsx:316-324`: "Sovereign Business Starter Kits & Templates / Fork, Own, and Launch Globally... zero SaaS cage lock-in." Fix: "Starter kits you can read before you use them."
6. `app/work-with-me/StudioClient.tsx:385`: "A proven five-phase approach refined across 110+ solution designs." Fix: a sourced, correctly verbed count (contributed to, not owned).
7. `app/products/(index)/page.tsx:403-405,866`: "Operational systems. Engineered for production." and "Sovereign architecture". Fix: "Skill packs, prompt libraries, vaults and repo templates."
8. `app/research/research-hub-client.tsx:92-94`: "Research what matters. Build what comes next." Fix: "Seven research hubs. Sources shown, limits stated."
9. `app/foundry/page.tsx:243,373,440`: "The claim is substance, not marketing" / "The receipts, not the pitch." / "Evaluated, not transactional." Fix: plain headings ("What you can inspect", "How applications are reviewed").
10. `app/stack/StackGalleryClient.tsx:60,531`: "Production-grade scaffolds that save you weeks." / "Battle-tested across shipped products." Fix: "Starter repositories I would clone first."

Systemic: the audit gate passes with 0 hits while these remain; no scan covers em dashes, contrast formulas, "Explore" CTAs or title case.
