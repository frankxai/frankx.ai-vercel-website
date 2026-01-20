# Production-Ready GenAI on Oracle Cloud Infrastructure: Part 2 - Agent Patterns That Actually Scale

## Managed vs Framework Agents: Making the Right Choice

**TL;DR:** Enterprises typically land in one of two agent patterns: managed runtime (OCI AI Agent Platform/Agent Hub) for speed and consistency, or framework runtime (LangGraph/LangChain on OKE) for maximum control. Many organizations use both. This post helps you decide when to use which.

---

## The Agent Orchestration Problem

LLMs alone are not enough. To build intelligent agents, you need an orchestration layer that can:
- Interpret user requests
- Call the appropriate tools or data sources
- Manage conversation state
- Decide when to delegate vs. execute
- Handle failures gracefully

This is where most GenAI projects fall apart. The demo works because someone wrote a script. Production fails because scripts don't handle edge cases, tool failures, or the seventeen ways a user can phrase the same question.

---

## Two Production Paths: Managed vs Framework Agents

Both patterns are valid. The key is being explicit about which you're choosing—and why—before you start building.

### Path A: Managed Agent Runtime (Fastest to Value)

Use **OCI AI Agent Platform** and the upcoming **Agent Hub** as your orchestration layer.

| Pros | Cons |
|------|------|
| Speed to deployment | Less control over internal logic |
| Managed scaling and infrastructure | Vendor-specific patterns |
| Consistent platform to onboard teams | May require workarounds for edge cases |
| Built-in security and compliance | Tool limitations early in platform maturity |

**Best when:** You want speed, managed scaling, and a consistent platform to onboard multiple teams without each team building their own agent infrastructure.

### Path B: Framework Agent Runtime (Maximum Control)

Run **LangGraph/LangChain-style services** on OCI compute (OKE, Container Instances, Compute).

| Pros | Cons |
|------|------|
| Full control over agent logic | You own the infrastructure |
| Custom workflows and state machines | More DevOps overhead |
| Framework ecosystem (tools, integrations) | Consistency depends on your standards |
| Portable across clouds | Security is your responsibility |

**Best when:** You need custom workflows, bespoke tool execution, deep integration into existing platforms, or you're building something the managed platform doesn't support yet.

### The Hybrid Reality

In practice, many organizations use **both**:
- **Managed agents** for broad internal productivity and customer-facing assistants
- **Framework agents** for specialized workflows where you need tight control over state, routing, and evaluation

This isn't hedging—it's pragmatic architecture. Different problems have different constraints.

---

## OCI AI Agent Platform: What You Get Out of the Box

OCI Generative AI Agents is a managed service that lets you build, deploy, and manage AI agents on OCI. These agents are orchestration logic on top of LLMs: they decide which actions to take in response to a user's query.

### Built-In Integrations

The OCI Agent service integrates with the rest of Oracle Cloud:
- **Oracle Databases** (Autonomous DB, MySQL HeatWave)
- **Object Storage** for document retrieval
- **OCI Functions** for custom tasks
- **Oracle Digital Assistant** for conversation management

This eliminates a lot of plumbing work and ensures security/compliance (interactions with data stay within your cloud environment).

### Agent Hub: The Control Center

Agent Hub (GA 2025) provides a centralized interface to:
- Create, deploy, and govern agents
- Register multiple agents (each specializing in certain tasks)
- Set configurations and policies
- Have meta-agents route user requests to the appropriate agent

The key innovation: **Agent Hub abstracts the complexity of navigating many agents**. Users ask a question, and Agent Hub figures out which agent (or sequence of agents) should handle it.

### Built-In Tools

| Tool | What It Does |
|------|--------------|
| **SQL Tool** | Execute database queries with self-correction across Oracle or SQLite |
| **RAG Tool** | Document retrieval with hybrid semantic search, multi-modal data, multilingual content |
| **Custom Tool** | Backed by OCI Functions or any API—call weather APIs, run Python scripts, anything |

Instead of writing custom code to have an agent query a database, you configure the SQL Tool with a connection and let the agent use it.

---

## Framework Agents on OCI: LangGraph/LangChain

If you need more control, run framework-based agents on OCI infrastructure. The key is keeping the same access and operations planes as the managed path.

### Architecture Pattern

```
┌─────────────────────────────────────────────────────────┐
│  Experience Layer                                       │
│  (Web UI / Chat / Task UI)                              │
├─────────────────────────────────────────────────────────┤
│  Ingress & Policy                                       │
│  (API Gateway + WAF + IAM + Rate Limits)                │
├─────────────────────────────────────────────────────────┤
│  Agent Service (OKE / Container Instances)              │
│  ┌─────────────────────────────────────────────────┐    │
│  │  LangGraph / LangChain Runtime                  │    │
│  │  - Graph definition (nodes, edges, state)       │    │
│  │  - Tool definitions (SQL, RAG, custom)          │    │
│  │  - Memory / persistence layer                   │    │
│  └─────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────┤
│  Model Endpoints                                        │
│  (OCI Generative AI / Model Import / Custom)            │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                             │
│  (Vector Store + Structured DB + Object Storage)        │
└─────────────────────────────────────────────────────────┘
```

