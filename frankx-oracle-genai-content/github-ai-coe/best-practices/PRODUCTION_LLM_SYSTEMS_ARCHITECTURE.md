# Production LLM & Agent Systems Architecture Guide

## AI CoE Best Practices for Oracle Cloud Infrastructure

**Version**: 1.0 | **Last Updated**: January 2026 | **Status**: Authoritative Reference

---

## Executive Summary

This guide provides enterprise architects and engineering teams with authoritative best practices for building production-grade LLM and AI Agent systems on Oracle Cloud Infrastructure (OCI). Based on analysis of Oracle's official documentation, technology-engineering GitHub repositories, and production deployment patterns, this document synthesizes guidance across three key Oracle GitHub organizations:

- **Oracle Technology Engineering** - Reference architectures and implementation patterns
- **Oracle Developer Relations** - Samples, quickstarts, and code examples  
- **Oracle AI** - Official AI service implementations and SDKs

> **Key Finding**: Oracle's GenAI ecosystem spans multiple services (GenAI Service, AI Agent, Agent Hub, AI Agent Studio, Private AI Agent Studio). This guide helps you navigate when to use each.

---

## Architecture Overview: The Six-Plane Production Model

Production GenAI systems require careful separation of concerns across six architectural planes:

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

## Plane-by-Plane Best Practices

### 1. Experience Plane

**Purpose**: User interaction points and API boundaries

**Best Practices**:

#### API Design
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

#### IDE Integration (OpenCourse Agents)
```yaml
# OpenCode Configuration for Oracle GenAI
mcpServers:
  oracle-genai:
    command: npx
    args: ["-y", "@oracle/mcp-server-genai"]
    env:
      OCI_CONFIG_FILE: ~/.oci/config
      OCI_REGION: us-phoenix-1
```

### 2. Ingress & Policy Plane

**Purpose**: Security, rate limiting, and access control

**Best Practices**:

#### Authentication Patterns
```python
# OCI Native Authentication
from oci.auth import signers

# Resource Principal (for OCI services)
signer = signers.ResourcePrincipalSigner()

# Instance Principal (for compute instances)
signer = signers.InstancePrincipalsSecurityTokenSigner()

# API Key (for development)
signer = oci.auth.signers.BasicSigner(
    user=user_id,
    tenancy=tenancy_id,
    fingerprint=fingerprint,
    private_key=private_key
)
```

#### Rate Limiting Implementation
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
        "free_tier": {"rpm": 60, "cpm": 100000},
        "standard": {"rpm": 600, "cpm": 1000000},
        "enterprise": {"rpm": 6000, "cpm": 10000000}
    }
}
```

#### Content Filtering
```python
class ContentSafetyFilter:
    """OCI Content Moderation integration"""
    
    def __init__(self, oci_client):
        self.client = oci_client
        
    async def filter_request(self, request: ChatRequest) -> FilterResult:
        """Filter input for policy compliance"""
        violations = []
        
        for message in request.messages:
            safety_result = await self._check_safety(message.content)
            if not safety_result.is_safe:
                violations.append(safety_result.violations)
                
        return FilterResult(
            is_safe=len(violations) == 0,
            violations=violations,
            action="block" if violations else "allow"
        )
```

### 3. Orchestration Plane

**Purpose**: Agent management and workflow coordination

**Best Practices**:

#### Agent Architecture Decision Tree

```
What type of agent system do you need?
│
├─ Simple single-agent workflow
│  └─ Use: OCI AI Agent Platform (managed)
│
├─ Complex multi-agent collaboration
│  └─ Use: Agent Hub + AI Agent Platform
│
├─ Full customization required
│  └─ Use: LangGraph + OCI GenAI Service
│
└─ Enterprise with custom infrastructure
   └─ Use: Private AI Agent Studio
```

#### Multi-Agent Orchestration Pattern
```python
from abc import ABC, abstractmethod
from typing import Dict, List, Any
from enum import Enum

class AgentRole(Enum):
    RESEARCHER = "researcher"
    ANALYZER = "analyzer"
    WRITER = "writer"
    REVIEWER = "reviewer"

