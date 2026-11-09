# Preservation matrix, /research

Author: opencode/designer subagent. Date: 2026-11-09. Session: local.
Base: `origin/main` at the worktree's branch point. Compared against `app/research/page.tsx`, `research-hub-client.tsx`, `research-hub-lead.tsx`, `research-model-watch.tsx` and `app/research/layout.tsx` as they exist on that base.

Every job below survives in the rebuild. Nothing is deleted. Where a job moves or changes shape, the new home is named and the reason is given.

| # | Job the page does today | Where it lives on base | What the reader gets | Linked from elsewhere | Analytics event | New home | Status |
|---|---|---|---|---|---|---|---|
| 1 | Name the surface and orient the reader | `page.tsx` → `ResearchHubClient` `HeroSection` | H1, deck, three CTAs, four stats | Mega nav and other pages link `/research` | none | `HubHero` | kept, copy rewritten; stats become generated counts |
| 2 | One primary action | hero has three equal CTAs (`#hubs`, `#domains`, `#methodology`) | a way in | none | none | `HubHero` | kept, rebalanced to one primary (`#investigations`), method and topic index become text links |
| 3 | Seven hub doors | `research-hub-lead.tsx` (passed as `children`) | 7 cards: icon, question, title, description, topic count, topic words, three brand marks on the frontier card | `/research/hubs/[hub]` is in nav and in the domain cards | `research_hub_open` via `TrackedLink` | `HubDoors` | kept; the count is now derived from `publicTopicMaps` rather than reviewed-domain counts, and the three lab marks are carried by Model watch instead of repeated here |
| 4 | Selected investigations | `FlagshipArticles` (one item: Blue Zones) | a long-form investigation with source framing | none | none | `InvestigationIndex` | kept, expanded from one item to the published five |
| 5 | Five published investigations with their evidence | absent on base | nothing | none | none | `InvestigationIndex` | added; this is the brief's primary action |
| 6 | The research program bridge | `QualitiesResearchBridge` | four qualities mapped to four lenses, two ways in | `/research/core-qualities-and-human-drives`, `/qualities` | `coreQualitiesNavigationEvent` on both links | `ProgramsBridge` | kept verbatim in meaning and events |
| 7 | Browse and filter the topic map | `DomainsGrid` | search field, 8 category tabs with counts, "show all", 12 then all cards, results count, empty state | every card links `/research/[slug]` | none | `TopicMapIndex` | kept; expanded state becomes a dense row list, not a card wall |
| 8 | Model watch | `research-model-watch.tsx`, passed as `models` | 4 labs, selected models from the catalog, official source links, `#models` | `/llm-hub`, `/llm-hub/[id]` | none | imported unchanged | kept as-is |
| 9 | About the research (FAQ) | `page.tsx` inline `dl` + `FAQPage` JSON-LD | 3 questions and answers | none | none | `FaqBlock` + same JSON-LD in `page.tsx` | kept; schema untouched |
| 10 | Method | `MethodologySection` | 4 phases with descriptions, `#methodology`, links to method and sources | `/research/methodology` from research pages | none | `MethodStrip` | kept; four phases compressed to one line each, still linking the full method |
| 11 | Learn hub | `LearnHubSection` | 5 portal cards with research-specific blurbs | `/learn/[slug]` | internal | imported unchanged | kept |
| 12 | Newsletter and community | `CTASection` | email capture, Inner Circle, latest articles | `/newsletter`, `/inner-circle`, `/blog` | `EmailSignup` internal tracking | `NewsletterBlock` | kept, copy tightened, both links retained |
| 13 | Structured data and metadata | `page.tsx` FAQ JSON-LD; `layout.tsx` CollectionPage JSON-LD, OG, canonical, RSS | machine-readable record of the hub | search and social | n/a | untouched | kept |
| 14 | In-page anchors | `#hubs`, `#domains`, `#models`, `#methodology` | deep links used by the page's own CTAs | no external references found | n/a | same ids, plus `#investigations` and `#grades` | kept |
| 15 | Page atmosphere | `ResearchHubClient` fixed radial gradients, purple glow and noise overlay | decoration only | n/a | n/a | dropped | not a job; `taste.md` refuses decorative gradients, and the background is now flat `#0a0a0b` |

## Proposed removal, needs Frank

None. The one block that disappears is `FlagshipArticles`' single Blue Zones card, and it does not lose a job: the same investigation now appears in the five, one section higher, with its evidence line. Removing the duplicate is a design decision inside a preserved job, not the deletion of one.

## Where the comp and the real page must differ

1. The comp showed a fake JSON response body in the lead card. The page shows the three real manifest facts (rounds, last measured, the fetchable URL) because the schema string lives inside a route handler and duplicating it here would let it drift.
2. The comp's grade scale was an SVG. The page renders it as text and rules, so it reflows and stays selectable.
3. The comp's cards/table switch used CSS radio siblings. The page uses a React state switch, offered only from `lg` up, because a five-column table at 768px is not a table either.
4. The comp set Inter-free body copy. The page keeps the repo's running-text face and uses Poppins for every display size; see `BUILD-NOTES.md` and `shots/real/type-poppins-body-1440.png` for the comparison that decided it.
5. The comp showed nine rows in the topic preview. The page shows twelve before "show all", matching the count the previous hub shipped.
