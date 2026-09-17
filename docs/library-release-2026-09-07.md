# Library discovery and spiritual reading guides

## Decision

The reader arrives with either a book in mind or a question to explore. The Library should make both routes visible immediately. The primary action is finding a book; the proof is a legible catalogue with explicit sources and editions.

Three directions were considered against the existing dark FrankX Library:

1. **Search-first catalogue.** Dense rows, current typography, small covers, immediate filters. Strong retrieval; little help choosing a subject.
2. **Image-led gallery.** Large artwork, broad atmospheric themes, visual transitions. Strong mood; expensive to maintain and poor use of incomplete cover assets.
3. **Curated shelves — selected.** Search above six visual collections, quiet bookplates beside existing covers, complete titles, and linked reading paths. Uses the current typography and emerald palette.

The implementation preserves the Rockstar Energy collection, research links, existing book URLs, and the Tao reading capture. No new animation: state changes and reading must stay immediate. Existing Inter/Poppins/Playfair roles remain unchanged.

## Technology choices

- Use the installed Fuse.js for typo-tolerant search over a compact title/author/category/alias projection. Do not send the chapter and quotation corpus to the browser.
- Keep query/filter state in shareable URLs, with indexable collection pages and noindex/follow for query variants.
- Use Next.js metadata and ImageResponse for deterministic social previews. Local bookplates remain when covers fail; allow only the existing Library Blob host/path.
- Keep source/edition records in structured repository data. External search infrastructure and a new CMS are unnecessary at the current catalogue size.
- Add an ISBN/edition/cover-rights registry before importing large external cover catalogues. Evaluate a hosted search engine when measured catalogue size or multilingual relevance exceeds the current implementation.

## Editorial scope

26 new editorial guides cover foundational texts across traditions, contemporary spiritual teaching, and memoir. No new personal ratings, reading claims, miracle/science equivalence, or full modern translations. The new guides explicitly distinguish primary texts, modern commentary, contemporary teaching, and spiritual memoir.

Michael Singer: The Untethered Soul, The Surrender Experiment, Living Untethered, Wisdom Untethered. Related authors: Paramahansa Yogananda, Eckhart Tolle, Ram Dass, Thich Nhat Hanh, Pema Chödrön. Each guide links named publisher, translator, or tradition sources.

## Verification

Behavioral tests cover exact titles, misspellings, author variants, transliterations, diacritics, combined filters, sorting, empty states, source shape and related-book links. CI runs these through `test:library`. Existing Library contracts remain intact.

Full repository typecheck, lint, strict language audit, and production build are release gates. Independent review is recorded in the PR.

## Evidence limits

The live desktop state was inspected before changes. The browser in this session does not expose viewport resizing and rejects local preview addresses. Do not claim a measured mobile screenshot, Core Web Vitals pass, or a complete world-class-web-release evidence receipt on the basis of code inspection alone. Deployment and interaction verification must be recorded against the resulting Vercel URL.

## Rollback

Revert the Library PR through a separate PR, or restore the previous ready Vercel production deployment. Preserve subsequent unrelated changes.
