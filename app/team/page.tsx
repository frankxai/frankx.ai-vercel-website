'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { teamMembers } from '@/lib/team-members'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * DESIGN PHILOSOPHY - AWARD-WINNING EXCELLENCE
 *
 * Inspired by:
 * - CrewAI: "Teams of AI agents working together like a crew"
 * - Lindy: "Meet your first AI employee"
 * - Exaggerated Minimalism: Oversized typography, massive whitespace
 * - Swiss Modernism: Grid system, mathematical ratios
 *
 * Key Changes:
 * - Focus on the TEAM, not "one person"
 * - Chibi characters as the heroes
 * - Editorial typography with oversized headlines
 * - Card-based grid layout (like trading cards)
 * - Single accent color, mostly black/white
 */

// Group members by function for storytelling
const crews = [
  {
    name: 'The Architects',
    description: 'They design and build systems.',
    members: teamMembers.filter(m => m.department === 'architecture'),
  },
  {
    name: 'The Makers',
    description: 'They craft what you see.',
    members: teamMembers.filter(m => m.department === 'design'),
  },
  {
    name: 'The Storytellers',
    description: 'They write what you read.',
    members: teamMembers.filter(m => m.department === 'content'),
  },
  {
    name: 'The Strategists',
    description: 'They see ahead.',
    members: teamMembers.filter(m => m.department === 'strategy'),
  },
  {
    name: 'The Creatives',
    description: 'They make what you hear.',
    members: teamMembers.filter(m => m.department === 'creative'),
  },
  {
    name: 'The Growth Engine',
    description: 'They get it found.',
    members: teamMembers.filter(m => m.department === 'marketing'),
  },
].filter(crew => crew.members.length > 0)

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0B]">
      <Navigation />

      <main>
        {/* Hero - Oversized Editorial */}
        <section className="pt-32 pb-20 px-6 border-b border-black/5">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              <div>
                <p className="text-sm font-mono tracking-wider text-black/40 uppercase mb-6">
                  The AI Workforce
                </p>

                <h1 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-tight text-black mb-8">
                  Meet
                  <br />
                  the Crew
                </h1>

                <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-lg">
                  {teamMembers.length} specialized AI agents. Each with a role.
                  Each with a craft. Working together to ship real work, every day.
                </p>
              </div>

              {/* Featured Character Showcase */}
              <div className="relative">
                <div className="grid grid-cols-3 gap-4">
                  {teamMembers.slice(0, 6).map((member, i) => (
                    <div
                      key={member.id}
                      className={`relative aspect-square bg-gradient-to-br ${member.gradient} rounded-2xl overflow-hidden ${
                        i === 1 ? 'scale-110 z-10' : ''
                      } hover:scale-105 transition-transform duration-300`}
                    >
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar - Social Proof */}
        <section className="py-8 px-6 bg-black text-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold">517</span>
                <span className="text-white/60">songs produced</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold">143</span>
                <span className="text-white/60">articles shipped</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold">28</span>
                <span className="text-white/60">enterprise projects</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold">$0</span>
                <span className="text-white/60">monthly payroll</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Crew - Card Grid */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-4">
                Every agent has a specialty.
              </h2>
              <p className="text-xl text-black/50 max-w-2xl">
                Not generic chatbots. Specialists with defined expertise,
                distinct personalities, and real output.
              </p>
            </div>

            {/* Character Cards - Full Width Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Character Image */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${member.gradient}`}>
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {/* Role Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {member.name}
                    </h3>
                    <p className="text-black/60 mb-4 leading-relaxed">
                      {member.tagline}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-black/5 text-black/70 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Outputs */}
                    <div className="pt-4 border-t border-black/5">
                      <p className="text-xs text-black/40 uppercase tracking-wider mb-2">Ships</p>
                      <p className="text-sm text-black/60">
                        {member.outputs.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Crew Groups - Minimal */}
        <section className="py-24 px-6 bg-black text-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                How they work together.
              </h2>
              <p className="text-xl text-white/50 max-w-2xl">
                Each crew handles a domain. Together, they operate like a full studio.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {crews.map((crew) => (
                <div
                  key={crew.name}
                  className="bg-black p-8 hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-2xl font-bold mb-2">{crew.name}</h3>
                  <p className="text-white/50 mb-6">{crew.description}</p>

                  <div className="flex -space-x-3">
                    {crew.members.map((member) => (
                      <div
                        key={member.id}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.gradient} border-2 border-black overflow-hidden`}
                      >
                        {member.image && (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover object-top"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-sm font-mono tracking-wider text-black/40 uppercase mb-6">
                The Philosophy
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                AI that works for you,
                <br />
                <span className="text-black/30">not the other way around.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-black mb-4">01</div>
                <h3 className="text-xl font-bold text-black mb-2">Specialists, not generalists</h3>
                <p className="text-black/50">Each agent has deep expertise in one domain. They do one thing exceptionally well.</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-4">02</div>
                <h3 className="text-xl font-bold text-black mb-2">Output-focused</h3>
                <p className="text-black/50">Not conversations—deliverables. Code, content, designs, music. Real artifacts you can use.</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-4">03</div>
                <h3 className="text-xl font-bold text-black mb-2">Orchestrated, not isolated</h3>
                <p className="text-black/50">They work as a team. Architects inform makers. Strategists guide storytellers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-black text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Build your own crew.
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
              Agentic Creator OS is the system behind this team—the prompts,
              workflows, and orchestration patterns. Everything you need to
              build your own AI workforce.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products/agentic-creator-os"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors"
              >
                Get the System
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                Read Free Guides
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Colophon */}
        <section className="py-12 px-6 border-t border-black/5">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-black/40">
              <p>Powered by Claude, GPT-4, Suno, and custom orchestration</p>
              <div className="flex items-center gap-8">
                <span>Oracle AI CoE</span>
                <span>Enterprise AI Weekly</span>
                <span>Creator Economy Report</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
