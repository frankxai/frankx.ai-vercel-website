'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Compass,
  Building2,
  Lightbulb,
  Search,
  ExternalLink,
  Sparkles,
  Code,
  Mic,
  PenTool,
  BarChart,
  Video,
  Music,
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

// Creator Role Tracks
const creatorRoles = [
  {
    id: 'ai-content-creator',
    title: 'AI Content Creator',
    icon: PenTool,
    color: 'purple',
    description: 'Create AI-augmented content across text, video, and visual media',
    skills: ['Writing', 'Prompt Engineering', 'Content Strategy', 'SEO', 'Distribution'],
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'Runway', 'Descript'],
    companies: [
      'OpenAI',
      'Anthropic',
      'Jasper.ai',
      'Copy.ai',
      'Notion',
      'Canva',
      'Adobe',
      'HubSpot',
      'Content agencies',
      'Creator studios',
    ],
    wedgeIdeas: [
      'Build a content template library using AI tools and share publicly',
      'Create case studies showing before/after content quality with AI',
      'Demonstrate multi-platform repurposing workflow in 60 seconds',
    ],
    outcomes: 'High demand. Entry via freelance → agency → in-house. $50K-$120K+',
  },
  {
    id: 'ai-music-producer',
    title: 'AI Music Producer',
    icon: Music,
    color: 'rose',
    description: 'Compose, produce, and distribute music using AI generation tools',
    skills: ['Music Theory', 'Suno AI', 'Prompt Engineering', 'Audio Editing', 'Distribution'],
    tools: ['Suno AI', 'Udio', 'Descript', 'Logic Pro', 'Ableton', 'DistroKid'],
    companies: [
      'Suno',
      'Udio',
      'Splice',
      'Spotify (creator tools)',
      'YouTube Music',
      'TikTok Creator Fund',
      'Music libraries',
      'Production studios',
      'Independent labels',
      'Film/game studios',
    ],
    wedgeIdeas: [
      'Create a viral "AI music challenge" showcasing unique genre blends',
      'Build a Suno prompt library for specific moods/use cases',
      'Produce a 10-track AI album with documented creative process',
    ],
    outcomes: 'Growing fast. Multiple revenue streams. $30K-$200K+ (highly variable)',
  },
  {
    id: 'ai-video-creator',
    title: 'AI Video Creator',
    icon: Video,
    color: 'blue',
    description: 'Produce video content with AI tools for editing, generation, and effects',
    skills: ['Video Editing', 'Storyboarding', 'AI Video Tools', 'Motion Graphics', 'YouTube/TikTok'],
    tools: ['Runway', 'Pika', 'Descript', 'CapCut', 'Premiere Pro', 'DaVinci Resolve'],
    companies: [
      'Runway',
      'Pika Labs',
      'Synthesia',
      'HeyGen',
      'YouTube Creator Studios',
      'TikTok',
      'Production companies',
      'Marketing agencies',
      'E-learning platforms',
      'Corporate training',
    ],
    wedgeIdeas: [
      'Create a before/after reel showing AI-enhanced editing workflow',
      'Build templates for common video types (explainers, ads, tutorials)',
      'Document your full video production stack and share lessons learned',
    ],
    outcomes: 'High growth area. Freelance → agency → platform partnerships. $40K-$150K+',
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    icon: Code,
    color: 'emerald',
    description: 'Design, test, and optimize prompts for AI systems across use cases',
    skills: ['Prompt Design', 'Testing & Evaluation', 'AI Model Knowledge', 'Documentation', 'Training'],
    tools: ['ChatGPT', 'Claude', 'GPT-4 API', 'LangChain', 'Prompt testing frameworks'],
    companies: [
      'OpenAI',
      'Anthropic',
      'Scale AI',
      'Cohere',
      'AI startups',
      'Consulting firms',
      'Enterprise companies',
      'Product teams',
      'Research labs',
      'Education tech',
    ],
    wedgeIdeas: [
      'Create a public prompt library with evaluation metrics for each',
      'Write case studies showing prompt optimization impact (quality/cost)',
      'Build a mini course on prompt engineering for a specific domain',
    ],
    outcomes: 'In-demand specialty. $60K-$140K. Combines with other roles.',
  },
  {
    id: 'ai-product-builder',
    title: 'AI Product Builder',
    icon: Sparkles,
    color: 'amber',
    description: 'Build and ship AI-powered products, apps, or services',
    skills: ['Product Design', 'No-code/Low-code', 'API Integration', 'User Research', 'Launch Strategy'],
    tools: ['Replit', 'Cursor', 'GPT API', 'Claude API', 'Supabase', 'Vercel', 'Bubble'],
    companies: [
      'AI startups',
      'SaaS companies',
      'No-code platforms',
      'Innovation labs',
      'Consulting firms',
      'Venture studios',
      'Product agencies',
      'Your own startup',
    ],
    wedgeIdeas: [
      'Build a micro-product solving one specific problem and ship in a week',
      'Create a public roadmap showing your product development process',
      'Document user feedback loops and iteration cycles',
    ],
    outcomes: 'Entrepreneurial path. High upside. $50K-$200K+ (or equity)',
  },
  {
    id: 'ai-educator',
    title: 'AI Educator',
    icon: Mic,
    color: 'cyan',
    description: 'Teach AI skills through courses, workshops, or content',
    skills: ['Teaching', 'Curriculum Design', 'Public Speaking', 'Content Creation', 'Community Building'],
    tools: ['Notion', 'Teachable', 'YouTube', 'LinkedIn', 'Discord', 'Zoom', 'Loom'],
    companies: [
      'Online course platforms',
      'Corporate training',
      'Universities',
      'Bootcamps',
      'Consulting firms',
      'Tech companies',
      'Your own platform',
    ],
    wedgeIdeas: [
      'Create a free mini-course on AI for [specific profession]',
      'Host weekly office hours helping people with AI questions',
      'Build a student success showcase with before/after stories',
    ],
    outcomes: 'Scalable income. $40K-$150K+ (courses/workshops/corporate training)',
  },
  {
    id: 'ai-consultant',
    title: 'AI Strategy Consultant',
    icon: BarChart,
    color: 'indigo',
    description: 'Help businesses adopt AI strategically and measure impact',
    skills: ['Strategy', 'Business Analysis', 'Change Management', 'ROI Modeling', 'Stakeholder Management'],
    tools: ['AI tools landscape', 'ROI calculators', 'Process mapping', 'Presentation software'],
    companies: [
      'McKinsey',
      'BCG',
      'Deloitte',
      'Accenture',
      'Boutique consultancies',
      'Independent consulting',
      'SaaS companies',
      'Fortune 500',
    ],
    wedgeIdeas: [
      'Create a public AI adoption framework for [specific industry]',
      'Write case studies on AI ROI for small businesses',
      'Build an assessment tool to evaluate AI readiness',
    ],
    outcomes: 'High-value work. Often requires experience. $70K-$200K+',
  },
]

