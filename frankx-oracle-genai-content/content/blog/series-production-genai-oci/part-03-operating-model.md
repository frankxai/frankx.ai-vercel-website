# Production-Ready GenAI on Oracle Cloud Infrastructure: Part 3 - The Operating Model

## Governance, Observability, and Lifecycle Management for Production AI

**TL;DR:** Production GenAI systems fail not because of bad models, but because of missing operating models. This post covers the governance, observability, and lifecycle management that keeps production AI systems healthy—including prompt versioning, cost controls, evaluation pipelines, and incident response.

---

## The Operating Model Gap

Most GenAI projects focus 90% of effort on the model and 10% on operations. Production systems require the inverse: the model is a dependency; the operating model is the product.

An operating model answers:
- How do we version and deploy prompt changes?
- How do we know if quality is degrading?
- How do we control costs?
- How do we respond to incidents?
- How do we maintain compliance?

Without clear answers, your production system is a ticking time bomb.

---

## The Operations & Governance Plane

In our six-plane architecture, the Operations & Governance Plane is the foundation that supports everything else:

```
┌─────────────────────────────────────────────────────────────────┐
│                OPERATIONS & GOVERNANCE PLANE                     │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Observability│  │  Evaluation  │  │  Cost Management     │  │
│  │  & Telemetry │  │  Pipeline    │  │  & Quotas            │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Prompt      │  │  Security &  │  │  Incident            │  │
│  │  Registry    │  │  Compliance  │  │  Response            │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Observability: See Everything

### The Three Pillars of AI Observability

| Pillar | What It Captures | OCI Service |
|--------|------------------|-------------|
| **Traces** | Request flow through agent, tools, models | OCI APM + OpenTelemetry |
| **Metrics** | Latency, throughput, token counts, costs | OCI Monitoring |
| **Logs** | Request/response payloads, errors, decisions | OCI Logging |

### Tracing the Agent Loop

Every production AI system needs end-to-end tracing. Here's what a trace should capture:

```
[User Request] → [Agent Router] → [Tool Selection] → [Tool Execution] → [Model Call] → [Response]
    │               │                 │                  │                │              │
    ├─ user_id      ├─ agent_id       ├─ tool_name       ├─ tool_latency  ├─ model_id    ├─ response_id
    ├─ session_id   ├─ routing_time   ├─ tool_params     ├─ tool_result   ├─ input_tokens└─ output_tokens
    └─ timestamp    └─ decision_path  └─ confidence      └─ error_state   └─ model_latency
```

### OpenTelemetry Implementation

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Configure OCI APM exporter
tracer_provider = TracerProvider()
otlp_exporter = OTLPSpanExporter(
    endpoint="https://apm.<region>.ocp.oraclecloud.com/20200101/observability",
    headers={"authorization": f"Bearer {oci_token}"}
)
tracer_provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
trace.set_tracer_provider(tracer_provider)

tracer = trace.get_tracer("genai-agent-service")

async def process_request(request: AgentRequest) -> AgentResponse:
    with tracer.start_as_current_span("agent_request") as span:
        span.set_attribute("user_id", request.user_id)
        span.set_attribute("session_id", request.session_id)

        # Tool selection
        with tracer.start_as_current_span("tool_selection") as tool_span:
            selected_tool = await select_tool(request)
            tool_span.set_attribute("tool_name", selected_tool.name)
            tool_span.set_attribute("confidence", selected_tool.confidence)

        # Tool execution
        with tracer.start_as_current_span("tool_execution") as exec_span:
            tool_result = await execute_tool(selected_tool, request)
            exec_span.set_attribute("tool_latency_ms", tool_result.latency_ms)
            exec_span.set_attribute("tool_success", tool_result.success)

        # Model call
        with tracer.start_as_current_span("model_call") as model_span:
            response = await call_model(tool_result, request)
            model_span.set_attribute("model_id", response.model_id)
            model_span.set_attribute("input_tokens", response.usage.input_tokens)
            model_span.set_attribute("output_tokens", response.usage.output_tokens)

        return response
```

### Key Metrics to Track

