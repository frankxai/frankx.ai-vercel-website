# X — Wk1 repair in public

## Teardown thread (Tue 7/7, ~9:00 CET)

Attach: audit report screenshot on post 1; broken-image grid on post 2; PR #217 diff on post 3.

**1/**
We pointed our agent swarm at our own production sites last week.

668 broken assets. Zero working paid checkouts. A newsletter that dropped every signup without an error.

We ship to these sites daily and saw none of it.

Teardown:

**2/**
Finding 1 — 524 of the 668 "broken images" weren't missing files.

Cached HTML was still pointing at dead deployment URLs (`?dpl=...`). Every stale page carried image links into deployments that no longer exist.

One fresh deploy cleared them. Weeks of silent rot, invisible from the editor.

**3/**
Finding 2 — the newsletter route accepted signups and dropped them.

Form returned 200. Contact never reached the audience.

Nobody complained, because the people affected were exactly the people we never heard from. Fixed in PR #217.

**4/**
Finding 3 — our second brand's site: 111 broken internal links, a dead Discord invite on the community page, and a signup flow writing to a database table that didn't exist.

Every email: accepted, then discarded.

**5/**
Finding 4 — zero of our paid checkout paths worked. On any site.

Product pages politely collecting clicks that could never convert.

If you haven't bought your own product this month, you don't actually know whether anyone can.

**6/**
The pattern across all of it: nothing was "down."

Every page returned 200. Monitoring was green. The failures lived in the layer between rendered HTML and reality — cached references, missing tables, third-party config.

Uptime checks don't look there.

**7/**
The method that caught it: agents crawling every route like a first-time visitor.

Follow every link. Load every image. Submit every form with a test address. Check every CTA against the thing it promises. Write findings to a report a human triages.

**8/**
Everything above is either fixed or on a public backlog. Five fix PRs shipped the same week.

The point of auditing in public isn't looking clean. It's that the audit actually happens.

**9/**
We're building an AI Center of Excellence — one operator, a home office, an agent swarm. July is open-doors month: the audits, the fixes, and the system itself, in public.

Full report and weekly findings: frankx.ai/research

## Daily posts

**Wed 7/8 — receipt #1**
A form that returns 200 and drops the data is worse than a form that errors.

One tells the user something broke. The other tells no one.

We found one on our own site this week. Check yours.

**Thu 7/9 — receipt #2** (attach broken-image grid screenshot)
524 broken images on our site traced back to one cause: cached pages pointing at dead deployment URLs.

The fix was a deploy.
The lesson was the monitoring gap — nothing we had would ever have flagged it.

**Fri 7/10 (morning) — receipt #3**
"1 patterns · 0.0/5"

Our flagship free page rendered that for weeks. Data pipeline broke; the page didn't.

If a page is your storefront, something should look at it daily with fresh eyes. Yours might be saying something similar right now.

**Fri 7/10 (EOD) — week recap**
Week 1 of opening the doors:

- 668 findings triaged
- 5 fix PRs shipped
- 1 newsletter route rebuilt
- 1 public report published

Next week: the free stack we run this with.

frankx.ai/research
