import { ArrowRight, Award, Building2, CheckCircle2, Globe, LineChart, Lock, Shield, Star, Target, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import InteractiveCard from '@/components/ui/InteractiveCard'
import { createMetadata } from '@/lib/seo'

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security & Compliance',
    description: 'Bank-grade security with SOC2, GDPR, and industry-specific compliance frameworks.',
    features: [
      'End-to-end encryption',
      'Single Sign-On (SSO)',
      'Advanced audit trails',
      'Compliance reporting',
      'Data residency controls'
    ],
    highlight: 'SOC2 Type II Certified'
  },
  {
    icon: Users,
    title: 'Scalable Team Management',
    description: 'Comprehensive user management with role-based access and team collaboration tools.',
    features: [
      'Unlimited team members',
      'Custom role definitions',
      'Department hierarchies',
      'Usage analytics',
      'Centralized billing'
    ],
    highlight: '10,000+ User Support'
  },
  {
    icon: Zap,
    title: 'Advanced AI Orchestration',
    description: 'Enterprise-grade AI workflows with custom model integration and automation.',
    features: [
      'Custom AI model training',
      'Multi-model orchestration',
      'Workflow automation',
      'API integrations',
      'Performance optimization'
    ],
    highlight: '99.9% Uptime SLA'
  },
  {
    icon: LineChart,
    title: 'Analytics & Insights',
    description: 'Comprehensive analytics dashboard with ROI tracking and performance metrics.',
    features: [
      'Real-time dashboards',
      'Custom reporting',
      'ROI calculation',
      'Usage insights',
      'Predictive analytics'
    ],
    highlight: 'Real-time Intelligence'
  }
]

const clientLogos = [
  { name: 'Fortune 500 Manufacturing', category: 'Manufacturing' },
  { name: 'Global Financial Services', category: 'Finance' },
  { name: 'Healthcare Innovation', category: 'Healthcare' },
  { name: 'Tech Unicorn', category: 'Technology' },
  { name: 'Retail Giant', category: 'Retail' },
  { name: 'Energy Corporation', category: 'Energy' }
]

const successMetrics = [
  {
    metric: '$50M+',
    label: 'Total Customer ROI',
    description: 'Documented returns from AI implementations',
    icon: TrendingUp
  },
  {
    metric: '95%',
    label: 'Implementation Success',
    description: 'Projects delivered on time and budget',
    icon: Target
  },
  {
    metric: '200+',
    label: 'Enterprise Clients',
    description: 'Organizations transformed with conscious AI',
    icon: Building2
  },
  {
    metric: '60%',
    label: 'Average Efficiency Gain',
    description: 'Productivity improvement across implementations',
    icon: Zap
  }
]

const caseStudies = [
  {
    company: 'Global Manufacturing Corp',
    industry: 'Manufacturing',
    challenge: 'Manual quality control processes causing 15% defect rates and production delays',
    solution: 'AI-powered visual inspection system with predictive maintenance integration',
    results: [
      '85% reduction in defect rates',
      '$2.3M annual savings',
      '40% faster quality control',
      '99.2% accuracy in defect detection'
    ],
    testimonial: 'FrankX.AI transformed our manufacturing quality control from a cost center into a competitive advantage.',
    role: 'Chief Operations Officer'
  },
  {
    company: 'Healthcare Innovation Network',
    industry: 'Healthcare',
    challenge: 'Inefficient patient data analysis leading to delayed diagnoses and treatment',
    solution: 'HIPAA-compliant AI diagnostic assistance with integrated workflow automation',
    results: [
      '35% faster diagnosis times',
      '92% improvement in accuracy',
      '$1.8M cost reduction',
      '50% reduction in administrative tasks'
    ],
    testimonial: 'The conscious AI approach ensured our patients remained at the center while dramatically improving outcomes.',
    role: 'Chief Medical Officer'
  },
  {
    company: 'Financial Services Leader',
    industry: 'Finance',
    challenge: 'Risk assessment processes taking weeks, limiting competitive response time',
    solution: 'Real-time risk modeling with regulatory compliance automation',
    results: [
      '90% faster risk assessments',
      '45% improvement in accuracy',
      '$5.2M revenue increase',
      '100% regulatory compliance'
    ],
    testimonial: 'FrankX.AI delivered enterprise-grade AI that actually enhanced our human expertise rather than replacing it.',
    role: 'Chief Risk Officer'
  }
]

