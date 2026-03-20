import type { AITool } from './types'

/**
 * Shared AI Toolkit — the modern professional AI stack.
 * Used across /professors, /researchers, /doctors pages.
 */
export const aiToolkit: AITool[] = [
  {
    name: 'Claude',
    maker: 'Anthropic',
    description: 'Advanced reasoning, code generation, long documents. Projects for persistent context. Claude Code for terminal-based agentic development.',
    useCases: ['Deep analysis and writing', 'Code generation and review', 'Research synthesis', 'Curriculum design'],
    href: 'https://claude.ai',
    color: 'violet',
    badge: 'Best for Reasoning',
  },
  {
    name: 'ChatGPT',
    maker: 'OpenAI',
    description: 'Multimodal AI with Canvas for collaborative editing. Advanced Data Analysis for spreadsheets. DALL-E for images. Operator for web tasks.',
    useCases: ['Data analysis and visualization', 'Collaborative document editing', 'Image generation', 'Web-based task automation'],
    href: 'https://chat.openai.com',
    color: 'emerald',
    badge: 'Most Versatile',
  },
  {
    name: 'Perplexity',
    maker: 'Perplexity AI',
    description: 'AI-powered research with real-time citations. Deep Research mode for comprehensive literature reviews. Academic-grade sourcing.',
    useCases: ['Literature reviews with citations', 'Fact-checking claims', 'Market research', 'Competitive analysis'],
    href: 'https://perplexity.ai',
    color: 'cyan',
    badge: 'Best for Research',
  },
  {
    name: 'Claude Code',
    maker: 'Anthropic',
    description: 'Terminal-based agentic coding agent. Plans, writes, tests, and deploys autonomously. 500+ skills via ACOS. MCP server integration.',
    useCases: ['Build apps from natural language', 'Automate workflows', 'Data pipeline creation', 'Rapid prototyping'],
    href: '/acos',
    color: 'violet',
    badge: 'Best Coding Agent',
  },
  {
    name: 'Cursor',
    maker: 'Anysphere',
    description: 'IDE with AI built in. Understands your entire codebase. Tab completion, chat, and agent mode for multi-file edits.',
    useCases: ['Code editing with AI assistance', 'Codebase-wide refactoring', 'Bug fixing', 'Documentation generation'],
    href: 'https://cursor.com',
    color: 'cyan',
    badge: 'Best IDE',
  },
  {
    name: 'Gemini',
    maker: 'Google',
    description: '1M+ token context. Google Search grounding. Deep Think mode for complex reasoning. NotebookLM for document analysis.',
    useCases: ['Long document analysis', 'Research with Google grounding', 'Audio/podcast summarization', 'Knowledge base creation'],
    href: 'https://gemini.google.com',
    color: 'amber',
    badge: 'Longest Context',
  },
]

/**
 * AI Interaction Patterns — how professionals should think about AI.
 */
export const aiPatterns = [
  {
    name: 'Coworker Mode',
    description: 'Use AI as a thought partner. Share context, iterate together, refine outputs. Best for: writing, analysis, brainstorming.',
    tools: ['Claude Projects', 'ChatGPT Canvas'],
    color: 'emerald',
  },
  {
    name: 'Dispatch Mode',
    description: 'Send AI on a mission with clear instructions. Review the output. Best for: research, data processing, first drafts.',
    tools: ['Perplexity Deep Research', 'Claude with system prompts'],
    color: 'cyan',
  },
  {
    name: 'Code Mode',
    description: 'Use AI to build software, automate workflows, and create tools. Best for: apps, dashboards, data pipelines, automation.',
    tools: ['Claude Code', 'Cursor', 'GitHub Copilot'],
    color: 'violet',
  },
  {
    name: 'Council Mode',
    description: 'Run the same problem through multiple models and synthesize the best insights. Best for: critical decisions, research validation.',
    tools: ['Claude + ChatGPT + Gemini', 'Model comparison'],
    color: 'amber',
  },
]
