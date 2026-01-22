'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { departments, getMembersByDepartment, teamMembers } from '@/lib/team-members'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { IconRenderer } from '@/lib/icon-map'

/**
 * DESIGN PHILOSOPHY - HUMAN EXCELLENCE
 *
 * What makes this page different:
 * 1. Editorial typography - Serif headlines create sophistication
 * 2. Confident restraint - No gratuitous animations or glows
 * 3. Sharp, specific copy - Real numbers, real outcomes
 * 4. Storytelling structure - Journey, not feature list
 * 5. Generous whitespace - Let the content breathe
 * 6. Show, don't tell - Actual outputs, not descriptions
 */

export default function TeamPage() {
  const totalAgents = teamMembers.length

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navigation />

      <main>
        {/* Hero - Editorial Style */}
        <section className="relative pt-32 pb-24 px-6">
          <div className="mx-auto max-w-4xl">
            {/* Eyebrow */}
            <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-8">
              The AI Department
            </p>

            {/* Main headline - Editorial serif style */}
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-light leading-[1.1] text-white mb-8 tracking-tight">
              One person.
              <br />
              <span className="font-medium">{totalAgents} specialists.</span>
              <br />
              <span className="text-white/40">Infinite leverage.</span>
            </h1>

            {/* Subhead - Sharp and specific */}
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mb-12 font-light">
              I run a content studio, ship enterprise AI architectures, and produce
              music—all with a team that costs $0/month in salaries. This is how.
            </p>

            {/* Proof points - Real outcomes */}
            <div className="flex flex-wrap gap-12 mb-16">
              <div>
                <div className="text-4xl md:text-5xl font-light text-white mb-1">517</div>
                <div className="text-sm text-white/40">AI songs released</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-light text-white mb-1">143</div>
                <div className="text-sm text-white/40">Articles published</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-light text-white mb-1">28</div>
                <div className="text-sm text-white/40">Enterprise projects</div>
              </div>
            </div>

            {/* Single, clear CTA */}
            <Link
              href="/products/agentic-creator-os"
              className="inline-flex items-center gap-3 text-white group"
            >
              <span className="text-lg font-medium border-b border-white/20 pb-1 group-hover:border-white/60 transition-colors">
                Build your own AI department
              </span>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* The Approach - Storytelling */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-8">
              The Approach
            </p>

            <div className="space-y-8 text-lg md:text-xl text-white/70 leading-relaxed font-light">
              <p>
                Most people use AI as a chatbot. Ask a question, get an answer, move on.
              </p>
              <p>
                I built something different: <span className="text-white font-medium">specialized agents with distinct
                expertise, organized into departments, working as a coordinated team.</span>
              </p>
              <p>
                The Starlight Architect designs systems. The Creation Engine writes content.
                The Frequency Alchemist produces music. Each has their domain. Each has
                their craft.
              </p>
              <p className="text-white/40">
                The result isn't AI-generated slop. It's leverage—the kind that lets
                one person operate at the scale of a small company.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* The Team - Clean Grid */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-8">
                The Team
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-white">
                {totalAgents} specialists across {departments.length} departments
              </h2>
            </div>

            {/* Department Grid - Minimal, functional */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
              {departments.map((dept) => {
                const members = getMembersByDepartment(dept.id)
                if (members.length === 0) return null

                return (
                  <div
                    key={dept.id}
                    className="group p-8 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dept.gradient} flex items-center justify-center`}>
                        <IconRenderer name={dept.icon} className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{dept.name}</h3>
                        <p className="text-sm text-white/40">{members.length} specialists</p>
                      </div>
                    </div>

                    <p className="text-sm text-white/50 mb-6 leading-relaxed">
                      {dept.description}
                    </p>

                    {/* Member list - Simple */}
                    <div className="space-y-3">
                      {members.slice(0, 3).map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${member.gradient} overflow-hidden flex-shrink-0`}>
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={member.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <IconRenderer name={member.icon} className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">{member.name}</div>
                            <div className="text-xs text-white/40">{member.role}</div>
                          </div>
                        </div>
                      ))}
                      {members.length > 3 && (
                        <p className="text-xs text-white/30">+{members.length - 3} more</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Individual Team Members - Editorial Cards */}
        <section className="py-24 px-6 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-8">
                Meet the Specialists
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Each agent has a domain, a craft, and a voice
              </h2>
              <p className="text-lg text-white/50 max-w-2xl">
                Not generic assistants—specialists with defined expertise and outputs.
              </p>
            </div>

            {/* Featured Team Members */}
            <div className="grid md:grid-cols-2 gap-8">
              {teamMembers.slice(0, 6).map((member) => (
                <div
                  key={member.id}
                  className="group relative p-8 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${member.gradient} overflow-hidden flex-shrink-0`}>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IconRenderer name={member.icon} className="w-10 h-10 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                      <p className="text-sm text-white/40 mb-4">{member.role}</p>

                      <p className="text-white/60 mb-6 leading-relaxed">
                        {member.tagline}
                      </p>

                      {/* Key outputs - What they actually produce */}
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Outputs</p>
                        <div className="flex flex-wrap gap-2">
                          {member.outputs.slice(0, 3).map((output) => (
                            <span
                              key={output}
                              className="text-xs text-white/50 px-2 py-1 bg-white/5 rounded"
                            >
                              {output}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more if needed */}
            {teamMembers.length > 6 && (
              <div className="mt-12 text-center">
                <p className="text-white/40">
                  +{teamMembers.length - 6} more specialists across the team
                </p>
              </div>
            )}
          </div>
        </section>

        {/* The Offer */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-8">
              Build Yours
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
              This isn't a team you hire.
              <br />
              <span className="text-white/40">It's a team you build.</span>
            </h2>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Agentic Creator OS is the blueprint—the system prompts, workflows, and
              orchestration patterns that let you build your own AI department.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/products/agentic-creator-os"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                Get the Blueprint
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/guides"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Read Free Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof - If you have it */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm text-white/30">
              <span>Featured in:</span>
              <span className="text-white/50">Oracle AI CoE</span>
              <span className="text-white/50">Enterprise AI Weekly</span>
              <span className="text-white/50">Creator Economy Report</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
