'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Brain, Users, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const questions = [
  {
    id: 1,
    question: "When you're at your creative best, what energizes you most?",
    options: [
      { id: 'a', text: "Transforming something difficult into something beautiful", type: "alchemist" },
      { id: 'b', text: "Building systems that solve complex problems elegantly", type: "architect" },  
      { id: 'c', text: "Bringing different people and ideas together", type: "connector" },
      { id: 'd', text: "Exploring uncharted territories and pushing boundaries", type: "pioneer" }
    ]
  },
  {
    id: 2, 
    question: "What do people most often thank you for?",
    options: [
      { id: 'a', text: "Helping them heal, grow, or see their situation differently", type: "alchemist" },
      { id: 'b', text: "Creating clarity and organization from chaos", type: "architect" },
      { id: 'c', text: "Making them feel understood and connected", type: "connector" },
      { id: 'd', text: "Inspiring them to think bigger or try new approaches", type: "pioneer" }
    ]
  },
  {
    id: 3,
    question: "Your ideal creative project would:",
    options: [
      { id: 'a', text: "Turn personal struggles into wisdom that helps others", type: "alchemist" },
      { id: 'b', text: "Design an elegant system that scales to serve many people", type: "architect" },
      { id: 'c', text: "Create a space where meaningful connections can flourish", type: "connector" },
      { id: 'd', text: "Combine existing ideas in ways no one has thought of before", type: "pioneer" }
    ]
  },
  {
    id: 4,
    question: "When facing a creative challenge, your first instinct is to:",
    options: [
      { id: 'a', text: "Go deep into your experience and find the emotional truth", type: "alchemist" },
      { id: 'b', text: "Break it down into components and map the relationships", type: "architect" },
      { id: 'c', text: "Consider how different stakeholders would be affected", type: "connector" },
      { id: 'd', text: "Look for unconventional approaches from other domains", type: "pioneer" }
    ]
  },
  {
    id: 5,
    question: "Success for you means:",
    options: [
      { id: 'a', text: "Creating work that facilitates genuine transformation", type: "alchemist" },
      { id: 'b', text: "Building something beautiful, functional, and enduring", type: "architect" },
      { id: 'c', text: "Fostering authentic connections and community", type: "connector" },
      { id: 'd', text: "Expanding what's possible for yourself and others", type: "pioneer" }
    ]
  },
  {
    id: 6,
    question: "Your creative energy flows best when:",
    options: [
      { id: 'a', text: "Processing deep experiences into universal wisdom", type: "alchemist" },
      { id: 'b', text: "Designing systems that work seamlessly", type: "architect" },
      { id: 'c', text: "Facilitating collaboration and understanding", type: "connector" },
      { id: 'd', text: "Experimenting with new ideas and possibilities", type: "pioneer" }
    ]
  }
]

const frequencyTypes = {
  alchemist: {
    title: "The Alchemist",
    subtitle: "Transformation Frequency",
    description: "You transform pain into beauty, problems into solutions. Your creative gift is taking raw experiences and turning them into wisdom that helps others heal and grow.",
    traits: [
      "Natural healer and transformer",
      "Draws from personal experience to help others", 
      "Creates from a place of deep authenticity",
      "Helps others see beauty in their struggles"
    ],
    aiCollaboration: "Your best AI partnerships happen when you feed it your real experiences and let it help you find universal language for personal truths.",
    examples: "Artists who create from struggle to help others heal, therapists who use their journey to guide clients, writers who transform trauma into hope.",
    color: "from-red-500 to-pink-500",
    icon: Heart
  },
  architect: {
    title: "The Architect", 
    subtitle: "Systems Frequency",
    description: "You see patterns and build beautiful, functional systems that serve others. Your gift is organizing complexity into elegant solutions that scale.",
    traits: [
      "Systems thinker with aesthetic sense",
      "Builds beautiful, functional solutions",
      "Sees patterns others miss",
      "Creates order from chaos elegantly"
    ],
    aiCollaboration: "Your best AI collaborations happen when you use it to prototype complex visions and test system designs rapidly.",
    examples: "Entrepreneurs who create platforms organizing chaos into clarity, developers who build beautiful user experiences, consultants who design organizational systems.",
    color: "from-blue-500 to-indigo-500",
    icon: Brain
  },
  connector: {
    title: "The Connector",
    subtitle: "Harmony Frequency", 
    description: "You bring people together and create belonging. Your gift is seeing what connects us and building bridges between different perspectives and communities.",
    traits: [
      "Natural community builder",
      "Sees common ground in differences",
      "Creates spaces for authentic connection",
      "Facilitates understanding between groups"
    ],
    aiCollaboration: "Your best AI partnerships help you create content and experiences that foster genuine connection at scale.",
    examples: "Community builders who create spaces where people find their tribe, mediators who resolve conflicts, event planners who design meaningful gatherings.",
    color: "from-green-500 to-emerald-500", 
    icon: Users
  },
  pioneer: {
    title: "The Pioneer",
    subtitle: "Innovation Frequency",
    description: "You explore new frontiers and push boundaries. Your gift is seeing possibilities others don't and combining existing elements in revolutionary ways.",
    traits: [
      "Natural explorer and innovator",
      "Comfortable with uncertainty",
      "Combines ideas across domains",
      "Pushes beyond established limits"
    ],
    aiCollaboration: "Your best AI partnerships happen when you use it to explore creative territories that neither human nor AI could access alone.",
    examples: "Innovators who combine fields in novel ways, researchers exploring new territories, artists creating entirely new forms of expression.",
    color: "from-purple-500 to-pink-500",
    icon: Lightbulb
  }
}

