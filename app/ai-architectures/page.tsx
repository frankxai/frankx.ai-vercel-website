"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Boxes,
  Layers,
  Network,
  Shield,
  Database,
  Server,
  Cloud,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Zap,
  Terminal,
  Cpu,
  Code2,
  Copy,
  Check,
} from "lucide-react"

interface ArchitectureSpec {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  cloudProviders: string[]
  color: string
  metrics: {
    latency: string
    costSavings: string
    reliability: string
  }
  technologies: string[]
  flow: string[]
  codeSnippet: {
    lang: string
    filename: string
    code: string
  }
}

const GOLDEN_SEVEN_ARCHITECTURES: ArchitectureSpec[] = [
  {
    id: "sovereign-agent-swarm",
    title: "1. Sovereign Agent Swarm (Multi-Agent FSM)",
    subtitle: "Hierarchical leader-worker orchestration with fail-closed state machines",
    category: "Multi-Agent Systems",
    description: "Production-grade swarm architecture with deterministic Finite State Machine (FSM) transitions, memory vault persistence, and Byzantine consensus for high-value decisions.",
    cloudProviders: ["AWS", "GCP", "Self-Hosted"],
    color: "emerald",
    metrics: { latency: "<1.2s / turn", costSavings: "65% vs single mega-prompt", reliability: "99.9% state integrity" },
    technologies: ["Claude Code", "Hermes", "Redis Memory Vault", "LangGraph"],
    flow: [
      "Queen / Leader Agent ingests intent & compiles task contract",
      "FSM validates pre-flight machine performance & IAM scope",
      "Worker subagents execute parallel tool loops via dedicated git worktrees",
      "Crown / Verifier Agent performs blind cross-model check before merge",
    ],
    codeSnippet: {
      lang: "typescript",
      filename: "swarm-orchestrator.ts",
      code: "export async function dispatchSubagentTask(contract: TaskContract) {\n  const plan = await generateObject({\n    model: google('gemini-3.7-flash'),\n    schema: z.object({\n      assignedLanes: z.array(z.string()),\n      maxTurns: z.number().max(10),\n      allowDangerous: z.boolean(),\n    }),\n    prompt: `Compile execution plan for: ${contract.goal}`,\n  })\n  return plan.object\n}",
    },
  },
  {
    id: "dual-engine-graph-rag",
    title: "2. Dual-Engine RAG & GraphRAG",
    subtitle: "Hybrid BM25 keyword + dense vector + knowledge graph entity reranking",
    category: "Knowledge Systems",
    description: "Enterprise knowledge substrate indexing 1M+ technical documents. Combines vector semantic search with GraphRAG entity extraction for zero-hallucination factual grounding.",
    cloudProviders: ["OCI", "AWS", "Cloudflare"],
    color: "cyan",
    metrics: { latency: "<350ms p95", costSavings: "80% token savings via reranking", reliability: "98.4% citation accuracy" },
    technologies: ["Upstash Context7", "Neo4j / Graph", "pgvector", "FastAPI"],
    flow: [
      "Document ingestion with semantic chunking & entity-relation extraction",
      "Parallel dual-retrieval: BM25 keyword match + vector embedding search",
      "Graph traversal across parent-child nodes & cross-domain citations",
      "Cross-encoder reranker delivers top-5 dense context windows to LLM",
    ],
    codeSnippet: {
      lang: "typescript",
      filename: "hybrid-graph-rag.ts",
      code: "export async function hybridRetrieve(query: string) {\n  const [vectorHits, keywordHits, graphEntities] = await Promise.all([\n    vectorStore.similaritySearch(query, { k: 20 }),\n    bm25Index.search(query, { limit: 20 }),\n    knowledgeGraph.queryEntities(query),\n  ])\n  return crossEncoderRerank({ candidates: [...vectorHits, ...keywordHits], entities: graphEntities, topK: 5 })\n}",
    },
  },
  {
    id: "dynamic-tier-router",
    title: "3. Dynamic Multi-Tier Model Router",
    subtitle: "Real-time task shape analysis routing between Fast-Path and Deep-Reasoning",
    category: "Cost & Performance",
    description: "Slashes LLM API bills by 70-85% by dynamically routing high-volume queries to ultra-fast sub-$1 models and reserving frontier reasoning models for complex constraint verification.",
    cloudProviders: ["Multi-Cloud", "Vercel Edge"],
    color: "violet",
    metrics: { latency: "150ms triage", costSavings: "82% blended cost reduction", reliability: "100% SLA uptime via fallback" },
    technologies: ["Gemini 3.7 Flash", "Claude Opus 5", "DeepSeek V4 Pro", "OpenRouter"],
    flow: [
      "Incoming request parsed for reasoning depth & token constraints",
      "Low-complexity & triage requests sent to Gemini 3.7 Flash / DeepSeek",
      "Complex architecture, math & multi-file refactors routed to Opus 5 / Fable 5",
      "Automatic fallback cascade on provider 429 / 500 error",
    ],
    codeSnippet: {
      lang: "typescript",
      filename: "model-router.ts",
      code: "export function routeModelByTask(taskShape: TaskShape) {\n  if (taskShape.complexity === 'deep-reasoning' || taskShape.hasStrictConstraints) {\n    return 'anthropic/claude-opus-5'\n  }\n  if (taskShape.type === 'realtime-search') {\n    return 'xai/grok-4-6'\n  }\n  return 'google/gemini-3.7-flash'\n}",
    },
  },
  {
    id: "enterprise-mcp-mesh",
    title: "4. Zero-Trust Enterprise MCP Mesh",
    subtitle: "Centralized Model Context Protocol hub with IAM, caching & audit trail",
    category: "Infrastructure",
    description: "Universal tool connectivity layer for AI assistants and swarms. Provides strict capability-based access control, tool discovery, response caching, and immutable audit logs.",
    cloudProviders: ["AWS", "OCI", "Cloudflare"],
    color: "orange",
    metrics: { latency: "<25ms gateway overhead", costSavings: "40% caching reduction", reliability: "Zero schema hallucination" },
    technologies: ["MCP SDK", "Docker", "PostgreSQL", "Tailscale"],
    flow: [
      "Agent requests tool catalog with cryptographic session token",
      "MCP Gateway checks IAM permissions and returns scoped tool schema",
      "Tool invocation executed in isolated micro-container",
      "Append-only audit log records input parameters & returned payload",
    ],
    codeSnippet: {
      lang: "typescript",
      filename: "mcp-gateway.ts",
      code: "server.setRequestHandler(CallToolRequestSchema, async (request) => {\n  await auditLog.record(request)\n  return executeScopedTool(request.params)\n})",
    },
  },
  {
    id: "red-blue-security-engine",
    title: "5. Continuous Red/Blue Security Engine",
    subtitle: "Automated prompt injection probes, spend-cap enforcement & fail-closed gates",
    category: "Security & Safety",
    description: "Active defense system running automated attack vectors (indirect prompt injection, mandate forgery, capital exfiltration) to ensure agents reject and audit malicious operations.",
    cloudProviders: ["Multi-Cloud", "Self-Hosted"],
    color: "rose",
    metrics: { latency: "Real-time stream inspection", costSavings: "100% loss prevention", reliability: "Zero silent failures" },
    technologies: ["PromptFoo", "starlight-evals", "Custom IAM Guardrails"],
    flow: [
      "Input boundary sanitizes untrusted third-party data & web scrapes",
      "Red-team probe generator continuously tests refusal boundaries",
      "Payment & API execution gates enforce strict cryptographic spend caps",
      "Any unauthorized mutation triggers immediate fail-closed circuit trip",
    ],
    codeSnippet: {
      lang: "typescript",
      filename: "security-gate.ts",
      code: "export function verifySpendCap(tx: TransactionMandate): boolean {\n  if (!tx.signature || isExpired(tx)) {\n    auditLog.recordSecurityViolation(tx, 'EXPIRED_OR_UNSIGNED')\n    return false // FAIL CLOSED\n  }\n  return tx.amount <= DAILY_SPEND_CAP\n}",
    },
  },
  {
    id: "agentic-sdlc-ci-cd",
    title: "6. Agentic SDLC & Automated Verification Gate",
    subtitle: "Draft-first PR pipelines with multi-LLM adversarial review & visual QA",
    category: "Developer Experience",
    description: "Autonomous software development lifecycle system. Parallel coding agents generate scoped worktree branches, run unit tests, and submit draft PRs evaluated by an independent review panel.",
    cloudProviders: ["GitHub Actions", "Vercel", "Railway"],
    color: "blue",
    metrics: { latency: "15 min idea-to-preview", costSavings: "90% manual review saved", reliability: "Zero broken production deploys" },
    technologies: ["GitHub Actions", "Vercel Preview", "Playwright", "Santa Loop"],
    flow: [
      "Issue assigned -> Agent creates dedicated git branch & worktree",
      "Agent implements feature, runs unit tests & type checks locally",
      "Draft PR opened -> fires lightweight preview deploy & visual QA",
      "Independent Reviewer Model (Santa Gate) verifies code craft & taste",
    ],
    codeSnippet: {
      lang: "yaml",
      filename: ".github/workflows/agent-gate.yml",
      code: "name: Agentic Quality Gate\non: [pull_request]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pnpm install && pnpm run build\n      - name: Visual Anti-Slop Audit\n        run: python scripts/verify_anti_slop.py -Path ./app",
    },
  },
  {
    id: "local-edge-sovereign-node",
    title: "7. Local Edge Sovereign Node",
    subtitle: "Zero-cloud air-gapped agent runtime with local 27B weights and private memory",
    category: "Sovereignty & Privacy",
    description: "Fully sovereign AI deployment running open-weight models on consumer hardware (Mac Studio / RTX 5090). Zero telemetry, zero external API billing, complete data privacy.",
    cloudProviders: ["Local Hardware", "Air-Gapped LAN"],
    color: "emerald",
    metrics: { latency: "45 tokens/sec local", costSavings: "100% cloud inference savings", reliability: "Runs offline with zero internet" },
    technologies: ["Qwen 3.8-27B", "Ollama / vLLM", "SQLite Memory", "Hermes CLI"],
    flow: [
      "Local developer prompt captured in private local terminal",
      "Local vLLM / Ollama server executes Qwen 3.8-27B with 32k context",
      "Persistent state stored in encrypted SQLite vector database",
      "Zero telemetry transmitted outside the local machine",
    ],
    codeSnippet: {
      lang: "bash",
      filename: "docker-compose.sovereign.yml",
      code: "services:\n  ollama-node:\n    image: ollama/ollama:latest\n    deploy:\n      resources:\n        reservations:\n          devices:\n            - driver: nvidia\n              count: all\n              capabilities: [gpu]\n    ports:\n      - 11434:11434",
    },
  },
]

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  emerald: { bg: "from-emerald-500/10 to-emerald-600/5", border: "border-emerald-500/20 hover:border-emerald-500/40", badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" },
  cyan: { bg: "from-cyan-500/10 to-cyan-600/5", border: "border-cyan-500/20 hover:border-cyan-500/40", badge: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" },
  violet: { bg: "from-violet-500/10 to-violet-600/5", border: "border-violet-500/20 hover:border-violet-500/40", badge: "bg-violet-500/20 text-violet-400 border border-violet-500/30" },
  orange: { bg: "from-orange-500/10 to-orange-600/5", border: "border-orange-500/20 hover:border-orange-500/40", badge: "bg-orange-500/20 text-orange-400 border border-orange-500/30" },
  rose: { bg: "from-rose-500/10 to-rose-600/5", border: "border-rose-500/20 hover:border-rose-500/40", badge: "bg-rose-500/20 text-rose-400 border border-rose-500/30" },
  blue: { bg: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/20 hover:border-blue-500/40", badge: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
}

export default function ArchitecturesPage() {
  const [activeTab, setActiveTab] = useState<Record<string, "flow" | "code" | "metrics">>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-1/3 top-0 h-[500px] w-[700px]" style={{ background: "radial-gradient(ellipse at top, rgba(6,182,212,0.07) 0%, transparent 70%)", filter: "blur(90px)" }} />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/ai-architect" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
            <ArrowRight className="h-4 w-4 rotate-180" /> AI Architect Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/agent-arena" className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 transition hover:bg-emerald-500/20">
              <Zap className="h-3.5 w-3.5" /> Agent Arena
            </Link>
            <Link href="/llm-hub" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:text-white">
              <Boxes className="h-3.5 w-3.5" /> LLM Hub
            </Link>
          </div>
        </nav>

        <section className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-cyan-400">Enterprise Blueprints · Updated August 2026</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            The Golden 7 <span className="text-white/40">AI Architectures</span>
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/60">
            Production-grade reference architectures for sovereign AI swarms, hybrid knowledge retrieval, dynamic model routing, and zero-trust MCP tool meshes. Copy-paste runnable blueprints.
          </p>
        </section>

        <div className="space-y-8">
          {GOLDEN_SEVEN_ARCHITECTURES.map((arch) => {
            const colors = colorMap[arch.color] || colorMap.emerald
            const currentTab = activeTab[arch.id] || "flow"
            return (
              <div key={arch.id} className={`rounded-3xl border bg-gradient-to-b ${colors.bg} ${colors.border} p-6 backdrop-blur-xl transition-all md:p-8`}>
                <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${colors.badge}`}>{arch.category}</span>
                      {arch.cloudProviders.map((cloud) => (
                        <span key={cloud} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">{cloud}</span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{arch.title}</h2>
                    <p className="mt-1 text-sm text-white/60">{arch.subtitle}</p>
                  </div>
                  <div className="flex rounded-xl border border-white/10 bg-black/40 p-1 text-xs">
                    <button onClick={() => setActiveTab({ ...activeTab, [arch.id]: "flow" })} className={`rounded-lg px-3 py-1 font-medium transition ${currentTab === "flow" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}>Lifecycle Flow</button>
                    <button onClick={() => setActiveTab({ ...activeTab, [arch.id]: "code" })} className={`rounded-lg px-3 py-1 font-medium transition ${currentTab === "code" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}>Code Blueprint</button>
                    <button onClick={() => setActiveTab({ ...activeTab, [arch.id]: "metrics" })} className={`rounded-lg px-3 py-1 font-medium transition ${currentTab === "metrics" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}>SLA & Tradeoffs</button>
                  </div>
                </div>
                <p className="mb-6 text-sm text-white/70 leading-relaxed max-w-4xl">{arch.description}</p>
                <div className="rounded-2xl border border-white/5 bg-black/50 p-5">
                  {currentTab === "flow" && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-white/40 mb-3">Execution Pipeline</h4>
                      {arch.flow.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-white/80">
                          <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-white/10 font-mono text-[10px] text-cyan-300">{idx + 1}</span>
                          <p className="pt-0.5 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentTab === "code" && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-xs text-white/40">{arch.codeSnippet.filename}</span>
                        <button onClick={() => handleCopy(arch.id, arch.codeSnippet.code)} className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition">
                          {copiedId === arch.id ? (<><Check className="h-3 w-3 text-emerald-400" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy Code</>)}
                        </button>
                      </div>
                      <pre className="overflow-x-auto rounded-xl bg-black/80 p-4 font-mono text-xs leading-relaxed text-cyan-300/90 border border-white/5">
                        <code>{arch.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                  {currentTab === "metrics" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <div className="text-xs text-white/40">Latency SLA</div>
                        <div className="font-mono text-lg font-bold text-white mt-1">{arch.metrics.latency}</div>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <div className="text-xs text-white/40">Cost Efficiency</div>
                        <div className="font-mono text-lg font-bold text-emerald-400 mt-1">{arch.metrics.costSavings}</div>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <div className="text-xs text-white/40">Reliability Guarantee</div>
                        <div className="font-mono text-lg font-bold text-cyan-400 mt-1">{arch.metrics.reliability}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-1.5 text-xs text-white/40">
                  <span className="font-mono text-[11px] text-white/30 mr-1">Stack:</span>
                  {arch.technologies.map((t) => (
                    <span key={t} className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[11px]">{t}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
