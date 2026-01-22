import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { departments, getMembersByDepartment, teamMembers } from '@/lib/team-members'
import { createMetadata } from '@/lib/seo'
import { ArrowRight, Users, Zap, Target, Rocket } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { IconRenderer } from '@/lib/icon-map'

export const metadata = createMetadata({
  title: 'The Team - AI Department Behind FrankX',
  description:
    'Meet the AI team that ships: AI architects, web designers, content creators, marketing specialists, and more. The best AI department a modern founder could build.',
  keywords: [
    'ai team',
    'ai department',
    'ai architecture',
    'content creation ai',
    'ai marketing',
    'ai music production',
  ],
  path: '/team',
})

export default function TeamPage() {
  const totalAgents = teamMembers.length
  const totalDepartments = departments.length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <section className="relative text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70">
                <Users className="w-3.5 h-3.5" />
                The AI Department
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Not a solo founder.</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                A founder with a team.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
              Every page, article, and system on this site was built with AI.
              Here's the team that ships.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{totalAgents}</div>
                <div className="text-sm text-white/50">AI Specialists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{totalDepartments}</div>
                <div className="text-sm text-white/50">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-white/50">Songs Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-white/50">Articles Published</div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-white/90 transition-colors"
            >
              Work with the team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Department Grid */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Departments</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Organized by function, not by AI platform. Each department handles a core part of building and growing FrankX.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => {
                const members = getMembersByDepartment(dept.id)
                return (
                  <a
                    key={dept.id}
                    href={`#${dept.id}`}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center`}>
                        <IconRenderer name={dept.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-white/90">
                          {dept.name}
                        </h3>
                        <p className="text-sm text-white/50">{members.length} specialists</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {dept.description}
                    </p>
                    {dept.stats && (
                      <div className="text-xs font-medium text-white/40 uppercase tracking-wider">
                        {dept.stats}
                      </div>
                    )}
                  </a>
                )
              })}
            </div>
          </section>

          {/* Team Members by Department */}
          {departments.map((dept) => {
            const members = getMembersByDepartment(dept.id)
            if (members.length === 0) return null

            return (
              <section key={dept.id} id={dept.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center`}>
                    <IconRenderer name={dept.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{dept.name}</h2>
                    <p className="text-sm text-white/50">{dept.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all"
                    >
                      {/* Gradient glow */}
                      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${member.gradient} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`} />

                      <div className="relative p-6">
                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${member.gradient} p-0.5 overflow-hidden`}>
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={member.name}
                                width={64}
                                height={64}
                                className="w-full h-full rounded-xl object-cover object-top"
                              />
                            ) : (
                              <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center">
                                <IconRenderer name={member.icon} className="w-8 h-8 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                            <p className="text-sm text-white/50">{member.role}</p>
                          </div>
                        </div>

                        {/* Tagline */}
                        <p className="text-sm text-white/70 mb-4 italic">
                          "{member.tagline}"
                        </p>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                            Skills
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {member.skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Outputs */}
                        <div>
                          <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                            Outputs
                          </div>
                          <div className="text-sm text-white/50">
                            {member.outputs.slice(0, 3).join(' • ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

          {/* How It Works */}
          <section className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-xl p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">How This Works</h2>
                <p className="text-white/60">
                  It's not magic. It's a well-organized AI department.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Clear Roles</h3>
                  <p className="text-sm text-white/60">
                    Each AI agent has a specific function. No confusion about who does what.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Real Skills</h3>
                  <p className="text-sm text-white/60">
                    Custom prompts, trained workflows, and specialized knowledge for each domain.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ships Daily</h3>
                  <p className="text-sm text-white/60">
                    This team produces real output every day. Articles, code, music, designs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want a team like this?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              I'm building tools and guides to help other founders set up their own AI departments.
              Get notified when they're ready.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products/agentic-creator-os"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Explore Agentic Creator OS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
