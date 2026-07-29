# MVU Tallinn Knowledgebase — Editorial and Release Handover

Last assembled: 29 July 2026  
Working branch: `codex/mvu-source-recovery-20260729`  
Pull request: #400  
Production merge: intentionally not performed by this handover

## Outcome

The MVU surface is now a routed, source-led field atlas rather than a generic service page.

It contains:

- the arrival and editorial approach from 20 July;
- two distinct 22 July threads: insight decay, and courage/intuition;
- two distinct 23 July threads: content transmission, and transformation boundaries;
- the 24 July customer-contact / altered-state / release synthesis;
- the 25 July armour and portfolio-carrying-cost model;
- the 26 July receiving and stewardship model;
- the 27 July power-without-tension note and the sourced Unhooking the Mind practice guide;
- the 28 July identity/evidence model and Frank’s 04:16 Week One reflection;
- the 29 July state/distribution synthesis.

The public journal remains separate from the blog and now carries short first-person entries dated 22–29 July. The MVU entries hold the larger synthesis. The blog remains the destination only for work that later earns evergreen treatment.

## Experience contract

- Recipient: a founder, creator, fellow participant, or reader who wants a trustworthy record of the week.
- Job: find a real note, understand where it came from, and follow it into one usable model or practice.
- Primary action: read the Week One reflection, then browse the dated atlas.
- Signature proof: Frank’s exact 04:16 note beside a visible three-layer provenance model.
- Intended feeling: a real notebook engineered into an atlas, not a generic event-service pitch.

Selected direction: `directions/01-field-atlas.md`.

## Routed content map

| Date | MVU field atlas | Journal |
|---|---|---|
| 20 Jul | Why I came to Tallinn; Day one | — |
| 22 Jul | The cost of an insight you never live; Courage Makes Intuition Testable | Confidence is lagging evidence |
| 23 Jul | What makes content travel; Boundary Conditions Make Transformation Trustworthy | Interpretation should expand agency |
| 24 Jul | Contact With Reality Is the Curriculum | I may also have fallen asleep |
| 25 Jul | The Armour Taxes the Future | The armour taxes the future |
| 26 Jul | Receiving Is a Form of Responsibility | Receiving is responsibility; journal-vs-blog architecture note |
| 27 Jul | Power Without Tension; Unhooking the Mind practice guide | Power without tension |
| 28 Jul | Identity Precedes Evidence; Week One reflection | I will not hold myself small |
| 29 Jul | Confidence Must Enter the Market | Confidence must enter the market |

## Exact Frank quote ledger

These lines are safe to present as Frank’s recorded words or questions in this corpus:

- “I am amazed by myself and deeply grateful for myself.”
- “Usually I would hold myself small. Tonight I do not want to.”
- “I will not hold myself small.”
- “What am I here to receive, and what single proof am I here to give?”
- “What can I receive tonight without converting it into more work?”
- “I may have entered an altered state. I may also have fallen asleep.”
- “What deserves to become real next?”

These lines exist in Frank’s live notes but their original speaker attribution is unresolved:

- “You are stardust.”
- “Drop the suit that holds you and let it go.”

Do not convert an unresolved live-note line into a named speaker quote without an official recording, transcript, or direct confirmation.

## Frank-owned synthesis ledger

These are editorial models developed from the notes and should be attributed to Frank’s interpretation, not a speaker:

- Intuition proposes → courage tests → reality returns evidence → discernment governs.
- Courage → exposure → recovery → learning → capability → confidence.
- Confidence predicts from the past. Courage creates new evidence.
- A useful interpretation expands agency. An unsafe interpretation replaces it.
- Manual contact → repeated result → named pattern → documented ritual → peer contribution → assisted operation → automation.
- Autopilot is attention that has been converted into structure.
- Earlier threat → protective strategy → repeated identity → hidden carrying cost → present test → explicit boundary → recovered capacity.
- Every possible future has a carrying cost.
- Vision → permission to receive → resource → stewardship → capability → distributed contribution → regenerative return.
- Notice → release unnecessary effort → choose deliberately → observe → continue or stop.
- Identity precedes evidence. Evidence stabilizes identity.
- Regulate → rehearse → ship → distribute → observe → improve → repeat.
- Vibe OS and Signature Soundtrack Sprint as applications of the 29 July synthesis.

## Speaker attribution ledger

