import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { DepartmentSection } from '@/components/team/DepartmentSection'
import { departments, getMembersByDepartment, teamMembers } from '@/lib/team-members'
import { getIcon } from '@/lib/icon-map'
import { createMetadata } from '@/lib/seo'
import { ArrowRight, Bot, Sparkles, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = createMetadata({
  title: 'Meet the Team - FrankX AI Collaboration Ecosystem',
  description:
    'Discover the AI dream team powering FrankX: Claude Code, ChatGPT specialists, Suno, Sora, Midjourney, and Gemini working together to create soul-aligned systems and transformational content.',
  keywords: [
    'frankx ai team',
    'claude code agents',
    'chatgpt custom gpts',
    'ai collaboration',
    'creative ai tools',
    'ai music production',
    'ai content creation',
  ],
  path: '/team',
})

export default function TeamPage() {
  const departmentStats = departments.map((dept) => ({
    ...dept,
    members: getMembersByDepartment(dept.id),
  }))

  // Platform statistics
  const platformStats = [
    { name: 'Claude', count: teamMembers.filter((m) => m.platform === 'Claude').length, color: 'blue' },
    { name: 'ChatGPT', count: teamMembers.filter((m) => m.platform === 'ChatGPT').length, color: 'emerald' },
    { name: 'Suno', count: teamMembers.filter((m) => m.platform === 'Suno').length, color: 'purple' },
    { name: 'Sora', count: teamMembers.filter((m) => m.platform === 'Sora').length, color: 'indigo' },
    { name: 'Midjourney', count: teamMembers.filter((m) => m.platform === 'Midjourney').length, color: 'fuchsia' },
    { name: 'Gemini', count: teamMembers.filter((m) => m.platform === 'Gemini').length, color: 'sky' },
  ]

  const totalAgents = teamMembers.length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-indigo-900/40 via-slate-900/60 to-slate-950/80 backdrop-blur-xl">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-transparent blur-3xl rounded-full animate-pulse" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl rounded-full animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-transparent blur-3xl rounded-full animate-pulse delay-500" />
            </div>

            <div className="relative p-10 lg:p-16">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                {/* Badge */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4" />
                    The FrankX AI Ecosystem
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="block text-white mb-3">Meet the Team</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Where AI Dreams Collaborate
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  From Claude Code to ChatGPT specialists, from Suno music wizards to Midjourney artists—this is the AI dream team
                  building soul-aligned systems, transformational content, and conscious technology for the future.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{totalAgents}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">AI Agents</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{departments.length}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Departments</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{platformStats.length}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Platforms</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">∞</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Possibilities</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    href="/start"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-lg shadow-fuchsia-900/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500"
                  >
                    Work with the team
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </Link>
                  <Link
                    href="#departments"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white/90 transition-all hover:bg-white/10 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                  >
                    Explore departments
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Platform Overview */}
          <section className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Powered by Industry-Leading AI</h2>
              <p className="text-white/70 leading-relaxed">
                Our team leverages the best AI platforms available, each bringing unique strengths to create a comprehensive
                ecosystem of intelligence and creativity.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {platformStats.map((platform) => (
                <div
                  key={platform.name}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center hover:bg-white/10 transition-all hover:scale-105"
                >
                  <div className={`text-2xl font-bold text-${platform.color}-400 mb-1`}>{platform.count}</div>
                  <div className="text-sm font-semibold text-white mb-1">{platform.name}</div>
                  <div className="text-xs text-white/50">{platform.count === 1 ? 'agent' : 'agents'}</div>
                </div>
              ))}
            </div>
          </section>

          {/* How We Collaborate */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-xl p-8 lg:p-12">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/10 blur-3xl rounded-full" />

            <div className="relative max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4">How This Team Collaborates</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Each agent brings specialized expertise, and together they form an interconnected ecosystem where insights flow,
                creativity amplifies, and soul-aligned solutions emerge naturally.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 mx-auto">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Strategic Planning</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Claude agents lead architecture and long-term vision, ensuring every decision serves consciousness evolution.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-4 mx-auto">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Specialized Execution</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    ChatGPT specialists handle targeted tasks from sales to SEO, each optimized for specific outcomes.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Creative Synthesis</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Suno, Sora, and Midjourney agents transform concepts into music, video, and visuals that move souls.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Department Navigation */}
          <section id="departments" className="scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Explore by Department</h2>
              <p className="text-white/70 leading-relaxed">
                Each department represents a core function of the FrankX ecosystem, with specialized agents working in harmony.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
              {departments.map((dept) => {
                const Icon = getIcon(dept.icon)
                return (
                  <a
                    key={dept.id}
                    href={`#${dept.id}`}
                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-white text-center mb-1">{dept.name}</div>
                    <div className="text-xs text-white/50 text-center">
                      {getMembersByDepartment(dept.id).length} agents
                    </div>
                  </a>
                )
              })}
            </div>
          </section>

          {/* Department Sections */}
          <div className="space-y-16">
            {departmentStats.map((dept, index) => (
              <DepartmentSection key={dept.id} department={dept} members={dept.members} index={index} />
            ))}
          </div>

          {/* Final CTA */}
          <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-r from-purple-900/40 via-fuchsia-900/30 to-pink-900/40 backdrop-blur-xl p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15),_transparent_70%)]" />

            <div className="relative max-w-3xl mx-auto space-y-6">
              <Sparkles className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white">Ready to Collaborate?</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                This dream team is ready to help you build soul-aligned systems, create transformational content, and amplify your
                creative expression. Let's start your journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                >
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/agent-team"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white/90 transition-all hover:bg-white/10 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                >
                  View agent services
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
