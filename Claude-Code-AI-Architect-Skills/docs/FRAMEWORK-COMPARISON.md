# Agentic AI Framework Comparison Guide
**When to use Claude SDK vs LangGraph vs OpenAI AgentKit vs Oracle ADK**

---

## Quick Decision Matrix

| Framework | Best For | Avoid When | Learning Curve | Maturity |
|-----------|----------|------------|----------------|----------|
| **Claude SDK** | Autonomous agents with computer use, file operations, iterative workflows | Need visual builder, committed to OpenAI | Low | Mature (2025) |
| **LangGraph** | Complex state machines, human-in-the-loop, checkpointing, multi-LLM | Simple single-agent tasks, want managed platform | Medium | Mature (2024) |
| **OpenAI AgentKit** | Multi-agent teams, visual design, OpenAI-first, managed platform | Need self-hosted, want framework-agnostic | Low | New (2024) |
| **Oracle ADK** | Enterprise OCI deployments, Oracle ecosystem, compliance requirements | Not using Oracle Cloud, need cutting-edge features | Medium | Stable (2024) |
| **Oracle Agent Spec** | Framework-agnostic definitions, portability, standardization | Need immediate execution (spec only, not runtime) | Low | New (2024) |

---

## Detailed Comparison

### 1. Claude SDK (Anthropic)

#### Overview
The Claude Agent SDK enables building autonomous agents that can interact with computers, write files, run commands, and iterate on their work.

#### Key Strengths
✅ **Computer Use** - Revolutionary feature letting Claude control a computer environment
✅ **Built-in Tools** - Production-tested tools (Read, Write, Edit, Bash, Grep, Glob, WebFetch)
✅ **MCP Integration** - Native support for Model Context Protocol servers
✅ **Iterative Refinement** - Agents naturally iterate on errors
✅ **Production-Ready** - Used by thousands of developers, battle-tested
✅ **Simple API** - Clean, straightforward Python/TypeScript API

#### Key Weaknesses
❌ **Claude-Only** - Locked into Anthropic models (no OpenAI/Gemini support)
❌ **No Visual Builder** - Code-first approach (no GUI)
❌ **Limited State Management** - Basic state handling compared to LangGraph
❌ **No Managed Platform** - Self-hosted only (no cloud dashboard)

#### When to Choose Claude SDK

**Perfect for:**
- Building autonomous agents that need file system access
- Code generation and debugging workflows
- Research agents that gather and synthesize information
- Development tools and automation
- Agents that iterate on their work

**Real-World Use Cases:**
```python
# Example: Autonomous code review agent
from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=4096,
    tools=[
        {"type": "computer_use"},
        {"type": "bash"},
        {"type": "file_operations"}
    ],
    messages=[{
        "role": "user",
        "content": "Review the last commit, run tests, and fix any failures"
    }]
)

# Claude: reads files → runs tests → analyzes failures → fixes → re-runs → reports
```

**Companies Using:** Notion, Coda, Replit, many startups

**Cost:** Pay-per-token (Claude API pricing)
- Sonnet 4.5: $3/MTok input, $15/MTok output
- Haiku 4: $0.25/MTok input, $1.25/MTok output

---

### 2. LangGraph (LangChain)

#### Overview
Graph-based orchestration framework with fine-grained control, checkpointing, streaming, and complex state management for production agents.

#### Key Strengths
✅ **State Machines** - Complex workflows with conditional routing and cycles
✅ **Checkpointing** - Pause/resume execution, human-in-the-loop
✅ **Multi-LLM** - Use any LLM (Claude, OpenAI, Gemini, Llama, etc.)
✅ **Streaming** - Real-time partial outputs for better UX
✅ **LangSmith Integration** - Best-in-class observability and debugging
✅ **Production Features** - Parallelization, task queues, error handling

#### Key Weaknesses
❌ **Steeper Learning Curve** - More complex API than simpler frameworks
❌ **Verbosity** - Requires more code for simple tasks
❌ **No Managed Platform** - Self-hosted (though LangGraph Cloud exists)
❌ **No Visual Builder** - Code-first (though LangGraph Studio helps)

#### When to Choose LangGraph

**Perfect for:**
- Complex multi-step workflows with branching logic
- Human-in-the-loop approval workflows
- Long-running tasks that need to be paused/resumed
- Multi-agent systems with sophisticated coordination
- Agents that need detailed state management

