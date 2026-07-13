# FrankX × Ana collaboration experience

Date: 2026-07-14

Owner: Codex, isolated branch `agent/codex/frankx-ana-collaboration-20260714`

Primary reviewer: Frank
Required approval before indexing, launch, pricing, payment, identity, or external communication: Ana Cecilia Cancino

## Outcome

Replace the existing strategy-document pages with a small, usable collaboration experience that helps Ana and her four-person team answer three questions:

1. What is already available and safe to try?
2. What should the team pilot next?
3. Which larger ideas need Ana's explicit decision before Frank builds them?

The first product loop is: understand the proposal -> inspect the real workflow -> choose priorities -> send one consented response to Frank through the existing FrankX intake pipeline.

## Evidence base

- Frank and Ana's 2026-07-13 meeting notes in Google Drive: the recurring operational sequence is first call, kickoff, job description, offer, pricing approval, recruiting delivery, invoice, and handoff. Offer preparation can take 20–30 minutes and the process has been difficult to teach consistently.
- User update on 2026-07-14: Ana's team is now four people.
- `ana-ai-business-kit` main at version 1.0.0: installable Ana HR Operations plugin, eight named SOPs, private engagement-record contract, Google Docs copy-and-verify path, money and send gates.
- Current public LinkedIn crawl: Ana's profile lists Dasbanq; recent public posts identify her as HR Manager and credit her with leading a distributed-team roundup. The crawl does not provide a reliable post history, so the pages must not claim more.
- `anaceciliacancino.com` is connected to an existing Vercel project and has a live under-construction experience; `/work-with-me`, not `/offers`, is the current offer route.
- `anacancino.com` is a Squarespace coming-soon page.
- `cecilia.chat` currently returns a Vercel deployment-not-found response. It is a reserved possibility, not a live product.
- Existing FrankX `/api/intake` already validates, rate-limits, obtains consent, notifies Frank, and can record the response in Notion/Slack. Reuse it; do not create a parallel notification path.

## Claims and privacy boundary

- Do not repeat the unverified "two decades in HR" biography claim from the draft Ana site.
- Do not publish client names, candidate data, CVs, pricing, invoices, private template URLs, team member identities, or meeting transcripts.
- Do not describe AI as making hiring, pricing, invoice, or send decisions.
- Do not claim neuroscience, psychology, legal, medical, or employment outcomes without Ana-approved credentials and substantiation.
- Do not publish the email address supplied in chat until Ana confirms the spelling and intended public use.
- A noindex page is still publicly reachable. Only public-safe facts and proposal language belong on it.

## Status language

Every meaningful item uses one of these labels:

- **Available now** — shipped, inspectable, and safe to try on copies.
- **Pilot recommended** — bounded next step; not yet proven with Ana's team.
- **Proposal for Ana** — a direction Frank recommends; Ana has not approved it.
- **Needs Ana's decision** — identity, commercial, data, or launch choice that cannot be inferred.
- **Later** — intentionally outside the first operating pilot.

Avoid "live," "approved," "our product," "revenue engine," or "autonomous" unless the underlying fact is verified.

## Information architecture

### `/friends/ana`

Purpose: a warm, concise introduction to Ana's public work and the collaboration.

First read: **Ana already built the method. Now her team should be able to run it with her.**

Sections:

1. Human introduction and verified public profile links.
2. Three things Frank sees in her work: structured recruiting, distributed-team leadership, and human judgment.
3. What has changed: a four-person team and a need to make the process teachable.
4. Clear routes to the team plan, Ana's current website, LinkedIn, and the HR Operations start page.
5. Review boundary: noindex until Ana approves public wording.

### `/allies/ana-cancino`

Purpose: the practical operating proposal for Ana and her team.

First read: **Your method, made easy for the team to run.**

Sections:

1. Status board: plugin available, copied rehearsal recommended, portal and paid product proposed.
2. Interactive stage explorer for the exact HR workflow.
3. Responsibility split: team prepares, AI organizes and checks, Ana/client decide.
4. A 30-day pilot with copied material before live work.
5. Future workspace architecture: team control board, private source systems, client-facing outputs, research library.
6. Decision form that sends selected priorities and comments through `/api/intake`.

### `/alliance/cecilia`

Purpose: an approval-first decision room for the working name, `cecilia.chat`, the client AI guide, and possible commercial models.

First read: **Cecilia is a working name, not a launched brand.**

Sections:

1. What Cecilia could be: team-shared front door, product name, or a name Ana declines.
2. Three layers: free guide, paid client support, private team workspace.
3. Explicit exclusions: Cecilia does not assess or select candidates, provide therapy or legal advice, make hiring decisions, or store private client data on a public page.
4. Commercial choices described without public percentages: Ana-majority revenue share; fixed build/maintenance; or measured pilot before monetization.
5. Preconditions for payments: agreement, net-revenue definition, ownership, support, privacy/DPA, refunds, tax/MoR, stop conditions.
6. Decision form for identity, pilot, and commercial priorities.

### `/downloads/ana-ai-business-kit`

Purpose: replace the obsolete v0.1 ZIP-first page with the current v1 install path.

