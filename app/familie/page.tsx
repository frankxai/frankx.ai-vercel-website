import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpenText, FileSearch, Heart, LockKeyhole, ShieldCheck, ShieldPlus, TreePine, UsersRound } from 'lucide-react'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privates Familienportal',
  description: 'Geschützter Zugang zum deutschsprachigen Familienarchiv.',
  robots: { index: false, follow: false, nocache: true },
}

const privateAreas = [
  { title: 'Stammbaum', description: 'Quellen, Beziehungen und offene Fragen', href: '/familie/stammbaum', icon: TreePine },
  { title: 'Familiengeschichte', description: 'Geprüfte Erzählungen mit Herkunftsnachweisen', href: '/familie/geschichte', icon: BookOpenText },
  { title: 'Interview-Kit', description: 'Gespräche mit älteren Generationen vorbereiten', href: '/familie/interview-kit', icon: Heart },
  { title: 'Mitmachen', description: 'Eine Erinnerung, Korrektur oder Quelle vorschlagen', href: '/familie/mitmachen', icon: FileSearch },
  { title: 'Nachkommen & Patenschaften', description: 'Guardian-geführte Räume für Kinder und nächste Generationen', href: '/familie/nachkommen-und-patenschaften', icon: UsersRound },
  { title: 'Vorsorge & Notfall', description: 'Getrennte Protokolle für Notfall, Handlungsunfähigkeit und Nachlass', href: '/familie/vorsorge-und-notfall', icon: ShieldPlus },
] as const

export default async function FamilieGatewayPage() {
  const session = await auth()

  return (
    <main className="min-h-screen bg-[#080b0d] text-[#f4efe5]">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-10 lg:pb-32 lg:pt-40" lang="de">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Familienportal · privater Bereich</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-7xl">Familienwissen gehört in den richtigen Kreis.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">Geschichten, Quellen und Vorsorge werden nicht einfach veröffentlicht. Dieser Bereich trennt persönliche, enge, erweiterte und öffentliche Informationen.</p>
          </div>
          <div className="rounded-3xl border border-emerald-300/20 bg-[#101719] p-7">
            <ShieldCheck className="h-7 w-7 text-emerald-300" aria-hidden />
            <h2 className="mt-7 text-2xl font-semibold text-white">{session ? 'Steward-Zugang aktiv' : 'Zugang sicher verschlossen'}</h2>
            <p className="mt-3 leading-7 text-stone-400">
              {session
                ? 'Du siehst nur Verweise auf den privaten Pilotbereich. Jede Unterseite bleibt zusätzlich durch die Anmeldung geschützt.'
                : 'Ohne gültige Anmeldung werden weder Stammbaum noch Familiengeschichten oder Interviewmaterial geladen.'}
            </p>
            {!session && (
              <Link href="/auth/signin?callbackUrl=/familie" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#e7d7b2] px-5 py-3 text-sm font-semibold text-[#111617] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                Als Steward anmelden <LockKeyhole className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>

        {session ? (
          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            {privateAreas.map((area) => (
              <Link key={area.href} href={area.href} className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition hover:border-emerald-300/35 hover:bg-emerald-300/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                <area.icon className="h-6 w-6 text-emerald-300" aria-hidden />
                <h2 className="mt-8 text-2xl font-semibold text-white">{area.title}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-400">{area.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-300 group-hover:text-white">Öffnen <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="max-w-2xl text-sm leading-6 text-stone-500">Der aktuelle Pilotzugang ist noch kein Mehrpersonen-Familienkonto. Persönliche Konten, Einladungen, Rollen und Wiederherstellung werden im eigenständigen Family Intelligence OS umgesetzt, bevor weitere Familienmitglieder Zugang erhalten.</p>
            <Link href="/family-intelligence-system" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-white">Das öffentliche System kennenlernen <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        )}
      </section>
    </main>
  )
}
