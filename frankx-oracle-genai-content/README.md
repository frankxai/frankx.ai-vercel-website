# FrankX Oracle GenAI & AI Agents Content Strategy

> Comprehensive content strategy and resources for building production-grade GenAI systems on Oracle Cloud Infrastructure.

## 🎯 What This Repository Contains

This repository contains FrankX's complete content strategy for establishing thought leadership in the Oracle GenAI ecosystem:

- **Blog Articles** - Production-ready content for publishing
- **Reference Architectures** - Enterprise-grade system designs
- **Code Samples** - Working implementations
- **Decision Guides** - Service selection frameworks
- **Workshops** - Hands-on learning materials

## 📚 Content Pillars

### 1. Production Systems with Oracle GenAI & AI Agents
Building enterprise-grade LLM and agent systems on OCI.

**Key Resources:**
- [Architecture Overview (Blog Series Part 1)](content/blog/series-production-genai-oci/part-01-architecture-overview.md)
- [Production LLM Systems Best Practices](github-ai-coe/best-practices/PRODUCTION_LLM_SYSTEMS_ARCHITECTURE.md)
- [Enterprise RAG Reference Architecture](github-ai-coe/reference-architectures/enterprise-rag/README.md)

### 2. OpenCourse Coding Agents Integration
Connecting OpenCode, Roo Code, and Kilo Code to Oracle GenAI and Grok Code-1.

**Key Resources:**
- [Connecting OpenCourse Agents to Oracle GenAI](content/blog/connecting-opencourse-agents-to-oracle-genai.md)
- [QuickStart Script](github-ai-coe/QUICKSTART.py)

### 3. AI CoE Guidance Repository
Centralized best practices for enterprise Oracle AI adoption.

**Key Resources:**
- [Oracle AI Services Decision Guide](docs/decision-guides/ORACLE_AI_SERVICES_DECISION_GUIDE.md)
- [Master Content Strategy](MASTER_CONTENT_STRATEGY.md)
- [Synthesis Report](SYNTHESIS_REPORT.md)

## 🚀 Quick Start

### 1. Explore the Content Strategy
```bash
# Read the executive summary
cat CONTENT_STRATEGY.md

# Or dive deep into the full strategy
cat MASTER_CONTENT_STRATEGY.md
```

### 2. Get Started with Oracle GenAI
```bash
# Run the quickstart script
python github-ai-coe/QUICKSTART.py setup

# Try a chat
python github-ai-coe/QUICKSTART.py chat --message "Hello, Oracle GenAI!"

# List models
python github-ai-coe/QUICKSTART.py models

# Check costs
python github-ai-coe/QUICKSTART.py costs
```

### 3. Read the Blog Series
Start with Part 1: [Architecture Overview](content/blog/series-production-genai-oci/part-01-architecture-overview.md)

## 📁 Repository Structure

```
frankx-oracle-genai-content/
├── README.md                          # This file
├── CONTENT_STRATEGY.md                # Executive summary
├── MASTER_CONTENT_STRATEGY.md         # Full strategy document
├── SYNTHESIS_REPORT.md                # Research synthesis
│
├── content/
│   ├── blog/                          # Blog articles
│   │   ├── connecting-opencourse-agents-to-oracle-genai.md
│   │   ├── oracle-ai-services-decision-guide.md
│   │   └── series-production-genai-oci/
│   │       └── part-01-architecture-overview.md
│   ├── architecture-center/
│   │   └── production-llm-agents-architecture.md
│   └── playbooks/
│       └── getting-started-oci-genai.md
│
├── github-ai-coe/                     # AI CoE Guidance Repository
│   ├── QUICKSTART.py                  # Quickstart CLI tool
│   ├── best-practices/
│   │   └── PRODUCTION_LLM_SYSTEMS_ARCHITECTURE.md
│   ├── reference-architectures/
│   │   └── enterprise-rag/
│   │       └── README.md
│   └── guides/
│       └── service-selection-guide.md
│
├── docs/
│   ├── decision-guides/
│   │   └── ORACLE_AI_SERVICES_DECISION_GUIDE.md
│   └── comparison-matrices/
│       └── oracle-vs-aws-vs-gcp.md
│
└── scripts/
    ├── oci-genai/
    │   ├── setup.py
    │   └── chat-client.py
    └── integration/
        ├── opencode-mcp-server/
        └── roocode-config/
```

## 📊 Blog Series: "Production-Ready GenAI on Oracle Cloud Infrastructure"

| Part | Title | Status |
|------|-------|--------|
| 1 | Architecture Overview (Six-Plane Model) | ✅ Complete |
| 2 | Agent Patterns (Managed vs Framework) | ✅ Complete |
| 3 | Operating Model (Governance, Observability) | ✅ Complete |
| 4 | Enterprise RAG Systems | 📋 Planned |
| 5 | Multi-Agent Orchestration | 📋 Planned |
| 6 | Cost Optimization & Scaling | 📋 Planned |
| 7 | Production Deployment | 📋 Planned |

### ✅ Core Series Complete (Parts 1-3)
The foundational three-part series is now complete and covers:
- **Part 1**: Enterprise architecture blueprint (four/six-plane model)
- **Part 2**: Agent patterns - managed (OCI Agent Platform/Agent Hub) vs framework (LangGraph/LangChain)
- **Part 3**: Operating model - governance, observability, cost management, incident response

## 🎓 Workshops

| Lab | Title | Duration |
|-----|-------|----------|
| 1 | Getting Started with OCI GenAI | 2 hours |
| 2 | Building AI Agents | 3 hours |
| 3 | RAG Systems on OCI | 3 hours |
| 4 | Production Deployment | 4 hours |

## 🔗 Key Oracle References

| Repository | URL | Purpose |
|------------|-----|---------|
| `oracle/langchain-oracle` | [GitHub](https://github.com/oracle/langchain-oracle) | Official LangChain integration |
| `oracle/agent-spec` | [GitHub](https://github.com/oracle/agent-spec) | Open Agent Specification |
| `oracle-devrel/ai-solutions` | [GitHub](https://github.com/oracle-devrel/ai-solutions) | Reference implementations |
| `oracle-quickstart/oci-ai-blueprints` | [GitHub](https://github.com/oracle-quickstart/oci-ai-blueprints) | Production deployments |

## 📈 Success Metrics

| Metric | Target (3 months) | Target (6 months) |
|--------|-------------------|-------------------|
| GitHub Stars | 200 | 500 |
| Blog Views | 5,000/article | 10,000/article |
| Workshop Attendance | 50/lab | 100/lab |
| Enterprise Inquiries | 10 | 25 |

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This content is licensed under the FrankX Content License. See [LICENSE](LICENSE) for details.

---

**Maintained by FrankX AI Practice**

*For questions, contact: ai-practice@frankx.io*
