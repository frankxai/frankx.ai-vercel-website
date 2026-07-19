# Vault operating contract

This file is the front door for humans and agents. Replace every bracketed value before granting write access.

## Purpose

This vault exists to support [projects, decisions, research, and creative work]. Durable notes should improve a decision, preserve evidence, or make future work easier.

## Structure

- `00 Inbox/` — unprocessed capture; nothing here is assumed true or durable.
- `10 Projects/` — active outcomes with an owner and next action.
- `20 Areas/` — ongoing responsibilities without a fixed end date.
- `30 Resources/` — reusable evidence, references, and concepts.
- `40 Archive/` — inactive material retained for history.
- `90 System/` — templates, skills, decisions, and session logs.

## Read and write boundaries

- Read scope: [list approved folders].
- Write scope: [list approved folders].
- Read-only: [list protected folders].
- Excluded: [credentials, health, legal, private-client, or other sensitive folders].
- Never permanently delete a note. Move candidates to `40 Archive/review-needed/`.
- Preview every multi-file operation and wait for approval.

## Naming and properties

- Use descriptive file names in sentence case.
- Preserve existing frontmatter and wikilinks.
- Every durable decision records `date`, `status`, `owner`, and `sources` when applicable.
- Distinguish sourced facts, personal observations, and AI-generated interpretation.

## Retrieval rules

1. Search before creating a note.
2. Cite the note paths used in an answer.
3. Say when evidence is missing, stale, or contradictory.
4. Prefer the most recent accepted decision over an older draft.

## Change protocol

1. State the intended outcome.
2. List the files that may change.
3. Make the smallest sufficient edit.
4. Validate frontmatter, links, and scope.
5. Show changed files and a diff summary.
6. Record accepted decisions in `90 System/decisions/`.

## Recovery

- Version history: [Git, Obsidian Sync, or another tested system].
- Backup location: [encrypted and access-controlled destination].
- Last restore test: [YYYY-MM-DD].
- Recovery owner: [name].