| Date | Speaker/source | Publication rule |
|---|---|---|
| 22 Jul | Jimmy Naraine | Confidence/exposure ideas are live-note paraphrases; coin-flip amounts excluded. |
| 22 Jul | Jeffrey Allen | Listen/Act/Filter/Follow-Pivot/Shine is paraphrased; energy exercises remain subjective practices. |
| 23 Jul | Chiara King | Existing session entry states that it is Frank’s interpretation, not a transcript. |
| 23 Jul | Brent Bruning | Name corrected from raw transcription; hand-analysis claims remain practitioner claims, not diagnosis. |
| 23 Jul | Dawn Hoang | Practice category may be described; no blockage diagnosis or autonomous high-intensity protocol. |
| 24 Jul | Skip Kelly | Customer-contact and business-design ideas are paraphrased; exact revenue, launch, price, and buyer figures excluded. |
| 24 Jul | Jade Shaw | Practice stages are paraphrased; no scientific certainty about astral travel; Socrates/Plato claim excluded. |
| 24 Jul | Lorin Krenn | Loss/release ideas are paraphrased; “loss is an illusion” is not approved as a definitive quote. |
| 25 Jul | Unresolved | Preserve the live-note language without naming a speaker. |
| 26 Jul | Regan Hillyer | Receiving/sovereignty ideas are paraphrased; money-as-electricity remains a metaphor. |
| 27 Jul | Dan Brulé | Awareness/relaxation/conscious breathing is paraphrased; not medical advice. |
| 28 Jul | Multiple sessions | Identity, wealth-blueprint, and visualization threads are intentionally presented as a blend. |
| 29 Jul | Paul McKenna | State and recovery-rehearsal ideas are paraphrased. |
| 29 Jul | Maria Wendt | Distribution/direct-response ideas are paraphrased; unverified revenue anecdotes excluded. |

## Material intentionally excluded

- Private relationship details and private attendee stories.
- The bereavement story shared by a participant.
- Speaker likenesses, restricted slides, and person-specific psychological profiles.
- An unsupported fixed “30 percent energy” claim.
- Exact revenue, launch, buyer, price, and membership numbers without primary documentation.
- Historical claims connecting Socrates or Plato to deliberate out-of-body practice.
- Metaphysical claims presented as scientific conclusions.
- Hand-analysis or energy language presented as diagnosis.
- “Loss is an illusion” presented as a universal denial of real loss or grief.
- The image-derived phrase about sharing knowledge “to create impact and evolve” until the original image or source is verified.

## System architecture

### MVU

- Content directory: `content/mvu/`
- Loader: `lib/mvu.ts`
- Layers: `frank-note`, `field-intelligence`, `practice-guide`
- Shared presentation vocabulary: `lib/mvu-display.ts`
- Frontmatter can carry `pullQuote` and `recordedAt`.
- Same-day entries have deterministic ordering.
- JSON-LD is serialized through `lib/structured-data.ts`.

### Journal

- Content directory: `content/journal/`
- Loader: `lib/journal.ts`
- Public kinds: `daily`, `note`, `log`
- The journal remains a quick-note surface; researched evergreen work stays in `/blog`.

### Practice guide

- Route: `/mvu/unhooking-the-mind`
- Local tracker data remains in the browser.
- Persisted state is normalised and attachment scores are clamped.
- Delete removes local data without the save effect recreating it.
- Primary actions and exports emit privacy-safe analytics events.

## Review corrections included

- one shared provenance metadata map across hub and entry pages;
- correct collection labels for all three MVU layers;
- safe JSON-LD escaping;
- frontmatter-driven hero quote and capture time;
- accessible image-link label;
- explicit short-date formatter;
- design-token surfaces rather than bespoke near-black hexes;
- tracked field-atlas and practice-guide actions;
- normalised local tracker state and durable deletion;
- corrected practice-guide Open Graph date label.

## Release gate

Before merging PR #400:

1. GitHub CI, Web excellence, Starlight design contract, CodeRabbit, and Vercel must be green.
2. Inspect the protected Vercel preview for `/mvu`, `/journal`, one long-form field entry, and the Unhooking guide.
3. Verify desktop and a narrow mobile viewport.
4. Confirm the practice tracker can type, persist, export, start fresh, and delete.
5. Confirm the eight new journal entries and eight new field-intelligence entries are routed.
6. Confirm no private story or unresolved speaker line appears as named attribution.
7. Keep merge as a separate explicit action.

## Next editorial queue

- Resolve the 25 July speaker source before naming the release exercise.
- Verify the Lorin Krenn phrase and open-hand exercise against an official source before exact quotation.
- Locate and inspect the original Chiara King summary artifact before adding techniques beyond the existing public-safe synthesis.
- Verify the image-derived knowledge-sharing line before publication.
- Promote a field note into `/blog` only after it has implementation evidence and an evergreen search/usefulness case.
- Consider the Session Constellation direction only after enough attributed nodes exist to justify an accessible graph.
