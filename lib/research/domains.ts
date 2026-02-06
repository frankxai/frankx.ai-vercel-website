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
    relatedDomains: ['multi-agent-systems', 'production-patterns', 'ai-ops', 'generative-ai'],
    relatedBlogPosts: ['/blog/production-agentic-ai-systems', '/blog/creator-intelligence-systems-2026', '/blog/claude-opus-4-6-analysis-2026'],
    lastUpdated: '2026-02-06',
    sourceCount: 16,
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
      { stat: '1M', label: 'Context window (Opus 4.6 beta)', source: 'Anthropic' },
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
        title: 'Claude Model Landscape (February 2026)',
        content: 'The Claude model family spans four tiers. Opus 4.6 (Feb 2026) is the new flagship: 1M context (beta), 128K output, adaptive thinking, $5/$25 pricing — a 67% reduction from previous Opus. Sonnet 4.5 balances speed and quality at $3/$15. Haiku 4.5 handles high-volume tasks at $0.80/$4. Opus 4.6 leads ARC-AGI-2 (68.8%), Terminal-Bench (65.4%), and OSWorld (72.7%).',
        items: [
          { title: 'Claude Opus 4.6', description: 'Flagship. 1M context (beta), 128K output, adaptive thinking. #1 on ARC-AGI-2 (68.8%), Terminal-Bench (65.4%).', badge: 'New' },
          { title: 'Claude Opus 4.5', description: 'Previous flagship. SWE-bench 80.9%. Still available for existing workflows.', badge: 'Available' },
          { title: 'Claude Sonnet 4.5', description: 'Best speed/quality balance. $3/$15 per 1M tokens. Production workhorse.', badge: 'Recommended' },
          { title: 'Claude Haiku 4.5', description: 'Fastest and cheapest. $0.80/$4 per 1M tokens. Routing, classification, chat.', badge: 'Budget' },
        ],
      },
      {
        title: 'Agent Teams & Compaction',
        content: 'Opus 4.6 introduces Agent Teams — parallel Claude Code agents working under a lead coordinator. Combined with the Compaction API (server-side context summarization), this enables infinite conversation sessions and multi-agent workflows that maintain full state. These features align directly with ACOS Layer 4 (Swarm Orchestration).',
      },
    ],
    keyFindings: [
      'MCP ecosystem grew 340% in H2 2025 with 50+ community-built servers',
      'Claude Code\'s deferred tool loading reduces token usage by 85%',
      'Opus 4.6 offers 1M context window (beta) with 128K output tokens',
      'Opus 4.6 pricing dropped 67% ($15/$75 → $5/$25) making it 1.67x Sonnet cost',
      'Agent Teams enables parallel Claude Code agents for multi-agent workflows',
      'MCP is becoming the standard interface protocol for AI agent tooling',
      'Hooks and Skills systems enable production-grade agent automation',
      'Adaptive thinking auto-calibrates reasoning depth, replacing manual budget_tokens',
    ],
    relatedDomains: ['multi-agent-systems', 'coding-assistants', 'production-patterns', 'generative-ai'],
    relatedBlogPosts: ['/blog/claude-opus-4-6-analysis-2026', '/blog/claude-code-2-1-mcp-revolution'],
    lastUpdated: '2026-02-06',
    sourceCount: 14,
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
    tldr: 'AI agent evaluation has matured beyond simple accuracy metrics. SWE-bench measures real-world coding ability, ARC-AGI-2 measures abstract reasoning (Opus 4.6 leads at 68.8%), Terminal-Bench measures agentic coding (Opus 4.6 at 65.4%), and tau-bench evaluates tool-use reliability. The key insight: benchmark performance doesn\'t always predict production success.',
    icon: 'BarChart3',
    color: 'fuchsia',
    highlights: [
      { stat: '68.8%', label: 'Opus 4.6 ARC-AGI-2 (#1)', source: 'Anthropic / ARC Prize' },
      { stat: '65.4%', label: 'Opus 4.6 Terminal-Bench (#1)', source: 'Anthropic' },
      { stat: '6', label: 'Major benchmark suites', source: 'Research' },
      { stat: 'Gap', label: 'Between benchmark & production', source: 'Industry consensus' },
    ],
    sections: [
      {
        title: 'Benchmark Landscape',
        content: 'Three benchmark suites have emerged as the primary evaluation tools for AI agents, each measuring different capabilities.',
        items: [
          { title: 'ARC-AGI-2', description: 'Abstract reasoning. Opus 4.6 leads at 68.8%, GPT-5.2 at 54.2%, Gemini 3 at 45.1%.', badge: 'Reasoning' },
          { title: 'Terminal-Bench 2.0', description: 'Agentic coding tasks. Opus 4.6 leads at 65.4%, up from Opus 4.5\'s 59.8%.', badge: 'Coding' },
          { title: 'SWE-bench', description: 'Real GitHub issues. Tests end-to-end software engineering capability.', badge: 'SE' },
          { title: 'OSWorld', description: 'Computer use tasks. Opus 4.6 at 72.7%, Opus 4.5 at 66.3%.', badge: 'Computer Use' },
          { title: 'tau-bench', description: 'Tool-use evaluation: can agents correctly select and use tools?', badge: 'Tool Use' },
          { title: 'MMMU-Pro', description: 'Multimodal understanding. Gemini 3 Pro leads at 81.0%.', badge: 'Multimodal' },
        ],
      },
      {
        title: 'The Benchmark-Production Gap',
        content: 'High benchmark scores don\'t guarantee production success. Key reasons: benchmarks test isolated tasks (production requires coordination), benchmarks have clean inputs (production has messy data), and benchmarks measure accuracy (production also needs latency, cost, reliability). Custom evaluation frameworks that mirror production conditions are essential.',
      },
    ],
    keyFindings: [
      'Claude Opus 4.6 leads ARC-AGI-2 at 68.8% — an 83% relative improvement over Opus 4.5 (37.6%)',
      'Opus 4.6 leads Terminal-Bench 2.0 at 65.4%, setting a new standard for agentic coding',
      'OSWorld (computer use) scores: Opus 4.6 at 72.7%, Opus 4.5 at 66.3%',
      'Six benchmark suites cover reasoning, coding, computer use, multimodal, legal, and tool use',
      'Benchmark performance has a significant gap with production reliability',
      'Custom evaluation frameworks that mirror production conditions outperform standard benchmarks',
      'Tool-use reliability (tau-bench) is a better predictor of production success than general reasoning',
    ],
    relatedDomains: ['multi-agent-systems', 'coding-assistants', 'enterprise-ai', 'generative-ai'],
    relatedBlogPosts: ['/blog/claude-opus-4-6-analysis-2026'],
    lastUpdated: '2026-02-06',
    sourceCount: 14,
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
  {
    slug: 'generative-ai',
    title: 'Frontier AI Models & Generative Intelligence',
    subtitle: 'Benchmarks, pricing, capabilities, and what to use when',
    description: 'Comprehensive tracker of frontier AI models: Claude, GPT, Gemini, Grok, Llama, and DeepSeek. Benchmarks compared head-to-head, pricing analyzed, context windows measured, and practical selection frameworks for creators, developers, and enterprise teams.',
    tldr: 'Claude Opus 4.6 leads ARC-AGI-2 (68.8%) and Terminal-Bench (65.4%) as of February 2026. Its 67% price cut to $5/$25 makes it competitive with mid-tier models. Grok 4.1 and Gemini 3 Pro lead on context (2M). The market is splitting into reasoning specialists (Claude, GPT), multimodal leaders (Gemini), and open-source alternatives (Llama, DeepSeek).',
    icon: 'Sparkles',
    color: 'violet',
    highlights: [
      { stat: '68.8%', label: 'Opus 4.6 ARC-AGI-2 (#1)', source: 'Anthropic' },
      { stat: '$5/$25', label: 'Opus 4.6 per 1M tokens', source: 'Anthropic' },
      { stat: '1M', label: 'Opus 4.6 context (beta)', source: 'Anthropic' },
      { stat: '8', label: 'Frontier models tracked', source: 'FrankX Registry' },
    ],
    sections: [
      {
        title: 'Frontier Model Landscape (February 2026)',
        content: 'Eight models define the frontier in early 2026. The landscape is segmented: Anthropic leads reasoning and coding, Google leads multimodal breadth, xAI leads arena rankings, Meta leads open-source, and DeepSeek leads budget reasoning. The gap between frontier and open-source is closing rapidly.',
        items: [
          { title: 'Claude Opus 4.6', description: '#1 ARC-AGI-2 (68.8%), #1 Terminal-Bench (65.4%). 1M context beta, 128K output, $5/$25. The reasoning and coding leader.', badge: '#1 Reasoning' },
          { title: 'GPT-5.2 Pro', description: 'First 90% ARC-AGI-1, strong multimodal with native audio. $10/$30. The generalist.', badge: 'Generalist' },
          { title: 'Gemini 3 Pro', description: '81% MMMU-Pro, 2M context, native video + audio. $7/$21. The multimodal leader.', badge: '#1 Multimodal' },
          { title: 'Grok 4.1', description: '#1 LMArena (1483 Elo), 2M context, competitive pricing. The arena champion.', badge: '#1 Arena' },
        ],
      },
      {
        title: 'Benchmark Comparison',
        content: 'Head-to-head benchmark data validated against official vendor announcements and independent evaluation sources (ARC Prize Foundation, Scale AI SEAL, LMArena, Artificial Analysis). Key benchmarks: ARC-AGI-2 (abstract reasoning), Terminal-Bench (agentic coding), SWE-bench (software engineering), MMMU-Pro (multimodal understanding), OSWorld (computer use).',
        items: [
          { title: 'ARC-AGI-2', description: 'Opus 4.6: 68.8% | GPT-5.2: 54.2% | Gemini 3: 45.1% | Opus 4.5: 37.6%', badge: 'Reasoning' },
          { title: 'Terminal-Bench 2.0', description: 'Opus 4.6: 65.4% | Opus 4.5: 59.8%', badge: 'Coding' },
          { title: 'OSWorld', description: 'Opus 4.6: 72.7% | Opus 4.5: 66.3%', badge: 'Computer Use' },
          { title: 'MMMU-Pro', description: 'Gemini 3 Pro: 81.0%', badge: 'Multimodal' },
        ],
      },
      {
        title: 'Pricing & Economics',
        content: 'The pricing landscape shifted dramatically with Opus 4.6\'s 67% price cut (from $15/$75 to $5/$25). Opus is now only 1.67x the cost of Sonnet 4.5, changing the routing calculus for production systems. DeepSeek R1 remains the budget leader at $0.55/$2.19 with competitive reasoning. Open-source models (Llama 4 Maverick) are free to self-host.',
        items: [
          { title: 'Best Price/Performance', description: 'Claude Opus 4.6 at $5/$25 — frontier reasoning at mid-tier pricing', badge: 'Best Value' },
          { title: 'Budget Reasoning', description: 'DeepSeek R1 at $0.55/$2.19 — open-source, MIT license, strong reasoning', badge: 'Budget' },
          { title: 'Multimodal Value', description: 'Gemini 3 Pro at $7/$21 — 2M context with native video + audio', badge: 'Multimodal' },
          { title: 'Self-Hosted', description: 'Llama 4 Maverick — 400B MoE, runs on single H100, no API cost', badge: 'Open Source' },
        ],
      },
      {
        title: 'Context Windows & Output Limits',
        content: 'Context window race: Grok 4.1 and Gemini 3 Pro lead at 2M tokens. Opus 4.6 offers 1M in beta. Llama 4 Scout reaches 10M for specialized use. Output limits matter too: Opus 4.6 leads at 128K output tokens (roughly 96K words per response). This enables complete article generation, full code modules, and detailed research reports in single passes.',
      },
      {
        title: 'Model Selection Framework',
        content: 'The right model depends on your task. Complex architecture and research → Opus 4.6. Standard coding and content → Sonnet 4.5. High-volume classification → Haiku 4.5. Multimodal with video → Gemini 3 Pro. Budget reasoning → DeepSeek R1. Self-hosted privacy → Llama 4 Maverick. No single model wins every category.',
        items: [
          { title: 'For Creators', description: 'Opus 4.6 for deep work (1M context loads entire content library), Sonnet 4.5 for daily production', badge: 'Creator' },
          { title: 'For Developers', description: 'Opus 4.6 for architecture + debugging, Sonnet 4.5 for standard coding, Haiku 4.5 for testing', badge: 'Developer' },
          { title: 'For Enterprise', description: 'Opus 4.6 for research synthesis, Sonnet 4.5 for production APIs, Haiku 4.5 for routing + classification', badge: 'Enterprise' },
          { title: 'For ACOS', description: 'Three-tier routing: Haiku (fast/cheap) → Sonnet (balanced) → Opus (complex). Updated to Opus 4.6 with adaptive thinking.', badge: 'ACOS' },
        ],
      },
    ],
    keyFindings: [
      'Claude Opus 4.6 leads ARC-AGI-2 at 68.8%, a 31.2 percentage point jump from Opus 4.5 (37.6%)',
      'Opus 4.6 pricing dropped 67% ($15/$75 → $5/$25), now only 1.67x the cost of Sonnet 4.5',
      '1M token context (beta) enables loading entire codebases and content libraries in single sessions',
      '128K output tokens (2x previous) enables complete long-form content in single generation passes',
      'Adaptive thinking replaces manual budget_tokens, auto-calibrating reasoning depth per query',
      'Grok 4.1 and Gemini 3 Pro lead on raw context at 2M tokens; Gemini leads multimodal breadth',
      'DeepSeek R1 remains the budget reasoning champion at $0.55/$2.19 (MIT license, open-source)',
      'Open-source gap closing: Llama 4 Maverick (400B MoE) matches dense models at fraction of compute',
    ],
    relatedDomains: ['mcp-ecosystem', 'agent-benchmarks', 'coding-assistants', 'enterprise-ai', 'ai-agent-config'],
    relatedBlogPosts: ['/blog/claude-opus-4-6-analysis-2026', '/blog/claude-code-2-1-mcp-revolution', '/blog/ultimate-guide-ai-coding-agents-2026'],
    lastUpdated: '2026-02-06',
    sourceCount: 18,
    status: 'active',
  },
  {
    slug: 'ai-agent-config',
    title: 'AI Agent Configuration Patterns',
    subtitle: 'CLAUDE.md, skills, hooks, and agent architecture at scale',
    description: 'How to configure AI coding agents for production: CLAUDE.md as project constitution, skill activation systems, hook-based lifecycle automation, agent specialization, and multi-agent orchestration patterns. Based on real patterns from the Agentic Creator Operating System (500+ skills, 40+ agents, 25+ commands).',
    tldr: 'AI agent configuration has evolved from simple system prompts to multi-layered architectures. CLAUDE.md acts as a project constitution, skills provide hot-reloadable capabilities, hooks automate lifecycle events, and agent profiles define specialized roles. The ACOS pattern demonstrates scaling to 500+ skills without chaos through lazy loading, context-aware activation, and explicit handoff protocols.',
    icon: 'Cpu',
    color: 'orange',
    highlights: [
      { stat: '500+', label: 'Skills managed via ACOS', source: 'FrankX Production' },
      { stat: '40+', label: 'Specialized agents', source: 'ACOS Agent Library' },
      { stat: '4', label: 'Configuration layers', source: 'Architecture' },
      { stat: '3', label: 'Trigger dimensions', source: 'Skill System' },
    ],
    sections: [
      {
        title: 'The Configuration Hierarchy',
        content: 'Production AI agent systems use a four-layer configuration hierarchy. Each layer serves a distinct purpose, and the layers compose — lower layers provide defaults, higher layers override for specific contexts.',
        items: [
          { title: 'CLAUDE.md (Constitution)', description: 'Project-level identity: brand voice, decision frameworks, anti-patterns, content standards. Every agent inherits this context. Acts as the "constitution" all agents swear to.', badge: 'Layer 1' },
          { title: 'Skill Profiles (Context)', description: 'Context-aware activation rules. A web development profile loads React/Next.js skills; a content profile loads SEO/writing skills. Triggers: file patterns, keywords, commands.', badge: 'Layer 2' },
          { title: 'Individual Skills (Capability)', description: 'Hot-reloadable markdown files with specific expertise. Types: domain, technical, creative. Enforcement: suggest or enforce. Priority: critical to low.', badge: 'Layer 3' },
          { title: 'Commands (Workflow)', description: 'Slash-command playbooks (25+ in ACOS). Each command is a complete workflow: prerequisites, decision matrices, step-by-step process, quality gates.', badge: 'Layer 4' },
        ],
      },
      {
        title: 'Skill Activation System',
        content: 'Skills activate through three independent trigger dimensions. When any dimension matches, the skill loads. This multi-dimensional approach ensures the right skills are available without manual selection.',
        items: [
          { title: 'Keyword Triggers', description: 'Simple word matching in user prompts. Example: "blog", "seo", "deploy" activate content or deployment skills.', badge: 'Dimension 1' },
          { title: 'Intent Patterns', description: 'Regex-based semantic matching. Example: "write.*(article|blog|post)" detects writing intent regardless of exact phrasing.', badge: 'Dimension 2' },
          { title: 'File Triggers', description: 'Glob patterns on files being edited. Example: "app/**/*.tsx" activates React skills, "content/**/*.mdx" activates content skills.', badge: 'Dimension 3' },
        ],
      },
      {
        title: 'Agent Specialization Architecture',
        content: 'Each agent is a markdown file with YAML frontmatter defining its role, tools, memory limits, and workflows. The key principle: single responsibility. A research agent doesn\'t write code. A coding agent doesn\'t do SEO. Clear boundaries prevent agent confusion and improve output quality.',
        items: [
          { title: 'Mission & Expertise', description: 'Clear 1-2 sentence purpose and enumerated domain expertise. Prevents scope creep.', badge: 'Identity' },
          { title: 'Workflow Contracts', description: 'Each workflow defines inputs, outputs, and processing steps. Agents know what they receive and what they deliver.', badge: 'Contracts' },
          { title: 'Memory Architecture', description: 'Working memory (current task), episodic (past sessions), semantic (knowledge base). Each agent gets explicit memory allocation.', badge: 'Memory' },
          { title: 'Handoff Protocols', description: 'Explicit rules for passing work between agents. Prevents dropped context and duplicate work.', badge: 'Coordination' },
        ],
      },
      {
        title: 'Hook-Based Lifecycle Automation',
        content: 'Hooks are shell commands triggered at specific points in the agent lifecycle: PreToolUse (validation, logging), PostToolUse (cleanup, metrics), SessionStart (context loading), and Stop (reporting). Hooks enable quality gates, automated testing after code changes, and session logging — all without modifying the agent itself.',
        items: [
          { title: 'PreToolUse', description: 'Runs before any tool executes. Use for: input validation, permission checks, audit logging.', badge: 'Before' },
          { title: 'PostToolUse', description: 'Runs after tool completes. Use for: linting, test execution, metric collection, notifications.', badge: 'After' },
          { title: 'UserPromptSubmit', description: 'Runs when user sends a message. Use for: context injection, skill activation, routing decisions.', badge: 'Input' },
          { title: 'Stop', description: 'Runs when agent session ends. Use for: session logging, cleanup, summary generation.', badge: 'End' },
        ],
      },
      {
        title: 'Scaling to 500+ Skills',
        content: 'The ACOS pattern solves the "too many skills" problem through lazy loading, priority ordering, and exclusion patterns. Only 5 skills load concurrently (max_concurrent_skills). Skills are priority-ranked (critical > high > medium > low). Exclude patterns filter irrelevant skills (e.g., exclude Shopify skills in a non-commerce project). The result: 500+ skills available, but only the relevant 3-5 are active at any time.',
      },
      {
        title: 'Practical Implementation Guide',
        content: 'To implement this pattern in your own projects: (1) Start with CLAUDE.md — define your project identity, voice, and anti-patterns. (2) Create 2-3 skill profiles for your main work contexts. (3) Add individual skills as markdown files with clear trigger patterns. (4) Build commands for workflows you repeat weekly. (5) Add hooks for quality automation. This can start small and grow organically.',
        items: [
          { title: 'For Solo Developers', description: 'CLAUDE.md + 5-10 skills + 3 commands. Focus on your most common workflows.', badge: 'Starter' },
          { title: 'For Teams', description: 'Shared CLAUDE.md + role-based profiles + 20-50 skills + 10 commands. Version control everything.', badge: 'Team' },
          { title: 'For Enterprise', description: 'Multi-repo CLAUDE.md hierarchy + profile library + 100+ skills + routing commands + hooks for compliance.', badge: 'Enterprise' },
        ],
      },
    ],
    keyFindings: [
      'CLAUDE.md acts as a "project constitution" that all agents inherit — brand voice, decision frameworks, and anti-patterns',
      'Multi-dimensional skill activation (keywords + intent + file patterns) ensures the right skills load without manual selection',
      'Lazy loading with max 5 concurrent skills scales to 500+ without overwhelming the agent',
      'Agent specialization with single responsibility and explicit handoff protocols prevents confusion',
      'Hooks automate quality gates (linting, testing, logging) at lifecycle boundaries without modifying agent behavior',
      'Commands are complete workflow playbooks, not just function calls — they include decision trees and quality checklists',
      'The four-layer hierarchy (CLAUDE.md → profiles → skills → commands) provides clear separation of concerns',
      'Arcanea Gates demonstrate gamification of skill progression — mapping technical skills to narrative milestones',
    ],
    relatedDomains: ['mcp-ecosystem', 'coding-assistants', 'multi-agent-systems', 'production-patterns'],
    relatedBlogPosts: ['/blog/build-your-own-jarvis-claude-code', '/blog/claude-code-2-1-mcp-revolution', '/blog/acos-zero-to-production-quickstart'],
    lastUpdated: '2026-02-06',
    sourceCount: 12,
    status: 'active',
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering & AI Orchestration',
    subtitle: 'From system prompts to production prompt architectures',
    description: 'Prompt engineering has evolved from "write a good system prompt" to building complete prompt architectures: template systems, chain-of-thought orchestration, retrieval-augmented generation, structured outputs, and adaptive prompting. Covers patterns used in production systems serving millions of requests.',
    tldr: 'Production prompt engineering in 2026 is about systems, not individual prompts. Key patterns: template hierarchies (base → context → task), chain-of-thought decomposition, structured output schemas, adaptive effort calibration (Claude\'s new adaptive thinking), and prompt caching for cost reduction. The shift from artisanal prompting to systematic prompt architecture separates demos from production.',
    icon: 'FileText',
    color: 'indigo',
    highlights: [
      { stat: '90%', label: 'Cost reduction via caching', source: 'Anthropic' },
      { stat: '4', label: 'Effort levels (adaptive)', source: 'Claude API' },
      { stat: '6', label: 'Core prompt patterns', source: 'Research' },
      { stat: '128K', label: 'Max output (Opus 4.6)', source: 'Anthropic' },
    ],
    sections: [
      {
        title: 'Production Prompt Patterns',
        content: 'Six patterns dominate production prompt engineering. Each solves a specific challenge in moving from prototype to reliable, scalable AI applications.',
        items: [
          { title: 'Template Hierarchies', description: 'Base system prompt → context injection → task-specific instructions. Separates identity from capability from task.', badge: 'Pattern 1' },
          { title: 'Chain-of-Thought Decomposition', description: 'Break complex tasks into explicit reasoning steps. Claude\'s adaptive thinking automates depth calibration.', badge: 'Pattern 2' },
          { title: 'Structured Output Schemas', description: 'JSON schemas, TypeScript interfaces, or Pydantic models define exact output format. Eliminates parsing failures.', badge: 'Pattern 3' },
          { title: 'Few-Shot with Dynamic Selection', description: 'Retrieve relevant examples from a library based on query similarity, not hardcoded examples.', badge: 'Pattern 4' },
          { title: 'Retrieval-Augmented Generation', description: 'Vector search + semantic ranking to inject relevant context. Reduces hallucination, enables domain expertise.', badge: 'Pattern 5' },
          { title: 'Prompt Caching', description: 'Cache static portions of prompts (system messages, tool definitions). Up to 90% cost reduction on repeated patterns.', badge: 'Pattern 6' },
        ],
      },
      {
        title: 'Adaptive Thinking (Claude 4.6)',
        content: 'Claude Opus 4.6 introduced adaptive thinking — the model auto-determines its reasoning depth based on query complexity. Four effort levels (low, medium, high, max) replace manual budget_tokens. This is a paradigm shift: instead of the developer guessing how much thinking is needed, the model calibrates itself. Low effort for simple retrieval, max effort for research-grade problems.',
        items: [
          { title: 'Low Effort', description: 'Simple factual retrieval, classification, routing decisions. Minimal thinking overhead.', badge: 'Speed' },
          { title: 'Medium Effort', description: 'Standard coding tasks, content generation, moderate reasoning. Default for most tasks.', badge: 'Balance' },
          { title: 'High Effort', description: 'Complex architecture decisions, multi-step debugging, research synthesis. Deep reasoning engaged.', badge: 'Quality' },
          { title: 'Max Effort', description: 'Research-grade problems, novel algorithm design, comprehensive analysis. Full reasoning capacity.', badge: 'Maximum' },
        ],
      },
      {
        title: 'Prompt Architecture for Agent Systems',
        content: 'Multi-agent systems require prompt architecture, not just individual prompts. The orchestrator prompt defines routing logic. Worker prompts define specialized capabilities. Evaluation prompts assess output quality. Meta-prompts coordinate between agents. Each layer has different requirements for temperature, token limits, and structured output format.',
      },
      {
        title: 'Common Anti-Patterns',
        content: 'The most common failures in production prompt engineering: (1) Over-constraining outputs — too many instructions create brittleness. (2) Context pollution — loading irrelevant context wastes tokens and confuses the model. (3) Missing output schemas — free-form text output is unparseable at scale. (4) Static few-shot examples — hardcoded examples don\'t generalize. (5) Ignoring cost — prompt engineering without cost modeling leads to budget overruns.',
      },
    ],
    keyFindings: [
      'Production prompt engineering is about systems (template hierarchies, caching, structured outputs), not individual prompts',
      'Adaptive thinking (Claude 4.6) auto-calibrates reasoning depth, replacing manual budget_tokens tuning',
      'Prompt caching can reduce costs by up to 90% for static system prompts and tool definitions',
      'Structured output schemas (JSON, TypeScript, Pydantic) eliminate parsing failures in production pipelines',
      'Dynamic few-shot selection (retrieval-based) outperforms static hardcoded examples by 20-30%',
      'Multi-agent systems require prompt architecture — orchestrator, worker, evaluator, and meta-prompts at each layer',
    ],
    relatedDomains: ['ai-agent-config', 'production-patterns', 'mcp-ecosystem', 'generative-ai'],
    relatedBlogPosts: ['/blog/prompt-engineering-mastery-workshop', '/blog/claude-opus-4-6-analysis-2026'],
    lastUpdated: '2026-02-06',
    sourceCount: 10,
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
