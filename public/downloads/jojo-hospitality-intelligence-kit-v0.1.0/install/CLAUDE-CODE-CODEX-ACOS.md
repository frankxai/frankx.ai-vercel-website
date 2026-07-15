# Install With Claude, Codex, Or ACOS

This kit works as plain markdown first.

## Option 1 - Simple Private Folder

1. Download the ZIP.
2. Extract it into a private folder.
3. Open the folder in Claude, Codex, Cursor, VS Code, or another trusted workspace.
4. Ask the assistant to read `README.md` and the workflow file you want to use.
5. Keep real guest data out until privacy boundaries are understood.

## Option 2 - Private GitHub Repo

Recommended when the system becomes useful:

```bash
mkdir hospitality-intelligence-system
cd hospitality-intelligence-system
git init
```

Add the kit files, then keep strategy, templates, and approved routines under version control.

## Option 3 - ACOS Later

Use ACOS only after one workflow proves useful.

Suggested ACOS use:

- turn agents into repeatable commands
- create private checklists
- run weekly summaries
- generate service briefing drafts
- maintain a private house memory

Do not automate sending guest messages in v1.

## Codex Prompt

```text
Read README.md, privacy-boundaries.md, and the workflow file I name next.
Help me set up a private, human-approved hospitality workflow.
Do not invent facts.
Do not include private guest data in public outputs.
Ask before creating automation.
```

