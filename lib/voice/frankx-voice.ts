/**
 * FrankX Brand Voice — Single Source of Truth
 * ---------------------------------------------------------------
 * This file is the canonical reference for FrankX brand voice.
 * It is consumed by:
 *   - the `/po` (prompt-optimizer) slash command
 *   - the `prompt-architect` agent
 *   - the `prompt-optimizer` skill
 *   - the `brand-voice` skill
 *   - the `content-polisher` and `polish-content` commands
 *   - any future agent or skill that needs to enforce voice
 *
 * RULES:
 *   1. Never duplicate the banned-phrase list, voice rules, or the
 *      Arcanea quarantine list anywhere else in the repo.
 *   2. Other modules MUST import from here, e.g.:
 *        import { FRANKX_VOICE, isBannedPhrase, isQuarantined } from '@/lib/voice/frankx-voice';
 *   3. When adding new banned phrases or quarantine terms, append
 *      them HERE and update the date stamp below.
 *
 * SOURCES SYNTHESIZED FROM:
 *   - `.claude/skills/brand-rules/SKILL.md` (brand DNA, CTA standards)
 *   - `.claude/skills/frankx-meta/SKILL.md` (system map + scope rule)
 *   - `.claude/skills/frankx-meta/references/brand-discipline.md`
 *     (brand matrix, voice attributes, Arcanean leak detection)
 *   - `CLAUDE.md` § Brand Positioning + § Voice Guidelines
 *   - `taste.md` § What we refuse (AI-slop checklist) and § On AI-generated copy
 *   - `design.md` (token contract — referenced, not duplicated here)
 *
 * DESIGN CONTEXT — introspective tone:
 *   The `toneAdaptation.introspective` register is new and is governed
 *   by the prompt-hub design spec:
 *     `docs/superpowers/specs/2026-05-13-prompt-hub-design.md`
 *   It is the editorial cadence used on contemplative rails
 *   (/on-god/, /on-reality/, /on-consciousness/, /on-faith/, /canon/)
 *   and on IFS / Psyche-layer surfaces. It MUST stay distinct from
 *   marketing and technical registers.
 *
 * Last reviewed: 2026-06-25
 */

