'use client'

import Image from 'next/image'
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
  Network,
} from 'lucide-react'

import { getAffiliateLink } from '@/lib/affiliates/affiliate-manager'
import { AffiliateDisclosure } from '@/components/affiliate-disclosure'

type Tool = {
  name: string
  description: string
  url: string
  badge?: string
  // When set and the id resolves in the affiliate registry, the card links
  // through a tracked affiliate URL with rel="sponsored". Tools without a
  // program stay plain links — honesty over revenue.
  affiliateId?: string
}

// Tool categories
const toolCategories: { id: string; title: string; icon: typeof Cpu; tools: Tool[] }[] = [
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
    title: 'Agent Frameworks',
    icon: Code,
    tools: [
      {
        name: 'Vercel AI SDK 6',
        description: 'TypeScript toolkit with a first-class Agent abstraction, MCP support, and tool approval',
        url: 'https://sdk.vercel.ai',
        badge: 'Open Source',
      },
      {
        name: 'LangGraph',
        description: 'Stateful multi-agent orchestration — nodes, edges, durable checkpoints',
        url: 'https://langchain-ai.github.io/langgraph',
        badge: 'Open Source',
      },
      {
        name: 'Mastra',
        description: 'The de-facto TypeScript agent framework — best when the agent lives next to the UI',
        url: 'https://mastra.ai',
        badge: 'Open Source',
      },
      {
        name: 'Claude Agent SDK',
        description: 'Anthropic-native agents for production tool-use and long-running loops',
        url: 'https://docs.anthropic.com/en/api/agent-sdk',
        badge: 'SDK',
      },
      {
        name: 'OpenAI Agents SDK',
        description: 'Production-mature framework for OpenAI-native agent builds',
        url: 'https://openai.github.io/openai-agents-python',
        badge: 'Open Source',
      },
      {
        name: 'Pydantic AI',
        description: 'Type-safe Python agents with FastAPI ergonomics and structured outputs',
        url: 'https://ai.pydantic.dev',
        badge: 'Open Source',
      },
      {
        name: 'LlamaIndex',
        description: 'Data framework and RAG-grounded agents',
        url: 'https://docs.llamaindex.ai',
        badge: 'Open Source',
      },
      {
        name: 'CrewAI',
        description: 'Fastest role-based multi-agent prototyping',
        url: 'https://www.crewai.com',
        badge: 'Open Source',
      },
    ],
  },
  {
    id: 'cloud-agent-runtimes',
    title: 'Cloud Agent Runtimes',
    icon: Network,
    tools: [
      {
        name: 'AWS Bedrock AgentCore',
        description: 'Framework-agnostic managed agent runtime with session memory + multi-agent (GA)',
        url: 'https://aws.amazon.com/bedrock/agentcore',
        badge: 'GA',
      },
      {
        name: 'Azure AI Foundry',
        description: 'Agent Service GA with one-click Teams/M365 deploy (Foundry Memory in preview)',
        url: 'https://ai.azure.com',
        badge: 'GA',
      },
      {
        name: 'Google Vertex AI ADK',
        description: 'Agent Development Kit on Gemini 3 — stable, with a Java version',
        url: 'https://google.github.io/adk-docs',
        badge: 'GA',
      },
      {
        name: 'Oracle OCI Enterprise AI',
        description: 'Enterprise AI Agents (GA) via an OpenAI Responses-compatible unified API',
        url: 'https://www.oracle.com/artificial-intelligence/generative-ai/agents',
        badge: 'GA',
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
        name: 'Turbopuffer',
        description: 'Object-storage-backed vector + full-text search — cost-efficient at scale',
        url: 'https://turbopuffer.com',
        badge: 'Usage-based',
      },
      {
        name: 'Qdrant',
        description: 'Open-source vector database with hybrid search and quantization',
        url: 'https://qdrant.tech',
        badge: 'Open Source',
      },
      {
        name: 'Weaviate',
        description: 'Open-source vector database with built-in hybrid search',
        url: 'https://weaviate.io',
        badge: 'Open Source',
      },
      {
        name: 'Supabase Vector',
        description: 'pgvector on managed Postgres — keep vectors next to your app data',
        url: 'https://supabase.com/vector',
        badge: 'Free tier',
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
        description: 'Frontend + AI deploys on Fluid compute, with one-click Deploy buttons',
        url: 'https://vercel.com',
        badge: 'Free tier',
        affiliateId: 'vercel',
      },
      {
        name: 'Vercel AI Gateway',
        description: 'One endpoint across providers — routing, retries, caching, observability',
        url: 'https://vercel.com/docs/ai-gateway',
        badge: 'Usage-based',
        affiliateId: 'vercel',
      },
      {
        name: 'Railway',
        description: 'Full-stack deployment platform with a template marketplace',
        url: 'https://railway.app',
        badge: '$5 credit',
        affiliateId: 'railway',
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
        description: 'Community-leading open-source LLM observability, self-hostable (now ClickHouse-owned)',
        url: 'https://langfuse.com',
        badge: 'Open Source',
      },
      {
        name: 'Braintrust',
        description: 'Prompt-centric eval workflows with a generous free tier',
        url: 'https://www.braintrust.dev',
        badge: 'Free tier',
      },
      {
        name: 'LangSmith',
        description: 'Native tracing & evaluation for LangChain / LangGraph teams',
        url: 'https://smith.langchain.com',
        badge: 'Free tier',
      },
      {
        name: 'Helicone',
        description: 'Proxy-style logging — instant multi-provider cost visibility',
        url: 'https://helicone.ai',
        badge: 'Free tier',
      },
      {
        name: 'Arize Phoenix',
        description: 'Fully open-source observability, unlimited self-host',
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

function ToolCard({ tool }: { tool: Tool }) {
  // Route through a tracked affiliate URL only when the id resolves in the
  // registry; otherwise fall back to the plain link. rel="sponsored" is set
  // for affiliate links so they're disclosed to crawlers.
  const affiliate = tool.affiliateId ? getAffiliateLink(tool.affiliateId, 'ai-arch-tools') : undefined
  const href = affiliate?.trackingUrl ?? tool.url
  const rel = affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
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
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Image */}
      <div className="relative mb-8 overflow-hidden rounded-2xl mx-auto max-w-6xl mt-6 px-6">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
          <Image src="/images/blog/agentic-creator-os-hero.png" alt="AI Architecture Tools — curated resources for AI development" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400/60 mb-2">AI Architecture</p>
          <h1 className="text-2xl font-bold text-white">Architecture Tools</h1>
        </div>
      </div>

      {/* Header */}
      <section className="pt-12 pb-12">
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

      {/* Disclosure */}
      <section className="py-12 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <AffiliateDisclosure providers={['vercel', 'railway']} />
          <p className="mt-4 text-center text-xs text-slate-500">
            Most links here are plain references with no affiliate relationship. We only mark a link
            as sponsored when a program exists, and we recommend every tool from production experience.
          </p>
        </div>
      </section>
    </main>
  )
}
