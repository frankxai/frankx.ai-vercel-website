# Page Spec

Page: Family Intelligence System public category and product page
Route: `/family-intelligence-system` with German sibling `/familien-intelligenz-system`
Brand: FrankX
Audience: Family stewards, technically capable relatives, archivists, and families worried about lost knowledge or continuity
Primary task: Understand the category and make one useful privacy-scope decision
Primary action: Use the local privacy planner

## Outcome

The visitor understands that this is not another family-tree app, sees the claims/evidence/consent/steward/scope mechanism, receives a conservative privacy recommendation without signup, and can download an open starter kit.

## First Read

What is this: Privacy-first infrastructure for family memory, evidence, coordination, and continuity.
Who is it for: Families that need durable knowledge without collapsing private and public contexts.
Why now: Elder knowledge disappears; consumer tools separate genealogy, vaults, coordination, and succession.
Why different: Claims, provenance, consent, human authority, and export are the product kernel.
What should the user do: Run the privacy planner.
Trust signal: The page states current maturity and fail-closed invariants instead of presenting an unfinished hosted product as complete.

## Content Architecture

1. Category claim: A family needs more than a tree.
2. Broken default: A tree stores conclusions without sufficient governance around living people.
3. Mechanism: Claim → evidence → consent → steward → scope.
4. Proof: Open systems and runtime repositories plus working policy code.
5. System explanation: Five deliberately separate rooms.
6. Transformation: A family can preserve knowledge and continuity without making private people public.
7. CTA: Privacy planner, then starter-kit download.

## Constraints

Dependencies: Existing Next.js, Tailwind, Lucide; no new package.
Performance: No hero image, video, WebGL, or network call; planner is a small client island.
Accessibility: Semantic headings, explicit labels, live result region, focus states, 44px targets, AA contrast.
Deployment: One Vercel preview after local gates; no production promotion in this work item.
Out of scope: Real intake, family authentication, family data, email provisioning, payment, public skill marketplace.

## Verification

Commands: `npm run family:privacy:check`; `npm run type-check`; scoped lint; content and route checks.
Screens: Desktop 1440px and mobile 390px for both public routes and German locked portal.
QA gates: Privacy scan, claims audit, keyboard, reduced motion, responsive layout, design evidence ≥26/30 before ship.

Release blocker: legacy `/familie/*` content must be protected by both server-side session checks and proxy defense in depth before the public system routes can merge.
