'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrench, ChevronLeft, ArrowRight } from 'lucide-react'

import { getByCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

export default function InvestorToolsPage() {
  const products = getByCategory('tools')

  return (
    <main className="min-h-screen bg-[#030712]">
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Tools & Templates</h1>
              <p className="text-slate-400">
                Notion, Obsidian, Claude Code & workspace configs &bull;{' '}
                <span className="text-amber-400">$0+</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Ready-to-use templates for your existing tools. Notion deal flow CRMs, Obsidian
            portfolio tracking vaults, and pre-configured Claude Code workspaces for investment
            research. Set up in minutes, customize for your workflow.
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
              <Wrench className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">Tools and templates are being prepared. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Ready for AI-Powered Research?</h2>
          <p className="mb-6 text-slate-400">
            Level up with autonomous agents that handle due diligence and market research for you.
          </p>
          <Link
            href="/investor/agents"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Browse Agent Packs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
