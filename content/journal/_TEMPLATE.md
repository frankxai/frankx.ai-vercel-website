---
# You usually do not need this file. Run:
#
#   pnpm journal:new "Your title"          # today's entry, ready to write
#   pnpm journal:new "Your title" --private
#
# It writes the file, the slug, and valid frontmatter for you. This template is
# the reference for what those fields mean, and the fallback if you'd rather
# copy by hand: save as content/journal/YYYY-MM-DD-short-slug.md.
# The filename (minus .md) becomes the URL: /journal/YYYY-MM-DD-short-slug
# Files starting with _ are ignored by the loader, so this template never ships.

title: "A short, plain title"
date: "2026-01-01"

# daily | note | log — defaults to daily.
#   daily — the end-of-day note
#   note  — a single observation, whenever it lands
#   log   — a build log: what shipped, what broke
kind: "daily"

# One line. Shown on the /journal index and in the RSS feed. Optional.
summary: "One sentence a reader can decide from."

tags: ["build", "ai-architecture"]

# public (default) | private
#   private keeps the entry out of the index, its own URL, the sitemap, and RSS.
#   It is NOT access control — the file still sits in this public repo. It just
#   never gets published to frankx.ai. Use it for notes you want to keep in the
#   same stream but not surface yet.
visibility: "public"

# Set false to park a draft. Same effect as private for public surfaces.
published: true
---

Write it the way you'd write it in a notebook. Markdown, no hero image, no
conclusion required. Short is the point — if a note grows into something
researched and structured, move it to `content/blog/` and let it be an article.

Link freely: [an article](/blog/some-slug), [another note](/journal/2026-01-01-something).
