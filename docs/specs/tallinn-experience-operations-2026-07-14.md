# Tallinn Experience Foundry — operating plan

**Status:** review-safe implementation; no venue, spend, external message, or live capture approved

**Decision owner:** Frank

**Proposed operator:** Ana, only in the role she accepts

**Recommended pilot:** Purpose to Practice
**Target session windows:** 21–23 July 2026, after comparison with the official agenda

## 1. Command decision

Build and review now; validate demand before booking; run one excellent room; use the evidence to decide whether a repeatable workshop, B2B offer, or retreat line deserves investment.

The fastest credible sequence is:

```text
30 concepts → 10 unlisted pages → 5 reviewed with Ana → 1 demand test
→ 1 time reconfirmed → 1 venue decision → 1 artifact-led session
→ Day-7 evidence → next offer only by participant request
```

Do not call it a Mindvalley workshop. A formal Mindvalley session requires their application and approval. The independent format must retain the affiliation disclaimer on every route and in every invitation.

## 2. Six-day launch calendar

| Date | Decision / action | Owner | Done when |
|---|---|---|---|
| **Tue 14 Jul** | Build private preview, ten pages, request simulation, portfolio, runbook | Frank/Codex | Preview is reviewable; no personal data can be stored |
| **Wed 15 Jul** | 45-minute Ana review of five formats | Frank + Ana | One format, one Ana role, one audience, and claims line chosen |
| **Wed 15 Jul** | Revise the winning page and facilitation artifact | Frank | One page and one printable artifact are session-ready |
| **Thu 16 Jul** | Frank approves wording, privacy notice, recipient list, and whether to open live capture | Frank | Written go/no-go; external send remains human-performed |
| **Thu–Fri 16–17 Jul** | Bounded demand test to trusted attendees | Frank | Qualified interest by format and time is visible; no community spam |
| **Sat 18 Jul** | Reconfirm the strongest format and one time | Frank | 8 reconfirmed + 2 standby or explicit stop |
| **Sat 18 Jul** | Request a Tallink two-hour room-only resident quote / courtesy hold | Frank or Ana after approval | Written cost, capacity, equipment, cancellation, access, VAT, and hold expiry |
| **Sun 19 Jul** | Venue decision by 18:30 Tallinn time | Frank | Book with approval or release cleanly; final logistics sent only if booked |
| **Tue–Thu 21–23 Jul** | Run one 90-minute pilot | Frank; Ana in accepted role | Artifact completion and safety close completed |
| **+48h / Day 7** | Consent-based implementation and evidence check | Frank; Ana only if agreed | Use, friction, referrals, and requested next problem recorded |

If the official agenda makes all three windows unsuitable, do not squeeze the workshop into a bad slot. Offer “another window” or defer to a later online/Tallinn format.

## 3. Funnel and data architecture

### Participant journey

```text
Unlisted hub
  → outcome router (role + desired leave-with)
  → primary + alternative session
  → exact offer page
  → interest request (not booking)
  → manual demand review
  → one-time reconfirmation
  → venue/spend decision
  → final logistics
  → session artifact
  → optional +48h and Day-7 aftercare
```

### Request fields

Collect only what is needed to evaluate and coordinate the session:

- name and email;
- selected experience;
- creator / solo-founder / team-leader / people-ops / other lens;
- exploring / likely / ready-if-time-works intent;
- one to three compatible windows;
- optional company/project and practical desired outcome;
- explicit consent to store/contact for this session;
- separate optional consent for artifact and Day-7 aftercare;
- experiment variant and random submission ID;
- hidden honeypot for abuse filtering.

The form explicitly asks participants not to submit health, therapy, employment-case, or other sensitive details.

### Review-safe mode

When either condition is true—`VERCEL_ENV !== production` or `TALLINN_CAPTURE_MODE !== live`—the endpoint:

- accepts only an `@example.com` test address;
- validates the full payload;
- stores nothing;
- calls no Notion, Resend, Slack, KV, or marketing service;
- returns a clear simulated receipt.

This lets Frank and Ana test the entire experience safely on a Vercel preview.

### Proposed live storage

If Frank later approves live capture:

1. `POST /api/tallinn-interest` validates and rate-limits the request.
2. The service checks a Notion record by an idempotent source key.
3. Notion becomes the primary durable inquiry record.
4. Only after storage succeeds, Resend may send a transactional participant receipt and operator notice.
5. No newsletter audience is updated and no follow-up automation is scheduled.
6. Logs contain format, variant, counts, and status—not name, email, company, or notes.

