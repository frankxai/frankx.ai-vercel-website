# Partner Portal Economics
**PRIVATE — Do Not Publish. Committed to this repo (`frankx.ai-vercel-website`) but not
rendered by any route — no page serves `docs/**`. Visible to anyone with repository read
access, which is broader than "just Frank," so treat it accordingly: real figures here,
never in anything that ships to a page.**
**Last Updated:** 2026-07-01

---

## Why this file is safe to be explicit

Root `CLAUDE.md` → "Production deployment" draws the sync line: `app/`, `components/`,
`content/`, `public/`, `lib/`, `data/`, `scripts/` go to production. `docs/` stays private.
This repo (`frankx.ai-vercel-website`) is itself the production repo, and its own `docs/`
folder is excluded from what a public visitor or search crawler can ever reach — there is
no route that serves `docs/**`. That's the guardrail this file relies on: real numbers here,
never in `content/portal/*.ts` (which only carries the qualitative `sharedUpside: string[]`
per `content/portal/types.ts`).

This doc extends `docs/strategy/AFFILIATE_MONETIZATION_STRATEGY.md` — that file is the
general affiliate/template monetization strategy for frankx.ai traffic at large (blueprint
pages, tutorial content, the Oracle non-compete list, the tool catalog in
`data/affiliate/programs.json`). This doc narrows to one specific case that strategy doesn't
cover: how FrankX profits when a *named friend/ally/partner's business* scales because of
something Frank personally built for them via `/portal/[slug]`. Read the other doc first —
this one assumes it.

---

## 1. The model

