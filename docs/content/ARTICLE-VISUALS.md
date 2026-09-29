# Article visuals and recommendations

## Reader contract

Use a hero to establish the subject, then put evidence beside the paragraph it explains. For a substantial guide, aim for two to four useful inline visuals; a short article can need only one. Each visual must answer a specific reader question. Do not pad pages to meet an image quota.

## Where images come from

1. Capture the actual product or workflow with a clean demonstration account. Remove private information and record the product version and capture date.
2. Use manufacturer press or media assets only after recording the applicable permission and required credit. A source citation alone does not grant reuse rights.
3. Use an affiliate network's supplied creative only under that programme's asset, caching and placement terms. Enrollment and image permission are separate checks.
4. Commission or create original diagrams for exact relationships and comparisons. Keep source values alongside numerical charts.
5. Generate original conceptual illustrations when useful; label them as illustrations. Never present generated UI, hardware photos or benchmark results as observed evidence.

Search is a discovery step, not a licence. Do not copy images from another publisher or treat a social-media credit as permission. Preserve the full source URL, rights basis, credit, date, asset dimensions and intended placements in the asset registry. Unresolved rights stay in the sourcing queue and do not publish.

## Rendering

Use meaningful alt text, a caption that explains the point, and a source/credit line. Store authorized assets locally or in the existing media service; do not hotlink arbitrary publisher images. Use AVIF/WebP for photography where supported and SVG for precise diagrams. Reserve dimensions, lazy-load inline assets and supply responsive sizes. Make enlargement distinct from a shopping link. Keep diagram labels readable on mobile.

## Commercial rule

Evaluate a relevant recommendation for every article. A source citation remains a source citation. Add a commercial link only when the recommendation serves the reader and the account has an approved destination. Use partner-issued URLs exactly, without inventing ref parameters or replacing attribution with an article slug. Put a clear commission disclosure beside the recommendation and rel="sponsored" on paid links. No active partnership means an ordinary official or editorial link. No artificial shopping destination for unrelated essays.

Record the programme, destination, status, region restrictions and verification date. Verify merchant pricing and asset policies before publishing prices or importing product feeds. Affiliate earnings, click counts and editorial quality are separate measures.

## Authoring workflow

Choose the reader decision → create an image brief → capture/source/create → verify rights and factual fidelity → register the asset → place beside the relevant paragraph → choose a useful recommendation → run repository gates → inspect desktop and mobile → release through the existing PR process.

These changes introduce reusable components and representative article placements. They do not install a scheduler, activate new affiliate accounts or claim a full archive migration.

References: https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links and https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

Use `<ArticleFigure id="content-atomizer" />` with `data/editorial-visuals.json`. Use `<ArticleRecommendation affiliateId="elevenlabs" article="article-slug" title="ElevenLabs">Reader-specific reason.</ArticleRecommendation>`. The affiliate resolver consumes `data/affiliate/programs.json`; active entries need an issued `ourLink`. Existing article claims and prices require their own factual refresh.
