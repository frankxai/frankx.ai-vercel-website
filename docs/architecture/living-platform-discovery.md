# Living platform discovery

Source review: 2026-09-09. The anthology design below is proposed; this document does not establish deployment or product readiness.

## Existing foundations

| Source | Existing responsibility | Reuse boundary |
| --- | --- | --- |
| `lib/route-enumeration.mjs` and `scripts/build-route-index.mjs` | Canonical route enumeration, aliases, existence checks, and discovery exclusions | Keep URL ownership here; a collection references routes rather than defining replacements. |
| `lib/site-search.ts` | Shared search for the command palette and `/search` | Require a textual match before applying content-type priority. |
| `lib/sitemap/build-graph.ts` and `lib/sitemap/types.ts` | Route/image graph consumed by `/network` | `uses` and `shares-image` describe asset usage, not intellectual influence. |
| `lib/research/blog-domain-map.ts` and `components/blog/RelatedResearch.tsx` | Explicit article-to-research links | Project these authored relationships into discovery. |
| `lib/qualities.ts` and `components/qualities/RelatedQualities.tsx` | Evidence notes and reverse links from works to qualities | Reuse the pattern for explaining why a work belongs to an anthology. |
| `data/library-collections.ts` | Curated introductions, featured books, and membership rules | Preserve existing collections and their editorial context. |
| `lib/library-search.ts` | Author aliases, diacritic normalization, multiword matching, and fuzzy fallback | Retain the domain search behavior; do not replace it with generic route search. |
| `components/recommendations/Recommendations.tsx` | Tag-based recommendations using metadata | Preserve the metadata-only payload contract in `scripts/tests/blog-recommendation-payload-contract.test.mjs`. |
| `data/ecosystem.ts` | System IDs and `relatedSystems` links | Treat status fields as authored records requiring evidence before promotion. |

The historical `content-universe/_universe/knowledge-graph.json` has one draft book and empty edge arrays. It is not the runtime source for the graph above.

## Proposed anthology extension

Introduce one authored collection record with a stable ID, title, intended outcome, introduction, and ordered work references. Each reference contains an existing canonical URL and an editorial note explaining its role. Media references may identify a segment or chapter when a stable destination exists. Keep inspiration, source citation, practical application, and collection membership as distinct relation types.

Render an anthology from these references and add reverse membership links on participating works using the existing RelatedQualities pattern. Project approved relationships into graph views after the list experience works. Arcanea, Starlight, and GenCreator retain their own identities; an anthology can cross brands without relocating their source material.

Resolve public references against approved discoverable destinations. The visual graph currently reads image manifests independently of route enumeration; those manifests must not become an alternative publication gate. Preserve recipient-specific discovery exclusions. Private memory and relationship records belong outside the public search payload.

## Search presentation correction

The command palette previously assigned selection indices before grouping results for display, allowing keyboard navigation to disagree with visible order. `lib/site-search-presentation.ts` now preserves queried results in one ranked Results section. Empty suggestions retain groups, with selection indices assigned after grouping. Rendering and Enter activation consume the same final sequence. The input is labelled and linked to the listbox and active option through combobox attributes. Tab and Shift+Tab remain inside the modal; Escape dismisses it, and dismissal restores the previously focused element when it still exists. These interactions follow the [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Visual design is unchanged.
