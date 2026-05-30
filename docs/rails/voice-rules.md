# Voice Rules — Contemplative Rails

> The editorial standard. Every rail entry is checked against these rules before commit. Verbatim from the original Claude-chat handoff §3.

## Register

**Research-led first person. Minimal biography.** "I keep landing here" not "let me tell you my story." "The traditions converge on" not "in my experience." When personal voice appears, it's compressed — one or two clauses, not paragraphs.

| Personal-essay register (avoid) | Research-led register (target) |
|---|---|
| "Last Sunday I had a moment in church where I really felt…" | "The Hesychast tradition records this same pattern in monastic accounts from Mount Athos." |
| "Ever since I started doing breathwork I realized…" | "Wim Hof's protocol overlaps structurally with the Hesychast Jesus Prayer practiced in monastic Orthodoxy from the 4th century onward." |
| "I want to share my journey through these traditions." | "Reading Eckhart and Ramana side by side, the structural overlap is harder to ignore than the Christian-Vedantic dispute usually allows." |

The "I" is present, but as researcher-walking-the-question, not memoirist.

## Sentence-level rules

1. **Cite primary sources with date, edition, sermon number, or chapter.** Eckhart's Sermon 48 on the eye through which God sees, not "Eckhart said." Ramana's *Be As You Are* (ed. David Godman, 1985), not "Ramana taught."

2. **Quote sparingly. One direct quote per source per entry, under 15 words.** Default is paraphrase. Direct quotes earn their place when the exact wording carries meaning that paraphrase loses.

3. **Name scientific sources by paper or book.** Penrose & Hameroff's Orch OR theory (Penrose, *The Emperor's New Mind*, 1989; refined in Hameroff & Penrose, "Consciousness in the Universe," *Physics of Life Reviews*, 2014). Bohm's *Wholeness and the Implicate Order* (1980). Sheldrake's *The Presence of the Past* (1988).

4. **No claims of the form "science proves mysticism."** Map convergences honestly. State where physics is contested, where neuroscience disagrees, where traditions diverge from each other.

5. **No sermon, no testimony, no proselytism.** The rail does not preach to Christians, mystics, or skeptics. It walks.

6. **AI involvement named once per entry, in the closing line or footer.** Standard: *"Worked through with Claude as research partner. The breadth wouldn't be possible without it; the synthesis is mine."*

7. **No emoji. No flourish closers** (no namaste, no "blessings", no decorative pictographs).

8. **No personal location, no church name, no relationships named.** Practice shows in the writing — what gets engaged with, what gets read, what gets taken seriously — never as autobiography.

## Voice diagnostics

Before shipping any entry, ask:
- Could a thoughtful atheist read this without feeling preached at?
- Could a thoughtful Christian read this without feeling diluted?
- Could a thoughtful physicist read this without rolling their eyes at the science claims?
- Could a thoughtful Advaita reader recognize Ramana correctly?

If any answer is no, the entry isn't ready.

## Banned phrases (build-time gate via `validate-no-arcanea.mjs`)

- Arcanea, Vel'Tara, Vel'Thaan, Eldrian, Guardian, Luminor, Shinkami, Lumina
- SIP, SIS (these are FrankX system acronyms — not on rails)
- Hz frequency vocabulary (174Hz, 528Hz, etc.) — soul-frequency mythology
- "Soul Frequency", "Soulbook" — these belong elsewhere on FrankX, not on rails

The rails are the FrankX-clean subbrand: research voice, no system mythology.
