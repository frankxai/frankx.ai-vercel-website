# Build notes, /research rebuild from comp A

Author: opencode/designer subagent. Date: 2026-11-09. Session: local.
Branch: `agent/design/research-proof-20261108`. Base: `origin/main`.

## What shipped

- `app/research/page.tsx` rewritten as a composition. FAQ JSON-LD and the `layout.tsx` metadata are unchanged.
- `components/research/hub/`: `HubHero`, `MethodStrip`, `InvestigationIndex`, `GradeScale`, `HubDoors`, `TopicMapIndex`, `FaqBlock`, `ProgramsBridge`, `NewsletterBlock`.
- `app/research/research-model-watch.tsx` and `components/learn/LearnHubSection` are imported unchanged.
- `lib/research/featured-investigations.ts` is a **verbatim port** from `origin/ccr-323d835d-3u1dih`. It is a plain data module with one interface and one array, no imports, so the eventual merge of that branch is clean. The file was written as UTF-8; the first copy through a PowerShell redirect came out UTF-16 and tripped the linter, which is fixed and worth knowing if anyone re-ports it the same way.
- The page sets `export const dynamic = 'force-static'` because the receipt counts are read from `public/research/arena-receipts` through `node:fs` at build time.

## Counts

Every figure is computed:

| Figure | Source |
|---|---|
| investigations | `featuredInvestigations.length` |
| arena rounds, last measured | `getReceipts().length`, `lastMeasured()` |
| systems mapped, checked | `agenticLifeMarketRegistry.systems.length`, `.lastVerified` |
| topic maps | `publicTopicMaps.length`, labelled "held pending sources" |
| products, channels, sources | `data/economy-atlas.json` (`opportunities`, `marketplaces`, `sources`) |
| per-hub map counts | `publicTopicMaps` filtered through `publicResearchCategory` |
| registered sources | unique URLs in `domainSources` (currently 0, so the sources link stays hidden as before) |

The brief's "99 held" and the registry's 104 entries still disagree. The page renders the registry length, as instructed, and does not type either number.

## The typeface

The comps used Inter for body text because their standalone stylesheet loaded it directly. The repo's position is narrower than "Poppins for sans": `tailwind.config.js` declares `sans` as `var(--font-inter)` with a "DO NOT CHANGE" comment, `display` as `var(--font-poppins)`, and `taste.md` fixes "Inter for body, Poppins for display ≥18px".

The page therefore uses Poppins for every heading, numeral, card title and section label, and the repo's running-text face for paragraph copy. Nothing new was loaded.

I captured the alternative so the decision is visible rather than asserted: `shots/real/type-poppins-body-1440.png` forces Poppins onto all body copy on the built page. The deck drops from three lines to four, the 13 to 15px text gains weight it cannot carry at that size, and the mono labels lose their contrast against the display headings. If Poppins body is still wanted, it is one class on `main`; the capture is the cost.

## Where the real page differs from comp A

1. **The manifest panel is real, not a mock.** The comp printed a JSON response body. The page shows the fetchable URL, the round count, the last measured date and the conditional void-equivalent note, because the schema string lives inside a route handler and duplicating it in a component would let it drift.
2. **The grade scale is text and rules, not SVG.** It reflows at every width, stays selectable and has no fixed aspect ratio to break on a phone.
3. **The switch is a React control, not CSS radio siblings,** and it only appears from `lg` up. Below that, cards are the only view; a five-column table at 768 is worse than no table. Keyboard: the fourteenth Tab stop is the Table button, Enter switches the view, and the first row link follows.
4. **The topic index is a two-column row list** rather than the comp's eight-title sample, because the job is browse and search across 104 maps. Twelve rows show before "show all", matching the previous page's preview count.
5. **Per-hub counts changed basis.** The old cards counted reviewed domains (`sourceCount > 0`), which is zero today for every hub; the new cards count navigable topic maps, which is what the label says.

## Gates

| Gate | Exit | Note |
|---|---|---|
| `pnpm install` | 0 | 4m 35s, pnpm 10.28.0 |
| `pnpm run type-check` | 0 | |
| `pnpm run lint` | 0 | 0 errors, 11 pre-existing warnings elsewhere in the repo |
| `pnpm run ai-slop:audit:strict` | 0 | 2743 files, 0 hits |
| `pnpm run build` | 1 | prebuild `sync-ais` fails because `repos/.worktrees/Agent-Intelligence-System` does not exist; the checkout's sibling repo is at `repos/Agent-Intelligence-System` |
| `CI=1 pnpm run build` | 0 | the script's own CI path skips the absent sibling; this is how Vercel builds it. `next build`, all three postbuild suites and the wealth-privacy journey pass |

The first `CI=1` run failed one postbuild suite (`test:vault-metadata:rendered`) on a 30s timeout while three suites competed for the machine; it passed alone in 8.9s and passed inside the second full run.

## Captures

All from the production build (`next start`), not the comps, in `shots/real/`:

- `research-1440.png`, `research-768.png`, `research-375.png` (full page)
- `s1-hero-1440.png` through `s11-investigations-375.png`
- `focus-card-1440.png`, `s8-table-focus-1440.png` (keyboard focus rings)
- `s7-table-1440.png` (table state after keyboard activation)
- `type-poppins-body-1440.png` (typeface comparison)

Checks recorded in `shots/real/qa-final.json`: no horizontal overflow at 375, 768 or 1440; H1 is Poppins 36px on mobile and sits fully above 229px; the primary action is 48px tall and ends at 449px on a 812px screen; the view switch is not rendered at 375; reduced motion leaves the page intact with `scroll-behavior: auto`.

## Not verified

- No Safari or Firefox pass, and no real device. Chromium at three widths only.
- The `Music by FrankX` player is global chrome from the root layout and it covers the bottom-right of every capture, including part of the lead card on a phone. It is not part of this page and was not touched.
- Dev-server interaction at `127.0.0.1` fails because Next blocks cross-origin dev resources; at `localhost` it hydrates and the switch works. The production build is what the captures test.
