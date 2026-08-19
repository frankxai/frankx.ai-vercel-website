# Wk1 campaign — Repair in Public (2026-07-06 → 07-12)

**Theme (July plan §7):** "We audited our own production sites with an agent swarm; here's the 668-broken-asset report and the fixes."
**Positioning line:** One operator, an AI Center of Excellence in a home office — watch us open the doors.
**Voice:** results first, precise, understated. No hype, no emoji, no fabricated numbers — every stat below is from the 2026-07-02 production audit.

## The one idea

Nothing was "down." Every page returned 200 and monitoring was green — yet the estate had 668 broken assets, silently dropped newsletter signups, and zero working paid checkouts. The failure layer lives between rendered HTML and reality, and an agent swarm browsing like a first-time visitor is what catches it.

## Calendar

Shifted +1 day on 2026-07-06: approval landed Monday evening, so Day 1 is Tue 7/7. Friday anchors (recap, LI-3, newsletter) hold. If posting starts a day later still, shift labels again — the sequence is what matters, not the dates.

| Day | Surface | Asset | File |
|---|---|---|---|
| Tue 7/7 | X | Teardown thread (9 posts) + screenshots | [x.md](x.md) |
| Tue 7/7 | LinkedIn | CoE-for-one audit essay | [linkedin.md](linkedin.md) LI-1 |
| Wed 7/8 | X | Daily receipt #1 | x.md |
| Wed 7/8 | IG | 8-slide carousel | [ig.md](ig.md) |
| Thu 7/9 | X + LinkedIn | Daily receipt #2 · "200 OK" essay (LI-2) | x.md / linkedin.md |
| Thu 7/9 | Shorts/Reels | Short #1 "668 broken assets" | [shorts.md](shorts.md) |
| Fri 7/10 | X (morning) | Daily receipt #3 | x.md |
| Fri 7/10 | X + LinkedIn (EOD) | Week recap · LI-3 | x.md / linkedin.md |
| Fri 7/10 | Newsletter | Signal Loop Wk1 section | [newsletter.md](newsletter.md) |
| Sat–Sun | Shorts/Reels | Short #2 "the form that lies" | shorts.md |

## Verified numbers (integrity gate — do not alter)

- 668 broken assets across the production estate (2026-07-02 swarm audit)
- 524 of them: stale `dpl=` deployment URLs in cached frankx.ai HTML (fixed by fresh deploy); ~26 genuinely missing images; 24 sitemap 404s (15 from one retired route)
- frankx.ai newsletter route silently dropped /links signups → fixed in prod PR #217
- arcanea: 111 broken internal links, dead Discord invite, signup writes to a missing `subscribers` table (emails accepted then discarded)
- Zero paid checkout paths worked at audit time
- /prompt-library rendered "1 patterns · 0.0/5" on the flagship free page
- Fix PRs shipped: frankx prod #217 #218, SIS #31, realityarchitect #2, arcanea link-fix PR

## Pre-flight (before anything posts)

1. [ ] Audit report page live at frankx.ai/research (all CTAs point there) — **blocker**
2. [ ] Newsletter welcome email verified in Resend (blocked on Frank, plan §8.4) — else soften newsletter CTA to "read on site"
3. [ ] Screenshots exported for thread receipts (audit report, PR #217 diff, broken-image grid)
4. [ ] @integrity-guard pass on final copy
5. [ ] Frank approves in this folder; posting stays manual (auto-distribute OFF)

Assets land in `assets/` (specs + generation prompts in [visuals.md](visuals.md)).
