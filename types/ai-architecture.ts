/**
 * AI Architecture Types
 *
 * Type definitions for the AI Architect Academy ecosystem including
 * prototypes, patterns, learning paths, and skills.
 */

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

export type PrototypeCategory =
  | 'ai-gateway'
  | 'rag-production'
  | 'multi-agent-orchestration'
  | 'mcp-servers'
  | 'llm-ops'
  | 'vector-databases'
  | 'ai-coe'
  | 'security-governance'
  | 'cost-optimization'
  | 'observability'

export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'oci' | 'multi-cloud'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type PrototypeStatus = 'draft' | 'in-review' | 'published' | 'archived'

// =============================================================================
// ARCHITECTURE PROTOTYPE
// =============================================================================

export interface ArchitectureComponent {
  id: string
  name: string
  type: 'compute' | 'storage' | 'database' | 'ai-service' | 'networking' | 'security' | 'monitoring'
  description: string
  cloudService?: string // e.g., "AWS Lambda", "OCI Functions"
  configuration?: Record<string, unknown>
}

export interface DataFlow {
  id: string
  from: string // component id
  to: string // component id
  label: string
  protocol?: string // e.g., "HTTPS", "gRPC", "Kafka"
  dataType?: string // e.g., "JSON", "protobuf", "embeddings"
}

export interface ImplementationStep {
  phase: number
  title: string
  description: string
  tasks: string[]
  deliverables: string[]
  estimatedDuration?: string
}

export interface CodeExample {
  id: string
  title: string
  language: 'typescript' | 'python' | 'terraform' | 'yaml' | 'bash' | 'sql'
  code: string
  description?: string
  filename?: string
}

export interface CostEstimate {
  monthly: number
  annual: number
  currency: 'USD' | 'EUR'
  breakdown: {
    category: string
    amount: number
    percentage: number
  }[]
  assumptions?: string[]
}

export interface CaseStudy {
  title: string
  company?: string
  industry: string
  challenge: string
  solution: string
  results: string[]
}

export interface ArchitecturePrototype {
  id: string
  slug: string
  title: string
  subtitle: string
  category: PrototypeCategory
  status: PrototypeStatus
  difficulty: DifficultyLevel

  // Content
  overview: string
  problem: string
  solution: string

  // Architecture
  architecture: {
    diagram?: string // SVG path or Mermaid source
    diagramType?: 'svg' | 'mermaid' | 'image'
    components: ArchitectureComponent[]
    flows: DataFlow[]
  }

  // Implementation
  implementationSteps: ImplementationStep[]
  codeExamples: CodeExample[]
  relatedPatterns: string[] // pattern IDs

  // Metadata
  cloudProviders: CloudProvider[]
  technologies: string[]
  estimatedCost?: CostEstimate
  timeToImplement?: string

  // Social proof
  useCases: string[]
  caseStudies?: CaseStudy[]

  // Timestamps
  createdAt: string
  updatedAt: string
  publishedAt?: string

  // SEO
  metaDescription?: string
  keywords?: string[]
}

// =============================================================================
// ARCHITECTURE PATTERN
// =============================================================================

export interface PatternTradeoffs {
  pros: string[]
  cons: string[]
}

export interface ArchitecturePattern {
  id: string
  slug: string
  name: string
  category: PrototypeCategory
  description: string
  thumbnail?: string

  // Core content
  problem: string
  solution: string
  tradeoffs: PatternTradeoffs

  // When to use
  whenToUse: string[]
  whenNotToUse: string[]

  // Technical details
  components: string[]
  implementation: string // markdown content
  codeSnippets: CodeExample[]

  // Relationships
  relatedPatterns: string[]
  applicablePrototypes: string[]

  // Tags
  cloudProviders: CloudProvider[]
  technologies: string[]
  difficulty: DifficultyLevel

  // Source mapping
  githubSource?: string // Link to frankxai/ai-architect-academy
}

// =============================================================================
// LEARNING PATH
// =============================================================================

export interface Lesson {
  id: string
  title: string
  description: string
  duration: string // e.g., "30 min", "1 hour"
  type: 'video' | 'article' | 'exercise' | 'quiz' | 'project'
  contentUrl?: string
  isComplete?: boolean
}

export interface Quiz {
  id: string
  title: string
  questions: {
    question: string
    options: string[]
    correctAnswer: number
  }[]
  passingScore: number
}

export interface LearningModule {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  quiz?: Quiz
  order: number
}

export interface LearningPath {
  id: string
  slug: string
  title: string
  description: string
  difficulty: DifficultyLevel
  duration: string // e.g., "4 weeks", "8 hours"
  thumbnail?: string

  // Structure
  modules: LearningModule[]
  prerequisites: string[] // other learning path IDs
  outcomes: string[]

