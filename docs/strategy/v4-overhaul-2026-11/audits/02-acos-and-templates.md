# ACOS / founder-kit audit (read-only, 2026-11-05)

## 1. Why ACOS README has no images
- frankxai/agentic-creator-os/README.md (229 lines) has zero image refs (no ![], <img>). Only a mermaid block.
- Local clone is shallow (50 commits, oldest 8a481b6 2026-10-01), so `git log -p --follow` cannot reach it. Found via GitHub API (`gh api .../commits/<sha>`).
- Last README WITH images: 0436f56 (2026-08-27, "Adopt Apache-2.0"): 7 refs: hero docs/infographics/acos-hero-omega.png (l.9), 3 shields.io badges (l.11-13), docs/infographics/acos-architecture.png (l.64), acos-smart-router.png (l.387), acos-self-learning.png (l.422).
- Removed by 3ada128 (2026-09-07, "Verify portable ACOS installation and reconcile current licensing (#44)"), README +157/-634: whole README rewritten as "verified public surface" truth-gate; all images dropped deliberately/collaterally. Later rewrites (e49ed1e #135, 44abbc7 #142) never restored them.
- Not a broken path: the assets still exist and are intact: docs/infographics/*.png (27 files, ~21MB; the four above are 1024x1024 PNG). No LFS (.gitattributes only sets LF for agents). No assets were deleted.
- Candidates in frankx.ai repo: public/images/acos-hero.png, public/images/readme-hero.png (+_thumb.jpeg), public/images/downloads/acos-{skills,hooks,commands}-pack.png, public/images/blog/acos-quick-start-hero.png, acos-agent-orchestration-diagram.jpeg. Not needed: repo-local files are enough and keep README self-contained.
- Fix (smallest): after the closing </div> of the header block, insert
  `![Agentic Creator OS](docs/infographics/acos-hero-omega.png)` (wrap in <img width="720"> since 1024px square)
  and optionally `![Layered architecture](docs/infographics/acos-architecture.png)` under "How the pieces fit" (above/next to mermaid), `acos-smart-router.png` under "Start with the system".
  Skip acos-self-learning.png (self-learning claims not verified). Caveats: infographics contain old counts/versions (v7-stats-banner.png etc.); check hero/architecture text for stale numbers before reuse, regenerate if they quote counts. Also scripts/check-readme-facts.mjs verifies referenced file paths exist; images will pass since files exist. Do NOT use v7-* (stats baked in).

## 2. What a founder gets today (install paths)
A. ACOS full: `git clone ... && ./install.sh --platform=claude` (README, QUICKSTART). Flags: --platform=claude|cursor|windsurf|gemini|grok|antigravity|generic|all, --minimal, --full, --dry-run, --target=DIR. Claude path writes into CLAUDE_HOME/~/.claude (not the project) and refuses on differing files; no uninstall.
B. ACOS marketplace plugin: `claude plugin marketplace add frankxai/agentic-creator-os` + `claude plugin install creator-os-core@frankx-creator` (also codex/grok variants). Only 5 skills + /acos. Verified: .claude-plugin/marketplace.json names match.
C. claude-skills-library: `/plugin marketplace add frankxai/claude-skills-library`; `npx skills add frankxai/claude-skills-library` (+ frankxai/skills, frankxai/creator-skills); or clone + cp free-skills. 104 free-skills dirs, validate_skills passes (122 files). packs/ (7): agent-infrastructure, estate-guard, film-excellence, risk-classifier, routine-contract, stack-kits, starlight-neutron, web-excellence; each has own install.sh (`packs/<p>/install.sh /path/to/repo [--dry-run]`).
D. frankx.ai pages: /acos (clone + `./install.sh` demo), components/agents/install-command.tsx on /agents (generates `git clone --depth 1 ... && bash ./agentic-creator-os/install.sh --platform=X --target=.`; tested in scripts/tests/acos-install-command.test.mjs), /skills (plugin marketplace line), /resources/skills (zip + clone + cp), /downloads/* kits (zip + sha256, e.g. ahmad-founder-creator-kit-v0.1.0).
Friction / broken:
1. install.sh is git mode 100644 (git ls-files -s): `./install.sh` -> "Permission denied" on fresh clone. README, QUICKSTART, /acos terminal demo all use `./install.sh`. Site /agents command uses `bash` so works. Fix: `git update-index --chmod=+x install.sh` or docs use `bash install.sh`.
2. /acos page contradicts itself and README: "99 agents. 35+ skills. 117+ commands" (l.205) vs "75 skills / 38 agents" and "ACOS v10.2 loaded" (l.229) vs repo truth 176 skills/85 commands/81 agents/v11.
3. `--dry-run --platform=claude` prints only "REPLACE <CLAUDE_HOME>", not a file list, contrary to README ("prints the files").
4. Three overlapping entry points (ACOS installer, creator-os-core plugin, skills library) with no "pick one" decision on README or site. `--target=.` is ignored for claude (writes to profile) which the site notes but README top quickstart does not.
5. `npx skills add frankxai/skills` and `frankxai/creator-skills` and agentic-creator-skills: could not verify existence (no GitHub access in session, proxy 403). Verify before promoting.
6. README top has duplicate Quick start + Install from source; marketplace line in quickstart is commented out.
7. No founder-specific path: no "init a founder workspace" command exposed on site; hub-generator/init-hub.md exists (/acos:init-hub wizard) but not linked from README.

## 3. Template inventory
name | repo/path | builds | deploy-ready? | linked from
- RAG Starter | frankx.ai-vercel-website/templates/rag-starter | RAG app (AI SDK 6 + Supabase pgvector) | Yes: README has Vercel deploy button to repo subdir tree/main/templates/rag-starter | data/templates.json, data/ai-architecture/showroom.ts, site-wiring.json
- Multi-agent | templates/multi-agent | Next.js multi-agent app | Likely (package.json, app/); no button verified | showroom
- MCP server kit | templates/mcp-server-kit | MCP server (TS) | npm package, not web deploy | showroom
- Context kit | templates/context-kit | AGENTS.md/CLAUDE.md starter | n/a (copy) | showroom
- Agent payments guard | templates/agent-payments-guard | payments guard lib | library | showroom
- Swarm governance starter | templates/swarm-governance-starter | governance | ? | showroom
- Library OS | github.com/frankxai/library-os (remote; REPO_URL in app/library/approach, app/library/build) + skill .claude/skills/library-os | LIBRARY (book deep-dives site) | YES: Vercel clone button on /library/approach and /library/build | /library/build, /library/approach, /templates ("Creator Knowledge & Library OS")
- Research hub template | .claude/skills/research-hub-template/SKILL.md (SKILL only, ~20 lines; no repo/template code) | RESEARCH HUB scaffold spec | No: instructions only | not linked; live example is frankx.ai/research (app/research/**, hubs/[hub])
- Property portal | github.com/frankxai/property-portal-template (remote, unverified) | property portal | button on /work/property-intelligence-os | that page
- Enterprise RAG | frankxai/enterprise-rag-template (data/template-configs/enterprise-rag/README.md) | RAG | button in README | /ai-architecture
- deploy-targets.json: rag-starter-kit, content-platform-starter, misinfo-guardian-dashboard (Vercel buttons); railway.app/template/* and n8n.io/workflows/* URLs look like placeholders; all templateProducts status "coming-soon", purchaseUrl empty. githubTemplateUrl for 2 blueprints blank.
- creator-launch-os | content/v0/foundry.ts Vercel clone link (remote, unverified) | creator launch site | button | /foundry/guide
- vercel/chatbot | official, in OfficialArchitectureAtlas | chat | button | /ai-architecture
- Free HTML templates (COE checklist, rubric, risk register, governance; Vibe OS guide; 5 Suno prompts) | public/templates, public/pdf-templates | docs | n/a | /templates
- data/templates.json: 15 sellable packs incl. "nextjs-blog-cms" (Blog + CMS Starter), nextjs-saas-boilerplate, n8n pipelines; no deploy URL (vercelDeployUrl empty in v0-generations.json).
- Founder kits: public/downloads/*-kit-v0.1.0.zip (ahmad-founder-creator-kit, jojo hospitality, property, epicways, obsidian second-brain starter) | zips with install docs | download-ready | /downloads/*, /friends
- ACOS in-repo: templates/library/{blog,email,product,video}, templates/starter, hub-generator/* (/acos:init-hub), commands content-studio, studio, frankx-ai-blog, library-* | prompt templates, not deployable sites.
- Cloudflare: NONE. No wrangler/Pages template anywhere; only "cloudflare" mentions in architecture atlas/blueprints text. Universal (host-agnostic) template: none.
Note: could not verify remote repos (GitHub 403 via proxy); treat all frankxai/* remote links as unverified.

## 4. Gap analysis vs founder kit
1. Research hub: exists only as live site routes (frankx.ai/research) + 20-line skill. Missing: extractable template repo (Next.js static, MDX loader, catalog.json, RSS, llms.txt), deploy button. Smallest: extract app/research minimal subset into templates/research-hub (route /research, [slug], feed.xml, llms.txt) with Vercel button; flesh out SKILL.md to point at it. ~2-3 days.
2. Library: BEST covered (library-os repo + skill + Vercel button + /library/build). Missing: verify repo is public/current; add Cloudflare Pages path (static export) and link from ACOS README.
3. Blog: only data/templates.json "nextjs-blog-cms" (no code/link) and ACOS prompt templates. Smallest: generate a blog template from library-os schema (MDX + RSS) or reuse the research-hub template with `kind: blog`; one template can cover blog + research hub.
4. Book creation studio: nothing deployable. Assets: book-publishing / excellence-book-writing skills, author-team command, .claude/commands/author-*. Smallest: a skill+command pack ("book-studio": outline->chapters->edit->export) plus markdown book repo template (mdBook/Next MDX); not a web app first.
5. Content studio: /admin/content-studio is private admin; ACOS has /content-studio, /studio, /factory commands. Missing: public template. Smallest: package commands+templates/library as a pack; web UI later.
Cross-cutting: one `founder-kit` meta-installer (claude-skills-library pack) that installs creator-os-core + chosen template + CLAUDE.md; a docs page "build your own" (SKILL-builder at /skills/builder exists; extend). Add Cloudflare Pages = static export variants of research/library/blog (wrangler.toml + `output: 'export'`), keeps one codebase, Vercel+CF buttons.

## 5. ACOS README weakest sections (ranked)
1. No visuals at all (removed 3ada128); first screen is text + counts table. Restore hero + architecture.
2. Unclear first run: two Quick start blocks (top and "Install from source"), `./install.sh` not executable, commented marketplace lines; no "what you will see / first command to type" until line ~120.
3. Stale/contradictory status: "Wave 0 (Experimental/Development)" label beside "176 skills" claims; site /acos shows different counts.
4. Count table dominates top ("Verified public surface") before value proposition; one-line promise "public source repository of AI workflows" is vague.
5. "Release discipline"/"Verification" sections are maintainer content in a user README; belongs in CONTRIBUTING.
6. Agent OS section jargon (Generals, Queens, Expertise Kernel) with no founder-readable example.
7. Practice receipt section off-topic for first-time users; Related systems list thin.
(Slop is low; language is plain and honest. Weakness is structure and visuals, not hype.)
