# PatternOS evidence, field, transfer, and rights standard

Version: `0.1.0`  
Applies to: every PatternOS pattern, drill, assessment, protocol, claim, and public projection.

## The passport

Every publishable object carries four independent fields:

`E{0–4} · F{0–4} · T{0–3} · R-{status}`

Do not calculate a composite score. A research-supported construct can still be untested in our field (`E3/F0`), and a useful internal practice can still lack general evidence (`E1/F3`). Rights never become permissive because the other grades are high.

### E — external evidence

| Grade | Meaning | Permitted language |
|---|---|---|
| E0 | unsourced idea, intuition, or unverified claim | “hypothesis,” “question,” “unverified” |
| E1 | practitioner account, case, expert description, correlational signal, or early/non-peer-reviewed work | “suggests,” “practitioners report,” “candidate pattern” |
| E2 | one relevant peer-reviewed study, research-aligned synthesis, or multiple coherent but limited studies | “has evidence in…,” with sample/context limits |
| E3 | systematic review, meta-analysis, replicated program, validated construct, or recognized standard | “is supported across…,” with heterogeneity and boundary conditions |
| E4 | convergent high-quality syntheses or standards across methods and populations, with material counterevidence addressed | “strong convergent evidence,” never “universally proven” |

E grades assess the exact atomic claim, not the reputation of an author or outlet. A source may support one narrow claim and not the surrounding method.

### F — field validation

| Grade | Meaning | Minimum record |
|---|---|---|
| F0 | no PatternOS field use | proposed context and metric |
| F1 | one observed use or anecdotal result | dated observation and caveat |
| F2 | repeated use in one context without a credible comparison | protocol version, repeated observations, failure notes |
| F3 | instrumented use across multiple teams, cohorts, or comparable contexts | predeclared metrics, exceptions, outcome distribution |
| F4 | longitudinal or comparative validation with sustained outcomes and documented adverse cases | dataset lineage, counterfactual/comparison logic, independent review |

Field grade is not customer count. Repeated uncontrolled testimonials do not become F4.

### T — transfer validation

| Grade | Meaning | Test |
|---|---|---|
| T0 | transfer not tested | no claim outside the original setting |
| T1 | tested in a closely similar task or population | same mechanism, small context change |
| T2 | tested across adjacent domains or materially different teams | invariant holds; surface procedure may change |
| T3 | tested across dissimilar domains, including at least one human–AI workflow, with boundaries documented | mechanism, exceptions, and recovery reproduce |

Transfer claims attach to a specific pattern and outcome. A high T grade for one outcome does not migrate to every outcome.

### R — rights status

| Status | Meaning | Default action |
|---|---|---|
| R-GREEN | the intended use is original, licensed, public-domain, or limited to a lawful link/official embed/short attributed paraphrase | publish only within the recorded `rightsScope` |
| R-RESTRICTED | access is lawful but reproduction or transformation is limited | keep metadata and original commentary; link to the source |
| R-PERMISSION | proposed reproduction, excerpt, image, transcript, or adaptation needs permission | do not publish the asset until permission is recorded |
| R-PROHIBITED | use is disallowed, unsafe, or incompatible with the license | exclude from the projection |

`R-GREEN` is scoped, not blanket clearance. A YouTube record marked green for `link + official embed + short attributed paraphrase` does not authorize transcript ingestion, thumbnail copying, clip production, or exercise reproduction.

## Claim ledger rule

For every consequential public claim, record:

- a stable claim or pattern ID;
- the smallest defensible statement;
- source IDs and exact claim location where available;
- population, task, comparison, and outcome;
- important moderators and counterclaims;
- E/F/T/R passport;
- last-reviewed date and next falsifying test.

Prefer original papers, standards, and systematic reviews. Books are valuable for coherent models and practice design, but their empirical claims must resolve to primary or synthesis research where possible.

“Where available” never means “optional without consequence.” Every evidence reference records a typed claim-locator state. `verified` requires an exact page, chapter, section, table, figure, or abstract location; `hold` requires a null locator and a reason and blocks publication. Do not reconstruct a page number from memory, a search snippet, or a different edition.

Book records separate the work’s first-publication year from the year and format of the exact ISBN edition. Publisher metadata that cannot be matched to that ISBN is retained as a visible `hold`. Practitioner-video identity comes from YouTube platform metadata and records the exact title, channel, video ID, canonical URL, and verification date.

## Practitioner-source rule

Practitioner videos and talks are a separate source class. They may contribute:

- memorable language;
- candidate mechanisms;
- drills to test;
- examples and edge cases;
- editorial framing.

They may not act as the sole evidence anchor for a scientific, causal, diagnostic, or universal claim. Tony Robbins's “recognize, use, create patterns” framing is recorded as a useful practitioner hypothesis, not a validated ranking of the most important human skill. The same rule applies to charisma, communication, grit, speaking, creativity, leadership, sales, and productivity creators.

## Research-to-practice translation

Use four layers and label each one:

1. **Finding** — what the source directly supports.
2. **Synthesis** — how multiple findings relate; identify inference explicitly.
3. **Pattern** — the proposed invariant and its boundary conditions.
4. **Protocol** — the operational procedure to test in a named context.

Never backfill evidence from a successful protocol to every claim in the synthesis. Never treat a plausible mechanism as a measured mechanism.

## Weak-claim blacklist

Do not publish the following as settled facts:

- grit is the dominant predictor of success;
- expertise is guaranteed by 10,000 hours of practice;
- growth mindset interventions reliably transform all learners;
- 93% of communication is nonverbal;
- power poses create durable confidence or hormonal change;
- microexpressions reliably reveal deception;
- learning-style matching improves learning;
- MBTI predicts role fit or team performance;
- open group brainstorming is inherently superior to independent generation;
- expert pattern recognition is trustworthy outside environments with valid cues and feedback;
- NLP eye cues diagnose thought or deception;
- design thinking guarantees innovation;
- psychological safety means comfort, consensus, or low standards;
- generative AI automatically increases collective creativity;
- last-click attribution proves funnel causality.

These topics may be covered only as contested or bounded claims with direct sources.

## Evidence-aware pattern review

Before activation, a reviewer must answer:

1. What precise behavior and outcome does this pattern predict?
2. Which source supports that exact link?
3. What alternative explanation remains live?
4. Where would this pattern likely fail?
5. What harm follows if the user overgeneralizes it?
6. What observation could lower its grade or deprecate it?
7. Does every proposed source use fit its recorded rights scope?
8. Are curator and independent-review receipts named and approved rather than merely implied by a commit author?

## Revision policy

- Review E3/E4 anchors at least annually; review rapidly changing AI findings at least quarterly.
- Record negative and null observations, not only successes.
- Downgrade claims when replication, scope, or source quality weakens.
- Deprecate rather than silently rewrite patterns whose invariant changed.
- Preserve version history and supersession links.
- Treat personal, team, and customer observations as consented, minimized data; do not turn the PatternOS into behavioral surveillance.
