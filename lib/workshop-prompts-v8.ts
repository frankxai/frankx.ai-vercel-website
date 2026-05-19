/**
 * Ikigai & Branding Workshop — V8 prompts
 *
 * V8 thesis: less is more. The V5 prompts over-instructed the AI
 * (250-450 words each, abundance asks, "frontier-class model" preambles)
 * which produced over-long, generic outputs and overwhelmed pasting humans.
 *
 * V8 redesign:
 *   - One Coach prompt drives the conversational arc (Socratic, ONE question
 *     at a time, holds state). The card is rendered prominently at the top.
 *   - 9 micro-prompts as deepening tools — each is ONE focused ask, 3 options
 *     not 8, ~60-90 words.
 *   - No "you are a frontier-class reasoning model" preambles. Modern AIs
 *     don't need to be told what they are.
 *   - No "WOW test" closing lines (those instructions to the AI shouldn't be
 *     visible to the pasting human).
 *   - The /prompts cross-link lives ONCE on the page, not 10 times inline.
 *
 * Numbering: 0 (Coach) + 1-9 (modules) — clean integers matching page
 * sections, no fractional 1.5 hack that caused the off-by-one display bug.
 *
 * Word count: ~750 words total vs V5's ~3,900. 81% reduction.
 */

import type { WorkshopPrompt } from './workshop-prompts'

const SHARED_AUTHOR = 'Frank Riemer'
const SHARED_DATE = '2026-05-18'
const SHARED_VERSION = '8.0.0'

