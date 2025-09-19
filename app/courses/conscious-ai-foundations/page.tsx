import { ArrowRight, BookOpen, CheckCircle2, Clock, Download, Globe, Lightbulb, Play, Star, Target, Trophy, Users, Video, Zap } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'

const courseModules = [
  {
    module: 1,
    title: 'Foundations of Conscious AI',
    duration: '2 hours',
    lessons: 8,
    description: 'Introduction to conscious AI principles and human-centered implementation approaches.',
    topics: [
      'Understanding Conscious AI vs Traditional AI',
      'Human-Centered Design Principles',
      'Ethical AI Frameworks',
      'Value Alignment Strategies'
    ],
    resources: ['Module workbook', 'Ethics checklist', 'Value assessment tool']
  },
  {
    module: 2,
    title: 'Strategic AI Planning',
    duration: '3 hours',
    lessons: 12,
    description: 'Develop comprehensive strategies for AI adoption that align with organizational values.',
    topics: [
      'AI Readiness Assessment',
      'Strategic Roadmap Development',
      'Stakeholder Alignment',
      'Risk Assessment and Mitigation'
    ],
    resources: ['Strategy canvas template', 'Roadmap builder', 'Risk matrix tool']
  },
  {
    module: 3,
    title: 'Implementation Frameworks',
    duration: '4 hours',
    lessons: 15,
    description: 'Practical frameworks and methodologies for successful AI implementation.',
    topics: [
      'Agile AI Development',
      'Human-AI Collaboration Models',
      'Quality Assurance Protocols',
      'Feedback Loop Systems'
    ],
    resources: ['Implementation checklist', 'Quality templates', 'Feedback frameworks']
  },
  {
    module: 4,
    title: 'Governance & Compliance',
    duration: '2.5 hours',
    lessons: 10,
    description: 'Establish governance structures and ensure regulatory compliance.',
    topics: [
      'AI Governance Frameworks',
      'Regulatory Compliance',
      'Transparency and Accountability',
      'Continuous Monitoring'
    ],
    resources: ['Governance templates', 'Compliance checklists', 'Monitoring dashboards']
  },
  {
    module: 5,
    title: 'Measurement & Optimization',
    duration: '3 hours',
    lessons: 11,
    description: 'Measure AI impact and continuously optimize for better outcomes.',
    topics: [
      'KPI Development',
      'Impact Measurement',
      'Continuous Improvement',
      'ROI Calculation'
    ],
    resources: ['Metrics framework', 'ROI calculator', 'Optimization playbook']
  },
  {
    module: 6,
    title: 'Advanced Applications',
    duration: '4 hours',
    lessons: 16,
    description: 'Explore advanced AI applications and emerging technologies.',
    topics: [
      'Creative AI Systems',
      'Autonomous Decision Making',
      'Multi-Agent Orchestration',
      'Future AI Trends'
    ],
    resources: ['Application templates', 'Case study library', 'Trend reports']
  }
]

const instructors = [
  {
    name: 'Frank X',
    role: 'Founder & Chief AI Strategist',
    company: 'FrankX.AI',
    bio: 'Pioneer in conscious AI implementation with 200+ successful enterprise transformations.',
    expertise: ['AI Strategy', 'Conscious AI', 'Enterprise Transformation', 'Ethical AI'],
    image: '/images/frank-avatar.jpg' // This would be a real image path
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'AI Ethics Researcher',
    company: 'MIT AI Lab',
    bio: 'Leading researcher in AI ethics and human-centered design with 50+ published papers.',
    expertise: ['AI Ethics', 'Human-AI Interaction', 'Responsible AI', 'Research'],
    image: '/images/sarah-avatar.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Enterprise AI Architect',
    company: 'Former Google AI',
    bio: 'Former Google AI architect with expertise in large-scale AI system design and implementation.',
    expertise: ['System Architecture', 'Scalable AI', 'Technical Implementation', 'Cloud AI'],
    image: '/images/michael-avatar.jpg'
  }
]

const learningOutcomes = [
  {
    icon: Target,
    title: 'Strategic AI Vision',
    description: 'Develop a clear, ethical AI strategy aligned with your organizational values and goals.',
    skills: ['Strategic Planning', 'Vision Development', 'Stakeholder Alignment']
  },
  {
    icon: Zap,
    title: 'Implementation Expertise',
    description: 'Master practical frameworks for implementing AI solutions that enhance human capability.',
    skills: ['Project Management', 'Technical Implementation', 'Change Management']
  },
  {
    icon: Users,
    title: 'Leadership Capability',
    description: 'Lead AI transformation initiatives with confidence and ethical grounding.',
    skills: ['Team Leadership', 'Communication', 'Decision Making']
  },
  {
    icon: Trophy,
    title: 'Measurable Results',
    description: 'Create systems to measure AI impact and continuously optimize for better outcomes.',
    skills: ['Metrics Development', 'Data Analysis', 'Continuous Improvement']
  }
]

