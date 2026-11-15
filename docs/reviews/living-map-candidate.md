# FrankX map candidate

Owner: Codex. Route: `/map`. Related quality issue: #706.
Base: `baea0d3f51e3e6aed77f7d389f21c1f11b5697e1`.

## Experience

A visitor choosing which FrankX project to use should be able to select a destination, inspect an existing visual reference, find its public source and install the relevant skill pack. The primary action is getting the skills. The page preserves the wider books, music, research and creative-world routes.

Current desktop and mobile source views were inspected through the connected browser on 14 November 2026. Observed defects: repository-card wall; February manifest date presented alongside a weekly automation promise; stale priorities presented as current focus; no skill-pack installation or visual inspector. Existing `/map/v1`, `/map/v2`, `/map/v3` explorations were inspected and retained.

| Direction | Composition / type / imagery | Interaction / motion | Decision |
| --- | --- | --- | --- |
| Visual directory | Large preview rows, editorial headings, collection artwork | Search and links; static | Better browsing, weak relationships |
| Freeform graph | Dense canvas, small mono labels, preview on selection | Pan/zoom/drag; spatial motion | Unnecessary gesture and bundle costs for six areas |
| Structured map and inspector | Fixed destination positions, display/mono hierarchy, source artwork | Native buttons, synchronized area filter; static | Selected: relationships stay readable and keyboard accessible |

Mobile uses a two-column destination selector and a full-width inspector. The existing site font stack is inherited. No fonts, generated characters, dependencies, global styling or infrastructure are added. Motion is omitted; the reduced-motion rule also prevents inherited animations within this surface.

## Source and update contract

- Public GitHub REST endpoints for frankxai, Starlight-Intelligence and Arcanea-Labs; 30 most recently pushed repositories per account, not a complete estate inventory.
- Unauthenticated server requests with a four-second timeout, hourly Next.js data cache and route ISR. Regeneration is triggered by visits after expiry, not by a cron.
- Private records, forks and unexpected owners are rejected. Client receives a deliberate DTO with constructed GitHub URLs, no private notes, priorities, action items or credentials.
- GitHub response dates survive caching. Transport/status/shape/date failures receive no observation date. Coverage is displayed per source.
- Existing public manifest records form a visibly dated fallback. Saved entries cannot appear in recent activity. A recent push is never labeled a release or a strategic commitment.
- Skill install commands and main-branch ZIP targets were verified against public READMEs and repository metadata. `creator-skills` is the documented public ACOS pack; the map does not advise installing the full ACOS repository as a skills pack. No install counts are invented or scraped.
- Preview images are existing artwork/illustrations, expressly distinguished from live application screenshots. No automatic third-party embeds, arbitrary image proxy or new analytics are introduced.

Source references: skills.sh/docs; frankxai/skills README blob `3796b97caf507aafff6fc5c9dc5d57252530d060`; frankxai/creator-skills README blob `a4165f3b47e2453b3947dea8b7e2023c49335064`. Architecture source: frankx-starlight-command/ARCHITECTURE-STACK.md blob `ca87cc5509997c694fc873d4cb2dbb426f5eeae1`. Existing stack and cache model are preserved.

## Verification and limits

- Eight executable data-boundary tests: public projection, unsafe upstream fields, owner-qualified identity, recent-activity exclusions, composed filters, unknown dates/counts, source failures, source-date retention.
- Full TypeScript check, full repository ESLint and strict language audit passed before the candidate was pushed; targeted final checks rerun after the parsing-boundary extraction.
- Production builds were attempted. Turbopack was killed with exit 137; webpack's worker received SIGKILL. A package-manager build attempt also stopped at existing dependency build-policy checks. No passing production build is claimed.
- Local headless Chromium could not start because its process socket was denied by the execution environment. Desktop/mobile interaction, actual image decode, computed font/contrast, keyboard traversal, performance and reduced-motion evidence for the new page remain unverified.
- Live GitHub reads from the new runtime require preview verification. Tests exercise actual parsing functions with controlled Response fixtures, not production connectivity.
- Independent provider review and production proof are pending. This is a draft candidate, not a release receipt.

## Acceptance and recovery

Before release, verify the exact PR head on Vercel: `/map` returns 200; source timestamps/partial outage/empty activity are truthful; six destinations update the inspector and filter; search, archive toggle, clear and show-all work; both skill commands copy with an error fallback; both ZIP links download; preview artwork decodes; private names/notes are absent from HTML and RSC; 390/1440 widths have no overflow; keyboard focus, reduced motion and existing navigation work. Confirm the full build and independent review on that same head.

Production remains unchanged until the ordinary reviewed merge path. Recovery is to revert this map-only change and let the existing Vercel Git integration deploy the reverted main. No data migration, billing or credential rollback is required.