const implementationProcess = [
  {
    phase: 'Discovery & Strategy',
    duration: '2-4 weeks',
    activities: [
      'Comprehensive business analysis',
      'AI readiness assessment',
      'Strategic roadmap development',
      'Success metrics definition',
      'Risk assessment and mitigation'
    ],
    deliverables: 'Strategic Implementation Plan'
  },
  {
    phase: 'Architecture & Design',
    duration: '3-6 weeks',
    activities: [
      'Technical architecture design',
      'Security framework implementation',
      'Integration planning',
      'Data pipeline development',
      'Compliance verification'
    ],
    deliverables: 'Technical Architecture Blueprint'
  },
  {
    phase: 'Development & Testing',
    duration: '8-16 weeks',
    activities: [
      'AI model development',
      'System integration',
      'Security implementation',
      'Performance optimization',
      'Comprehensive testing'
    ],
    deliverables: 'Production-Ready AI System'
  },
  {
    phase: 'Deployment & Training',
    duration: '2-4 weeks',
    activities: [
      'Production deployment',
      'Team training programs',
      'Change management',
      'Performance monitoring',
      'Success measurement'
    ],
    deliverables: 'Fully Operational AI Solution'
  }
]

export const metadata = createMetadata({
  title: 'Enterprise AI Solutions - Conscious AI for Large Organizations | FrankX.AI',
  description: 'Comprehensive enterprise AI transformation with security, compliance, and scalability. Proven solutions for Fortune 500 companies and large organizations.',
  keywords: ['enterprise ai', 'ai transformation', 'conscious ai enterprise', 'large scale ai implementation'],
  path: '/enterprise',
})

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      <AnimatedBackground variant="gradient" intensity="medium" />
      <Navigation />
      <main className="px-6 pt-28 pb-20 relative">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8 relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-blue-300">
              <Building2 className="h-5 w-5" />
              Enterprise Solutions
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-5xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Enterprise AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                That Scales
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Comprehensive AI transformation solutions for Fortune 500 companies and large organizations.
              Conscious AI implementation with enterprise-grade security, compliance, and scalability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                href="/contact?enterprise=true"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Schedule Enterprise Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                View Success Stories
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>SOC2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Global Deployment</span>
              </div>
            </div>
          </header>

          {/* Success Metrics */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {successMetrics.map((metric) => (
              <InteractiveCard key={metric.label} glowColor="cyan" className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6">
                  <metric.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {metric.metric}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{metric.label}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{metric.description}</p>
              </InteractiveCard>
            ))}
          </section>

          {/* Client Logos */}
          <section className="text-center space-y-8">
            <h2 className="text-2xl font-semibold text-white">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-60">
              {clientLogos.map((client) => (
                <div key={client.name} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-8 h-8 text-white/40" />
                  </div>
                  <div className="text-xs text-white/60">{client.category}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Enterprise Features */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Enterprise-Grade Capabilities</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Built for the most demanding enterprise environments with security, scalability, and compliance at the core.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {enterpriseFeatures.map((feature) => (
                <InteractiveCard key={feature.title} glowColor="purple" className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-semibold">
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-white/70 mb-6 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.features.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </section>

          {/* Case Studies */}
          <section id="case-studies" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Enterprise Success Stories</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Real transformations from Fortune 500 companies that have implemented conscious AI at scale.
              </p>
            </div>

            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <InteractiveCard key={index} glowColor="emerald" className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white">{study.company}</h3>
                          <p className="text-emerald-300 text-sm">{study.industry}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold text-white/80 mb-2">Challenge:</h4>
                          <p className="text-white/70 text-sm leading-relaxed">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white/80 mb-2">Solution:</h4>
                          <p className="text-white/70 text-sm leading-relaxed">{study.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Results Achieved:</h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span className="text-emerald-300 text-sm font-medium">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <blockquote className="border-l-4 border-emerald-400 pl-6">
                        <p className="text-white/80 italic mb-3">"{study.testimonial}"</p>
                        <footer className="text-white/60 text-sm">— {study.role}</footer>
                      </blockquote>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </section>

          {/* Implementation Process */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Implementation Process</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our proven methodology ensures successful AI transformation with minimal business disruption.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {implementationProcess.map((phase, index) => (
                <InteractiveCard key={index} glowColor="cyan" className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{phase.phase}</h3>
                      <p className="text-cyan-300 text-sm">{phase.duration}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-3">Key Activities:</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity) => (
                          <li key={activity} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                      <h4 className="text-sm font-semibold text-cyan-300 mb-2">Deliverable:</h4>
                      <p className="text-white/80 text-sm">{phase.deliverables}</p>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-blue-500/5 via-slate-900 to-slate-950 relative overflow-hidden">
            <AnimatedBackground variant="particles" intensity="low" className="opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white">Ready to Transform Your Enterprise?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Join Fortune 500 companies that have successfully implemented conscious AI at scale.
                Schedule a personalized demo to see how we can transform your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact?demo=enterprise"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
                >
                  Schedule Enterprise Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/agentic-ai-center"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
                >
                  Explore AI Services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}