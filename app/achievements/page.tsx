import { ArrowRight, Award, BookOpen, Building2, Calendar, CheckCircle2, Globe, Lightbulb, Music, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import { createMetadata } from '@/lib/seo'

const majorAchievements = [
  {
    icon: Building2,
    title: 'Enterprise AI Transformations',
    metric: 'Active',
    description: 'AI implementation programs across enterprise and growth-stage teams',
    details: [
      'Strategic AI roadmapping and governance frameworks',
      'Operational workflow improvements',
      'Team training and capability building programs',
      'Risk management and compliance integration'
    ],
    year: '2020-2025'
  },
  {
    icon: Music,
    title: 'Vibe OS Implementations',
    metric: 'Ongoing',
    description: 'AI music creation systems deployed across creative workflows',
    details: [
      'Professional music production acceleration',
      'Creative workflow optimization',
      'Brand-consistent content generation',
      'Artist and creator empowerment tools'
    ],
    year: '2024-2025'
  },
  {
    icon: Sparkles,
    title: 'Conscious AI Framework',
    metric: 'Adoption',
    description: 'Organizations adopting human-centered AI principles and practices',
    details: [
      'Values-based AI implementation guidelines',
      'Ethical AI governance structures',
      'Human-AI collaboration models',
      'Transparency and accountability systems'
    ],
    year: '2023-2025'
  },
  {
    icon: Users,
    title: 'Teams Transformed',
    metric: 'Growing',
    description: 'Professionals trained in conscious AI practices and strategic implementation',
    details: [
      'Executive education programs',
      'Technical skill development',
      'Change management and adoption',
      'Cross-functional collaboration training'
    ],
    year: '2021-2025'
  }
]

const keyMilestones = [
  {
    year: '2025',
    quarter: 'Q3',
    achievement: 'FrankX.AI Platform Launch',
    description: 'Comprehensive conscious AI platform with integrated tools and resources',
    impact: 'Democratizing access to strategic AI implementation guidance',
    status: 'active'
  },
  {
    year: '2025',
    quarter: 'Q2',
    achievement: 'Agentic AI Center of Excellence',
    description: 'Established dedicated enterprise AI consulting division',
    impact: 'Enterprise advisory relationships initiated',
    status: 'completed'
  },
  {
    year: '2024',
    quarter: 'Q4',
    achievement: 'Vibe OS Production Release',
    description: 'Full production launch of AI music creation platform',
    impact: '500+ creators using systematic AI music workflows',
    status: 'completed'
  },
  {
    year: '2024',
    quarter: 'Q3',
    achievement: 'Golden Age Intelligence Framework',
    description: 'Published comprehensive guide for AI transformation',
    impact: 'Shared broadly across creator and operator communities',
    status: 'completed'
  },
  {
    year: '2024',
    quarter: 'Q1',
    achievement: 'Enterprise Scale Deployment',
    description: 'First enterprise-scale AI transformation program completion',
    impact: 'Process efficiency gains documented in year-one review',
    status: 'completed'
  },
  {
    year: '2023',
    quarter: 'Q4',
    achievement: 'Conscious AI Methodology',
    description: 'Developed and published conscious AI implementation framework',
    impact: 'Industry-wide adoption of human-centered AI principles',
    status: 'completed'
  }
]

const impactMetrics = [
  {
    icon: TrendingUp,
    title: 'Revenue Impact',
    value: 'Tracked',
    description: 'Revenue impact is measured per engagement and reported case-by-case',
    trend: 'Measured in client reviews'
  },
  {
    icon: Zap,
    title: 'Efficiency Gains',
    value: 'Observed',
    description: 'Efficiency improvements are measured against baseline workflows',
    trend: 'Varies by workflow and team'
  },
  {
    icon: Target,
    title: 'Success Rate',
    value: 'Reviewed',
    description: 'Projects are evaluated against scoped objectives and delivery criteria',
    trend: 'Quarterly review process'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    value: 'Remote',
    description: 'Programs support distributed teams across multiple regions',
    trend: 'Expanded through remote delivery'
  }
]

const recognitions = [
  {
    title: 'AI Innovation Leadership',
    organization: 'Industry AI Council',
    year: '2024',
    description: 'Recognized for pioneering conscious AI implementation methodologies'
  },
  {
    title: 'Enterprise Transformation Excellence',
    organization: 'Digital Transformation Institute',
    year: '2024',
    description: 'Outstanding achievement in large-scale AI adoption programs'
  },
  {
    title: 'Ethical AI Implementation',
    organization: 'Technology Ethics Board',
    year: '2023',
    description: 'Leadership in developing human-centered AI governance frameworks'
  },
  {
    title: 'Creative AI Innovation',
    organization: 'Creative Technology Alliance',
    year: '2024',
    description: 'Breakthrough innovation in AI-assisted creative workflows'
  }
]

export const metadata = createMetadata({
  title: 'Achievements & Impact - FrankX.AI',
  description: 'Explore the measurable impact and achievements of FrankX.AI in enterprise AI transformation, conscious AI implementation, and creative technology innovation.',
  keywords: ['frankx ai achievements', 'ai transformation success', 'enterprise ai results', 'conscious ai impact'],
  path: '/achievements',
})

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-yellow-300">
              <Award className="h-5 w-5" />
              Impact & Achievements
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Measurable Impact
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Real Results
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From enterprise programs to creator breakthrough workflows, explore the practical milestones
              and implementation patterns behind conscious AI work.
            </p>
          </header>

          {/* Impact Metrics */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric) => (
              <article key={metric.title} className="text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                  <metric.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{metric.title}</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{metric.description}</p>
                <div className="text-xs text-emerald-300 font-semibold bg-emerald-500/10 rounded-full px-3 py-1">
                  {metric.trend}
                </div>
              </article>
            ))}
          </section>

          {/* Major Achievements */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Major Achievements</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Key accomplishments that demonstrate the effectiveness of conscious AI implementation
                across industries and organizational scales.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {majorAchievements.map((achievement) => (
                <article key={achievement.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-2">{achievement.title}</h3>
                          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {achievement.metric}
                          </div>
                        </div>
                        <span className="text-white/60 text-sm bg-white/5 rounded-full px-3 py-1">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-white/70 mb-6 leading-relaxed">{achievement.description}</p>
                      <ul className="space-y-2">
                        {achievement.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Key Milestones</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                A chronological view of major achievements and breakthrough moments in our AI transformation journey.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-purple-500" />

              <div className="space-y-12">
                {keyMilestones.map((milestone, index) => (
                  <article key={index} className={`flex items-center gap-8 ${
                    index % 2 === 0 ? '' : 'flex-row-reverse'
                  }`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className={`rounded-3xl border p-8 backdrop-blur ${
                        milestone.status === 'active'
                          ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10'
                          : 'border-white/10 bg-white/5'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              milestone.status === 'active'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {milestone.status === 'active' ? (
                                <Zap className="w-3 h-3" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              {milestone.status === 'active' ? 'In Progress' : 'Completed'}
                            </span>
                          </div>
                          <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                            <span className="text-white/60 text-sm">
                              {milestone.year} {milestone.quarter}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">{milestone.achievement}</h3>
                        <p className="text-white/70 mb-4 leading-relaxed">{milestone.description}</p>
                        <div className="text-sm">
                          <span className="text-white/60">Impact: </span>
                          <span className="text-emerald-300 font-semibold">{milestone.impact}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-4 z-10 ${
                      milestone.status === 'active'
                        ? 'border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600'
                        : 'border-emerald-400 bg-gradient-to-br from-emerald-500 to-green-600'
                    }`}>
                      <Calendar className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Recognition & Awards */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Recognition & Awards</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Industry recognition for innovation, leadership, and impact in conscious AI implementation.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {recognitions.map((recognition, index) => (
                <article key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-white">{recognition.title}</h3>
                        <span className="text-yellow-400 text-sm font-semibold">{recognition.year}</span>
                      </div>
                      <p className="text-cyan-300 text-sm mb-3">{recognition.organization}</p>
                      <p className="text-white/70 text-sm leading-relaxed">{recognition.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-yellow-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Ready to Create Your Own Success Story?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join the organizations that have transformed their operations and achieved breakthrough results
              with conscious AI implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/agentic-ai-center"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Explore Our Services
              </Link>
            </div>
          </section>
        </div>
      </main>
</div>
  )
}
