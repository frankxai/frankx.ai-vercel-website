'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface CollectionPost {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  image?: string
}

interface CollectionRowProps {
  eyebrow: string
  title: string
  subtitle: string
  posts: CollectionPost[]
}

export default function CollectionRow({ eyebrow, title, subtitle, posts }: CollectionRowProps) {
  if (posts.length === 0) return null

  const [lead, ...rest] = posts

  return (
    <section className="py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-400/80 font-medium mb-1.5">{eyebrow}</div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h2>
          <p className="text-sm text-white/45 mt-1 max-w-xl">{subtitle}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Lead article — spans wider on large screens */}
        <Link
          href={`/blog/${lead.slug}`}
          className="group relative lg:col-span-2 flex flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] min-h-[240px] transition-colors hover:border-emerald-500/30"
        >
          {lead.image && (
            <Image
              src={lead.image || "/placeholder.svg"}
              alt={lead.title}
              fill
              className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/70 to-transparent" />
          <div className="relative p-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400/90 mb-2">
              <span>{lead.category}</span>
              <span className="text-white/30 normal-case tracking-normal">· {lead.readingTime}</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-emerald-300 transition">
              {lead.title}
            </h3>
            <p className="mt-2 text-sm text-white/55 line-clamp-2 max-w-lg">{lead.description}</p>
          </div>
        </Link>

        {/* Compact list of the rest */}
        <div className="flex flex-col gap-3">
          {rest.slice(0, 4).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.2) }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-emerald-500/25 hover:bg-white/[0.04]"
              >
                {post.image && (
                  <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] uppercase tracking-widest text-emerald-400/70 mb-0.5">{post.readingTime}</div>
                  <h4 className="text-sm font-medium text-white/90 leading-snug line-clamp-2 group-hover:text-emerald-300 transition">
                    {post.title}
                  </h4>
                </div>
                <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-white/25 group-hover:text-emerald-400 transition" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
