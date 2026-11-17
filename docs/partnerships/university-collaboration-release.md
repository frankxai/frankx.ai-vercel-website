# University collaboration invitation: release record

Owner: Frank Riemer. Implementation: OpenAI Codex / ChatGPT Work Mode, 17 November 2026. Owning mission remains frankxai/agentic-ops#263; evidence remains the existing UvA audit, not a second tracker. User requested the post-meeting expansion and production release. This record describes the implementation; exact candidate, review and deployment receipts belong in its PR.

## Scope and preservation

Base: a19bdb8e250c9b3749e789e96a585a40a9d239fc, the released UvA presentation. New public entry: `/partnerships/universities`. Existing `/partnerships/proposal/uva-rec-impact` stays unlisted/noindex and retains the discussion context. Both use one experience implementation and pinned source contracts. Other partnership pages, global navigation, authentication, intake backend and marketing subscriptions are unchanged.

Existing live desktop and narrow layouts were inspected before visual implementation. Three directions compared: (1) an institutional research catalogue, useful for scanning but weak for live dialogue; (2) an animated agent observatory, visually memorable but liable to imply live execution; (3) an editorial research invitation with inspectable study designs and audience-specific next steps. Direction 3 selected: retain the original crew, quiet green palette and six-chapter presentation; replace the abstract chapter-four map with comparison conditions and evaluation criteria. No fabricated outcome plots, institutional logos or new character identities.

## Evidence and publication boundaries

The canonical technical audit README was re-read from its existing branch. Its source/interface evidence is retained; it does not establish deployment performance or scientific findings. Enterprise cases are unchanged. Unverified engagement totals, customer cases and programme ownership remain withheld.

The official REC Impact programme was inspected at https://recimpact.uva.nl/voor-partners/word-onderdeel-van-onze-community/word-impact-fellow on 17 November 2026. It describes professional fellows, experiments and joint student projects. Frank reports a positive conversation about this route. Participation, appointment, research arrangements, funding and an agreement are not confirmed. The ambiguous dictated reference to “Roland” is excluded because no identity was established. Public page omits the personal meeting recap; the unlisted page identifies it as Frank’s account.

Primary research foundations: Dell’Acqua et al., Organization Science (2026), DOI 10.1287/orsc.2025.20702; METR’s July 2025 developer study and February 2026 measurement update. The study designs on this page are proposals, not findings, preregistrations or approved university protocols. Founder self-study is explicitly non-representative. An academic lead must determine protocol, sample size, ethics and analysis before a research claim.

## Function and recovery

Four audience paths set the form’s role; three challenge choices are carried into the inquiry. The form uses the existing `/api/intake` validation, honeypot, rate limits and provider-backed delivery semantics. It collects name, email, optional organisation, requested format and message with explicit storage-to-respond consent. No marketing subscription, attachments, student records or analytics events containing personal data are added. Existing site analytics still apply; source attribution is the route pathname. Validation, failure and delayed-response messages preserve the draft. No new backend, CRM or scheduler.

Closing the presentation preserves page selections. Refresh loses unsent form text; nothing is stored in localStorage. Direct email is visible as a fallback. The print brief summarises research, pilot, roles and proposed fellowship. Native fullscreen is progressive enhancement; a window-filling keyboard-operable modal is the fallback. Reduced-motion CSS disables the optional transitions/spinner animation. Academic assessment and participation are not promised by this inquiry flow.

## Release acceptance

Run TypeScript, lint, local copy/editorial audits, both scoped test files against rendered HTML, route/auth regression checks and invalid/honeypot intake probes without sending an email. Inspect desktop and narrow layouts, research/challenge selectors, all audience paths, keyboard presentation, form validation/failure and direct contact links. A real external inquiry must not be sent merely to test delivery. Provider delivery remains inherited from the existing service and is not established by an invalid-input probe.

Require a complete Vercel preview build, exact-head different-provider review, required CI checks, and production alias/source verification after the authorized merge. Record full outcomes in the PR; do not treat this checklist as evidence that they have run.
