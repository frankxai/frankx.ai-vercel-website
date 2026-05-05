import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import {
  BreadcrumbJsonLd,
  PersonWitaliJsonLd,
} from '@/components/papa/SchemaScripts'
import { russianHeritage } from '@/data/papa'

export const metadata: Metadata = {
  title: 'Папа — Виталий Ример (1969–2018)',
  description:
    'Страница признаёт русские корни Виталия Ример — поволжского немца из Павловки, Казахстан. Полный архив на немецком и английском языках.',
  alternates: {
    canonical: 'https://frankx.ai/papa/ru',
    languages: {
      de: 'https://frankx.ai/papa',
      en: 'https://frankx.ai/papa/en',
      ru: 'https://frankx.ai/papa/ru',
    },
  },
  openGraph: {
    title: 'Папа — Виталий Ример',
    description: 'Страница признаёт русские корни.',
    url: 'https://frankx.ai/papa/ru',
    type: 'profile',
    locale: 'ru_RU',
  },
}

export default function RuPage() {
  return (
    <PapaShell lang="ru">
      <PersonWitaliJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Папа', url: 'https://frankx.ai/papa/ru' },
        ]}
      />

      <article>
        <header className="border-b border-white/5">
          <div className="mx-auto max-w-2xl px-6 py-32 lg:py-40 text-center">
            <Link
              href="/papa"
              className="mb-12 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-amber-300/70"
            >
              <ArrowLeft className="h-3 w-3" />
              Auf Deutsch · In English
            </Link>

            <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
              Виталий Ример · 1969 – 2018
            </p>
            <h1 className="mb-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {russianHeritage.title}
            </h1>
            <p className="mb-10 text-xl italic leading-relaxed text-amber-100/70">
              {russianHeritage.subtitle}
            </p>

            <div className="mx-auto inline-flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-5 text-sm leading-relaxed text-white/55">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-300/50" />
                <span>Павловка, Казахстан · 8 сентября 1969</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-300/50" />
                <span>Зезен, Германия · 9 июля 2018</span>
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-24">
          <p className="mb-8 text-lg leading-[1.85] text-white/75">
            {russianHeritage.lead}
          </p>

          <figure className="mb-12 overflow-hidden rounded-xl border border-white/[0.08]">
            <Image
              src="/images/papa/papa-migration-map.jpg"
              alt="Стилизованная карта: Саратов на Волге (1763) — Павловка, Казахстан (1941, 1969) — Зезен, Германия (поздние переселенцы до 2018)."
              width={1920}
              height={1080}
              sizes="(max-width: 768px) 100vw, 720px"
              className="h-auto w-full"
            />
            <figcaption className="bg-white/[0.02] px-5 py-3 text-xs italic text-white/45">
              Четыре поколения. Три страны. Одна линия.
            </figcaption>
          </figure>

          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-8 text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
              Hinweis · Note
            </p>
            <p className="text-base leading-relaxed text-amber-100/75">
              Diese Seite ist eine Geste der Anerkennung. Der vollständige Inhalt lebt auf
              Deutsch (Muttersprache der Familie) und Englisch (für die weitere Welt).
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              This page is a gesture of acknowledgment. The full content lives in German (the
              family's native language) and English (for the wider world).
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/papa"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm text-white/75 transition-all hover:bg-white/10"
            >
              Auf Deutsch lesen
            </Link>
            <Link
              href="/papa/en"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm text-white/75 transition-all hover:bg-white/10"
            >
              Read in English
            </Link>
          </div>

          <p className="mt-16 text-center text-xs text-white/30">
            {russianHeritage.attribution}
          </p>
        </div>
      </article>
    </PapaShell>
  )
}