### Why LangGraph?

LangGraph (from LangChain) gives you:
- **Stateful graphs** for complex multi-step workflows
- **Branching and cycles** (not just linear chains)
- **Human-in-the-loop** patterns built-in
- **Persistence** for long-running tasks
- **Streaming** for responsive UX

For production, LangGraph's explicit state management makes debugging and monitoring far easier than implicit chain behavior.

### Deployment on OKE

Run your agent service on **Oracle Kubernetes Engine (OKE)**:
- Container-based deployment (Dockerfile → Helm chart)
- Horizontal scaling based on request volume
- Private networking (no public internet exposure)
- Integration with OCI Observability (logging, metrics, APM)

```yaml
# Example Helm values (simplified)
replicaCount: 3
image:
  repository: <region>.ocir.io/<tenancy>/agent-service
  tag: "v1.2.0"
resources:
  requests:
    memory: "2Gi"
    cpu: "1000m"
env:
  - name: OCI_GENAI_ENDPOINT
    value: "https://inference.generativeai.<region>.oci.oraclecloud.com"
  - name: VECTOR_DB_CONNECTION
    valueFrom:
      secretKeyRef:
        name: agent-secrets
        key: vector-db-connection
```

---

## Oracle Digital Assistant: The Conversation Layer

Before OCI's GenAI Agent service became available, **Oracle Digital Assistant (ODA)** was the mature platform for building chatbots. Now it plays a role as an **orchestrator for GenAI agents**.

### ODA Features for Agent Systems

| Feature | Benefit |
|---------|---------|
| **Visual Flow Designer** | Low-code interface for conversation flows |
| **LLM Blocks** | Call OCI's models or third-party (OpenAI, Cohere) within flows |
| **Prompt Builder** | Centralized prompt management separate from flow logic |
| **Multi-Channel** | Deploy to web, mobile, SMS, Teams, Slack, voice |
| **Entity Recognition** | Extract structured data from natural language |

### ODA + Agent Platform Pattern

A common production pattern:
1. **ODA handles the conversation flow** (greeting, context, channel management)
2. **ODA routes to Agent Platform** for complex reasoning
3. **Agent Platform executes tools** (RAG, SQL, custom APIs)
4. **Results flow back through ODA** to the user

This gives you the best of both: ODA's mature conversation management plus Agent Platform's tool execution.

---

## Multi-Agent Orchestration

For complex domains, you need multiple specialized agents working together. Two patterns emerge:

### Pattern 1: Hub-and-Spoke (Agent Hub)

A meta-agent (the Hub) routes requests to specialized agents (Spokes):
- **Support Agent**: Customer issues, ticket creation
- **Sales Agent**: Product info, pricing, quotes
- **Technical Agent**: Documentation, troubleshooting
- **Admin Agent**: Account management, billing

Agent Hub handles this natively—users don't need to know which agent to ask.

### Pattern 2: Agent-to-Agent (LangGraph)

Agents call other agents as tools:

```python
# LangGraph: Agent-to-agent pattern
research_agent = create_research_agent()
writing_agent = create_writing_agent()
review_agent = create_review_agent()

workflow = StateGraph(State)
workflow.add_node("research", research_agent)
workflow.add_node("write", writing_agent)
workflow.add_node("review", review_agent)

# Define flow: research → write → review (with cycles for revision)
workflow.add_edge("research", "write")
workflow.add_edge("write", "review")
workflow.add_conditional_edges(
    "review",
    should_revise,
    {"revise": "write", "done": END}
)
```

This pattern gives you explicit control over handoffs, but you own the orchestration complexity.

---

## Tool Standardization: The Secret to Scaling

Whether you use managed or framework agents, **standardize your tools**. Tools are how agents interact with the world.

### Tool Design Principles

1. **Single responsibility**: One tool, one job
2. **Clear schemas**: Input/output types that the LLM can understand
3. **Error handling**: Tools should fail gracefully with useful messages
4. **Idempotency where possible**: Same input → same output (for reliability)
5. **Observability built-in**: Every tool call should emit telemetry

### Example: SQL Tool Specification

```json
{
  "name": "query_sales_data",
  "description": "Query the sales database for revenue, orders, and customer data. Use this when the user asks about sales metrics, revenue trends, or customer orders.",
  "parameters": {
    "type": "object",
    "properties": {
      "query_type": {
        "type": "string",
        "enum": ["revenue", "orders", "customers"],
        "description": "The type of data to retrieve"
      },
      "time_range": {
        "type": "string",
        "description": "Time range in format: 'last 7 days', 'Q4 2025', 'January 2026'"
      },
      "filters": {
        "type": "object",
        "description": "Optional filters like region, product_category, customer_segment"
      }
    },
    "required": ["query_type", "time_range"]
  }
}
```

