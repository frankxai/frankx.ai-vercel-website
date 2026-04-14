'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileText,
  Heart,
  HelpCircle,
  MapPin,
  Mountain,
  Route,
  Shield,
  Sparkles,
  Wheat,
} from 'lucide-react'
import type { GeschichteThema, Forschungsstatus } from '@/lib/familie/geschichte-themen'
import { geschichteThemen, forschungsstatusConfig } from '@/lib/familie/geschichte-themen'

const iconMap: Record<string, React.ElementType> = {
  Wheat, Shield, Mountain, Route, Heart,
}

const farbeCSS: Record<string, { border: string; text: string; bg: string; gradientFrom: string }> = {
  amber: { border: 'border-amber-500/20', text: 'text-amber-400', bg: 'bg-amber-500/10', gradientFrom: 'from-amber-950/40' },
  slate: { border: 'border-slate-400/20', text: 'text-slate-400', bg: 'bg-slate-400/10', gradientFrom: 'from-slate-950/40' },
  teal: { border: 'border-teal-500/20', text: 'text-teal-400', bg: 'bg-teal-500/10', gradientFrom: 'from-teal-950/40' },
  cyan: { border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradientFrom: 'from-cyan-950/40' },
  emerald: { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradientFrom: 'from-emerald-950/40' },
  rose: { border: 'border-rose-500/20', text: 'text-rose-400', bg: 'bg-rose-500/10', gradientFrom: 'from-rose-950/40' },
}

const quellenTypIcon: Record<string, React.ElementType> = {
  museum: MapPin,
  archiv: FileText,
  buch: BookOpen,
  website: ExternalLink,
  wikipedia: BookOpen,
  dokument: FileText,
}

const zeitstrahlTypFarbe: Record<string, string> = {
  migration: 'bg-amber-500',
  krieg: 'bg-red-500',
  politik: 'bg-blue-500',
  familie: 'bg-violet-500',
  kultur: 'bg-emerald-500',
}

function StatusBadge({ status, compact = false }: { status?: Forschungsstatus; compact?: boolean }) {
  if (!status) return null
  const config = forschungsstatusConfig[status]
  if (compact) {
    return (
      <span title={config.beschreibung} className="cursor-help">
        {config.icon}
      </span>
    )
  }
  return (
    <span
      title={config.beschreibung}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium cursor-help ${config.farbe}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  )
}

