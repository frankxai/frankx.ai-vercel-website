# Managed AI agents article: draft release evidence

## Scope and authorization

Additive article at `/blog/managed-ai-agents-for-founders-2026`, original hero, three precise SVG figures, official brand sources and editorial evidence. Base commit: `14e584b373dcb4de182743f31f5947eb0310c74e`. Isolated clone and agent branch. Generated route and hero indexes include the new article assets. Three labels in the existing image viewer now use factual, sentence-case copy: “Inspect image,” “View image” and “Image viewer.” This removes the unsupported claim that every image is 4K. No homepage, navigation, pricing integration, dependency or production-runtime changes.

The user explicitly approved proceeding with a draft GitHub PR and Vercel preview despite the unavailable initial mobile capture. Production merge remains blocked until mobile review. This is a draft delivery, not a world-class or production-complete certification.

## Direction and editorial decision

Three directions were compared in the prior review: architecture-led founder control room, editorial field guide, and cost-led data story. Implementation follows the architecture-led direction with exact economics supporting it. All-capital display copy and arbitrary vendor scores were rejected. The article distinguishes desk research, vendor claims and authored assumptions.

The initial concept boards and prior browser captures are not committed evidence. This record does not assert a new independent review. The maker is Codex; independent verifier and human approver remain unassigned for production.

## Evidence collected

- Official-source pricing and capability review: September 7, 2026; source ledger committed.
- Original hero generated and inspected; 163,672-byte WebP derivative.
- All three figures rasterized and visually inspected for content, text fit and readable contrast.
- OpenAI construction-sheet asset rejected during review; replaced with official white Blossom logo.
- Figure numbers generated from explicit assumptions; brand files have source URLs and hashes.
- Existing scrollable table and image-viewer components reused; figure alt text describes the full relationship.
- No new motion or analytics code; existing article analytics inherited.
- Initial strict language audit: 2,512 files, zero hits.

## Required local checks

- `corepack pnpm run type-check`: passed.
- `corepack pnpm run lint`: passed, zero errors; seven existing repository warnings outside the changed component.
- `corepack pnpm run ai-slop:audit:strict`: passed, 2,512 files and zero hits.
- Article MDX compiled with GFM; title 55 characters, description 149 characters, TL;DR 59 words; referenced hero exists.
- Existing FAQ contract suite: 10/10 passed. Article schema extraction yields five questions from the visible body.
- Repository internal-link check: all hrefs resolve across 2,684 scanned files. Article-specific linked routes also checked.
- MDX safety, content integrity, AEO and pnpm override guards: passed.
- Cost arithmetic reconciles with the committed assumptions.
- `CI=true NEXT_TELEMETRY_DISABLED=1 corepack pnpm run build`: passed, including compilation, Next's TypeScript check, all 1,408 static pages and the postbuild rendered vault metadata test.
- Local builds initially stopped at the existing optional sibling-repository sync requirement. The sibling sync supports `CI=true` when that authoring repository is absent; the passing build used that supported automated mode. No gate was modified. The branch also includes main's independent preview guard and history fix in PR #651.

The checkout uses the repository-pinned pnpm 10.28.0 and unchanged frozen lockfile. A raw Node fetch batch timed out in this execution environment; that is not evidence the vendor websites failed. Official sources were inspected through web research, and the n8n license route additionally returned HTTP 200 through curl.

## Production holds

- [ ] Current mobile article capture, table scrolling and figure enlargement review.
- [ ] Keyboard and focus review, including the image viewer.
- [ ] Independent editorial, visual and image review.
- [ ] Required GitHub checks and broader merge gate on the final candidate.
- [ ] Human production approval.
- [ ] Post-merge live URL, metadata, image and analytics verification.

## First preview findings

Native Git deployment `befe48b` reached READY. The article renders 4,392 words and 11 tables, with one H1, the intended description, production canonical URL and original hero in Open Graph metadata. The hero viewer opens and closes. The shared blog template emits Article and BreadcrumbList schemas; the five body FAQs pass the offline extractor but are not emitted as FAQPage by this template.

Desktop inspection at 1363 pixels found the three 960-pixel-minimum diagrams clipped inside the 752-pixel article column. This branch now uses the existing `InfographicImage` viewer for all three figures, with actual dimensions and visible enlargement instructions. The full local build passed again after this correction. The follow-up preview must verify the complete figures and controls. Mobile and independent review remain pending.

The GitHub PR and Notion strategy page will hold the final desktop preview receipt and deployment links. No production merge is authorized by this evidence file.
