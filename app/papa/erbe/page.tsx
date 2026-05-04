import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import {
  ArticleJsonLd,
  BookScaffoldJsonLd,
  BreadcrumbJsonLd,
  PersonWitaliJsonLd,
} from '@/components/papa/SchemaScripts'
import {
  backbone,
  disciplineCodes,
  forTheFatherless,
  inheritanceChain,
  manifesto,
  principles,
  responsibilityModels,
  stages,
  workMoneyDignity,
} from '@/data/papa'

export const metadata: Metadata = {
  title: 'Das Erbe — Was mir mein Vater gab | Papa',
  description:
    'Zehn Prinzipien, sechs Wege solide zu werden, Disziplin-Codes, Rückgrat, Verantwortung. Ein lebendiger Entwurf des Erbes von Witali Riemer — in einer Sprache, die andere lesen können.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://frankx.ai/papa/erbe',
    languages: {
      de: 'https://frankx.ai/papa/erbe',
      en: 'https://frankx.ai/papa/en/inheritance',
    },
  },
}

const sections = [
  { id: 'manifest', label: 'Manifest' },
  { id: 'prinzipien', label: 'Prinzipien' },
  { id: 'wege', label: 'Wege' },
  { id: 'disziplin', label: 'Disziplin' },
  { id: 'ruckgrat', label: 'Rückgrat' },
  { id: 'verantwortung', label: 'Verantwortung' },
  { id: 'arbeit', label: 'Arbeit' },
  { id: 'vaterlose', label: 'Für die Vaterlosen' },
  { id: 'kette', label: 'Kette' },
]