### Tool Registry

Maintain a **tool registry**—a versioned catalog of all tools available to your agents:
- Tool name and version
- Input/output schema
- Permissions required
- Data classification (what data does this tool access?)
- Owner and support contact

This becomes critical when you have 50+ tools across 10+ agents.

---

## Agent Definitions as Portable Assets

A key principle: **Treat agent definitions as portable assets**.

### The Portability Problem

If your agent definition is tightly coupled to a specific runtime (hardcoded OCI endpoints, runtime-specific configuration), you can't:
- Move between managed and framework runtimes
- Test locally before deploying
- Version and diff your agent changes
- Roll back problematic deployments

### Declarative Agent Specs

Oracle's **Open Agent Specification** (OAS) is one approach to portable agent definitions:

```yaml
# Example: agent-spec.yaml
apiVersion: oracle.com/v1
kind: AgentSpec
metadata:
  name: sales-assistant
  version: "1.2.0"
spec:
  description: "Helps sales teams with CRM data, forecasting, and customer insights"

  models:
    primary: oci-cohere-command-r-plus
    fallback: oci-llama-3-70b

  tools:
    - name: query_crm
      type: sql
      connection: sales_db_prod
    - name: get_forecast
      type: function
      endpoint: oci-functions://forecast-service
    - name: search_docs
      type: rag
      knowledge_base: sales_playbook

  policies:
    max_tool_calls: 5
    timeout_seconds: 30
    data_classification: internal
```

This spec can be deployed to Agent Hub, rendered to LangGraph, or used to generate test harnesses.

---

## Decision Framework: Managed vs Framework

Use this framework to decide:

| Factor | Choose Managed | Choose Framework |
|--------|----------------|------------------|
| **Time to production** | < 4 weeks | Can invest 8+ weeks |
| **Team expertise** | Limited LLM/agent experience | Strong Python/orchestration skills |
| **Customization needs** | Standard patterns work | Unique workflows required |
| **Scale** | 10s of agents | 100s of specialized agents |
| **Compliance** | Need managed controls | Can implement own controls |
| **Multi-cloud** | OCI-centric | Portability required |

Most enterprises start with **managed for 80%** of use cases, then add **framework for the 20%** that need custom control.

---

## What's Next

In **Part 3**, we'll dive deep into RAG systems at enterprise scale—ingestion pipelines, vector store strategies, and how to measure retrieval quality separately from generation quality.

---

## Resources

- [Deploy agentic AI using OCI AI Agent Platform](https://docs.oracle.com/en/solutions/deploy-agentic-ai-agent-platform/index.html)
- [Build and manage multi-agent with Oracle Digital Assistant](https://docs.oracle.com/en/solutions/build-multi-agent-with-oda/index.html)
- [Agent Hub announcement (OCI Generative AI)](https://blogs.oracle.com/cloud-infrastructure/ai-world-2025-artificial-intelligence)
- [Open Agent Specification + AG-UI integration](https://blogs.oracle.com/ai-and-datascience/announcing-ag-ui-integration-for-agent-spec)
- [LangGraph documentation](https://langchain-ai.github.io/langgraph/)

---

## Pricing Note

## FAQ

### When should I use Agent Hub vs. LangGraph?
Agent Hub for speed to value, managed scaling, and when your use case fits its patterns (RAG, SQL, custom tools). LangGraph for complex state machines, custom workflows, and when you need explicit control over agent behavior.

### Can I migrate from framework agents to managed agents later?
Yes, if you use declarative agent specs. The tool definitions and policies can be ported. The orchestration logic may need to be adapted to Agent Hub's patterns.

### How do I handle tool failures in production?
Both patterns support fallback logic. In managed agents, configure retry policies and fallback tools. In framework agents, implement explicit error handling in your graph edges.

### What's the latency difference between managed and framework agents?
Managed agents have slightly higher baseline latency (managed infrastructure overhead) but more predictable scaling. Framework agents can be optimized for lower latency but require more tuning.

### How do I test agents before deploying to production?
Create a test harness that simulates user inputs and validates tool calls and responses. Use the same agent spec for local testing and production deployment. Run regression tests on prompt/tool changes.

---

## Pricing Note

> **Oracle GenAI Pricing**: Oracle charges per CHARACTER, not per token. For on-demand inference:
> - Chat models: (prompt_length + response_length) in characters
> - Embedding models: input_length in characters
> - 10,000 characters = 10,000 transactions
> - See: https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm

---

*This is Part 2 of the "Production-Ready GenAI on Oracle Cloud Infrastructure" series. [Part 1: Architecture Overview](part-01-architecture-overview.md) covers the six-plane model. [Part 3: Enterprise RAG Systems](part-03-enterprise-rag.md) covers retrieval at scale.*
