# Lineage — series plan for books, essays, guides, and skills built on classic texts

**Status:** plan, 2026-09-28. Nothing here is published. Public copy derived from it passes `CREATOR.md`, `taste.md`, and `pnpm run ai-slop:audit:strict` before release.
**Owner:** Frank Riemer · **Repo surfaces:** `content/books/`, `content/blog/`, `content/guides/`, `data/library-*.ts`, `.claude/skills/`

---

## 1. Thesis

The model has read everything and belongs to no one. A creator's advantage in the age of intelligence is to belong to someone: to a lineage of makers whose judgment they have studied closely enough to use.

Competent output is now cheap. What stays scarce is taste, a point of view, restraint, attention, and the nerve to leave things out. The classics are compressed manuals for exactly those faculties. Their authors worked without leverage, so they wrote down judgment rather than technique. Zeami wrote a secret handbook for his heirs on how to stay surprising to an audience. Musashi wrote down how to train when no teacher is watching. Laozi wrote 81 short chapters on doing less. Rilke wrote ten letters to one young poet about working from the inside. Each one maps onto a concrete problem a person building with AI has this week.

**Lineage** is the umbrella: book series, essays, guides, and open skills that turn classic texts into working practice for vibe coders, generative creators, and founders.

### What it is not

- A quote blog. Every piece ends in a practice with an observable output.
- A self-help rewrite. Brand rules hold: no guru register, no certainty claims, no metaphysics presented as science.
- A replacement for *The Wordless Laws*. That book already covers the manifestation canon as unnamed narrative. Lineage names its sources, cites them, and teaches craft.

---

## 2. The atomic unit: the Passage Card

Everything is written once as a card and compiled into many outputs. One card is ~300–600 words and has six fields. The same six fields map onto the library's existing claim-basis lenses (`Established`, `Experiential`, `Symbolic`) in `data/spiritual-reading-guides.ts`.

| Field | Question it answers | Lens |
|---|---|---|
| **Source** | Exact passage, work, section, date, edition or own translation, license status | Established |
| **Gloss** | What it meant in its own time and context | Established |
| **Transposition** | Which present-day mechanism it maps onto, named plainly | Symbolic → made concrete |
| **Kata** | A drill with an observable output (a file, a cut, a track, a deleted paragraph) | Experiential |
| **Receipt** | Frank's own artifact made with it: commit, song, page, before/after | Experiential, evidenced |
| **Limit** | Where the analogy breaks, and what the source would reject about the use | Established |

The **Limit** field is the differentiator. Most "ancient wisdom for business" content fails because it never says where the mapping stops. Stating it is what makes the rest credible.

### Compile targets

| Output | Cards | Added layer |
|---|---|---|
| Short video / social post | 1 | Hook + the kata only |
| Blog essay | 1–3 | Narrative opening, one receipt shown in full |
| Guide | 5–8 | Tooling, prompts, templates, a checklist |
| Book chapter | 3–5 | Story, the pattern shown twice, the law set down (the *Wordless Laws* shape) |
| Skill | 5–12 | Cards become rules and checks an agent can run |
| Workshop / retreat block | 3 | Morning reading, midday build, evening review |

Cards live in `content/lineage/cards/<series>/<slug>.md` once the first series is approved. The `source-to-practice` skill (`.claude/skills/source-to-practice/`) writes and validates them.

---

## 3. Form follows the source

Each series takes its structure from the text it studies. This is the design decision that keeps the collection from reading like one template applied five times.

| Series | Source form | Series form |
|---|---|---|
| The Hidden Flower | Zeami's secret transmission text, three-part pacing (jo-ha-kyū) | Three movements; each chapter paced jo → ha → kyū |
| The Uncarved Block | 81 short chapters | 27 short chapters, none over 900 words |
| Live the Questions | Rilke's letters | Letters to a young builder |
| Definite Aim | Hill's 13 steps | An audit: each step, what holds, what doesn't |
| Essays (all series) | Montaigne's *essais*, attempts | The blog is framed as attempts, dated and revisable |

---

## 4. The series

### 4.1 The Hidden Flower — Japanese craft texts for creators (lead series)

**Why first:** least saturated in English creator publishing, most transferable craft, closest to Frank's aesthetic (anime, lo-fi, ritual practice), and it has a true hook that needs no inflation: Zeami's *Fūshikaden* was written as a secret transmission for his successors and was not published until 1909, roughly five hundred years later.

