'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Star, Target, Brain, Zap, Shield, Users, BarChart3, Lightbulb, Rocket, Award, Download, Share2, Twitter, Linkedin, Mail } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface AssessmentQuestion {
  id: string
  category: string
  question: string
  options: {
    value: number
    label: string
    description?: string
  }[]
}

interface AssessmentResults {
  overall: number
  categories: {
    readiness: number
    strategy: number
    implementation: number
    governance: number
    culture: number
  }
  recommendations: string[]
  nextSteps: string[]
}

const questions: AssessmentQuestion[] = [
  {
    id: 'current-usage',
    category: 'readiness',
    question: 'How frequently do you currently use AI tools in your work?',
    options: [
      { value: 1, label: 'Never', description: 'Haven\'t started using AI tools yet' },
      { value: 2, label: 'Rarely', description: 'Occasional experimentation' },
      { value: 3, label: 'Weekly', description: 'Regular but limited usage' },
      { value: 4, label: 'Daily', description: 'Integrated into daily workflows' },
      { value: 5, label: 'Multiple times daily', description: 'AI is central to my work' }
    ]
  },
  {
    id: 'ai-knowledge',
    category: 'readiness',
    question: 'How would you rate your understanding of AI capabilities and limitations?',
    options: [
      { value: 1, label: 'Beginner', description: 'Basic awareness of AI concepts' },
      { value: 2, label: 'Novice', description: 'Some understanding of common AI tools' },
      { value: 3, label: 'Intermediate', description: 'Good grasp of AI applications' },
      { value: 4, label: 'Advanced', description: 'Deep understanding of AI systems' },
      { value: 5, label: 'Expert', description: 'Comprehensive AI knowledge' }
    ]
  },
  {
    id: 'strategy-clarity',
    category: 'strategy',
    question: 'How clear is your AI strategy and goals?',
    options: [
      { value: 1, label: 'No strategy', description: 'Haven\'t defined AI goals yet' },
      { value: 2, label: 'Vague ideas', description: 'Some thoughts but not documented' },
      { value: 3, label: 'Basic plan', description: 'High-level goals identified' },
      { value: 4, label: 'Detailed strategy', description: 'Clear roadmap and milestones' },
      { value: 5, label: 'Comprehensive plan', description: 'Full strategic framework with KPIs' }
    ]
  },
  {
    id: 'business-impact',
    category: 'strategy',
    question: 'What level of business impact do you expect from AI implementation?',
    options: [
      { value: 1, label: 'Minimal', description: 'Small efficiency gains' },
      { value: 2, label: 'Moderate', description: 'Noticeable productivity improvements' },
      { value: 3, label: 'Significant', description: 'Measurable business outcomes' },
      { value: 4, label: 'Transformational', description: 'Major process changes' },
      { value: 5, label: 'Revolutionary', description: 'Complete business model transformation' }
    ]
  },
  {
    id: 'implementation-approach',
    category: 'implementation',
    question: 'What\'s your approach to AI implementation?',
    options: [
      { value: 1, label: 'Ad-hoc', description: 'Random tool experimentation' },
      { value: 2, label: 'Individual', description: 'Personal productivity focus' },
      { value: 3, label: 'Team-based', description: 'Small group initiatives' },
      { value: 4, label: 'Systematic', description: 'Organized rollout plan' },
      { value: 5, label: 'Enterprise-wide', description: 'Comprehensive organizational transformation' }
    ]
  },
  {
    id: 'technical-readiness',
    category: 'implementation',
    question: 'How would you rate your technical infrastructure for AI?',
    options: [
      { value: 1, label: 'Basic', description: 'Standard office tools only' },
      { value: 2, label: 'Limited', description: 'Some cloud services and APIs' },
      { value: 3, label: 'Moderate', description: 'Good digital infrastructure' },
      { value: 4, label: 'Advanced', description: 'Modern tech stack with integrations' },
      { value: 5, label: 'Cutting-edge', description: 'AI-ready infrastructure and platforms' }
    ]
  },
  {
    id: 'governance-practices',
    category: 'governance',
    question: 'What governance practices do you have for AI usage?',
    options: [
      { value: 1, label: 'None', description: 'No guidelines or oversight' },
      { value: 2, label: 'Informal', description: 'Basic awareness of risks' },
      { value: 3, label: 'Guidelines', description: 'Written policies for AI use' },
      { value: 4, label: 'Framework', description: 'Comprehensive governance structure' },
      { value: 5, label: 'Mature', description: 'Full compliance and risk management' }
    ]
  },
  {
    id: 'ethical-considerations',
    category: 'governance',
    question: 'How do you handle ethical considerations in AI implementation?',
    options: [
      { value: 1, label: 'Unaware', description: 'Haven\'t considered ethical implications' },
      { value: 2, label: 'Basic awareness', description: 'Know there are ethical concerns' },
      { value: 3, label: 'Guidelines', description: 'Have basic ethical principles' },
      { value: 4, label: 'Framework', description: 'Structured ethical decision-making' },
      { value: 5, label: 'Comprehensive', description: 'Full ethical governance program' }
    ]
  },
  {
    id: 'team-readiness',
    category: 'culture',
    question: 'How ready is your team/organization for AI adoption?',
    options: [
      { value: 1, label: 'Resistant', description: 'Significant pushback and fear' },
      { value: 2, label: 'Skeptical', description: 'Cautious but open to learning' },
      { value: 3, label: 'Interested', description: 'Curious and willing to try' },
      { value: 4, label: 'Enthusiastic', description: 'Excited about AI potential' },
      { value: 5, label: 'Pioneering', description: 'Leading AI adoption efforts' }
    ]
  },
  {
    id: 'learning-culture',
    category: 'culture',
    question: 'How strong is your learning and experimentation culture?',
    options: [
      { value: 1, label: 'Risk-averse', description: 'Prefer proven, stable approaches' },
      { value: 2, label: 'Cautious', description: 'Careful evaluation before adoption' },
      { value: 3, label: 'Balanced', description: 'Mix of stability and innovation' },
      { value: 4, label: 'Experimental', description: 'Encourage trying new approaches' },
      { value: 5, label: 'Innovation-first', description: 'Constant experimentation and learning' }
    ]
  }
]

