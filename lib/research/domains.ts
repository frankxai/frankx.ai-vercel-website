/**
 * Research Hub Domain Registry
 *
 * Each domain represents a navigable research area at /research/[slug].
 * Content is synthesized from validated research in /research/active/ and /research/validated/.
 */

export interface ResearchHighlight {
  stat: string
  label: string
  source?: string
}

export interface ResearchSection {
  title: string
  content: string
  items?: { title: string; description: string; badge?: string }[]
}

export interface ResearchDomain {
  slug: string
  title: string
  subtitle: string
  description: string
  tldr: string
  icon: string // lucide icon name
  color: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'blue' | 'orange' | 'teal' | 'indigo' | 'lime' | 'fuchsia' | 'sky'
  highlights: ResearchHighlight[]
  sections: ResearchSection[]
  keyFindings: string[]
  relatedDomains: string[]
  relatedBlogPosts: string[]
  lastUpdated: string
  sourceCount: number
  status: 'active' | 'emerging' | 'foundational'
}

export const researchDomains: ResearchDomain[] = [
  {
    slug: 'enterprise-ai',
    title: 'Enterprise AI Architecture',
    subtitle: 'Production-grade AI systems for the enterprise',
    description: 'How organizations are deploying AI agents, multi-agent systems, and LLM-powered applications at scale. Covers adoption patterns, infrastructure decisions, and the shift from experimental to production AI.',
    tldr: 'Enterprise AI is crossing the production threshold: 72% of enterprise projects now use multi-agent architectures, Gartner predicts 40% of apps will feature AI agents by end of 2026, and the market is growing at 46.3% CAGR toward $52.6B by 2030.',
    icon: 'Building2',
    color: 'emerald',
    highlights: [
      { stat: '$52.6B', label: 'Market by 2030', source: 'MarketsAndMarkets' },
      { stat: '72%', label: 'Multi-agent adoption', source: 'G2 Report' },
      { stat: '46.3%', label: 'CAGR growth rate', source: 'MarketsAndMarkets' },
      { stat: '40%', label: 'Apps with agents by EOY 2026', source: 'Gartner' },
    ],
    sections: [
      {
        title: 'Market Trajectory',
        content: 'The AI agents market has reached an inflection point. From $7.84B in 2025 to a projected $52.62B by 2030, the 46.3% CAGR reflects genuine enterprise adoption rather than speculative investment. The shift from "AI experimentation" to "AI in production" is the defining trend of 2026.',
        items: [
          { title: '2024', description: 'Proof of concept phase. Most enterprises running 1-3 AI pilots.', badge: 'Past' },
          { title: '2025', description: 'Production push. First multi-agent deployments reach scale.', badge: 'Past' },
          { title: '2026', description: '40% of enterprise apps feature AI agents. Observability becomes critical.', badge: 'Current' },
          { title: '2027-2028', description: 'Autonomous agent teams. Self-healing systems. Agent-to-agent protocols.', badge: 'Projected' },
        ],
      },
      {
        title: 'Architecture Patterns Winning in Production',
        content: 'Three architecture patterns have emerged as dominant in enterprise deployments: orchestrator-worker (central coordinator delegates to specialist agents), peer-to-peer (agents negotiate and collaborate directly), and hierarchical (layered management with escalation paths).',
        items: [
          { title: 'Orchestrator-Worker', description: 'Central coordinator delegates tasks to specialist agents. Most common pattern (60%+ of deployments).', badge: 'Dominant' },
          { title: 'Hierarchical Multi-Agent', description: 'Layered management structure with supervisors, workers, and quality reviewers.', badge: 'Growing' },
          { title: 'Agentic RAG', description: 'Retrieval agents that dynamically choose search strategies based on query analysis.', badge: 'Emerging' },
        ],
      },
      {
        title: 'Infrastructure Requirements',
        content: 'Production AI systems require fundamentally different infrastructure than traditional software. Key requirements: model gateway for unified API routing, observability stack for tracing agent decisions, guardrails layer for safety and compliance, and memory systems for long-running agent sessions.',
      },
    ],
    keyFindings: [
      '72% of enterprise AI projects now use multi-agent architectures, up from 15% in 2024',
      'Gartner predicts 40% of enterprise apps will feature task-specific AI agents by end of 2026',
      '60% of AI deployments will fail without proper observability by 2027',
      'The AI agents market is growing at 46.3% CAGR, from $7.84B (2025) to $52.62B (2030)',
      'Model gateway architecture (LiteLLM, Portkey) is becoming standard for production deployments',
    ],
    relatedDomains: ['multi-agent-systems', 'production-patterns', 'ai-ops'],
    relatedBlogPosts: ['/blog/production-agentic-ai-systems', '/blog/creator-intelligence-systems-2026'],
    lastUpdated: '2026-01-27',
    sourceCount: 14,
    status: 'active',
  },
  {
    slug: 'multi-agent-systems',
    title: 'Multi-Agent Frameworks',
    subtitle: 'Comparing orchestration frameworks for 2026',
    description: 'Comprehensive analysis of the multi-agent framework landscape: LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, and Pydantic AI. Market share, architectural trade-offs, and selection criteria for production deployments.',
    tldr: 'LangGraph leads multi-agent frameworks at 34% market share with its graph-based orchestration, followed by CrewAI at 28% for role-based teams. The market is consolidating around two paradigms: deterministic graphs (LangGraph) and autonomous swarms (CrewAI/AutoGen).',
    icon: 'Network',
    color: 'violet',
    highlights: [
      { stat: '34%', label: 'LangGraph market share', source: 'Framework Survey' },
      { stat: '28%', label: 'CrewAI market share', source: 'Framework Survey' },
      { stat: '5', label: 'Major frameworks', source: 'Research' },
      { stat: '72%', label: 'Enterprise multi-agent adoption', source: 'G2 Report' },
    ],
    sections: [
      {
        title: 'Framework Landscape 2026',
        content: 'The multi-agent framework market has matured significantly. Five major players dominate, each with distinct architectural philosophies. The choice between them increasingly depends on specific deployment requirements rather than feature checklists.',
        items: [
          { title: 'LangGraph', description: 'Graph-based state machines. Best for deterministic, auditable workflows. 34% market share.', badge: '34%' },
          { title: 'CrewAI', description: 'Role-based agent teams. Best for autonomous collaboration. 28% market share.', badge: '28%' },
          { title: 'AutoGen', description: 'Conversation-driven patterns from Microsoft. Strong for research and prototyping.', badge: '18%' },
          { title: 'OpenAI Agents SDK', description: 'Native OpenAI integration. Handoff patterns, guardrails built-in. Rapid adoption.', badge: 'New' },
          { title: 'Pydantic AI', description: 'Type-safe, production-focused. Minimal abstraction, maximum control.', badge: 'Rising' },
        ],
      },
      {
        title: 'Selection Criteria',
        content: 'Choosing a framework requires evaluating: determinism needs (regulated industries demand LangGraph), team autonomy requirements (creative tasks suit CrewAI), existing stack (OpenAI-heavy shops benefit from Agents SDK), and production requirements (type safety drives Pydantic AI adoption).',
        items: [
          { title: 'Deterministic workflows', description: 'LangGraph: explicit state machines with human-in-the-loop checkpoints', badge: 'Best' },
          { title: 'Autonomous agent teams', description: 'CrewAI: agents negotiate roles and delegate independently', badge: 'Best' },
          { title: 'Rapid prototyping', description: 'AutoGen: conversation-based patterns, quick setup', badge: 'Best' },
          { title: 'Type-safe production', description: 'Pydantic AI: minimal abstraction, strong typing throughout', badge: 'Best' },
        ],
      },
      {
        title: 'Convergence Trends',
        content: 'All frameworks are converging on three capabilities: built-in memory/state management, native tool integration, and observability hooks. The differentiator is shifting from features to developer experience and production reliability.',
      },
    ],
    keyFindings: [
      'LangGraph commands 34% market share with graph-based deterministic orchestration',
      'CrewAI holds 28% with role-based autonomous agent teams',
      'OpenAI Agents SDK growing fastest due to native integration with GPT models',
      'Pydantic AI gaining traction in production environments requiring type safety',
      'All major frameworks converging on memory, tools, and observability as baseline features',
    ],
    relatedDomains: ['enterprise-ai', 'production-patterns', 'agent-benchmarks'],
    relatedBlogPosts: ['/blog/production-agentic-ai-systems'],
    lastUpdated: '2026-01-27',
    sourceCount: 11,
    status: 'active',
  },
  {
    slug: 'production-patterns',
    title: 'Production AI Patterns',
    subtitle: 'RAG, observability, and deployment strategies',
    description: 'Battle-tested patterns for deploying AI in production: Retrieval-Augmented Generation architectures, observability stacks, model gateway design, and the operational practices that separate successful deployments from expensive failures.',
    tldr: 'Production AI has matured beyond experimentation. 60%+ of production apps use RAG, hybrid search (vector + BM25) is now standard, and observability is non-negotiable — Gartner predicts 60% of AI deployments will fail without proper monitoring by 2027.',
    icon: 'Cpu',
    color: 'cyan',
    highlights: [
      { stat: '60%+', label: 'Production apps using RAG', source: 'Industry surveys' },
      { stat: '20-40%', label: 'Performance gain from RAG', source: 'Benchmarks' },
      { stat: '50-70%', label: 'Hallucination reduction', source: 'Enterprise reports' },
      { stat: '60%', label: 'Deployments failing without observability', source: 'Gartner' },
    ],
    sections: [
      {
        title: 'RAG Architecture Evolution',
        content: 'RAG has evolved through three generations: Basic RAG (2024) with simple vector search, Advanced RAG (2025) with hybrid search and reranking, and Agentic RAG (2026) where router agents dynamically choose retrieval strategies. Each generation brings 20-40% performance improvement over the last.',
        items: [
          { title: 'Basic RAG (2024)', description: 'Query → Embed → Vector Search → Top-K → LLM → Response', badge: 'Legacy' },
          { title: 'Advanced RAG (2025)', description: 'Query rewriting, hybrid search (BM25 + vector), cross-encoder reranking', badge: 'Standard' },
          { title: 'Agentic RAG (2026)', description: 'Router agent dynamically selects retrieval strategy per query', badge: 'Current' },
        ],
      },
      {
        title: 'Observability Stack',
        content: 'The production observability stack has standardized around three tiers: tracing (LangSmith, Langfuse), evaluation (RAGAS, DeepEval), and monitoring (custom dashboards). LangSmith leads enterprise adoption, while Langfuse is the open-source standard.',
        items: [
          { title: 'LangSmith', description: 'Enterprise-grade tracing from LangChain. Deep integration with LangGraph.', badge: 'Enterprise' },
          { title: 'Langfuse', description: 'Open-source alternative. Self-hostable. Growing fast in privacy-conscious orgs.', badge: 'Open Source' },
          { title: 'Weights & Biases Weave', description: 'ML-native observability. Strong evaluation framework.', badge: 'ML-First' },
          { title: 'Arize Phoenix', description: 'LLM-specific observability with embedding drift detection.', badge: 'Specialized' },
        ],
      },
      {
        title: 'Model Gateway Architecture',
        content: 'A model gateway (LiteLLM, Portkey, AWS Bedrock) provides unified API routing across providers, automatic failover, cost tracking, and rate limiting. This pattern has become standard for any production deployment using multiple LLM providers.',
      },
    ],
    keyFindings: [
      '60%+ of production AI applications use RAG as the primary retrieval pattern',
      'Hybrid search (vector + BM25) achieves 20-40% better results than vector-only retrieval',
      'RAG reduces hallucinations by 50-70% compared to raw LLM generation',
      'LangSmith leads enterprise observability; Langfuse dominates open-source',
      'Model gateway architecture is standard for multi-provider production deployments',
    ],
    relatedDomains: ['enterprise-ai', 'vector-databases', 'ai-ops'],
    relatedBlogPosts: ['/blog/production-agentic-ai-systems', '/blog/production-llm-agents-oci-part-3-operating-model'],
    lastUpdated: '2026-01-27',
    sourceCount: 16,
    status: 'active',
  },
  {
    slug: 'mcp-ecosystem',
    title: 'Model Context Protocol',
    subtitle: 'The protocol reshaping AI tool integration',
    description: 'Deep analysis of Anthropic\'s Model Context Protocol (MCP): how it works, the ecosystem of 50+ servers, Claude Code\'s tool architecture, and why MCP is becoming the USB-C of AI agent tooling.',
    tldr: 'MCP has emerged as the standard protocol for AI tool integration. With 50+ community servers, 340% growth in H2 2025, and Claude Code\'s 85% token reduction via dynamic tool loading, MCP is transforming how agents interact with external systems.',
    icon: 'Plug',
    color: 'blue',
    highlights: [
      { stat: '50+', label: 'MCP servers available', source: 'Anthropic' },
      { stat: '340%', label: 'H2 2025 growth', source: 'GitHub metrics' },
      { stat: '85%', label: 'Token reduction via Tool Search', source: 'Claude Code' },
      { stat: '200K', label: 'Context window (Opus 4.6)', source: 'Anthropic' },
    ],
    sections: [
      {
        title: 'What MCP Solves',
        content: 'Before MCP, every AI tool integration was custom: different APIs, auth patterns, response formats. MCP standardizes the tool interface so any AI model can use any tool through a single protocol. Think of it as USB-C for AI — one connector, universal compatibility.',
        items: [
          { title: 'Tool Discovery', description: 'Agents dynamically discover available tools at runtime instead of hardcoding', badge: 'Core' },
          { title: 'Resource Access', description: 'Standardized way to read files, databases, APIs through a single protocol', badge: 'Core' },
          { title: 'Server Ecosystem', description: '50+ community-built servers for Slack, GitHub, databases, browsers, and more', badge: 'Growing' },
        ],
      },
      {
        title: 'Claude Code Architecture',
        content: 'Claude Code represents the most advanced MCP implementation. Its deferred tool loading system reduces token overhead by 85% — tools are loaded only when needed via semantic search. The hooks system enables lifecycle automation, and the skills system provides hot-reloadable capability modules.',
        items: [
          { title: 'Deferred Tool Loading', description: '85% token reduction by loading tools on-demand via semantic search', badge: 'Key Innovation' },
          { title: 'Hooks System', description: 'Shell commands triggered by agent lifecycle events (pre-tool, post-tool, etc.)', badge: 'Automation' },
          { title: 'Skills System', description: 'Hot-reloadable markdown capability modules loaded via slash commands', badge: 'Extensibility' },
        ],
      },
      {
        title: 'Claude Model Landscape',
        content: 'The Claude model family in 2026: Opus 4.6 (200K context, research-grade reasoning), Sonnet 4.5 (best balance of speed and quality), Haiku 4.5 (fast and affordable). Extended thinking mode enables complex multi-step reasoning with visible chain-of-thought.',
      },
    ],
    keyFindings: [
      'MCP ecosystem grew 340% in H2 2025 with 50+ community-built servers',
      'Claude Code\'s deferred tool loading reduces token usage by 85%',
      'Opus 4.6 offers 200K context window with 1M beta access',
      'MCP is becoming the standard interface protocol for AI agent tooling',
      'Hooks and Skills systems enable production-grade agent automation',
    ],
    relatedDomains: ['multi-agent-systems', 'coding-assistants', 'production-patterns'],
    relatedBlogPosts: ['/blog/claude-opus-4-6-analysis-2026'],
    lastUpdated: '2026-01-27',
    sourceCount: 9,
    status: 'active',
  },
  {
    slug: 'ai-ops',
    title: 'AI Operations Architecture',
    subtitle: 'The 5-layer stack for production AI',
    description: 'Comprehensive guide to AI Operations: the infrastructure, processes, and patterns required to run AI systems reliably at scale. Covers the 5-layer architecture, maturity model, memory systems, and gateway patterns.',
    tldr: 'AI Ops has crystallized into a 5-layer stack: Infrastructure, Model Gateway, Agent Orchestration, Memory Systems, and Observability. Organizations progress through 6 maturity levels from ad-hoc to autonomous. The key differentiator is memory architecture — working, episodic, semantic, and procedural.',
    icon: 'Layers',
    color: 'amber',
    highlights: [
      { stat: '5', label: 'Architecture layers', source: 'Research' },
      { stat: '6', label: 'Maturity levels', source: 'Research' },
      { stat: '4', label: 'Memory types', source: 'Research' },
      { stat: '13', label: 'Research files', source: 'Internal' },
    ],
    sections: [
      {
        title: 'The 5-Layer AI Ops Stack',
        content: 'Production AI systems require a structured stack. Each layer addresses a specific concern, and skipping layers leads to failure at scale.',
        items: [
          { title: 'Layer 1: Infrastructure', description: 'GPU clusters, model hosting, API management, cost controls', badge: 'Foundation' },
          { title: 'Layer 2: Model Gateway', description: 'Unified API routing (LiteLLM/Portkey), failover, rate limiting, cost tracking', badge: 'Routing' },
          { title: 'Layer 3: Agent Orchestration', description: 'Multi-agent frameworks, workflow engines, task decomposition', badge: 'Logic' },
          { title: 'Layer 4: Memory Systems', description: 'Working memory, episodic memory, semantic memory, procedural memory', badge: 'State' },
          { title: 'Layer 5: Observability', description: 'Tracing, evaluation, monitoring, alerting, drift detection', badge: 'Visibility' },
        ],
      },
      {
        title: 'Memory Architecture',
        content: 'The most underappreciated aspect of production AI is memory. Four types of memory serve different purposes: working memory (current context), episodic memory (past interactions), semantic memory (knowledge base), and procedural memory (learned procedures). Effective systems combine all four.',
        items: [
          { title: 'Working Memory', description: 'Active context window. What the agent is currently thinking about.', badge: 'Short-term' },
          { title: 'Episodic Memory', description: 'Past interactions and outcomes. Enables learning from experience.', badge: 'Experience' },
          { title: 'Semantic Memory', description: 'Structured knowledge base. Facts, relationships, domain knowledge.', badge: 'Knowledge' },
          { title: 'Procedural Memory', description: 'Learned workflows and procedures. How to accomplish specific tasks.', badge: 'Skills' },
        ],
      },
      {
        title: 'Maturity Model',
        content: 'Organizations progress through 6 levels: Level 0 (Ad-hoc, no structure), Level 1 (Basic, single agents), Level 2 (Managed, multi-agent with monitoring), Level 3 (Optimized, automated evaluation), Level 4 (Proactive, predictive systems), Level 5 (Autonomous, self-healing agent teams).',
      },
    ],
    keyFindings: [
      'The 5-layer AI Ops stack provides a structured approach to production AI infrastructure',
      'Memory architecture (4 types) is the key differentiator in production agent systems',
      'Most organizations are at Level 1-2 of the 6-level maturity model',
      'Model gateway architecture reduces vendor lock-in and enables automatic failover',
      'Observability is the most commonly skipped layer — and the primary cause of production failures',
    ],
    relatedDomains: ['enterprise-ai', 'production-patterns', 'ai-security'],
    relatedBlogPosts: ['/blog/production-llm-agents-oci-part-3-operating-model'],
    lastUpdated: '2026-01-27',
    sourceCount: 13,
    status: 'active',
  },
  {
    slug: 'ai-neuroscience',
    title: 'AI & Neuroscience Convergence',
    subtitle: 'Where artificial and biological intelligence meet',
    description: 'The intersection of AI and neuroscience: brain-computer interfaces, neuromorphic computing, thought decoding, organoid intelligence, and how neuroscience-inspired architectures are shaping the next generation of AI systems.',
    tldr: 'AI and neuroscience are converging at an accelerating pace. BCIs have reached 65,000-electrode arrays with FDA trials completed, neuromorphic chips are achieving 100x energy efficiency, and AI can now decode thoughts with 91% accuracy from EEG data.',
    icon: 'Brain',
    color: 'rose',
    highlights: [
      { stat: '65K', label: 'Electrode arrays (BCIs)', source: 'Neuralink' },
      { stat: '91%', label: 'Thought decoding accuracy', source: 'PMC Study' },
      { stat: '100x', label: 'Neuromorphic energy efficiency', source: 'Intel/IBM' },
      { stat: '6', label: 'Research domains', source: 'Internal' },
    ],
    sections: [
      {
        title: 'Brain-Computer Interfaces',
        content: 'BCI technology has crossed from research to clinical deployment. Neuralink\'s N1 implant with 1,024 electrodes is in human trials, while Synchron\'s endovascular approach avoids open brain surgery. The critical milestone: FDA has cleared initial human trials for multiple companies.',
        items: [
          { title: 'Neuralink N1', description: '1,024 electrodes, robotic implantation, 12+ patients. First thought-to-text demonstrations.', badge: 'Invasive' },
          { title: 'Synchron Stentrode', description: 'Endovascular (via blood vessel). No open brain surgery. FDA trials completed.', badge: 'Less-Invasive' },
          { title: 'Blackrock Neurotech', description: '65,000-electrode Utah arrays. Longest-running human BCI data.', badge: 'Research' },
        ],
      },
      {
        title: 'Neuromorphic Computing',
        content: 'Chips that compute like brains. Intel\'s Loihi 2 and IBM\'s NorthPole achieve 100x energy efficiency over traditional GPUs for certain workloads. These chips process information using spikes rather than continuous values, enabling always-on, low-power AI at the edge.',
        items: [
          { title: 'Intel Loihi 2', description: 'Spiking neural network processor. 1M neurons on-chip. Research platform.', badge: 'Research' },
          { title: 'IBM NorthPole', description: '22B transistors. 12x energy efficiency over GPU for inference.', badge: 'Production' },
          { title: 'SpiNNaker 2', description: '10M neuron simulation capacity. University of Manchester.', badge: 'Academic' },
        ],
      },
      {
        title: 'Thought Decoding & AI Mental Health',
        content: 'AI systems can now decode emotional states, predict depressive episodes (91% accuracy), and even reconstruct visual experiences from brain scans. AI therapy apps show 34% depression reduction in randomized controlled trials, and neurofeedback has achieved Level 1 efficacy for ADHD.',
      },
    ],
    keyFindings: [
      'BCI electrode density has reached 65,000 (Blackrock), enabling high-resolution neural recording',
      'AI predicts depressive episodes with 91% accuracy using wearable EEG data',
      'Neuromorphic chips achieve 100x energy efficiency over GPUs for specific workloads',
      'AI therapy apps demonstrate 34% depression reduction in randomized controlled trials',
      'Consumer BCIs projected within 3-5 years as non-invasive technology matures',
    ],
    relatedDomains: ['ai-mental-health', 'enterprise-ai'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 18,
    status: 'active',
  },
  {
    slug: 'vector-databases',
    title: 'Vector Database Comparison',
    subtitle: 'Choosing the right vector store for production',
    description: 'Side-by-side comparison of vector databases for production AI: Pinecone, Weaviate, Qdrant, Milvus, Chroma, and pgvector. Benchmarks, pricing, compliance capabilities, and selection criteria.',
    tldr: 'Vector databases have commoditized in capability but differentiated in operations. Pinecone leads managed ease-of-use, Weaviate offers hybrid search natively, Qdrant wins on performance, and pgvector provides the lowest barrier for Postgres shops.',
    icon: 'Database',
    color: 'teal',
    highlights: [
      { stat: '<10ms', label: 'P99 latency (Pinecone)', source: 'Benchmark' },
      { stat: '6', label: 'Major platforms compared', source: 'Research' },
      { stat: 'SOC2', label: 'Compliance standard', source: 'Enterprise requirement' },
      { stat: '1B+', label: 'Vector capacity (Milvus)', source: 'Documentation' },
    ],
    sections: [
      {
        title: 'Platform Comparison',
        content: 'Six vector databases dominate the production landscape. The right choice depends on existing infrastructure, compliance requirements, and operational complexity tolerance.',
        items: [
          { title: 'Pinecone', description: 'Fully managed. <10ms P99 latency. SOC2 compliant. Best for teams wanting zero ops.', badge: 'Managed' },
          { title: 'Weaviate', description: 'Hybrid search native. GraphQL API. Good balance of features and self-hosting.', badge: 'Hybrid' },
          { title: 'Qdrant', description: 'Rust-based. Highest raw throughput. Best for performance-critical workloads.', badge: 'Performance' },
          { title: 'Milvus', description: 'Billion-scale. GPU-accelerated. Best for massive datasets.', badge: 'Scale' },
          { title: 'Chroma', description: 'Developer-friendly. Great for prototyping. Limited production features.', badge: 'Dev-First' },
          { title: 'pgvector', description: 'PostgreSQL extension. Lowest barrier for existing Postgres users.', badge: 'Postgres' },
        ],
      },
      {
        title: 'Selection Matrix',
        content: 'Key decision factors: managed vs self-hosted preference, compliance requirements (SOC2, HIPAA), hybrid search needs, scale requirements (millions vs billions of vectors), existing infrastructure, and team expertise.',
      },
    ],
    keyFindings: [
      'Pinecone offers <10ms P99 latency with full SOC2 compliance — best for zero-ops teams',
      'Weaviate provides native hybrid search combining BM25 and vector similarity',
      'Qdrant (Rust-based) delivers highest raw throughput for performance-critical workloads',
      'pgvector is sufficient for many use cases and eliminates a separate infrastructure dependency',
      'All major platforms now support filtering, metadata, and namespacing',
    ],
    relatedDomains: ['production-patterns', 'enterprise-ai'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 8,
    status: 'active',
  },
  {
    slug: 'ai-security',
    title: 'AI Agent Security',
    subtitle: 'Guardrails, governance, and compliance',
    description: 'Security patterns for AI agent systems: prompt injection defense, output guardrails, identity and access management for agents, regulatory compliance (California SB 243, AB 489), and the emerging field of AI red-teaming.',
    tldr: 'AI security has evolved from an afterthought to a first-class concern. California SB 243 mandates AI watermarking, AB 489 requires disclosure. Production guardrails now include input validation, output filtering, tool permission systems, and automated red-teaming.',
    icon: 'Shield',
    color: 'orange',
    highlights: [
      { stat: 'SB 243', label: 'California AI watermarking law', source: 'Legislature' },
      { stat: 'AB 489', label: 'AI disclosure requirement', source: 'Legislature' },
      { stat: '4', label: 'Guardrail layers required', source: 'Research' },
      { stat: '60%+', label: 'Orgs without AI security policy', source: 'Survey' },
    ],
    sections: [
      {
        title: 'Threat Landscape',
        content: 'AI agents face unique security challenges: prompt injection (adversarial inputs that hijack agent behavior), tool misuse (agents accessing unauthorized resources), data exfiltration (sensitive data leaking through LLM responses), and supply chain risks (malicious MCP servers or tools).',
        items: [
          { title: 'Prompt Injection', description: 'Adversarial inputs that override agent instructions. Most common attack vector.', badge: 'Critical' },
          { title: 'Tool Misuse', description: 'Agents accessing resources beyond their intended scope. Requires permission systems.', badge: 'High' },
          { title: 'Data Exfiltration', description: 'Sensitive data leaking through LLM responses or tool outputs.', badge: 'High' },
          { title: 'Supply Chain', description: 'Malicious tools, compromised MCP servers, poisoned training data.', badge: 'Emerging' },
        ],
      },
      {
        title: 'Defense-in-Depth Architecture',
        content: 'Production AI security requires four layers: input validation (sanitize and classify all inputs), execution guardrails (tool permissions, rate limits, resource constraints), output filtering (PII detection, content safety, compliance checks), and audit logging (full trace of all agent decisions and actions).',
        items: [
          { title: 'Input Validation', description: 'Prompt classification, injection detection, input sanitization', badge: 'Layer 1' },
          { title: 'Execution Guardrails', description: 'Tool permissions, rate limiting, resource constraints, sandboxing', badge: 'Layer 2' },
          { title: 'Output Filtering', description: 'PII detection, content safety, compliance checks, watermarking', badge: 'Layer 3' },
          { title: 'Audit & Monitoring', description: 'Decision tracing, anomaly detection, compliance reporting', badge: 'Layer 4' },
        ],
      },
    ],
    keyFindings: [
      'California SB 243 mandates AI watermarking for synthetic content',
      'AB 489 requires clear AI disclosure in consumer-facing applications',
      'Four-layer defense-in-depth is the minimum for production AI security',
      '60%+ of organizations deploying AI lack a formal AI security policy',
      'Automated red-teaming is emerging as a critical practice for pre-deployment testing',
    ],
    relatedDomains: ['enterprise-ai', 'ai-ops', 'production-patterns'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 10,
    status: 'active',
  },
  {
    slug: 'coding-assistants',
    title: 'AI Coding Assistants',
    subtitle: 'The IDE revolution: Cursor, Copilot, Claude Code',
    description: 'Comparison of AI coding tools: GitHub Copilot, Cursor, Claude Code, Windsurf, and Cody. Pricing, capabilities, market positioning, and the architectural shift from autocomplete to autonomous coding agents.',
    tldr: 'AI coding assistants have evolved from autocomplete to autonomous agents. Cursor leads the agent-first IDE space, Claude Code dominates terminal-based agentic coding, and Copilot maintains enterprise share. The market is shifting from "help me write code" to "write the code for me."',
    icon: 'Code',
    color: 'indigo',
    highlights: [
      { stat: '$20/mo', label: 'Cursor Pro price', source: 'Cursor' },
      { stat: '$10/mo', label: 'Copilot price', source: 'GitHub' },
      { stat: '5', label: 'Major tools compared', source: 'Research' },
      { stat: '77%', label: 'Developers using AI tools', source: 'Stack Overflow' },
    ],
    sections: [
      {
        title: 'Tool Landscape',
        content: 'Five tools dominate the AI coding space, each with a distinct philosophy. The market is bifurcating between IDE-integrated tools (Cursor, Copilot) and agent-first approaches (Claude Code).',
        items: [
          { title: 'Claude Code', description: 'Terminal-based agent. Full codebase awareness. MCP tools. Skills system. Agentic workflows.', badge: 'Agent-First' },
          { title: 'Cursor', description: 'Agent-first IDE. Composer mode for multi-file edits. Built on VS Code. $20/mo.', badge: 'IDE Agent' },
          { title: 'GitHub Copilot', description: 'Enterprise-grade. VS Code & JetBrains. Agent mode in preview. $10/mo.', badge: 'Enterprise' },
          { title: 'Windsurf', description: 'Cascade agent + Flow actions. Full project awareness. Aggressive pricing.', badge: 'Challenger' },
          { title: 'Sourcegraph Cody', description: 'Codebase-wide context via code graph. Best for large monorepos.', badge: 'Context' },
        ],
      },
      {
        title: 'The Shift to Autonomous Coding',
        content: 'The industry is transitioning from "AI-assisted coding" (autocomplete, inline suggestions) to "AI-driven coding" (agents that plan, implement, test, and iterate). Claude Code and Cursor Composer represent this shift — they take high-level instructions and produce complete implementations across multiple files.',
      },
    ],
    keyFindings: [
      '77% of developers now use AI coding tools in their daily workflow',
      'Claude Code leads terminal-based agentic coding with MCP, hooks, and skills',
      'Cursor dominates the agent-first IDE category at $20/mo',
      'GitHub Copilot maintains the largest enterprise install base at $10/mo',
      'The market is shifting from autocomplete to autonomous multi-file agents',
    ],
    relatedDomains: ['mcp-ecosystem', 'multi-agent-systems'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 7,
    status: 'active',
  },
  {
    slug: 'ai-adoption',
    title: 'Enterprise AI Adoption',
    subtitle: 'Barriers, patterns, and acceleration strategies',
    description: 'Why enterprise AI adoption stalls and how to fix it. The five key barriers: data readiness, skill gaps, integration complexity, ROI measurement, and governance. Practical strategies for each.',
    tldr: 'Enterprise AI adoption faces five systemic barriers: data readiness (only 23% of organizations have AI-ready data), skill gaps (65% report shortage), integration complexity, unclear ROI measurement, and governance uncertainty. The winners invest in data infrastructure first.',
    icon: 'TrendingUp',
    color: 'lime',
    highlights: [
      { stat: '23%', label: 'Orgs with AI-ready data', source: 'McKinsey' },
      { stat: '65%', label: 'Report AI skill shortage', source: 'Gartner' },
      { stat: '5', label: 'Key adoption barriers', source: 'Research' },
      { stat: '3-6mo', label: 'Typical pilot-to-production', source: 'Industry average' },
    ],
    sections: [
      {
        title: 'The Five Barriers',
        content: 'Enterprise AI adoption consistently stalls at five points. Understanding these barriers is essential for any AI strategy.',
        items: [
          { title: 'Data Readiness', description: 'Only 23% of organizations have AI-ready data infrastructure. Most data is siloed, unstructured, or poorly labeled.', badge: 'Barrier 1' },
          { title: 'Skill Gaps', description: '65% of organizations report AI/ML talent shortage. Not just data scientists — AI product managers, ML engineers, and AI-savvy domain experts.', badge: 'Barrier 2' },
          { title: 'Integration Complexity', description: 'Legacy systems, API sprawl, and data pipeline fragility make AI integration harder than building the model.', badge: 'Barrier 3' },
          { title: 'ROI Measurement', description: 'Most organizations cannot accurately measure AI ROI. Productivity gains are real but hard to attribute.', badge: 'Barrier 4' },
          { title: 'Governance & Ethics', description: 'Regulatory uncertainty, bias concerns, and liability questions slow enterprise approval processes.', badge: 'Barrier 5' },
        ],
      },
      {
        title: 'Acceleration Strategies',
        content: 'Successful enterprises share common patterns: they invest in data infrastructure before AI models, start with high-value internal use cases, build cross-functional AI teams, and measure outcomes (not outputs).',
      },
    ],
    keyFindings: [
      'Only 23% of enterprises have AI-ready data infrastructure',
      '65% of organizations report AI/ML talent shortages as the primary bottleneck',
      'Integration complexity (not model quality) is the #1 deployment blocker',
      'Successful AI programs invest 60%+ of budget in data infrastructure, not models',
      'Cross-functional teams (engineering + domain experts) outperform pure AI teams 3:1',
    ],
    relatedDomains: ['enterprise-ai', 'ai-ops', 'ai-security'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 9,
    status: 'active',
  },
  {
    slug: 'agent-benchmarks',
    title: 'AI Agent Benchmarks',
    subtitle: 'Measuring what matters in agent performance',
    description: 'How to evaluate AI agents: SWE-bench for coding, AgentBench for general tasks, tau-bench for tool use, and custom evaluation frameworks. What benchmarks reveal and where they mislead.',
    tldr: 'AI agent evaluation has matured beyond simple accuracy metrics. SWE-bench measures real-world coding ability (Opus 4.6 scores 72.5%), AgentBench tests general reasoning, and tau-bench evaluates tool-use reliability. The key insight: benchmark performance doesn\'t always predict production success.',
    icon: 'BarChart3',
    color: 'fuchsia',
    highlights: [
      { stat: '72.5%', label: 'Opus 4.6 on SWE-bench', source: 'Anthropic' },
      { stat: '3', label: 'Major benchmark suites', source: 'Research' },
      { stat: '91.4%', label: 'Opus 4.6 MMLU', source: 'Anthropic' },
      { stat: 'Gap', label: 'Between benchmark & production', source: 'Industry consensus' },
    ],
    sections: [
      {
        title: 'Benchmark Landscape',
        content: 'Three benchmark suites have emerged as the primary evaluation tools for AI agents, each measuring different capabilities.',
        items: [
          { title: 'SWE-bench', description: 'Real GitHub issues from popular repos. Tests end-to-end coding: understanding, planning, implementing, testing.', badge: 'Coding' },
          { title: 'AgentBench', description: 'General agent tasks: web browsing, database queries, OS interactions, knowledge-grounded reasoning.', badge: 'General' },
          { title: 'tau-bench', description: 'Tool-use evaluation: can agents correctly select and use tools from a large toolset?', badge: 'Tool Use' },
        ],
      },
      {
        title: 'The Benchmark-Production Gap',
        content: 'High benchmark scores don\'t guarantee production success. Key reasons: benchmarks test isolated tasks (production requires coordination), benchmarks have clean inputs (production has messy data), and benchmarks measure accuracy (production also needs latency, cost, reliability). Custom evaluation frameworks that mirror production conditions are essential.',
      },
    ],
    keyFindings: [
      'Claude Opus 4.6 achieves 72.5% on SWE-bench, setting a new standard for coding agents',
      'SWE-bench, AgentBench, and tau-bench are the three primary agent evaluation suites',
      'Benchmark performance has a significant gap with production reliability',
      'Custom evaluation frameworks that mirror production conditions outperform standard benchmarks',
      'Tool-use reliability (tau-bench) is a better predictor of production success than general reasoning',
    ],
    relatedDomains: ['multi-agent-systems', 'coding-assistants', 'enterprise-ai'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 8,
    status: 'active',
  },
  {
    slug: 'ai-mental-health',
    title: 'AI for Mental Health',
    subtitle: 'Clinical evidence, tools, and what actually works',
    description: 'Evidence-based analysis of AI applications in mental health: therapy apps (Woebot, Wysa), predictive monitoring, neurofeedback, and brain stimulation. What the clinical data shows vs. what\'s marketing.',
    tldr: 'AI mental health tools show genuine clinical benefit: 34% depression reduction in RCTs, 91% episode prediction accuracy from wearables, and Level 1 efficacy rating for neurofeedback in ADHD. Key caveat: AI works best as a supplement to human therapy, not a replacement.',
    icon: 'Heart',
    color: 'sky',
    highlights: [
      { stat: '34%', label: 'Depression reduction (RCTs)', source: 'NEJM AI' },
      { stat: '91%', label: 'Episode prediction accuracy', source: 'PMC Study' },
      { stat: '652M', label: 'Projected digital therapy users', source: 'UT Health' },
      { stat: 'Level 1', label: 'Neurofeedback for ADHD', source: 'Clinical rating' },
    ],
    sections: [
      {
        title: 'What Actually Works',
        content: 'Separating evidence-based interventions from marketing claims. The strongest evidence supports AI-powered CBT apps, predictive monitoring from wearables, and neurofeedback for specific conditions.',
        items: [
          { title: 'AI Therapy Apps', description: 'Woebot, Wysa, Youper. CBT-based. 34% depression symptom reduction in RCTs.', badge: 'Strong Evidence' },
          { title: 'Predictive Monitoring', description: 'Wearable data + ML. 91% accuracy predicting depressive episodes.', badge: 'Emerging' },
          { title: 'Neurofeedback', description: 'Brainwave training. Level 1 "Efficacious and Specific" for ADHD.', badge: 'Strong for ADHD' },
          { title: 'Brain Stimulation', description: 'TMS, tDCS. FDA-cleared for treatment-resistant depression.', badge: 'FDA-Cleared' },
        ],
      },
      {
        title: 'Important Caveats',
        content: 'AI tools work best as supplements to human therapy, not replacements. Severe depression, suicidal ideation, and psychosis require professional human care. Most consumer "brain training" apps lack clinical evidence for treating disorders. Individual response varies significantly.',
      },
    ],
    keyFindings: [
      'AI-powered CBT apps reduce depression symptoms by 34% in randomized controlled trials',
      'AI predicts depressive episodes with 91% accuracy using wearable EEG data',
      'Neurofeedback has Level 1 efficacy rating ("Efficacious and Specific") for ADHD',
      'Digital therapeutics projected to reach 652 million users',
      'AI mental health tools work best as supplements to human therapy, not replacements',
    ],
    relatedDomains: ['ai-neuroscience'],
    relatedBlogPosts: [],
    lastUpdated: '2026-01-27',
    sourceCount: 12,
    status: 'active',
  },
]

// Helper functions
export function getDomainBySlug(slug: string): ResearchDomain | undefined {
  return researchDomains.find(d => d.slug === slug)
}

export function getDomainsByStatus(status: ResearchDomain['status']): ResearchDomain[] {
  return researchDomains.filter(d => d.status === status)
}

export function getRelatedDomains(slug: string): ResearchDomain[] {
  const domain = getDomainBySlug(slug)
  if (!domain) return []
  return domain.relatedDomains
    .map(s => getDomainBySlug(s))
    .filter((d): d is ResearchDomain => d !== undefined)
}

// Research agents (professional/technical style)
export const researchAgents = [
  {
    name: 'Frontier Intelligence Analyst',
    role: 'Technology & Market Research',
    specialty: 'Tracking cutting-edge AI developments, framework releases, and market shifts across the global AI landscape',
    icon: 'Radar',
    color: 'emerald' as const,
  },
  {
    name: 'Systems Architecture Researcher',
    role: 'Infrastructure & Patterns Analysis',
    specialty: 'Evaluating production architectures, deployment patterns, and infrastructure decisions for enterprise AI systems',
    icon: 'Network',
    color: 'cyan' as const,
  },
  {
    name: 'Evidence Synthesis Engine',
    role: 'Claims Validation & Cross-Reference',
    specialty: 'Validating research claims against primary sources, cross-referencing across publications, and maintaining confidence ratings',
    icon: 'ShieldCheck',
    color: 'violet' as const,
  },
  {
    name: 'Strategic Pattern Analyst',
    role: 'Trend Detection & Forecasting',
    specialty: 'Identifying convergence patterns across domains, detecting emerging trends, and mapping technology trajectories',
    icon: 'TrendingUp',
    color: 'amber' as const,
  },
  {
    name: 'Publication & Distribution Architect',
    role: 'Content Strategy & SEO/AEO',
    specialty: 'Transforming validated research into SEO-optimized briefs, AI-citable summaries, and structured knowledge artifacts',
    icon: 'FileText',
    color: 'rose' as const,
  },
]
