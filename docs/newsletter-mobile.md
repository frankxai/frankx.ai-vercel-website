# Newsletter from your phone

Two paths. Both ship real emails. Pick whichever feels less like work in the moment.

---

## Path A — Claude Code mobile (full agent flow)

For when you want to draft something new in voice.

### One-time setup

1. **Add the Resend key as an environment secret** in Claude Code on the Web → project settings → Secrets:
   - `RESEND_API_KEY` (required)
   - `BEEHIIV_API_KEY` (optional — Beehiiv fan-out)
   - `BEEHIIV_PUBLICATION_ID` (optional)

   Once set, every new session in this repo picks them up automatically.

2. **Merge the `SessionStart` hook to `main`** (it's on the branch already). After merge, every fresh mobile container runs `npm install` on boot so `tsx` is ready when you arrive.

### Daily flow on your phone

Open Claude Code mobile, target this repo, then:

```
/newsletter-write inner-circle
```

The editor agent will ask for an angle. Reply with one line ("revenue update for May" or "what shipped this week"). The researcher pulls source material, the copywriter writes the MDX, and you get back a file path.

Review the MDX on your phone (it's small — 350–700 words). Then:

```
/newsletter-publish content/newsletters/inner-circle/<file>.mdx --dry-run --to=friemerx@gmail.com
```

The email lands in your phone's inbox in seconds. **That's your preview.** Mobile-native, no localhost.

If it looks good:

```
/newsletter-publish content/newsletters/inner-circle/<file>.mdx
```

Live broadcast. Resend + Beehiiv + RSS in one shot.

---

## Path B — GitHub Actions (external trigger, no Claude needed)

For when an issue is already written and you just want to fire it.

### One-time setup

1. **Add secrets to repo settings** at https://github.com/frankxai/frankx.ai-vercel-website/settings/secrets/actions
   - `RESEND_API_KEY`
   - `BEEHIIV_API_KEY` (optional)
   - `BEEHIIV_PUBLICATION_ID` (optional)

### Send from anywhere

Open GitHub mobile or web → Actions tab → **Send Newsletter** → "Run workflow":

| Input | Value |
|-------|-------|
| `issue_path` | e.g. `content/newsletters/ai-architect/2026-05-19-subagent-patterns.mdx` |
| `mode` | `test-to-self` (sends to friemerx@gmail.com), `test-to-custom`, or `live-broadcast` |
| `recipient` | (only for `test-to-custom`) |

Tap **Run workflow**. The action runs in ~30 seconds. You get an email; the action log shows the Resend broadcast ID.

For `live-broadcast`, the workflow auto-commits the experiment ledger entry to the branch so the analyst agent picks it up later.

### Bookmark it

Save https://github.com/frankxai/frankx.ai-vercel-website/actions/workflows/newsletter-send.yml to your phone's home screen. Two taps from there to "Run workflow."

---

## Path C — Vercel cron (not built yet, optional)

A scheduled cron at e.g. `0 14 * * 0` (Sunday 2pm UTC) that auto-publishes any issue with `status: scheduled` and `sendAt: <today>` could replace Path B for recurring sends. The pieces are already in place — adding it is ~30 minutes of work. **Don't build it until you've shipped 4+ issues by hand** and the calendar feels real. Premature automation is how newsletters die.

---

## Which to use

| You're... | Use |
|-----------|-----|
| Drafting something new while commuting | A (Claude mobile) |
| Sending an already-approved issue | B (GitHub Actions) |
| Running the same send every Sunday automatically | C (cron, later) |

The agents in `.claude/agents/` and the publish script in `scripts/newsletter-publish.ts` are the same engine behind all three. One source of truth, three triggers.