First read: **Start with the workflow, not GitHub.**

Primary action: open the maintained GitHub start guide or copy the three install commands.

Secondary action: open the team plan.
Legacy ZIP: clearly labeled as an earlier archive, not the recommended HR system.

### `/portal/ana`

Purpose: noindex preview of the future shared team workspace using accurate HR modules and project status. It must not imply that a private client portal or data integrations are already active.

## Workflow model

The visual and page copy use the plugin's real sequence:

```text
Daily control board
      |
First client call -> approved kickoff
                          |             \
                          v              v
                 job description    service offer
                          |              |
                          v              v
                 recruiting delivery  invoice draft
                          \              /
                           approved handoff
```

At every stage the system exposes: complete facts, missing decisions, owner, due date, approvals, and the next human action.

## Responsibility model

| Work | Team | AI | Ana / client |
| --- | --- | --- | --- |
| Capture source facts | Owns | Structures | Confirms accuracy |
| Draft role/offer documents | Contributes | Drafts and checks | Approves wording and scope |
| Candidate evidence | Stores in approved ATS | May organize job-relevant evidence | Makes accountable decision |
| Price and invoice | Supplies approved source | Calculates and flags gaps | Approves every amount |
| External handoff | Prepares recipient/channel | Creates draft only | Gives fresh send approval |

## Visual direction and scene brief

Creative thesis: **Warm operational clarity.** Ana's practice should feel human, careful, and mature; the system should feel exact without becoming a developer dashboard.

Composition:

- Obsidian/espresso canvas, parchment text, restrained bronze and forest signals.
- Editorial display type for the human promise; clear sans-serif for operating details.
- One Tier C code-rendered workflow as the hero proof. It is exact, inspectable, responsive, and does not expose private records.
- No portrait is used until Ana supplies or approves one. The draft site's placeholder illustration is not treated as a real portrait.
- No generic orbit, agent swarm, neural network, generated dashboard, glass-card wall, or decorative 3D.
- Cards are used only for true objects: stage, status, decision, responsibility, or artifact.

Signature interaction: selecting a workflow stage updates the stage purpose, owner, required approval, and safe AI role. It works with keyboard, touch, reduced motion, and without animation.

Motion track: A. Native CSS transitions and a small Framer Motion entrance only where it improves orientation. No GSAP, WebGL, autoplay, or sound.

Static-first rule: hierarchy, labels, paths, and submission work without animation. Reduced motion receives the complete final state.

## Decision form contract

- Posts only to the existing `/api/intake` endpoint with `intent: partnership`.
- Required: name, email, one decision, consent.
- Optional: selected priorities and comments.
- Hidden honeypot preserved.
- Message contains the proposal identifier, decision, priorities, and comment; source contains the current path.
- Warning: do not include client, employee, or candidate data.
- Sending a response is not approval to purchase, launch, index, use Ana's name, or process client data.
- Success state states only what the endpoint confirms.

## Thirty-day pilot

1. **Week 1 — map and configure:** confirm team responsibilities, approved template sources, private record location, candidate-tracker rules, and current price source.
2. **Week 2 — copied rehearsal:** run a past case with private details removed, or a made-up practice case, without editing master documents or sending anything.
3. **Week 3 — one controlled live engagement:** use only approved data and stop at every Ana/client gate.
4. **Week 4 — review:** keep what saved time, remove what the team did not use, and decide whether to build the portal or Cecilia pilot.

## Sequential design council record

Machine posture held new swarms, so council roles were executed sequentially.

- Creative director: rejected the current "freedom engine" and broad spiritual-business framing; selected one human promise and one exact workflow proof.
- Brand designer: retained FrankX technical luxury but warmed the palette; avoided cloning Ana's sanctuary site.
- Product designer: made the response form and stage explorer the page's product loop.
- Motion designer: selected Track A and static-first behavior.
- Frontend architect: reuses the existing intake endpoint and keeps page-specific logic in Ana-scoped components/data.
- Accessibility reviewer: requires native buttons, visible focus, 44px targets, field labels, live status, reduced motion, and mobile-first sequence.
- Taste critic: rejects invented credentials, agent names, fake revenue certainty, and repeating card grids.

## Release gates

- Scoped type-check and lint.
- Contract test for noindex, status vocabulary, live links, safe intake route, and prohibited language.
- Static internal-link check.
- Desktop, tablet, and mobile visual inspection.
- Keyboard and reduced-motion check.
- 30-point visual score; ship threshold 26.
- Vercel preview verification before any production promotion.
- Ana approval before indexing, identity changes, `cecilia.chat` launch, payment setup, or public claims.

## Deferred to bounded follow-up work

- Rewrite and verify the separate Ana website biography, offers, and research architecture.
- Decide whether `anacancino.com` remains invoicing/operations, redirects, or becomes a company site.
- Create the private team portal with authentication, role-based access, and approved data processors.
- Draft the legal/commercial agreement and revenue-share definitions with qualified review.
- Implement Lemon Squeezy, Polar, Stripe, DNS, support, refunds, or tax/MoR only after approval.
- Build a privacy-reviewed Cecilia prototype with made-up example content before connecting the domain.
