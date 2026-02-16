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
    { name: 'Anthropic', title: 'Claude Code Configuration Best Practices', url: 'https://docs.anthropic.com/en/docs/claude-code/tutorials', type: 'official' },
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

  'agentic-game-development': [
    { name: 'Jenova AI', title: 'AI Game Generator: The Complete 2026 Guide to AI-Powered Game Creation', url: 'https://www.jenova.ai/en/resources/ai-game-generator', date: '2026-01', type: 'blog' },
    { name: 'Google Cloud', title: '2025 Games Report — 87% of Devs Use AI Agents', url: 'https://cloud.google.com/resources/games-report', date: '2025-08', type: 'industry-report' },
    { name: 'PC Gamer', title: '87% of game developers are already using AI agents, Google survey shows', url: 'https://www.pcgamer.com/software/ai/87-percent-of-game-developers-are-already-using-ai-agents-and-over-a-third-use-ai-for-creative-elements-like-level-design-and-dialogue-according-to-a-new-google-survey/', date: '2025-08', type: 'news' },
    { name: 'ByteIota', title: 'WebGPU 2026: 70% Browser Support, 15x Performance Gains', url: 'https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/', date: '2025-12', type: 'blog' },
    { name: 'Can I Use', title: 'WebGPU Browser Support Tables', url: 'https://caniuse.com/webgpu', type: 'official' },
    { name: 'Elsner Technologies', title: 'AI Game Development Tools for 2026 | Top Picks', url: 'https://www.elsner.com/ai-game-development-tools/', date: '2025-11', type: 'blog' },
    { name: 'Phaser.io', title: 'Official Phaser 3 and Next.js Template', url: 'https://phaser.io/news/2024/03/official-phaser-3-and-nextjs-template', date: '2024-03', type: 'official' },
    { name: 'GitHub (phaserjs)', title: 'Phaser TypeScript project template that uses Next.js', url: 'https://github.com/phaserjs/template-nextjs', type: 'official' },
    { name: 'Utsubo', title: 'What Changed in Three.js 2026? WebGPU, Vibe Coding & Beyond', url: 'https://www.utsubo.com/blog/threejs-2026-what-changed', date: '2026-01', type: 'blog' },
    { name: 'npm', title: '@react-three/fiber npm package', url: 'https://www.npmjs.com/package/@react-three/fiber', type: 'official' },
    { name: 'Vercel', title: 'Do Vercel Serverless Functions support WebSocket connections?', url: 'https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections', type: 'official' },
    { name: 'Scenario', title: 'Scenario | AI-Powered Game Art Generation Platform', url: 'https://www.scenario.com', type: 'official' },
    { name: 'Inworld AI', title: 'Inworld AI | AI NPCs with Memory and Emotion', url: 'https://inworld.ai/', type: 'official' },
    { name: 'AIVA', title: 'AIVA, the AI Music Generation Assistant', url: 'https://www.aiva.ai/', type: 'official' },
    { name: 'Promethean AI', title: 'Promethean AI | AI Braintrust for Creative Teams', url: 'https://www.prometheanai.com', type: 'official' },
    { name: 'Game Developer', title: 'Promethean AI aims to take the grunt work out of worldbuilding through AI', url: 'https://www.gamedeveloper.com/art/promethean-ai-aims-to-take-the-grunt-work-out-of-worldbuilding-through-ai', type: 'news' },
    { name: 'Utsubo', title: 'Migrate Three.js to WebGPU (2026) — The Complete Checklist', url: 'https://www.utsubo.com/blog/webgpu-threejs-migration-guide', date: '2026-01', type: 'blog' },
    { name: 'PixiJS', title: 'PixiJS | The HTML5 Creation Engine', url: 'https://pixijs.com/', type: 'official' },
    { name: 'MDN Web Docs', title: 'Making PWA Games Work Offline with Service Workers', url: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers', type: 'official' },
    { name: 'web.dev', title: 'WebGPU is now supported in major browsers', url: 'https://web.dev/blog/webgpu-supported-major-browsers', date: '2025-09', type: 'official' },
  ],

  'investment-intelligence': [
    { name: 'Thomson Reuters', title: 'How AI and Document Intelligence Are Changing the Legal Tech Game', url: 'https://legal.thomsonreuters.com/en/insights/articles/how-ai-and-document-intelligence-are-changing-the-legal-tech-game', type: 'official' },
    { name: 'CPA Practice Advisor', title: 'Thomson Reuters Launches Agentic AI Solutions to Transform Tax, Audit and Accounting Workflows', url: 'https://www.cpapracticeadvisor.com/2025/11/05/thomson-reuters-launches-agentic-ai-solutions-to-transform-tax-audit-and-accounting-workflows/172307/', date: '2025-11', type: 'news' },
    { name: 'Anthropic', title: 'Claude for Financial Services', url: 'https://www.anthropic.com/news/claude-for-financial-services', date: '2025-07', type: 'official' },
    { name: 'Anthropic', title: 'Advancing Claude for Financial Services', url: 'https://www.anthropic.com/news/advancing-claude-for-financial-services', type: 'official' },
    { name: 'PitchBook', title: 'AI agent startup n8n lands $2.5B valuation with $180M Series C', url: 'https://pitchbook.com/news/articles/ai-agent-startup-n8n-lands-2-5b-valuation-with-180m-series-c', date: '2025-10', type: 'news' },
    { name: 'n8n Blog', title: 'n8n raises $180m to get AI closer to value with orchestration', url: 'https://blog.n8n.io/series-c/', date: '2025-10', type: 'official' },
    { name: 'Bain & Company', title: 'Generative AI in M&A: You\'re Not Behind -- Yet', url: 'https://www.bain.com/insights/generative-ai-m-and-a-report-2025/', date: '2025-02', type: 'industry-report' },
    { name: 'Morgan Stanley', title: 'AI in Software Development: Creating Jobs and Redefining Roles', url: 'https://www.morganstanley.com/insights/articles/ai-software-development-industry-growth', date: '2025-10', type: 'industry-report' },
    { name: 'Kensho / S&P Global', title: 'LLM-ready API & MCP Server Overview', url: 'https://docs.kensho.com/llmreadyapi/overview', type: 'official' },
    { name: 'S&P Global / Anthropic', title: 'S&P Global and Anthropic Announce Integration of Trusted Financial Data into Claude', url: 'https://www.prnewswire.com/news-releases/sp-global-and-anthropic-announce-integration-of-sp-globals-trusted-financial-data-into-claude-302505482.html', date: '2025-07', type: 'news' },
    { name: 'A-Team Insight / LSEG', title: 'LSEG Launches AI-Ready Content via MCP Server on Databricks Marketplace', url: 'https://a-teaminsight.com/briefs/lseg-launches-first-phase-of-ai-ready-content-via-mcp-server-on-databricks-marketplace/', date: '2025-11', type: 'news' },
    { name: 'EY (Ernst & Young)', title: 'How AI is sustainably transforming value creation in private equity', url: 'https://www.ey.com/en_ch/insights/strategy-transactions/ai-in-private-equity', date: '2025-11', type: 'industry-report' },
    { name: 'The Hedge Fund Journal', title: 'Applying AI to Investment, Operational and Legal Due Diligence', url: 'https://thehedgefundjournal.com/vantager-ai-investment-operational-legal-due-diligence/', date: '2025-07', type: 'journal' },
    { name: 'McKinsey & Company', title: 'Five ways to improve due diligence using gen AI', url: 'https://www.mckinsey.com/capabilities/transformation/our-insights/from-potential-to-performance-using-gen-ai-to-conduct-outside-in-diligence', type: 'industry-report' },
    { name: 'McKinsey & Company', title: 'Global Private Markets Report 2025', url: 'https://www.mckinsey.com/industries/private-capital/our-insights/global-private-markets-report', date: '2025-03', type: 'industry-report' },
  ],
}

export function getSourcesForDomain(slug: string): ResearchSource[] {
  return domainSources[slug] || []
}

/**
 * Returns the actual registered source count for a domain.
 * Use this instead of domain.sourceCount to avoid drift.
 */
export function getSourceCountForDomain(slug: string): number {
  return (domainSources[slug] || []).length
}

/**
 * Build-time validation: compare declared sourceCount with actual registered sources.
 * Call this in development to catch mismatches early.
 */
export function validateSourceCounts(
  domains: { slug: string; sourceCount: number; title: string }[]
): { slug: string; title: string; declared: number; actual: number }[] {
  const mismatches: { slug: string; title: string; declared: number; actual: number }[] = []
  for (const domain of domains) {
    const actual = (domainSources[domain.slug] || []).length
    if (actual !== domain.sourceCount) {
      mismatches.push({
        slug: domain.slug,
        title: domain.title,
        declared: domain.sourceCount,
        actual,
      })
    }
  }
  return mismatches
}
