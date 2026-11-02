# 25 Suno Power Prompts Pack (Suno v4 / v4.5 Architecture Guide)

> **Curated from 845+ studio sessions across FrankX & Vibe OS.**
> **Includes**: 25 complete prompt architectures (`suno-v4-25-prompts.md` + `suno-v4-25-prompts.json`) and `commercial-release-checklist.md`.

---

## Why Most Suno Generations Muddy Out

Default text prompts fail in Suno v4/v4.5 for three predictable reasons:
1. **Overstuffed Style Box**: Mixing contradictory genres and 15+ adjectives confuses the diffusion arrangement head, resulting in mid-range phase mud.
2. **Missing Structural Metatags**: Without explicit `[Intro]`, `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Drop]`, `[Bridge]`, and `[Outro]` anchors in the lyrics/arrangement box, Suno rushes the climax at 0:35 and loops aimlessly after 1:45.
3. **Zero Negative Exclusions**: Failing to exclude unwanted elements (e.g., `no vocals` on instrumental cues, `no trap hi-hats` on orchestral scores, `no harsh sibilance` on intimate neo-soul tracks) burns credits on unusable takes.

---

## The 3-Layer Prompt Architecture Used in This Pack

Every prompt in this bundle separates control into three clean layers:

### Layer 1: Style & Sonic Signature (`stylePrompt`)
Keep your Style field between **120 and 185 characters** in this exact order:
`[Primary Subgenre] + [2-3 Core Instruments/Timbres] + [Mix/Production Character] + [BPM + Key Signature]`

*Example:*
`Cinematic hybrid orchestral, braaam brass swells, solo cello ostinato, taiko sub-bass impacts, wide Dolby Atmos staging, crisp transient punch, 110 BPM, D Minor`

### Layer 2: Negative Style Exclusions (`excludeStyles`)
Paste into Suno's **Exclude Styles** field to lock out unwanted artifacts:
- For **Cinematic / Instrumental**: `vocals, singing, spoken word, lo-fi crackle, trap hi-hats, muddy low-mid`
- For **Electronic / Club**: `acoustic folk guitar, Country twang, off-beat clapping, narrow mono mix`
- For **Intimate Vocal Tracks**: `autotune robotic warble, stadium reverb wash, harsh 4kHz sibilance`

### Layer 3: Structural Arrangement Metatags (`structurePrompt`)
Paste into the **Custom Lyrics / Arrangement** box. Even for instrumental tracks, structural metatags in square brackets direct the arrangement engine bar-by-bar:

```text
[Intro - Sparse Solo Piano & Sub-Bass Drone, 8 Bars]
[Verse 1 - Staccato Strings Enter, Tight Pulse]
[Build - Rising Brass Swells & Taiko Rolls]
[Drop / Climax - Full Orchestra & Hybrid Sub Impact]
[Bridge - Sudden Half-Time Breakdown, Solo Cello]
[Outro - Clean Reverb Tail Fade to Silence, End]
```

---

## The 5 Studio Categories (25 Prompts Total)

1. **Cinematic Orchestral (`CIN-01` to `CIN-05`)**: IMAX-scale hybrid scores, Nordic solo cello themes, sci-fi horizon pulses, dark thriller tension, and triumphant finale suites.
2. **Cyberpunk / Synthwave (`CYB-01` to `CYB-05`)**: Analog CS-80 arpeggios, mid-tempo darksynth basslines, neon outrun nightdrives, industrial cyber-breaks, and dystopian terminal themes.
3. **Deep House / Melodic Techno (`DHM-01` to `DHM-05`)**: Afterlife-inspired melodic techno, organic desert deep house, progressive late-night hypnotic rollers, UK garage 2-step grooves, and peak-hour warehouse euphoria.
4. **Neo-Soul / Lo-Fi Focus (`NSL-01` to `NSL-05`)**: Rhodes Mk1 & J Dilla pocket beats, Tokyo rain jazz-hop, warm analog tape study loops, soulful bass-led late-night R&B, and ambient modular coding focus.
5. **Epic Trailer / Hybrid Rock (`ETR-01` to `ETR-05`)**: Drop-tuned baritone guitar + orchestral brass, kinetic percussion action trailers, stadium post-rock crescendos, dark electronic-metal boss themes, and championship anthem builds.

---

## Quick Workflow

1. Open `suno-v4-25-prompts.md` (human-readable) or load `suno-v4-25-prompts.json` into your automation script / Notion database.
2. Toggle **Custom Mode** in Suno v4 / v4.5.
3. Copy `stylePrompt` into **Style of Music**, `excludeStyles` into **Exclude Styles**, and `structurePrompt` into the **Lyrics / Structure** field.
4. Once you generate a keeper take, follow `commercial-release-checklist.md` to stem-separate, master to `-14 LUFS`, and ship to Spotify, Apple Music, and YouTube.
