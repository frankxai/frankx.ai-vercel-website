# Newsletter — Signal Loop, Wk1 section (Fri 7/10)

Subject options (pick one):
1. We found 668 broken assets on our own sites
2. The failures that return 200 OK
3. Week 1 of opening the doors: the audit

## Section draft

**We audited ourselves first.**

Before asking anyone to trust our systems, we pointed the agent swarm at our own production estate. The honest result: 668 broken assets, a newsletter route that silently dropped signups, and zero working paid checkouts — on sites that looked healthy from every dashboard we had.

The full teardown is on the research hub, but the one idea worth keeping: **the dangerous failures live in the seams between healthy systems.** Cache and deployment. API and database. Site and payment provider. Each side reports fine; the connection is broken. Uptime monitoring never looks there — something has to use your site the way a stranger would.

What shipped since the audit:

- 5 fix PRs across 4 repositories (broken links, the newsletter route, security headers)
- The audit report, published as-is — findings we're proud of and findings we're not
- The agent audit workflow itself, which we'll open up next week as part of the free stack

If you run a site with a small team, one action: submit your own signup form with a real address today, then verify the data landed. That single test would have caught our worst finding.

Next week: the free stack — the diagnostic, the skill packs, and the workflows we run this with.

— Frank

*P.S. This newsletter's own signup route was one of the bugs. If you're reading this, the fix worked.*
