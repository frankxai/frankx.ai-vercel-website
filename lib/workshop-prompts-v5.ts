/**
 * Workshop Prompts — V5 (Superintelligence Pass)
 *
 * Authored by @prompt-conductor swarm via flow-design (prompt-architect →
 * prompt-claude-specialist → prompt-red-team → prompt-evaluator). 13 prompts,
 * all eval ≥4.2, 10 red-team clean / 3 pass-with-note / 0 fail, voice gate
 * clean across all 13.
 *
 * The 7 V5 design moves applied across every prompt:
 *   1. Proactive analysis first — frontier model brings a hypothesis, then asks
 *   2. Abundance over restriction — 8 directions instead of 3-5
 *   3. Embedded image-gen — M8 trio writes the actual image prompt strings
 *      inside its response (collapses the prompt-for-prompt indirection)
 *   4. Deep-truth seeking — "10-year repeated behavior", "11-year-old joy",
 *      "industry resentment" — wow-level questions, not check-the-box
 *   5. Bridge to /prompts library — every prompt closes pointing there for
 *      ongoing daily practice
 *   6. Tool inventory deferred to /stack — M5, M6 reference rather than embed
 *   7. Mobile + desktop friendly — no prompt requires >300 word paste
 *
 * Isolated from lib/workshop-prompts.ts (the V1-V4 source). V5 page imports
 * exclusively from here so V1-V4 surfaces are unchanged.
 */

import type { WorkshopPrompt } from './workshop-prompts'

