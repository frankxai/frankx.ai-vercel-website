# Founder Kit PRD

Status: draft for Frank's review, 2026-11-05. Owner: product. Nothing here is approved or built.

## Decision summary

Build one installer, `founder-kit`, that composes four things in a founder's own repo: the ACOS core plugin, one of five templates, a CLAUDE.md and AGENTS.md seeded from the founder's voice file, and a design.md and taste.md pair. Vercel is the first deploy target. Cloudflare Pages is a static-export variant of the same code. Docs teach the founder to rebuild each piece themselves. The kit is free. Paid packs come later and only from SKUs already in `data/products.json`.

Build order: research hub and blog share one codebase (slice 3), library reuses `library-os` (slice 4), book studio and content studio ship as skill packs before any web UI (slices 6 and 7).

## 1. Problem and evidence

A founder who wants Frank's setup today meets friction before the first useful command. Findings from the 2026-11-05 audits and a read of the repos:

1. **Install script permission.** `audits/02-acos-and-templates.md` records `install.sh` as git mode 100644, so `./install.sh` fails with "Permission denied" on a fresh clone while README, QUICKSTART and the /acos demo all use `./install.sh`. The local checkout at `/home/user/agentic-creator-os` now shows mode 100755. Re-check against remote `main` before slice 1 and close the finding if it holds.
2. **Three overlapping entry points.** The ACOS installer, the `creator-os-core` plugin (five skills and `/acos`, per `.claude-plugin/marketplace.json`) and `claude-skills-library` (114 skills, 7 packs per its README) all install "Frank's skills". Neither the ACOS README nor /acos says which to pick for which job. The README has a "Pick one install path" table; the site does not.
3. **Installer behavior surprises.** For `--platform=claude` the installer writes to the user profile and ignores `--target=DIR`. It has no uninstall. The audit found `--dry-run` printing a single "REPLACE <CLAUDE_HOME>" line instead of a file list, which contradicts the README.
4. **Stale counts on /acos.** `app/acos/page.tsx` says "99 agents. 35+ skills. 117+ commands" and "ACOS v10.2 loaded". The ACOS README reports 176 skill modules, 85 commands, 81 agents, v11, generated from the tree.
5. **No Cloudflare path anywhere.** The audit found no wrangler or Pages template in the site repo or ACOS. `data/deploy-targets.json` lists Vercel, Railway and n8n buttons only, and the Railway and n8n URLs look like placeholders.
6. **Research hub has no code.** `.claude/skills/research-hub-template/SKILL.md` is 19 lines of directives. The working implementation lives in `app/research/**` on frankx.ai and is not extractable as shipped.
7. **One deploy-ready template.** `library-os` (github.com/frankxai/library-os, linked from `app/library/build` and `app/library/approach`) is the only founder-relevant template with a Vercel clone button. Its repo state is unverified from this session. `data/templates.json` lists a "Blog + CMS Starter" (`nextjs-blog-cms`) with an empty `vercelDeployUrl` and no code link.
8. **Book and content studio are prompts only.** ACOS has `templates/library/{blog,email,product,video}` and commands such as `/author-team`, `/content-studio`, `/factory`. None deploys.

Cost of doing nothing: the audience that finds /acos or /templates cannot get from "interested" to "running" without reading three READMEs.

## 2. ICPs and the job each hires the kit for

Principle for all three: route by constraint and stage, never by demographic. No testimonial or audience statistic appears in any copy unless it is real and sourced.

| ICP | Job | First-run result |
|---|---|---|
| Solo founders running agent fleets | Get a repo where skills, hooks and instructions are already wired, so each new agent session starts with the same rules | A repo that passes its own checks, with `CLAUDE.md` and `AGENTS.md` carrying their voice |
| Women building with AI | Start from what they already have and publish one working thing this week, with plain steps and visible escape hatches | A deployed research hub or blog with their own first entry |
| Creators with large audiences | Turn existing writing, talks or video into a hub they own, with sources and a feed | A library or content studio that holds their back catalog and exports to their channels |

For the second row: copy is situation-based ("start where you are", "build one working thing"), uses no rescue or overcoming framing, no combat language, and no gendered labels. A `/for/` page for this audience does not exist today; the nav audit (`audits/03-ia-nav-sitemap.md` section 5.5) says not to imply one before it does.

## 3. Product shape: the `founder-kit` command

One command composes existing parts. It does not fork them.

```
npx founder-kit init [dir] [flags]
```

Flow, in order. Each step prints what it will do and waits for `y` unless `--yes`.

