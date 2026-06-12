import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Operating Guide — FrankX Foundry',
  description:
    'How to operate an installed business OS: day-1 onboarding, the 30-minute weekly rhythm, the quality gates, and how harness updates arrive. Written for founders, no AI background assumed.',
  alternates: { canonical: 'https://frankx.ai/foundry/guide' },
  openGraph: {
    title: 'The Operating Guide — FrankX Foundry',
    description:
      'Day-1 onboarding, the 30-minute weekly rhythm, the quality gates, and how harness updates arrive.',
    url: 'https://frankx.ai/foundry/guide',
    images: [
      {
        url: '/images/blog/agentic-os-family-hero.png',
        width: 1200,
        height: 675,
        alt: 'The Foundry — operating systems forged for businesses',
      },
    ],
  },
}

/** Long-form reading surface — narrow measure, slow cadence, no funnel. */
export default function FoundryGuidePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/70">
      <article className="mx-auto max-w-3xl px-6 pb-32 pt-28 lg:pt-36">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
          Foundry · The Operating Guide
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          How to run a business on an operating system.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/60">
          For founders who just got an OS installed — or instantiated the open-source template
          themselves. No AI background assumed. Ten minutes to read; thirty minutes a week to
          operate.
        </p>

        <div className="mt-16 space-y-14 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">What you actually have</h2>
            <p className="mt-4">
              Most companies use AI as a chatbot: blank window, blank context, generic output. You
              have something different — a repository that teaches the AI who you are. Five
              contract files do the teaching:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="font-mono text-sm text-emerald-400/80">CLAUDE.md</span> — the
                doctrine. The company handbook, read automatically by every AI session.
              </li>
              <li>
                <span className="font-mono text-sm text-emerald-400/80">AGENTS.md</span> — the same
                rules on one page, readable by any AI tool.
              </li>
              <li>
                <span className="font-mono text-sm text-emerald-400/80">SKILL.md</span> — what to
                load before each kind of work, and when the AI should refuse.
              </li>
              <li>
                <span className="font-mono text-sm text-emerald-400/80">design.md</span> — every
                color, font, and spacing value your site is allowed to use.
              </li>
              <li>
                <span className="font-mono text-sm text-emerald-400/80">taste.md</span> — the
                judgment tokens can&apos;t capture: references, refusals, the polish pass.
              </li>
            </ul>
            <p className="mt-4">
              Edit these files and every future AI session changes behavior. That&apos;s the whole
              trick — the configuration is the company knowledge, and it compounds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Day 1 — one evening</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5">
              <li>
                Install{' '}
                <a
                  href="https://claude.com/claude-code"
                  rel="noopener"
                  className="text-emerald-400 hover:underline"
                >
                  Claude Code
                </a>{' '}
                (or use Cursor or Codex — the contract files cover them too).
              </li>
              <li>
                Open a terminal in your repo and just talk. Try:{' '}
                <em>&ldquo;What are the rules of this repo?&rdquo;</em> The agent recites your
                doctrine back — that&apos;s how you know the harness is live.
              </li>
              <li>
                Read your own <span className="font-mono text-sm">CLAUDE.md</span>. It&apos;s the
                best summary of how everything fits.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              The weekly rhythm — the whole operation
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/40">
                    <th className="py-2 pr-4 font-medium">When</th>
                    <th className="py-2 pr-4 font-medium">Command</th>
                    <th className="py-2 pr-4 font-medium">What happens</th>
                    <th className="py-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4">Monday</td>
                    <td className="py-3 pr-4 font-mono text-xs">/weekly-content</td>
                    <td className="py-3 pr-4">
                      Plans the week: one post, one distribution action, one ops task. Three items
                      max — sized for founders with day jobs.
                    </td>
                    <td className="py-3">10 min</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4">Midweek</td>
                    <td className="py-3 pr-4 font-mono text-xs">/blog-post</td>
                    <td className="py-3 pr-4">
                      Drafts, polishes, gates, and build-verifies a piece of content.
                    </td>
                    <td className="py-3">1–2 h</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Friday</td>
                    <td className="py-3 pr-4 font-mono text-xs">/weekly-review</td>
                    <td className="py-3 pr-4">
                      Asks you three questions, closes the week, updates the business memory.
                    </td>
                    <td className="py-3">15 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              The Friday step is the one people skip and shouldn&apos;t. The plan is disposable;
              the review is the asset — it writes to{' '}
              <span className="font-mono text-sm">docs/intelligence/</span>, the memory that makes
              week 30 smarter than week 1. The operating discipline in one line:{' '}
              <strong className="text-white">check memory first, update memory after.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              The gates — why your output won&apos;t look AI-generated
            </h2>
            <p className="mt-4">Nothing publishes without passing:</p>
            <ul className="mt-4 space-y-3">
              <li>
                <strong className="text-white">@claims-guard</strong> — blocks regulated claim
                language, uncited assertions, banned phrases, and AI-tone. A FAIL is final until a
                human rewrites. This is the agent that keeps you out of regulatory trouble and out
                of the &ldquo;obviously a chatbot wrote this&rdquo; zone.
              </li>
              <li>
                <strong className="text-white">/ship</strong> — typecheck, build, claims, and SEO
                before any deploy. A human always presses the deploy button.
              </li>
              <li>
                <strong className="text-white">The polish pass</strong> — seven manual checks in{' '}
                <span className="font-mono text-sm">taste.md</span> before any visual ships.
              </li>
            </ul>
            <p className="mt-4">
              The standing rule:{' '}
              <strong className="text-white">
                agents draft, gate, and commit; humans deploy, post, and send.
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">When the harness improves upstream</h2>
            <p className="mt-4">
              Your repo descends from{' '}
              <a
                href="https://github.com/frankxai/agentic-business-os"
                rel="noopener"
                className="text-emerald-400 hover:underline"
              >
                agentic-business-os
              </a>
              . When the upstream harness improves, you receive a pull request with a
              plain-language changelog. You read the diff — it&apos;s markdown, readable in the
              GitHub interface — and merge or decline per file. Nothing ever auto-merges, and your
              brand files are never touched. The full contract is one page:{' '}
              <a
                href="https://github.com/frankxai/agentic-business-os/blob/main/HARNESS.md"
                rel="noopener"
                className="text-emerald-400 hover:underline"
              >
                HARNESS.md
              </a>
              . The principle it encodes:{' '}
              <strong className="text-white">brand is yours, machinery is shared.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Where to get help</h2>
            <ul className="mt-4 space-y-3">
              <li>
                The template and skill packs are MIT-licensed — community help via{' '}
                <a
                  href="https://github.com/frankxai/agentic-business-os/issues"
                  rel="noopener"
                  className="text-emerald-400 hover:underline"
                >
                  GitHub issues
                </a>
                .
              </li>
              <li>Installed by the Foundry? You have a direct channel — use it.</li>
              <li>
                Considering an install?{' '}
                <Link href="/foundry#apply" className="text-emerald-400 hover:underline">
                  Apply here
                </Link>
                .
              </li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  )
}
