# Persistent music runtime

The root layout mounts `MusicRuntime` once. Music pages and inline track calls
select into that runtime, so ordinary client navigation does not create a new
player. The mobile dock stays available throughout the shared layout.

## Current behavior

- Silent until the listener chooses playback.
- One selected native audio source or Suno iframe; minimizing retains the node.
- Catalog search and page-context suggestions never replace the current track.
- Native playback reuses the existing reviewed homepage audio source. Other
  indexed public tracks use Suno until an approved audio rendition is registered.
- Native playback exposes browser controls and optional Media Session support.
  Suno embeds expose Suno's controls; the app does not infer their playing state.
- Album collections remain visible as collections in progress. A valid Spotify
  album URL is rendered only on a published/released album and after a click.
- The existing homepage featured player remains separate. Its native playback
  yields the runtime. Adapting that protected homepage surface belongs in its own PR.

## Asset and rights boundary

`lib/music-playback-catalog.ts` is a public projection. It does not expose raw
prompts, private audio, source sessions or archive paths. Historical Blob URLs
are not automatically promoted into it. The current homepage URL is an explicit
compatibility source, not a claim of a verified master archive.

The future Media Fabric publisher should resolve asset IDs to approved immutable
renditions using its manifest. Supabase owns metadata and approval, not the
page render hot path. Private lossless masters and public compressed derivatives
remain separate. An R2 adapter is justified for S3 archival and shared non-Vercel
production consumers; retain the Blob adapter and switch one placement at a time.

Kura's official local export importer and the existing private archive controller
retain acquisition receipts. The producer session system retains observed
generation and human decisions. Join those records through source/take/version
IDs rather than creating another unconstrained ledger. Archive status, web use,
commercial release and copyright evidence are distinct fields.

## Remaining rollout

Verify the actual native source and upload approved owned audio. Complete physical
mobile and deployed browser QA, then adapt the existing homepage player in its
own PR. Add preferences, a companion listening route and contextual manifests.
Add semantic search only after benchmarking the current metadata retrieval.
No model API or vector index is connected by this change.

Separate domains and full page reloads cannot preserve the same HTML media
element. A user-opened companion listening page is the uninterrupted cross-domain
option; URL/state handoff alone is not gapless playback. Newsletter links should
open a listening page rather than depend on embedded audio support in email.

## Verification

Run the repository type/lint/language/build gates plus:

```bash
node --experimental-strip-types --test scripts/tests/music-playback.test.mjs
```

On desktop and a real phone: select native and embedded tracks, seek, minimize,
navigate using a client link, confirm time/selection continuity, stop, test blocked
media, tab through controls, and verify no simultaneous audio with a page video or
Spotify player. Check dock safe areas and overlay conflicts before release.

Rollback removes the runtime wrapper/imports from the root layout and restores
the prior music page/inline CTA components. No storage objects, licenses, album
statuses or public URLs are changed by this code.
