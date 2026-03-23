'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Wrench,
  ChevronLeft,
  ExternalLink,
  Code,
  Database,
  MessageSquare,
  Palette,
  Cloud,
  FileText,
  Cpu,
  GitBranch,
} from 'lucide-react'

// Tool categories
const toolCategories = [
  {
    id: 'ai-platforms',
    title: 'AI Platforms',
    icon: Cpu,
    tools: [
      {
        name: 'Google AI Studio',
        description: 'Free Gemini playground with generous free tier',
        url: 'https://aistudio.google.com',
        badge: 'Free',
      },
      {
        name: 'Anthropic Console',
        description: 'Claude workbench for testing prompts',
        url: 'https://console.anthropic.com/workbench',
        badge: '$5 credit',
      },
      {
        name: 'OpenAI Playground',
        description: 'GPT-4 testing and fine-tuning',
        url: 'https://platform.openai.com/playground',
        badge: '$5 credit',
      },
      {
        name: 'OCI GenAI',
        description: 'Oracle Cloud generative AI service',
        url: 'https://cloud.oracle.com/generative-ai',
        badge: 'Free tier',
      },
    ],
  },
  {
    id: 'frameworks',
    title: 'AI Frameworks',
    icon: Code,
    tools: [
      {
        name: 'LangChain',
        description: 'Framework for LLM-powered applications',
        url: 'https://python.langchain.com',
        badge: 'Open Source',
      },
      {
        name: 'LlamaIndex',
        description: 'Data framework for RAG applications',
        url: 'https://docs.llamaindex.ai',
        badge: 'Open Source',
      },
      {
        name: 'Vercel AI SDK',
        description: 'TypeScript toolkit for AI applications',
        url: 'https://sdk.vercel.ai',
        badge: 'Open Source',
      },
      {
        name: 'LangGraph',
        description: 'Multi-agent orchestration framework',
        url: 'https://langchain-ai.github.io/langgraph',
        badge: 'Open Source',
      },
    ],
  },
  {
    id: 'vector-databases',
    title: 'Vector Databases',
    icon: Database,
    tools: [
      {
        name: 'Pinecone',
        description: 'Managed vector database for semantic search',
        url: 'https://www.pinecone.io',
        badge: 'Free tier',
      },
      {
        name: 'Weaviate',
        description: 'Open-source vector database',
        url: 'https://weaviate.io',
        badge: 'Open Source',
      },
      {
        name: 'Chroma',
        description: 'Lightweight embedding database',
        url: 'https://www.trychroma.com',
        badge: 'Open Source',
      },
      {
        name: 'pgvector',
        description: 'Vector extension for PostgreSQL',
        url: 'https://github.com/pgvector/pgvector',
        badge: 'Open Source',
      },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment & Hosting',
    icon: Cloud,
    tools: [
      {
        name: 'Vercel',
        description: 'Frontend deployment with edge functions',
        url: 'https://vercel.com',
        badge: 'Free tier',
      },
      {
        name: 'Railway',
        description: 'Full-stack deployment platform',
        url: 'https://railway.app',
        badge: '$5 credit',
      },
      {
        name: 'Replit',
        description: 'Browser-based development & hosting',
        url: 'https://replit.com',
        badge: 'Free tier',
      },
      {
        name: 'OCI Container Instances',
        description: 'Serverless containers on Oracle Cloud',
        url: 'https://cloud.oracle.com/container-instances',
        badge: 'Free tier',
      },
    ],
  },
  {
    id: 'diagrams',
    title: 'Diagram Tools',
    icon: Palette,
    tools: [
      {
        name: 'Mermaid',
        description: 'Code-based diagram generation',
        url: 'https://mermaid.js.org',
        badge: 'Open Source',
      },
      {
        name: 'Excalidraw',
        description: 'Hand-drawn style whiteboard',
        url: 'https://excalidraw.com',
        badge: 'Free',
      },
      {
        name: 'draw.io',
        description: 'Full-featured diagramming',
        url: 'https://app.diagrams.net',
        badge: 'Free',
      },
      {
        name: 'Eraser.io',
        description: 'Technical diagrams with AI',
        url: 'https://www.eraser.io',
        badge: 'Free tier',
      },
    ],
  },
  {
    id: 'ai-coding',
    title: 'AI Coding Tools',
    icon: MessageSquare,
    tools: [
      {
        name: 'Claude Code',
        description: 'Anthropic CLI for agentic coding',
        url: 'https://docs.anthropic.com/claude-code',
        badge: 'Pro',
      },
      {
        name: 'Cursor',
        description: 'AI-powered code editor',
        url: 'https://cursor.sh',
        badge: 'Free tier',
      },
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer',
        url: 'https://github.com/features/copilot',
        badge: 'Paid',
      },
      {
        name: 'Vercel v0',
        description: 'AI UI generation',
        url: 'https://v0.dev',
        badge: 'Free tier',
      },
    ],
  },
  {
    id: 'observability',
    title: 'LLM Observability',
    icon: FileText,
    tools: [
      {
        name: 'Langfuse',
        description: 'Open-source LLM observability',
        url: 'https://langfuse.com',
        badge: 'Open Source',
      },
      {
        name: 'LangSmith',
        description: 'LangChain tracing & evaluation',
        url: 'https://smith.langchain.com',
        badge: 'Free tier',
      },
      {
        name: 'Helicone',
        description: 'LLM logging and analytics',
        url: 'https://helicone.ai',
        badge: 'Free tier',
      },
      {
        name: 'Arize Phoenix',
        description: 'ML observability platform',
        url: 'https://phoenix.arize.com',
        badge: 'Open Source',
      },
    ],
  },
  {
    id: 'mcp',
    title: 'MCP Resources',
    icon: GitBranch,
    tools: [
      {
        name: 'MCP Specification',
        description: 'Model Context Protocol documentation',
        url: 'https://modelcontextprotocol.io',
        badge: 'Docs',
      },
      {
        name: 'MCP Servers',
        description: 'Official server implementations',
        url: 'https://github.com/modelcontextprotocol/servers',
        badge: 'Open Source',
      },
      {
        name: 'MCP TypeScript SDK',
        description: 'Build custom MCP servers',
        url: 'https://github.com/modelcontextprotocol/typescript-sdk',
        badge: 'Open Source',
      },
      {
        name: 'Smithery',
        description: 'MCP server registry',
        url: 'https://smithery.ai',
        badge: 'Free',
      },
    ],
  },
]

function ToolCard({ tool }: { tool: (typeof toolCategories)[0]['tools'][0] }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
    >
      <div className="mb-2 flex items-start justify-between">
        <h4 className="font-semibold text-white group-hover:text-cyan-400">{tool.name}</h4>
        <div className="flex items-center gap-2">
          {tool.badge && (
            <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-400">
              {tool.badge}
            </span>
          )}
          <ExternalLink className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
      <p className="text-sm text-slate-400">{tool.description}</p>
    </a>
  )
}

function CategorySection({
  category,
  index,
}: {
  category: (typeof toolCategories)[0]
  index: number
}) {
  const Icon = category.icon

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="mb-12"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-white">{category.title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {category.tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </motion.section>
  )
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/ai-architecture"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Architecture Tools</h1>
              <p className="text-slate-400">Curated resources for AI development</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Essential tools, frameworks, and platforms for building production AI systems.
            All links are external - we recommend these based on production experience.
          </motion.p>
        </div>
      </section>

      {/* Tools */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {toolCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm text-slate-500">
            These are third-party tools we recommend. FrankX.ai is not affiliated with any of these
            companies. Links open in new tabs to external websites.
          </p>
        </div>
      </section>
    </main>
  )
}
