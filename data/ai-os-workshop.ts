import type { Workshop } from './workshops'

/** Research-backed curriculum candidate; provenance remains studio-draft. */
export const aiOperatingSystemsWorkshop: Workshop = {
  "slug": "ai-operating-systems",
  "title": "Build an AI operating system",
  "subtitle": "Agents, accountable memory and coordinated work \u2014 with twelve lessons and a tested offline lab",
  "duration": "12 hours + 4-hour capstone",
  "audience": "Founders and technical operators building repeatable work",
  "difficulty": "Advanced",
  "moduleCount": 12,
  "color": "cyan",
  "provenance": "studio-draft",
  "overview": "A researched studio curriculum for self-study and a facilitated pilot. Start with one owned workflow; build a bounded agent, scoped memory, tool contracts and quality checks; then compare coordinated workers. Apply the same discipline to founder operations, creative studios, organizations, family projects and personal learning. The offline lab uses synthetic fixtures. Cloud, provider and production integrations remain learner implementation work.",
  "objectives": [
    "Define a task with ownership, authority, budget and measurable acceptance.",
    "Build scoped, source-backed memory with correction, deletion and export.",
    "Evaluate one agent against coordinated workers, including failed attempts and review time.",
    "Design recoverable studio, organizational and personal workflows.",
    "Deliver a capstone with test evidence, cost assumptions and rollback."
  ],
  "prerequisites": [
    "One recurring job you own and can measure.",
    "Node.js 22 or newer for the offline lab; basic JavaScript for adaptation.",
    "Synthetic data for all exercises.",
    "Optional later integrations: provider API access, a development database and a controlled budget."
  ],
  "selfStudyResource": {
    "href": "/workshops/ai-operating-systems/workbook.md",
    "label": "Download the workbook",
    "description": "Read the full lessons and download the offline lab directly. No signup is required."
  },
  "modules": [
    {
      "title": "Ownership before autonomy",
      "duration": "60 min planning estimate",
      "description": "A useful operating system begins with a unit of work somebody will accept. Choose a weekly job with inputs you can inspect, a result you can test, and an owner who can reject it. Build: One task contract and one measurable baseline.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: A named human can accept or reject the artifact. The completion test is observable without asking the maker whether it succeeded.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#ownership"
        },
        {
          "label": "Building effective agents",
          "href": "https://www.anthropic.com/engineering/building-effective-agents"
        },
        {
          "label": "Harness engineering",
          "href": "https://openai.com/index/harness-engineering/"
        },
        {
          "label": "Building more effective AI agents",
          "href": "https://www.youtube.com/watch?v=uhJJgc-0iTQ"
        }
      ]
    },
    {
      "title": "One agent that finishes",
      "duration": "60 min planning estimate",
      "description": "Model capability becomes useful through the environment around it: instructions, tools, state, budgets and feedback. A fluent final message provides weak evidence of completion. Build: A bounded loop with a trace and a stop reason.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Every terminal state includes a machine-readable reason. The artifact and tool trace support the completion claim.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#single-agent"
        },
        {
          "label": "Building agents",
          "href": "https://ai-sdk.dev/docs/agents/building-agents"
        },
        {
          "label": "Agent SDK overview",
          "href": "https://code.claude.com/docs/en/agent-sdk/overview"
        },
        {
          "label": "Agents API overview",
          "href": "https://developers.openai.com/api/docs/guides/agents-api/overview"
        },
        {
          "label": "Claude Managed Agents",
          "href": "https://platform.claude.com/docs/en/managed-agents/overview"
        }
      ]
    },
    {
      "title": "Tools and MCP with narrow authority",
      "duration": "60 min planning estimate",
      "description": "A tool exposes a capability. Its schema describes the request; the server decides whether the caller has authority to perform it. Build: A tool contract, an access matrix and a negative test.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Unauthorized requests fail before side effects. Tool errors are visible and cannot be mistaken for successful writes.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#tools"
        },
        {
          "label": "Writing effective tools for AI agents",
          "href": "https://www.anthropic.com/engineering/writing-tools-for-agents"
        },
        {
          "label": "MCP specification",
          "href": "https://modelcontextprotocol.io/specification/latest"
        },
        {
          "label": "A2A protocol",
          "href": "https://a2a-protocol.org/latest/"
        }
      ]
    },
    {
      "title": "Memory that stays accountable",
      "duration": "60 min planning estimate",
      "description": "Persistence keeps data. Retrieval chooses context. Acceptance determines what the system is allowed to treat as known. Build: Scoped records with provenance, expiry and conflict handling.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Stale, rejected and unauthorized records stay out of the context. An inference cannot become an accepted fact without an accountable acceptance step.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#memory"
        },
        {
          "label": "Persistence",
          "href": "https://docs.langchain.com/oss/python/langgraph/persistence"
        },
        {
          "label": "Effective context engineering for AI agents",
          "href": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
        },
        {
          "label": "Row level security",
          "href": "https://supabase.com/docs/guides/database/postgres/row-level-security"
        }
      ]
    },
    {
      "title": "Skills, standards and evaluations",
      "duration": "60 min planning estimate",
      "description": "A procedure describes how to work. An evaluation measures whether the resulting work deserves acceptance. Build: A reusable procedure and a held-out evaluation set.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: A held-out fixture can fail and block the candidate. The evaluator records reasons and evidence, not only a score.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#quality"
        },
        {
          "label": "Agent Skills specification",
          "href": "https://agentskills.io/specification"
        },
        {
          "label": "Demystifying evals for AI agents",
          "href": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
        },
        {
          "label": "Harness engineering",
          "href": "https://openai.com/index/harness-engineering/"
        }
      ]
    },
    {
      "title": "Multiple workers without shared-state chaos",
      "duration": "60 min planning estimate",
      "description": "Parallel work pays when subtasks have useful boundaries and the results can be reconciled. The number of agents is a cost decision. Build: A worker plan with isolated artifacts and one reconciler.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Workers cannot overwrite each other\u2019s accepted output. Delegation improves measured outcomes enough to justify its cost.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#workers"
        },
        {
          "label": "How we built our multi-agent research system",
          "href": "https://www.anthropic.com/engineering/multi-agent-research-system"
        },
        {
          "label": "A2A protocol",
          "href": "https://a2a-protocol.org/latest/"
        },
        {
          "label": "Building Effective Agents with LangGraph",
          "href": "https://www.youtube.com/watch?v=aHCDrAbH_go"
        }
      ]
    },
    {
      "title": "Durable execution and recovery",
      "duration": "60 min planning estimate",
      "description": "A browser request, a durable job and an always-on assistant have different lifetimes. Give each the runtime its work requires. Build: A run state machine, idempotency test and recovery log.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: A repeated delivery request creates one intended operation. Restart preserves run state and applies the same permission and cost limits.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#runtime"
        },
        {
          "label": "Agents API overview",
          "href": "https://developers.openai.com/api/docs/guides/agents-api/overview"
        },
        {
          "label": "Agent SDK overview",
          "href": "https://code.claude.com/docs/en/agent-sdk/overview"
        },
        {
          "label": "Persistence",
          "href": "https://docs.langchain.com/oss/python/langgraph/persistence"
        },
        {
          "label": "OpenClaw documentation",
          "href": "https://docs.openclaw.ai/"
        },
        {
          "label": "Hermes Agent documentation",
          "href": "https://hermes-agent.nousresearch.com/docs/"
        }
      ]
    },
    {
      "title": "How a human studio delivers",
      "duration": "60 min planning estimate",
      "description": "The studio moves work from a clear brief to a reviewed artifact somebody can use. Agents occupy bounded roles inside that production process. Build: A brief, production board, review packet and delivery manifest.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: The deliverable can be opened and used outside the originating tool. The accepted version and its rights are unambiguous.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#studio"
        },
        {
          "label": "Harness engineering",
          "href": "https://openai.com/index/harness-engineering/"
        },
        {
          "label": "Demystifying evals for AI agents",
          "href": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
        }
      ]
    },
    {
      "title": "Founder and organization operating systems",
      "duration": "60 min planning estimate",
      "description": "Organizational memory should make responsibilities clearer. Keep people accountable for decisions and agents accountable for bounded execution. Build: A responsibility map and one accepted weekly workflow.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Every commitment has one accountable owner and a visible state. Private employee or client context is scoped before retrieval.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#organization"
        },
        {
          "label": "Row level security",
          "href": "https://supabase.com/docs/guides/database/postgres/row-level-security"
        },
        {
          "label": "Harness engineering",
          "href": "https://openai.com/index/harness-engineering/"
        },
        {
          "label": "Demystifying evals for AI agents",
          "href": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
        }
      ]
    },
    {
      "title": "Family ownership and personal growth",
      "duration": "60 min planning estimate",
      "description": "The same engineering can support family continuity and personal agency when each person controls their own context. Build: A consent map, an export and a bounded reflection practice.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Each shared record has an agreed audience and correction path. Reflection stays voluntary and distinguishes observations from interpretations.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#family-life"
        },
        {
          "label": "Effective context engineering for AI agents",
          "href": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
        },
        {
          "label": "Row level security",
          "href": "https://supabase.com/docs/guides/database/postgres/row-level-security"
        }
      ]
    },
    {
      "title": "Offers, contribution and unit economics",
      "duration": "60 min planning estimate",
      "description": "A visitor should experience useful work before being asked to buy its continuation. The paid offer solves a demonstrated next need. Build: A useful sample, an offer boundary and an economics worksheet.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: The free artifact is independently useful. Any purchase claim matches verified price, delivery and access.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#value"
        },
        {
          "label": "Demystifying evals for AI agents",
          "href": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
        },
        {
          "label": "How we built our multi-agent research system",
          "href": "https://www.anthropic.com/engineering/multi-agent-research-system"
        }
      ]
    },
    {
      "title": "Deploy, evaluate and evolve",
      "duration": "60 min planning estimate",
      "description": "An evolving learning experience needs versioned teaching, tested examples and measured learner outcomes. A changing source page is a reason to review the lesson. Build: A capstone release packet and a source-change proposal.",
      "instructorNotes": "Use synthetic fixtures. Ask the learner to explain the failure before opening the answer. Accept only when: Evidence binds to the exact candidate version. The next curriculum update passes review and example checks before release.",
      "resources": [
        {
          "label": "Read the full lesson and build lab",
          "href": "/guides/ai-operating-systems-workshop#release"
        },
        {
          "label": "Harness engineering",
          "href": "https://openai.com/index/harness-engineering/"
        },
        {
          "label": "Demystifying evals for AI agents",
          "href": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
        },
        {
          "label": "Agents API overview",
          "href": "https://developers.openai.com/api/docs/guides/agents-api/overview"
        },
        {
          "label": "Agent SDK overview",
          "href": "https://code.claude.com/docs/en/agent-sdk/overview"
        }
      ]
    }
  ]
}
