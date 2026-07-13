import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, DatabaseZap, LockKeyhole, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Private family tree',
  description: 'Authenticated shell for a governed, source-backed family tree.',
  robots: { index: false, follow: false, nocache: true },
}

export default function PrivateFamilyTreePage() {
  return (
    <main className="min-h-screen bg-[#080b0d] text-[#f4efe5]" lang="en">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-28 lg:px-10 lg:pb-32 lg:pt-36">
        <Link href="/familie" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stone-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Private family portal
        </Link>

        <p className="mt-14 text-sm font-semibold text-emerald-300">Authenticated shell · no bundled records</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-7xl">The tree stays empty until a private tenant is connected.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">Living-family names, relationships, evidence, and guardian records are never compiled into this public website repository.</p>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            { icon: LockKeyhole, title: 'Family-scoped session', body: 'A valid site login is necessary, but not sufficient. The runtime must also resolve a family membership and role.' },
            { icon: DatabaseZap, title: 'Private data adapter', body: 'Records load from the Family Intelligence OS tenant, not from TypeScript fixtures or Git.' },
            { icon: ShieldCheck, title: 'Consent-aware views', body: 'Kinship, access, guardianship, and publication are evaluated independently.' },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <item.icon className="h-6 w-6 text-emerald-300" aria-hidden />
              <h2 className="mt-8 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-400">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
