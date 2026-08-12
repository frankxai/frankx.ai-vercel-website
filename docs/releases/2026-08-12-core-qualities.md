# Core Qualities release record

## Experience thesis

For ambitious creators, founders, and AI builders trying to ensure that leverage produces a life worth living, this experience turns Freedom, Mastery, Meaning, and Connection into a usable decision compass. It invites people to map their own governing qualities, then makes the FrankX system inspectable through a traceable trail of research, articles, and books grounded in lived origin stories. The intended feeling is recognition, expansion, and responsibility for what we choose to build.

## Direction decision

Three directions were developed before implementation:

1. **The Builder's Constitution — selected.** A real Frank portrait opens an editorial story rooted in learning craft beside his father. Four asymmetrical chapters make Freedom the designed open space, Mastery the tolerances that make the work stand, Meaning the load path and plan, and Connection the joinery. One desktop scroll scene assembles the frame; reduced motion presents the finished structure; mobile uses discrete vertical states.
2. **The Living Root System — not selected.** A botanical specimen grows from inheritance to practice and a four-part bloom. It was emotionally resonant, but risked recoding FrankX as a spiritual-wellness brand and weakening the AI Architect position.
3. **The Proof Ledger — not selected.** A dark field manual organizes each quality by definition, origin, decision rule, shadow, evidence, and open question. Its evidence discipline was adopted, but the total direction felt documentary before it felt human.

Direction 1 was independently approved because its metaphor is earned by Frank's biography and native to the brand. It makes the qualities structural constraints rather than flattering traits.

## Governing system

| Quality | Structural role | Decision constraint | Productive tension |
| --- | --- | --- | --- |
| Freedom | Direction / open space | Does this increase agency over time, place, attention, and direction? | Freedom without responsibility becomes escape. |
| Mastery | Method / tolerances | Does this deepen a capability that survives changing tools and titles? | Mastery without freedom becomes servitude to the standard. |
| Meaning | Compass / load path | Is this a problem worthy of our limited life and attention? | Meaning without action becomes abstraction. |
| Connection | Multiplier / joinery | Does this improve the relation and what becomes possible through it? | Connection without boundaries becomes self-erasure or consensus. |

## Evidence model

- `lib/qualities.ts` is the typed source of truth for the four qualities and every relationship.
- `/qualities` is the governing overview; `/qualities/[slug]` provides one focused page per quality.
- Every evidence link carries an editorial sentence explaining why the research, article, or book chapter belongs.
- `/research/core-qualities-and-human-drives` separates Frank's autobiographical claims from general evidence on autonomy, expertise, meaning, belonging, and collective intelligence.
- Related-quality blocks are derived from the same registry on blog articles and book chapters.
- The four-question field sheet stays in the browser and is not a newsletter gate.

## Visual system

- The first viewport pairs live editorial type with a verified Frank photograph.
- Supporting imagery is project-bound editorial art generated for Freedom, Mastery, Meaning, and Connection; no generated father or fabricated childhood scene is used.
- Obsidian and charcoal carry the interface. Emerald and cyan behave as technical light. Warm tungsten remains inside craft photography.
- Poppins carries architectural display, Inter carries reading, JetBrains Mono labels evidence, and Playfair Italic is reserved for the inherited-craft line.
- Motion has one job: show how four constraints assemble usable freedom. It uses transforms and opacity only and honors reduced motion.

## Verification and release

Local gates before publication:

- Core-qualities contract tests: 7/7 passing.
- TypeScript: passing.
- Scoped ESLint: passing.
- Strict AI-slop and marketing-claims audits: passing.
- MDX safety, content integrity, and publication-hold checks: passing.
- Internal-link audit: passing.
- Production build and post-build artifact tests: passing.
- Runtime route probes: `/qualities`, all four detail pages, and `/research` returned rendered HTML.

The pre-release production commit is `6b41af359559`. If the merged release fails a production gate, restore that commit through a GitHub revert so Vercel's native Git integration produces an auditable rollback deployment.
