# Syncing skills from ACOS

Skills live canonically in `frankxai/agentic-creator-os` under `skills/`. This repo mirrors a subset into `.claude-skills/` so Claude Code sessions working here can discover and invoke them without needing the ACOS repo on hand.

## Why mirror at all

- Claude Code reads from `.claude-skills/` (per the established website convention; see `.claude-skills/README.md`).
- ACOS is on a separate clone in dev environments; the mirror keeps the website self-contained for CI and for fresh sessions.
- The mirror is a **subset**, not a full copy. Only the skills relevant to building/operating this website land here.

## Port a skill from ACOS

The `scripts/port-acos-skill.mjs` helper does the copy and the path adaptation in one step.

### Setup

```bash
# ACOS clone path (auto-detected if at /home/user/agentic-creator-os)
export ACOS_REPO_PATH=/path/to/agentic-creator-os
```

### Daily commands

```bash
# What's in ACOS?
node scripts/port-acos-skill.mjs --list

# What's missing or stale in this mirror?
node scripts/port-acos-skill.mjs --diff

# Port one skill (auto-detects category, rewrites self-referential paths)
node scripts/port-acos-skill.mjs agentic-builder-lab

# Dry run to preview changes
node scripts/port-acos-skill.mjs agentic-builder-lab --dry-run

# Force a category if ambiguous
node scripts/port-acos-skill.mjs <name> --category technical
```

### After porting

The script prints next steps but for a complete PR you typically also:

1. `git add .claude-skills/<category>/<name>/`
2. Update `.claude-skills/registry/SKILL_REGISTRY.md` if this is a new entry (Project / Technical / etc. table)
3. Update `.claude-skills/README.md` table if this is a new entry
4. Commit: `feat(skills): port <name> from ACOS`

## What the script rewrites

Only **self-referential paths** are adapted. If a skill at `skills/projects/foo/` mentions `skills/projects/foo/resources/` in its docs, those references become `.claude-skills/projects/foo/resources/` in the mirror. Unrelated mentions of `skills/` (e.g. cross-referencing another skill or a workflow path) are left alone — the script uses a literal prefix match scoped to the skill being ported.

This means the mirror is **not** a verbatim copy. Each repo's skill self-references its own location, which differs between repos. Both versions are correct in their context.

## Drift policy

When ACOS updates a mirrored skill:

1. `node scripts/port-acos-skill.mjs --diff` flags the drift as STALE.
2. Re-run the port command to refresh.
3. Open a PR with the diff.

The mirror should **trail** ACOS — bug fixes, voice tweaks, and new templates land in ACOS first, then mirror here on demand.

## What the script does NOT do

- It does not delete files. If ACOS removes a file from the skill, you have to delete the mirror manually.
- It does not push or commit. Output is staged for review.
- It does not handle skills that live above the category level (e.g. category-root SKILL.md). Those need a manual port.
- It does not sync `.claude/agents/` or `.claude/commands/` from ACOS — only `skills/`. Slash commands like `/build-log` live in `.claude/commands/` of this repo and are hand-maintained.

## Current mirror state

Run `node scripts/port-acos-skill.mjs --diff` for the live answer. As of the most recent port pass, the mirror covers the project skills used by website work; technical skills (`mcp-architecture`, `claude-sdk`, etc.) and others are mirrored selectively as needs arise.
