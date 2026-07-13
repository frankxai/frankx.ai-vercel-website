import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  DatabaseZap,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'

export type PrivateWorkspaceModule = {
  title: string
  description: string
  state?: 'bereit' | 'wartet-auf-adapter'
  href?: string
}

type PrivateFamilyWorkspaceProps = {
  eyebrow: string
  title: string
  description: string
  modules: PrivateWorkspaceModule[]
  note?: string
}

export function PrivateFamilyWorkspace({
  eyebrow,
  title,
  description,
  modules,
  note = 'Es sind noch keine privaten Familienakten mit diesem öffentlichen Codepaket verbunden.',
}: PrivateFamilyWorkspaceProps) {
  return (
    <main className="min-h-screen bg-[#080b0d] text-[#f4efe5]" lang="de">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 lg:px-10 lg:pb-32 lg:pt-36">
        <Link
          href="/familie"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stone-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Familienportal
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-emerald-300">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">{description}</p>
          </div>

          <aside className="rounded-3xl border border-amber-200/20 bg-[#121615] p-7" aria-label="Datenstatus">
            <DatabaseZap className="h-7 w-7 text-amber-200" aria-hidden />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100/70">Datenadapter</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Sicher getrennt</h2>
            <p className="mt-3 leading-7 text-stone-400">{note}</p>
          </aside>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const content = (
              <>
                <div className="flex items-start justify-between gap-5">
                  {module.state === 'bereit' ? (
                    <CircleCheck className="h-6 w-6 text-emerald-300" aria-hidden />
                  ) : (
                    <LockKeyhole className="h-6 w-6 text-stone-500" aria-hidden />
                  )}
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                    {module.state === 'bereit' ? 'bereit' : 'privater Adapter'}
                  </span>
                </div>
                <h2 className="mt-8 text-2xl font-semibold text-white">{module.title}</h2>
                <p className="mt-3 text-sm leading-6 text-stone-400">{module.description}</p>
                {module.href && (
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
                    Öffnen <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                )}
              </>
            )

            return module.href ? (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition hover:border-emerald-300/35 hover:bg-emerald-300/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {content}
              </Link>
            ) : (
              <article key={module.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
                {content}
              </article>
            )
          })}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.035] p-7 md:grid-cols-[auto_1fr] md:items-start lg:p-9">
          <ShieldCheck className="h-7 w-7 text-emerald-300" aria-hidden />
          <div>
            <h2 className="text-xl font-semibold text-white">Privat bedeutet: nicht im Repository</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">
              Namen, Beziehungen, Quellen, Erinnerungen und Angaben zu Minderjährigen werden erst nach einer familienbezogenen Anmeldung aus einem verschlüsselten Mandanten geladen. Git enthält ausschließlich Oberfläche, Regeln und synthetische Beispiele.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
