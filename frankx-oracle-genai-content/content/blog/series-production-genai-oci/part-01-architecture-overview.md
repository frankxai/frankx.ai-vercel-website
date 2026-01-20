# Production-Ready GenAI on Oracle Cloud Infrastructure: Part 1 - Architecture Overview

## The Six-Plane Production Model for Enterprise AI Systems

> **⚠️ Important Pricing Note**: Oracle GenAI charges **per character**, not per token. 10,000 characters = 10,000 transactions. See [Oracle Pricing Documentation](https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm).

Building production-grade LLM and AI Agent systems requires a fundamentally different approach than prototyping. While demos can be spun up in hours, production systems demand careful architectural decisions across multiple dimensions. This seven-part series guides you through building enterprise-grade GenAI systems on Oracle Cloud Infrastructure (OCI), drawing from the comprehensive analysis of Oracle's AI ecosystem.

---

## Introduction: Why Architecture Matters

The gap between a working prototype and a production-ready GenAI system is vast. A prototype might connect to an LLM API and return responses. A production system must handle:

- **Security**: Authentication, authorization, data protection
- **Observability**: Monitoring, logging, tracing, cost tracking
- **Reliability**: Error handling, retries, fallbacks
- **Scalability**: Variable load, concurrent requests
- **Governance**: Compliance, audit trails, cost governance

Oracle's architecture team has identified a **six-plane model** that separates concerns and enables independent evolution of each layer. This model has proven effective across enterprise deployments and forms the foundation of this series.

---

## The Six-Plane Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      EXPERIENCE PLANE                                │
│   User Interfaces: Web, Mobile, API, IDE Plugins, Voice, CLI        │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   INGRESS & POLICY PLANE                             │
│   Authentication, Authorization, Rate Limiting, Content Filtering    │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   ORCHESTRATION PLANE                                │
│   Agent Management, Workflow Engine, State Management, Memory        │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  DATA & RETRIEVAL PLANE                              │
│   Vector Database, RAG Pipeline, Knowledge Base, Document Processing │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        MODEL PLANE                                   │
│   LLM Inference, Fine-tuning, Embeddings, Model Serving              │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                OPERATIONS & GOVERNANCE PLANE                         │
│   Observability, Logging, Cost Management, Security, Compliance      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Plane 1: Experience Plane

The Experience Plane encompasses all user interaction points with your GenAI system.

### Key Components

| Component | Description | Oracle Service |
|-----------|-------------|----------------|
| **Web UI** | React/Next.js applications | OCI Compute + Load Balancing |
| **Mobile** | iOS/Android applications | OCI API Gateway |
| **API** | REST/GraphQL endpoints | OCI API Gateway + Functions |
| **IDE Plugins** | VS Code, IntelliJ extensions | Custom development |
| **Voice** | Speech-to-text and back | OCI Speech AI |
| **CLI** | Command-line tools | Python/Node.js SDKs |

### Best Practices

**API-First Design**: Every GenAI capability should be exposed via API first. User interfaces consume these APIs.

```typescript
// RECOMMENDED: Structured API with clear contracts
interface GenAIAPI {
  // Single endpoint with structured request/response
  chat(request: ChatRequest): Promise<ChatResponse>;
  
  // Streaming for real-time response
  streamChat(request: ChatRequest): AsyncIterator<StreamChunk>;
  
  // Batch operations for high throughput
  batchProcess(requests: ChatRequest[]): Promise<BatchResponse[]>;
  
  // Health check for monitoring
  health(): Promise<HealthStatus>;
}

interface ChatRequest {
  messages: Message[];
  model: string;
  parameters: GenerationParameters;
  context?: RequestContext;
}

interface ChatResponse {
  content: string;
  usage: TokenUsage;
  metadata: ResponseMetadata;
}
```

---

## Plane 2: Ingress & Policy Plane

The Ingress & Policy Plane secures and controls access to your GenAI system.

### Key Components

