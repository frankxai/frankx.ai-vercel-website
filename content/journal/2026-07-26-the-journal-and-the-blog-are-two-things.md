---
title: "The journal and the blog are two different things"
date: "2026-07-26"
kind: "note"
summary: "Splitting the daily notes back out of the article archive, and why one name for both was the wrong call."
tags: ["writing", "site"]
visibility: "public"
published: true
---

For a few days the article archive at `/blog` was labelled "FrankX Journal" and
`/journal` was an alias pointing at it. One name, one page, two jobs — and the
jobs are not the same.

An article is researched. It has a hero image, structured data, an argument that
survives a second reading, and it is written to be found months later by someone
searching for the problem it solves. That takes a day or more per piece, which
means it cannot be a daily habit.

A note is what I actually have most days: one thing that broke, one thing that
changed my mind, one decision and the reason behind it. It is worth publishing
and not worth producing. If it has to clear the article bar, it never gets
written.

So they are two places now:

- **[The blog](/blog)** — the researched work. Unchanged, same URLs, 219 posts.
- **The journal** — here. Dated, short, unedited.

The mechanism is deliberately dumb: a markdown file in `content/journal/` is a
published entry. No CMS, no editor, no publish button. Frontmatter carries a
`visibility` field, so a note can stay in the same stream without going public.

When a note here turns out to be worth researching properly, it graduates to an
article. That is the only relationship between the two — one direction, and only
when the thinking earns it.
