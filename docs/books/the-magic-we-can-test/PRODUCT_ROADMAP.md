# Product and Publishing Roadmap

## Portfolio decision

Position *The Magic We Can Test* as the experiential flagship beneath *The Golden Age of Intelligence* and as Book Three of *The Wordless Laws*.

Recommended portfolio roles:

- *The Golden Age of Intelligence* — thesis and worldview.
- *The Wordless Laws I* — literary discovery.
- *The Wordless Laws II* — named forces and practices.
- *The Magic We Can Test* — 28-day lived experiment and AI companion.
- *Imagination* — focused cognitive/creative instrument.
- *Manifestation* — either revised into a concise field guide or progressively absorbed into this book to remove duplication.

## Website architecture

```text
/books
  /the-magic-we-can-test
    /01 ... /28          chapter + companion launch
    /lab                 experiment dashboard
    /evidence            public claims ledger
    /editions            changelog and evidence dates
    /cohort              guided program
    /facilitators        license and materials
```

The `/books` card should say:

> **The Magic We Can Test**  
> *28 Experiments in Reality, Imagination, and Intelligence*  
> A warm, evidence-aware journey through attention, gratitude, matter, energy, imagination, AI, and the quantum frontier. Every chapter becomes a personal experiment, an AI conversation, and a living artifact.

## Repository architecture

```text
content/books/the-magic-we-can-test/
  book.yaml
  chapter-01-the-first-astonishment.mdx
  ...
  chapter-28-send-the-magic-forward.mdx
  prompts/
  images/
  research/

data/books/the-magic-we-can-test/
  claims.json
  experiments.json
  editions.json

public/books/the-magic-we-can-test/
  qr/
  covers/
  plates/
```

Longer term, move book metadata out of the monolithic `books-registry.ts` into validated per-book manifests. Generate the registry, sitemap, structured data, PDF configuration, and `llms.txt` from those manifests.

## Production agents

Each agent owns a bounded output and cannot publish independently:

- **Series Architect:** prevents overlap across existing books.
- **Human Writer:** owns scenes, voice, rhythm, and emotional truth.
- **Research Lead:** finds primary sources and updates the claims ledger.
- **Skeptic:** challenges causal overreach and quantum mysticism.
- **Experiment Designer:** defines variables, confounds, measures, and stop conditions.
- **AI Companion Designer:** maintains model-agnostic prompts and privacy boundaries.
- **Visual Director:** canonical art, scientific plates, and reader image templates.
- **Book Engineer:** web/PDF/EPUB/print pipeline and QR integrity.
- **Cohort Steward:** consent, support, data minimization, and qualitative feedback.
- **Editor-in-Chief — Frank:** decides what is true enough, human enough, and useful enough to publish.

## 12-week build

### Weeks 1–2 — Founder prototype

- complete Experiments 1–7 personally;
- publish one private log daily;
- revise the chapter immediately after lived use;
- commission or generate seven canonical illustrations;
- build seven stable companion pages;
- verify QR links and mobile UX.

### Weeks 3–6 — Full manuscript v0.5

- draft Experiments 8–28;
- source every material scientific claim;
- implement claim badges;
- create experiment journal export;
- generate PDF/EPUB preview;
- conduct scientific and sensitivity review.

### Weeks 7–8 — Twelve-reader alpha

- onboard twelve deliberately varied participants;
- baseline and consent;
- run two facilitated sessions per week;
- collect failures and adverse experiences;
- publish internal alpha report.

### Weeks 9–10 — Revision and productization

- cut exercises that create emotion without action;
- simplify prompts with poor completion;
- finalize art direction;
- implement edition changelog;
- package companion and facilitator tiers.

### Weeks 11–12 — Paid public beta

- enroll first paid cohort;
- publish protocol and honest metrics;
- open print preorder only after completion and willingness-to-recommend thresholds are met;
- collect no testimonial without also asking what failed.

## Founder experiment for Frank

Daily commitment: 30 minutes maximum.

- 5 minutes reading;
- 10 minutes experiment;
- 5 minutes AI companion;
- 5 minutes artifact;
- 5 minutes evidence record.

Weekly proof:

- one public field note;
- one short video;
- one visual;
- one manuscript revision;
- one commercial invitation.

This prevents the book from becoming another private architecture project.

## First seven-person pilot

Before the twelve-reader alpha, run a smaller seven-person table:

- Frank — founder/operator;
- one practicing scientist;
- one skeptic;
- one spiritual practitioner;
- one creator;
- one executive or entrepreneur;
- one person new to AI.

Each person receives the same seven-day protocol. Differences become part of the book rather than noise to hide.

## Acceptance criteria for v1.0

- 28 complete chapters;
- 28 stable QR destinations;
- 28 AI prompts and 28 image prompts;
- all material claims in the ledger;
- no unmarked quantum-to-self-help metaphor;
- web, PDF, EPUB, and print parity;
- accessible diagrams and alt text;
- zero broken QR codes and internal links;
- explicit consent and deletion path for cohort data;
- published null results and limitations;
- one coherent paid offer attached to the book.

