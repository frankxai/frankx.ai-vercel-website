/**
 * Agentic Creator OS Documentation Content
 *
 * Structured content for documentation pages.
 * Uses typed content blocks for safe rendering.
 */

type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; code: string; language?: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string; variant: 'tip' | 'warning' | 'info' }
  | { type: 'table'; headers: string[]; rows: string[][] }

interface DocSection {
  id: string
  title: string
}

interface RelatedLink {
  title: string
  url: string
  external?: boolean
}

interface HowToStep {
  title: string
  description: string
}

export interface DocContent {
  title: string
  description: string
  category: string
  keywords: string[]
  readTime?: string
  sections?: DocSection[]
  contentBlocks: ContentBlock[]
  relatedLinks?: RelatedLink[]
  steps?: HowToStep[]
}

export const docsContent: Record<string, DocContent> = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Install Agentic Creator OS and run your first skill in minutes.',
    category: 'Guide',
    keywords: ['agentic creator os installation', 'claude code setup'],
    readTime: '5 min',
    sections: [
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'installation', title: 'Installation' },
      { id: 'first-steps', title: 'First Steps' }
    ],
    steps: [
      { title: 'Install Prerequisites', description: 'Ensure Claude Code and Node.js 18+ are installed' },
      { title: 'Run Installer', description: 'Use npm or clone the repository' },
      { title: 'Test a Skill', description: 'Verify installation by activating a skill' }
    ],
    contentBlocks: [
      { type: 'heading', level: 2, text: 'Prerequisites', id: 'prerequisites' },
      { type: 'list', items: [
        'Claude Code installed and configured',
        'Node.js 18+ (for MCP servers)',
        'Git (for cloning and updates)'
      ]},
      { type: 'heading', level: 2, text: 'Installation', id: 'installation' },
      { type: 'code', code: 'npm install -g @frankx/agentic-creator-os\nacos install', language: 'bash' },
      { type: 'callout', text: 'The installer creates skill files in ~/.claude-skills/ automatically.', variant: 'tip' },
      { type: 'heading', level: 2, text: 'First Steps', id: 'first-steps' },
      { type: 'paragraph', text: 'After installation, verify everything works:' },
      { type: 'code', code: 'acos status\nacos list skills', language: 'bash' },
      { type: 'paragraph', text: 'Try activating a skill:' },
      { type: 'code', code: '/skill content-strategy', language: 'bash' }
    ],
    relatedLinks: [
      { title: 'Skills Guide', url: '/products/agentic-creator-os/docs/skills' },
      { title: 'GitHub Repository', url: 'https://github.com/frankxai/agentic-creator-os', external: true }
    ]
  },

  'skills': {
    title: 'Skills Guide',
    description: 'Deep dive into the 62 skills that power your creative workflows.',
    category: 'Guide',
    keywords: ['claude code skills', 'ai skills system', 'custom ai skills'],
    readTime: '10 min',
    sections: [
      { id: 'what-are-skills', title: 'What Are Skills?' },
      { id: 'skill-categories', title: 'Skill Categories' },
      { id: 'using-skills', title: 'Using Skills' },
      { id: 'creating-skills', title: 'Creating Skills' }
    ],
    contentBlocks: [
      { type: 'heading', level: 2, text: 'What Are Skills?', id: 'what-are-skills' },
      { type: 'paragraph', text: 'Skills are specialized knowledge modules that enhance Claude capabilities for specific domains.' },
      { type: 'callout', text: 'Skills use Progressive Disclosure: Metadata (100 tokens) then Instructions (5k tokens) then Resources (on-demand).', variant: 'info' },
      { type: 'heading', level: 2, text: 'Skill Categories', id: 'skill-categories' },
      { type: 'table', headers: ['Category', 'Count', 'Examples'], rows: [
        ['Technical', '18', 'TDD, debugging, mcp-architecture'],
        ['Creative', '8', 'content-strategy, frankx-brand'],
        ['Business', '2', 'oci-services-expert'],
        ['Personal', '4', 'spartan-warrior, gym-training'],
        ['Soulbook', '25', '7 pillars, life-symphony']
      ]},
      { type: 'heading', level: 2, text: 'Using Skills', id: 'using-skills' },
      { type: 'paragraph', text: 'Skills activate automatically when Claude detects relevant keywords, or invoke explicitly:' },
      { type: 'code', code: '/skill content-strategy\n/skill test-driven-development', language: 'bash' },
      { type: 'heading', level: 2, text: 'Creating Skills', id: 'creating-skills' },
      { type: 'code', code: '---\nname: my-skill\ndescription: What it does\nauthor: Your Name\nversion: 1.0.0\n---\n\n# My Skill\n\n## When to Use\n- Scenario 1\n- Scenario 2', language: 'markdown' },
      { type: 'callout', text: 'Keep skill files under 500 lines.', variant: 'warning' }
    ],
    relatedLinks: [
      { title: 'Agents Guide', url: '/products/agentic-creator-os/docs/agents' },
      { title: 'Skill Template', url: 'https://github.com/frankxai/agentic-creator-os/blob/main/templates/SKILL_TEMPLATE.md', external: true }
    ]
  },

  'agents': {
    title: 'Agents Guide',
    description: 'Understand the multi-agent architecture with 9 specialized AI personas.',
    category: 'Guide',
    keywords: ['ai agent system', 'multi-agent ai', 'weighted synthesis'],
    readTime: '8 min',
    sections: [
      { id: 'agent-system', title: 'The Agent System' },
      { id: 'specialist-agents', title: 'Specialist Agents' },
      { id: 'weighted-synthesis', title: 'Weighted Synthesis' }
    ],
    contentBlocks: [
      { type: 'heading', level: 2, text: 'The Agent System', id: 'agent-system' },
      { type: 'paragraph', text: 'Unlike skills (knowledge), agents provide personality and judgment.' },
      { type: 'heading', level: 2, text: 'Specialist Agents', id: 'specialist-agents' },
      { type: 'table', headers: ['Agent', 'Domain', 'Weight'], rows: [
        ['Starlight Orchestrator', 'Coordination', 'Synthesizer'],
        ['Luminor Oracle', 'Strategy', '30%'],
        ['Creation Engine', 'Content', '25%'],
        ['Technical Translator', 'Education', '25%'],
        ['Frequency Alchemist', 'Music', '20%']
      ]},
      { type: 'heading', level: 2, text: 'Weighted Synthesis', id: 'weighted-synthesis' },
      { type: 'paragraph', text: 'When multiple agents contribute, their perspectives are weighted and synthesized by the Starlight Orchestrator.' },
      { type: 'callout', text: 'Request multi-agent perspectives: "Get perspectives from all specialists."', variant: 'tip' }
    ],
    relatedLinks: [
      { title: 'Workflows Guide', url: '/products/agentic-creator-os/docs/workflows' },
      { title: 'Skills Guide', url: '/products/agentic-creator-os/docs/skills' }
    ]
  },

  'workflows': {
    title: 'Workflows Guide',
    description: 'Build orchestrated pipelines that coordinate skills and agents.',
    category: 'Guide',
    keywords: ['ai workflows', 'orchestrated pipelines', 'automation'],
    readTime: '12 min',
    sections: [
      { id: 'patterns', title: 'Workflow Patterns' },
      { id: 'built-in', title: 'Built-in Workflows' },
      { id: 'creating', title: 'Creating Workflows' }
    ],
    contentBlocks: [
      { type: 'heading', level: 2, text: 'Workflow Patterns', id: 'patterns' },
      { type: 'paragraph', text: 'Three main patterns: Pipeline, Parallel, and Iterative.' },
      { type: 'code', code: 'Pipeline: Research -> Plan -> Create -> Publish\nParallel: Split -> [A, B, C] -> Synthesis\nIterative: Create -> Evaluate -> [Loop]', language: 'text' },
      { type: 'heading', level: 2, text: 'Built-in Workflows', id: 'built-in' },
      { type: 'table', headers: ['Workflow', 'Command'], rows: [
        ['Daily Content Ops', '/daily-content-ops'],
        ['Publishing Factory', '/factory'],
        ['Research', '/research [topic]']
      ]},
      { type: 'heading', level: 2, text: 'Creating Workflows', id: 'creating' },
      { type: 'code', code: 'name: my-workflow\nsteps:\n  - id: research\n    type: skill\n    skill: content-strategy\n  - id: create\n    type: agent\n    agent: creation-engine', language: 'yaml' }
    ],
    relatedLinks: [
      { title: 'MCP Integration', url: '/products/agentic-creator-os/docs/mcp' }
    ]
  },

  'mcp': {
    title: 'MCP Integration',
    description: 'Connect external tools via Model Context Protocol servers.',
    category: 'Guide',
    keywords: ['mcp servers', 'model context protocol', 'claude code tools'],
    readTime: '10 min',
    sections: [
      { id: 'what-is-mcp', title: 'What is MCP?' },
      { id: 'servers', title: 'Available Servers' },
      { id: 'setup', title: 'Setup' }
    ],
    contentBlocks: [
      { type: 'heading', level: 2, text: 'What is MCP?', id: 'what-is-mcp' },
      { type: 'paragraph', text: 'MCP (Model Context Protocol) connects AI assistants to external tools.' },
      { type: 'heading', level: 2, text: 'Available Servers', id: 'servers' },
      { type: 'table', headers: ['Server', 'Purpose'], rows: [
        ['Browser', 'Web automation'],
        ['Memory', 'Knowledge persistence'],
        ['Sequential Thinking', 'Structured reasoning'],
        ['Filesystem', 'File operations']
      ]},
      { type: 'heading', level: 2, text: 'Setup', id: 'setup' },
      { type: 'code', code: '{\n  "mcpServers": {\n    "browser": {\n      "command": "npx",\n      "args": ["@anthropic/mcp-browser"]\n    }\n  }\n}', language: 'json' },
      { type: 'callout', text: 'Restart Claude Code after changing MCP configuration.', variant: 'warning' }
    ],
    relatedLinks: [
      { title: 'MCP Specification', url: 'https://modelcontextprotocol.io/', external: true },
      { title: 'Getting Started', url: '/products/agentic-creator-os/docs/getting-started' }
    ]
  }
}
