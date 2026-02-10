'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Cpu, Shield, GitBranch, Database, Eye, Zap } from 'lucide-react'

const patterns = [
  {
    num: 1,
    name: 'Unified LLM Gateway',
    desc: 'Route all LLM calls through a single gateway for cost control, rate limiting, and provider failover.',
    tools: 'LiteLLM, Portkey, Martian, OCI GenAI',
    icon: Shield,
    color: '#f59e0b',
    code: `# LiteLLM proxy config
model_list:
  - model_name: gpt-4
    litellm_params:
      model: openai/gpt-4
  - model_name: command-a
    litellm_params:
      model: cohere/command-a
      api_base: https://genai.oci.example.com`,
  },
  {
    num: 2,
    name: 'Cascade Model Routing',
    desc: 'Route queries to cheapest capable model. Simple tasks skip expensive models entirely.',
    tools: 'RouteLLM, Custom logic, KEDA scaling',
    icon: GitBranch,
    color: '#10b981',
    code: `# Cascade: simple → cheap, complex → premium
def route(query):
    complexity = classify(query)
    if complexity < 0.3:
        return "gemini-flash-lite"  # $0.075/1M
    elif complexity < 0.7:
        return "command-a"          # ~$3/1M
    else:
        return "grok-4.1"           # premium`,
  },
  {
    num: 3,
    name: 'Memory-Augmented Agents',
    desc: 'Persistent memory across sessions using vector storage and knowledge graphs.',
    tools: 'Mem0, Graphiti, Oracle AI DB 26ai',
    icon: Database,
    color: '#3b82f6',
    code: `# Mem0 integration
from mem0 import Memory
m = Memory()
m.add("User prefers RAG over fine-tuning",
      user_id="frank", metadata={"topic": "ai-ops"})
# +26% accuracy, -90% token usage`,
  },
  {
    num: 4,
    name: 'Observability Pipeline',
    desc: 'End-to-end tracing from user query through retrieval, generation, and response.',
    tools: 'Langfuse, LangSmith, Arize, OCI Monitoring',
    icon: Eye,
    color: '#a855f7',
    code: `# Langfuse trace
trace = langfuse.trace(name="rag-query")
span = trace.span(name="retrieval")
# ... vector search ...
span.end()
gen = trace.generation(
    name="llm", model="command-a",
    input=context, output=response)`,
  },
  {
    num: 5,
    name: 'Multi-Agent Orchestration',
    desc: 'Coordinate specialized agents with structured communication and shared context.',
    tools: 'LangGraph, CrewAI, Oracle ADK, Agent Spec',
    icon: Cpu,
    color: '#C74634',
    code: `# LangGraph state machine
from langgraph.graph import StateGraph
graph = StateGraph(AgentState)
graph.add_node("researcher", researcher_agent)
graph.add_node("writer", writer_agent)
graph.add_node("reviewer", reviewer_agent)
graph.add_edge("researcher", "writer")
graph.add_edge("writer", "reviewer")`,
  },
  {
    num: 6,
    name: 'Production RAG Pipeline',
    desc: 'Enterprise RAG with hybrid search, reranking, and quality evaluation.',
    tools: 'Cohere Embed 4, Rerank 3.5, AI DB 26ai',
    icon: Zap,
    color: '#06b6d4',
    code: `-- Oracle AI Database 26ai Hybrid Search
SELECT id, title,
  (0.7 * (1 - VECTOR_DISTANCE(emb, :qvec, COSINE))
   + 0.3 * SCORE(1)) AS hybrid_score
FROM documents
WHERE CONTAINS(content, :kw, 1) > 0
ORDER BY hybrid_score DESC
FETCH FIRST 10 ROWS ONLY;`,
  },
]

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(199,70,52,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,70,52,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/3 right-0 w-[40%] h-[40%]" style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <main className="relative z-10">
        <nav className="px-6 py-4">
          <Link href="/ai-ops" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to AI Ops Hub
          </Link>
        </nav>

        <section className="pt-8 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[#10b981] font-mono text-sm mb-4 tracking-wider uppercase">Implementation Patterns</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">6 Production Patterns</h1>
              <p className="text-white/50 text-lg max-w-2xl">
                Battle-tested patterns for deploying AI operations at scale, from gateway routing to multi-agent orchestration.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto space-y-12">
            {patterns.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold" style={{ color: p.color }}>{p.num}</span>
                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                    <h3 className="text-xl font-bold">{p.name}</h3>
                  </div>
                  <p className="text-white/50 mb-2">{p.desc}</p>
                  <p className="text-xs text-white/30 font-mono mb-4">{p.tools}</p>
                </div>
                <div className="bg-black/30 border-t border-white/5 p-6">
                  <pre className="text-sm text-white/50 overflow-x-auto font-mono leading-relaxed">{p.code}</pre>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-white/30">Research compiled by FrankX Research Council - 2026</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