  // Progress (for future user tracking)
  totalLessons: number
  estimatedHours: number

  // Metadata
  category: string
  technologies: string[]

  // Source
  githubSource?: string
}

// =============================================================================
// CLAUDE SKILL
// =============================================================================

export interface ClaudeSkill {
  id: string
  slug: string
  name: string
  category: string
  description: string
  version: string

  // Skill content
  purpose: string
  whenToUse: string[]
  examples: string[]

  // Technical
  dependencies: string[]
  relatedSkills: string[]
  triggers?: string[]

  // Source
  skillPath: string // .claude-skills/technical/[id]
  githubSource?: string

  // Metadata
  difficulty: DifficultyLevel
  tags: string[]
}

// =============================================================================
// UI DISPLAY TYPES
// =============================================================================

export interface PatternCardData {
  id: string
  slug: string
  name: string
  category: PrototypeCategory
  description: string
  thumbnail?: string
  difficulty: DifficultyLevel
  cloudProviders: CloudProvider[]
}

export interface PrototypeCardData {
  id: string
  slug: string
  title: string
  subtitle: string
  category: PrototypeCategory
  status: PrototypeStatus
  difficulty: DifficultyLevel
  cloudProviders: CloudProvider[]
  technologies: string[]
}

export interface LearningPathCardData {
  id: string
  slug: string
  title: string
  description: string
  difficulty: DifficultyLevel
  duration: string
  totalLessons: number
  thumbnail?: string
}

// =============================================================================
// CATEGORY METADATA
// =============================================================================

export interface CategoryMeta {
  id: PrototypeCategory
  name: string
  description: string
  icon: string // Lucide icon name
  color: string // Tailwind color class
}

export const CATEGORY_META: Record<PrototypeCategory, CategoryMeta> = {
  'ai-gateway': {
    id: 'ai-gateway',
    name: 'AI Gateway',
    description: 'Unified API gateway for AI services with auth, rate limiting, and observability',
    icon: 'Shield',
    color: 'violet',
  },
  'rag-production': {
    id: 'rag-production',
    name: 'RAG Production',
    description: 'Retrieval-Augmented Generation pipelines for grounding LLMs in enterprise data',
    icon: 'Database',
    color: 'emerald',
  },
  'multi-agent-orchestration': {
    id: 'multi-agent-orchestration',
    name: 'Multi-Agent Orchestration',
    description: 'Coordinating multiple AI agents for complex, multi-step workflows',
    icon: 'Network',
    color: 'cyan',
  },
  'mcp-servers': {
    id: 'mcp-servers',
    name: 'MCP Servers',
    description: 'Model Context Protocol servers for standardized AI-to-tool integration',
    icon: 'Server',
    color: 'orange',
  },
  'llm-ops': {
    id: 'llm-ops',
    name: 'LLMOps',
    description: 'Operational patterns for LLM lifecycle: versioning, evaluation, deployment',
    icon: 'Settings',
    color: 'rose',
  },
  'vector-databases': {
    id: 'vector-databases',
    name: 'Vector Databases',
    description: 'Selection and implementation of vector stores for semantic search',
    icon: 'Layers',
    color: 'amber',
  },
  'ai-coe': {
    id: 'ai-coe',
    name: 'AI Center of Excellence',
    description: 'Governance, patterns, and templates for enterprise AI programs',
    icon: 'Building',
    color: 'blue',
  },
  'security-governance': {
    id: 'security-governance',
    name: 'Security & Governance',
    description: 'Guardrails, PII handling, audit logging, and compliance for AI systems',
    icon: 'Lock',
    color: 'red',
  },
  'cost-optimization': {
    id: 'cost-optimization',
    name: 'Cost Optimization',
    description: 'Strategies for reducing AI infrastructure and API costs',
    icon: 'DollarSign',
    color: 'green',
  },
  'observability': {
    id: 'observability',
    name: 'Observability',
    description: 'Monitoring, logging, and tracing for AI systems in production',
    icon: 'Activity',
    color: 'purple',
  },
}

// =============================================================================
// CLOUD PROVIDER METADATA
// =============================================================================

export interface CloudProviderMeta {
  id: CloudProvider
  name: string
  shortName: string
  color: string
  logo?: string
}

export const CLOUD_PROVIDER_META: Record<CloudProvider, CloudProviderMeta> = {
  aws: {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    color: 'orange',
  },
  gcp: {
    id: 'gcp',
    name: 'Google Cloud Platform',
    shortName: 'GCP',
    color: 'blue',
  },
  azure: {
    id: 'azure',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    color: 'cyan',
  },
  oci: {
    id: 'oci',
    name: 'Oracle Cloud Infrastructure',
    shortName: 'OCI',
    color: 'red',
  },
  'multi-cloud': {
    id: 'multi-cloud',
    name: 'Multi-Cloud',
    shortName: 'Multi',
    color: 'violet',
  },
}

