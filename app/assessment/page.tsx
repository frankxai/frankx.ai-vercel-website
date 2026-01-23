import { ArrowRight, Brain, CheckCircle2, Clock, Lightbulb, Play, Sparkles, Target, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import { createMetadata } from '@/lib/seo'

const assessmentTypes = [
  {
    icon: Brain,
    title: 'AI Readiness Assessment',
    description: 'Comprehensive evaluation of your organization\'s AI adoption readiness',
    duration: '15-20 minutes',
    questions: 50,
    categories: ['Strategy', 'Technology', 'Data', 'Governance', 'Culture'],
    href: '/ai-assessment',
    recommended: true,
    features: [
      'Personalized recommendations',
      'Strategic roadmap creation',
      'Risk assessment matrix',
      'Implementation timeline',
      'Resource planning guide'
    ]
  },
  {
    icon: Target,
    title: 'Advanced Strategic Assessment',
    description: 'Deep-dive analysis for organizations ready for complex AI transformation',
    duration: '30-45 minutes',
    questions: 100,
    categories: ['Vision', 'Architecture', 'Implementation', 'Measurement', 'Optimization'],
    href: '/assessment/advanced',
    recommended: false,
    features: [
      'Multi-stakeholder analysis',
      'Technical architecture review',
      'ROI projection modeling',
      'Change management planning',
      'Executive presentation deck'
    ]
  },
  {
    icon: Sparkles,
    title: 'Creative AI Assessment',
    description: 'Specialized evaluation for creators and content-focused organizations',
    duration: '10-15 minutes',
    questions: 30,
    categories: ['Creative Process', 'Content Strategy', 'Tools', 'Brand Consistency', 'Monetization'],
    href: '/assessment/creative',
    recommended: false,
    features: [
      'Creative workflow analysis',
      'Brand voice optimization',
      'Content scaling strategies',
      'Tool recommendations',
      'Revenue opportunity mapping'
    ]
  }
]

const benefits = [
  {
    icon: Target,
    title: 'Clear Strategic Direction',
    description: 'Get specific, actionable recommendations tailored to your organization\'s unique context and goals.'
  },
  {
    icon: Clock,
    title: 'Accelerated Implementation',
    description: 'Avoid common pitfalls and accelerate your AI journey with proven frameworks and best practices.'
  },
  {
    icon: CheckCircle2,
    title: 'Risk Mitigation',
    description: 'Identify potential challenges early and develop proactive mitigation strategies.'
  },
  {
    icon: Zap,
    title: 'Optimized Resource Allocation',
    description: 'Focus your time, budget, and team efforts on the highest-impact AI initiatives.'
  }
]

const process = [
  {
    step: 1,
    title: 'Select Assessment',
    description: 'Choose the assessment that best matches your organization\'s needs and current AI maturity level.',
    duration: '1 minute'
  },
  {
    step: 2,
    title: 'Complete Evaluation',
    description: 'Answer comprehensive questions about your strategy, technology, data, and organizational readiness.',
    duration: '10-45 minutes'
  },
  {
    step: 3,
    title: 'Receive Analysis',
    description: 'Get instant results with detailed analysis, recommendations, and personalized action plans.',
    duration: 'Instant'
  },
  {
    step: 4,
    title: 'Implement Recommendations',
    description: 'Follow the strategic roadmap and access additional resources to execute your AI transformation.',
    duration: 'Ongoing'
  }
]

// Testimonials will be added as real user feedback is collected

export const metadata = createMetadata({
  title: 'AI Assessment Center - Evaluate Your AI Readiness | FrankX.AI',
  description: 'Comprehensive AI readiness assessments to evaluate your organization\'s AI maturity, identify opportunities, and create strategic implementation roadmaps.',
  keywords: ['ai assessment', 'ai readiness evaluation', 'ai maturity assessment', 'ai strategy planning'],
  path: '/assessment',
})

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-void text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cyan-300">
              <Brain className="h-5 w-5" />
              AI Assessment Center
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Evaluate Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI Readiness
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Comprehensive assessments to evaluate your organization's AI maturity, identify strategic opportunities,
              and create personalized roadmaps for successful AI transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/ai-assessment"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#assessments"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Compare Assessments
              </Link>
            </div>
          </header>

          {/* Benefits */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="text-center p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
              </article>
            ))}
          </section>

          {/* Assessment Types */}
          <section id="assessments" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Choose Your Assessment</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Select the assessment that best matches your organization's current AI maturity and transformation goals.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {assessmentTypes.map((assessment) => (
                <article
                  key={assessment.title}
                  className={`rounded-3xl border p-8 backdrop-blur relative ${
                    assessment.recommended
                      ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {assessment.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      assessment.recommended
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                        : 'bg-white/10'
                    }`}>
                      <assessment.icon className={`w-6 h-6 ${
                        assessment.recommended ? 'text-cyan-400' : 'text-white/80'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{assessment.title}</h3>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">{assessment.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="text-center p-3 rounded-xl bg-white/5">
                      <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-white/80">{assessment.duration}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/5">
                      <Target className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-white/80">{assessment.questions} questions</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/80 mb-3">Assessment Categories:</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessment.categories.map((category) => (
                        <span key={category} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-white/80 mb-3">What You'll Get:</h4>
                    <ul className="space-y-2">
                      {assessment.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={assessment.href}
                    className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      assessment.recommended
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                        : 'border border-white/20 bg-white/5 text-white/90 hover:bg-white/10'
                    }`}
                  >
                    Start Assessment
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">How It Works</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our comprehensive assessment process provides deep insights and actionable recommendations
                in four simple steps.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {process.map((step, index) => (
                <article key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 transform -translate-y-0.5" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70 text-sm mb-3 leading-relaxed">{step.description}</p>
                  <div className="text-xs text-purple-300 bg-purple-500/10 rounded-full px-3 py-1">
                    {step.duration}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Testimonials section removed - will be added when real user feedback is collected */}

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Ready to Begin Your AI Journey?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Take the first step toward strategic AI transformation with a comprehensive assessment
              tailored to your organization's unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-assessment"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Start Free Assessment
                <Play className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Get Custom Assessment
              </Link>
            </div>
          </section>
        </div>
      </main>
</div>
  )
}