# FrankX Blog Hero Reboot

**Status:** Active working doctrine — 2026-07-17
**Owner:** FrankX editorial + design team
**Scope:** Blog hero, Open Graph, social, carousel, thumbnail, and vertical visual production
**Does not authorize:** article-frontmatter changes, deployment, external publishing, or replacing the prior experimental batch.

## 1. The correction

The earlier hero brief treated a header as a dark technical background plate: a generic physical metaphor, a fixed emerald/cyan palette, prohibited human presence, and empty areas reserved for hypothetical titles. It produced decorative objects rather than editorial stories.

That approach is retired as a universal default.

A FrankX visual is not successful because it is cinematic, dark, or technically related to an article. It succeeds only when, at thumbnail size, a target reader can feel **why this article matters to them** and can name the situation, tension, or outcome it represents.

> **Working rule:** every hero must express a reader promise, not merely decorate a category.

## 2. Source-of-truth hierarchy

| Priority | Source | Role |
|---|---|---|
| 1 | `BRAND_IDENTITY.md` | Immutable identity, audience roots, canonical palette, and creator-first mission. |
| 2 | `lib/voice/frankx-voice.ts` | Voice and proof discipline: concrete, technically accurate, humble, never generic. |
| 3 | `taste.md` + `design.md` | Taste: scenes not statements, late-night studio intimacy, technical warmth, dark-first restraint, purposeful imagery. |
| 4 | This document | Active blog-hero and social-visual production contract. |
| 5 | `docs/blog-premium-image-upgrade-plan.md` and `docs/agy-blog-visual-phase2-handover.md` | Historic execution records. Their blanket no-person/object-metaphor prompt DNA is superseded for new work. |

## 3. What the reader is hiring the image to do

FrankX serves readers who want a credible route from AI possibility to better work.

| Reader | Their job-to-be-done | What the visual must signal |
|---|---|---|
| **Independent creator** | Make more meaningful work without losing taste or voice. | Agency, craft, a real studio life, and a tangible before/after. |
| **Founder / operator** | Turn scattered tools and hype into a dependable operating advantage. | Decision clarity, stakes, competent systems in use, and earned calm. |
| **AI architect / technical builder** | Evaluate patterns that are real enough to build and govern. | Evidence, structure, constraints, and the shape of a working system. |
| **Cultural / future-facing reader** | Understand why this moment matters and what kind of creator can emerge from it. | A sharp point of view, human consequence, and a memorable future-facing image. |

A header cannot address all four equally. The creative brief chooses one primary reader and one emotional response: **relief, resolve, ambition, curiosity, belonging, or intellectual confidence**.

## 4. The FrankX visual thesis

**FrankX is the inside of a serious creative studio after hours: human judgment, technical evidence, material craft, and a real future being made.**

That is not a mandate for black background or a studio prop. It is a standard for *consequence*:

- human judgment is visible when the article is about a decision, practice, or change in identity;
- systems are visible when the article teaches architecture, operations, comparisons, or implementation;
- craft is visible when the article concerns music, media, creative practice, or a maker's rhythm;
- the future is visible when the article makes a cultural or strategic argument.

The visual must make the article feel more specific, not make every article look like the same brand campaign.

## 5. Three controlled editorial territories

These are not interchangeable prompt styles. Each exists for a different audience need and has its own proof standard.

### A. Studio Documentary — *"I can see myself doing this"*

**Best for:** creator systems, music, image/video craft, daily practice, founder stories, human-first AI.
**Primary reader response:** possibility grounded in reality.

- Show a real-feeling person or the unmistakable trace of a person in a believable working environment.
- Favour a decisive moment: rehearsal before release, a maker revising, an operator choosing, a late-night studio becoming operational.
- Use cinematic light, lived materials, and a precise point of view. Avoid stock-photo smiles, generic laptop poses, and fashion imagery without narrative.
- Human figures are allowed when they carry the article's stakes. They are not a new compulsory default.

### B. Evidence in Context — *"This is concrete enough to trust"*

**Best for:** agent architectures, technical guides, model comparisons, research systems, automation, governance, tool routing.
**Primary reader response:** clarity and confidence.

- Lead with the actual subject where possible: a designed architecture map, a purposeful code or terminal detail, an instrumented workflow, a physical/digital workspace in use, or a precise editorial diagram.
- When type, labels, code, diagrams, or comparisons carry the meaning, use deterministic design—not model-generated pseudo-UI.
- The image should show a decision or mechanism, not a decorative "AI object."