| Metric | SLO Target | Alert Threshold |
|--------|------------|-----------------|
| **End-to-end latency (p95)** | < 5 seconds | > 8 seconds |
| **Tool failure rate** | < 1% | > 3% |
| **Model error rate** | < 0.1% | > 0.5% |
| **Retrieval latency (p95)** | < 500ms | > 1 second |
| **Groundedness rate** | > 95% | < 90% |
| **Cost per interaction** | < $0.10 | > $0.25 |

---

## 2. Evaluation Pipeline: Measure Quality

### Online vs Offline Evaluation

| Type | When | What It Measures |
|------|------|------------------|
| **Online** | Real-time, during inference | Latency, errors, user feedback |
| **Offline** | Batch, on golden sets | Accuracy, groundedness, regression |

### Golden Set Testing

A golden set is a curated collection of input-output pairs that represent expected behavior. Run these before every deployment:

```python
from dataclasses import dataclass
from typing import List, Dict
import json

@dataclass
class GoldenTestCase:
    id: str
    input: str
    expected_tool: str
    expected_keywords: List[str]
    max_latency_ms: float

@dataclass
class EvalResult:
    case_id: str
    passed: bool
    actual_tool: str
    actual_response: str
    latency_ms: float
    groundedness_score: float
    errors: List[str]

class GoldenSetEvaluator:
    def __init__(self, agent: Agent, golden_set_path: str):
        self.agent = agent
        self.golden_set = self._load_golden_set(golden_set_path)

    def _load_golden_set(self, path: str) -> List[GoldenTestCase]:
        with open(path) as f:
            data = json.load(f)
        return [GoldenTestCase(**case) for case in data]

    async def run_evaluation(self) -> Dict:
        results = []
        for case in self.golden_set:
            result = await self._evaluate_case(case)
            results.append(result)

        return {
            "total_cases": len(results),
            "passed": sum(1 for r in results if r.passed),
            "failed": sum(1 for r in results if not r.passed),
            "pass_rate": sum(1 for r in results if r.passed) / len(results),
            "avg_latency_ms": sum(r.latency_ms for r in results) / len(results),
            "avg_groundedness": sum(r.groundedness_score for r in results) / len(results),
            "failures": [r for r in results if not r.passed]
        }

    async def _evaluate_case(self, case: GoldenTestCase) -> EvalResult:
        start_time = time.time()
        errors = []

        try:
            response = await self.agent.process(case.input)
            latency_ms = (time.time() - start_time) * 1000

            # Check tool selection
            tool_correct = response.selected_tool == case.expected_tool
            if not tool_correct:
                errors.append(f"Wrong tool: expected {case.expected_tool}, got {response.selected_tool}")

            # Check keywords
            keywords_found = all(kw in response.text.lower() for kw in case.expected_keywords)
            if not keywords_found:
                errors.append(f"Missing keywords: {case.expected_keywords}")

            # Check latency
            latency_ok = latency_ms <= case.max_latency_ms
            if not latency_ok:
                errors.append(f"Latency exceeded: {latency_ms}ms > {case.max_latency_ms}ms")

            # Calculate groundedness
            groundedness = await self._calculate_groundedness(response)

            return EvalResult(
                case_id=case.id,
                passed=tool_correct and keywords_found and latency_ok and groundedness > 0.9,
                actual_tool=response.selected_tool,
                actual_response=response.text,
                latency_ms=latency_ms,
                groundedness_score=groundedness,
                errors=errors
            )
        except Exception as e:
            return EvalResult(
                case_id=case.id,
                passed=False,
                actual_tool="error",
                actual_response=str(e),
                latency_ms=(time.time() - start_time) * 1000,
                groundedness_score=0,
                errors=[str(e)]
            )
```

### CI/CD Integration

Run evaluation as part of your deployment pipeline:

```yaml
# .github/workflows/deploy-agent.yml
name: Deploy Agent

on:
  push:
    branches: [main]
    paths:
      - 'agents/**'
      - 'prompts/**'
      - 'tools/**'

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Golden Set Evaluation
        run: |
          python -m pytest tests/golden_set/ \
            --golden-set=tests/golden_set/cases.json \
            --min-pass-rate=0.95 \
            --max-avg-latency=3000

      - name: Run Regression Tests
        run: |
          python -m pytest tests/regression/ \
            --baseline=tests/regression/baseline.json

  deploy:
    needs: evaluate
    if: success()
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to OCI
        run: |
          oci ai-agent deploy \
            --agent-id ${{ secrets.AGENT_ID }} \
            --version ${{ github.sha }}
```

