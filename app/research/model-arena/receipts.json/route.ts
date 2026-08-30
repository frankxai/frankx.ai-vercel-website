import { NextResponse } from 'next/server'
import { getReceipts, getReceiptProblems, lastMeasured } from '@/lib/intelligence/receipts'
import { getExternalIntelligence, isSeed } from '@/lib/intelligence/loader'

/**
 * Agent-facing manifest of arena eval receipts.
 *
 * Publishes DATA, not components, per the shared-intelligence contract — consumers read
 * this instead of forking the harness (which is exactly what the deleted ACOS fork did).
 * Each entry links the receipt file itself so a consumer can verify a claim rather than
 * trust this summary.
 *
 * `lastMeasured: null` is a real answer, not an error: it means no first-party measurement
 * exists yet. Consumers must carry that through rather than substituting a snapshot date —
 * the external snapshot's freshness says nothing about when we last measured anything.
 */

/**
 * Generated at build time and never re-executed at runtime.
 *
 * Both halves of the data layer read from disk — receipts are globbed from a directory,
 * which cannot be a static import — and Next's file tracing follows static imports only.
 * A revalidating route would re-run this handler inside a serverless function where
 * `public/research/arena-receipts/` is not guaranteed to be present, turning a cache
 * refresh into a 500. Receipts and the snapshot only change when a commit lands, and a
 * commit already triggers a deploy, so there is nothing for revalidation to catch.
 */
export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  const receipts = getReceipts()
  const snapshot = getExternalIntelligence()

  const body = {
    schema: 'frankx/arena-receipts-manifest@1',
    _description:
      'Index of first-party model-arena eval receipts published by frankx.ai. Every measurement claim on /research/model-arena traces to one of these files. Figures sourced from third parties live in the external snapshot and carry their own licence; do not merge the two into a ranking.',
    lastMeasured: lastMeasured(),
    receiptCount: receipts.length,
    receipts: receipts.map((r) => ({
      roundId: r.round_id,
      date: r.date,
      title: r.title,
      contestants: r.contestants,
      taskCount: r.tasks?.length ?? 0,
      href: r.href,
    })),
    externalSnapshot: {
      schema: snapshot.schema,
      generatedAt: snapshot.generated_at,
      seeded: isSeed(),
      sources: snapshot.sources.map((s) => ({
        id: s.id,
        status: s.status,
        licenseState: s.license_state ?? null,
        license: s.license,
        retrievedAt: s.retrieved_at,
      })),
      linkOnly: (snapshot.link_only ?? []).map((l) => ({ id: l.id, url: l.url, reason: l.reason })),
    },
    // Surfaced, not swallowed: a receipt that failed validation is missing evidence, and a
    // consumer counting receipts deserves to know the count is short and why.
    invalidReceipts: getReceiptProblems(),
  }

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'X-Manifest-Version': body.schema,
      'X-Last-Measured': body.lastMeasured ?? 'none',
    },
  })
}
