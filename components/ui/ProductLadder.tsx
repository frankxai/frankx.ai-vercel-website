'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, Terminal, Crown, Shield } from 'lucide-react'
import { GlowCard } from './glow-card'

const products = [
  {
    id: 'free',
    name: 'The Foundation',
    price: '$0',
    description: 'Everything you need to start building and creating with AI today.',
    icon: Shield,
    color: 'emerald' as const,
    features: [
      'Weekly Intelligence Newsletter',
      'Open-source AI Blueprints',
      'Free Next.js Prototypes',
      'Music Production Tutorials',
    ],
    cta: 'Explore Free Resources',
    href: '/resources',
  },
  {
    id: 'toolkit',
    name: 'Creator Toolkit',
    price: '$47',
    description: 'Battle-tested prompts, templates, and workflows to accelerate your output.',
    icon: Zap,
    color: 'amber' as const,
    features: [
      '200+ Curated Prompt Library',
      'Suno AI Master Cheat Sheet',
      'Notion Workflow Templates',
      'Social Media Growth Hooks',
    ],
    cta: 'Get the Toolkit',
    href: '/products/creative-ai-toolkit',
  },
  {
    id: 'acos',
    name: 'ACOS Pro',
    price: '$297',
    description: 'Agentic Creator OS. The full operating system for Claude Code.',
    icon: Terminal,
    color: 'cyan' as const,
    features: [
      '75+ CLI Skills & Commands',
      '38 Specialized Agents',
      'Automated Content Pipeline',
      'Lifetime Updates & Community',
    ],
    cta: 'Unlock ACOS',
    href: '/acos',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Inner Circle',
    price: 'Custom',
    description: '1-on-1 AI architecture consulting and bespoke agent development.',
    icon: Crown,
    color: 'violet' as const,
    features: [
      'Direct Access to Frank',
      'Custom Enterprise Architecture',
      'Private Codebase Reviews',
      'Priority Implementation',
    ],
    cta: 'Apply for Pilot',
    href: '/contact?topic=pilot',
  },
]

export function ProductLadder() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0b] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400/80 mb-4 block">
            The Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            The Product Ladder
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            From free foundational blueprints to fully automated enterprise operating systems. 
            Choose the tier that matches your ambition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {product.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                    <div className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                      Most Popular
                    </div>
                  </div>
                )}
                <GlowCard color={product.color} className="h-full flex flex-col p-8">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                      <Icon className="w-6 h-6 text-white/70" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <div className="text-3xl font-black text-white mb-4">{product.price}</div>
                    <p className="text-sm text-white/40 leading-relaxed h-16">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-white/60">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 text-${product.color}-400`} />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={product.href}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
                      product.popular 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
                        : 'bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] hover:border-white/[0.2]'
                    }`}
                  >
                    {product.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