1. **Preflight.** Check node 18+, git, a clean working tree. Detect existing `.claude/`, `CLAUDE.md`, `AGENTS.md`, `design.md`, `taste.md`. Write nothing yet.
2. **Pick.** Ask for a template (`research-hub`, `library`, `blog`, `book-studio`, `content-studio`) and a deploy target (`vercel`, `cloudflare`, `none`).
3. **Voice file.** Ask for a path to a voice file, or offer the starter at `voice/VOICE.example.md`. The file is copied to `.founder-kit/voice.md` and quoted into the seeded instructions. No voice file means the instructions carry only the neutral editorial rules.
4. **Plan.** Print the full file list with action per file: create, skip (exists, differs), or merge (settings only). Stop here if `--dry-run`.
5. **Apply.** (a) Install `creator-os-core` through the plugin marketplace command, or print the command if the CLI is absent. (b) Copy the template tree. (c) Seed `CLAUDE.md` and `AGENTS.md` with marked blocks. (d) Write `design.md` and `taste.md` from the template's starter pair. (e) Write `.founder-kit/manifest.json` listing every file written with its sha256.
6. **Verify.** Run the template's own `pnpm install`, `type-check` and `build` only with `--verify`. Print the result; never hide a failure.
7. **Next steps.** Print the deploy button URL or the `wrangler pages deploy` command. Stop.

Flags: `--template`, `--deploy`, `--voice <path>`, `--dry-run`, `--yes`, `--verify`, `--target <dir>`, `--no-plugin`, `--uninstall`.

**Idempotency.** Seeded blocks sit between `<!-- founder-kit:start -->` and `<!-- founder-kit:end -->`. A re-run replaces only that block. A file that exists and differs is skipped and listed, never overwritten. Same inputs produce the same tree.

**Uninstall.** `--uninstall` reads `.founder-kit/manifest.json`, removes files whose sha256 still matches, leaves edited files and lists them, removes the marked blocks, and deletes the manifest last.

**Never does.** Read or write secrets or `.env` files. Run a deploy. Create a Vercel or Cloudflare project. Push to git. Touch files outside `--target`. Write to the user profile directory (unlike the ACOS installer today). Add network calls beyond fetching the pinned template tarball and, with `--verify`, the package registry.

Implementation pattern: follow `packs/*/install.sh` in `claude-skills-library` (idempotent, `--dry-run`, merges hooks without touching other entries). `packs/stack-kits/install.sh` is the closest model.

## 4. The five templates

Shared contract for all five:

- Next.js App Router, MDX content in `content/`, one `catalog.json` generated at build, `feed.xml`, `llms.txt`, `sitemap.xml`.
- `next.config` reads `DEPLOY_TARGET`; `cloudflare` sets `output: 'export'`. Anything needing a server (search API, forms) degrades to a static fallback or a documented adapter.
- `design.md` and `taste.md` at root, shortened from the frankx.ai pair. They outrank any skill in the repo.
- **Evidence gate.** Borrowed from `docs/research/PUBLICATION-BOUNDARY.md`. An entry renders the "Reviewed" badge only when its frontmatter `status: reviewed` is backed by at least one source with a URL and a locator, and a `reviewer` that differs from `author`. A prebuild script fails the build otherwise. Entries without that stay `status: draft`, are `noindex`, and are left out of the feed and sitemap. This applies to every template that renders claims.

Common frontmatter fields: `title`, `slug`, `date`, `author`, `status` (`draft` | `reviewed`), `reviewer`, `sources[]` (`{ url, locator, retrieved }`), `tags[]`, `summary`.

### 4.1 Research hub

- Today: live routes in `app/research/**` (hubs, sources, methodology, feed) on frankx.ai; skill stub at `.claude/skills/research-hub-template/SKILL.md`.
- Extract: `[slug]`, hub index, `feed`, the prebuild publication gate, a minimal loader. Leave out the model arena, domain registries and generated leads.
- Tree: `app/research/{page,[slug]/page}.tsx`, `app/feed.xml/route.ts`, `app/llms.txt/route.ts`, `content/research/*.mdx`, `scripts/{catalog,gate}.mjs`, `data/approved-claims.json` (empty), `design.md`, `taste.md`.
- Extra frontmatter: `question`, `method`, `limitations`.
- Deploy: Vercel clone button; Cloudflare via static export. 
- Accept: build fails on a `reviewed` entry with no source; a clean template builds with zero entries; RSS has no items until one entry is reviewed; Lighthouse accessibility check passes on the index and one entry.

### 4.2 Library