Required variables: `TALLINN_CAPTURE_MODE=live`, `NOTION_TOKEN` (or the existing transitional `NOTION_API_KEY`), `NOTION_INQUIRIES_DB_ID`, and optionally `RESEND_API_KEY` plus `OPERATOR_EMAIL`.

### Privacy activation blocker

Live personal-data capture must remain closed until Frank approves a canonical privacy notice that names:

- Notion as the inquiry store and Resend as the transactional email processor, where applicable;
- the controller and contact route;
- the purpose and lawful basis for session coordination;
- retention/deletion period;
- participant rights and withdrawal route;
- whether Ana receives participant information.

Ana receives no participant data by default. If she needs operational access, document the minimum fields, purpose, retention, security, controller/processor roles, and participant notice first.

## 4. Demand experiment design

### Test order

Do not distribute ten URLs at once. That fragments an already small sample.

1. **Ana qualitative review:** five pages, all in preview mode.
2. **Demand wave A:** Purpose to Practice to the broad trusted circle.
3. **Demand wave B:** only if the audience splits clearly, route creator traffic to Agentic Creator Studio and founder traffic to Build Your Agentic Team.
4. **B2B discovery:** share Human + Agent Team Charter only in direct, relevant conversations—not as a broad event promotion.
5. **Retreat discovery:** invite a few suitable founders to the Integration Salon page; do not sell a retreat.

### Tracking convention

Use a clean query value that the API stores as `variantId`:

- `?variant=ana-review`
- `?variant=trusted-founder`
- `?variant=trusted-creator`
- `?variant=people-leader`
- `?variant=retreat-discovery`

No third-party behavioral tracker is required for the pilot. Count intentional requests in the inquiry store and compare qualitative notes manually.

### Decision metrics

| Metric | Definition | Pilot signal |
|---|---|---:|
| Qualified ready interest | `ready-if-time-works` with at least one viable window | ≥ 8 for one format/time |
| Standby depth | Additional reconfirmed people | ≥ 2 |
| Reconfirmation rate | Reconfirmed / likely + ready requests | ≥ 65% |
| Show rate | Arrivals / confirmed | ≥ 80% |
| Artifact completion | Participants who leave with usable artifact | ≥ 80% |
| Day-7 use | Consenting participants who used or revised artifact | ≥ 50% |
| Earned next-step signal | Participant asks for creator, founder, team, HR, or retreat help | Record direction; no hard sell |

Do not treat page views, likes, compliments, or “sounds interesting” as venue demand.

## 5. Venue decision system

### What is known

Tallink Spa & Conference Hotel publicly lists its weekday Neptune package for 10–30 participants. The half-day package is up to four hours at €43 per participant and includes the room, equipment, catering, and spa access. At the ten-person minimum, that is a **€430 public package baseline** before verifying VAT or any custom conditions.

The hotel does not publicly promise a free meeting room to residents. Frank’s stay makes the hotel operationally attractive, not free.

