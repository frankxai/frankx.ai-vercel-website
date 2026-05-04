import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageCircle, Mail } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import { BreadcrumbJsonLd } from '@/components/papa/SchemaScripts'

export const metadata: Metadata = {
  title: 'Erinnerungen | Papa',
  description: 'Geschichten, die die Familie über Witali Riemer teilt.',
  robots: { index: false, follow: false },
}

export default function ErinnerungenPage() {
  return (
    <PapaShell lang="de">
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa' },
          { name: 'Erinnerungen', url: 'https://frankx.ai/papa/erinnerungen' },
        ]}
      />

      <article className="relative">
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
              Erinnerungen · Familienarchiv
            </p>
            <h1 className="mb-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Was die Familie erzählt
            </h1>
            <p className="text-xl italic leading-relaxed text-amber-100/70">
              Dieses Kapitel wächst, wenn die Familie schreibt. Mama, Opa Alexander, Oma
              Paulina, Cousinen, Freunde — was war ein Moment, an dem du Papa wirklich
              erkanntest?
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-24">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
            <Heart className="mx-auto mb-5 h-7 w-7 text-amber-300/60" />
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Noch leer — und das ist OK
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/55">
              Diese Seite startet leer, weil sie nicht von mir kommt. Sie kommt von euch. Jede
              Erinnerung, die ihr mit mir teilt, lege ich hier ab — mit eurem Namen, oder
              anonym, wie ihr wollt.
            </p>
            <Link
              href="/papa/mitmachen"
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/15 px-6 py-2.5 text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/25"
            >
              <MessageCircle className="h-4 w-4" />
              Eine Erinnerung teilen
            </Link>
          </div>

          {/* Suggested prompts to seed memory submissions */}
          <div className="mt-16">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
              Falls ihr nicht wisst, wo anfangen
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Wann hast du Papa zum ersten Mal getroffen?',
                'Was war ein Moment, in dem er dir geholfen hat?',
                'Worüber hat er gelacht?',
                'Was hat er ohne Worte beigebracht?',
                'Was hat er gemacht, wenn jemand traurig war?',
                'Welche Eigenschaft fällt dir als erste ein?',
                'Was war seine Art, „Ich liebe dich" zu sagen?',
                'Wann warst du stolz auf ihn?',
              ].map((q) => (
                <li
                  key={q}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-relaxed text-white/65"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:frank@frankx.ai?subject=Eine%20Erinnerung%20an%20Papa"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition-all hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              E-Mail an Frank
            </a>
          </div>
        </div>
      </article>
    </PapaShell>
  )
}
