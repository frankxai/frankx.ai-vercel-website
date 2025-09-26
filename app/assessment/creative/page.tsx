'use client'

import { ArrowLeft, ArrowRight, Brain, CheckCircle2, Lightbulb, Music, Palette, Play, Sparkles, Target, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

const questions = [
  {
    id: 1,
    category: 'Creative Process',
    question: 'How do you currently approach content creation?',
    options: [
      { value: 'manual', label: 'Primarily manual creation with traditional tools', score: 1 },
      { value: 'some-ai', label: 'Some AI assistance for specific tasks', score: 2 },
      { value: 'integrated', label: 'AI integrated into creative workflow', score: 3 },
      { value: 'advanced', label: 'Advanced AI-human collaboration systems', score: 4 }
    ]
  },
  {
    id: 2,
    category: 'Content Strategy',
    question: 'What are your primary content creation challenges?',
    options: [
      { value: 'volume', label: 'Need to create more content faster', score: 3 },
      { value: 'quality', label: 'Maintaining quality while scaling', score: 4 },
      { value: 'consistency', label: 'Brand voice consistency across content', score: 2 },
      { value: 'ideation', label: 'Coming up with new ideas regularly', score: 1 }
    ]
  },
  {
    id: 3,
    category: 'Tools',
    question: 'Which AI creative tools do you currently use?',
    options: [
      { value: 'none', label: 'No AI creative tools currently', score: 1 },
      { value: 'basic', label: 'Basic tools like Canva AI or ChatGPT', score: 2 },
      { value: 'specialized', label: 'Specialized tools like Midjourney, Runway', score: 3 },
      { value: 'comprehensive', label: 'Comprehensive AI creative suite', score: 4 }
    ]
  },
  {
    id: 4,
    category: 'Brand Consistency',
    question: 'How do you maintain brand consistency in AI-generated content?',
    options: [
      { value: 'manual-review', label: 'Manual review and editing of all AI outputs', score: 2 },
      { value: 'style-guides', label: 'Use brand style guides and prompts', score: 3 },
      { value: 'custom-models', label: 'Custom-trained models for brand voice', score: 4 },
      { value: 'no-system', label: 'No systematic approach currently', score: 1 }
    ]
  },
  {
    id: 5,
    category: 'Monetization',
    question: 'How important is scaling content creation to your revenue goals?',
    options: [
      { value: 'critical', label: 'Critical - content creation directly drives revenue', score: 4 },
      { value: 'important', label: 'Important for marketing and growth', score: 3 },
      { value: 'moderate', label: 'Moderately important for brand building', score: 2 },
      { value: 'low', label: 'Low priority compared to other initiatives', score: 1 }
    ]
  }
]

const categories = [
  { name: 'Creative Process', color: 'from-purple-500 to-pink-500', icon: Palette },
  { name: 'Content Strategy', color: 'from-cyan-500 to-blue-500', icon: Target },
  { name: 'Tools', color: 'from-emerald-500 to-green-500', icon: Wand2 },
  { name: 'Brand Consistency', color: 'from-yellow-500 to-orange-500', icon: Sparkles },
  { name: 'Monetization', color: 'from-red-500 to-pink-500', icon: Brain }
]

export default function CreativeAIAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum: number, answer: any) => sum + answer.score, 0)
    const maxScore = questions.length * 4
    const percentage = Math.round((totalScore / maxScore) * 100)

    let level, description, recommendations

    if (percentage >= 80) {
      level = 'Advanced Creative AI Practitioner'
      description = 'You have sophisticated AI creative workflows with strong brand consistency and strategic implementation.'
      recommendations = [
        'Explore cutting-edge AI creative tools and techniques',
        'Consider building custom AI models for your specific brand',
        'Share your expertise through thought leadership content',
        'Investigate emerging creative AI technologies'
      ]
    } else if (percentage >= 60) {
      level = 'Intermediate Creative AI User'
      description = 'You have good AI creative foundations but opportunities exist to optimize workflows and scaling.'
      recommendations = [
        'Develop more systematic approaches to AI content creation',
        'Implement brand consistency frameworks',
        'Explore advanced AI creative tools and platforms',
        'Create standard operating procedures for AI workflows'
      ]
    } else if (percentage >= 40) {
      level = 'Emerging Creative AI Adopter'
      description = 'You\'re beginning to integrate AI into creative processes with room for significant growth.'
      recommendations = [
        'Start with user-friendly AI creative tools',
        'Develop clear brand guidelines for AI content',
        'Focus on one content type to build expertise',
        'Measure and track AI content performance'
      ]
    } else {
      level = 'Creative AI Beginner'
      description = 'You have significant opportunities to leverage AI for creative content and workflow enhancement.'
      recommendations = [
        'Begin with basic AI writing and design tools',
        'Take a creative AI foundations course',
        'Start with AI assistance for ideation and drafts',
        'Build familiarity with AI creative capabilities'
      ]
    }

    return { level, description, recommendations, score: percentage }
  }

  if (showResults) {
    const results = calculateResults()

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navigation />
        <main className="px-6 pt-28 pb-20">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Results Header */}
            <header className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-purple-300">
                <Sparkles className="h-5 w-5" />
                Assessment Complete
              </div>
              <h1 className="text-4xl font-bold text-white">Your Creative AI Assessment Results</h1>
            </header>

            {/* Score Display */}
            <section className="text-center py-12 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-slate-900 to-slate-950">
              <div className="w-32 h-32 rounded-full border-8 border-purple-500 flex items-center justify-center mx-auto mb-8 relative">
                <div className="text-4xl font-bold text-white">{results.score}%</div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{results.level}</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">{results.description}</p>
            </section>

            {/* Recommendations */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-white text-center">Personalized Recommendations</h2>
              <div className="grid gap-6">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Next Steps */}
            <section className="text-center space-y-8 py-16 px-8 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-slate-900 to-slate-950">
              <h2 className="text-3xl font-bold text-white">Ready to Transform Your Creative Process?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Take the next step in your creative AI journey with our specialized tools and guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/creation-chronicles"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Creation Chronicles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/products/vibe-os"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10"
                >
                  Try Vibe OS
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const selectedAnswer = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <header className="space-y-6">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/assessment" className="hover:text-white transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Assessment Center
              </Link>
              <ArrowRight className="w-4 h-4" />
              <span>Creative AI Assessment</span>
            </nav>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-purple-300">
                <Palette className="h-5 w-5" />
                Creative AI Assessment
              </div>
              <h1 className="text-4xl font-bold text-white">Evaluate Your Creative AI Readiness</h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Specialized assessment for creators and content-focused organizations
              </p>
            </div>
          </header>

          {/* Progress */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5">
              <span className="text-white/70 text-sm">Progress:</span>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-white text-sm font-semibold">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          </div>

          {/* Question */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 text-sm font-semibold">
                {currentQ.category}
              </div>
              <h2 className="text-3xl font-bold text-white">{currentQ.question}</h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQ.id, option)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    selectedAnswer?.value === option.value
                      ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{option.label}</span>
                    {selectedAnswer?.value === option.value && (
                      <CheckCircle2 className="w-6 h-6 text-purple-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between max-w-2xl mx-auto pt-8">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white/90 font-semibold transition-all duration-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={!selectedAnswer}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}