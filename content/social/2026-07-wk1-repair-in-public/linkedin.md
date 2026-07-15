# LinkedIn — Wk1 repair in public

Cadence: Tue (LI-1 essay) · Thu (LI-2 essay) · Fri (LI-3 recap). Attach the 16:9 hero (assets/) to LI-1; LI-2 runs text-only; LI-3 can reuse the carousel exported as a document post.

## LI-1 (Tue) — the audit essay

Last week I pointed an agent swarm at my own production estate.

It found 668 broken assets across sites I work on every single day.

The uncomfortable part: nothing was "down." Every page returned 200. Monitoring was green. If you had asked me the day before, I'd have said the sites were in good shape.

What the agents actually found:

- 524 image references in cached HTML pointing at deployments that no longer exist. Not missing files — stale pointers. Invisible from any editor or dashboard.
- A newsletter route that accepted signups, returned success, and dropped the contact. The people affected were, by definition, the ones we'd never hear from.
- 111 broken internal links on a second brand's site, plus a signup flow writing to a database table that was never created.
- Zero working paid checkout paths. Product pages collecting clicks that could not convert.

I spent years around enterprise AI and cloud architecture at Oracle. Enterprises have entire teams for exactly this class of failure — synthetic monitoring, journey tests, release verification. Solo operators and small teams have none of that, and the failure class doesn't care about company size.

The fix wasn't heroic. Agents crawl every route like a first-time visitor: follow every link, load every asset, submit every form with a test address, compare every CTA against the page it lands on. Findings go into a report; a human triages; fix PRs ship. Five shipped the same week.

I'm running July in the open — the audits, the fixes, and the system behind them. The full report is on the research hub, and I'll publish what breaks as readily as what works.

The most dangerous failures don't throw errors. Someone — or something — has to go looking.

## LI-2 (Thu) — the 200 OK failure class

The most dangerous failures in production return 200 OK.

Three examples, all from auditing my own sites last week:

1. Cached pages referencing dead deployment URLs. The page loads, the layout holds, the images are gone. No error anywhere.
2. A signup form writing to a database table that doesn't exist. The API catches the failure, returns success, discards the email. The user thinks they subscribed. You think you have a subscriber. Neither is true.
3. A checkout button pointing at a product that was never created in the payment platform. Clicks, no conversions, no alerts.

None of these appear in uptime monitoring. All of them cost trust or revenue daily.

The common thread: each failure lives in the gap between two systems that are both individually "healthy" — cache and deployment, API and database, site and payment provider. Health checks test systems. These failures live in the seams.

What catches them is behavioral testing: something that uses the site the way a stranger would, end to end, every day. In an enterprise that's a synthetic-user platform and a QA budget. In my home office it's an agent swarm and a morning report.

The capability gap between those two setups is closing faster than most teams realize.

## LI-3 (Fri) — week recap + what a one-person CoE looks like

Week one of building an AI Center of Excellence in public. The scoreboard:

- 668 audit findings triaged into fix / backlog / accepted
- 5 fix PRs shipped across 4 repositories
- 1 newsletter pipeline rebuilt after we found it silently dropping signups
- 1 public audit report published

What I'd tell anyone running products with a small team:

Your site is decaying right now in ways your monitoring can't see. Not because your work is bad — because the web rots at the seams between systems, and nobody's job is to look there.

The unlock isn't a bigger team. It's making the looking automatic. Agents that browse like first-time visitors, a report that lands every morning, and the discipline to fix in public so the audit actually happens.

Next week I'm opening up the free stack we run this with — the diagnostic, the skill packs, and the workflows.

Following along costs nothing: frankx.ai/research