function StatusLegende() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <p className="mb-3 font-serif text-xs uppercase tracking-[0.15em] text-white/30">
        Forschungsstatus-Legende
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.entries(forschungsstatusConfig) as [Forschungsstatus, typeof forschungsstatusConfig[Forschungsstatus]][]).map(
          ([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-white/40">
              <span>{config.icon}</span>
              <span>{config.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export function GeschichteThemaPage({ thema }: { thema: GeschichteThema }) {
  const shouldReduceMotion = useReducedMotion()
  const farbe = farbeCSS[thema.farbe]
  const Icon = iconMap[thema.icon] || BookOpen

  const [openFAQ, setOpenFAQ] = useState<number>(0)

  const verwandteThemen = geschichteThemen.filter((t) =>
    thema.verwandt.includes(t.slug)
  )

  const fadeUp = (delay: number = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.6, delay, ease: [0.05, 0.7, 0.1, 1] },
        }

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-b ${farbe.gradientFrom} via-stone-950/50 to-[#0a0a0b]`} />
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-amber-600/6 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-28 sm:pt-32">
          {/* Breadcrumb */}
          <motion.nav {...fadeUp(0)} className="mb-8 flex items-center gap-2 text-sm text-white/30">
            <Link href="/familie" className="transition-colors hover:text-white/50">Familie</Link>
            <span>/</span>
            <Link href="/familie/geschichte" className="transition-colors hover:text-white/50">Geschichte</Link>
            <span>/</span>
            <span className={farbe.text}>{thema.titel}</span>
          </motion.nav>

          {/* Icon + Title */}
          <motion.div {...fadeUp(0.05)} className="mb-6 flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${farbe.bg}`}>
              <Icon className={`h-7 w-7 ${farbe.text}`} />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {thema.titel}
              </h1>
            </div>
          </motion.div>

          <motion.p {...fadeUp(0.1)} className="mb-4 max-w-3xl font-serif text-lg leading-relaxed text-white/50">
            {thema.untertitel}
          </motion.p>

          {/* Research status badge */}
          <motion.div {...fadeUp(0.12)} className="mb-8">
            <StatusBadge status={thema.gesamtstatus} />
          </motion.div>

          {/* TL;DR Box */}
          <motion.div
            {...fadeUp(0.15)}
            className={`rounded-2xl border ${farbe.border} bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm`}
          >
            <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mb-3 flex items-center gap-2">
              <Sparkles className={`h-4 w-4 ${farbe.text}`} />
              <p className="font-serif text-xs uppercase tracking-[0.15em] text-white/40">
                Zusammenfassung
              </p>
            </div>

            <p className="font-serif text-base leading-relaxed text-white/70">
              {thema.kurzfassung}
            </p>

            {/* Meta footer */}
            <div className="mt-4 flex flex-wrap gap-4 border-t border-white/[0.06] pt-4 text-xs text-white/30">
              <span>{thema.abschnitte.length} Abschnitte</span>
              <span>{thema.quellen.length} Quellen</span>
              {thema.zeitstrahl && <span>{thema.zeitstrahl.length} Zeitstrahl-Einträge</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Facts ───────────────────────────────────────── */}
      {thema.schlüsselfakten && thema.schlüsselfakten.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-8">
          <motion.div
            {...fadeUp(0)}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {thema.schlüsselfakten.map((f, i) => (
              <motion.div
                key={f.label}
                {...fadeUp(i * 0.05)}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center backdrop-blur-sm"
              >
                <p className="font-serif text-xl font-bold text-white">{f.wert}</p>
                <p className="mt-1 text-xs text-white/30">{f.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Zeitstrahl (Timeline) ───────────────────────────── */}
      {thema.zeitstrahl && thema.zeitstrahl.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <motion.div {...fadeUp(0)}>
            <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
              Zeitstrahl
            </h2>
            <p className="mb-8 font-serif text-2xl font-semibold text-white">
              Der Lauf der Geschichte
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-white/10 to-violet-500/30 sm:left-1/2" />

            <div className="space-y-6 sm:space-y-8">
              {thema.zeitstrahl.map((eintrag, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={`${eintrag.jahr}-${i}`}
                    {...fadeUp(i * 0.04)}
                    className="relative flex items-start gap-4 sm:gap-0"
                  >
                    {/* Mobile: dot on left line */}
                    <div className="relative z-10 mt-1.5 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <div
                        className={`h-3 w-3 rounded-full ${zeitstrahlTypFarbe[eintrag.typ]} ring-4 ring-[#0a0a0b]`}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 sm:w-[calc(50%-2rem)] ${
                        isLeft
                          ? 'sm:pr-8 sm:text-right'
                          : 'sm:ml-auto sm:pl-8 sm:text-left'
                      }`}
                    >
                      <p className="font-serif text-xs font-semibold uppercase tracking-widest text-white/30">
                        {eintrag.jahr}
                      </p>
                      <h3 className="font-serif text-base font-semibold text-white">
                        {eintrag.titel}
                      </h3>
                      <p className="mt-1 text-sm text-white/40">{eintrag.text}</p>
                      {eintrag.ort && (
                        <div className={`mt-1.5 inline-flex items-center gap-1 text-xs text-white/25 ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
                          <MapPin className="h-3 w-3" />
                          {eintrag.ort}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Content Sections ────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-16">
          {thema.abschnitte.map((abschnitt, i) => (
            <motion.div key={abschnitt.nummer} {...fadeUp(0)}>
              {/* Section number badge + status */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${farbe.bg} font-serif text-sm font-bold ${farbe.text}`}
                >
                  {abschnitt.nummer}
                </span>
                <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                  {abschnitt.titel}
                </h2>
                {abschnitt.status && <StatusBadge status={abschnitt.status} compact />}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 pl-11">
                {abschnitt.inhalt.map((absatz, j) => (
                  <p
                    key={j}
                    className="font-serif text-base leading-[1.8] text-white/60"
                  >
                    {absatz}
                  </p>
                ))}
              </div>

              {/* Sub-details */}
              {abschnitt.details && abschnitt.details.length > 0 && (
                <div className="mt-6 grid gap-3 pl-11 sm:grid-cols-3">
                  {abschnitt.details.map((detail) => (
                    <div
                      key={detail.titel}
                      className={`rounded-xl border-l-2 ${farbe.border} bg-white/[0.02] p-4`}
                    >
                      <h4 className="mb-1 font-serif text-sm font-semibold text-white/80">
                        {detail.titel}
                      </h4>
                      <p className="text-xs leading-relaxed text-white/40">
                        {detail.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Familienverbindung ──────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-4 w-4 text-amber-400" />
            <p className="font-serif text-xs uppercase tracking-[0.15em] text-amber-400/60">
              Unsere Verbindung
            </p>
            <StatusBadge status={thema.familienverbindungStatus} compact />
          </div>
          <p className="font-serif text-base leading-relaxed text-white/60">
            {thema.familienverbindung}
          </p>
        </motion.div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      {thema.faq.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <motion.div {...fadeUp(0)}>
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-white/30" />
              <h2 className="font-serif text-xl font-semibold text-white">
                Häufige Fragen
              </h2>
            </div>

            <div className="space-y-3">
              {thema.faq.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-serif text-sm font-medium text-white/80 pr-4">
                      {faq.frage}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 flex-shrink-0 text-white/30 transition-transform duration-200 ${
                        openFAQ === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.05, 0.7, 0.1, 1] }}
                      >
                        <p className="px-5 pb-5 font-serif text-sm leading-relaxed text-white/50">
                          {faq.antwort}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Quellen ─────────────────────────────────────────── */}
      {thema.quellen.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <motion.div {...fadeUp(0)}>
            <div className="mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-white/30" />
              <h2 className="font-serif text-xl font-semibold text-white">
                Quellen & Weiterlesen
              </h2>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
              {thema.quellen.map((quelle, i) => {
                const QIcon = quellenTypIcon[quelle.typ] || BookOpen
                const content = (
                  <div className="flex items-center gap-3 p-4">
                    <QIcon className="h-4 w-4 flex-shrink-0 text-white/20" />
                    <div className="flex-1">
                      <p className="font-serif text-sm text-white/60">
                        {quelle.name}
                      </p>
                      <p className="text-xs capitalize text-white/20">{quelle.typ}</p>
                    </div>
                    {quelle.url && (
                      <ExternalLink className="h-3.5 w-3.5 text-white/15" />
                    )}
                  </div>
                )

                return quelle.url ? (
                  <a
                    key={i}
                    href={quelle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:bg-white/[0.02]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Related Topics ──────────────────────────────────── */}
      {verwandteThemen.length > 0 && (
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <motion.div {...fadeUp(0)}>
              <h2 className="mb-6 font-serif text-xl font-semibold text-white">
                Verwandte Themen
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {verwandteThemen.map((t) => {
                  const f = farbeCSS[t.farbe]
                  const TIcon = iconMap[t.icon] || BookOpen
                  return (
                    <Link
                      key={t.slug}
                      href={`/familie/geschichte/${t.slug}`}
                      className={`group flex items-center gap-4 rounded-xl border ${f.border} bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}>
                        <TIcon className={`h-5 w-5 ${f.text}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-sm font-medium text-white/80 group-hover:text-white">
                          {t.titel}
                        </p>
                        <p className="text-xs text-white/30 line-clamp-1">{t.untertitel}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/15 transition-transform group-hover:translate-x-1 group-hover:text-white/30" />
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Status Legend ───────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-8">
        <StatusLegende />
      </section>

      {/* ── Wie wurde das erforscht? (public pages only) ───── */}
      {thema.öffentlich && (
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <motion.div {...fadeUp(0)}>
              <div className="rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🔍</span>
                  <h2 className="font-serif text-xl font-semibold text-white">
                    Wie wurde das erforscht?
                  </h2>
                </div>

                <p className="mb-4 font-serif text-sm leading-relaxed text-white/50">
                  Diese Recherche wurde von einem KI-Agenten-Team durchgeführt —
                  dem gleichen System, das Frank für Enterprise-AI-Architekturen bei
                  Oracle baut. Mehrere spezialisierte Agenten haben parallel
                  Quellen durchsucht, Fakten gegengeprüft und Ergebnisse mit einem
                  Konfidenz-System bewertet.
                </p>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="mb-1 text-xs font-medium text-emerald-400">Methode</p>
                    <p className="text-xs text-white/40">
                      Parallele Agentenrecherche mit Quellenvalidierung.
                      Jeder Abschnitt erhält einen Forschungsstatus (🟢🟡🔍🔴).
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="mb-1 text-xs font-medium text-emerald-400">Quellen</p>
                    <p className="text-xs text-white/40">
                      {thema.quellen.length} Quellen aus Archiven, Museen, akademischen
                      Datenbanken und Genealogie-Plattformen.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/familie/forsche-selbst"
                    className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 font-serif text-sm font-medium text-emerald-300 transition-all hover:bg-emerald-500/20"
                  >
                    Forsche selbst — Kostenlose Anleitung
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/familie/mitmachen"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-serif text-sm font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white/70"
                  >
                    Fehler gefunden? Hilf uns verbessern
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Footer ──────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center">
          <Link
            href="/familie/geschichte"
            className="inline-flex items-center gap-2 font-serif text-sm text-white/30 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Alle Themen
          </Link>
        </div>
      </section>
    </main>
  )
}
