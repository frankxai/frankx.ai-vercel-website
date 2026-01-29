'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassmorphicCard } from '@/components/glassmorphic-card'
import { PremiumButton } from '@/components/premium-button'
import progressData from '@/data/progress-tracker.json'

// Types
type PillarKey = 'energy' | 'mind' | 'craft' | 'flow' | 'prosperity' | 'connection' | 'purpose'

interface AssessmentAnswer {
  questionId: string
  pillar: PillarKey
  score: number
}

interface AssessmentResults {
  answers: AssessmentAnswer[]
  pillarScores: Record<PillarKey, number>
  totalScore: number
  archetype: {
    name: string
    description: string
    strengths: string
    nextSteps: string
    emoji: string
  }
}

export default function ProgressTrackerPage() {
  const [view, setView] = useState<'showcase' | 'assessment' | 'results'>('showcase')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [results, setResults] = useState<AssessmentResults | null>(null)

  // Calculate archetype based on total score
  const calculateArchetype = (totalScore: number) => {
    for (const [key, archetype] of Object.entries(progressData.archetypes)) {
      if (totalScore >= archetype.range[0] && totalScore <= archetype.range[1]) {
        return archetype
      }
    }
    return progressData.archetypes.awakening_creator // fallback
  }

  // Handle answer selection
  const handleAnswer = (questionId: string, pillar: PillarKey, score: number) => {
    const newAnswer = { questionId, pillar, score }
    const newAnswers = [...answers.filter(a => a.questionId !== questionId), newAnswer]
    setAnswers(newAnswers)

    // Auto-advance to next question
    if (currentQuestion < progressData.assessment.questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      // Calculate results
      setTimeout(() => {
        const pillarScores = {} as Record<PillarKey, number>
        newAnswers.forEach(answer => {
          pillarScores[answer.pillar] = answer.score
        })

        const totalScore = Object.values(pillarScores).reduce((sum, score) => sum + score, 0)
        const archetype = calculateArchetype(totalScore)

        setResults({
          answers: newAnswers,
          pillarScores,
          totalScore,
          archetype
        })
        setView('results')
      }, 300)
    }
  }

  // Reset assessment
  const resetAssessment = () => {
    setView('showcase')
    setCurrentQuestion(0)
    setAnswers([])
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <AnimatePresence mode="wait">
          {view === 'showcase' && (
            <ShowcaseView key="showcase" onStartAssessment={() => setView('assessment')} />
          )}

          {view === 'assessment' && (
            <AssessmentView
              key="assessment"
              currentQuestion={currentQuestion}
              answers={answers}
              onAnswer={handleAnswer}
              onBack={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setView('showcase')}
            />
          )}

          {view === 'results' && results && (
            <ResultsView
              key="results"
              results={results}
              onReset={resetAssessment}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ============================================================================
// SHOWCASE VIEW - Frank's Real Progress
// ============================================================================

function ShowcaseView({ onStartAssessment }: { onStartAssessment: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          The 7 Pillars Journey
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
          Real progress across Energy, Mind, Craft, Flow, Prosperity, Connection, and Purpose.
        </p>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          This isn't fake gamification—every stat below is real, documented, and verifiable.
          Then take the assessment to discover where YOU are on this journey.
        </p>
        <div className="text-sm text-slate-500">
          Last updated: {progressData.frankStats.lastUpdated}
        </div>
      </motion.div>

      {/* Frank's Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(progressData.frankStats.pillars).map(([key, pillar], index) => (
          <PillarShowcaseCard
            key={key}
            pillar={pillar}
            index={index}
          />
        ))}
      </div>

      {/* CTA to Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center space-y-6 py-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Where are <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">YOU</span> on this journey?
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Take the 7 Pillars Self-Assessment to discover your creator archetype,
          identify your strengths, and get personalized next steps.
        </p>
        <PremiumButton
          onClick={onStartAssessment}
          variant="primary"
          size="lg"
          className="text-lg px-12 py-6"
        >
          Start Your Assessment
        </PremiumButton>
        <p className="text-sm text-slate-500">
          7 questions · 3 minutes · Get your results instantly
        </p>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// PILLAR SHOWCASE CARD
// ============================================================================

function PillarShowcaseCard({ pillar, index }: { pillar: any; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassmorphicCard
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer hover:border-slate-600 transition-all duration-300 h-full"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{pillar.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{pillar.name}</h3>
                <div className={`text-xs font-medium bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                  {progressData.frankStats.pillars[pillar.name.toLowerCase() as PillarKey]?.stats.length} metrics tracked
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-400"
            >
              ▼
            </motion.div>
          </div>

          {/* Stats Preview */}
          <div className="space-y-3">
            {pillar.stats.slice(0, expanded ? undefined : 2).map((stat: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{stat.metric}</span>
                  {stat.verifiable && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-slate-500">{stat.context}</span>
                </div>
                {stat.source && (
                  <div className="text-xs text-slate-600">Source: {stat.source}</div>
                )}
              </div>
            ))}
          </div>

          {/* Journey Text (when expanded) */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-slate-700"
              >
                <p className="text-sm text-slate-300 italic">
                  "{pillar.journey}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/Collapse hint */}
          {!expanded && pillar.stats.length > 2 && (
            <div className="text-xs text-slate-500 text-center">
              Click to see {pillar.stats.length - 2} more metrics
            </div>
          )}
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}

// ============================================================================
// ASSESSMENT VIEW
// ============================================================================

function AssessmentView({
  currentQuestion,
  answers,
  onAnswer,
  onBack
}: {
  currentQuestion: number
  answers: AssessmentAnswer[]
  onAnswer: (questionId: string, pillar: PillarKey, score: number) => void
  onBack: () => void
}) {
  const question = progressData.assessment.questions[currentQuestion]
  const totalQuestions = progressData.assessment.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-white">
          7 Pillars Self-Assessment
        </h1>
        <p className="text-slate-400">{progressData.assessment.instructions}</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <GlassmorphicCard>
            <div className="space-y-6">
              {/* Pillar Badge */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {(progressData.frankStats.pillars as Record<string, { icon: string; name: string; color: string }>)[question.pillar]?.icon}
                </div>
                <div>
                  <div className="text-sm text-slate-400">
                    {(progressData.frankStats.pillars as Record<string, { icon: string; name: string; color: string }>)[question.pillar]?.name}
                  </div>
                  <div className={`text-xs font-medium bg-gradient-to-r ${(progressData.frankStats.pillars as Record<string, { icon: string; name: string; color: string }>)[question.pillar]?.color} bg-clip-text text-transparent`}>
                    Pillar {currentQuestion + 1}
                  </div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-white">
                {question.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option: any, index: number) => (
                  <motion.button
                    key={index}
                    onClick={() => onAnswer(question.id, question.pillar as PillarKey, option.score)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-4 rounded-xl border-2 border-slate-700 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200 group-hover:text-white transition-colors">
                        {option.text}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">
                          {option.score}/5
                        </span>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 group-hover:from-blue-500 group-hover:to-purple-500 transition-all" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================================================
// RESULTS VIEW
// ============================================================================

function ResultsView({
  results,
  onReset
}: {
  results: AssessmentResults
  onReset: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto space-y-12"
    >
      {/* Archetype Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="text-8xl">{results.archetype.emoji}</div>
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {results.archetype.name}
          </h1>
          <div className="text-xl text-slate-400">
            Total Score: {results.totalScore}/35
          </div>
        </div>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {results.archetype.description}
        </p>
      </motion.div>

      {/* Pillar Scores */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white text-center">Your Pillar Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(results.pillarScores).map(([pillar, score], index) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PillarScoreCard pillar={pillar as PillarKey} score={score} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <GlassmorphicCard>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Your Strengths</h3>
          <p className="text-slate-300">{results.archetype.strengths}</p>

          <h3 className="text-2xl font-bold text-white mt-6">Recommended Next Steps</h3>
          <p className="text-slate-300">{results.archetype.nextSteps}</p>
        </div>
      </GlassmorphicCard>

      {/* Personalized Recommendations */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Personalized Resources for You
        </h2>
        <RecommendationsGrid pillarScores={results.pillarScores} />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <PremiumButton onClick={onReset} variant="secondary">
          Retake Assessment
        </PremiumButton>
        <PremiumButton href="https://frankx.ck.page/creation-chronicles" variant="primary">
          Join Creation Chronicles
        </PremiumButton>
      </div>
    </motion.div>
  )
}

// ============================================================================
// PILLAR SCORE CARD
// ============================================================================

function PillarScoreCard({ pillar, score }: { pillar: PillarKey; score: number }) {
  const pillarData = progressData.frankStats.pillars[pillar]
  const percentage = (score / 5) * 100

  return (
    <GlassmorphicCard className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{pillarData.icon}</span>
            <span className="font-semibold text-white">{pillarData.name}</span>
          </div>
          <span className="text-2xl font-bold text-white">{score}/5</span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${pillarData.color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        <div className="text-sm text-slate-400">
          {score === 5 && "Exceptional! You're crushing it in this pillar."}
          {score === 4 && "Strong foundation with room for mastery."}
          {score === 3 && "Solid progress, keep building momentum."}
          {score === 2 && "Early stages, focus on consistency here."}
          {score === 1 && "Great opportunity for growth and transformation."}
        </div>
      </div>
    </GlassmorphicCard>
  )
}

// ============================================================================
// RECOMMENDATIONS GRID
// ============================================================================

function RecommendationsGrid({ pillarScores }: { pillarScores: Record<PillarKey, number> }) {
  // Find 2-3 lowest scoring pillars to recommend resources for
  const lowestPillars = Object.entries(pillarScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([pillar]) => pillar as PillarKey)

  const recommendations: any[] = []

  lowestPillars.forEach(pillar => {
    const pillarRecs = progressData.recommendations[pillar]
    const score = pillarScores[pillar]

    // Low scores get low recommendations, medium get medium, high get high
    const level = score <= 2 ? 'low' : score <= 3 ? 'medium' : 'high'
    const recs = pillarRecs[level] || pillarRecs.low

    recs.forEach((rec: any) => {
      recommendations.push({
        ...rec,
        pillar,
        pillarData: progressData.frankStats.pillars[pillar]
      })
    })
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((rec, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassmorphicCard className="h-full hover:border-slate-500 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{rec.pillarData.icon}</span>
                <div className={`text-xs font-semibold px-2 py-1 rounded bg-gradient-to-r ${rec.pillarData.color} bg-clip-text text-transparent border border-slate-700`}>
                  {rec.pillarData.name}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white">{rec.title}</h4>
                <div className="text-xs text-slate-500 capitalize">{rec.type}</div>
              </div>

              <p className="text-sm text-slate-400">{rec.description}</p>

              <PremiumButton
                href={rec.url}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                {rec.type === 'free' ? 'Get Free Resource' :
                 rec.type === 'blog' ? 'Read Article' :
                 rec.type === 'course' ? 'View Course' :
                 rec.type === 'product' ? 'Explore Product' :
                 rec.type === 'community' ? 'Join Community' :
                 'Learn More'}
              </PremiumButton>
            </div>
          </GlassmorphicCard>
        </motion.div>
      ))}
    </div>
  )
}
