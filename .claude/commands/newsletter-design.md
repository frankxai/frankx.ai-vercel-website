# /newsletter-design

Renders a draft newsletter MDX into a browser preview, validates visuals, and prepares it for sending.

## Usage

```
/newsletter-design <path/to/issue.mdx>
```

## Flow

1. Read the MDX. Confirm frontmatter is complete.
2. Invoke `newsletter-designer` agent. It will:
   - Validate frontmatter (subject ≤ 60 chars, preheader ≤ 90 chars, mascotMood set)
   - Check that `npm run dev` is running on :3000. If not, instruct user to start it.
   - Open the preview URL: `http://localhost:3000/newsletters/preview/<stream>/<slug>` — the user reviews in a browser.
   - Run a visual QA checklist (single CTA, no leaking markdown, mascot loads, code blocks readable).
3. After user confirms the preview, the agent edits frontmatter `status: draft` → `status: published` (only with explicit user OK).

## What This Does NOT Do

- Does not send. Run `/newsletter-publish` next.
- Does not modify body copy. If something reads wrong, kick to `newsletter-copywriter`.

## Preview URL Reminder

```
http://localhost:3000/newsletters/preview/<stream>/<slug>
```

Production builds return 404 on this route unless `NEWSLETTER_PREVIEW=enabled`.
