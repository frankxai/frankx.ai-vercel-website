# Platform Content System

The authority platform uses a typed static content layer under `data/platform/`.
It is intentionally simple: no CMS dependency, no checkout assumptions, and no dynamic data source needed for the public pages.

## Files

- `data/platform/types.ts` defines shared types for research, blog seeds, products, books, cloud pages, flow steps, and offer ladder tiers.
- `data/platform/research.ts` owns research areas, seeded research index entries, and the research operating-system flow.
- `data/platform/cloud.ts` owns the Cloud AI hub, AI CoE flow, audience cards, cloud pillars, and `/cloud/[slug]` page content.
- `data/platform/products.ts` owns the authority offer ladder and the eight platform product cards.
- `data/platform/books.ts` owns living book/IP projects and the book creation engine.
- `data/platform/blog.ts` owns editorial lanes and seeded essay backlog.
- `data/platform/navigation.ts` owns platform navigation/footer link intent.

## Components

Shared UI primitives live in `components/platform/platform-ui.tsx`.

Use them for:

- Platform heroes
- Section headers
- Research/product/book cards
- Content indexes
- System flows
- Architecture diagrams
- Offer ladders
- CTA sections

The components are server-compatible and safe to import from server or client pages. They use Tailwind, `next/link`, and Lucide icons without adding dependencies.

## Route Ownership

- `/research` combines the existing research-domain registry with `data/platform/research.ts`.
- `/cloud` and `/cloud/[slug]` are driven by `data/platform/cloud.ts`.
- `/blog` renders existing MDX posts and the seeded essay backlog from `data/platform/blog.ts`.
- `/products` preserves the GenCreator launch-readiness logic and adds the authority offer ladder from `data/platform/products.ts`.
- `/books` preserves the published book registry and adds living book projects from `data/platform/books.ts`.

## Adding Content

1. Add the new item to the relevant `data/platform/*` file.
2. Prefer verified internal CTAs: `/newsletter`, `/contact`, `/products`, `/cloud/prototype-sprints`, `/work-with-me`.
3. Do not expose direct paid checkout links until delivery, pricing, refund policy, and checkout identifiers are verified.
4. Keep copy grounded. Avoid fake metrics, private Oracle implications, and generic AI marketing language.
5. If a new route is added, update `lib/route-enumeration.mjs` and `data/site-links.json`.
