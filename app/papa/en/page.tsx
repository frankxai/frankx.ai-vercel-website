import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, MapPin, ScrollText } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import {
  BreadcrumbJsonLd,
  PersonWitaliJsonLd,
} from '@/components/papa/SchemaScripts'

export const metadata: Metadata = {
  title: 'Papa — Witali Riemer (1969–2018) · English',
  description:
    "A son's archive for Witali Riemer. Volga German roots, Pavlovka to Seesen, and the inheritance he passed on — in German, English, and Russian.",
  alternates: {
    canonical: 'https://frankx.ai/papa/en',
    languages: {
      de: 'https://frankx.ai/papa',
      en: 'https://frankx.ai/papa/en',
      ru: 'https://frankx.ai/papa/ru',
    },
  },
  openGraph: {
    title: 'Papa — Witali Riemer (1969–2018)',
    description: "A son's archive for Witali Riemer.",
    url: 'https://frankx.ai/papa/en',
    type: 'profile',
    locale: 'en_US',
  },
}

export default function PapaEnHomePage() {
  return (
    <PapaShell lang="en">
      <PersonWitaliJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa/en' },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-transparent to-transparent" />
          <div className="absolute left-1/3 top-24 h-[420px] w-[420px] rounded-full bg-amber-500/[0.07] blur-3xl" />
          <div className="absolute right-1/4 top-48 h-[320px] w-[320px] rounded-full bg-amber-700/[0.05] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center lg:py-40">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Witali Riemer · 1969 – 2018
          </p>
          <h1 className="mb-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Papa
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-xl italic leading-relaxed text-amber-100/70">
            What my father gave me — and what I am allowed to pass on.
          </p>

          <div className="mx-auto mb-12 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-5 text-sm leading-relaxed text-white/55">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-300/50" />
              <span>
                Born <strong className="font-medium text-white/75">8 September 1969</strong> in
                Pavlovka, Kazakhstan
              </span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-300/50" />
              <span>
                Died <strong className="font-medium text-white/75">9 July 2018</strong> in
                Seesen, Germany
              </span>
            </p>
          </div>

          <Link
            href="/papa/en/life"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-amber-100"
          >
            Read what was
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Essence */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            What this is
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A living archive. Not a monument.
          </h2>
          <div className="space-y-6 text-lg leading-[1.85] text-white/65">
            <p>
              This is for my family — for Mama, for Opa Alexander and Oma Paulina, for the
              cousins and relatives who loved him, for everyone who felt his strength but never
              fully understood the principles behind it.
            </p>
            <p>
              It is also for those who grew up without a father's voice. Some inherit money.
              Some inherit property. Some inherit a father's voice inside them. This project is
              for those who did not.
            </p>
            <p className="border-l-2 border-amber-500/40 pl-6 text-base italic text-amber-100/75">
              Not to turn one man into an idol. But to extract the gold. To remember what was
              good. To name what was strong. To forgive what was human. To transmit what must
              not be lost.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Find your way
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white">
            Three rooms, one story
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <NavCard
              href="/papa/en/life"
              icon={MapPin}
              eyebrow="Public"
              title="His life"
              description="Pavlovka 1969 to Seesen 2018. Volga-German roots and the arc that brought him to Germany and me to Amsterdam."
            />
            <NavCard
              href="/papa/en/inheritance"
              icon={ScrollText}
              eyebrow="Draft"
              title="The inheritance"
              description="Ten principles, six ways to become solid, discipline codes, backbone. What he gave me, translated into a language others can read."
            />
            <NavCard
              href="/papa"
              icon={Heart}
              eyebrow="Original"
              title="Auf Deutsch"
              description="The full hub in German — including the family-only memories archive at /papa/erinnerungen/."
            />
          </div>
        </div>
      </section>
    </PapaShell>
  )
}

function NavCard({
  href,
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all hover:border-amber-500/25 hover:bg-amber-500/[0.04]"
    >
      <Icon className="mb-5 h-5 w-5 text-amber-300/60 transition-colors group-hover:text-amber-300/90" />
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
        {eyebrow}
      </p>
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/55">{description}</p>
      <ArrowRight className="mt-6 h-4 w-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-amber-300/70" />
    </Link>
  )
}