Source: [Tallink Spa & Conference Hotel Conference Center](https://hotels.tallink.com/events/tallink-spa-conference-hotel-conference-center).

### Recommended gate

- Ask first for a two-hour room-only resident quote or courtesy hold.
- If room-only is **≤ €250**, consider booking only after **8 reconfirmed + 2 standby** at one time.
- If only the €430 package is available, require **10 reconfirmed** plus Frank’s explicit choice to underwrite or transparently cost-share.
- Capacity target is 12; never overbook beyond venue/fire rules.
- Do not use a bedroom or occupy hotel space as an event venue without permission.
- Frank approves every reservation, deposit, cancellation term, and participant charge.

### Draft venue inquiry — do not send without Frank

**Subject:** Resident inquiry: small 90-minute working session, 21–23 July

> Hello Tallink Spa & Conference team,
>
> I am staying at Tallink Spa & Conference Hotel and am validating a small independent working session for 8–12 adults. No room has been promised to participants yet.
>
> Could you please quote the smallest suitable private meeting room for a two-hour session, ideally including 30 minutes before and after for setup, for any of these windows:
>
> - Tuesday 21 July, 18:30–20:00
> - Wednesday 22 July, 08:00–09:30
> - Thursday 23 July, 17:30–19:00
>
> Please include room-only and package options, total price including VAT, capacity/layout, screen or display, flipchart, water, access/setup time, cancellation terms, deposit/payment deadline, and whether a short courtesy hold is possible while attendees reconfirm.
>
> Thank you,
> Frank

### Time selection

Test all viable windows in the form but confirm only one. Current priority:

1. Tue 21 Jul, 18:30–20:00 — best for a deliberate first-room feeling if the official agenda allows.
2. Wed 22 Jul, 08:00–09:30 — best high-intent filter; harder for social-evening fatigue.
3. Thu 23 Jul, 17:30–19:00 — fallback when the first two conflict.

Verify the official agenda before making any promise.

## 6. Participant experience

### Arrival contract

- The gathering is independent and small.
- No pitching, unsolicited coaching, or attendee-list harvesting.
- Personal stories stay in the room; people may share their own artifacts.
- Participants choose what to disclose and may pass on any prompt.
- The format is educational and reflective, not therapy, medical care, employment advice, or psychological treatment.
- AI never receives participant stories or sensitive notes without specific consent.

### Room setup

- One table or open U-shape; no theatre rows.
- Screen for a ten-minute working-system demonstration, not a 60-slide deck.
- A3/A4 artifact sheets, pens, sticky notes, timer, water.
- Printed independence/consent boundary at check-in.
- No automatic recording. Photography only with explicit per-person agreement and a non-photo seating zone.
- Ana can operate arrival and room flow without being placed on stage.

### Session standard

Every workshop must:

1. show the finished artifact in the first eight minutes;
2. spend at least half the room on participant making and review;
3. name human-only judgment and prohibited delegation;
4. use real FrankX sources, not fabricated proof;
5. close with one dated experiment, not a sales pitch;
6. make follow-up optional and consent-specific.

## 7. Aftercare system

| Timing | Message / artifact | Gate |
|---|---|---|
| Submission | Honest receipt and threshold explanation | Session coordination consent |
| Demand clear | Reconfirm one format and one time | One manual message only |
| T−24 | Room, access, arrival, what to bring, boundaries | Venue already booked |
| Same day | Participant artifact, clean template, cited sources | Attendee only |
| +48h | One implementation prompt | Requested / aftercare consent |
| Day 7 | “What did you use, change, or abandon?” | Separate aftercare consent |
| Day 8–10 | Human review of follow-on signals | No automated sales sequence |

The pilot uses manual operator review. No cron, unattended follow-up, newsletter sync, or lead-scoring automation should be activated on short notice.

## 8. Business and pipeline architecture

### Pilot economics

The first room should optimize learning and trust, not maximize ticket revenue. Choose one of these only after demand and venue price are known:

| Model | When to use | Guardrail |
|---|---|---|
| Host-funded research room | Room-only ≤ €250 and Frank values the learning | Hard spend cap; no hidden upsell obligation |
| Exact cost share | Venue requires the €430 package | State the venue contribution transparently; participant charge approved before collection |
| Complimentary partner room | Hotel explicitly offers it in writing | No implied endorsement; understand conditions |
| Defer / online follow-up | Gate or economics fail | A clean no-go is a successful test |

No payment flow has been built. Do not collect money until refund/cancellation terms, tax/VAT treatment, payment processor, privacy, and venue liability are approved.

### Future offer ladder — validation ranges, not published prices

| Layer | Frank value | Ana value | Indicative validation range |
|---|---|---|---:|
| 90-minute public lab | Facilitation + artifact system | Production or bounded people lens | €49–149 / participant |
| Private team charter workshop | Agent architecture + governance | Role clarity + people operations | €2,500–5,000 |
| 2-week implementation sprint | Agent team, knowledgebase, SOP/SKILL setup | Adoption, role, recruiting/HR workstream | €5,000–15,000 |
| 30-day human + agent team pilot | Architecture, evidence, gates | People operating model and adoption | €10,000–25,000 |
| 2-day Starlight founder retreat | Systems integration + facilitation | Experience operations + approved human practice | €1,500–3,500 / participant before venue/travel |

These ranges are market hypotheses to validate, not current offers or promises.

### Lead ownership and referral ethics

- A FrankX-originated request stays FrankX operational data unless the participant asks for Ana’s service or consents to an introduction.
- An Ana-originated HR/recruiting lead stays Ana’s unless a joint AI architecture need is introduced with consent.
- A genuinely joint workshop lead is tagged joint and reviewed together.
- No one copies the participant list into another CRM, audience, or agency pipeline by default.
- Referral fees, revenue share, client ownership, non-solicitation, and case-study rights are written before the first paid joint engagement.

### Earned routes after the pilot

- Creator asks “how do I repeat this?” → GenCreator / Agentic Creator OS discovery.
- Solo founder asks “can you install the team?” → Agentic Team or Personal AI CoE sprint.
- Team leader asks “how do we govern this?” → Human + Agent Team Charter workshop.
- People leader asks “how do roles and hiring change?” → Ana-led HR/recruiting discovery, with consent.
- Founder asks “can we go deeper in a curated group?” → Starlight Retreat discovery conversation.

## 9. Agentic operating process

```text
Portfolio registry (10 offers)
  → generated static routes
  → human review / claims gate
  → Vercel preview
  → request API in no-storage simulation
  → approved production activation only
  → Notion inquiry record
  → manual demand and threshold review
  → venue decision
  → session artifact + evidence
  → Day-7 learning back into the registry
```

The product registry in `data/tallinn-experiences.ts` is the single source for titles, promises, artifacts, run-of-show, proof links, host lanes, and aftercare. This makes later variants cheap without creating ten divergent one-off pages.

Agent roles for a repeatable system:

| Role | Responsibility | Human gate |
|---|---|---|
| Research steward | Verify event, venue, sources, and claim language | Frank approves consequential claims |
| Offer architect | Score concepts and update registry | Frank + Ana choose portfolio direction |
| Experience producer | Run room checklist, attendee state, artifact pack | Ana accepts scope; Frank approves spend |
| Funnel operator | Monitor requests, deduplicate, prepare threshold view | No new data sharing or sends without approval |
| Artifact steward | Package templates and Day-7 learning | Participant consent and privacy boundary |
| Independent verifier | Check code, design, accessibility, claims, and gates | Cannot activate production or book venue |

## 10. Ana review agenda — 45 minutes

Send a short note, then review pages live rather than asking her to read a strategy document alone.

| Minutes | Decision |
|---:|---|
| 0–5 | “Do we want to test one small room next week, yes or no?” |
| 5–15 | React to the five pages; select one primary and one future format |
| 15–23 | Choose Ana mode: producer, bounded contributor, or co-creator |
| 23–30 | Approve/reject public wording and name any credentials she wants verified later |
| 30–37 | Pick audience, candidate window, capacity, and venue ceiling |
| 37–42 | Agree pre-existing IP, joint module, lead/data ownership, and commercial starting point |
| 42–45 | Assign next 24-hour actions and a stop rule |

### Draft message to Ana — do not send automatically

> Ana, I think we have the beginning of something genuinely useful, but I do not want to turn it into pressure or put you in a spotlight you did not ask for. I built five very different 90-minute room concepts for Tallinn. My recommendation is one small Purpose to Practice pilot: people leave with a Human + AI Practice Map, I facilitate, and you can choose producer-only, one bounded contribution, or true co-creator mode. Could we spend 45 minutes tomorrow choosing whether one deserves a demand test? Nothing is booked, no role is assumed, and we stop if the room or timing does not validate.

## 11. Go / no-go checklist

### Go only if

- Ana’s role and public wording are explicitly accepted;
- one format and one time reaches the reconfirmation threshold;
- venue cost, VAT, cancellation, access, equipment, and hold deadline are written;
- Frank explicitly approves spend and any participant charge;
- the artifact and facilitator run-of-show are complete;
- privacy notice and live capture are approved—or Frank coordinates manually without the web form;
- official agenda compatibility is checked;
- independence disclaimer is visible in every message and page.

### No-go if

- the pitch depends on calling the session official or implying Mindvalley endorsement;
- demand is compliments rather than reconfirmed time-compatible attendees;
- Ana feels pressured into expertise, visibility, claims, or data access;
- venue terms are vague or require unapproved spend;
- the session requires clinical, therapy, IFS, neurological, or health claims;
- the artifact cannot be delivered well by the chosen date.

A no-go is not failure. The ten-page portfolio, demand evidence, artifact, and collaboration decisions remain reusable for a later online session, private team workshop, or Starlight retreat prototype.