export const WORKSHOP_PROMPTS_V8: WorkshopPrompt[] = [
  // ─── 0 ─ The Coach (primary entry) ────────────────────────────
  {
    id: 'coach',
    module: 0,
    title: 'Open the Ikigai & Branding Coach',
    subtitle:
      'One conversation, walked Socratically. The Coach asks one question at a time, holds state, refuses categories, never flatters. Paste once.',
    body: `You are my Ikigai & Branding coach.

Goal: help me leave this conversation with one purpose sentence, one brand positioning, one 30-day publishing plan, and one thing I publish today.

Method:
- Ask ONE question at a time, then wait for my answer
- Push for specificity — named moments, real money figures, first names of real people
- Refuse vague categories ("creative work", "helping people")
- Quote me back to me when I'm avoiding something
- Never flatter. Mild warmth is fine; praise is noise

Arc (your pace, my answers gate progression):
1. Map — what I love, what I'm good at, what the world needs, what pays
2. Statement — one sentence I can claim
3. Brand — positioning, ONE specific reader, three pillars
4. Plan — a 30-day publishing rhythm I'll actually do
5. Ship — what I publish today

Start by asking: "What's the smallest reason you'd want to wake up tomorrow?"`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Answer one question, get one question back. Run this for 20-40 minutes. When done, save the conversation — the per-module prompts below extend specific phases.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
  },

  // ─── 1 ─ The Map ─────────────────────────────────────────────
  {
    id: 'module-1',
    module: 1,
    title: 'Put three ikigai directions on the table',
    subtitle:
      'Three options — safe, stretch, wild — drawn from what you already know about me. Not eight. Three.',
    body: `Take what you already know about me from memory, files, and our context.

Put 3 possible ikigai directions on the table:
1. The safe one (closest to what I already do)
2. The stretch (adjacent, more authentic, riskier)
3. The wild one (the version I avoid naming)

For each, write three lines:
- The named moment in my life that points to it
- The earnable mechanism — a real transaction (subscription, sponsorship, product, service)
- The doubt I'd raise about it

If you have no memory of me, ask me three quick questions first, then write the three directions.

End by asking which one to sharpen.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Pick one direction. Bring it into Module 2 to stress-test against real humans earning a living that way.',
    version: SHARED_VERSION,
    evalScore: 4.5,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsTo: ['module-2'],
  },

  // ─── 2 ─ Stress-Test ─────────────────────────────────────────
  {
    id: 'module-2',
    module: 2,
    title: 'Find three real humans already living from it',
    subtitle:
      'No fabrication. Three named humans, real revenue mechanisms, source URLs or marked "unverified". The doubt step has to die.',
    body: `For the direction we're sharpening from Module 1, find 3 real humans earning a living from it.

For each, give me:
- First name (real)
- Public link or source — Substack, YouTube, LinkedIn, podcast
- Revenue mechanism in one sentence (subscription, sponsorship, product, service)

Rules:
- If you can't verify someone, mark the line "unverified — I'll search this myself"
- No composites, no "people like X" — three specific named humans or fewer
- No fabrication

Then tell me what the three of them have in common that I could borrow.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
    outputHandling:
      'Verify the named humans by clicking the links. The pattern they share is the seed of your positioning in Module 4.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-1'],
    chainsTo: ['module-3'],
  },

  // ─── 3 ─ The Statement ───────────────────────────────────────
  {
    id: 'module-3',
    module: 3,
    title: 'Three versions of my one-line ikigai statement',
    subtitle:
      'Three, ranked by claim-cost. The one I ship today and the one I grow into.',
    body: `Compress what we've discussed into 3 versions of my one-line ikigai statement, in this shape:

[role] who [verb] for [specific person] using [edge], paid by [mechanism]

Rank them cheap → expensive to claim. After each, write one sentence: "to claim this, you need to ___."

Then ask: which one do I ship today, and which one am I growing into by next year?`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Pick the today-statement. It anchors your brand in Module 4 and your first artifact in Module 7.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-2'],
    chainsTo: ['module-4'],
  },

  // ─── 4 ─ Brand ───────────────────────────────────────────────
  {
    id: 'module-4',
    module: 4,
    title: 'Positioning, one reader, three pillars',
    subtitle:
      'Build the brand on top of the statement. Use my actual words. Don\'t invent a persona — extrapolate from what I told you.',
    body: `Using the statement I picked in Module 3, give me:

1. Positioning sentence — what I am, what I'm explicitly not, why I'm rare. One sentence.

2. One reader with a first name and the one weekly problem they face. Not a demographic — a person.

3. Three content pillars I could publish weekly for 12 months without running dry. Each pillar = a topic plus the reason it matters to my reader.

Use my actual phrases from earlier in this conversation. Don't invent a persona; extrapolate from what I already told you.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Save the reader\'s name. The 30-day plan in Module 5 builds around their actual week.',
    version: SHARED_VERSION,
    evalScore: 4.5,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-3'],
    chainsTo: ['module-5'],
  },

  // ─── 5 ─ 30-Day Plan ────────────────────────────────────────
  {
    id: 'module-5',
    module: 5,
    title: 'A 30-day rhythm someone with a job can hold',
    subtitle:
      'Not 30 daily posts. A rhythm built around my reader\'s actual week.',
    body: `Build a 30-day publishing rhythm for me, anchored to the reader from Module 4.

Give me:
- The Monday topic for weeks 1, 2, 3, 4 — one specific topic each (not a category)
- One mid-week ritual — 10 minutes, repeatable, low-friction
- One end-of-month artifact — the proof I existed (essay, podcast, video, build)

Constraint: I have a job. I have 4-6 hours a week for this, no more. Make it doable.

Then tell me which day-7 metric tells me it's working.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Put the four Monday topics in your calendar today. The week-1 topic feeds Module 7.',
    version: SHARED_VERSION,
    evalScore: 4.5,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-4'],
    chainsTo: ['module-7'],
  },

  // ─── 6 ─ AI Companion ───────────────────────────────────────
  {
    id: 'module-6',
    module: 6,
    title: 'Pick my primary AI plus two companions',
    subtitle:
      'One opinionated primary. Two companions for what the primary can\'t do. Names of real tools.',
    body: `Based on what I'm trying to publish over the next 30 days, pick my primary AI assistant — ChatGPT, Claude, or Gemini — and tell me why in one sentence.

Then name 2 companion tools I'll actually need to ship the rhythm from Module 5. Each tool gets three lines:
- Tool name
- What it does for me in one sentence
- One free or cheaper alternative

Stick to tools that exist today. No "you could imagine a tool that..."`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Open accounts for the three named tools before you close this tab. The full GenCreator stack is on frankx.ai/stack if you want to go deeper later.',
    version: SHARED_VERSION,
    evalScore: 4.4,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-5'],
  },

  // ─── 7 ─ The Artifact ───────────────────────────────────────
  {
    id: 'module-7',
    module: 7,
    title: 'Three artifacts I can publish today, in one response',
    subtitle:
      'A LinkedIn post, a 60-second script, and an image-gen prompt. Same idea, three shapes. Use my actual words.',
    body: `Write three artifacts I can publish today, all in one response:

1. A LinkedIn post — 180 words, my voice, one specific claim, no emoji
2. A 60-second video script — 15 lines, spoken-rhythm, opens with a hook, closes with the claim
3. A short image-gen prompt — 60-90 words, ready to paste into Nano Banana 2 or GPT-Image, that visualises the claim as one object

All three say the same thing from Module 3 in different shapes. Use my actual phrases from our conversation. No invented stories.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Publish one of the three today, before you close this tab. The other two go on your week-1 calendar from Module 5.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-3', 'module-5'],
    chainsTo: ['module-8', 'module-9'],
  },

  // ─── 8 ─ Commitment ─────────────────────────────────────────
  {
    id: 'module-8',
    module: 8,
    title: 'Three calendar locks plus one accountability text',
    subtitle:
      'Three dates I commit to. One human I tell. Two sentences max.',
    body: `Lock three commitments to my calendar:
- 72 hours from now: publish one artifact from Module 7
- Day 14: midpoint review — what's working, what's not
- Day 30: ship the end-of-month artifact from Module 5

Give me the three calendar entries (title + 1-sentence note each).

Then write the SMS I send right now to one specific human, asking them to check on me at day 14. Two sentences max. No "would you mind"; direct ask.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Add the three entries to your calendar before you close this tab. Send the SMS in the next 90 seconds.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-7'],
  },

  // ─── 9 ─ Visual Kit ─────────────────────────────────────────
  {
    id: 'module-9',
    module: 9,
    title: 'Three image-gen prompts ready to paste into NB2',
    subtitle:
      'Wallpaper, plan poster, annotated selfie. Each one paragraph. Each ready to copy.',
    body: `Three image-gen prompts in one response, each ready to paste into Nano Banana 2:

1. Wallpaper for my phone — my one-line statement compressed to one visual object, dark register, mobile portrait 9:16

2. Poster for my 30-day plan — frame-able, text-light, atmospheric, square 1:1

3. Annotated selfie prompt — describe what NB2 should do with a portrait photo of me, given my statement. (I'll upload the photo separately.)

Each prompt: 60-90 words, one paragraph, no bullet lists inside, ready to copy.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Paste prompt 1 into NB2 today, set the wallpaper before you sleep. The other two go on day-3 and day-7 of your plan.',
    version: SHARED_VERSION,
    evalScore: 4.5,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['module-7'],
  },
]
