# ElevenLabs Audio Briefing Production Spec

Use this worksheet before synthesizing any founder journal note, essay summary, or product changelog into published audio.

## 1. Canonical Input & Scope

- **Journal / Article Slug**: `2026-07-29-confidence-must-enter-the-market`
- **Canonical URL**: `https://www.frankx.ai/journal/2026-07-29-confidence-must-enter-the-market`
- **Visibility Check**: `visibility: public` and `published: true` verified
- **Character Ceiling**: Max `2,800` characters per request (`~300–450` words, `~2.5` spoken minutes)
- **Idempotency Key Formula**: `sha256("frankx-audio-briefing:v1:" + slug + ":" + scriptSha256 + ":" + voiceId + ":" + modelId).slice(0, 32)`

## 2. Voice Rights & Consent Record

- **Voice ID**: `JBFqnCBsd6RMkjVDRZzb` (George — Licensed Studio Narrator)
- **Rights Basis**: `elevenlabs-licensed-voice-library` or `first-party-owner-consent`
- **Voice Owner Approved**: `[x] Yes`
- **Editorial Approved**: `[x] Yes`
- **Third-Party Unconsented Cloning Prohibited**: `[x] Enforced`

## 3. Model & Voice Parameter Preset

| Parameter | Target Value | Reason |
|---|---|---|
| `model_id` | `eleven_multilingual_v2` (studio) or `eleven_turbo_v2_5` (batch) | Use `eleven_multilingual_v2` for flagship essays; `eleven_turbo_v2_5` at 0.5 credits/char for daily notes |
| `output_format` | `mp3_44100_128` | Direct compatibility with HTML5 `<audio>` and podcast feeds |
| `stability` | `0.55` | Preserves natural sentence cadence without mid-paragraph speed-up |
| `similarity_boost` | `0.78` | Keeps vocal timbre consistent across paragraphs |
| `style` | `0.12` | Subtle inflection without theatrical over-acting |
| `use_speaker_boost` | `true` | Crisp presence on mobile phone speakers |

## 4. Spoken Script Template

```text
FrankX Founder Journal Audio Briefing. Confidence must enter the market. Dated 2026-07-29. A state becomes strategy only when it reaches a real person and returns with evidence.

Today gave me two halves of one loop. One room was about state: posture, imagery, attention, breath, play, inner voice, and rehearsing recovery when the clean script breaks.

The other was about contact: one audience, one offer, one platform, traffic, response, and staying with the signal long enough to learn.

The synthesis is blunt: Regulate, then rehearse, then ship, then distribute, then observe, then improve, then repeat.

End of briefing. Read the canonical note at frankx.ai/journal/2026-07-29-confidence-must-enter-the-market.
```

## 5. Post-Synthesis QA & Stop Rules

1. **Byte & Header Inspection**: Confirm payload is at least `512` bytes and starts with an `ID3` header (`0x49 0x44 0x33`) or MPEG frame sync (`0xFF 0xE0`).
2. **Loudness Normalization**:
   ```bash
   ffmpeg -i raw-briefing.mp3 \
     -af "highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=15:release=180,loudnorm=I=-14:TP=-1.5:LRA=9" \
     -ar 44100 -b:a 128k briefing-master.mp3
   ```
3. **Stop Rule**: Halt immediately if the source note is marked `private`, if voice-owner consent is missing, if names or technical acronyms mispronounce on two consecutive takes, or if credit consumption exceeds the run budget.
