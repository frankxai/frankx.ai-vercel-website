# Blog hero prompt log

**Path:** `data/blog-ops/prompt-log/`  
**Purpose:** Durable provenance for every generated blog hero (and major regenerations).  
**Related:** `BLOG-EXPERIENCE-STANDARD.md`, `HERO-GENERATION-QUEUE.md`, MDX `ops.heroPromptPath`.

---

## Convention

### One file per article slug

```
data/blog-ops/prompt-log/{slug}.md
```

Examples:

- `the-sovereign-curator.md`
- `claude-opus-4-8-analysis-2026.md`

Use the **MDX slug** exactly (no `-hero`, no version suffix in the filename).

### Required front matter (YAML-ish bullets at top)

```markdown
# Hero prompt — {slug}
- date: YYYY-MM-DD
- provider: nano-banana (gemini-3-pro-image-preview)   # or other when used
- model: {model id if known}
- output: /images/blog/{slug}-hero-v11.jpg
- agent: hermes|codex|claude|grok|human
- status: generated|accepted|rejected|iterating
- visual_qa_score: 0-30   # optional until inspected
- visual_qa_status: pass|iterate|restart
- notes: short reason if rejected/restarted
```

### Required body

```markdown
## Prompt
{full exact prompt string used for generation}

## Variants (optional)
### v11b
{prompt delta if re-rolled}

## Acceptance notes (optional)
- crop OK at 1200×630: yes/no
- safe zones: ok
- bans violated: none | list
```

### Status values

| Status | Meaning |
|---|---|
| `generated` | File written; not fully QA’d |
| `accepted` | Visual QA ≥26/30; wired in MDX |
| `iterating` | Needs re-roll or crop fix |
| `rejected` | Below 22 or ban violated; keep log for learning |

---

## When to write

1. **Immediately after** a successful `npm run image:generate` (or any provider).  
2. **On every re-roll** — append a `## Variants` section; do not delete prior prompts.  
3. **On frontmatter wire** — set `ops.heroPromptPath: "data/blog-ops/prompt-log/{slug}.md"`.  
4. **Never** commit secrets (API keys) in prompt logs.

---

## Command → log → wire loop

```bash
npm run image:generate -- --provider nano-banana --prompt "..." --output public/images/blog/{slug}-hero-v11.jpg
```

Then:

1. Create/update `prompt-log/{slug}.md` with the **exact** prompt.  
2. Set MDX `image: "/images/blog/{slug}-hero-v11.jpg"`.  
3. Update registry when batching (`visual_review_status`, `prompt_used`, hero path).  
4. Social/OG only after raster exists (see `SOCIAL-DISTRIBUTION-OS.md`).

---

## Naming vs image files

| Artifact | Pattern |
|---|---|
| Prompt log | `prompt-log/{slug}.md` |
| Hero image | `public/images/blog/{slug}-hero-v{N}.jpg` |
| Frontmatter | `image: "/images/blog/{slug}-hero-v{N}.jpg"` |
| Social pack | `social-packs/{slug}/` (optional) |

Bump `v{N}` when replacing a shipped hero; keep old prompt sections in the same log file.

---

## Quality bar (reminders)

- No readable text, logos, people, robots, purple gradient soup.  
- Void `#0a0a0b` + emerald `#10b981` + cyan `#06b6d4`.  
- Safe zones top ~12% / bottom ~22%.  
- SVG wallpaper is **not** a valid final hero — log replace_svg runs as raster generations.

---

## Inventory note

Files already present in this folder are live session logs for the v11 batch.  
Missing slug file = treat as **no provenance** until logged, even if an image exists on disk.

---

*Do not use this folder for article body drafts or social copy — only image generation provenance.*