class AgentMessage:
    def __init__(self, from_agent: str, to_agent: str, 
                 content: Any, metadata: Dict = None):
        self.from_agent = from_agent
        self.to_agent = to_agent
        self.content = content
        self.metadata = metadata or {}
        self.timestamp = datetime.utcnow()

class BaseAgent(ABC):
    def __init__(self, name: str, role: AgentRole, 
                 genai_client, system_prompt: str):
        self.name = name
        self.role = role
        self.client = genai_client
        self.system_prompt = system_prompt
        self.memory = []
        
    @abstractmethod
    def process(self, message: AgentMessage) -> AgentMessage:
        """Agent-specific processing logic"""
        pass
    
    async def send_message(self, to_agent: 'BaseAgent', 
                          content: Any, metadata: Dict = None):
        """Send message to another agent"""
        message = AgentMessage(
            from_agent=self.name,
            to_agent=to_agent.name,
            content=content,
            metadata=metadata
        )
        response = await to_agent.process(message)
        return response

class OrchestratedAgentTeam:
    """Manages multi-agent workflows with Agent Hub pattern"""
    
    def __init__(self):
        self.agents: Dict[str, BaseAgent] = {}
        self.message_queue: List[AgentMessage] = []
        self.workflow_state: Dict[str, Any] = {}
        
    def add_agent(self, agent: BaseAgent):
        self.agents[agent.name] = agent
        
    async def execute_workflow(self, task: str, 
                              initial_context: Dict = None) -> Dict:
        """Execute multi-agent workflow"""
        self.workflow_state = initial_context or {}
        
        # Phase 1: Research
        researcher = self.agents["researcher"]
        research_result = await researcher.process(
            AgentMessage("user", "researcher", task)
        )
        self.workflow_state["research"] = research_result.content
        
        # Phase 2: Analyze
        analyzer = self.agents["analyzer"]
        analysis_result = await analyzer.process(
            AgentMessage("researcher", "analyzer", research_result.content)
        )
        self.workflow_state["analysis"] = analysis_result.content
        
        # Phase 3: Write
        writer = self.agents["writer"]
        draft_result = await writer.process(
            AgentMessage("analyzer", "writer", analysis_result.content)
        )
        self.workflow_state["draft"] = draft_result.content
        
        # Phase 4: Review
        reviewer = self.agents["reviewer"]
        final_result = await reviewer.process(
            AgentMessage("writer", "reviewer", draft_result.content)
        )
        self.workflow_state["final"] = final_result.content
        
        return self.workflow_state
```

### 4. Data & Retrieval Plane

**Purpose**: RAG pipelines and knowledge management

**Best Practices**:

#### RAG Architecture
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

#### RAG Implementation
```python
from oci.generative_ai_inference import GenerativeAiInferenceClient
from oci.generative_ai_inference.models import EmbeddingRequest
from typing import List, Dict
import numpy as np

class OCIVectorStore:
    """OCI-native vector storage with hybrid search"""
    
    def __init__(self, oci_client: GenerativeAiInferenceClient, 
                 embedding_model: str = "cohere.embed-v4.0"):
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
    
    async def add_documents(self, documents: List[Dict]):
        """Ingest documents with embeddings"""
        texts = [doc["content"] for doc in documents]
        embeddings = await self.embed_text(texts)
        
        for i, doc in enumerate(documents):
            self.index[doc["id"]] = {
                "content": doc["content"],
                "embedding": embeddings[i],
                "metadata": doc.get("metadata", {}),
                "chunks": doc.get("chunks", [])
            }
    
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

class RAGPipeline:
    """Production RAG pipeline with OCI GenAI"""
    
    def __init__(self, vector_store: OCIVectorStore,
                 genai_client: GenerativeAiClient):
        self.vector_store = vector_store
        self.genai = genai_client
        
    async def query(self, question: str, 
                   system_prompt: str = None) -> str:
        """Execute RAG query"""
        # Step 1: Retrieve relevant documents
        retrieved_docs = await self.vector_store.hybrid_search(
            question, top_k=5
        )
        
        # Step 2: Build context
        context = "\n\n".join([
            f"[Document {i+1}] {doc['content']}"
            for i, doc in enumerate(retrieved_docs)
        ])
        
        # Step 3: Generate response
        prompt = f"""Based on the following context, answer the question.
If the answer cannot be found in the context, say "I don't have enough information."

Context:
{context}

Question: {question}

Answer:"""
        
        response = await self.genai.chat(
            message=prompt,
            temperature=0.3,
            max_tokens=2048
        )
        
        return {
            "answer": response,
            "sources": [doc["id"] for doc in retrieved_docs],
            "retrieved_count": len(retrieved_docs)
        }
