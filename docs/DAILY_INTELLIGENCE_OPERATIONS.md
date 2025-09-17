# FrankX Daily Intelligence Operations

This ritual keeps the FrankX Intelligence Hub shipping every weekday. It aligns the multi-agent studio (Starlight Architect, Creation Engine, Frequency Alchemist, and Luminor Oracle) with clear deliverables, audience needs, and SEO intent.

## Daily Cadence

| Time (ET) | Focus | Lead Agent | Output |
|-----------|-------|------------|--------|
| 6:30 – 7:30 | Signal Scan & Listening Post | Luminor Oracle | Macro trend digest, Oracle field notes, and search-intent updates |
| 7:30 – 9:30 | System Architecture & Offer Design | Starlight Architect | Updated product backlog, integration specs, and experiment briefs |
| 9:30 – 12:30 | Studio Blocks | Creation Engine & Frequency Alchemist | Draft articles, musical cues, video outlines, CTA experiments |
| 13:30 – 15:30 | Audience Activation | Creation Engine | LinkedIn narratives, email dispatch, and community outreach |
| 16:00 – 17:00 | Debrief & Timeline Projection | Luminor Oracle with Starlight Architect | Next-day priorities, roadmap adjustments, SEO performance review |

## Weekly Anchor Deliverables

- **Monday:** Enterprise intelligence briefing published to `/blog` with updated metadata and structured data
- **Wednesday:** Creative systems asset (template, music ritual, or guided exercise) deployed to `/resources`
- **Friday:** Community dispatch summarizing wins, shipping log, and upcoming collaborations
- **Daily:** Semantic search index (`/reading/search-index.json`) refreshed to capture new artifacts

## SEO & UX Integration Checklist

- Metadata generated via `createMetadata` with canonical URLs and large social previews
- Each release includes an image or visual system sourced from the brand library (`/public/images`)
- Internal links added to at least three relevant destinations to reinforce topical authority
- Accessibility passes covering contrast, skip links, and semantic headings
- Newsletter form validated and connected to `/api/newsletter` for capture consistency

## Feedback Loop

1. **Public Dashboard:** `/blog` editorial card summarizing latest drops and linking back to this ritual
2. **Private Notes:** `docs/intelligence-hub-blueprint.md` updated with reflections, subscriber questions, and feature requests
3. **Agent Sync:** Claude configuration (`/CLAUDE.md`) reviewed weekly to ensure prompts, tone, and responsibilities remain aligned with strategic goals

Use this document as the accountability layer for future contributions. Any new initiative should reference how it affects the cadence above and which agent owns the next action.