- Today: `github.com/frankxai/library-os` with Vercel clone button, skill `library-os`, pages `/library/build` and `/library/approach`. Repo currency unverified.
- Extract: verify the repo is public and builds; add `DEPLOY_TARGET=cloudflare`; add the evidence gate to summaries that quote a book.
- Tree: `app/library/{page,[slug]/page}.tsx`, `content/library/*.mdx`, `data/collections.json`, `scripts/catalog.mjs`.
- Extra frontmatter: `work`, `creator`, `edition`, `quotes[]` (each with page or timestamp locator).
- Accept: quote without locator fails the gate; collection index builds from `collections.json`; clone-to-live on both targets documented and tested once by a human.

### 4.3 Blog

- Today: `nextjs-blog-cms` listed in `data/templates.json` with no code; ACOS `frankx-ai-blog` command and `templates/library/blog`.
- Extract: same codebase as the research hub with `kind: blog` in config. Blog posts need no `sources[]`; a post that asserts a statistic must carry one.
- Tree: research-hub tree with `content/blog/` and `app/blog/**`.
- Accept: one codebase, two routes (`/research`, `/blog`) switchable by config; RSS and `llms.txt` list only published posts.

### 4.4 Book studio

- Today: skills `book-publishing`, `excellence-book-writing`; commands `/author-team` and `/author-council`. No deployable template.
- Extract: skill and command pack first, plus a markdown book repo.
- Tree: `book/outline.md`, `book/chapters/NN-title.md`, `book/research/` (source notes), `book/style.md`, `scripts/export.mjs` (markdown to EPUB and PDF through pandoc), `.claude/commands/book-*.md`.
- Extra frontmatter per chapter: `status` (`outline` | `draft` | `edited` | `final`), `word_target`, `sources[]`.
- Gate: a chapter marked `final` needs a named human editor in frontmatter.
- Deploy: static reader site optional; the export files are the product.
- Accept: `export.mjs` produces EPUB and PDF from the sample book; outline-to-draft-to-edit commands run in order and refuse to skip a stage.

### 4.5 Content studio

- Today: private `/admin/content-studio` on frankx.ai; ACOS commands `/content-studio`, `/studio`, `/factory`.
- Extract: commands and `templates/library/*` as a pack; web UI later and only after demand shows.
- Tree: `content/inbox/`, `content/drafts/`, `content/published/`, `.claude/commands/{capture,draft,edit,package}.md`, `data/channels.json`, `scripts/package.mjs` (one source to channel-specific drafts).
- Extra frontmatter: `source_id`, `channels[]`, `approved_by`, `approved_at`.
- Gate: nothing moves to `published/` without `approved_by`. The kit never posts; it writes drafts for the founder to send.
- Accept: one source entry produces drafts for each configured channel; a draft without approval cannot be moved by the packaged script.

## 5. Where it lives

Recommendation, pending the gate below:

- **Installer and skill packs** go in `claude-skills-library` as `packs/founder-kit`, next to `stack-kits` and `web-excellence`. It already has the pack contract, per-pack tests and CI.
- **Templates** go in new repos only if the placement gate allows, one per template (`founder-research-hub`, `library-os` existing, `founder-book-studio`, `founder-content-studio`), with the blog as a config of the research hub. Fallback if the gate says no: `templates/` subdirectories in one repo, which is how `templates/rag-starter` already ships from the site repo with a Vercel subdirectory button.
- **ACOS** stays the source of skills and commands. The kit installs `creator-os-core`; it does not copy ACOS.

**Gate, not a decision.** New repositories go through `agentic-ops` `registry/REPOSITORY_PLACEMENT.md`, where an existing canonical owner wins, and new Vercel projects need a row in `starlight/ecosystem.json` first. Slice 2 opens that request; no repo is created before it returns.

## 6. Site surfaces on frankx.ai

No new URLs without approval. Homes are `/templates` and `/acos`, with `/library/build` and `/developers` linking in. Homepage and `components/home/**` are untouched.

| Route | Goal | Primary CTA | Proof | KPI |
|---|---|---|---|---|
| `/acos` | Make one install path obvious and correct | Copy the `founder-kit init` command | Counts generated from the ACOS repo at build, with a date | Share of visits that copy the command |
| `/templates` | Show the five templates with deploy buttons | Deploy to Vercel (secondary: Cloudflare steps) | Each template links to its live example and repo | Template page to deploy-click rate |
| `/library/build` | Existing Library OS guide, extended with Cloudflare | Deploy library | The live /library | Deploy clicks |
| `/developers` | Docs that teach building your own | Read "build your own" | Worked example per template | Docs to install-command copy |

