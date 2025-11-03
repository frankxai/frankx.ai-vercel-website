'use client'

import { useState, useEffect } from 'react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Brain, Users, Lightbulb, Target, TrendingUp, BookOpen, Shield, Star, Share2, Twitter, Linkedin, Mail, Download } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import { StaggerContainer, StaggerItem, TypewriterText, GlowPulse, RevealAnimation } from '@/components/ui/AdvancedAnimations'

type AssessmentStep = {
  id: string
  title: string
  description: string
  type: 'welcome' | 'question' | 'matrix' | 'priority' | 'results'
  questions?: Question[]
  matrix?: MatrixQuestion
  priorities?: PriorityQuestion
}

type Question = {
  id: string
  text: string
  options: Option[]
}

type Option = {
  id: string
  text: string
  scores: Record<string, number>
  description?: string
}

type MatrixQuestion = {
  title: string
  description: string
  rows: string[]
  columns: string[]
  scoring: Record<string, Record<string, number>>
}

type PriorityQuestion = {
  title: string
  description: string
  items: PriorityItem[]
}

type PriorityItem = {
  id: string
  title: string
  description: string
  category: string
}

type UserProfile = {
  persona: 'creator' | 'executive' | 'family' | 'practitioner' | 'hybrid'
  experience: 'beginner' | 'intermediate' | 'advanced'
  goals: string[]
  challenges: string[]
  timeline: 'immediate' | 'month' | 'quarter' | 'year'
  budget: 'free' | 'modest' | 'professional' | 'enterprise'
  scores: Record<string, number>
}

