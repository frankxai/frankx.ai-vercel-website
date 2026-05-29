/**
 * Curated Q&A knowledge base powering the public /ask surface.
 *
 * Each entry is published as an indexed page at /ask/[slug] with QAPage +
 * FAQ structured data, and surfaced to AI answer engines via llms.txt. The
 * goal is acquisition: real questions people ask about Frank's work, answered
 * in his voice, with a natural path into the live Studio Crew chat and funnel.
 *
 * Source of truth — add a question here and the index page, the dynamic page,
 * the sitemap, and llms.txt all pick it up. Pattern mirrors data/os-modules.ts.
 *
 * Voice: studio-rooted, technically warm, concrete. No SaaS or guru language.
 */

export type AskCategory =
  | 'AI Architecture'
  | 'Music Production'
  | 'Creator Systems'
  | 'Strategy'

export type AskPersona =
  | 'ai-architect'
  | 'music-producer'
  | 'content-strategist'
  | 'visionary'
  | 'concierge'

export interface AskCta {
  label: string
  href: string
}

export interface AskQuestion {
  /** URL slug → /ask/{slug} */
  slug: string
  /** The question, phrased the way a person would actually type it. */
  question: string
  /** 1-2 sentence answer summary — used for meta description + llms.txt + AI extraction. */
  tldr: string
  /** Full answer body in markdown. */
  answer: string
  category: AskCategory
  /** Which Studio Crew member owns this answer (sets the chat hand-off + accent). */
  persona: AskPersona
  tags: string[]
  /** Slugs of related questions for internal linking. */
  related: string[]
  /** Where to send a reader who wants more. */
  cta: AskCta
  /** ISO date — used for datePublished and sorting. */
  date: string
  featured?: boolean
}

const FRANK = 'Frank'

