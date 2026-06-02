/**
 * Creator-stack lens — the differentiator vs dev/enterprise comparison sites.
 *
 * Creators don't pick "a model"; they assemble a stack across modalities.
 * Each stack names the modality, the picks (with why), and the workflow.
 * Model ids reference the registry where applicable; non-registry tools
 * (Suno, nano-banana, etc.) are named directly with a link.
 */

export interface StackPick {
  name: string
  /** Registry model id, if it's a tracked LLM. */
  modelId?: string
  /** External link (provider/product) for non-registry tools. */
  href?: string
  why: string
  /** 'primary' is the headline pick; 'alt' is the runner-up. */
  role: 'primary' | 'alt'
}

export interface CreatorStack {
  slug: string
  modality: string
  emoji: string
  accent: string
  headline: string
  picks: StackPick[]
  workflow: string
  /** Internal link to a deeper FrankX surface, if any. */
  deeper?: { label: string; href: string }
}

export const CREATOR_STACKS: CreatorStack[] = [
  {
    slug: 'music',
    modality: 'Music',
    emoji: '🎵',
    accent: '#f59e0b',
    headline: 'Generate, arrange, and master AI music',
    picks: [
      { name: 'Suno v5', href: 'https://suno.com', why: 'Best end-to-end song generation — vocals, structure, mastering', role: 'primary' },
      { name: 'Claude Opus 4.6', modelId: 'claude-opus-4-6', why: 'Lyric writing, prompt engineering, genre research', role: 'alt' },
    ],
    workflow: 'Draft lyrics + style prompt with Claude → generate in Suno → iterate sections → export and master. The LLM is the creative director; Suno is the band.',
    deeper: { label: 'AI Music Masterclass', href: '/workshops/ai-music-masterclass' },
  },
  {
    slug: 'image',
    modality: 'Image',
    emoji: '🎨',
    accent: '#3b82f6',
    headline: 'Generate and edit on-brand visuals',
    picks: [
      { name: 'Nano Banana (Gemini image)', href: 'https://aistudio.google.com', why: 'Best precise object-level editing + brand consistency', role: 'primary' },
      { name: 'Imagen 4', href: 'https://deepmind.google/technologies/imagen', why: 'High-fidelity text-to-image inside the Google stack', role: 'alt' },
    ],
    workflow: 'Concept + prompt with an LLM → generate hero with Imagen/Nano Banana → object-level edits (swap, resize, recolor) → export to the design system.',
    deeper: { label: 'Visual creation system', href: '/infogenius' },
  },
  {
    slug: 'video',
    modality: 'Video',
    emoji: '🎬',
    accent: '#ec4899',
    headline: 'Generate and edit video with natural language',
    picks: [
      { name: 'Gemini Omni', modelId: 'gemini-omni', why: 'Native video gen + natural-language editing, agent-pipeline ready', role: 'primary' },
      { name: 'Sora 2 / Veo 3', href: 'https://openai.com/sora', why: 'High cinematic fidelity for hero pieces', role: 'alt' },
    ],
    workflow: 'Script with an LLM → generate with Omni → edit by instruction (background swap, camera angle) → produce. Increasingly a single agentic sequence.',
  },
  {
    slug: 'writing',
    modality: 'Writing',
    emoji: '✍️',
    accent: '#10b981',
    headline: 'Long-form, on-voice writing at depth',
    picks: [
      { name: 'Claude Opus 4.6', modelId: 'claude-opus-4-6', why: 'Best long-context synthesis and voice fidelity', role: 'primary' },
      { name: 'Claude Sonnet 4.5', modelId: 'claude-sonnet-4-5', why: 'Faster, cheaper for drafts and iteration', role: 'alt' },
    ],
    workflow: 'Research + outline with Opus (1M context holds your whole corpus) → draft → tighten with Sonnet → publish. The brand voice gate stays human.',
    deeper: { label: 'Content Studio', href: '/content-studio' },
  },
  {
    slug: 'coding',
    modality: 'Coding',
    emoji: '⌨️',
    accent: '#a855f7',
    headline: 'Ship code with agentic assistants',
    picks: [
      { name: 'Gemini 3.5 Flash', modelId: 'gemini-3-5-flash', why: 'Best agentic-coding benchmark at low cost (76.2% Terminal-Bench 2.1)', role: 'primary' },
      { name: 'Claude Opus 4.6', modelId: 'claude-opus-4-6', why: 'Hardest reasoning + multi-file refactors + Agent Teams', role: 'alt' },
    ],
    workflow: 'Flash for the high-volume agent loop, Opus 4.6 for the critical reasoning path. Run inside Claude Code, Cursor, or Antigravity 2.0.',
    deeper: { label: 'Frontier Models Arena', href: '/ai-ops/models-2026' },
  },
]

export function getCreatorStack(slug: string): CreatorStack | undefined {
  return CREATOR_STACKS.find((s) => s.slug === slug)
}
