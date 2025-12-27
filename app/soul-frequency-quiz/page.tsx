'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Heart, Brain, Users, Lightbulb, Sparkles } from 'lucide-react'

import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'

type FrequencyId = 'alchemist' | 'architect' | 'connector' | 'pioneer'

type QuestionOption = {
  id: string
  text: string
  type: FrequencyId
}

type Question = {
  id: number
  question: string
  options: QuestionOption[]
}

const questions: Question[] = [
  {
    id: 1,
    question: 'When a project finally hums, what energy sparked it first?',
    options: [
      { id: 'a', text: 'Alchemising a lived experience into something healing and resonant.', type: 'alchemist' },
      { id: 'b', text: 'Designing a system that solved complexity with beauty.', type: 'architect' },
      { id: 'c', text: 'Hosting the right people in the right moment and feeling them click.', type: 'connector' },
      { id: 'd', text: 'Breaking the format and proving a new path works.', type: 'pioneer' },
    ],
  },
  {
    id: 2,
    question: 'What do people most often thank you for delivering?',
    options: [
      { id: 'a', text: 'Perspective that helps them transform or heal.', type: 'alchemist' },
      { id: 'b', text: 'Clarity and organisation that makes ambition feel simple.', type: 'architect' },
      { id: 'c', text: 'Belonging and the feeling of being seen.', type: 'connector' },
      { id: 'd', text: 'Courage to experiment and think beyond the obvious.', type: 'pioneer' },
    ],
  },
  {
    id: 3,
    question: 'Your ideal release would feel like...',
    options: [
      { id: 'a', text: 'A cinematic moment that turns story into medicine.', type: 'alchemist' },
      { id: 'b', text: 'A unified operating system that scales without friction.', type: 'architect' },
      { id: 'c', text: 'A gathering that turns strangers into collaborators.', type: 'connector' },
      { id: 'd', text: 'A bold prototype that unlocks a new future line.', type: 'pioneer' },
    ],
  },
  {
    id: 4,
    question: 'When a brief gets messy, your first instinct is to...',
    options: [
      { id: 'a', text: 'Sit with the emotions and translate the human need under the surface.', type: 'alchemist' },
      { id: 'b', text: 'Map components, dependencies, and guardrails.', type: 'architect' },
      { id: 'c', text: 'Listen to each voice and craft a shared language.', type: 'connector' },
      { id: 'd', text: 'Scan adjacent fields for an unconventional pattern.', type: 'pioneer' },
    ],
  },
  {
    id: 5,
    question: 'You know a launch worked when...',
    options: [
      { id: 'a', text: 'Someone says their life feels different because of it.', type: 'alchemist' },
      { id: 'b', text: 'The experience runs smoothly and scale feels effortless.', type: 'architect' },
      { id: 'c', text: 'Community momentum grows without you pushing it.', type: 'connector' },
      { id: 'd', text: 'The industry starts whispering about the new direction.', type: 'pioneer' },
    ],
  },
  {
    id: 6,
    question: 'You feel most alive when you are...',
    options: [
      { id: 'a', text: 'Turning pain, music, or story into collective healing.', type: 'alchemist' },
      { id: 'b', text: 'Architecting a ritual, workflow, or product that lasts.', type: 'architect' },
      { id: 'c', text: 'Facilitating a room where everyone relaxes into their role.', type: 'connector' },
      { id: 'd', text: 'Exploring new combinations of ideas, tech, and art.', type: 'pioneer' },
    ],
  },
]

type NextStep = {
  label: string
  href: string
  description: string
}

type FrequencyProfile = {
  title: string
  subtitle: string
  description: string
  traits: string[]
  aiCollaboration: string
  examples: string
  microGuide: string
  color: string
  icon: typeof Heart
  nextSteps: NextStep[]
}

