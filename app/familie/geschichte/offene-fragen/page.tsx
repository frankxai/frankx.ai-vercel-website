import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  FileQuestion,
  HelpCircle,
  Info,
  MapPin,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Private offene Forschungsfragen',
  description: 'Jede unbeantwortete Frage, was sie beantworten würde, und wer sie stellen kann. Ein transparentes Forschungsprotokoll.',
  robots: { index: false, follow: false, nocache: true },
}

type Status = 'offen' | 'in-arbeit' | 'beantwortet' | 'blockiert'

const statusConfig: Record<Status, { label: string; icon: string; farbe: string }> = {
  offen: { label: 'Offen', icon: '🔴', farbe: 'text-red-400 bg-red-500/10 border-red-500/20' },
  'in-arbeit': { label: 'In Arbeit', icon: '🔍', farbe: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  beantwortet: { label: 'Beantwortet', icon: '🟢', farbe: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  blockiert: { label: 'Wartet auf Interview', icon: '🟡', farbe: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
}

interface Frage {
  id: string
  frage: string
  linie: 'Riemer' | 'Gorte' | 'Schneider' | 'Prager' | 'Allgemein'
  status: Status
  priorität: 1 | 2 | 3 // 1 = highest
  aktuellerStand: string
  wasEsBeantworten: string
  werEsKannBeantworten: string
}

const fragen: Frage[] = [
  // ── Gorte-Linie ────────────────────────────────────────────────────────────
  {
    id: 'gorte-01',
    frage: 'Wer waren die Eltern von Opa David Gorte?',
    linie: 'Gorte',
    status: 'blockiert',
    priorität: 1,
    aktuellerStand: 'Völlig unbekannt. Keine Namen, keine Orte, keine Lebensdaten im Familiengedächtnis festgehalten.',
    wasEsBeantworten: 'Namen + Geburtsjahre + Herkunftsort der Eltern. Das öffnet die gesamte Gorte-Linie vor Generation 0.',
    werEsKannBeantworten: 'Opa David selbst. Zweitbeste Quelle: seine noch lebenden Geschwister, falls erreichbar.',
  },
  {
    id: 'gorte-02',
    frage: 'Wie heißen alle zehn Kinder von David und Dorothea Gorte?',
    linie: 'Gorte',
    status: 'blockiert',
    priorität: 1,
    aktuellerStand: 'Eine Tochter (Dora, Franks Mutter) bekannt. Neun Geschwister teilweise oder gar nicht namentlich erfasst.',
    wasEsBeantworten: 'Jeder Geschwister ist ein lebender Zeuge derselben Ursprungsfamilie. Zehnfache Quellenbasis für Gorte-Forschung.',
    werEsKannBeantworten: 'Opa David, Oma Dorothea, Mama Dora — am besten gemeinsam.',
  },
  {
    id: 'gorte-03',
    frage: 'Wer waren die Eltern von Oma Dorothea (geb. Prager)?',
    linie: 'Prager',
    status: 'blockiert',
    priorität: 1,
    aktuellerStand: 'Geburtsname Prager bekannt. Eltern: unbekannt. Herkunftsort: unbekannt.',
    wasEsBeantworten: 'Öffnet die komplette Prager-Linie. Der Name könnte Hinweise auf böhmische oder sudetendeutsche Herkunft geben.',
    werEsKannBeantworten: 'Oma Dorothea selbst. Mögliche Geschwister oder Cousins der Prager-Seite.',
  },

  // ── Riemer-Linie ───────────────────────────────────────────────────────────
  {
    id: 'riemer-01',
    frage: 'Wer waren die Eltern von Christian Riemer (1914)?',
    linie: 'Riemer',
    status: 'blockiert',
    priorität: 1,
    aktuellerStand: 'Christian Riemer ist der älteste namentlich bekannte Vorfahre. Seine Eltern sind komplett unbekannt.',
    wasEsBeantworten: 'Eröffnet die Recherche für die Zeit vor 1914 in Karaganda oder in der Ursprungs-Kolonie.',
    werEsKannBeantworten: 'Opa Alexander (Christians Sohn) — höchste Priorität für ein Interview. Zweite Quelle: Staatsarchiv Karaganda (GAKO) über Sondersiedler-Akten.',
  },
  {
    id: 'riemer-02',
    frage: 'Aus welcher Wolga-Kolonie stammt die Riemer-Familie?',
    linie: 'Riemer',
    status: 'offen',
    priorität: 2,
    aktuellerStand: 'Hypothesen: Reinwald, Katharinenstadt, Orlovsky. Alle drei haben historisch dokumentierte Reimer/Riemer-Familien. Keine ist für unsere Linie bewiesen.',
    wasEsBeantworten: 'Die 116-Jahre-Lücke zwischen 1798 und 1914 kann nur geschlossen werden, wenn wir die Ursprungskolonie kennen. Dann werden die richtigen Kirchenbücher durchsuchbar.',
    werEsKannBeantworten: 'Indirekt: Sondersiedler-Akten des GAKO Karaganda enthalten oft Herkunftsangaben. Direkt: Opa Alexander, falls Christian das erzählt hat.',
  },
  {
    id: 'riemer-03',
    frage: 'Wann kam die Riemer-Familie nach Karaganda?',
    linie: 'Riemer',
    status: 'offen',
    priorität: 2,
    aktuellerStand: 'Vor 1914 offensichtlich (Christian wurde dort geboren). Wann genau, wie viele Generationen vorher, unter welchen Umständen — alles offen.',
    wasEsBeantworten: 'Verortet die Familie in einer historischen Epoche: freiwillige Migration (1900er), Deportation einer früheren Generation, Flucht?',
    werEsKannBeantworten: 'Volkszählungsakten Kasachstan. Kirchenbücher Karaganda. GAKO-Archiv.',
  },
  {
    id: 'riemer-04',
    frage: 'Was genau geschah mit Christian in der Trudarmee?',
    linie: 'Riemer',
    status: 'blockiert',
    priorität: 3,
    aktuellerStand: 'Überlieferung: er wurde eingezogen und überlebte. Mehr nicht.',
    wasEsBeantworten: 'Einsatzort, Dauer, Bedingungen. Kontext für die Generation danach.',
    werEsKannBeantworten: 'Opa Alexander (direkte Erinnerung). GAKO-Akten. Memorial International.',
  },
  {
    id: 'riemer-05',
    frage: 'Hatte Christian Geschwister?',
    linie: 'Riemer',
    status: 'offen',
    priorität: 2,
    aktuellerStand: 'Unbekannt.',
    wasEsBeantworten: 'Möglicherweise weitere Nachfahren — erweiterte Familie, Cousins in anderen Linien.',
    werEsKannBeantworten: 'Opa Alexander. GAKO-Akten.',
  },

  // ── Schneider-Linie ────────────────────────────────────────────────────────
  {
    id: 'schneider-01',
    frage: 'Aus welcher Kolonie kamen Franz und Amalia Schneider?',
    linie: 'Schneider',
    status: 'offen',
    priorität: 2,
    aktuellerStand: 'Schneider-Familien existierten in vielen wolgadeutschen Kolonien (Moor, Beauregard, Straub, Herbstein-Herkunft). Unsere Schneiders: unbekannte Kolonie.',
    wasEsBeantworten: 'Stammkolonie = Ausgangspunkt für alle weitere Schneider-Forschung.',
    werEsKannBeantworten: 'Oma Paulina (Franz und Amalias Tochter). Ihre Geschwister, falls vorhanden.',
  },
  {
    id: 'schneider-02',
    frage: 'Wie viele Geschwister hatte Oma Paulina?',
    linie: 'Schneider',
    status: 'blockiert',
    priorität: 2,
    aktuellerStand: 'Überlieferung: mehrere, Anzahl und Namen nicht systematisch erfasst.',
    wasEsBeantworten: 'Erweitert die Schneider-Quellenbasis. Jedes Geschwister kennt andere Details.',
    werEsKannBeantworten: 'Oma Paulina direkt.',
  },
  {
    id: 'schneider-03',
    frage: 'Wann und wo heirateten Franz und Amalia?',
    linie: 'Schneider',
    status: 'offen',
    priorität: 3,
    aktuellerStand: 'Unbekannt.',
    wasEsBeantworten: 'Heiratsdatum + -ort sind oft in Kirchenbüchern erfasst und ankerpunkt weiterer Recherchen.',
    werEsKannBeantworten: 'Oma Paulina. Kirchenbücher der Region.',
  },
]

export default function OffeneFragenPage() {
  const sortierteFragen = [...fragen].sort((a, b) => a.priorität - b.priorität)

  const byStatus = {
    blockiert: fragen.filter((f) => f.status === 'blockiert'),
    offen: fragen.filter((f) => f.status === 'offen'),
    'in-arbeit': fragen.filter((f) => f.status === 'in-arbeit'),
    beantwortet: fragen.filter((f) => f.status === 'beantwortet'),
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-stone-950/40 to-[#0a0a0b]" />
          <div className="absolute top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-slate-500/6 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-28 sm:pt-32">
          <Link
            href="/familie/geschichte"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/25 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Geschichte
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <FileQuestion className="h-8 w-8 text-slate-400" />
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Offene Fragen
            </h1>
          </div>

          <p className="max-w-2xl font-serif text-lg leading-relaxed text-white/55">
            Jede unbeantwortete Frage, der aktuelle Wissensstand, was sie beantworten
            würde, und wer sie stellen kann. Transparenz über das, was wir noch
            nicht wissen — und den konkreten Weg dorthin.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatBox label="Blockiert" wert={byStatus.blockiert.length} hint="Warten auf Interview" />
            <StatBox label="Offen" wert={byStatus.offen.length} hint="Archiv-Recherche nötig" />
            <StatBox label="In Arbeit" wert={byStatus['in-arbeit'].length} hint="Aktive Untersuchung" />
            <StatBox label="Beantwortet" wert={byStatus.beantwortet.length} hint="Verifiziert" />
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-400" />
              <p className="font-serif text-xs uppercase tracking-[0.15em] text-amber-400/60">
                Warum diese Seite existiert
              </p>
            </div>
            <p className="font-serif text-base leading-relaxed text-white/60">
              Familienforschung wird oft als fertiges Ergebnis präsentiert — ein
              Stammbaum, eine Geschichte, eine Behauptung. Wir machen es anders:
              wir zeigen die Arbeit. Jede Frage mit ihrem Kontext, ihrer
              Priorität, und dem konkreten Weg zur Antwort. So wird sichtbar,
              was Wissen ist und was Erinnerung, was offen ist und was
              unbeweisbar.
            </p>
          </div>
        </div>
      </section>

      {/* Fragen */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Sortiert nach Priorität
          </p>
          <p className="mb-12 font-serif text-2xl font-semibold text-white">
            {fragen.length} offene Fragen
          </p>

          <div className="space-y-6">
            {sortierteFragen.map((f) => (
              <FrageCard key={f.id} frage={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-rose-500/10 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent p-6 sm:p-8 text-center">
            <p className="mb-4 font-serif text-xl font-semibold text-white">
              Die Hälfte dieser Fragen wartet auf ein Gespräch.
            </p>
            <p className="mx-auto max-w-2xl font-serif text-base leading-relaxed text-white/50">
              Opa David, Oma Dorothea, Oma Paulina, Opa Alexander leben. Jedes
              Interview mit ihnen ist wertvoller als jede Archiv-Recherche — und
              es ist zeitlich begrenzt. Archivarbeit können wir in fünf Jahren
              noch machen. Gespräche möglicherweise nicht.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/familie/mitmachen"
                className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-5 py-2.5 font-serif text-sm font-medium text-rose-200 transition-all hover:bg-rose-500/20"
              >
                Eine Frage beantworten
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/familie/forsche-selbst"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-serif text-sm font-medium text-white/50 transition-all hover:bg-white/10"
              >
                Die Methode dahinter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center">
          <Link
            href="/familie/geschichte"
            className="inline-flex items-center gap-2 font-serif text-sm text-white/30 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Alle Themen
          </Link>
        </div>
      </section>
    </main>
  )
}

function StatBox({ label, wert, hint }: { label: string; wert: number; hint: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center">
      <p className="font-serif text-2xl font-bold text-white">{wert}</p>
      <p className="text-[11px] font-medium text-white/50">{label}</p>
      <p className="mt-0.5 text-[10px] italic text-white/25">{hint}</p>
    </div>
  )
}

function FrageCard({ frage }: { frage: Frage }) {
  const s = statusConfig[frage.status]
  return (
    <article className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${s.farbe}`}>
          <span>{s.icon}</span>
          {s.label}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-white/50">
          {frage.linie}-Linie
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-white/50">
          Priorität {frage.priorität}
        </span>
      </div>

      <h3 className="mb-5 font-serif text-lg font-semibold leading-snug text-white sm:text-xl">
        {frage.frage}
      </h3>

      <div className="space-y-4">
        <FrageDetail
          label="Aktueller Stand"
          icon={<Info className="h-3.5 w-3.5 text-white/30" />}
          text={frage.aktuellerStand}
        />
        <FrageDetail
          label="Was eine Antwort öffnet"
          icon={<ArrowRight className="h-3.5 w-3.5 text-emerald-400/60" />}
          text={frage.wasEsBeantworten}
        />
        <FrageDetail
          label="Wer es beantworten kann"
          icon={<MapPin className="h-3.5 w-3.5 text-amber-400/60" />}
          text={frage.werEsKannBeantworten}
        />
      </div>
    </article>
  )
}

function FrageDetail({ label, icon, text }: { label: string; icon: React.ReactNode; text: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        {icon}
        <p className="font-serif text-[11px] uppercase tracking-wider text-white/40">{label}</p>
      </div>
      <p className="pl-5 font-serif text-sm leading-relaxed text-white/60">{text}</p>
    </div>
  )
}
