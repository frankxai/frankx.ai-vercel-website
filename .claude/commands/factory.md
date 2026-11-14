# /factory - FrankX Publishing Pipeline

You are the **Content Factory** - an intelligent publishing pipeline that orchestrates the full content creation workflow.

## Overview

```
/factory [topic]           → Full pipeline (research → draft → polish → publish)
/factory research [topic]  → Research phase only
/factory draft [topic]     → Create draft from research
/factory polish [path]     → Polish existing content
/factory publish [path]    → Publish to production
/factory status            → Show pipeline status
```

## Full Pipeline Workflow

When `/factory [topic]` is called:

### Phase 1: Research (10 min)

```bash
# Execute with Task agent
1. Use WebSearch to find 5-10 authoritative sources on [topic]
2. Extract key insights, statistics, quotes
3. Identify unique angles not covered by competitors
4. Save research to: research/_factory/[slug]/research.md
```

### Phase 2: Draft (15 min)

```bash
# Create structured draft
1. Generate outline from research
2. Write concise frontmatter tldr if a shell summary helps; do not duplicate it in the body
3. Open with a concrete finding, scene or result
4. Use sections and headings that follow the argument or task
5. Add an FAQ only for useful questions the body leaves unanswered; no count quota
6. Write conclusion with CTA
7. Save draft to: content/blog/[slug].mdx
```

### Phase 3: Polish + Gate (10 min)

```bash
# Quality gates — MANDATORY before Phase 4 publish
1. SEO Check:
   - Title: 50-60 characters
   - Description: 120-160 characters
   - 3+ internal links
   - 1+ external authority link

2. Voice Check:
   - Remove AI phrases ("I cannot", "delve", "it's worth noting")
   - Active voice
   - FrankX personality (technical but accessible)

3. AEO Check:
   - Summary appears once, without repeating the introduction
   - Optional FAQ answers useful open questions instead of repeating the body

4. @integrity-guard (THE GATE — added 2026-05-20):
   Dispatch the agent against content/blog/[slug].mdx.
   It runs 5 sub-gates in parallel:
   - Brand voice (banned phrases + AI-Architect-not-AI-Systems + Arcanea-leak)
   - AI-slop detection (em-dash density, "not just X, it's Y" patterns)
   - Claim audit (every numeric/comparative claim has source)
   - Schema validation (required JSON-LD types present + valid)
   - Conversion + linking (≥3 internal links + ≥1 CTA to gravity surface)

   Verdict gate:
   - PASS → continue to Phase 4 publish
   - WARN → operator review required before publish (show findings)
   - FAIL → block publish, fix before continuing

   - Clear definitions for technical terms
   - datePublished and dateModified

4. Generate Article schema; include FAQPage only when it matches a visible FAQ
```

### Phase 4: Publish

```bash
# Prepare a reviewable candidate in this production repository
1. Work on agent/<harness>/<scope>; never push directly to main
2. Run the repository checks, then commit the scoped change
3. Push the feature branch and open a draft PR
4. Record evidence; production promotion follows the repository release rules
```

## Execution Instructions

### For `/factory [topic]`:

1. **Create research directory**:
   ```bash
   mkdir -p research/_factory/[topic-slug]
   ```

2. **Run WebSearch** for the topic, extract insights:
   ```
   WebSearch: "[topic] best practices 2026"
   WebSearch: "[topic] tutorial guide"
   WebSearch: "[topic] common mistakes"
   ```

3. **Create research file** at `research/_factory/[topic-slug]/research.md`:
   ```markdown
   # Research: [Topic]

   ## Sources
   - [Source 1](url) - Key insight
   - [Source 2](url) - Key insight

   ## Key Themes
   1. Theme 1
   2. Theme 2

   ## Unique Angles
   - Angle not covered elsewhere

   ## Statistics/Data
   - Data point 1
   - Data point 2
   ```

4. **Create draft** at `content/blog/[slug].mdx`:
   ```mdx
   ---
   title: "[Title]"
   description: "[120-160 char description]"
   publishedAt: "2026-01-23"
   category: "[category]"
   tags: ["tag1", "tag2", "tag3"]
   featured: false
   author: "Frank X. Riemer"
   ---

   [Introduction with hook...]

   ## [Heading that follows the argument]

   [Content...]

   [Optional FAQ: only useful unanswered questions, no minimum count]
   ```

5. **Run quality checks** using Grep and Read tools

6. **Report results** with pass/fail for each gate

### For `/factory status`:

Show all content in the pipeline:
```bash
# Check research in progress
ls research/_factory/

# Check drafts
ls content/blog/*.mdx | head -10

# Check recent publications
git log --oneline -5 -- content/blog/
```

## Example Usage

```bash
User: /factory "Claude Agent SDK patterns"

Claude:
1. Creating research directory...
2. Searching: "Claude Agent SDK best practices 2026"
3. Searching: "Claude Agent SDK tutorial"
4. Found 8 quality sources
5. Creating research file...
6. Generating outline...
7. Writing a draft sized to the argument...
8. Running quality gates...
   ✅ SEO: 94/100
   ✅ Voice: Passed
   ✅ AEO: Passed
9. Draft ready at: content/blog/claude-agent-sdk-patterns.mdx

Ready to publish? Use: /factory publish content/blog/claude-agent-sdk-patterns.mdx
```

## Integration

- Works with: `/frankx-ai-content-pipeline`
- Logs to: `AI_GLOBAL_SESSIONS.md`
- Deploys via: `scripts/publish-to-vercel.js`
