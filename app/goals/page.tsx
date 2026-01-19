import { ArrowRight, Calendar, CheckCircle2, Clock, Compass, Flag, Globe, Lightbulb, Rocket, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import { createMetadata } from '@/lib/seo'

const shortTermGoals = [
  {
    icon: Rocket,
    title: 'Platform Enhancement',
    timeline: 'Next 6 Months',
    objectives: [
      'Launch advanced AI assessment with personalized roadmaps',
      'Expand Vibe OS with collaborative features',
      'Release enterprise-grade security and compliance tools',
      'Integrate real-time analytics dashboard'
    ],
    metrics: ['50+ new features shipped', '2x user engagement', '99.9% uptime maintained']
  },
  {
    icon: Users,
    title: 'Community Growth',
    timeline: 'Next 6 Months',
    objectives: [
      'Reach 10,000 active creators using Vibe OS',
      'Establish 100+ enterprise partnerships',
      'Launch professional certification programs',
      'Create global user conference and community events'
    ],
    metrics: ['10K active users', '100+ partnerships', '500+ certified professionals']
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    timeline: 'This Year',
    objectives: [
      'Expand to European and Asian markets',
      'Localize platform for 5 major languages',
      'Establish regional support centers',
      'Partner with local AI organizations'
    ],
    metrics: ['5 new markets', '15+ languages', '24/7 global support']
  }
]

const mediumTermGoals = [
  {
    icon: TrendingUp,
    title: 'Market Leadership',
    timeline: '1-2 Years',
    objectives: [
      'Become the leading conscious AI implementation platform',
      'Establish industry standards for ethical AI practices',
      'Achieve $50M annual recurring revenue',
      'Partner with top-tier technology companies'
    ],
    impact: 'Transform how organizations approach AI adoption globally'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Breakthrough',
    timeline: '12-18 Months',
    objectives: [
      'Launch next-generation AI orchestration tools',
      'Develop proprietary conscious AI models',
      'Create autonomous business process optimization',
      'Introduce predictive transformation planning'
    ],
    impact: 'Set new benchmark for AI-human collaboration excellence'
  },
  {
    icon: Sparkles,
    title: 'Ecosystem Expansion',
    timeline: '18-24 Months',
    objectives: [
      'Build comprehensive AI marketplace',
      'Launch developer platform and APIs',
      'Create educational institutions partnerships',
      'Establish venture fund for conscious AI startups'
    ],
    impact: 'Enable thriving ecosystem of conscious AI innovation'
  }
]

const longTermVision = [
  {
    icon: Target,
    title: 'Global AI Transformation',
    description: 'Lead the global transition to conscious AI implementation across all industries',
    objectives: [
      'Transform 100,000+ organizations worldwide',
      'Train 1 million professionals in conscious AI practices',
      'Establish conscious AI as the default industry standard',
      'Create sustainable AI governance frameworks globally'
    ]
  },
  {
    icon: Flag,
    title: 'Technology Innovation',
    description: 'Pioneer breakthrough AI technologies that enhance human creativity and capability',
    objectives: [
      'Develop next-generation AI-human interface systems',
      'Create universal AI collaboration protocols',
      'Establish new paradigms for creative AI applications',
      'Build self-optimizing organizational intelligence systems'
    ]
  },
  {
    icon: Globe,
    title: 'Societal Impact',
    description: 'Drive positive societal change through responsible AI advancement',
    objectives: [
      'Reduce global productivity gaps through AI democratization',
      'Enhance human creativity and fulfillment through AI partnership',
      'Promote inclusive access to AI transformation benefits',
      'Establish sustainable AI development practices'
    ]
  }
]

const keyMetrics = [
  {
    category: 'Platform Growth',
    current: '1,500',
    target: '100K',
    unit: 'Active Users',
    timeline: '2027',
    trend: '+150% YoY'
  },
  {
    category: 'Enterprise Impact',
    current: '200',
    target: '10K',
    unit: 'Organizations',
    timeline: '2028',
    trend: '+200% YoY'
  },
  {
    category: 'Revenue Growth',
    current: '$2M',
    target: '$100M',
    unit: 'ARR',
    timeline: '2027',
    trend: '+300% YoY'
  },
  {
    category: 'Global Reach',
    current: '25',
    target: '100',
    unit: 'Countries',
    timeline: '2026',
    trend: '5 new markets/quarter'
  }
]

const principles = [
  {
    title: 'Human-Centered Design',
    description: 'Every AI system we build amplifies human creativity, decision-making, and values rather than replacing them.',
    icon: Users
  },
  {
    title: 'Transparent Innovation',
    description: 'Open development processes, clear AI reasoning, and accountable decision-making systems.',
    icon: Lightbulb
  },
  {
    title: 'Sustainable Growth',
    description: 'Building long-term value for all stakeholders while maintaining ethical standards and social responsibility.',
    icon: TrendingUp
  },
  {
    title: 'Inclusive Access',
    description: 'Democratizing access to AI transformation tools and education across organizations of all sizes.',
    icon: Globe
  }
]

export const metadata = createMetadata({
  title: 'Goals & Vision - Building the Future of Conscious AI | FrankX.AI',
  description: 'Explore FrankX.AI\'s strategic goals, long-term vision, and commitment to transforming how organizations implement AI with human-centered principles.',
  keywords: ['frankx ai vision', 'conscious ai future', 'ai transformation goals', 'strategic roadmap'],
  path: '/goals',
})

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-purple-300">
              <Target className="h-5 w-5" />
              Strategic Vision & Goals
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Building the Future
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Of Conscious AI
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Our strategic roadmap for transforming how organizations implement AI technology with
              human-centered principles, ethical frameworks, and measurable business outcomes.
            </p>
          </header>

          {/* Key Metrics */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric) => (
              <article key={metric.category} className="text-center p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <h3 className="text-lg font-semibold text-white mb-3">{metric.category}</h3>
                <div className="space-y-2 mb-4">
                  <div className="text-white/60 text-sm">Current</div>
                  <div className="text-2xl font-bold text-cyan-400">{metric.current}</div>
                  <ArrowRight className="w-4 h-4 text-white/40 mx-auto" />
                  <div className="text-white/60 text-sm">Target ({metric.timeline})</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {metric.target}
                  </div>
                </div>
                <div className="text-xs text-white/60">{metric.unit}</div>
                <div className="text-xs text-emerald-300 font-semibold bg-emerald-500/10 rounded-full px-2 py-1 mt-2">
                  {metric.trend}
                </div>
              </article>
            ))}
          </section>

          {/* Short-term Goals */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Short-term Goals</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Immediate priorities and objectives for the next 6-12 months focused on platform
                enhancement and community growth.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {shortTermGoals.map((goal) => (
                <article key={goal.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <goal.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{goal.title}</h3>
                      <p className="text-cyan-300 text-sm">{goal.timeline}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-3">Key Objectives:</h4>
                      <ul className="space-y-2">
                        {goal.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-3">Success Metrics:</h4>
                      <ul className="space-y-1">
                        {goal.metrics.map((metric, index) => (
                          <li key={index} className="text-purple-300 text-sm">• {metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Medium-term Goals */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Medium-term Vision</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Strategic objectives for the next 1-2 years focused on market leadership and
                breakthrough innovation in conscious AI.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {mediumTermGoals.map((goal) => (
                <article key={goal.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <goal.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{goal.title}</h3>
                      <p className="text-purple-300 text-sm">{goal.timeline}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <ul className="space-y-2">
                      {goal.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
                      <h4 className="text-sm font-semibold text-purple-300 mb-2">Expected Impact:</h4>
                      <p className="text-white/80 text-sm leading-relaxed">{goal.impact}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Long-term Vision */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Long-term Vision</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our ambitious 5-10 year vision for transforming global AI adoption and creating
                sustainable positive impact across industries and societies.
              </p>
            </div>

            <div className="space-y-8">
              {longTermVision.map((vision) => (
                <article key={vision.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                          <vision.icon className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{vision.title}</h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">{vision.description}</p>
                    </div>

                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-semibold text-white/80 mb-4">Strategic Objectives:</h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {vision.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Compass className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Core Principles */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Guiding Principles</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                The fundamental principles that guide every decision and drive all of our strategic initiatives.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {principles.map((principle) => (
                <article key={principle.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center flex-shrink-0">
                      <principle.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                      <p className="text-white/70 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-slate-900 to-slate-950 p-12">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">Journey to 2030</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                A visual roadmap of our transformation journey from conscious AI pioneers to global leaders
                in ethical AI implementation.
              </p>

              <div className="flex items-center justify-center space-x-12 pt-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4 mx-auto">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">2026</div>
                  <div className="text-white/60 text-sm">Platform Excellence</div>
                </div>

                <ArrowRight className="w-8 h-8 text-white/40" />

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4 mx-auto">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400">2028</div>
                  <div className="text-white/60 text-sm">Market Leadership</div>
                </div>

                <ArrowRight className="w-8 h-8 text-white/40" />

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mb-4 mx-auto">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">2030</div>
                  <div className="text-white/60 text-sm">Global Impact</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Join Us in Building the Future</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Be part of the conscious AI transformation. Whether you're an individual creator, growing business,
              or enterprise organization, there's a place for you in this journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Explore Our Products
              </Link>
            </div>
          </section>
        </div>
      </main>
</div>
  )
}