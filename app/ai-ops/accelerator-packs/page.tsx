'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Truck, Video, Brain, Search, Shield, Server, Cpu, BarChart3, Zap } from 'lucide-react'

const packs = [
  {
    id: 'route-optimizer',
    name: 'Delivery Vehicle Route Optimizer',
    nvidia: 'cuOPT (Combinatorial Optimization)',
    icon: Truck,
    color: '#C74634',
    gpu: 'A100 40GB / 80GB',
    industries: ['Logistics & Supply Chain', 'Retail', 'Manufacturing', 'Healthcare', 'Field Services'],
    capabilities: [
      '15-30% reduction in fuel costs',
      '20-40% improvement in on-time delivery',
      'Up to 50% more stops per route',
      'Real-time route recalculation',
    ],
    sizing: [
      { size: 'Small', gpu: 'BM.GPU4.8 (8x A100 40GB)', qty: '1 node' },
      { size: 'Medium', gpu: 'BM.GPU.A100-v2.8 (8x A100 80GB)', qty: '1 node' },
    ],
  },
  {
    id: 'video-intelligence',
    name: 'Video Search & Summarization',
    nvidia: 'Cosmos + Parakeet NIMs',
    icon: Video,
    color: '#a855f7',
    gpu: 'A100 40GB',
    industries: ['Media & Entertainment', 'Healthcare', 'Manufacturing', 'Retail', 'Legal'],
    capabilities: [
      'Natural language video search',
      'Automatic summarization',
      'Speaker identification',
      'Temporal event detection',
      'Content moderation/flagging',
    ],
    sizing: [
      { size: 'Small', gpu: 'BM.GPU4.8 (8x A100 40GB)', qty: '1 node' },
    ],
  },
  {
    id: 'ai-q-reasoning',
    name: 'AI-Q Enterprise Reasoning',
    nvidia: 'NVIDIA NIMs / Llama Stack',
    icon: Brain,
    color: '#3b82f6',
    gpu: 'A100 / OCI GenAI',
    industries: ['Financial Services', 'Healthcare', 'Government', 'Enterprise'],
    capabilities: [
      'Multi-document reasoning',
      'Citation and source attribution',
      'Context-aware responses',
      'Oracle Fusion & NetSuite integration',
    ],
    sizing: [
      { size: 'Self-Hosted', gpu: '2x BM.GPU4.8 (16x A100)', qty: '2 nodes + NVIDIA NIMs' },
      { size: 'OCI GenAI', gpu: 'VM.Standard.E5.Flex + GenAI', qty: 'CPU + Managed API' },
    ],
  },
  {
    id: 'genai-search',
    name: 'GenAI Search Chat Agent',
    nvidia: 'LLM + RAG',
    icon: Search,
    color: '#10b981',
    gpu: 'OCI GenAI Service',
    industries: ['All Industries', 'Customer Service', 'Legal', 'HR'],
    capabilities: [
      'Intelligent search across enterprise knowledge bases',
      'Multi-document reasoning',
      'Source attribution and citations',
      'Oracle Fusion & NetSuite integration',
    ],
    sizing: [
      { size: 'Standard', gpu: 'OCI GenAI + Object Storage', qty: 'Managed' },
    ],
  },
]

const techStack = [
  { layer: 'Application', items: 'Route Optimizer | VSS | AI-Q | GenAI Search', icon: Zap },
  { layer: 'NVIDIA Software', items: 'cuOPT | Cosmos | NVIDIA NIMs', icon: Cpu },
  { layer: 'Inference', items: 'vLLM (OpenAI-compatible API)', icon: Server },
  { layer: 'Observability', items: 'Prometheus | Grafana | MLFlow | KEDA', icon: BarChart3 },
  { layer: 'OCI Infrastructure', items: 'OKE | GPU Compute | Object Storage', icon: Shield },
]

export default function AcceleratorPacksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(199,70,52,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,70,52,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 w-[60%] h-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(199,70,52,0.08) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <main className="relative z-10">
        <nav className="px-6 py-4">
          <Link href="/ai-ops" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to AI Ops Hub
          </Link>
        </nav>

        <section className="pt-8 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#C74634] font-mono text-sm mb-4 tracking-wider uppercase">OCI AI Accelerator Packs</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Production-Ready GenAI Stacks</h1>
              <p className="text-white/50 text-lg max-w-2xl">
                Full-stack, no-code GenAI solutions that transform GPU deployment from weeks to minutes.
                Built on OCI AI Blueprints with NVIDIA enterprise software.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Shared Tech Stack</h2>
            <div className="space-y-1">
              {techStack.map((layer, i) => (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <layer.icon className="w-5 h-5 text-[#C74634] shrink-0" />
                  <span className="w-40 shrink-0 font-medium text-white/70">{layer.layer}</span>
                  <span className="text-white/40 font-mono text-sm">{layer.items}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packs Detail */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto space-y-16">
            {packs.map((pack, i) => (
              <motion.div
                key={pack.id}
                id={pack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${pack.color}15` }}>
                    <pack.icon className="w-6 h-6" style={{ color: pack.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{pack.name}</h3>
                    <p className="text-white/40 font-mono text-sm">{pack.nvidia}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">Capabilities</h4>
                    <ul className="space-y-2">
                      {pack.capabilities.map(cap => (
                        <li key={cap} className="flex items-start gap-2 text-sm text-white/60">
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: pack.color }} />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">Industries</h4>
                    <div className="flex flex-wrap gap-2">
                      {pack.industries.map(ind => (
                        <span key={ind} className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60">{ind}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">Deployment Sizing</h4>
                    <div className="space-y-3">
                      {pack.sizing.map(s => (
                        <div key={s.size}>
                          <p className="text-sm font-medium text-white/80">{s.size}</p>
                          <p className="text-xs text-white/40 font-mono">{s.gpu}</p>
                          <p className="text-xs text-white/30">{s.qty}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
