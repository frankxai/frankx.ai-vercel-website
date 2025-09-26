import { ArrowRight, Brain, Building2, CheckCircle2, Cpu, Globe, Shield, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'

const capabilities = [
  {
    icon: Brain,
    title: 'AI Strategy & Architecture',
    description: 'Comprehensive intelligence systems design from concept to deployment.',
    features: [
      'Strategic AI roadmapping and governance',
      'System architecture and integration planning',
      'Risk assessment and compliance frameworks',
      'ROI modeling and success metrics'
    ]
  },
  {
    icon: Building2,
    title: 'Enterprise Implementation',
    description: 'Large-scale AI transformations with proven methodologies.',
    features: [
      'Pilot to production scaling strategies',
      'Change management and training programs',
      'Technical integration and deployment',
      'Ongoing optimization and support'
    ]
  },
  {
    icon: Shield,
    title: 'AI Governance & Ethics',
    description: 'Responsible AI frameworks that protect your organization and stakeholders.',
    features: [
      'Ethics frameworks and bias detection',
      'Data privacy and security protocols',
      'Regulatory compliance strategies',
      'Human oversight and control systems'
    ]
  },
  {
    icon: Users,
    title: 'Team Enablement',
    description: 'Transform your workforce with AI literacy and capability building.',
    features: [
      'Leadership AI education programs',
      'Technical team upskilling',
      'Cross-functional collaboration frameworks',
      'AI productivity workflows'
    ]
  }
]

const solutions = [
  {
    icon: Cpu,
    title: 'Intelligent Automation',
    description: 'Streamline operations with AI-powered process automation.',
    benefits: ['60% reduction in manual tasks', 'Improved accuracy and compliance', '24/7 operational capability']
  },
  {
    icon: Globe,
    title: 'Customer Intelligence',
    description: 'Transform customer experiences with AI-driven insights and personalization.',
    benefits: ['Personalized customer journeys', 'Predictive analytics and forecasting', 'Real-time decision support']
  },
  {
    icon: Zap,
    title: 'Innovation Acceleration',
    description: 'Accelerate R&D and product development with AI capabilities.',
    benefits: ['Faster time to market', 'Enhanced creative processes', 'Data-driven innovation']
  }
]

const stats = [
  { value: '200+', label: 'Enterprise Systems Deployed' },
  { value: '95%', label: 'Client Success Rate' },
  { value: '3x', label: 'Average ROI Improvement' },
  { value: '50+', label: 'Fortune 500 Engagements' }
]

export const metadata = createMetadata({
  title: 'Agentic AI Center of Excellence - FrankX.AI',
  description: 'Transform your organization with enterprise AI strategy, implementation, and governance. Expert consulting for Fortune 500 companies and high-growth enterprises.',
  keywords: ['enterprise ai consulting', 'ai strategy', 'ai implementation', 'ai governance', 'agentic ai'],
  path: '/agentic-ai-center',
})

export default function AgenticAICenterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cyan-300">
              <Brain className="h-5 w-5" />
              Agentic AI Center of Excellence
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Enterprise AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                That Actually Works
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Strategic AI implementation for Fortune 500 companies and high-growth enterprises.
              From governance frameworks to production systems, we architect intelligence that scales with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="mailto:hello@frankx.ai?subject=Agentic%20AI%20Consultation"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/founder-playbook"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                View Founder's Playbook
              </Link>
            </div>
          </header>

          {/* Stats Section */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-white/80">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* Core Capabilities */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Core Capabilities</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                End-to-end AI transformation services designed for enterprise scale and complexity.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {capabilities.map((capability) => (
                <article key={capability.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                      <capability.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{capability.title}</h3>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">{capability.description}</p>
                  <ul className="space-y-3">
                    {capability.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Solutions */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">AI Solutions</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Proven AI applications that drive measurable business outcomes.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {solutions.map((solution) => (
                <article key={solution.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
                    <solution.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{solution.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-white/60">• {benefit}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Enterprise?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join Fortune 500 companies who trust FrankX.AI for their AI transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@frankx.ai?subject=Enterprise%20AI%20Strategy%20Session"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Book Strategy Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                View Resources
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}