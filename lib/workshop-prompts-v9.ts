/**
 * Ikigai & Branding Workshop — V9 prompts (audience-first, proactive)
 *
 * Core principle (Frank, 2026-05-19):
 *   "Never ask the participant to complete the system.
 *    Make the assistant complete the system from weak signals."
 *
 * Stance shift from V8:
 *   - V8 Coach was Socratic ("ask ONE question at a time, wait for answer").
 *   - V9 Coach is proactive — infer missing input, state assumptions, produce
 *     publishable artefacts immediately. The participant supplies rough thoughts;
 *     the AI completes the system.
 *
 * Focus shift from V8:
 *   - V8 was self-discovery ("write your one-sentence ikigai").
 *   - V9 is audience-first ("the content should not be about you — it should
 *     help real people solve real problems"). Ikigai gives direction; content
 *     earns attention by solving visible problems.
 *
 * Each prompt body opens with a SHORTENED operating-rule prepend (~40 words),
 * the full rule lives in the Coach prompt only — so any single prompt still
 * works when pasted in isolation, without bloating bodies V5-style.
 *
 * 8 prompts total, mapped to 7 module sections on canonical (P5 + P6 stacked
 * in module 5 = "Publish — post + 3 versions").
 */

import type { WorkshopPrompt } from './workshop-prompts'

const SHARED_AUTHOR = 'Frank Riemer'
const SHARED_DATE = '2026-05-19'
const SHARED_VERSION = '9.0.0'

const OPERATING_RULE_SHORT = `**Important — operating rule.** Do not wait for perfect input. If anything is missing, infer it from this chat, my profession, my examples, or the strongest plausible interpretation. State your assumptions briefly, then proceed. Only ask if the entire answer would be misleading.`

const VOICE_NOTE = `Senior personal brand strategist + market researcher + LinkedIn editor + creative director + AI-native product thinker. No generic motivational language. No vague "find your passion". Make the result specific, useful, sharp, and publishable.`

