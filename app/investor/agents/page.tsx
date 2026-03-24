'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bot, ChevronLeft, ArrowRight } from 'lucide-react'

import { getByCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

export default function InvestorAgentsPage() {
  const products = getByCategory('agents')

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="pb-12 pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/investor"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Investor Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Agent Packs</h1>
              <p className="text-slate-400">
                Autonomous research agents for investors &bull;{' '}
                <span className="text-cyan-400">$47+</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Pre-built AI agents for due diligence, market research, stock analysis, and competitive
            intelligence. Each pack includes Claude Code skills, n8n orchestration workflows, and
            output templates. Drop in a company name and get structured analysis.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <InvestorProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <Bot className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">Agent packs are being prepared. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Need Automated Pipelines Instead?</h2>
          <p className="mb-6 text-slate-400">
            Check out our n8n workflow templates for end-to-end deal flow automation.
          </p>
          <Link
            href="/investor/workflows"
            className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Browse Workflows
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
