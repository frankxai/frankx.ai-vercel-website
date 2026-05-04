import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  PersonWitaliJsonLd,
} from '@/components/papa/SchemaScripts'

export const metadata: Metadata = {
  title: 'His life — Pavlovka to Seesen | Papa',
  description:
    'Witali Riemer, born 8 Sept 1969 in Pavlovka, Kazakhstan, died 9 July 2018 in Seesen, Germany. Volga-German roots, the Spätaussiedler arc, and the life that grew from it.',
  alternates: {
    canonical: 'https://frankx.ai/papa/en/life',
    languages: {
      de: 'https://frankx.ai/papa/leben',
      en: 'https://frankx.ai/papa/en/life',
    },
  },
  openGraph: {
    title: 'His life — Pavlovka to Seesen',
    description: 'Witali Riemer (1969-2018). Volga-German roots, Pavlovka, Spätaussiedler, Seesen.',
    url: 'https://frankx.ai/papa/en/life',
    type: 'article',
    locale: 'en_US',
  },
}

export default function LifePage() {
  return (
    <PapaShell lang="en">
      <PersonWitaliJsonLd />
      <ArticleJsonLd
        title="His life — Pavlovka to Seesen"
        description="Witali Riemer (1969-2018). Volga-German roots, Pavlovka, Spätaussiedler, Seesen."
        url="https://frankx.ai/papa/en/life"
        inLanguage="en"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa/en' },
          { name: 'His life', url: 'https://frankx.ai/papa/en/life' },
        ]}
      />

      <article className="relative">
        <header className="border-b border-white/5">
          <div className="mx-auto max-w-2xl px-6 py-32 lg:py-40">
            <Link
              href="/papa/en"
              className="mb-12 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-amber-300/70"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Papa
            </Link>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-300/60">
              His life · 8 September 1969 — 9 July 2018
            </p>
            <h1 className="mb-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Pavlovka to Seesen
            </h1>
            <p className="text-xl italic leading-relaxed text-amber-100/70">
              Forty-eight years. Three countries. Two languages. A line that brought a Volga
              German out of Stalin's Kazakhstan back to Lower Saxony — and a son who is now
              trying to give him the words.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-24 lg:py-32">
          <div className="space-y-8 text-lg leading-[1.85] text-white/70">
            <Section title="Pavlovka, 1969">
              <p>
                Witali Riemer was born on 8 September 1969 in Pavlovka — a village in
                Kazakhstan that would not have existed without Stalin. His father Alexander and
                his mother Paulina (née Schneider) were part of the German minority that had
                been deported from the Volga to Siberia and Central Asia in 1941. Russia was
                the country that had not wanted them. Kazakhstan was the country in which they
                had to grow up.
              </p>
              <p>
                Being a Volga German in this generation meant: speaking German at home, Russian
                at school, having "Deutsch" written in your passport — and belonging nowhere
                fully. Witali inherited both as native languages. He moved between them his
                whole life, the way the family moved between countries.
              </p>
            </Section>

            <Section title="The way back">
              <p>
                In the 1970s and 1980s, the Federal Republic of Germany opened the door to the
                Russian Germans. <em>Spätaussiedler</em>, the word was. Late, because the
                ancestors had left 200 years before, four generations gone, and only now
                returning. Families like the Riemers filed applications, waited years, packed
                suitcases.
              </p>
              <p>
                Exactly when Witali came to Germany is a question for the next version of this
                page — Mama, Opa and Oma have the dates and the stories. What is certain: he
                arrived, learned Germany, built a life in Seesen in southern Lower Saxony,
                married Dora Gorte (also Volga German, also Spätaussiedler), had me.
              </p>
            </Section>

            <Section title="Seesen">
              <p>
                Seesen is where the family arrived. Where I grew up. Where we built. Where Papa
                died on 9 July 2018, at 48 years old. A small town on the edge of the Harz
                mountains that most people never look up on a map, but for our family the end
                of a very long arc.
              </p>
              <p>
                What he did there — for work, in private, what moved him, what he repaired,
                whom he made laugh — belongs in the <em>Memories</em> chapter. This page is the
                bone structure. The flesh grows when family writes.
              </p>
            </Section>

            <Section title="What remains">
              <p>
                What remains is not only a man. It is a line: four generations who were in the
                wrong place at the wrong time, four generations who did not give up, a
                grandfather and a grandmother who are still living and still hold stories, a
                mother who is still in Germany, a son who is now writing in Amsterdam, and a
                father whom I am trying to hold on to before whatever was not written down is
                lost.
              </p>
            </Section>
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-white/5 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/papa/en/inheritance"
              className="group inline-flex items-center gap-2 text-sm text-amber-300/80 transition-colors hover:text-amber-200"
            >
              On to the inheritance
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/papa"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Auf Deutsch lesen →
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
