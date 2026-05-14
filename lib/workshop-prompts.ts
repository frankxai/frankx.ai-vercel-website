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
  /** Module this prompt belongs to (1-7) */
  module: number
  /** Card title — short, action-shaped */
  title: string
  /** One-line subtitle explaining what the prompt does */
  subtitle: string
  /** The prompt text to copy. Use double-quoted placeholders for fill-ins. */
  body: string
  /** AI brains this prompt works well in */
  bestIn: ('ChatGPT' | 'Claude' | 'Gemini' | 'Grok' | 'Perplexity')[]
  /** 1-2 sentences telling the user what to do with the output */
  outputHandling: string
}

export const WORKSHOP_PROMPTS: WorkshopPrompt[] = [
  // ─── Module 1 ─────────────────────────────────────────────────────
  {
    id: 'mine-history',
    module: 1,
    title: 'Mine my chat history for Ikigai inputs',
    subtitle: 'Lets the AI pull evidence from your existing chats instead of asking you to remember everything from scratch.',
    body: `You have access to my full chat history with you and any connected memory.
I am building my Ikigai map. Based on patterns in my chats over the last 12 months,
identify with chat-snippet evidence:

1. **What I love** — 3 activities where I lost track of time. Cite the chat where I described it.
2. **What I am good at** — 3 things people thanked me for, asked me to do again, or recommended me for. External evidence only — other people's words, not mine.
3. **What the world needs** — 1–2 problems I keep returning to think about, six months running.
4. **What pays** — 1–2 spaces where money is flowing that overlap with the above. Real invoices, courses, agencies, SaaS — not hype.

Format your answer as four labeled sections. Under each, list the evidence with the chat snippet in quotes.

After all four, ask me ONE Socratic follow-up question that would tighten the weakest input. Push past generic. Specificity beats volume.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling: 'Read each section. Sit with the evidence. The Ikigai statement in Module 2 chains directly off this.',
  },

  // ─── Module 2 ─────────────────────────────────────────────────────
  {
    id: 'synthesize-statement',
    module: 2,
    title: 'Synthesize my Ikigai into a statement',
    subtitle: 'Turns the four circles into a 2-line statement that fits on a business card.',
    body: `Based on the 4 Ikigai circles I just identified (and any context from this chat or my history), draft my Ikigai statement using this template:

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
    outputHandling: 'Pick one. Edit one word. Lock it in. Paste it as the anchor in Module 3 prompts.',
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

Each pillar must survive 12 months of weekly publishing without me repeating myself. If you can't generate 5 distinct posts off the top, the pillar is too narrow — say so.`,
    bestIn: ['ChatGPT', 'Claude'],
    outputHandling: 'Save the three pillars — Module 4 chains off them. The audience-of-one is who you write every post for.',
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

1. **Schedule each artifact on a specific date** in the next 30 days. Spread them across the month. Calendar-style: "Mon May 19 — LinkedIn post #1 (Pillar 1, Insight archetype)".

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
