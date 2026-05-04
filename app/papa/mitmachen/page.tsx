import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageCircle, PenLine } from 'lucide-react'

import PapaShell from '@/components/papa/PapaShell'
import { BreadcrumbJsonLd } from '@/components/papa/SchemaScripts'

export const metadata: Metadata = {
  title: 'Mitmachen — Eine Erinnerung teilen | Papa',
  description:
    'So könnt ihr eine Erinnerung an Papa mit mir teilen. Per WhatsApp, E-Mail oder Brief.',
  robots: { index: false, follow: false },
}

export default function MitmachenPage() {
  return (
    <PapaShell lang="de">
      <BreadcrumbJsonLd
        items={[
          { name: 'Frankx', url: 'https://frankx.ai/' },
          { name: 'Papa', url: 'https://frankx.ai/papa' },
          { name: 'Mitmachen', url: 'https://frankx.ai/papa/mitmachen' },
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
              Mitmachen · Familienarchiv
            </p>
            <h1 className="mb-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Eine Erinnerung teilen
            </h1>
            <p className="text-xl italic leading-relaxed text-amber-100/70">
              Es gibt kein Formular und keine Pflicht. Schreibt mir, wie es euch leichtfällt —
              ich sammle alles und bewahre es hier auf.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-24">
          <div className="space-y-6">
            <Step n={1} title="Schreibt es auf — oder sprecht es ein.">
              Ein Absatz reicht. Eine Sprachnachricht reicht. Ein handgeschriebener Brief
              reicht. Es muss nicht poliert sein. Roh ist besser.
            </Step>
            <Step n={2} title="Schickt es per WhatsApp, E-Mail oder Brief.">
              Wer meine Nummer hat, schreibt direkt auf WhatsApp. Wer lieber schreibt, schickt
              eine E-Mail. Wer den alten Weg liebt, schickt einen Brief.
            </Step>
            <Step n={3} title="Ich kuratiere. Ihr entscheidet, was öffentlich wird.">
              Jede Erinnerung kommt in das Archiv unter <code>/papa/erinnerungen/</code>.
              Bei jeder frage ich: möchtet ihr namentlich, anonym, oder nur intern in der
              Familie? Default ist anonym, bis ihr anders sagt.
            </Step>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:frank@frankx.ai?subject=Erinnerung%20an%20Papa"
              className="group flex flex-col rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-6 transition-all hover:bg-amber-500/[0.1]"
            >
              <Mail className="mb-3 h-5 w-5 text-amber-300/80" />
              <h3 className="mb-1 text-base font-semibold text-white">E-Mail</h3>
              <p className="text-sm text-amber-100/70">frank@frankx.ai</p>
              <p className="mt-2 text-xs text-white/40">Beliebig lang. Anhänge willkommen.</p>
            </a>
            <div className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
              <MessageCircle className="mb-3 h-5 w-5 text-white/60" />
              <h3 className="mb-1 text-base font-semibold text-white">WhatsApp</h3>
              <p className="text-sm text-white/55">An die Nummer, die ihr von mir habt.</p>
              <p className="mt-2 text-xs text-white/40">
                Sprachnachrichten besonders willkommen.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
            <PenLine className="mx-auto mb-4 h-6 w-6 text-amber-300/60" />
            <p className="mx-auto max-w-md text-sm leading-relaxed text-white/60">
              Wenn ihr nicht wisst, wo anfangen — die <Link
                href="/papa/erinnerungen"
                className="text-amber-300/80 underline-offset-4 hover:underline"
              >
                Erinnerungs-Seite
              </Link>{' '}
              hat acht Fragen, die helfen können.
            </p>
          </div>
        </div>
      </article>
    </PapaShell>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-sm text-amber-300">
        {n}
      </span>
      <div>
        <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/65">{children}</p>
      </div>
    </div>
  )
}
