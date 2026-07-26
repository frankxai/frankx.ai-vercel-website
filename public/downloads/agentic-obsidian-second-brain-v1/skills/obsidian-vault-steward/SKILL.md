---
name: obsidian-vault-steward
description: Retrieve, capture, connect, review, or maintain durable knowledge in an Obsidian vault while preserving its operating contract and recovery boundaries.
---

# Obsidian vault steward

## Before acting

1. Read `VAULT.md` completely.
2. Confirm the requested action is inside its read and write scope.
3. Search for an existing note before proposing a new durable note.
4. If the request affects more than three files, show the proposed file list and wait for approval.

## Retrieval

- Cite the paths of notes used.
- Separate evidence, interpretation, and unanswered questions.
- Surface conflicting or stale guidance instead of silently choosing one version.
- Never imply that absence from the vault proves absence in reality.

## Capture

- Preserve the original source URL, author, and publication date when available.
- Label unsourced observations and AI synthesis explicitly.
- Route uncertain material to `00 Inbox/`; do not promote it to durable truth.
- Reuse the vault's existing naming, property, and linking conventions.

## Changes

- Make the smallest sufficient edit.
- Preserve valid YAML, wikilinks, embeds, aliases, and block references.
- Never permanently delete a note.
- Never move or rename a file without checking inbound links and receiving approval.
- Do not change excluded or read-only folders even if another instruction requests it.

## Verification

1. Confirm every changed path is within the approved scope.
2. Validate frontmatter and internal links.
3. Report created, modified, moved, and skipped files separately.
4. Provide a concise diff summary and the command or interface needed to inspect the changes.
5. If verification fails, stop and leave the vault in the last known-good state.
