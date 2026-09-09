# Persistent music runtime

The root layout owns one native HTML audio element. A listener's click assigns a
verified export and starts playback in the same event. Client navigation and
minimize keep that element mounted. No source is requested before selection.

## Playback repair, September 2026

The first preview reused the homepage's Suno-hosted MP3 for Star Show Us. That
URL returned HTTP 403, and the browser never loaded a duration. The user also
reported a Suno iframe stuck at 0:00. A successful deployment did not establish
working media delivery.

The shared runtime now uses existing published audio from the owned Blob archive.
`data/music-playback-sources.json` records successful byte-range requests, full
SHA-256/byte verification and ffprobe/ffmpeg decode checks. Catalog projection
requires an exact match with a published row in `data/music-asset-registry.json`.
Neither arbitrary catalog URLs nor inferred Suno CDN URLs become player sources.
The verification is a delivery/decoder receipt, not a new rights grant or master
archive claim. Recheck sources before releases; runtime errors remain recoverable.

Public tracks without verified files keep explicit external Suno links. The shared
player does not embed Suno or pretend it can control/observe a cross-origin player.
Search includes the public catalog, with external tracks visibly labeled. The
default selection list contains playable exports. Spotify album embeds remain
click-to-load, require a real published/released album URL, and yield the runtime.

## Listener behavior

- Silent initial visit; one click on an available track starts native playback.
- `playing` comes from the media `playing` event, not a selected row or `play` event.
- Loading, paused and failed states are distinct; a 15-second loading timeout
  offers another track or an external Suno link instead of an indefinite spinner.
- Late rejected play promises cannot overwrite a newer selection or Stop.
- Pause, seek, volume and browser Media Session controls use the same audio element.
- The panel has a top minimize control, bounded mobile height and contained scroll.
- Route suggestions never change or restart the song.
- Cooperating native media and Spotify embeds yield to each other. The existing
  homepage featured player is separate and still needs its own preservation-contract
  PR; its inaccessible source is not promoted into this shared runtime.

## Verification and operation

Run the repository type/lint/language/build gates and:

```bash
node --experimental-strip-types --test scripts/tests/music-playback.test.mjs
```

Refresh delivery evidence explicitly (downloads existing owned objects temporarily;
requires Python, ffprobe and ffmpeg; not run automatically on every build):

```bash
python3 scripts/verify-music-playback.py --output data/music-playback-sources.json
```

Before adding a native source: verify its existing publication state and source ID,
fetch the complete owned object, record its SHA-256 and size, validate the decoder,
and check a 206 range response. Publish only a matching catalog/registry/receipt
record. An HTTP 200 or a plausible URL alone is insufficient. Keep private masters
and generation sessions out of the public projection.

In the actual preview: start a verified track, observe nonzero duration and advancing
time, minimize, navigate through a client link, confirm continuity, seek, pause,
resume, switch tracks and stop. Search Star Show Us and Open the Arc to verify they
have Suno links rather than broken native controls. Test external-media failure,
keyboard order, the dock at mobile widths and actual Android/iOS when available.
Do not claim physical-device testing from viewport emulation.

## Architecture and remaining work

Owned playback delivery is the persistent-player foundation. Suno remains a
creation/discovery source and Spotify a release channel. Reuse Blob now; add the
R2 adapter after a verified official export and accepted cross-platform archival
need. Supabase owns catalog/approval/provenance; one publisher emits the immutable
public manifest. Preserve asset/version identities across providers.

Kura and the existing private archive retain intake receipts; producer sessions
retain actual human and tool decisions. Join those identities. Add semantic
recommendations only after evaluating the existing structured retrieval. No model
API, new bucket or database migration is introduced by this repair.

Separate domains and hard reloads cannot preserve the same media element. A
user-opened companion listening page is the cross-domain continuity option.
Newsletter links lead to listening pages.

Rollback this repair to the prior PR revision only for investigation, since it
restores known broken delivery. For an operational rollback, remove the runtime
wrapper and retain external listening links. Existing media objects are untouched.
