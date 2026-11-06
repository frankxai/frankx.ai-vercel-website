import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { formatAsOfDate, formatLedgerTimestamp, parseProofLedger, scopeLabel } from '@/lib/proof/claims'
import rawLedger from '@/data/proof/claims.json'

// Hidden until Frank decides to publish: noindex, and not linked from
// navigation, footer, sitemap or llms.txt.
export const metadata: Metadata = createMetadata({
  title: 'Proof: usage claims with receipts',
  description:
    'Usage claims about my multi-model agent practice, each with its scope, the date it was measured and the method that reproduces it.',
  path: '/proof',
  noindex: true,
})

const eyebrow = 'text-[11px] font-medium uppercase tracking-[0.25em] text-white/60'
const sectionHeading = 'text-balance font-display text-2xl font-semibold text-white sm:text-3xl'
const focusRing =
  'rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]'

function MethodNote() {
  return (
    <section aria-labelledby="method-heading" className="border-t border-white/5 py-16 sm:py-24">
      <h2 id="method-heading" className={sectionHeading}>
        Method
      </h2>
      <p className="mt-4 max-w-prose text-base leading-relaxed text-white/80">
        The numbers come from a private ledger I keep. Before a claim is listed here, a script re-reads the source
        logs and reproduces the figure. If a figure does not reproduce, it is not listed. The command and the source
        for each claim are under &ldquo;How this was measured&rdquo;.
      </p>
    </section>
  )
}

export default function ProofPage() {
  const result = parseProofLedger(rawLedger as unknown)

  return (
    <main id="proof" className="mx-auto w-full max-w-3xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <header className="pb-12 sm:pb-16">
        <p className={eyebrow}>Usage ledger</p>
        <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">Proof</h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-white/80">
          This page lists usage claims about how I work with AI agents. Each one shows its scope, the date it was
          measured and how to reproduce it.
        </p>
        {result.ok ? (
          <p className="mt-6 text-sm text-white/70">
            Last updated{' '}
            <time dateTime={result.ledger.generated_at} className="text-white/90">
              {formatLedgerTimestamp(result.ledger.generated_at)}
            </time>
          </p>
        ) : null}
      </header>

      {!result.ok ? (
        <section aria-labelledby="ledger-error-heading" className="border-t border-white/5 py-16 sm:py-24">
          <h2 id="ledger-error-heading" className={sectionHeading}>
            This ledger could not be read
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-white/80">
            The data file did not pass this page&rsquo;s format check, so no claims are shown. Showing nothing is
            better than showing a number wrong.
          </p>
          <p className="mt-4 max-w-prose break-words text-sm leading-relaxed text-white/70">Reason: {result.reason}</p>
        </section>
      ) : (
        <>
          <section aria-labelledby="claims-heading" className="border-t border-white/5 py-16 sm:py-24">
            <h2 id="claims-heading" className={sectionHeading}>
              Claims
            </h2>
            {result.ledger.claims.length === 0 ? (
              <div className="mt-6">
                <p className="text-lg font-medium text-white">Nothing is verified yet</p>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-white/80">
                  No claim has passed reproduction. A claim is listed only after a script reproduces it, so this
                  list stays empty until one does.
                </p>
              </div>
            ) : (
              <ol className="mt-8 space-y-6">
                {result.ledger.claims.map((claim) => (
                  <li key={claim.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                    <p translate="no" className="font-mono text-xs text-white/60">
                      {claim.id}
                    </p>
                    <p className="mt-2 break-words text-base leading-relaxed text-white sm:text-lg">{claim.text}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                      <div className="flex gap-2">
                        <dt className="text-white/60">Scope</dt>
                        <dd className="break-words text-white/90">{scopeLabel(claim.scope)}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-white/60">As of</dt>
                        <dd className="text-white/90">
                          <time dateTime={claim.as_of}>{formatAsOfDate(claim.as_of)}</time>
                        </dd>
                      </div>
                    </dl>
                    <details className="mt-4 border-t border-white/10 pt-4">
                      <summary
                        className={`cursor-pointer text-sm font-medium text-emerald-300 hover:text-emerald-200 ${focusRing}`}
                      >
                        How this was measured
                      </summary>
                      <dl className="mt-4 space-y-4 text-sm">
                        <div>
                          <dt className="text-white/60">Method</dt>
                          <dd className="mt-1">
                            <code
                              translate="no"
                              className="block whitespace-pre-wrap rounded-lg bg-black/30 p-3 font-mono text-xs leading-relaxed text-white/90 [overflow-wrap:anywhere]">
                              {claim.method}
                            </code>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-white/60">Source</dt>
                          <dd className="mt-1 break-words leading-relaxed text-white/90">{claim.source}</dd>
                        </div>
                      </dl>
                    </details>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section aria-labelledby="not-claimed-heading" className="border-t border-white/5 py-16 sm:py-24">
            <h2 id="not-claimed-heading" className={sectionHeading}>
              What this does not claim
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-white/80 marker:text-white/40">
              {result.ledger.does_not_claim.map((line) => (
                <li key={line} className="break-words">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <MethodNote />
    </main>
  )
}