const assessmentSteps: AssessmentStep[] = [
  {
    id: 'welcome',
    title: 'Your AI Intelligence Journey Begins',
    description: 'A comprehensive assessment designed by our Agent Team to create your personalized pathway to conscious AI mastery.',
    type: 'welcome'
  },
  {
    id: 'role-context',
    title: 'Your Current Context',
    description: 'Help us understand your primary role and responsibilities.',
    type: 'question',
    questions: [
      {
        id: 'primary-role',
        text: 'Which best describes your primary role?',
        options: [
          {
            id: 'creator',
            text: 'Content Creator / Entrepreneur',
            description: 'Building content, products, or growing a personal brand',
            scores: { creator: 3, executive: 1, family: 1, practitioner: 1 }
          },
          {
            id: 'executive',
            text: 'Business Leader / Executive',
            description: 'Leading teams, making strategic decisions, driving growth',
            scores: { creator: 1, executive: 3, family: 1, practitioner: 1 }
          },
          {
            id: 'family',
            text: 'Parent / Family Leader',
            description: 'Guiding family decisions, educating children, managing household',
            scores: { creator: 1, executive: 1, family: 3, practitioner: 1 }
          },
          {
            id: 'practitioner',
            text: 'AI Practitioner / Technical Professional',
            description: 'Working directly with AI tools, implementing solutions',
            scores: { creator: 1, executive: 1, family: 1, practitioner: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'experience-level',
    title: 'Your AI Experience',
    description: 'Understanding your current experience helps us calibrate the right starting point.',
    type: 'question',
    questions: [
      {
        id: 'ai-experience',
        text: 'How would you describe your current AI experience?',
        options: [
          {
            id: 'beginner',
            text: 'Complete Beginner',
            description: 'Never used AI tools, curious but overwhelmed',
            scores: { beginner: 3, intermediate: 0, advanced: 0 }
          },
          {
            id: 'explorer',
            text: 'Curious Explorer',
            description: 'Tried a few AI tools, learning the basics',
            scores: { beginner: 2, intermediate: 1, advanced: 0 }
          },
          {
            id: 'user',
            text: 'Regular User',
            description: 'Use AI tools regularly, comfortable with common applications',
            scores: { beginner: 0, intermediate: 3, advanced: 1 }
          },
          {
            id: 'power-user',
            text: 'Power User',
            description: 'Advanced workflows, custom implementations, teaching others',
            scores: { beginner: 0, intermediate: 1, advanced: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'goals-matrix',
    title: 'Your Success Priorities',
    description: 'Rate how important each outcome is for your AI journey.',
    type: 'matrix',
    matrix: {
      title: 'Priority Assessment',
      description: 'Rate each goal from 1 (not important) to 5 (critical)',
      rows: [
        'Save time on routine tasks',
        'Increase creative output quality',
        'Make better strategic decisions',
        'Stay ahead of industry trends',
        'Build new revenue streams',
        'Improve team productivity',
        'Ensure ethical AI usage',
        'Develop AI expertise/credibility'
      ],
      columns: ['1', '2', '3', '4', '5'],
      scoring: {
        'Save time on routine tasks': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Increase creative output quality': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Make better strategic decisions': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Stay ahead of industry trends': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Build new revenue streams': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Improve team productivity': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Ensure ethical AI usage': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 },
        'Develop AI expertise/credibility': { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 }
      }
    }
  },
  {
    id: 'challenges',
    title: 'Your Current Challenges',
    description: 'What are your biggest obstacles right now?',
    type: 'question',
    questions: [
      {
        id: 'biggest-challenge',
        text: 'What\'s your biggest AI-related challenge right now?',
        options: [
          {
            id: 'overwhelm',
            text: 'Information Overwhelm',
            description: 'Too many options, don\'t know where to start',
            scores: { challenge_clarity: 3, challenge_technical: 1, challenge_strategic: 1, challenge_adoption: 1 }
          },
          {
            id: 'technical',
            text: 'Technical Implementation',
            description: 'How to actually implement and integrate AI tools',
            scores: { challenge_clarity: 1, challenge_technical: 3, challenge_strategic: 1, challenge_adoption: 1 }
          },
          {
            id: 'strategy',
            text: 'Strategic Direction',
            description: 'Unclear on AI strategy and long-term planning',
            scores: { challenge_clarity: 1, challenge_technical: 1, challenge_strategic: 3, challenge_adoption: 1 }
          },
          {
            id: 'adoption',
            text: 'Team/Family Adoption',
            description: 'Getting others to embrace and use AI effectively',
            scores: { challenge_clarity: 1, challenge_technical: 1, challenge_strategic: 1, challenge_adoption: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 'results',
    title: 'Your Personalized Pathway',
    description: 'Based on your responses, here\'s your customized journey to AI mastery.',
    type: 'results'
  }
]

export default function AdvancedAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [matrixResponses, setMatrixResponses] = useState<Record<string, string>>({})
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleOptionSelect = (questionId: string, optionId: string, scores: Record<string, number>) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: { optionId, scores }
    }))
  }

  const handleMatrixResponse = (row: string, column: string) => {
    const key = `${row}_${column}`
    setMatrixResponses(prev => ({
      ...prev,
      [row]: column
    }))
  }

  const calculateProfile = (): UserProfile => {
    const allScores: Record<string, number> = {}

    // Aggregate scores from all responses
    Object.values(responses).forEach(response => {
      if (response.scores) {
        Object.entries(response.scores).forEach(([key, value]) => {
          allScores[key] = (allScores[key] || 0) + (value as number)
        })
      }
    })

    // Add matrix scores
    Object.entries(matrixResponses).forEach(([row, column]) => {
      const step = assessmentSteps.find(s => s.id === 'goals-matrix')
      if (step?.matrix?.scoring[row]?.[column]) {
        const key = row.toLowerCase().replace(/\s+/g, '_')
        allScores[key] = step.matrix.scoring[row][column]
      }
    })

    // Determine persona
    const personaScores = {
      creator: allScores.creator || 0,
      executive: allScores.executive || 0,
      family: allScores.family || 0,
      practitioner: allScores.practitioner || 0
    }
    const persona = Object.entries(personaScores).reduce((a, b) =>
      personaScores[a[0] as keyof typeof personaScores] > personaScores[b[0] as keyof typeof personaScores] ? a : b
    )[0] as UserProfile['persona']

    // Determine experience level
    const experienceScores = {
      beginner: allScores.beginner || 0,
      intermediate: allScores.intermediate || 0,
      advanced: allScores.advanced || 0
    }
    const experience = Object.entries(experienceScores).reduce((a, b) =>
      experienceScores[a[0] as keyof typeof experienceScores] > experienceScores[b[0] as keyof typeof experienceScores] ? a : b
    )[0] as UserProfile['experience']

    return {
      persona,
      experience,
      goals: Object.keys(allScores).filter(key => key.includes('goal') && allScores[key] > 2),
      challenges: Object.keys(allScores).filter(key => key.includes('challenge') && allScores[key] > 2),
      timeline: 'month', // Default for now
      budget: 'professional', // Default for now
      scores: allScores
    }
  }

  const nextStep = () => {
    if (currentStep === assessmentSteps.length - 2) {
      // Generate profile before showing results
      const profile = calculateProfile()
      setUserProfile(profile)
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, assessmentSteps.length - 1))
      setIsTransitioning(false)
    }, 300)
  }

  const prevStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.max(prev - 1, 0))
      setIsTransitioning(false)
    }, 300)
  }

  const canProceed = () => {
    const step = assessmentSteps[currentStep]
    if (step.type === 'welcome') return true
    if (step.type === 'results') return true
    if (step.type === 'question') {
      return step.questions?.every(q => responses[q.id]) || false
    }
    if (step.type === 'matrix') {
      return step.matrix?.rows.every(row => matrixResponses[row]) || false
    }
    return false
  }

  const step = assessmentSteps[currentStep]
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100

  // Show welcome on first load
  if (step.type === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <WelcomeStep onNext={nextStep} completionCount={1234} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: isTransitioning ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isTransitioning ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >

              {step.type === 'question' && (
                <QuestionStep
                  step={step}
                  responses={responses}
                  onOptionSelect={handleOptionSelect}
                  onNext={nextStep}
                  onPrev={prevStep}
                  canProceed={canProceed()}
                  currentStep={currentStep}
                />
              )}

              {step.type === 'matrix' && (
                <MatrixStep
                  step={step}
                  responses={matrixResponses}
                  onResponse={handleMatrixResponse}
                  onNext={nextStep}
                  onPrev={prevStep}
                  canProceed={canProceed()}
                />
              )}

              {step.type === 'results' && userProfile && (
                <ResultsStep profile={userProfile} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function WelcomeStep({ onNext, completionCount }: { onNext: () => void, completionCount: number }) {
  return (
    <div className="text-center">
      <StaggerContainer>
        <StaggerItem>
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.6)]">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-purple-200 to-slate-300 bg-clip-text text-transparent">
              Your AI Intelligence Journey Begins
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A comprehensive assessment designed to create your personalized pathway to AI mastery.
              Discover your persona, identify your goals, and receive custom recommendations.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 text-slate-400 mb-12">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm">
                <span className="font-semibold text-white">{completionCount.toLocaleString()}</span> people have discovered their AI intelligence profile
              </span>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <GlassmorphicCard variant="luxury" className="p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">What You'll Discover</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-100 mb-2">Your AI Persona</h3>
                <p className="text-sm text-slate-400">Creator, Executive, Family Leader, or Technical Practitioner</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-100 mb-2">Experience Level</h3>
                <p className="text-sm text-slate-400">Your current AI maturity and growth pathway</p>
              </div>
              <div className="text-center">
                <Lightbulb className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-100 mb-2">Custom Roadmap</h3>
                <p className="text-sm text-slate-400">Personalized recommendations and next steps</p>
              </div>
            </div>
          </GlassmorphicCard>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
              <div className="text-sm text-slate-400">Quick Steps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">3-5</div>
              <div className="text-sm text-slate-400">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">Instant</div>
              <div className="text-sm text-slate-400">Results</div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="text-center">
            <GlowPulse color="purple">
              <PremiumButton
                variant="luxury"
                size="lg"
                onClick={onNext}
                className="px-12 py-4"
              >
                Begin Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </PremiumButton>
            </GlowPulse>
            <p className="text-sm text-slate-500 mt-4">Completely free • No email required to start • Save your results</p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}

function QuestionStep({
  step,
  responses,
  onOptionSelect,
  onNext,
  onPrev,
  canProceed,
  currentStep
}: {
  step: AssessmentStep
  responses: Record<string, any>
  onOptionSelect: (questionId: string, optionId: string, scores: Record<string, number>) => void
  onNext: () => void
  onPrev: () => void
  canProceed: boolean
  currentStep: number
}) {
  const question = step.questions?.[0]
  if (!question) return null

  return (
    <div>
      <RevealAnimation>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-purple-200 bg-clip-text text-transparent">
            {step.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {step.description}
          </p>
        </div>
      </RevealAnimation>

      <GlassmorphicCard variant="premium" className="p-8 mb-8">
        <h3 className="text-2xl font-semibold mb-8 text-center text-slate-100">
          {question.text}
        </h3>

        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => onOptionSelect(question.id, option.id, option.scores)}
              className={cn(
                'p-6 rounded-xl border-2 transition-all duration-200 text-left',
                'hover:border-purple-500/50 hover:bg-purple-500/10',
                responses[question.id]?.optionId === option.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-slate-700 bg-slate-800/30'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center',
                  responses[question.id]?.optionId === option.id
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-slate-500'
                )}>
                  {responses[question.id]?.optionId === option.id && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 mb-2">{option.text}</h4>
                  {option.description && (
                    <p className="text-slate-400 text-sm">{option.description}</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </GlassmorphicCard>

      <div className="flex justify-between items-center">
        <PremiumButton
          variant="ghost"
          onClick={onPrev}
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous
        </PremiumButton>

        <span className="text-slate-500 text-sm">
          Step {currentStep + 1} of {assessmentSteps.length}
        </span>

        <PremiumButton
          variant="primary"
          onClick={onNext}
          disabled={!canProceed}
          className={!canProceed ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Next
          <ArrowRight className="w-5 h-5 ml-2" />
        </PremiumButton>
      </div>
    </div>
  )
}

function MatrixStep({
  step,
  responses,
  onResponse,
  onNext,
  onPrev,
  canProceed
}: {
  step: AssessmentStep
  responses: Record<string, string>
  onResponse: (row: string, column: string) => void
  onNext: () => void
  onPrev: () => void
  canProceed: boolean
}) {
  const matrix = step.matrix
  if (!matrix) return null

  return (
    <div>
      <RevealAnimation>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-purple-200 bg-clip-text text-transparent">
            {step.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {step.description}
          </p>
        </div>
      </RevealAnimation>

      <GlassmorphicCard variant="premium" className="p-8 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center text-slate-100">
          {matrix.title}
        </h3>
        <p className="text-slate-400 text-center mb-8">{matrix.description}</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 text-slate-300 font-medium"></th>
                {matrix.columns.map((col) => (
                  <th key={col} className="text-center p-3 text-slate-300 font-medium min-w-[60px]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((row, rowIndex) => (
                <tr key={row} className="border-t border-slate-700/30">
                  <td className="p-3 text-slate-200 font-medium">{row}</td>
                  {matrix.columns.map((col) => (
                    <td key={`${row}-${col}`} className="p-3 text-center">
                      <button
                        onClick={() => onResponse(row, col)}
                        className={cn(
                          'w-10 h-10 rounded-full border-2 transition-all duration-200',
                          responses[row] === col
                            ? 'border-purple-500 bg-purple-500 text-white'
                            : 'border-slate-600 hover:border-purple-400 hover:bg-purple-400/20'
                        )}
                      >
                        {col}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassmorphicCard>

      <div className="flex justify-between items-center">
        <PremiumButton variant="ghost" onClick={onPrev}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous
        </PremiumButton>

        <span className="text-slate-500 text-sm">
          {Object.keys(responses).length} of {matrix.rows.length} completed
        </span>

        <PremiumButton
          variant="primary"
          onClick={onNext}
          disabled={!canProceed}
          className={!canProceed ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Generate Results
          <ArrowRight className="w-5 h-5 ml-2" />
        </PremiumButton>
      </div>
    </div>
  )
}

function ResultsStep({ profile }: { profile: UserProfile }) {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const getPersonaInfo = (persona: UserProfile['persona']) => {
    const info = {
      creator: {
        title: 'The Creative Innovator',
        description: 'You use AI to amplify your creative output and build compelling content that resonates with your audience.',
        icon: Lightbulb,
        color: 'from-orange-500 to-red-500',
        recommendations: [
          'Start with the Creative AI Toolkit for foundational workflows',
          'Explore Suno Music Mastery for creative audio content',
          'Join our Creator Circle community for ongoing inspiration',
          'Consider the Agent Architecture for scaling your operations'
        ]
      },
      executive: {
        title: 'The Strategic Leader',
        description: 'You leverage AI to make better decisions, optimize operations, and lead your organization into the future.',
        icon: Target,
        color: 'from-blue-500 to-indigo-500',
        recommendations: [
          'Begin with Agent Architecture Blueprint for systematic implementation',
          'Use our ROI Calculator to build business cases',
          'Access Executive AI Strategy templates',
          'Join leadership mastermind sessions'
        ]
      },
      family: {
        title: 'The Creative Guardian',
        description: 'You guide your family through the AI era with wisdom, ensuring safe and beneficial technology adoption.',
        icon: Shield,
        color: 'from-green-500 to-emerald-500',
        recommendations: [
          'Start with our Family AI Safety Guide',
          'Use age-appropriate AI education resources',
          'Create family AI usage policies',
          'Connect with other conscious parents'
        ]
      },
      practitioner: {
        title: 'The Technical Pioneer',
        description: 'You push the boundaries of what\'s possible with AI, implementing cutting-edge solutions and sharing knowledge.',
        icon: Brain,
        color: 'from-purple-500 to-violet-500',
        recommendations: [
          'Dive into advanced Agent Architecture patterns',
          'Contribute to our open-source initiatives',
          'Apply for our Technical Advisory Board',
          'Lead workshops in our community'
        ]
      },
      hybrid: {
        title: 'The Multifaceted Leader',
        description: 'You wear multiple hats and need flexible AI solutions that adapt to your various roles and responsibilities.',
        icon: Star,
        color: 'from-cyan-500 to-purple-500',
        recommendations: [
          'Start with our comprehensive assessment',
          'Access all product tiers with our hybrid discount',
          'Join cross-functional community groups',
          'Get personalized coaching sessions'
        ]
      }
    }
    return info[persona]
  }

  const personaInfo = getPersonaInfo(profile.persona)

  return (
    <div>
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-12">
            <div className={cn('w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.6)]', personaInfo.color)}>
              <personaInfo.icon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-100 via-purple-200 to-slate-300 bg-clip-text text-transparent">
              You are {personaInfo.title}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              {personaInfo.description}
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <GlassmorphicCard variant="luxury" className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-slate-100 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-purple-400" />
                Your Learning Path
              </h3>
              <div className="space-y-4">
                {personaInfo.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-purple-300">{index + 1}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard variant="luxury" className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-slate-100 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
                Your Experience Level
              </h3>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 capitalize">{profile.experience}</span>
                  <span className="text-slate-400 text-sm">
                    {profile.experience === 'beginner' ? '25%' :
                     profile.experience === 'intermediate' ? '65%' : '90%'}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: profile.experience === 'beginner' ? '25%' :
                             profile.experience === 'intermediate' ? '65%' : '90%'
                    }}
                  />
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Based on your responses, we've calibrated your starting point to ensure optimal learning progression.
              </p>
            </GlassmorphicCard>
          </div>
        </StaggerItem>

        {/* Social Share */}
        <StaggerItem>
          <GlassmorphicCard variant="luxury" className="p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5 text-purple-400" />
              Share Your Results
            </h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  const text = `I just discovered I'm ${personaInfo.title}! Take the AI Intelligence Assessment at FrankX.AI`
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://frankx.ai/assessment/advanced')}`, '_blank')
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => {
                  const subject = 'Check out my AI Intelligence Assessment'
                  const body = `I just completed the AI Intelligence Assessment and discovered I'm ${personaInfo.title}!\n\nDiscover your AI persona: https://frankx.ai/assessment/advanced`
                  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                aria-label="Share via Email"
              >
                <Mail className="w-5 h-5 text-white" />
              </button>
            </div>
          </GlassmorphicCard>
        </StaggerItem>

        <StaggerItem>
          <div className="text-center space-y-8">
            <h3 className="text-2xl font-semibold text-slate-100">Ready to Begin Your Journey?</h3>

            {/* Email Capture */}
            <GlassmorphicCard variant="luxury" className="p-8 max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-slate-100 mb-4">Get Your Detailed Report</h4>
              <p className="text-slate-300 mb-6">
                Receive a comprehensive PDF with your persona analysis, custom workflows, and step-by-step action plan.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none"
                />
                <button className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1">
                  <Download className="mr-2 h-5 w-5" />
                  Send My Detailed Report
                </button>
                <p className="text-xs text-slate-500">
                  Optional. You can explore recommendations above without email.
                </p>
              </div>
            </GlassmorphicCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GlowPulse color="purple">
                <PremiumButton
                  variant="luxury"
                  size="lg"
                  href="/products"
                  className="px-8 py-4"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </PremiumButton>
              </GlowPulse>
              <PremiumButton
                variant="ghost"
                size="lg"
                href="/contact"
                className="px-8 py-4"
              >
                Talk to an Expert
              </PremiumButton>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}