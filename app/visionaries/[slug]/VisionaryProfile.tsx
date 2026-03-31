'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  GraduationCap,
  MessageSquare,
  Play,
  Quote,
  Sparkles,
  Trophy,
  Wrench,
} from 'lucide-react'
import type { VisionaryPerson, VisionaryCategory } from '@/lib/research/visionaries'

/* ─── Social icons (inline SVG for X, GitHub, LinkedIn, YouTube) ─── */

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#0a0a0b" />
    </svg>
  )
}

/* ─── Color config ─── */

const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string; badge: string }> = {
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-transparent', badge: 'bg-cyan-500/20 text-cyan-300' },
  indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', gradient: 'from-indigo-500/20 to-transparent', badge: 'bg-indigo-500/20 text-indigo-300' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-transparent', badge: 'bg-amber-500/20 text-amber-300' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-transparent', badge: 'bg-rose-500/20 text-rose-300' },
  fuchsia: { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', gradient: 'from-fuchsia-500/20 to-transparent', badge: 'bg-fuchsia-500/20 text-fuchsia-300' },
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-transparent', badge: 'bg-emerald-500/20 text-emerald-300' },
}

const productIcons: Record<string, typeof BookOpen> = {
  book: BookOpen,
  course: GraduationCap,
  tool: Wrench,
  newsletter: MessageSquare,
}

/* ─── Component ─── */

interface Props {
  person: VisionaryPerson
  category: VisionaryCategory
  related: VisionaryPerson[]
}

export default function VisionaryProfile({ person, category, related }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const colors = colorConfig[category.color] || colorConfig.cyan
  const fade = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Page-level ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[60%] h-[40%]" style={{ background: `radial-gradient(ellipse at center, var(--glow-color, rgba(6, 182, 212, 0.06)) 0%, transparent 70%)`, filter: 'blur(100px)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">

        {/* Breadcrumb */}
        <motion.nav {...fade} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/visionaries" className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Visionaries Hub
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{person.name}</span>
        </motion.nav>

        {/* Hero */}
        <motion.div {...fade} className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.gradient} p-6 sm:p-10 mb-8 overflow-hidden`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-2xl" />

          <div className="relative">
            {/* Rank badge */}
            {person.top10Rank && (
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${colors.badge} text-xs font-medium`}>
                  <Trophy className="w-3.5 h-3.5" />
                  Top 10 — #{person.top10Rank}
                </div>
                <div className={`px-3 py-1 rounded-full ${colors.badge} text-xs font-medium`}>
                  {category.label}
                </div>
              </div>
            )}

            {/* Name + role */}
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.1]">
              {person.name}
            </h1>
            <p className={`text-lg sm:text-xl ${colors.text} mb-4 font-medium`}>{person.role}</p>

            {/* What they build */}
            <p className="text-zinc-300 text-base leading-relaxed mb-6 max-w-2xl">
              {person.builds}
            </p>

            {/* Qualities */}
            <div className="flex flex-wrap gap-2 mb-6">
              {person.qualities.map((q) => (
                <span key={q} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                  {q}
                </span>
              ))}
            </div>

            {/* Social links */}
            {person.socials && (
              <div className="flex items-center gap-3">
                {person.socials.twitter && (
                  <a href={person.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all" aria-label="X / Twitter">
                    <XIcon />
                  </a>
                )}
                {person.socials.youtube && (
                  <a href={person.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-red-400 transition-all" aria-label="YouTube">
                    <YouTubeIcon />
                  </a>
                )}
                {person.socials.github && (
                  <a href={person.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all" aria-label="GitHub">
                    <GitHubIcon />
                  </a>
                )}
                {person.socials.linkedin && (
                  <a href={person.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-blue-400 transition-all" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                )}
                <a href={person.socials.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Why study this person */}
        <motion.div {...fade} transition={{ delay: 0.1 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-5 h-5 ${colors.text}`} />
            <h2 className="text-lg font-semibold text-white">Why Study {person.name.split(' ')[0]}</h2>
          </div>
          <p className="text-zinc-300 leading-relaxed text-base">
            {person.whyDeep || person.why}
          </p>
        </motion.div>

        {/* Key Lessons */}
        {person.keyLessons && person.keyLessons.length > 0 && (
          <motion.div {...fade} transition={{ delay: 0.12 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Trophy className={`w-5 h-5 ${colors.text}`} />
              Key Lessons
            </h2>
            <div className="space-y-4">
              {person.keyLessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-7 h-7 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${colors.text}`}>{i + 1}</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed pt-0.5">{lesson}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Frank's Take */}
        {person.frankTake && (
          <motion.div {...fade} transition={{ delay: 0.15 }} className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-sm font-medium text-amber-400 mb-2">Frank&apos;s Take</h2>
                <p className="text-zinc-200 leading-relaxed italic">
                  &ldquo;{person.frankTake}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Start Here */}
        {person.startHere && (person.startHere.bestTalk || person.startHere.bestArticle || person.startHere.bestBook) && (
          <motion.div {...fade} transition={{ delay: 0.2 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Play className={`w-5 h-5 ${colors.text}`} />
              Start Here
            </h2>
            <div className="grid gap-4">
              {person.startHere.bestTalk && (
                <a href={person.startHere.bestTalk.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all">
                  <div className={`p-2 rounded-lg ${colors.bg} shrink-0`}>
                    <Play className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500 mb-1">Best Talk · {person.startHere.bestTalk.platform}</p>
                    <p className="text-sm text-white group-hover:text-zinc-100 font-medium">{person.startHere.bestTalk.title}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors" />
                </a>
              )}
              {person.startHere.bestArticle && (
                <a href={person.startHere.bestArticle.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all">
                  <div className={`p-2 rounded-lg ${colors.bg} shrink-0`}>
                    <BookOpen className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500 mb-1">Best Article</p>
                    <p className="text-sm text-white group-hover:text-zinc-100 font-medium">{person.startHere.bestArticle.title}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors" />
                </a>
              )}
              {person.startHere.bestBook && (
                <a href={person.startHere.bestBook.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all">
                  <div className={`p-2 rounded-lg ${colors.bg} shrink-0`}>
                    <BookOpen className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500 mb-1">Best Book</p>
                    <p className="text-sm text-white group-hover:text-zinc-100 font-medium">{person.startHere.bestBook.title}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors" />
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Products & Resources */}
        {person.products && person.products.length > 0 && (
          <motion.div {...fade} transition={{ delay: 0.25 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Wrench className={`w-5 h-5 ${colors.text}`} />
              Products &amp; Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {person.products.map((product) => {
                const Icon = productIcons[product.type] || Wrench
                return (
                  <a key={product.title} href={product.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all">
                    <div className={`p-2 rounded-lg ${colors.bg} shrink-0`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white font-medium group-hover:text-zinc-100">{product.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-zinc-500 capitalize">{product.type}</span>
                        {product.price && (
                          <>
                            <span className="text-zinc-700">·</span>
                            <span className="text-xs text-zinc-400">{product.price}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* YouTube embed — prefer curated featuredVideoId over legacy youtubeId */}
        {(person.featuredVideoId || person.youtubeId) && (
          <motion.div {...fade} transition={{ delay: 0.3 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Play className={`w-5 h-5 ${colors.text}`} />
              Featured Video
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden bg-black/50">
              <iframe
                src={`https://www.youtube.com/embed/${person.featuredVideoId || person.youtubeId}`}
                title={`${person.name} featured video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        )}

        {/* Related Visionaries */}
        {related.length > 0 && (
          <motion.div {...fade} transition={{ delay: 0.35 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold text-white mb-5">
              More in {category.label}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => {
                const isEnriched = !!r.slug
                const Wrapper = isEnriched ? Link : 'div'
                const wrapperProps = isEnriched ? { href: `/visionaries/${r.slug}` } : {}
                return (
                  <Wrapper key={r.id} {...(wrapperProps as Record<string, string>)}
                    className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-white">{r.name}</h3>
                      {r.top10Rank && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>#{r.top10Rank}</span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">{r.role}</p>
                    <p className="text-xs text-zinc-400 line-clamp-2">{r.why}</p>
                  </Wrapper>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Back to hub */}
        <Link href="/visionaries" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mt-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Visionaries Hub
        </Link>
      </div>
    </main>
  )
}