// Industry clusters for target companies
const industryInsights = [
  {
    industry: 'Model Labs & Platforms',
    companies: 'OpenAI, Anthropic, Cohere, Hugging Face',
    insight: 'Focus on product thinking, user feedback, and showcasing creative AI use cases.',
  },
  {
    industry: 'Creator Tools',
    companies: 'Canva, Notion, Adobe, Descript, Runway',
    insight: 'Demonstrate how you use their tools professionally. Build templates or tutorials.',
  },
  {
    industry: 'AI Startups',
    companies: 'Perplexity, Replit, ElevenLabs, Synthesia',
    insight: 'Show scrappiness, speed, and user-centric thinking. Ship demos quickly.',
  },
  {
    industry: 'Enterprise AI',
    companies: 'Microsoft, Google, AWS, Databricks, Snowflake',
    insight: 'Emphasize reliability, evaluation, and business impact. Understand scale.',
  },
]

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRoles = creatorRoles.filter(
    (role) =>
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const selected = selectedRole ? creatorRoles.find((r) => r.id === selectedRole) : null

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-base font-medium text-blue-300"
            >
              <Compass className="mr-2 h-5 w-5" />
              Role Navigator
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-6xl font-bold bg-gradient-to-r from-slate-100 via-blue-200 to-purple-200 bg-clip-text text-transparent sm:text-7xl"
            >
              Explore Creator Roles
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl"
            >
              Discover AI-native creator roles, target companies, and "wedge" ideas
              to stand out. Pick 2-3 roles that align with your skills and interests.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles by title, skills, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-base text-slate-100 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard
                  variant="luxury"
                  border={selectedRole === role.id ? 'glow' : 'subtle'}
                  hover
                  className={`group h-full p-6 cursor-pointer transition-all ${
                    selectedRole === role.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <role.icon className={`mb-4 h-12 w-12 text-${role.color}-400`} />
                  <h3 className="mb-3 text-2xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {role.title}
                  </h3>
                  <p className="mb-4 text-base text-slate-300 leading-relaxed">{role.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full bg-${role.color}-500/10 px-3 py-1 text-xs font-medium text-${role.color}-300`}
                      >
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
                        +{role.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {filteredRoles.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-slate-400">No roles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Selected Role Details */}
      {selected && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 bg-gradient-to-b from-slate-950 to-slate-900"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <GlassmorphicCard variant="luxury" border="glow" className="p-8">
              <div className="mb-6 flex items-center gap-4">
                <selected.icon className={`h-12 w-12 text-${selected.color}-400`} />
                <div>
                  <h2 className="text-4xl font-bold text-slate-100">{selected.title}</h2>
                  <p className="text-lg text-slate-400 mt-1">{selected.outcomes}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-purple-300">Key Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-purple-300">Essential Tools:</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`rounded-lg bg-${selected.color}-500/10 px-4 py-2 text-sm font-medium text-${selected.color}-300`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Companies */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-purple-300">Target Companies:</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selected.companies.map((company) => (
                    <div
                      key={company}
                      className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-200"
                    >
                      <Building2 className="h-4 w-4 text-blue-400" />
                      {company}
                    </div>
                  ))}
                </div>
              </div>

              {/* Wedge Ideas */}
              <div>
                <h3 className="mb-3 text-xl font-semibold text-purple-300">
                  "Wedge" Ideas to Stand Out:
                </h3>
                <ul className="space-y-3">
                  {selected.wedgeIdeas.map((idea, i) => (
                    <li key={i} className="flex items-start text-base text-slate-200">
                      <Lightbulb className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-amber-400" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <PremiumButton href="/students/prompts" className="text-base px-6 py-3">
                  Get Role-Specific Prompts
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </PremiumButton>
              </div>
            </GlassmorphicCard>
          </div>
        </motion.section>
      )}

      {/* Industry Insights */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-slate-100 sm:text-5xl">
            Industry Clusters
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {industryInsights.map((item, index) => (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="luxury" border="subtle" className="h-full p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-100">{item.industry}</h3>
                  <p className="mb-4 text-sm text-blue-300">{item.companies}</p>
                  <p className="text-base text-slate-300 leading-relaxed">{item.insight}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-slate-100 sm:text-5xl">
            Ready to Build Your Path?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-slate-300">
            Pick 2-3 roles that excite you, then use the workshop to create your action plan.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PremiumButton href="/students/workshop" size="lg" className="text-lg px-8 py-4">
              Launch Ikigai Workshop
              <Compass className="ml-2 h-5 w-5" />
            </PremiumButton>
            <Link
              href="/students/coe-builder"
              className="inline-flex items-center rounded-xl border-2 border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-purple-500/50 hover:bg-slate-800/50"
            >
              Build Your AI CoE
              <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
