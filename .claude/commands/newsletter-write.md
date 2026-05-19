# /newsletter-write

Drafts a new newsletter issue end-to-end: Editor brief → Researcher findings → Copywriter MDX.

## Usage

```
/newsletter-write <stream-id> [angle-hint]
```

Stream IDs: `creation-chronicles`, `ai-architect`, `music-lab`, `arcanea`, `investor`, `inner-circle`.

## Flow

1. **Editor** confirms the angle with the user. Refuses to proceed without one.
2. **Researcher** runs, produces a briefing in a scratch message (does not write to disk).
3. **Copywriter** writes the MDX to `content/newsletters/<stream>/<YYYY-MM-DD>-<slug>.mdx` with `status: draft`.
4. The slash command reports: file path, word count, one-sentence "big idea", and the next command to run (`/newsletter-design`).

## What This Does NOT Do

- Does not render HTML (that's `/newsletter-design`)
- Does not send (that's `/newsletter-publish`)
- Does not flip status to `published`

## Implementation Notes for the Orchestrating Agent

Invoke the agents in this exact order:

1. Use the Agent tool with `subagent_type: newsletter-editor`. Pass the user's input verbatim. Get back: stream, angle, mascotMood proposal, "what NOT to cover."
2. Use the Agent tool with `subagent_type: newsletter-researcher`. Pass the editor's brief. Get back: structured briefing.
3. Use the Agent tool with `subagent_type: newsletter-copywriter`. Pass the briefing + the editor's mascotMood and angle. Wait for it to write the MDX file.

After all three return, print a single summary block to the user.

Do not parallelize — each step needs the previous step's output.
