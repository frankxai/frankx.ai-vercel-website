'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Brain,
  Plus,
  Trash2,
  Download,
  Sparkles,
  CheckCircle,
  Code,
  Target,
  TrendingUp,
  MessageSquare,
  Heart,
  Lightbulb,
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

// Domain templates
const domainTemplates = [
  {
    id: 'creative',
    name: 'Creative Practice',
    icon: Code,
    color: 'purple',
    description: 'AI tools for music, writing, video, and visual creation',
    suggestedAgents: [
      'Portfolio Builder AI - Generates project ideas and case studies',
      'Workflow Optimizer - Analyzes and improves your creative process',
      'Creative Coach - Provides feedback and motivation',
    ],
    starterPrompts: [
      'Generate 5 portfolio project ideas for a [YOUR SKILL] creator',
      'Analyze my creative workflow and suggest AI optimizations',
      'Create a before/after case study for my recent project',
    ],
  },
  {
    id: 'career',
    name: 'Career Development',
    icon: Target,
    color: 'blue',
    description: 'Navigate roles, interviews, and professional growth',
    suggestedAgents: [
      'Career Navigator - Explores roles and career paths',
      'Interview Prep AI - Helps prepare for behavioral interviews',
      'Skill Gap Analyzer - Identifies learning priorities',
    ],
    starterPrompts: [
      'Suggest AI-native creator roles that match my skills in [YOUR SKILLS]',
      'Create STAR stories for common [ROLE] interview questions',
      'Analyze this job description and tell me if I should apply',
    ],
  },
  {
    id: 'content',
    name: 'Content Creation',
    icon: Sparkles,
    color: 'emerald',
    description: 'Build audience through consistent, valuable content',
    suggestedAgents: [
      'Content Strategist - Plans content pillars and calendars',
      'Post Optimizer - Improves hooks and engagement',
      'Engagement Analyzer - Learns from your best content',
    ],
    starterPrompts: [
      'Define 3-4 content pillars for my expertise in [YOUR AREA]',
      'Generate 10 hooks for a post about [TOPIC]',
      'Create a 30-day content calendar for LinkedIn',
    ],
  },
  {
    id: 'business',
    name: 'Business & Revenue',
    icon: TrendingUp,
    color: 'amber',
    description: 'Launch offers and generate income while studying',
    suggestedAgents: [
      'Offer Architect - Designs simple, profitable services',
      'Pricing Strategist - Helps price and package offers',
      'Revenue Tracker - Monitors goals and metrics',
    ],
    starterPrompts: [
      'Generate 5 service ideas I can launch with my skills in [YOUR SKILLS]',
      'Help me price my [SERVICE] offer strategically',
      'Reverse engineer a plan to make $[AMOUNT] per month',
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: MessageSquare,
    color: 'rose',
    description: 'Master written and verbal communication',
    suggestedAgents: [
      'Message Refiner - Clarifies any written message',
      'Pitch Coach - Prepares you for presentations',
      'Feedback Synthesizer - Requests and processes feedback',
    ],
    starterPrompts: [
      'Make this message clearer and more concise: [PASTE MESSAGE]',
      'Help me prepare for this difficult conversation: [DESCRIBE]',
      'Write a feedback request for [WHAT YOU WANT FEEDBACK ON]',
    ],
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing & Energy',
    icon: Heart,
    color: 'cyan',
    description: 'Sustain performance through health and habits',
    suggestedAgents: [
      'Habit Tracker - Builds sustainable routines',
      'Energy Optimizer - Designs energy-aligned schedules',
      'Mindset Coach - Supports mental resilience',
    ],
    starterPrompts: [
      'Audit my energy patterns and suggest optimizations',
      'Build a habit stack for [YOUR GOAL]',
      'Assess my burnout risk and suggest adjustments',
    ],
  },
]

type SelectedAgent = {
  id: string
  domainId: string
  name: string
  customInstructions: string
}

export default function CoEBuilderPage() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [customAgents, setCustomAgents] = useState<SelectedAgent[]>([])
  const [showExport, setShowExport] = useState(false)
  // Counter ref for generating unique IDs (avoids impure Date.now during render)
  const agentIdCounter = useRef(0)

  const toggleDomain = (domainId: string) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter((id) => id !== domainId))
      setCustomAgents(customAgents.filter((agent) => agent.domainId !== domainId))
    } else {
      setSelectedDomains([...selectedDomains, domainId])
    }
  }

  const addCustomAgent = (domainId: string) => {
    const domain = domainTemplates.find((d) => d.id === domainId)
    if (!domain) return

    agentIdCounter.current += 1
    const newAgent: SelectedAgent = {
      id: `${domainId}-${agentIdCounter.current}`,
      domainId,
      name: `Custom ${domain.name} Agent`,
      customInstructions: '',
    }
    setCustomAgents([...customAgents, newAgent])
  }

  const removeCustomAgent = (agentId: string) => {
    setCustomAgents(customAgents.filter((agent) => agent.id !== agentId))
  }

  const updateAgent = (agentId: string, updates: Partial<SelectedAgent>) => {
    setCustomAgents(
      customAgents.map((agent) => (agent.id === agentId ? { ...agent, ...updates } : agent))
    )
  }

  const exportCoE = () => {
    const coeData = {
      createdAt: new Date().toISOString(),
      domains: selectedDomains.map((domainId) => {
        const domain = domainTemplates.find((d) => d.id === domainId)!
        const agents = customAgents.filter((a) => a.domainId === domainId)

        return {
          name: domain.name,
          description: domain.description,
          suggestedAgents: domain.suggestedAgents,
          customAgents: agents.map((a) => ({
            name: a.name,
            instructions: a.customInstructions,
          })),
          starterPrompts: domain.starterPrompts,
        }
      }),
    }

    const blob = new Blob([JSON.stringify(coeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `creator-coe-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setShowExport(true)
    setTimeout(() => setShowExport(false), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/students"
            className="inline-flex items-center text-base font-medium text-slate-300 transition-colors hover:text-blue-400"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Student Hub
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-6xl font-bold bg-gradient-to-r from-slate-100 via-purple-200 to-blue-200 bg-clip-text text-transparent sm:text-7xl"
            >
              Build Your Creator CoE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl"
            >
              Design your personal AI Center of Excellence. Select domains, customize agents,
              and create your intelligence system in under an hour.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Domain Selection */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-4xl font-bold text-slate-100">
            Step 1: Select Your Domains
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Choose 3-4 domains to build focused AI support. You can always add more later.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {domainTemplates.map((domain, index) => {
              const isSelected = selectedDomains.includes(domain.id)

              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassmorphicCard
                    variant="luxury"
                    border={isSelected ? 'glow' : 'subtle'}
                    className={`group h-full p-6 cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => toggleDomain(domain.id)}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <domain.icon className={`h-10 w-10 text-${domain.color}-400`} />
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? `bg-${domain.color}-500 border-${domain.color}-500`
                            : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-slate-100">{domain.name}</h3>
                    <p className="text-base text-slate-300 leading-relaxed">{domain.description}</p>
                  </GlassmorphicCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Selected Domains Configuration */}
      <AnimatePresence>
        {selectedDomains.length > 0 && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-12 bg-gradient-to-b from-slate-950 to-slate-900"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-4xl font-bold text-slate-100">
                Step 2: Configure Your Agents
              </h2>
              <p className="mb-8 text-lg text-slate-300">
                Review suggested agents and add custom ones for each domain.
              </p>

              <div className="space-y-8">
                {selectedDomains.map((domainId) => {
                  const domain = domainTemplates.find((d) => d.id === domainId)!
                  const agents = customAgents.filter((a) => a.domainId === domainId)

                  return (
                    <GlassmorphicCard key={domainId} variant="luxury" border="glow" className="p-8">
                      <div className="mb-6 flex items-center gap-4">
                        <domain.icon className={`h-10 w-10 text-${domain.color}-400`} />
                        <h3 className="text-3xl font-bold text-slate-100">{domain.name}</h3>
                      </div>

                      {/* Suggested Agents */}
                      <div className="mb-6">
                        <h4 className="mb-4 text-lg font-semibold text-purple-300">
                          Suggested Agents:
                        </h4>
                        <ul className="space-y-2">
                          {domain.suggestedAgents.map((agent, i) => (
                            <li key={i} className="flex items-start text-base text-slate-200">
                              <Brain className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                              <span>{agent}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Starter Prompts */}
                      <div className="mb-6">
                        <h4 className="mb-4 text-lg font-semibold text-purple-300">
                          Starter Prompts:
                        </h4>
                        <ul className="space-y-2">
                          {domain.starterPrompts.map((prompt, i) => (
                            <li key={i} className="text-sm text-slate-300">
                              <Lightbulb className="mr-2 inline h-4 w-4 text-amber-400" />
                              {prompt}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Custom Agents */}
                      {agents.length > 0 && (
                        <div className="mb-4 space-y-4">
                          <h4 className="text-lg font-semibold text-purple-300">Custom Agents:</h4>
                          {agents.map((agent) => (
                            <div
                              key={agent.id}
                              className="rounded-lg border border-slate-700 bg-slate-900/50 p-4"
                            >
                              <div className="mb-3 flex items-center justify-between">
                                <input
                                  type="text"
                                  value={agent.name}
                                  onChange={(e) =>
                                    updateAgent(agent.id, { name: e.target.value })
                                  }
                                  className="flex-1 bg-transparent text-lg font-semibold text-slate-100 focus:outline-none"
                                  placeholder="Agent Name"
                                />
                                <button
                                  onClick={() => removeCustomAgent(agent.id)}
                                  className="text-slate-400 hover:text-red-400"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                              <textarea
                                value={agent.customInstructions}
                                onChange={(e) =>
                                  updateAgent(agent.id, { customInstructions: e.target.value })
                                }
                                placeholder="What should this agent help with? What context does it need?"
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                rows={4}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Custom Agent Button */}
                      <button
                        onClick={() => addCustomAgent(domainId)}
                        className="group flex items-center gap-2 rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/30 px-4 py-3 text-base font-medium text-slate-300 transition-all hover:border-purple-500 hover:bg-slate-800/50 hover:text-purple-300"
                      >
                        <Plus className="h-5 w-5" />
                        Add Custom Agent
                      </button>
                    </GlassmorphicCard>
                  )
                })}
              </div>

              {/* Export Button */}
              <div className="mt-12 text-center">
                <PremiumButton onClick={exportCoE} size="lg" className="text-lg px-8 py-4">
                  <Download className="mr-2 h-5 w-5" />
                  Export My CoE
                </PremiumButton>

                <AnimatePresence>
                  {showExport && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-base text-emerald-400"
                    >
                      <CheckCircle className="mr-2 inline h-5 w-5" />
                      CoE exported successfully! Save this file to track your AI system.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard variant="luxury" border="subtle" className="p-8">
            <h3 className="mb-6 text-3xl font-bold text-slate-100">How to Use Your CoE</h3>

            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                <strong className="text-slate-100">1. Use Suggested Agents as Starting Points:</strong>{' '}
                Copy suggested agent descriptions into ChatGPT custom instructions, Claude Projects,
                or your favorite AI tool.
              </p>
              <p>
                <strong className="text-slate-100">2. Create Custom GPTs:</strong> For each agent,
                you can create a Custom GPT in ChatGPT with specific instructions, knowledge files,
                and actions.
              </p>
              <p>
                <strong className="text-slate-100">3. Test Starter Prompts:</strong> Use the starter
                prompts to validate each agent works as expected. Refine instructions based on results.
              </p>
              <p>
                <strong className="text-slate-100">4. Iterate Weekly:</strong> Your CoE should evolve
                with your needs. Add new agents, refine prompts, and remove what doesn't work.
              </p>
              <p>
                <strong className="text-slate-100">5. Export and Back Up:</strong> Download your CoE
                configuration regularly. Keep it in cloud storage so you can access it anywhere.
              </p>
            </div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  )
}
