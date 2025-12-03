import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Target, Users, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Student Hub | FrankX.ai',
  description: 'Resources, workshops, and guidance for students navigating the Age of Intelligence.',
}

export default function StudentHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Student Hub
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed">
              Resources and workshops to help you find your edge in the Age of Intelligence.
            </p>
          </div>
        </section>

        {/* Workshops */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Workshops</h2>
              <p className="text-xl text-slate-400">
                Self-guided experiences to discover your path
              </p>
            </div>

            {/* Ikigai Workshop Card */}
            <Link
              href="/students/ikigai"
              className="block group"
            >
              <div className="border border-slate-800 rounded-3xl p-12 hover:border-slate-700 transition-all bg-gradient-to-br from-slate-900/50 to-slate-950/50">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                    <Target className="w-8 h-8 text-primary-400" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                  Ikigai Workshop
                </h3>

                <p className="text-xl text-slate-400 leading-relaxed mb-6">
                  Find your purpose at the intersection of what you love, what you're good at, what the world needs, and what pays. Build your 30/60/90 plan and portfolio strategy.
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-slate-800 text-sm text-slate-300">
                    Self-paced
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-800 text-sm text-slate-300">
                    2-3 hours
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-800 text-sm text-slate-300">
                    Privacy-first
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Resources */}
        <section className="px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Resources</h2>
              <p className="text-xl text-slate-400">
                Tools and guides to accelerate your journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Blog */}
              <Link href="/blog" className="group">
                <div className="border border-slate-800 rounded-2xl p-10 hover:border-slate-700 transition-all h-full">
                  <BookOpen className="w-10 h-10 text-primary-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    Blog & Guides
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    In-depth articles on AI tools, career strategy, and building in the Age of Intelligence.
                  </p>
                </div>
              </Link>

              {/* Community */}
              <Link href="/community" className="group">
                <div className="border border-slate-800 rounded-2xl p-10 hover:border-slate-700 transition-all h-full">
                  <Users className="w-10 h-10 text-primary-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    Community
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Connect with other students and creators navigating the AI transition together.
                  </p>
                </div>
              </Link>

              {/* Tools */}
              <Link href="/resources" className="group">
                <div className="border border-slate-800 rounded-2xl p-10 hover:border-slate-700 transition-all h-full">
                  <Sparkles className="w-10 h-10 text-primary-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    AI Tools & Resources
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Curated collection of AI tools, prompts, and templates for students.
                  </p>
                </div>
              </Link>

              {/* About Frank */}
              <Link href="/about" className="group">
                <div className="border border-slate-800 rounded-2xl p-10 hover:border-slate-700 transition-all h-full">
                  <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center mb-6">
                    <span className="text-primary-400 font-bold">F</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    About Frank
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Learn about Frank's journey from musician to Oracle AI Architect and creator.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