export default function ErbePage() {
  return (
    <PapaShell lang="de" draft>
      <PersonWitaliJsonLd />
      <ArticleJsonLd
        title="Das Erbe — Was mir mein Vater gab"
        description="Zehn Prinzipien, sechs Wege solide zu werden, Disziplin-Codes, Rückgrat. Lebendiger Entwurf."
        url="https://frankx.ai/papa/erbe"
        inLanguage="de"
        draft
      />
      <BookScaffoldJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa' },
          { name: 'Das Erbe', url: 'https://frankx.ai/papa/erbe' },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 pt-16">
        <Link
          href="/papa"
          className="inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-amber-300/70"
        >
          <ArrowLeft className="h-3 w-3" />
          Zurück zu Papa
        </Link>
      </div>

      {/* Anchor nav */}
      <nav
        aria-label="Inhaltsverzeichnis"
        className="sticky top-0 z-10 mt-12 border-y border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-3xl overflow-x-auto px-6">
          <ul className="flex gap-6 py-3 text-xs">
            {sections.map((s) => (
              <li key={s.id} className="flex-shrink-0">
                <a
                  href={`#${s.id}`}
                  className="whitespace-nowrap font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-amber-300/80"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Manifesto */}
      <section id="manifest" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32 lg:py-40">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Manifest
          </p>
          <h1 className="mb-12 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Das Erbe
          </h1>
          <div className="space-y-6 whitespace-pre-line text-lg leading-[1.85] text-white/70">
            {manifesto.de}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="prinzipien" className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Zehn Prinzipien
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Was er verkörpert hat
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-white/50">
            Erste Fassung aus dem, was ich aus seinen Gewohnheiten und Entscheidungen gelesen
            habe. Jeder Punkt wird mit Geschichten der Familie verfeinert.
          </p>

          <ol className="space-y-10">
            {principles.map((p) => (
              <li key={p.number} className="flex gap-6">
                <span className="flex-shrink-0 font-mono text-2xl font-light text-amber-300/40">
                  {String(p.number).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-white">{p.title.de}</h3>
                  <p className="mb-3 text-base leading-relaxed text-white/65">
                    {p.elaboration.de}
                  </p>
                  <p className="border-l-2 border-amber-500/30 pl-4 text-sm italic text-amber-100/65">
                    {p.application.de}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stages */}
      <section id="wege" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Sechs Wege
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Solide werden
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-white/50">
            Vom Jungen, der gerettet werden will, zum Ältesten, der ohne Anspruch übergibt.
            Sechs Stationen — jede hat ihre Qualität, ihre Gefahr, ihren Übergang.
          </p>

          <ol className="space-y-8">
            {stages.map((s) => (
              <li
                key={s.number}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7"
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-mono text-sm text-amber-300/50">
                    Stufe {s.number}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{s.name.de}</h3>
                </div>
                <dl className="grid gap-4 sm:grid-cols-3">
                  <Stat label="Qualität" value={s.qualities.de} />
                  <Stat label="Gefahr" value={s.danger.de} />
                  <Stat label="Übergang" value={s.passage.de} />
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Discipline */}
      <section
        id="disziplin"
        className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Disziplin-Codes
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Wie man festwird, wenn niemand zusieht
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {disciplineCodes.map((c) => (
              <li
                key={c.de}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 text-base leading-relaxed text-white/70"
              >
                {c.de}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Backbone */}
      <section id="ruckgrat" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Emotionales Rückgrat
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tiefe ohne Zerbrechen
          </h2>
          <p className="mb-10 border-l-2 border-amber-500/40 pl-6 text-xl italic leading-relaxed text-amber-100/75">
            {backbone.headline.de}
          </p>
          <ul className="space-y-3 text-lg leading-relaxed text-white/70">
            {backbone.pillars.map((pillar) => (
              <li key={pillar.de} className="flex gap-3">
                <span aria-hidden className="text-amber-300/50">
                  ·
                </span>
                {pillar.de}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Responsibility */}
      <section
        id="verantwortung"
        className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Verantwortung
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Was Erwachsensein wirklich heißt
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/65">
            Verantwortung ist keine Unterdrückung, wenn sie gewählt ist. Sie ist die Form, in
            der ein Mensch real wird.
          </p>
          <ul className="space-y-3">
            {responsibilityModels.map((m) => (
              <li key={m.de} className="text-base leading-relaxed text-white/70">
                <span aria-hidden className="mr-3 text-amber-300/50">
                  ·
                </span>
                {m.de}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work / Money / Dignity */}
      <section id="arbeit" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Arbeit · Geld · Würde
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Geld ist gespeicherte Verantwortung
          </h2>
          <p className="mb-10 border-l-2 border-amber-500/40 pl-6 text-xl italic leading-relaxed text-amber-100/75">
            {workMoneyDignity.headline.de}
          </p>
          <ul className="space-y-3 text-lg leading-relaxed text-white/70">
            {workMoneyDignity.principles.map((p) => (
              <li key={p.de} className="flex gap-3">
                <span aria-hidden className="text-amber-300/50">
                  ·
                </span>
                {p.de}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* For the fatherless */}
      <section id="vaterlose" className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Für die, die ohne Vater aufwuchsen
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Solide werden, wenn niemand einen rettet
          </h2>

          <div className="mb-12 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-7">
            <p className="text-base italic leading-relaxed text-amber-100/80">
              {forTheFatherless.framing.de}
            </p>
          </div>

          <ul className="space-y-6 text-lg leading-[1.85] text-white/70">
            {forTheFatherless.lines.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 font-mono text-sm text-amber-300/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{line.de}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inheritance chain */}
      <section id="kette" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Die Kette
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Vater → Erbe → Synthese → System → Weitergabe
          </h2>

          <ol className="grid gap-3 sm:grid-cols-5">
            {inheritanceChain.map((node, i) => (
              <li
                key={node.de}
                className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-5 text-center"
              >
                <span className="block font-mono text-xs text-amber-300/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-2 block text-base font-semibold text-white">
                  {node.de}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-center text-base leading-relaxed text-white/55">
            Vater ist die Wurzel. Erbe ist das, was er gab. Synthese ist die Übersetzung in
            eine Sprache, die andere lesen können. System ist die Form, die das Lesbare
            durchhaltbar macht. Weitergabe ist, was bleibt.
          </p>
        </div>
      </section>
    </PapaShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-white/70">{value}</dd>
    </div>
  )
}
