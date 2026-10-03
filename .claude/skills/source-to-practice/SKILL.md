---
name: source-to-practice
description: Turn a passage from a classic text (Tao Te Ching, Zeami, Musashi, Kenkō, Dōgen, Bashō, Rilke, Keats, Hill, and others) into a Passage Card with verified source, gloss, transposition, kata, receipt, and limit. Use when writing any Lineage series essay, book chapter, guide section, or skill rule derived from a book, when the user says "card this passage", "source-to-practice", "what does X teach creators", or before quoting any classic in public copy.
---

# Source to practice

Plan and context: `docs/strategy/LINEAGE-SERIES-PLAN-2026.md`.

A Passage Card is the atomic unit of the Lineage series. It is written once and compiled into essays, chapters, guides, shorts, and skill rules. A card that fails any check below does not ship.

## The six fields

```markdown
---
series: hidden-flower | uncarved-block | live-the-questions | definite-aim
slug: kebab-case
source_work: "Fūshikaden"
source_author: "Zeami Motokiyo"
source_date: "c. 1418"
source_location: "Book 7 (Besshi kuden)"      # chapter, section, letter, page
text_basis: own-translation | public-domain-translation | modern-translation | paraphrase
edition: "Name, translator, year, page"        # required unless own-translation from a named original
license: public-domain | in-copyright-short-quote | in-copyright-paraphrase-only
lenses: [established, symbolic, experiential]
status: draft | verified | receipt-attached
---

**Source.** The passage, quoted or paraphrased, with location. Label it as a paraphrase when it is one.

**Gloss.** What it meant in its own time and setting. Two to four sentences. No present-day application here.

**Transposition.** The present-day mechanism it maps onto, named plainly: a pacing template, a deletion pass, a release check. No metaphor standing in for the mechanism.

**Kata.** One drill with an observable output: a file, a cut, a line written, a track, a diff. State the output.

**Receipt.** A real artifact made with the kata: link, commit SHA, before/after. Leave "To be filled" until one exists; the card's status stays `verified`, not `receipt-attached`.

**Limit.** Where the mapping breaks, and what the source's author would likely object to.
```

Cards live in `content/lineage/cards/<series>/<slug>.md`.

## Procedure

1. **Locate the passage in the source.** Find it in the original or a named edition. Record the exact location. If it cannot be located, stop: the line is probably misattributed. Misattribution is common for Laozi, Rumi, Musashi, Bashō, Buddha, and Hill quotes that circulate online.
2. **Settle the text basis and license.**
   - Pre-1930 publication or original-language text by an author dead 70+ years: public domain in most jurisdictions. Own translations are preferred.
   - Modern translations (Hinton, Le Guin, Mitchell, Harris, Wilson, Keene, Barks, Mitchell's Rilke): quote at most a sentence or two with edition and page; otherwise paraphrase.
   - Still in copyright (Tanizaki, Mary Oliver, Szymborska, Suzuki's *Zen Mind, Beginner's Mind*): paraphrase only.
   - Hill's *Think and Grow Rich* (1937): check US renewal status before quoting more than a line.
3. **Write the gloss before the transposition.** Context first keeps the application honest.
4. **Transpose to one mechanism.** If two mechanisms fit, write two cards.
5. **Design the kata.** Test: could someone else confirm the kata was done by looking at its output? If not, rewrite it.
6. **Write the limit.** Cover at least one of: historical context that does not transfer (hereditary troupes, samurai ethics, court politics), a religious frame the application drops, or research that contradicts the claim.
7. **Run the checks.**

## Checks

- [ ] All six fields present and non-empty (Receipt may read "To be filled").
- [ ] `source_location` points to a findable place in a named work.
- [ ] `text_basis` and `license` set; in-copyright text is not quoted beyond a sentence or two.
- [ ] Transposition names a concrete mechanism.
- [ ] Kata states an observable output.
- [ ] Limit is specific to this passage.
- [ ] Voice passes `CREATOR.md` and `taste.md`: no guru register, no certainty or medical claims, no emoji, sentence-case labels.
- [ ] Religious or spiritual material is framed with the `symbolic` lens and never as instruction.
- [ ] Japanese romanized in Hepburn with macrons; Chinese in pinyin, with the Wade-Giles form noted once where common (Daodejing / Tao Te Ching).

## Compiling cards

| Target | Cards | Shape |
|---|---|---|
| Short / social | 1 | Hook, kata |
| Essay | 1–3 | Story opening, card body, one receipt in full, kata at the end |
| Guide section | 1 | Card plus tooling: prompt, template, checklist |
| Book chapter | 3–5 | Story, the pattern shown twice, the idea set down plainly (see `content/books/the-wordless-laws/`), kata as the closing page |
| Skill rule | 1 | Transposition becomes the rule, kata becomes the check |

## Series form rules

- **The Hidden Flower** (Japanese craft texts): chapters paced jo → ha → kyū.
- **The Uncarved Block** (Tao Te Ching): short chapters, 900 words maximum.
- **Live the Questions** (poets): letters to a young builder.
- **Definite Aim** (Hill): audit tables: what holds, the research anchor, what to drop.