const pricing = [
  {
    name: 'Individual Access',
    price: '$497',
    description: 'Perfect for professionals looking to develop conscious AI expertise.',
    features: [
      'Complete 6-module course',
      'All templates and resources',
      'Certificate of completion',
      '6 months access',
      'Community forum access',
      'Mobile app access'
    ],
    popular: false
  },
  {
    name: 'Team License',
    price: '$1,497',
    description: 'Ideal for teams of 5-10 people working on AI transformation.',
    features: [
      'Everything in Individual',
      'Up to 10 team members',
      'Team collaboration tools',
      'Progress tracking dashboard',
      'Monthly group Q&A sessions',
      '12 months access'
    ],
    popular: true
  },
  {
    name: 'Enterprise Package',
    price: 'Custom',
    description: 'Comprehensive solution for large organizations with custom needs.',
    features: [
      'Everything in Team License',
      'Unlimited team members',
      'Custom content development',
      'Executive briefing sessions',
      'Implementation consulting',
      'Lifetime access'
    ],
    popular: false
  }
]

const testimonials = [
  {
    name: 'Jennifer Walsh',
    role: 'VP of Digital Transformation',
    company: 'Fortune 500 Healthcare',
    quote: 'This course transformed how our entire organization approaches AI. The conscious AI framework helped us implement solutions that actually enhance our healthcare professionals\' capabilities rather than replacing them.',
    rating: 5,
    results: '40% improvement in AI project success rate'
  },
  {
    name: 'David Kim',
    role: 'CTO',
    company: 'Fintech Startup',
    quote: 'The strategic planning modules were game-changers. We went from scattered AI experiments to a coherent strategy that secured $10M in Series A funding.',
    rating: 5,
    results: 'Secured $10M funding with AI-first strategy'
  },
  {
    name: 'Maria Santos',
    role: 'Innovation Director',
    company: 'Global Manufacturing',
    quote: 'The implementation frameworks provided exactly what we needed to roll out AI across 15 factories. The human-centered approach ensured high adoption rates and measurable ROI.',
    rating: 5,
    results: '15 factories successfully transformed'
  }
]

export const metadata = createMetadata({
  title: 'Conscious AI Foundations Course - Master Ethical AI Implementation | FrankX.AI',
  description: 'Comprehensive online course teaching conscious AI principles, strategic implementation, and ethical frameworks. Transform your AI approach with human-centered methodologies.',
  keywords: ['conscious ai course', 'ai ethics training', 'ai implementation course', 'responsible ai education'],
  path: '/courses/conscious-ai-foundations',
})

export default function ConsciousAIFoundationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-emerald-300">
              <BookOpen className="h-5 w-5" />
              Professional Course
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Conscious AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 bg-clip-text text-transparent">
                Foundations
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Master the principles and practices of conscious AI implementation. Learn to build AI systems
              that enhance human capability while maintaining ethical standards and organizational values.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-white/60 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>18.5 total hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>72 video lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>30+ resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Certificate included</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#modules"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                View Curriculum
              </Link>
            </div>
          </header>

          {/* Learning Outcomes */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {learningOutcomes.map((outcome) => (
              <article key={outcome.title} className="text-center p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <outcome.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{outcome.title}</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{outcome.description}</p>
                <div className="space-y-1">
                  {outcome.skills.map((skill) => (
                    <div key={skill} className="text-xs text-emerald-300 bg-emerald-500/10 rounded-full px-2 py-1">
                      {skill}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>

          {/* Course Modules */}
          <section id="modules" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Course Curriculum</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Six comprehensive modules covering everything from foundational principles to advanced applications
                of conscious AI implementation.
              </p>
            </div>

            <div className="space-y-6">
              {courseModules.map((module) => (
                <article key={module.module} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-emerald-400">{module.module}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-white">{module.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            <span>{module.lessons} lessons</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 mb-6 leading-relaxed">{module.description}</p>

                      <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold text-white/80 mb-3">Key Topics:</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic) => (
                              <li key={topic} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80 text-sm">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white/80 mb-3">Module Resources:</h4>
                          <ul className="space-y-2">
                            {module.resources.map((resource) => (
                              <li key={resource} className="flex items-start gap-2">
                                <Download className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80 text-sm">{resource}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Instructors */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Meet Your Instructors</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Learn from industry experts and pioneers in conscious AI implementation.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {instructors.map((instructor) => (
                <article key={instructor.name} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-purple-400" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-2">{instructor.name}</h3>
                  <p className="text-cyan-300 text-sm mb-2">{instructor.role}</p>
                  <p className="text-white/60 text-sm mb-4">{instructor.company}</p>

                  <p className="text-white/70 text-sm mb-6 leading-relaxed">{instructor.bio}</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {instructor.expertise.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Student Success Stories</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                See how professionals have transformed their AI approach and achieved measurable results.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <article key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="mb-4">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                    <p className="text-cyan-300 text-sm">{testimonial.company}</p>
                  </div>

                  <div className="text-xs text-emerald-300 font-semibold bg-emerald-500/10 rounded-full px-3 py-1 inline-block">
                    {testimonial.results}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Choose Your Learning Path</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Select the option that best fits your learning needs and organizational requirements.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pricing.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-3xl border p-8 backdrop-blur relative ${
                    plan.popular
                      ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-emerald-300 mb-4">{plan.price}</div>
                    <p className="text-white/70 leading-relaxed">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.price === 'Custom' ? '/contact' : '/contact?course=conscious-ai-foundations'}
                    className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'border border-white/20 bg-white/5 text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Enroll Now'}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-emerald-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Transform Your AI Approach Today</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join thousands of professionals who have mastered conscious AI implementation.
              Start building AI systems that enhance human capability and organizational values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?course=conscious-ai-foundations"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Ask Questions
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}