### C. Editorial Point of View — *"This idea changes how I see the moment"*

**Best for:** essays, Golden Age / creator culture, intelligence, strategy, and future-facing pieces.
**Primary reader response:** tension, recognition, and shareability.

- Create a single memorable scene, portrait, or symbolic situation with a clear human consequence.
- Compose like a magazine cover: one dominant thought, bold hierarchy, controlled negative space, no pile of decorative components.
- Use colour by subject: tech spectrum for operational AI; warm craft spectrum for creative practice; a restrained conscious-purple spectrum only where the topic genuinely belongs to that world. Never use a palette as a substitute for a concept.

## 6. Article-to-art-direction selection model

Before any production, the editorial strategist completes this decision card.

| Field | Required answer |
|---|---|
| Reader and awareness state | Who is this for, and what do they already believe? |
| Article promise | What changes after reading? |
| Share hook | What would make someone send this to a peer? |
| One image-worthy sentence | A concrete sentence that could be true even without the title. |
| Visual subject | Person, place, real tool/system, diagram, object with a clear role, or scene. |
| Moment | What is happening—not merely what is present? |
| Territory | Studio Documentary, Evidence in Context, or Editorial Point of View. |
| Text posture | Image-only website plate, composed website cover, or title-led share card. |
| Exclusions | Specific clichés and misrepresentations to avoid for this article. |

### Selection rules

1. **If the article teaches an operational choice, show the choice or the system.** Do not replace it with a random object metaphor.
2. **If the article is about a creator's ambition or practice, show human consequence.** A human can be present; a staged stock-worker cannot.
3. **If the article's value is a comparison, framework, or numbers, make the comparison legible with deterministic composition.**
4. **If a concept cannot be expressed in a sentence without using abstract nouns, the brief is not ready.** Return to the article's actual claim.
5. **A generated image may be abstract only when abstraction is itself the article's point and survives the one-sentence story test.**

## 7. Typography is part of the asset—not an afterthought

The previous system confused "do not ask an image model to render text" with "do not show text." That was a category error.

| Output | Typography rule |
|---|---|
| **Blog detail hero** | The page H1 remains semantic HTML. Use an image-only hero only when the adjacent title gives the visual enough context; otherwise compose a deliberate cover. |
| **Blog index card** | The card title remains live HTML. The thumbnail must still have a recognizable subject, not empty safe space. |
| **Open Graph / LinkedIn / X** | Use a deterministic title-led composition: category, real headline, optional proof point, and restrained FrankX signature. |
| **4:5 and 9:16 social** | Type is mandatory unless the narrative image communicates the message unambiguously at feed speed. |
| **Infographic / comparison** | All labels, data, and charts are deterministic HTML/SVG/Canvas/Figma—not generated glyphs. |

No generative model is asked to spell the final headline. Exact typography is composed after the base scene using a production renderer. This gives real editorial hierarchy, accurate copy, accessible contrast, and reliable crops.

## 8. Asset family and production specification

Every approved concept produces a controlled family rather than one orphaned PNG.

| Asset | Purpose | Minimum delivery |
|---|---|---|
| Master scene | High-quality source frame | `16:9`; target `1920×1080` or larger. A `1280×720` image is a pilot, not a premium master. |
| Website hero | Reading experience | Responsive `16:9` crop, verified against actual article layout and adjacent H1. |
| OG social card | Click / share clarity | `1200×630`, deterministic title, category, and safe platform margins. |
| Feed portrait | Saves / discovery | `1080×1350`, re-composed rather than blindly cropped. |
| Vertical story / reel cover | Mobile attention | `1080×1920`, title and focal subject in the central safe region. |
| Optional explainer | Technical posts | Deterministic diagram or concise carousel that carries the framework. |

## 9. The creative team: seven lenses, one accountable decision

A high standard does not mean seven agents generating seven styles. It means seven specialist questions answered before a single production run.

