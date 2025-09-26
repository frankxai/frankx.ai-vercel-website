import { ArrowRight, Palette, Sparkles, Zap, Music, Video, Image, FileText, Users, Globe } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'

const capabilities = [
  {
    icon: Palette,
    title: 'Creative Content Generation',
    description: 'Advanced AI-powered content creation across multiple modalities.',
    features: [
      'Multi-modal content generation and editing',
      'Brand-consistent visual and written assets',
      'Automated content variation and optimization',
      'Cross-platform publishing workflows'
    ]
  },
  {
    icon: Music,
    title: 'Creative Workflow Automation',
    description: 'Streamlined creative processes with intelligent automation.',
    features: [
      'Automated content ideation and planning',
      'Smart template generation and customization',
      'Collaborative editing and feedback loops',
      'Performance analytics and optimization'
    ]
  },
  {
    icon: Sparkles,
    title: 'Brand Intelligence System',
    description: 'AI-driven brand consistency and creative intelligence.',
    features: [
      'Brand voice and style learning',
      'Automated compliance and guideline checking',
      'Creative performance prediction',
      'Audience engagement optimization'
    ]
  }
]

const useCases = [
  {
    icon: Video,
    title: 'Content Creators',
    description: 'Scale video, audio, and visual content with AI-powered generation tools.',
    metrics: '10x faster content production'
  },
  {
    icon: Globe,
    title: 'Marketing Teams',
    description: 'Generate campaign assets, copy, and creative variations at enterprise scale.',
    metrics: '5x campaign velocity'
  },
  {
    icon: Users,
    title: 'Creative Agencies',
    description: 'Accelerate client work with intelligent creative automation and iteration.',
    metrics: '3x project throughput'
  }
]

export const metadata = createMetadata({
  title: 'Generative Creator OS - AI-Powered Creative Intelligence Platform',
  description: 'The complete operating system for AI-enhanced creative workflows. Generate, optimize, and scale content across all modalities with intelligent automation.',
  keywords: [
    'generative ai',
    'creative automation',
    'content generation',
    'creative workflow',
    'ai content tools',
    'creative intelligence'
  ],
  path: '/products/generative-creator-os',
})

export default function GenerativeCreatorOSPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-emerald-900/20" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-emerald-500/20 px-4 py-2 text-sm font-semibold text-purple-200 border border-purple-500/30">
                <Sparkles className="h-4 w-4" />
                Creative Intelligence Platform
              </div>
              <h1 className="mb-8 text-5xl font-bold sm:text-6xl lg:text-7xl">
                Generative
                <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent"> Creator OS</span>
              </h1>
              <p className="mx-auto mb-12 max-w-4xl text-xl text-slate-300">
                The complete operating system for AI-enhanced creative workflows.
                <br className="hidden sm:block" />
                Generate, optimize, and scale content across all modalities with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:from-purple-600 hover:to-emerald-700 hover:scale-105"
                >
                  Start Creating <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:bg-slate-700/50"
                >
                  View Demo <Zap className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-16 text-center text-4xl font-bold">Creative Intelligence Capabilities</h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {capabilities.map((capability, index) => {
                const IconComponent = capability.icon
                return (
                  <div key={index} className="rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-8 border border-slate-700/50">
                    <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-purple-500 to-emerald-600 p-3">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-4 text-xl font-semibold">{capability.title}</h3>
                    <p className="mb-6 text-slate-400">{capability.description}</p>
                    <ul className="space-y-2">
                      {capability.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="px-6 py-20 bg-slate-900/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-16 text-center text-4xl font-bold">Built for Creative Professionals</h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {useCases.map((useCase, index) => {
                const IconComponent = useCase.icon
                return (
                  <div key={index} className="rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-8 border border-slate-700/50 text-center">
                    <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-emerald-500 to-purple-600 p-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-4 text-xl font-semibold">{useCase.title}</h3>
                    <p className="mb-4 text-slate-400">{useCase.description}</p>
                    <div className="text-lg font-semibold text-emerald-400">{useCase.metrics}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-4xl font-bold">Ready to Transform Your Creative Process?</h2>
            <p className="mb-12 text-xl text-slate-400">
              Join leading creators and brands using Generative Creator OS to scale their creative output and unlock new possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:from-purple-600 hover:to-emerald-700 hover:scale-105"
              >
                Get Started Today <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:bg-slate-700/50"
              >
                Explore Resources <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}