| Component | Purpose | OCI Service |
|-----------|---------|-------------|
| **Authentication** | Verify identity | OCI IAM + Identity Domains |
| **Authorization** | Control access | OCI IAM Policies |
| **Rate Limiting** | Prevent abuse | OCI API Gateway |
| **Content Filtering** | Safety checks | Custom + OCI Content Moderation |
| **TLS Termination** | Encryption | OCI Load Balancer |

### OCI Authentication Patterns

```python
# OCI Native Authentication Patterns

# 1. Resource Principal (for OCI services)
from oci.auth import signers

signer = signers.ResourcePrincipalSigner()

# 2. Instance Principal (for compute instances)
signer = signers.InstancePrincipalsSecurityTokenSigner()

# 3. API Key (for development)
signer = oci.auth.signers.BasicSigner(
    user=user_id,
    tenancy=tenancy_id,
    fingerprint=fingerprint,
    private_key=private_key
)

# 4. Delegated Authentication (for federated users)
from oci.identity import IdentityClient

auth = oci.auth.AuthDetails(
    federation_endpoint="https://idcs-xxx.identity.oraclecloud.com"
)
```

### Rate Limiting Implementation

```python
from datetime import datetime, timedelta
from collections import defaultdict
import asyncio

class TokenBucketRateLimiter:
    """Production-grade rate limiter with OCI pricing awareness"""
    
    def __init__(self, requests_per_minute: int = 100):
        self.capacity = requests_per_minute
        self.tokens = requests_per_minute
        self.last_update = datetime.utcnow()
        self.rate_per_second = requests_per_minute / 60
        
    async def acquire(self):
        now = datetime.utcnow()
        elapsed = (now - self.last_update).total_seconds()
        
        # Refill tokens
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate_per_second)
        self.last_update = now
        
        if self.tokens < 1:
            wait_time = (1 - self.tokens) / self.rate_per_second
            await asyncio.sleep(wait_time)
            self.tokens -= 1
        else:
            self.tokens -= 1

# OCI-specific rate limits by tier
OCI_RATE_LIMITS = {
    "genai-service": {
        "free_tier": {"rpm": 60, "tpm": 100000},
        "standard": {"rpm": 600, "tpm": 1000000},
        "enterprise": {"rpm": 6000, "tpm": 10000000}
    }
}
```

---

## Plane 3: Orchestration Plane

The Orchestration Plane manages agent lifecycles and workflow execution.

### Two Production Paths

| Path | When to Use | Complexity |
|------|-------------|------------|
| **Path A: Managed Agents** | OCI AI Agent Platform for most use cases | Medium |
| **Path B: Framework Agents** | LangGraph + OCI GenAI for full control | High |

### Orchestration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Agent       │  │  Workflow    │  │  Memory & State      │  │
│  │  Registry    │  │  Engine      │  │  Management          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Tool        │  │  Routing &   │  │  Error Handling      │  │
│  │  Registry    │  │  Fallback    │  │  & Retry             │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OCI SERVICES                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ AI Agent     │  │ Agent Hub    │  │  ADK (Python/Java)   │  │
│  │ Platform     │  │ (Preview)    │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Implementation with OCI ADK

```python
# OCI Agent Development Kit (ADK) Example
from oci.generative_ai import GenerativeAiClient
from oci.generative_ai.adk import Agent, Tool, Conversation

class DataAnalysisAgent:
    """Production agent with OCI ADK"""
    
    def __init__(self, compartment_id: str):
        self.client = GenerativeAiClient(config=oci.config.from_file())
        self.compartment_id = compartment_id
        self.tools = self._setup_tools()
        
    def _setup_tools(self) -> list[Tool]:
        """Configure agent tools"""
        return [
            Tool(
                name="sql_query",
                description="Execute SQL query on database",
                function=self._execute_sql,
                parameters={
                    "type": "object",
                    "properties": {
                        "query": {"type": "string"}
                    },
                    "required": ["query"]
                }
            ),
            Tool(
                name="calculate",
                description="Perform mathematical calculations",
                function=self._calculate,
                parameters={
                    "type": "object",
                    "properties": {
                        "expression": {"type": "string"}
                    },
                    "required": ["expression"]
                }
            )
        ]
        
    async def chat(self, message: str) -> str:
        """Process user message through agent"""
        agent = Agent(
            client=self.client,
            compartment_id=self.compartment_id,
            model_id="cohere.command-r-plus",
            tools=self.tools,
            system_prompt="""You are a data analysis assistant.
            Use tools to answer questions accurately.
            Always cite your sources and explain your reasoning."""
        )
        
        response = await agent.chat(message)
        return response.text
```