export default function AIAssessmentPage() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [completionCount] = useState(2847) // Social proof counter

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const categoryScores = {
      readiness: 0,
      strategy: 0,
      implementation: 0,
      governance: 0,
      culture: 0
    }

    const categoryTotals = {
      readiness: 0,
      strategy: 0,
      implementation: 0,
      governance: 0,
      culture: 0
    }

    questions.forEach(question => {
      const answer = answers[question.id] || 0
      const category = question.category as keyof typeof categoryScores
      categoryScores[category] += answer
      categoryTotals[category] += 5 // Max score per question
    })

    // Convert to percentages
    Object.keys(categoryScores).forEach(key => {
      const category = key as keyof typeof categoryScores
      categoryScores[category] = Math.round((categoryScores[category] / categoryTotals[category]) * 100)
    })

    const overall = Math.round(
      Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 5
    )

    const recommendations = generateRecommendations(overall, categoryScores)
    const nextSteps = generateNextSteps(overall, categoryScores)

    setResults({
      overall,
      categories: categoryScores,
      recommendations,
      nextSteps
    })
    setIsCompleted(true)
  }

  const generateRecommendations = (overall: number, categories: any) => {
    const recs = []

    if (overall < 40) {
      recs.push('Start with AI Fundamentals training to build foundational knowledge')
      recs.push('Begin with simple AI tools like ChatGPT for basic tasks')
      recs.push('Focus on personal productivity gains before team implementation')
    } else if (overall < 65) {
      recs.push('Develop a structured AI adoption roadmap for your team')
      recs.push('Invest in AI governance and ethical guidelines')
      recs.push('Consider Vibe OS for systematic music and creative AI workflows')
    } else {
      recs.push('You\'re ready for advanced AI implementations like Agentic Creator OS')
      recs.push('Consider becoming an AI transformation leader in your industry')
      recs.push('Explore enterprise-grade AI architecture and automation')
    }

    if (categories.governance < 50) {
      recs.push('Prioritize AI governance and ethical framework development')
    }
    if (categories.culture < 50) {
      recs.push('Focus on change management and team AI readiness')
    }

    return recs
  }

  const generateNextSteps = (overall: number, categories: any) => {
    const steps = []

    if (overall < 40) {
      steps.push('Download our AI Implementation Playbook')
      steps.push('Take our free AI Fundamentals course')
      steps.push('Join the AI Readiness community')
    } else if (overall < 65) {
      steps.push('Schedule a strategy session with our team')
      steps.push('Explore Vibe OS for creative AI workflows')
      steps.push('Implement AI governance framework')
    } else {
      steps.push('Book a consultation for Agentic Creator OS')
      steps.push('Join our Enterprise AI Leadership program')
      steps.push('Become a FrankX.AI transformation partner')
    }

    return steps
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ?.id]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Landing page before assessment starts
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cyan-300 mb-6">
                <Brain className="h-5 w-5" />
                AI Readiness Assessment
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Discover Your AI Readiness in{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2 Minutes
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get a personalized AI transformation roadmap based on your current capabilities,
                strategy, and organizational readiness.
              </p>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-12">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">
                  Join <span className="font-semibold text-white">{completionCount.toLocaleString()}</span> professionals who have discovered their AI readiness
                </span>
              </div>
            </motion.div>

            {/* What You'll Discover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">What You'll Discover</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Target className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Your AI Readiness Score</h3>
                    <p className="text-slate-300 text-sm">Comprehensive analysis across 5 key dimensions: readiness, strategy, implementation, governance, and culture</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Lightbulb className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Personalized Recommendations</h3>
                    <p className="text-slate-300 text-sm">Custom-tailored guidance based on your specific strengths and improvement opportunities</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Rocket className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Strategic Action Plan</h3>
                    <p className="text-slate-300 text-sm">Clear next steps to accelerate your AI transformation journey</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <BarChart3 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Category Breakdown</h3>
                    <p className="text-slate-300 text-sm">Detailed scores showing exactly where you excel and where to focus improvements</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{questions.length}</div>
                <div className="text-sm text-slate-300">Quick Questions</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold text-cyan-400 mb-2">2-3</div>
                <div className="text-sm text-slate-300">Minutes to Complete</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Instant</div>
                <div className="text-sm text-slate-300">Results & Roadmap</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <button
                onClick={() => setHasStarted(true)}
                className="inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Assessment
                <ArrowRight className="ml-2 h-6 w-6" />
              </button>
              <p className="text-sm text-slate-500 mt-4">
                No email required to start • Free forever • Get instant results
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Award className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Your AI Readiness Results</h1>
              <p className="text-xl text-slate-300">Based on your responses, here's your personalized AI transformation roadmap</p>
            </motion.div>

            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full border-8 border-slate-700 flex items-center justify-center mx-auto mb-4 relative">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      borderTopColor: results.overall >= 75 ? '#10b981' : results.overall >= 50 ? '#f59e0b' : '#ef4444',
                      transform: `rotate(${(results.overall / 100) * 360 - 90}deg)`
                    }}
                  />
                  <span className="text-3xl font-bold text-white">{results.overall}%</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">AI Readiness Score</h2>
                <p className="text-slate-400">
                  {results.overall >= 75 ? 'Advanced - Ready for complex AI implementations' :
                   results.overall >= 50 ? 'Intermediate - Good foundation for growth' :
                   'Beginner - Great potential for AI transformation'}
                </p>
              </div>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {Object.entries(results.categories).map(([category, score], index) => (
                <div key={category} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 capitalize">{category}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold">{score}%</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-cyan-400" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                  Next Steps
                </h3>
                <ul className="space-y-3">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Social Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center mb-12"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                Share Your Results
              </h3>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    const text = `I just scored ${results.overall}% on the AI Readiness Assessment! Discover your AI transformation roadmap at FrankX.AI`
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => {
                    const text = `I just scored ${results.overall}% on the AI Readiness Assessment! Discover your AI transformation roadmap.`
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://frankx.ai/ai-assessment')}`, '_blank')
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => {
                    const subject = 'Check out my AI Readiness Assessment results'
                    const body = `I just scored ${results.overall}% on the AI Readiness Assessment at FrankX.AI!\n\nDiscover your AI transformation roadmap: https://frankx.ai/ai-assessment`
                    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
                  aria-label="Share via Email"
                >
                  <Mail className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>

            {/* Product Recommendations Based on Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Recommended for You</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {results.overall < 40 && (
                  <>
                    <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl">
                      <h4 className="font-semibold text-white mb-2">AI Fundamentals Course</h4>
                      <p className="text-slate-300 text-sm mb-4">Build your AI foundation with expert guidance and hands-on practice</p>
                      <Link href="/products" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold inline-flex items-center">
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl">
                      <h4 className="font-semibold text-white mb-2">AI Readiness Community</h4>
                      <p className="text-slate-300 text-sm mb-4">Connect with others starting their AI journey and get support</p>
                      <Link href="/contact" className="text-purple-400 hover:text-purple-300 text-sm font-semibold inline-flex items-center">
                        Join Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </>
                )}
                {results.overall >= 40 && results.overall < 65 && (
                  <>
                    <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl">
                      <h4 className="font-semibold text-white mb-2">Vibe OS</h4>
                      <p className="text-slate-300 text-sm mb-4">Systematic AI workflows for creative professionals</p>
                      <Link href="/products/vibe-os" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold inline-flex items-center">
                        Explore Vibe OS <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl">
                      <h4 className="font-semibold text-white mb-2">AI Strategy Session</h4>
                      <p className="text-slate-300 text-sm mb-4">1-on-1 consultation to develop your AI implementation roadmap</p>
                      <Link href="/contact" className="text-purple-400 hover:text-purple-300 text-sm font-semibold inline-flex items-center">
                        Book Session <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </>
                )}
                {results.overall >= 65 && (
                  <>
                    <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl">
                      <h4 className="font-semibold text-white mb-2">Agentic Creator OS</h4>
                      <p className="text-slate-300 text-sm mb-4">Advanced AI architecture for enterprise transformation</p>
                      <Link href="/products/agentic-creator-os" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold inline-flex items-center">
                        Explore Agentic OS <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl">
                      <h4 className="font-semibold text-white mb-2">Enterprise Partnership</h4>
                      <p className="text-slate-300 text-sm mb-4">Custom AI solutions and transformation consulting</p>
                      <Link href="/contact" className="text-purple-400 hover:text-purple-300 text-sm font-semibold inline-flex items-center">
                        Get in Touch <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Newsletter Signup - Optional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-8 text-center"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Want Your Detailed Roadmap?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Get a personalized PDF report with detailed analysis, custom recommendations, and implementation timeline.
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex flex-col gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none"
                  />
                </div>

                <button className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1">
                  <Download className="mr-2 h-5 w-5" />
                  Send Me My Detailed Roadmap
                </button>
                <p className="text-xs text-slate-500 mt-3">
                  Optional. You can explore recommendations above without providing email.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
            >
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm font-medium rounded-full mb-4 capitalize">
                  {currentQ.category}
                </span>
                <h2 className="text-2xl font-semibold text-white mb-6">{currentQ.question}</h2>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      currentAnswer === option.value
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white mb-1">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-slate-400">{option.description}</div>
                        )}
                      </div>
                      {currentAnswer === option.value && (
                        <CheckCircle className="w-6 h-6 text-cyan-400" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentQuestion === 0
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={!currentAnswer}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                !currentAnswer
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white hover:-translate-y-0.5'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}