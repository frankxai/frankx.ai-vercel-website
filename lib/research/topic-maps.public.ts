// Public topic navigation only. No generated claims, metrics, source leads or review dates.
import type { DomainCategory } from './domains'

export type PublicTopicMap = { slug: string; title: string; category?: DomainCategory; icon: string; color: string }
export const publicTopicMaps: PublicTopicMap[] = [
  {
    "slug": "frontier-reasoning-models",
    "title": "Frontier Reasoning Models & Test-Time Compute",
    "category": "frontier-ai",
    "icon": "Brain",
    "color": "emerald"
  },
  {
    "slug": "mixture-of-experts-architectures",
    "title": "Mixture-of-Experts (MoE) & Multi-Head Latent Attention",
    "category": "frontier-ai",
    "icon": "Layers",
    "color": "cyan"
  },
  {
    "slug": "context-engineering-long-context",
    "title": "Context Engineering & Long-Context Architecture",
    "category": "frontier-ai",
    "icon": "Database",
    "color": "violet"
  },
  {
    "slug": "reinforcement-learning-verifiable-rewards",
    "title": "Reinforcement Learning from Verifiable Rewards (RLVR)",
    "category": "frontier-ai",
    "icon": "ShieldCheck",
    "color": "emerald"
  },
  {
    "slug": "multimodal-reasoning-foundations",
    "title": "Multimodal Reasoning & Vision-Language-Action Models",
    "category": "frontier-ai",
    "icon": "Palette",
    "color": "rose"
  },
  {
    "slug": "post-training-distillation",
    "title": "Post-Training Distillation & Speculative Decoding",
    "category": "frontier-ai",
    "icon": "Cpu",
    "color": "amber"
  },
  {
    "slug": "synthetic-data-curation-pipelines",
    "title": "Synthetic Data Curation & Automated Curricula",
    "category": "frontier-ai",
    "icon": "Sparkles",
    "color": "indigo"
  },
  {
    "slug": "diffusion-transformers-neural-video",
    "title": "Diffusion Transformers & Generative Neural Video",
    "category": "frontier-ai",
    "icon": "Radar",
    "color": "fuchsia"
  },
  {
    "slug": "neural-audio-speech-synthesis",
    "title": "Neural Audio Synthesis & Conversational Speech Models",
    "category": "frontier-ai",
    "icon": "Activity",
    "color": "teal"
  },
  {
    "slug": "sparse-attention-linear-transformers",
    "title": "Sparse Attention, State Space Models & Linear Transformers",
    "category": "frontier-ai",
    "icon": "Code",
    "color": "sky"
  },
  {
    "slug": "representation-engineering-mechanistic-interpretability",
    "title": "Representation Engineering & Mechanistic Interpretability",
    "category": "frontier-ai",
    "icon": "Search",
    "color": "emerald"
  },
  {
    "slug": "adversarial-robustness-jailbreak-defense",
    "title": "Adversarial Robustness & Jailbreak Defense Architectures",
    "category": "frontier-ai",
    "icon": "Shield",
    "color": "rose"
  },
  {
    "slug": "multilingual-frontier-intelligence",
    "title": "Multilingual Frontier Intelligence & Cross-Lingual Transfer",
    "category": "frontier-ai",
    "icon": "Compass",
    "color": "blue"
  },
  {
    "slug": "mathematical-theorem-proving-ai",
    "title": "Mathematical Theorem Proving & Formal Verification AI",
    "category": "frontier-ai",
    "icon": "GraduationCap",
    "color": "violet"
  },
  {
    "slug": "embodied-physical-ai-world-models",
    "title": "Embodied Physical AI & Spatial World Models",
    "category": "frontier-ai",
    "icon": "Rocket",
    "color": "orange"
  },
  {
    "slug": "ai-model-strategy",
    "title": "Enterprise AI Model Strategy: Build, Fine-Tune, or Buy?",
    "category": "frontier-ai",
    "icon": "Scale",
    "color": "emerald"
  },
  {
    "slug": "multi-agent-orchestration-swarms",
    "title": "Multi-Agent Swarm Orchestration & Consensus Protocols",
    "category": "agentic-systems",
    "icon": "Network",
    "color": "emerald"
  },
  {
    "slug": "agentic-memory-architectures",
    "title": "Agentic Memory Architectures: Episodic, Semantic & Procedural",
    "category": "agentic-systems",
    "icon": "Database",
    "color": "emerald"
  },
  {
    "slug": "mcp-ecosystem-tool-calling",
    "title": "Model Context Protocol (MCP) & Universal Tool Ecosystems",
    "category": "agentic-systems",
    "icon": "Layers",
    "color": "cyan"
  },
  {
    "slug": "self-correction-reflexion-loops",
    "title": "Self-Correction, Reflexion Loops & Tree-of-Thoughts",
    "category": "agentic-systems",
    "icon": "Brain",
    "color": "emerald"
  },
  {
    "slug": "goal-oriented-action-planning-goap",
    "title": "Goal-Oriented Action Planning (GOAP) & Dynamic AI Planners",
    "category": "agentic-systems",
    "icon": "Compass",
    "color": "emerald"
  },
  {
    "slug": "agentic-evals-swe-bench-trajectories",
    "title": "Agentic Evals, SWE-bench & Trajectory Benchmarking",
    "category": "agentic-systems",
    "icon": "CheckCircle",
    "color": "emerald"
  },
  {
    "slug": "agent-sovereignty-sandboxing-security",
    "title": "Agent Sovereignty, Sandboxing & Security Boundaries",
    "category": "agentic-systems",
    "icon": "Shield",
    "color": "rose"
  },
  {
    "slug": "agent-to-agent-protocols-a2a",
    "title": "Agent-to-Agent Protocols (A2A) & Interoperability Standards",
    "category": "agentic-systems",
    "icon": "Network",
    "color": "cyan"
  },
  {
    "slug": "intent-architecture-semantic-compilers",
    "title": "Intent Architecture & Deterministic Semantic Compilers",
    "category": "agentic-systems",
    "icon": "Code",
    "color": "teal"
  },
  {
    "slug": "graph-rag-knowledge-graphs",
    "title": "GraphRAG: Knowledge Graphs & Relational Reasoning",
    "category": "agentic-systems",
    "icon": "Network",
    "color": "emerald"
  },
  {
    "slug": "agent-skills-frameworks-l0-l5",
    "title": "Agent Skills Frameworks: Modular Packaging & L0–L5 Progression",
    "category": "agentic-systems",
    "icon": "Package",
    "color": "emerald"
  },
  {
    "slug": "swarm-telemetry-opentelemetry-tracing",
    "title": "Swarm Telemetry, OpenTelemetry & Distributed Agent Tracing",
    "category": "agentic-systems",
    "icon": "Radar",
    "color": "emerald"
  },
  {
    "slug": "human-in-the-loop-governance",
    "title": "Human-in-the-Loop (HITL) Governance & Verification Gates",
    "category": "agentic-systems",
    "icon": "ShieldCheck",
    "color": "emerald"
  },
  {
    "slug": "coding-agents-full-stack",
    "title": "Autonomous Coding Agents & Full-Stack Software Engineering",
    "category": "agentic-systems",
    "icon": "Code",
    "color": "emerald"
  },
  {
    "slug": "computer-use-gui-agents",
    "title": "Computer Use, GUI Agents & Visual Grounding",
    "category": "agentic-systems",
    "icon": "Cpu",
    "color": "emerald"
  },
  {
    "slug": "gpu-architecture-blackwell-rubin",
    "title": "NVIDIA Blackwell & Rubin GPU Architecture",
    "category": "ai-infrastructure",
    "icon": "Cpu",
    "color": "emerald"
  },
  {
    "slug": "lpu-domain-specific-inference-chips",
    "title": "Language Processing Units (LPUs) & SRAM Silicon",
    "category": "ai-infrastructure",
    "icon": "Activity",
    "color": "cyan"
  },
  {
    "slug": "wafer-scale-engines-cerebras-cs3",
    "title": "Wafer-Scale Engines & Cerebras CS-3 Systems",
    "category": "ai-infrastructure",
    "icon": "Layers",
    "color": "violet"
  },
  {
    "slug": "ai-factories-megawatt-datacenters",
    "title": "AI Factories, Megawatt Datacenters & Grid Infrastructure",
    "category": "ai-infrastructure",
    "icon": "Building2",
    "color": "orange"
  },
  {
    "slug": "high-speed-ai-fabrics-networking",
    "title": "High-Speed AI Network Fabrics: InfiniBand, RoCEv2 & Optical Switching",
    "category": "ai-infrastructure",
    "icon": "Network",
    "color": "emerald"
  },
  {
    "slug": "oci-superclusters-cloud-ai-infra",
    "title": "Oracle Cloud (OCI) Superclusters & Sovereign Cloud Architecture",
    "category": "ai-infrastructure",
    "icon": "Building2",
    "color": "rose"
  },
  {
    "slug": "energy-economics-nuclear-smr-ai",
    "title": "AI Energy Economics, Nuclear Power & SMR Micro-Grids",
    "category": "ai-infrastructure",
    "icon": "Sparkles",
    "color": "amber"
  },
  {
    "slug": "on-device-edge-ai-silicon",
    "title": "On-Device Edge AI Silicon & Neural Processing Units (NPUs)",
    "category": "ai-infrastructure",
    "icon": "Cpu",
    "color": "sky"
  },
  {
    "slug": "open-source-accelerators-tenstorrent",
    "title": "Open Silicon & RISC-V AI Accelerators (Tenstorrent)",
    "category": "ai-infrastructure",
    "icon": "Code",
    "color": "emerald"
  },
  {
    "slug": "application-specific-transformer-asics",
    "title": "Application-Specific Transformer ASICs (Etched Sohu)",
    "category": "ai-infrastructure",
    "icon": "Cpu",
    "color": "amber"
  },
  {
    "slug": "vector-database-infrastructure",
    "title": "Vector Database Infrastructure & Distributed Indexing",
    "category": "ai-infrastructure",
    "icon": "Database",
    "color": "violet"
  },
  {
    "slug": "ai-inference-optimization-runtimes",
    "title": "AI Inference Optimization Runtimes & Serving Engines",
    "category": "ai-infrastructure",
    "icon": "Rocket",
    "color": "cyan"
  },
  {
    "slug": "confidential-computing-gpu-security",
    "title": "Confidential Computing & Hardware-Attested GPU Security",
    "category": "ai-infrastructure",
    "icon": "Shield",
    "color": "rose"
  },
  {
    "slug": "ai-storage-distributed-filesystems",
    "title": "High-Throughput AI Storage & Distributed Parallel Filesystems",
    "category": "ai-infrastructure",
    "icon": "Database",
    "color": "emerald"
  },
  {
    "slug": "neutral-atom-quantum-computing",
    "title": "Neutral Atom Quantum Computing & Rydberg Arrays",
    "category": "quantum-technology",
    "icon": "Sparkles",
    "color": "emerald"
  },
  {
    "slug": "superconducting-qubit-systems",
    "title": "Superconducting Qubit Systems & Transmon Physics",
    "category": "quantum-technology",
    "icon": "Cpu",
    "color": "cyan"
  },
  {
    "slug": "topological-qubits-majorana-modes",
    "title": "Topological Qubits & Majorana Zero Modes",
    "category": "quantum-technology",
    "icon": "Shield",
    "color": "violet"
  },
  {
    "slug": "quantum-error-correction-fault-tolerance",
    "title": "Quantum Error Correction (QEC) & Fault-Tolerant Thresholds",
    "category": "quantum-technology",
    "icon": "ShieldCheck",
    "color": "emerald"
  },
  {
    "slug": "quantum-machine-learning-algorithms",
    "title": "Quantum Machine Learning (QML) & Variational Circuits",
    "category": "quantum-technology",
    "icon": "Brain",
    "color": "rose"
  },
  {
    "slug": "quantum-sensing-atomic-metrology",
    "title": "Quantum Sensing, Atomic Metrology & Gravimetry",
    "category": "quantum-technology",
    "icon": "Radar",
    "color": "amber"
  },
  {
    "slug": "post-quantum-cryptography-standards",
    "title": "Post-Quantum Cryptography (PQC) & NIST Standards",
    "category": "quantum-technology",
    "icon": "Shield",
    "color": "emerald"
  },
  {
    "slug": "quantum-simulation-molecular-discovery",
    "title": "Quantum Simulation & Molecular Discovery",
    "category": "quantum-technology",
    "icon": "Sparkles",
    "color": "teal"
  },
  {
    "slug": "photonic-quantum-computing",
    "title": "Photonic Quantum Computing & Squeezed Light",
    "category": "quantum-technology",
    "icon": "Sparkles",
    "color": "cyan"
  },
  {
    "slug": "trapped-ion-quantum-processors",
    "title": "Trapped-Ion Quantum Processors & Shuttling Architectures",
    "category": "quantum-technology",
    "icon": "Cpu",
    "color": "emerald"
  },
  {
    "slug": "hybrid-classical-quantum-hpc",
    "title": "Hybrid Classical-Quantum HPC & Accelerated Heterogeneous Computing",
    "category": "quantum-technology",
    "icon": "Network",
    "color": "violet"
  },
  {
    "slug": "quantum-interconnects-networks",
    "title": "Quantum Interconnects & The Quantum Internet",
    "category": "quantum-technology",
    "icon": "Network",
    "color": "sky"
  },
  {
    "slug": "quantum-materials-topological-insulators",
    "title": "Quantum Materials, 2D Heterostructures & Topological Insulators",
    "category": "quantum-technology",
    "icon": "Layers",
    "color": "emerald"
  },
  {
    "slug": "quantum-information-entropy-foundations",
    "title": "Quantum Information Theory, Entropy & Physical Foundations",
    "category": "quantum-technology",
    "icon": "Compass",
    "color": "violet"
  },
  {
    "slug": "epigenetics-molecular-biology-intention",
    "title": "Epigenetics, Molecular Biology & The Biochemistry of Intention",
    "category": "reality-architecture",
    "icon": "Activity",
    "color": "emerald"
  },
  {
    "slug": "bioelectricity-morphogenetic-fields",
    "title": "Bioelectricity, Morphogenetic Fields & Cellular Cognition",
    "category": "reality-architecture",
    "icon": "Sparkles",
    "color": "cyan"
  },
  {
    "slug": "orchestrated-objective-reduction-quantum-biology",
    "title": "Orchestrated Objective Reduction (Orch-OR) & Quantum Biology",
    "category": "reality-architecture",
    "icon": "Brain",
    "color": "violet"
  },
  {
    "slug": "predictive-processing-active-inference",
    "title": "Predictive Processing, Active Inference & The Bayesian Brain",
    "category": "reality-architecture",
    "icon": "Compass",
    "color": "emerald"
  },
  {
    "slug": "interface-theory-of-perception",
    "title": "The Interface Theory of Perception & Spacetime as a Desktop",
    "category": "reality-architecture",
    "icon": "Palette",
    "color": "rose"
  },
  {
    "slug": "neuroplasticity-cortical-reorganization",
    "title": "Neuroplasticity, Cortical Reorganization & Mental Rehearsal",
    "category": "reality-architecture",
    "icon": "Brain",
    "color": "emerald"
  },
  {
    "slug": "heart-brain-coherence-neurocardiology",
    "title": "Heart-Brain Coherence, HRV & Neurocardiology",
    "category": "reality-architecture",
    "icon": "Heart",
    "color": "rose"
  },
  {
    "slug": "contemplative-neuroscience-eeg-gamma",
    "title": "Contemplative Neuroscience & High-Amplitude EEG Gamma Synchrony",
    "category": "reality-architecture",
    "icon": "Sparkles",
    "color": "violet"
  },
  {
    "slug": "placebo-nocebo-endogenous-pharmacology",
    "title": "The Placebo Effect & Endogenous Pharmacology",
    "category": "reality-architecture",
    "icon": "Activity",
    "color": "emerald"
  },
  {
    "slug": "cellular-information-processing-mechanobiology",
    "title": "Cellular Information Processing & Mechanobiology",
    "category": "reality-architecture",
    "icon": "Sparkles",
    "color": "teal"
  },
  {
    "slug": "circadian-biology-mitochondrial-quantum-metabolism",
    "title": "Circadian Biology, Photobiomodulation & Mitochondrial Quantum Metabolism",
    "category": "reality-architecture",
    "icon": "Activity",
    "color": "amber"
  },
  {
    "slug": "neuro-linguistic-reality-framing",
    "title": "Cognitive Linguistics, Metaphor & Reality Framing",
    "category": "reality-architecture",
    "icon": "FileText",
    "color": "rose"
  },
  {
    "slug": "internal-family-systems-multiplicity-of-mind",
    "title": "Internal Family Systems (IFS) & The Multiplicity of Mind",
    "category": "reality-architecture",
    "icon": "Heart",
    "color": "violet"
  },
  {
    "slug": "somatic-experiencing-nervous-system-regulation",
    "title": "Somatic Experiencing, Polyvagal Theory & Autonomic Regulation",
    "category": "reality-architecture",
    "icon": "Heart",
    "color": "emerald"
  },
  {
    "slug": "the-light-within-contemplative-protocol",
    "title": "The Light Within: Contemplative Stillness & Cognitive Sovereignty",
    "category": "reality-architecture",
    "icon": "Sparkles",
    "color": "amber"
  },
  {
    "slug": "agentic-product-development",
    "title": "Agentic Product Development & Autonomous Software Lifecycles",
    "category": "agentic-products",
    "icon": "Package",
    "color": "emerald"
  },
  {
    "slug": "agentic-game-development",
    "title": "Agentic Game Development & Procedural World Systems",
    "category": "agentic-products",
    "icon": "Sparkles",
    "color": "violet"
  },
  {
    "slug": "agentic-foundry-micro-saas-automation",
    "title": "The Agentic Foundry & Micro-SaaS Venture Automation",
    "category": "agentic-products",
    "icon": "Layers",
    "color": "emerald"
  },
  {
    "slug": "autonomous-creative-studios-multimodal",
    "title": "Autonomous Multimodal Creative Studios & Synthetic Media",
    "category": "agentic-products",
    "icon": "Palette",
    "color": "rose"
  },
  {
    "slug": "digital-products-knowledge-engines",
    "title": "Digital Products, Knowledge Engines & Adaptive Curricula",
    "category": "agentic-products",
    "icon": "BookOpen",
    "color": "emerald"
  },
  {
    "slug": "spatial-computing-neural-rendering",
    "title": "Spatial Computing, 3D Gaussian Splatting & Neural Rendering",
    "category": "agentic-products",
    "icon": "Cpu",
    "color": "cyan"
  },
  {
    "slug": "neuro-generative-audio-music-systems",
    "title": "Neural Audio Synthesis & Generative Music Systems",
    "category": "agentic-products",
    "icon": "Sparkles",
    "color": "emerald"
  },
  {
    "slug": "algorithmic-asset-monetization-systems",
    "title": "Algorithmic Asset Monetization & Dynamic Digital Vaults",
    "category": "agentic-products",
    "icon": "Layers",
    "color": "amber"
  },
  {
    "slug": "agentic-e-commerce-dynamic-pricing",
    "title": "Agentic E-Commerce & Autonomous Supply Chain Optimization",
    "category": "agentic-products",
    "icon": "Package",
    "color": "emerald"
  },
  {
    "slug": "voice-ai-conversational-agents",
    "title": "Voice AI, Full-Duplex Audio & Conversational Agents",
    "category": "agentic-products",
    "icon": "Phone",
    "color": "emerald"
  },
  {
    "slug": "digital-clones-interactive-personas",
    "title": "Digital Clones, Interactive Personas & Identity Sovereignty",
    "category": "agentic-products",
    "icon": "Users",
    "color": "violet"
  },
  {
    "slug": "creator-economy-ai-monetization",
    "title": "The AI Creator Economy & Sovereign Wealth Flywheels",
    "category": "agentic-products",
    "icon": "Layers",
    "color": "emerald"
  },
  {
    "slug": "agentic-content-ops-flywheel",
    "title": "The Agentic Content Operations Flywheel & 6-Layer Engine",
    "category": "agentic-products",
    "icon": "Activity",
    "color": "emerald"
  },
  {
    "slug": "enterprise-ai-coe-operating-models",
    "title": "Enterprise AI Centers of Excellence (CoE) & Operating Models",
    "category": "enterprise-governance",
    "icon": "Shield",
    "color": "emerald"
  },
  {
    "slug": "skill-maturity-model-l0-l5",
    "title": "The AI Skill Maturity Model: L0 Manual to L5 Autonomous Swarms",
    "category": "enterprise-governance",
    "icon": "Layers",
    "color": "emerald"
  },
  {
    "slug": "eu-ai-act-global-compliance-framework",
    "title": "The EU AI Act & Global Regulatory Compliance Frameworks",
    "category": "enterprise-governance",
    "icon": "ShieldCheck",
    "color": "emerald"
  },
  {
    "slug": "sovereign-ai-national-infrastructure",
    "title": "Sovereign AI & National Compute Infrastructure",
    "category": "enterprise-governance",
    "icon": "Shield",
    "color": "cyan"
  },
  {
    "slug": "mcp-enterprise-security-governance",
    "title": "Model Context Protocol (MCP) Enterprise Security & Governance",
    "category": "enterprise-governance",
    "icon": "Shield",
    "color": "emerald"
  },
  {
    "slug": "ai-security-threat-modeling-owasp",
    "title": "AI Security, Red-Teaming & OWASP GenAI Threat Modeling",
    "category": "enterprise-governance",
    "icon": "Shield",
    "color": "rose"
  },
  {
    "slug": "quality-adjusted-ai-economics",
    "title": "Quality-Adjusted AI Economics & Compute Unit Costs",
    "category": "enterprise-governance",
    "icon": "Layers",
    "color": "emerald"
  },
  {
    "slug": "ai-intellectual-property-training-data-law",
    "title": "AI Intellectual Property, Training Data & Copyright Law",
    "category": "enterprise-governance",
    "icon": "Shield",
    "color": "amber"
  },
  {
    "slug": "autonomous-compliance-audit-agents",
    "title": "Autonomous Compliance, Continuous Audit & Agentic Governance",
    "category": "enterprise-governance",
    "icon": "ShieldCheck",
    "color": "emerald"
  },
  {
    "slug": "healthcare-clinical-ai-governance",
    "title": "Healthcare & Clinical AI Governance: Validation, Ethics & FDA Clearance",
    "category": "enterprise-governance",
    "icon": "Activity",
    "color": "rose"
  },
  {
    "slug": "enterprise-data-mesh-ai-readiness",
    "title": "Enterprise Data Mesh, GraphRAG & AI Readiness",
    "category": "enterprise-governance",
    "icon": "Network",
    "color": "emerald"
  },
  {
    "slug": "executive-ai-decision-frameworks",
    "title": "Executive AI Decision Frameworks, Strategy & Governance",
    "category": "enterprise-governance",
    "icon": "Shield",
    "color": "emerald"
  },
  {
    "slug": "agentic-life-architecture",
    "title": "Agentic Life Architecture",
    "category": "ai-systems",
    "icon": "Layers",
    "color": "indigo"
  },
  {
    "slug": "agentic-memory",
    "title": "Agentic Memory",
    "category": "ai-systems",
    "icon": "Database",
    "color": "teal"
  },
  {
    "slug": "agentic-sovereignty",
    "title": "Agentic Sovereignty",
    "category": "ai-systems",
    "icon": "Shield",
    "color": "violet"
  },
  {
    "slug": "agentic-evals",
    "title": "Agentic Evals",
    "category": "ai-systems",
    "icon": "ShieldCheck",
    "color": "amber"
  },
  {
    "slug": "agentic-life-observatory",
    "title": "Agentic Life Observatory",
    "category": "ai-systems",
    "icon": "Radar",
    "color": "emerald"
  }
]
export const publicCategoryLabels: Partial<Record<DomainCategory, string>> = {
  "frontier-ai": "Models & intelligence",
  "agentic-systems": "Agents & autonomous systems",
  "ai-infrastructure": "Compute & infrastructure",
  "quantum-technology": "Quantum & emerging technology",
  "reality-architecture": "Human potential & biology",
  "agentic-products": "Creative systems & products",
  "enterprise-governance": "Architecture & economics"
}

export function publicResearchCategory(category: DomainCategory | undefined): DomainCategory | undefined {
  const aliases: Partial<Record<DomainCategory, DomainCategory>> = {
    'ai-systems': 'agentic-systems',
    'models-tools': 'frontier-ai',
    'creative-productivity': 'agentic-products',
    'health-science': 'reality-architecture',
    'policy-systems': 'enterprise-governance',
  }
  return category ? (aliases[category] ?? category) : undefined
}
