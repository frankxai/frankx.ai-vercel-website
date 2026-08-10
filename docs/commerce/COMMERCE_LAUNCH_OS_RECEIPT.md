# Commerce Launch OS — engineering receipt

Branch: `agent/hermes/commerce-launch-os-20260810`  
Repo: `frankxai/frankx.ai-vercel-website`  
Date: 2026-08-10  
Epic: frankxai/FrankX#124

## Shipped in this branch

| Artifact | Path | Purpose |
|----------|------|---------|
| Portfolio registry | `data/portfolio-registry.ts` | Multi-brand SKU SSOT + MoR + fulfillment flags |
| Commerce kernel | `lib/commerce/kernel.ts` | Stripe / Polar / LS / Skool checkout resolution |
| Fulfillment plan | `lib/commerce/fulfillment.ts` | Agentic post-purchase step planner |
| Checkout API | `app/api/checkout/route.ts` | Unified entry + legacy fallback |
| Hub data bridge | `components/products/portfolio-hub-data.ts` | Legacy cards + registry merge |
| Products hub UX | `app/products/(index)/page.tsx` | Four doors, Compass CTA, status labels, price tags |

## Companion strategy (FrankX authoring repo)

Branch: `agent/hermes/portfolio-ssot-20260810`  
- `docs/strategy/PORTFOLIO_PRODUCT_MODEL_LAUNCH_OS.md`  
- `docs/strategy/PORTFOLIO_PRODUCT_MODEL_NOTION_DRIVE_IMPORT.md`

## Not done (human / env)

- Real Stripe Price IDs / Polar product IDs / LS variants in Vercel env  
- Email provider send path for delivery templates  
- Skool / Discord invite automation  
- Affiliate durable store (still mock if present)  
- Full typecheck/build on this machine if pnpm install heavy — run merge:gate before ready  

## DIY-first confirmation

All public SKUs in registry are `decoupledFromFrank: true` except application-gated Founder path (not in public hub as active checkout). Bespoke is not a public product.

## Recommended next autonomous wave

1. Wire `STRIPE_PRICE_*` for Vibe OS + one skill pack E2E test purchase  
2. Populate one Lemon variant for Arcanea World Seed preorder  
3. Stand GenCreator Guild Skool URL  
4. Asset QA on top 5 `templates.json` rows before public  
5. Claims audit on hub copy  