export const WORKSHOP_PROMPTS_V5: WorkshopPrompt[] = [
  // ─── Module 0 ─ AI Initial Assessment (V5: peer-collaborator open) ──
  {
    id: 'ai-initial-assessment',
    module: 0,
    title: 'Read me before I say anything',
    subtitle:
      'Run this FIRST. The frontier model brings a hypothesis before the Socratic walk starts. Uses memory, persistent context, attachments, and pattern-matching across millions of comparable lives. Handles "no memory yet" without flinching.',
    body: `You are a frontier-class reasoning model — Claude Opus, GPT-5, or Gemini Pro — with a long context, memory, and pattern-matching across millions of conversations like the one we are about to have. Behave like that. Not like a tutorial assistant.

Before I tell you anything, **read me from what you already have**. Past chats. Files I've shared. Projects you remember. Writing style. The questions I keep returning to. The shape of what I avoid. If you have access to a web search, use it on my name + handles after I tell you them. If you have memory, mine it.

Then produce a first-read hypothesis of my Ikigai — not as four lists, but as **eight directions**, ranked by which one would make me feel most *mildly seen* if it landed.

For each direction, return:

1. **The pattern** (1 sentence) — the small repeated behavior you noticed, not the LinkedIn version. Example shape: "you keep redesigning the same homepage at 11pm on Sundays" — not "you care about design".
2. **The evidence** — quote me back to me. A phrase I used, a project I shipped, a file I shared, a question I returned to twice. If you have nothing, say "thin signal, betting on shape" and explain the bet.
3. **The Ikigai compression** — one line in the form: *"the [specific role] who [specific verb] for [specific person] using [specific edge], paid by [specific mechanism]."*
4. **Why I might resist it** — the version of me that would dismiss this and what they're protecting.

Rank the eight. Tell me which one you'd bet on, and which one I'm probably underrating. Score your overall confidence /10 and name the two pieces of evidence that would move it most.

---

**IF YOU HAVE NO MEMORY OF ME** (fresh chat, first session), say so plainly and ask me these five seed questions before drafting:

1. What's a small repeated behavior you've been doing for ten years that has zero career narrative attached to it but everyone in your life associates with you?
2. What's the last sincere thank-you DM or email someone sent you about your work — paste it if you have it.
3. What's a resentment about your industry that nobody else seems to share?
4. What part of your work makes you feel eleven years old in the best way?
5. If you had to bet money tomorrow on one of the above being your real edge, which?

Then produce the eight directions from those answers.

---

**WOW test:** if I read your eight directions and feel like you wrote a generic Ikigai coach response, throw the whole answer out and try again with more specifics. Mildly seen is the floor. Quietly stunned is the bar.

Do not flatter. If the signal is thin, say so. Honesty beats encouragement.

For ongoing practice with prompts like this, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT', 'Gemini'],
    outputHandling:
      'Read the eight. Underline the one that lands hardest and the one you most want to argue with. Bring both into Module 1 — Socratic walk either confirms the bet or breaks it. Stay in the same chat.',
    version: '2.0',
    evalScore: 4.7,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: null,
    chainsTo: ['socratic-ikigai'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 1 ─ Socratic walk (V5: hypothesis-led, not blank-slate) ──
  {
    id: 'socratic-ikigai',
    module: 1,
    title: 'Walk the four circles — with the bet already on the table',
    subtitle:
      'Frontier-model facilitator. Carries the M0 hypothesis forward, falsifies it circle by circle. Pushes for the named Tuesday, the named DM, the named invoice. Refuses category answers.',
    body: `You ran my Module 0 read and put a bet on the table. Now we walk the four Ikigai circles to falsify or sharpen it. Treat this as forensic work, not coaching.

The four circles (Kamiya 1966, refined Garcia & Miralles 2016):

1. **What I love** — activities where time genuinely disappears
2. **What I'm good at** — what external humans actually thank me for
3. **What the world needs** — the tension I've been circling for ten-plus years
4. **What pays** — where money already moves, with verifiable mechanism

**How to facilitate me:**

Before each circle, restate your current hypothesis for that quadrant in one sentence — your M0 bet, refined by whatever I've said since. Then ask the **one question** that would most efficiently distinguish your bet from the next-best alternative. Not a generic "what do you love" — a question whose answer forces specificity. Examples of the shape:

- For **love**: "What did you do this past Tuesday between 10pm and midnight when nobody was watching?"
- For **good at**: "Read me the last unsolicited DM where someone thanked you for something — even a small thing. If there's none in the last 30 days, that's data, name it."
- For **world needs**: "Name the resentment about your industry that nobody at your last dinner would have agreed with."
- For **pays**: "Who has paid you in the last 12 months, for what, and at what hourly equivalent? If it's zero, who has paid someone adjacent doing roughly your shape of work?"

When my answer is a category ("I like helping people", "marketing", "creators"), reject it and re-ask with a sharper handle. When my answer is a named moment, person, or invoice, advance.

After all four circles, give me **two competing two-line Ikigai hypotheses** — your original M0 bet versus what the walk actually surfaced. State which you now believe more and the one piece of evidence that decided it.

**Discipline:**
- External evidence beats internal guessing. Other people's words beat mine.
- The Blue Zones longevity work (Buettner 2008, Okinawa cohort) suggests Ikigai correlates with morning-rise specificity — "the named reason I get up" not "purpose". Push me toward that register.
- "Everyone" and "people" are not answers. Names, dates, invoices, DMs.
- Do not skip to verdict. The circles must each break or hold on their own.

**WOW test:** if at the end I could trade my two-line hypothesis with any other workshop attendee without anyone noticing, you facilitated too softly. Cut deeper.

Start with circle 1. Restate your bet. Ask the one question. Wait.

For ongoing practice, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT', 'Gemini'],
    outputHandling:
      'Stay in the same chat. The two competing hypotheses become Module 2 raw material — keep both visible.',
    version: '2.0',
    evalScore: 4.6,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['ai-initial-assessment'],
    chainsTo: ['dream-doubt-validator', 'synthesize-statement'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 1.5 ─ Dream + Doubt Validator (V5: abundance, anti-fab) ──
  {
    id: 'dream-doubt-validator',
    module: 1.5,
    title: 'Find the eight people who are already living each of my doubts',
    subtitle:
      'For every "but nobody actually earns from this" doubt, the model returns eight verified humans who do — with money mechanism and the friction they hit in year one. Anti-fabrication gated.',
    body: `Most Ikigai walks die at the doubt step: "you can't have fun and work", "there's no money in this", "the people who do it are already too far ahead". I'm going to list 5–10 things I love or want to build a life around. For each, **you find eight humans who already earn a real living from it** — and you tell me what nearly stopped each one in year one.

**My list** (5–10 items, no filter):

1. [PASTE]
2. [PASTE]
3. [PASTE]
4. [PASTE]
5. [PASTE]
6. [optional]
7. [optional]
8. [optional]

---

**For each item, return:**

**A. Eight humans, ranked by relevance to me.** (Yes — eight, not three. Models in 2026 have the context for it.) For each:
- Name + handle
- One-line description of what they actually ship
- Money mechanism — paid newsletter / clients / products / sponsorships / licensing / equity — be specific, with a number if you can verify one
- Source — URL, podcast episode, or disclosed retro. If you can't verify, mark "needs human research" — do not invent.
- Why this human is more relevant to me than the next person you almost named

**B. The year-one friction** — the specific constraint that nearly stopped at least three of those eight in their first 18 months. Not "it was hard". The named bottleneck: "sub-€2k/mo until month 14, algorithm punishes inconsistency, audience compounds after 200 published units" — that level.

**C. The adjacent angle nobody's working** — a less crowded version of this love with stronger economics or weaker competition. Name it concretely enough that I could start tomorrow.

**D. The honest median.** If the realistic median outcome for someone in this space (not the top 1%) is below median income in a developed country, say so. I'd rather know now.

---

**Hard rules — non-negotiable:**

1. **Use web search if you have it.** Gemini Pro, Claude with web tool, ChatGPT with browsing, Perplexity — search before answering. Cite real URLs.
2. **If you cannot verify a person exists, mark "needs human research".** Do not invent names, do not invent revenue figures, do not cite a Substack or YouTube channel you can't open. Fabricated proof is worse than missing proof — false confidence is what kills the next 30 days.
3. **"Popular" is not money.** "Has a popular newsletter" fails. "Paid newsletter, 4.2k subscribers at $8/mo, disclosed in 2025 retro" passes.
4. **No survivorship bias by default.** If the eight you found are all top-1% outliers, say so and add three median-outcome examples even if less impressive.

---

**WOW test:** at the end of each item I should know two specific humans whose feed I want to subscribe to tonight. If I'm not pulling up a browser tab, you wrote a Wikipedia summary, not a validation.

After all items, one paragraph: which 2–3 items have the strongest proof base, which of my doubts was right, which was wrong.

For ongoing practice with research-grade prompts like this, see https://frankx.ai/prompts.`,
    bestIn: ['Gemini', 'Perplexity', 'Claude', 'ChatGPT'],
    outputHandling:
      'For each item, mark a confidence score 1–5. Items scoring 4+ carry into Module 2 as your "loved AND viable" set. The year-one friction list becomes your Module 3 design constraints.',
    version: '2.0',
    evalScore: 4.8,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 5 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['socratic-ikigai'],
    chainsTo: ['synthesize-statement'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 2 ─ Synthesize statement (V5: eight versions, pick one) ──
  {
    id: 'synthesize-statement',
    module: 2,
    title: 'Eight versions of my Ikigai sentence — ranked by how much they cost me to claim',
    subtitle:
      'Frontier model drafts eight competing one-line Ikigai statements ordered from safest-to-claim to most expensive-to-claim. Names the trade-off each forces. Picks one with reasoning.',
    body: `Based on everything you now know about me — Module 0 read, Module 1 walk, Module 1.5 proof base — synthesize my Ikigai into a single sentence I can put on a business card.

Do not ask me what shape I want. Use the form that fits the evidence:

> "I am the [specific role] who [specific verb] for [specific named persona] using [specific edge], paid by [specific mechanism]."

**Produce eight versions**, ordered from safest-to-claim (a competent peer could also say it) to most-expensive-to-claim (only I could say this with a straight face this year). For each:

1. **The sentence** (under 25 words)
2. **What it costs me to claim it** — who I'm choosing not to be, what work I have to refuse, what audience I lose
3. **The proof I'd need to ship in the next 90 days** to make a stranger believe this on first read
4. **The one word in this version that's doing the heaviest lifting** — and what generic word it replaces

After the eight, tell me:

- **Which I should ship today** (probably not the most expensive — claim it before you can defend it and it reads as bravado)
- **Which I should ship in twelve months** (the one I'm rehearsing toward)
- **The trap** — which of the eight is the one I'd default to because it's "safer" but is actually the one that erases me

**Quality rules — apply ruthlessly:**

- Boring + specific beats poetic + abstract. "The pricing strategist for B2B SaaS founders post-Series A" beats "the strategist who helps founders unlock growth".
- Cut every abstract noun (transformation, journey, potential, empowerment, growth). If you can replace it with a number, a named person, or a verb, do.
- If a direct competitor could say the sentence verbatim, sharpen it.
- The [named persona] is one human with a first name, a job title, and a city — never a demographic.

**WOW test:** read each of the eight aloud. If three or more sound like they came from a generic LinkedIn bio template, you defaulted. Try again.

If after eight tries nothing lands, say so plainly and propose a ninth that fixes the underlying issue — usually the four circles haven't actually been falsified yet and we need to revisit.

For ongoing practice with positioning prompts, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Pick the today-version. Edit exactly one word so it sounds like you saying it, not the model. Lock it in. Carry it into Module 3 as the anchor.',
    version: '2.0',
    evalScore: 4.6,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['socratic-ikigai', 'dream-doubt-validator'],
    chainsTo: ['brand-bridge'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 3 ─ Brand Bridge (V5: avatar with first name, address) ──
  {
    id: 'brand-bridge',
    module: 3,
    title: 'Position me, name my one reader, lay out three pillars that survive a year',
    subtitle:
      'Three artifacts from one prompt: a positioning sentence that names what I refuse, a one-reader avatar with a first name and morning routine, and three pillars that survive 52 weeks of weekly publishing.',
    body: `Anchored to:

> [PASTE MY LOCKED IKIGAI STATEMENT FROM MODULE 2]

Now build three artifacts. Before each artifact, do the proactive analysis: state your hypothesis from everything you know about me so far, then refine in response to my pushback.

---

**1. Positioning sentence**

Form: *"I am the [category] for [audience] who [problem or desire]. I am not for [the audience I deliberately refuse]."*

The second sentence is non-negotiable — every strong positioning names what it refuses. A positioning that serves everyone serves no one. If the refusal sentence sounds harsh, that's the test passing.

---

**2. Audience-of-one — one human, fully drawn**

Give me one human, not a persona segment:

- **First name** and approximate age
- **Job title and company shape** (e.g., "Senior data analyst at a 400-person FMCG, two years in, plateauing")
- **The publication open in their browser at 7:42am** on a Tuesday
- **The exact problem they're trying to solve THIS WEEK** — specific enough that I could write a post addressing it tonight
- **The three phrases they'd type into Google** to look for help
- **What they tried last week that didn't work** — the failure mode I'm replacing
- **Why they wouldn't pay me today** — the friction I have to dissolve before they buy

If the avatar reads like an aggregated marketing persona, throw it out and try again with a tighter specific human. Better to be vivid and wrong than blurry and safe.

---

**3. Three content pillars — 52-week durable**

For each pillar:

- **Pillar name** — one or two words, claimable
- **One-line definition** — what it covers, and one line on what it explicitly does NOT cover
- **Eight example post titles I could write under it**, varied in format (story, contrarian, framework, case, vulnerable, numbered, against-type, prediction). Not five — eight, because if you can't surface eight without repetition, the pillar is too narrow and we need to widen it now.
- **The shallow version** — what this pillar looks like when done lazily, so I can avoid it
- **The one author/operator whose work I should benchmark against** — to set the quality bar

Each pillar must survive 52 weeks of weekly publishing without me repeating myself. If three weeks in I'd run out of angles, the pillar fails — say so.

---

**Output the final three pillars as one line each, ready to paste into Module 4:**

\`\`\`
Pillar 1: [name] — [one-line definition]
Pillar 2: [name] — [one-line definition]
Pillar 3: [name] — [one-line definition]
\`\`\`

**WOW test:** the avatar should feel close enough that I almost want to text the person. The pillars should feel claimable but not crowded. If both fail, the M2 statement was probably too safe — go back one module.

For ongoing practice with positioning + audience prompts, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Copy the three-pillar block. Carry the avatar and refusal sentence into Module 4. Both are now the filter — every post that doesn\'t serve this one human or fit one of these pillars doesn\'t get written.',
    version: '2.0',
    evalScore: 4.5,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 4, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['synthesize-statement'],
    chainsTo: ['generate-30-day-csv', 'draft-monday-post'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 4a ─ 30-day CSV (V5: anchored to avatar's week, hook-tagged) ──
  {
    id: 'generate-30-day-csv',
    module: 4,
    title: 'Build my 30-day calendar — each post anchored to my one reader\'s actual week',
    subtitle:
      'CSV output. Each row names the specific friction in my one-reader\'s week it addresses. Pastes straight into Notion, Sheets, or Excel.',
    body: `Anchored to:
- My Ikigai statement: [PASTE]
- My 3 pillars: [PASTE]
- My audience-of-one (with first name): [PASTE]
- My positioning + refusal: [PASTE]

Before generating rows, do the proactive analysis: review my avatar's named week from Module 3. What is she working on this month? What did she fail at last week? What's the predictable Tuesday-morning friction she'll feel four weeks from now? Use that as the spine. Every post addresses a real friction in her actual week, not a generic content theme.

Build a 30-day calendar using the **3·2·1·1 rhythm**:
- 3 × **Insight** — teach a sharp lesson from inside my zone
- 2 × **Build-in-Public** — show an artifact, a metric, a screenshot, a wrong turn
- 1 × **Connection** — amplify a real human (named), intro, recommend
- 1 × **Rest** — non-negotiable, no shadow-publishing

**Output format: CSV**, exactly these columns, header row included:

\`\`\`
Day,Date,Pillar,Archetype,Channel,Title,Hook,AvatarFriction
\`\`\`

Where:
- **Day** = D1–D28
- **Date** = ISO format, starting next Monday
- **Pillar** = one of my three, rotated so no pillar runs three in a row
- **Archetype** = Insight | Build-in-Public | Connection | Rest
- **Channel** = LinkedIn | Threads | Newsletter | Shorts
- **Title** = 5–8 words, specific enough that I'd click it in my own feed
- **Hook** = one line, tagged with format: Contrarian Take · Story Open · Counter-Wisdom · Numbered Breakdown · Vulnerable Confession · Named Case · Prediction · Against-Type
- **AvatarFriction** = the specific friction in my one-reader's week this post addresses, in 4–8 words ("she's plateauing, knows it, can't name why")

No two posts in the same week share a hook format. No two posts in the same week share an AvatarFriction phrase.

**WOW test:** scan the AvatarFriction column top to bottom. If three or more rows read like generic content themes ("productivity tips", "leadership lessons"), you defaulted — rewrite those rows with friction language tied to my avatar's named week.

End with one line: *"Select all rows, copy, paste into Notion as a database or Google Sheets as a table. Or save as .csv."*

For ongoing practice with calendar + cadence prompts, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Copy → paste into Notion (auto-detects table) or Google Sheets. Scan AvatarFriction column once more before publishing — that\'s the column that decides whether anyone reads.',
    version: '2.0',
    evalScore: 4.5,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 4, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['brand-bridge'],
    chainsTo: ['draft-monday-post', 'map-ai-companions'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 4b ─ Draft Monday post (V5: 5 hooks, kill 3) ──
  {
    id: 'draft-monday-post',
    module: 4,
    title: 'Five drafts of my Monday post — kill three, ship one',
    subtitle:
      'Five distinct drafts in five hook formats. The model kills three, recommends one, explains the surviving runner-up. Anti-slop enforced.',
    body: `Anchored to:
- My Ikigai statement: [PASTE]
- My Pillar 1: [PASTE]
- My one reader, with first name: [PASTE]
- A specific real moment from the last 7 days I want to write about: [PASTE 2–3 SENTENCES with names, places, time-of-day]

Before drafting, do the proactive analysis: what does this specific real moment *actually* teach? Not the LinkedIn-flavoured lesson — the small, slightly unflattering, slightly counterintuitive thing that happened. Lead with that. Then write five drafts, each using a different hook format:

1. **Contrarian Take** — "Everyone says X. The opposite is true. Here's the moment that proved it to me."
2. **Story Open** — "It was Tuesday at 4:12pm. [specific scene]. Here's what I learned."
3. **Numbered Breakdown** — "Five things I got wrong about [topic] in the last [proof of work]."
4. **Vulnerable Confession** — "For three years I [bad pattern]. Last week broke it. Here's what changed."
5. **Named Case** — "[Real first name] asked me [specific question]. My honest answer was [unexpected]."

Each draft follows the anatomy:
- **Hook** (1 line) — the format
- **Body** (4–6 lines) — names the specific moment, the specific people, the specific failure or surprise. No abstract advice. No "lessons learned" framing.
- **Close** (1 line) — a question that invites a real response, not a CTA

After the five, do **the cull**:

- **Kill three.** Name which three and why each fails — usually because the hook is generic, the body retreats into abstraction, or the close is a fake question.
- **Recommend one.** Tell me which to ship and the single reason. Be opinionated.
- **Name the surviving runner-up** and the one situation in which I'd pick it over the recommended draft.

**Anti-slop — hard cuts.** Forbidden in any draft: "Game changer". "Here's the thing". "Let that sink in". "Game-changing". "Unlock". "Leverage". "Dive into". "It's worth noting". Three-emoji bullet headers. "1/n" thread openers. Em-dash overuse (max one per paragraph).

**WOW test:** read the recommended draft aloud. If you wouldn't say this sentence to a friend at a coffee shop, the offending phrase has to go. Replace it before declaring done.

For ongoing practice with hook + draft prompts, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Read the recommended draft aloud. Cut one phrase that sounds like a model wrote it. Ship.',
    version: '2.0',
    evalScore: 4.5,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['brand-bridge', 'generate-30-day-csv'],
    chainsTo: ['ship-live-artifact'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 5 ─ Map AI companions (V5: 1 primary + pair, stack deferred) ──
  {
    id: 'map-ai-companions',
    module: 5,
    title: 'Pick the one AI I should live inside daily — and the pair for what it can\'t do',
    subtitle:
      'Frontier-model reasoning over my Module 3 audience and Module 4 rhythm. One opinionated primary, one specific pair, one named trap. Tool catalog deferred to frankx.ai/stack.',
    body: `You know more about the current AI landscape than I do. Use that. Don't ask me what I want — read my Module 3 + Module 4 outputs and recommend.

Anchored to:
- My audience-of-one with first name: [PASTE]
- My 3 pillars: [PASTE]
- Top 5 rows of my 30-day calendar: [PASTE]
- My constraints — monthly AI budget, hours/day available, privacy needs (client data? medical? legal?): [TELL ME]

Before recommending, do the proactive analysis: which of the daily jobs in my calendar is highest-frequency and which is highest-stakes? The primary AI has to nail the highest-frequency job. The pair handles the highest-stakes job your primary is weakest at.

For the current frontier-model landscape (model names, pricing tiers, native capabilities) refer to **https://frankx.ai/stack** — the canonical catalog. Don't paste the tool list into your answer; pull from it for reasoning, then recommend.

---

**Return six things — opinionated, no hedging:**

**1. Your primary companion is [X].** One sentence on the single reason, tied to my highest-frequency Module 4 job — not generic features.

**2. The five recurring jobs it does daily for me.** Pulled from my calendar. Name each job, the workflow inside the primary, and the expected time-saved per job.

**3. Pair it with [Y] for [job].** The pair handles the specific job your primary is weakest at. Name the handoff workflow — "draft in primary, fact-check + cite in pair before publishing" — concretely enough that I could run it today.

**4. The trap.** Name the AI I should NOT pick despite the marketing, and the specific reason it would slow *me* down given *my* calendar and constraints. Not generic critique — situational.

**5. The 30-day failure test.** A concrete signal that I picked wrong: "if by day 30 I'm still copy-pasting between three or more tools instead of living inside the primary, I picked wrong — switch."

**6. The thing I'll probably try to do that you'd push back on.** What overreach or wrong-tool-for-job pattern do you expect from me given my constraints? Pre-empt it.

---

**WOW test:** I should finish this answer knowing exactly which browser tab I'm opening next. If I'm still comparison-shopping after reading you, you hedged. Re-run with conviction.

For tool catalog and current pricing, see https://frankx.ai/stack. For prompt patterns I can run inside whichever primary I pick, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT', 'Gemini'],
    outputHandling:
      'Open the primary in your browser now. Paste your Module 4 calendar. Run the first daily workflow today. If it doesn\'t feel like home in 7 days, switch to the pair and re-test.',
    version: '2.0',
    evalScore: 4.4,
    evalRubric: { clarity: 5, chainability: 5, specificity: 4, voice: 5, safety: 4 },
    redTeamStatus: 'pass-with-note',
    redTeamNotes:
      'Defers landscape facts to /stack — keeps prompt evergreen but depends on /stack being maintained. Refresh /stack quarterly.',
    voiceGate: 'clean',
    chainsFrom: ['brand-bridge', 'generate-30-day-csv'],
    chainsTo: ['ship-live-artifact'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 6 ─ Ship live artifact (V5: post + script + image-gen baked) ──
  {
    id: 'ship-live-artifact',
    module: 6,
    title: 'Ship the post, the 60-second script, and the cover image — before I leave this room',
    subtitle:
      'Final draft, video script, and a baked image-gen prompt for the cover visual — all in one response. Three rounds: draft, stress-test, convert. No tool inventory — focuses on the ship.',
    body: `Right now, in this room, I'm shipping one real artifact: a LinkedIn post I publish today, a 60-second phone-recorded video, and a cover image I generate before I leave. Three pieces, one response.

Anchored to:
- My Ikigai statement: [PASTE]
- Pillar I'm leading with: [PASTE]
- My primary AI companion from Module 5: [NAME]
- One specific real moment from the last 7 days — with name, place, time-of-day: [PASTE 2–3 SENTENCES]

For your toolchain reference (recording setup, distribution surfaces, current AI tool tiers) defer to https://frankx.ai/stack. Don't pull tool lists into the answer. Focus on the artifact.

---

**Round 1 — Draft the post**

Anatomy:
- **Hook** (1 line) — pick the hook format that fits this specific moment, not the format you're most comfortable with
- **Body** (4–6 lines) — name the specific moment, the specific people, the specific surprise or failure. No abstract advice. No "lessons learned" framing.
- **Close** (1 line) — a question that invites a real response

Anti-slop hard-cuts: "Game changer", "Here's the thing", "Let that sink in", "Unlock", "Leverage", "Dive into", "It's worth noting", three-emoji bullets, "1/n" thread openers.

---

**Round 2 — Stress-test the draft**

Before you show me the draft, do this silently:

1. Read your draft aloud in your context window.
2. Identify the one sentence that reads like a model wrote it — generic, abstract, replaceable.
3. Rewrite that sentence to be specific to *my* situation only.
4. Identify the one phrase that's hedging — "kind of", "sort of", "I think maybe" — and either commit or cut.

Now show me the final post.

---

**Round 3 — 60-second video script**

Convert the final post into a phone-recordable script:

\`\`\`
[00:00–00:08]  HOOK — one line, said like I mean it
[00:08–00:25]  SETUP — the specific moment. Time, place, who was there.
[00:25–00:45]  INSIGHT — the lesson. Concrete language only.
[00:45–00:58]  TURN — what changed in how I work because of it.
[00:58–01:00]  QUESTION — to camera. Wait two beats. End.
\`\`\`

Style: conversational, not presentational. I'm not on stage. One idea — don't try to cram three lessons in 60 seconds. The first 8 seconds decide whether anyone watches the rest.

---

**Round 4 — Cover image, baked**

Now write the image-generation prompt string I'll paste into Nano Banana 2, GPT Image, or Sora — for the LinkedIn cover image of this post. Don't tell me how to write it. Write it. As part of *your* answer.

Format the image-gen prompt as the final code-block of your response, ~80–120 words, aspect ratio 1.91:1 for LinkedIn, single focal element, generous negative space, no text overlay (I add the text in the post body, not the image). Specify medium, color palette (3 hex codes max), mood with concrete language. End with model-appropriate flags.

\`\`\`
LINKEDIN COVER IMAGE (1.91:1)
[full image-gen prompt string, written by you, ready to paste]
\`\`\`

---

**Final output of your response, in this order:**

1. Final LinkedIn post — paste-ready
2. 60-second script — record-ready
3. Image-gen prompt — paste into NB2 / GPT Image / Sora
4. One sentence: what I do right now, in order

**WOW test:** if I close this chat and don't ship within 20 minutes, you wrote a draft for "later" not "today". Tighten the close until it's harder to delay than to publish.

For ongoing practice with shipping prompts, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Paste the post to LinkedIn. Record the 60-sec on your phone — landscape, daylight, no editing. Run the image prompt through NB2 or GPT Image, pick the first usable variant. All three live before you leave the room. The artifact is the proof.',
    version: '2.0',
    evalScore: 4.7,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['draft-monday-post', 'map-ai-companions'],
    chainsTo: [
      'ikigai-wallpaper-prompt',
      'content-calendar-visual-prompt',
      'photo-scribbled-mission-prompt',
      'lock-commitment',
    ],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 7 ─ Lock commitment (V5: 4 artifacts, public text) ──
  {
    id: 'lock-commitment',
    module: 7,
    title: 'Schedule 4 artifacts, draft the text I send to one human in the next 90 seconds',
    subtitle:
      'Fixed-cadence schedule (72h, day 14, day 21, day 30) plus the SMS I send to lock the commitment publicly. Sounds like me texting a friend, not a press release.',
    body: `I commit to shipping four real artifacts in the next 30 days, anchored to my Ikigai statement and pillars:

- **1 LinkedIn post** — Pillar: [PASTE]
- **1 short video** (45–90 sec, captions on, pillar in title)
- **1 conversation** (DM or email to my one reader from Module 3, by name)
- **1 small product** (template, checklist, mini-guide, or one-page PDF)

Before generating the schedule, do the proactive analysis: which of these four am I most likely to ship first, which am I most likely to delay, and what's the predictable reason I'll delay it? Build the schedule against my actual delay pattern, not the optimistic version.

---

**Help me with two things:**

**1. The fixed cadence — 72h, day 14, day 21, day 30**

Calendar-style output:
- **Tue [date] (72h)** — LinkedIn post #1, Pillar [X], Insight archetype
- **[date] (day 14)** — [artifact 2]
- **[date] (day 21)** — [artifact 3]
- **[date] (day 30)** — [artifact 4]

The fixed cadence beats spreading-by-feel — it forces the first artifact before motivation fades and forces the last one before drift wins. Choose the order based on which artifact dissolves my likely first-week procrastination.

**2. The accountability text**

Write the SMS / WhatsApp / iMessage I send to **one specific human in my life** to lock this publicly. The text should:

- Name what I'm doing (the four artifacts)
- Name the deadlines (72h, day 14, day 21, day 30)
- Ask them to check in with me on day 7 and day 30 — specifically
- Be 3–4 sentences max
- Sound like me texting a friend who's seen me at my worst, not a press release or a LinkedIn announcement
- Include one self-aware line about how this is the part I usually skip

Output the text in a fenced code block I can copy and paste straight into Messages.

\`\`\`
[the accountability text, ready to paste]
\`\`\`

---

**WOW test:** read the SMS aloud. If it sounds performative, broadcast-y, or like a LinkedIn post in text-message clothing, rewrite it. The signal of a real commitment is that the text is slightly embarrassing to send. If you'd send it without flinching, it isn't doing the work.

**Closing line in your response:** the name and number I should send this to right now. Not "consider sharing with a friend". Tell me the type of human — closest friend who's honest with me / partner / mentor / former colleague who's also building — and tell me to send it in the next 90 seconds.

For ongoing practice with commitment + accountability prompts, see https://frankx.ai/prompts.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Save the schedule somewhere visible (Notion, Calendar, fridge). Send the SMS in the next 90 seconds — public commitment is what makes this stick. The 90-second window is the test.',
    version: '2.0',
    evalScore: 4.4,
    evalRubric: { clarity: 5, chainability: 4, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact'],
    chainsTo: ['ikigai-wallpaper-prompt'],
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 8 ─ Wallpaper (V5: model writes the prompt strings inline) ──
  {
    id: 'ikigai-wallpaper-prompt',
    module: 8,
    title: 'Write me three ready-to-paste image prompts for my Ikigai wallpaper',
    subtitle:
      'The model writes the prompt strings directly — phone, desktop, square — embedded in the response. No template. No "use this format." Actual generated strings.',
    body: `I want an Ikigai wallpaper — phone lock-screen, desktop background, and a square social card — that reminds me daily what I committed to in this workshop.

You will not generate the image. You will **write the three ready-to-paste image-generation prompt strings** as part of your response — the actual strings, not templates, not instructions for how to write them. I copy them and paste into Nano Banana 2, GPT Image, Sora, or Midjourney.

Anchored to:
- My Ikigai statement: [PASTE]
- My 3 pillars (one word each): [PASTE]
- My one reader's first name: [PASTE]
- A dominant emotional tone for the wallpaper, one word (calm / determined / playful / sharp / warm / restrained / quiet / etc.): [TELL ME]

Before writing the prompts, do the proactive analysis: read my Ikigai statement, decide what *one specific object, scene, or compressed image* would mean my statement to me — not to a generic Ikigai-poster buyer. Then write the prompts around that single visual idea, three aspect ratios.

---

**Anatomy rules for the prompts you write:**

1. **Style anchor** — Japanese minimalism, ink-on-paper aesthetic, sumi-e influence. Generous negative space (≥60% of frame). Single focal element.

2. **The kanji** — 生き甲斐 (ikigai) anchored in composition, not decorative. Top-right brush stroke, bottom-left signature stamp, or center watermark. Pick one position per aspect ratio.

3. **The visual metaphor** — one specific object or scene that compresses my statement into an image. Not a four-circle Venn diagram. Not an abstract gradient. One object that means *my* statement to *me*.

4. **Color palette** — derive from my tone word, three hex codes maximum. No rainbow. No "vibrant gradient." Specify exact hexes.

5. **Composition** — rule of thirds, focal element off-center, no text crowding.

6. **Medium** — specify concretely: "ink on aged washi paper" or "matte digital painting on warm cream ground" or "high-contrast photography, single window light" — not "feeling of awakening".

---

**Write three prompts now, each ~90–120 words, in this exact format:**

\`\`\`
WALLPAPER — PHONE (9:16)
[full prompt string, written by you, ready to paste]

WALLPAPER — DESKTOP (16:9)
[full prompt string, written by you, ready to paste]

WALLPAPER — SQUARE / SOCIAL (1:1)
[full prompt string, written by you, ready to paste]
\`\`\`

Each ends with model-appropriate flags: \`--ar 9:16 --no text --style raw\` for Midjourney equivalent, or the model's native parameter format.

**Banned in your prompt strings**: "revolutionary", "transformative", "luminous", "ethereal", "mystical", "unlock", "journey", "awakening". If your draft contains any of these, rewrite. The image should look like quiet luxury — Stripe homepage restraint, not retreat-poster mysticism.

---

**WOW test:** read your three prompt strings. If a stock-image agency could sell the resulting image to anyone in Ikigai-coach-land, the visual metaphor wasn't specific enough. Rewrite with a more specific object that's actually mine.

**Closing line:** "Paste the 9:16 string into Nano Banana 2 or GPT Image first. Generate four. The one you'd actually use as a lock screen for 30 days wins. Desktop goes on the laptop tonight."

For ongoing practice with image-gen prompts, see https://frankx.ai/prompts. Tool current state: https://frankx.ai/stack.`,
    bestIn: ['Claude', 'ChatGPT', 'Gemini'],
    outputHandling:
      'Open NB2, GPT Image, Sora, or Midjourney. Paste the 9:16 first. Generate 4. Set the lock screen today. Desktop tonight.',
    version: '2.0',
    evalScore: 4.4,
    evalRubric: { clarity: 5, chainability: 4, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact', 'lock-commitment'],
    chainsTo: null,
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 8 ─ Calendar visual (V5: model writes the prompt strings) ──
  {
    id: 'content-calendar-visual-prompt',
    module: 8,
    title: 'Write me the image prompts for my 30-day calendar — wall poster + social card',
    subtitle:
      'The model writes both ready-to-paste image-gen prompts as part of the answer. Editorial Swiss-grid, three color codes, no decorative noise. Falls back gracefully when image models mangle small text.',
    body: `I want my 30-day calendar visualized two ways: a wall poster I pin above my desk, and a social card I post the day I start.

You will not generate the image. You will **write the two ready-to-paste image-generation prompt strings** directly in your response. Not templates. Not instructions. Actual strings I copy and paste into Nano Banana 2 or GPT Image.

Anchored to:
- My 30-day CSV from Module 4a: [PASTE FULL CSV]
- My 3 pillars (assign one hex code each — three hex codes max): [PASTE]
- My Ikigai statement (max 80 chars): [PASTE]
- Visual mood word (matches my wallpaper if I ran that prompt): [WORD]

Before writing the prompts, do the proactive analysis: scan my CSV. Pick the three hex codes that read with restraint on a white ground — not a primary-color rainbow. Map each pillar to its hex. Note the day-cell density (28 days = 4 rows × 7 columns). Decide where my Ikigai statement sits in the poster's hierarchy (top vs. bottom; large vs. footer-sized).

---

**Format A — Wall poster (A2 portrait, 2:3)**

A printable poster I'd pin above my desk for 30 days.
- Calendar grid: 4 rows × 7 columns, day cells D1–D28 (use actual ISO dates from the CSV)
- Each cell: pillar color block (small, top-left of cell), archetype glyph (Insight = horizontal bar; Build-in-Public = circle; Connection = arrow; Rest = blank), 3-word post title in small mono type
- Header: my Ikigai statement, max 80 characters, restrained editorial serif
- Footer: month + year + my name + the 3·2·1·1 rhythm legend
- Style: Swiss-grid editorial. Inter Display tight for header, Söhne Mono or similar for cell labels. White ground. Three-color palette only.
- Forbidden: emoji, gradients, drop shadows, faux 3D, "modern abstract art" backgrounds

---

**Format B — Social card (1:1 square)**

A "this is what I'm shipping" announcement post.
- Headline: "30 days of [Pillar 1 word]" — large editorial serif, top third
- Subhead: my Ikigai statement, one line
- Centerpiece: simplified 28-dot grid, color-coded by pillar
- Bottom strip: my name, my handle, the start date
- Style: same restraint as Format A

---

**Write both prompts now, ~120–160 words each, in this exact format:**

\`\`\`
CALENDAR POSTER — A2 PORTRAIT (2:3)
[full prompt string, written by you, ready to paste]

CALENDAR SOCIAL CARD — SQUARE (1:1)
[full prompt string, written by you, ready to paste]
\`\`\`

Each prompt string must specify:
- "editorial layout, Swiss grid, restrained type system"
- exact type families ("Inter Display tight" / "Söhne Mono" / equivalent)
- the three hex codes you assigned to pillars
- forbidden list: drop shadows, gradients, emoji, faux 3D, decorative abstract backgrounds
- model-appropriate aspect-ratio flags

---

**Honest fallback line — include in your response:**

> "Image models in mid-2026 still mangle small text inside dense grids. If text legibility fails after two generations, fall back to a Figma rebuild using the same three hex codes and type system — it'll be deterministic and ship-ready in 20 minutes."

**WOW test:** my poster should look like something Linear or Stripe would print as an internal artifact, not like a vision-board template. If your prompt could be reused for any productivity influencer, it's not specific enough — rewrite.

**Closing line:** "Paste the poster prompt into NB2 first. If text breaks, fall back to Figma. Print A2. Pin above desk. Post the social card the day you start."

For ongoing practice with visual prompts, see https://frankx.ai/prompts. Image tool current state: https://frankx.ai/stack.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Paste prompt A into NB2 or GPT Image. If text mangles, fall back to Figma with the same hexes. Print A2. Post the social card on start day.',
    version: '2.0',
    evalScore: 4.2,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 3 },
    redTeamStatus: 'pass-with-note',
    redTeamNotes:
      'Image models still mangle small text in dense grids as of mid-2026. Figma fallback baked into prompt. Consider Remotion deterministic companion in W22.',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact', 'generate-30-day-csv'],
    chainsTo: null,
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },

  // ─── Module 8 ─ Photo + scribbled mission (V5: model writes the prompt) ──
  {
    id: 'photo-scribbled-mission-prompt',
    module: 8,
    title: 'Write me the image prompt that annotates my real selfie with my mission',
    subtitle:
      'The model writes the ready-to-paste image-gen prompt directly. Notebook-scribble overlays — Ikigai statement, audience-of-one, world-problem, three pillars — around my actual photo. Identity-preserved.',
    body: `I want a brand-launch visual: my actual photo, with hand-drawn / notebook-scribble annotations around me — my mission, my one reader, the world-problem I keep circling, my three pillars. One visual, six surfaces (LinkedIn banner, About page hero, speaker bio, conference badge, newsletter header, podcast cover).

You will not generate the image. You will **write the ready-to-paste image-generation prompt string** directly in your response — the actual string, written for a tool that takes a reference photo (Nano Banana 2 with image input, GPT Image with image input, Midjourney --cref).

Anchored to:
- I will upload my selfie separately to the image tool
- My Ikigai statement (1 line, max 80 chars): [PASTE]
- My one reader's first name and one-phrase description: [PASTE]
- The world-problem I keep circling (1 line): [PASTE]
- My 3 pillars (one word each): [PASTE]

Before writing the prompt, do the proactive analysis: what feels mine vs. generic for the annotation style? Notebook-scribble on aged paper feels like *working journal* — not Canva poster. Pen-ink imperfection over graphic-design polish. Ballpoint over marker. Lowercase handwriting over capitals. Decide the specific aesthetic and write the prompt around that single coherent feel.

---

**Anatomy the prompt must specify:**

1. **Photo placement** — "Subject photo unchanged at center, preserve facial identity and likeness from reference image. Photo occupies 50–60% of frame, centered or slightly right-of-center."

2. **Annotation style** — notebook scribble. Ballpoint pen or fine-tip marker. Lowercase handwriting, slightly tilted, casual. Like a Moleskine page where someone sketched their plan over coffee. Forbidden: calligraphy, marker on whiteboard, graphic-design lettering, vector overlays.

3. **Annotation positions** (explicit, all four corners + around head):
- **Top-left**: my Ikigai statement, underlined twice
- **Top-right**: "for: [reader's first name]" with a small arrow pointing toward my chest
- **Bottom-left**: "the problem: [world-problem phrase]"
- **Bottom-right**: 3 pillars stacked, each in a slightly different ink shade (still pen-ink, not marker)
- **Around the head**: 2–3 small connecting arrows / asterisks / underlines — natural notebook marginalia, sparse

4. **Background** — preserve original photo background, OR replace with aged notebook paper texture, slight grid lines, optional coffee ring. Pick one and commit in the prompt.

5. **Mood** — working journal page. Imperfect. Specific. Mine. NOT graphic design poster. NOT motivational quote card.

---

**Write the prompt now, ~140–180 words, in this exact format:**

\`\`\`
PHOTO + SCRIBBLED MISSION (4:5 portrait, LinkedIn/Instagram native)
[full prompt string, written by you, ready to paste]
\`\`\`

The prompt must include:
- "preserve subject's facial identity from reference image"
- "handwritten annotations in ballpoint pen, natural ink imperfection"
- explicit forbidden list: graphic design lettering, vector overlays, Canva-style icons, drop shadows, gradient overlays, neon, sparkles, sci-fi HUD, "futuristic" anything
- model-appropriate "use reference image" flag
- aspect ratio flag for 4:5

---

**Honest fallback line — include in your response:**

> "Identity preservation is model-dependent. If likeness drifts past recognition, re-run with reference-weight increased, or use Higgsfield Soul ID for tighter identity lock."

**WOW test:** the image should look like *my actual notebook* on *an actual Tuesday* — not a curated personal-brand asset. If the result reads as polished personal-brand collateral, the prompt was too tidy. Imperfection is the signal of authenticity.

**Closing line:** "Upload your selfie to NB2 or GPT Image in image-input mode. Paste this prompt. Generate four. Pick the one that looks like you on a real Tuesday, not the polished version. One visual, six surfaces — LinkedIn banner, About hero, speaker bio, Madrid badge, newsletter header, podcast cover."

For ongoing practice with image-gen prompts, see https://frankx.ai/prompts. Image-tool current state: https://frankx.ai/stack.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'NB2 or GPT Image, image-input mode. Paste, generate 4, pick the slightly imperfect one. Six surfaces.',
    version: '2.0',
    evalScore: 4.5,
    evalRubric: { clarity: 5, chainability: 4, specificity: 5, voice: 5, safety: 4 },
    redTeamStatus: 'pass-with-note',
    redTeamNotes:
      'Identity preservation is model-dependent. Higgsfield Soul ID escalation path noted in prompt body.',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact'],
    chainsTo: null,
    author: 'prompt-hub-v5-superintelligence-pass',
    lastModified: '2026-05-18',
  },
]
