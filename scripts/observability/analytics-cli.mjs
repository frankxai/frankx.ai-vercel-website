#!/usr/bin/env node
/** Read the same provider-result contract used by the admin API. Requires Node 22.18+. */
import { getObservabilitySummary, formatObservabilityMarkdownBrief } from '../../lib/observability/observability-summary.ts'
import { getSearchPerformance, inspectUrlIndexStatus } from '../../lib/observability/google-search-console.ts'
import { getGA4Overview } from '../../lib/observability/google-analytics.ts'
import { boundedInteger } from '../../lib/observability/measurement-result.ts'

const args = process.argv.slice(2)
const value = (name) => args.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1)
const days = boundedInteger(value('--days'), 28, 365)
const limit = boundedInteger(value('--limit'), 25, 25000)
const target = value('--inspect') || (args.includes('--inspect') ? args[args.indexOf('--inspect') + 1] : null)
let report
if (target) report = await inspectUrlIndexStatus(target)
else if (args.includes('--ga4')) report = await getGA4Overview(days)
else if (args.includes('--gsc') || args.includes('--opportunities')) report = await getSearchPerformance({ days, rowLimit: limit })
else report = await getObservabilitySummary(days)

if (args.includes('--json') || !('periodDays' in report)) console.log(JSON.stringify(report, null, 2))
else console.log(formatObservabilityMarkdownBrief(report))
// A report may contain partial data while the command correctly signals it is incomplete.
if (report.status !== 'ok') process.exitCode = 2
