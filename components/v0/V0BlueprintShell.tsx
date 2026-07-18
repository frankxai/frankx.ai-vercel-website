'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  GitBranch,
  Layers,
  Sparkles,
  Workflow,
} from 'lucide-react'
import {
  curatedTemplates,
  frankxBlueprints,
  graphStats,
  intelligencePillars,
  originals,
  type Spectrum,
} from '@/content/v0/blueprints'
import V0KnowledgeGraph from './V0KnowledgeGraph'
import { teardowns } from '@/content/v0/teardowns'
import { v0Products } from '@/content/v0/products'

const spectrumRing: Record<Spectrum, string> = {
  tech: 'focus-visible:ring-emerald-400/60',
  soul: 'focus-visible:ring-amber-400/60',
}
const spectrumText: Record<Spectrum, string> = {
  tech: 'text-emerald-300',
  soul: 'text-amber-300',
}
const spectrumGlow: Record<Spectrum, string> = {
  tech: 'from-emerald-500/[0.12] to-cyan-500/[0.04]',
  soul: 'from-amber-500/[0.12] to-orange-500/[0.04]',
}

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-void" />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <span
          key={s}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/45"
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  blurb,
  spectrum = 'tech',
}: {
  icon: typeof Boxes
  eyebrow: string
  title: string
  blurb: string
  spectrum?: Spectrum
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="mb-3 flex items-center gap-2.5">
        <Icon className={`h-5 w-5 ${spectrumText[spectrum]}`} />
        <span className="text-xs font-medium uppercase tracking-[0.24em] text-white/40">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-white/55">{blurb}</p>
    </div>
  )
}

