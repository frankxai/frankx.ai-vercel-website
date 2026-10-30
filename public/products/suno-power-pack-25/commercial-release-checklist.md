# Commercial Release & Mastering Checklist for AI-Assisted Music

Use this step-by-step release checklist to turn raw Suno v4 / v4.5 generations into commercially compliant, streaming-ready releases on Spotify, Apple Music, Tidal, and YouTube.

---

## Phase 1: Selection & Stem Separation

- [ ] **1.1 Audition for Phase & Sibilance Artifacts**
  - Listen on studio monitors and closed-back headphones at low and high volume.
  - Reject takes with metallic high-hat swish (`10kHz–14kHz`), robotic vocal warble on sustained vowels, or stereo collapse in mono.
- [ ] **1.2 Export Uncompressed WAV**
  - Always download the `.wav` master from Suno Pro/Premier (never master from a compressed `.mp3`).
- [ ] **1.3 High-Precision Stem Separation**
  - Run the WAV through **Logic Pro 11 Stem Splitter**, **iZotope RX 11 Music Rebalance**, **LALAL.AI (Perseus/Orion)**, or **Demucs v4 (htdemucs_ft)** to isolate:
    - `Vocals.wav`
    - `Drums.wav`
    - `Bass.wav`
    - `Other / Synths / Strings.wav`
- [ ] **1.4 Stem Cleanup & Human Overdubs**
  - High-pass non-bass stems at `90Hz–120Hz` (`12dB/oct`) to clear low-mid mud.
  - Layer at least one real or MIDI-performed element (live bass, analog synth pad, acoustic percussion, or vocal harmony) to elevate dynamic depth and human authorship.

---

## Phase 2: Mix & Mastering Specs

- [ ] **2.1 Sub-Bass Mono Compatibility**
  - Place a mid/side utility on the Bass & Kick bus and force everything below `110Hz` to **100% Mono**.
- [ ] **2.2 Dynamic EQ & De-Harshing**
  - Tame resonant AI synthesis peaks around `3.2kHz–4.5kHz` using a dynamic EQ (FabFilter Pro-Q 3 or Soothe2) with `-1.5dB` to `-2.5dB` max attenuation.
- [ ] **2.3 True Peak & Loudness Targets**
  - **Integrated Loudness**: `-14.0 LUFS` (streaming dynamic target) or `-9.5 to -11.0 LUFS` (club/electronic competitive master).
  - **True Peak Ceiling**: `-1.0 dBTP` (strict requirement for Apple Digital Masters and Spotify transcoding).
  - **Sample Rate / Bit Depth**: `48kHz / 24-bit WAV` (or `44.1kHz / 24-bit WAV`).
- [ ] **2.4 Clean Head & Tail Fades**
  - Add a `15ms` fade-in at bar 1 to prevent zero-crossing clicks and a clean `1.5s–3.0s` exponential fade-out on the reverb tail so the track never cuts off abruptly.

---

## Phase 3: Metadata, ISRC & Rights Hygiene

- [ ] **3.1 Confirm Suno Commercial Tier Provenance**
  - Verify the track was generated under an active **Suno Pro or Premier** subscription (required for commercial ownership under Suno Terms of Service) and log the generation ID + date in your catalog ledger.
- [ ] **3.2 Assign ISRC & UPC Codes**
  - Assign a unique **ISRC** per version (Main Mix, Extended Club Mix, Instrumental, Sped-Up Edit).
- [ ] **3.3 Embed ID3 / BWF Metadata**
  - Artist Name, Track Title, Album/EP Title, Release Year, Genre, BPM, Key, and ISRC embedded in the master files.
- [ ] **3.4 Lyrics Formatting (Apple Music & Musixmatch)**
  - Capitalize line starts, remove all square-bracket metatags (`[Chorus]`, `[Drop]`, `[Outro]`), and avoid punctuation at the end of lines.

---

## Phase 4: Visual Assets & Spotify Canvas

- [ ] **4.1 Cover Artwork (`3000 × 3000 px`)**
  - RGB color space, `.jpg` or `.png`, zero blurry upscaling, no third-party logos or URLs.
- [ ] **4.2 Spotify Canvas (`9:16 Vertical Loop`)**
  - Resolution: `1080 × 1920 px`, MP4 (H.264), `3s to 8s` seamless loop, no text overlays in the bottom third (obscured by player controls).
- [ ] **4.3 Apple Music Motion Artwork**
  - Deliver both `1:1` (`3840 × 3840 px`) and `9:16` (`2160 × 3840 px`) seamless motion loops where supported.

---

## Phase 5: Distribution & Pre-Release Gate (DistroKid / AWAL / Symphonic)

- [ ] **5.1 Upload Lead Time**
  - Submit at least **14–21 days before release date** to qualify for **Spotify for Artists** editorial playlist pitching.
- [ ] **5.2 Content ID & Social Monetization Opt-In**
  - Enable YouTube Content ID, TikTok Sound Library, and Meta Audio Library only if your track contains original arrangement/human layers and zero cleared/third-party splice loops that prohibit Content ID.
- [ ] **5.3 Pre-Save & Snippet Cutdowns**
  - Export three `15s–30s` vertical hook clips starting immediately at the `[Chorus]` or `[Drop]` timestamp for Reels, Shorts, and TikTok.
