---
description: Add a new book to the Library OS. Creates a minimum-viable entry in data/book-reviews.ts with required fields, then offers to deepen it via /library-deepen.
---

# /library-add — Add a Book to the Library

You are the **Library OS Ingestion agent**. Your job is to take a book title (and optionally author / ISBN / Amazon URL) and produce a new, well-formed entry in `data/book-reviews.ts`.

## Input

Arguments: `/library-add "Book Title" [by Author] [--isbn=XXXX] [--amazon=URL]`

If only the title is given, infer the author and ISBN. If ambiguous (multiple editions, multiple authors of same title), ask once, then proceed.

## Photo-first prerequisite

When the input includes a book photo, handwritten note, Kindle export, or voice memo, run `/library-capture` first. It determines the source pages, public/private boundary, rights note, and whether this should be a source-marked field note rather than a full-book review. Never put private reflection or readable page scans into `data/book-reviews.ts`.

## Execution

### Step 1 — Validate schema

Read `app/books/types.ts` to confirm the current `BookReview` interface shape. Required fields are:

- `slug` (kebab-case from title)
- `title`
- `author`
- `coverImage` (path `/images/library/{slug}.jpg`)
- `rating` (1–5, default 5 unless user overrides)
- `reviewDate` (today's ISO date)
- `categories` (2–3 from existing color-mapped set — check `app/library/page.tsx` for allowed categories)
- `readingTime` (estimate: short book "5 min", dense "8 min")
- `keyInsights` (exactly 5 items, each 1–2 sentences, non-overlapping)
- `bestFor` (3–4 audience descriptors)

Optional fields to populate when confident:
- `amazonUrl`
- `relatedBook` (slug from `booksRegistry` — one of `self-development`, `manifestation`, `spartan-mindset`, `imagination`, `great-transition`, etc.)
- `publicationYear`
- `tldr` (1–2 sentences answering "what is this book about?" — used by JSON-LD, AEO)
- `faq` (4–5 Q&A pairs — common questions about the book)

### Step 2 — Pull the cover (if confident on ISBN)

Try OpenLibrary first:

```bash
mkdir -p public/images/library
curl -sL -o public/images/library/{slug}.jpg "https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg?default=false"
file public/images/library/{slug}.jpg  # verify JPEG
```

If the file is 0 bytes or not JPEG, do not set `hasCover: true`. The template falls back to the letter-gradient automatically.

### Step 3 — Write the entry

Append to the `bookReviews` array in `data/book-reviews.ts`. Match the style and quote-escaping of existing entries exactly.

### Step 4 — Type-check

Run scoped type-check to confirm the addition compiles:

```bash
npx tsc --noEmit app/library/page.tsx app/library/\[slug\]/page.tsx data/book-reviews.ts
```

### Step 5 — Offer the deepen

Print:

```
Entry created: /library/{slug}
Baseline populated:
  - TL;DR: ✓
  - Key insights: 5
  - Best For: N
  - FAQ: N
  - Cover: {yes|no}

Run /library-deepen {slug} to add quotes, chapters, related reading, and videos.
```

## Content quality standards

- **No AI-sounding phrases** — blacklisted: "delve", "dive into", "it's worth noting", "certainly", "absolutely", "let's explore"
- **Lead with specifics, not generalities** — every insight should name a concrete idea, not a vibe
- **TL;DR is the book's thesis in 1–2 sentences** — if you can't state it, re-read
- **FAQ answers the reader's actual question first, then gives context** — never restate the question
- **Categories must match the color map** — Self-Development, Habits, Psychology, Productivity, Focus, Mindset, Fitness, Fiction, Philosophy, Stoicism, Creativity, Wealth, Classic, Writing, Career, Spirituality, Memoir, Autobiography, Discipline

## Example

```
/library-add "The Beginning of Infinity" by David Deutsch --isbn=0143121359
```

→ creates `/library/the-beginning-of-infinity` with author, 5 insights, FAQ, cover, TL;DR. Ready for `/library-deepen`.

## Integration

- Part of the Library OS workflow: `/library-capture` (when source-backed) → `/library-add` → `/library-deepen` → `/library-research` → ship
- Output format matches `app/books/types.ts::BookReview`
- Paired with skill `library-os` for the full workflow context
