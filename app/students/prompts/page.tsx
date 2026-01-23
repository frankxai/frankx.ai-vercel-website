'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Copy,
  Check,
  Code,
  Target,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Heart,
  Search,
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

// Comprehensive prompt library organized by CoE domain
const promptLibrary = [
  {
    domain: 'Creative Practice',
    icon: Code,
    color: 'purple',
    prompts: [
      {
        title: 'Portfolio Project Ideation',
        prompt: 'I want to build a portfolio project that demonstrates [YOUR SKILL]. My target role is [ROLE] in [INDUSTRY]. Generate 5 project ideas that:\n1. Can be built in 1-2 weeks\n2. Solve a real problem\n3. Can be easily demonstrated\n4. Stand out from typical student projects\n\nFor each idea, include: problem solved, core features (3-5), and how to make it demo-ready.',
        useCase: 'Generate unique portfolio project ideas',
      },
      {
        title: 'Creative Workflow Analyzer',
        prompt: 'Analyze my creative workflow: [DESCRIBE YOUR CURRENT PROCESS]. Identify:\n1. Bottlenecks and time sinks\n2. Tasks AI can augment or automate\n3. Where human creativity is essential\n4. Tools or techniques to try\n\nProvide a redesigned workflow optimized for AI-human collaboration.',
        useCase: 'Optimize your creative process with AI',
      },
      {
        title: 'Skill Gap Analysis',
        prompt: 'Compare my current skills [LIST YOUR SKILLS] with this job description: [PASTE JOB DESCRIPTION].\n\nIdentify:\n1. Skills I have that match\n2. Skills I\'m missing\n3. Skills I can learn quickly (1-2 months)\n4. Skills that need long-term development\n\nSuggest a learning plan prioritized by impact.',
        useCase: 'Identify and prioritize skill gaps',
      },
      {
        title: 'Before/After Case Study',
        prompt: 'Turn my project into a compelling case study. Project details: [DESCRIBE PROJECT].\n\nCreate a case study structure with:\n1. Problem statement (the "before")\n2. Solution approach\n3. Implementation details\n4. Results (the "after" with metrics)\n5. Lessons learned\n6. Next steps\n\nMake it concise, data-driven, and portfolio-ready.',
        useCase: 'Document projects as case studies',
      },
      {
        title: 'Demo Script Creator',
        prompt: 'I need a 60-second demo script for: [PROJECT NAME]. Key features: [LIST 3-5 FEATURES]. Target audience: [WHO WATCHES THIS].\n\nCreate a demo script that:\n1. Hooks in first 5 seconds\n2. Shows the problem clearly\n3. Demonstrates core value in 30 seconds\n4. Ends with impact/results\n\nInclude suggested visuals for each section.',
        useCase: 'Script compelling project demos',
      },
    ],
  },
  {
    domain: 'Career Development',
    icon: Target,
    color: 'blue',
    prompts: [
      {
        title: 'Role Explorer',
        prompt: 'I\'m interested in [FIELD/INDUSTRY] and have skills in [YOUR SKILLS]. Suggest 5 specific roles (not generic titles) that:\n1. Leverage my existing strengths\n2. Are growing in the AI era\n3. Value creativity + technical ability\n4. Offer clear career progression\n\nFor each role: typical companies, salary range, key skills needed, and why it fits.',
        useCase: 'Discover specific career paths',
      },
      {
        title: 'Wedge Idea Generator',
        prompt: 'I want to work at [COMPANY NAME]. My background: [YOUR SKILLS/EXPERIENCE]. Their recent focus: [RESEARCH THEIR NEWS/PRODUCTS].\n\nGenerate 3 "wedge" ideas - specific ways I could add value early:\n1. A micro-project I can build and share\n2. An analysis or insight relevant to their work\n3. A problem they likely face that I can address\n\nMake each actionable within 1 week.',
        useCase: 'Stand out to target companies',
      },
      {
        title: 'LinkedIn Headline Optimizer',
        prompt: 'Optimize my LinkedIn headline. Current: [YOUR CURRENT HEADLINE]. Target roles: [LIST 2-3 ROLES]. Recent projects: [BRIEF DESCRIPTIONS].\n\nCreate 5 headline variations that:\n1. Signal my target role clearly\n2. Include keywords recruiters search\n3. Show specific value/outcomes\n4. Fit in 120 characters\n\nExplain which to use when.',
        useCase: 'Craft compelling professional headlines',
      },
      {
        title: 'Interview Story Prep',
        prompt: 'Help me prepare STAR stories for behavioral interviews. Target role: [ROLE]. Common questions for this role: [LIST OR ASK AI TO SUGGEST].\n\nFor each question, help me structure:\nSituation: [I\'ll describe]\nTask: [What needed doing]\nAction: [What I did, with specifics]\nResult: [Outcome with metrics]\n\nCoach me to make stories concise (90 seconds max) and memorable.',
        useCase: 'Prepare interview stories',
      },
      {
        title: 'Networking Message Writer',
        prompt: 'Write a LinkedIn/email outreach message to [NAME, TITLE, COMPANY]. Context: [HOW YOU FOUND THEM, WHAT YOU ADMIRE]. Ask: [SPECIFIC QUESTION OR REQUEST].\n\nCraft a message that:\n1. Opens with genuine connection (not generic)\n2. Shows I\'ve done research\n3. Asks one clear, easy-to-answer question\n4. Ends with appreciation, no pressure\n\nKeep it under 100 words.',
        useCase: 'Write effective cold outreach',
      },
      {
        title: 'Resume Bullet Transformer',
        prompt: 'Transform this experience into a results-focused resume bullet: [PASTE YOUR DESCRIPTION].\n\nRewrite it to:\n1. Start with a strong action verb\n2. Include specific metrics or outcomes\n3. Show impact, not just tasks\n4. Fit in one line (~15-20 words)\n\nProvide 3 variations with different angles.',
        useCase: 'Write impactful resume bullets',
      },
      {
        title: 'Job Description Decoder',
        prompt: 'Analyze this job description: [PASTE JOB POST].\n\nTell me:\n1. Must-have vs. nice-to-have skills\n2. Red flags or concerns\n3. What success looks like in this role (based on wording)\n4. How to tailor my application\n5. Questions to ask in the interview\n\nHelp me decide if this is worth applying to.',
        useCase: 'Decode job postings strategically',
      },
    ],
  },
  {
    domain: 'Content Creation',
    icon: Sparkles,
    color: 'emerald',
    prompts: [
      {
        title: 'Content Pillar Builder',
        prompt: 'Help me define content pillars. My expertise: [YOUR SKILLS/INTERESTS]. Target audience: [WHO I WANT TO REACH]. Goal: [BUILD AUDIENCE/GET HIRED/ETC.].\n\nSuggest 3-4 content pillars that:\n1. Align with my expertise and interests\n2. Resonate with my target audience\n3. Differentiate me from others\n4. Can sustain 2-3 posts per week\n\nFor each pillar, include example topics.',
        useCase: 'Define your content themes',
      },
      {
        title: '30-Day Content Calendar',
        prompt: 'Create a 30-day content calendar. Pillars: [LIST YOUR 3-4 PILLARS]. Platforms: [LINKEDIN/TWITTER/ETC.]. Posting frequency: [TIMES PER WEEK].\n\nFor each post:\n1. Topic/angle\n2. Format (story, how-to, analysis, etc.)\n3. Hook (first line)\n4. Key takeaway\n\nVariety content types and ensure each pillar is covered evenly.',
        useCase: 'Plan a month of content',
      },
      {
        title: 'Hook Writer',
        prompt: 'Generate 10 hooks (first lines) for this topic: [YOUR TOPIC]. Target audience: [WHO READS THIS]. Platform: [WHERE YOU\'RE POSTING].\n\nMake hooks that:\n1. Stop the scroll\n2. Promise clear value\n3. Create curiosity\n4. Fit the platform\'s style\n\nInclude a mix of question, statement, and story hooks.',
        useCase: 'Write attention-grabbing openers',
      },
      {
        title: 'Post Repurposer',
        prompt: 'Repurpose this post for multiple platforms: [PASTE YOUR LONG-FORM POST].\n\nAdapt it for:\n1. LinkedIn (professional, 150-200 words)\n2. Twitter thread (5-7 tweets)\n3. Instagram caption (conversational, 100-150 words)\n4. Newsletter section (detailed, 300 words)\n\nKeep core message consistent but adjust tone and format.',
        useCase: 'Multiply content across platforms',
      },
      {
        title: 'Engagement Analyzer',
        prompt: 'Analyze why this post performed well: [PASTE HIGH-PERFORMING POST]. Metrics: [LIKES, COMMENTS, SHARES].\n\nIdentify:\n1. What made it resonate (topic, format, hook)\n2. Patterns to replicate\n3. Audience signals (who engaged, how)\n4. 3 follow-up topics to ride this momentum\n\nHelp me create more posts like this.',
        useCase: 'Learn from successful content',
      },
    ],
  },
  {
    domain: 'Business & Revenue',
    icon: TrendingUp,
    color: 'amber',
    prompts: [
      {
        title: 'Offer Idea Generator',
        prompt: 'Generate 5 simple offers I can launch as a student. My skills: [YOUR SKILLS]. Time available: [HOURS PER WEEK]. Target clients: [WHO WOULD PAY].\n\nFor each offer:\n1. Service description (one sentence)\n2. Who it\'s for\n3. How to deliver it\n4. Suggested price range\n5. How to get first 3 clients\n\nFocus on quick wins, not complex products.',
        useCase: 'Brainstorm first paid offers',
      },
      {
        title: 'Pricing Strategy',
        prompt: 'Help me price this offer: [DESCRIBE YOUR SERVICE]. Comparable services: [RESEARCH OR ASK FOR HELP]. My experience level: [BEGINNER/INTERMEDIATE]. Time to deliver: [HOURS].\n\nSuggest:\n1. Pricing tiers (if applicable)\n2. Starting price for first 5 clients\n3. When and how to increase prices\n4. How to justify value\n5. Payment structure (upfront, milestone, etc.)',
        useCase: 'Price your services strategically',
      },
      {
        title: 'Client Outreach Template',
        prompt: 'Create an outreach template for my service: [YOUR OFFER]. Target clients: [TYPE OF BUSINESS/PERSON]. Their problem: [WHAT YOU SOLVE].\n\nWrite a 3-email sequence:\n1. Introduction (value + social proof)\n2. Follow-up (answer likely objections)\n3. Final nudge (clear CTA, deadline)\n\nPersonalize for cold outreach.',
        useCase: 'Land your first clients',
      },
      {
        title: 'Service Delivery Checklist',
        prompt: 'Create a delivery checklist for this service: [YOUR OFFER]. Steps I take: [YOUR PROCESS]. Deliverables: [WHAT CLIENT GETS].\n\nBuild a checklist that:\n1. Ensures consistent quality\n2. Saves time on repeated tasks\n3. Impresses clients with professionalism\n4. Includes communication touchpoints\n\nMake it simple enough to follow under pressure.',
        useCase: 'Deliver services professionally',
      },
      {
        title: 'Revenue Goal Reverse Engineer',
        prompt: 'I want to make $[AMOUNT] per month in [TIMEFRAME]. Potential offers: [LIST YOUR IDEAS WITH PRICES].\n\nReverse engineer a plan:\n1. How many clients/sales needed\n2. Required conversion rate\n3. Traffic/outreach needed\n4. Daily/weekly actions\n5. Milestones to track progress\n\nMake it realistic for a student schedule.',
        useCase: 'Build a realistic revenue plan',
      },
    ],
  },
  {
    domain: 'Communication',
    icon: MessageSquare,
    color: 'rose',
    prompts: [
      {
        title: 'Message Clarity Enhancer',
        prompt: 'Make this message clearer: [PASTE YOUR DRAFT]. Audience: [WHO READS IT]. Goal: [WHAT YOU WANT].\n\nRewrite it to:\n1. Remove jargon and filler\n2. Lead with the main point\n3. Use active voice\n4. Make requests specific\n5. Keep under [WORD COUNT]\n\nProvide before/after explanation.',
        useCase: 'Clarify any written message',
      },
      {
        title: 'Difficult Conversation Prep',
        prompt: 'Prepare me for this conversation: [DESCRIBE SITUATION]. What I want: [YOUR GOAL]. Potential objections: [CONCERNS].\n\nHelp me:\n1. Frame the conversation positively\n2. Anticipate their perspective\n3. Prepare responses to objections\n4. Find win-win outcomes\n5. Practice key phrases\n\nMake it collaborative, not confrontational.',
        useCase: 'Navigate tough conversations',
      },
      {
        title: 'Feedback Request Writer',
        prompt: 'Write a feedback request for: [WHAT YOU WANT FEEDBACK ON]. Recipient: [WHO YOU\'RE ASKING]. Relationship: [MENTOR/PEER/STRANGER].\n\nCraft a request that:\n1. Provides context briefly\n2. Asks specific questions (not "what do you think?")\n3. Makes it easy to respond\n4. Shows appreciation\n5. Specifies deadline (if needed)\n\nKeep it short and respectful of their time.',
        useCase: 'Get quality feedback',
      },
      {
        title: 'Presentation Simplifier',
        prompt: 'Simplify this presentation content: [PASTE YOUR SLIDES/NOTES]. Audience: [WHO LISTENS]. Time limit: [MINUTES].\n\nStreamline it:\n1. One core message per slide\n2. Visuals over text where possible\n3. Stories or examples to make it stick\n4. Clear takeaways\n5. Confident opening and closing\n\nHelp me cut the fluff and keep impact.',
        useCase: 'Make presentations clearer',
      },
    ],
  },
  {
    domain: 'Wellbeing & Energy',
    icon: Heart,
    color: 'cyan',
    prompts: [
      {
        title: 'Energy Audit',
        prompt: 'Audit my energy patterns. Typical day: [DESCRIBE YOUR SCHEDULE]. Energy highs: [WHEN YOU FEEL BEST]. Energy lows: [WHEN YOU CRASH].\n\nAnalyze:\n1. Patterns and triggers\n2. Tasks misaligned with energy\n3. Recovery gaps\n4. Time blocks to rearrange\n5. Habits to add or remove\n\nHelp me design an energy-optimized schedule.',
        useCase: 'Optimize your daily energy',
      },
      {
        title: 'Habit Stack Builder',
        prompt: 'Build a habit stack for: [YOUR GOAL]. Current habits: [WHAT YOU ALREADY DO]. Available time: [MORNING/EVENING/ETC.].\n\nCreate a stack that:\n1. Anchors to existing routines\n2. Takes under 15 minutes\n3. Builds momentum gradually\n4. Tracks progress simply\n5. Rewards completion\n\nMake it sustainable, not heroic.',
        useCase: 'Build consistent habits',
      },
      {
        title: 'Focus Session Planner',
        prompt: 'Plan deep work sessions for: [TASK/PROJECT]. Available blocks: [TIME SLOTS]. Distractions: [WHAT INTERRUPTS YOU].\n\nDesign sessions with:\n1. Pre-session prep (5 min)\n2. Focus block structure (25/50/90 min)\n3. Break activities\n4. Environment setup\n5. Success criteria\n\nHelp me protect focus time.',
        useCase: 'Structure deep work sessions',
      },
      {
        title: 'Burnout Prevention Check',
        prompt: 'Assess my burnout risk. Current load: [COMMITMENTS, HOURS]. Signs I notice: [SYMPTOMS IF ANY]. Support available: [RESOURCES].\n\nEvaluate:\n1. Warning signs\n2. Immediate adjustments needed\n3. Long-term sustainability\n4. Who/what to lean on\n5. Recovery practices\n\nHelp me stay productive without burning out.',
        useCase: 'Prevent burnout early',
      },
    ],
  },
]

