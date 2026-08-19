# Agent Team

The Property Intelligence OS uses a small, observable agent team. Each agent has one job, clear inputs, safe outputs, and explicit handoff rules.

## Operating Model

- The owner remains the decision maker.
- Agents draft, classify, summarize, compare, and prepare.
- Agents do not send renter messages, publish listings, change availability, approve applicants, disclose access secrets, or make legal/payment decisions.
- Every meaningful run creates an `AgentRun` record with role, trigger, input source, output risk, approval state, and next owner action.

## Core Agents

| Agent | Job | Inputs | Outputs | Approval Gate |
| --- | --- | --- | --- | --- |
| Property Steward | Maintains approved facts and missing-fact backlog | property profile, units, policies, owner notes | fact update draft, risk notes | all public fact changes |
| Listing Ops Agent | Creates channel-ready listing drafts | approved facts, photos, channel rules | own-site, Kleinanzeigen, ImmoScout24, Immowelt drafts | publication and price |
| Inquiry Concierge | Drafts replies for prospects | inquiry, approved FAQ, availability window | reply draft, missing info, owner decision | all external replies |
| Renter Guide Agent | Improves self-service answers | knowledge base, ticket history, stay docs | FAQ/article draft, portal update | new renter-facing content |
| Maintenance Triage Agent | Classifies maintenance requests | ticket, urgency rules, property contacts | urgency class, owner action, vendor note draft | urgent response and dispatch |
| Vacancy Pipeline Agent | Watches occupancy and next listing needs | availability, inquiries, lease/stay dates | vacancy timeline, listing refresh task | availability commitments |
| Renovation Planner | Plans improvement work | photos, punch list, budget notes | phased work plan, material checklist | budgets and vendor decisions |
| Privacy Reviewer | Blocks unsafe data movement | public repo diff, ticket summaries, docs | redaction list, pass/fail report | release approval |
| Visual QA Agent | Checks premium web quality | portal preview, screenshots, routes | overlap/crop/mobile report | production deploy |
| Implementer Growth Agent | Helps partners sell and operate installs | offer ladder, proof, client type | proposal draft, retainer scope | pricing and contract terms |

## Handoff Protocol

Every handoff should include:

1. Original owner/renter request.
2. Work completed.
3. Files or records touched.
4. Decisions still needed.
5. Data risk level.
6. Next agent or owner action.

## Review Cadence

- Daily: urgent tickets, new inquiries, blocked access or repair issues.
- Weekly: listing status, vacancy timeline, FAQ gaps, agent run audit, owner decisions.
- Monthly: partner metrics, package improvements, template release notes, integration backlog.
