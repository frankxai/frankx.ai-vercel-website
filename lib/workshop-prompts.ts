/**
 * Copy-paste-ready prompts for the Ikigai & Branding workshop.
 *
 * Design intent: the workshop's real surface is the AI chat the
 * attendee already has open. The page is the prompt library that
 * drives it. Each prompt:
 *   - Brand-voice constrained (anti-slop, "specific beats poetic")
 *   - Chains across modules — later prompts assume earlier outputs
 *   - Outputs in copy-paste-ready formats (sentences, CSV, etc.)
 *   - Works in ChatGPT / Claude / Gemini equally
 */

export interface WorkshopPrompt {
  /** Stable id used by the prompt-card component */
  id: string
  /** Module this prompt belongs to (0, 1, 1.5, 2…7) — decimals allowed for inserted modules */
  module: number
  /** Card title — short, action-shaped */
  title: string
  /** One-line subtitle explaining what the prompt does */
  subtitle: string
  /** The prompt text to copy. Markdown is rendered visually + copied raw. */
  body: string
  /** AI brains this prompt works well in */
  bestIn: ('ChatGPT' | 'Claude' | 'Gemini' | 'Grok' | 'Perplexity')[]
  /** 1-2 sentences telling the user what to do with the output */
  outputHandling: string
  // ── Prompt Hub publish-gate metadata (optional, back-compat) ────────
  /** Semver-ish version for the prompt body */
  version?: string
  /** Evaluator score (0-5), must be ≥3.5 to ship per Hub invariants */
  evalScore?: number
  evalRubric?: {
    clarity?: number
    chainability?: number
    specificity?: number
    voice?: number
    safety?: number
  }
  redTeamStatus?: 'pass' | 'pass-with-note' | 'fail'
  redTeamNotes?: string
  voiceGate?: 'clean' | 'needs-edit'
  /** ids of prompts that feed into this one */
  chainsFrom?: string[] | null
  /** ids of prompts this one feeds into */
  chainsTo?: string[] | null
  tested?: boolean
  author?: string
  createdAt?: string
  lastModified?: string
}

