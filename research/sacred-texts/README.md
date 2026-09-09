# Sacred Texts Research Corpus

Sacred Texts is the canonical primary-source layer for FrankX's contemplative
research rails. It preserves primary witnesses, original-language texts,
edition facts, rights decisions, and precise passage locators. It is historical
and documentary research—not Arcanea lore, scripture, or fictional canon.

## Ownership

- **Current authority:** `frankxai/frankx.ai-vercel-website` at `research/sacred-texts/`.
- **Editorial consumer:** FrankX contemplative rails under `content/rails/` and `docs/rails/`.
- **Methods provider:** `research-intelligence-os` and `research-intelligence-systems` may supply workflows; they do not own these source files.
- **Future extraction:** the planned `reality-intelligence-system` may package the portable framework after its roadmap gate. It is not an existing repository and does not yet own this corpus.
- **Explicit non-owner:** `arcanean-library` contains fictional Arcanean codices only.

`Sacred Visions` is an editorial collection inside this corpus today, not a
separate repository. A new repository is justified only by an independent
release cycle, permission boundary, storage profile, or governance team.

## The contract

Every item must remain visibly one of four things:

1. **Source** — a primary text or documentary witness.
2. **Translation** — a named translator's accountable rendering.
3. **Interpretation** — attributed scholarship or editorial argument.
4. **Synthesis** — new FrankX writing, never presented as ancient, revealed,
   or spoken by a historical figure.

No file may silently cross those boundaries.

## Repository topology

```text
research/sacred-texts/
├── CANON.md
├── RIGHTS.md
├── ledgers/source-ledger.jsonl
├── originals/
├── registry/
├── schemas/
└── collections/sacred-visions/

content/rails/       # FrankX essays and contemplative editorial surfaces
docs/rails/          # roadmap, policies, and editorial research map
```

## Ingestion gate

A text enters `originals/` only when all of the following are recorded:

- author and stable work identifier;
- original language;
- exact source URL and edition or manuscript basis;
- whether the transcription is diplomatic, normalized, critical, or liturgical;
- rights status for the underlying work, edition, transcription, annotations,
  and any translation;
- capture scope (`full`, `excerpt`, or `locator-only`);
- verification status and reviewer.

An attractive quotation without a traceable edition remains a lead, not a source.

## Christian foundation wave

The first registry covers Augustine, Thomas Aquinas, Meister Eckhart, Teresa of
Ávila, John of the Cross, Blaise Pascal, Søren Kierkegaard, Simone Weil, and
Thomas Merton. It begins with four original-language specimens whose textual
status is stated in each file:

- Augustine, *Confessiones* I.1 (Latin excerpt)
- Thomas Aquinas, *Pange lingua gloriosi Corporis mysterium* (Latin hymn)
- Teresa of Ávila, *Ya toda me entregué y di* (Spanish poem)
- John of the Cross, *Noche oscura* (Spanish poem)

The registry is broader than the first ingest. Full-text capture is earned work:
edition by edition, rights decision by rights decision.

## Next expansion sequence

1. Complete the public-domain original-language poetry of Teresa and John.
2. Add passage witnesses for Augustine, Aquinas, Eckhart, Pascal, and Kierkegaard.
3. Keep Simone Weil edition-aware and Thomas Merton locator-only until the relevant rights are resolved.
4. Add biblical Hebrew, Greek, Syriac, and Latin poetic witnesses before using modern translations.
5. Expand tradition by tradition—Jewish, Islamic and Sufi, Hindu, Buddhist, Sikh, Jain, Daoist, and responsibly governed oral traditions—without collapsing their incompatible claims into generic mysticism.

## Quality rule

Beauty is a selection criterion. Fidelity is the admission criterion.
