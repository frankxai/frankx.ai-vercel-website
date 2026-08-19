export type AskCategory =
  | 'ai-architecture'
  | 'music-production'
  | 'content-strategy'
  | 'creator-tools'
  | 'enterprise-ai'

export type AskPersona = 'architect' | 'producer' | 'strategist' | 'concierge'

export interface AskCta {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

export interface AskQuestion {
  slug: string
  question: string
  tldr: string
  answer: string
  category: AskCategory
  persona: AskPersona
  tags: string[]
  related: string[]
  cta: AskCta
  date: string
  featured?: boolean
}

export const askQuestions: AskQuestion[] = [
  {
    slug: 'what-is-a-multi-agent-system',
    question: 'What is a multi-agent AI system and when should I use one?',
    tldr: 'Multiple specialised AI agents working together — each owns a role, passes results upstream. Use when a single model can\'t hold all the context, or when tasks can run in parallel.',
    answer: `A multi-agent system is an architecture where several AI models (or instances of the same model) each handle a bounded sub-task, then pass results to the next agent in the chain.

## Why split a task across agents?

A single model has a finite context window, fixed inference speed, and no separation of concerns. A multi-agent design lets you:

- **Specialise** — one agent searches, one summarises, one writes, one reviews
- **Parallelise** — independent sub-tasks run concurrently, cutting wall-clock time
- **Gate quality** — each handoff can include a validation step before results propagate
- **Scale cheaply** — use a small, fast model for triage; escalate to a larger one only when needed

## The three patterns you'll actually use

**1. Sequential pipeline** — Agent A produces output → Agent B consumes it → Agent C finalises. Good for document drafting, code review cycles, research-to-publish flows.

**2. Parallel fan-out** — A coordinator breaks the task into N independent chunks, dispatches them simultaneously, then merges results. Useful for multi-source research or batch image analysis.

**3. Hierarchical (Queen + workers)** — A top-level orchestrator holds state and delegates to specialist workers on demand. This is how my Agentic Creator OS (ACOS) is structured.

## When NOT to use one

If your task fits in a single context window and runs in under 10 seconds, a single model call is almost always faster, cheaper, and easier to debug. Multi-agent overhead is real — orchestration bugs, latency between hops, and harder observability. Start simple.

## Tools I use

- **Vercel AI SDK v6** — \`streamText\` with tool calls, \`useChat\` on the client
- **Claude Code** — agentic task loops with file access
- **MCP (Model Context Protocol)** — connects agents to external tools without bespoke integration code

For enterprise deployments, I layer these inside Oracle Cloud's AI infrastructure with proper logging, rate-limit controls, and audit trails.`,
    category: 'ai-architecture',
    persona: 'architect',
    tags: ['multi-agent', 'architecture', 'vercel-ai-sdk', 'orchestration'],
    related: ['how-to-write-claude-md', 'claude-and-gemini-together', 'enterprise-ai-adoption-strategy'],
    cta: { label: 'Book a discovery call', href: '/connect', variant: 'primary' },
    date: '2026-05-01',
    featured: true,
  },
  {
    slug: 'how-to-write-suno-prompts',
    question: 'How do I write Suno prompts that actually produce professional tracks?',
    tldr: 'Treat the prompt as a brief for a session musician: genre + mood + instrumentation + BPM range + lyrical POV. Precision beats adjectives.',
    answer: `Suno\'s model is trained on a massive corpus of tagged audio. Your prompt is less "describe what you want" and more "activate the right latent patterns in the model."

## The anatomy of a high-yield Suno prompt

\`\`\`
[Genre/subgenre] [BPM cue] [key/mode] [instrumentation] [vocal style] [mood/energy arc] [lyrical POV]
\`\`\`

Example:
\`\`\`
dark synthwave, 118 BPM, Dm, heavy analog bass, talkbox vocals, building dread into euphoria chorus, first-person isolation
\`\`\`

## What fails every time

- **Adjective stacking without structure**: "epic, powerful, emotional, cinematic" — the model averages everything into mush
- **Lyric content in the style tag**: separate structural cues from lyric intent
- **Genre contradictions**: "jazz trap hip-hop classical fusion" — pick a centre-of-gravity and accent
- **No energy arc**: describing the whole track at one intensity produces flat songs; arc from intro → verse → chorus → drop

## Format flags that matter

Use Suno\'s \`[Instrumental]\`, \`[Verse]\`, \`[Chorus]\`, \`[Bridge]\` structure tags in the lyrics field. These aren\'t hints — they\'re hard layout instructions the model respects reliably.

## My actual workflow

1. Write a reference brief (1 sentence: artist + track + vibe)
2. Derive 3 prompt variants from different angles (instrumentation-led, mood-led, BPM-led)
3. Generate 4–6 clips per variant
4. Select best 2 clips per variant, extend them
5. Crop and splice in post

I\'ve produced 12,000+ tracks this way. The model rewards structural clarity over creative prose.`,
    category: 'music-production',
    persona: 'producer',
    tags: ['suno', 'prompting', 'music-production', 'ai-music'],
    related: ['ai-music-workflow-end-to-end', 'how-do-i-get-chorus-to-lift', 'adding-ai-without-losing-voice'],
    cta: { label: 'Watch the AI Music Masterclass', href: '/workshops/ai-music-masterclass', variant: 'primary' },
    date: '2026-05-03',
    featured: true,
  },
  {
    slug: 'ai-for-solo-creators',
    question: 'How should a solo creator use AI without turning into a content farm?',
    tldr: 'Use AI for research aggregation, first drafts, and distribution formatting. Keep your judgment, your POV, and your voice in every final output.',
    answer: `The failure mode for solo creators with AI is volume without signal. You can generate 20 posts a day and destroy your brand in a month.

## The mental model that works

Think of AI as your **research assistant + first drafter + distribution formatter** — not your ghostwriter.

- **Research**: let it aggregate, summarise, and surface gaps. Your job is to know what\'s missing from what it found.
- **First draft**: use it to beat the blank page. Your job is to gut-check the POV, inject specifics from your actual experience, and cut the hedge words.
- **Distribution formatting**: AI is excellent at repurposing a blog post into 5 LinkedIn hooks, 3 tweet threads, or an email snippet. This is pure leverage.

## What AI can\'t replace for you

- Your lived experience of the domain
- Your access to specific people, projects, and data
- Your aesthetic judgment about what\'s worth saying
- Your willingness to be specific about failures

These are your competitive moat. The creators winning with AI right now are the ones who use it to scale production of their original insights — not to generate insights they don\'t have.

## Practical rules

1. **Never publish a first draft** — AI drafts are starting points, not endpoints
2. **Add one personal data point to every post** — a number, a quote from someone you talked to, a result from your own work
3. **Own the headline** — the hook is the IP; don\'t let the model write what it\'s about
4. **Audit your read time** — if you\'re publishing 10 posts a day, you\'re a content farm. Three great pieces beats thirty forgettable ones.`,
    category: 'content-strategy',
    persona: 'strategist',
    tags: ['solo-creator', 'ai-writing', 'content-quality', 'brand-voice'],
    related: ['ai-content-engine-setup', 'automation-vs-augmentation', 'adding-ai-without-losing-voice'],
    cta: { label: 'Read the creator content guide', href: '/blog', variant: 'secondary' },
    date: '2026-05-05',
    featured: true,
  },
  {
    slug: 'claude-and-gemini-together',
    question: 'Can I use Claude and Gemini together in the same system?',
    tldr: 'Yes — and it\'s often the right call. Claude for reasoning, code, and structured writing. Gemini for grounded search, multimodal input, and long-context tasks.',
    answer: `Different models have genuinely different strengths. A well-designed system routes tasks to the model that handles them best rather than forcing one model to do everything.

## Where each model wins

**Claude**
- Extended reasoning with citations and structured chain-of-thought
- Code generation, refactoring, and multi-file repo work
- Long-form writing where voice consistency and instruction-following matter
- Constitutional/value-aligned generation for sensitive content

**Gemini 2.5 Pro**
- Grounded generation (real-time web search built in)
- Multimodal: image, video, audio, and PDF all in one call
- Massive context window (1M tokens — useful for whole-codebase analysis)
- Native Google Workspace and YouTube integration
- AI Studio for rapid prototyping at no cost

## How I route them in practice

In my Agentic Creator OS:
- Content research → Gemini (grounded, up-to-date)
- Draft writing → Claude (instruction-following, voice-consistent)
- Code work → Claude via Claude Code
- Image/video analysis → Gemini
- Final quality gate → Claude (constitutional checks)

## The integration layer

Vercel AI SDK v6 handles model routing cleanly via the AI Gateway — you pass a \`"provider/model"\` string (\`"google/gemini-2.5-flash"\`, \`"anthropic/claude-haiku-4.5"\`) and the Gateway handles auth, streaming normalisation, and cost tracking across providers.

No separate SDK imports per provider. One interface, any model.`,
    category: 'ai-architecture',
    persona: 'architect',
    tags: ['claude', 'gemini', 'multi-model', 'vercel-ai-sdk', 'ai-gateway'],
    related: ['what-is-a-multi-agent-system', 'best-ai-stack-2026', 'enterprise-ai-adoption-strategy'],
    cta: { label: 'See the architecture', href: '/ai-architecture', variant: 'secondary' },
    date: '2026-05-07',
    featured: true,
  },
  {
    slug: 'ai-music-workflow-end-to-end',
    question: 'What does a complete AI music production workflow look like in 2026?',
    tldr: 'Ideation → reference brief → Suno generation → selection → extension → post-production → release. Each step has specific tools and decisions.',
    answer: `Here\'s the actual workflow I run for commercially viable AI music tracks.

## Phase 1: Ideation (15 min)

- Pick a reference (an existing track or artist you want to triangulate)
- Write a one-sentence brief: "[Genre], [tempo feel], [emotional arc], [use case]"
- Example: "Dark progressive house, 128 BPM feel, builds from tension to release, late-night workout"

## Phase 2: Prompt development (30 min)

Generate 3 variant prompts from different angles:
- Instrumentation-led: focus on what\'s playing
- Mood-led: focus on emotional content and arc
- Reference-led: point at a latent pattern the model recognises

Run 4–6 generations per variant. Budget ~24 clips total.

## Phase 3: Selection and extension (1 hr)

- Score each clip on: hook strength (0–3), production quality (0–3), originality (0–3)
- Keep top 2–3 clips per variant
- Extend the best clips to full length (Suno\'s continuation feature)
- Merge takes where intro from clip A + chorus from clip B produces a stronger track

## Phase 4: Post-production (1–2 hr)

Even AI-generated tracks need post:
- Vocal EQ — AI vocals often need 2–4kHz boost and de-essing
- Master-bus limiting — Suno renders hot, not loud-loud
- Stem separation if needed (Suno\'s download option, or Moises/Lalal.ai)
- Add subtle room verb to weld layers together

## Phase 5: Release

- Upload to DistroKid or similar for streaming distribution
- Tag metadata accurately: genre, mood, instrumentation
- Create short-form video with the track for social promotion

## Tools in the stack

- **Suno v4** — primary generation
- **Adobe Audition / Logic** — post-production
- **Moises** — stem separation
- **DistroKid** — distribution
- **CapCut** — social video creation`,
    category: 'music-production',
    persona: 'producer',
    tags: ['suno', 'workflow', 'music-production', 'distribution', 'ai-music'],
    related: ['how-to-write-suno-prompts', 'how-do-i-get-chorus-to-lift', 'adding-ai-without-losing-voice'],
    cta: { label: 'AI Music Masterclass →', href: '/workshops/ai-music-masterclass', variant: 'primary' },
    date: '2026-05-09',
  },
  {
    slug: 'adding-ai-without-losing-voice',
    question: 'How do I add AI to my content workflow without losing my voice?',
    tldr: 'Write the POV first, always. Use AI to expand, restructure, and distribute — never to originate the insight.',
    answer: `Voice is the compounding moat for creators. It\'s the thing that can\'t be replicated, aggregated, or automated by someone else. Protecting it while adding AI leverage is the most important tradeoff in the creator stack.

## The voice-first rule

Before you open any AI tool, write:
1. Your actual opinion on the topic (3–5 sentences)
2. One specific thing you\'ve seen or done that most people in this space haven\'t
3. The thing you believe that most people in this space would push back on

This is your raw material. Everything the AI generates is scaffolding around it.

## Where AI helps without threatening voice

**Structuring** — "Here\'s my rough take. Give me 3 possible post structures, each with a different narrative arc." You choose and edit.

**Research gaps** — "What am I missing from this argument?" Great for finding counterarguments you need to address.

**Headline variants** — "Write 10 headline variants for this post." Pick the one that sounds like you, not the one that sounds most viral.

**Distribution reformatting** — Taking a finished piece and adapting it to LinkedIn, Twitter, and email. Pure leverage, zero voice risk.

## Where AI threatens voice

- Letting it write the intro (intros establish tone)
- Using the first summary it generates as your actual position
- Publishing without reading every line aloud
- Not checking for hedge words ("it\'s worth noting", "we can explore", "in conclusion")

## The test

If someone who knows your writing read the piece, would they think "that\'s [your name]"? If not, it needs more of you in it.`,
    category: 'content-strategy',
    persona: 'strategist',
    tags: ['voice', 'content-creation', 'ai-writing', 'brand-authenticity'],
    related: ['ai-for-solo-creators', 'ai-content-engine-setup', 'automation-vs-augmentation'],
    cta: { label: 'Browse the content guides', href: '/blog', variant: 'secondary' },
    date: '2026-05-11',
  },
  {
    slug: 'automation-vs-augmentation',
    question: 'When should I automate a task vs use AI to augment my own work?',
    tldr: 'Automate repetitive, well-defined tasks with clear success criteria. Augment high-judgment tasks where your expertise drives the decision.',
    answer: `This is the most useful framework question in the current AI moment, and most people get it backwards by automating judgment calls and manually doing things that should run on autopilot.

## The decision matrix

| Task type | Best approach |
|-----------|---------------|
| Repetitive, rule-based, success is clear | **Automate** — build a pipeline, run it unattended |
| High-judgment, expertise-dependent | **Augment** — AI as co-pilot, you make final calls |
| Creative, exploratory, taste-dependent | **Augment** — AI generates options, you curate |
| Novel, first-time-doing-this | **Augment first, automate later** — understand before automating |

## What "automate" actually means here

A fully automated workflow runs without your review in the loop. Examples:
- Social media scheduling from an approved queue
- Newsletter RSS digests with templated formatting
- File organisation and naming conventions
- Monitoring alerts and basic triage

These have clear success criteria. You can verify they work by spot-checking output.

## What "augment" means

AI assists you in a workflow where you remain the decision-maker. Examples:
- Writing: AI draft → your edit → publish
- Research: AI aggregates → you assess relevance → you synthesise
- Code: AI suggests → you review → you approve
- Strategy: AI generates options → you score and pick

## The failure modes to avoid

**Over-automation**: running AI unattended on anything that goes to customers or represents your brand. Voice gets lost, errors compound, you find out late.

**Under-automation**: spending 3 hours a week on tasks a $0.02 API call could handle. Opportunity cost is real.

**Premature automation**: automating before you understand the task well enough to write good success criteria. Always do it manually first.`,
    category: 'creator-tools',
    persona: 'strategist',
    tags: ['automation', 'augmentation', 'workflow', 'productivity', 'ai-strategy'],
    related: ['ai-for-solo-creators', 'ai-content-engine-setup', 'agentic-creator-os-explained'],
    cta: { label: 'See the creator tools', href: '/tools', variant: 'secondary' },
    date: '2026-05-13',
  },
  {
    slug: 'best-ai-stack-2026',
    question: 'What\'s the best AI tech stack for a creator or solopreneur in 2026?',
    tldr: 'Claude Code for building, Gemini for research, Suno for music, Vercel AI SDK for custom apps. Pick based on what you actually ship, not what\'s trending.',
    answer: `The right stack depends entirely on what you ship. Here\'s how I think about it for creators specifically — not enterprise architects.

## The core four

**1. Claude Code (Anthropic)**
Your pair programmer that lives in the terminal. For solo developers or technical creators who build their own tools, this is the highest-ROI AI investment available. It handles full repo context, multi-file edits, and can run autonomously for 20–30 minutes on a well-specified task.

**2. Gemini 2.5 Pro + AI Studio (Google)**
Your research and analysis layer. Grounded generation (real-time search), 1M token context for long documents, multimodal input. AI Studio gives you a free prototyping environment. For content creators who need to stay current: this is your primary tool.

**3. Suno v5.5**
If you produce audio content, video content, or need music for anything: Suno at $10/month produces commercially licensable tracks that sound professional. The ROI on learning good prompting here is exceptional.

**4. Vercel AI SDK v6**
If you build web products: this is the abstraction layer that lets you swap models without rewriting integrations. Streaming, tool calls, multi-step agents, BYOK — all handled. Pair with Next.js and Vercel for deployment.

## Supporting tools

- **Notion + Claude**: documentation, SOPs, research organisation
- **Make/n8n**: no-code automation for non-technical workflows
- **Descript**: AI-assisted video editing (transcript-based editing)
- **CapCut**: AI-assisted short-form video creation
- **Perplexity Pro**: web research with citations

## What to avoid

- Paying for 6+ AI subscriptions when you\'re actively using 2
- "AI-powered" versions of tools you already have if the non-AI version works
- Any tool you\'re evaluating based on demos, not your own use of it for a real task`,
    category: 'creator-tools',
    persona: 'concierge',
    tags: ['tech-stack', 'tools', 'claude', 'gemini', 'suno', 'vercel-ai-sdk', '2026'],
    related: ['automation-vs-augmentation', 'ai-for-solo-creators', 'agentic-creator-os-explained'],
    cta: { label: 'Browse all resources', href: '/resources', variant: 'secondary' },
    date: '2026-05-15',
    featured: true,
  },
  {
    slug: 'how-to-write-claude-md',
    question: 'How do I write a CLAUDE.md that actually makes Claude Code useful?',
    tldr: 'Write it for a smart contractor joining on day one: what not to touch, how decisions get made, what the architecture looks like, and where to find things.',
    answer: `CLAUDE.md is Claude Code\'s persistent memory. Every session starts by reading it. The goal is to eliminate the questions a good developer would ask in their first week.

## What belongs in CLAUDE.md

**1. Decision-making principles** (most important)
The highest-value content is "never do X without asking me first" and "when you see Y, always do Z." These prevent the irreversible mistakes.

Example:
\`\`\`markdown
## URL/SEO Changes: NEVER Do Without Approval
- Never rename working URLs — even with 301s, you lose link equity
- Never delete pages with traffic — check analytics first
\`\`\`

**2. Architecture map**
Where is the thing? What pattern does it follow? What\'s the source of truth?

Example:
\`\`\`markdown
## Two-Repo Architecture
| Repo | Purpose |
|------|---------|
| FrankX | Private development |
| frankx.ai-vercel-website | Production — deploys to frankx.ai |
\`\`\`

**3. Brand/voice rules**
What the output should sound like. What phrases are banned. What the positioning is.

**4. Environment and tooling**
Where secrets live, how to run the dev server, what commands run what, what the deploy flow looks like.

## What to leave out

- Step-by-step instructions for things Claude already knows (e.g., "to create a file, use the Write tool")
- Philosophy without action criteria (e.g., "we value quality" without specifying what that means operationally)
- Outdated information — a stale CLAUDE.md is worse than none because it actively misleads

## Format guidance

- Use tables for mappings, matrices, comparisons
- Use code blocks for exact commands, exact phrases to avoid
- Keep sections short — Claude reads the whole file every session; density beats completeness
- Put the most critical rules (destructive operation gates, brand terms) near the top`,
    category: 'ai-architecture',
    persona: 'architect',
    tags: ['claude-code', 'claude-md', 'agentic-development', 'prompting'],
    related: ['what-is-a-multi-agent-system', 'agentic-creator-os-explained', 'best-ai-stack-2026'],
    cta: { label: 'Read the CLAUDE.md guide', href: '/blog/how-to-write-claude-md-that-works', variant: 'secondary' },
    date: '2026-05-17',
  },
  {
    slug: 'enterprise-ai-adoption-strategy',
    question: 'What\'s the right strategy for an enterprise adopting AI in 2026?',
    tldr: 'Start with use-case inventory, identify the 3 highest-ROI pilots, run them in parallel with clear success criteria, then build the Center of Excellence infrastructure for scale.',
    answer: `Enterprise AI adoption fails when it\'s driven by tool selection before problem definition, or when it tries to boil the ocean rather than proving value in 90 days.

## The 6-pillar AI CoE framework

This is the framework I implement at Oracle EMEA:

**1. Strategy & Governance** — What problems are we solving? What are the guardrails? Who makes model selection decisions?

**2. Data & Knowledge** — Where is the proprietary data? How is it secured? What\'s the knowledge graph that AI needs access to?

**3. Use Cases & Pilots** — Bottom-up inventory across business units. Score by impact × feasibility. Pick 3 to run in parallel.

**4. Platform & Tooling** — Model selection, deployment infrastructure, cost controls, observability. Don\'t buy a platform; build the minimum viable layer.

**5. People & Skills** — Who are the AI champions? What\'s the reskilling plan for the 20% of roles most affected?

**6. Measurement & Ethics** — How do we know it\'s working? What are the unacceptable failure modes? How do we audit?

## The pilot selection criteria

The best pilots have:
- Clear before/after measurement (time, error rate, headcount, cost)
- A champion who owns it and has skin in the game
- A process that runs frequently enough to generate data quickly
- A scope small enough that a failure teaches, not harms

## Common failure modes

- **Centralising too early**: AI CoE becomes a bottleneck, business units route around it
- **Tool-first thinking**: choosing GPT-4 or Gemini before knowing what the workflow is
- **No measurement**: running pilots without baselines makes success claims hollow
- **Safety theatre**: checkbox compliance with no operational substance

## What working looks like

By month 6: 3 pilots live with measured outcomes. By month 12: internal playbook published, 15+ use cases across business units, defined governance model, 3–5 trained internal champions.`,
    category: 'enterprise-ai',
    persona: 'architect',
    tags: ['enterprise', 'ai-strategy', 'ai-coe', 'governance', 'oracle', 'adoption'],
    related: ['what-is-a-multi-agent-system', 'claude-and-gemini-together', 'automation-vs-augmentation'],
    cta: { label: 'Book an AI architecture consultation', href: '/connect', variant: 'primary' },
    date: '2026-05-19',
    featured: true,
  },
  {
    slug: 'ai-content-engine-setup',
    question: 'How do I set up an AI content engine that produces consistently good output?',
    tldr: 'Build a repeatable pipeline: topic brief → research → outline → draft → edit → format → distribute. Document each step as a prompt template.',
    answer: `A content engine is a system, not a tool. The difference between creators who produce quality at volume and those who burn out trying is whether they\'ve systematised each step.

## The 6-stage pipeline

**1. Topic brief (10 min)**
Before any AI involvement: write a 3-sentence brief. What\'s the claim? Who\'s it for? What should they be able to do or think after reading it?

**2. Research (20 min)**
- Run a Perplexity Pro search for the current state of the topic
- Pull 5–10 sources, annotating what\'s useful vs what\'s noise
- Note the gap: what isn\'t being said that your brief claims to cover

**3. Outline (15 min)**
Use AI with your brief + research notes as input. Prompt: "Here\'s my claim and here\'s my research. Give me 3 outline structures — one for a how-to, one for an opinion piece, one for a reference guide." Pick the structure that fits the claim.

**4. Draft (30–60 min)**
Section by section with the AI. Each section prompt includes: your brief + the outline + the preceding section (for continuity). Review each section before prompting the next.

**5. Edit (30 min)**
This is your job, not the AI\'s. Read aloud. Cut hedge words. Add your specifics. Check every claim.

**6. Format + distribute (20 min)**
Paste the final piece, ask for: LinkedIn hook (5 variants), Twitter thread (3 variants), email subject line (5 variants). Pick the versions that sound like you.

## The template library

Each step should have a stored prompt template. The whole value is in reuse — by step 10, you\'re generating usable output in half the time of step 1.

## What makes it consistent

- Same brief format every time (trains your judgment muscle)
- Same research process (you know what "enough" looks like)
- Same edit checklist (you catch the same failure modes)

The AI isn\'t consistent — your system is.`,
    category: 'content-strategy',
    persona: 'strategist',
    tags: ['content-engine', 'content-creation', 'workflow', 'templates', 'ai-writing'],
    related: ['ai-for-solo-creators', 'adding-ai-without-losing-voice', 'automation-vs-augmentation'],
    cta: { label: 'See the content tools', href: '/tools', variant: 'secondary' },
    date: '2026-05-21',
  },
  {
    slug: 'agentic-creator-os-explained',
    question: 'What is the Agentic Creator OS and who is it for?',
    tldr: 'ACOS is a personal operating system for AI-native creators — a structured set of agent configurations, workflows, and memory systems that run inside Claude Code.',
    answer: `The Agentic Creator OS (ACOS) is a framework I built to run my own creative practice at scale — and then open-sourced because the architecture applies broadly.

## What it actually is

ACOS is a Claude Code configuration system: a set of \`.claude/agents/\` definitions, \`.claude/commands/\` workflows, memory structures, and CLAUDE.md contracts that together turn Claude Code into a personalised creative team.

It\'s not software you install. It\'s a structured way of configuring Claude Code so it operates as:
- A research team
- A content production pipeline
- A music production assistant
- A session logger and memory system
- A project manager

## The 10-pillar structure

1. Strategy Hub — goals, roadmap, priorities
2. Research Hub — domain scanning, synthesis, publishing
3. Content Engine — blog, newsletter, social, products
4. Music Ops — Suno workflow, releases, distribution
5. AI Architecture — systems design, client work
6. Community Fabric — Skool, Discord, Circle
7. Revenue Ops — products, affiliates, partnerships
8. Creative Vision — brand, aesthetics, long-game
9. Personal & Family — health, heritage, philosophy
10. Quality Substrate — integrity gates, brand enforcement, audit rails

## Who it\'s for

- Solo creators who use Claude Code and want a disciplined system
- Technical creators who build their own tools and content simultaneously
- AI-native workers who want to run multiple "pillars" of their practice without context loss between sessions

## Who it\'s NOT for

- People who don\'t use Claude Code
- Teams (it\'s a personal OS, not a team collaboration tool)
- People looking for a no-code solution

The [ACOS GitHub repo](https://github.com/frankxai/agentic-creator-os) has the full structure.`,
    category: 'creator-tools',
    persona: 'architect',
    tags: ['acos', 'claude-code', 'agentic-development', 'personal-os', 'creator-tools'],
    related: ['how-to-write-claude-md', 'what-is-a-multi-agent-system', 'best-ai-stack-2026'],
    cta: { label: 'Explore ACOS on GitHub', href: 'https://github.com/frankxai/agentic-creator-os', variant: 'secondary' },
    date: '2026-05-23',
  },
  {
    slug: 'how-do-i-get-chorus-to-lift',
    question: 'How do I get the chorus to actually lift in an AI-generated track?',
    tldr: 'The lift comes from contrast: drop energy in the pre-chorus, then spike tempo feel, register, and density in the chorus. Signal it explicitly in your prompt and structure tags.',
    answer: `The chorus lift is the most common failure point in AI-generated music. The model produces a technically correct track where the chorus isn\'t noticeably bigger than the verse. Here\'s how to fix it.

## Why the lift fails

The model averages energy across the whole track unless you explicitly signal contrast. A prompt like "energetic pop song" sets one global energy level — the model has no information about where to pull back and where to surge.

## The contrast principle

Every effective chorus lift works by contrast with what preceded it. The pre-chorus creates tension; the chorus resolves it with a release of energy. You need to encode both sides.

## Prompting for lift: what to specify

**In the style tags:**
\`\`\`
[pre-chorus: stripped back, building tension, half-time feel]
[chorus: full band, doubled vocals, compressed and punchy, resolves up to IV]
\`\`\`

**Energy arc in the style description:**
\`\`\`
verse: sparse, intimate / pre-chorus: tension builds, drums drop out / chorus: FULL release, choir layer, compressed kick, up a fifth from verse register
\`\`\`

**Melodic register shift:**
Specify that the chorus melody should sit a 4th or 5th higher than the verse. This is the most reliable way to create perceived lift.

## Structural tricks that reliably work

1. **The dropout**: strip percussion to just snare+hi-hat for 2 bars before the chorus hits, then slam the full kit back in
2. **Register jump**: chorus melody enters at least a major third above the top note of the verse
3. **Density delta**: verse = 2–3 instruments, chorus = 5–6 (add backing vocals, strings, or synth pads)
4. **Temporal feel**: shift from a slightly relaxed feel in the verse to a locked, punchy grid in the chorus

## In post-production

If the generation doesn\'t lift enough: add a sidechain compression pump to the chorus, boost the chorus by 3–6dB (match your LUFS later), and add a slight room verb to the chorus that the verse doesn\'t have.`,
    category: 'music-production',
    persona: 'producer',
    tags: ['suno', 'chorus', 'music-production', 'arrangement', 'lift'],
    related: ['how-to-write-suno-prompts', 'ai-music-workflow-end-to-end', 'adding-ai-without-losing-voice'],
    cta: { label: 'Watch the AI Music Masterclass', href: '/workshops/ai-music-masterclass', variant: 'primary' },
    date: '2026-05-25',
  },
]

export const featuredQuestions = askQuestions.filter((q) => q.featured)

export const questionsByCategory = (category: AskCategory) =>
  askQuestions.filter((q) => q.category === category)

export const CATEGORY_LABELS: Record<AskCategory, string> = {
  'ai-architecture': 'AI Architecture',
  'music-production': 'Music Production',
  'content-strategy': 'Content Strategy',
  'creator-tools': 'Creator Tools',
  'enterprise-ai': 'Enterprise AI',
}

export const PERSONA_LABELS: Record<AskPersona, string> = {
  architect: 'AI Architect',
  producer: 'Music Producer',
  strategist: 'Content Strategist',
  concierge: 'FrankX',
}
