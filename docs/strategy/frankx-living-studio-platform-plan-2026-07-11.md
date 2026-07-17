# FrankX Living Studio Platform Plan

Date: 2026-07-11
Horizon: 12 months
North star: a public legacy engine that compounds trust, usefulness, creative freedom, and ethical revenue

## Executive Thesis

FrankX should not compete as another AI consultancy, creator storefront, music profile, personal blog,
or link hub. Its advantage is the combination no template can fake:

- a real person with a long technical and creative practice;
- a growing body of music, systems, books, visual work, and field notes;
- public evidence and reusable tools;
- a network of specialized brands and worlds;
- an explicit desire to leave better maps for friends, family, and future builders.

The product is not merely the content. The product is **access to a living body of work, organized so
another person can feel something, understand something, build something, or invest in a useful next
capability**.

Revenue is necessary, but it should appear as a continuation of contribution rather than an
advertising interruption. FrankX earns the sale by helping the visitor make a better decision first.

## Category Position

**FrankX is a living studio and mind palace for music, agent systems, and the design of a deliberate
life.**

Supporting definition:

> Frank builds to understand the future, documents the experiments, and leaves the maps, tools, and
> songs open for people he cares about and anyone ready to build their own next chapter.

This position can hold the whole estate without pretending every property belongs on one page.
FrankX is the founder-level front door; specialized products should own specialized next steps.

## July 2026 Experience Point Of View