```

### 5. Model Plane

**Purpose**: LLM inference and model management

**Best Practices**:

#### Model Selection Matrix

| Use Case | Recommended Model | Context Window | Strengths |
|----------|-------------------|----------------|-----------|
| **General Chat** | Cohere Command R+ 08-2024 | 128K | Balanced performance & cost |
| **Code Generation** | Meta Llama 3.3 70B | 128K | Best for code tasks |
| **Reasoning** | OpenAI GPT-4o | 128K | Complex reasoning |
| **Embeddings** | Cohere Embed v4.0 | N/A | Multilingual, high quality |
| **Fast/Cheap** | Cohere Command R 08-2024 | 128K | Cost-optimized tasks |

#### Model Gateway Pattern
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
        self.oci_client = oci.generative_ai_inference.GenerativeAiInferenceClient(
            oci.config.from_file()
        )
        self.model_cache = {}
        
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
            
    async def _oci_complete(self, model_id: str, prompt: str,
                           temperature: float = 0.7,
                           max_tokens: int = 2048) -> Dict[str, Any]:
        """OCI GenAI completion"""
        from oci.generative_ai_inference.models import (
            CohereChatRequest,
            GenericChatRequest,
            OnDemandServingMode,
        )
        
        # Use appropriate request type based on model
        if "cohere" in model_id:
            request = CohereChatRequest(
                message=prompt,
                temperature=temperature,
            )
        else:
            request = GenericChatRequest(
                message=prompt,
                temperature=temperature,
            )
        
        response = self.client.chat(
            chat_details=request,
            compartment_id=oci.config.from_file()["tenancy"],
            serving_mode=OnDemandServingMode(model_id=model_id)
        )
        
        return {
            "content": response.data.text,
            "model": model_id,
            "usage": response.data.usage
        }
        
    def estimate_cost(self, model_id: str, 
                     input_chars: int, 
                     output_chars: int) -> float:
        """Estimate cost for a request - PER CHARACTER"""
        rate = self.MODELS[model_id]["cost_per_10k_chars"]
        total_chars = input_chars + output_chars
        return (total_chars / 10000) * rate
```

### 6. Operations & Governance Plane

**Purpose**: Observability, security, and compliance

**Best Practices**:

#### Comprehensive Observability
```python
import logging
from datetime import datetime
from typing import Dict, Any
from dataclasses import dataclass
from enum import Enum

class LogLevel(Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"

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
        
        # OCI Logging integration
        self.logs_client = oci.loggingingestion.LoggingClient(
            oci.config.from_file()
        )
        
        # OCI Monitoring
        self.metrics_client = oci.monitoring.MonitoringClient(
            oci.config.from_file()
        )
        
    def log_event(self, event: TelemetryEvent):
        """Log to OCI Logging Service"""
        log_entry = oci.loggingingestion.LogEntry(
            timestamp=event.timestamp,
            content=f"{event.event_type} | {event.model} | " +
                   f"tokens:{event.input_tokens}+{event.output_tokens} | " +
                   f"latency:{event.latency_ms}ms | " +
                   f"cost:${event.cost_usd:.4f} | " +
                   f"status:{event.status}"
        )
        
        self.logs_client.put_log(
            log_entries=[log_entry],
            log_group_id=self._get_log_group_id(),
            log_id=self._get_log_id()
        )
        
    def record_metrics(self, event: TelemetryEvent):
        """Record to OCI Monitoring"""
        # Request count
        oci.metrics.create_metric_data(
            metric_data=[{
                "metric_name": "genai_requests",
                "value": 1,
                "dimensions": {
                    "service": self.service_name,
                    "model": event.model,
                    "status": event.status
                }
            }]
        )
        
        # Token usage
        oci.metrics.create_metric_data(
            metric_data=[{
                "metric_name": "genai_tokens",
                "value": event.input_tokens + event.output_tokens,
                "dimensions": {
                    "service": self.service_name,
                    "model": event.model
                }
            }]
        )
        
        # Latency
        oci.metrics.create_metric_data(
            metric_data=[{
                "metric_name": "genai_latency_ms",
                "value": event.latency_ms,
                "dimensions": {
                    "service": self.service_name,
                    "model": event.model
                }
            }]
        )
        
        # Cost
        oci.metrics.create_metric_data(
            metric_data=[{
                "metric_name": "genai_cost_usd",
                "value": event.cost_usd,
                "dimensions": {
                    "service": self.service_name,
                    "model": event.model
                }
            }]
        )
```

