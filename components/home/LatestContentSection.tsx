'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { homepageContent } from '@/data/homepage'

interface Article {
  slug: string
  title: string
  summary: string
  publishedAt: string
  image?: string
  readingTime?: string
  category?: string
}

interface LatestContentSectionProps {
  articles: Article[]
}

export function LatestContentSection({ articles }: LatestContentSectionProps) {
  const { latestContent } = homepageContent

  return (
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/[0.03] relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.015] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16"
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {latestContent.sectionTitle}
            </h2>
            <p className="text-lg sm:text-xl text-white/50">
              {latestContent.sectionSubtitle}
            </p>
          </div>
          <Link
            href={latestContent.viewAllHref}
            className="group inline-flex items-center gap-2 text-base text-white/50 hover:text-emerald-400 transition-colors self-start sm:self-auto"
          >
            {latestContent.viewAllText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.4)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                {/* Image */}
                {article.image && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/[0.02]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category & reading time */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-white/40">
                    {article.category && (
                      <span className="font-medium uppercase tracking-wider text-emerald-400/70">
                        {article.category}
                      </span>
                    )}
                    {article.readingTime && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readingTime}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3 group-hover:text-white/60 transition-colors">
                    {article.summary}
                  </p>

                  {/* Date */}
                  <time className="text-xs text-white/30">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
