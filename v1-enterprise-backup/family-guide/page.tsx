import Link from 'next/link'
import { Shield, Heart, Users, Lightbulb, Download, Play, BookOpen, Star } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Basics for Families - Safe & Conscious AI Introduction',
  description: 'Complete guide for introducing AI safely in family contexts. Protect your loved ones while embracing transformative technology together.',
  keywords: [
    'family ai guide',
    'ai safety for kids',
    'teach ai at home',
    'family ai conversations',
    'ai education for children'
  ],
  path: '/family-guide'
})

const familyAgeGroups = [
  {
    ageGroup: 'Ages 5-8: AI Explorers',
    icon: Heart,
    description: 'Introduce AI as helpful robots and magical assistants',
    activities: [
      'Story time with AI-generated fairy tales',
      'Simple voice assistants for weather and music',
      'Drawing with AI art tools (supervised)',
      'Learning about helpful robots in movies'
    ],
    safeguards: [
      'Always supervise AI interactions',
      'Explain AI as tools, not friends',
      'No personal information sharing',
      'Time limits on AI activities'
    ]
  },
  {
    ageGroup: 'Ages 9-12: Digital Natives',
    icon: Lightbulb,
    description: 'Build understanding of how AI works and its limitations',
    activities: [
      'Research projects using AI search tools',
      'Creative writing with AI assistance',
      'Understanding AI in games and apps',
      'Basic prompt engineering for school projects'
    ],
    safeguards: [
      'Teach critical thinking about AI outputs',
      'Discuss AI biases and limitations',
      'Create family AI usage agreements',
      'Regular check-ins about AI experiences'
    ]
  },
  {
    ageGroup: 'Ages 13-17: Future Leaders',
    icon: Star,
    description: 'Prepare for AI-integrated careers and ethical decision-making',
    activities: [
      'AI tool mastery for academic projects',
      'Understanding AI impact on careers',
      'Exploring AI ethics and philosophy',
      'Creating AI-assisted creative projects'
    ],
    safeguards: [
      'Discuss AI impact on society and work',
      'Teach responsible AI development principles',
      'Encourage original thinking alongside AI use',
      'Connect AI skills to career planning'
    ]
  }
]

const conversationStarters = [
  {
    question: "What is AI and why is everyone talking about it?",
    response: "AI is like having really smart computer helpers that can write, draw, and solve problems. People are excited because it can help us do amazing things, but we need to learn how to use it wisely."
  },
  {
    question: "Will AI replace humans in jobs?",
    response: "AI will change many jobs, but humans will always be needed for creativity, caring for others, and making important decisions. The key is learning to work together with AI."
  },
  {
    question: "Is AI dangerous?",
    response: "AI itself isn't dangerous, but like any powerful tool, it needs to be used responsibly. That's why we're learning together how to use it safely and ethically."
  },
  {
    question: "Can I trust what AI tells me?",
    response: "AI can make mistakes or sometimes create information that sounds real but isn't true. Always check important facts with other sources and think critically about AI responses."
  }
]

const familyResources = [
  {
    title: 'Family AI Safety Checklist',
    description: 'Comprehensive safety guidelines for every age group',
    downloadUrl: '/templates/family-ai-safety-checklist.pdf',
    icon: Shield,
    type: 'PDF Guide'
  },
  {
    title: 'AI Conversation Starter Cards',
    description: 'Ready-to-use discussion prompts for family AI talks',
    downloadUrl: '/templates/ai-conversation-cards.pdf',
    icon: Users,
    type: 'Interactive Cards'
  },
  {
    title: 'Age-Appropriate AI Activities',
    description: 'Fun and educational AI projects for every age',
    downloadUrl: '/templates/family-ai-activities.pdf',
    icon: Play,
    type: 'Activity Guide'
  },
  {
    title: 'Family AI Agreement Template',
    description: 'Create your family\'s AI usage rules together',
    downloadUrl: '/templates/family-ai-agreement.pdf',
    icon: BookOpen,
    type: 'Template'
  }
]

const parentTips = [
  {
    tip: 'Start with Wonder',
    description: 'Frame AI as an amazing human achievement that requires wisdom to use well'
  },
  {
    tip: 'Model Curiosity',
    description: 'Show your own learning process and ask questions alongside your children'
  },
  {
    tip: 'Emphasize Human Values',
    description: 'Consistently highlight uniquely human qualities like empathy, creativity, and ethics'
  },
  {
    tip: 'Create Safe Experiments',
    description: 'Set up controlled environments where kids can explore AI safely'
  },
  {
    tip: 'Regular Check-ins',
    description: 'Make AI discussions a regular part of family conversations'
  },
  {
    tip: 'Stay Informed',
    description: 'Keep learning about AI developments to guide your family effectively'
  }
]

export default function FamilyGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mb-6">
              <Shield className="h-10 w-10 text-green-200" />
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              AI Basics for Families
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Navigate the AI revolution together. Protect your loved ones while embracing transformative
              technology that enhances family connection and learning.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🛡️ Safety First
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                👨‍👩‍👧‍👦 Age-Appropriate
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🌟 Consciousness-Aligned
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Age-Appropriate AI Introduction</h2>
              <p className="mt-4 text-white/70 max-w-3xl mx-auto">
                Every family member can safely explore AI at their developmental level. Our framework
                grows with your children while maintaining safety and consciousness principles.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {familyAgeGroups.map((group, index) => {
                const IconComponent = group.icon

                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6"
                  >
                    <div className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-4">
                        <IconComponent className="h-8 w-8 text-green-200" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{group.ageGroup}</h3>
                      <p className="mt-2 text-sm text-white/70">{group.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">
                        Recommended Activities
                      </h4>
                      <ul className="space-y-2">
                        {group.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-400 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">
                        Safety Guidelines
                      </h4>
                      <ul className="space-y-2">
                        {group.safeguards.map((safeguard, safeIndex) => (
                          <li key={safeIndex} className="flex items-start gap-2 text-sm text-white/70">
                            <Shield className="mt-0.5 h-3 w-3 text-green-400 flex-shrink-0" />
                            {safeguard}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Common Family AI Conversations</h2>
              <p className="mt-4 text-white/70">
                Be prepared for the questions your family will ask. Here are thoughtful responses
                that build understanding and confidence.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {conversationStarters.map((conversation, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">
                    "{conversation.question}"
                  </h3>
                  <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4">
                    <p className="text-sm text-white/80 leading-relaxed">
                      {conversation.response}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Essential Family AI Resources</h2>
              <p className="mt-4 text-white/70">
                Download practical tools to implement safe AI education in your family.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {familyResources.map((resource, index) => {
                const IconComponent = resource.icon

                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                      <IconComponent className="h-6 w-6 text-green-200" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{resource.description}</p>
                      <div className="mt-2 text-xs text-green-200 font-medium">
                        {resource.type}
                      </div>
                    </div>
                    <Link
                      href={resource.downloadUrl}
                      className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-400"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 via-slate-900 to-slate-950 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Quick Tips for Parents</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {parentTips.map((tip, index) => (
                  <div key={index} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <h3 className="text-sm font-semibold text-green-200 mb-2">{tip.tip}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Join the Family AI Community</h3>
            <p className="mt-4 text-white/70">
              Connect with other families navigating AI together. Share experiences, ask questions,
              and learn from parents who are successfully integrating AI into family life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
              >
                <Users className="h-4 w-4" />
                Explore All Resources
              </Link>
              <Link
                href="mailto:hello@frankx.ai?subject=Family AI Support"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Get Personal Guidance
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

