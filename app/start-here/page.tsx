import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Compass, ShieldCheck } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start Here — The Six Primitives',
  description:
    'A public learning path for understanding, inspecting, and building a small AI agent. No form and no checkout.',
  path: '/start-here',
})

const artifacts = [
  {
    number: '01',
    title: 'Read the architectural argument',
    description:
      'See why model, tool, memory, loop, spec, and deploy are the smallest useful system—not a list of framework features.',
    href: '/blog/six-primitives-ai-agent',
    label: 'Read the Six Primitives essay',
    icon: BookOpen,
    external: false,
  },
  {
    number: '02',
    title: 'Follow the build',
    description:
      'Move from the mental model into a TypeScript implementation with explicit boundaries, a tool, and eval cases.',
    href: '/guides/first-agent-primer',
    label: 'Open the first-agent guide',
    icon: Compass,
    external: false,
  },
]

const primitives = [
  ['Model', 'The reasoning engine behind a stable interface.'],
  ['Tool', 'A narrow capability with a typed contract.'],
  ['Memory', 'State with an explicit lifetime and owner.'],
  ['Loop', 'The bounded sequence that decides what happens next.'],
  ['Spec', 'The promise, limits, and acceptance criteria.'],
  ['Deploy', 'The runtime, observability, and recovery path.'],
]

export default function StartHerePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.1),transparent_30%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200">
            Public now · No form · No checkout
          </p>
          <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Learn the system before you choose the stack.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
            Six primitives make a small agent legible: model, tool, memory, loop, spec, and deploy.
            This path gives you the argument and an inline build guide in that order.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/blog/six-primitives-ai-agent"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Read the core essay
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/guides/first-agent-primer"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Open the inline build guide
            </Link>
          </div>
        </div>

        <figure>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-2 shadow-2xl shadow-cyan-950/30">
            <Image
              src="/images/blog/generated/six-primitives-ai-agent-premium-hero.png"
              alt="Six illuminated modules arranged around a central system"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-auto w-full rounded-[1.55rem]"
            />
          </div>
          <figcaption className="mt-4 text-xs leading-5 text-white/55">
            A useful agent is not a personality. It is a bounded system whose parts you can inspect.
          </figcaption>
        </figure>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.02] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200">
              The learning sequence
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              One mental model. Two public artifacts.
            </h2>
          </div>

          <ol className="mt-12 border-t border-white/10">
            {artifacts.map((artifact) => {
              const Icon = artifact.icon
              const sharedClassName =
                'group grid gap-5 border-b border-white/10 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:grid-cols-[4rem_1fr_auto] sm:items-center'
              const contents = (
                <>
                  <div className="flex items-center gap-3 sm:block">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-white/45">
                      {artifact.number}
                    </span>
                    <Icon className="mt-0 h-5 w-5 text-cyan-200 sm:mt-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">
                      {artifact.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                      {artifact.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-cyan-200">
                    {artifact.label}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </>
              )

              return (
                <li key={artifact.number}>
                  {artifact.external ? (
                    <a
                      href={artifact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={sharedClassName}
                    >
                      {contents}
                    </a>
                  ) : (
                    <Link href={artifact.href} className={sharedClassName}>
                      {contents}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
              The transfer test
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">
              Change the framework. Keep the questions.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              A framework is easier to evaluate when you can point to each responsibility and ask
              what owns it, what constrains it, and how it fails.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {primitives.map(([term, definition]) => (
              <div key={term} className="border-t border-white/10 pt-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200">
                  {term}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-white/70">{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-3xl border-l-2 border-cyan-300/70 pl-6 sm:pl-8">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Paid release status
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
              No paid Six Primitives offer is available today.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              A Toolkit is being evaluated as a future release. Its status page is not a checkout
              and makes no promise about final contents, delivery, or refund terms.
            </p>
            <Link
              href="/build/six-primitives-toolkit"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Read the release status
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
