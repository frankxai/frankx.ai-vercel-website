# FrankX Marketing Site Content & Build Roadmap

## 1. Vision & Positioning Anchors
- Primary audience: Oracle ecosystem technologists evolving into agentic AI creators; secondary: music facilitators seeking AI-assisted transformation tools.
- Core value pillars to keep visible across site: `Enterprise AI Expertise`, `Purpose-Driven Creation`, `Music Frequency Labs`, `Template & Systems Factory`.
- Always connect offers back to the value ladder (Creator Readiness Assessment ? Creator Intelligence System ? Flagship Labs).

## 2. Assets Ready for Publication (Low Lift)
- **Blog**: The five essays already templated in `/content/blog/` are publish-ready; schedule them for weekly releases (reuse hero art, add inline CTAs to Creator Readiness Assessment).
- **Guides**: Convert `content/guides/modern-guide.mdx` into a gated lead magnet page (`/guides/modern-guide`) with form integration once ConvertKit/Beehiiv account is connected.
- **Templates**: Public downloads in `public/templates/` can power a "Template of the Week" block on `/resources` without extra dev.

## 3. High-Value Drafts to Adapt (Medium Lift)
- **Age of Intelligence Series (`Age of Intelligence - Articles, Notes and Books/Article_01_...` etc.)** ? Create a 4-part SEO cornerstone series (15k words each). Suggested mapping:
  1. `Article_01_Intelligence_Revolution` ? `/blog/intelligence-revolution-playbook`
  2. `Article_02_Symbiotic_Intelligence` + `Article_03_Autonomous_Agent_Economics` ? `/blog/symbiotic-intelligence-economy`
  3. `Article_04_DeFi_Programmable_Money` + `Article_05_Creator_Economy` ? `/blog/programmable-wealth-creators`
  4. `Article_06_MEV_Algorithmic_Extraction` onward ? `/blog/intelligence-economy-risk-map`
- **Golden Weekly Editions** ? Repurpose as newsletter archive posts (`/blog/golden-weekly-001` etc.) with updated commentary linking to current offers.
- **Creator OS templates** (under `Templates/08-Development-Code/` and `Templates/16-Notion-Templates/`) ? Build product cards on `/templates` with download CTA + preview modals.

## 4. New SEO Article Concepts (Net-New Content)
- "Oracle AI Architect�s Guide to System-Aligned Automation" (2500 words, schema `Article`, includes checklist download).
- "How Suno + Next.js Power Interactive Music Funnels" (technical case study; cross-link to `app/music-lab`).
- "Model Context Protocol Stack for GenCreators" (rank for `MCP automations`, `Claude Codex workflows`).
- Create these in `/content/blog/YY-mcp-...md` with metadata fields `keywords`, `ctaSlug`.

## 5. Technical Enhancements for Depth
- Add [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) per page to inject canonical URLs & `keywords` from frontmatter.
- Implement dynamic sitemap + RSS update (call `npm run gen:feed` in postbuild step; wire GitHub Action to run on push to `main`).
- Add structured data JSON-LD for articles and events (see `lib/seo.ts` backlog item).
- Build a `ContentMatrix` component to surface cross-links (related posts, templates) at article footer.

## 6. Experience Upgrades
- **Creator Readiness Assessment CTA**: Build dedicated `/soul-frequency-assessment` page, embed Typeform or custom form -> connect to ConvertKit API.
- **Music Lab Enhancements**: Add audio player cards pulling from Suno API (requires API key + `lib/suno.ts` helper). Provide case study downloads.
- **Template Library UX**: Convert `public/templates/*.html` to MDX pages with live preview and "Copy to Notion" buttons. Keep static exports in `/public/templates/legacy` for search indexing.

## 7. Delivery Sequencing (Next 4 Weeks)
| Week | Focus | Tasks |
|------|-------|-------|
| 1 | Publish & polish | Ship existing 5 blog posts (schedule, add inline CTAs, confirm OG images). Prepare `guides/modern-guide` gated page. |
| 2 | Cornerstone kick-off | Adapt `Article_01_Intelligence_Revolution` into new long-form post. Draft MCP automation article. |
| 3 | Productization | Build Template Library UI, surface 3 top templates as offers. Implement metadata automation + sitemap action. |
| 4 | Experience deepening | Launch Creator Readiness Assessment page, enhance Music Lab with audio samples, publish second cornerstone article. |

## 8. Responsibilities & Tooling
- **Codex**: content restructuring, MDX conversions, Next.js builds, GitHub Actions setup.
- **Claude**: narrative polish, SEO keyword weaving, conversion copy on new pages.
- **Frank**: review offers/pricing, record personal stories for cornerstone pieces, configure email automation tools.
- Tool backlog: Connect ConvertKit/Beehiiv API, enable Vercel web analytics, integrate Plausible for `/app/layout.tsx` script with domain env var, evaluate MCP connectors.

## 9. Metrics Targets
- Publish cadence: 1 post/week baseline + 1 cornerstone/month.
- Lead magnet conversion: 5% visit ? assessment signup within 60 days.
- Template downloads: 200/month once library live; track via simple serverless logging (TBD).

---
*Drafted by Codex � Updated 2025-09-16*
