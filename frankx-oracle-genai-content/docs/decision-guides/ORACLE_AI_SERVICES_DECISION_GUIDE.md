# Oracle AI Services Decision Guide

## Overview

This guide helps architects and developers choose the right Oracle AI service for their use case. With multiple offerings (GenAI Service, AI Agent, Agent Hub, AI Agent Studio, Private AI Agent Studio), understanding when to use each is critical.

## Service Comparison Matrix

| Feature | GenAI Service | AI Agent | Agent Hub | AI Agent Studio | Private AI Agent Studio |
|---------|--------------|----------|-----------|-----------------|------------------------|
| **Primary Use** | LLM Inference | Custom Agents | Agent Orchestration | Low-code Agent Building | Enterprise Self-Hosted |
| **Model Access** | Multiple providers | Bring your own | Any GenAI service | Pre-built models | OCI + Custom |
| **Deployment** | Serverless | Managed | Cloud | SaaS | Self-hosted (OCI) |
| **Cost Model** | Pay-per-**character** (10K chars = 10K transactions) | Per-agent/month | Usage-based | Per-user/month | BYOL (bring your license) |
| **Customization** | Fine-tuning | Full control | Integration layer | Configurable | Full control |
| **Enterprise Ready** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Data Residency** | OCI regions | OCI regions | OCI regions | OCI + SaaS | Your tenancy |
| **SLA** | 99.9% | 99.9% | 99.9% | 99.5% | Your SLA |

## Decision Tree

### 1. What are you building?

**Just need LLM capabilities?**
→ **Oracle GenAI Service**
- Text generation, chat, embeddings
- No agent logic required
- Direct API integration

**Need autonomous agents with tools?**
→ Go to #2

### 2. Who will build and manage agents?

**Enterprise team with ML expertise**
→ **Oracle AI Agent**
- Full control over agent logic
- Custom tool integration
- Production monitoring

**Business users / Citizen developers**
→ **AI Agent Studio**
- Low-code configuration
- Pre-built templates
- Fusion integration

### 3. How many agents? Need orchestration?

**Single agent or few independent agents**
→ AI Agent is sufficient

**Multiple agents that need to collaborate**
→ **Add Agent Hub**
- Agent-to-agent communication
- Shared memory/context
- Workflow orchestration

### 4. Data sovereignty requirements?

**Standard OCI regions acceptable**
→ Use cloud versions above

**Must host in private environment**
→ **Private AI Agent Studio**
- Isolated tenancy
- No data leaves your OCI
- Maximum compliance

## Use Case Examples

### Example 1: Customer Support Chatbot

```
Requirement: Handle customer inquiries, access knowledge base

Recommended Stack:
├── AI Agent Studio (for rapid prototyping)
│   └── Configure Q&A agent with knowledge base tool
├── Or for production scale:
├── AI Agent (for full control)
│   └── Custom RAG implementation
│   └── Multi-turn conversation management
└── GenAI Service (for LLM backbone)
    └── Embedding generation
    └── Text generation
```

### Example 2: Code Generation for Developers

```
Requirement: AI-assisted coding with Oracle/Grok integration

Recommended Stack:
├── AI Agent
│   └── Custom tool definitions (file system, git, APIs)
├── GenAI Service OR Grok Code-1
│   └── Model serving
└── OpenCourse Integration
    ├── OpenCode
    ├── Roo Code
    └── Kilo Code
        └── Connect to AI Agent via API
```

### Example 3: Enterprise Document Processing

```
Requirement: Process contracts, extract entities, automate workflows

Recommended Stack:
├── Private AI Agent Studio (data residency)
│   └── All processing stays in tenancy
├── Agent Hub (orchestration)
│   └── Document → Entity Extraction → Approval Workflow
└── GenAI Service
    └── Text analysis
    └── Summarization
```

### Example 4: Multi-Agent Research Team

```
Requirement: Research, analyze, and report on market data

Recommended Stack:
├── Agent Hub
│   └── Orchestrate agent collaboration
├── AI Agent × 3
│   ├── Researcher Agent (web search, APIs)
│   ├── Analyzer Agent (data processing)
│   └── Writer Agent (report generation)
└── GenAI Service
    └── All agents use shared LLM backbone
```

## Integration Patterns

### Pattern 1: Direct API (Simplest)

```
Application → GenAI Service API
```

**When**: Simple LLM integration, no agent complexity
**Pros**: Easy, serverless, pay-per-use
**Cons**: No autonomous behavior

### Pattern 2: Agent with Tools

```
Application → AI Agent → Tools + GenAI Service
```

**When**: Autonomous behavior needed, custom tools
**Pros**: Full control, extensible
**Cons**: More complex to build

### Pattern 3: Orchestrated Multi-Agent

```
Agent Hub → AI Agent 1 → AI Agent 2 → AI Agent 3
                ↓              ↓
            GenAI Service   GenAI Service
```

**When**: Complex workflows, multiple specialized agents
**Pros**: Handles complexity, reusable agents
**Cons**: Highest complexity

### Pattern 4: Enterprise Private Deployment

```
Private Network → Private AI Agent Studio → OCI Services (restricted)
```

**When**: Maximum security/compliance required
**Pros**: Complete control, data never leaves
**Cons**: Highest operational overhead

## Pricing Considerations

| Service | Entry Price | Scale Price |
|---------|-------------|-------------|
| GenAI Service | $0.001/1K tokens (text generation) | Volume discounts available |
| AI Agent | $500/agent/month (basic) | $2,000/agent/month (enterprise) |
| Agent Hub | $200/month | Usage-based overages |
| AI Agent Studio | $1,000/month (per tenant) | Per-user pricing available |
| Private AI Agent Studio | BYOL | Infrastructure costs only |

## Migration Paths

```
Start Simple → Scale Up → Enterprise

GenAI Service → AI Agent → Agent Hub → Private Studio
   (API)        (Custom)  (Orchestrated)  (Self-hosted)
```

## Recommendations

| Team Size | Experience Level | Recommended Starting Point |
|-----------|------------------|---------------------------|
| 1-5 developers | Beginner | GenAI Service → AI Agent Studio |
| 5-20 developers | Intermediate | AI Agent → GenAI Service |
| 20+ developers | Advanced | AI Agent + Agent Hub |
| Enterprise | Any | Private AI Agent Studio + Agent Hub |

## Quick Reference

**Use GenAI Service when:**
- ✅ Simple text generation/chat
- ✅ No autonomous agent needed
- ✅ Pay-per-use model preferred
- ✅ Rapid prototyping

**Use AI Agent when:**
- ✅ Need autonomous decision-making
- ✅ Custom tool integration required
- ✅ Production-grade agents needed
- ✅ Full control over agent logic

**Use Agent Hub when:**
- ✅ Multiple agents must work together
- ✅ Complex workflow orchestration
- ✅ Agent reusability is important
- ✅ Shared context/memory needed

**Use AI Agent Studio when:**
- ✅ Citizen developers building agents
- ✅ Rapid time-to-value
- ✅ Fusion integration needed
- ✅ Limited ML expertise

**Use Private AI Agent Studio when:**
- ✅ Maximum security/compliance
- ✅ Data cannot leave environment
- ✅ Custom infrastructure requirements
- ✅ Bring-your-own-model required

---

## Pricing Note

> **Oracle GenAI Pricing**: Oracle charges per CHARACTER, not per token. For on-demand inference:
> - Chat models: (prompt_length + response_length) in characters
> - Embedding models: input_length in characters
> - 10,000 characters = 10,000 transactions
> - See: https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm

---

*Last Updated: January 2026*
*FrankX AI Practice - Oracle AI Center of Excellence*
