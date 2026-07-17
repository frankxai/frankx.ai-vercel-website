# FrankX Blog Multi-Hour Execution Report — 2026-07-15

**Lead:** Hermes (Yogabook Command Center / Frontend Queen)  
**Repo:** `frankxai/frankx.ai-vercel-website` @ `codex/blog`  
**Path:** `C:\Users\frank\starlight\repos\frankx.ai-vercel-website`

---

## 1. Where all blog articles live

| Role | Location |
|---|---|
| **Production SSOT (MDX + deploy)** | `content/blog/*.mdx` in `frankx.ai-vercel-website` |
| Private authoring twin | `starlight/repos/FrankX` (does **not** deploy) |
| Live URL | https://frankx.ai/blog |
| Images | `public/images/blog/` (+ `generated/`, `visual-system/`) |
| Visual manifests | `data/blog-visual-system.json`, `data/blog-heroes.json` |
| Empire strategy | `starlight/CONTENT-STRATEGY.md` |
| Repo strategy | `CONTENT_STRATEGY.md`, `docs/CONTENT_ROADMAP.md` (roadmap dated 2025-09 — refresh needed) |
| **New ops SSOT** | `data/blog-ops/` |

**Inventory:** **205** MDX articles (202 published_tree + 3 drafts). User estimate ~120 was low — full tree is larger.

---

## 2. Content strategy foundations

**Empire thesis** (`CONTENT-STRATEGY.md`): FrankX = demand engine; GenCreator productizes; Arcanea amplifies visuals; Starlight produces at scale.

**Repo pillars:** Agentic AI Integration 40% · Strategic Business Intelligence 25% · Creative/Innovation 20% · Community 15%.

**Cadence intent:** Monday flagship FrankX essays → productization → visual amplify → distribute → govern.

**Research foundations expected (and gap):** Tool roundups must be grounded in **current vendor docs**, not stale agent memory. Registry now tracks `content_review_status` = `not_recorded` until maker≠checker accuracy passes land. Pipeline v1 skills did not enforce source packs with access dates — called out in `SKILLS-PIPELINE-REVIEW.md`.

---

## 3. Master registry (deliverable)

| Format | Path |
|---|---|
| Excel | `data/blog-ops/article-registry-master.xlsx` |
| CSV (UTF-8 BOM for Excel) | `data/blog-ops/article-registry-master.csv` |
| JSON | `data/blog-ops/article-registry-master.json` |
| Markdown | `data/blog-ops/ARTICLE-REGISTRY.md` |
| Builder | `data/blog-ops/build_master_registry.py` |
| Git attribution | `data/blog-ops/git-attribution-2026-07-15.json` |

**Columns include:** slug, title, date, publish status, agent hint, git author/date/subject, hero path, header class, visual system prompt, visual review, content review, word count, images, SEO completeness /6, priority score, action needed.

**Snapshot (pre final re-scan):**

| Metric | Value |
|---|---:|
| Total | 205 |
| Missing hero (resolved) | 27 → shrinking after v11 batch |
| SVG slop risk heroes | 13 |
| Premium raster | 27 |
| Raster other | 138 |
| Visual system tracked | 68 |
| Avg words | ~1886 |
| Git author metadata | almost all `Frank` (agent lineage under-logged) |

---

## 4. Design / reading / SEO / AEO standard

Written: `data/blog-ops/BLOG-EXPERIENCE-STANDARD.md`

**Competitive bar summary:** cinematic 16:9 raster heroes (not SVG wallpaper), title in HTML, scannable measure, sticky TOC >1.8k words, AEO answer blocks + FAQ, maker≠checker on tool facts, Tier B heroes default, Tier C diagrams body-only.

**SVG policy:** decorative SVG heroes banned; replace queue = `replace_svg_header`.

---

## 5. Skills / pipeline review

Written: `data/blog-ops/SKILLS-PIPELINE-REVIEW.md`

| Skill | Verdict |
|---|---|
| source-command content pipeline | v1 skeleton OK; missing registry, provenance, accuracy gate |
| source-command blog | solid MDX checklist; weak AEO + ops |
| Codex imagegen | strong engine skill; needs FrankX DNA binding |
| Hermes FAL image_generate | **blocked** (no FAL_KEY) |
| Repo image router | **works via nano-banana/Gemini** |

**Working generation path today:**

```bash
# from frankx.ai-vercel-website with GEMINI_API_KEY from .env.local
npm run image:generate -- --provider nano-banana --prompt "..." --output public/images/blog/<slug>-hero-v11.jpg
```

Broken keys in `.env.local`: OpenAI 401, xAI 401, Replicate 401. Gemini OK.

---

## 6. Heroes generated this session (28)

Provider: **nano-banana / gemini-3-pro-image-preview** via `npm run image:generate`

**Disk:** `public/images/blog/*-hero-v11.jpg` → **28 files**  
**Registry after resync:** priority generate/replace queue **0** for published posts; only **3 draft** heroes still missing; **SVG hero risk = 0**

Includes: sovereign-curator, ElevenLabs/Higgsfield, ACOS zero-to-prod, agentic roadmap 2025, Claude Opus / Mistral SVG replaces, personal AI CoE, design sprint, philosophy, Willison, fitness, superpowers stack, Cursor vs Claude Code vs Windsurf, DeepSeek R1, ElevenLabs alts, faceless YT, Ollama vs LM Studio vs Jan, Suno vs Udio, multi-agent patterns, custom skills, brand evolution, conscious AI (×2), ultimate Canva/Descript/ElevenLabs/Gamma/Opus Clip workflows.

Frontmatter wired: `image`, `dateModified`, `ops*` provenance, `imageAlt` where applied.

Prompt logs: `data/blog-ops/prompt-log/` (~29 files)

**Visual QA sample** (`the-sovereign-curator-hero-v11.jpg`): emerald prism + cyan filaments + void architecture; no text/logos/people; cinematic — **~27–28/30 ship**. Full batch still needs export QA pass on remaining 27.

---

## 7. Subagent work

- Content accuracy/SEO/AEO patches on 3 tool posts (delegated)  
- Social OS + remaining hero queue docs (delegated)

---

## 8. Blockers / human gates

1. **Rotate/fix API keys:** OpenAI, xAI, Replicate invalid; Hermes FAL not configured  
2. **No external social send** without Frank / inversion veto  
3. **Content accuracy** still mostly `not_recorded` — needs second-model fact checks on tool posts  
4. Pre-existing `content:validate` / link debt may block full CI  
5. Do not force-push; draft PRs only when ready  

---

## 9. Next 4 hours (continuation plan)

| Wave | Work |
|---|---|
| A | Generate remaining ~20 priority missing/SVG heroes via nano-banana |
| B | Wire frontmatter + rebuild registry |
| C | Accuracy swarm on top 20 tool roundups (maker≠checker) |
| D | Reading UX: TOC + answer blocks on top 30 by traffic/featured |
| E | Social packs for 10 flagships (assets only; no auto-post) |
| F | Draft PR when batch coherent |

---

## 10. Files to open first

1. `data/blog-ops/ARTICLE-REGISTRY.md`  
2. `data/blog-ops/article-registry-master.xlsx`  
3. `data/blog-ops/BLOG-EXPERIENCE-STANDARD.md`  
4. `data/blog-ops/SKILLS-PIPELINE-REVIEW.md`  
5. `public/images/blog/*-hero-v11.jpg`  

---

*Report is ops residue; chat is not SSOT.*
