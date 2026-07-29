# OpenAI Mastery Pillar — Page Spec

Date: 2026-07-29

## Decision

Build one OpenAI learning pillar inside the existing FrankX production repo and
on the main `frankx.ai` domain. Do not create a separate repository or
subdomain. The public architecture is:

- `/learn/openai` — canonical decision hub for Chat vs ChatGPT Work vs Codex.
- `/learn/chatgpt-mastery` — stable Chat learning URL, refreshed in place.
- `/learn/chatgpt-work-mastery` — new Work learning path.
- `/learn/codex-mastery` — stable Codex learning URL, refreshed in place.

The stable Chat and Codex URLs remain live until Search Console and backlink
data support a deliberate redirect migration.

## Audience and job

The primary commercial audience is founder-operators and small-business
operators. Secondary paths serve creators, researchers and analysts,
developers, and team or enablement leads.

The page must answer one question quickly:

> Should I use Chat, ChatGPT Work, or Codex for the outcome in front of me?

## Product promise

Chat helps people think through something. ChatGPT Work takes a substantial,
multi-step outcome to a reviewable deliverable. Codex exposes developer tools
and technical detail for software work.

Each route gives the visitor:

1. A correct product choice.
2. One bounded starter workflow.
3. A small, verified resource sequence.
4. A role-appropriate next step.

## Information architecture

1. Hero with the three-mode distinction and one dominant action.
2. Interactive role selector with a recommended primary and supporting mode.
3. Three-mode operating table with boundaries and starter workflows.
4. Current desktop changes and freshness ledger.
5. Role paths for founders/operators, creators, researchers/analysts,
   developers, and teams/admins.
6. Curated official resources and active GitHub repositories.
7. Conversion section: workflow guidance for operators and a Codex starter
   route for developers.

## Content governance

Volatile product facts and external resources live in one structured registry.
Every record carries a verification date and lifecycle status. Work resources
support `upcoming` and `replay` so the July/August OpenAI Academy publication
sequence can be refreshed without rewriting the page.

Source ranking:

1. Current OpenAI documentation.
2. Current OpenAI Academy replay or resource.
3. Active official OpenAI GitHub repository.
4. Carefully selected ecosystem repository.
5. Third-party teaching only when the official layer has a real gap.

Never feature `openai/skills` as current; it is deprecated in favor of
`openai/plugins`.

## Persona rule

Roles are recommendations and analytics dimensions in the first release, not
five separate content trees. A role earns a dedicated route only when it has:

- distinct search intent;
- at least three unique workflows;
- proof or examples;
- a different conversion action.

Later commercial routes belong under `/solutions`, while evergreen tutorials
remain under `/guides`.

## Measurement

Track:

- OpenAI hub role selection;
- hub-to-mode clicks;
- starter workflow opens;
- official resource opens;
- operator and developer CTA clicks.

Thirty-day decision signals:

- at least 30% hub-to-mode selection;
- at least 8% qualified-visitor opt-in;
- at least three qualified commercial conversations or ten starter-kit sales.

## SEO and migration

- `/learn/openai` owns broad OpenAI desktop and Chat-vs-Work-vs-Codex intent.
- Existing Chat and Codex mastery URLs keep their current canonical identity.
- `/learn/chatgpt-work-mastery` owns Work-specific education.
- Guides own one outcome; blog articles own releases and commentary.
- No automatic redirects in this release. Audit Search Console, backlinks, and
  conversions before any route migration.