#### Cost Governance
```python
class CostGovernance:
    """Budget and cost management for OCI GenAI"""
    
    def __init__(self, monthly_budget_usd: float):
        self.budget = monthly_budget_usd
        self.spent = 0.0
        self.alert_thresholds = [0.5, 0.75, 0.9, 1.0]
        self.alerts_sent = set()
        
    def check_budget(self, estimated_cost: float) -> bool:
        """Check if request is within budget"""
        if self.spent + estimated_cost > self.budget:
            raise BudgetExceededError(
                f"Budget exceeded. Spent: ${self.spent:.2f}, " +
                "Request: ${:.2f}, Budget: ${:.2f}".format(
                    estimated_cost, self.budget
                )
            )
        return True
    
    def record_cost(self, cost: float, model: str):
        """Record actual cost and check alerts"""
        self.spent += cost
        
        spent_percentage = self.spent / self.budget
        
        for threshold in self.alert_thresholds:
            if (spent_percentage >= threshold and 
                threshold not in self.alerts_sent):
                self._send_alert(threshold, spent_percentage, model)
                self.alerts_sent.add(threshold)
                
    def _send_alert(self, threshold: float, 
                    percentage: float, model: str):
        """Send budget alert via OCI Notifications"""
        oci.notifications.create_topic_message(
            topic_id=self._get_alert_topic(),
            message={
                "type": "budget_alert",
                "threshold": f"{threshold * 100:.0f}%",
                "spent": self.spent,
                "budget": self.budget,
                "model": model,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
```

---

## GitHub Repository References

| Repository | Organization | Purpose | URL |
|------------|--------------|---------|-----|
| `oci-cli` | Oracle | OCI CLI tools | github.com/oracle/oci-cli |
| `oci-python-sdk` | Oracle | Python SDK | github.com/oracle/oci-python-sdk |
| `oci-node-sdk` | Oracle | Node.js SDK | github.com/oracle/oci-node-sdk |
| `mcp-server-genai` | Oracle | MCP server for GenAI | github.com/oracle/mcp-server-genai |
| `oci-genai-samples` | Oracle Technology Engineering | Sample implementations | github.com/oracle/oci-genai-samples |
| `oci-ai-agents` | Oracle | AI Agent platform | github.com/oracle/oci-ai-agents |
| `langchain-oci` | Oracle Developer Relations | LangChain integration | github.com/oracle/langchain-oci |

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
| Enterprise SLA | AI Agent Platform | Private Studio |

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

## Pricing Note

> **Oracle GenAI Pricing**: Oracle charges per CHARACTER, not per token. For on-demand inference:
> - Chat models: (prompt_length + response_length) in characters
> - Embedding models: input_length in characters
> - 10,000 characters = 10,000 transactions
> - See: https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm

---

## Next Steps

1. **Start Simple**: Use GenAI Service for initial prototypes
2. **Add Agents**: Migrate to AI Agent Platform for production
3. **Scale**: Add Agent Hub for multi-agent workflows
4. **Optimize**: Implement cost governance and observability

---

*This document is maintained by FrankX AI CoE. For updates, contributions, and feedback, see the [GitHub repository](https://github.com/frankx-ai-coe/oracle-genai-guides).*