**Real-World Use Cases:**
```python
# Example: Customer support escalation workflow
from langgraph.graph import StateGraph, END

class SupportState(TypedDict):
    ticket: str
    category: str
    resolution: Optional[str]
    escalated: bool

graph = StateGraph(SupportState)

graph.add_node("classify", classify_ticket)
graph.add_node("auto_resolve", auto_resolve)
graph.add_node("human_review", interrupt())  # Pauses for human
graph.add_node("escalate", escalate_to_human)

graph.add_conditional_edges(
    "classify",
    route_ticket,
    {
        "simple": "auto_resolve",
        "complex": "human_review",
        "urgent": "escalate"
    }
)

app = graph.compile(checkpointer=SqliteSaver.from_conn_string("tickets.db"))

# Supports pause/resume across different sessions
```

**Companies Using:** Elastic, Retool, scale AI, many enterprises

**Cost:** Free open-source + optional LangSmith ($39/mo+)

---

### 3. OpenAI AgentKit (OpenAI)

#### Overview
Multi-agent framework with visual builder, agent handoffs, and managed platform for building teams of specialized agents.

#### Key Strengths
✅ **Visual Builder** - Design agents graphically (no code needed for basic agents)
✅ **Multi-Agent Teams** - Built-in support for agent collaboration and handoffs
✅ **Managed Platform** - Cloud-hosted, no infrastructure to manage
✅ **OpenAI Native** - Deep integration with OpenAI models and features
✅ **Routines** - Reusable agent behaviors and workflows
✅ **Ease of Use** - Simple API, quick to get started

#### Key Weaknesses
❌ **OpenAI-Only** - Locked into OpenAI models (no Claude/Gemini)
❌ **Less Control** - Managed platform means less customization
❌ **Newer** - Launched late 2024, less battle-tested
❌ **Pricing** - Can be expensive for high-volume applications

#### When to Choose OpenAI AgentKit

**Perfect for:**
- Multi-agent systems with specialized agents (researcher, analyst, writer)
- Teams comfortable with OpenAI ecosystem
- Rapid prototyping with visual builder
- Managed platform preferred over self-hosting
- Applications requiring agent handoffs

**Real-World Use Cases:**
```python
# Example: Research team (researcher + analyst + writer)
from openai import AgentKit

# Define specialized agents
researcher = AgentKit.create_agent(
    name="Researcher",
    instructions="Find relevant information on given topics",
    tools=[web_search, web_scrape]
)

analyst = AgentKit.create_agent(
    name="Analyst",
    instructions="Analyze data and extract insights",
    tools=[data_analysis, visualization]
)

writer = AgentKit.create_agent(
    name="Writer",
    instructions="Create polished reports from analysis",
    tools=[document_generator]
)

# Orchestrate with handoffs
team = AgentKit.create_team([researcher, analyst, writer])
result = team.run("Research AI market trends and create report")

# Automatic handoffs: researcher → analyst → writer
```

**Companies Using:** Startups, SMBs (less enterprise adoption so far)

**Cost:** Usage-based (OpenAI API + platform fees)
- GPT-4o: $2.50/MTok input, $10/MTok output
- Platform: Additional fees for managed hosting

---

### 4. Oracle ADK (Oracle Cloud)

#### Overview
Agentic application development kit for building production agents on Oracle Cloud Infrastructure with enterprise features.

#### Key Strengths
✅ **Enterprise-Grade** - Built for large-scale deployments
✅ **OCI Integration** - Deep integration with Oracle Cloud services
✅ **Multi-Agent** - Built-in orchestration for agent teams
✅ **Function Tools** - Rich tooling for OCI services
✅ **Compliance** - Meets enterprise security and compliance requirements
✅ **Support** - Enterprise support from Oracle

#### Key Weaknesses
❌ **OCI-Centric** - Designed for Oracle Cloud (less useful elsewhere)
❌ **Less Community** - Smaller ecosystem than LangChain/OpenAI
❌ **Oracle Dependency** - Tied to Oracle ecosystem
❌ **Learning Resources** - Fewer tutorials and examples

#### When to Choose Oracle ADK

**Perfect for:**
- Enterprises already on Oracle Cloud Infrastructure
- Applications requiring Oracle Database integration
- Compliance-heavy industries (finance, healthcare, government)
- Organizations with Oracle support contracts
- Large-scale enterprise deployments

**Real-World Use Cases:**
```python
# Example: Enterprise data pipeline agent on OCI
from oracle_adk import Agent, OracleDatabase, ObjectStorage

agent = Agent(
    name="data-pipeline",
    tools=[
        OracleDatabase.query_tool(),
        ObjectStorage.read_tool(),
        ObjectStorage.write_tool()
    ]
)

result = agent.run(
    "Extract customer data from database, transform it, and store in object storage"
)

# Automatically uses OCI IAM, encryption, audit logging
```

**Companies Using:** Large enterprises on Oracle Cloud (Fortune 500)

