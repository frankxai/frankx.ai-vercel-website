# Research delivery — Agentic Life Infrastructure (2026-07-16)

## 4-fact git

| Fact | Value |
|------|-------|
| Path | `C:/Users/frank/starlight/repos/.hermes-worktrees/frankx-agentic-life-research` |
| Toplevel | same (worktree of frankx.ai-vercel-website) |
| Origin | `https://github.com/frankxai/frankx.ai-vercel-website.git` |
| Branch | `agent/hermes/agentic-life-research` (from `origin/main`) |

Main checkout was dirty on `codex/blog` (Codex-owned). Work landed in isolated Hermes worktree.

## Artifacts

### Hub domains (routes via `/research/[slug]`)

- `/research/agentic-life-architecture`
- `/research/agentic-memory`

Registry: `lib/research/domains.ts`  
Sources: `lib/research/sources.ts`  
Cross-link: `context-engineering` relatedDomains updated

### Embedding-ready briefs

- `content/research/briefs/agentic-life-architecture-2026.mdx`
- `content/research/briefs/agentic-memory-2026.mdx`

## Thesis

Agentic life infrastructure ≠ better chatbot memory plugin. It answers five structural failures:

1. Context does not compound across tools/sessions  
2. Specialization does not compose into a coherent OS  
3. Sovereignty is fake (lock-in / no export)  
4. Quality is unverifiable (no receipts / trajectory evals)  
5. Life is multi-domain; tools are single-feature  

## Competitive / inspo / partners ops (embedded)

Role tags for the living registry: **compete · inspire · partner/integrate · avoid**.  
Score each entity on the five failure modes + sovereignty + export + receipts.  
Public lists live in research domains + `sources.ts` + `awesome-agent-operating-systems`.  
Private partner CRM stays in operator systems (ops-hub / SIS), never unsanitized on frankx.ai.

## Next

- Draft PR from `agent/hermes/agentic-life-research` (`gh pr create --draft`)  
- Optional: wire briefs into research brief route if not auto-discovered  
- Optional: queen report mirror under `starlight/queen/reports/` if ops wants estate receipt  

## Hub cluster expansion

- `/research/agentic-sovereignty`
- `/research/agentic-evals`
- Production plan: `docs/research/agentic-life-research-production-plan-2026-07-16.md`
