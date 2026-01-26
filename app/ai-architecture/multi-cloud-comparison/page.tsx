'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Database,
  Zap,
  Server,
  Globe,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Users,
  Shield,
} from 'lucide-react'

// ============================================================================
// DESIGN SYSTEM - Matching HomePageElite
// ============================================================================

const colors = {
  bg: '#0a0a0b',
  bgElevated: '#111113',
  bgSubtle: '#18181b',
  accent: {
    primary: '#10b981', // emerald
    secondary: '#06b6d4', // cyan
    tertiary: '#f59e0b', // amber/gold
  },
  text: {
    primary: '#fafafa',
    secondary: 'rgba(250, 250, 250, 0.7)',
    tertiary: 'rgba(250, 250, 250, 0.5)',
    muted: 'rgba(250, 250, 250, 0.3)',
  }
}

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      <motion.div
        className="absolute top-0 left-0 w-full h-[60%] md:w-[80%] md:h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-[50%] md:w-[60%] md:h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -40, 0],
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// CLOUD PROVIDER DATA
// ============================================================================

const cloudProviders = {
  aws: {
    name: 'AWS',
    logo: '🟠',
    tagline: 'The Industry Standard',
    color: 'from-orange-500 to-yellow-500',
    pricing: 'Premium',
    description: 'Deepest feature set, largest community, most mature AI/ML services',
    strengths: ['Mature ecosystem', 'Most AI services', 'Best documentation', 'Largest community'],
    weaknesses: ['Complex pricing', 'Steep learning curve', 'Vendor lock-in patterns'],
    aiServices: ['SageMaker', 'Bedrock (Claude/LLMs)', 'Comprehend', 'Rekognition'],
    compute: {
      serverless: 'Lambda',
      containers: 'ECS/EKS',
      gpu: 'P4d/P5 instances',
    },
    database: {
      relational: 'RDS, Aurora',
      nosql: 'DynamoDB',
      vector: 'OpenSearch, pgvector',
      cache: 'ElastiCache',
    },
    networking: {
      cdn: 'CloudFront',
      loadBalancer: 'ALB/NLB',
      dns: 'Route 53',
    },
    costEstimate: {
      compute: '$300-600',
      storage: '$100-200',
      database: '$400-800',
      ai: '$400-900',
      total: '$1,200 - $2,500',
    },
    useCases: [
      'Enterprise-scale SaaS platforms',
      'ML pipelines with SageMaker',
      'Global content delivery',
      'Serverless microservices',
    ],
    bestFor: 'Enterprise scale, mature ecosystem, maximum service selection',
  },
  gcp: {
    name: 'Google Cloud',
    logo: '🔵',
    tagline: 'AI-First Cloud',
    color: 'from-blue-500 to-cyan-500',
    pricing: 'Competitive',
    description: 'AI-first cloud with best-in-class ML services and BigQuery analytics',
    strengths: ['ML/AI services', 'BigQuery analytics', 'Global network', 'K8s expertise'],
    weaknesses: ['Smaller ecosystem than AWS', 'Less enterprise adoption', 'Fewer regions'],
    aiServices: ['Vertex AI', 'AutoML', 'Document AI', 'Vision AI'],
    compute: {
      serverless: 'Cloud Run',
      containers: 'GKE',
      gpu: 'A100/H100 VMs',
    },
    database: {
      relational: 'Cloud SQL, Spanner',
      nosql: 'Firestore',
      vector: 'Vertex AI Vector Search',
      cache: 'Memorystore',
    },
    networking: {
      cdn: 'Cloud CDN',
      loadBalancer: 'Cloud Load Balancing',
      dns: 'Cloud DNS',
    },
    costEstimate: {
      compute: '$250-500',
      storage: '$80-150',
      database: '$350-700',
      ai: '$320-850',
      total: '$1,000 - $2,200',
    },
    useCases: [
      'AI/ML experimentation platforms',
      'Real-time analytics with BigQuery',
      'Kubernetes-native applications',
      'Data science workflows',
    ],
    bestFor: 'AI/ML workloads, data analytics, Kubernetes-native applications',
  },
  azure: {
    name: 'Microsoft Azure',
    logo: '🔷',
    tagline: 'Enterprise Integration Champion',
    color: 'from-blue-600 to-indigo-600',
    pricing: 'Premium',
    description: 'Enterprise-ready cloud with seamless Microsoft ecosystem integration',
    strengths: ['Microsoft ecosystem', 'Enterprise compliance', 'Hybrid cloud', '.NET excellence'],
    weaknesses: ['Complex pricing', 'Steeper learning curve', 'Less startup-friendly'],
    aiServices: ['Azure OpenAI', 'Cognitive Services', 'ML Studio', 'Form Recognizer'],
    compute: {
      serverless: 'Container Apps',
      containers: 'AKS',
      gpu: 'NC/ND series',
    },
    database: {
      relational: 'Azure SQL',
      nosql: 'Cosmos DB',
      vector: 'Azure AI Search',
      cache: 'Azure Cache for Redis',
    },
    networking: {
      cdn: 'Azure CDN',
      loadBalancer: 'Azure Load Balancer',
      dns: 'Azure DNS',
    },
    costEstimate: {
      compute: '$280-550',
      storage: '$90-180',
      database: '$380-750',
      ai: '$350-920',
      total: '$1,100 - $2,400',
    },
    useCases: [
      'Microsoft 365 integrations',
      'Enterprise compliance workloads',
      '.NET/C# applications',
      'Hybrid cloud scenarios',
    ],
    bestFor: 'Microsoft ecosystem integration, enterprise compliance',
  },
  oci: {
    name: 'Oracle Cloud Infrastructure',
    logo: '🟧',
    tagline: 'Best Price-Performance',
    color: 'from-red-500 to-orange-500',
    pricing: 'Best Value',
    description: 'Enterprise-grade cloud with best price-performance and Oracle database expertise',
    strengths: ['Price-performance', 'Autonomous Database', 'Dedicated AI clusters', 'Enterprise support'],
    weaknesses: ['Smaller ecosystem', 'Fewer integrations', 'Less community content'],
    aiServices: ['OCI Generative AI', 'GenAI Agents', 'OCI Vision', 'OCI Speech'],
    compute: {
      serverless: 'OCI Functions',
      containers: 'OKE',
      gpu: 'A10/H100 BM',
    },
    database: {
      relational: 'Autonomous DB',
      nosql: 'NoSQL Database',
      vector: 'Oracle 23ai Vectors',
      cache: 'Cache with Redis',
    },
    networking: {
      cdn: 'OCI CDN',
      loadBalancer: 'Flexible LB',
      dns: 'OCI DNS',
    },
    costEstimate: {
      compute: '$80-200',
      storage: '$30-80',
      database: '$150-400',
      ai: '$110-410',
      total: '$370 - $1,090',
    },
    useCases: [
      'Cost-sensitive AI workloads',
      'Database-intensive applications',
      'Oracle ecosystem migrations',
      'High-performance computing',
    ],
    bestFor: 'Cost optimization, Oracle integration, database-intensive applications',
  },
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero content */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
          >
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              Technical Research
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Multi-Cloud Architecture
            <span className="block text-white/55 mt-2">for AI-Powered Platforms</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-3xl">
            Independent analysis of AWS, Google Cloud, Azure, and Oracle Cloud for building
            AI-powered creator platforms. Real cost comparisons, architecture patterns,
            and decision frameworks from an Oracle AI Architect.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Cost Comparison
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Architecture Patterns
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Real-World Analysis
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// CLOUD PROVIDER TABS
// ============================================================================

type CloudProvider = keyof typeof cloudProviders

function CloudProviderTabs() {
  const [activeProvider, setActiveProvider] = useState<CloudProvider>('aws')
  const provider = cloudProviders[activeProvider]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cloud Provider Comparison
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Think of cloud providers like mixing consoles. Each has different strengths,
            but they all help you produce great work. Here's how they stack up.
          </p>
        </div>

        {/* Provider tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(Object.keys(cloudProviders) as CloudProvider[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveProvider(key)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all
                ${activeProvider === key
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }
              `}
            >
              <span className="mr-2">{cloudProviders[key].logo}</span>
              {cloudProviders[key].name}
            </button>
          ))}
        </div>

        {/* Provider details */}
        <motion.div
          key={activeProvider}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Overview card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-violet-500/5 blur-2xl opacity-50 rounded-3xl" />
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{provider.name}</h3>
                  <p className="text-white/60">Pricing Tier: {provider.pricing}</p>
                </div>
                <div className={`text-4xl bg-gradient-to-br ${provider.color} bg-clip-text text-transparent`}>
                  {provider.logo}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wider">Strengths</h4>
                  <ul className="space-y-2">
                    {provider.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">Best For</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {provider.bestFor}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-3 uppercase tracking-wider">Weaknesses</h4>
                  <ul className="space-y-2">
                    {provider.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm text-white/60">
                        • {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Service breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Services */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">AI Services</h4>
              </div>
              <ul className="space-y-2">
                {provider.aiServices.map((service, i) => (
                  <li key={i} className="text-sm text-white/70">
                    • {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Compute */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-semibold text-white">Compute</h4>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p><span className="text-white/90 font-medium">Serverless:</span> {provider.compute.serverless}</p>
                <p><span className="text-white/90 font-medium">Containers:</span> {provider.compute.containers}</p>
                <p><span className="text-white/90 font-medium">GPU:</span> {provider.compute.gpu}</p>
              </div>
            </div>

            {/* Database */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-violet-400" />
                <h4 className="text-lg font-semibold text-white">Database</h4>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p><span className="text-white/90 font-medium">Relational:</span> {provider.database.relational}</p>
                <p><span className="text-white/90 font-medium">NoSQL:</span> {provider.database.nosql}</p>
                <p><span className="text-white/90 font-medium">Vector:</span> {provider.database.vector}</p>
                <p><span className="text-white/90 font-medium">Cache:</span> {provider.database.cache}</p>
              </div>
            </div>

            {/* Networking */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-semibold text-white">Networking</h4>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p><span className="text-white/90 font-medium">CDN:</span> {provider.networking.cdn}</p>
                <p><span className="text-white/90 font-medium">Load Balancer:</span> {provider.networking.loadBalancer}</p>
                <p><span className="text-white/90 font-medium">DNS:</span> {provider.networking.dns}</p>
              </div>
            </div>
          </div>

          {/* Cost estimate */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              <h4 className="text-xl font-bold text-white">Estimated Monthly Costs</h4>
            </div>

            <p className="text-sm text-white/60 mb-6">
              For a mid-sized AI creator platform (10K-50K monthly users)
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/[0.02] rounded-lg p-4">
                <p className="text-xs text-white/50 mb-1">Compute</p>
                <p className="text-lg font-semibold text-white">{provider.costEstimate.compute}</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-4">
                <p className="text-xs text-white/50 mb-1">Storage</p>
                <p className="text-lg font-semibold text-white">{provider.costEstimate.storage}</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-4">
                <p className="text-xs text-white/50 mb-1">Database</p>
                <p className="text-lg font-semibold text-white">{provider.costEstimate.database}</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-4">
                <p className="text-xs text-white/50 mb-1">AI Services</p>
                <p className="text-lg font-semibold text-white">{provider.costEstimate.ai}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg">
              <span className="text-sm font-medium text-white">Total Monthly Estimate</span>
              <span className="text-2xl font-bold text-white">{provider.costEstimate.total}</span>
            </div>

            <p className="text-xs text-white/55 mt-4">
              * Estimates based on moderate usage patterns. Actual costs vary with traffic, AI model usage, and storage needs.
            </p>
          </div>

          {/* Use cases */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-cyan-400" />
              <h4 className="text-xl font-bold text-white">Ideal Use Cases</h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {provider.useCases.map((useCase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// DECISION FRAMEWORK
// ============================================================================

function DecisionFramework() {
  return (
    <section className="py-16 md:py-24 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Decision Framework
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Like choosing gear for your studio, pick the cloud that serves your workflow best.
            Here's how to decide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Cost-Focused */}
          <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Cost-Focused</h3>
            </div>
            <p className="text-white/70 mb-4">
              Bootstrap, indie hacker, or cost-sensitive startup
            </p>
            <div className="space-y-2">
              <p className="text-sm text-white/60">
                → <span className="text-emerald-400 font-medium">OCI</span> for best price-performance
              </p>
              <p className="text-sm text-white/60">
                → <span className="text-cyan-400 font-medium">GCP</span> for generous free tier
              </p>
            </div>
          </div>

          {/* Ecosystem-Focused */}
          <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ecosystem-Focused</h3>
            </div>
            <p className="text-white/70 mb-4">
              Need maximum integrations and community support
            </p>
            <div className="space-y-2">
              <p className="text-sm text-white/60">
                → <span className="text-amber-400 font-medium">AWS</span> for largest ecosystem
              </p>
              <p className="text-sm text-white/60">
                → <span className="text-cyan-400 font-medium">GCP</span> for AI/ML leadership
              </p>
            </div>
          </div>

          {/* Enterprise-Focused */}
          <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-violet-500/10 rounded-xl">
                <Shield className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Enterprise-Focused</h3>
            </div>
            <p className="text-white/70 mb-4">
              Corporate environment, compliance requirements
            </p>
            <div className="space-y-2">
              <p className="text-sm text-white/60">
                → <span className="text-blue-400 font-medium">Azure</span> for Microsoft integration
              </p>
              <p className="text-sm text-white/60">
                → <span className="text-emerald-400 font-medium">OCI</span> for Oracle workloads
              </p>
            </div>
          </div>

          {/* Innovation-Focused */}
          <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Innovation-Focused</h3>
            </div>
            <p className="text-white/70 mb-4">
              Cutting-edge AI, rapid experimentation
            </p>
            <div className="space-y-2">
              <p className="text-sm text-white/60">
                → <span className="text-cyan-400 font-medium">GCP</span> for latest AI models
              </p>
              <p className="text-sm text-white/60">
                → <span className="text-amber-400 font-medium">AWS</span> for SageMaker + Bedrock
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Need help choosing? Every architecture decision is like mixing a track—balance the elements that serve your vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
          >
            Get Architecture Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AIArchitecturePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10">
        <HeroSection />
        <CloudProviderTabs />
        <DecisionFramework />

        {/* Footer note */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 text-center">
          <p className="text-sm text-white/55">
            This is independent technical research by Frank, Oracle AI Architect.
            Not endorsed by or representing Oracle, AWS, Google, or Microsoft.
          </p>
        </div>
      </div>
    </main>
  )
}