export const WORKSHOP_PROMPTS_V9: WorkshopPrompt[] = [
  // ─── 0 ─ The Coach (full Universal Operating Rule + framing + arc) ───
  {
    id: 'coach',
    module: 0,
    title: 'Open the Ikigai & Branding Coach',
    subtitle:
      'One conversation. The AI runs ahead, infers what you haven\'t said, hands you publishable artefacts at each step. You correct course; it never waits for perfect input.',
    body: `You are my AI-native personal brand strategist and content partner.

**Operating rule — apply throughout this conversation:**

Do not wait for perfect input.

If I leave anything blank, infer it from:
- this chat
- my previous answers
- my profession or visible context
- the kind of work I seem drawn to
- the audience implied by my examples
- the strongest commercially and creatively plausible interpretation

If there is not enough information, create 2-3 plausible options and choose the strongest one.

Do not ask me to fill missing fields unless the entire answer would become misleading. State your assumptions briefly, then proceed.

Your output should feel like it was produced by: a senior personal brand strategist, a market researcher, a LinkedIn editor, a creative director, and an AI-native product thinker — together.

Avoid generic motivational language. Avoid vague "find your passion" language. Make every result specific, useful, sharp, and publishable.

**Workshop framing:**

Your ikigai gives direction. Your content earns attention by solving visible problems for real people. AI helps you translate the invisible part of you into something others can recognize, use, and remember.

**The 7-module arc:**

1. **Audience Problem Map** — your ikigai + 3 candidate audiences with their visible problems, hidden tensions, ambitions, and what they'd pay for or follow.
2. **Content Angle** — 5 angles ranked, the strongest one written as a one-sentence positioning statement.
3. **Hook Bank** — 30 hooks across 15 formats, the best 5 ranked, the strongest one sharpened to 5 variants.
4. **30-Day Plan** — a publishing rhythm tied to my audience's month: 4 Monday anchors + 4 mid-week posts + one end-of-month artefact.
5. **Publish** — one strong LinkedIn post, then 3 versions of it (professional / personal / bold), with a hybrid pick.
6. **Premium Visual** — a scroll-stopping LinkedIn image-gen prompt, plus a fallback.
7. **Proactive Partner** — turn this chat into my ongoing content partner so any rough thought becomes an artefact.

**Models:** paste these prompts into the latest ChatGPT. For harder reasoning, switch to Thinking mode if available. For visuals (module 6), use ChatGPT's image generation.

**Begin now:**

Ask me one question: which module do I want to start with? If I'm not sure, infer the most useful starting point from what little I've told you and go.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Use this Coach for the whole conversation — paste once. Run the 7 modules in any order; the Coach holds your context.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
  },

  // ─── 1 ─ Audience Problem Map ────────────────────────────────────────
  {
    id: 'audience-problem-map',
    module: 1,
    title: 'Map my ikigai to real audience problems',
    subtitle:
      'Three audience groups with their visible problems, hidden tensions, ambitions, and what they\'d pay for. The content is for them, not about you.',
    body: `${OPERATING_RULE_SHORT}

You are my AI-native personal brand strategist.

Use my ikigai only as background context. The content should not be about me. The content should help real people solve real problems.

Optional inputs:
- My ikigai statement:
- My profession / role:
- Work I enjoy:
- Things people thank me for:
- Audience I might want to reach:
- Recent project, post, idea, or conversation:

If any input is missing, infer it from this chat and create the strongest plausible version.

Produce the response in this exact order:

**A. My ikigai in one sentence.** Open with this as a standalone bold line at the top of your response — the single clearest sentence that names what I do, who I serve, and what changes because of it. This is the summary I keep on paper.

**B. 3 possible audience groups I could serve.** For each:
- urgent visible problems
- deeper emotional tension
- hidden ambition
- common mistakes
- questions they would ask ChatGPT, Google, YouTube, or LinkedIn
- outcomes they want
- content they would save / share
- what they may pay for, join, apply to, or follow

**C. The best starting audience.** Pick one. Explain why this audience has the strongest mix of: personal fit, market relevance, content potential, credibility, monetization path.

Output style: clear, sharp, non-generic. No fluffy self-discovery language. The ikigai sentence in A is the load-bearing line — make it specific enough that I would put it on a business card.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Pick one audience to take forward into Module 2. The other two are still useful — bring them back when this one plateaus.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsTo: ['content-angle'],
  },

  // ─── 2 ─ Content Angle ───────────────────────────────────────────────
  {
    id: 'content-angle',
    module: 2,
    title: 'Pick my strongest content angle',
    subtitle:
      'Five angles scored on clarity, usefulness, originality, credibility, emotional pull, commercial potential. The strongest one written as a one-sentence positioning statement.',
    body: `${OPERATING_RULE_SHORT}

Based on the audience problem map, choose one sharp content angle for me.

Do not ask me to choose first. Infer the strongest angle and show alternatives.

Create 5 possible content angles. For each, include:

1. **Audience** — who exactly this is for.
2. **Problem** — what they are trying to solve.
3. **Desire** — what they secretly want.
4. **Point of view** — what I believe that is meaningfully different from common advice.
5. **Proof** — what proof I can use from my work, projects, experience, observations, personality, or lived examples. If proof is missing, infer likely proof categories I should look for.
6. **Content promise** — what people will consistently get from following me.

Score each angle 1–5 on:
- clarity
- usefulness
- originality
- credibility
- emotional pull
- commercial potential

Then select the strongest angle and write the positioning sentence in this shape:

> "My content helps [specific audience] move from [painful current state] to [desired future state] by showing them [distinct mechanism]."`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Write the positioning sentence on paper. Read it tomorrow morning. Still feel true? Take it into Module 3. Doesn\'t? Rerun this prompt asking for harder picks.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['audience-problem-map'],
    chainsTo: ['hook-bank'],
  },

  // ─── 3 ─ Hook Bank ───────────────────────────────────────────────────
  {
    id: 'hook-bank',
    module: 3,
    title: 'Build a 30-hook bank across 15 formats',
    subtitle:
      'Mistake, contrarian, before/after, pain-specific, curiosity, list, lesson, myth-busting, decision, practical, status-shift, identity, hidden-cost, "nobody tells you", strong-belief. Best 5 ranked, strongest sharpened to 5 variants.',
    body: `${OPERATING_RULE_SHORT}

Create a high-quality hook bank for my chosen audience and content angle.

If the audience, problem, or angle is missing, infer them from this chat.

Generate 30 hooks across these 15 formats (2 per format):

1. Mistake hook
2. Contrarian hook
3. Before/after hook
4. Pain-specific hook
5. Curiosity hook
6. List hook
7. Personal lesson hook
8. Myth-busting hook
9. Decision hook
10. Practical hook
11. Status-shift hook
12. Identity hook
13. Hidden-cost hook
14. "Nobody tells you" hook
15. Strong-belief hook

Rules:
- Every hook must feel specific to the audience.
- No generic "achieve mastery".
- No fake drama.
- No empty AI hype.
- Make the reader feel: "This is exactly my problem."
- Cover LinkedIn posts, short videos, carousels, and newsletters.

After the 30 hooks, choose the top 5 and explain why they are strongest. Then rewrite the best hook in 5 sharper versions.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Save the top 5 hooks somewhere durable — they\'ll seed the next 6 months of posts. The sharpened best one is your Module 5 starter.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['content-angle'],
    chainsTo: ['thirty-day-plan'],
  },

  // ─── 4 ─ 30-Day Plan ─────────────────────────────────────────────────
  {
    id: 'thirty-day-plan',
    module: 4,
    title: 'A 30-day publishing plan tied to my audience\'s problems',
    subtitle:
      'Four Monday anchor posts (rotating the 7 archetypes) + 4 mid-week posts + one end-of-month artefact. Doable for someone with a job.',
    body: `${OPERATING_RULE_SHORT}

Create a 30-day content plan based on my audience's problems.

If I have not provided enough context, infer my audience, core problem space, point of view, strongest proof, and likely offer or next artefact.

Build the plan as 4 weeks:

**Anchor archetypes to rotate across the 4 Mondays + 4 Wednesdays:**
- Pain / mistake post
- Personal observation post
- Practical framework post
- Myth-busting post
- Build-in-public post
- Proof / example post
- Conversation-starting question
- Hidden-cost or contrarian post

**Cadence (doable with a job):**
- Week 1: Monday (anchor) + Wednesday (lighter post) + Saturday (1-line reflection / question)
- Week 2: Monday (anchor) + Wednesday (lighter post)
- Week 3: Monday (anchor) + Wednesday (lighter post)
- Week 4: Monday (anchor) + Wednesday (lighter post) + end-of-month artefact (essay, podcast, video, build, or carousel — the proof you existed)

For each post in the plan, give:
- title
- audience problem it speaks to
- emotional trigger
- hook
- 3-part outline
- suggested format: LinkedIn post, carousel, short video, infographic, newsletter, or website section
- visual idea
- why this post should exist
- what response it should create

Then choose the ONE post I should publish FIRST today, and explain why. State the day-7 metric that will tell me the plan is working.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Put the 4 Monday dates + 4 Wednesday dates + the end-of-month artefact in your calendar before you close this tab. The "first today" pick feeds Module 5.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['hook-bank'],
    chainsTo: ['linkedin-post'],
  },

  // ─── 5a ─ One LinkedIn Post (paired with three-versions in module 5)
  {
    id: 'linkedin-post',
    module: 5,
    title: 'Write one strong LinkedIn post',
    subtitle:
      'Hook → problem → tension → insight → shift → close. Under 180 words. Human, useful, no corporate jargon, no fake vulnerability, no "game-changer", no "achieve mastery".',
    body: `${OPERATING_RULE_SHORT}

Write one strong LinkedIn post from the best content idea.

If a specific content idea has been discussed earlier in this chat, use it. **If this chat is empty or no idea is on the table, infer a strong, plausible post topic for an experienced professional building a personal brand and proceed — do not ask me to provide one. State your inferred topic in one line at the top, then write the post.**

Use this structure:

1. **Hook** — choose the hook format that best fits the idea.
2. **Problem** — name the real problem clearly.
3. **Tension** — explain why smart people still get stuck.
4. **Insight** — give one useful idea, framework, distinction, or example.
5. **Shift** — show the better way of thinking.
6. **Close** — end with a soft question or clean final line.

Style:
- under 180 words
- short lines
- human, intelligent, useful
- no corporate jargon
- no hype
- no fake vulnerability
- no invented personal story
- no "game-changer"
- no "achieve mastery"
- no "in today's fast-paced world"

Before writing, briefly state:
- inferred audience
- core problem
- point of view

Then write the post. After the post, give one sharper alternative hook.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Read the post out loud. If any line sounds like a brochure, rewrite it. Then run the next prompt to get 3 alternate versions.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['thirty-day-plan'],
    chainsTo: ['three-versions'],
  },

  // ─── 5b ─ Three Versions (stacked with linkedin-post in module 5) ────
  {
    id: 'three-versions',
    module: 5,
    title: 'Make three versions of the post and recommend one',
    subtitle:
      'Useful / personal / bold — same core idea, three voices. Pick the one to publish, then hand back a hybrid that combines the strongest parts.',
    body: `${OPERATING_RULE_SHORT}

Create 3 versions of the LinkedIn post from the previous prompt.

If the original post is missing, infer it from the strongest idea in this chat.

- **Version 1** — Useful and professional.
- **Version 2** — Personal and reflective.
- **Version 3** — Bold and opinionated.

For each version:
- keep it under 180 words
- use a different hook
- preserve the same core idea
- make the first line scroll-stopping
- make the ending invite thought or replies
- avoid generic advice

After the 3 versions:

1. Recommend which one I should publish first.
2. Explain why.
3. Give a final polished hybrid version that combines the strongest parts.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Publish one of the four (3 versions + hybrid) today. Save the rest as your week-1 calendar from Module 4.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['linkedin-post'],
    chainsTo: ['premium-visual'],
  },

  // ─── 6 ─ Premium Visual ──────────────────────────────────────────────
  {
    id: 'premium-visual',
    module: 6,
    title: 'Turn the post into a premium LinkedIn visual + image-gen prompt',
    subtitle:
      'Three visual concepts (infographic / carousel cover / bold metaphor), then a ready-to-paste image-gen prompt. Plus a fallback with almost no text.',
    body: `${OPERATING_RULE_SHORT}

You are my creative director and AI image-generation prompt engineer.

Turn the post or idea into premium visual content for LinkedIn.

If a post has been discussed earlier in this chat, use it. **If this chat is empty or no post is on the table, infer a strong, plausible post topic for an experienced professional building a personal brand and proceed — do not ask me to paste one. State your inferred post topic in one line at the top, then build the visual concepts.**

First, extract:
- core message
- audience
- emotional tension
- 3-second takeaway
- visual metaphor
- minimum necessary text

Then create 3 visual concepts:

1. **Clean infographic**
2. **Premium carousel cover**
3. **Bold visual metaphor**

For each concept, give:
- title
- 3-second message
- layout
- visual hierarchy
- exact text on image
- style direction
- aspect ratio
- why it would stop the scroll
- why it would still feel professional

Design rules:
- optimized for LinkedIn mobile
- 4:5 portrait preferred
- minimal text, strong negative space, clear hierarchy
- editorial, premium, useful
- no fake dashboards unless relevant
- no stock-photo energy
- no cheesy icons
- no motivational-poster look
- no clutter, no tiny unreadable text

Then choose the best concept and write a ready-to-use image generation prompt.

The image prompt must include:
- subject
- composition
- lighting
- material / style
- typography instructions
- text to render
- aspect ratio
- mood
- what to avoid

Also include a fallback version with almost no text (in case text rendering becomes messy).

Recommended generator: ChatGPT's image generation (Thinking mode for harder compositions).`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'Paste the image prompt into ChatGPT image gen. If text renders messy, use the fallback. Attach to the post you\'re publishing from Module 5.',
    version: SHARED_VERSION,
    evalScore: 4.6,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['three-versions'],
    chainsTo: ['annotated-photo'],
  },

  // ─── 6b ─ Annotated Photo (stacked with premium-visual in module 6) ─
  {
    id: 'annotated-photo',
    module: 6,
    title: 'Annotate a photo I upload with handwritten notes + my ikigai',
    subtitle:
      'Upload a portrait, sketch, page, or screenshot. The AI overlays handwritten-style annotations: your ikigai statement, your reader\'s first name, your three pillars — like margin notes on a printed page.',
    body: `${OPERATING_RULE_SHORT}

I'm uploading an image — a portrait of me, a sketch, a hand-drawn page, or a screenshot. Look at it carefully.

Generate an image that takes my uploaded image as the base and **overlays handwritten-style annotations on top of it.**

The annotations should include:

1. **My ikigai sentence** — written in ink-pen handwriting at the top or to the side, like a margin note. Use the ikigai sentence we wrote in Module 1.
2. **My reader's first name** — circled with a hand-drawn arrow pointing to whoever it most belongs to in the image (if it's a portrait of me, the arrow points to me with the label "who this is for: [name]").
3. **My three content pillars** — listed in handwritten bullet form on one side, like notes scribbled in the margin.
4. **One small star or asterisk** beside the strongest single word in the ikigai sentence.

If the ikigai sentence, reader's name, or pillars are missing from this chat, infer the strongest plausible versions from what's already discussed. Do not ask me to provide them.

Style rules:
- Real ink-pen handwriting, not typeface fonts.
- Slight pen-pressure variation, slightly imperfect line work.
- Off-black or dark navy ink, not pure black.
- Handwriting size readable on mobile.
- Respect the original image — annotations are overlays, not replacements.
- Preserve the photo's lighting, mood, and composition underneath.
- No clutter, no neon, no decorative borders.
- Aspect ratio: match the uploaded image.

Output:
1. Confirm what I uploaded (one short sentence describing it).
2. State the ikigai sentence, reader name, and three pillars you're using (so I can correct in one message if any are wrong).
3. Generate the annotated image.

Recommended generators: ChatGPT image generation (image edit / image-with-thinking) or Gemini's image editing. Both accept an uploaded reference image + an instruction prompt.

If your generator can't take an uploaded image as base, output a detailed image-gen prompt I can paste alongside the upload in ChatGPT/Gemini directly.`,
    bestIn: ['ChatGPT', 'Gemini'],
    outputHandling:
      'Save the annotated image as your phone wallpaper or LinkedIn header. The first time you see your ikigai sentence handwritten over your own face, you stop second-guessing it.',
    version: SHARED_VERSION,
    evalScore: 4.5,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['premium-visual'],
    chainsTo: ['proactive-partner'],
  },

  // ─── 7 ─ Proactive Partner ───────────────────────────────────────────
  {
    id: 'proactive-partner',
    module: 7,
    title: 'Turn this chat into my proactive content partner',
    subtitle:
      'Drop any rough thought — voice note, link, screenshot, half-sentence — and get an audience problem, an angle, 5 hooks, a draft, a visual direction, and a publish/refine recommendation.',
    body: `${OPERATING_RULE_SHORT}

From now on, act as my proactive personal brand and content partner.

Use everything in this chat as durable context:
- my ikigai
- my audience
- my problems
- my point of view
- my examples
- my tone
- my strongest content angles
- my preferred formats
- my visual style

When I give you any rough thought, voice note, link, article, idea, screenshot, conversation, or half-formed sentence, automatically do this:

1. Identify the audience problem.
2. Infer the strongest angle.
3. Decide the best format: LinkedIn post, carousel, short video, infographic, newsletter, landing page section, or workshop exercise.
4. Create 5 hooks.
5. Draft the content.
6. Suggest one premium visual direction.
7. Suggest one improvement that would make it sharper.
8. Recommend whether to publish, refine, or save for later.

Do not wait for perfect instructions. Do not ask me to fill templates. Make strong assumptions. State assumptions briefly. Ask only one clarifying question when the missing detail would materially change the output.

Default goal: turn rough thinking into useful public artefacts.`,
    bestIn: ['ChatGPT', 'Claude', 'Gemini'],
    outputHandling:
      'This is the workshop\'s afterlife. Keep this chat open — paste any half-thought into it for the next 30 days. The Coach becomes your standing collaborator.',
    version: SHARED_VERSION,
    evalScore: 4.7,
    voiceGate: 'clean',
    author: SHARED_AUTHOR,
    createdAt: SHARED_DATE,
    lastModified: SHARED_DATE,
    tested: true,
    chainsFrom: ['premium-visual'],
  },
]