| Role | Owns | Must reject |
|---|---|---|
| **Editorial strategist** | Reader, article promise, point of view, and story-worthy claim. | A visual disconnected from the article's argument. |
| **Audience / distribution strategist** | Thumbnail behaviour, social context, sharing reason, platform crop plan. | A beautiful image that says nothing in a feed. |
| **Creative director** | Territory selection, composition, narrative moment, cultural distinction. | Prompt-generated sameness or reference-site imitation. |
| **Visual designer** | Layout, palette posture, hierarchy, image–type relationship. | Empty safe zones and ornamental branding. |
| **Typography / information designer** | Exact headlines, diagrams, data, accessibility, deterministic composition. | Generated fake text, fake UI, or illegible claims. |
| **Production specialist** | Native image source, file quality, crops, provenance, renderer output. | Low-resolution pilots or missing source records. |
| **Independent QA reviewer** | Meaning, attraction, accuracy, mobile, and brand fit. | Approval by the person who authored the prompt alone. |

The creative director makes the final call after the independent QA verdict. No batch scales because generation succeeded; it scales only after the concept earns approval.

## 10. Production workflow

1. **Editorial intake** — Read the article, extract its reader promise and its image-worthy sentence.
2. **Audience decision** — Identify the primary reader and actual share context.
3. **Three-comp exploration** — Create conservative, strong-fit, and divergent art-direction boards *before* producing a full batch.
4. **Critique** — Score concept, not rendering polish. Kill decorative directions early.
5. **Source-frame production** — Generate or source only the chosen scene; use a native available generator for image bases.
6. **Deterministic composition** — Add title, labels, diagrams, and brand signature in a renderer or design tool.
7. **Derivative design** — Re-compose for 16:9, 1.91:1, 4:5, and 9:16. Do not merely crop a background plate.
8. **QA and provenance** — Record prompt/source, rendering method, title copy, dimensions, rights/origin, reviewer verdict, and intended article use.
9. **Controlled release** — Test the hero in actual blog and platform contexts before any scaled batch.
10. **Learning loop** — Track CTR, card click-through, social saves/shares, article entry source, and qualitative audience response. Retire directions that win no attention or comprehension.

## 11. Non-negotiable QA gates

An asset cannot be marked production-ready until it clears all gates.

| Gate | Pass condition |
|---|---|
| **Story test** | A reviewer can state the situation and reader benefit in one sentence without seeing the title. |
| **Three-second thumbnail test** | At `320px` wide, the focal subject and emotional posture remain clear. |
| **Title test** | On OG/social cards, the exact title is readable, accurate, and intentional. |
| **Article fidelity test** | The asset depicts the article's actual argument, not generic AI aesthetics. |
| **Distinctiveness test** | It cannot be swapped with another FrankX post without looking wrong. |
| **Human truth test** | If people appear, they carry a role and moment; no fake stock-worker performance. |
| **Technical truth test** | Systems, code, charts, interfaces, and claims are deterministic and accurate. |
| **Craft test** | No malformed type, artifacting, empty safe-zone dependency, obvious prompt clichés, or low-resolution master. |
| **Accessibility test** | Contrast, alt description, responsive crop, and reduced-motion fallback are verified. |
| **Independent review** | A non-author reviewer returns PASS, ITERATE, or REJECT with evidence. |

Any REJECT resets the brief; it does not trigger "generate another version of the same prompt."

## 12. Explicitly retired rules

The following are no longer universal FrankX hero rules:

- "No people" — replaced with: **use human presence only when it carries a truthful role, moment, or consequence.**
- "No text" — replaced with: **never rely on generated text; use deterministic typography when clarity or sharing requires it.**
- "One physical metaphor per article" — replaced with: **use the actual narrative subject; metaphors must earn their place.**
- "Dark safe zones by default" — replaced with: **compose image and type deliberately for the intended surface.**
- "Void + emerald/cyan for every topic" — replaced with: **choose the FrankX spectrum that expresses the article's emotional world.**
- "One 16:9 hero is the visual product" — replaced with: **one concept, deliberately designed derivatives.**

## 13. Immediate transition plan

1. Keep the 2026-07-17 twenty-header output classified as **exploratory / not approved for integration**.
2. Do not regenerate all twenty. Select three representative high-value articles from different territories.
3. Build three art-direction boards per selected article, then select one winning direction through the QA gates.
4. Produce title-composed OG and social derivatives beside the website hero—this is the proof of the new system.
5. Only after those pilots are reviewed in real crops may the team create a controlled batch.

## 14. Measures of success

This reboot is successful when a reader can answer all of the following without coaching:

- "What is this article about?"
- "Why should I care now?"
- "Does this feel like FrankX: creator-first, technically credible, and unusually well made?"
- "Would I share this with someone who needs it?"

If the answer to any question is no, the image is not a premium hero. It is decoration.
