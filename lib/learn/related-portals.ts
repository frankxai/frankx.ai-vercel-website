/**
 * Explicit guide/research-slug → /learn portal-slug mappings.
 *
 * Deliberately explicit rather than tag-inferred: tags drift and retag over
 * time, which would silently point a page at the wrong portal. A hand-kept map
 * is greppable and reviewable in a PR. Unknown slugs fall back to the full set
 * of model-maker portals (the hub as a whole), and LearnHubSection silently
 * drops any portal slug that no longer resolves — so a rename can't break a page.
 *
 * When Phase 3 adds cloud (aws-bedrock, azure-ai-foundry, oracle-oci-genai) and
 * creative (suno-music, midjourney, notebooklm) portals, add their slugs to the
 * relevant guide/research entries here (e.g. midjourney-guide → midjourney).
 */

/** The four model-maker portals live today. Order is the display order. */
export const MODEL_MAKER_PORTALS = [
  'claude-mastery',
  'codex-mastery',
  'chatgpt-mastery',
  'gemini-mastery',
] as const

/** content/guides/<slug>.mdx → portal slugs. Omitted guides get the default set. */
const GUIDE_PORTALS: Record<string, string[]> = {
  'claude-anthropic-guide': ['claude-mastery'],
  'claude-code-getting-started': ['claude-mastery', 'codex-mastery'],
  'openai-chatgpt-guide': ['chatgpt-mastery'],
  'image-generation-mastery': ['gemini-mastery'],
  'ai-writing-system': ['claude-mastery', 'chatgpt-mastery'],
  'first-agent-primer': ['claude-mastery', 'codex-mastery'],
  'agent-collective-operating-system': ['claude-mastery'],
  'top-50-ai-prompts': ['chatgpt-mastery', 'claude-mastery'],
  'skills-library-playbook': ['claude-mastery'],
  'frankx-skill-creation-methodology': ['claude-mastery'],
}

/** lib/research/domains.ts <slug> → portal slugs. Omitted domains get the default set. */
const RESEARCH_PORTALS: Record<string, string[]> = {
  'generative-ai': ['claude-mastery', 'codex-mastery', 'chatgpt-mastery', 'gemini-mastery'],
  'model-arena': ['claude-mastery', 'codex-mastery', 'chatgpt-mastery', 'gemini-mastery'],
  'agent-benchmarks': ['claude-mastery', 'codex-mastery', 'chatgpt-mastery', 'gemini-mastery'],
  'coding-assistants': ['claude-mastery', 'codex-mastery', 'gemini-mastery'],
  'agent-frameworks': ['claude-mastery', 'codex-mastery', 'gemini-mastery'],
  'ai-agent-config': ['claude-mastery', 'codex-mastery'],
  'multi-agent-systems': ['claude-mastery', 'gemini-mastery'],
  'prompt-engineering': ['claude-mastery', 'chatgpt-mastery'],
  'context-engineering': ['claude-mastery'],
  'production-patterns': ['claude-mastery'],
  'mcp-ecosystem': ['claude-mastery'],
  'ai-creative-tools': ['gemini-mastery'],
}

/** Portals to surface at the bottom of a guide page. */
export function portalsForGuide(slug: string): string[] {
  // Spread so callers get a fresh array — never a reference into the shared map.
  return [...(GUIDE_PORTALS[slug] ?? MODEL_MAKER_PORTALS)]
}

/** Portals to surface at the bottom of a research domain page. */
export function portalsForResearch(slug: string): string[] {
  // Spread so callers get a fresh array — never a reference into the shared map.
  return [...(RESEARCH_PORTALS[slug] ?? MODEL_MAKER_PORTALS)]
}
