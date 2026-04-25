'use client'

import Link from 'next/link'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Heart,
  Mountain,
  Route,
  Shield,
  Wheat,
  type LucideIcon,
} from 'lucide-react'
import { geschichteThemen } from '@/lib/familie/geschichte-themen'
import { MigrationMap } from '@/components/familie/MigrationMap'

const iconMap: Record<string, LucideIcon> = {
  Wheat,
  Shield,
  Mountain,
  Route,
  Heart,
}

const farbeMap: Record<string, { border: string; text: string; bg: string; glow: string }> = {
  amber: { border: 'border-amber-500/20', text: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'hover:shadow-amber-500/10' },
  slate: { border: 'border-slate-400/20', text: 'text-slate-400', bg: 'bg-slate-400/10', glow: 'hover:shadow-slate-400/10' },
  teal: { border: 'border-teal-500/20', text: 'text-teal-400', bg: 'bg-teal-500/10', glow: 'hover:shadow-teal-500/10' },
  cyan: { border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'hover:shadow-cyan-500/10' },
  emerald: { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'hover:shadow-emerald-500/10' },
  rose: { border: 'border-rose-500/20', text: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'hover:shadow-rose-500/10' },
}

const quellenHighlights = [
  { name: 'Museum für russlanddeutsche Kulturgeschichte', ort: 'Detmold', url: 'https://www.russlanddeutsche.de' },
  { name: 'Wolgadeutsche.net', ort: 'Online-Archiv', url: 'https://www.wolgadeutsche.net' },
  { name: 'Landsmannschaft der Deutschen aus Russland', ort: 'Stuttgart', url: 'https://www.lmdr.de' },
  { name: 'FamilySearch.org', ort: 'Genealogie', url: 'https://www.familysearch.org' },
]