Current premium web practice rewards spatial storytelling, responsive choreography, and real media,
but spectacular interaction alone is no longer differentiating. Lusion's current studio presentation
demonstrates the expressive ceiling of interactive 3D brand worlds; FrankX should borrow the courage
to create a world, not the visual skin or the cost of constant spectacle. Source: [Lusion](https://lusion.co/).

The implementation standard is intentionally narrower:

- one memorable interaction that clarifies a relationship;
- strong still frames before motion;
- native scrolling and semantic navigation;
- static mobile and reduced-motion states designed as first-class compositions;
- real music, writing, repositories, captures, and artifacts instead of fake product scenes;
- fast server-rendered content with small client-motion islands.

GSAP ScrollTrigger is reserved for authored sequences with lifecycle cleanup and responsive routing;
`gsap.matchMedia()` owns breakpoint and reduced-motion variants. Sources:
[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/),
[gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/).

Next.js remains server-first. Media routes use the current Image component contract and production
checklist rather than shipping raw, unbounded assets. Sources:
[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image),
[Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist).

Suno is a living production platform, so FrankX should expose a reviewed release manifest rather than
hard-code claims about a fixed tool. Suno's release notes are a useful source for current capability;
its own commercial-use guidance also makes clear that subscription rights and copyright protection
are not the same claim. Sources: [Suno release notes](https://suno.com/release-notes),
[Suno commercial-use guidance](https://help.suno.com/en/articles/9601665).

## The Three-Layer Estate

### 1. Public Living Archive

Indexed, shareable, and emotionally generous:

- homepage and mind-palace routes;
- reviewed music releases and archive;
- essays, field notes, experiments, books, and public reflections;
- inspectable systems, repositories, prompts, and learning pathways;
- a carefully curated proof river from approved brand and social sources;
- product pages with clear scope, price, audience, and limits.

### 2. Participant And Customer Spaces

Authenticated only when the product requires continuity:

- purchased downloads and updates;
- cohort or academy workspaces;
- private implementation notes and progress;
- saved learning paths and personal artifacts;
- community invitations with explicit norms and privacy boundaries.

Do not create an account wall for public work that functions better as an open page or download.

### 3. Private Operator Palace

Never indexed and never mixed into public page data:

- content and release approval board;
- product health, conversion, refunds, and activation;
- inspiration and research boards;
- private family or life reflections;
- estate routes, domains, repositories, and deployment truth;
- Queen jobs, agent receipts, blockers, and decision logs.

Prefer the existing authenticated Observatory `/ops` control plane and link into repo-specific private
views. Do not create a second unsecured admin surface merely because the public metaphor is a mind
palace.

## Public Information Architecture

```text
FrankX /
├── Listen      /music
│   ├── reviewed release
│   ├── catalog and playlists
│   ├── production field notes
│   └── Vibe OS / music learning
├── Learn       /learn
│   ├── AI and agent pathways
│   ├── creator systems
│   ├── books and library
│   └── deliberate-life practices
├── Build       /acos
│   ├── open repositories
│   ├── skills, prompts, and workflows
│   ├── implementation guides
│   └── premium acceleration paths
├── Reflect     /soulbook
│   ├── questions and essays
│   ├── recovery and attention
│   └── private-safe journaling tools
├── Acquire     /products
│   ├── downloads
│   ├── kits and systems
│   ├── programs or cohorts
│   └── bounded high-proximity access
└── Explore     /ecosystem
    ├── specialized brands
    ├── worlds and labs
    ├── GitHub and public systems
    └── current dispatches
```

## Journey And Funnel Design

### Listen Journey

Music player → music archive → studio note or playlist → optional studio letter → Vibe OS or a
music-production tool when relevant.

Rules: no purchase modal over playback, no autoplay, no false weekly label, no rights ambiguity.

### Learn Journey

Intent or topic → one curated pathway → useful field guide → downloadable map → paid toolkit or
structured program only when the visitor needs implementation depth.

Rules: teach the governing idea before gating the template; make time, prerequisites, and limits clear.

### Build Journey

Inspectable repository or system → quick-start guide → working first artifact → implementation pack,
cohort, or bounded architecture support.

Rules: open proof first; do not sell access to claims the visitor cannot inspect.

### Reflect Journey

Question, essay, or book → private reflection prompt → optional Soulbook artifact → gentle follow-up.

Rules: no medical promise, urgency, public-by-default journal, or emotional vulnerability used as a
sales trigger.

### Founder And Team Journey

Architecture field note → blueprint or decision diagnostic → bounded application → mutual-fit call →
smallest consequential workflow.

Rules: exclusivity means fit and attention, not theatrical scarcity. Scope and decision rights are
agreed before work begins.

## Ethical Offer Ladder

| Layer | Visitor promise | Example form | Commercial rule |
| --- | --- | --- | --- |
| Open proof | understand the work | music, essays, repos, field guides | useful without signup |
| Orientation | choose the next move | quiz, map, starter guide, newsletter | minimal data collection |
| Capability | implement faster | download, template pack, prompt system | exact contents and license |
| Transformation | practice with structure | cohort, academy, guided system | time, support, and limits explicit |
| Proximity | solve a consequential problem | architecture sprint or private access | application and mutual fit |

The current product catalog and prices require a dedicated integrity audit before the homepage makes
new promises. Do not invent a new tier, discount, guarantee, demand signal, or scarcity mechanism in
design copy.

## Content And Release Engine

Every candidate enters one registry with:

- brand operating unit;
- content or asset type;
- source and provenance;
- public/private classification;
- rights and persona state;
- canonical URL;
- derivative formats;
- approval state;
- release date and refresh date;
- owner and evidence paths.

Flow:

```text
source → classify → privacy/IP gate → curate → transform → inspect → human approve → publish → verify → learn
```

The website consumes only approved records. Social feeds and raw scrapers can suggest candidates but
cannot become homepage truth by themselves.

## Sustainable Editorial Rhythm

This is a suggested operating rhythm, not an obligation for Frank to become a content machine:

- Monday: one discovery or experiment worth documenting;
- Tuesday: one build note, repo artifact, or learning-path improvement;
- Thursday: paused weekly music candidate review; Frank decides whether anything ships;
- Friday: optional studio letter combining one song, one idea, and one useful tool;
- monthly: refresh the mind-palace route order from evidence and archive stale claims;
- quarterly: offer integrity, estate route, and visual quality review.

The system should make absence graceful. If Frank creates nothing public in a week, the site remains a
valuable archive rather than manufacturing activity.

## Measurement That Respects People

Primary signals:

- route-selection rate by intent;
- repeat visits and return path;
- completion depth on music, learning, and build journeys;
- newsletter confirmation and later engagement;
- free-tool activation, not only download count;
- product activation, support burden, refund reasons, and completion;
- qualified applications and mutual-fit acceptance;
- broken-route, stale-release, and unsupported-claim rate.

Avoid optimizing the site around raw page views, forced signup rate, or time-on-page without knowing
whether the visitor found what they needed.

## Technical Platform Direction

- Next.js App Router, server components by default, small client islands for interaction.
- Typed registries for releases, products, routes, and approved feed items.
- One canonical social/domain/repository registry; no hand-copied links in page components.
- Vercel preview as release truth after local fast gates; production promotion remains human-gated.
- Contract tests for music-first entry, route ownership, reviewed-release source, and privacy boundaries.
- Privacy-conscious analytics events for intent selection, content depth, and product activation.
- Feature flags for experimental feed, video-card, 3D, and member surfaces.
- Native scroll; one Track B GSAP scene per flagship page by default.
- No client-side aggregation of secrets, private feeds, or unreviewed social data.

## Work Program

### Phase 0 — Stabilize The Front Door

Status: implemented locally; build and preview evidence pending.

- restore music-led homepage;
- humanize the positioning;
- add mind-palace intent map;
- establish reviewed featured-release source;
- add anti-regression merge contract.

### Phase 1 — Route And Claim Integrity

- estate-wide hub, subdomain, repository, social, and newsletter map;
- current route and redirect verification;
- unsupported count, outcome, price, and rights claim audit;
- canonical owner and destination for each homepage action.

### Phase 2 — Living Proof Registry

- normalized approved content/release schema;
- source-cited proof river prototype;
- music, essays, GitHub, and selected brand adapters;
- privacy veil, empty states, and stale-source behavior.

### Phase 3 — Offer And Learning Architecture

- map every product to an intent, prerequisite, outcome, and next step;
- consolidate duplicate downloads and promises;
- create free-to-paid learning paths without hiding core understanding;
- instrument activation, support burden, and refund reasons.

### Phase 4 — Premium Media And Motion

- one real-media video-card scene in the design lab;
- source and rights registry;
- mobile, reduced-motion, and static poster routes;
- promote only after 26/30 visual and 45/55 motion scores.

### Phase 5 — Participant And Private Palace

- decide which paid journeys need accounts;
- connect purchased artifacts and progress safely;
- link authenticated operator views to Observatory;
- keep private life, family, customer, and agent state out of public bundles.

## CEO Decisions Reserved For Frank

- which music release represents the current studio chapter;
- what remains family/private versus public legacy;
- which offers deserve ongoing support;
- pricing, guarantees, discounts, cohorts, and availability;
- public social and newsletter sends;
- partner, customer, legal, IP, domain, and production actions;
- whether high-proximity work opens, and for whom.

## Immediate Next Review

The next review should not ask “does it look impressive?” It should answer:

1. Does the first viewport feel unmistakably like Frank?
2. Can a visitor who is sad, curious, ambitious, technical, or ready to buy each find a respectful path?
3. Is every visible claim inspectable?
4. Does motion make the breadth easier to understand?
5. Can the page survive a quiet week without pretending something new shipped?
6. Does every paid route explain why the next investment is useful?
