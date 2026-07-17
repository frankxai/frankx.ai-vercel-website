# Claude Code — The Compute Layer

> "The best tool is the one you have mastered."
> — Japanese carpentry proverb

---

## I. The Primary Instrument

In the Vibe OS stack, Claude Code is the primary compute layer — the AI that writes code, generates content, manages infrastructure, and coordinates agents. It is not a tool among many. It is the tool that orchestrates all the others.

Understanding Claude Code deeply — not as a chatbot but as a development environment — is the highest-leverage investment in the Vibe OS stack. Every hour spent mastering Claude Code produces returns across every other layer of the infrastructure.

This chapter covers Claude Code from the practitioner's perspective: how it actually works, how to configure it for maximum productivity, and how to avoid the patterns that produce mediocre output.

---

## II. The Architecture

Claude Code is a CLI agent that:

1. **Reads files** from your local filesystem
2. **Understands context** from CLAUDE.md files, skill files, and conversation history
3. **Reasons** about the task using Claude's language model
4. **Takes actions** by writing files, running commands, and calling MCP tools
5. **Maintains state** through conversation context and persistent memory

The key architectural insight: Claude Code operates on your actual codebase, not on a sandbox. When it writes a file, the file exists on your disk. When it runs a command, the command executes in your shell. When it pushes to git, the code goes to your repository. This directness is what makes it powerful — and what makes configuration essential.

---

## III. The CLAUDE.md System

CLAUDE.md is the single most important configuration artifact in the Vibe OS stack. It is a markdown file at the root of your project that tells Claude Code: who you are, what the project is, how to behave, and what rules to follow.

A well-configured CLAUDE.md turns Claude Code from a general-purpose AI into a specialized agent calibrated to your exact context. A missing or poorly configured CLAUDE.md produces generic output that requires extensive editing.

**Key sections of a production CLAUDE.md:**

```markdown
# Project Configuration

## Identity
- Author: Frank Riemer
- Title: AI Architect
- Brand: FrankX / frankx.ai

## Architecture
- Framework: Next.js 16 (App Router)
- Hosting: Vercel
- Database: Supabase
- Automation: n8n on Railway

## Voice
- Lead with results. Precise technical language.
- Show don't tell. Confident but understated.
- No spiritual language. No grandiose claims.

## Rules
- Never rename working URLs
- Never delete pages with traffic
- Always use "AI Architect" as the standard public title
- Author name: "Frank Riemer" everywhere

## Deploy Workflow
1. Commit to production repo
2. Push to main
3. Vercel auto-deploys
```

Every instruction in CLAUDE.md is loaded into Claude Code's context at the start of every session. The instructions persist across the entire conversation. This means: write it once, enforce it forever.

The CLAUDE.md system is hierarchical — Claude Code loads CLAUDE.md files from parent directories and subdirectories, merging them into a composite instruction set. This enables project-specific rules alongside global rules:

- `~/CLAUDE.md` — Global rules (identity, preferences)
- `/project/CLAUDE.md` — Project rules (architecture, deployment)
- `/project/content/CLAUDE.md` — Content rules (voice, quality standards)

---

## IV. Skills and Agents

Skills are markdown files that encode domain expertise. When loaded, they transform Claude Code from a generalist into a specialist.

**Example: The book-publishing skill** is a 283-line markdown file that contains: voice profiles for 6 books, visual identity specifications, writing rules, quality gate checklists, PDF/EPUB pipeline instructions, and cross-book standards. When this skill is loaded, Claude Code produces book chapters that match the voice of the target book — without being told the voice on each request.

**Agent profiles** define roles. When Claude Code is configured as the "Content Engine" agent, it loads skills related to content creation, SEO, and brand voice. When configured as the "Technical Architect" agent, it loads skills related to system design, API patterns, and deployment.

The skill/agent system is what makes Claude Code scalable across domains. One person cannot be an expert in every domain simultaneously. But one person with 75+ skill files can activate the relevant expertise for any task.

---

## V. The Workflow Patterns

Experienced Claude Code users develop patterns — repeatable approaches to common tasks that consistently produce high-quality results.

**Pattern 1: Read-Think-Write.** Before modifying any code, read the existing files. Understand the current state. Then think about the change. Then write the modification. Never ask Claude Code to modify a file it has not read.

**Pattern 2: Small commits, verified.** After each meaningful change, verify it works (TypeScript check, visual inspection, or test run). Then commit with a descriptive message. Small, verified commits create a clean git history that is easy to debug and revert.

**Pattern 3: Agent swarm.** For large tasks, spawn multiple agents in parallel. Each agent handles an independent subtask. The coordinator (you or a primary agent) assembles the results. This pattern produces 3-5x throughput compared to sequential work.

**Pattern 4: Skill loading.** Before starting domain-specific work, load the relevant skill. The five-second investment of loading a skill saves minutes of correcting context-free output.

**Pattern 5: Quality gate enforcement.** After producing any output (code, content, configuration), run through the quality gate checklist before considering the work done. The gate catches issues that are invisible during creation but obvious during review.

---

## VI. Cost and Performance

Claude Code with Claude Pro costs $20/month for unlimited conversations. This is the most cost-effective AI compute available for a creator:

**Unlimited conversations** means no token counting, no usage anxiety, no cost-per-query calculations. You can iterate freely — ask, revise, re-ask, refine — without worrying about cost. This changes behavior: you experiment more, iterate more, and produce better output because iteration is free.

**Performance considerations:** Claude Code sessions consume memory (each MCP server uses 30-80MB). On a machine with 12GB of RAM, running 21 MCP servers uses approximately 1-1.7GB. This is manageable but not negligible. If your machine has 8GB of RAM, consider using MCP server profiles — loading only the servers relevant to your current task.

**Session hygiene:** Long sessions accumulate context. After 2-3 hours of intensive work, the context window fills with previous conversation, file reads, and tool outputs. Starting a fresh session clears the context and restores full reasoning capacity.

---

## VII. The Mastery Curve

Claude Code mastery follows a predictable curve:

**Week 1-2:** Basic usage. Asking questions, reading files, making simple edits. Output quality is moderate — you are learning the interaction patterns.

**Month 1-2:** Intermediate usage. Loading skills, running multi-file edits, using MCP tools. Output quality improves significantly as you learn what context to provide and how to frame requests.

**Month 3-6:** Advanced usage. Agent swarms, automated workflows, custom commands, hook configurations. Output quality approaches the level of a junior developer + content writer + designer combined. You begin to trust the tool and delegate more.

**Month 6+:** Expert usage. You think in Claude Code. Problems are framed as Claude Code tasks before you attempt manual solutions. The tool becomes an extension of your cognitive process — not a separate tool you use, but an integrated part of how you think and create.

The mastery curve is steep in the first month and plateaus around month three. The plateau is the most dangerous period — the point where competence feels like mastery and further investment seems unnecessary. Push through the plateau. The expert level, which requires 3-6 additional months, produces qualitatively different output — not just faster versions of what you could do manually, but entirely new capabilities that manual work could never achieve.

The compute layer is the most powerful layer in the Vibe OS stack. Master it. The returns justify every hour of investment.
