import { ArrowLeft, ArrowRight, BookOpen, Brain, CheckCircle2, Clock, Share, Users } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Intelligence Revolution Playbook 2025 | FrankX.AI',
  description: 'A systems-first guide to orchestrating conscious AI across products, teams, and experiences. Transform your organization for the intelligence age.',
  openGraph: {
    title: 'The Intelligence Revolution Playbook 2025',
    description: 'A systems-first guide to orchestrating conscious AI across products, teams, and experiences.',
    type: 'article',
    publishedTime: '2025-09-16T00:00:00.000Z',
  },
}

const keyTakeaways = [
  'AI transformation requires systems thinking, not just tool adoption',
  'Conscious AI principles ensure technology serves human values',
  'Strategic implementation creates competitive advantages that scale',
  'Leadership alignment is critical for successful AI initiatives',
  'Measurement frameworks drive continuous improvement and ROI'
]

const sections = [
  {
    title: 'The Current State of AI Adoption',
    content: 'Most organizations are approaching AI adoption tactically rather than strategically. While individual teams experiment with ChatGPT and AI tools, leadership lacks a coherent vision for how these technologies will transform their business model, operations, and competitive positioning.',
    insights: [
      'Only 23% of enterprises have a comprehensive AI strategy',
      '67% of AI initiatives fail to reach production',
      'Strategic AI implementations deliver 5x higher ROI than tactical approaches'
    ]
  },
  {
    title: 'The Conscious AI Framework',
    content: 'Conscious AI represents a paradigm shift from "AI for efficiency" to "AI for human flourishing." This approach ensures that intelligent systems amplify human creativity, decision-making, and values rather than replacing or undermining them.',
    insights: [
      'Human-centered design principles guide all AI implementations',
      'Transparency and explainability are built into every system',
      'Continuous feedback loops ensure AI serves intended outcomes'
    ]
  },
  {
    title: 'Strategic Implementation Roadmap',
    content: 'Success in the intelligence age requires a systematic approach to AI integration. This begins with leadership education, continues through pilot programs, and scales to organization-wide transformation.',
    insights: [
      'Start with high-impact, low-risk use cases',
      'Build internal AI literacy before external implementations',
      'Create feedback mechanisms for continuous optimization'
    ]
  }
]

export default function IntelligenceRevolutionPlaybook() {
  return (
    <div className="min-h-screen bg-void text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ArrowRight className="w-4 h-4" />
            <span>The Intelligence Revolution Playbook</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-cyan-300">
                <Brain className="h-4 w-4" />
                Strategic Article
              </div>
              <h1 className="text-4xl font-bold text-white md:text-5xl leading-tight">
                The Intelligence Revolution Playbook 2025
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                A systems-first guide to orchestrating conscious AI across products, teams, and experiences.
                Transform your organization for the intelligence age.
              </p>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-b border-white/10">
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>15 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>September 16, 2025</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Key Takeaways */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {keyTakeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">The Intelligence Age is Here</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  We are witnessing the most significant technological transformation since the internet.
                  Artificial Intelligence is not just another tool to add to your stack—it's a fundamental
                  shift in how work gets done, decisions get made, and value gets created.
                </p>
                <p className="text-white/80 leading-relaxed mb-6">
                  The organizations that will thrive in the next decade are those that approach AI strategically,
                  with clear frameworks, conscious implementation, and systematic measurement. This isn't about
                  replacing humans with machines—it's about creating intelligent systems that amplify human
                  capability and creativity.
                </p>
              </section>

              {sections.map((section, index) => (
                <section key={section.title} className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                  <p className="text-white/80 leading-relaxed">{section.content}</p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Key Insights:</h3>
                    <ul className="space-y-2">
                      {section.insights.map((insight) => (
                        <li key={insight} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                          <span className="text-white/70">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">The Path Forward</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  The intelligence revolution is not a future event—it's happening now. Organizations that
                  develop systematic approaches to AI implementation will create sustainable competitive
                  advantages. Those that approach it tactically will find themselves constantly playing catch-up.
                </p>
                <p className="text-white/80 leading-relaxed mb-6">
                  The playbook for success combines strategic vision with practical implementation, conscious
                  principles with measurable outcomes. It requires leadership commitment, team alignment, and
                  continuous learning.
                </p>
                <p className="text-white/80 leading-relaxed">
                  The question isn't whether AI will transform your industry—it's whether you'll lead that
                  transformation or be disrupted by it.
                </p>
              </section>
            </div>
          </article>

          {/* CTA Section */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-slate-900 to-slate-950 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Implement Your AI Strategy?</h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Transform your organization with proven frameworks and systematic implementation approaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agentic-ai-center"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all duration-300"
              >
                Explore Agentic AI Center
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/founder-playbook"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white/90 font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Download Founder's Playbook
              </Link>
            </div>
          </section>

          {/* Navigation */}
          <nav className="flex items-center justify-between py-8 border-t border-white/10">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <Link
              href="/blog/soul-frequency-framework"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              Next Article
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </main>
</div>
  )
}