export default function PromptsPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  // Filter prompts based on search and domain
  const filteredLibrary = promptLibrary
    .filter((domain) => !selectedDomain || domain.domain === selectedDomain)
    .map((domain) => ({
      ...domain,
      prompts: domain.prompts.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((domain) => domain.prompts.length > 0)

  const totalPrompts = promptLibrary.reduce((acc, domain) => acc + domain.prompts.length, 0)

  return (
    <div className="min-h-screen bg-void text-slate-100">
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-blue-900/20" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-6xl font-bold bg-gradient-to-r from-slate-100 via-emerald-200 to-blue-200 bg-clip-text text-transparent sm:text-7xl"
            >
              Creator Prompt Library
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl"
            >
              {totalPrompts}+ battle-tested prompts organized by creator domain.
              Copy, customize, and use them in any AI tool.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-base text-slate-100 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Domain Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDomain(null)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  !selectedDomain
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Domains
              </button>
              {promptLibrary.map((domain) => (
                <button
                  key={domain.domain}
                  onClick={() => setSelectedDomain(domain.domain)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedDomain === domain.domain
                      ? `bg-${domain.color}-500 text-white`
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {domain.domain}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prompts by Domain */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredLibrary.map((domain) => (
            <div key={domain.domain}>
              <div className="mb-8 flex items-center gap-4">
                <domain.icon className={`h-10 w-10 text-${domain.color}-400`} />
                <div>
                  <h2 className="text-4xl font-bold text-slate-100">{domain.domain}</h2>
                  <p className="text-base text-slate-400">{domain.prompts.length} prompts</p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {domain.prompts.map((promptItem, index) => {
                  const promptId = `${domain.domain}-${index}`
                  const isCopied = copiedPrompt === promptId

                  return (
                    <motion.div
                      key={promptId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassmorphicCard variant="luxury" border="subtle" className="h-full p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <h3 className="text-xl font-bold text-slate-100">{promptItem.title}</h3>
                          <button
                            onClick={() => copyToClipboard(promptItem.prompt, promptId)}
                            className={`rounded-lg p-2 transition-all ${
                              isCopied
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                            title="Copy prompt"
                          >
                            {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                          </button>
                        </div>

                        <p className="mb-4 text-sm text-purple-300">{promptItem.useCase}</p>

                        <div className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                          <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed">
                            {promptItem.prompt}
                          </pre>
                        </div>
                      </GlassmorphicCard>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredLibrary.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-slate-400">No prompts found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
