'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) { setDisplayed(text); setDone(true); return }
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(interval); setDone(true) }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, reduce])
  return { displayed, done }
}

function MatrixRain() {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.07]">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-xs text-emerald-400"
          style={{ left: `${i * 5}%` }}
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j}>{String.fromCharCode(0x30a0 + Math.random() * 96)}</div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

function TerminalWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-emerald-500/20 bg-black/80 shadow-2xl shadow-emerald-500/5">
      <div className="flex items-center gap-2 border-b border-emerald-500/10 bg-emerald-950/30 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-500/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-2 font-mono text-xs text-emerald-400/60">{title}</span>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export default function HomeV3({ latestPosts, faqs, featuredTrack, books, products }: HomepageData) {
  const hero = useTypingEffect('> frank.status()')
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    if (hero.done) { const t = setTimeout(() => setShowOutput(true), 300); return () => clearTimeout(t) }
  }, [hero.done])

  useEffect(() => { trackEvent('homepage_view', { variation: 'v3-terminal' }) }, [])

  return (
    <main className="relative min-h-screen bg-black text-emerald-400 selection:bg-emerald-500/30">
      <MatrixRain />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <TerminalWindow title="frankx@studio ~ ">
            <div className="mb-4 text-emerald-300">
              {hero.displayed}
              {!hero.done && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block">_</motion.span>}
            </div>
            {showOutput && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-1 text-emerald-400/80">
                <p className="text-emerald-500">{'{'}</p>
                <p>{'  '}name: <span className="text-white">&quot;Frank Riemer&quot;</span>,</p>
                <p>{'  '}role: <span className="text-white">&quot;AI Systems Architect&quot;</span>,</p>
                <p>{'  '}tracks: <span className="text-cyan-400">12_000</span>,</p>
                <p>{'  '}skills: <span className="text-cyan-400">75</span>,</p>
                <p>{'  '}agents: <span className="text-cyan-400">38</span>,</p>
                <p>{'  '}books: <span className="text-cyan-400">{books.length}</span>,</p>
                <p>{'  '}status: <span className="text-green-400">&quot;shipping&quot;</span>,</p>
                <p className="text-emerald-500">{'}'}</p>
              </motion.div>
            )}
          </TerminalWindow>
          {showOutput && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 text-center font-mono text-xs text-emerald-500/40">
              scroll to explore // press any key to continue
            </motion.p>
          )}
        </div>
      </section>

      {/* Products as npm install */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 font-mono text-xs text-emerald-500/60">$ npm install @frankx/</p>
          <div className="grid gap-3 md:grid-cols-2">
            {products.map((p) => (
              <Link key={p.title} href={p.href} className="group flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-950/20 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-950/40">
                <span className="font-mono text-xs text-emerald-500/60">$</span>
                <div className="flex-1">
                  <span className="font-mono text-emerald-300 group-hover:text-emerald-200">npm install @frankx/{p.title.toLowerCase().replace(/\s+/g, '-')}</span>
                  <p className="mt-1 font-mono text-xs text-emerald-500/50"># {p.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-emerald-500/30 group-hover:translate-x-1 group-hover:text-emerald-400 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hubs as directories */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 font-mono text-xs text-emerald-500/60">$ ls -la ./hubs/</p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: 'music/', desc: '12,000+ AI tracks with Suno', href: '/music', perms: 'drwxr-xr-x' },
              { name: 'blog/', desc: 'Technical tutorials & guides', href: '/blog', perms: 'drwxr-xr-x' },
              { name: 'books/', desc: `${books.length} published works`, href: '/books', perms: 'drwxr-xr-x' },
              { name: 'tools/', desc: 'ACOS, Claude Code skills', href: '/acos', perms: 'drwxr-xr-x' },
              { name: 'design/', desc: 'Generative art experiments', href: '/design-lab', perms: 'drwxr-xr-x' },
              { name: 'coaching/', desc: 'AI architecture training', href: '/coaching', perms: 'drwx------' },
            ].map((hub) => (
              <Link key={hub.name} href={hub.href} className="group flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-950/20 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-950/40">
                <span className="font-mono text-xs text-emerald-500/40">{hub.perms}</span>
                <div className="flex-1">
                  <span className="font-mono text-emerald-300 group-hover:text-emerald-200">{hub.name}</span>
                  <p className="mt-1 font-mono text-xs text-emerald-500/50">{hub.desc}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-emerald-500/30 group-hover:translate-x-1 group-hover:text-emerald-400 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ASCII divider */}
      <div className="max-w-4xl mx-auto px-6">
        <pre className="font-mono text-xs text-emerald-500/20 text-center overflow-hidden">
{`╔══════════════════════════════════════════════════════════════╗
║  L A T E S T   P O S T S                                    ║
╚══════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>

      {/* Latest posts as log entries */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 font-mono text-xs text-emerald-500/60">$ tail -f ./latest-posts.log</p>
          <div className="space-y-3">
            {latestPosts.slice(0, 6).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-baseline gap-4 rounded border border-emerald-500/10 bg-black/40 px-4 py-3 font-mono transition-all hover:border-emerald-500/20 hover:bg-emerald-950/30">
                <span className="text-xs text-emerald-500/40">[{String(i).padStart(2, '0')}]</span>
                <span className="text-xs text-emerald-500/30">{post.date}</span>
                <span className="flex-1 text-sm text-emerald-300 group-hover:text-white">{post.title}</span>
                <span className="text-xs text-emerald-500/30">{post.readingTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      {books.length > 0 && (
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 font-mono text-xs text-emerald-500/60">$ ls ./library/ --format=long</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`} className="group rounded-lg border border-emerald-500/10 bg-emerald-950/20 p-4 transition-all hover:border-emerald-500/30">
                  <p className="font-mono text-sm text-emerald-300 group-hover:text-white">{book.title}</p>
                  <p className="mt-1 font-mono text-xs text-emerald-500/40">{book.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 font-mono text-xs text-emerald-500/60">$ cat ./FAQ.md</p>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-emerald-500/10 bg-black/40 p-4 font-mono">
                  <p className="text-sm text-emerald-300 mb-2">## {faq.question}</p>
                  <p className="text-xs text-emerald-500/50 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <TerminalWindow title="subscribe.sh">
            <p className="mb-4 text-emerald-400/80">$ echo &quot;Join the creation chronicles&quot;</p>
            <EmailSignup listType="newsletter" placeholder="your@email.dev" buttonText="Subscribe" compact />
          </TerminalWindow>
        </div>
      </section>

      <footer className="border-t border-emerald-500/10 px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between font-mono text-xs text-emerald-500/30">
          <span>frankx.ai // v3.terminal</span>
          <Link href="/home" className="transition-colors hover:text-emerald-400">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