---

## 3. Prompt & Agent Lifecycle Management

### Prompts as Code

Treat prompts like code: version them, review them, test them.

```
prompts/
├── agents/
│   ├── sales-assistant/
│   │   ├── v1.0.0/
│   │   │   ├── system.md
│   │   │   ├── tools.yaml
│   │   │   └── examples.json
│   │   └── v1.1.0/
│   │       ├── system.md
│   │       ├── tools.yaml
│   │       └── examples.json
│   └── support-agent/
│       └── ...
└── registry.yaml
```

### Prompt Registry

```yaml
# prompts/registry.yaml
prompts:
  sales-assistant:
    current_version: "1.1.0"
    versions:
      "1.0.0":
        status: deprecated
        deployed_at: "2025-12-15"
        deprecated_at: "2026-01-10"
      "1.1.0":
        status: active
        deployed_at: "2026-01-10"
        changes:
          - "Improved tool selection accuracy"
          - "Added multi-language support"
        evaluation_results:
          pass_rate: 0.97
          avg_latency_ms: 2340
          groundedness: 0.94

  support-agent:
    current_version: "2.0.0"
    versions:
      "2.0.0":
        status: active
        deployed_at: "2026-01-05"
```

### Deployment Strategies

| Strategy | Risk | Rollback Time | Best For |
|----------|------|---------------|----------|
| **Blue/Green** | Low | Instant | Major changes |
| **Canary** | Very Low | Fast | Incremental improvements |
| **Shadow** | None | N/A | Testing new models |

```python
class CanaryDeployment:
    """Route percentage of traffic to new version"""

    def __init__(self, old_agent: Agent, new_agent: Agent, canary_percent: float = 5.0):
        self.old_agent = old_agent
        self.new_agent = new_agent
        self.canary_percent = canary_percent

    async def route(self, request: AgentRequest) -> AgentResponse:
        # Deterministic routing based on user_id for consistency
        user_hash = hash(request.user_id) % 100

        if user_hash < self.canary_percent:
            response = await self.new_agent.process(request)
            response.metadata["version"] = "canary"
        else:
            response = await self.old_agent.process(request)
            response.metadata["version"] = "stable"

        return response
```

---

## 4. Cost Management

### Cost Model Understanding

| Component | Pricing Model | Optimization Lever |
|-----------|---------------|-------------------|
| **LLM Inference** | Per token | Caching, model selection, prompt length |
| **Embeddings** | Per token | Batch processing, caching |
| **Vector DB** | Storage + queries | Index optimization, data lifecycle |
| **Compute** | Per hour | Right-sizing, autoscaling |
| **Agent Platform** | Per vCPU-hour | Efficient tool design |

### Cost Tracking

```python
from dataclasses import dataclass
from decimal import Decimal

@dataclass
class CostTracker:
    # OCI GenAI pricing (approximate) - PER CHARACTER
    # Note: Oracle charges per character, not per token
    # 10,000 characters = 10,000 transactions
    MODEL_COSTS = {
        "cohere.command-r-plus-08-2024": {"per_10k_chars": Decimal("0.015")},
        "meta.llama-3.3-70b-instruct": {"per_10k_chars": Decimal("0.025")},
        "cohere.embed-v4.0": {"per_10k_chars": Decimal("0.001")},
    }

    def calculate_request_cost(self, model_id: str, input_chars: int, output_chars: int) -> Decimal:
        if model_id not in self.MODEL_COSTS:
            return Decimal("0")

        costs = self.MODEL_COSTS[model_id]
        total_chars = input_chars + output_chars
        # Oracle pricing: (characters / 10000) * price_per_10k_chars
        cost = (Decimal(total_chars) / 10000) * costs.get("per_10k_chars", Decimal("0"))

        return cost

    def log_cost(self, request_id: str, model_id: str, input_chars: int, output_chars: int):
        cost = self.calculate_request_cost(model_id, input_chars, output_chars)

        # Log to OCI Monitoring custom metric
        self.metrics_client.post_metric(
            namespace="genai_costs",
            metric_name="request_cost_usd",
            value=float(cost),
            dimensions={
                "model_id": model_id,
                "request_id": request_id
            }
        )
```

