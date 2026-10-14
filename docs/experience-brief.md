# frankx.ai — experience brief

> Routed by the stack-kits prompt router to every UI, CTA and conversion prompt in this repo. `taste.md`, `design.md` and `CREATOR.md` outrank this file on taste, tokens and voice. `docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md` governs any change to `app/page.tsx` or `components/home/**`. This brief does **not** authorize homepage changes. It proposes the three directions the contract requires and leaves the choice to Frank.
>
> Evidence: live capture of www.frankx.ai on 2026-10-13 (mobile 360×800 plus full text), and a code audit of `e19a60c`.

## The job

frankx.ai is the front door to Frank: a living studio where architecture, music, books and field notes prove one person's range. The commercial job is to **turn that trust into a conversation with Frank**. Everything else (newsletter, free tools, sister brands) feeds that conversation or routes elsewhere.

## Who it is for

| | Who | Wants | Converts through |
|---|---|---|---|
| **Primary commercial** | Founders and operators who need AI architecture they can run (the contract names the founder as the primary commercial reader) | A system installed or designed by someone who has shipped it | `/work-with-me` (Studio, EUR 3k–25k plus EUR 3k/mo), `/foundry` (install), `/founders-circle` (€2,997 per quarter, application) |
| Creators and builders | Creators, video makers, technical creators | Tools and patterns to ship weekly | GenCreator (`gencreator.ai/create`), `/acos`, templates |
| Superfans | Listeners and readers who follow Frank's music, books and notes | More of Frank | Music, books, newsletter |
| Not for | People looking for guru coaching or medical or financial promises (CREATOR.md) | — | — |

## The one conversion

GTM.md asks for one primary conversion. The homepage does not name one today.

- **Primary: an application or inquiry to work with Frank** (Founders Circle, Foundry, Studio, Architect Residency).
  - Founders Circle (`/api/founders-circle/apply`) and Foundry (`/api/foundry/apply`) go through `processIntake`, which handles Resend, Notion "Inquiries" and Slack.
  - Studio (`/work-with-me` → `/api/studio-inquiry`) and the Architect Residency (`/coaching` → `/api/coaching-apply`) only send a Resend email. Nothing is recorded in Notion and nothing reaches Slack.
  - Move those two onto `processIntake` before any funnel work treats every inquiry as recorded and observable.
- Secondary: the newsletter, `/api/subscribe` (Resend audience plus Supabase `growth-capture`).
- Activation for creators: open GenCreator or ACOS from the Signal Router.

**The gap is structural.** The homepage body links to none of the paid surfaces. The only path is Final CTA → `/start` → Foundry or Founders Circle. Those pages sit in the footer and mega-nav. The most valuable reader has to find the offer themselves.

## Explain in this order

The contract preserves seven jobs: identity, orientation, portfolio proof, founder relevance, human proof, trust and conversion. In reading order:

1. **Who is Frank and what does he build?** Hero: identity and range. Keep music in it; the contract says music stays.
2. **Is it real?** Portfolio proof: Mind Palace rooms and shipped systems.
3. **Where do I go?** Signal Router, one path per audience.
4. **Can he do it for me?** Founder relevance: AI architecture plus a real offer with a price and a next step. **Missing on the homepage today.**
5. **Who is he as a person?** Books, FRANK-Ω, field notes.
6. **Keep in touch.** One newsletter form, not two.

## CTA hierarchy

| Rank | Today | Problem |
|---|---|---|
| Primary | "Inspect the Blueprints" → `/ai-architecture` | It reads, it does not convert. At 360×800 it lands near y≈700, below five stacked elements. |
| Secondary | "Map the Ecosystem" → `/ecosystem` | Same weight as the primary; taste.md bans two equal CTAs. |
| Router | GenCreator / ACOS / AI Architecture | Good pattern. It has no founder lane. |
| Capture | Two newsletter forms with different promises | Neither passes `source`, so body and footer signups cannot be told apart. |
| Exit | "Find Your True Constraint" → `/start` | The only path to the paid offers. No event fires on it. |

## Emotion arc

| Moment | Feel | Earned by |
|---|---|---|
| 0–5 s | **Range, at a glance**: architect, musician, writer | Hero identity plus the release card |
| 5–60 s | **Proof**: this person ships | Mind Palace rooms, real repos, real songs |
| Decision | **Access**: I can work with him, and here is the price | A visible offer with a price and a named next step |
| After | **Belonging**: a weekly note worth opening | One newsletter promise, kept |

Avoid: guru authority, invented urgency, unmeasured transformation claims (CREATOR.md, taste.md).

## Mobile contract

