---
name: library-os
description: Library OS — source-aware reading intelligence. Use for a book, reading photo, handwritten note, highlight export, or request to build a durable, privacy-aware second brain on a personal domain.
---

# Library OS

**The open-source Library Intelligence System.** Turn reading signals into a source-marked, useful, and durable library on a domain you control.

The public library is an approved projection. It is not the capture inbox and it is never the owner’s entire inner life.

## When to use this skill

- A user shares a book, a photographed page, marginalia, a Kindle/Readwise export, a voice memo, or a reading note.
- A user asks to add or deepen a Library entry, or to build a library/second brain on their site.
- A user asks an agent to apply a book’s ideas to their work or life.
- A user needs the Library OS site, links, domain, schema, or distribution repository updated.

## Operating model

```
PRIVATE CAPTURE → EVIDENCE LEDGER → DISTILL → CONNECT → REVIEW → PUBLISH
     photo            source/pages       insight     action      approval     public URL
```

1. **Private capture** preserves the raw signal: original photos, full notes, voice transcripts, personal context.
2. **Evidence ledger** records edition, translator, ISBN when known, source pages/locations, capture date, rights status, and whether a passage is verbatim or paraphrased.
3. **Distillation** creates the public book entry: TL;DR, five insights, a small set of accurate short quotes, and clear uncertainty where evidence is incomplete.
4. **Connection** turns insight into an original application, a practice, and verified links to the owner’s existing systems or pages.
5. **Review** separates what is genuinely public from the private reflection. Nothing is published automatically.
6. **Publish** emits a permanent canonical URL, structured data, tested internal links, and a route that can remain stable for years.

## Privacy and rights contract

- **Do not commit private reflections, private transcripts, or full readable scans of copyrighted pages to a public repository.** Keep them in the owner’s private capture inbox/vault.
- A public page may carry a contextual photo, source pages, short excerpts, and original commentary only after the owner approves it.
- Label paraphrases as paraphrases. Never manufacture quotations, chapter titles, page numbers, translations, or source certainty.
- When only a few photographed pages are available, create a **field note**, not a synthetic summary of the whole book.
- Treat images of readable book interiors as private evidence by default. A personal cover/context photo may be public when approved.
- Never expose personal relationships, health, finances, or other sensitive context merely because an agent had access to it. Translate only the approved operating lesson into public prose.

## Public schema

The public projection is `BookReview` in `app/books/types.ts`.

- `capture?: PublicBookCapture` records approved provenance: capture type/date, edition/translator, source pages, rights note, and approved contextual images.
- `application?: BookApplication` records the original public application: an operating interpretation, a concrete practice, and verified connections to owned pages.
- `quotes[]` contains only short, source-anchored excerpts.
- Private material stays outside this schema and outside git.

## Canonical commands

| Command | Role | Writes |
|---|---|---|
| `/library-capture` | Photo/note intake and public/private separation | Capture record + recommendation |
| `/library-add` | Baseline book entry | `data/book-reviews.ts` |
| `/library-deepen` | Source-grounded quotes and chapter distillation | `data/book-reviews.ts` |
| `/library-research` | Related reading and video links | `data/book-reviews.ts` |

Use `/library-capture` first whenever the source is a photo, note, or highlight export.

## Photo-first protocol

1. Identify only what is actually visible: title, author, translator/edition, pages, headings, and short passages.
2. Create an evidence record with confidence and gaps. Do not infer unseen chapters.
3. Ask or apply the owner’s publication rule: **private source, public field note, or do not publish**.
4. Extract at most the short quotations needed to support the public interpretation; preserve verbatim text separately from paraphrase.
5. Produce a public application in the owner’s voice without exposing private source material.
6. Add one contextual image only when it is approved and does not become a page-scan substitute.
7. Route the entry through `/library-add` and optional `/library-deepen`.

## Personalisation without disclosure

A capable agent may reason from an owner-approved personal/project brief to make the application specific. The public output must pass this test:

> Would the owner want this exact sentence visible to a stranger, search engine, customer, collaborator, and future self?

When the answer is no, retain the insight in the private system and publish only the general operating principle.

## Link and domain management

Every Library entry is a graph node, not a dead-end article.

- Use permanent slugs: `/library/{slug}`. A changed slug requires an explicit 301 entry in `data/redirect-aliases.json`.
- Links to internal FrankX pages belong in `application.connections[]`, using verified canonical paths.
- Check every new internal path against the route registry and run the scoped internal-link check before merge.
- External links require a real target and `target="_blank"` with `rel="noopener noreferrer"`; do not invent video, retailer, or affiliate URLs.
- Keep production canonical host, metadata, JSON-LD, sitemap, and Vercel domain redirects aligned. One public domain wins; aliases redirect to it.
- The production site (`frankxai/frankx.ai-vercel-website`) is the live Library surface. The public `frankxai/library-os` repository is the distribution contract. Sync through explicit versioned releases/checklists, never informal file copying.

## Quality bar

- Five non-overlapping key insights, each specific enough to guide a decision.
- Original commentary is visibly distinct from source text.
- A field note never pretends to be a full-book review.
- No generic “AI summary” language; no fake certainty; no fabricated chapters.
- Include a concrete action only when it can be performed without hidden context.
- New pages must have canonical metadata, sitemap coverage, source provenance where applicable, and passing links.

## Completion gate

Before publishing, confirm:

- [ ] The source is identified or uncertainty is stated.
- [ ] Private inputs are excluded from the public repository and page.
- [ ] Quoted text is short, accurate, and source-marked.
- [ ] The public application is original and approved for a broad audience.
- [ ] Internal and external links are valid and canonical.
- [ ] The URL is stable, indexed as intended, and deployable.
- [ ] Production and the public template release notes describe the same capability level.
