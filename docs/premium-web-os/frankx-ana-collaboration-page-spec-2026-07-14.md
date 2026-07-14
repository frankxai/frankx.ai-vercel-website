# FrankX × Ana collaboration experience

Date: 2026-07-14

Owner: Codex, integration branch `codex/frankx-ana-production-20260714`

Primary reviewer: Frank
Required approval before indexing, launch, pricing, payment, identity, or external communication: Ana Cecilia Cancino

## Outcome

Create a small, usable collaboration experience that helps Ana and her team answer three questions:

1. Which part of the existing client journey becomes easier first?
2. What is the safest useful way to try it together?
3. Which larger ideas are worth a conversation, and which should wait?

The first product loop is: understand the practical promise -> inspect the real client path -> choose what would be useful next -> send one consented response to Frank through the existing FrankX intake pipeline.

## Audience and language brief

- **Primary audience:** Ana, an experienced founder and people operator who also creates retreats and protects time for her family; her team are capable HR and recruiting practitioners, not software trainees.
- **Session job:** understand the proposal quickly, see how it respects the way the team already works, and decide whether one bounded working trial deserves a conversation.
- **First win:** everyone can point to the same stage, owner, approved source, open decision, and next action without changing the tools they trust.
- **Words the audience uses:** client journey, ownership, handoff, approved template, open decision, next action, private records, working trial, client experience.
- **Internal words to keep backstage:** agentic, swarm, operating-system install, architecture, plugin, skill, control plane, adoption, technical-readiness framing, and team-training language.
- **Never frame as a deficiency:** team size, GitHub familiarity, Ana's memory, or the need to “learn our system.” The team already knows the work; the product reduces coordination effort around it.
- **Emotional posture:** respected and curious before; clear, in control, and free to say yes, change it, or not now afterward.
- **Primary CTA:** review the client path. Technical setup is secondary and written for Frank or a technical helper.

## Evidence base

- Frank and Ana's 2026-07-13 meeting notes in Google Drive: the recurring operational sequence is first call, kickoff, job description, offer, pricing approval, recruiting delivery, invoice, and handoff. Offer preparation can take 20–30 minutes and the process has been difficult to teach consistently.
- User update on 2026-07-14: Ana leads an established team. This is context for ownership and handoffs, never a problem statement or sophistication signal.
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
- A noindex page is still publicly reachable. Only publication-ready facts and proposal language belong on it.

## Status language

Every meaningful item uses one of these labels:

- **Available now** — shipped, inspectable, and safe to try on copies.
- **Suggested starting point** — a bounded next step offered for discussion, not prescribed to the team.
- **For discussion** — an idea Frank has prepared; Ana has not approved it.
- **Ana decides** — an identity, commercial, data, or launch choice that cannot be inferred.
- **Only if useful** — intentionally outside the first working trial.

Avoid "live," "approved," "our product," "revenue engine," or "autonomous" unless the underlying fact is verified.

## Information architecture

### `/friends/ana`

Purpose: a warm, concise introduction to Ana's public work and the collaboration.

First read: **Ana built the method. This makes the handoffs lighter.**

Sections:

1. Human introduction and verified public profile links.
2. Three things Frank sees in her work: structured recruiting, distributed-team leadership, and human judgment.
3. What becomes easier: shared ownership, visible decisions, and safer handoffs across the team.
4. Clear routes to the team plan, Ana's current website, LinkedIn, and the HR Operations start page.
5. Review boundary: noindex until Ana approves public wording.

### `/allies/ana-cancino`

Purpose: the practical operating proposal for Ana and her team.

First read: **One clear client path, shaped around the way your team already works.**

Sections:

1. Status board: current workflow available, a privacy-safe practice case suggested, larger product ideas separated from the first trial.
2. Interactive stage explorer for the exact HR workflow.
3. Responsibility split: the team owns the client work, AI supports preparation, Ana/client retain consequential decisions.
4. A focused 30-day working trial that starts with a privacy-safe practice case.
5. Optional shared-workspace concept: one calm view across existing source systems and client-ready outputs.
6. Decision form that sends selected priorities and comments through `/api/intake`.

### `/alliance/cecilia`

Purpose: a decision room for the working name, `cecilia.chat`, a possible client companion, and possible commercial models.

First read: **A client-facing companion for Ana's expertise—only if it earns a role.**

Sections:

1. What Cecilia could be: a product beneath Ana's existing identity, a shared team brand, or an idea Ana declines.
2. Three layers: free guide, paid client support, private team workspace.
3. Explicit exclusions: Cecilia does not assess or select candidates, provide therapy or legal advice, make hiring decisions, or store private client data on a public page.
4. Commercial choices described without public percentages: Ana-majority revenue share; fixed build/maintenance; or measured pilot before monetization.
5. Preconditions for payments: agreement, net-revenue definition, ownership, support, privacy/DPA, refunds, tax/MoR, stop conditions.
6. Decision form for identity, pilot, and commercial priorities.

### `/downloads/ana-ai-business-kit`

Purpose: replace the obsolete v0.1 ZIP-first page with the current v1 install path.

First read: **Begin with one client engagement.**

Primary action: open the team guide or review the client path.

Secondary action: open the clearly separated technical setup for Frank or a technical helper.
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

At every stage the shared view exposes: complete facts, missing decisions, owner, due date, approvals, and the next human action.

## Responsibility model

| Work | Team | AI support | Ana / client |
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

## Focused 30-day working trial

1. **Week 1 — align the working setup:** confirm ownership, approved template sources, private record locations, candidate-tracker rules, and the current price source.
2. **Week 2 — practice without live data:** run a past case with private details removed, or a made-up practice case, without editing master documents or sending anything.
3. **Week 3 — support one approved engagement:** use only approved data and pause at every Ana/client decision.
4. **Week 4 — review the evidence:** keep what reduces coordination effort, remove what does not earn its place, and decide whether a shared workspace or Cecilia concept deserves further work.

## Sequential design council record

Machine posture held new swarms, so council roles were executed sequentially.

- Creative director: rejected the broad internal product framing and spiritual-business language; selected one human promise and one exact workflow proof.
- Brand designer: retained FrankX technical luxury but warmed the palette; avoided cloning Ana's sanctuary site.
- Product designer: made the response form and stage explorer the page's product loop.
- Motion designer: selected Track A and static-first behavior.
- Frontend architect: reuses the existing intake endpoint and keeps page-specific logic in Ana-scoped components/data.
- Accessibility reviewer: requires native buttons, visible focus, 44px targets, field labels, live status, reduced motion, and mobile-first sequence.
- Taste critic: rejects invented credentials, agent names, fake revenue certainty, repeating card grids, patronizing onboarding language, and any copy that makes team size or technical familiarity the problem.

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
