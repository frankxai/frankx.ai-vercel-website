import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, MapPin } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import {
  BreadcrumbJsonLd,
  PersonWitaliJsonLd,
} from '@/components/papa/SchemaScripts'
import { witali } from '@/data/papa'

export const metadata: Metadata = {
  title: 'Papa — Witali Riemer (1969–2018)',
  description:
    'Ein Sohn-Archiv für Witali Riemer. Wolgadeutsche Wurzeln, Pavlovka bis Seesen, und das Erbe, das er weitergegeben hat — auf Deutsch, Englisch, und Russisch.',
  alternates: {
    canonical: 'https://frankx.ai/papa',
    languages: {
      de: 'https://frankx.ai/papa',
      en: 'https://frankx.ai/papa/en',
    },
  },
  openGraph: {
    title: 'Papa — Witali Riemer (1969–2018)',
    description:
      'Ein Sohn-Archiv für Witali Riemer und das Erbe, das er weitergegeben hat.',
    url: 'https://frankx.ai/papa',
    type: 'profile',
    locale: 'de_DE',
  },
}

export default function PapaHomePage() {
  return (
    <PapaShell lang="de">
      <PersonWitaliJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Familie', url: 'https://frankx.ai/familie' },
          { name: 'Papa', url: 'https://frankx.ai/papa' },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/papa/papa-hero-birch.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/60 via-[#0a0a0b]/80 to-[#0a0a0b]" />
          <div className="absolute left-1/3 top-24 h-[420px] w-[420px] rounded-full bg-amber-500/[0.05] blur-3xl" />
          <div className="absolute right-1/4 top-48 h-[320px] w-[320px] rounded-full bg-amber-700/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center lg:py-40">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Witali Riemer · 1969 – 2018
          </p>

          <h1 className="mb-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Papa
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-xl italic leading-relaxed text-amber-100/70">
            Was mir mein Vater gab — und was ich weitergeben darf.
          </p>

          <div className="mx-auto mb-12 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-5 text-sm leading-relaxed text-white/55">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-300/50" />
              <span>
                Geboren <strong className="font-medium text-white/75">8. September 1969</strong>{' '}
                in Pavlovka, Kasachstan
              </span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-300/50" />
              <span>
                Gestorben <strong className="font-medium text-white/75">9. Juli 2018</strong> in
                Seesen, Deutschland
              </span>
            </p>
          </div>

          <Link
            href="/papa/leben"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-amber-100"
          >
            Lies, was war
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Essence panel */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-32">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Worum es hier geht
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ein lebendiges Archiv. Kein Denkmal.
          </h2>
          <div className="space-y-6 text-lg leading-[1.85] text-white/65">
            <p>
              Diese Seite ist für meine Familie — für Mama, für Opa Alexander und Oma Paulina,
              für meine Cousinen und Verwandten, die ihn liebten, und für alle, die seine Stärke
              spürten, ohne die Prinzipien dahinter je ganz zu verstehen.
            </p>
            <p>
              Sie ist auch für die, die ohne die Stimme eines Vaters aufgewachsen sind. Manche
              erben Geld. Manche erben Eigentum. Manche erben die Stimme eines Vaters in sich.
              Dieses Projekt ist für die, die es nicht taten.
            </p>
            <p className="border-l-2 border-amber-500/40 pl-6 text-base italic text-amber-100/75">
              Nicht, um einen Mann zum Idol zu machen. Sondern, um das Gold herauszuziehen. Zu
              erinnern, was gut war. Zu benennen, was stark war. Zu vergeben, was menschlich war.
              Weiterzugeben, was nicht verloren gehen darf.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
            Hier entlang
          </p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white">
            Drei Räume, eine Geschichte
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <NavCard
              href="/papa/leben"
              icon={MapPin}
              eyebrow="Öffentlich"
              title="Sein Leben"
              description="Pavlovka 1969 bis Seesen 2018. Wolgadeutsche Wurzeln und der Bogen, der ihn nach Deutschland und mich nach Amsterdam brachte."
            />
            <NavCard
              href="/papa/erinnerungen"
              icon={Heart}
              eyebrow="Privat"
              title="Erinnerungen"
              description="Geschichten, die die Familie über ihn teilt. Von Mama, von Opa und Oma, von Cousinen und Freunden. Wachsendes Archiv."
            />
            <NavCard
              href="/papa/mitmachen"
              icon={BookOpen}
              eyebrow="Mitmachen"
              title="Eine Erinnerung teilen"
              description="Schreib mir per WhatsApp, E-Mail oder Brief. Ich sammle alles und bewahre es hier für die ganze Familie auf."
            />
          </div>
        </div>
      </section>

      {/* Family-line attribution chip */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/[0.06] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/70">
            Familie Riemer · Papas Seite
          </span>
          <p className="mt-6 text-sm leading-relaxed text-white/45">
            Sohn von Alexander Riemer und Paulina Riemer (geb. Schneider). Ehemann von Dora
            Riemer (geb. Gorte). Vater von Frank.
          </p>
          <Link
            href="/familie/stammbaum"
            className="mt-6 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-amber-300/70"
          >
            Stammbaum ansehen
            <ArrowRight className="h-3 w-3" />
          </Link>
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
