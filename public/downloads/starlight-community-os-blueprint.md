# Starlight Community OS

## A proposed vendor-neutral control plane for a creator community

**Status:** Reference architecture, not a shipped FrankX software product

**Version:** 2026-07-28

**Companion guide:** https://frankx.ai/guides/community-platform-for-creators

**Use case:** A creator with meaningful distribution who wants to launch quickly on a hosted
community platform while preserving a credible path to a differentiated web or native product.

This blueprint separates the community promise from the first vendor. Circle, Mighty Networks,
Kajabi, Whop, Slack, email, a branded app, or a future custom product can be execution surfaces.
Identity, consent, entitlements, relationships, outcomes, and decision policy remain stable behind
an owned boundary.

The core rule:

> Rent commodity community operations. Own the member promise, policy, measurement, and canonical
> data required to change vendors without changing the product's identity.

## 1. The four-layer architecture

```text
┌──────────────────────────────── EXECUTION SURFACES ────────────────────────────────┐
│ Circle · web · email · events · support · branded app · future custom product      │
└──────────────────────────────────────┬───────────────────────────────────────────────┘
                                       │ vendor adapters
┌──────────────────────────────────────▼───────────────────────────────────────────────┐
│ STABLE COMMUNITY GATEWAY                                                            │
│ Identity map · entitlement checks · commands · events · rate limits · idempotency   │
└──────────────────────────────────────┬───────────────────────────────────────────────┘
                                       │ governed tools
┌──────────────────────────────────────▼───────────────────────────────────────────────┐
│ GOVERNED INTELLIGENCE                                                               │
│ Read → reason → propose → human approval → act → audit → evaluate                  │
└──────────────────────────────────────┬───────────────────────────────────────────────┘
                                       │ canonical records
┌──────────────────────────────────────▼───────────────────────────────────────────────┐
│ OWNED DATA PLANE                                                                    │
│ Members · consent · entitlements · relationships · outcomes · events · audit log   │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

The execution surface can change. The other three layers should not have to.

## 2. What belongs in each layer

### Execution surfaces

Use vendors for the interaction systems they already operate well:

- community feed, groups, courses, events, chat, moderation, notifications, and payments;
- a shared or branded mobile app when mobile habit is proven;
- email, customer support, live video, and transactional messaging;
- one custom web or native journey only when it expresses a proven proprietary behavior.

Do not make every downstream system the source of truth for the same concept.

### Stable community gateway

Expose a small, vendor-neutral vocabulary to your applications and agents:

- `get_member`
- `resolve_member_identity`
- `list_member_entitlements`
- `list_recent_activity`
- `create_draft_post`
- `propose_member_message`
- `approve_command`
- `execute_approved_command`
- `record_outcome`
- `export_member_record`

The gateway translates these commands into Circle, Mighty, Kajabi, Whop, email, or custom-product
operations. Vendor-specific object IDs live in an identity map, not throughout the product.

### Governed intelligence

Agents may read broadly only within the requesting actor's permissions. Consequential writes cross
a human approval boundary until a specific automation has earned a narrower policy.

```text
Observe → Retrieve within permissions → Reason → Propose command
                                               ↓
                                       Human or policy gate
                                               ↓
                                Execute → Audit → Evaluate outcome
