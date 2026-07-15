# Social format playbook — July 2026

Research-distilled operating reference for the weekly content factory (July plan §7). Sources at bottom; numbers below are platform-research claims, not our own metrics — treat as directional, verify against our own analytics as they accrue.

## Format rankings (what to reach for first)

| Rank | Format | Why (2026 research) |
|---|---|---|
| 1 | Carousel (IG) / document post (LinkedIn) | Highest engagement on both platforms: IG carousels ~1.92% vs 0.50% reels; LinkedIn documents +39% reach, +30% engagement. Saves are the strongest algorithm signal on both. |
| 2 | Build-in-public post with real numbers | Founder posts documenting real revenue/decisions/mistakes are among the highest-engagement classes on LinkedIn; specific-number hooks outperform generic advice on X. |
| 3 | X thread (5–12 posts) + article link | Threads still work when each post stands alone; X now boosts external article links — publish the long-form on frankx.ai and let the thread point to it. |
| 4 | Short (30–60s), artifact on screen | One insight + one artifact (July plan rule). Hook inside 2 seconds, cold open on the number. |

## Hook formulas (write the hook as long as you write the body)

1. **Receipt hook:** real number + real timeframe + real surface. "We found 668 broken assets on our own sites."
2. **Contradiction hook:** healthy signal vs broken reality. "Nothing was down. Everything was broken."
3. **Confession hook:** the mistake, stated plainly, before the lesson. "Our newsletter dropped every signup for weeks."
4. **Partial-reveal cover (carousels):** bold 5–8 word headline + one surprising stat + arrow. Slide 1 carries ~80% of the weight; the swipe past slide 3 is the algorithm signal.

## Carousel construction rules

- 7–10 slides. One idea per slide, headline ≤ 8 words, body ≤ 30 words.
- S1 hook · S2 twist · S3–5 evidence · S6 pattern/lesson · S7 method · S8 save-CTA.
- Ask for the save explicitly on the last slide ("save this if you ship websites") — saves ≈ 5× the value of a like in 2026 ranking.
- Same visual system across all slides (one background family, one type scale) so the post reads as a single object.
- Post the identical deck to LinkedIn as a PDF document post — top format there, zero extra work.

## Engine → format routing (our stack)

| Asset | Engine | Notes |
|---|---|---|
| Slide/story backgrounds, technical heroes | NB2 `scripts/nb-generate.mjs` | Free; no baked text — type set in Canva |
| Photoreal / product / person-in-scene | Higgsfield GPT Image 2 (product-photoshoot skill) | |
| Carousel assembly, resize, editable type | Canva connector | Free plan today; brand kits + autofill need Pro — revisit after Wk2 metrics |
| Shorts from long-form | Higgsfield Shorts Studio / clipper, or Descript | Virality predictor pass before queue |
| Caption burn-in, title cards | HyperFrames | Deterministic, repo-versioned |
| UGC / talking head | Higgsfield Marketing Studio + Soul ID (once trained) | Only as clearly-Frank; no fake-customer testimonials — integrity gate |

## Weekly factory loop (Monday run)

1. Take the week's §7 theme → write campaign folder `content/social/<yyyy-mm-wkN-slug>/` (README, x, linkedin, ig, shorts, newsletter, visuals).
2. Generate backgrounds (NB2) → assemble type in Canva → export to `assets/final/`.
3. Cut shorts after the long-form exists; virality-predictor gate.
4. Everything sits in the campaign folder as the approval queue; Frank posts manually (auto-distribute OFF).
5. Friday: newsletter section + metrics recap; log what over/under-performed in this file's changelog.

## Metrics that matter (unchanged from §7)

Email list growth · Lounge members · waitlist depth · founding-member count · one real testimonial per week. Saves and profile visits as leading indicators. Vanity metrics out of scope.

## Sources

- [TrueFuture Media — Instagram Carousel Strategy 2026](https://www.truefuturemedia.com/articles/instagram-carousel-strategy-2026)
- [TryMyPost — Carousel Algorithm 2026](https://www.trymypost.com/blog/instagram-carousel-algorithm-2026-guide)
- [Carouselli — Carousel engagement benchmarks](https://carouselli.com/blog/instagram-carousel-engagement)
- [AuthoredUp — Best performing LinkedIn content 2026](https://authoredup.com/blog/best-performing-content-on-linkedin)
- [Sales & Marketing Engineers — LinkedIn posting guide 2026](https://www.salesandmarketingengineers.co.uk/the-ultimate-linkedin-posting-guide-for-2026)
- [Postr — X thread strategy 2026](https://www.postrsocial.com/integrations/twitter/thread-strategy)
- [Ship30for30 — thread hook examples](https://www.ship30for30.com/post/how-to-write-viral-twitter-thread-hooks-with-6-clear-examples)
- [DEV — X 2026 article-link shift](https://dev.to/tahseen_rahman/twitters-2026-algorithm-shift-why-your-articles-are-now-your-best-content-2f5h)
