# Oracle AI Center of Excellence (AI CoE) Resource Hub

> Production-grade patterns, reference architectures, and best practices for building LLM and AI Agent systems on Oracle Cloud Infrastructure.

[![OCI](https://img.shields.io/badge/OCI-GenAI-red)](https://www.oracle.com/artificial-intelligence/generative-ai/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## 🎯 What This Repository Provides

This repository is designed to help enterprise teams move from GenAI prototypes to production systems. It includes:

- **Reference Architectures** - Tested patterns for enterprise AI systems
- **Best Practices** - Production-hardened guidelines for security, observability, and governance
- **Code Samples** - Working implementations you can adapt
- **Decision Frameworks** - Clear guidance for choosing the right services and patterns

## 🏗️ Quick Start

### 1. Understand the Architecture

Read the [Production LLM Architecture Guide](best-practices/PRODUCTION_LLM_SYSTEMS_ARCHITECTURE.md) to understand the six-plane model for enterprise GenAI systems.

### 2. Choose Your Agent Pattern

| Need | Recommended Path |
|------|------------------|
| Fast time-to-value, managed infrastructure | [OCI AI Agent Platform](https://docs.oracle.com/en/solutions/deploy-agentic-ai-agent-platform/) |
| Maximum control, custom workflows | [LangGraph + OCI GenAI](https://github.com/oracle/langchain-oracle) |
| Multi-agent orchestration | [Agent Hub](https://blogs.oracle.com/cloud-infrastructure/ai-world-2025-artificial-intelligence) |

### 3. Deploy a Baseline Stack

```bash
# Clone the OCI AI Blueprints
git clone https://github.com/oracle-quickstart/oci-ai-blueprints.git
cd oci-ai-blueprints

# Configure OCI credentials
oci setup config

# Deploy baseline GenAI stack
cd baseline-genai
terraform init
terraform apply
```

### 4. Try the Quickstart CLI

```bash
# Install dependencies
pip install oci langchain-oracle

# Run the quickstart
python QUICKSTART.py setup
python QUICKSTART.py chat --message "What's the weather in San Francisco?"
python QUICKSTART.py models  # List available models
python QUICKSTART.py costs   # Check pricing
```

## 📚 Repository Structure

```
github-ai-coe/
├── README.md                           # This file
├── QUICKSTART.py                       # Interactive CLI for getting started
│
├── best-practices/
│   ├── PRODUCTION_LLM_SYSTEMS_ARCHITECTURE.md  # Six-plane architecture guide
│   ├── security-compliance.md          # Security and compliance patterns
│   └── cost-optimization.md            # Cost management strategies
│
├── reference-architectures/
│   ├── enterprise-rag/                 # RAG at enterprise scale
│   │   ├── README.md
│   │   ├── architecture.png
│   │   └── terraform/
│   ├── multi-agent-system/             # Multi-agent orchestration
│   │   └── README.md
│   └── coding-agent-platform/          # Coding agents on OCI
│       └── README.md
│
├── guides/
│   ├── service-selection-guide.md      # Which OCI AI service to use
│   ├── migration-guide.md              # Moving from other clouds
│   └── team-composition-guide.md       # Building AI CoE teams
│
└── samples/
    ├── oci-genai-quickstart.py         # Basic OCI GenAI usage
    ├── agent-platform-demo/            # Agent Platform examples
    └── rag-pipeline/                   # RAG implementation
```

## 🔧 OCI AI Services Decision Matrix

| Requirement | Service | Notes |
|-------------|---------|-------|
| LLM API access | [OCI GenAI Service](https://docs.oracle.com/en-us/iaas/generative-ai/) | Cohere, Meta, OpenAI, Mistral models |
| Custom agents with tools | [OCI AI Agent Platform](https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/overview.htm) | RAG, SQL, custom tools |
| Multi-agent orchestration | [Agent Hub](https://blogs.oracle.com/cloud-infrastructure/ai-world-2025-artificial-intelligence) | Route across specialized agents |
| Fusion Apps integration | [AI Agent Studio](https://docs.oracle.com/en/cloud/saas/fusion-apps/) | Pre-built Fusion agents |
| Maximum data sovereignty | [Private Agent Factory (DB 26ai)](https://www.oracle.com/database/ai/) | On-premises or sovereign cloud |
| Open-source flexibility | [LangChain + OCI GenAI](https://github.com/oracle/langchain-oracle) | Full control with managed models |

## 📖 Blog Series

This repository accompanies the "Production-Ready GenAI on Oracle Cloud Infrastructure" blog series:

| Part | Title | Focus |
|------|-------|-------|
| [Part 1](../content/blog/series-production-genai-oci/part-01-architecture-overview.md) | Architecture Overview | Six-plane enterprise model |
| [Part 2](../content/blog/series-production-genai-oci/part-02-agent-patterns.md) | Agent Patterns | Managed vs Framework agents |
| [Part 3](../content/blog/series-production-genai-oci/part-03-operating-model.md) | Operating Model | Governance, observability, lifecycle |

## 🔗 Essential Oracle References

### Architecture Center
- [Enterprise GenAI Stack on OCI](https://docs.oracle.com/en/solutions/oci-genai-enterprise/index.html)
- [Agentic AI with OCI AI Agent Platform](https://docs.oracle.com/en/solutions/deploy-agentic-ai-agent-platform/index.html)
- [Select AI + APEX Framework](https://docs.oracle.com/en/solutions/select-ai-apex-framework/index.html)
- [Multicloud GenAI RAG](https://docs.oracle.com/en/solutions/oci-multicloud-genai-rag/index.html)

### GitHub Repositories
| Repository | Purpose |
|------------|---------|
| [oracle/langchain-oracle](https://github.com/oracle/langchain-oracle) | Official LangChain integration |
| [oracle/agent-spec](https://github.com/oracle/agent-spec) | Open Agent Specification |
| [oracle-quickstart/oci-ai-blueprints](https://github.com/oracle-quickstart/oci-ai-blueprints) | Production deployments |
| [oracle-devrel/ai-solutions](https://github.com/oracle-devrel/ai-solutions) | Reference implementations |
| [oracle/wayflow](https://github.com/oracle/wayflow) | Agent Spec runtime |

### LiveLabs
- [Getting Started with OCI GenAI](https://apexapps.oracle.com/pls/apex/f?p=133:1)
- [Building AI Agents on OCI](https://apexapps.oracle.com/pls/apex/f?p=133:1)

## ✅ Production Checklist

Before deploying to production, ensure you have:

- [ ] **Security**: RBAC, network isolation, secrets management, threat protection
- [ ] **Data Access**: Least privilege, audited retrieval, data residency compliance
- [ ] **Reliability**: Timeouts, retries, fallbacks, graceful degradation
- [ ] **Quality**: Online telemetry + offline evaluation + regression testing
- [ ] **Cost**: Quotas, rate limiting, caching, model selection policies
- [ ] **Observability**: OpenTelemetry traces, structured logs, SLOs defined
- [ ] **Governance**: Prompt versioning, audit trails, incident runbooks
- [ ] **Testing**: Golden sets, regression tests on prompt/tool changes

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## Pricing Note

> **Oracle GenAI Pricing**: Oracle charges per CHARACTER, not per token. For on-demand inference:
> - Chat models: (prompt_length + response_length) in characters
> - Embedding models: input_length in characters
> - 10,000 characters = 10,000 transactions
> - See: https://docs.oracle.com/en-us/iaas/Content/generative-ai/pay-on-demand.htm

---

**Maintained by FrankX AI Practice**

For enterprise consulting and implementation support, visit [frankx.ai](https://frankx.ai) or contact [ai-practice@frankx.ai](mailto:ai-practice@frankx.ai).