---

## Plane 4: Data & Retrieval Plane

The Data & Retrieval Plane handles RAG pipelines and knowledge management.

### RAG Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      RAG PIPELINE                               │
│                                                                 │
│  ┌──────────┐    ┌──────────────┐    ┌─────────────────────┐   │
│  │ Documents │───▶│   Ingestion  │───▶│  Vector Database    │   │
│  │ (Source)  │    │   Pipeline   │    │  (OCI Vector DB)    │   │
│  └──────────┘    └──────────────┘    └──────────┬──────────┘   │
│                                                  │              │
│  ┌──────────┐    ┌──────────────┐    ┌──────────▼──────────┐   │
│  │  Query   │───▶│  Retrieval   │───▶│   Re-ranking        │   │
│  │          │    │   (Hybrid)   │    │   (Cross-encoder)   │   │
│  └──────────┘    └──────────────┘    └──────────┬──────────┘   │
│                                                  │              │
└──────────────────────────────────────────────────│──────────────┘
                                                   ▼
                                          ┌─────────────────┐
                                          │  Context        │
                                          │  Enrichment     │
                                          └─────────────────┘
```

### Hybrid Search Implementation

```python
from oci.generative_ai import GenerativeAiClient
from oci.generative_ai.models import EmbeddingRequest
from typing import List, Dict
import numpy as np

class OCIVectorStore:
    """OCI-native vector storage with hybrid search"""
    
    def __init__(self, oci_client: GenerativeAiClient, 
                 embedding_model: str = "cohere.embed-english-v3.0"):
        self.client = oci_client
        self.embedding_model = embedding_model
        self.index = {}  # In production, use OCI Vector DB
        
    async def embed_text(self, texts: List[str]) -> np.ndarray:
        """Generate embeddings using OCI GenAI"""
        request = EmbeddingRequest(
            inputs=texts,
            model_id=self.embedding_model,
            truncate="END"
        )
        
        response = self.client.generate_embeddings(
            embedding_details=request,
            compartment_id=self._get_compartment()
        )
        
        return np.array(response.data.embeddings)
    
    async def hybrid_search(self, query: str, 
                           top_k: int = 10) -> List[Dict]:
        """Hybrid search: keyword + semantic"""
        # Semantic search
        query_embedding = await self.embed_text([query])
        
        # Calculate similarities
        results = []
        for doc_id, doc in self.index.items():
            similarity = np.dot(
                query_embedding[0], 
                doc["embedding"]
            ) / (np.linalg.norm(query_embedding[0]) * 
                 np.linalg.norm(doc["embedding"]))
            results.append({
                "id": doc_id,
                "content": doc["content"],
                "metadata": doc["metadata"],
                "semantic_score": similarity
            })
        
        # Sort by semantic score
        results.sort(key=lambda x: x["semantic_score"], reverse=True)
        return results[:top_k]
```

---

## Plane 5: Model Plane

The Model Plane manages LLM inference and model serving.

### Model Selection Matrix

| Use Case | Recommended Model | Context Window | Strengths |
|----------|-------------------|----------------|-----------|
| **General Chat** | Cohere Command R+ | 128K | Balanced performance & cost |
| **Code Generation** | Meta Llama 4 70B | 128K | Best for code tasks |
| **Reasoning** | OpenAI GPT-4o | 128K | Complex reasoning |
| **Embeddings** | Cohere Embed v3 | N/A | Multilingual, high quality |
| **Fast/Cheap** | Cohere Command | 4K | Cost-optimized tasks |

### Model Gateway Pattern

```python
from abc import ABC, abstractmethod
from typing import Union, Dict, Any
import oci

