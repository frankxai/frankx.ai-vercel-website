'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const pillars = ['Energy', 'Mind', 'Soul', 'Craft', 'Capital', 'Circle', 'Legacy']

const questions = [
  // Energy (3 questions)
  { pillar: 'Energy', text: 'I wake up feeling rested and energized most days', id: 1 },
  { pillar: 'Energy', text: 'I maintain consistent energy throughout the day', id: 2 },
  { pillar: 'Energy', text: 'I prioritize sleep, nutrition, and movement', id: 3 },
  // Mind (3 questions)
  { pillar: 'Mind', text: 'My mind feels clear and focused when I need it to be', id: 4 },
  { pillar: 'Mind', text: 'I can manage my emotions effectively under stress', id: 5 },
  { pillar: 'Mind', text: 'I actively learn and grow my knowledge regularly', id: 6 },
  // Soul (3 questions)
  { pillar: 'Soul', text: 'I have clarity on my core values and live by them', id: 7 },
  { pillar: 'Soul', text: 'I feel aligned with my purpose most of the time', id: 8 },
  { pillar: 'Soul', text: 'My actions reflect what truly matters to me', id: 9 },
  // Craft (3 questions)
  { pillar: 'Craft', text: 'I am actively developing and mastering my skills', id: 10 },
  { pillar: 'Craft', text: 'I create meaningful work that I am proud of', id: 11 },
  { pillar: 'Craft', text: 'I have a clear path to expertise in my domain', id: 12 },
  // Capital (3 questions)
  { pillar: 'Capital', text: 'I have financial stability and room to breathe', id: 13 },
  { pillar: 'Capital', text: 'My income supports my goals and lifestyle', id: 14 },
  { pillar: 'Capital', text: 'I am building assets and financial freedom', id: 15 },
  // Circle (3 questions)
  { pillar: 'Circle', text: 'I have deep, meaningful relationships in my life', id: 16 },
  { pillar: 'Circle', text: 'I am surrounded by people who support my growth', id: 17 },
  { pillar: 'Circle', text: 'I actively nurture my important relationships', id: 18 },
  // Legacy (3 questions)
  { pillar: 'Legacy', text: 'I have a clear vision for what I want to build', id: 19 },
  { pillar: 'Legacy', text: 'My daily actions contribute to my larger purpose', id: 20 },
  { pillar: 'Legacy', text: 'I am creating something that will outlast me', id: 21 },
]

const pillarColors: Record<string, string> = {
  Energy: 'from-red-500 to-orange-500',
  Mind: 'from-orange-500 to-amber-500',
  Soul: 'from-amber-500 to-yellow-500',
  Craft: 'from-green-500 to-emerald-500',
  Capital: 'from-blue-500 to-cyan-500',
  Circle: 'from-indigo-500 to-purple-500',
  Legacy: 'from-purple-500 to-pink-500',
}

export default function AssessmentPage() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const calculateScores = () => {
    const scores: Record<string, number> = {}

    pillars.forEach(pillar => {
      const pillarQuestions = questions.filter(q => q.pillar === pillar)
      const pillarAnswers = pillarQuestions.map(q => answers[q.id] || 0)
      const total = pillarAnswers.reduce((a, b) => a + b, 0)
      const max = pillarQuestions.length * 5
      scores[pillar] = Math.round((total / max) * 10)
    })

    return scores
  }

  const getLifeBookRecommendation = (scores: Record<string, number>) => {
    const soulScore = scores.Soul || 0
    const craftScore = scores.Craft || 0
    const mindScore = scores.Mind || 0

    if (craftScore >= soulScore && craftScore >= mindScore) {
      return { book: 'Life Symphony', path: '/soulbook/life-symphony', desc: 'For artists and creatives like you' }
    } else if (soulScore >= craftScore && soulScore >= mindScore) {
      return { book: 'Golden Path', path: '/soulbook/golden-path', desc: 'For seekers and visionaries like you' }
    } else {
      return { book: 'The 7 Pillars', path: '/soulbook/7-pillars', desc: 'For builders and architects like you' }
    }
  }

  const resetAssessment = () => {
    setStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const scores = calculateScores()
  const recommendation = getLifeBookRecommendation(scores)
  const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 7)

  // Intro screen
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-purple-900/20" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/soulbook"
              className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Soulbook
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="mb-6 text-4xl font-bold bg-gradient-to-r from-amber-200 via-slate-100 to-purple-200 bg-clip-text text-transparent sm:text-5xl">
                Soulbook Assessment
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
                Discover your pillar scores and find out which Life Book speaks to your soul.
                This free assessment takes about 3 minutes.
              </p>

              <GlassmorphicCard variant="luxury" border="glow" className="p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-200 mb-4">What you&apos;ll discover:</h2>
                <div className="grid gap-4 md:grid-cols-3 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-200">Your 7 Pillar Scores</p>
                      <p className="text-sm text-slate-400">See your strengths and growth areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-200">Your Life Book Match</p>
                      <p className="text-sm text-slate-400">Which framework fits you best</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-200">Your Next Steps</p>
                      <p className="text-sm text-slate-400">Personalized recommendations</p>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>

              <PremiumButton onClick={() => setStarted(true)} variant="primary" size="lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-purple-900/20" />

          <div className="relative mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-amber-200 via-slate-100 to-purple-200 bg-clip-text text-transparent">
                Your Soulbook Results
              </h1>
              <p className="text-slate-400">
                Overall Score: <span className="text-2xl font-bold text-amber-400">{overallScore}/10</span>
              </p>
            </motion.div>

            {/* Pillar Scores */}
            <GlassmorphicCard variant="luxury" border="glow" className="p-8 mb-8">
              <h2 className="text-xl font-semibold text-slate-200 mb-6">Your 7 Pillar Scores</h2>
              <div className="space-y-4">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{pillar}</span>
                      <span className="text-slate-400">{scores[pillar]}/10</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scores[pillar] * 10}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${pillarColors[pillar]} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassmorphicCard>

            {/* Life Book Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassmorphicCard variant="luxury" border="glow" className="p-8 mb-8 bg-gradient-to-br from-amber-950/30 to-slate-950">
                <h2 className="text-xl font-semibold text-slate-200 mb-4">Your Recommended Life Book</h2>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400 mb-2">{recommendation.book}</p>
                  <p className="text-slate-400 mb-6">{recommendation.desc}</p>
                  <PremiumButton href={recommendation.path} variant="primary" size="lg">
                    Explore {recommendation.book}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </PremiumButton>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumButton href="/soulbook/vault" variant="ghost" size="lg">
                Download Obsidian Vault
              </PremiumButton>
              <PremiumButton onClick={resetAssessment} variant="ghost" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Assessment
              </PremiumButton>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Quiz screen
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentPillar = questions[currentQuestion].pillar

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-purple-900/20" />

        <div className="relative mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>{currentPillar} Pillar</span>
              <span>{currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <GlassmorphicCard variant="luxury" border="glow" className="p-8">
                <p className="text-xl text-slate-200 mb-8 text-center leading-relaxed">
                  &quot;{questions[currentQuestion].text}&quot;
                </p>

                <div className="space-y-3">
                  {[
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-lg border transition-all duration-200 text-left
                        ${answers[questions[currentQuestion].id] === option.value
                          ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        <span className="text-sm text-slate-500">{option.value}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </GlassmorphicCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentQuestion > 0 && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="mt-6 text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous question
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