Page facts:

- `/acos` first fixes the stale "99 agents / v10.2" copy. Counts come from the ACOS verify script output, not hand-typed.
- Page copy follows `CREATOR.md`: why the page exists, what Frank built or tested, the smallest next step. Run the name-swap test before merge.
- Each change goes through `web-release-gate`: captures at 375, 768 and 1440, reduced-motion and keyboard checks.

## 7. Funnel and monetisation

1. **Free kit.** Installer, five templates, docs. Entry points: /acos, /templates, GitHub, the claude-skills-library README.
2. **Email.** Existing `/newsletter` capture. No new list.
3. **Paid template packs.** Only the SKUs already in `data/products.json`: `starter-kit`, `command-center-template`, `agentic-content-engine`, `creative-ai-toolkit`. They stay on waitlists via `/waitlist?intent=<slug>`. Checkout stays gated as the funnel audit found. No price appears in this PRD or in kit copy; the product records own prices.
4. **Advisory.** `agentic-creator-os` (apply) and `founders-circle` (apply) remain application flows. The kit's final screen links to them as one text link.

The kit makes no income, revenue or time-saved claim. Copy states what installs and what it needs from the founder.

## 8. Milestones as PR-sized slices

Every slice branches `agent/<harness>/<scope>` from `origin/main`, opens a draft PR, and stays inside the 3-open-PR cap per harness per repo. Reviews come from a different vendor than the maker.

| # | Slice | Repo | Verification | Owner type |
|---|---|---|---|---|
| 1 | Fix ACOS first run: executable bit if still needed, `--dry-run` file list, README single path table | agentic-creator-os | `npm run verify:public-surface`; `./install.sh --dry-run --platform=claude` prints file list | Claude harness |
| 2 | Placement request for templates and `founder-kit`; verify `library-os` repo state | agentic-ops (request), read-only checks elsewhere | Registry entry merged or declined; `gh repo view frankxai/library-os` | Human decision, Codex drafts |
| 3 | Research hub and blog template with evidence gate and Cloudflare export | per slice 2 | `pnpm type-check && pnpm build` on both `DEPLOY_TARGET` values; gate test fails an unsourced `reviewed` entry | Claude harness |
| 4 | Library OS: Cloudflare variant, quote-locator gate | library-os | Same build matrix; `node --test` for the gate | Claude or Codex |
| 5 | `packs/founder-kit` installer: flow, manifest, uninstall | claude-skills-library | `node --test`; `python3 scripts/validate_skills.py`; dry-run and uninstall round trip leaves tree identical | Claude harness |
| 6 | Book studio skill pack and sample book | per slice 2 | `node scripts/export.mjs` yields EPUB and PDF; stage-order test | Codex or Grok |
| 7 | Content studio pack | per slice 2 | Packaging script test; approval-gate test | Codex or Grok |
| 8 | Docs: "build your own" for each template, linked from `/developers` | frankx.ai | `pnpm run type-check`, `lint`, `ai-slop:audit:strict`, `build`, `merge:gate` | Claude harness |
| 9 | `/acos` and `/templates` update: generated counts, install command, deploy buttons | frankx.ai | Same set plus `web-release-gate` captures at 375/768/1440 | Claude harness with human review |
| 10 | Fresh-machine test on Vercel and Cloudflare, recorded | all | A person follows the docs cold; log shows time and every deviation | Frank or a trusted tester |

Sequence: 1 and 2 first and in parallel; 3 and 5 after 2; 4, 6, 7 follow; 8 and 9 land after the templates they describe; 10 last.

## 9. Risks and open decisions for Frank

1. **Which repo shape** for templates: separate repos per template or one `templates/` monorepo, after the placement gate answers?
2. **Which license** for the kit and templates: MIT like claude-skills-library, or Apache-2.0 like current ACOS?
3. **Which voice-file format** seeds the instructions: the `CREATOR.md` shape used in this repo, or a shorter founder-facing form?
4. **Which Cloudflare surface** is supported first: Pages static export only, or Workers for server features such as search?
5. **Which proof** goes on /templates: live examples built on your own content, or sample content labeled as sample?
6. **Which paid pack** is first on the waitlist path from the kit, chosen from the four existing SKUs, and does it wait until the free kit has been run cold by an outside person?

Unverified in this session: remote repos (`library-os`, `frankxai/skills`, `frankxai/creator-skills`), whether any dependency named above is current, and every live URL. Treat them as checks inside slices 1 and 2.
