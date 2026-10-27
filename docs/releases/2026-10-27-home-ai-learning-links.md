# Homepage AI learning links

Status: implementation candidate; not a production release.
Owner: FrankX product owner. Related outcome: issue #706.
Base: `77302246727efea1ec5d5229f13d37852340bdc1`.
Change class: additive enhancement, not a section replacement.

## Reader outcome

A reader can enter the existing ChatGPT, Claude and Gemini learning paths, or the xAI research collection, directly from the homepage. The Grok destination is labelled Research; it is not presented as an existing Grok course. Its provider anchor avoids binding homepage navigation to a model version.

The addition is one compact navigation row after the existing authority bar. It adds no media requests, no animation, no third-party scripts, no new analytics collection and no new marketing claims. It disables speculative prefetch for these destinations. Existing headings, section order, calls to action and portfolio rooms remain intact.

## Preservation matrix

| Value | Existing evidence | Treatment | Review evidence |
|---|---|---|---|
| Identity and voice | Hero, authority bar, FRANK-Ω | Preserved | Existing component retained |
| AI architecture | Architecture showcase and field-guide CTA | Preserved; model entry routes added | No architecture section edits |
| Music and creative proof | Featured track, Music Lab, Design Lab | Preserved | No media or creative section edits |
| Products and tools | ProductsTools | Preserved | Existing offers untouched |
| Books, library, articles | Three existing sections | Preserved | Existing data and rendering untouched |
| Founder pathways | SignalRouteSelector | Preserved | No route-selector edits |
| Human Layer boundaries | Existing portfolio links | Preserved | No new personal or practice claims |
| Conversion and newsletter | Existing signup components | Preserved | No form or consent changes |
| Accessibility and motion | Existing heading and motion contracts | Four native anchors, visible focus, no new motion | Code review; rendered mobile pending |
| SEO and structured data | Existing homepage metadata/schema | Preserved; crawlable internal links added | Destination source verification |

## Destination evidence

- `/learn/chatgpt-mastery`, `/learn/claude-mastery`, `/learn/gemini-mastery` resolve through `data/learning-paths.ts` and `app/learn/[slug]`.
- `/llm-hub#xai` resolves through `app/llm-hub/page.tsx`, the xAI organization in `data/model-registry.json`, and `ProviderCard`'s organization ID.
- No existing URL was renamed or deleted. No platform affiliation is implied. No official mascot or vendor logo is added.

## Existing work to reconcile

- #1064 owns the founder-story / miniature-studio candidate; this change does not duplicate it.
- #1096 introduces character references and holds new Echo scene placements for review. No new character placement here.
- #1067 and #1075 own offer state and paid fulfillment. This navigation change does not clear either release.
- #1097 owns count corrections. #1115 owns sitemap redirect exclusions.

## Acceptance and limits

The desktop production baseline was inspected in the browser on 27 October 2026. Mobile viewport controls were unavailable in that browser. A desktop baseline is not an inspection of this candidate. Record exact checks and independent review in the PR before readiness; do not infer production from a branch or preview.

The current brand pack, CREATOR.md, write-like-frankx voice/production references and humanizer were read. The additional `Starlight-Intelligence/starlight-agent-config/core/policies/human-writing-standard.v1.md` source returned 404, including repository discovery. Broad narrative rewrites are held. This bounded addition uses platform names and functional route labels only.

Rollback: revert the isolated commit. No state or migration recovery is required.