**Cost:** Included with OCI subscription (pay for compute/API usage)

---

### 5. Oracle Agent Spec (Framework-Agnostic)

#### Overview
JSON/YAML specification for defining AI agents in a portable, framework-agnostic way.

#### Key Strengths
✅ **Framework-Agnostic** - Define once, run on any framework
✅ **Portability** - Agents can move between frameworks
✅ **Standardization** - Industry standard for agent definitions
✅ **Interoperability** - Agents can collaborate across frameworks
✅ **Declarative** - Define what, not how

#### Key Weaknesses
❌ **Specification Only** - Not a runtime (need framework to execute)
❌ **Limited Adoption** - Newer standard, less tooling
❌ **Abstraction** - May not support all framework-specific features
❌ **No Execution** - Just defines agents, doesn't run them

#### When to Choose Oracle Agent Spec

**Perfect for:**
- Building portable agents that work across frameworks
- Organizations standardizing on agent definitions
- Creating agent marketplaces
- Ensuring long-term framework independence
- Defining agents for others to implement

**Real-World Use Cases:**
```yaml
# Example: Framework-agnostic agent definition
agent:
  name: "customer-support-agent"
  version: "1.0.0"
  description: "Handles customer support inquiries"

  capabilities:
    - name: "query_knowledge_base"
      type: "tool"
      description: "Search internal knowledge base"

    - name: "create_ticket"
      type: "tool"
      description: "Create support ticket in system"

  workflow:
    - step: "understand"
      action: "analyze_customer_query"

    - step: "search"
      action: "query_knowledge_base"
      condition: "not_urgent"

    - step: "resolve"
      action: "provide_answer"
      fallback: "create_ticket"

# Can be implemented in Claude SDK, LangGraph, AgentKit, etc.
```

**Companies Using:** Oracle customers, enterprises building agent ecosystems

**Cost:** Free (open specification)

---

## Side-by-Side Feature Comparison

| Feature | Claude SDK | LangGraph | OpenAI AgentKit | Oracle ADK | Oracle Agent Spec |
|---------|------------|-----------|----------------|------------|------------------|
| **Computer Use** | ✅ Native | ❌ Via tools | ❌ Via tools | ❌ Via tools | N/A (spec only) |
| **Multi-LLM Support** | ❌ Claude only | ✅ Any LLM | ❌ OpenAI only | ✅ Multiple | ✅ Framework-agnostic |
| **State Management** | ⚠️ Basic | ✅ Advanced | ⚠️ Basic | ✅ Good | N/A |
| **Human-in-Loop** | ⚠️ Manual | ✅ Built-in | ✅ Built-in | ✅ Built-in | ✅ Spec support |
| **Checkpointing** | ❌ No | ✅ Yes | ⚠️ Limited | ✅ Yes | N/A |
| **Visual Builder** | ❌ No | ⚠️ Studio | ✅ Yes | ❌ No | ❌ No |
| **Managed Platform** | ❌ No | ⚠️ Cloud | ✅ Yes | ✅ OCI | N/A |
| **MCP Support** | ✅ Native | ✅ Via tools | ⚠️ Limited | ✅ Good | ✅ Can define |
| **Observability** | ⚠️ Basic | ✅ LangSmith | ✅ Built-in | ✅ OCI monitoring | N/A |
| **Cost** | Token-based | Token + platform | Token + platform | OCI pricing | Free (spec) |
| **Learning Curve** | Low | Medium | Low | Medium | Low |
| **Maturity** | Mature | Mature | New | Stable | New |
| **Community** | Large | Very Large | Growing | Small | Tiny |

---

## Decision Tree

```
START: What's your primary goal?

├─ Need computer use (file/bash operations)?
│  └─ YES → **Claude SDK**
│  └─ NO → Continue
│
├─ Building on Oracle Cloud?
│  └─ YES → **Oracle ADK**
│  └─ NO → Continue
│
├─ Need visual builder?
│  └─ YES → **OpenAI AgentKit**
│  └─ NO → Continue
│
├─ Need complex state machines or human-in-the-loop?
│  └─ YES → **LangGraph**
│  └─ NO → Continue
│
├─ Need framework portability?
│  └─ YES → **Oracle Agent Spec** (+ runtime framework)
│  └─ NO → Default to **Claude SDK** (simplest)
```

---

## Hybrid Approaches

### Combination 1: Claude SDK + LangGraph
**When:** Need computer use AND complex orchestration

