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
  title: 'The inheritance — What my father gave me | Papa',
  description:
    'Ten principles, six ways to become solid, discipline codes, backbone, responsibility. A living draft of what Witali Riemer passed on, translated into a language others can read.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://frankx.ai/papa/en/inheritance',
    languages: {
      de: 'https://frankx.ai/papa/erbe',
      en: 'https://frankx.ai/papa/en/inheritance',
    },
  },
}

const sections = [
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'principles', label: 'Principles' },
  { id: 'stages', label: 'Stages' },
  { id: 'discipline', label: 'Discipline' },
  { id: 'backbone', label: 'Backbone' },
  { id: 'responsibility', label: 'Responsibility' },
  { id: 'work', label: 'Work' },
  { id: 'fatherless', label: 'Fatherless' },
  { id: 'chain', label: 'Chain' },
]

export default function InheritancePage() {
  return (
    <PapaShell lang="en" draft>
      <PersonWitaliJsonLd />
      <ArticleJsonLd
        title="The inheritance — What my father gave me"
        description="Ten principles, six stages, discipline codes, backbone. Living draft."
        url="https://frankx.ai/papa/en/inheritance"
        inLanguage="en"
        draft
      />
      <BookScaffoldJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa/en' },
          { name: 'The inheritance', url: 'https://frankx.ai/papa/en/inheritance' },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 pt-16">
        <Link
          href="/papa/en"
          className="inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-amber-300/70"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Papa
        </Link>
      </div>

      <nav
        aria-label="Table of contents"
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
      <section id="manifesto" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32 lg:py-40">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Manifesto
          </p>
          <h1 className="mb-12 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            The inheritance
          </h1>
          <div className="space-y-6 whitespace-pre-line text-lg leading-[1.85] text-white/70">
            {manifesto.en}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Ten principles
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What he embodied
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-white/50">
            First draft, read from his habits and decisions. Each will be refined with family
            stories.
          </p>

          <ol className="space-y-10">
            {principles.map((p) => (
              <li key={p.number} className="flex gap-6">
                <span className="flex-shrink-0 font-mono text-2xl font-light text-amber-300/40">
                  {String(p.number).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-white">{p.title.en}</h3>
                  <p className="mb-3 text-base leading-relaxed text-white/65">
                    {p.elaboration.en}
                  </p>
                  <p className="border-l-2 border-amber-500/30 pl-4 text-sm italic text-amber-100/65">
                    {p.application.en}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stages */}
      <section id="stages" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Six stages
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Becoming solid
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-white/50">
            From the boy who waits to be rescued, to the elder who hands over without claim.
            Six stations — each with its quality, its danger, its passage.
          </p>

          <ol className="space-y-8">
            {stages.map((s) => (
              <li
                key={s.number}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7"
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-mono text-sm text-amber-300/50">Stage {s.number}</span>
                  <h3 className="text-xl font-semibold text-white">{s.name.en}</h3>
                </div>
                <dl className="grid gap-4 sm:grid-cols-3">
                  <Stat label="Quality" value={s.qualities.en} />
                  <Stat label="Danger" value={s.danger.en} />
                  <Stat label="Passage" value={s.passage.en} />
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Discipline */}
      <section
        id="discipline"
        className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Discipline codes
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How to become solid when nobody is watching
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {disciplineCodes.map((c) => (
              <li
                key={c.en}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 text-base leading-relaxed text-white/70"
              >
                {c.en}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Backbone */}
      <section id="backbone" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Emotional backbone
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Depth without breaking
          </h2>
          <p className="mb-10 border-l-2 border-amber-500/40 pl-6 text-xl italic leading-relaxed text-amber-100/75">
            {backbone.headline.en}
          </p>
          <ul className="space-y-3 text-lg leading-relaxed text-white/70">
            {backbone.pillars.map((pillar) => (
              <li key={pillar.en} className="flex gap-3">
                <span aria-hidden className="text-amber-300/50">·</span>
                {pillar.en}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Responsibility */}
      <section
        id="responsibility"
        className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Responsibility
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What being adult actually means
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/65">
            Responsibility is not oppression when it is chosen. It is the form in which a
            person becomes real.
          </p>
          <ul className="space-y-3">
            {responsibilityModels.map((m) => (
              <li key={m.en} className="text-base leading-relaxed text-white/70">
                <span aria-hidden className="mr-3 text-amber-300/50">·</span>
                {m.en}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work / Money / Dignity */}
      <section id="work" className="scroll-mt-24 border-b border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Work · Money · Dignity
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Money is stored responsibility
          </h2>
          <p className="mb-10 border-l-2 border-amber-500/40 pl-6 text-xl italic leading-relaxed text-amber-100/75">
            {workMoneyDignity.headline.en}
          </p>
          <ul className="space-y-3 text-lg leading-relaxed text-white/70">
            {workMoneyDignity.principles.map((p) => (
              <li key={p.en} className="flex gap-3">
                <span aria-hidden className="text-amber-300/50">·</span>
                {p.en}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* For the fatherless */}
      <section
        id="fatherless"
        className="scroll-mt-24 border-b border-white/5 bg-white/[0.01]"
      >
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            For those who grew up without a father
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Becoming solid when nobody saves you
          </h2>

          <div className="mb-12 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-7">
            <p className="text-base italic leading-relaxed text-amber-100/80">
              {forTheFatherless.framing.en}
            </p>
          </div>

          <ul className="space-y-6 text-lg leading-[1.85] text-white/70">
            {forTheFatherless.lines.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 font-mono text-sm text-amber-300/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{line.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inheritance chain */}
      <section id="chain" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            The chain
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Father → Inheritance → Synthesis → System → Transmission
          </h2>

          <ol className="grid gap-3 sm:grid-cols-5">
            {inheritanceChain.map((node, i) => (
              <li
                key={node.en}
                className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-5 text-center"
              >
                <span className="block font-mono text-xs text-amber-300/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-2 block text-base font-semibold text-white">
                  {node.en}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-center text-base leading-relaxed text-white/55">
            Father is the root. Inheritance is what he gave. Synthesis is the translation into
            a language others can read. System is the form that makes the readable durable.
            Transmission is what remains.
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
