'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Copy, Check, Star, Tag, Lightbulb } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { CategoryInfo, Prompt } from '@/lib/prompts'
import { getAffiliate } from '@/lib/affiliates/affiliate-manager'
import AffiliateDisclosure from '../affiliates/AffiliateDisclosure'
import AffiliateCard from '../affiliates/AffiliateCard'
import { Pill, SectionHeading, Surface, StatBlock } from '@/components/ui/primitives'
import PromptCard from './PromptCard'

interface PromptDetailViewProps {
  prompt: Prompt
  category?: CategoryInfo
  relatedPrompts: Prompt[]
}

export default function PromptDetailView({ prompt, category, relatedPrompts }: PromptDetailViewProps) {
  const [copied, setCopied] = useState(false)
  const affiliate = useMemo(() => (prompt.affiliateId ? getAffiliate(prompt.affiliateId) : undefined), [prompt.affiliateId])

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen pb-24 pt-28 text-white">
      <section className="container-px">
        <div className="mx-auto max-w-5xl space-y-12">
          {category && (
            <div className="flex justify-center">
              <Link
                href={`/prompt-library/${category.id}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-1 text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                <span className="text-lg">{category.emoji}</span>
                Back to {category.name}
              </Link>
            </div>
          )}

          <div className="space-y-6 text-center">
            <Pill variant="brand" className="mx-auto">
              Prompt Spotlight
            </Pill>
            <SectionHeading
              align="center"
              eyebrow={`${prompt.aiTool.toUpperCase()} // ${prompt.difficulty}`}
              title={prompt.title}
              description={prompt.description}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatBlock value={String(prompt.rating)} label="Rating" description="Community score" align="center" />
            <StatBlock value={prompt.usageCount.toLocaleString()} label="Usage" description="Applied in the field" align="center" />
            <StatBlock value={new Date(prompt.createdAt).toLocaleDateString()} label="Published" description="Creation date" align="center" />
            <StatBlock value={new Date(prompt.updatedAt).toLocaleDateString()} label="Last Updated" description="Most recent version" align="center" />
          </div>

          <Surface tone="glass" padding="lg" className="relative">
            <div className="absolute right-4 top-4">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>

            <div className="prose prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0">
              <SyntaxHighlighter
                language="markdown"
                style={vscDarkPlus}
                wrapLines
                lineProps={{
                  style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' },
                }}
              >
                {prompt.content}
              </SyntaxHighlighter>
            </div>
          </Surface>

          <div className="grid gap-6 md:grid-cols-2">
            <Surface tone="glass" padding="lg">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-brand-500" />
                <h3 className="text-lg font-semibold text-white">Use Case</h3>
              </div>
              <p className="mt-4 text-white/70">{prompt.useCase}</p>
            </Surface>
            <Surface tone="glass" padding="lg">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-brand-500" />
                <h3 className="text-lg font-semibold text-white">Tags</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </Surface>
          </div>

          {affiliate && (
            <div className="mt-12">
              <h3 className="mb-6 text-center text-2xl font-bold text-white">Recommended Tool</h3>
              <div className="mx-auto max-w-md">
                <AffiliateCard affiliate={affiliate} trackingId={`prompt-detail-${prompt.id}`} />
              </div>
            </div>
          )}

          <AffiliateDisclosure />
        </div>
      </section>

      {relatedPrompts.length > 0 && (
        <section className="container-px mt-20">
          <div className="mx-auto max-w-5xl space-y-8 text-center">
            <SectionHeading
              align="center"
              eyebrow="Related Prompts"
              title="Continue Your Exploration"
              description={category ? `Other prompts in the ${category.name} category you might find useful.` : 'More prompts from the library you may enjoy.'}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPrompts.map((relatedPrompt, index) => (
                <motion.div
                  key={relatedPrompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <PromptCard prompt={relatedPrompt} showDescription />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
