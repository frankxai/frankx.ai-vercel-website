# Skills & Pipeline Review — FrankX Content (2026-07-15)

## Scope reviewed

| Skill / surface | Path | Verdict |
|---|---|---|
| `source-command-frankx-ai-content-pipeline` | `.agents/skills/...` | **Useful skeleton, incomplete for 2026 scale** |
| `source-command-frankx-ai-blog` | same | **Good MDX checklist, weak provenance + AEO** |
| Codex `imagegen` | `~/.codex/skills/.system/imagegen` | **Strong tool skill; needs FrankX brand brief binding** |
| Hermes `image_generate` (FAL) | runtime | **Available for batch heroes; must log + move into repo** |
| Existing visual OS | `data/blog-visual-system.json` | **Good manifests; SVG batch polluted hero quality** |

---

## What is already good

1. **Pipeline stages** IDEATE → DRAFT → POLISH → IMAGES → PUBLISH → DISTRIBUTE → ANALYZE are correct.
2. **Voice checklist** in blog skill (anti-slop phrases, first person, internal links).
3. **Premium image plan** + visual system manifests show multi-agent work already ran.
4. **Two-repo deploy awareness** exists in AGENTS.md (authoring vs production).

---

## Critical gaps (degrees of excellence missing)

| Gap | Impact | Fix |
|---|---|---|
| No **article registry SSOT** | Can't run 200-post ops | **Done:** `data/blog-ops/article-registry-master.*` |
| No **agent provenance** in frontmatter | Can't answer "who wrote/reviewed" | Add `ops:` block (see BLOG-EXPERIENCE-STANDARD) |
| No **maker≠checker** for vendor docs | Stale AI tool claims | Accuracy agent + `sourcesChecked` |
| **SVG treated as hero** | Visual slop / weak OG | Ban SVG heroes; Tier B raster default |
| Image skill not bound to **FrankX taste DNA** | Random pretty images | Always inject prompt DNA + safe zones |
| Social stage is aspirational | Distribution doesn't fire | Social packs + human gate queue |
| CONTENT_ROADMAP dated **2025-09** | Strategy drift | Refresh quarterly from empire CONTENT-STRATEGY |
| `content:validate` / link debt blocks gates | Agents skip quality | Fix blockers or quarantine debt in CI |
| Excel not automated | Operators use sheets | Registry builder now emits CSV/XLSX |

---

## Redesign of content pipeline (v2 recommended)

```
0. REGISTRY claim (slug, agent, branch)
1. RESEARCH pack (vendor docs + arxiv + competitors) with access dates
2. OUTLINE + AEO answer block
3. DRAFT (Frank voice)
4. POLISH (humanizer)
5. ACCURACY (different model) → pass/fail evidence
6. HERO (imagegen/FAL/Codex) + visual QA score
7. SEO/AEO gate (title/desc/schema/internal links)
8. SOCIAL pack (optional same PR)
9. REGISTRY update + draft PR
10. ANALYZE week-1 metrics
```

### Excellence degrees (score each article 0–5)

1. **Truth** — claims sourced, tools current  
2. **Voice** — Frank signal, no AI sludge  
3. **Structure** — scannable, AEO-citable  
4. **Visual** — Tier B hero, diagrams only when needed  
5. **Distribution** — OG + social ready  
6. **System** — registry + provenance complete  

Ship only if average ≥4.0 and Truth ≥4.

---

## Immediate skill patches (recommended)

1. Patch content-pipeline to require registry row + ops frontmatter.  
2. Patch blog skill: ban SVG hero; require AEO block + dateModified.  
3. Add thin wrapper skill `frankx-blog-hero-gen` that always loads taste DNA + writes prompt-log.  
4. Keep Codex imagegen as engine; do not invent parallel generators without VIS routing.

---

## Decision

Treat current source-commands as **v1 process docs**.  
Operational SSOT for this multi-hour program:

- `data/blog-ops/ARTICLE-REGISTRY.md`
- `data/blog-ops/BLOG-EXPERIENCE-STANDARD.md`
- this file

Promote improved pipeline into `.agents/skills` only after 20 posts complete the v2 loop with evidence.