| Source | Date | Core idea | Transposition for AI-era makers |
|---|---|---|---|
| Zeami, *Fūshikaden* (Kadenshō) | c. 1400–1418 | *Hana*, the flower: the quality of freshness the audience perceives; the "hidden flower" works because it is unexpected | **Hana audit:** name the one thing in a release the audience has not seen from you. None found means it is not ready. |
| Zeami, *Kakyō* | 1424 | *Shoshin wasuru bekarazu*: never forget the beginner's mind (Zeami's original sense includes the beginner's mistakes at each stage) | Keep a failure log per skill level; re-read it before each new tool adoption |
| Zeami, jo-ha-kyū | c. 1400s | Opening, break, rapid close as a pacing law at every scale | Pacing template for landing pages, video cuts, song structure, product launches |
| Miyamoto Musashi, *Go Rin no Sho* | 1645 | Nine rules in the Earth scroll, including "the way is in training," "know the ways of all professions," "pay attention even to trifles," "do nothing which is of no use" | Training plan for solo builders; cross-discipline study; the "no useless action" pass on a codebase or a content calendar |
| Musashi, rhythm (*hyōshi*) | 1645 | Winning comes from perceiving and breaking the opponent's rhythm | Release timing against a market's attention cycles |
| Yoshida Kenkō, *Tsurezuregusa* | c. 1330 | Beauty in the incomplete and the impermanent (the passage on leaving things unfinished, §82) | Ship versioned work that leaves room; the living-edition model |
| Kamo no Chōmei, *Hōjōki* | 1212 | A ten-foot-square hut; ownership as burden | Minimal-footprint operations for a solo studio: the smallest stack that does the work |
| Dōgen, *Genjōkōan* | 1233 | "To study the self is to forget the self"; practice and realization are one | The daily practice is the output: build logs, session notes, one shipped thing per day |
| Takuan Sōhō, *Fudōchi Shinmyōroku* (The Unfettered Mind) | c. 1630s | The mind that stops on one thing loses everything else | Not fixating on one model generation; moving attention across options without attachment |
| Bashō, via Dohō's *Sanzōshi* | 1702 (rec.) | "Learn about the pine from the pine" | Primary-source research over summaries; study the material, not commentary about it |
| *Shu-ha-ri* (tea and Noh teaching tradition) | 18th c. onward | Obey the form, break the form, leave the form | The curriculum spine for teaching vibe coders (see §6) |

**Handle with care:** *Hagakure* (1716) carries a death-and-loyalty ethic that does not transpose to creators without distortion; quote it only in a Limit field. Tanizaki's *In Praise of Shadows* (1933) is still in copyright in Japan; discuss, do not reproduce.

**Deliverables:** book (3 movements × 4 chapters + invitation + last page), 12 essays, guide "The Hidden Flower method for releases," skills `hana-audit` and `shu-ha-ri-curriculum`.

### 4.2 The Uncarved Block — Tao Te Ching for builders

**Why:** highest search demand of the set; drives essay traffic while the lead book is written. Site already has a Tao reading guide on the Hinton edition to link from.

| Chapter | Idea | Transposition |
|---|---|---|
| 11 | Thirty spokes share one hub; the use is in the empty space | Context windows, negative space in layout, the silence in a mix |
| 48 | In pursuit of learning, something is added daily; in pursuit of the Dao, something is dropped | **Subtraction pass:** delete until function breaks, restore the last cut |
| 57 | The more laws, the more thieves | Over-specified prompts and rulebooks produce the failures they forbid |
| 63–64 | Do the difficult while it is easy; the long walk starts beneath your feet | Fix architecture at file one; smallest shippable step |
| 28, 32 | *Pu*, the uncarved block | The unprompted default state of a model and of a maker; start from raw material |
| 78 | Nothing is softer than water, nothing better at wearing down the hard | Persistence through small, repeated releases |

**Deliverables:** 27-chapter book of short pieces, 12 essays, guide "Wu wei prompting: the shortest prompt that works," skill `subtraction-pass`.

### 4.3 Live the Questions — poets as craft teachers

| Poet / source | Idea | Transposition |
|---|---|---|
| Rilke, *Letters to a Young Poet*, letter 4 (16 July 1903) | Live the questions now | Holding an open product question through builds instead of forcing an answer |
| Keats, letter to George and Tom Keats (Dec 1817) | Negative capability: remaining in uncertainty without reaching after fact | Working with stochastic models: hold several divergent generations before judging |
| Wordsworth, Preface to *Lyrical Ballads* (1800/1802) | Poetry takes its origin from emotion recollected in tranquillity | Capture → rest → distill pipeline for journals and voice notes |
| Dickinson, "Tell all the truth but tell it slant" | The oblique entry | Angle-finding for crowded topics |
| Whitman, *Leaves of Grass* (1855–1892) | Self-published and revised across nine editions | The living edition as a product model |
| Bashō, *Oku no Hosomichi* | Compression, *karumi* (lightness) | Hook writing; caption and title craft |
| Hopkins, notebooks | *Inscape*: the distinct inner form of a thing | Finding a creator's signature pattern across a catalog |

