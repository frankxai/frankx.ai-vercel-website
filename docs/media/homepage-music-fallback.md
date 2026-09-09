# Homepage playback failure repair

Change class: additive enhancement to the existing featured-release control.
Scope: FeaturedTrackPlayer only; no section, release selection, artwork, routes,
metadata, or homepage preservation tests change. Companion to the persistent
owned-audio player in PR #666, reviewed as a separate homepage pull request.

The current release MP3 responds with HTTP 403. Its metadata error leaves a Play
button and seek range visible. On a media failure, show a direct Suno listening
link in the control position and disable seeking. Keep the release title,
duration, cover, studio note and existing Music route. Do not label an untested
external destination as a verified source. This does not acquire the missing MP3.

| Value dimension | Current evidence | Proposed treatment | Result | Review evidence |
|---|---|---|---|---|
| Identity and voice | HomePageElite and release note | No change | Preserved | Component-only diff |
| AI architecture authority | Existing architecture sections | No change | Preserved | Component-only diff |
| Music and creative proof | FeaturedTrackPlayer, HTTP 403 | Honest listening fallback | Improved | Error-state browser check |
| Products and tools | Existing homepage sections | No change | Preserved | Component-only diff |
| Books, library, articles | Existing homepage sections | No change | Preserved | Component-only diff |
| Founder pathways | Existing homepage links | No change | Preserved | Component-only diff |
| Human Layer boundaries | Existing optional media | No autoplay | Preserved | Contract test |
| Conversion and newsletter | Existing forms and routes | No change | Preserved | Component-only diff |
| Accessibility and motion | Named button, range, status | Named link; disable unavailable seeking | Improved | Keyboard and error-state check |
| SEO and structured data | Route-owned metadata | No change | Preserved | Component-only diff |

The PR receipt records completed verification separately from pending device
checks. Current Android/iOS behavior must not be inferred from a desktop browser.