### Cost Controls

```python
class CostGovernor:
    """Enforce cost limits at multiple levels"""

    def __init__(self,
                 per_request_limit: Decimal = Decimal("1.00"),
                 per_user_daily_limit: Decimal = Decimal("10.00"),
                 per_tenant_monthly_limit: Decimal = Decimal("10000.00")):
        self.per_request_limit = per_request_limit
        self.per_user_daily_limit = per_user_daily_limit
        self.per_tenant_monthly_limit = per_tenant_monthly_limit

    async def check_limits(self, user_id: str, tenant_id: str, estimated_cost: Decimal) -> bool:
        # Check per-request limit
        if estimated_cost > self.per_request_limit:
            raise CostLimitExceeded(f"Request cost ${estimated_cost} exceeds limit ${self.per_request_limit}")

        # Check user daily limit
        user_daily_spend = await self._get_user_daily_spend(user_id)
        if user_daily_spend + estimated_cost > self.per_user_daily_limit:
            raise CostLimitExceeded(f"User daily limit exceeded")

        # Check tenant monthly limit
        tenant_monthly_spend = await self._get_tenant_monthly_spend(tenant_id)
        if tenant_monthly_spend + estimated_cost > self.per_tenant_monthly_limit:
            raise CostLimitExceeded(f"Tenant monthly limit exceeded")

        return True
```

---

## 5. Security & Compliance

### Data Classification

```yaml
# data-classification.yaml
classifications:
  public:
    description: "Publicly available information"
    allowed_models: ["all"]
    logging: "full"
    retention_days: 90

  internal:
    description: "Internal business data"
    allowed_models: ["oci-hosted"]
    logging: "metadata_only"
    retention_days: 365
    encryption: "at_rest_and_transit"

  confidential:
    description: "Sensitive business data (PII, financials)"
    allowed_models: ["oci-dedicated-cluster"]
    logging: "audit_only"
    retention_days: 730
    encryption: "customer_managed_keys"
    data_residency: "same_region"

  restricted:
    description: "Highly sensitive (trade secrets, health data)"
    allowed_models: ["private-agent-factory"]
    logging: "audit_only"
    retention_days: 2555  # 7 years
    encryption: "customer_managed_keys"
    data_residency: "same_country"
    access_control: "explicit_approval"
```

### Prompt Injection Prevention

```python
class PromptSanitizer:
    """Detect and prevent prompt injection attempts"""

    INJECTION_PATTERNS = [
        r"ignore.*previous.*instructions",
        r"disregard.*above",
        r"you are now",
        r"pretend to be",
        r"system:.*",
        r"\[INST\]",
        r"<\|.*\|>",
    ]

    def sanitize(self, user_input: str) -> str:
        # Check for injection patterns
        for pattern in self.INJECTION_PATTERNS:
            if re.search(pattern, user_input, re.IGNORECASE):
                raise PromptInjectionDetected(f"Potential injection pattern detected")

        # Escape special characters
        sanitized = self._escape_special_chars(user_input)

        # Truncate to max length
        sanitized = sanitized[:MAX_INPUT_LENGTH]

        return sanitized
```

---

## 6. Incident Response

### Incident Classification

| Severity | Definition | Response Time | Example |
|----------|------------|---------------|---------|
| **P1 - Critical** | Service down, data breach | 15 minutes | Agent returning sensitive data |
| **P2 - High** | Major functionality broken | 1 hour | Tool failures > 10% |
| **P3 - Medium** | Degraded performance | 4 hours | Latency SLO breach |
| **P4 - Low** | Minor issues | 24 hours | Occasional incorrect responses |

### Runbook Template

