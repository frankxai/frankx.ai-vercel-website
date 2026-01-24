import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Heart, Share, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soul Frequency Framework | FrankX.AI',
  description: 'Map the creative signature AI should amplify across your brand, family, and leadership. A conscious approach to AI that honors human values and creativity.',
  openGraph: {
    title: 'Soul Frequency Framework',
    description: 'Map the creative signature AI should amplify across your brand, family, and leadership.',
    type: 'article',
    publishedTime: '2024-08-20T00:00:00.000Z',
  },
}

const frameworkElements = [
  {
    title: 'Core Values Identification',
    description: 'Discover the fundamental values that drive your creative and business decisions.',
    steps: [
      'Values archaeology: Uncover authentic drivers',
      'Priority mapping: Rank values by importance',
      'Conflict resolution: Address competing values',
      'Integration planning: Embed values in AI workflows'
    ]
  },
  {
    title: 'Creative Signature Mapping',
    description: 'Define the unique creative elements that make your work distinctly yours.',
    steps: [
      'Style analysis: Identify recurring patterns',
      'Voice development: Articulate your unique perspective',
      'Aesthetic preferences: Map visual and auditory choices',
      'Narrative threads: Recognize consistent themes'
    ]
  },
  {
    title: 'AI Amplification Strategy',
    description: 'Design AI systems that enhance rather than replace your creative essence.',
    steps: [
      'Augmentation goals: Define AI enhancement objectives',
      'Boundary setting: Establish AI usage guidelines',
      'Quality metrics: Create evaluation criteria',
      'Feedback loops: Build continuous improvement systems'
    ]
  }
]

const applications = [
  {
    context: 'Personal Branding',
    example: 'A consultant uses the framework to ensure AI-generated content maintains their authentic voice while scaling their thought leadership.',
    results: '300% increase in content output while maintaining 95% brand consistency scores'
  },
  {
    context: 'Family Guidance',
    example: 'Parents apply the framework to teach children how to use AI tools in alignment with family values and educational goals.',
    results: 'Children develop healthy AI relationships with clear boundaries and creative confidence'
  },
  {
    context: 'Enterprise Leadership',
    example: 'An executive team implements the framework to ensure AI initiatives reflect company culture and strategic priorities.',
    results: '85% employee satisfaction with AI implementations and faster adoption rates'
  }
]

export default function SoulFrequencyFramework() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Soul Frequency Framework</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-purple-300">
                <Sparkles className="h-4 w-4" />
                Framework Article
              </div>
              <h1 className="text-4xl font-bold text-white md:text-5xl leading-tight">
                Soul Frequency Framework
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Map the creative signature AI should amplify across your brand, family, and leadership.
                A conscious approach to AI that honors human values and creativity.
              </p>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-b border-white/10">
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>August 20, 2024</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Introduction */}
          <section className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-6">
              <p className="text-white/80 leading-relaxed">
                In the rush to adopt AI tools, many creators and leaders lose sight of what makes their work
                authentically theirs. The Soul Frequency Framework offers a different approach—one that ensures
                AI amplifies your unique creative signature rather than diluting it.
              </p>
              <p className="text-white/80 leading-relaxed">
                This framework has emerged from working with hundreds of creators, entrepreneurs, and executives
                who want to harness AI's power while maintaining their creative integrity and personal values.
              </p>
            </div>
          </section>

          {/* The Problem */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/5 via-slate-900 to-slate-950 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">The Creative Dilution Problem</h2>
            <p className="text-white/70 mb-6">
              Most AI implementations focus on efficiency and output volume, often at the expense of creative
              authenticity. This leads to homogenized content that lacks the unique voice and perspective
              that audiences connect with.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">73%</div>
                <div className="text-sm text-white/60">of creators report feeling disconnected from AI-assisted content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">58%</div>
                <div className="text-sm text-white/60">struggle with maintaining brand consistency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">41%</div>
                <div className="text-sm text-white/60">have reduced AI usage due to authenticity concerns</div>
              </div>
            </div>
          </section>

          {/* Framework Components */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">The Framework Components</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Three core elements that help you map and preserve your creative signature
                while scaling with AI assistance.
              </p>
            </div>

            <div className="space-y-8">
              {frameworkElements.map((element, index) => (
                <article key={element.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-300 font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{element.title}</h3>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">{element.description}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {element.steps.map((step) => (
                      <div key={step} className="flex items-start gap-3">
                        <Heart className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Real-World Applications */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">Real-World Applications</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                See how the Soul Frequency Framework has been applied across different contexts
                to maintain authenticity while scaling with AI.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {applications.map((application) => (
                <article key={application.context} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white mb-4">{application.context}</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{application.example}</p>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-emerald-200 text-sm">{application.results}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Implementation Guide */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Getting Started with Soul Frequency
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Complete the Soul Frequency Assessment</h3>
                  <p className="text-white/70 text-sm">Take our comprehensive assessment to map your creative signature and identify core values.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Design Your AI Guidelines</h3>
                  <p className="text-white/70 text-sm">Create specific prompts and boundaries that ensure AI outputs align with your creative signature.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Implement and Iterate</h3>
                  <p className="text-white/70 text-sm">Test your framework with small projects and refine based on feedback and results.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-slate-900 to-slate-950 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Map Your Soul Frequency?</h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Take the assessment and get your personalized creative signature report with AI implementation guidelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-assessment"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold transition-all duration-300"
              >
                Take AI Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white/90 font-semibold transition-all duration-300 hover:bg-white/10"
              >
                View Framework Resources
              </Link>
            </div>
          </section>

          {/* Navigation */}
          <nav className="flex items-center justify-between py-8 border-t border-white/10">
            <Link
              href="/blog/intelligence-revolution-2025"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Article
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              Back to Blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </main>
</div>
  )
}