const frequencyTypes: Record<FrequencyId, FrequencyProfile> = {
  alchemist: {
    title: 'The Alchemist',
    subtitle: 'Transformation Frequency',
    description:
      'You metabolise lived experience into healing signals. Your work invites people to process, feel, and evolve with you.',
    traits: [
      'Guides audiences through emotional and spiritual change',
      'Communicates with cinematic, sensory language',
      'Spots the breakthrough moment inside every setback',
      'Builds practices that make vulnerability feel safe',
    ],
    aiCollaboration:
      'Feed your agents voice notes, journal entries, and raw transcripts so they mirror your tone with nuance. Let AI structure the insight while you guard the integrity of the feeling.',
    examples:
      'Transformational storytellers, coaches, facilitators, and musicians who turn their journey into rituals for others.',
    microGuide:
      'Anchor every prompt with the emotion you want people to feel. It keeps your AI collaborators from sounding generic.',
    color: 'bg-gradient-to-br from-pulse-400 via-pulse-500 to-primary-600',
    icon: Heart,
    nextSteps: [
      {
        label: 'Design your ritual blueprint',
        href: '/music-lab',
        description: 'Co-create a sonic or meditation ritual that reinforces your transformation arc.',
      },
      {
        label: 'Download the Creative Storytelling Kit',
        href: '/resources',
        description: 'Frameworks and prompts for turning lived experience into premium assets.',
      },
    ],
  },
  architect: {
    title: 'The Architect',
    subtitle: 'Systems Frequency',
    description:
      'You translate ambition into elegant infrastructure. Your craft is designing operating systems that feel inevitable.',
    traits: [
      'Maps dependencies and governance before momentum begins',
      'Balances enterprise rigour with aesthetic polish',
      'Obsesses over onboarding, documentation, and iteration loops',
      'Measures success with dashboards, not guesswork',
    ],
    aiCollaboration:
      'Use AI to prototype flows, simulate edge cases, and pressure-test governance. You define the guardrails; your agents stress-test the pathways.',
    examples:
      'Product architects, service designers, ops leaders, and strategic consultants building scalable platforms.',
    microGuide:
      'Pair each AI workflow with an escalation ritual so the humans you serve always feel in control.',
    color: 'bg-gradient-to-br from-nebula-400 via-midnight-500 to-primary-600',
    icon: Brain,
    nextSteps: [
      {
        label: 'Review the Agent Team operating tiers',
        href: '/agent-team#tiers',
        description: 'Choose the architecture support that matches your rollout timeline.',
      },
      {
        label: 'Explore the Founder Playbook',
        href: '/founder-playbook',
        description: 'Systems templates and governance prompts to accelerate your build.',
      },
    ],
  },
  connector: {
    title: 'The Connector',
    subtitle: 'Harmony Frequency',
    description:
      'You engineer belonging. Your instinct is to gather the right voices, translate between them, and sustain the bond.',
    traits: [
      'Designs onboarding journeys that feel like sacred invitations',
      'Reads the subtle dynamics inside every conversation',
      'Sets rituals that keep communities engaged after the hype fades',
      'Knows when to step back so others can rise',
    ],
    aiCollaboration:
      'Let AI capture community sentiment, surface unseen patterns, and draft responses that sound like your care. You add the warmth; agents maintain the cadence.',
    examples:
      'Community architects, partnership leads, facilitators, and membership designers who turn audiences into families.',
    microGuide:
      'Build a shared language doc for your agents so every interaction feels handcrafted.',
    color: 'bg-gradient-to-br from-aurora-400 via-aurora-500 to-primary-600',
    icon: Users,
    nextSteps: [
      {
        label: 'Launch a welcome ritual',
        href: '/start',
        description: 'Use the Start Here experience to script your community onboarding cadence.',
      },
      {
        label: 'Guide families through AI calmly',
        href: '/family-guide',
        description: 'Teach the people you love with explainers, scripts, and safety rituals.',
      },
    ],
  },
  pioneer: {
    title: 'The Pioneer',
    subtitle: 'Innovation Frequency',
    description:
      'You live on the frontier. Your genius is sensing emerging patterns and composing first-of-kind experiences.',
    traits: [
      'Moves fast on signal before it becomes consensus',
      'Samples across industries to remix ideas in surprising ways',
      'Thrives in ambiguity and keeps momentum without perfect data',
      'Invites collaborators to explore the edge with confidence',
    ],
    aiCollaboration:
      'Let AI be your speculative lab. Prototype narratives, interfaces, and scenarios, then bring humans in to pressure-test the wildest directions.',
    examples:
      'Visionary founders, creative technologists, researchers, and artists building next-wave formats.',
    microGuide:
      'Pair every experiment with a grounding ritual so teams can follow you without burning out.',
    color: 'bg-gradient-to-br from-primary-500 via-pulse-500 to-aurora-500',
    icon: Lightbulb,
    nextSteps: [
      {
        label: 'Reserve an activation workshop',
        href: '/agent-team#tiers',
        description: 'Design a near-term sprint to prove your boldest thesis with the full agent collective.',
      },
      {
        label: 'Document your intelligence roadmap',
        href: '/blog',
        description: 'Share your field notes publicly and invite momentum around the future you see.',
      },
    ],
  },
}

const questionMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function SoulFrequencyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, FrequencyId>>({})
  const [showResults, setShowResults] = useState(false)

  const totalQuestions = questions.length
  const activeQuestion = questions[currentQuestion]
  const selectedType = showResults || !activeQuestion ? undefined : answers[activeQuestion.id]
  const progress = showResults
    ? 100
    : Math.round(((currentQuestion + (selectedType ? 1 : 0)) / totalQuestions) * 100)

  const handleAnswer = (questionId: number, type: FrequencyId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: type }))
  }

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const calculateResult = () => {
    const typeCounts: Record<FrequencyId, number> = {
      alchemist: 0,
      architect: 0,
      connector: 0,
      pioneer: 0,
    }

    Object.values(answers).forEach((type) => {
      typeCounts[type] += 1
    })

    const dominantType = (Object.keys(typeCounts) as FrequencyId[]).reduce(
      (acc, key) => (typeCounts[key] > typeCounts[acc] ? key : acc),
      'alchemist' as FrequencyId
    )

    const profile = frequencyTypes[dominantType]
    return { id: dominantType, ...profile }
  }

  const result = showResults ? calculateResult() : null
  const ResultIcon = result?.icon ?? Heart

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
<div className="relative overflow-hidden">
        <div className={clsx('absolute inset-0 opacity-85', gradientPresets.heroBase)} />
        <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
        <div className={clsx('absolute inset-0 opacity-40', gradientPresets.heroPulse)} />

        <div className="relative px-6 pt-32 pb-20">
          <div className="mx-auto max-w-5xl">
            {!showResults && activeQuestion ? (
              <motion.div initial="hidden" animate="visible" variants={questionMotion} className="space-y-10">
                <div className="text-center space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Soul Frequency Signal
                  </span>
                  <h1 className="text-4xl font-semibold text-balance md:text-5xl">
                    Discover how your voice wants to collaborate with intelligence
                  </h1>
                  <p className="text-base text-white/75 md:text-lg">
                    Six fast prompts surface your dominant creative frequency. We will translate it into rituals, prompts,
                    and partner workflows so every AI interaction stays soul-aligned.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                    <span>Question {currentQuestion + (selectedType ? 1 : 0)} of {totalQuestions}</span>
                    <span>{progress}% complete</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={clsx('h-full rounded-full', gradientPresets.buttonAurora)}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className={clsx(glassCardClasses, 'space-y-6 rounded-3xl p-8 shadow-glass')}>
                  <motion.h2 key={activeQuestion.question} className="text-2xl font-semibold text-white" initial="hidden" animate="visible" variants={questionMotion}>
                    {activeQuestion.question}
                  </motion.h2>

                  <div className="space-y-3">
                    {activeQuestion.options.map((option) => {
                      const isSelected = selectedType === option.type
                      return (
                        <button
                          type="button"
                          key={option.id}
                          onClick={() => handleAnswer(activeQuestion.id, option.type)}
                          className={clsx(
                            'w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-base transition-all duration-200 hover:border-white/30 hover:bg-white/10 focus:outline-none',
                            isSelected && 'border-white/50 bg-white/10 shadow-[0_12px_40px_rgba(12,27,68,0.32)]'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={clsx(
                                'mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40',
                                isSelected && 'border-white bg-white text-midnight-800'
                              )}
                            >
                              {isSelected ? <CheckCircle className="h-4 w-4" aria-hidden="true" /> : null}
                            </span>
                            <span className="text-white/85">{option.text}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedType ? (
                      <motion.div
                        key={selectedType}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className={clsx(glassCardClasses, 'rounded-2xl border-white/15 bg-white/8 p-5 text-sm text-white/75')}
                      >
                        {frequencyTypes[selectedType].microGuide}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={previousQuestion}
                      className="text-sm font-semibold text-white/60 transition hover:text-white"
                      disabled={currentQuestion === 0}
                    >
                      {currentQuestion === 0 ? ' ' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={nextQuestion}
                      disabled={!selectedType}
                      className={clsx(
                        'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70',
                        gradientPresets.buttonAurora,
                        selectedType
                          ? 'hover:-translate-y-0.5 shadow-[0_14px_32px_rgba(12,27,68,0.35)]'
                          : 'cursor-not-allowed opacity-50'
                      )}
                    >
                      {currentQuestion < totalQuestions - 1 ? 'Next insight' : 'Reveal my blueprint'}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div initial="hidden" animate="visible" variants={questionMotion} className="space-y-12">
                <div className="text-center space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Soul Frequency Blueprint
                  </span>
                  <h1 className="text-5xl font-semibold text-balance">You lead with the {result.title}</h1>
                  <p className="text-lg text-white/80">{result.subtitle}</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
                  <div className={clsx(glassCardClasses, 'space-y-6 rounded-3xl p-8 shadow-glass')}>
                    <div className="flex items-center justify-between gap-4">
                      <div className={clsx('flex h-20 w-20 items-center justify-center rounded-3xl text-white shadow-lg shadow-black/30', result.color)}>
                        <ResultIcon className="h-10 w-10" aria-hidden="true" />
                      </div>
                      <div className="text-right text-sm text-white/70">
                        <p>{result.examples}</p>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-white/80">{result.description}</p>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">Your core traits</h3>
                      <ul className="mt-3 space-y-2 text-sm text-white/75">
                        {result.traits.map((trait) => (
                          <li key={trait} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 text-aurora-400" aria-hidden="true" />
                            <span>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">AI collaboration move</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{result.aiCollaboration}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className={clsx(glassCardClasses, 'rounded-3xl border-white/10 bg-white/8 p-7 shadow-glass')}>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">Mini action plan</h3>
                      <div className="mt-4 space-y-4 text-sm text-white/75">
                        {result.nextSteps.map((step) => (
                          <Link
                            key={step.label}
                            href={step.href}
                            className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/25 hover:bg-white/10"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-semibold text-white">{step.label}</span>
                              <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                            </div>
                            <p className="mt-2 text-white/70">{step.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className={clsx(glassCardClasses, 'rounded-3xl border-white/10 bg-white/8 p-6 shadow-glass')}>
                      <h3 className="text-base font-semibold text-white">Email the full report to yourself</h3>
                      <p className="mt-2 text-sm text-white/70">
                        Receive your detailed frequency playbook with prompts, rituals, and sample automations tuned to this profile.
                      </p>
                      <form action="/api/newsletter" method="POST" className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <input type="hidden" name="tag" value={`soul-frequency-${result.id}`} />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Enter your email"
                          className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        />
                        <button
                          type="submit"
                          className={clsx(
                            'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70',
                            gradientPresets.buttonAurora
                          )}
                        >
                          Send report
                        </button>
                      </form>
                      <p className="mt-2 text-xs text-white/50">No spam. Opt out anytime.</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <button
                        type="button"
                        onClick={resetQuiz}
                        className="text-sm font-semibold text-white/70 transition hover:text-white"
                      >
                        Retake the quiz
                      </button>
                      <Link
                        href="/agent-team"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
                      >
                        Meet the agent team blueprint
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
</div>
  )
}