```markdown
# Runbook: High Latency Alert

## Trigger
- P95 latency > 8 seconds for 5 minutes

## Impact
- User-facing degradation, potential timeouts

## Investigation Steps

1. **Check OCI APM Dashboard**
   - Navigate to: OCI Console → APM → Traces
   - Filter by: service="genai-agent", latency > 5s
   - Identify slow span

2. **Common Causes & Fixes**

   | Cause | Indicator | Fix |
   |-------|-----------|-----|
   | Model overload | High model_latency span | Scale dedicated cluster |
   | Vector DB slow | High retrieval_latency span | Check index, add replicas |
   | Tool timeout | tool_execution > 10s | Check external API health |
   | Memory pressure | OOM in logs | Scale compute, reduce batch |

3. **Immediate Mitigation**
   ```bash
   # Enable fallback to faster model
   oci ai-agent update --agent-id $AGENT_ID \
     --config '{"fallback_model": "cohere.command-light"}'
   ```

4. **Escalation**
   - If not resolved in 30 minutes: Page on-call AI engineer
   - If P1: Notify AI CoE leadership

## Post-Incident
- Create incident report within 48 hours
- Update runbook if new pattern identified
- Add regression test case
```

---

## Minimal Deployable Baseline

### Repository Structure

```
repo/
├── infra/
│   └── terraform/           # VCN, OKE, API Gateway, IAM
├── platform/
│   └── helm/                # Agent service chart
├── services/
│   └── agent-service/       # Agent loop, tools, retrieval
├── prompts/
│   └── registry/            # Versioned prompts
├── eval/
│   ├── golden_sets/         # Test cases
│   └── scripts/             # Evaluation runners
├── docs/
│   ├── runbooks/            # Incident response
│   └── adrs/                # Architecture decisions
└── .github/
    └── workflows/           # CI/CD pipelines
```

### OCI Services Baseline

| Layer | Service | Purpose |
|-------|---------|---------|
| Network | VCN + Private Subnets | Isolation |
| Edge | WAF + API Gateway | Security, rate limits |
| Runtime | OKE or AI Agent Platform | Agent execution |
| Models | OCI GenAI | LLM inference |
| Data | Autonomous DB + Object Storage | Vector store, documents |
| Ops | Logging + Monitoring + APM | Observability |
| Governance | IAM + Vault | Access control, secrets |

---

## What's Next

This three-part series has covered:
1. **Part 1**: The enterprise architecture blueprint (six-plane model)
2. **Part 2**: Agent patterns (managed vs framework)
3. **Part 3**: The operating model (governance, observability, lifecycle)

For hands-on implementation:
- Clone the [OCI AI Blueprints](https://github.com/oracle-quickstart/oci-ai-blueprints) repo
- Follow the [LiveLabs workshops](https://apexapps.oracle.com/pls/apex/f?p=133:1)
- Join the [Oracle AI Community](https://community.oracle.com/tech/apps-infra/categories/oracle-cloud-infrastructure-generative-ai)

---

## Resources

- [OCI APM for RAG solutions](https://blogs.oracle.com/cloud-infrastructure/post/oci-apm-rag-solutions)
- [OCI Logging Service](https://docs.oracle.com/en-us/iaas/Content/Logging/home.htm)
- [OCI Monitoring Service](https://docs.oracle.com/en-us/iaas/Content/Monitoring/home.htm)
- [OpenTelemetry OCI Integration](https://docs.oracle.com/en-us/iaas/application-performance-monitoring/doc/configure-open-source-tracing-systems.html)
- [OCI IAM Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/policyreference.htm)

---

## FAQ

### How often should I run golden set evaluations?
Before every deployment, and at least weekly for production systems. Set up automated evaluation in CI/CD.

### What's a good starting SLO for latency?
P95 < 5 seconds for conversational agents, P95 < 10 seconds for complex multi-tool workflows. Adjust based on user expectations.

### How do I handle prompt drift?
Version all prompts, run regression tests on changes, and monitor groundedness scores. If scores drop, investigate recent prompt or data changes.

### Should I log full request/response payloads?
Depends on data classification. For internal/public data, yes (helps debugging). For confidential/restricted, log metadata only and use separate audit logs.

### How do I estimate costs before deploying?
Run your golden set against the new configuration and measure **character usage**. Multiply by pricing (per 10,000 characters) to estimate production costs. Add 20% buffer for real-world variance.

---

*This is Part 3 of the "Production-Ready GenAI on Oracle Cloud Infrastructure" series. [Part 1: Architecture Overview](part-01-architecture-overview.md) covers the six-plane model. [Part 2: Agent Patterns](part-02-agent-patterns.md) covers managed vs framework agents.*
