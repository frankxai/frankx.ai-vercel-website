# /founder-journal

Capture Frank's supplied voice/text note as one unpublished founder journal draft.
Read `docs/founder-journal.md` and `CREATOR.md`. This command never authorizes
publication. The same contract applies in Codex, Claude Code, Gemini and other
harnesses; it needs no CMS or paid model API.

## Budget

Load the supplied note, these instructions, the current brand voice, and at most
two relevant public link candidates. One light edit, one privacy/attribution
review. Do not scan the portfolio, research the market, generate images, expand
into an essay, or impose a word quota. The note can remain a short paragraph.
Unresolved facts stay unresolved. Research belongs in a separate blog commission.

## Execute

1. Save the exact supplied transcript/audio to an owner-selected private vault
   outside every Git checkout. Use the configured `JOURNAL_PRIVATE_DIR`. Never
   put originals, private paths, third-party correspondence, source hashes or
   redaction reasons into this repository, a PR body, logs or analytics. Without
   a durable private destination, keep the draft in the private conversation and
   report the missing destination; do not stage it. Existing private Obsidian
   storage is suitable; a public vault is not. Confirm cloud-folder permissions
   before selecting a Drive/Notion mirror. Do not export a whole second brain.
2. `pnpm journal:capture capture --source <external-file> [--id <stable-source-key>]`
   preserves original bytes and returns a private capture key plus public
   `contentId`. Reuse the key on retries; a conflicting original is never replaced.
   For audio, retain the recording and a transcript privately. Do not invent a
   transcript or claim speech recognition ran. Existing assistant dictation can
   supply the text; no transcription provider is provisioned here.
3. Write `draft.md` inside that private capture folder. Use the frontmatter in
   `content/journal/_TEMPLATE.md`, the returned `contentId`, the captured Amsterdam
   date, and `published: false`. Lightly correct dictation/grammar/repetition in
   first person. Preserve the event, sentiment, uncertainty and intention.
   Never invent a walk taken, health outcome, revenue, quote or attribution.
   Remove slogan closers and universal advice added by the model. Hero images,
   FAQ, SEO keywords and CTAs are optional, never daily requirements.
4. Review the exact candidate against the original privately. Check personal
   and third-party consent, locations, finances, health, credentials and private
   links; distinguish personal observation from a sourced claim. Retain only
   public-safe prose. Verify any chosen related article actually exists and is
   canonical; select zero to two relevant links, never filler. Optional
   `topicHubs`: `human-layer`, `ai-architecture`, `founder-stack`, `music`.
5. Write private `review.json` with `candidateHash` (SHA-256 of exact UTF-8 draft
   bytes), `privacy: "accept"`, `attribution: "accept"`, and `reviewer`. Keep any
   blocked questions in this private record. This is editorial clearance, never
   Frank's publication approval. A changed candidate requires a fresh review.
6. `pnpm journal:capture stage --id <key>` exports only the public-safe Markdown.
   `pnpm journal:capture pr --id <key>` creates/reuses its single draft PR with
   the connected `gh` CLI. When using a connector instead, preserve the same
   identity, branch, file and draft status; inspect an existing PR before writes.
   Run `pnpm journal:check` and `pnpm test:journal`. Return the PR URL and readable
   draft. A draft PR and its diff are publicly readable even when the site 404s.
7. STOP before `published: true`, merge, auto-merge, production deploy or social
   distribution. Frank must explicitly approve publication of the revised text.
   Then follow the release procedure in `docs/founder-journal.md`; approval of
   one entry never extends to later notes.

## Response

Give the lightly polished note and a compact receipt: draft PR, privacy and
attribution verdict, tested revision, preview state, and exact unresolved gap.
Never repeat the private original or redactions in a public receipt.
