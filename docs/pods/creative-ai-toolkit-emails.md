# Creative AI Toolkit Onboarding Sequence

The refreshed onboarding sequence bridges Toolkit activation with the Realm narrative. Each message includes a single primary action and a Realm teaser in the footer.

## Day 0 - Instant Activation
- **Subject**: Welcome to the Creative AI Toolkit - your first 24-hour win
- **Goal**: Celebrate purchase, deliver quick start ritual, invite to set intent.
- **Key Moments**:
  1. Gratitude + reminder that the toolkit is born from the agent collective.
  2. Link to "First 60 Minutes" Notion board and playback of the orientation loom.
  3. Prompt to reply with current launch focus (feeds agent desk backlog).
  4. Realm teaser: "Inner Circle members get the weekly ritual labs - join the waitlist." (link: https://frankx.ai/realm)
- **CTA**: `Access the First 60 Minutes Playbook`

## Day 3 - Momentum Calibration
- **Subject**: Day 3 Systems Check - lock in your automation loop
- **Goal**: Drive usage of automation templates and set expectation for Realm live labs.
- **Key Moments**:
  1. Share a 3-step walkthrough: Brief -> Generate -> Ship with embedded automation GIF.
  2. Highlight Marcus case study metric (+38% open rate) with link to `/resources` prompt stack.
  3. Invite to submit first workflow to the Agent Desk using the Typeform (https://frankx.typeform.com/agentdesk).
  4. Realm teaser: "We troubleshoot these together in the live lab." (link: https://frankx.ai/realm)
- **CTA**: `Send your workflow for an Agent Desk review`

## Day 7 - Expansion & Realm Bridge
- **Subject**: Your 7-Day Upgrade - expand into the Realm
- **Goal**: Showcase compounding wins, introduce upsell (Agentic Creator OS) and Realm membership.
- **Key Moments**:
  1. Summarize key wins (time saved, rituals installed) and invite testimonial reply.
  2. Introduce Agentic Creator OS as the next stage (link: /products/agentic-creator-os) with bundle mention.
  3. Realm invitation: share calendar for upcoming Inner Circle lab + waitlist CTA.
  4. Outline what happens post-waitlist (vault access, Creation Chronicles premium chapters).
- **CTA**: `Reserve your spot in the Realm`

## Automation Notes
- Sequence triggered via Gumroad purchase webhook -> ConvertKit automation.
- Tagging: `customer:creative-ai-toolkit`, `interest:realm-waitlist-intent` when Realm link clicked.
- Track with `trackEvent` names: `onboarding_day0_sent`, `onboarding_day3_engaged`, `onboarding_day7_realm_cta` for analytics dashboards.

