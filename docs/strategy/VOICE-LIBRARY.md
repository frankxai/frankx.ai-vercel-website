# FrankX voice library

**Status:** working library, 5 November 2026. Subordinate to `taste.md`, `design.md` and `CREATOR.md` (the pinned brand-pack copy contract). Where this file and those disagree, they win and this file gets corrected. It replaces `CONTENT_VOICE_DNA.md` (February 2026) as the source for lexicon and exemplars; the older file stays as a rhythm reference only, because it recommends fragment slogans and income hooks the newer contracts ban.

Source audit: [`v4-overhaul-2026-11/audits/04-voice-and-slop.md`](v4-overhaul-2026-11/audits/04-voice-and-slop.md).

---

## Principles

1. **Observation before mechanism.** Say what Frank saw or made, then what it is called.
2. **One claim, one proof.** The anchor sits in the same sentence or the next.
3. **Say the cost.** Name the price, the time, the failure and the step still done by hand.
4. **The reader decides.** Offer a test, a boundary and a next step. Never a verdict the reader cannot check.
5. **Dry humour.** Only when it is an observation.
6. **Plain labels.** Sentence case, no coined nouns, no all-caps taxonomy.
7. **Sources visible, forecasts attributed, income never promised.**
8. **Inclusive by default.** Describe the work, not the worker. No "guys", no hustle or warrior metaphors, no scarcity.

Four tests from the brand pack, run on every line: Would a stranger's name fit this sentence? Can the reader check it? Does it name a cost or a limit? Is there one next step?

## Lexicon

| Avoid | Use instead | Why |
|---|---|---|
| sovereign (systems, architecture, creator) | owned, self-hosted, in your repository, or the specific control | unearned superlative |
| arsenal, intelligence stack | the tools I use | invented label |
| unlock, unleash, empower, elevate, supercharge | the verb for what happens: draft, cut, ship, test, find | filler verb |
| leverage | reuse, delegate, multiply (with evidence) | banned in `lib/voice/frankx-voice.ts` |
| transform, transformation | name the change, from X to Y, with a number | needs a measurable object |
| ecosystem (as a noun on its own) | the list of products, with links | taxonomy |
| landscape | the comparison or the map, named | `taste.md` refusal |
| seamless, effortless, robust | what it does when it fails | unprovable |
| battle-tested, production-grade, world-class | "I run it on [site]", "it passed [check]" | unearned |
| Explore, Discover, Learn more (as CTAs) | Read, Compare, Try, Inspect, Open [name] | vague action |
| journey, awakening | the practice or the steps | guru register |
| "X, not Y" headings | state the positive thing | contrast formula |
| our experts, our team (when it is Frank) | I, Frank | honest narrator |
| Absolutely, Certainly | Yes. | chatbot tell |
| em dash | full stop, comma or colon | estate standard |
| Title Case Labels | Sentence case labels | `CREATOR.md` |
| undated counts (12,000 songs, 110+ designs, 99 agents) | the number, its source file, "as of [date]" | metrics truth rule |
| "built the AI CoE", "Oracle co-architect" | "helped architect", "contributed to" | ownership verbs |

## Exemplar lines

Lines marked *existing* already ship in the repository. Slots in [brackets] need a fact before use.

**Hero**
1. "Research you can check. From the systems I build." (*existing*, /research, wave 1)
2. "Find the constraint. Then make the next move count." (*existing*, /founder-stack)
3. "Inside the build." (*existing*, /blog)
4. "We install operating systems into businesses we believe in." (*existing*, /foundry)

**Section head**
5. "Investigations with their evidence attached" (*existing*, /research)
6. "Monday plan, ten minutes. Friday review, fifteen." (*existing*, /foundry)
7. "Which messages should a founder dictate first?" (*existing*, blog)

**Action**
8. "Read the investigations"
9. "Map my Founder Stack"
10. "Open the v0 prototypes"
11. "Copy the install command"

**Card**
12. "Ten private questions identify the current constraint across State, Signal, Systems, Scale and Stewardship." (*existing*, /start)
13. "Which model should handle which task. Harness measurements each trace to a public JSON receipt." (*existing*, /research)
14. "[Tool]. I use it for [job]. [Affiliate link / no affiliate]."

**Research abstract**
15. "Question: [question]. Sources read: [N], dated [range]. Finding: [one sentence]. Limit: [what this does not show]."
16. "Model specifications come from linked provider documentation. First-party experiments are published separately in Model Arena." (*existing*)

**Article intro**
17. "I use [tool] every day, mostly to [job]. This post gives you a [N]-day test so you can find out whether it earns a place in your week."
18. "[Source] said [claim] on [date]. Here is what shipped, what the claim still needs, and what I would build now either way."

**Email**
19. Subject: "[Specific thing] and what broke." Opening: "This week I [did X]. It [result]. Below is the step I still do by hand."
20. "Reply with one sentence about the step you repeat most. I read every reply."

## Audience registers

Shared rules: sentence case; no income promises; no urgency without a reason; one next step per message.

### Solo founders running agent fleets
- **Reader:** carries the risk and the consequential calls; has agents doing real work; wants to stop being the approval layer.
- **Tone:** peer to peer, terse, numbers and failure modes.
- **Lead with:** the handoff that failed, the cost cap, the permission boundary, the human review point.
- **Keep:** runs, checks, cap, review, permission, receipt. **Avoid:** swarm, army, autonomous (unless the page defines the limits).
- **Sample:** "One agent pipeline did [task] in [time] for [cost]. The check that caught its mistake was [check]. I still review [step] by hand."

### Women building with AI
- **Evidence in the repository:** none specific. Interview five builders, with permission to quote, before any page claims to speak for this reader.
- **Tone:** concrete and unhurried; assumes expertise; never "even you can"; no rescue or empowerment framing; no gendered metaphors for tools or work.
- **Lead with:** the workflow she already runs, what she keeps control of, what she owns when the tool changes.
- **Avoid:** empower, glass ceiling, hustle, boss-babe, grind, warrior, "no tech skills needed".
- **Sample:** "Bring one workflow you already run. We will find the single step worth handing to an agent, and the step you keep."

### Creators with large audiences
- **Reader:** has distribution and cadence; their voice is at risk of averaging out.
- **Tone:** practical and craft-first; honest about volume.
- **Lead with:** a voice test, an editing workflow, a rule for what the model never writes.
- **Avoid:** viral, hack, 10x, "content engine" without a definition, fake scarcity.
- **Sample:** "Take your last post. Swap in a stranger's name. If it still works, the model wrote the voice. Here is the three-step edit I use."

## How agents use this file

1. Read this file after `CREATOR.md` and before writing any public line.
2. Run `pnpm run ai-slop:audit:strict`. It checks 24 phrases today; the lexicon above is the target list for the next version of `scripts/audit-ai-slop.mjs` (warn rules first: em dash, "Explore" CTAs, contrast-formula headings, title-case headings, hyphenated variants).
3. A line with a number cites its file. A line about Frank uses the ownership verbs.
4. Never change homepage copy through this file; the homepage has its own contract.
