import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  Camera,
  FileText,
  Heart,
  HelpCircle,
  Mail,
  MessageCircle,
  PenLine,
  Send,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mitmachen — Familie Riemer-Gorte',
  description: 'Hilf uns, die Geschichte der Familie Riemer-Gorte zu erforschen und zu bewahren. Teile Erinnerungen, Fotos, Korrekturen oder Forschungsfragen.',
  robots: { index: false, follow: false },
}

const beitragsarten = [
  {
    icon: MessageCircle,
    titel: 'Erinnerung teilen',
    beschreibung: 'Eine Geschichte aus der Familie, ein Erlebnis, eine Anekdote — alles ist wertvoll.',
    farbe: 'text-amber-400 bg-amber-500/10',
  },
  {
    icon: Camera,
    titel: 'Foto oder Dokument',
    beschreibung: 'Alte Fotos, Briefe, Urkunden, Pässe — alles hilft bei der Forschung.',
    farbe: 'text-violet-400 bg-violet-500/10',
  },
  {
    icon: PenLine,
    titel: 'Korrektur oder Ergänzung',
    beschreibung: 'Etwas stimmt nicht? Ein Name, ein Datum, ein Detail? Sag Bescheid.',
    farbe: 'text-emerald-400 bg-emerald-500/10',
  },
  {
    icon: HelpCircle,
    titel: 'Forschungsfrage',
    beschreibung: 'Du möchtest etwas über die Familie wissen? Stell deine Frage — wir forschen zusammen.',
    farbe: 'text-cyan-400 bg-cyan-500/10',
  },
]

const offeneForschung = [
  { frage: 'Wer waren die Eltern von Opa David Gorte?', status: '🔴 Unbekannt' },
  { frage: 'Wer waren die Eltern von Oma Dorothea (geb. Prager)?', status: '🔴 Unbekannt' },
  { frage: 'Wie hießen alle 10 Kinder von David & Dorothea Gorte?', status: '🟡 Teilweise bekannt' },
  { frage: 'Aus welcher Kolonie kamen die Schneiders (Franz & Amalia)?', status: '🔍 In Recherche' },
  { frage: 'Was geschah mit den Reimers zwischen 1798 und 1914?', status: '🔍 In Recherche' },
  { frage: 'Wer waren die Geschwister von Oma Paulina (geb. Schneider)?', status: '🟡 Teilweise bekannt' },
]

export default function MitmachenPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/3 h-[400px] w-[400px] rounded-full bg-rose-500/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-28 sm:pt-32">
          <Link
            href="/familie"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Familie Hub
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <Heart className="h-8 w-8 text-rose-400" />
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Mitmachen
            </h1>
          </div>

          <p className="max-w-2xl font-serif text-lg leading-relaxed text-white/50">
            Diese Geschichte gehört uns allen. Jede Erinnerung, jedes Foto, jede
            Korrektur macht unsere Familiengeschichte vollständiger. Du musst kein
            Experte sein — alles zählt.
          </p>
        </div>
      </section>

      {/* Beitragsarten */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
          Wie du helfen kannst
        </h2>
        <p className="mb-8 font-serif text-2xl font-semibold text-white">
          Vier Wege beizutragen
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {beitragsarten.map((art) => (
            <div
              key={art.titel}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${art.farbe}`}>
                <art.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-serif text-base font-semibold text-white">
                {art.titel}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {art.beschreibung}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kontaktmöglichkeiten */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
          So erreichst du uns
        </h2>
        <p className="mb-8 font-serif text-2xl font-semibold text-white">
          Wähle deinen Weg
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:frank@frankx.ai?subject=Familie%20Riemer-Gorte%20—%20Mitmachen"
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition-all hover:bg-white/[0.04] hover:border-white/[0.12]"
          >
            <Mail className="mx-auto mb-3 h-8 w-8 text-blue-400" />
            <h3 className="mb-1 font-serif text-base font-semibold text-white">
              E-Mail
            </h3>
            <p className="text-xs text-white/40">
              frank@frankx.ai
            </p>
            <p className="mt-2 text-xs text-blue-400/60">
              Für Dokumente, Fotos, längere Texte
            </p>
          </a>

          <a
            href="https://wa.me/message/Familie-Riemer-Gorte"
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition-all hover:bg-white/[0.04] hover:border-white/[0.12]"
          >
            <MessageCircle className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
            <h3 className="mb-1 font-serif text-base font-semibold text-white">
              WhatsApp
            </h3>
            <p className="text-xs text-white/40">
              Familiengruppe
            </p>
            <p className="mt-2 text-xs text-emerald-400/60">
              Schnelle Nachrichten, Sprachnachrichten
            </p>
          </a>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-amber-400" />
            <h3 className="mb-1 font-serif text-base font-semibold text-white">
              Brief an Frank
            </h3>
            <p className="text-xs text-white/40">
              Für Opa & Oma
            </p>
            <p className="mt-2 text-xs text-amber-400/60">
              Frank sammelt und digitalisiert alles
            </p>
          </div>
        </div>
      </section>

      {/* Offene Forschungsfragen */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Offene Forschungsfragen
          </h2>
          <p className="mb-2 font-serif text-2xl font-semibold text-white">
            Kannst du eine davon beantworten?
          </p>
          <p className="mb-8 font-serif text-sm text-white/40">
            Selbst Teilantworten oder Vermutungen helfen uns weiter.
          </p>

          <div className="space-y-3">
            {offeneForschung.map((f) => (
              <div
                key={f.frage}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="mt-0.5 flex-shrink-0 text-sm">{f.status.split(' ')[0]}</span>
                <div className="flex-1">
                  <p className="font-serif text-sm font-medium text-white/80">
                    {f.frage}
                  </p>
                  <p className="mt-0.5 text-xs text-white/30">{f.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ermutigende Nachricht */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-8 text-center">
          <p className="mb-4 font-serif text-2xl font-semibold text-white">
            Jedes Detail zählt.
          </p>
          <p className="mx-auto max-w-lg font-serif text-sm leading-relaxed text-white/50">
            Auch wenn du dir nicht sicher bist — teile es trotzdem. Ein halber
            Name, ein ungefähres Jahr, eine vage Erinnerung — all das hilft uns,
            die Lücken zu füllen. Frank überprüft alles und markiert den
            Forschungsstatus transparent.
          </p>
          <p className="mt-6 font-serif text-xs italic text-white/25">
            &ldquo;Gemeinsam wissen wir mehr als jeder einzelne.&rdquo;
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center">
          <Link
            href="/familie"
            className="inline-flex items-center gap-2 font-serif text-sm text-white/30 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Familie Hub
          </Link>
        </div>
      </section>
    </main>
  )
}