// =============================================================================
// DIFFICULTY METADATA
// =============================================================================

export interface DifficultyMeta {
  id: DifficultyLevel
  name: string
  description: string
  color: string
}

export const DIFFICULTY_META: Record<DifficultyLevel, DifficultyMeta> = {
  beginner: {
    id: 'beginner',
    name: 'Beginner',
    description: 'No prior AI architecture experience required',
    color: 'green',
  },
  intermediate: {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Basic cloud and AI concepts required',
    color: 'yellow',
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced',
    description: 'Production experience with cloud AI services',
    color: 'orange',
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    description: 'Deep expertise in distributed systems and ML',
    color: 'red',
  },
}

// =============================================================================
// AI ARCHITECTURE HUB TYPES
// =============================================================================

export type AIProvider = 'anthropic' | 'openai' | 'google' | 'oci'

export type HubItemType = 'blueprint' | 'prototype' | 'template'

export type DeployTarget = 'vercel' | 'railway' | 'render' | 'replit' | 'oci'

// Blueprint = Architecture documentation (free)
export interface Blueprint extends ArchitecturePrototype {
  type: 'blueprint'
  relatedPrototype?: string // slug of related prototype
  relatedTemplate?: string // slug of related template
}

// Prototype = Interactive BYOK demo (free, uses user's API key)
export interface InteractivePrototype {
  id: string
  slug: string
  title: string
  subtitle: string
  category: PrototypeCategory
  status: PrototypeStatus
  type: 'prototype'

  // BYOK Configuration
  supportedProviders: AIProvider[]
  requiredKeys: {
    provider: AIProvider
    keyName: string
    getKeyUrl: string
    description: string
  }[]

  // External Tool Links
  externalLinks?: {
    googleAIStudio?: string
    vercelV0?: string
    replit?: string
    stackblitz?: string
    codespaces?: string
  }

  // Component path for rendering
  componentPath: string // e.g., 'chat-playground', 'rag-tester'

  // Cross-links
  relatedBlueprint?: string
  relatedTemplate?: string

  // Metadata
  description: string
  features: string[]
  technologies: string[]

  // Timestamps
  createdAt: string
  updatedAt: string
}

// Template = Purchasable starter kit (paid)
export interface Template {
  id: string
  slug: string
  title: string
  subtitle: string
  category: PrototypeCategory
  status: PrototypeStatus
  type: 'template'

  // Pricing
  price: number
  currency: 'USD' | 'EUR'
  originalPrice?: number // For showing discounts

  // Purchase
  purchaseUrl: string // Gumroad/Stripe link
  licenseType: 'personal' | 'commercial' | 'enterprise'

  // Delivery
  githubRepo?: string // Private repo, revealed after purchase
  deployTargets: DeployTarget[]

  // Content
  description: string
  features: string[]
  techStack: string[]
  includesOCI: boolean // Whether OCI GenAI variant is included

  // Demo
  demoUrl?: string
  previewImages?: string[]

  // Cross-links
  relatedBlueprint?: string
  relatedPrototype?: string

  // Timestamps
  createdAt: string
  updatedAt: string
}

// =============================================================================
// PROVIDER METADATA
// =============================================================================

export interface AIProviderMeta {
  id: AIProvider
  name: string
  shortName: string
  keyUrl: string
  freeTier: string
  color: string
}

export const AI_PROVIDER_META: Record<AIProvider, AIProviderMeta> = {
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    shortName: 'Claude',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    freeTier: '$5 credit',
    color: 'orange',
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    shortName: 'GPT',
    keyUrl: 'https://platform.openai.com/api-keys',
    freeTier: '$5 credit',
    color: 'emerald',
  },
  google: {
    id: 'google',
    name: 'Google AI',
    shortName: 'Gemini',
    keyUrl: 'https://aistudio.google.com/apikey',
    freeTier: 'Generous free tier',
    color: 'blue',
  },
  oci: {
    id: 'oci',
    name: 'OCI GenAI',
    shortName: 'OCI',
    keyUrl: 'https://cloud.oracle.com/generative-ai',
    freeTier: 'Free tier available',
    color: 'red',
  },
}

// =============================================================================
// HUB DISPLAY TYPES
// =============================================================================

export interface HubStats {
  blueprints: number
  prototypes: number
  templates: number
  categories: number
}

export interface FeaturedItem {
  type: HubItemType
  slug: string
  title: string
  subtitle: string
  category: PrototypeCategory
  badge?: string // e.g., "New", "Popular", "$49"
}