export const FRANKX_VOICE = {
  /**
   * Who Frank is — the identity anchor every voice decision flows from.
   */
  identity: {
    name: 'Frank',
    title: 'AI Architect', // memory-anchored — see below
    role: 'AI Architect & Creator',
    positioning: 'Elite Creator. AI Architect. Humble Excellence.',
    narrative:
      'Personal AI CoE — enterprise AI architecture patterns (Strategy, Governance, Talent, Technology, Data, Ethics) translated into practical systems for creators, entrepreneurs, and operators.',
    proof: [
      '12,000+ AI songs shipped',
      'Built Oracle EMEA AI CoE — 1000+ requests handled',
      'Helped build a seven-figure business',
      'ACOS, Workshop OS, Watch OS, Library OS, SIS, IIS shipped to production',
    ],
    disclaimer: 'Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.',
  },

  /**
   * The four core brand attributes.
   * Every surface must read against all four — not just one.
   */
  attributes: [
    {
      name: 'Excellence',
      meaning: 'Every detail matters. Ultra-high quality. No average ships.',
    },
    {
      name: 'Craftsmanship',
      meaning: 'Meticulous attention to design, code, and copy. The work is the proof.',
    },
    {
      name: 'Humility',
      meaning: 'Let the work speak. Results over claims. The brand never shouts.',
    },
    {
      name: 'Depth',
      meaning: 'Technical sophistication with creative flair. Name the abstraction, then show the code.',
    },
  ],

  /**
   * Voice rules — the do/don't contract.
   * Pulled from CLAUDE.md, brand-rules/SKILL.md, and brand-discipline.md.
   */
  voiceRules: {
    do: [
      'Lead with results. Ship-shipped-shipping language.',
      'Use precise technical language: "AI Architect", "agentic orchestration", "MCP protocol", "dual-repo deploy".',
      'Show, don\'t tell. Concrete examples beat abstract claims.',
      'Confident but understated. Authority through specificity, not volume.',
      'Use specific numbers when they exist. "12,000+ AI songs" beats "many AI songs".',
      'Active voice. Strong verbs. Find the real verb instead of "helps/enables/empowers".',
      'First person when first person is the truth. "I built this" beats "We built this" when one person built it.',
      'One idea per paragraph. If a paragraph turns a corner, it\'s two paragraphs.',
      'Read every draft aloud. If a sentence sounds like a model, rewrite.',
    ],
    dont: [
      'No spiritual or consciousness-coach language ("journey", "transformation", "awakening", "luminous", "manifest").',
      'No grandiose claims without proof ("revolutionary", "game-changing", "disrupt", "next-level").',
      'No self-help guru tone ("unlock your potential", "step into your power", "level up your life").',
      'No personal life details (family references stay out of the public brand surface).',
      'No vague CTAs ("Learn More", "Click Here", "Explore", "Find Out More", "Discover").',
      'No AI-slop tells ("delve", "dive into", "it\'s worth noting", "certainly", "absolutely").',
      'No em-dash overuse (the AI-slop tell of 2024–2025).',
      'No filler verbs ("helps", "enables", "allows", "empowers") — find the real verb.',
      'No Arcanean mythology on FrankX surfaces. (See arcaneaQuarantine list.)',
      'No expanded title variants, no "AI guy" — the title is "AI Architect".',
    ],
  },

  /**
   * Banned phrases — case-insensitive substring matches.
   * Drawn from taste.md "What we refuse", brand-discipline.md,
   * brand-rules/SKILL.md voice DON'Ts, and CLAUDE.md.
   *
   * If you find a phrase Frank hates that's missing, add it here.
   */
  bannedPhrases: [
    // The AI-tone classics
    'delve',
    'delve into',
    'dive into',
    'dive deep',
    'deep dive',
    "it's worth noting",
    'it is worth noting',
    'certainly',
    'absolutely',
    'in conclusion',
    'in summary',
    'navigate the landscape',
    'unleash',
    'harness',
    'leverage',
    'utilize',
    'utilization',
    // Generic SaaS hero language
    'empower your team',
    'unlock your potential',
    'take your',
    'to the next level',
    'next-level',
    'game-changing',
    'game-changer',
    'revolutionary',
    'disrupt',
    'disruptive',
    'cutting-edge',
    'bleeding-edge',
    'world-class',
    'best-in-class',
    'industry-leading',
    'seamless',
    'seamlessly',
    'effortless',
    'effortlessly',
    'robust',
    'innovative solution',
    'innovative solutions',
    'thought leader',
    'thought leadership',
    'synergy',
    'synergies',
    'paradigm shift',
    // Spiritual / coach tone
    'journey',
    'transformation',
    'transformative',
    'awakening',
    'luminous',
    'manifest your',
    'step into your power',
    'level up your life',
    'unlock your',
    // Vague CTAs (handled separately too, but listed for polish-content scans)
    'learn more',
    'click here',
    'find out more',
    'read more',
    // Filler verbs that almost always mark a weak sentence
    'helps you',
    'enables you',
    'allows you',
    'empowers you',
  ],

  /**
   * Arcanea quarantine — vocabulary that ONLY lives in the Arcanea repo
   * and /ultraworld. These words must NEVER appear in FrankX brand surfaces
   * (app/, components/, content/blog/, content/guides/).
   *
   * Exception zones (allowed):
   *   - docs/ when documenting the boundary itself
   *   - .claude/skills/ when documenting the rule
   *   - this file (defining the quarantine)
   *
   * See brand-discipline.md § Arcanean leak detection for the grep test.
   */
  arcaneaQuarantine: [
    'Guardian',
    'Guardians',
    'Gate',
    'Gates',
    'Realm',
    'Realms',
    'Seeker',
    'Seekers',
    'Source',
    'Shinkami',
    'Luminor',
    'Luminors',
    'Arcanean',
    'Arcanea mythology',
    'Mystic',
    'Mystics',
    'Oracle of Arcanea',
    'Sage',
    'Sages',
    'Ascension',
    'Ascend',
    'Awakened One',
  ],

  /**
   * The title — memory-anchored, repeated for emphasis.
   * Any code that surfaces Frank's title must read this constant.
   */
  modelTitle: 'AI Architect',

  /**
   * Tone adaptation by context.
   * The same voice attributes (Excellence, Craftsmanship, Humility, Depth)
   * apply across all four — but the register shifts.
   */
  toneAdaptation: {
    technical: {
      description:
        'Precise, dense, evidence-first. Used in docs, technical blog posts, system specs, code comments, and architecture deep-dives. Names the abstraction, then shows the code. Reads like Stripe or Vercel docs — every sentence earns its place.',
      lengthBias: 'medium-to-long',
      examples: ['ACOS spec posts', 'docs/superpowers/specs/*', 'README files', 'API reference copy'],
    },
    educational: {
      description:
        'Patient, structured, scaffolded. Used in workshops, tutorials, course content, and the Library OS hubs. Leads with the result the reader will get, then walks the steps. Confident but never condescending. Always concrete.',
      lengthBias: 'medium',
      examples: ['/workshops/*', '/library/{slug}', 'tutorial content/blog posts'],
    },
    marketing: {
      description:
        'Confident but understated. Used on landing pages, hero sections, CTAs, and product pages. Shows the proof (12,000+ songs, Oracle EMEA, shipped systems) instead of claiming it. Specific outcomes, never vague verbs. Pricing is honest — no fake urgency, no countdown timers.',
      lengthBias: 'short',
      examples: ['/start-here', '/build', '/founders-circle', 'homepage hero copy'],
    },
    introspective: {
      description:
        'Darker, slower, editorial. Used on the contemplative rails (/on-god/, /on-reality/, /on-consciousness/, /on-faith/), /canon/, and the IFS / Psyche-layer surfaces. Source Serif 4 typography, warm cream ink, longer line length, double section padding. The brand at quarter-speed. No funnel, no newsletter form, no social-share buttons — these surfaces do not sell. Same voice attributes, but the cadence is reading-pace, not scroll-pace. See docs/superpowers/specs/2026-05-13-prompt-hub-design.md for the design rationale.',
      lengthBias: 'long-form',
      examples: [
        '/on-god',
        '/on-reality',
        '/on-consciousness',
        '/on-faith',
        '/canon',
        '/study',
        'introspective newsletter editions',
      ],
    },
  },
} as const;

