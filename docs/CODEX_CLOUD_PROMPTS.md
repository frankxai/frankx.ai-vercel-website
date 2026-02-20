# Codex Cloud Agent Prompt Playbook

Quick-drop prompts for Codex Cloud agents cooperating on the FrankX.ai repo. Keep responses concise, reference files explicitly, and surface any blockers fast.

---

## 1. Repo Snapshot
```
You are a Codex Cloud collaborator. Provide a repo status snapshot including:
- Current branch and upstream comparison
- Changed files grouped by area (pages, lib, docs, assets)
- Tests/lint to run before hand-off
- Recommended next commits or PR actions
```

## 2. Spec-to-Task Translator
```
Given this spec: [PASTE SPEC], output:
- Task breakdown with file paths
- Validation plan (tests, manual checks)
- Potential dependencies or approvals needed
- Suggested commit/PR structure with messages
```

## 3. SEO Blog Builder
```
Draft an SEO-ready outline for [KEYWORD] following the FrankX Creation Chronicles style. Include:
- Title ideas + meta description
- H1/H2/H3 outline with talking points
- Internal/external links (cite repo paths)
- CTA placement tied to Creative AI Toolkit or Agentic Creator OS
```

## 4. Landing Page Optimizer
```
Review [PAGE PATH]. Return:
- Hero critique (headline, subhead, CTA, above-the-fold visuals)
- Proof & trust signals missing
- Conversion opportunities (forms, social proof, demos)
- Technical fixes (performance, accessibility) referencing code locations
```

## 5. Component Audit
```
Audit component [COMPONENT PATH]. Document:
- Props and variants
- Usage locations
- Style/animation dependencies
- Gaps or refactor opportunities
- Test coverage recommendations
```

## 6. Test Harness Prompt
```
Prepare a test plan for [FEATURE]. Specify required unit/integration/e2e tests, mocking needs, and sample assertions. Reference existing patterns in repo.
```

## 7. Content Deployment Cue
```
We generated [CONTENT]. Provide publish steps:
- File locations and frontmatter updates
- Build/deploy commands (local + Vercel)
- Post-publish QA checklist
- Social/newsletter snippets for amplification
```

## 8. Dependency Watch
```
List outdated dependencies impacting DX or bundle size. For each, note current vs latest version, risk, and upgrade path. Prioritize fixes.
```

## 9. PR Reviewer Assist
```
Review PR [LINK]. Summarize changes, run needed checks, flag risks, and note follow-up tasks. Keep under 10 bullet points.
```

## 10. Knowledge Sync
```
Summarize insights from this session and append to docs/CREATIVE_INTELLIGENCE_GUIDE.md or relevant playbooks. Provide diff-ready snippet.
```

---

Codex Cloud agents: copy the needed block, fill placeholders, execute, and leave the prompt trail in the session for transparency.
