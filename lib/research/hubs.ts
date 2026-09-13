import { researchDomains, type DomainCategory } from "./domains";
import { domainSources } from "./sources";

export const researchHubs: {
  slug: string;
  category: DomainCategory;
  title: string;
  question: string;
  description: string;
  icon: string;
  topics: string[];
}[] = [
  {
    slug: "agentic-systems",
    category: "agentic-systems",
    title: "Agents & autonomous systems",
    question: "What can you delegate?",
    description:
      "Memory, orchestration, tools and the execution loops that turn an AI model into a working system.",
    icon: "Network",
    topics: ["Agent memory", "MCP & tools", "Orchestration"],
  },
  {
    slug: "frontier-ai",
    category: "frontier-ai",
    title: "Models & intelligence",
    question: "What can intelligence do?",
    description:
      "Reasoning, multimodality, model architectures and the evidence behind capability claims.",
    icon: "Brain",
    topics: ["Model catalog", "Reasoning", "Evaluations"],
  },
  {
    slug: "agentic-products",
    category: "agentic-products",
    title: "Creative systems & products",
    question: "What can you create?",
    description:
      "Generative media, software studios and the systems behind repeatable creative work.",
    icon: "Palette",
    topics: ["Visual creation", "Digital studios", "Product systems"],
  },
  {
    slug: "enterprise-governance",
    category: "enterprise-governance",
    title: "Architecture & economics",
    question: "What makes it viable?",
    description:
      "Production architecture, governance and the economics of putting AI to work.",
    icon: "Building2",
    topics: ["AI architecture", "Governance", "Unit economics"],
  },
  {
    slug: "ai-infrastructure",
    category: "ai-infrastructure",
    title: "Compute & infrastructure",
    question: "What runs underneath?",
    description:
      "Silicon, inference systems, AI factories and the physical constraints on intelligence.",
    icon: "Cpu",
    topics: ["Accelerators", "Inference", "AI factories"],
  },
  {
    slug: "reality-architecture",
    category: "reality-architecture",
    title: "Human potential & biology",
    question: "How do humans flourish?",
    description:
      "Neuroscience, human agency and biological research, with evidence and interpretation kept distinct.",
    icon: "Heart",
    topics: ["Neuroscience", "Human agency", "Biology"],
  },
  {
    slug: "quantum-technology",
    category: "quantum-technology",
    title: "Quantum & emerging technology",
    question: "What becomes possible next?",
    description:
      "Quantum computing, error correction and the technologies moving beyond classical limits.",
    icon: "Compass",
    topics: ["Quantum computing", "Cryptography", "Emerging systems"],
  },
];

export function researchCategory(
  category: DomainCategory | undefined,
): DomainCategory | undefined {
  const aliases: Partial<Record<DomainCategory, DomainCategory>> = {
    "ai-systems": "agentic-systems",
    "models-tools": "frontier-ai",
    "creative-productivity": "agentic-products",
    "health-science": "reality-architecture",
    "policy-systems": "enterprise-governance",
  };
  return category ? (aliases[category] ?? category) : undefined;
}

export function domainsForHub(category: DomainCategory) {
  return researchDomains.filter(
    (d) =>
      researchCategory(d.category) === category &&
      !d.slug.startsWith("REMOVED-") &&
      !d.title.startsWith("[REMOVED]") &&
      d.sourceCount > 0 &&
      (domainSources[d.slug]?.length ?? 0) > 0,
  );
}

export const researchHubFaqs = [
  {
    q: "Where should I start?",
    a: "Choose a research hub by the question you are working on. Each hub collects related briefs and their sources. Models and benchmarks sit inside Models & intelligence.",
  },
  {
    q: "How current is the model coverage?",
    a: "The model selection reads from the shared FrankX catalog. Source review dates are shown separately from research brief dates; a catalog update does not mean every brief or benchmark was re-run.",
  },
  {
    q: "Are these FrankX benchmark results?",
    a: "Model specifications come from linked provider documentation. First-party experiments are published separately in Model Arena with their original evidence. A newer model does not inherit an older model’s test results.",
  },
];
