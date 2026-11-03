# Founder journal

Owner: Frank Riemer. Execution: the current assistant/editor. Publisher:
`frankxai/frankx.ai-vercel-website`; canonical origin `https://www.frankx.ai`.
Owning example: PR #1158. Related product-quality tracking: issue #706.
Implementation base: `242df91b1f583a9791bdccba99126280c0510882`.

## Decision and acceptance

A founder records a moment once and reviews one short first-person draft.
The existing Markdown files and `lib/journal.ts` remain the publishing system.
No CMS, database, transcription vendor, scheduled model call or image dependency
is introduced. Capture operations make no model calls; the assistant uses one
light edit and one source/privacy review, with no minimum length. Missing
source facts or consent stop export. Missing approval stops publication.

`/journal` owns dated personal observations and build notes. `/blog` owns
researched explanations with their own evidence and editorial production.
A journal entry may commission or link an article; preserve both URLs and do
not silently move or duplicate the same prose between them. FrankX remains the
canonical journal publisher; do not syndicate a duplicate to a personal domain.

Acceptance: original outside Git; deterministic retry; exact-byte privacy and
attribution review; public-safe draft PR; unpublished detail 404 and absent from
index, contextual lists, RSS and sitemap; explicit Frank approval before
publication; exact-head preview and post-release domain verification.

## Daily use

Say **`/founder-journal <voice or text note>`** to the coding assistant. The
reusable instructions are `.claude/commands/founder-journal.md`; other harnesses
can read that file directly. A ChatGPT conversation does not itself install a
slash command into a local harness.

Configure `JOURNAL_PRIVATE_DIR` once to a private, durable directory outside
every Git repository and outside temporary storage. On Unix it must have mode
0700; capture files use 0600. Windows operators must restrict its ACL to the
owner. The directory cannot be inside this public repo even when gitignored.
For an existing Second Brain OS installation, point it at that installation's
separate private vault under `journal/founder-captures`; never at the
MCP-visible `brain/` vault or public `second-brain-os` template checkout.
Filesystem checks do not certify cloud sharing permissions; verify those before
using a synced vault. Encrypt and back up the vault through the owner's existing
storage system. The CLI never uploads private material.

The assistant runs:

```bash
pnpm journal:capture capture --source /private/inbox/todays-note.txt
# Edit <private-vault>/<returned-key>/draft.md; review it against original.
# Write review.json with candidateHash, privacy, attribution, reviewer.
pnpm journal:capture stage --id <returned-key>
pnpm journal:capture pr --id <returned-key>
```

For manual scaffolding, `pnpm journal:new "A plain title"` creates an
**unpublished** file. `--private` is rejected. A public-safe scaffold does not
substitute for private original preservation and source review.

## Private record and idempotence

Each capture contains immutable `original` bytes and `capture.json`, plus the
editor's `draft.md`, exact-byte `review.json`, and derived `staged.json`.
For audio, `original` retains recording bytes; keep the transcript beside it.
`sourceName`, source checksum, capture key, private references and review reasons
stay private. `contentId` is an unrelated UUID and is safe to export. The default
capture key uses the source checksum plus Amsterdam date privately; an explicit
stable source key permits retries across days (pass the original capture date).
An existing ID with changed bytes/date fails without replacing the original.

The public filename and branch derive from `contentId`, so title polishing
cannot duplicate a note. Identical staging is a no-op; a changed already-staged
file requires normal reviewed git editing rather than overwrite. PR retries
reuse the open draft; a closed/merged/ready PR or remote conflict stops the CLI.
A provider failure never grants approval or creates an alternative publication.
Concurrent API races may return a conflict; retry and inspect the existing PR.

Example private review record (never commit an actual one):

```json
{
  "candidateHash": "SHA-256 of exact draft.md bytes",
  "privacy": "accept",
  "attribution": "accept",
  "reviewer": "the reviewing editor"
}
```

Automated scans flag likely private details and executable MDX. They cannot
prove consent or determine whether a personal experience was invented; the
source review and Frank's approval remain necessary.

## Publishing and verification

1. Keep the note's draft PR open and `published: false`. Human review happens
   in Markdown; drafts have no public web-preview bypass. Review source, privacy,
   attribution and the rendered journal template separately.
2. After Frank explicitly approves the text for publication, prepare a commit
   setting `published: true`. Opt into a Vercel **preview** with `[preview]` in
   the commit subject. This is a separate publication-candidate state: a draft
   PR alone does not hide an entry when `published: true`.
3. Frank's GitHub account comments exactly
   `approve founder journal publication <full-head-sha>` on that PR. CI checks
   the account, GitHub User type and exact head. It verifies the account receipt,
   not whether a human or an authorized client typed it; agents must never
   self-post the approval. Every new commit invalidates the
   receipt. Rerun CI after the comment. Do not self-post approval, infer it from
   an editorial verdict, or enable auto-merge. The account comment also permits
   a sole repository owner to approve their own authored PR without an invalid
   self-review. Existing published entries require the same approval when edited.
4. Run type-check, lint, strict language audit, journal checks/tests and build.
   Inspect mobile/desktop, keyboard, reduced-motion and reading behavior on the
   exact candidate preview. Record Vercel project, deployment ID, source SHA and
   status. A READY build is availability evidence, not a reader-success result.
5. Only with explicit merge/publication approval, merge through repository
   protections. Vercel's native Git integration deploys `main`; never add a
   parallel deployment workflow or promote a preview directly to production.