```

Examples of consequential writes:

- sending a direct message;
- publishing or editing a post;
- changing an entitlement;
- moderating, suspending, or deleting;
- moving a member between cohorts;
- changing payment or subscription state.

Every approved command should contain:

- actor;
- member or object target;
- tool and version;
- reason code;
- payload classification, hash, and the minimum structured diff needed for review;
- approver;
- idempotency key;
- execution result;
- timestamp;
- rollback or recovery reference.

Do not retain raw message bodies or personal data forever merely to make an audit record complete.
Keep the operational log append-only and tamper-evident, pseudonymize targets where feasible, place
any essential raw evidence in an encrypted short-retention store, and define how member deletion
anonymizes or severs the audit-to-member link without destroying the integrity of the event chain.

### Owned data plane

Keep only the canonical data needed for continuity, governance, and product learning. Avoid cloning
the vendor database without a reason.

Minimum entities:

```text
member
member_identity
consent_record
role_assignment
entitlement
community_relationship
member_outcome
activity_event
agent_command
approval_record
audit_event
vendor_object_map
```

Recommended durable identifiers:

- internal UUID for every member;
- external IDs for each vendor and payment processor;
- immutable event ID;
- explicit schema version;
- source system and source timestamp;
- consent purpose and lawful basis where applicable.

## 3. Canonical event contract

Normalize only events required for measurement or cross-system behavior.

```json
{
  "event_id": "evt_01...",
  "event_name": "member.first_value_reached",
  "event_version": 1,
  "occurred_at": "2026-07-28T18:42:00Z",
  "received_at": "2026-07-28T18:42:03Z",
  "member_id": "mem_01...",
  "source": "circle",
  "source_object_id": "123456",
  "community_id": "com_01...",
  "properties": {
    "journey": "founding_member_onboarding",
    "cohort": "pilot_01"
  },
  "consent_context": "community_operations"
}
```

Rules:

1. Never use email as the durable member key.
2. Preserve vendor timestamps and the time your system received the event.
3. Make ingestion idempotent.
4. Version events; do not silently repurpose fields.
5. Store only properties needed for a declared product, safety, or reporting purpose.
6. Do not send raw private-community content to analytics.
7. Keep replay and dead-letter paths for webhook failure.

## 4. Vendor adapter contract

Every adapter should implement the same operational envelope:

```ts
type CommunityAdapter = {
  capabilities(): Promise<CapabilityManifest>
  getMember(identity: ExternalIdentity): Promise<MemberSnapshot>
  listActivity(cursor?: string): Promise<ActivityPage>
  createDraft(command: DraftCommand): Promise<ExternalObject>
  execute(command: ApprovedCommand): Promise<ExecutionReceipt>
  exportMember(memberId: string): Promise<MemberExport>
  health(): Promise<AdapterHealth>
}
```

The capability manifest prevents an agent from assuming that every vendor can perform the same
write. Unsupported tools fail closed.

For each adapter, document:

- authentication and token owner;
- scopes;
- rate and usage limits;
- pagination;
- webhook signature and replay;
- object-ID mapping;
- data freshness;
- supported reads and writes;
- retry and idempotency behavior;
- export coverage;
- deprecation policy;
- recovery owner.

## 5. Reference implementation options

These are examples, not mandatory dependencies.

| Concern | Lean pilot | Durable scale path |
|---|---|---|
| Hosted surface | Circle Business | Circle Plus, another vendor, or custom surfaces |
| Web application | Next.js | Next.js with a documented gateway boundary |
| Native application | Defer | Expo / React Native after mobile behavior is proven |
| Canonical data | Managed Postgres | Postgres with tested backup, restore, and residency |
| Authentication | Vendor login for pilot | Owned identity with SSO and stable member IDs |
| Authorization | Explicit application policy | Relationship-based policy such as OpenFGA |
| Workflows | Narrow scheduled jobs | Durable jobs such as Trigger.dev or equivalent |
| Notifications | Vendor-native first | Channel orchestration such as Novu or equivalent |
| Support | Vendor tools or shared inbox | Integrated support such as Chatwoot or equivalent |
| Agent orchestration | One approval-gated workflow | Agents SDK or Mastra behind the gateway |
| Observability | Structured logs and alerts | Traces, evaluations, cost, and policy telemetry |
| Live media | Vendor-native | LiveKit or equivalent only when product-critical |
| Automation | Avoid a second source of truth | n8n or equivalent for bounded back-office flows |

Tool choice is secondary to boundary quality. A weak boundary implemented with fashionable tools
is still a weak architecture.

## 6. The 90-day build sequence

### Before day 1 — promise and policy

- Interview 12–20 intended members.
- Define one primary job and one weekly retention loop.
- Define prohibited AI actions and approval owners.
- Choose the canonical member identifier.
- Write the vendor exit checklist before signing.
- Set activation, retention, outcome, and economic thresholds.

Deliverables:

- member-journey map;
- event dictionary;
- permission matrix;
- data-processing map;
- vendor due-diligence result;
- 30/60/90 scorecard.

### Days 1–30 — hosted pilot

- Launch 100–300 founding members on the selected hosted platform.
- Use native identity, payments, moderation, courses, events, and notifications.
- Add only the analytics events needed to measure first value and week-one return.
- Connect read-only AI first.
- Require human approval for every external write.
- Export member and content data once while the dataset is still small.

Do not build a native app during this phase.

### Days 31–60 — prove the loop

- Measure cohort retention and peer contribution.
- Remove onboarding friction before adding features.
- Automate one repeated staff workflow at a time.
- Mirror canonical identity, consent, entitlement, and outcome records into the owned data plane.
- Run webhook-loss and replay tests.
- Conduct the first member-level deletion test.

### Days 61–90 — earn the next boundary

Choose the smallest next layer:

- **Stay native** when the loop works and constraints are cosmetic.
- **Branded app** when frequent mobile use and push meaningfully improve the proven loop.
- **Headless journey** when one critical screen blocks activation or retention.
- **Custom product** only when a repeated proprietary interaction cannot be expressed by vendors and
  is valuable enough to fund a permanent product team.

Run a timed export and reconstruction drill before renewing or expanding.

## 7. Mobile decision gate

A 100,000-follower audience does not itself justify an app.

Build or license a branded app only when:

- members return frequently enough for an installed surface to matter;
- push notifications support a valuable, consented behavior;
- the core journey works on mobile;
- app-store economics and payment policy are understood;
- the customer owns or can transfer the store assets;
- release, incident, accessibility, and privacy responsibilities have named owners.

Build a custom native application only when the differentiating behavior depends on native
capabilities or interaction quality that a managed app cannot supply.

## 8. Security and AI permission baseline

Start with:

- least-privilege service accounts;
- separate read and write credentials;
- secrets in a managed vault;
- signed webhook verification;
- encryption in transit and at rest;
- role-aware retrieval before model context is assembled;
- sensitive-field redaction;
- bounded model retention and training opt-out;
- human approval for messages, moderation, entitlement changes, and deletion;
- tamper-evident, append-only audit events with documented retention and member
  deletion/anonymization rules;
- cost, rate, and anomaly limits;
- rehearsed credential rotation and incident response.

An MCP server is a tool interface, not a security boundary. The gateway and authorization policy
must decide whether a tool can be offered, called, approved, and executed.

## 9. Production service objectives

Define objectives around member journeys, not server vanity metrics.

Suggested starting measures:

- successful login rate;
- time to first value;
- week-one and week-four cohort return;
- successful entitlement propagation;
- webhook processing lag and dead-letter count;
- notification delivery and opt-out rate;
- moderation response time;
- AI proposal acceptance, edit, reversal, and incident rate;
- export completeness;
- recovery time and recovery point;
- cost per active and paying member.

## 10. Exit drill

Before a large launch, prove that the team can:

1. export members, roles, consent, entitlements, content, files, events, progress, and relationships;
2. map vendor IDs to stable internal IDs;
3. preserve payment continuity or document the repurchase impact;
4. reconstruct a representative cohort in a clean environment;
5. transfer domain, email sending, app-store assets, and push credentials;
6. revoke old tokens and vendor access;
7. verify tenant and member deletion;
8. communicate the migration without breaking trust.

An export button is not an exit plan. A successful reconstruction is.

## 11. Architecture decisions to record

Maintain short decision records for:

- why the first platform was selected;
- what remains canonical outside it;
- what the stable member ID is;
- which writes require approval;
- which content may enter model context;
- how payment and entitlement state reconcile;
- when a branded app is earned;
- when headless is earned;
- the custom-build trigger;
- the exit and deletion procedure.

Review these decisions at day 30, day 60, day 90, and every contract renewal.

## 12. Final recommendation

For a creator with nearly 100,000 followers, the default production path is:

1. validate the member job;
2. run a 90-day hosted pilot;
3. start with Circle Business when premium community, courses, workflows, API/headless options, and
   an official MCP surface match the use case;
4. keep AI writes approval-gated;
5. own the measurement, identity map, consent, entitlements, outcomes, and audit trail;
6. add a branded app only after mobile habit is proven;
7. build custom only after a proprietary repeated behavior proves both product value and operating
   economics.

This sequence preserves speed now and strategic optionality later.
