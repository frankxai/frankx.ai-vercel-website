# FrankX Library: reading room architecture

Decision record, 2026-09-25. Owning issue: [#753](https://github.com/frankxai/frankx.ai-vercel-website/issues/753). Base source: `45af99dd6b8722b422cf049697663322f007d273`.

## Reader job and current release

A reader arrives with a question, finds a book, understands what that work actually says, and follows a named edition or primary source. This release adds a curated entry shelf, visual collection sequences, cover-first browsing, and original overviews for all 26 short guides, including the 15 sacred-text guides. Sequence numbers indicate editorial order only. No sales ranking, invented readership, generated quotation, or personal-reading claim is implied.

The public catalog stays versioned in Git: `data/book-reviews.ts` holds general reviews, `data/library-reading-guides.json` holds source and edition information, and `data/sacred-editorial.ts` / `data/contemporary-editorial.ts` hold original interpretation. The client gets card and search fields through `lib/library-catalog.ts`; full guide and quote corpora remain server-side. Keep the current Fuse search until relevance or corpus size creates a measured reason to replace it.

## Edition and image record

An ancient or communal work has no single official cover. A cover is an attribute of a *specific edition*. The existing `hasCover` flag currently means a local image exists; it is **not** a complete rights or edition record. Do not add another image to production until an editor records:

| Field | Required evidence |
| --- | --- |
| Work and edition | ISBN or stable publisher / tradition-source identifier; translator or editor where applicable |
| Cover | Image source URL, publisher or rightsholder, credit, approved hosting or embedding use, review date |
| Match | Confirm the pictured edition matches the buy/read destination and the edition note |
| Failure | Local bookplate fallback, with no representation that it is an official cover |

Use the existing local covers where present. A photographed page or note is a reading capture, never a cover. Open Library is useful for *discovering possible editions*; its cover and community metadata alone do not prove rights or canonical edition identity. Keep an edition-neutral typographic plate for scriptures and unresolved image rights. An AI generated illustration may set a collection scene, but must not impersonate a published cover.

## Editorial and AI workflow

1. **Acquire:** bibliographic identity, source/publisher link, edition, table of contents where licensed, and a rights record. Keep private reading captures outside public Git.
2. **Trace:** attach each factual or textual claim to the appropriate work, passage, and named translation. Separate source text, translator's wording, later commentary, and FrankX interpretation.
3. **Draft:** AI SDK may produce structured draft summaries, passage references, possible related books, and missing-evidence warnings. It cannot write directly to the published catalog. Run citation matching and a human review before the content PR.
4. **Publish:** pin the approved projection in Git with a revision and date, render the source references, and test links and mobile reading. A quotation needs source text, edition or translation, passage/page, permission or applicable short-excerpt basis, and the exact words checked against that source. Omit it when any of those are absent.
5. **Correct:** retain the version history, source correction, and reason. Invalid media reverts to the bookplate without breaking the book route.

No vector store is needed for 80 public titles. A citation-aware assistant becomes worthwhile when the verified corpus has real passages it can retrieve and return with edition-specific links. Its answer must distinguish interpretation from quotation and decline a precise quote when the evidence is missing.

## Private reading state

When sign-in and reader features are specified, reuse the existing Starlight Platform Supabase tenancy rather than start an unrelated project. Bind the authenticated principal to a tenant-scoped reader identity on the server. Model `reader_shelves`, `reader_items` and `reader_notes` with owner identity, work slug, edition identifier where relevant, timestamps, exportable JSON, and delete behavior. Enforce row ownership with RLS plus ownership checks on writes. Never send a service-role key to the client. The public Git catalog remains accessible without authentication; private notes and progress do not enter the public bundle or search index.

## Commercial placement

Lead with the reading guide and named edition. Then offer links to an authorized free text or public library where one exists, the publisher, independent retailers, and a matching commercial edition. Commercial links must declare an affiliate relationship when one is active, preserve editorial ordering independently of commission, and identify the destination edition. Do not imply an Amazon affiliate account or live partner agreement until verified. Measure guide-to-source and guide-to-retailer exits separately from book discovery and completed reading.

## Interaction layers

- **Now:** semantic Next.js pages, accessible native links and controls, responsive cover shelves, and local artwork. No new canvas runtime for browsing 80 cards.
- **Graph when useful:** a reader can deliberately open a relation view of works, traditions, concepts, and cited passages. XYFlow is already in the dependency tree; mount it only for a bounded graph task, with a text/list equivalent and no SEO dependency on canvas rendering.
- **Later:** image or audio assistance for a *licensed passage* can be a separate opt-in creation flow. AR or VR book spaces follow validated reading and orientation tasks, asset rights, device performance budgets, and accessible 2D parity. They do not replace the ordinary reading route.

Release evidence still needed: exact-head CI, mobile and desktop inspection, independent editorial/source review, preview URL, and a stable-domain check after merge. A ready preview alone does not establish that readers succeeded.