- The primary CTA sits above the fold at 375×667. Today the eyebrow, two-line headline, subhead, paragraph and quote push it down to ≈y 700.
- The floating ♪ chip (`MusicRuntime.tsx:261`) keeps clear of CTAs. `qa-overlay-clearance.css` already narrows them by 4.75 rem; keep that guard.
- One newsletter form per viewport journey.

## Excellence bar

- `pnpm run type-check`, `lint`, `ai-slop:audit:strict`, `build` and `merge:gate` pass.
- The homepage contract tests run. `homepage-hero-320-cta`, `homepage-honest-proof-copy` and `homepage-music-lab-copy` exist but no script or workflow runs them. Wire them in through a contract-only PR.
- Contract violations already on the homepage, to fix inside an approved direction: the AI-stack logo strip is a marquee (`TrustedByBlock.tsx:46`), which taste.md bans; hero CTAs are `rounded-2xl` where taste.md specifies `rounded-full`.

## Three directions for the homepage (contract §section-level change)

Each direction adds one founder-commerce route. None removes music, portfolio breadth, proof or discovery.

| | A: Founder lane in the router | B: Proof → invitation band | C: Hero re-weighting |
|---|---|---|---|
| Change | Add a fourth Signal Router path, "Work with Frank": Founders Circle (€2,997/qtr, application), Studio (from EUR 3k), Foundry | Add one band after the Mind Palace with two offers, a price, a proof line and an application CTA. Fold Products & Tools into it. | Primary hero CTA becomes "Work with Frank"; secondary "Inspect the blueprints"; the release card drops below the CTAs on mobile; merge the two newsletter forms into one with `source` |
| Files | `components/home/SignalRouteSelector.tsx` | `components/home/HomePageElite.tsx` + new band | Hero in `HomePageElite.tsx`, `EmailCTA`, `Footer.tsx` (the email change goes in a separate PR per contract :85-95) |
| Class | Additive | Section-level | Structural (contract-only PR first) |
| Preserves | All 7 jobs; adds founder relevance | All 7; Products & Tools merges into the band | Identity is re-weighted; needs the strongest matrix |
| Risk | Lowest | Medium | Highest |
| Measure | Existing `trackEvent` on the router (`SignalRouteSelector.tsx:251`) | Add an event on the band CTA | Hero CTA events already exist (:487, :496) |

**Recommendation: A now, B when the residency has a price and a recorded intake.**

- The Architect Residency is already live. It is a 12-week programme on `/coaching`, listed in the sitemap, and its `#apply` form posts to `/api/coaching-apply`, so a B band could take an application today.
- What it lacks is a published price, and an intake that is recorded beyond one email (see "The one conversion").
- No retreat or mastermind offer exists. "Vibe OS Residency $9,800" exists only in `docs/strategy/v2/GRAND_SLAM_OFFERS.md`.
- B is Frank's call once the residency's price is set. Pointing it at `/coaching#apply` would work now. Pointing it at the Vibe OS offer would be a dead CTA.

### Preservation matrix: direction A (paste into the PR)

| Value dimension | Current evidence | Proposed treatment | Better / preserved / removed | Review evidence |
|---|---|---|---|---|
| Identity | Hero headline plus release card | Unchanged | Preserved | 375/1440 captures |
| Orientation | Signal Router, 3 paths | 4 paths | Better | Router capture + event |
| Portfolio proof | Mind Palace, 9 rooms | Unchanged | Preserved | Capture |
| Founder relevance | No offer on homepage | Router path with price and application | Better | Capture + `trackEvent` |
| Human proof | Books, FRANK-Ω | Unchanged | Preserved | Capture |
| Trust | Oracle disclaimer, field notes | Unchanged | Preserved | Copy diff |
| Conversion | `/start` only | Router path to applications | Better | Event funnel |
| Music | Release card, Music Lab | Unchanged | Preserved | Capture |
| Discovery | Ecosystem, Library, Latest | Unchanged | Preserved | Capture |
| Newsletter | Two forms | Unchanged (separate PR) | Preserved | — |

## Skill chain (what the router loads, in order)

`web-release-gate` → `frankx-brand` (critical in the repo's own `skill-rules.json`) → `tailwindcss` · `nextjs-react-expert` · `shadcn` → `web-design-guidelines` → `motion-system` / `emil-design-eng` → `core-web-vitals` → `visual-proof`.

## Decisions that are Frank's

1. **Which direction**: A, B or C, and which week it ships.
2. **Which offer is the flagship**: Founders Circle (€2,997/qtr), Studio (from EUR 3k) or Foundry (no price published)? The homepage can carry one with weight, not three.
3. **When does the retreat or residency tier get a real page?** It needs a price, capacity, a location and an application. Only then can the homepage route to it.
