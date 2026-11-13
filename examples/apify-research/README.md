# Apify research request planner

Original teaching example. Node 22 or later; no package install or token required.
This folder is an offline companion to the draft comparison, not a production
Apify integration, installable MCP server or completed paid starter kit.

```bash
node examples/apify-research/request-plan.mjs examples/apify-research/fixtures/mission.json
node --test examples/apify-research/request-plan.test.mjs
```

The command prints equivalent MCP and Actor API request plans. It makes **no
network calls**. The example domain, mission and numbered build `0.0.0` are
synthetic. No real Actor build was resolved or run. Replace them only after the
execution owner inspects the selected Actor schema, permissions, numbered build,
current pricing, target access rights and separately approved budget.

The planner keeps billing controls in MCP `callOptions` / API query parameters,
separate from Actor input. For this Actor a direct URL selects one target;
`maxResults` controls search mode and does not impose a universal crawl limit.
An allowlisted hostname check in a planner cannot enforce the remote Actor's
redirects, DNS resolution, subrequests, permission scope or nested charges.

An execution adapter must supply durable admission, atomic dispatch ownership,
token injection, run-ID persistence, status polling, explicit remote abort,
bounded dataset pagination, validation and cost reconciliation. These belong in
the existing runtime under the integration lane; this example does not implement
or certify them. Never retry an uncertain start POST automatically. Keep the
dispatch in `unknown` until the original effect can be reconciled.

`costPerAcceptedArtifact` requires all cost components and a positive accepted
count. Unknown costs and zero accepted outcomes return `null`, never a misleading
zero-cost result. Include failed attempts, retries and human review in supplied
measurements. The arithmetic test inputs are synthetic, not observed expenses.

Limits in the example are design examples, not authorization to spend. Passing
the tests proves local planning behavior only. See the [starter-kit specification](../../docs/ops/apify-product-lane/starter-kit-spec.md)
and [evaluation template](../../docs/ops/apify-product-lane/evaluation.template.json).

The repository's existing reserved-rights license applies. No separate code,
content, resale or third-party data license is granted by this example.
