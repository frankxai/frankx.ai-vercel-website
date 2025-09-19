import { ArrowRight, BookOpen, Edit3, FileText, Globe, Megaphone, PenTool, Target, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'

const features = [
  {
    icon: PenTool,
    title: 'Strategic Storytelling Framework',
    description: 'Develop compelling narratives that resonate with your audience and drive business results.',
    details: [
      'Brand story architecture and positioning',
      'Content pillar development',
      'Narrative consistency across channels',
      'Emotional engagement strategies'
    ]
  },
  {
    icon: Edit3,
    title: 'Content Creation Systems',
    description: 'Systematic approach to creating high-quality content that builds authority and drives conversions.',
    details: [
      'Editorial calendar and planning tools',
      'AI-assisted content generation workflows',
      'Multi-format content adaptation',
      'Quality assurance and brand alignment'
    ]
  },
  {
    icon: Target,
    title: 'Audience Development',
    description: 'Build and nurture engaged communities around your brand story.',
    details: [
      'Audience persona development',
      'Community engagement strategies',
      'Social media growth tactics',
      'Email list building and nurturing'
    ]
  },
  {
    icon: Globe,
    title: 'Omnichannel Distribution',
    description: 'Amplify your stories across all relevant platforms and touchpoints.',
    details: [
      'Platform-specific content optimization',
      'Cross-channel storytelling strategies',
      'SEO and content discovery',
      'Paid promotion and amplification'
    ]
  }
]

const benefits = [
  {
    icon: Megaphone,
    title: 'Brand Authority',
    description: 'Establish thought leadership and build trust through consistent, valuable storytelling.',
    metric: '340% increase in brand mentions'
  },
  {
    icon: Users,
    title: 'Audience Growth',
    description: 'Attract and retain engaged audiences who become loyal customers and advocates.',
    metric: '200% growth in qualified leads'
  },
  {
    icon: Zap,
    title: 'Content Velocity',
    description: 'Produce high-quality content faster with systematic workflows and AI assistance.',
    metric: '5x faster content production'
  }
]

const packages = [
  {
    name: 'Creator Package',
    price: '$497',
    description: 'Perfect for individual creators and small businesses starting their storytelling journey.',
    features: [
      'Brand story framework development',
      'Content pillar strategy',
      'Basic template library',
      '4 weeks of email support',
      'Getting started video course'
    ],
    cta: 'Start Creating'
  },
  {
    name: 'Business Package',
    price: '$997',
    description: 'Comprehensive solution for growing businesses and personal brands.',
    features: [
      'Everything in Creator Package',
      'Advanced content systems',
      'Social media strategy',
      'Email marketing templates',
      '8 weeks of direct support',
      'Monthly strategy calls'
    ],
    cta: 'Scale Your Story',
    featured: true
  },
  {
    name: 'Enterprise Package',
    price: '$2,497',
    description: 'Full-service storytelling transformation for established businesses and teams.',
    features: [
      'Everything in Business Package',
      'Team training and onboarding',
      'Custom workflow development',
      'Brand guidelines and assets',
      '12 weeks of dedicated support',
      'Quarterly strategy sessions'
    ],
    cta: 'Transform Your Brand'
  }
]

export const metadata = createMetadata({
  title: 'Creation Chronicles - Strategic Storytelling Systems',
  description: 'Transform your brand narrative with systematic storytelling frameworks. Build authority, grow your audience, and accelerate content creation with AI-powered workflows.',
  keywords: ['content strategy', 'brand storytelling', 'content creation', 'narrative framework', 'content marketing'],
  path: '/products/creation-chronicles',
})

export default function CreationChroniclesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-purple-300">
              <BookOpen className="h-5 w-5" />
              Creation Chronicles
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Strategic Storytelling
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                That Converts
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Transform your brand narrative with systematic storytelling frameworks. Build authority,
              grow your audience, and accelerate content creation with AI-powered workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="#packages"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                View Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Free Resources
              </Link>
            </div>
          </header>

          {/* Benefits Section */}
          <section className="grid gap-8 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{benefit.title}</h3>
                <p className="text-white/70 mb-4 leading-relaxed">{benefit.description}</p>
                <div className="text-lg font-bold text-purple-300">{benefit.metric}</div>
              </article>
            ))}
          </section>

          {/* Features Section */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Complete Storytelling System</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Everything you need to create compelling narratives that build your brand and drive business results.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2.5 flex-shrink-0" />
                        <span className="text-white/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Packages Section */}
          <section id="packages" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Choose Your Journey</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Select the package that matches your storytelling goals and business needs.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`rounded-3xl border p-8 backdrop-blur relative ${
                    pkg.featured
                      ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-purple-300 mb-4">{pkg.price}</div>
                    <p className="text-white/70 leading-relaxed">{pkg.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-purple-400" />
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="mailto:hello@frankx.ai?subject=Creation%20Chronicles%20-%20" + pkg.name
                    className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      pkg.featured
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'border border-white/20 bg-white/5 text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Story?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join creators and businesses who've transformed their brand narrative with Creation Chronicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@frankx.ai?subject=Creation%20Chronicles%20Consultation"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                Read Success Stories
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}