export default function SoulFrequencyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')

  const handleAnswer = (questionId: number, answerType: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerType }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResult = () => {
    const typeCounts = { alchemist: 0, architect: 0, connector: 0, pioneer: 0 }
    Object.values(answers).forEach(type => {
      typeCounts[type as keyof typeof typeCounts]++
    })
    
    const dominantType = Object.entries(typeCounts).reduce((a, b) => 
      typeCounts[a[0] as keyof typeof typeCounts] > typeCounts[b[0] as keyof typeof typeCounts] ? a : b
    )[0] as keyof typeof frequencyTypes
    
    return frequencyTypes[dominantType]
  }

  const result = showResults ? calculateResult() : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quiz Header */}
              {currentQuestion === 0 && (
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Discover Your <span className="gradient-text">Soul Frequency</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Uncover your unique creative archetype and learn how to use AI to amplify your authentic voice
                  </p>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
                    <h3 className="font-semibold text-primary-900 mb-2">What You'll Discover:</h3>
                    <ul className="text-primary-800 text-left space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        Your dominant creative frequency type
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        Specific AI collaboration strategies for your type
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        Practical prompts and techniques to get started
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        A personalized development plan
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-8 text-gray-900">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.type)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        answers[questions[currentQuestion].id] === option.type
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 mt-1 flex-shrink-0 ${
                          answers[questions[currentQuestion].id] === option.type
                            ? 'border-primary-500 bg-primary-500' 
                            : 'border-gray-300'
                        }`}>
                          {answers[questions[currentQuestion].id] === option.type && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                          )}
                        </div>
                        <span className="text-gray-700">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {answers[questions[currentQuestion].id] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <button
                      onClick={nextQuestion}
                      className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Get My Results'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Soul Frequency:
              </h1>
              
              {result && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${result.color} flex items-center justify-center mx-auto mb-6`}>
                    <result.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.title}</h2>
                  <p className="text-xl text-primary-600 font-semibold mb-6">{result.subtitle}</p>
                  
                  <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    {result.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 mb-4">Your Core Traits:</h3>
                      <ul className="space-y-2">
                        {result.traits.map((trait, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 mb-4">AI Collaboration Strategy:</h3>
                      <p className="text-gray-700 mb-4">{result.aiCollaboration}</p>
                      <p className="text-sm text-gray-600"><strong>Examples:</strong> {result.examples}</p>
                    </div>
                  </div>
                  
                  {/* Email Capture */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Get Your Complete Soul Frequency Report</h3>
                    <p className="text-gray-600 mb-4">
                      Receive your detailed report with personalized AI prompts, development exercises, and next steps.
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                      />
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                        Send Report
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => { setCurrentQuestion(0); setAnswers({}); setShowResults(false) }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <a
                      href="/blog/02-the-soul-frequency-framework"
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Learn More About Your Type
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
