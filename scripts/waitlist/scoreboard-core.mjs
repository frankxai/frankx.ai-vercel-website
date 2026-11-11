// Pure tallies for the waitlist scoreboard. No I/O, so it is tested without Redis.
const SOURCE_LABEL = (s) => {
  if (!s) return 'unknown'
  if (s.startsWith('starlightintelligence.academy')) return 'academy'
  if (s.startsWith('/community')) return 'frankx.ai/community'
  return s.startsWith('/') ? 'frankx.ai' + s : s
}

const bump = (map, k) => map.set(k, (map.get(k) ?? 0) + 1)

/**
 * Counts real signals only: no estimates, no projections. Test addresses (`+waitlist-test@`,
 * `@example.com`) are counted separately so they never inflate the number Frank reads.
 */
export function tally(signals, { now = new Date() } = {}) {
  const real = []
  let tests = 0
  for (const s of signals) {
    if (/\+waitlist-test@|@example\.(com|org)$/i.test(s.email ?? '')) tests++
    else real.push(s)
  }
  const by = { day: new Map(), source: new Map(), campaign: new Map(), priceBand: new Map(), urgency: new Map() }
  for (const s of real) {
    bump(by.day, String(s.createdAt ?? '').slice(0, 10) || 'unknown')
    bump(by.source, SOURCE_LABEL(s.source))
    bump(by.campaign, s.utm?.utm_source ? `${s.utm.utm_source}/${s.utm.utm_campaign ?? '-'}` : 'none')
    bump(by.priceBand, s.priceBand ?? 'not answered')
    bump(by.urgency, s.urgency ?? 'not answered')
  }
  const cutoff = new Date(now.getTime() - 7 * 864e5).toISOString()
  const sorted = (m) => [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
  return {
    generatedAt: now.toISOString(),
    total: real.length,
    last7Days: real.filter((s) => String(s.createdAt ?? '') >= cutoff).length,
    testSignalsExcluded: tests,
    paidIntent: real.filter((s) => ['100-299', '300-999', 'over-1000', 'company-pays'].includes(s.priceBand)).length,
    startNow: real.filter((s) => s.urgency === 'now').length,
    day: [...by.day.entries()].sort((a, b) => String(a[0]).localeCompare(String(b[0]))),
    source: sorted(by.source),
    campaign: sorted(by.campaign),
    priceBand: sorted(by.priceBand),
    urgency: sorted(by.urgency),
  }
}

export function toMarkdown(productId, t) {
  const table = (title, rows) =>
    `### ${title}\n\n| ${title} | Signups |\n| --- | ---: |\n` + rows.map(([k, v]) => `| ${k} | ${v} |`).join('\n') + '\n'
  return [
    `## Waitlist scoreboard: ${productId}`,
    '',
    `Read from KV at ${t.generatedAt}. Real signups only; ${t.testSignalsExcluded} test signal(s) excluded.`,
    '',
    `| Metric | Value |\n| --- | ---: |\n| Total signups | ${t.total} |\n| Last 7 days | ${t.last7Days} |\n| Price band EUR 100 or more, or company pays | ${t.paidIntent} |\n| Would start now | ${t.startNow} |`,
    '',
    table('Source', t.source),
    table('Campaign (utm_source/utm_campaign)', t.campaign),
    table('Price band', t.priceBand),
    table('Urgency', t.urgency),
    table('Day', t.day),
  ].join('\n')
}

/** Parses stored rows; a malformed one is skipped and counted so one bad row cannot stop the report. */
export function parseSignals(values) {
  const signals = []
  let skipped = 0
  for (const v of values) {
    try {
      const s = typeof v === 'string' ? JSON.parse(v) : null
      if (s && typeof s === 'object') signals.push(s)
      else skipped++
    } catch {
      skipped++
    }
  }
  return { signals, skipped }
}