Today, the honest mechanism is **relationship investment with three theoretical monetization
paths, none of which are active yet**: (1) affiliate attribution — when a partner's stack
includes a tool from `data/affiliate/programs.json` that Frank actually recommends into their
build (e.g. ElevenLabs for Ana's audio content, Descript for Estefania's workshop
recordings), the existing affiliate link can be used and Frank earns the standard commission
— but this has not been deliberately wired into any of the four kits yet; (2) a private-repo
or template upsell path — the free starter kits (Ahmad's, Ana's, Jojo's) could graduate to a
paid/maintained version once a partner's team outgrows the static ZIP, mirroring the
Railway-template-kickback pattern in the affiliate strategy doc, but no partner has hit that
ceiling yet; (3) a paid retainer or consulting engagement once the free work proves value —
this is the most realistic near-term path and the one the Arrow/Kyndryl enterprise partner
pages already price explicitly (see §3). **None of the four ally relationships currently
generate revenue.** They are pre-revenue relationship-building, and the honest frame is
"build free, prove value, earn the right to a paid conversation later" — not "these are
funnels with a monetization plan in motion."

---

## 2. Per-partner economics table

| Partner | Slug / pages | What Frank actually built | Current monetization | Realistic next step | Relevant affiliate programs to recommend |
|---|---|---|---|---|---|
| **Estefania Badra / TheEpicWays** | `/allies/epic-ways`, `/friends/estefania`, `/downloads/epicways-intelligence` | Client-intelligence system spec: agent pack (Client Signal, Offer Architect, Workshop Designer, Room Memory, Impact Analyst, Content Repurposer), Codex/Claude skill pack, starter kit download | $0. No paid engagement, no tracked affiliate revenue. | If TheEpicWays adopts the workshop-designer + follow-up workflow and outgrows the free kit, a paid maintenance/coaching retainer (modeled on Arrow's "Innovation Retainer" shape, §3) is the natural next step — not yet proposed to her. | **Descript** (workshop recording → transcript → follow-up assets, 15%/12mo) and **Gamma** (proposal/deck generation for her offer ladder) are plausible fits if she's actually using them — verify before recommending. |
| **Ahmad Hashem / Trinity AI** | `/allies/trinity-ai`, `/friends/ahmad`, `/downloads/ahmad-founder-creator-kit` (shipped ZIP + checksum, v0.1.0) | Founder-creator OS: local AI lab spec (OpenClaw), agent swarm briefs, media engine, template library references, offer-lane document | $0. Kit is a free download; no affiliate links embedded in the kit content as of this writing. | Kit graduating to a maintained/updated paid tier once Trinity AI has a live product and needs ongoing system iteration (not a one-time ZIP) — parallels the Polar.sh template-sale model in the affiliate strategy doc. | If Ahmad's media engine uses video/content tools, **CapCut**, **HeyGen**, or **Opus Clip** (all active, recurring) are candidates — again, only if he's actually using them; don't force a recommendation that isn't real. |
| **Ana Cecilia Cancino** | `/allies/ana-cancino`, `/friends/ana`, `/downloads/ana-ai-business-kit` (shipped ZIP, v0.1.0) | AI business kit: 8-agent pack (Mirror Agent, Research Curator, Library Cartographer, etc.), offer ladder (clarity sessions → reflection circles → workshops → proposed HR/team work), delivery-loop template | $0. Free download; her own paid offers (clarity sessions, workshops) are entirely hers — FrankX takes no cut. | See Open Questions §5 — whether the kit itself should ever become a paid product is genuinely unresolved, not a near-term plan. | **ElevenLabs** (if she records guided reflections/audio) or **Descript** (session recordings → written aftercare letters) are the closest fits to her actual workflow — unverified whether she uses either today. |
| **Johannes "Jojo" Steingrüber / Harzfenster + Hotel Görtler** | `/allies/harzfenster`, `/friends/jojo`, `/downloads/jojo-hospitality-intelligence-kit` | 4-week pilot plan: booking-calm system, service briefings, hotel-connection bridge, aftercare/review drafting — explicitly scoped as a *pilot*, not a shipped system | $0. Described on-page as a proposed 4-week pilot; no commercial terms set, no engagement started as of this writing. | If the pilot runs and proves value, the stated ambition on `/allies/harzfenster` itself is to "package the pattern for other owner-led houses" — i.e., a future paid hospitality-intelligence product/workshop line (`/hospitality-intelligence` already exists as a placeholder surface for this). That's the real next step, and it's the most concretely scoped of the four. | None currently relevant — Jojo's stack (reservations, service prep) doesn't map cleanly to anything in `programs.json` yet. |

**Pattern across all four:** every kit was built and shipped for free, with no revenue
mechanism wired in. The "next step" column is aspirational, not scheduled. Where an affiliate
tool is listed, it is a *plausible fit worth verifying*, not a confirmed live recommendation —
do not represent any of these as active revenue lines until they're actually wired and true.

---

## 3. Enterprise partner economics (Arrow, Anthropic)

The enterprise tier already has real, explicit pricing postures documented — this section is
a pointer, not a re-derivation.

**Arrow Electronics ECS** — `content/partnerships/arrow.ts`, `programs[]` array (6 programs,
each with a `pricingPosture` field):
1. Coding-Agent AI CoE Foundation — fixed-price, milestone-paid, 3-month
2. Innovation Retainer — fixed monthly bundle, output-based, 12-month
3. Event-Led Visibility — day rate plus travel
4. Audience Funnel Partnership — **revenue share on tracked consumption, or quarterly flat fee**
5. Workshop-in-a-Box — license fee plus per-delivery support
6. Research Hub Co-Sponsorship — annual sponsorship

Status per the file: this is a *proposal*, not a live signed engagement (see `whatThisIsNot`
in `arrow.ts` — explicitly excludes "production implementation services," "hours-for-money,"
and framed throughout as "what I'd build if both sides see it").

**Kyndryl** — `content/partnerships/kyndryl.ts` follows the same `Partner` schema (see
`content/partnerships/types.ts`); same two-tier structure (Tier 1 working-reality / Tier 2
proposal with `programs[]` + `pricingPosture`). Not read in full for this doc — check that
file directly for Kyndryl-specific terms before quoting them.

**Anthropic** — no partner content file exists yet under `content/partnerships/` as of this
writing. Any Anthropic-specific commercial posture is TBD; do not assume Arrow's terms
transfer.

**The structural difference from the friend/ally tier:** Arrow and Kyndryl are enterprise
*proposals with priced programs* aimed at organizations with procurement budgets. Estefania,
Ahmad, Ana, and Jojo are individual relationships where FrankX is building for free, ahead of
any commercial ask — closer to "here's proof of what I can do" than "here's a priced SOW."
See Open Question §5 on whether the two tiers ever formally merge.

---

## 4. The public/private line

**Rule:** `/portal/[slug]` pages carry only qualitative "shared upside" language. Numbers,
percentages, split terms, and affiliate codes never appear there. This isn't just a style
preference — it's structurally enforced: `content/portal/types.ts` defines
`sharedUpside: string[]` as the only economics-adjacent field on `PortalPartner`, and per its
own doc-comment (lines 8-12) explicitly routes all real economics to this file. The
`CompoundingBand.tsx` component built alongside this schema only accepts qualitative strings,
never numeric props — there is no field to accidentally leak a dollar figure or percentage
into, by construction.

**Safe on a public `/portal/[slug]` page:**
- "We both win as this grows" / "this compounds for both of us" — qualitative framing only
- What Frank built (the agent pack, the kit contents, the workshop system) — the work itself
  is not confidential
- Public facts about the partner's business (MICHELIN listing, LinkedIn profile, company name)
  already sourced from public web pages, same as the existing `/allies/*` pages do today

**Never safe on a public `/portal/[slug]` page:**
- Dollar figures, revenue projections, or "this could be worth $X/mo" language — even
  aspirational ones (compare: the $630–$4,250/mo table in `AFFILIATE_MONETIZATION_STRATEGY.md`
  is explicitly marked private and must never migrate to a public page)
- Percentages — commission rates, revenue-share splits, any "%" tied to a specific partner
- Specific affiliate codes, tracking IDs, or `ourLink` URLs from `data/affiliate/programs.json`
  attributed to a named partner's recommended stack
- Arrow/Kyndryl-style `pricingPosture` language ("milestone-paid," "revenue share on tracked
  consumption") applied to a friend-tier relationship — even by analogy, since it implies a
  commercial arrangement that doesn't exist

**Why this matters beyond taste:** these are named individuals (Estefania, Ahmad, Ana, Jojo)
with public-facing businesses. Publishing speculative revenue numbers next to their name — even
framed as "shared upside" — risks (a) misrepresenting an unpaid relationship as a commercial
one without their consent, and (b) creating a public record of intent to monetize a friendship
that hasn't been discussed with them. The private/public split protects them as much as it
protects Frank's negotiating position.

---

## 5. Open questions

1. **Should any of the four kits (Ahmad, Ana, Jojo — Estefania's isn't yet packaged as a
   downloadable kit) ever become paid products?** No plan exists. If one does, Polar.sh
   (already set up per the affiliate strategy doc) is the obvious mechanism — but converting a
   kit built *for* a specific friend into a *sold* product raises a fairness question (does the
   named friend get free/lifetime access, get a cut, get co-credit?) that hasn't been thought
   through.
2. **Does Arrow's "revenue share on tracked consumption" model ever apply to a friend-tier
   relationship at scale?** E.g., if Jojo's hospitality-intelligence pilot succeeds and becomes
   the packaged `/hospitality-intelligence` product line referenced on his own page, does he
   get a revenue share as the original proof case, or does FrankX own it outright since Frank
   built it for free? Unresolved.
3. **Should affiliate links ever be embedded directly inside a partner's downloadable kit**
   (e.g. an ElevenLabs referral link inside Ana's kit README)? This blurs "I built this for you
   for free" with "I'm also monetizing your usage of it" — needs a clear internal policy before
   it happens once, since retrofitting consent after the fact is harder than deciding up front.
4. **At what point does relationship-building formally convert to a retainer conversation?**
   None of the four has a defined trigger (time elapsed, kit adoption depth, revenue the
   partner generates from using it). Arrow's proposal has explicit programs to point to when
   the moment comes; the friend tier does not.
5. **Do the friend/ally tier and the enterprise tier ever formally merge** — e.g., could Ana's
   "HR and Soul Work for teams" line (currently "proposed expansion only" per her page) become
   a licensed Workshop-in-a-Box arrangement structurally identical to Arrow's Program 5? If so,
   at what point does an individual relationship graduate into the priced-program schema used
   in `content/partnerships/types.ts`? No decision has been made.

---

*This document is private strategy. Do not publish, sync to a public route, or reference
dollar/percentage figures from it in any `content/portal/*.ts` file.*