```python
# Use Claude SDK for autonomous execution nodes
from anthropic import Anthropic
from langgraph.graph import StateGraph

claude = Anthropic()

def autonomous_research(state):
    """Node powered by Claude SDK with computer use"""
    response = claude.messages.create(
        model="claude-sonnet-4-5",
        tools=[{"type": "computer_use"}, {"type": "bash"}],
        messages=[{"role": "user", "content": state["task"]}]
    )
    return {"research_results": response.content}

# Orchestrate with LangGraph
graph = StateGraph(State)
graph.add_node("research", autonomous_research)
graph.add_node("analyze", analyze_results)
graph.add_node("approve", interrupt())
```

### Combination 2: Oracle Agent Spec + Multiple Runtimes
**When:** Define once, run on different frameworks

```yaml
# Define agent in Oracle Agent Spec
agent:
  name: "data-processor"
  # ... agent definition ...

# Implement in Claude SDK for development
# Implement in Oracle ADK for production on OCI
# Implement in LangGraph for complex workflows
```

### Combination 3: MCP + Any Framework
**When:** Need standardized data access across frameworks

```
Application Layer
    ├── Claude SDK agent
    ├── LangGraph agent
    └── OpenAI AgentKit agent
            ↓ (all use same MCP servers)
MCP Server Layer
    ├── Database MCP
    ├── API MCP
    └── Files MCP
```

---

## Migration Paths

### From Legacy AgentExecutor (LangChain)
**Migrate to:** LangGraph
**Difficulty:** Medium
**Timeline:** 1-2 weeks per agent
**Why:** AgentExecutor is deprecated, LangGraph is its replacement

### From Custom Framework
**Migrate to:**
- Simple agents → Claude SDK
- Complex workflows → LangGraph
- Teams → OpenAI AgentKit
- Enterprise OCI → Oracle ADK

**Difficulty:** Varies
**Timeline:** 2-4 weeks per agent

### From Claude SDK to LangGraph
**When:** Need advanced state management or human-in-the-loop
**Difficulty:** Medium
**Timeline:** 1 week per agent

```python
# Before (Claude SDK)
response = client.messages.create(
    model="claude-sonnet-4-5",
    tools=tools,
    messages=messages
)

# After (LangGraph with Claude)
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-4-5")
agent = create_react_agent(llm, tools, checkpointer=MemorySaver())
```

---

## Cost Comparison (Typical Enterprise Workload)

**Scenario:** 1M agent invocations/month, avg 5K input + 2K output tokens

| Framework | Monthly Cost | Breakdown |
|-----------|--------------|-----------|
| **Claude SDK** (Sonnet 4.5) | ~$45,000 | $15K input + $30K output |
| **Claude SDK** (Haiku 4) | ~$3,750 | $1.25K input + $2.5K output |
| **LangGraph + Claude Sonnet** | ~$45,390 | $45K API + $390 LangSmith |
| **LangGraph + OpenAI GPT-4o** | ~$32,500 | $12.5K input + $20K output |
| **OpenAI AgentKit** (GPT-4o) | ~$35,000 | $32.5K API + $2.5K platform |
| **Oracle ADK** (OCI) | ~$25,000 | $20K compute + $5K API |

**Cost Optimization Tips:**
1. Use Haiku for simple tasks, Sonnet for complex reasoning
2. Implement caching to reduce redundant requests
3. Batch similar requests when possible
4. Monitor and optimize token usage
5. Consider self-hosting for very high volumes

---

## Final Recommendations

### For Startups
**Choose:** Claude SDK or OpenAI AgentKit
**Why:** Fast time-to-market, simple API, managed or easy self-hosting
**Budget:** $500-5K/month initially

### For Mid-Size Companies
**Choose:** LangGraph
**Why:** Flexibility, multi-LLM support, production features
**Budget:** $5K-50K/month

### For Enterprises
**Choose:** LangGraph or Oracle ADK
**Why:** Enterprise features, compliance, support, scalability
**Budget:** $50K-500K+/month

### For Consultants
**Learn:** All frameworks
**Why:** Clients have different needs, show expertise across stack
**Specialize:** Choose 1-2 to master deeply

### For Educators
**Teach:** Claude SDK (simplest) → LangGraph (most powerful)
**Why:** Best learning progression, widest applicability

---

## Conclusion

**No single "best" framework** - choose based on:
- Your cloud provider (OCI → Oracle ADK)
- Your team's expertise (OpenAI fans → AgentKit, multi-LLM → LangGraph)
- Your use case (computer use → Claude SDK, complex workflows → LangGraph)
- Your budget (cost-sensitive → Haiku, enterprise → Oracle ADK)

**Best practice:** Master 2-3 frameworks to handle different scenarios effectively.

---

*Last Updated: December 2025*
*Next Update: Q2 2025 (new frameworks emerging)*
