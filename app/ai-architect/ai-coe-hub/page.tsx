'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Code2,
  Server,
  BookOpen,
  GraduationCap,
  ExternalLink,
  Terminal,
  Cpu,
  Cloud,
  ShieldCheck,
  BarChart3,
  FileText,
  FlaskConical,
  Rocket,
  CheckCircle
} from 'lucide-react'

// Alias heroicons names to lucide equivalents
const BuildingOffice2Icon = Building2
const CodeBracketIcon = Code2
const ServerStackIcon = Server
const BookOpenIcon = BookOpen
const AcademicCapIcon = GraduationCap
const ArrowTopRightOnSquareIcon = ExternalLink
const CommandLineIcon = Terminal
const CpuChipIcon = Cpu
const CloudIcon = Cloud
const ShieldCheckIcon = ShieldCheck
const ChartBarIcon = BarChart3
const DocumentTextIcon = FileText
const BeakerIcon = FlaskConical
const RocketLaunchIcon = Rocket
const CheckCircleIcon = CheckCircle

interface ResourceCard {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  external?: boolean
  category: 'architecture' | 'code' | 'guide' | 'oracle'
}

const resources: ResourceCard[] = [
  // Architecture Center
  {
    title: 'Enterprise GenAI Stack',
    description: 'Four-layer architecture for production LLM systems on OCI',
    icon: BuildingOffice2Icon,
    href: 'https://docs.oracle.com/en/solutions/oci-genai-enterprise/index.html',
    external: true,
    category: 'oracle'
  },
  {
    title: 'Agentic AI on OCI',
    description: 'Deploy AI agents with OCI AI Agent Platform',
    icon: CpuChipIcon,
    href: 'https://docs.oracle.com/en/solutions/deploy-agentic-ai-agent-platform/index.html',
    external: true,
    category: 'oracle'
  },
  {
    title: 'Select AI + APEX Framework',
    description: 'Near-zero hallucinations with human-in-the-loop validation',
    icon: ShieldCheckIcon,
    href: 'https://docs.oracle.com/en/solutions/select-ai-apex-framework/index.html',
    external: true,
    category: 'oracle'
  },
  {
    title: 'Multicloud GenAI RAG',
    description: 'OCI + Azure patterns with high-performance connectivity',
    icon: CloudIcon,
    href: 'https://docs.oracle.com/en/solutions/oci-multicloud-genai-rag/index.html',
    external: true,
    category: 'oracle'
  },
  // GitHub Repos
  {
    title: 'LangChain Oracle',
    description: 'Official LangChain integration for OCI GenAI',
    icon: CodeBracketIcon,
    href: 'https://github.com/oracle/langchain-oracle',
    external: true,
    category: 'code'
  },
  {
    title: 'Open Agent Specification',
    description: 'Portable, declarative agent definitions',
    icon: DocumentTextIcon,
    href: 'https://github.com/oracle/agent-spec',
    external: true,
    category: 'code'
  },
  {
    title: 'OCI AI Blueprints',
    description: 'Production-ready Terraform + OKE deployments',
    icon: RocketLaunchIcon,
    href: 'https://github.com/oracle-quickstart/oci-ai-blueprints',
    external: true,
    category: 'code'
  },
  {
    title: 'AI Solutions DevRel',
    description: 'Reference implementations and workshops',
    icon: BeakerIcon,
    href: 'https://github.com/oracle-devrel/ai-solutions',
    external: true,
    category: 'code'
  },
  // FrankX Guides
  {
    title: 'Production Blueprint (Part 1)',
    description: 'Six-plane architecture for enterprise AI systems',
    icon: ServerStackIcon,
    href: '/blog/production-llm-agents-oci-part-1-architecture',
    category: 'guide'
  },
  {
    title: 'Agent Patterns (Part 2)',
    description: 'Managed vs Framework agents decision framework',
    icon: CommandLineIcon,
    href: '/blog/production-llm-agents-oci-part-2-agent-patterns',
    category: 'guide'
  },
  {
    title: 'Operating Model (Part 3)',
    description: 'Governance, observability, and lifecycle management',
    icon: ChartBarIcon,
    href: '/blog/production-llm-agents-oci-part-3-operating-model',
    category: 'guide'
  },
  {
    title: 'AI Architect Academy',
    description: 'Complete learning path for enterprise AI architects',
    icon: AcademicCapIcon,
    href: '/ai-architect-academy',
    category: 'guide'
  }
]

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'oracle', label: 'Oracle Architecture Center' },
  { id: 'code', label: 'GitHub Repositories' },
  { id: 'guide', label: 'FrankX Guides' }
]