**Form:** letters to a young builder. Newsletter-native: one letter per issue, compiled into the book.
**Copyright:** Mary Oliver, Szymborska, and modern Rumi renderings (Barks) are in copyright and Barks' fidelity is contested; reference, do not reproduce. Rilke's German original is public domain; use own translations.
**Deliverables:** 12 letters, guide "Negative capability for generative work," skills `negative-capability` and `slant`.

### 4.4 Definite Aim — Think and Grow Rich, audited

**Scope decision:** essays and one guide, no full book. *The Wordless Laws* already occupies this territory in narrative form. A second book would compete with it.

**Angle:** read Hill (1937) as an engineer reads an old spec. Keep what is operational, test it against research, and mark what fails. State plainly that Hill's claimed commission from Andrew Carnegie and his interviews are not independently documented; treat the book as a practitioner's synthesis, not research.

| Hill | What holds | Research anchor | What to drop |
|---|---|---|---|
| Definite chief aim | A written, specific goal changes behavior | Goal-setting theory (Locke & Latham) | Claims that intensity of desire alone attracts outcomes |
| Organized planning | Plans with dates and first actions | Implementation intentions (Gollwitzer) | — |
| Master mind | Coordinated minds working toward one aim | Team cognition; now also agent councils | The "third mind" as a metaphysical entity |
| Specialized knowledge | Organized, applied knowledge beats general knowledge | Deliberate practice | — |
| Autosuggestion | Repeated statement of intent | Self-affirmation research, with mixed effects | Guaranteed results |
| Persistence | Continuing after setbacks | Grit research, with its measurement critiques | — |

**Deliverables:** 6 essays, guide "The mastermind stack: from Hill's circle to an agent council" (links to `/council`), no new skill; map to the existing council command.
**Copyright:** check US renewal status of the 1937 text before quoting beyond short passages.

### 4.5 Essays across the collection — Montaigne as patron

The blog runs as *essais*: dated attempts, openly revisable, each ending in a kata. This form gives the blog permission to be unfinished (Kenkō) and versioned (Whitman), and every essay can later be promoted into a book chapter.

Optional later series, only after the first three ship: *Bhagavad Gita* (act without attachment to the fruits: shipping without attachment to metrics); Seneca, *On the Shortness of Life*; Leonardo's notebooks as the original build log. The Stoics are already covered by `spartan-mindset` and the `greek-philosopher` skill; link them.

---

## 5. Skills developed in the process

Each skill is built from the cards of its series, so writing the book trains the skill. Skills are published open source (`frankxai/claude-skills-library`) as proof and distribution; the books carry the depth.

| Skill | Source | What it does | Check it runs |
|---|---|---|---|
| `source-to-practice` | Method (all series) | Writes and validates Passage Cards | All six fields present; source has date and license status; kata has an observable output; Limit is not empty |
| `hana-audit` | Zeami | Release review for freshness and pacing | Names the one new element; maps sections to jo-ha-kyū; flags a flat middle |
| `subtraction-pass` | Tao 48 | Cuts prompts, drafts, components, stacks | Removes until a test or read-through fails; reports what was cut and restored |
| `shu-ha-ri-curriculum` | Shu-ha-ri | Builds learning ladders for a tool or craft | Each rung has a reference build (shu), one constraint to break (ha), a blank-spec brief (ri) |
| `negative-capability` | Keats | Divergent generation with delayed judgment | ≥3 divergent candidates; criteria written after seeing them; selection reasoned |
| `slant` | Dickinson | Finds oblique angles on crowded topics | 5 angles, each with the conventional take it avoids |

`source-to-practice` ships with this plan. The others are specified here and built as their series reaches its first 12 cards.

---

## 6. Teaching vibe coders and generative creators

The curriculum spine is *shu-ha-ri*, which matches how people actually learn with agents:

1. **Shu, obey.** Reproduce a reference build exactly with the agent. Read every line it wrote. Kata: rebuild one page of frankx.ai from its spec and diff yours against the original.
2. **Ha, break.** Change one constraint per build: remove a library, halve the prompt, invert the palette, cut the page to one section. Kata: `subtraction-pass` on your own last project.
3. **Ri, leave.** Write the spec from blank, in your own voice, for something no reference exists for. Kata: `hana-audit` before release; ship only when one new element is named.

