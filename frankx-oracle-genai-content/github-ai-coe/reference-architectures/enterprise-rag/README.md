# Enterprise RAG Architecture on OCI

## Overview

Reference architecture for production-grade RAG (Retrieval-Augmented Generation) systems on Oracle Cloud Infrastructure.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OCI NETWORK (VCN)                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     PUBLIC SUBNET                                    │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │   │
│  │  │ API Gateway  │  │  Load        │  │  WAF                      │   │   │
│  │  │              │  │  Balancer    │  │                           │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     PRIVATE SUBNET (APP)                            │   │
│  │                                                                       │   │
│  │  ┌──────────────────────────────────────────────────────────────┐    │   │
│  │  │              RAG APPLICATION (OKE/Compute)                   │    │   │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐  │    │   │
│  │  │  │ API Server │  │ Worker     │  │  Orchestrator          │  │    │   │
│  │  │  │ (FastAPI)  │  │ (Celery)   │  │                        │  │    │   │
│  │  │  └────────────┘  └────────────┘  └────────────────────────┘  │    │   │
│  │  │                                                               │    │   │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐  │    │   │
│  │  │  │ Cache      │  │ Session    │  │  Metrics & Logging     │  │    │   │
│  │  │  │ (Redis)    │  │ Store      │  │                        │  │    │   │
│  │  │  └────────────┘  └────────────┘  └────────────────────────┘  │    │   │
│  │  └──────────────────────────────────────────────────────────────┘    │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                  PRIVATE SUBNET (DATA)                              │   │
│  │                                                                       │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────┐ │   │
│  │  │ Autonomous     │  │ Object Storage │  │  OCI Vector DB         │ │   │
│  │  │ Database       │  │ (Documents)    │  │  (Embeddings)          │ │   │
│  │  │ (Select AI)    │  │                │  │                        │ │   │
│  │  └────────────────┘  └────────────────┘  └────────────────────────┘ │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Components

| Component | OCI Service | Purpose |
|-----------|-------------|---------|
| **API Gateway** | API Gateway | API management, auth, rate limiting |
| **WAF** | Web Application Firewall | Security, threat protection |
| **Application** | OKE/Compute | Application deployment |
| **API Server** | FastAPI | REST API endpoints |
| **Workers** | Celery/OKE | Async document processing |
| **Cache** | Redis (OCI Cache) | Response caching |
| **Database** | Autonomous Database | Structured data, SQL |
| **Object Storage** | Object Storage | Document storage |
| **Vector DB** | OCI Vector DB | Embedding storage and search |

## Getting Started

### Prerequisites

- OCI account with GenAI Service enabled
- OCI CLI configured
- kubectl configured for OKE
- Terraform >= 1.5

### Deployment

```bash
# Clone the repository
git clone https://github.com/frankx-ai-coe/oracle-genai-guides.git
cd oracle-genai-guides/reference-architectures/enterprise-rag

# Configure Terraform
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
# Edit terraform.tfvars with your values

# Initialize Terraform
cd terraform
terraform init

# Plan deployment
terraform plan

# Apply
terraform apply

# Deploy application
cd ../application
kubectl apply -f k8s/
```

### Configuration

```yaml
# config.yaml
rag:
  embedding:
    model: "cohere.embed-english-v3.0"
    dimensions: 1024
  
  generation:
    model: "cohere.command-r-plus"
    temperature: 0.3
    max_tokens: 2048
  
  retrieval:
    top_k: 10
    rerank_enabled: true
    
  chunking:
    chunk_size: 1000
    chunk_overlap: 200

oci:
  region: "us-phoenix-1"
  compartment_id: "ocid1.compartment..."
  
  # Authentication
  auth:
    type: "resource_principal"  # or "api_key"
```

## Usage

### Ingest Documents

```bash
# Ingest PDF documents
curl -X POST "http://api.example.com/v1/documents" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@document.pdf" \
  -F "metadata={\"source\": \"manual\", \"department\": \"legal\"}"

# Ingest from URL
curl -X POST "http://api.example.com/v1/documents/url" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"url": "https://example.com/doc.pdf"}'
```

### Query

```bash
# Simple query
curl -X POST "http://api.example.com/v1/query" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What are the key compliance requirements?",
    "context_filter": {
      "sources": ["legal", "hr"]
    },
    "config": {
      "temperature": 0.7,
      "stream": false
    }
  }'
```

## Monitoring

### Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| query_latency_ms | Query response time | < 2s |
| retrieval_relevance | RAG relevance score | > 0.8 |
| cost_per_query | Cost optimization | < $0.01 |
| uptime | System availability | > 99.9% |

### Dashboards

- **Grafana**: `oci-genai-rag-dashboard`
- **OCI Monitoring**: Custom metrics for retrieval, generation, costs

## Cost Optimization

### Strategies

1. **Embedding Optimization**
   - Batch embed requests
   - Cache frequent queries
   - Use smaller models for simple tasks

2. **Retrieval Optimization**
   - Implement query caching
   - Use hybrid search selectively
   - Limit context window size

3. **Generation Optimization**
   - Implement response caching
   - Use lower temperature for simpler tasks
   - Batch similar requests

### Cost Tracking

```python
from oci.monitoring import MonitoringClient

class CostTracker:
    def __init__(self, compartment_id: str):
        self.client = MonitoringClient(oci.config.from_file())
        self.compartment_id = compartment_id
        
    def track_cost(self, model: str, tokens: int, cost: float):
        """Record cost to OCI Monitoring"""
        oci.metrics.create_metric_data(
            metric_data=[{
                "metric_name": "genai_cost_usd",
                "value": cost,
                "dimensions": {
                    "compartment": self.compartment_id,
                    "model": model
                }
            }]
        )
```

## Security

### Authentication Options

- **API Key**: For simple deployments
- **OCI IAM**: For enterprise deployments
- **Resource Principal**: For OCI-native services

### Network Security

- Private subnets for data layers
- VCN security lists
- Service gateway for OCI services
- WAF for public endpoints

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Slow queries | Check embedding latency, optimize chunking |
| Poor relevance | Increase top_k, improve chunking strategy |
| High costs | Implement caching, use cheaper models |
| 429 errors | Implement rate limiting, backoff |

## Next Steps

1. **Add hybrid search** with keyword matching
2. **Implement multi-modal** document processing
3. **Add evaluation pipeline** for RAG quality
4. **Scale horizontally** with OKE autoscaling

---

## Pricing Note

> **Oracle GenAI Pricing**: Oracle charges per CHARACTER, not per token. For on-demand inference:
> - Chat models: (prompt_length + response_length) in characters
> - Embedding models: input_length in characters
> - 10,000 characters = 10,000 transactions
> - See: https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm

---

*Reference architecture maintained by FrankX AI CoE*
*Version: 1.0 | Compatible with OCI GenAI Service*