class ModelGateway:
    """Unified interface for multiple LLM providers"""
    
    MODELS = {
        "cohere.command-r-plus-08-2024": {
            "provider": "oci",
            "context_window": 128000,
            "cost_per_10k_chars": 0.015
        },
        "meta.llama-3.3-70b-instruct": {
            "provider": "oci", 
            "context_window": 128000,
            "cost_per_10k_chars": 0.025
        },
        "grok-code-1": {
            "provider": "xai",
            "context_window": 131072,
            "cost_per_10k_chars": 0.02
        }
    }
    
    def __init__(self):
        self.oci_client = oci.generative_ai.GenerativeAiClient(
            oci.config.from_file()
        )
        
    async def complete(self, model_id: str, prompt: str,
                      **kwargs) -> Dict[str, Any]:
        """Route request to appropriate model"""
        if model_id not in self.MODELS:
            raise ValueError(f"Unknown model: {model_id}")
            
        model_info = self.MODELS[model_id]
        
        if model_info["provider"] == "oci":
            return await self._oci_complete(model_id, prompt, **kwargs)
        elif model_info["provider"] == "xai":
            return await self._xai_complete(model_id, prompt, **kwargs)
```

---

## Plane 6: Operations & Governance Plane

The Operations & Governance Plane ensures observability, security, and compliance.

### Observability Implementation

```python
import logging
from datetime import datetime
from typing import Dict, Any
from dataclasses import dataclass

@dataclass
class TelemetryEvent:
    timestamp: datetime
    event_type: str
    model: str
    input_tokens: int
    output_tokens: int
    latency_ms: float
    cost_usd: float
    status: str
    metadata: Dict[str, Any]

class OCIobservability:
    """Production observability for OCI GenAI"""
    
    def __init__(self, service_name: str):
        self.service_name = service_name
        self.logger = logging.getLogger(service_name)
        
    def log_event(self, event: TelemetryEvent):
        """Log to OCI Logging Service"""
        self.logger.info(
            f"{event.event_type} | {event.model} | "
            f"tokens:{event.input_tokens}+{event.output_tokens} | "
            f"latency:{event.latency_ms}ms | "
            f"cost:${event.cost_usd:.4f} | "
            f"status:{event.status}"
        )
        
    def record_metrics(self, event: TelemetryEvent):
        """Record to OCI Monitoring"""
        # Implementation for OCI Metrics
        pass
```

---

## Decision Framework: Which Oracle AI Service?

| Requirement | Recommended Service | Alternative |
|-------------|---------------------|-------------|
| Simple LLM API calls | GenAI Service | - |
| Custom agent with tools | AI Agent Platform | LangGraph + GenAI |
| Multi-agent orchestration | Agent Hub + AI Agent | Custom orchestration |
| Low-code agent building | AI Agent Studio | - |
| Maximum data residency | Private AI Agent Studio | - |
| Open-source flexibility | GenAI Service + LangChain | Self-hosted |

---

## Quick Start: Minimal Deployable Baseline

```bash
# 1. Create OCI configuration
oci setup config

# 2. Install dependencies
pip install oci langchain faiss-cpu

# 3. Clone reference implementation
git clone https://github.com/oracle/oci-genai-samples.git
cd oci-genai-samples/baseline/

# 4. Configure environment
cp .env.example .env
# Edit .env with your OCI credentials

# 5. Deploy
python deploy.py --stack baseline --region us-phoenix-1
```

---

## What's Next

In **Part 2** of this series, we'll dive deep into the OCI GenAI Service:
- Model selection and pricing (per-character billing)
- API integration patterns
- Fine-tuning and custom models
- Cost optimization strategies

---

## Resources

- [Oracle GenAI Documentation](https://docs.oracle.com/en-us/iaas/generative-ai/)
- [OCI AI Agent Platform](https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/overview.htm)
- [LangChain OCI Integration](https://github.com/oracle-devrel/langchain-oci-genai)
- [Open Agent Specification](https://github.com/oracle/agent-spec)

---

*This article is part of FrankX's "Production-Ready GenAI on Oracle Cloud Infrastructure" series. For the complete series, code samples, and workshops, visit our [GitHub repository](https://github.com/frankx-ai-coe/oracle-genai-guides).*
