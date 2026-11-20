# FrankX Amsterdam

Draft implementation and decision record · 20 November 2026

## What existed

Vercel production at audit was READY on `8efcf5de86c57ee7952c9c1aa1f03a4f0d9eecf1` ([production receipt](https://vercel.com/starlight-intelligence/frankx-ai-vercel-website/GeFUCAsXTkbkNHgA7fF76DbC8aMK)). The apex redirects to `www.frankx.ai`. The university programmes, six-minute source check, workshop studio, founder workspace guide and community page returned 200. `/university` redirected to the university programmes. `/amsterdam`, `/amsterdam/university` and `/events` returned 404.

[University booking and campus proposal #1281](https://github.com/frankxai/frankx.ai-vercel-website/pull/1281) supplied the public seven-format experience and an unlisted recipient proposal. [University Commons #1274](https://github.com/frankxai/frankx.ai-vercel-website/pull/1274) is a separate open draft learning catalogue with merge conflicts at the time of review. The Community Hub and Studio Editions exist as distinct Vercel projects with deployment-host domains. Neither is needed to deliver this editorial slice.

REC Impact publishes routes for [working with students and researchers](https://recimpact.uva.nl/voor-partners/voor-partners.html). [AI4Business Lab](https://ai4business.uva.nl/about-ai4business-lab) has a separate institution-owned process. The FrankX university page advertises independently commissionable programmes. Institutional correspondence and recipient material belong in the existing restricted relationship workspace.

## Decision

The reader is a lecturer, founder or researcher deciding whether this work is worth trying or bringing into a room. The first proof is a real case they can do without an account. The next action is a conversation scoped around one classroom or workflow decision.

| Surface | Job and owner |
| --- | --- |
| `/amsterdam` | FrankX city entry. Teaching first, then source-linked past gatherings, field notes, one project and founder workshops. |
| `/partnerships/universities` | FrankX programme briefs, fees, and existing inquiry delivery. The `via=amsterdam` marker carries attribution into this path. |
| `/partnerships/universities/source-check` | Existing interactive teaching case and offline kit. |
| `/ecosystems/amsterdam` | Existing workspace and community guide. Its dedicated canonical serves discovery intent. A reciprocal link leads to the city page. |
| `/amsterdam#gatherings` and `/amsterdam#fieldwork` | Compact views. Current evidence supports a dated past event and selected work. A dedicated events route needs a maintained, consent-safe public feed and enough dated events to justify it. |
| `/amsterdam/university`, `/amsterdam/events`, `/amsterdam/projects`, `/events` | No route in this edition. Add a redirect only when a real inbound link or route migration warrants it. |
| `/blog/what-an-ai-demo-should-leave-behind` | Standard future article slug. Preview uses the existing MDX renderer and a route-specific editorial layout. Draft copy stays outside the public repository. The protected review branch reads it from a Preview-only environment variable and serves noindex, nofollow. |
| Partner proposal, correspondence and approvals | Private Partner Operations record. Keep recipient proposal links, personal contacts, dates under negotiation and commercial terms outside this public edition. |

FrankX owns the page, editorial work, teaching offer and inquiries. Starlight Intelligence owns system implementation and applied architecture. GenCreator owns creator production tools and its own workshops. Arcanea owns stories, music and creative experiences. Agentic Income owns entrepreneurship and operating methods. AI Architect Academy owns structured technical learning when a course is ready. A documented activity earns a contextual link from Amsterdam. The landing ships a systems link to Starlight. The other brands retain their own discovery surfaces.

For the article release, place the approved MDX into the public blog corpus, set the actual publication date, carry over photo credit into the public article, and retire the temporary draft path logic and branch-scoped Preview environment variable. Add the permanent Amsterdam article link in that reviewed change. Normal blog infrastructure handles schema, index, sitemap and RSS after approval.

## Art direction

The three directions considered were a documentary spread, a classroom-first case page and a city field index. The spread gives Amsterdam a recognisable place and makes the teaching decision legible in the same viewport. A classroom-first layout would repeat the job of the existing programme page. A dense city index fits the older founder workspace guide.

Use the FrankX Poppins, Inter and JetBrains Mono roles. The existing campus page establishes the dark teal ground and pale mint actions. The city treatment uses quiet rules, tightly set headings and visible photographic credits. The campus page keeps its distinct teaching illustration. Use the asymmetrical spread to give the photograph room on desktop and a separately proportioned panel on mobile. The field note narrows the reading measure and uses a different waterfront image. Both new reading surfaces use the existing compact music control so it leaves the viewport available for the page. No authored animation. Anchors move at the browser’s default speed and focus stays visible.

References consulted include the Starlight Identity Foundations material board, FrankX partner and education deck, FrankX design and taste documents, the Visual Studio registry, [Nieuwe Instituut](https://nieuweinstituut.nl/en), [Canadian Centre for Architecture](https://www.cca.qc.ca/en/) and [Failed Architecture](https://failedarchitecture.com/). The transferable decisions are clear article credits, a readable distinction between collections and articles, and modest navigation chrome.

## Asset and editorial custody

[Amsterdam asset inventory](./amsterdam-assets.md) records sources, preview files, people, rights and publication status. VIS remains the asset identity and approvals authority. The web repo holds two optimised derivatives and credits. The public imagery came from the named photographer’s CC0 originals. The licensed city images sit apart from programme photography. The founder’s existing Oracle speaking image stays in its existing context and the campus storyboard remains illustration.

Use the approved section of the FrankX Voice OS. The article keeps the founder’s own interpretation of the X separate from two sourced observations about publishing. The meetup programme establishes a timed build. The distinct UvA case provides an attributable example of research-to-practice. The new article claims no pilot result or institutional relationship. The founder reviews the first-person account before release.

## Search map

Semrush Netherlands snapshot on 20 November. Counts are modeled monthly estimates. The SERP sample included workshop schedules and corporate training, institution pages and local community listings. Vercel Analytics returned no accessible project report and GSC Wizard required an active subscription. Validate page and query baselines once first-party reporting is available.

| Intent | Evidence | Owner |
| --- | --- | --- |
| FrankX Amsterdam / Frank Riemer Amsterdam | Branded orientation and referral intent. No measured volume used. | `/amsterdam` |
| AI workshops and training in Amsterdam | Semrush NL: “ai workshop amsterdam” 40, “ai training amsterdam” 140, “ai cursus amsterdam” 70. Competitors emphasize schedules, attendee price and hands-on scope. | `/workshops` owns format and inquiry. Land local visitors via `/amsterdam` without claiming a scheduled class. |
| Practical AI for founders | Semrush NL: “ai for founders” 10. Commercial and informational results vary by query. | Existing workshop and builder guides. The field note answers the handoff question. |
| University and startup applied AI | Semrush returned no data for “university startup collaboration amsterdam” and “applied ai research amsterdam”. REC Impact and AI4Business supply institutional intent. | `/partnerships/universities` owns FrankX host intent. Institution pages own participation terms. |
| Amsterdam founders and workspaces | Workspace selection and local discovery have their own existing guide. | `/ecosystems/amsterdam` |
| AI workflow handoff and source checks | Informational reader job. Measure impressions and engagement post-release before expanding the cluster. | Draft article and existing source-check case. |

## Measurement and follow-up

Measure `amsterdam_action` with a stable destination for the teaching case, workshop catalogue or university inquiry. The existing form writes the approved Amsterdam referral to the intake source. `university_inquiry_accepted` carries an `entry=amsterdam` property only after the API confirms acceptance. No form text or contact data becomes an analytics dimension. The site’s DNT and GPC rules still apply.

Count qualified leads in the existing operations workflow. A university lead needs a named programme owner, learner group, proposed outcome and a next review. A founder or enterprise workshop progresses when a payer owns the brief, a cohort and scope are set, and delivery can be priced. Track one accepted brief, one follow-up decision and, when earned, a paid booking from the existing workshop process. Sponsors, research agreements and event partnerships stay ops-side until their owners agree terms and public wording. Product referrals remain clicks until an owning product can verify adoption.

## First sprint

| Day | Owner | Dependency and acceptance |
| --- | --- | --- |
| 1 · Monday 23 Nov | Website Engineering | Rebase only this draft if main advances. The protected preview serves Amsterdam, the draft and enquiry handoff. Existing canonicals resolve. |
| 2 · Tuesday 24 Nov | FrankX Editorial and Design | Frank reads the first-person account. A separate reviewer checks historical attribution, photo roles, reduced motion, contrast, and mobile and tablet layouts. Keep signed review receipts. |
| 3 · Wednesday 25 Nov | University Partnerships | Review the existing recipient package and agreement privately. Confirm what can be named, who supervises a pilot, and which data and IP terms apply. Keep the public copy generic until confirmed. |
| 4 · Thursday 26 Nov | Acquisition and Workshop Operations | Review mock form traces and the intake tagging, agree a qualified-lead definition, and confirm reporting access. Validate at least one visitor per primary audience can find the correct next action in the preview. |
| 5 · Friday 27 Nov | Frank plus release verifier | Accept, return for revision or hold the draft. Record reviewed head, check results, image rights and exactly which article or site change is approved. Production release needs a separate approval. |

The editorial backlog starts with verification and advances with evidence.

- P0. Complete independent editorial and accessible browser review. Verify intake delivery with an approved internal test.
- P1. Report the rooftop forecast case once [#1291](https://github.com/frankxai/frankx.ai-vercel-website/issues/1291) has a reproducible protocol.
- P1. Make a second teaching field note after a peer reruns the source-check case.
- P2. Commission a maker profile at NDSM after a consented interview and credited shoot.

A dated, hosted local workshop can earn its own published listing when the offer and logistics are confirmed.

GitHub owns changes. [University operations #263](https://github.com/frankxai/agentic-ops/issues/263) owns the institutional work. [Experience operations #598](https://github.com/frankxai/agentic-ops/issues/598) owns venue and event dependencies. The existing FrankX planning view and editorial calendar retain status and review dates. No new tracking database.

## Done means

A visitor can navigate and read the landing, draft article and existing university handoff at 390, 768 and 1440px. The teaching case and host options work with the keyboard. Photos load at the intended responsive dimensions and carry proper credit. The draft stays out of production lists and indexing. The intended preview commit and its inspection receipt are linked from the draft PR. Only after founder approval, independent sign-off, production checks and a rollback receipt can the work be called released.
