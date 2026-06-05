/**
 * Research Hub Source Registry
 *
 * Every research domain's claims are backed by verifiable sources.
 * Sources are keyed by domain slug for simple per-page rendering.
 *
 * @see lib/research/domains.ts for domain definitions
 */

export type SourceType =
  | 'industry-report'
  | 'journal'
  | 'blog'
  | 'official'
  | 'news'
  | 'benchmark'
  | 'preprint'

export interface ResearchSource {
  name: string
  title: string
  url: string
  date?: string
  type: SourceType
}

export const sourceTypeLabels: Record<SourceType, string> = {
  'industry-report': 'Industry Report',
  journal: 'Peer-Reviewed',
  blog: 'Blog / Analysis',
  official: 'Official Docs',
  news: 'News',
  benchmark: 'Benchmark',
  preprint: 'Preprint',
}

/**
 * Domain-keyed source registry.
 * Each domain slug maps to an array of validated sources.
 */
export const domainSources: Record<string, ResearchSource[]> = {
  'enterprise-ai': [
    { name: 'MarketsAndMarkets', title: 'AI Agents Market Size — $7.84B to $52.62B by 2030', url: 'https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-56997845.html', type: 'industry-report' },
    { name: 'Gartner', title: 'Predicts 40% of Enterprise Apps Will Feature AI Agents by 2026', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-says-by-2028-33-percent-of-enterprise-software-applications-will-include-agentic-ai', type: 'industry-report' },
    { name: 'G2', title: 'Multi-Agent AI Adoption in Enterprise — 72% Report', url: 'https://www.g2.com/articles/ai-agents', type: 'industry-report' },
    { name: 'TechRepublic', title: 'AI Adoption Trends Enterprise 2026', url: 'https://www.techrepublic.com/article/ai-adoption-trends-enterprise/', type: 'news' },
    { name: 'Deloitte', title: 'AI Adoption Challenges and Trends', url: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/blogs/pulse-check-series-latest-ai-developments/ai-adoption-challenges-ai-trends.html', type: 'industry-report' },
    { name: 'Lucidworks', title: 'Enterprise AI Adoption in 2026: Trends, Gaps, and Strategic Insights', url: 'https://lucidworks.com/blog/enterprise-ai-adoption-in-2026-trends-gaps-and-strategic-insights', type: 'blog' },
    { name: 'CIO', title: '4 Critical Misconceptions Derailing Enterprise AI Adoption', url: 'https://www.cio.com/article/4116299/beyond-the-hype-4-critical-misconceptions-derailing-enterprise-ai-adoption.html', type: 'news' },
    { name: 'Redolent', title: 'Top 5 Enterprise AI Adoption Pitfalls in 2026', url: 'https://redolentech.com/top-5-enterprise-ai-adoption-pitfalls-in-2026/', type: 'blog' },
  ],

  'multi-agent-systems': [
    { name: 'LangChain', title: 'LangGraph Documentation — Multi-Agent Orchestration', url: 'https://python.langchain.com/docs/langgraph', type: 'official' },
    { name: 'CrewAI', title: 'CrewAI Documentation — Role-Based Agent Teams', url: 'https://docs.crewai.com', type: 'official' },
    { name: 'Microsoft', title: 'AutoGen / AG2 — Multi-Agent Framework', url: 'https://microsoft.github.io/autogen', type: 'official' },
    { name: 'G2', title: 'Multi-Agent AI Adoption Report — 72% Enterprise Adoption', url: 'https://www.g2.com/articles/ai-agents', type: 'industry-report' },
    { name: 'OpenAI', title: 'Agents SDK — Native GPT Agent Framework', url: 'https://openai.com/index/new-tools-for-building-agents/', type: 'official' },
    { name: 'IBM', title: 'What Is Agent2Agent (A2A) Protocol?', url: 'https://www.ibm.com/think/topics/agent2agent-protocol', type: 'official' },
    { name: 'Google Developers', title: 'Announcing the Agent2Agent Protocol (A2A) — A New Era of Agent Interoperability', url: 'https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/', type: 'official' },
    { name: 'Deloitte', title: 'Unlocking Exponential Value with AI Agent Orchestration', url: 'https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html', type: 'industry-report' },
    { name: 'arXiv', title: 'MAESTRO: Multi-Agent Evaluation Suite for Testing, Reliability, and Observability', url: 'https://arxiv.org/html/2601.00481v1', type: 'preprint' },
    { name: 'arXiv', title: 'Multi-Agent Risks from Advanced AI', url: 'https://arxiv.org/abs/2502.14143', type: 'preprint' },
    { name: 'World Economic Forum', title: 'Using AI Agents in Organizations Today and in the Future', url: 'https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/', type: 'industry-report' },
  ],

  'production-patterns': [
    { name: 'Oracle', title: 'OCI Generative AI Capabilities', url: 'https://www.oracle.com/artificial-intelligence/generative-ai/', type: 'official' },
    { name: 'Oracle', title: 'OCI AI Agent Platform', url: 'https://www.oracle.com/artificial-intelligence/generative-ai/agents/', type: 'official' },
    { name: 'Oracle', title: 'GA of OCI Gen AI Agent Platform', url: 'https://blogs.oracle.com/ai-and-datascience/ga-of-oci-gen-ai-agent-platform', type: 'official' },
    { name: 'Oracle', title: 'OCI GenAI Agents Documentation', url: 'https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/overview.htm', type: 'official' },
    { name: 'Oracle', title: 'First Principles: OCI AI Agent Platform', url: 'https://blogs.oracle.com/cloud-infrastructure/first-principles-oci-ai-agent-platform', type: 'blog' },
    { name: 'AIMultiple', title: 'Oracle AI Agents Analysis', url: 'https://research.aimultiple.com/oracle-ai-agents/', type: 'blog' },
  ],

  'mcp-ecosystem': [
    { name: 'Anthropic', title: 'Claude 4 Introduction', url: 'https://www.anthropic.com/news/claude-4', type: 'official' },
    { name: 'Anthropic', title: 'Claude Opus 4.5 Announcement', url: 'https://www.anthropic.com/news/claude-opus-4-5', type: 'official' },
    { name: 'Claude', title: 'Claude Release Notes', url: 'https://support.claude.com/en/articles/12138966-release-notes', type: 'official' },
    { name: 'VentureBeat', title: 'Anthropic Launches Enterprise Agent Skills and Opens the Standard', url: 'https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard/', type: 'news' },
    { name: 'Fortune', title: 'Claude Code Viral Moment — Non-Coders Building Software', url: 'https://fortune.com/2026/01/24/anthropic-boris-cherny-claude-code-non-coders-software-engineers/', type: 'news' },
    { name: 'Anthropic', title: 'Agent Capabilities API', url: 'https://www.anthropic.com/news/agent-capabilities-api', type: 'official' },
    { name: 'Anthropic', title: 'MCP Connectors and Partners', url: 'https://www.anthropic.com/partners/mcp', type: 'official' },
    { name: 'Claude Code', title: 'Claude Code CHANGELOG', url: 'https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md', type: 'official' },
    { name: 'Claude Code', title: 'Hooks Reference — Claude Code Docs', url: 'https://code.claude.com/docs/en/hooks', type: 'official' },
    { name: 'Claude Code', title: 'Skills Documentation — Claude Code Docs', url: 'https://code.claude.com/docs/en/skills', type: 'official' },
    { name: 'Anthropic', title: 'Advanced Tool Use Engineering', url: 'https://www.anthropic.com/engineering/advanced-tool-use', type: 'official' },
    { name: 'VentureBeat', title: 'Claude Code MCP Tool Search Feature', url: 'https://venturebeat.com/orchestration/claude-code-just-got-updated-with-one-of-the-most-requested-user-features', type: 'news' },
    { name: 'Zapier', title: 'MCP with Anthropic API Integration', url: 'https://zapier.com/blog/zapier-mcp-anthropic-api/', type: 'blog' },
  ],

  'ai-ops': [
    { name: 'Oracle', title: 'OCI Generative AI Capabilities', url: 'https://www.oracle.com/artificial-intelligence/generative-ai/', type: 'official' },
    { name: 'Oracle', title: 'OCI AI Agent Platform', url: 'https://www.oracle.com/artificial-intelligence/generative-ai/agents/', type: 'official' },
    { name: 'Oracle', title: 'OCI GenAI Agents Documentation', url: 'https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/overview.htm', type: 'official' },
    { name: 'AIMultiple', title: 'Oracle AI Agents Analysis', url: 'https://research.aimultiple.com/oracle-ai-agents/', type: 'blog' },
    { name: 'Databricks', title: 'LLMOps: Operationalizing Large Language Models', url: 'https://www.databricks.com/glossary/llmops', type: 'official' },
    { name: 'IBM', title: 'Observability Trends 2026', url: 'https://www.ibm.com/think/insights/observability-trends', type: 'industry-report' },
    { name: 'Grafana Labs', title: '2026 Observability Trends and Predictions', url: 'https://grafana.com/blog/2026-observability-trends-predictions-from-grafana-labs-unified-intelligent-and-open/', type: 'official' },
    { name: 'Braintrust', title: 'AI Observability Tools: Monitoring AI Agents in Production (2026)', url: 'https://www.braintrust.dev/articles/best-ai-observability-tools-2026', type: 'blog' },
    { name: 'Deloitte', title: 'The AI Infrastructure Reckoning: Optimizing Compute Strategy in the Age of Inference', url: 'https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/ai-infrastructure-compute-strategy.html', type: 'industry-report' },
    { name: 'Wiz', title: 'AI Compliance in 2026: Definition, Standards, and Frameworks', url: 'https://www.wiz.io/academy/ai-security/ai-compliance', type: 'official' },
    { name: 'DataCamp', title: 'Top 15 LLMOps Tools for Building AI Applications in 2026', url: 'https://www.datacamp.com/blog/llmops-tools', type: 'blog' },
  ],

  'ai-neuroscience': [
    { name: 'STAT News', title: 'BCI Technology Trends 2026', url: 'https://www.statnews.com/2025/12/26/brain-computer-interface-technology-trends-2026/', type: 'news' },
    { name: 'OpenAI', title: 'Investing in Merge Labs', url: 'https://openai.com/index/investing-in-merge-labs/', type: 'official' },
    { name: 'Neuralink', title: 'Neuralink Updates — PRIME Trial', url: 'https://neuralink.com/updates/', type: 'official' },
    { name: 'Financial Content', title: 'Neuromorphic Computing Goes Mainstream in 2026', url: 'https://www.financialcontent.com/article/tokenring-2026-1-21-the-brain-inspired-revolution-neuromorphic-computing-goes-mainstream-in-2026', type: 'news' },
    { name: 'Nature Neuroscience', title: 'Adaptive Intelligence', url: 'https://www.nature.com/articles/s41593-025-02169-w', type: 'journal' },
    { name: 'Nature', title: 'Mind-Captioning AI', url: 'https://www.nature.com/articles/d41586-025-03624-1', type: 'journal' },
    { name: 'UT Austin', title: 'Brain Activity Decoder Reveals Stories in People\'s Minds', url: 'https://news.utexas.edu/2023/05/01/brain-activity-decoder-can-reveal-stories-in-peoples-minds/', type: 'journal' },
    { name: 'Inside Precision Medicine', title: 'Decoding Inner Speech in Real-Time with AI and BCIs', url: 'https://www.insideprecisionmedicine.com/topics/informatics/decoding-inner-speech-in-real-time-with-ai-and-brain-computer-interfaces/', type: 'journal' },
    { name: 'Frontiers in Science', title: 'Organoid Intelligence', url: 'https://www.frontiersin.org/journals/science/articles/10.3389/fsci.2023.1017235/full', type: 'journal' },
    { name: 'RealClearScience', title: 'Growing Computers from Human Brain Cells', url: 'https://www.realclearscience.com/articles/2026/01/12/how_scientists_are_growing_computers_from_human_brain_cells_1158120.html', type: 'news' },
    { name: 'APA', title: 'Trends in Personalized Mental Health Care', url: 'https://www.apa.org/monitor/2026/01-02/trends-personalized-mental-health-care', type: 'journal' },
    { name: 'Science', title: 'Transforming Mental Health with AI', url: 'https://www.science.org/doi/10.1126/science.adz9193', type: 'journal' },
    { name: 'AI Frontiers', title: 'The Evidence for AI Consciousness Today', url: 'https://ai-frontiers.org/articles/the-evidence-for-ai-consciousness-today', type: 'blog' },
    { name: 'Frontiers in Science', title: 'Consciousness Science 2025', url: 'https://www.frontiersin.org/journals/science/articles/10.3389/fsci.2025.1546279/full', type: 'journal' },
    { name: 'Trends in Cognitive Sciences', title: 'Indicators of Consciousness in AI', url: 'https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00286-4', type: 'journal' },
  ],

  'vector-databases': [
    { name: 'Ryz Labs', title: 'Pinecone vs Weaviate vs Qdrant — Best Vector Database for RAG 2026', url: 'https://learn.ryzlabs.com/rag-vector-search/pinecone-vs-weaviate-vs-qdrant-the-best-vector-database-for-rag-in-2026', type: 'blog' },
    { name: 'LiquidMetal AI', title: 'Vector Database Comparison', url: 'https://liquidmetal.ai/casesAndBlogs/vector-comparison/', type: 'blog' },
    { name: 'Xenoss', title: 'Vector Database Comparison: Pinecone, Qdrant, Weaviate', url: 'https://xenoss.io/blog/vector-database-comparison-pinecone-qdrant-weaviate', type: 'blog' },
    { name: 'DataCamp', title: 'Best Vector Databases 2026', url: 'https://www.datacamp.com/blog/the-top-5-vector-databases', type: 'blog' },
    { name: 'AIMultiple', title: 'Vector Database for RAG', url: 'https://research.aimultiple.com/vector-database-for-rag/', type: 'blog' },
  ],

  'ai-security': [
    { name: 'Microsoft Security', title: 'Four Priorities for AI-Powered Identity and Network Access Security in 2026', url: 'https://www.microsoft.com/en-us/security/blog/2026/01/20/four-priorities-for-ai-powered-identity-and-network-access-security-in-2026/', type: 'official' },
    { name: 'CyberArk', title: 'AI Agents and Identity Risks — How Security Will Shift in 2026', url: 'https://www.cyberark.com/resources/blog/ai-agents-and-identity-risks-how-security-will-shift-in-2026', type: 'blog' },
    { name: 'HelpNetSecurity', title: 'F5 AI Guardrails Red Team', url: 'https://www.helpnetsecurity.com/2026/01/15/f5-ai-guardrails-red-team/', type: 'news' },
    { name: 'StateTech', title: 'AI Guardrails Will Stop Being Optional in 2026', url: 'https://statetechmagazine.com/article/2026/01/ai-guardrails-will-stop-being-optional-2026', type: 'news' },
    { name: 'Guardrails AI', title: 'Guardrails AI — Open-Source AI Safety Platform', url: 'https://www.guardrailsai.com/', type: 'official' },
    { name: 'Dark Reading', title: 'Coders Adopt AI Agents, Security Pitfalls Lurk in 2026', url: 'https://www.darkreading.com/application-security/coders-adopt-ai-agents-security-pitfalls-lurk-2026', type: 'news' },
  ],

  'coding-assistants': [
    { name: 'Nucamp', title: 'Top 10 Vibe Coding Tools in 2026', url: 'https://www.nucamp.co/blog/top-10-vibe-coding-tools-in-2026-cursor-copilot-claude-code-more', type: 'blog' },
    { name: 'Seedium', title: 'AI Coding Assistants Comparison', url: 'https://seedium.io/blog/comparison-of-best-ai-coding-assistants/', type: 'blog' },
    { name: 'Faros AI', title: 'Best AI Coding Agents 2026', url: 'https://www.faros.ai/blog/best-ai-coding-agents-2026', type: 'blog' },
    { name: 'PlayCode', title: 'Best AI Coding Assistants 2026', url: 'https://playcode.io/blog/best-ai-coding-assistants-2026', type: 'blog' },
    { name: 'Pragmatic Coders', title: 'AI Developer Tools', url: 'https://www.pragmaticcoders.com/resources/ai-developer-tools', type: 'blog' },
  ],

  'ai-adoption': [
    { name: 'TechRepublic', title: 'AI Adoption Trends Enterprise 2026', url: 'https://www.techrepublic.com/article/ai-adoption-trends-enterprise/', type: 'news' },
    { name: 'Deloitte', title: 'AI Adoption Challenges and Trends', url: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/blogs/pulse-check-series-latest-ai-developments/ai-adoption-challenges-ai-trends.html', type: 'industry-report' },
    { name: 'Lucidworks', title: 'Enterprise AI Adoption in 2026: Trends, Gaps, Strategic Insights', url: 'https://lucidworks.com/blog/enterprise-ai-adoption-in-2026-trends-gaps-and-strategic-insights', type: 'blog' },
    { name: 'CIO', title: '4 Critical Misconceptions Derailing Enterprise AI', url: 'https://www.cio.com/article/4116299/beyond-the-hype-4-critical-misconceptions-derailing-enterprise-ai-adoption.html', type: 'news' },
    { name: 'Redolent', title: 'Top 5 Enterprise AI Adoption Pitfalls in 2026', url: 'https://redolentech.com/top-5-enterprise-ai-adoption-pitfalls-in-2026/', type: 'blog' },
  ],

  'agent-benchmarks': [
    { name: 'AI Native Dev', title: '8 Benchmarks Shaping the Next Generation of AI Agents', url: 'https://ainativedev.io/news/8-benchmarks-shaping-the-next-generation-of-ai-agents', type: 'blog' },
    { name: 'Epoch AI', title: 'SWE-bench Verified Leaderboard', url: 'https://epoch.ai/benchmarks/swe-bench-verified', type: 'benchmark' },
    { name: 'Sierra', title: 'τ-Bench — Benchmarking AI Agents', url: 'https://sierra.ai/blog/benchmarking-ai-agents', type: 'benchmark' },
    { name: 'Evidently AI', title: 'AI Agent Benchmarks Overview', url: 'https://www.evidentlyai.com/blog/ai-agent-benchmarks', type: 'blog' },
    { name: 'Scale AI', title: 'SWE-bench Pro Public Leaderboard', url: 'https://scale.com/leaderboard/swe_bench_pro_public', type: 'benchmark' },
    { name: 'OpenAI', title: 'Introducing SWE-bench Verified', url: 'https://openai.com/index/introducing-swe-bench-verified/', type: 'official' },
  ],

  'ai-mental-health': [
    { name: 'APA', title: 'Trends in Personalized Mental Health Care', url: 'https://www.apa.org/monitor/2026/01-02/trends-personalized-mental-health-care', type: 'journal' },
    { name: 'Science', title: 'Transforming Mental Health with AI', url: 'https://www.science.org/doi/10.1126/science.adz9193', type: 'journal' },
    { name: 'JMIR Publications', title: 'AI-Driven Chatbots for Mental Health Support: Mixed Methods Study', url: 'https://www.jmir.org/2025/1/e67114', type: 'journal' },
    { name: 'Nature Communications Medicine', title: 'Increasing Engagement with CBT Using Generative AI: Randomized Controlled Trial', url: 'https://www.nature.com/articles/s43856-025-01321-8', type: 'journal' },
    { name: 'PMC', title: 'AI-Powered CBT Chatbots: A Systematic Review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11904749/', type: 'journal' },
    { name: 'Brown University', title: 'AI Chatbots Systematically Violate Mental Health Ethics Standards', url: 'https://www.brown.edu/news/2025-10-21/ai-mental-health-ethics', type: 'news' },
    { name: 'Stanford HAI', title: 'Exploring the Dangers of AI in Mental Health Care', url: 'https://hai.stanford.edu/news/exploring-the-dangers-of-ai-in-mental-health-care', type: 'blog' },
    { name: 'UK Parliament POST', title: 'AI and Mental Healthcare — Ethical and Regulatory Considerations', url: 'https://post.parliament.uk/research-briefings/post-pn-0738/', type: 'official' },
    { name: 'Toward Healthcare', title: 'U.S. Digital Mental Health Market to Grow at 20.25% CAGR till 2035', url: 'https://www.towardshealthcare.com/insights/us-digital-mental-health-market-sizing', type: 'industry-report' },
    { name: 'American Hospital Association', title: '3 Ways AI Could Aid Behavioral Health Screenings', url: 'https://www.aha.org/2025-04-15-3-ways-ai-could-aid-behavioral-health-screenings', type: 'industry-report' },
  ],

  'generative-ai': [
    { name: 'Anthropic', title: 'Claude 4 Introduction', url: 'https://www.anthropic.com/news/claude-4', type: 'official' },
    { name: 'Anthropic', title: 'Claude Opus 4.5 Announcement', url: 'https://www.anthropic.com/news/claude-opus-4-5', type: 'official' },
    { name: 'Claude', title: 'Claude Release Notes', url: 'https://support.claude.com/en/articles/12138966-release-notes', type: 'official' },
    { name: 'GlobalGPT', title: 'Claude AI Plans 2026', url: 'https://www.glbgpt.com/hub/claude-ai-plans-2026/', type: 'blog' },
    { name: 'LM Council', title: 'AI Model Benchmarks Feb 2026 — GPT-5, Claude 4.5, Gemini 2.5, Grok 4', url: 'https://lmcouncil.ai/benchmarks', type: 'benchmark' },
    { name: 'Vellum AI', title: 'Flagship Model Report: GPT-5.1 vs Gemini 3 Pro vs Claude Opus 4.5', url: 'https://www.vellum.ai/blog/flagship-model-report', type: 'industry-report' },
    { name: 'Stanford HAI', title: 'Technical Performance — The 2025 AI Index Report', url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance', type: 'industry-report' },
    { name: 'Hugging Face', title: 'Best Open-Source LLMs 2025: Llama 4, Qwen 3, DeepSeek R1', url: 'https://huggingface.co/blog/daya-shankar/open-source-llms', type: 'official' },
    { name: 'Red Hat', title: 'The State of Open Source AI Models in 2025', url: 'https://developers.redhat.com/articles/2026/01/07/state-open-source-ai-models-2025', type: 'industry-report' },
    { name: 'Epoch AI', title: 'Can AI Scaling Continue Through 2030?', url: 'https://epoch.ai/blog/can-ai-scaling-continue-through-2030', type: 'industry-report' },
  ],

  'ai-agent-config': [
    { name: 'Claude Code', title: 'CLAUDE.md Configuration — Claude Code Docs', url: 'https://code.claude.com/docs/en/claude-md', type: 'official' },
    { name: 'Claude Code', title: 'Skills Documentation', url: 'https://code.claude.com/docs/en/skills', type: 'official' },
    { name: 'Claude Code', title: 'Hooks Reference', url: 'https://code.claude.com/docs/en/hooks', type: 'official' },
    { name: 'FrankX', title: 'ACOS — Agentic Creator Operating System', url: 'https://frankx.ai/products/agentic-creator-os', type: 'official' },
    { name: 'Builder.io', title: 'The Complete Guide to CLAUDE.md', url: 'https://www.builder.io/blog/claude-md-guide', type: 'blog' },
    { name: 'HumanLayer', title: 'Writing a Good CLAUDE.md', url: 'https://www.humanlayer.dev/blog/writing-a-good-claude-md', type: 'blog' },
    { name: 'Anthropic', title: 'Model Context Protocol Specification', url: 'https://modelcontextprotocol.io/specification/2025-11-25', type: 'official' },
    { name: 'GitHub', title: 'Model Context Protocol Servers', url: 'https://github.com/modelcontextprotocol/servers', type: 'official' },
    { name: 'Composio', title: 'Tool Calling Explained: The Core of AI Agents (2026 Guide)', url: 'https://composio.dev/blog/ai-agent-tool-calling-guide', type: 'blog' },
    { name: 'OpenAI', title: 'Function Calling — OpenAI API', url: 'https://platform.openai.com/docs/guides/function-calling', type: 'official' },
  ],

  'prompt-engineering': [
    { name: 'Anthropic', title: 'Prompt Caching — Up to 90% Cost Reduction', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching', type: 'official' },
    { name: 'Anthropic', title: 'Extended Thinking and Adaptive Reasoning', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking', type: 'official' },
    { name: 'Anthropic', title: 'Claude API Pricing', url: 'https://www.anthropic.com/pricing', type: 'official' },
    { name: 'Anthropic', title: 'Prompt Engineering Overview — Claude API Docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', type: 'official' },
    { name: 'OpenAI', title: 'Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', type: 'official' },
    { name: 'DAIR.AI', title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', type: 'blog' },
    { name: 'arXiv', title: 'The Prompt Report: A Systematic Survey of Prompt Engineering Techniques', url: 'https://arxiv.org/abs/2406.06608', type: 'preprint' },
    { name: 'OWASP', title: 'LLM Prompt Injection Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html', type: 'official' },
    { name: 'IBM', title: 'The 2026 Guide to Prompt Engineering', url: 'https://www.ibm.com/think/prompt-engineering', type: 'industry-report' },
    { name: 'Microsoft', title: 'How Microsoft Defends Against Indirect Prompt Injection Attacks', url: 'https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks', type: 'blog' },
  ],

  'context-engineering': [
    { name: 'Andrej Karpathy', title: 'Context Engineering — original framing on X', url: 'https://x.com/karpathy/status/1937902205765607626', date: '2025-06-25', type: 'blog' },
    { name: 'Anthropic', title: 'Effective Context Engineering for AI Agents', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', date: '2025-09-29', type: 'official' },
    { name: 'Anthropic', title: 'Claude Code Skills — Progressive Disclosure of Capabilities', url: 'https://docs.claude.com/en/docs/claude-code/skills', date: '2025-10-15', type: 'official' },
    { name: 'Anthropic', title: 'Model Context Protocol — Open Standard for AI Tool Integration', url: 'https://modelcontextprotocol.io/introduction', date: '2025-11-25', type: 'official' },
    { name: 'arXiv / TACL', title: 'Lost in the Middle: How Language Models Use Long Contexts (Liu et al.)', url: 'https://arxiv.org/abs/2307.03172', date: '2024-07', type: 'journal' },
    { name: 'arXiv', title: 'RULER: What\'s the Real Context Size of Your Long-Context Language Models? (Hsieh et al.)', url: 'https://arxiv.org/abs/2404.06654', date: '2024-08', type: 'benchmark' },
    { name: 'Bojie Li (AWS re:Invent 2025 synthesis)', title: 'Claude\'s Context Engineering Secrets — Best Practices Learned from Anthropic', url: 'https://01.me/en/2025/12/context-engineering-from-claude/', date: '2025-12-20', type: 'blog' },
    { name: 'InfoQ', title: 'Anthropic Introduces Managed Agents to Simplify AI Agent Deployment (Kumili)', url: 'https://www.infoq.com/news/2026/04/anthropic-managed-agents/', date: '2026-04-21', type: 'news' },
    { name: 'arXiv / ICLR 2026', title: 'Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models (Zhang et al.)', url: 'https://arxiv.org/abs/2510.04618', date: '2026-03-29', type: 'preprint' },
    { name: 'arXiv', title: 'Structured Context Engineering for File-Native Agentic Systems (McMillan)', url: 'https://arxiv.org/abs/2602.05447', date: '2026-02-12', type: 'preprint' },
  ],

  'agent-evaluation': [
    { name: 'arXiv', title: 'AppWorld: A Controllable World of Apps and People for Benchmarking Interactive Coding Agents (Trivedi et al.)', url: 'https://arxiv.org/abs/2407.18901', date: '2024-07', type: 'preprint' },
    { name: 'arXiv / ICLR 2024', title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (Jimenez et al.)', url: 'https://arxiv.org/abs/2310.06770', date: '2024-01', type: 'benchmark' },
    { name: 'arXiv', title: 'AMA-Bench: Evaluating Long-Horizon Memory for Agentic Applications (Zhao et al.)', url: 'https://arxiv.org/abs/2602.22769', date: '2026-03-04', type: 'preprint' },
    { name: 'arXiv', title: 'RULER: What\'s the Real Context Size of Your Long-Context Language Models? (Hsieh et al.)', url: 'https://arxiv.org/abs/2404.06654', date: '2024-08', type: 'benchmark' },
    { name: 'Anthropic', title: 'Effective Context Engineering for AI Agents — failures are test cases you haven\'t written yet', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', date: '2025-09-29', type: 'official' },
    { name: 'arXiv / ICLR 2026', title: 'Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models (Zhang et al.)', url: 'https://arxiv.org/abs/2510.04618', date: '2026-03-29', type: 'preprint' },
    { name: 'Anthropic Engineering', title: 'Managed Agents — sessions and trace capture as first-class primitives (Martin/Cemaj/Cohen)', url: 'https://www.anthropic.com/engineering/managed-agents', date: '2026-04-08', type: 'official' },
    { name: 'Langfuse', title: 'LLM Observability for Agent Trajectories — Traces, Scores, and Evaluations', url: 'https://langfuse.com/docs/tracing', date: '2026-01', type: 'official' },
  ],

  'ai-education': [
    { name: 'UNESCO', title: 'Two-Thirds of Higher Education Institutions Developing AI Guidance', url: 'https://www.unesco.org/en/articles/unesco-survey-two-thirds-higher-education-institutions-have-or-are-developing-guidance-ai-use', type: 'official' },
    { name: 'Inside Higher Ed', title: '5 Predictions on How AI Will Shape Higher Ed in 2026', url: 'https://www.insidehighered.com/news/tech-innovation/artificial-intelligence/2026/01/05/5-predictions-how-ai-will-shape-higher-ed', type: 'news' },
    { name: 'Programs.com', title: 'New Data: 92% of Students Use AI', url: 'https://programs.com/resources/students-using-ai/', type: 'industry-report' },
    { name: 'Springer Nature', title: 'AI-Based Personalised Learning in Education: Systematic Literature Review', url: 'https://link.springer.com/article/10.1007/s44163-025-00598-x', type: 'journal' },
    { name: 'Brookings Institution', title: 'What the Research Shows About Generative AI in Tutoring', url: 'https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring/', type: 'industry-report' },
    { name: 'OECD', title: 'OECD Digital Education Outlook 2026', url: 'https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html', type: 'official' },
    { name: 'New America', title: 'Digital Literacy in the Age of AI: Voices from the Field', url: 'https://www.newamerica.org/education-policy/briefs/foundational-skills-digital-literacy-in-the-age-of-ai-analysis-and-voices-from-the-field/', type: 'industry-report' },
    { name: 'Precedence Research', title: 'AI in Education Market Size to Surge USD 112.30 Bn by 2034', url: 'https://www.precedenceresearch.com/ai-in-education-market', type: 'industry-report' },
    { name: 'MarketsAndMarkets', title: 'AI in Education Market Size — Global Industry Forecast', url: 'https://www.marketsandmarkets.com/Market-Reports/ai-in-education-market-200371366.html', type: 'industry-report' },
    { name: 'Faculty Focus', title: 'Designing the 2026 Classroom: Emerging Learning Trends in AI-Powered Education', url: 'https://www.facultyfocus.com/articles/teaching-with-technology-articles/designing-the-2026-classroom-emerging-learning-trends-in-an-ai-powered-education-system/', type: 'blog' },
  ],
  'ai-creative-tools': [
    { name: 'Adobe', title: 'Innovation and Authenticity — Adobe 2026 Creative Trends Forecast', url: 'https://business.adobe.com/resources/creative-trends-report.html', type: 'industry-report' },
    { name: 'Envato', title: 'Beyond Adoption: The State of AI in Creative Work 2026', url: 'https://elements.envato.com/learn/ai-trend-report', type: 'industry-report' },
    { name: 'Grand View Research', title: 'Generative AI in Content Creation Market Size Report, 2030', url: 'https://www.grandviewresearch.com/industry-analysis/generative-ai-content-creation-market-report', type: 'industry-report' },
    { name: 'Market.us', title: 'AI in Art and Creativity Market Size — CAGR of 25.8%', url: 'https://market.us/report/ai-in-art-and-creativity-market/', type: 'industry-report' },
    { name: 'Soundverse', title: 'How Suno AI Compares to Other Music Generation Tools in 2026', url: 'https://www.soundverse.ai/blog/article/how-sunos-ai-compares-to-other-music-generation-tools-1323', type: 'blog' },
    { name: 'Superprompt', title: 'Best AI Music Generators in 2026: Suno vs Udio vs AIVA Compared', url: 'https://superprompt.com/blog/best-ai-music-generators', type: 'blog' },
    { name: 'InVideo', title: 'Kling vs Sora vs Veo vs Runway: The AI Video Reality Check', url: 'https://invideo.io/blog/kling-vs-sora-vs-veo-vs-runway/', type: 'blog' },
    { name: 'Zapier', title: 'The 6 Best AI Writing Generators in 2026', url: 'https://zapier.com/blog/best-ai-writing-generator/', type: 'blog' },
    { name: 'Gradually.ai', title: 'The 9 Best AI Image Generation Models in 2026', url: 'https://www.gradually.ai/en/ai-image-models/', type: 'blog' },
  ],
  'ai-personal-productivity': [
    { name: 'McKinsey', title: 'Superagency in the Workplace: Empowering People to Unlock AI\'s Full Potential', url: 'https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work', type: 'industry-report' },
    { name: 'Deloitte', title: 'The State of AI in the Enterprise — 2026 AI Report', url: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html', type: 'industry-report' },
    { name: 'Andreessen Horowitz', title: 'State of Consumer AI 2025: Product Hits, Misses, and What\'s Next', url: 'https://a16z.com/state-of-consumer-ai-2025-product-hits-misses-and-whats-next/', type: 'industry-report' },
    { name: 'Stack Overflow', title: 'AI — 2025 Stack Overflow Developer Survey', url: 'https://survey.stackoverflow.co/2025/ai', type: 'benchmark' },
    { name: 'Lenny\'s Newsletter', title: 'AI Tools Are Overdelivering: Results from Our Large-Scale AI Productivity Survey', url: 'https://www.lennysnewsletter.com/p/ai-tools-are-overdelivering-results', type: 'blog' },
    { name: 'First Page Sage', title: 'ChatGPT Usage Statistics: February 2026', url: 'https://firstpagesage.com/seo-blog/chatgpt-usage-statistics/', type: 'blog' },
    { name: 'GPTrends', title: 'AI Chatbot Usage Statistics mid-2025: ChatGPT, Gemini, Claude, Perplexity & DeepSeek', url: 'https://gptrends.io/blog/mid-2025-ai-chatbot-scorecard/', type: 'blog' },
    { name: 'Master of Code', title: 'AI Workflow Automation: Boost Productivity by 4.8x — 2026 Guide', url: 'https://masterofcode.com/blog/ai-workflow-automation', type: 'blog' },
    { name: 'Index.dev', title: 'Top 100 Developer Productivity Statistics with AI Tools 2026', url: 'https://www.index.dev/blog/developer-productivity-statistics-with-ai-tools', type: 'blog' },
  ],
  'ai-healthcare': [
    { name: 'MDPI Applied Sciences', title: 'Artificial Intelligence in Medical Diagnostics: Foundations, Clinical Applications, and Future Directions', url: 'https://www.mdpi.com/2076-3417/16/2/728', type: 'journal' },
    { name: 'Ardigen', title: 'AI in Biotech: Lessons from 2025 and Trends Shaping Drug Discovery in 2026', url: 'https://ardigen.com/ai-in-biotech-lessons-from-2025-and-the-trends-shaping-drug-discovery-in-2026/', type: 'industry-report' },
    { name: 'ScienceDirect', title: 'Leading AI-Driven Drug Discovery Platforms: 2025 Landscape and Global Outlook', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0031699725075118', type: 'journal' },
    { name: 'Applied Clinical Trials', title: 'Clinical Trials in 2026: Platformization, AI Fluency, and the Value Chain', url: 'https://www.appliedclinicaltrialsonline.com/view/clinical-trials-2026-platformization-ai-fluency-value-chain', type: 'industry-report' },
    { name: 'American Hospital Association', title: 'How AI Is Transforming Clinical Trials', url: 'https://www.aha.org/aha-center-health-innovation-market-scan/2025-10-21-how-ai-transforming-clinical-trials', type: 'industry-report' },
    { name: 'MarketsAndMarkets', title: 'AI in Healthcare Market Worth $110.61 Billion by 2030', url: 'https://www.marketsandmarkets.com/PressReleases/artificial-intelligence-healthcare.asp', type: 'industry-report' },
    { name: 'Fortune Business Insights', title: 'AI in Healthcare Market Size and Growth Report [2026-2034]', url: 'https://www.fortunebusinessinsights.com/industry-reports/artificial-intelligence-in-healthcare-market-100534', type: 'industry-report' },
    { name: 'PMC', title: 'Smart Healthcare at Home: AI-Enabled Wearables and Diagnostics Review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12526596/', type: 'journal' },
    { name: 'STAT News', title: 'FDA Announces Sweeping Changes to Oversight of Wearables, AI-Enabled Devices', url: 'https://www.statnews.com/2026/01/06/fda-pulls-back-oversight-ai-enabled-devices-wearables/', type: 'news' },
    { name: 'European Commission', title: 'Artificial Intelligence in Healthcare — Public Health', url: 'https://health.ec.europa.eu/ehealth-digital-health-and-care/artificial-intelligence-healthcare_en', type: 'official' },
    { name: 'ScienceDirect', title: 'The EU Artificial Intelligence Act (2024): Implications for Healthcare', url: 'https://www.sciencedirect.com/science/article/pii/S0168851024001623', type: 'journal' },
  ],
  'creator-economy-ai': [
    { name: 'GlobeNewswire', title: 'AI in Creator Economy Global Market Report 2025-2029 and 2034', url: 'https://www.globenewswire.com/news-release/2026/01/07/3214698/28124/en/Artificial-Intelligence-in-Creator-Economy-Global-Market-Report-2025-2029-and-2034-Opportunities-in-Influencer-Collaborations-Audience-Engagement-Analytics-Generative-AI-Content-Pr.html', type: 'industry-report' },
    { name: 'GlobeNewswire', title: 'Creator Monetization Optimization AI Research Report — $5.46B Market', url: 'https://www.globenewswire.com/news-release/2026/01/29/3228461/28124/en/Creator-Monetization-Optimization-Artificial-Intelligence-AI-Research-Report-2025-5-46-Bn-Market-Opportunities-Trends-Competitive-Analysis-Strategies-and-Forecasts-2019-2024-2024-2.html', type: 'industry-report' },
    { name: 'Precedence Research', title: 'Creator Economy Market Size to Hit USD 2084.57 Billion by 2035', url: 'https://www.precedenceresearch.com/creator-economy-market', type: 'industry-report' },
    { name: 'eMarketer', title: 'FAQ on the Creator Economy: How Marketers Can Stand Out in 2026', url: 'https://www.emarketer.com/content/faq-on-creator-economy--how-marketers-stand-2026-', type: 'industry-report' },
    { name: 'The Wrap', title: 'More Than 1 Million YouTube Channels Used AI Tools in December', url: 'https://www.thewrap.com/industry-news/tech/youtube-2026-goals-ai-monetization-neal-mohan-letter/', type: 'news' },
    { name: 'TechCrunch', title: 'YouTube Will Soon Let Creators Make Shorts with Their Own AI Likeness', url: 'https://techcrunch.com/2026/01/21/youtube-will-soon-let-creators-make-shorts-with-their-own-ai-likeness/', type: 'news' },
    { name: 'PrometAI', title: 'The Rise of the Solopreneur Tech Stack in 2026', url: 'https://prometai.app/blog/solopreneur-tech-stack-2026', type: 'blog' },
    { name: 'Silicon India', title: 'How AI Tools Are Letting Solo Founders Build Empires in 2026', url: 'https://www.siliconindia.com/news/startups/how-ai-tools-are-letting-solo-founders-build-empires-in-2026-nid-238909-cid-19.html', type: 'news' },
    { name: 'Google', title: 'How Google and the C2PA Are Increasing Transparency for Gen AI Content', url: 'https://blog.google/innovation-and-ai/products/google-gen-ai-content-transparency-c2pa/', type: 'official' },
    { name: 'AIM Research', title: 'Content Authenticity: Tools and Use Cases in 2026', url: 'https://research.aimultiple.com/content-authenticity/', type: 'blog' },
  ],
  'investment-intelligence': [
    { name: 'Thomson Reuters', title: 'AI in Due Diligence — Reducing Document Review Time', url: 'https://www.thomsonreuters.com/en/artificial-intelligence.html', type: 'industry-report' },
    { name: 'Anthropic', title: 'Financial Services Case Study — AI Productivity Gains', url: 'https://www.anthropic.com/customers', type: 'industry-report' },
    { name: 'PitchBook', title: 'n8n Valuation and Series C Funding Data', url: 'https://pitchbook.com/profiles/n8n-io-b3e7a6b5-7f48-4d6d-bd22-7097dd67b59d', type: 'industry-report' },
    { name: 'Bain & Company', title: 'M&A Professionals Using Generative AI in Transactions', url: 'https://www.bain.com/insights/m-and-a-report/', type: 'industry-report' },
    { name: 'Morgan Stanley', title: 'AI-Native Software Development Economics', url: 'https://www.morganstanley.com/ideas/ai-software-development', type: 'industry-report' },
    { name: 'Anthropic', title: 'MCP Connectors — Financial Data Platform Integrations', url: 'https://www.anthropic.com/partners/mcp', type: 'official' },
    { name: 'n8n', title: 'n8n Workflow Automation Platform', url: 'https://n8n.io', type: 'official' },
    { name: 'LSEG', title: 'Data & Analytics Solutions for Financial Professionals', url: 'https://www.lseg.com/en/data-analytics', type: 'official' },
  ],
  'agentic-game-development': [
    { name: 'Jenova AI', title: 'AI Game Generator Market Size — $1.94B to $32.48B by 2035', url: 'https://www.jenovaai.com/blog/ai-game-generator-market', type: 'industry-report' },
    { name: 'Google', title: 'Games Developer Report — AI Agent Adoption', url: 'https://developers.google.com/games', type: 'industry-report' },
    { name: 'ByteIota', title: 'WebGPU vs WebGL Performance Benchmarks', url: 'https://byteiota.com/webgpu-vs-webgl/', type: 'benchmark' },
    { name: 'Elsner Technologies', title: 'AI in Game Development — 70% Faster Development', url: 'https://www.elsner.com/blog/ai-in-game-development/', type: 'blog' },
    { name: 'Phaser', title: 'Official Next.js Integration Template', url: 'https://phaser.io/news/2024/02/phaser-nextjs-template', type: 'official' },
    { name: 'Scenario', title: 'AI Game Asset Generation Platform', url: 'https://www.scenario.com', type: 'official' },
    { name: 'Inworld AI', title: 'AI NPC Character Engine', url: 'https://inworld.ai', type: 'official' },
    { name: 'AIVA', title: 'AI Music Composition for Games', url: 'https://www.aiva.ai', type: 'official' },
  ],
  'voice-tech-2026': [
    // Microsoft VibeVoice
    { name: 'arXiv', title: 'VibeVoice Technical Report (Peng et al., arXiv:2508.19205)', url: 'https://arxiv.org/abs/2508.19205', date: '2025-08-26', type: 'preprint' },
    { name: 'Microsoft / GitHub', title: 'VibeVoice — Open-Source Frontier Voice AI', url: 'https://github.com/microsoft/VibeVoice', type: 'official' },
    { name: 'Microsoft Research', title: 'VibeVoice Project Page', url: 'https://microsoft.github.io/VibeVoice/', type: 'official' },
    { name: 'Hugging Face', title: 'microsoft/VibeVoice-1.5B Model Card', url: 'https://huggingface.co/microsoft/VibeVoice-1.5B', type: 'official' },
    { name: 'Hugging Face', title: 'microsoft/VibeVoice-Realtime-0.5B Model Card', url: 'https://huggingface.co/microsoft/VibeVoice-Realtime-0.5B', type: 'official' },
    // NVIDIA Riva + Parakeet
    { name: 'Hugging Face / NVIDIA', title: 'Parakeet RNNT 1.1B Model Card — 1.6% WER LibriSpeech-clean', url: 'https://huggingface.co/nvidia/parakeet-rnnt-1.1b', type: 'official' },
    { name: 'Hugging Face / NVIDIA', title: 'Parakeet TDT 0.6B v3 Model Card', url: 'https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3', type: 'official' },
    { name: 'NVIDIA', title: 'Riva — Real-Time Speech AI Developer Page', url: 'https://developer.nvidia.com/riva', type: 'official' },
    { name: 'Hugging Face', title: 'Open ASR Leaderboard — Multilingual + Long-Form Speech Recognition', url: 'https://huggingface.co/spaces/hf-audio/open_asr_leaderboard', type: 'benchmark' },
    { name: 'arXiv', title: 'Open ASR Leaderboard: Towards Reproducible and Transparent Speech Recognition Evaluation', url: 'https://arxiv.org/html/2510.06961v1', type: 'preprint' },
    // ElevenLabs
    { name: 'ElevenLabs', title: 'Eleven v3 — Most Expressive AI Voice Model', url: 'https://elevenlabs.io/v3', type: 'official' },
    { name: 'ElevenLabs (X)', title: 'Eleven v3 (alpha) Launch Announcement', url: 'https://x.com/elevenlabsio/status/1930689774278570003', date: '2025-06-05', type: 'news' },
    { name: 'Audio Generation Plugin', title: 'ElevenLabs Eleven v3 Alpha — Complete Guide to Audio Tags', url: 'https://audio-generation-plugin.com/elevenlabs-v3/', type: 'blog' },
    { name: 'ElevenLabs', title: 'Text-to-Speech API Reference (Turbo v2.5 + Multilingual)', url: 'https://elevenlabs.io/docs/api-reference/text-to-speech', type: 'official' },
    { name: 'ElevenLabs', title: 'Safety, Consent, and Watermarking Policy', url: 'https://elevenlabs.io/safety', type: 'official' },
    // OpenAI Realtime
    { name: 'OpenAI', title: 'Realtime API Guide — Speech-to-Speech with Function Calling', url: 'https://platform.openai.com/docs/guides/realtime', type: 'official' },
    { name: 'OpenAI', title: 'Introducing gpt-realtime and Realtime API Updates for Production Voice Agents', url: 'https://openai.com/index/introducing-gpt-realtime/', type: 'official' },
    { name: 'OpenAI', title: 'API Pricing — Realtime Audio Tokens ($32/$64 per 1M)', url: 'https://openai.com/api/pricing/', type: 'official' },
    // Cartesia
    { name: 'Cartesia', title: 'Sonic — Sub-100ms Streaming TTS Product Page', url: 'https://cartesia.ai/sonic', type: 'official' },
    { name: 'Cartesia', title: 'Cartesia API Documentation — Streaming + Voice Cloning', url: 'https://docs.cartesia.ai/', type: 'official' },
    { name: 'Cartesia', title: 'Older TTS Models — Sonic-2 and Predecessors', url: 'https://docs.cartesia.ai/build-with-cartesia/tts-models/older-models', type: 'official' },
    // Deepgram
    { name: 'BusinessWire / Deepgram', title: 'Deepgram Unveils Aura-2 — Enterprise-Grade Text-to-Speech', url: 'https://www.businesswire.com/news/home/20250415446781/en/Deepgram-Unveils-Aura-2-The-Worlds-Most-Professional-Cost-Effective-and-Enterprise-Grade-Text-to-Speech-Model', date: '2025-04-15', type: 'news' },
    { name: 'Deepgram', title: 'Deepgram Pricing — Aura-2 ($0.030/1k chars) + Nova-3 ($0.0077/min)', url: 'https://deepgram.com/pricing', type: 'official' },
    { name: 'PricingSaaS', title: 'Deepgram Launches Voice Agent API and Doubles Aura-2 Capacity', url: 'https://pricingsaas.com/news/deepgram/20251118/', type: 'news' },
    { name: 'Deepgram', title: 'Aura-2 TTS Models Documentation', url: 'https://developers.deepgram.com/docs/tts-models', type: 'official' },
    { name: 'Deepgram', title: 'Nova-3 ASR Models + Languages Overview', url: 'https://developers.deepgram.com/docs/models-languages-overview', type: 'official' },
    // Independent benchmarks
    { name: 'Async', title: 'Streaming TTS Latency vs Quality Benchmark — Async vs ElevenLabs vs Cartesia', url: 'https://async.com/blog/tts-latency-vs-quality-benchmark/', type: 'benchmark' },
    { name: 'Smallest.ai', title: 'TTS Benchmark 2025 — Smallest.ai vs Cartesia (Real-World TTFB 156-163ms)', url: 'https://smallest.ai/blog/tts-benchmark-2025-smallestai-vs-cartesia-report', type: 'benchmark' },
    { name: 'CloudX (DEV)', title: 'Cracking the Sub-1-Second Voice Loop — 30+ Stack Benchmarks', url: 'https://dev.to/cloudx/cracking-the-1-second-voice-loop-what-we-learned-after-30-stack-benchmarks-427', type: 'benchmark' },
    { name: 'Hugging Face', title: 'TTS Arena — Community-Voted Naturalness Rankings', url: 'https://huggingface.co/spaces/TTS-AGI/TTS-Arena', type: 'benchmark' },
    { name: 'PodcastVideos', title: 'Streaming TTS Latency-Quality Comparison 2025', url: 'https://www.podcastvideos.com/articles/streaming-tts-benchmark-latency-quality-comparison/', type: 'benchmark' },
    // Regulation / context
    { name: 'EU AI Act', title: 'Artificial Intelligence Act — Voice Cloning + Provenance Provisions', url: 'https://artificialintelligenceact.eu/', type: 'official' },
  ],

  'law-ai': [
    { name: 'European Commission', title: 'AI Act — Regulatory Framework for Artificial Intelligence', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai', date: '2025', type: 'official' },
    { name: 'Future of Life Institute', title: 'EU AI Act Implementation Timeline', url: 'https://artificialintelligenceact.eu/implementation-timeline/', date: '2025', type: 'official' },
    { name: 'NIST', title: 'AI Risk Management Framework (AI RMF 1.0) + Generative AI Profile (NIST-AI-600-1)', url: 'https://www.nist.gov/itl/ai-risk-management-framework', date: '2024-07-26', type: 'official' },
    { name: 'Colorado General Assembly', title: 'SB24-205 — Consumer Protections for Artificial Intelligence', url: 'https://leg.colorado.gov/bills/sb24-205', date: '2024', type: 'official' },
    { name: 'Norton Rose Fulbright', title: 'The Texas Responsible AI Governance Act (TRAIGA)', url: 'https://www.nortonrosefulbright.com/en/knowledge/publications/c6c60e0c/the-texas-responsible-ai-governance-act', date: '2025', type: 'blog' },
    { name: 'U.S. Court of Appeals, D.C. Circuit', title: 'Thaler v. Perlmutter, No. 23-5233 — Opinion (human authorship)', url: 'https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf', date: '2025-03-18', type: 'official' },
    { name: 'Mayer Brown', title: 'Supreme Court Denies Review in AI Authorship Case (Thaler)', url: 'https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case', date: '2026-03', type: 'blog' },
    { name: 'U.S. District Court, D. Delaware', title: 'Thomson Reuters v. Ross Intelligence — Summary Judgment Opinion', url: 'https://www.ded.uscourts.gov/sites/ded/files/opinions/20-613_5.pdf', date: '2025-02', type: 'official' },
    { name: 'Copyright Alliance', title: 'Bartz v. Anthropic — Order on Fair Use', url: 'https://copyrightalliance.org/wp-content/uploads/2025/06/Bartz-v.-Anthropic-Order.pdf', date: '2025-06', type: 'official' },
    { name: 'Authors Guild', title: 'What Authors Need to Know About the Anthropic Settlement ($1.5B)', url: 'https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/', date: '2025-09', type: 'official' },
    { name: 'Latham & Watkins', title: 'Getty Images v. Stability AI — English High Court Rejects Secondary Copyright Claim', url: 'https://www.lw.com/en/insights/getty-images-v-stability-ai-english-high-court-rejects-secondary-copyright-claim', date: '2025-11', type: 'blog' },
    { name: 'NPR', title: 'Judge Allows New York Times Copyright Case Against OpenAI to Go Forward', url: 'https://www.npr.org/2025/03/26/nx-s1-5288157/new-york-times-openai-copyright-case-goes-forward', date: '2025-03-26', type: 'news' },
    { name: 'American Bar Association', title: 'The Legal Industry Report 2025 — AI Adoption Survey', url: 'https://www.americanbar.org/groups/law_practice/resources/law-technology-today/2025/the-legal-industry-report-2025/', date: '2025', type: 'industry-report' },
    { name: 'Bloomberg Law', title: 'AI-Faked Cases Become Core Issue Irritating Overworked Judges (Charlotin database)', url: 'https://news.bloomberglaw.com/legal-ops-and-tech/ai-faked-cases-become-core-issue-irritating-overworked-judges', date: '2025-12', type: 'news' },
    { name: 'IAPP', title: 'European Commission Withdraws AI Liability Directive From Consideration', url: 'https://iapp.org/news/a/european-commission-withdraws-ai-liability-directive-from-consideration', date: '2025-02', type: 'news' },
    { name: 'Wisconsin Supreme Court', title: 'State v. Loomis, 2016 WI 68 — Opinion (COMPAS risk scoring)', url: 'https://www.wicourts.gov/sc/opinion/DisplayDocument.pdf?content=pdf&seqNo=171690', date: '2016-07', type: 'official' },
    { name: 'ProPublica', title: 'Machine Bias — Risk Assessments in Criminal Sentencing (COMPAS)', url: 'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing', date: '2016-05-23', type: 'journal' },
  ],
}

export function getSourcesForDomain(slug: string): ResearchSource[] {
  return domainSources[slug] || []
}
