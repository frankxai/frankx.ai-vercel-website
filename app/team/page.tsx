'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { departments, getMembersByDepartment, teamMembers } from '@/lib/team-members'
import { ArrowRight, Users, Zap, Target, Rocket, Play, Music, Lightbulb, Building2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { IconRenderer } from '@/lib/icon-map'
import { motion, AnimatePresence } from 'framer-motion'

// Paradigm data
const paradigms = [
  {
    id: 'creator',
    name: 'Creator Studio',
    icon: Play,
    description: 'YouTubers, podcasters, bloggers, educators',
    gradient: 'from-fuchsia-500 to-pink-500',
    bgGradient: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
    workflow: ['Ideation', 'Production', 'Distribution', 'Growth'],
    roles: [
      { name: 'Trend Scout', task: 'Finds what\'s working NOW' },
      { name: 'Hook Writer', task: 'Crafts scroll-stopping intros' },
      { name: 'Scriptwriter', task: 'Turns ideas into scripts' },
      { name: 'Visual Director', task: 'Creates thumbnails & graphics' },
      { name: 'SEO Strategist', task: 'Gets content found' },
      { name: 'Repurpose Engine', task: 'One piece → 10 formats' },
    ],
    output: '10x content with consistent quality'
  },
  {
    id: 'inventor',
    name: 'Innovation Lab',
    icon: Lightbulb,
    description: 'Founders, inventors, product builders',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    workflow: ['Discover', 'Validate', 'Build', 'Launch'],
    roles: [
      { name: 'Patent Scout', task: 'Finds white space & prior art' },
      { name: 'Market Analyst', task: 'Validates demand' },
      { name: 'Prototype Architect', task: 'Designs MVPs fast' },
      { name: 'Technical Writer', task: 'Documents everything' },
      { name: 'Pitch Crafter', task: 'Creates decks that close' },
      { name: 'Grant Writer', task: 'Secures funding' },
    ],
    output: 'Ideas → Validated products faster'
  },
  {
    id: 'musician',
    name: 'Recording Studio',
    icon: Music,
    description: 'Musicians, producers, audio creators',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    workflow: ['Compose', 'Produce', 'Mix', 'Release'],
    roles: [
      { name: 'Lyric Partner', task: 'Co-writes with you' },
      { name: 'Melody Generator', task: 'Sparks musical ideas' },
      { name: 'Arranger', task: 'Structures the track' },
      { name: 'Sound Designer', task: 'Creates unique textures' },
      { name: 'Mix Consultant', task: 'Ear for the final sound' },
      { name: 'Distribution Strategist', task: 'Gets tracks heard' },
    ],
    output: 'More releases, consistent quality'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Command',
    icon: Building2,
    description: 'Consultants, architects, agency owners',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    workflow: ['Strategy', 'Design', 'Deliver', 'Scale'],
    roles: [
      { name: 'Chief Architect', task: 'Designs systems that scale' },
      { name: 'Solutions Designer', task: 'Maps problems → solutions' },
      { name: 'Lead Engineer', task: 'Builds production systems' },
      { name: 'QA Specialist', task: 'Ensures quality' },
      { name: 'Proposal Writer', task: 'Wins contracts' },
      { name: 'Client Success', task: 'Keeps clients happy' },
    ],
    output: 'Enterprise results, solo operator'
  },
]

export default function TeamPage() {
  const [selectedParadigm, setSelectedParadigm] = useState<string | null>(null)
  const totalAgents = teamMembers.length
  const totalDepartments = departments.length

  const activeParadigm = paradigms.find(p => p.id === selectedParadigm)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section - The Promise */}
          <section className="relative text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70">
                  <Users className="w-3.5 h-3.5" />
                  AI Department Blueprint
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">Most creators work solo.</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  I built a team.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-4">
                9 AI specialists. Zero payroll. Ships content, code, and music daily.
              </p>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                This is the blueprint. <span className="text-white">And you can build one too.</span>
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{totalAgents}</div>
                  <div className="text-sm text-white/50">AI Specialists</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{totalDepartments}</div>
                  <div className="text-sm text-white/50">Departments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-white/50">Songs Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">100+</div>
                  <div className="text-sm text-white/50">Articles Published</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Paradigm Selector */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What type of creator are you?</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Same AI capabilities. Organized YOUR way. Select your paradigm.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paradigms.map((paradigm, index) => {
                const Icon = paradigm.icon
                const isSelected = selectedParadigm === paradigm.id
                return (
                  <motion.button
                    key={paradigm.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedParadigm(isSelected ? null : paradigm.id)}
                    className={`group relative text-left rounded-2xl border p-6 transition-all cursor-pointer ${
                      isSelected
                        ? `border-white/30 bg-gradient-to-br ${paradigm.bgGradient}`
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${paradigm.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{paradigm.name}</h3>
                    <p className="text-sm text-white/50">{paradigm.description}</p>
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <Sparkles className="w-5 h-5 text-white/60" />
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Paradigm Detail */}
            <AnimatePresence mode="wait">
              {activeParadigm && (
                <motion.div
                  key={activeParadigm.id}
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Workflow */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Your Workflow</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          {activeParadigm.workflow.map((stage, i) => (
                            <div key={stage} className="flex items-center">
                              <span className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${activeParadigm.gradient} text-sm font-medium text-white`}>
                                {stage}
                              </span>
                              {i < activeParadigm.workflow.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-white/30 mx-1" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${activeParadigm.gradient} bg-opacity-20 border border-white/10`}>
                          <Zap className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium text-white">{activeParadigm.output}</span>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Your AI Team</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {activeParadigm.roles.map((role) => (
                            <div key={role.name} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeParadigm.gradient} mt-2 flex-shrink-0`} />
                              <div>
                                <div className="text-sm font-medium text-white">{role.name}</div>
                                <div className="text-xs text-white/50">{role.task}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* The Proof: My Team */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">The Live Example: My Team</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                This is exactly what I use to run FrankX. Real agents. Real output. Real results.
              </p>
            </div>

            {/* Department Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

            {/* Team Members by Department */}
            {departments.map((dept) => {
              const members = getMembersByDepartment(dept.id)
              if (members.length === 0) return null

              return (
                <section key={dept.id} id={dept.id} className="scroll-mt-24 mb-16">
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
          </section>

          {/* How It Works */}
          <section className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60 backdrop-blur-xl p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">How to Build Yours</h2>
                <p className="text-white/60">
                  It's not magic. It's a system anyone can follow.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Choose Paradigm</h3>
                  <p className="text-sm text-white/60">
                    Creator, Inventor, Musician, or Enterprise? Pick your workflow.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Define Roles</h3>
                  <p className="text-sm text-white/60">
                    One agent per workflow stage. Clear responsibilities.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Create Prompts</h3>
                  <p className="text-sm text-white/60">
                    System prompts that give each agent expertise and personality.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Orchestrate</h3>
                  <p className="text-sm text-white/60">
                    You conduct. AI plays the instruments. Ship daily.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to build your AI department?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Stop working alone. Start scaling yourself. The blueprint is here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products/agentic-creator-os"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Get Agentic Creator OS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Read the Guides
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Work with Me
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
