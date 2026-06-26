export interface WorkshopModule {
  title: string
  duration: string
  description: string
  instructorNotes: string
  resources: { label: string; href: string }[]
}

export interface Workshop {
  slug: string
  title: string
  subtitle: string
  duration: string
  audience: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  moduleCount: number
  color: 'cyan' | 'violet' | 'amber'
  overview: string
  objectives: string[]
  prerequisites: string[]
  modules: WorkshopModule[]
  /**
   * When true, the workshop page renders the delivered-format intake form
   * (`components/workshops/IntakeForm.tsx`) and exposes an #intake anchor.
   * Omit or set `false` for self-serve / informational workshops.
   */
  intakeEnabled?: boolean
}

export const workshops: Workshop[] = [
  {
    slug: 'ikigai-branding',
    title: 'Ikigai & Branding Workshop',
    subtitle: 'Find your purpose, turn it into a brand, ship a 30-day content plan',
    duration: '60-75 min',
    audience: 'Creators, students, professionals reshaping their path',
    difficulty: 'Beginner',
    moduleCount: 7,
    color: 'violet',
    overview:
      'An interactive, coach-guided workshop. You map your Ikigai through a 4-step wizard (what you love, what you are good at, what the world needs, what pays), synthesize your purpose statement, and immediately translate it into a brand: positioning, audience-of-one, and three content pillars. Pair it with the free Ikigai & Branding Coach GPT for deeper Socratic questioning.',
    objectives: [
      'Map your Ikigai with specific, evidence-backed inputs (not vague feelings)',
      'Write a 2-3 line purpose statement that fits on a business card',
      'Translate purpose into a brand positioning sentence and audience-of-one avatar',
      'Leave with three content pillars and a 30-day expression plan',
    ],
    prerequisites: [
      'A willingness to be specific (vague answers produce vague brands)',
      '45-75 minutes of uninterrupted time',
      'Optional: a free ChatGPT account to chat with the Coach GPT',
    ],
    modules: [
      {
        title: 'The Ikigai Map',
        duration: '20 min',
        description:
          'Work through the four circles of Ikigai as a guided wizard. Each question comes with Socratic prompts and real examples. Progress saves in your browser automatically — nothing leaves your device until you explicitly export.',
        instructorNotes:
          'Encourage participants to write evidence-backed answers — specific moments, real skills others named, actual markets they have been paid from. Vague inputs create vague outputs. If stuck, open the Coach GPT side-by-side.',
        resources: [
          { label: 'Coach GPT (free)', href: '/go/ikigai-coach' },
          { label: 'The 3Cs: Human Skills That Compound', href: '#three-cs' },
        ],
      },
      {
        title: 'Your Purpose Statement',
        duration: '10 min',
        description:
          'Distill your four circles into one sentence: "I help [who] achieve [outcome] by [how], using [skills] in [domain]." The synthesis panel writes a draft from your inputs — you sharpen it.',
        instructorNotes:
          'The fastest shortcut to a great statement is naming the audience precisely. "Early-career data analysts" beats "professionals". Push participants to replace any word a competitor could also use.',
        resources: [
          { label: 'Export your Ikigai (JSON + Markdown)', href: '#synthesis' },
        ],
      },
      {
        title: 'Ikigai → Brand Bridge',
        duration: '15 min',
        description:
          'Turn your purpose statement into a positioning sentence, an audience-of-one avatar, and three content pillars. This is where most ikigai workshops stop — here it is where yours begins producing visible work.',
        instructorNotes:
          'Positioning = what you are for and what you are not. Force a trade-off. The pillars should be publishable for 12 months straight without repeating yourself. If not, sharpen them.',
        resources: [
          { label: 'Coach GPT (free)', href: '/go/ikigai-coach' },
          { label: 'Prompt Library: Branding', href: '/prompt-library?category=create' },
        ],
      },
      {
        title: 'Activation: 30-Day Expression Plan',
        duration: '10 min',
        description:
          'Ship your brand into reality. Pick one pillar, commit to 4 visible artifacts in the next 30 days (a post, a video, a conversation, a small product). Subscribe to receive the Resource Pack with templates and a check-in email at Day 7.',
        instructorNotes:
          'Shipping calibrates the brand. Two weeks of visible output teaches you more than two months of planning. Keep artifacts small — one tweet, one 2-minute video, one coffee chat.',
        resources: [
          { label: 'GenCreator Principles', href: '/gencreator/principles' },
          { label: 'Creator Economy Guide', href: '/for/creators' },
        ],
      },
    ],
  },
  {
    slug: 'ai-2026-graduates',
    title: 'AI in 2026: What Graduates Need to Know',
    subtitle: 'A practical orientation to AI literacy for students entering the workforce',
    duration: '45-60 min',
    audience: 'University students, recent graduates',
    difficulty: 'Beginner',
    moduleCount: 5,
    color: 'cyan',
    overview:
      'This workshop equips graduates with practical AI literacy — from understanding the current landscape to hands-on prompting techniques. Students leave with a clear mental model of where AI is heading and how to position themselves.',
    objectives: [
      'Understand the three waves of AI development and where we are today',
      'Identify career opportunities that leverage AI proficiency',
      'Write effective prompts for real-world tasks',
      'Build a personal AI toolkit for professional growth',
    ],
    prerequisites: [
      'Access to a laptop or tablet with internet',
      'A free ChatGPT or Claude account (instructions provided)',
    ],
    modules: [
      {
        title: 'The AI Landscape',
        duration: '10 min',
        description:
          'A grounded overview of where AI stands in 2026 — beyond the hype. What works, what is still emerging, and what matters for your career.',
        instructorNotes:
          'Open with a live demo of an AI tool completing a real task (writing an email, analyzing data, generating code). This grounds the session in practical reality rather than abstract concepts.',
        resources: [
          { label: 'AI Briefing for Students', href: '/students/ai-briefing' },
        ],
      },
      {
        title: 'Three Waves of AI',
        duration: '10 min',
        description:
          'From prediction engines (Wave 1) to generative AI (Wave 2) to agentic systems (Wave 3). Understanding the trajectory helps graduates anticipate where value is moving.',
        instructorNotes:
          'Use a timeline visual. Ask the audience: "Which wave does your field interact with most?" This creates engagement and helps tailor the remaining content.',
        resources: [
          { label: 'AI Briefing for Students', href: '/students/ai-briefing' },
        ],
      },
      {
        title: 'Career Implications',
        duration: '10 min',
        description:
          'How AI is reshaping job roles across industries. The skills that compound in value. How to frame AI proficiency on a resume and in interviews.',
        instructorNotes:
          'Avoid fear-based framing. Focus on augmentation and new roles that did not exist two years ago. Share concrete examples: AI ops engineer, prompt strategist, AI product manager.',
        resources: [
          { label: 'AI Briefing for Students', href: '/students/ai-briefing' },
        ],
      },
      {
        title: 'Hands-On Prompting',
        duration: '15 min',
        description:
          'Interactive session where participants write and refine prompts for real tasks: drafting cover letters, summarizing research papers, brainstorming project ideas.',
        instructorNotes:
          'Have 3-4 pre-built prompt templates ready. Let students modify them and compare outputs. Pair programming style works well here — one person drives, the other observes.',
        resources: [
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Resources and Next Steps',
        duration: '5 min',
        description:
          'Curated pathways for continued learning. Tools, communities, and frameworks to build on after the workshop.',
        instructorNotes:
          'End with the QR code linking to the resource pack. Encourage students to bookmark the GenCreator principles page for ongoing reference.',
        resources: [
          { label: 'GenCreator Principles', href: '/gencreator/principles' },
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
    ],
  },
  {
    slug: 'build-first-ai-agent',
    title: 'Build Your First AI Agent',
    subtitle: 'One central path in 90 minutes — plus six branches for where you go next',
    duration: '90 min',
    audience: 'Developers, CS students, technical professionals, AI-curious builders',
    difficulty: 'Intermediate',
    moduleCount: 7,
    color: 'cyan',
    intakeEnabled: true,
    overview:
      'A hands-on technical workshop. Every participant ships a working AI agent on the Vercel AI SDK — our central path — and leaves with a portable Agent Card (Google A2A) that works across Claude, OpenAI, Google ADK, and no-code stacks. The point is not the framework; the point is the six primitives (model, tool, memory, loop, spec, deploy) that transfer to every agent you will ever build. Six optional branch modules then re-build the same agent on Claude, OpenAI, Google ADK, Oracle ADK, no-code (n8n/Notion/Dify), and AI-builds-AI (Claude Code) stacks.',
    objectives: [
      'Name the six primitives of any AI agent — model, tool, memory, loop, spec, deploy',
      'Ship a working research-assistant agent on the Vercel AI SDK with tool use, memory, and a public URL',
      'Publish a valid Google A2A Agent Card at /.well-known/agent.json and understand where Oracle Open Agent Specification fits',
      'Write a 3-case evaluation suite and 2 refusal rails for your agent',
      'Pick the right branch (Claude / OpenAI / Google ADK / no-code / AI-builds-AI / Oracle) for your next agent based on the transfer matrix',
    ],
    prerequisites: [
      'Basic JavaScript or TypeScript (Python fine for branches; core is TS)',
      'Laptop with Node 20+ and pnpm (or npm)',
      'API key for at least one LLM provider — Anthropic Claude recommended; OpenAI or Google fine',
      'Optional but recommended: a Vercel account (free tier is plenty) and a GitHub account',
    ],
    modules: [
      {
        title: 'The hook + the six primitives',
        duration: '10 min',
        description:
          'A cold open: what actually separates an agent from a chatbot? The reveal — six primitives (model, tool, memory, loop, spec, deploy) that every agent framework is spelling differently. By minute 10, participants have the mental model that will carry every module.',
        instructorNotes:
          'Open by asking the room for 3 definitions of "agent." Reconcile all three with the six primitives on one slide. Keep this under 10 minutes — the hands-on build is the star.',
        resources: [
          { label: 'Agentic Creator OS (mental model)', href: '/acos' },
        ],
      },
      {
        title: 'Models — one SDK, any provider',
        duration: '10 min',
        description:
          'Live demo: a 10-line Vercel AI SDK script that swaps between Claude, GPT, and Gemini by changing one import. Participants type along and swap providers themselves. The portability lesson lands in practice, not in theory.',
        instructorNotes:
          'Keep the providers real — use Anthropic as default (best reasoning/$ ratio), then OpenAI and Gemini for the swap. Show cost + capability table while the API calls run.',
        resources: [
          { label: 'Vercel AI SDK docs', href: 'https://sdk.vercel.ai/docs' },
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Tools + structured output',
        duration: '15 min',
        description:
          'Write a typed web_search tool using zod, and a Research structured output schema. Participants learn that a "tool" is just a typed function the agent can call — not magic. The JSON schema becomes the contract that ports across every framework.',
        instructorNotes:
          'Show the schema first, the call site second. Emphasize: "If you can define this tool once in zod, you can call it from Vercel AI SDK, Claude Agent SDK, OpenAI Agents, or Google ADK with near-identical glue."',
        resources: [
          { label: 'Prompt Library', href: '/prompt-library' },
          { label: 'Starter repo — first-agent-vercel-aisdk', href: 'https://github.com/frankxai/first-agent-vercel-aisdk' },
        ],
      },
      {
        title: 'The loop + memory — ship the agent',
        duration: '20 min',
        description:
          'Assemble the observe-think-act-reflect loop. Add conversation memory (in-process for workshop, Vercel KV for production). By the end of this module, every participant has a working research-assistant agent. Applause moment.',
        instructorNotes:
          'This is the peak of the energy curve. Pair slow participants with fast ones. Keep the demo agent ultra-minimal — a loop around a single tool is enough. Advanced attendees can add a second tool while others catch up.',
        resources: [
          { label: 'Starter repo — first-agent-vercel-aisdk', href: 'https://github.com/frankxai/first-agent-vercel-aisdk' },
        ],
      },
      {
        title: 'Safety rails + evaluation',
        duration: '10 min',
        description:
          'Three eval cases (success, edge case, refusal) and two refusal patterns. Show how to read a trace. Discussion: what does "correct" mean for an LLM? This module is short on purpose — the professor track goes deeper.',
        instructorNotes:
          'Use a pre-baked eval harness from the starter repo. The teaching point is the discipline of writing tests for non-deterministic systems, not any specific framework.',
        resources: [
          { label: 'Eval harness (starter repo)', href: 'https://github.com/frankxai/first-agent-vercel-aisdk' },
        ],
      },
      {
        title: 'Agent Card — the portability contract',
        duration: '15 min',
        description:
          'Draft a Google A2A Agent Card describing your agent. Validate it. Serve it at /.well-known/agent.json. Ninety seconds on Oracle Open Agent Specification (OAS) for those going enterprise. By the end, your agent has an identity other agents can discover.',
        instructorNotes:
          'The Agent Card is the artifact that makes the portability lesson concrete. Have a pre-baked template in the starter repo; participants fill fields rather than writing JSON from scratch. Mention BCG\'s enterprise agent playbook uses the same A2A spec — the concept is industry standard, not a toy.',
        resources: [
          { label: 'Google A2A Agent Card spec', href: 'https://a2a-protocol.org/' },
          { label: 'Oracle Open Agent Specification', href: '/ai-architecture' },
        ],
      },
      {
        title: 'Deploy + share + pick your next branch',
        duration: '10 min',
        description:
          'vercel --prod. Your agent is public. URLs fly into the group chat. Then a brief look at the six branch modules (Claude, OpenAI, Google ADK, no-code, AI-builds-AI, Oracle) so participants know where to go next. The closing ask: paste your Agent Card URL before you close the laptop.',
        instructorNotes:
          'Protect the last 5 minutes for branch sign-ups — this is where the next-session pipeline is built. Do not let Q&A eat the close. Collect URLs in chat for the gallery. Remind participants that /partners exists and affiliate revenue supports the free materials.',
        resources: [
          { label: 'Vercel deploy docs', href: 'https://vercel.com/docs' },
          { label: 'Workshop gallery (coming soon)', href: '/workshops/build-first-ai-agent' },
          { label: 'Educator / professor track', href: '/workshops/for-educators' },
        ],
      },
    ],
  },
  {
    slug: 'ai-music-masterclass',
    title: 'AI Music Production with Suno',
    subtitle: 'Create professional-quality tracks using AI in under an hour',
    duration: '60 min',
    audience: 'Creators, musicians, content producers',
    difficulty: 'Beginner',
    moduleCount: 4,
    color: 'amber',
    overview:
      'This workshop demystifies AI music production. Participants learn prompt engineering techniques specific to Suno, create original tracks during the session, and understand the publishing and distribution landscape.',
    objectives: [
      'Understand the current AI music generation landscape',
      'Write effective Suno prompts with genre, mood, and structure control',
      'Create at least one original track during the session',
      'Know the basics of publishing and distributing AI-generated music',
    ],
    prerequisites: [
      'A free Suno account (suno.com)',
      'Headphones or earbuds recommended',
      'Laptop, tablet, or phone with internet access',
    ],
    modules: [
      {
        title: 'AI Music Landscape',
        duration: '10 min',
        description:
          'Where AI music generation stands in 2026. The major platforms, their strengths, and the creative possibilities. Listening session with examples across genres.',
        instructorNotes:
          'Play 3-4 diverse AI-generated tracks without revealing they are AI-made. Then reveal. This creates a productive conversation about quality and perception.',
        resources: [
          { label: 'Music Lab', href: '/music-lab' },
        ],
      },
      {
        title: 'Suno Prompt Engineering',
        duration: '15 min',
        description:
          'The anatomy of a great Suno prompt. Genre tags, mood descriptors, structure markers, and style references. Common mistakes and how to avoid them.',
        instructorNotes:
          'Show a side-by-side comparison: a vague prompt vs. a well-structured one. Play the outputs. The quality difference sells the technique.',
        resources: [
          { label: 'Vibe Producer', href: '/vibe/producer' },
        ],
      },
      {
        title: 'Live Creation Session',
        duration: '25 min',
        description:
          'Guided creation where every participant produces an original track. Start with a template prompt, then iterate. Instructor circulates and offers feedback.',
        instructorNotes:
          'Provide 3 template prompts (pop, cinematic, lo-fi) as starting points. Encourage experimentation after the first successful generation. Share results in a group playlist if time allows.',
        resources: [
          { label: 'Music Lab', href: '/music-lab' },
          { label: 'FrankX on Suno', href: 'https://suno.com/@frankx' },
        ],
      },
      {
        title: 'Publishing and Distribution',
        duration: '10 min',
        description:
          'How to publish AI-generated music. Platform policies, distribution services, licensing considerations, and building an audience.',
        instructorNotes:
          'Be transparent about the evolving legal landscape. Focus on what is clearly permissible today and point to resources for staying current.',
        resources: [
          { label: 'Music Lab', href: '/music-lab' },
        ],
      },
    ],
  },
  {
    slug: 'ikigai-content-studio',
    title: 'Ikigai + AI Content Studio',
    subtitle:
      'Find your purpose, then ship your first AI-augmented brand asset in the same session',
    duration: '3–4 hours',
    audience: 'Creators, knowledge workers, and operators rebuilding their public presence',
    difficulty: 'Beginner',
    moduleCount: 5,
    color: 'violet',
    intakeEnabled: true,
    overview:
      'A facilitator-led workshop that picks up where the self-serve /workshops/ikigai-branding wizard stops. Attendees map their Ikigai with evidence-backed inputs, distill a two-line purpose statement, translate it into brand positioning plus three content pillars, then use AI tools (ChatGPT, Claude, Suno, Nano Banana) to ship their first visible artifact before leaving the room. Everyone leaves with a 30-day publishing cadence and momentum.',
    objectives: [
      'Map your Ikigai with evidence-backed inputs, not vague feelings',
      'Write a 2-line purpose statement plus a positioning sentence on a single page',
      'Build an AI-augmented content workflow that fits your real schedule',
      'Ship one visible artifact (post, short, track, or page) before the session ends',
      'Leave with a 30-day publishing cadence and a Day-7 check-in',
    ],
    prerequisites: [
      'Laptop, headphones optional',
      'Free ChatGPT or Claude account',
      '3–4 hours of focused attention',
      'Willingness to publish something before leaving the room',
    ],
    modules: [
      {
        title: 'Ikigai Deep Map',
        duration: '40 min',
        description:
          'Work through the four circles of Ikigai with Socratic prompts and evidence prompts. Specific moments, real skills others named, actual markets you have been paid from. Vague inputs produce vague outputs, so we push for precision.',
        instructorNotes:
          'Time-box each circle to 8 minutes. If a participant stalls, pair them with the Coach GPT for 3 minutes, then pull them back. The deliverable is four sharpened paragraphs, not a polished essay.',
        resources: [
          { label: 'Self-serve Ikigai Wizard', href: '/workshops/ikigai-branding' },
          { label: 'Coach GPT (free)', href: '/go/ikigai-coach' },
        ],
      },
      {
        title: 'Purpose → Positioning Bridge',
        duration: '30 min',
        description:
          'Distill the four circles into one purpose sentence, then translate it into a positioning sentence with a forced trade-off (what you are for, what you are not). Name a precise audience-of-one and three content pillars that can run for twelve months without repetition.',
        instructorNotes:
          'The fastest improvement is naming the audience precisely. "Early-career data analysts at mid-sized SaaS companies" beats "professionals". Force every participant to replace any adjective a competitor could also use.',
        resources: [
          { label: 'Prompt Library: Branding', href: '/prompt-library?category=create' },
        ],
      },
      {
        title: 'AI Content Studio Setup',
        duration: '40 min',
        description:
          'Hands-on session where attendees configure their content stack: one writing assistant (Claude or ChatGPT), one visual tool (Nano Banana or equivalent), one audio tool (Suno if relevant), and one publishing surface. We set up reusable prompt templates tied to the three pillars.',
        instructorNotes:
          'Walk the room. Most friction happens at authentication and API key setup, not at prompting. Have backup accounts ready. Demonstrate a full pillar-prompt template with one attendee on-screen before turning the room loose.',
        resources: [
          { label: 'Prompt Library', href: '/prompt-library' },
          { label: 'GenCreator Principles', href: '/gencreator/principles' },
        ],
      },
      {
        title: 'Ship Your First Artifact',
        duration: '60 min',
        description:
          'Every attendee produces and publishes one artifact: a LinkedIn post, a short-form video, a Suno track, a landing page draft, or a newsletter. We iterate in three passes: rough, sharpened, shipped. Publication happens in-room.',
        instructorNotes:
          'Resist the urge to coach toward perfection. Two weeks of visible output teaches more than two months of planning. Track completion on the whiteboard — peer momentum is the lever. Celebrate publishes out loud.',
        resources: [
          { label: 'GenCreator Principles', href: '/gencreator/principles' },
          { label: 'Creator Economy Guide', href: '/for/creators' },
        ],
      },
      {
        title: '30-Day Cadence + Amplification',
        duration: '30 min',
        description:
          'Commit to a 30-day publishing cadence with four artifacts per week across the three pillars. Subscribe to the Resource Pack for templates, a Day-7 check-in, and an amplification loop where Frank reposts the strongest attendee work.',
        instructorNotes:
          'End with a commitment round: each attendee says out loud what they will ship in the next seven days. Public commitment doubles follow-through. Collect links so amplification can start within 48 hours.',
        resources: [
          { label: 'Coach GPT (free)', href: '/go/ikigai-coach' },
          { label: 'Creator Economy Guide', href: '/for/creators' },
        ],
      },
    ],
  },
  {
    slug: 'sovereign-leadership',
    title: 'Sovereign Leadership: Human-Centric AI',
    subtitle: 'AI leadership as a sovereignty practice, not a technology decision',
    duration: '2 hours',
    audience: 'Senior executives, board members, and founders deciding how AI fits their company',
    difficulty: 'Intermediate',
    moduleCount: 4,
    color: 'cyan',
    intakeEnabled: true,
    overview:
      'A boardroom-format workshop for leaders who are tired of outsourcing AI strategy to vendors and frameworks they did not choose. The session adapts the 6-pillar AI Center of Excellence framework Frank builds for enterprise clients at Oracle (Strategy, Governance, Talent, Technology, Data, Ethics) to the attendee’s actual company. Every participant leaves having identified one AI decision they have been over-delegating and committing to re-own it this quarter.',
    objectives: [
      'Distinguish AI decisions you should own, delegate, or avoid entirely',
      'Apply the 6-Pillar AI CoE framework (Strategy, Governance, Talent, Technology, Data, Ethics) to your real context',
      'Complete a Personal AI Sovereignty Assessment',
      'Commit to one specific re-ownership move this quarter',
    ],
    prerequisites: [
      'Decision-making authority in your organization',
      '2 hours of focused, uninterrupted attention',
      'Willingness to name real trade-offs out loud — this is a working session, not a briefing',
    ],
    modules: [
      {
        title: 'What AI Leadership Actually Is',
        duration: '20 min',
        description:
          'The difference between AI sponsorship, AI delegation, and AI sovereignty. Why the third matters most. Patterns from enterprise deployments where leaders over-delegated the framing decisions and lived with the consequences.',
        instructorNotes:
          'Open with two short, anonymized case studies — one where a CEO owned the framing, one where it was outsourced to a vendor. Contrast the 18-month outcomes. Keep it concrete and operational, never philosophical.',
        resources: [
          { label: 'ACOS — the personal CoE', href: '/acos' },
          { label: 'For Founders', href: '/for/founders' },
        ],
      },
      {
        title: 'The 6-Pillar CoE Framework',
        duration: '25 min',
        description:
          'Walk through each pillar as it operates in a real enterprise AI CoE: Strategy (what we will and will not do with AI), Governance (who decides), Talent (capability build vs. buy), Technology (stack choices), Data (rights and leverage), Ethics (tested, not declared). Each pillar includes one board-level question the leader must own.',
        instructorNotes:
          'Draw the 6 pillars as a single diagram on the whiteboard. Ask each attendee to mark which pillar they currently own, which they delegate, and which they avoid. Silence on a pillar is a signal — probe it.',
        resources: [
          { label: 'ACOS — the personal CoE', href: '/acos' },
        ],
      },
      {
        title: 'Personal AI Sovereignty Assessment',
        duration: '20 min',
        description:
          'Hands-on. Each leader scores their current sovereignty across the 6 pillars on a 1–5 scale and identifies the lowest-scoring pillar. The assessment is private; only the commitment is shared. Output: one named gap plus a one-line remedy.',
        instructorNotes:
          'Keep scoring private. Loudly name the lowest score in the room only with permission. The point is self-honesty, not peer comparison. Have printed assessment cards ready — paper outperforms a laptop here.',
        resources: [
          { label: 'For Founders', href: '/for/founders' },
        ],
      },
      {
        title: 'The First Move — Commitment Round',
        duration: '15 min',
        description:
          'Each attendee names one specific AI decision they will re-own this quarter, with a date and a named owner (usually themselves). Q&A is built into this module; the commitment is the output. Frank follows up at 30 days.',
        instructorNotes:
          'Public commitment doubles follow-through. Write every commitment on a shared flipchart. Note the dates. Send a templated 30-day check-in email the day after the workshop with the commitments attached.',
        resources: [
          { label: 'ACOS — the personal CoE', href: '/acos' },
          { label: 'For Founders', href: '/for/founders' },
        ],
      },
    ],
  },
  {
    slug: 'personal-ai-coe',
    title: 'Build Your Personal AI Center of Excellence',
    subtitle:
      'The enterprise CoE framework, scaled to one person. Leave with your AI operating system running.',
    duration: '90 minutes',
    audience: 'Operators, creators, and technical professionals building a personal AI stack',
    difficulty: 'Intermediate',
    moduleCount: 4,
    color: 'amber',
    intakeEnabled: true,
    overview:
      'A hands-on 90-minute workshop that treats the participant as a 1-person enterprise operating system. Frank walks through how he builds AI Centers of Excellence for Oracle enterprise clients — six pillars, roughly €500k typical budget, 6–12 month rollout — then shows the mirror-image personal version: same architecture, 1/5000th the cost. By end of session, every attendee has a working personal AI CoE: a strategy doc, a tool policy, a prompt library, a memory system, and a weekly review cadence.',
    objectives: [
      'Understand the 6-pillar enterprise CoE Frank ships to Oracle clients',
      'Map each pillar to a personal equivalent without losing the architecture',
      'Deploy a working Personal AI CoE one-pager and tool stack during the session',
      'Leave with a weekly review cadence and the CLI and config that support it',
    ],
    prerequisites: [
      'Laptop with a working terminal',
      'Comfort with the command line or willingness to learn in real time',
      'Free Claude account or ChatGPT Plus subscription',
    ],
    modules: [
      {
        title: 'The Enterprise CoE',
        duration: '20 min',
        description:
          'How an enterprise AI Center of Excellence actually works: the 6 pillars, the typical budget, the common failure modes. A short, grounded tour of what Frank ships at Oracle before we mirror it at personal scale.',
        instructorNotes:
          'Show one real (anonymized) CoE deliverable on screen — a pillar scorecard or a governance brief. Seeing the artifact collapses the abstraction. Skip slide-heavy storytelling; the personal build needs the time.',
        resources: [
          { label: 'ACOS — the personal CoE', href: '/acos' },
        ],
      },
      {
        title: 'The Personal Mirror',
        duration: '15 min',
        description:
          'Map each of the 6 pillars to a personal equivalent. Enterprise Strategy becomes your AI charter. Enterprise Governance becomes your tool policy. Enterprise Talent becomes your skill-build plan. The architecture holds; the scale changes.',
        instructorNotes:
          'Use the same diagram you drew for the enterprise CoE, then redraw it at personal scale side-by-side. The visual parallel is the teaching point. Reuse the participant\'s real context — their actual role, their actual tools.',
        resources: [
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Hands-on Build',
        duration: '40 min',
        description:
          'Real deployment. Each attendee builds their one-pager charter, installs a starter tool policy, configures a prompt library, and stands up a minimal memory system (a markdown file plus a convention). Guided checkpoints every ten minutes.',
        instructorNotes:
          'Walk the room continuously. The first ten minutes always surface environment issues — have backup cloud setups ready. Aim for every attendee to hit each checkpoint, even if imperfect. Working beats polished.',
        resources: [
          { label: 'ACOS — the personal CoE', href: '/acos' },
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Operating Cadence',
        duration: '15 min',
        description:
          'The weekly 20-minute review that keeps the Personal AI CoE alive: what I shipped, what I learned, what to sharpen. Each attendee schedules the first review before leaving and writes the recurring calendar block in-room.',
        instructorNotes:
          'The review is the whole game. Without a cadence, the CoE decays in two weeks. Make the calendar block concrete and recurring, same day, same time. Share Frank\'s own review template as a starting point.',
        resources: [
          { label: 'ACOS — the personal CoE', href: '/acos' },
        ],
      },
    ],
  },
  {
    slug: 'build-hackathon',
    title: 'Build Hackathon: Ship an AI Agent in 4 Hours',
    subtitle: 'Half-day hackathon where every team leaves with a working AI agent shipped to the web',
    duration: '4 hours',
    audience: 'Mixed teams of 3-5: builders, operators, and domain experts',
    difficulty: 'Intermediate',
    moduleCount: 5,
    color: 'cyan',
    overview:
      'A half-day hackathon format. Teams of 3-5 take one real problem from their work, decompose it into an agentic workflow, build with Claude Code (or a comparable agent CLI), and ship a working prototype to a live URL. The facilitator role shifts from teacher to co-pilot — Frank pairs with each team during the build, unblocks blockers, and pushes for shipped-over-polished. By the close, every team has a live link they can share.',
    objectives: [
      'Pick one real problem from the team\'s work that AI can materially help with',
      'Decompose it into agent tools + memory + reasoning in a shared whiteboard',
      'Build a functional prototype with Claude Code or equivalent',
      'Deploy to a live URL (Vercel preview, Cloudflare Pages, or Railway)',
      'Demo in a 4-minute slot to the room with a working link',
    ],
    prerequisites: [
      'Each team has one real problem to attack — bring a real use case, not a toy',
      'Laptop with Node.js 18+ and a git account',
      'API keys or cloud credits for at least one LLM (Claude, OpenAI, or Gemini)',
      'Comfort with terminal OR willingness to pair with a team member who is',
    ],
    modules: [
      {
        title: 'Problem decomposition (60 min)',
        duration: '60 min',
        description:
          'Teams map their problem into the agent primitives: what tools does the agent need, what memory does it keep, what reasoning loop does it run. Facilitator circulates with the 6-pillar CoE framework as a quick sanity check on governance and data.',
        instructorNotes:
          'The hardest part is picking ONE problem narrow enough to ship in 3 hours. Push teams to cut scope aggressively — "solve for a single user in a single context" beats "build a platform." Use the whiteboard template: Tools | Memory | Loop | Output.',
        resources: [
          { label: 'Personal AI CoE framework', href: '/workshops/personal-ai-coe' },
          { label: 'ACOS agent patterns', href: '/acos' },
        ],
      },
      {
        title: 'Stack kickoff (30 min)',
        duration: '30 min',
        description:
          'Each team scaffolds with Claude Code or equivalent, chooses deployment target, and sets up their LLM keys. Facilitator drops in for any team stuck on setup — usually auth or API keys.',
        instructorNotes:
          'Provide a starter repo that handles the deploy plumbing (Vercel + Claude Code template). Teams that insist on from-scratch setup usually burn 45 min before they realize they should have used the template. Enforce the template for all teams.',
        resources: [
          { label: 'workshop-os public starter', href: 'https://github.com/frankxai/workshop-os' },
          { label: 'Claude Code docs', href: 'https://docs.claude.com/en/docs/claude-code' },
        ],
      },
      {
        title: 'Build sprint (120 min)',
        duration: '120 min',
        description:
          'Heads-down. Teams build. Facilitator floats between teams, unblocks on demand, pushes against perfectionism. Mid-sprint checkpoint at 60 min — each team shows a working seam, not a finished product.',
        instructorNotes:
          'The mid-sprint checkpoint is the single most important moment. Teams that can\'t show a working seam by 60 min are over-engineering — intervene and push to mock whatever isn\'t working. Done beats perfect by a mile here.',
        resources: [
          { label: 'Prompt library', href: '/prompt-library' },
          { label: 'Agentic orchestration patterns', href: '/acos' },
        ],
      },
      {
        title: 'Ship + document (30 min)',
        duration: '30 min',
        description:
          'Each team deploys to a live URL and writes a 5-line README describing the problem, the approach, and the live link. Shipping discipline — if it\'s not deployed, it doesn\'t count.',
        instructorNotes:
          'Have a Vercel team already set up so teams can invite their builders in a click. Enforce the 5-line README — teams that skip it during the hackathon skip it forever. The README is the amplification artifact.',
        resources: [
          { label: 'Vercel quick deploy', href: 'https://vercel.com/templates' },
        ],
      },
      {
        title: 'Demos + amplification (40 min)',
        duration: '40 min',
        description:
          '4 minutes per team. Show the problem, the live link, the one thing that surprised you. Audience votes on most-shippable prototype. Winning team gets a dedicated post on Frank\'s channels amplifying their build.',
        instructorNotes:
          'The amplification prize is the real carrot. Sponsors of the event often love this because a winning team posts a "we built X at Frank Riemer\'s hackathon with Company Y" — that\'s the sponsor\'s ROI. Be generous with reposts for every team that shipped, not just the winner.',
        resources: [
          { label: 'Crosspost checklist', href: '/workshops' },
        ],
      },
    ],
    intakeEnabled: true,
  },
]

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find((w) => w.slug === slug)
}

export function getAllWorkshopSlugs(): string[] {
  return workshops.map((w) => w.slug)
}