export default function GeschichteHubPage() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 80]), { stiffness: 100, damping: 30 })
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0])

  const fadeUp = (delay: number = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, delay, ease: [0.05, 0.7, 0.1, 1] },
        }

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* ── Hero Section ────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-stone-950/50 to-[#0a0a0b]" />
          <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-amber-600/8 blur-[120px]" />
          <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-teal-600/5 blur-[100px]" />
        </div>

        <motion.div
          className="relative mx-auto max-w-5xl px-6 pb-8 pt-28 sm:pb-12 sm:pt-32"
          style={{ y: shouldReduceMotion ? 0 : heroY, opacity: shouldReduceMotion ? 1 : heroOpacity }}
        >
          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <Link
              href="/familie"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Familie Hub
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-sm text-amber-400/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              Lebendige Geschichte
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.15)}
            className="mb-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
              Unsere Geschichte
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.2)}
            className="mb-10 max-w-2xl font-serif text-lg leading-relaxed text-white/50 sm:text-xl"
          >
            Die Geschichte der Familien Riemer und Gorte. Von der Wolga nach Kasachstan,
            von Deutschland in die Welt. Jede Seite ein Stück unserer Herkunft.
          </motion.p>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.25)}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: 'Themen', wert: `${geschichteThemen.length}` },
              { label: 'Generationen', wert: '4' },
              { label: 'Familienlinien', wert: '2' },
              { label: 'Quellen', wert: '10+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-center backdrop-blur-sm"
              >
                <p className="font-serif text-xl font-bold text-white">{stat.wert}</p>
                <p className="text-xs text-white/30">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Migration Map ───────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <motion.div {...fadeUp(0)}>
          <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Die Reise
          </h2>
          <p className="mb-8 font-serif text-2xl font-semibold text-white sm:text-3xl">
            Von der Wolga nach Amsterdam
          </p>
          <MigrationMap />
        </motion.div>
      </section>

      {/* ── Topic Grid ──────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <motion.div {...fadeUp(0)}>
          <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Themen
          </h2>
          <p className="mb-8 font-serif text-2xl font-semibold text-white sm:text-3xl">
            Entdecke unsere Vergangenheit
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {geschichteThemen.map((thema, i) => {
            const farbe = farbeMap[thema.farbe]
            const Icon = iconMap[thema.icon] || BookOpen
            return (
              <motion.div key={thema.slug} {...fadeUp(i * 0.06)}>
                <Link
                  href={`/familie/geschichte/${thema.slug}`}
                  className={`group relative flex h-full flex-col rounded-2xl border ${farbe.border} bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:scale-[1.01] hover:shadow-xl ${farbe.glow} backdrop-blur-sm`}
                >
                  {/* Specular highlight */}
                  <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Icon */}
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${farbe.bg}`}>
                    <Icon className={`h-5 w-5 ${farbe.text}`} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 font-serif text-lg font-semibold text-white">
                    {thema.titel}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-white/40">
                    {thema.untertitel}
                  </p>

                  {/* Key facts preview */}
                  {thema.schlüsselfakten && thema.schlüsselfakten.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {thema.schlüsselfakten.slice(0, 2).map((f) => (
                        <span
                          key={f.label}
                          className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/40"
                        >
                          {f.label}: <span className="text-white/60">{f.wert}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className={`flex items-center gap-1.5 text-sm font-medium ${farbe.text} opacity-60 transition-opacity group-hover:opacity-100`}>
                    Lesen
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Familienverbindung ──────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-8 sm:p-12"
        >
          <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

          <p className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-amber-400/60">
            Unsere Forschungsarbeit
          </p>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
            Mehr offene Fragen als Antworten.
          </h2>
          <p className="mb-4 max-w-3xl font-serif text-base leading-relaxed text-white/50">
            Die Familien Riemer, Schneider, Gorte und Prager sind vermutlich
            Teil der Russlanddeutschen Geschichte — aber jede konkrete Verbindung
            ist noch unbewiesen. Wir kennen sicher fünf Generationen zurück bis
            zum Urgroßvater Christian Riemer (geboren 1914, Karaganda — Familienüberlieferung).
            Davor: Hypothesen und offene Fragen.
          </p>
          <p className="mb-6 max-w-3xl font-serif text-sm leading-relaxed text-white/35 italic">
            Wir machen die Unsicherheit sichtbar, weil sie der ehrliche
            Ausgangspunkt ist. Jede Aussage auf diesen Seiten trägt eines
            von vier Konfidenz-Zeichen: 🟢 verifiziert, 🟡 überlieferung,
            🔍 hypothese, 🔴 unbekannt.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/familie/geschichte/offene-fragen"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-5 py-2.5 font-serif text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/20"
            >
              Offene Fragen ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/familie/interview-kit"
              className="inline-flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-5 py-2.5 font-serif text-sm font-medium text-rose-200 transition-all hover:bg-rose-500/20"
            >
              Interview-Kit für Großeltern
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/familie/stammbaum"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-serif text-sm font-medium text-white/50 transition-all hover:bg-white/10"
            >
              Stammbaum
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Quellen ─────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <motion.div {...fadeUp(0)}>
            <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
              Quellen & Weiterlesen
            </h2>
            <p className="mb-8 font-serif text-2xl font-semibold text-white">
              Wo wir forschen
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quellenHighlights.map((q, i) => (
              <motion.a
                key={q.name}
                href={q.url}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp(i * 0.05)}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/[0.12]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-sm font-medium text-white/80 group-hover:text-white">
                    {q.name}
                  </p>
                  <p className="text-xs text-white/30">{q.ort}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-white/20 transition-colors group-hover:text-white/40" />
              </motion.a>
            ))}
          </div>

          <p className="mt-6 font-serif text-sm italic text-white/25">
            Kennst du weitere Quellen? Sag Frank Bescheid.
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center">
          <p className="font-serif text-xs text-white/15">
            Diese Geschichte wächst mit der Familie &middot; Riemer-Gorte
          </p>
        </div>
      </section>
    </main>
  )
}