Supporting practices across every level:

- **Learn the pine from the pine.** Read source documentation and primary texts, not threads about them.
- **Negative capability.** Generate wide, judge late.
- **Jo-ha-kyū.** Pace everything: a hero section, a 40-second short, a song, a launch week.
- **Do nothing which is of no use.** Monthly pass over tools, subscriptions, agents, and pages.
- **Recollection in tranquillity.** Capture in the moment, write a day later.

Output for the audience: a free guide ("The Lineage practice: five texts, five drills") as the entry point, the books as depth, the skills as tools they install, workshops and retreats as the live format (morning reading, midday build, evening review).

---

## 7. Quality contract

Hard rules for every card, essay, chapter, and guide:

1. **Primary source first.** Quote from public-domain originals or pre-1930 translations, or write an own translation and label it. Modern translations are cited by name, edition, and page, and quoted only briefly.
2. **Every attribution is checked.** Many famous lines are misattributed (much of what circulates as Rumi, Laozi, or Musashi online is not in the texts). A card without a verifiable source location does not ship.
3. **Every essay ends in a kata** with an observable output.
4. **Every mapping states its Limit.**
5. **Receipts over claims.** Show the actual before/after, commit, or track. No invented outcomes, no reader-result promises.
6. **Voice:** Frank's brand voice per `CREATOR.md`. No guru register, no prestige language, no emoji, sentence-case labels.
7. **Cultural care:** Japanese and Chinese sources are presented with their context and native terms, romanized consistently (Hepburn; pinyin with the common Wade-Giles form noted once). Religious texts are handled as the `Symbolic` lens, not as instructions.
8. **Gate:** `@integrity-guard` and the editorial audit before publish; `excellence-book-writing` for book chapters.

---

## 8. Sequencing — first 12 weeks

| Weeks | Work | Output |
|---|---|---|
| 1–2 | 12 Hidden Flower cards via `source-to-practice`; 6 Uncarved Block cards | 18 validated cards, source ledger |
| 3 | First two essays live: "The secret handbook that stayed hidden for 500 years" (Zeami, hana audit) and "The shortest prompt that works" (Tao 48) | 2 essays, 1 short each |
| 4 | Build `hana-audit` and `subtraction-pass` from the cards; run both on a real FrankX release as the receipt | 2 skills, 2 receipts |
| 5–8 | One essay per week alternating series; first Rilke letter in the newsletter; Definite Aim audit essay | 4 essays, 1 letter |
| 6–10 | Hidden Flower manuscript, movement one (jo), four chapters | Draft chapters in `content/books/the-hidden-flower/` |
| 9 | Guide: "The Lineage practice: five texts, five drills" as the free entry point | 1 guide |
| 11–12 | Library integration: add each source to `data/library-reading-guides.json` with edition notes; open-source the skills | Library entries, public skills repo PR |

**Measure:** per essay, organic entrances and guide sign-ups; per skill, installs and issues opened; per book, pre-orders from the guide list. Review at week 12 and pick book two from the numbers: Uncarved Block if search leads, Live the Questions if the newsletter leads.

---

## 9. Worked example card

> **Source.** Zeami Motokiyo, *Fūshikaden*, Book 7 (Besshi kuden), c. 1418. The teaching on the hidden flower: what is kept hidden is the flower; what is not kept hidden cannot be the flower. Paraphrase from the Japanese; not a quotation of any English edition. Public domain original.
>
> **Gloss.** Zeami wrote for his successors, not the public. *Hana* is the audience's experience of freshness and surprise. It depends on the audience not knowing in advance what the actor will do, so secrecy is a method, not concealment for its own sake.
>
> **Transposition.** A release works when it contains one element the audience has not already seen from you. Generative tools make the expected cheap; the flower is the part they did not predict.
>
> **Kata.** Before the next release, write one line: "The new element is ___." If you cannot fill it in plainly, hold the release and add one. Keep a log of these lines.
>
> **Receipt.** To be filled with the first FrankX release audited this way: the line written, what was added, and the release link.
>
> **Limit.** Zeami's secrecy served a hereditary troupe competing for patronage. Open-source builders publish their methods; the transposition keeps the surprise in the work and gives the method away. Zeami would likely not approve of that part.

---

_Every public artifact derived from this plan carries its source ledger. The ledger is the moat: anyone can generate "ancient wisdom for creators"; very few will cite the section, the edition, and where the idea stops working._