export type FrankxVoice = typeof FRANKX_VOICE;

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------

/**
 * Returns true if the given text contains any banned phrase
 * (case-insensitive substring match on word-ish boundaries).
 *
 * Use for polish-content gates, prompt-optimizer rewrites, and pre-publish
 * lint checks. Do NOT use this to silently rewrite — surface the hit so a
 * human can correct it.
 */
export function isBannedPhrase(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return FRANKX_VOICE.bannedPhrases.some((phrase) => lower.includes(phrase.toLowerCase()));
}

/**
 * Returns every banned phrase found in the given text (deduplicated,
 * lower-cased). Empty array when clean.
 */
export function findBannedPhrases(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const hits = new Set<string>();
  for (const phrase of FRANKX_VOICE.bannedPhrases) {
    if (lower.includes(phrase.toLowerCase())) {
      hits.add(phrase.toLowerCase());
    }
  }
  return Array.from(hits);
}

/**
 * Returns true if the given text contains any Arcanea-quarantined term.
 * Matches whole-word, case-insensitive. Use to block Arcanean leaks on
 * FrankX surfaces (app/, components/, content/blog/, content/guides/).
 */
export function isQuarantined(text: string): boolean {
  if (!text) return false;
  return FRANKX_VOICE.arcaneaQuarantine.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    return re.test(text);
  });
}

/**
 * Returns every quarantined term found in the given text (deduplicated,
 * original-cased from the quarantine list). Empty array when clean.
 */
export function findQuarantinedTerms(text: string): string[] {
  if (!text) return [];
  const hits = new Set<string>();
  for (const term of FRANKX_VOICE.arcaneaQuarantine) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    if (re.test(text)) hits.add(term);
  }
  return Array.from(hits);
}
