# /build-log

**Convert a build session into the full content flywheel.**

One build session produces five artifacts that all ship to frankx.ai. This command activates the `agentic-builder-lab` skill (mirrored from ACOS at `.claude-skills/projects/agentic-builder-lab/`) and walks the build through the five-output pipeline.

## What it produces

| Output | Destination | Site renders it at |
| --- | --- | --- |
| MDX build log | `content/builds/[slug].mdx` | `/agentic-builder-lab/[slug]` |
| LinkedIn draft | `drafts/linkedin/[slug].md` | — (drafts) |
| 60–90s demo brief | `drafts/demos/[slug]-brief.md` | — (drafts) |
| Mermaid diagram | `drafts/diagrams/[slug].mmd` | inline via ` ```mermaid ` in MDX |
| Prompt-pack entry | `.claude-skills/projects/agentic-builder-lab/resources/prompt-pack/[slug].md` | in-skill |

## Voice override

The skill depends on `frankx-brand` but overrides its default studio voice for every artifact it produces. Output uses the **technical-authority** register: results first, no spiritual or hype language, no exclamation marks. Lint runs at exit (banned words: `soul`, `awaken`, `transformation`, `journey`, `studio` as metaphor, etc.). Full spec at `.claude-skills/projects/agentic-builder-lab/resources/voice-spec.md`.

## How to invoke

```
/build-log
```

The skill will ask for the required inputs in one batched prompt:

- `build_name` — short label (becomes the title)
- `status` — `live | shipping | wip | paused | archived`
- `stack` — list of tools and what each one does
- `key_learning` — the one thing you'd tell another builder

Optional:

- `demo_url`, `repo_url`, `day_number`, `outcome_metric`, `slug`

Then the skill writes the five files and reports paths. It does not commit or push — the caller decides what to ship.

## Acceptance criteria

A clean exit from `/build-log` means:

- [ ] All five artifact files exist at the destinations above
- [ ] MDX frontmatter validates against `lib/builds.ts` types
- [ ] Banned-words lint passes on every artifact
- [ ] No exclamation marks anywhere in the output
- [ ] `What broke` section in the MDX has at least one honest item

## Companion surface

The MDX entries this command writes are rendered by:

- **List page**: `app/agentic-builder-lab/page.tsx` (the 8-card chronological log)
- **Detail pages**: `app/agentic-builder-lab/[slug]/page.tsx` (full body with prev/next and prompt-pack link)
- **Commercial gallery**: `app/build/page.tsx` (outcome-framed 4-card subset)

## Upstream

The skill is canonical in `agentic-creator-os/skills/projects/agentic-builder-lab/`. This repo mirrors it under `.claude-skills/` for in-session discovery. To re-mirror after an upstream update, run `node scripts/port-acos-skill.mjs agentic-builder-lab` (added in this PR).