const quickStartSteps = [
  {
    step: 1,
    title: 'Understand the Architecture',
    description: 'Read the six-plane production model to understand how enterprise GenAI systems should be structured.',
    action: 'Read Part 1',
    href: '/blog/production-llm-agents-oci-part-1-architecture'
  },
  {
    step: 2,
    title: 'Choose Your Agent Pattern',
    description: 'Decide between managed (OCI Agent Platform) or framework (LangGraph) agents based on your needs.',
    action: 'Read Part 2',
    href: '/blog/production-llm-agents-oci-part-2-agent-patterns'
  },
  {
    step: 3,
    title: 'Deploy Reference Architecture',
    description: 'Use Oracle\'s quickstart blueprints to deploy a baseline stack on OCI.',
    action: 'Get Blueprints',
    href: 'https://github.com/oracle-quickstart/oci-ai-blueprints'
  },
  {
    step: 4,
    title: 'Add Observability',
    description: 'Instrument with OpenTelemetry and define SLOs for latency, cost, and quality.',
    action: 'Read Part 3',
    href: '/blog/production-llm-agents-oci-part-3-operating-model'
  }
]

const decisionMatrix = [
  {
    question: 'Need API access to LLMs?',
    answer: 'OCI GenAI Service',
    href: 'https://docs.oracle.com/en-us/iaas/generative-ai/'
  },
  {
    question: 'Building custom agents with tools?',
    answer: 'OCI AI Agent Platform',
    href: 'https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/overview.htm'
  },
  {
    question: 'Multi-agent orchestration?',
    answer: 'Agent Hub',
    href: 'https://blogs.oracle.com/cloud-infrastructure/ai-world-2025-artificial-intelligence'
  },
  {
    question: 'Fusion Apps customer?',
    answer: 'AI Agent Studio',
    href: 'https://docs.oracle.com/en/cloud/saas/fusion-apps/'
  },
  {
    question: 'Maximum data sovereignty?',
    answer: 'Private Agent Factory (DB 26ai)',
    href: 'https://www.oracle.com/database/ai/'
  },
  {
    question: 'Open-source flexibility?',
    answer: 'LangChain + OCI GenAI',
    href: 'https://github.com/oracle/langchain-oracle'
  }
]

export default function AICoEHubPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(r => r.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            <BuildingOffice2Icon className="w-4 h-4" />
            AI Center of Excellence
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Production LLM & Agent Systems
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Resource Hub
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Everything you need to build enterprise-grade GenAI systems on Oracle Cloud Infrastructure.
            Reference architectures, code samples, decision frameworks, and best practices.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog/production-llm-agents-oci-part-1-architecture"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              Start with Architecture
            </Link>
            <Link
              href="https://github.com/oracle-quickstart/oci-ai-blueprints"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all inline-flex items-center gap-2"
            >
              <CodeBracketIcon className="w-5 h-5" />
              Get Starter Code
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Quick Start: From Demo to Production
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartSteps.map((step) => (
              <div
                key={step.step}
                className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {step.description}
                </p>
                <Link
                  href={step.href}
                  target={step.href.startsWith('http') ? '_blank' : undefined}
                  rel={step.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-amber-400 text-sm font-medium hover:text-amber-300 inline-flex items-center gap-1"
                >
                  {step.action}
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Which Oracle AI Service Do I Need?
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Quick decision framework for choosing the right service
          </p>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
            <div className="divide-y divide-slate-800">
              {decisionMatrix.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-slate-300">{item.question}</span>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors"
                  >
                    {item.answer}
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Curated Resources
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                target={resource.external ? '_blank' : undefined}
                rel={resource.external ? 'noopener noreferrer' : undefined}
                className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    resource.category === 'oracle' ? 'bg-red-500/10 text-red-400' :
                    resource.category === 'code' ? 'bg-green-500/10 text-green-400' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    <resource.icon className="w-6 h-6" />
                  </div>
                  {resource.external && (
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {resource.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Production Checklist */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Production Readiness Checklist
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Don&apos;t ship without checking these boxes
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Security: RBAC, network isolation, secrets management',
              'Data Access: Least privilege, audited retrieval',
              'Reliability: Timeouts, retries, graceful degradation',
              'Quality: Online telemetry + offline evaluation',
              'Cost: Quotas, rate limiting, caching',
              'Observability: OpenTelemetry traces across agent loop',
              'Governance: Prompt versioning, audit trails',
              'Testing: Golden sets, regression on prompt changes'
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-4"
              >
                <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Help Building Production AI Systems?
          </h2>
          <p className="text-slate-400 mb-8">
            FrankX specializes in enterprise AI architecture and implementation on Oracle Cloud.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/ai-architect-academy"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all"
            >
              Explore AI Architect Academy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
