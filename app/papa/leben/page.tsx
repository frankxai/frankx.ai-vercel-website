import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  PersonWitaliJsonLd,
} from '@/components/papa/SchemaScripts'

export const metadata: Metadata = {
  title: 'Sein Leben — Pavlovka bis Seesen | Papa',
  description:
    'Witali Riemer, geboren 8.9.1969 in Pavlovka Kasachstan, gestorben 9.7.2018 in Seesen Deutschland. Wolgadeutsche Wurzeln, der Spätaussiedler-Bogen und das Leben, das daraus wurde.',
  alternates: {
    canonical: 'https://frankx.ai/papa/leben',
    languages: {
      de: 'https://frankx.ai/papa/leben',
      en: 'https://frankx.ai/papa/en/life',
    },
  },
  openGraph: {
    title: 'Sein Leben — Pavlovka bis Seesen',
    description:
      'Witali Riemer (1969–2018). Wolgadeutsche Wurzeln, Pavlovka, Spätaussiedler, Seesen.',
    url: 'https://frankx.ai/papa/leben',
    type: 'article',
    locale: 'de_DE',
  },
}

export default function LebenPage() {
  return (
    <PapaShell lang="de">
      <PersonWitaliJsonLd />
      <ArticleJsonLd
        title="Sein Leben — Pavlovka bis Seesen"
        description="Witali Riemer, 1969-2018. Wolgadeutsche Wurzeln, der Spätaussiedler-Bogen, Seesen."
        url="https://frankx.ai/papa/leben"
        inLanguage="de"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa' },
          { name: 'Sein Leben', url: 'https://frankx.ai/papa/leben' },
        ]}
      />

      <article className="relative">
        {/* Hero */}
        <header className="border-b border-white/5">
          <div className="mx-auto max-w-2xl px-6 py-32 lg:py-40">
            <Link
              href="/papa"
              className="mb-12 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-amber-300/70"
            >
              <ArrowLeft className="h-3 w-3" />
              Zurück zu Papa
            </Link>

            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
              Sein Leben · 8. September 1969 — 9. Juli 2018
            </p>
            <h1 className="mb-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Pavlovka bis Seesen
            </h1>
            <p className="text-xl italic leading-relaxed text-amber-100/70">
              Achtundvierzig Jahre. Drei Länder. Zwei Sprachen. Eine Linie, die einen
              Volga-Deutschen aus Stalins Kasachstan nach Niedersachsen zurückbrachte — und
              einen Sohn, der nun versucht, ihm das Wort zu geben.
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-2xl px-6 py-24 lg:py-32">
          <div className="space-y-8 text-lg leading-[1.85] text-white/70">
            <Section title="Pavlovka, 1969">
              <p>
                Witali Riemer wurde am 8. September 1969 in Pavlovka geboren — einem Dorf in
                Kasachstan, das es ohne Stalin nicht gegeben hätte. Sein Vater Alexander, seine
                Mutter Paulina (geb. Schneider) gehörten zur deutschen Minderheit, die 1941 von
                der Wolga nach Sibirien und Zentralasien deportiert worden war. Russland war das
                Land, das die Familie nicht gewollt hatte. Kasachstan war das Land, in dem sie
                aufwachsen musste.
              </p>
              <p>
                Wolgadeutsche zu sein bedeutete in dieser Generation: Deutsch zu Hause sprechen,
                Russisch in der Schule, im Pass „Deutsch" stehen haben — und nirgendwo wirklich
                hingehören. Witali erbte beides als Muttersprachen. Er bewegte sich zwischen
                ihnen sein ganzes Leben, so wie sich die Familie zwischen Ländern bewegte.
              </p>
            </Section>

            <figure className="my-8 overflow-hidden rounded-xl border border-white/[0.08]">
              <Image
                src="/images/papa/papa-migration-map.jpg"
                alt="Stilisierte Karte: Saratow an der Wolga (1763) — Pavlovka, Kasachstan (1941, 1969) — Seesen, Deutschland (Spätaussiedler bis 2018). Soul-amber Linien auf dunklem Grund."
                width={1920}
                height={1080}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full"
              />
              <figcaption className="bg-white/[0.02] px-5 py-3 text-xs italic text-white/45">
                Vier Generationen. Drei Länder. Eine Linie.
              </figcaption>
            </figure>

            <Section title="Der Weg zurück">
              <p>
                In den 1970er- und 1980er-Jahren öffnete die Bundesrepublik die Tür für die
                Russlanddeutschen. Spätaussiedler, hieß das Wort. Spät, weil 200 Jahre vorher
                aufgebrochen, vier Generationen lang weg, jetzt erst zurück. Familien wie die
                Riemers stellten Anträge, warteten Jahre, packten Koffer.
              </p>
              <p>
                Wann genau Witali nach Deutschland kam, ist eine Frage für die nächste Version
                dieser Seite — Mama, Opa und Oma haben die Daten und die Geschichten. Was
                gesichert ist: Er kam an, lernte Deutschland kennen, baute ein Leben in Seesen
                im südlichen Niedersachsen, heiratete Dora Gorte (auch Wolgadeutsche, auch
                Spätaussiedler), bekam mich.
              </p>
            </Section>

            <Section title="Seesen">
              <p>
                Seesen ist der Ort, wo die Familie ankam. Wo ich aufwuchs. Wo wir bauten. Wo
                Papa am 9. Juli 2018 starb, mit 48 Jahren. Eine Stadt am Harz, die viele Leute
                nie auf einer Karte suchen, aber für unsere Familie das Ende eines sehr langen
                Bogens war.
              </p>
              <p>
                Was er dort tat — beruflich, privat, was ihn bewegte, was er reparierte, wen er
                lachen ließ — gehört in das Kapitel <em>Erinnerungen</em>. Diese Seite ist die
                Knochenstruktur. Das Fleisch wächst, wenn die Familie schreibt.
              </p>
            </Section>

            <Section title="Was bleibt">
              <p>
                Was bleibt ist nicht nur ein Mann. Es ist eine Linie: vier Generationen die zur
                falschen Zeit am falschen Ort waren, vier Generationen die nicht aufgegeben
                haben, ein Großvater und eine Großmutter die noch leben und Geschichten haben,
                eine Mutter die immer noch in Deutschland ist, ein Sohn der jetzt in Amsterdam
                schreibt, und ein Vater den ich versuche festzuhalten, bevor das was nicht
                aufgeschrieben wurde verloren geht.
              </p>
            </Section>
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-white/5 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/papa/erinnerungen"
              className="group inline-flex items-center gap-2 text-sm text-amber-300/80 transition-colors hover:text-amber-200"
            >
              Weiter zu den Erinnerungen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/papa/mitmachen"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Erinnerung teilen →
            </Link>
          </div>
        </div>
      </article>
    </PapaShell>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