6. Confirm the custom domain serves the accepted Vercel deployment/source SHA.
   Run `pnpm journal:verify --url https://www.frankx.ai --slug <slug> --expect published --deployment <dpl-id>`.
   Check HTTP 200, canonical, visible author/date/prose, JSON-LD, contextual
   links, index, sitemap and RSS. For an unpublished candidate use
   `--expect draft`; it must return 404 and be absent from all three listings.
   Protected previews can use the existing Vercel fetch connector or a
   preconfigured `VERCEL_AUTOMATION_BYPASS_SECRET`; never print/share that secret.
7. Record the PR, head, deployment, canonical URL and verification result in the
   private capture's publication receipt. Private Notion/Obsidian can store that
   receipt; never duplicate public canonical prose as another publishing source.

The CI step is implemented here; whether `CI` is a required branch-protection
check must be verified by an administrator. The connected GitHub integration
returned 403 for branch protection during this inspection. Do not describe this
as an independently verified server-side merge lock. CI intentionally skips
draft PRs; keeping this implementation in draft leaves cloud CI pending.

Recovery: retain the original and exported Markdown; revert a specific published
content commit through a reviewed PR or use the project's established production
rollback. Never delete a private original during recovery. A rollback restores
site behavior but cannot retract already public Git history or RSS copies.

## Discovery and design

All public consumers share the fail-closed loader: explicit boolean
`published: true`, explicit `visibility: public`, valid date and no future day.
Legacy published notes keep their URLs. `topicHubs` uses the small verified
registry in `lib/journal-policy.ts`; `relatedArticles` holds canonical blog
slugs. The entry renders these as ordinary crawlable links. The Human Layer
hub and blog detail pages render reciprocal journal links only when relevant
published notes exist. Do not fabricate related articles to fill a quota.

The existing sitemap and separate `/journal/feed.xml` reuse that loader. RSS
autodiscovery is added to index/detail metadata. Self-canonicals use the existing
`siteConfig.url`; Article/BlogPosting describes visible author and content.
The existing static brand OG card is the deliberate fallback; daily notes need
no generated hero or image spend. No separate journal sitemap/feed CMS exists.

Preserve the existing month/date editorial layout, Poppins display, Inter body,
mono datelines and restrained emerald spectrum. Changes are additive: visible
author, readable date contrast, longer mobile reading rhythm, top clearance for
fixed navigation, touch-sized contextual links, working skip-link target. No
text animation or motion dependency is added. This is not a full redesign.

Existing `TrackedLink`/privacy-safe Vercel Analytics measure navigation to entries,
RSS, hubs, related articles and newsletter. Record only categorical destination,
entry kind and public topic keys; no note text, private IDs, source references,
health descriptors or redaction information. Existing pageview handling respects
DNT/GPC. Delivery of events and reader outcomes require separate observation;
code presence does not prove collected analytics or conversions.

## Existing second-brain integration audit

Verified at the implementation base:

| Existing surface | Observed boundary | Journal use |
| --- | --- | --- |
| `lib/prompt-hub/sbo-bridge.ts` | Anticipated npm/local/HTTP adapter, explicit degraded stub fallback | No verified running journal backend; do not route originals through it |
| `.claude/skills/qme-second-brain/SKILL.md` | Obsidian/Notion directives and vault convention | Instructions, not proof of a live sync |
| `lib/notion.ts` | Generic database reader configured by environment | No journal capture writer or private permission check |
| `scripts/sync-notion-video-inbox.mjs` | Video Inbox ingestion with its own schema | Unrelated to founder notes; leave it separate |
| Local private Markdown vault | New explicit directory boundary and portable records | Working capture adapter; live owner destination still needs configuration |
| Public `frankxai/second-brain-os` template | README and privacy model describe separate `brain/` and `private/` vaults with a private journal area | Reuse the personal instance's private journal directory; no bulk ingestion or publishing from the template |

No existing production journal-to-Notion/Drive sync was established by code
inspection. Keep the private receipt adapter file-based; wire a specific
owner-selected private destination only after verifying its access, stable ID
and exact field mapping. Do not create another dashboard, broad sync or database.
Only owner-supplied or explicitly selected notes enter capture; never mine a
private journal or corpus for public content. The actual private vault location
and ACLs were not available here. Template documentation establishes intended
architecture; it does not prove a connected personal instance.

## First example: PR #1158

Reviewed source head: `6edd2482fd011b4d0bc4f0d3334f6cc12f8f85ac`.
Verdict: **revise**, while retaining `published: false` and draft status.

- Source fidelity: spending too long indoors and wanting daylight/movement are
  supported by Frank's supplied note. Do not imply he already went for a walk
  or measured a health benefit. Keep this a personal reflection; no universal
  medical claim is needed.
- Voice: remove the added extraordinary-future slogan, fragment ladders and
  the closing instruction. Keep the screen-heavy autumn day and Frank's own
  intention to go outside.
- Integration: add `topicHubs: ["human-layer"]` when the infrastructure lands.
  No researched article is required for this moment. The original PR has no
  private preservation or capture receipt; never fabricate one retrospectively.

Suggested public-safe revision, still requiring Frank's approval:

> Today I spent too much of the morning and afternoon indoors, in front of my
> laptops. I wanted to put this down because it is easy to let a day go that way
> when there is always another thing to build.
>
> I want to make time for daylight, a walk and some movement. In autumn, when
> it is raining and staying inside feels easier, that reminder matters to me
> even more.
>
> Building with AI is a big part of my life. Taking care of the person doing
> the building has to be part of my day too.

Its original Vercel deployment was CANCELED/ignored by the preview budget guard.
`published: false` should still 404 in any built deployment. This review does not
approve publication and does not rewrite another agent's branch.