export const askQuestions: AskQuestion[] = [
  {
    slug: 'build-multi-agent-ai-system',
    question: 'How do I build a multi-agent AI system for my business?',
    tldr: 'Start with one agent that does one job well, give it a tool and a clear spec, then add a second agent only when a real handoff exists. Orchestrate with a router that decides which agent runs, not a monolith that tries to do everything.',
    category: 'AI Architecture',
    persona: 'ai-architect',
    tags: ['multi-agent', 'orchestration', 'agentic', 'architecture'],
    related: ['ai-tech-stack-creator-2026', 'orchestrate-claude-gemini-together', 'enterprise-agentic-ai-safely'],
    cta: { label: 'Book an architecture call', href: '/contact' },
    date: '2026-05-29',
    featured: true,
    answer: `**Short answer:** build one agent that does one job well before you build a team. Most "multi-agent" projects fail because they start with a committee instead of a competent individual.

Here is the path that works:

## 1. Name the job, not the agent
Write the spec first. "Triage inbound support email and draft a reply, escalate anything about refunds." A spec you could hand a new hire is a spec an agent can execute. Vague missions produce vague agents.

## 2. Give it exactly one tool to start
An agent is a model plus tools plus a loop. Wire one real tool — a search, a database read, an API call — and make that round-trip reliable before you add a second. A single agent with one trustworthy tool beats five agents that each half-work.

## 3. Add a router, not a monolith
When you genuinely have two different jobs, don't merge them into one giant prompt. Put a thin router in front that reads the request and picks the specialist. This is how the Studio Crew on this site works: a concierge reads intent, then hands off to the architect, the producer, or the strategist.

## 4. Cap the loop
Every agent needs a stop condition — a max step count and a clear "done" signal. Unbounded loops are how you wake up to a surprising bill.

## 5. Instrument before you scale
Log every tool call, every handoff, every failure. You cannot improve what you cannot see. Route calls through a gateway so you get latency and cost per step for free.

Build it in this order and you end up with a system you can reason about. Build it as a swarm on day one and you end up with something you can only pray over.`,
  },
  {
    slug: 'prompt-suno-professional-music',
    question: 'What is the best way to prompt Suno for professional-sounding music?',
    tldr: 'Treat the prompt like a brief for a session player: name the genre with a specific reference, set the structure with tags, and describe the mix, not just the mood. Generate several takes and comp the best sections.',
    category: 'Music Production',
    persona: 'music-producer',
    tags: ['suno', 'music', 'prompting', 'production'],
    related: ['ai-music-workflow-end-to-end', 'chorus-actually-lift'],
    cta: { label: 'Enter the Music Lab', href: '/music-lab' },
    date: '2026-05-29',
    featured: true,
    answer: `Most Suno prompts read like a vibe. Pros write them like a brief for a session player.

## Be specific about the genre
"Cinematic" tells the model nothing. "Slow downtempo with a Nils Frahm felt-piano sustain and a low analog pad" tells it everything. Reference a texture or an artist's signature, not a feeling.

## Structure with tags
Use explicit section tags so the arrangement has shape:

\`\`\`
[Intro] soft piano, no drums
[Verse] add brushed kit, upright bass
[Chorus] full pads, vocal doubles, lift the energy
[Bridge] strip back to piano + one vocal
[Outro] long reverb tail, fade
\`\`\`

## Describe the mix, not just the mood
Tell it where things sit: "vocal forward and intimate, drums tucked behind, low-cut on everything below 80Hz." Mix language steers Suno toward a finished sound instead of a loud demo.

## Generate wide, comp narrow
Run four to eight takes. You are not looking for one perfect generation — you are looking for the best verse from take two and the best chorus from take five. Comp them. This is exactly how a real record gets made.

## Set BPM and key when it matters
If the track has to sit with other elements, lock the tempo and key in the prompt. If you are exploring, leave them open and let the model surprise you.

The prompt is the arrangement. Write it like one and the output stops sounding like AI and starts sounding like a song.`,
  },
  {
    slug: 'start-with-ai-agents-solo-creator',
    question: 'How do I start with AI agents as a solo creator?',
    tldr: 'Pick the single most repetitive task in your week and automate just that with one agent. Ship it, live with it for a week, then expand. Momentum beats master plans.',
    category: 'Creator Systems',
    persona: 'concierge',
    tags: ['creator', 'agents', 'getting-started', 'workflow'],
    related: ['build-multi-agent-ai-system', 'ai-content-engine-personal-brand', 'what-is-agentic-creator-os'],
    cta: { label: 'Get the starter kit', href: '/downloads' },
    date: '2026-05-28',
    answer: `Forget the master plan. The creators who get traction with AI start with one boring task, not a grand system.

## Find the task you do every week and resent
Reformatting notes into a post. Turning a transcript into show notes. Drafting the same kind of outreach email. The best first agent removes a chore you already understand cold.

## Build the smallest version that works
One model, one clear instruction, one input, one output. No framework, no vector database, no orchestration. A single well-written prompt that takes your raw material and returns the thing you needed is already an agent doing real work.

## Live with it for a week
Use it daily. You will immediately see where it is wrong, where it needs a fact you forgot to give it, and where it actually saves you fifteen minutes. That feedback is worth more than any tutorial.

## Expand on evidence, not ambition
Only add a second agent when the first one earns it — when there is a genuine handoff between two distinct jobs. Most solo creators need three or four small reliable agents, not one sprawling system.

## Keep yourself in the loop
The point is to remove the chore, not the craft. Let the agent draft; you decide. Your taste is the product. The agent is the intern.

Start Monday with one task. By Friday you will know more about building with AI than a month of reading would teach you.`,
  },
  {
    slug: 'orchestrate-claude-gemini-together',
    question: 'Can I use Claude, Gemini, and other models together in one workflow?',
    tldr: 'Yes — route by job. Use a fast cheap model for triage and simple drafts, a frontier model for reasoning and code, and pick per-step rather than committing to one provider. A gateway makes switching a one-line change.',
    category: 'AI Architecture',
    persona: 'ai-architect',
    tags: ['claude', 'gemini', 'multi-model', 'routing', 'gateway'],
    related: ['build-multi-agent-ai-system', 'ai-tech-stack-creator-2026', 'write-claude-md-that-works'],
    cta: { label: 'Ask the AI Architect', href: '/ask' },
    date: '2026-05-27',
    answer: `Yes, and the best systems do exactly this. No single model is best at everything, and tying yourself to one provider is a risk, not a simplification.

## Route by job, not by loyalty
- **Fast, cheap model** (a Flash-class model) for triage, classification, and first drafts where speed matters more than nuance.
- **Frontier model** for hard reasoning, long-context analysis, and code you intend to ship.
- **Specialist models** when a task has a clear best-in-class option.

The skill is matching the step to the model, the way you would assign a task to the right person on a team.

## Use a gateway
Calling each provider's SDK directly couples your code to that provider. Route everything through a gateway and the model becomes a string you can change in config — \`"google/gemini-2.5-flash"\` today, something else next quarter. You also get streaming, automatic fallback when a provider has an incident, and cost and latency per call in one place. This site's chat does exactly this.

## Keep the contract stable
Your agent code should not care which model answered. Define the input and output shape once; let the router swap the engine underneath. When a new model lands, you A/B test it by changing one line, not rewriting your stack.

## Watch the seams
Different models format slightly differently and have different context limits. Validate outputs at the boundary between steps so a quirk in one model does not corrupt the next.

Mix freely. The lock-in you avoid today is the migration you skip next year.`,
  },
  {
    slug: 'ai-music-workflow-end-to-end',
    question: 'What does an AI music production workflow actually look like, end to end?',
    tldr: 'Brief, generate wide, comp the best sections, then finish in a real DAW — stems, edits, mix, master. AI handles generation; your ears and arrangement decisions make it a record.',
    category: 'Music Production',
    persona: 'music-producer',
    tags: ['suno', 'workflow', 'production', 'mixing', 'daw'],
    related: ['prompt-suno-professional-music', 'chorus-actually-lift'],
    cta: { label: 'Explore the Music Lab', href: '/music-lab' },
    date: '2026-05-26',
    answer: `AI does not replace the producer. It compresses the gap between an idea and a first listen. Here is the full arc.

## 1. Brief
Write the prompt like an arrangement — genre with a real reference, section tags, mix notes. The brief is where most of the quality is won or lost.

## 2. Generate wide
Run several takes. You are sourcing material, not gambling on one perfect output. Save everything that has a usable moment.

## 3. Comp
Pull the strongest sections across takes — the verse from one, the chorus lift from another. This is the oldest move in record-making, just faster now.

## 4. Stems and edits
Export stems where you can. Tighten timing, clean transitions, drop the section that overstays. Arrangement is a decision, not a default.

## 5. Mix
Carve space. Low-cut everything that does not need low end. Sit the vocal forward, tuck the drums, use a little parallel compression to glue. Reference a track you love and match the balance, not the loudness.

## 6. Master
Get the level competitive without crushing the life out of it. If it sounds tired and flat, you went too far.

## 7. Ship and listen back in the wild
Play it in the car, on phone speakers, in headphones. The mix that survives all three is done.

The tools changed. The craft did not. Your taste in comping and your decisions in the mix are still what separate a track from a demo.`,
  },
  {
    slug: 'chorus-actually-lift',
    question: 'How do I get a chorus to actually lift?',
    tldr: 'Create contrast: hold something back in the verse so the chorus has room to open. Raise the vocal melody, widen the arrangement, and let the low end and energy arrive together on the downbeat.',
    category: 'Music Production',
    persona: 'music-producer',
    tags: ['suno', 'songwriting', 'arrangement', 'mixing'],
    related: ['prompt-suno-professional-music', 'ai-music-workflow-end-to-end'],
    cta: { label: 'Enter the Music Lab', href: '/music-lab' },
    date: '2026-05-26',
    answer: `A chorus lifts because of contrast. If the verse is already full, the chorus has nowhere to go. The lift is engineered before the chorus arrives.

## Hold something back in the verse
Thin the verse out. Drop an instrument, narrow the stereo image, keep the vocal lower in the melody. The empty space you leave is the room the chorus expands into. Producers who complain their chorus does not hit usually have a verse that is too big.

## Raise the melody
The single most reliable move: write the chorus melody higher than the verse. Lifting the vocal up a few steps reads as emotional release before a single fader moves.

## Arrive together on the downbeat
Stack the events on the first beat of the chorus — the bass drops in, the drums open up, the pads widen, the vocal doubles enter. When energy, low end, and width all land on the same downbeat, the ear hears a door swing open.

## Widen, do not just louden
Reach for stereo width and a fuller frequency picture, not only volume. A chorus that is merely louder is fatiguing. A chorus that is wider and richer feels bigger without wearing you out.

## In Suno
Encode the contrast in the prompt:

\`\`\`
[Verse] sparse — piano + soft vocal, no drums
[Chorus] full kit, wide pads, doubled vocal up an octave, big low end
\`\`\`

Naming the dynamic shift in the tags steers the model toward an arrangement with real lift instead of a flat wall of sound.

The lift is a relationship, not a setting. Build the contrast and the chorus takes care of itself.`,
  },
  {
    slug: 'add-ai-without-losing-your-voice',
    question: 'How do I add AI to my work without losing my own voice?',
    tldr: 'Use AI for the scaffolding and the chores, never the final judgment. Feed it your real material so it echoes you, and keep a hard rule that you edit every output before it ships.',
    category: 'Creator Systems',
    persona: 'content-strategist',
    tags: ['voice', 'creator', 'writing', 'craft'],
    related: ['ai-content-engine-personal-brand', 'start-with-ai-agents-solo-creator'],
    cta: { label: 'Talk to the Strategist', href: '/ask' },
    date: '2026-05-25',
    answer: `The fear is real and the fix is simple: AI does the scaffolding, you do the judgment.

## Give it your material, not generic prompts
A blank model writes like everyone. A model fed your past posts, your transcripts, your actual phrasing writes like a rough draft of you. The quality of the echo depends entirely on what you feed it.

## Separate the chore from the craft
Outlining, reformatting, turning a voice memo into a draft, generating ten title options — these are chores. Hand them over without guilt. The craft is the angle, the line that only you would write, the decision about what to cut. Keep that.

## Edit everything, always
Make it a hard rule: nothing the model produces ships without you rewriting it. Not approving it — rewriting it. The act of editing is where your voice re-enters. A draft you only approved still sounds like a draft.

## Keep a tell
Have something in your work the model would never produce on its own — a recurring structure, a specific kind of detail, a way you open. That fingerprint is what readers recognize.

## Notice when it flattens you
If a piece reads smoother but sounds like nobody, that is the warning. Smooth is the default failure mode. Texture, opinion, and specificity are yours to add back.

Used this way, AI makes you faster without making you generic. The voice stays yours because the decisions stay yours.`,
  },
  {
    slug: 'ai-automation-vs-augmentation',
    question: 'What is the difference between AI automation and AI augmentation?',
    tldr: 'Automation removes a human from a task entirely; augmentation makes a human better at it. Automate the predictable and low-stakes, augment the judgment-heavy and high-stakes. Most real value lives in augmentation.',
    category: 'Strategy',
    persona: 'visionary',
    tags: ['strategy', 'automation', 'augmentation', 'decisions'],
    related: ['enterprise-agentic-ai-safely', 'build-multi-agent-ai-system'],
    cta: { label: 'Stress-test your strategy', href: '/ask' },
    date: '2026-05-24',
    answer: `These get used interchangeably, and the confusion costs people real money.

## Automation removes the human
The task runs without you. Good when the work is predictable, high-volume, and low-stakes per instance — categorizing tickets, reformatting data, sending a templated confirmation. The risk profile is "occasionally wrong, cheaply corrected."

## Augmentation makes the human better
You stay in the seat; the AI extends your reach. A model that surfaces the three contracts you should read before a negotiation is augmentation. You still decide — you just decide with more in front of you. The risk profile is "you remain accountable, with better inputs."

## How to choose
Ask two questions about the task:
- **What does a mistake cost?** High cost → augment, keep a human deciding. Low cost → automate.
- **How predictable is it?** Predictable → automate. Judgment-heavy → augment.

A refund under ten dollars: automate. A refund over a thousand: augment, and let a person approve.

## Where the value actually is
Automation gets the headlines because it removes obvious cost. But the larger, more durable value is usually in augmentation — making your best people meaningfully better at the decisions only they can make. Those gains compound and they are hard for competitors to copy.

Decide task by task. The same business will automate ten things and augment ten others, and the discipline is knowing which is which.`,
  },
  {
    slug: 'ai-tech-stack-creator-2026',
    question: 'What tech stack should a creator use to build with AI agents in 2026?',
    tldr: 'Keep it boring and composable: a typed app framework, a model gateway for provider-agnostic calls, the Vercel AI SDK for streaming and tools, a vector store only when you actually need retrieval, and a key-value store for state. Add pieces when a real need appears.',
    category: 'AI Architecture',
    persona: 'ai-architect',
    tags: ['tech-stack', 'vercel-ai-sdk', 'gateway', 'rag', 'tooling'],
    related: ['build-multi-agent-ai-system', 'orchestrate-claude-gemini-together', 'write-claude-md-that-works'],
    cta: { label: 'See the architecture hub', href: '/ai-architecture' },
    date: '2026-05-23',
    answer: `The right stack in 2026 is boring on purpose. Boring is what survives contact with production.

## The core
- **A typed app framework** — Next.js or similar, so your UI, API routes, and types live in one place.
- **A model gateway** — route model calls through a gateway so the provider is a config string, not a hard dependency. You get streaming, fallback, and cost observability without writing them.
- **The Vercel AI SDK** — a clean abstraction for streaming responses and tool calling that works across providers. It handles the hard parts of the agent loop so you write intent, not plumbing.

## Add only when you feel the pain
- **A vector store** for retrieval — but only once lexical search genuinely stops being enough. Many projects ship fine on keyword search over a few hundred documents. Reach for embeddings when relevance, not keywords, is the bottleneck.
- **A key-value store** for rate limits, sessions, and small state. You will want this early for anything user-facing.
- **A queue** for long-running jobs, once you have any.

## What to resist
Resist adopting five frameworks because they trended. Every dependency is a thing that can break at 2 a.m. The strongest systems are a small number of well-understood pieces wired together cleanly.

## The test
You should be able to explain your whole stack to another engineer in five minutes and answer "why" for each piece. If a component fails that test, you adopted it for the wrong reason.

Start with the core. Earn each addition.`,
  },
  {
    slug: 'write-claude-md-that-works',
    question: 'How do I write a CLAUDE.md or system prompt that actually works?',
    tldr: 'Write it like onboarding docs for a sharp new hire: concrete rules, real examples, and the reasons behind them. Lead with what matters, show do/don\'t pairs, and cut anything the model already knows.',
    category: 'AI Architecture',
    persona: 'ai-architect',
    tags: ['claude-md', 'system-prompt', 'prompting', 'agents'],
    related: ['orchestrate-claude-gemini-together', 'build-multi-agent-ai-system', 'ai-tech-stack-creator-2026'],
    cta: { label: 'Read the build guides', href: '/guides' },
    date: '2026-05-22',
    answer: `A good system prompt reads like onboarding docs for a sharp new hire who starts tomorrow and has no context. Write it that way.

## Lead with what matters most
Models weight the start and end of a prompt heavily. Put your non-negotiables first — the rules that, if broken, make the output useless. Bury nothing important in the middle.

## Be concrete, give examples
"Write in a professional tone" is noise. Show a do-and-don't pair: a sentence you want, next to a sentence you reject. Examples teach where descriptions only gesture. One sharp example beats a paragraph of adjectives.

## Explain the why
A rule with a reason survives edge cases. "Never put secrets in client code — they ship to the browser and anyone can read them" generalizes. "Never put secrets in client code" gets worked around the moment a case feels different.

## Cut what the model already knows
Do not explain what a function is. Do not pad with generic best practices. Every line that states the obvious dilutes the lines that carry your actual constraints.

## State the anti-patterns explicitly
Tell it what to refuse. The behaviors you most want to prevent should be named, not implied — a short "never do X" list does more work than a long "always do Y" list.

## Keep it living
Treat it like code. When the model does something you did not want, that is a missing rule, not a one-off. Add the rule, keep the file tight, prune what no longer earns its place.

The best test: hand your prompt to a capable human stranger. If they could do the job from it, so can the model. If they would be confused, the model is too.`,
  },
  {
    slug: 'enterprise-agentic-ai-safely',
    question: 'How should an enterprise approach agentic AI safely?',
    tldr: 'Start with augmentation in a bounded domain, keep a human approving consequential actions, log every step, and put hard limits on what agents can touch. Earn autonomy with evidence, do not grant it by default.',
    category: 'Strategy',
    persona: 'ai-architect',
    tags: ['enterprise', 'governance', 'safety', 'agentic', 'risk'],
    related: ['ai-automation-vs-augmentation', 'build-multi-agent-ai-system'],
    cta: { label: 'Book an enterprise call', href: '/contact' },
    date: '2026-05-21',
    answer: `Enterprises do not have a capability problem with agentic AI. They have a trust-and-control problem. Solve that and the capability takes care of itself.

## Start where a mistake is survivable
Pick a bounded domain with clear success criteria and low blast radius for the first deployment. Internal drafting, research summarization, triage. Prove the pattern where a wrong answer is a minor cost, not a headline.

## Keep a human on consequential actions
Reading data is one risk class. Taking actions — sending money, emailing customers, changing records — is another entirely. Agents can propose; a person approves anything with real consequences until the track record earns more autonomy.

## Constrain what the agent can reach
An agent should have the narrowest set of tools and permissions its job requires, and no more. Scope every credential. Assume any input the agent reads could try to redirect it, and design so that a hostile document cannot trigger a harmful action.

## Log everything
Every prompt, every tool call, every decision, with enough detail to reconstruct what happened. You cannot govern, debug, or improve a system you cannot replay.

## Earn autonomy with evidence
Run the agent in suggestion mode, measure how often it would have been right, and expand its authority only where the data supports it. Autonomy is a privilege the system earns, not a default you grant.

## Name an owner
Every agent needs a human accountable for its behavior. "The AI did it" is not an answer a regulator or a customer accepts.

Done this way, agentic AI enters the enterprise as a controllable system, not a liability. The governance is the product.`,
  },
  {
    slug: 'ai-content-engine-personal-brand',
    question: 'How do I build an AI content engine for my personal brand?',
    tldr: 'Build a pipeline: one source idea becomes a pillar piece, then gets reshaped into posts, a newsletter, and clips. Use AI to reshape and reformat, keep your judgment on angle and quality, and publish on a cadence you can sustain.',
    category: 'Creator Systems',
    persona: 'content-strategist',
    tags: ['content', 'personal-brand', 'pipeline', 'distribution'],
    related: ['add-ai-without-losing-your-voice', 'start-with-ai-agents-solo-creator', 'what-is-agentic-creator-os'],
    cta: { label: 'Talk to the Strategist', href: '/ask' },
    date: '2026-05-20',
    answer: `A content engine is not "post more." It is a pipeline that turns one real idea into many shaped pieces without burning you out.

## One source, many shapes
Start with a single substantial idea — something you actually learned or built. Write it once as a pillar piece. Then reshape it: the thread, the short post, the newsletter section, the clip script. AI is excellent at reshaping work that already exists. It is mediocre at inventing the idea. So you bring the idea; it handles the reformatting.

## Build the steps as small agents
- A drafting step that turns your outline into a first pass.
- A reformatting step that adapts the pillar into each platform's shape.
- A title and hook step that generates options for you to choose from.

Each is a small, boring, reliable job. Chained, they move you from idea to a week of content in an afternoon.

## Keep the two human jobs
Two things never leave your hands: choosing the angle, and the final edit. The angle is why anyone should care. The edit is where your voice re-enters. Automate everything between those two and you keep the soul of the work while losing the grind.

## Publish on a cadence you can hold
A sustainable rhythm you keep for a year beats a heroic week you never repeat. Pick a cadence that survives a busy month, and let the engine make that cadence cheap to hit.

## Close the loop
Watch what lands. Feed the winners back in as the seeds for the next pillar. The engine gets sharper because you are teaching it what your audience actually responds to.

The output is consistency without exhaustion. That consistency, held over time, is what builds the brand.`,
  },
  {
    slug: 'what-is-agentic-creator-os',
    question: 'What is the Agentic Creator OS and who is it for?',
    tldr: 'It is an operating system for creators who want to run their work with AI agents instead of by hand — a structured set of systems, prompts, and workflows for content, music, and product. It is for people ready to build their own engine, not just use a tool.',
    category: 'Creator Systems',
    persona: 'concierge',
    tags: ['acos', 'creator-os', 'product', 'systems'],
    related: ['ai-content-engine-personal-brand', 'start-with-ai-agents-solo-creator', 'build-multi-agent-ai-system'],
    cta: { label: 'Explore the Creator OS', href: '/acos' },
    date: '2026-05-19',
    answer: `The Agentic Creator OS is a structured way to run a creative business with AI agents doing the repeatable work, so your time goes to the parts only you can do.

## What it actually is
Less a single app, more an operating system: a connected set of workflows, prompts, and agent patterns for the jobs a working creator faces — turning ideas into content, briefs into music, and attention into products. The pieces are designed to connect, so output from one stage feeds cleanly into the next.

## Who it is for
People who are past the "is AI useful" question and ready to build their own engine. If you are already creating regularly and feeling the ceiling of doing everything by hand, this gives you the systems to break through it. If you have not started yet, begin smaller — automate one task first and come back when you feel the need for structure.

## Who it is not for
Anyone looking for a button that makes the work disappear. The OS removes the grind, not the craft. You still bring the taste, the ideas, and the final call. It makes those things go further; it does not replace them.

## How to know if you are ready
You are ready when you can name three tasks you do every week that drain you and do not require your unique judgment. That list is exactly what the OS is built to take off your plate.

The promise is simple: spend less of your week on the mechanical parts of creating, and more on the parts that are actually yours.`,
  },
]

export const askCategories: AskCategory[] = [
  'AI Architecture',
  'Music Production',
  'Creator Systems',
  'Strategy',
]

export function getAskQuestion(slug: string): AskQuestion | undefined {
  return askQuestions.find((q) => q.slug === slug)
}

export function getRelatedAsk(slug: string): AskQuestion[] {
  const q = getAskQuestion(slug)
  if (!q) return []
  return q.related
    .map((s) => getAskQuestion(s))
    .filter((x): x is AskQuestion => Boolean(x))
}

export function getAskByCategory(category: AskCategory): AskQuestion[] {
  return askQuestions.filter((q) => q.category === category)
}

export { FRANK as ASK_AUTHOR }