function Card({
  href,
  external,
  spectrum,
  badge,
  title,
  meta,
  note,
  stack,
}: {
  href: string
  external?: boolean
  spectrum: Spectrum
  badge?: string
  title: string
  meta: string
  note: string
  stack?: string[]
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void ${spectrumRing[spectrum]}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${spectrumGlow[spectrum]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />
        <div className="relative">
          <div className="mb-4 flex items-start justify-between gap-4">
            <span className={`text-[11px] font-medium uppercase tracking-[0.14em] ${spectrumText[spectrum]}`}>
              {meta}
            </span>
            {external ? (
              <ArrowUpRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/60" />
            ) : (
              <ArrowRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/60" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {badge ? (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/50">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/50">{note}</p>
          {stack ? <StackChips stack={stack} /> : null}
        </div>
      </Link>
    </motion.div>
  )
}

export default function V0BlueprintShell() {
  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-white/50">
                  FrankX × v0
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                The v0 Blueprint
                <span className="mt-2 block text-white/55">
                  Best-of-v0, deconstructed and upgraded.
                </span>
              </h1>
              <p className="max-w-2xl text-[17px] leading-relaxed text-white/75 md:text-xl">
                A curated field guide to the strongest v0 templates — with the architecture
                behind them, and the FrankX-native surfaces we build by upgrading them for real
                domains. Study the best. Fork the intelligence. Ship faster.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://v0.app/templates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  Browse the v0 gallery
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  FrankX templates
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Best of v0 */}
        <section className="py-14">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              icon={Boxes}
              eyebrow="Curated"
              title="Best of v0"
              blurb="Hand-picked templates from the public v0 gallery — chosen for design quality, not hype. Every card links out to the source; nothing here is reproduced without attribution."
              spectrum="tech"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {curatedTemplates.map((t) => (
                <Card
                  key={t.id}
                  href={t.url}
                  external
                  spectrum={t.spectrum}
                  badge={t.rating}
                  title={t.name}
                  meta={t.category}
                  note={t.note}
                  stack={t.stack}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FrankX Blueprints */}
        <section className="border-t border-white/5 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              icon={Layers}
              eyebrow="Dogfooded"
              title="FrankX Blueprints"
              blurb="Surfaces on this very site, accelerated with v0 and finished to the FrankX two-spectrum system. Proof the pipeline works — click through to the live pages."
              spectrum="soul"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {frankxBlueprints.map((b) => (
                <Card
                  key={b.id}
                  href={b.href}
                  spectrum={b.spectrum}
                  title={b.name}
                  meta={b.surface}
                  note={b.note}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Originals (renders only when generations land) */}
        {originals.length > 0 ? (
          <section className="border-t border-white/5 py-14">
            <div className="mx-auto max-w-5xl px-6">
              <SectionHeader
                icon={Workflow}
                eyebrow="Generated"
                title="FrankX Originals"
                blurb="Flagship, FrankX-native templates generated from brand-locked v0 prompts — one per pillar, each engineered past the generic-SaaS look. Commission a build to deploy one on your brand."
                spectrum="tech"
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {originals.map((o) => (
                  <Card
                    key={o.id}
                    href="/contact"
                    spectrum={o.spectrum}
                    badge="FrankX Blueprint"
                    title={o.name}
                    meta={o.domain}
                    note={o.note}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* The Products */}
        <section className="border-t border-white/5 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              icon={Sparkles}
              eyebrow="In production"
              title="The Products"
              blurb="Three flagship products built on this pipeline — designed against the taste bans, generated on v0, finished by hand. Launching soon; commission early access."
              spectrum="soul"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {v0Products.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/contact"
                    className={`group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void ${spectrumRing[p.spectrum]}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${spectrumGlow[p.spectrum]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    />
                    <div className="relative flex h-full flex-col">
                      <span className={`text-[11px] font-medium uppercase tracking-[0.14em] ${spectrumText[p.spectrum]}`}>
                        {p.category}
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{p.name}</h3>
                      <p className="mt-1 text-sm italic text-white/45">{p.tagline}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">{p.essence}</p>
                      <ul className="mt-5 space-y-1.5 border-t border-white/5 pt-4">
                        {p.pillars.map((pillar) => (
                          <li key={pillar} className="flex items-center gap-2 text-xs text-white/45">
                            <span
                              className={`h-1 w-1 rounded-full ${p.spectrum === 'tech' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                            />
                            {pillar}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors group-hover:text-white">
                        Early access <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Intelligence */}
        <section className="border-t border-white/5 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              icon={GitBranch}
              eyebrow="The moat"
              title="The Intelligence"
              blurb="The reason this page exists: not a link dump, but a working analysis layer — a knowledge graph, architecture teardowns, and upgrade playbooks that turn any v0 template into a domain-grade surface."
              spectrum="tech"
            />
            <div className="mb-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { n: graphStats.templates, l: 'templates mapped' },
                { n: graphStats.connections, l: 'pattern connections' },
                { n: graphStats.categories, l: 'categories' },
                { n: graphStats.builtSurfaces, l: 'FrankX surfaces shipped' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-semibold text-white md:text-4xl">{s.n}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mb-10">
              <V0KnowledgeGraph />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {intelligencePillars.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className={`text-lg font-semibold ${spectrumText[p.spectrum]}`}>{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{p.note}</p>
                </div>
              ))}
            </div>

            {/* Architecture teardowns */}
            <div className="mt-10">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white/40">
                Architecture teardowns
              </h3>
              <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                {teardowns.map((t) => (
                  <details key={t.id} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`h-2 w-2 rounded-full ${t.spectrum === 'tech' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        />
                        <span className="text-sm font-semibold text-white">{t.archetype}</span>
                      </span>
                      <span className="hidden max-w-[45%] truncate text-xs text-white/30 sm:block">
                        {t.shape}
                      </span>
                    </summary>
                    <div className="mt-4 grid gap-4 pl-[18px] sm:grid-cols-2">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-white/35">Shape</div>
                        <p className="mt-1 text-xs leading-relaxed text-white/55">{t.shape}</p>
                        <div className="mt-3 text-[11px] uppercase tracking-wide text-white/35">
                          In the graph
                        </div>
                        <p className="mt-1 text-xs text-white/55">{t.examples.join(' · ')}</p>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-white/35">
                          Upgrade vectors · Next 16
                        </div>
                        <ul className="mt-1 space-y-1">
                          {t.upgrades.map((u, i) => (
                            <li key={i} className="text-xs leading-relaxed text-white/55">
                              — {u}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Want your surface built this way?
              </h2>
              <p className="mb-8 text-[17px] leading-relaxed text-white/75">
                We start from the best of v0, deconstruct the architecture, and upgrade it into a
                production surface on your brand — fast, without the generic-SaaS look.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  Request a build
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  See the Labs
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
