# Piano audio repair and practice direction

14 November 2026. Owner: Codex / OpenAI. Owning issue: #1237.
Base revision: baea0d3f51e3e6aed77f7d389f21c1f11b5697e1.
Status: candidate implementation and proposed follow-up. No production verification.

## Immediate job and scope

A learner should press a key, hear it, and know which note to play next. Preserve the existing song and Grand Piano URLs, sample assets, browser-local progress and German child mode. No new dependencies, paid services, model calls or infrastructure in this repair.

Two executable reproductions failed against the base source: GrandPianoEngine leaves its newly-created AudioContext suspended, and the guided hook starts voices before resume resolves. These explain possible silence/startup failures; they do not prove the complete cause of the user's device-specific report.

The candidate awaits audio resume before scheduling voices, reports resume failure with a retry path, preserves synthesis when sample fetching fails, cancels released Grand Piano notes while startup is pending, and respects editable controls in global keyboard handlers. Guided practice adds the exact octave, mapped computer key, five upcoming notes, a progress bar and a sound-test control. Best-star totals now use saved best results instead of accumulating repeated attempts. Pulse hints respect reduced-motion settings.

## Evidence and release boundary

Five mock Web Audio behavioral tests pass, covering first startup, guided scheduling order, interruption recovery and blocked-start retry with offline samples. These exercise extracted implementation bodies, not a real audio device. The first two failed before the patch. Both changed TSX files passed a TypeScript parser check and an isolated strict TypeScript 5.7.3 check using real React types and stubbed Next Link/Framer Motion declarations. That isolated check does not replace the repository type-check or framework build.

The partial checkout was assembled from the authorized GitHub connector. Required type-check, lint, strict language audit and build were attempted but could not start: pnpm attempted dependency setup and the repository's local vendor/google-design-md/package was absent. This is an environment limitation, not a green gate. The committed lockfile has not been changed.

Browser page content was read successfully. Interactive attachment failed twice with CDP focus/auto-attach timeouts; no screenshot, audible playback, mobile layout or guided-completion browser evidence was obtained. Do not mark this candidate release-ready or production-fixed. Vercel's currently observed production deployment is dpl_B9Lhsk9bCHgKMZu9WMPV2UfQG8Dj, READY at the base SHA. Keep the existing Git integration; do not bypass it with a manual deploy.

Before release: run all repository gates in a full checkout, obtain a substantive independent-provider review on the final head, then verify Chrome/Edge keyboard, Android multitouch, iPhone/iPad Safari gesture unlock, mute/retry, sample failure, rapid release, wrong-note wait and completion persistence. Verify stable-domain behavior after the accepted deployment. Recovery is a revert of this isolated change through the same release path.

## Competitor evidence and positioning

Reviewed official sources on 14 November 2026; feature statements are vendor documentation, not independent evaluations. No market-size or conversion claims are established here.

| Product | Documented capability | Product implication |
| --- | --- | --- |
| [Flowkey](https://www.flowkey.com/) | Wait mode follows correct notes; courses and songs | Waiting for a note is baseline behavior, not differentiation. |
| [Synthesia](https://www.synthesiagame.com/) | Falling notes, optional notation, separate hands, MIDI files, progress and finger hints | One score must power synchronized views and hand-specific practice. |
| [Piano Marvel](https://pianomarvel.com/en/article/piano-online) | Prepare/assess modes, smaller passages, multiple tempos and note/rhythm scoring | Separate learning from timed assessment. |
| [Piano Marvel device requirements](https://support.pianomarvel.com/portal/en/kb/articles/requirements) | Device and input constraints; microphone accuracy limitations | Publish a tested compatibility table rather than promising universal input. |

Proposed audience: adult creators learning recognizable musical phrases and families practicing together. Proposed distinction: original FrankX/Arcanea repertoire, short lessons tied to those compositions, portable practice records and an interface that works before account creation. External commercial sheet links and short hard-coded melodies do not establish a verified, complete arrangement. Audit repertoire accuracy and rights before expanding the catalogue or charging for it.

## Next implementation decision

Unify the current two audio implementations behind a browser-owned instrument service, keeping audio scheduling separate from React rendering. Use one typed score representation for tempo, beats, pitch, duration, chords, hands, fingering, phrases and source/rights metadata. Convert authorized MusicXML/MIDI into that representation. Do not begin with a new framework or an agent orchestrator.

A practice session should move through sound check, phrase demonstration, untimed correct-note practice, repeat, then timed assessment. Store note attempts and timing separately; do not present a note-only star score as performance mastery. Preserve local operation and provide JSON/MIDI export before adding optional account sync.

| Layer | Proposed choice | Boundary and evidence |
| --- | --- | --- |
| Instrument | Existing Web Audio samples and synthesis first; shared clock and voice lifecycle | Benchmark onset, scheduling jitter, voice cleanup and sample download size on actual devices before replacing the engine. |
| Score view | Evaluate [OpenSheetMusicDisplay](https://opensheetmusicdisplay.org/) with MusicXML | Official site documents MusicXML/VexFlow integration and commercial-friendly open-source licensing; verify the exact pinned package license and notices. |
| Real keyboard | Capability-detected Web MIDI, explicitly requested by the player | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) marks support as limited; keep touch/computer-keyboard paths. No automatic permission prompts. |
| Timing/DSP | AudioContext clock; AudioWorklet only when profiling establishes a need | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) documents separate-thread processing. No server round trip in the note-response path. |
| Microphone | Separate evaluated experiment after MIDI | Consent, local processing, room noise and onset accuracy need evidence. [Spotify Basic Pitch](https://github.com/spotify/basic-pitch) is an audio-to-MIDI candidate, not proven low-latency live piano grading. |
| Hosting | Existing Next.js/Vercel surface | Retain current deployment and media placement until measured evidence justifies a change; no new compute required for this repair. |
| AI teaching | Explain recorded mistakes and choose the next authorized exercise | Keep deterministic note/timing judgments outside the language model. No live inference requirement for playing a note. |

## Device and economic validation

Prioritize Windows/macOS Chrome or Edge with wired USB MIDI and wired audio, plus desktop keyboard input. Test Android Chrome touch and MIDI separately. Keep iOS/iPadOS Safari on verified touch/audio behavior until actual input support is demonstrated. Distinguish Bluetooth audio latency from Bluetooth MIDI compatibility; do not imply that one establishes the other.

Proposed instrument targets, not measured results: audible first interaction without waiting for samples; MIDI-to-voice onset under 30 ms on the supported wired reference device; stable overlapping voices; no stuck notes after blur, octave change or cancellation; usable touch layout and score cursor under reduced motion.

Measure sound-check success, first phrase completion, repeat practice, voluntary return and support failures before adding paid plans. Offer original lesson packs only after repertoire rights and teaching quality pass review. Existing browser execution makes marginal note playback independent of model/API cost; hosting, bandwidth, content production and support still need measurement. Do not claim profitable unit economics without those figures.
