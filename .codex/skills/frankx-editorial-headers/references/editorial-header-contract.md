# Editorial header contract

## Architecture

The production default is a two-layer cover.

| Layer | On-page article | OG / social export |
| --- | --- | --- |
| Art | Responsive image or illustration with a reserved quiet field | The same art direction, cropped for the target frame |
| Title | One live HTML `h1` | Exact deterministic text baked into the export |
| Identity | Live type plus exact owned SVG mark | Exact vector/raster mark from the approved source |
| External marks | Exact official asset on a quiet field, relationship-neutral | Same asset and relationship; never a partnership lockup without approval |
| Metadata | Live category, date, and reading time | Only the signal that improves recognition |

This gives the reader “text on the image” without trusting an image model with spelling, typography, accessibility, or trademark geometry.

## Header tiers

| Tier | Use when | Required package |
| --- | --- | --- |
| `ESSENTIAL` | Routine update or secondary post | Live title, brand lockup, one responsive image, 1200×630 OG |
| `EXPLAINER` | The visual must teach one system or comparison | Essential plus one explanatory device and a mobile crop |
| `FLAGSHIP` | Category-defining guide, named-platform comparison, or durable pillar | Current host capture, 4–6 benchmarks, exactly 3 directions, desktop/mobile/OG/social, packet validation |

## Composition rules

- Reserve 42–58% of the desktop frame as a quiet title field.
- Keep the dominant subject outside that field. Do not hide the proof behind the headline.
- Use one structural accent: rule, rail, diagram fragment, or evidence label.
- Apply a directional scrim that earns its presence by protecting contrast.
- Keep at least 72px safe space on a 1200×630 export and 24px on a 390px mobile viewport.
- Art-direct mobile as a 4:5 or tall responsive composition. Do not reuse a blind center crop.
- At 360×189, the topic and publisher must still be identifiable within three seconds.

## Typography

FrankX defaults are frozen:

- Poppins 600–800 for display type at 18px or larger.
- Inter 400–700 for decks, metadata, and UI.
- JetBrains Mono for system rails, evidence labels, code, and telemetry.
- Playfair Display only for one sparse editorial accent or italic quote, never for the full technical headline.

Use at most two expressive families plus one mono family. Set intentional lines. Desktop title type should normally remain at least 52px; mobile at least 40px. Prefer a new line or shorter deck over shrinking the title. Maintain WCAG AA contrast; target 7:1 for type placed over imagery.

## Identity and logo gate

For every mark, record:

- exact asset path;
- rights holder;
- official source URL or owned-source note;
- relationship: `publisher`, `editorial-reference`, `customer`, `technology-vendor`, or `approved-partner`;
- clear-space and minimum-size decision;
- light/dark variant.

Never generate, trace, recolor, stretch, crop, mask, texture, or add effects to a third-party mark. Do not place a mark over a busy image; give it a quiet field. An editorial-reference mark stays subordinate to the publisher.

## Renditions

| Surface | Target | Title treatment |
| --- | --- | --- |
| On-page desktop | 16:9 art source, responsive cover | Live HTML `h1` |
| On-page mobile | 4:5 composition or governed crop | Live HTML `h1` with intentional lines |
| Open Graph / X | 1200×630 | Deterministic baked title and exact marks |
| LinkedIn landscape | 1200×627 or governed 1200×630 reuse | Deterministic baked title |
| Square | 1080×1080 | Recompose; do not crop the landscape title |
| Portrait feed | 1080×1350 | Recompose title and proof vertically |

## Acceptance receipt

- One semantic `h1` on the article.
- No material layout shift from font or image loading.
- Title readable at 390px and feed-thumbnail size.
- Art subject remains legible on desktop and mobile.
- Logo geometry and source are exact.
- Relationship label cannot be mistaken for endorsement.
- OG metadata points to an existing 1200×630 asset.
- Title-free exception, if used, has an explicit reason and approved alternate treatment.
