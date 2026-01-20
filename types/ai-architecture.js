"use strict";
/**
 * AI Architecture Types
 *
 * Type definitions for the AI Architect Academy ecosystem including
 * prototypes, patterns, learning paths, and skills.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIFFICULTY_META = exports.CLOUD_PROVIDER_META = exports.CATEGORY_META = void 0;
exports.CATEGORY_META = {
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
};
exports.CLOUD_PROVIDER_META = {
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
};
exports.DIFFICULTY_META = {
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
};
