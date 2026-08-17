# Production Scene Brief — Agentic Architecture Decision Instrument v3

## Job

Make the article's decision visible before the reader enters the technical detail: most teams should deliberately stop at maturity Tier 1 or Tier 2 rather than treating multi-agent or platform complexity as the goal.

## Surface

- Primary: FrankX article hero inside the existing 16:9 `HeroImage` container.
- Distribution: Open Graph, portrait feed, and vertical story derivatives.
- Stage: Decide / Learn. Static composition is sufficient; motion and 3D would add no explanatory value.

## First read

1. `Don't hire a symphony when you just need a DJ.`
2. `01–02`
3. Four-tier progression: Augmented → Single agent → Multi-agent → Platform.

## Composition

- One editorial thesis and one decision range, not a scene.
- No cards, icon grid, fake dashboard, mascot, device frame, cinematic object, or generated typography.
- The horizontal maturity rail is functional information, not decoration.
- Emerald identifies the recommended range; white carries the thesis; warm grey carries secondary evidence.
- Website hero omits the article title to avoid repeating the semantic H1. Distribution variants restore the exact article title.

## Copy lock

- Article title: `Enterprise Agentic Architecture`
- Thesis: `Don't hire a symphony when you just need a DJ.`
- Recommendation: `Most teams belong here — 01–02`
- Action: `Start simple. Add instruments later.`
- Tier 01: `Augmented — AI assists · human decides`
- Tier 02: `Single agent — State · retries · quality gates`
- Tier 03: `Multi-agent — Routing · handoffs · checkpoints`
- Tier 04: `Platform — Tenancy · governance · cost`

## Responsive contract

| Variant | Dimensions | Composition |
|---|---:|---|
| Website hero | 1600×900 | Thesis + decision range + horizontal maturity rail |
| Open Graph | 1200×630 | Exact article title + decision range + maturity rail |
| Portrait feed | 1080×1350 | Stacked title, decision range, 2×2 tier matrix |
| Story | 1080×1920 | Stacked title, recommendation, vertical tier register |

## Accessibility

- Custom article-image alt text describes the recommendation and four-tier progression rather than repeating the title.
- Body, muted, signal, and inactive-detail colors meet or exceed 4.5:1 against the canvas.
- The article's semantic H1 remains outside the image. The duplicate MDX H1 was removed.
- Static image only; reduced-motion handling is not applicable.