export const WORKSHOP_PROMPTS: WorkshopPrompt[] = [
  // ─── Module 0 ─ AI Initial Assessment (proactive memory-first) ────
  {
    id: 'ai-initial-assessment',
    module: 0,
    title: 'Tell me what you already know about what makes me come alive',
    subtitle:
      'Run this FIRST. The AI drafts an initial hypothesis from whatever it remembers about you — before the Socratic walk starts. Handles "I do not know you yet" gracefully.',
    body: `Before we start the Ikigai walk, I want your initial read on me.

Look at whatever context you already have about me — past conversations, files I've shared, my projects, my writing, my questions, my taste. Drawing on all of it, draft an **initial hypothesis** about my Ikigai.

**Output format:**

**1. What I think you love** (5 specific items)
Not categories. Specifics. "The hour after dinner when you redesign your homepage" beats "design". Cite the evidence — "you mentioned this in [context]" or "your work on [project] showed this".

**2. What I think you are good at** (5 specific items)
Things other people would thank you for. Where the evidence is in your shipped work, not your self-description.

**3. What world-problem you keep circling**
The one tension you return to across unrelated conversations. Name it in one sentence. Quote a phrase I have used if you remember one.

**4. What seems to pay (or could)**
Where money actually moves around the things you love + are good at. Real markets, real buyers, not "the creator economy" or "AI".

**5. The hypothesis**
A single 2-line statement using my evidence: "Frank seems to be the [X] who [Y] for [Z], earning through [W]."

**6. Confidence and gaps**
Score your confidence /10. Name the 2-3 things you do NOT know yet that would sharpen the read.

---

**IF YOU HAVE NO MEMORY OF ME** (fresh chat, first session, no shared context), say so plainly and ask me these 5 seed questions instead:

1. Name the last time work felt like play — when was it, what were you doing?
2. What is the last sincere thank-you DM or email someone sent you about your work?
3. What problem in the world has bothered you for more than 3 years?
4. What do people pay you for today (even informally)?
5. If you had to bet money on one of the above being your real edge, which?

Then build the hypothesis from those answers.

---

**Do not flatter me.** If the evidence is thin, say "the signal is weak — let's run Module 1 to get sharper data." Honesty beats encouragement.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Read the hypothesis. Mark what feels true and what feels off. Carry both into Module 1 — the Socratic walk either confirms or breaks the hypothesis. Stay in the same chat.',
    version: '1.0',
    evalScore: 4.6,
    evalRubric: { clarity: 5, chainability: 5, specificity: 4, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: null,
    chainsTo: ['socratic-ikigai'],
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },

  // ─── Module 1 ─────────────────────────────────────────────────────
  {
    id: 'socratic-ikigai',
    module: 1,
    title: 'Walk me through my four Ikigai circles',
    subtitle: 'Interactive Socratic facilitator — works in any fresh ChatGPT, Claude, or Gemini chat. No memory or history required.',
    body: `You are a Socratic facilitator for the Ikigai mapping exercise. I am working through 4 circles:

1. **What I love** — activities where time disappears
2. **What I am good at** — what others actually thank me for (external evidence only)
3. **What the world needs** — whose problem I care about for ten years
4. **What pays** — where money is actually flowing (real invoices, real courses, real agencies — not hype)

**How to facilitate me:**
- Walk me through one circle at a time, starting with circle 1
- For each circle, ask me ONE specific question that forces a concrete answer
- If my answer is vague ("I like helping people", "marketing"), push back with a sharper follow-up — "name a Tuesday afternoon last month when time disappeared", "what is the last DM where someone thanked you?"
- Move to the next circle ONLY when my answer is specific (a named moment, person, situation, or invoice — not a category)
- After all four circles, summarize my inputs back to me in four clean bullets

**Discipline:**
- External evidence beats internal guessing. Other people's words beat mine.
- Specificity beats volume.
- "Everyone" and "people" are not answers.
- Do not skip ahead to a verdict. The facilitation IS the value — one circle, one question, one specific answer.

Start with circle 1 now. One question. Wait for my answer.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling: 'Stay in the SAME chat for Module 2 (your context carries forward), OR copy the AI\'s four-bullet summary at the end to paste into Module 2.',
  },

  // ─── Module 1.5 ─ Dream + Doubt Validator ─────────────────────────
  {
    id: 'dream-doubt-validator',
    module: 1.5,
    title: 'Validate my dreams — find real people earning a living doing this',
    subtitle:
      'Lists 5-10 things you love + want in the world. The AI returns 3 proof points per item — real people, companies, case studies. Uses web search when available, refuses to fabricate.',
    body: `Most Ikigai walks die at the doubt step: "I can't have fun AND work" / "there's no money in what I love" / "people who do this are already too far ahead."

I am going to list 5-10 things I love or want in the world. For each, I want you to **find proof that someone is already earning a real living from it**, and name one friction I should plan around (not a reason to quit — a constraint to design around).

---

**My list** (5-10 items, no filter — write whatever first comes up):

1. [PASTE]
2. [PASTE]
3. [PASTE]
4. [PASTE]
5. [PASTE]
6. [optional]
7. [optional]
8. [optional]
9. [optional]
10. [optional]

---

**For each item, return:**

**A. Three proof points** — real people, companies, products, or case studies who do this and earn a living from it. For each proof point:
- Name (person or company)
- One-line description of what they actually ship
- Where the money comes from (paid subscribers / products / clients / sponsorships / licensing — be specific)
- Source URL or named publication if you have it

**B. One friction** — the real constraint someone in this space hits in their first 2 years. Not "it's hard" — a specific friction. ("First 18 months you'll be sub-€2k/mo and the algorithm punishes inconsistency" beats "you'll have to work hard".)

**C. One adjacent angle** — a less crowded version of the same love that has stronger economics or weaker competition.

---

**Hard rules — non-negotiable:**

1. **Use web search if you have it available.** Gemini, Claude with web tool, ChatGPT with browsing, Perplexity — search before answering. Cite real sources.

2. **If you cannot find or verify a real proof point, write "needs human research" for that slot.** Do NOT invent names, do NOT invent revenue figures, do NOT cite a Substack/YouTube channel you cannot verify exists. Fabricated proof is worse than missing proof — it gives me false confidence.

3. **Money has to be real money.** "They have a popular newsletter" is not proof. "Their paid newsletter has 4k subscribers at $7/mo, disclosed in their 2024 retro" is proof. If you don't know the disclosed numbers, say so.

4. **No survivorship bias by default.** For each item, if the realistic median outcome (not the top 1%) is below median income in a developed country, say so plainly. I'd rather know.

---

Start with item 1. Walk one item at a time. After all items, give me one paragraph: which 2-3 items have the strongest proof base, and where my doubt was wrong vs right.`,
    bestIn: ['Gemini', 'Claude', 'Perplexity', 'ChatGPT'],
    outputHandling:
      'Mark each item with a confidence score (1-5). Carry the items scoring 4+ into Module 2 as your "loved AND viable" set. The friction list becomes your design constraints in Module 3.',
    version: '1.0',
    evalScore: 4.7,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 5 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['socratic-ikigai'],
    chainsTo: ['synthesize-statement'],
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },

  // ─── Module 2 ─────────────────────────────────────────────────────
  {
    id: 'synthesize-statement',
    module: 2,
    title: 'Synthesize my Ikigai into a statement',
    subtitle: 'Turns the four circles into a 2-line statement that fits on a business card.',
    body: `Based on my 4 Ikigai circles below (paste from Module 1 OR continue in the same chat), draft my Ikigai statement using this template:

If continuing same chat: use what I just told you.
If fresh chat: I'll paste my circles here →

  - What I love: [PASTE]
  - What I am good at: [PASTE]
  - What the world needs: [PASTE]
  - What pays: [PASTE]



> "I help [WHO] achieve [OUTCOME] by [HOW], using [SKILLS] in [DOMAIN]."

**Quality rules** (apply ruthlessly):
- Boring + specific beats poetic + abstract
- If a direct competitor could say my sentence verbatim, sharpen it
- Cut every abstract noun (transformation, potential, journey, empower)
- Replace adjectives with numbers, proper nouns, or named situations where possible
- The [WHO] is a single named persona, not a demographic

Give me **3 versions**, ordered from safest to most confrontational. For each, name the one trade-off it forces.

Then tell me which version I should ship and why. Be honest — if all three are weak, say so and propose a fourth that fixes the underlying issue.`,
    bestIn: ['ChatGPT', 'Claude'],
    outputHandling: 'Pick one version. Edit one word. Lock it in. Stay in the same chat for Module 3, OR copy your locked statement to paste into Module 3.',
  },

  // ─── Module 3 ─────────────────────────────────────────────────────
  {
    id: 'brand-bridge',
    module: 3,
    title: 'Build my brand positioning + audience + pillars',
    subtitle: 'Three artifacts in one prompt: positioning sentence, audience-of-one avatar, and three 12-month content pillars.',
    body: `Anchored to my Ikigai statement:

> [PASTE YOUR STATEMENT HERE]

Build three artifacts. For each, force specificity over generality.

**1. Positioning sentence**
Form: "I am the [category] for [audience] who [problem/desire]."
Rules: name a trade-off. Who am I NOT for? If the sentence could describe 100 people in my field, sharpen it.

**2. Audience-of-One avatar**
- Single named persona (e.g., "Sara, 32, senior data analyst at a mid-sized FMCG")
- Her job + the publication she reads in the morning
- The exact problem she's trying to solve THIS WEEK (specific, not abstract)
- The 3 phrases she'd type into Google to find help

**3. Three content pillars**
For each pillar:
- 1-line definition (what the pillar covers, what it explicitly does NOT)
- 5 example post titles I could write under it — varied formats
- The trap: what shallow version of this pillar would look like, so I can avoid it

Each pillar must survive 12 months of weekly publishing without me repeating myself. If you can't generate 5 distinct posts off the top, the pillar is too narrow — say so.

**At the very end, print the three pillars as one line each, ready to paste into Module 4. Format:**

\`\`\`
Pillar 1: [name] — [1-line definition]
Pillar 2: [name] — [1-line definition]
Pillar 3: [name] — [1-line definition]
\`\`\``,
    bestIn: ['ChatGPT', 'Claude'],
    outputHandling: 'Copy the three-line pillar block at the end. Paste into Module 4 (or stay in the same chat). Module 4 chains directly off it.',
  },

  // ─── Module 4a ────────────────────────────────────────────────────
  {
    id: 'generate-30-day-csv',
    module: 4,
    title: 'Generate my 30-day content plan as CSV',
    subtitle: 'Outputs a copy-paste-ready CSV. Goes straight into Notion, Sheets, or Excel.',
    body: `Anchored to:
- My Ikigai statement: [PASTE STATEMENT]
- My 3 content pillars: [PASTE PILLARS]
- My audience-of-one: [PASTE AVATAR]

Build a 30-day publishing calendar using the **3·2·1·1 rhythm**:
- 3 × Insight posts (teach a lesson from your zone)
- 2 × Build-in-Public posts (show an artifact, metric, screenshot)
- 1 × Connection post (amplify someone, intro, recommend)
- 1 × Rest day (non-negotiable)

**Output format: CSV**, exactly these columns, with header row:
\`\`\`
Day,Date,Pillar,Archetype,Channel,Title,Hook
\`\`\`

Where:
- **Day** = D1–D28
- **Date** = ISO format, starting next Monday
- **Pillar** = one of my 3 pillars (rotate)
- **Archetype** = Insight | Build-in-Public | Connection | Rest
- **Channel** = LinkedIn | Threads | Newsletter | Shorts
- **Title** = 5–8 words, specific
- **Hook** = 1 line, using one of: Contrarian Take · Story Open · Counter-Wisdom · Numbered Breakdown · Vulnerable Confession

Each row stands alone. No two posts share a hook format in the same week.

End with one sentence: "Paste into Notion as a database, or Google Sheets, or save as .csv."`,
    bestIn: ['ChatGPT', 'Claude'],
    outputHandling: 'Select all rows → copy → paste into Notion (auto-detects table), Google Sheets, or save as a .csv file directly.',
  },

  // ─── Module 4b ────────────────────────────────────────────────────
  {
    id: 'draft-monday-post',
    module: 4,
    title: 'Draft my Monday post — 3 versions',
    subtitle: 'Three drafts in different hook formats, picks the winner, explains why.',
    body: `Using my Ikigai statement and Pillar 1 below, draft 3 distinct versions of my first Monday LinkedIn post.

Anchored to:
- My statement: [PASTE STATEMENT]
- Pillar 1: [PASTE PILLAR 1]
- A real moment from last week I want to write about: [PASTE 1-2 SENTENCES]

For each version, use a different hook format from:
1. **Contrarian Take** — "Everyone says X. I think the opposite — and here is why."
2. **Story Open** — "Last [time], [vivid moment]. Here is what it taught me."
3. **Numbered Breakdown** — "[N] things I learned about Y after [proof of work]."
4. **Vulnerable Confession** — "I used to [bad pattern]. Here is what changed it."

Each version follows the anatomy:
- **Hook** (1 line) — the format you picked
- **Body** (3–5 lines) — names the specific real moment, no abstract advice
- **Close** (1 line) — a question that invites response, not a CTA

After all three, tell me **which version I should ship and why**. Be honest — if one is weak, say so.

Anti-slop rules: no "Game changer." No "Here is the thing." No "Let that sink in." No three emoji headers. No 1/n threads.`,
    bestIn: ['ChatGPT', 'Claude'],
    outputHandling: 'Pick the recommended version. Read it aloud. If you would not say this sentence to a friend, cut the offending phrase. Then ship.',
  },

  // ─── Module 5 ─ Map AI Companions ─────────────────────────────────
  {
    id: 'map-ai-companions',
    module: 5,
    title: 'Pick my primary AI companion + my pairing',
    subtitle:
      'Looks at your Module 3 audience + Module 4 rhythm, returns the one AI you should live in daily plus a pairing for what it can\'t do.',
    body: `Based on what I've built so far in this workshop, recommend my primary AI companion and one pairing.

Anchored to:
- My audience-of-one: [PASTE FROM MODULE 3]
- My 3 content pillars: [PASTE FROM MODULE 3]
- My 30-day rhythm (channels + cadence): [PASTE TOP 5 ROWS FROM MODULE 4a]
- My constraints (budget per month for AI / time per day / privacy needs): [TELL ME]

---

**The candidates** (as of mid-2026):

| AI | Strongest at | Weakest at | Typical pricing tier |
|---|---|---|---|
| **ChatGPT (GPT-5/o-series)** | Long-context drafting, multi-tool agents, Connectors to Notion/Drive, GPT Image, voice mode | Native source-citing, real-time facts without browsing | $20-200/mo |
| **Claude (Sonnet/Opus)** | Voice/tone matching, long-form writing, code, taste, MCP integrations | Image gen (none native), real-time browsing limited | $20-100/mo |
| **Gemini (2.5 / 3 Pro)** | Real-time Google search, multimodal grounding, video understanding, Workspace integration | Voice/tone consistency, opinionated drafting | $0-20/mo |
| **Grok** | Live X/Twitter feed, contrarian framing, less safety filtering | Reliability, source quality, structured output | $8-30/mo |
| **Perplexity** | Cited research, structured answers, source-first | Long-form drafting, voice matching | $0-20/mo |

---

**Return:**

**1. Your primary companion is [X]** — pick one. State the single reason in one sentence, tied to my actual audience + rhythm above. Not features in the abstract — features that solve my specific Module 4 jobs.

**2. The job it does for you daily**
Name 3-5 recurring tasks from my 30-day calendar this AI will do, and the workflow.

**3. Pair it with [Y] for [job]**
One pairing AI for the job your primary is weakest at. State the specific handoff (e.g., "Draft in Claude, fact-check + cite in Perplexity before publishing").

**4. The wrong move**
Name the trap — the AI I should NOT pick despite the marketing, and why for my specific situation it would slow me down.

**5. The 30-day test**
A concrete check: "If by day 30 you are still copy-pasting between 3+ tools instead of living in your primary, you picked wrong. Switch."

---

Be opinionated. Don't hedge. If two are tied, name the tiebreaker that decides it.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Open the primary companion in your browser. Paste your Module 4 calendar in. Run the first daily workflow it recommended — today. If it doesn\'t feel like home in 7 days, switch to the pairing.',
    version: '1.0',
    evalScore: 4.4,
    evalRubric: { clarity: 5, chainability: 5, specificity: 4, voice: 5, safety: 4 },
    redTeamStatus: 'pass-with-note',
    redTeamNotes:
      'Candidate table is dated mid-2026 — refresh quarterly or it ages out.',
    voiceGate: 'clean',
    chainsFrom: ['brand-bridge', 'generate-30-day-csv'],
    chainsTo: ['ship-live-artifact'],
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },

  // ─── Module 6 ─ Ship Live Artifact ────────────────────────────────
  {
    id: 'ship-live-artifact',
    module: 6,
    title: 'Ship my live artifact AT the workshop — post + 60-sec video script',
    subtitle:
      'Drafts your real Monday post live, gets feedback, finalizes. Then converts it into a 60-second video script you can record on your phone in the lobby.',
    body: `Right now, in this workshop, I am going to ship one real artifact. A LinkedIn post I will publish today.

Anchored to:
- My Ikigai statement: [PASTE FROM MODULE 2]
- Pillar I'm leading with: [PASTE ONE PILLAR FROM MODULE 3]
- My primary AI companion from Module 5: [NAME]
- One real moment from the last 7 days I want to write about: [PASTE 1-3 SENTENCES]

---

**Round 1 — Draft**

Write the post. Anatomy:
- **Hook** (1 line) — pick the hook format that best fits this specific moment
- **Body** (3-5 lines) — name the specific moment, the specific person involved if relevant, the specific lesson. No abstract advice.
- **Close** (1 line) — a question that invites a real response

Anti-slop: no "Game changer". No "Here's the thing". No "Let that sink in". No "1/n" threads. No three-emoji headers.

---

**Round 2 — Stress test**

Now do this BEFORE I see your draft:

Read your own draft aloud in your head. Find the one sentence that sounds like a model wrote it (the one that's generic, abstract, or could have been written by anyone in my field). Rewrite that sentence to be specific to my situation only.

Then show me the final draft.

---

**Round 3 — Short-form conversion**

Convert the final post into a **60-second video script** I can record on my phone in the next 10 minutes. Format:

\`\`\`
[00:00-00:08] Hook — say it like you mean it. One line.
[00:08-00:25] Setup — name the specific moment. Time, place, who was there.
[00:25-00:45] Insight — the lesson. Concrete language only.
[00:45-00:58] Turn — what changed in how I work because of this.
[00:58-01:00] Question — to camera. Wait for response.
\`\`\`

Style notes:
- Conversational, not presentational. I'm not on stage.
- One idea. Don't try to fit 3 lessons in 60 seconds.
- The first 8 seconds decide whether anyone watches the rest.

---

**Output:**
1. Final post (ready to paste to LinkedIn)
2. 60-second script (ready to record in landscape on a phone, captions auto-generated by the platform)
3. One sentence telling me what I should do RIGHT NOW after I close this chat — paste, record, or both.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Paste the post to LinkedIn — do not save it for "Monday." Record the 60-sec on your phone — landscape, daylight, no editing required. Both go live before you leave the room. The artifact is the proof.',
    version: '1.0',
    evalScore: 4.5,
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
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },

  // ─── Module 7 ─────────────────────────────────────────────────────
  {
    id: 'lock-commitment',
    module: 7,
    title: 'Lock my 30-day commitment + draft my accountability text',
    subtitle: 'Schedules the 4 artifacts and writes the SMS you send to one human right now.',
    body: `I commit to shipping these 4 artifacts in the next 30 days, anchored to my Ikigai statement and pillars (above):

- 1 LinkedIn post (Pillar: [PASTE])
- 1 short video (45–90 sec, captions on, pillar in title)
- 1 conversation (DM or email to my audience-of-one)
- 1 small product (template, checklist, mini-guide, or one-page PDF)

**Help me:**

1. **Schedule each artifact on a fixed cadence: 72 hours, day 14, day 21, day 30.** Calendar-style: "Tue May 20 (72h) — LinkedIn post #1 (Pillar 1, Insight archetype)". The fixed cadence beats spreading-by-feel — it forces the first artifact before motivation fades.

2. **Write the SMS I should send to one human RIGHT NOW** to lock the commitment publicly. The text should:
   - Name what I'm doing (the 4 artifacts)
   - Name the deadline (30 days from today)
   - Ask them to check in with me on day 7 and day 30
   - Be 3-4 sentences max
   - Sound like me texting a friend, not a press release

Output both. Schedule first, then the SMS in a fenced code block I can copy.`,
    bestIn: ['ChatGPT', 'Claude'],
    outputHandling: 'Save the schedule somewhere visible (Notion / Calendar / kitchen fridge). Then actually send the SMS — public commitment is what makes this stick.',
  },

  // ─── Module 8 ─ Brand Launch Kit (image-gen prompts) ──────────────
  {
    id: 'ikigai-wallpaper-prompt',
    module: 8,
    title: 'Generate my Ikigai wallpaper prompt — for NB2 / GPT-Image / Sora',
    subtitle:
      'Returns a clean prompt string you paste into Nano Banana 2, GPT-Image-2, or Sora. Phone, desktop, and square aspect ratios.',
    body: `I want an Ikigai wallpaper — a phone background and desktop background that reminds me daily of my statement.

You will NOT generate the image. You will write the **prompt string** I paste into Nano Banana 2 (or GPT-Image-2, Sora, Midjourney).

Anchored to:
- My Ikigai statement: [PASTE FROM MODULE 2]
- My 3 pillars: [PASTE FROM MODULE 3]
- My audience-of-one in one phrase: [PASTE]
- A dominant emotional tone I want this wallpaper to carry (calm / determined / playful / sharp / warm / etc.): [TELL ME ONE WORD]

---

**Build the prompt string using this anatomy:**

1. **Style anchor** — Japanese minimalism, ink-on-paper aesthetic, sumi-e influence. Generous negative space. Single focal element.

2. **The kanji** — 生き甲斐 (ikigai) as a compositional anchor. Place it deliberately (top-right brush, bottom-left signature stamp, center watermark). Not decorative — anchored.

3. **The visual metaphor** — one object or scene that compresses my statement into an image. NOT four-circle Venn diagrams. NOT abstract gradients. One specific object, scene, or moment that means my statement to me.

4. **Color palette** — derive from my emotional tone word. Name 3 hex codes max. No rainbow. No "vibrant gradient."

5. **Composition rules** — rule of thirds, negative space ≥ 60% of frame, focal element off-center, no text crowding.

6. **Format the output as three prompt strings**, one per aspect ratio, ready to paste:

\`\`\`
WALLPAPER — PHONE (9:16)
[full prompt string here, ~80-120 words]

WALLPAPER — DESKTOP (16:9)
[full prompt string here, ~80-120 words]

WALLPAPER — SQUARE / SOCIAL (1:1)
[full prompt string here, ~80-120 words]
\`\`\`

---

**Rules for the prompt strings you write:**

- Image-model-friendly: comma-separated descriptors, specific nouns over abstract adjectives
- Specify medium ("ink on aged washi paper", "matte digital painting", "high-contrast photography")
- Specify mood with concrete language, not "feeling of awakening" — say "morning light through one window, no other light source"
- No banned brand words ("groundbreaking", "transformative", etc. — even in the image prompt)
- End each string with: \`--ar 9:16 --no text --style raw\` (or aspect-ratio equivalent for the model)

---

**Final line of output:**
> Paste the matching string into Nano Banana 2, GPT-Image-2, Sora, or Midjourney. Generate 4. Keep the one that you'd actually use as a lock screen for 30 days.`,
    bestIn: ['Claude', 'ChatGPT', 'Gemini'],
    outputHandling:
      'Open your image-gen tool of choice (NB2, GPT-Image, Sora, Midjourney). Paste the 9:16 string first. Generate 4 variants. Set it as your lock screen TODAY. The desktop version goes on your laptop tonight.',
    version: '1.0',
    evalScore: 4.3,
    evalRubric: { clarity: 5, chainability: 4, specificity: 4, voice: 5, safety: 4 },
    redTeamStatus: 'pass',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact'],
    chainsTo: null,
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },

  {
    id: 'content-calendar-visual-prompt',
    module: 8,
    title: 'Visualize my 30-day calendar as a wall poster',
    subtitle:
      'Takes your M4a CSV and returns an image-gen prompt for a calendar poster or "month in review" social card.',
    body: `I want to visualize my 30-day content calendar as one image — pinnable to my wall, postable as a "this is what I'm shipping this month" social card.

You will NOT generate the image. Write the **prompt string** for Nano Banana 2 / GPT-Image-2 / Sora / Midjourney.

Anchored to:
- My 30-day CSV from Module 4a: [PASTE CSV HERE]
- My 3 pillars (color-code each): [PASTE]
- My visual mood from the wallpaper prompt, if you ran it (otherwise: pick one): [WORD]

---

**Build the prompt string for two formats:**

**Format A — Wall poster (portrait, A2-ish)**
A printable poster I can pin above my desk.
- Calendar grid: 4 rows × 7 columns, days labelled D1-D28 (or actual ISO dates)
- Each day cell: pillar color block, archetype glyph (Insight/Build/Connection/Rest), 3-word post title
- Header: my Ikigai statement, max 80 chars, in restrained type
- Footer: month + year + my name + the 3·2·1·1 rhythm legend
- Style: Swiss-grid editorial design. Helvetica or Inter. White ground. Tight color palette.
- No emoji. No gradients. No drop shadows.

**Format B — Social card (square 1:1)**
A "this is what I'm shipping" announcement post.
- Headline: "30 days of [my Pillar 1 word]" — large type, top third
- Subhead: my Ikigai statement, one line
- Visual centerpiece: simplified calendar dot-grid (28 dots, color-coded by pillar)
- Bottom strip: my name, my handle, the start date
- Style: same restraint as Format A. Editorial, not decorative.

---

**Output the two prompt strings ready-to-paste, ~100-150 words each:**

\`\`\`
CALENDAR POSTER — A2 PORTRAIT (2:3)
[prompt string]

CALENDAR SOCIAL CARD — SQUARE (1:1)
[prompt string]
\`\`\`

---

**Rules for the prompt strings:**

- Specify "editorial layout", "Swiss design", "grid-based composition" explicitly
- Specify type system ("Inter Display tight", "Söhne Mono for labels", etc.)
- Specify exact hex codes (3 max) for pillar colors
- Forbid: drop shadows, gradients, emoji, faux-3D, "modern abstract art"
- End each with format flags appropriate to the tool

---

**Final line:**
> Paste the poster string into your image tool. Iterate up to 3 times if text gets garbled (image models still mangle long text — keep cells short). When good, print the poster at A2, pin it above your desk where you'll see it daily.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Paste the prompt into NB2 or GPT-Image-2. Generate. If text legibility fails, regenerate or fall back to a hand-edit in Figma using the same color palette. Print the poster at A2. Post the social card the day you start your 30 days.',
    version: '1.0',
    evalScore: 4.2,
    evalRubric: { clarity: 5, chainability: 5, specificity: 5, voice: 5, safety: 3 },
    redTeamStatus: 'pass-with-note',
    redTeamNotes:
      'Image models in mid-2026 still mangle small text inside grids. Figma fallback recommended. Consider Remotion template as deterministic companion in W22.',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact', 'generate-30-day-csv'],
    chainsTo: null,
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },

  {
    id: 'photo-scribbled-mission-prompt',
    module: 8,
    title: 'Annotate my selfie with my scribbled mission',
    subtitle:
      'Returns an image-gen prompt that overlays handwritten annotations around your photo — mission, audience, pillars, problem. Brand-launch visual.',
    body: `I want a brand-launch visual: my actual photo, with hand-drawn / scribbled annotations around me — my mission, my audience-of-one, the world-problem I solve, my three pillars.

You will NOT generate the image. You will write the **prompt string** I paste into a tool that takes a reference photo (Nano Banana 2, GPT-Image-2 with image input, or Midjourney with --cref).

---

**My inputs:**
- I will upload my selfie separately to the image tool
- My Ikigai statement (1 line, max 80 chars): [PASTE]
- My audience-of-one in one phrase: [PASTE]
- The world-problem I keep circling (1 line): [PASTE]
- My 3 pillars (one word each): [PASTE]

---

**Build the prompt string with this anatomy:**

1. **Photo placement** — "Subject photo unchanged at center, retain face and likeness identity. Photo occupies 50-60% of frame, centered or slight-right."

2. **Annotation style** — Notebook scribble. Ballpoint pen or fine-tip marker. Lowercase handwriting, slightly tilted, casual. Like a Moleskine page where someone sketched out their plan. NOT calligraphy. NOT marker on whiteboard. NOT graphic design lettering.

3. **Sticky-note aesthetic optional** — small post-it style annotations welcome, but never overpowering the photo.

4. **Annotation positions** (be explicit):
- Top-left: my Ikigai statement, underlined twice
- Top-right: my audience-of-one ("for: [name]"), with an arrow pointing toward my chest
- Bottom-left: the world-problem ("the problem: [phrase]")
- Bottom-right: 3 pillars stacked, each in a different ink color (still pen-ink, not marker)
- Around my head: 2-3 small connecting arrows / asterisks / underlines — natural notebook marginalia

5. **Background** — keep the original photo background, OR replace with: aged notebook paper texture, slight grid lines, coffee ring optional. Pick one and commit.

6. **Mood** — like a working journal page, not a graphic poster. Imperfect. Specific. Mine.

---

**Output one prompt string ready-to-paste, ~120-180 words:**

\`\`\`
PHOTO + SCRIBBLED MISSION (4:5 portrait or 1:1 square)
[prompt string here]
\`\`\`

---

**Rules for the prompt string:**

- Use phrases like "preserve subject's facial identity from reference image", "handwritten annotations in ballpoint pen", "natural ink imperfection"
- Forbid: graphic design lettering, vector overlays, Canva-style icons, drop shadows, gradient overlays, neon, sparkles, sci-fi UI overlays, "futuristic HUD"
- Specify aspect ratio: 4:5 for LinkedIn / Instagram portrait, or 1:1 for square
- End with model-appropriate flags + a "use reference image" instruction for the model

---

**Final line:**
> Upload your photo to NB2 or GPT-Image-2 (image-input mode). Paste this prompt. Generate 4. The winner becomes your LinkedIn banner, your speaker-photo, your About-page hero, your conference badge for Madrid. One visual, six surfaces.`,
    bestIn: ['Claude', 'ChatGPT'],
    outputHandling:
      'Upload your selfie to NB2 or GPT-Image-2 image-input mode. Paste the prompt. Generate 4 variants. Pick the one that looks like you on a real Tuesday, not the polished version. Use it on LinkedIn, About page, speaker bios, and your Madrid badge.',
    version: '1.0',
    evalScore: 4.4,
    evalRubric: { clarity: 5, chainability: 4, specificity: 5, voice: 5, safety: 3 },
    redTeamStatus: 'pass-with-note',
    redTeamNotes:
      'Identity preservation is model-dependent. If likeness drifts, re-run with reference-weight increased.',
    voiceGate: 'clean',
    chainsFrom: ['ship-live-artifact'],
    chainsTo: null,
    tested: false,
    author: 'prompt-hub-design-flow',
    createdAt: '2026-05-18',
    lastModified: '2026-05-18',
  },
]

/**
 * AI connector instructions — three paths from prompt output to
 * a usable artifact in the user's tool of choice. Module 4 surface.
 */
export interface ConnectorPath {
  label: string
  /** Brand color accent */
  color: 'emerald' | 'violet' | 'amber'
  badge: string
  steps: string[]
  url?: string
}

export const CONNECTOR_PATHS: ConnectorPath[] = [
  {
    label: 'ChatGPT → Notion / Google Drive',
    color: 'emerald',
    badge: 'Plus tier',
    steps: [
      'In ChatGPT, click your profile → Settings → Connectors',
      'Toggle on Notion (or Google Drive)',
      'Tell the AI: "Save this calendar as a Notion database in my workspace"',
      'It writes directly to Notion — no copy-paste',
    ],
    url: 'https://help.openai.com/en/articles/9858144-using-connectors-in-chatgpt',
  },
  {
    label: 'Claude → Notion via MCP',
    color: 'violet',
    badge: 'Pro / Max',
    steps: [
      'In Claude.ai, open Settings → Integrations',
      'Add the Notion MCP server',
      'Claude can now read + write your Notion pages',
      'Same prompt: "Save this calendar as a Notion database"',
    ],
    url: 'https://www.anthropic.com/news/integrations',
  },
  {
    label: 'No subscription — CSV fallback',
    color: 'amber',
    badge: 'Free',
    steps: [
      'Use the CSV prompt above',
      'Copy the output rows from the AI chat',
      'Notion: New page → /database → paste',
      'Or Google Sheets: File → Import → paste CSV',
    ],
  },
]
