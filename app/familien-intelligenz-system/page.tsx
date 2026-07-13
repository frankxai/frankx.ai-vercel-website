import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Cloud, Download, FileCheck2, LockKeyhole, PanelsTopLeft, ShieldCheck, UsersRound } from 'lucide-react'
import FamilyPrivacyPlanner from '@/components/family-intelligence/FamilyPrivacyPlanner'

export const metadata: Metadata = {
  title: 'Familien-Intelligenz-System',
  description: 'Offene, datenschutzorientierte Infrastruktur für Familienwissen, Quellen, Einwilligung und Kontinuität.',
  alternates: {
    canonical: '/familien-intelligenz-system',
    languages: { de: '/familien-intelligenz-system', en: '/family-intelligence-system' },
  },
  robots: { index: true, follow: true },
}

const rooms = [
  ['Mein Bereich', 'Private Erinnerungen, Dokumente, Wünsche und Anweisungen.', LockKeyhole],
  ['Haushalt & Engster Kreis', 'Alltag und vertrauliche Koordination mit einzeln gewährtem Zugriff.', LockKeyhole],
  ['Großfamilie', 'Geprüfte Geschichte, Zusammenkünfte und niedrig sensible Zusammenarbeit.', UsersRound],
  ['Nachkommen & Patenschaften', 'Guardian-geführte, altersgerechte Räume ohne öffentliche Kinderprofile.', ShieldCheck],
  ['Steward-Konsole', 'Aussagen, Widersprüche, Einwilligungen und menschliche Entscheidungen.', UsersRound],
  ['Vorsorge & Notfall', 'Getrennte Regeln für Notfall, Handlungsunfähigkeit und Tod.', FileCheck2],
  ['Öffentliches Archiv', 'Nur einzeln freigegebene und redigierte Inhalte.', ShieldCheck],
] as const

export default function GermanFamilyIntelligenceSystemPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b0d] text-[#f4efe5]" lang="de">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(74,142,115,0.16),transparent_32%)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10 lg:pb-32 lg:pt-40">
          <p className="text-sm font-semibold text-emerald-300">Öffentliche Grundlage · frühe Aufbauphase</p>
          <h1 className="mt-7 max-w-5xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.6rem]">Familienwissen ist mehr als ein Stammbaum.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">Ein Familien-Intelligenz-System bewahrt Erinnerungen, unterscheidet Aussage und Beleg, koordiniert Verantwortung und erhält geregelten Zugang über Generationen.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#schutzkreis" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-[#0a1210] transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Schutzkreis planen <ArrowDown className="h-4 w-4" aria-hidden /></Link>
            <Link href="/family-intelligence-system/download" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-stone-200 hover:bg-white/5">Starter-Kit herunterladen <Download className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold text-amber-300">Klare Grenzen</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Sieben Bereiche, die nicht automatisch ineinander übergehen.</h2>
            <p className="mt-5 leading-7 text-stone-400">Verwandtschaft und Zugriff sind zwei verschiedene Beziehungen. Jede Information beginnt im kleinsten passenden Kreis.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {rooms.map(([title, description, Icon]) => (
              <article key={title} className="bg-[#0d1214] p-7">
                <Icon className="h-6 w-6 text-emerald-300" aria-hidden />
                <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="schutzkreis" className="border-y border-white/10 bg-[#0a0f11]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold text-emerald-300">Direkt nutzbar</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-6xl">Finde den kleinsten sicheren Familienkreis.</h2>
            <p className="mt-5 text-lg leading-8 text-stone-400">Die Auswertung bleibt lokal im Browser und empfiehlt bewusst den konservativen nächsten Schritt.</p>
          </div>
          <FamilyPrivacyPlanner locale="de" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        <article className="rounded-[1.75rem] border border-white/10 bg-[#111719] p-8">
          <h2 className="text-3xl font-semibold text-white">Für deine Familie</h2>
          <p className="mt-4 leading-7 text-stone-400">Der private deutsche Pilot trennt engsten Kreis, Großfamilie, Nachkommen und öffentliches Archiv. Der Zugang bleibt gesperrt, bis persönliche Konten sicher eingerichtet sind.</p>
          <Link href="/familie" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-white">Zum Familienportal <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </article>
        <article className="rounded-[1.75rem] border border-white/10 bg-[#111719] p-8">
          <h2 className="text-3xl font-semibold text-white">Für andere Familien</h2>
          <p className="mt-4 leading-7 text-stone-400">Protokolle, Schemas, Skills, Vercel-Vorlage und v0-Prompt sind öffentlich einsehbar. Echte Familiendaten bleiben im privaten System der jeweiligen Familie. Nutzung und Weitergabe brauchen noch eine ausdrückliche Lizenzentscheidung.</p>
          <div className="mt-7 flex flex-col items-start gap-4">
            <Link href="/family-intelligence-system/download" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 hover:text-white">Starter-Kit öffnen <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrankxai%2Ffamily-intelligence-os&project-name=family-intelligence-portal&repository-name=family-intelligence-portal" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-300/25 px-5 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/[0.06]"><Cloud className="h-4 w-4" aria-hidden />Gesperrte Vercel-Vorlage</a>
            <a href="https://github.com/frankxai/family-intelligence-os/blob/main/templates/v0-family-portal/PROMPT.md" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-stone-200 hover:bg-white/5"><PanelsTopLeft className="h-4 w-4" aria-hidden />v0-Bauprompt</a>
          </div>
        </article>
      </section>
    </main>
  )
}
