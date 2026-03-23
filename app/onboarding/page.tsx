'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Star, Target, Users, Zap, Brain, Code, Palette, BarChart3, Shield, Clock, Trophy, Lightbulb, Rocket, Heart, Settings, Play, Book, MessageCircle, Award, TrendingUp, Download, ExternalLink } from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  subtitle: string
  description: string
  component: 'welcome' | 'goals' | 'experience' | 'interests' | 'assessment' | 'recommendations' | 'quickstart' | 'completion'
}

interface UserProfile {
  name: string
  email: string
  goals: string[]
  experience: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  role: string
  industry: string
  teamSize: string
  timeline: string
  budget: string
  preferences: {
    learningStyle: string[]
    contentTypes: string[]
    communicationFrequency: string
  }
  assessmentResults: {
    scores: Record<string, number>
    strengths: string[]
    improvementAreas: string[]
    personalizedPath: string
  }
}

interface Recommendation {
  type: 'course' | 'tool' | 'resource' | 'community' | 'product'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  timeEstimate: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  url: string
  icon: any
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({
    goals: [],
    interests: [],
    preferences: {
      learningStyle: [],
      contentTypes: [],
      communicationFrequency: 'weekly'
    },
    assessmentResults: {
      scores: {},
      strengths: [],
      improvementAreas: [],
      personalizedPath: ''
    }
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to FrankX.AI',
      subtitle: 'Your AI Transformation Journey Starts Here',
      description: 'Let\'s personalize your experience to help you achieve your AI goals faster.',
      component: 'welcome'
    },
    {
      id: 'goals',
      title: 'What are your goals?',
      subtitle: 'Tell us what you want to achieve',
      description: 'Select all that apply to create your personalized learning path.',
      component: 'goals'
    },
    {
      id: 'experience',
      title: 'Your AI Experience Level',
      subtitle: 'Help us understand your background',
      description: 'We\'ll tailor content complexity to your current expertise.',
      component: 'experience'
    },
    {
      id: 'interests',
      title: 'Areas of Interest',
      subtitle: 'Choose topics that excite you',
      description: 'Focus on areas most relevant to your work and interests.',
      component: 'interests'
    },
    {
      id: 'assessment',
      title: 'Quick Skills Assessment',
      subtitle: 'Optional 2-minute assessment',
      description: 'Get personalized recommendations based on your current skills.',
      component: 'assessment'
    },
    {
      id: 'recommendations',
      title: 'Your Personalized Plan',
      subtitle: 'Curated recommendations just for you',
      description: 'Based on your profile, here\'s your optimal learning path.',
      component: 'recommendations'
    },
    {
      id: 'quickstart',
      title: 'Quick Wins Setup',
      subtitle: 'Get immediate value',
      description: 'Set up your first AI workflow in the next 15 minutes.',
      component: 'quickstart'
    },
    {
      id: 'completion',
      title: 'Welcome to the Community!',
      subtitle: 'You\'re all set to transform with AI',
      description: 'Access your dashboard and start your journey.',
      component: 'completion'
    }
  ]

  const goalOptions = [
    { id: 'productivity', label: 'Increase Productivity', icon: Zap, description: 'Automate tasks and streamline workflows' },
    { id: 'creativity', label: 'Enhance Creativity', icon: Palette, description: 'Unlock new creative possibilities with AI' },
    { id: 'business', label: 'Grow Business', icon: TrendingUp, description: 'Scale operations and increase revenue' },
    { id: 'skills', label: 'Learn AI Skills', icon: Brain, description: 'Develop technical AI competencies' },
    { id: 'team', label: 'Transform Team', icon: Users, description: 'Lead AI adoption across organization' },
    { id: 'innovation', label: 'Drive Innovation', icon: Lightbulb, description: 'Pioneer new AI applications' }
  ]

  const interestOptions = [
    { id: 'llm', label: 'Language Models', icon: MessageCircle, category: 'Core AI' },
    { id: 'automation', label: 'Process Automation', icon: Settings, category: 'Business' },
    { id: 'creative', label: 'Creative AI', icon: Palette, category: 'Creative' },
    { id: 'analytics', label: 'Data Analytics', icon: BarChart3, category: 'Data' },
    { id: 'coding', label: 'AI Coding', icon: Code, category: 'Technical' },
    { id: 'strategy', label: 'AI Strategy', icon: Target, category: 'Leadership' },
    { id: 'ethics', label: 'AI Ethics', icon: Shield, category: 'Governance' },
    { id: 'music', label: 'AI Music', icon: Play, category: 'Creative' }
  ]

  const experienceOptions = [
    {
      level: 'beginner',
      title: 'New to AI',
      description: 'Just getting started with AI tools and concepts',
      features: ['Basic AI concepts', 'Beginner-friendly tools', 'Step-by-step guidance']
    },
    {
      level: 'intermediate',
      title: 'Some Experience',
      description: 'Used AI tools before, ready for more advanced applications',
      features: ['Advanced workflows', 'Integration strategies', 'Best practices']
    },
    {
      level: 'advanced',
      title: 'AI Experienced',
      description: 'Building AI solutions, leading AI initiatives',
      features: ['Technical deep-dives', 'Implementation guides', 'Strategic frameworks']
    }
  ]

  const recommendationsStepIndex = steps.findIndex((step) => step.component === 'recommendations')

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1
      if (next === recommendationsStepIndex) {
        generateRecommendations()
      }
      setCurrentStep(next)
    } else {
      setIsCompleted(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }))
  }

  const selectGoal = (goalId: string) => {
    const currentGoals = userProfile.goals || []
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(g => g !== goalId)
      : [...currentGoals, goalId]
    updateProfile({ goals: updatedGoals })
  }

  const selectInterest = (interestId: string) => {
    const currentInterests = userProfile.interests || []
    const updatedInterests = currentInterests.includes(interestId)
      ? currentInterests.filter(i => i !== interestId)
      : [...currentInterests, interestId]
    updateProfile({ interests: updatedInterests })
  }

  const generateRecommendations = useCallback(() => {
    const mockRecommendations: Recommendation[] = [
      {
        type: 'course',
        title: 'AI Fundamentals Masterclass',
        description: 'Perfect starting point for your AI journey',
        priority: 'high',
        timeEstimate: '2 hours',
        difficulty: userProfile.experience || 'beginner',
        category: 'Learning',
        url: '/courses/ai-fundamentals',
        icon: Book
      },
      {
        type: 'tool',
        title: 'ChatGPT Workflow Setup',
        description: 'Get immediate productivity gains',
        priority: 'high',
        timeEstimate: '15 minutes',
        difficulty: 'beginner',
        category: 'Quick Win',
        url: '/tools/chatgpt-setup',
        icon: Zap
      },
      {
        type: 'community',
        title: 'Join AI Creators Community',
        description: 'Connect with like-minded professionals',
        priority: 'medium',
        timeEstimate: '5 minutes',
        difficulty: 'beginner',
        category: 'Community',
        url: '/community',
        icon: Users
      },
      {
        type: 'resource',
        title: 'AI Prompt Library',
        description: '100+ proven prompts for your use cases',
        priority: 'medium',
        timeEstimate: '30 minutes',
        difficulty: 'beginner',
        category: 'Resources',
        url: '/resources/prompts',
        icon: Download
      }
    ]
    setRecommendations(mockRecommendations)
  }, [userProfile.experience])

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 pt-8">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {currentStepData.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">{currentStepData.subtitle}</p>
            <p className="text-gray-500">{currentStepData.description}</p>
          </motion.div>

          {/* Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg mb-8"
          >
            <AnimatePresence mode="wait">
              {/* Welcome Step */}
              {currentStepData.component === 'welcome' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your work with AI?</h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    This personalized onboarding will take about 3 minutes and help us create the perfect AI learning path for you.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      { icon: Target, title: 'Personalized Path', description: 'Tailored to your goals and experience' },
                      { icon: Clock, title: 'Quick Setup', description: 'Get value in your first 15 minutes' },
                      { icon: Trophy, title: 'Proven Results', description: 'Join 10,000+ successful transformations' }
                    ].map((feature, index) => (
                      <div key={index} className="text-center">
                        <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={userProfile.name || ''}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={userProfile.email || ''}
                        onChange={(e) => updateProfile({ email: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Goals Step */}
              {currentStepData.component === 'goals' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {goalOptions.map((goal) => (
                      <motion.div
                        key={goal.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectGoal(goal.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          userProfile.goals?.includes(goal.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <goal.icon className={`w-8 h-8 ${
                            userProfile.goals?.includes(goal.id) ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{goal.label}</h3>
                            <p className="text-sm text-gray-600">{goal.description}</p>
                          </div>
                          {userProfile.goals?.includes(goal.id) && (
                            <CheckCircle className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Experience Step */}
              {currentStepData.component === 'experience' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {experienceOptions.map((option) => (
                    <motion.div
                      key={option.level}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => updateProfile({ experience: option.level as any })}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        userProfile.experience === option.level
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                          <p className="text-gray-600">{option.description}</p>
                        </div>
                        {userProfile.experience === option.level && (
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {option.features.map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Interests Step */}
              {currentStepData.component === 'interests' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    {interestOptions.map((interest) => (
                      <motion.div
                        key={interest.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectInterest(interest.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          userProfile.interests?.includes(interest.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <interest.icon className={`w-8 h-8 mx-auto mb-3 ${
                          userProfile.interests?.includes(interest.id) ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <h3 className="font-semibold text-gray-900 mb-1">{interest.label}</h3>
                        <p className="text-xs text-gray-500">{interest.category}</p>
                        {userProfile.interests?.includes(interest.id) && (
                          <CheckCircle className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Assessment Step */}
              {currentStepData.component === 'assessment' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Skills Assessment</h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Take our 2-minute assessment to get personalized recommendations based on your current AI knowledge and skills.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        // Mock assessment completion
                        updateProfile({
                          assessmentResults: {
                            scores: { technical: 7, creative: 9, business: 6, leadership: 8 },
                            strengths: ['Creative Problem Solving', 'Strategic Thinking'],
                            improvementAreas: ['Technical Implementation', 'Data Analysis'],
                            personalizedPath: 'Creative AI Leader'
                          }
                        })
                        nextStep()
                      }}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Take Assessment (2 min)
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Skip for Now
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Recommendations Step */}
              {currentStepData.component === 'recommendations' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center mb-8">
                    <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized AI Path</h2>
                    <p className="text-gray-600">Based on your profile, here are your recommended next steps:</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border-2 ${
                          rec.priority === 'high' ? 'border-green-300 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <rec.icon className="w-8 h-8 text-blue-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                              {rec.priority === 'high' && (
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{rec.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>⏱️ {rec.timeEstimate}</span>
                              <span>📊 {rec.difficulty}</span>
                              <span>🏷️ {rec.category}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick Start Step */}
              {currentStepData.component === 'quickstart' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Your First AI Win</h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Let's set up your first AI workflow right now. You'll see immediate value in the next 15 minutes.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Your Quick Win: Email Assistant Setup</h3>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      {[
                        'Set up ChatGPT account (2 min)',
                        'Install email templates (5 min)',
                        'Configure your first workflow (8 min)',
                        'Test and optimize (5 min)'
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all">
                    Start Quick Setup
                  </button>
                </motion.div>
              )}

              {/* Completion Step */}
              {currentStepData.component === 'completion' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the AI Revolution!</h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    You're now part of a community of 10,000+ professionals transforming their work with AI.
                    Your personalized dashboard is ready.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      { icon: Book, title: 'Access Learning Path', description: 'Your personalized course sequence' },
                      { icon: Users, title: 'Join Community', description: 'Connect with AI professionals' },
                      { icon: Trophy, title: 'Track Progress', description: 'Monitor your AI transformation' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all">
                      Go to Dashboard
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                      Explore Community
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          {!isCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center"
            >
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-blue-600'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={
                  (currentStepData.component === 'welcome' && (!userProfile.name || !userProfile.email)) ||
                  (currentStepData.component === 'goals' && userProfile.goals?.length === 0) ||
                  (currentStepData.component === 'experience' && !userProfile.experience) ||
                  (currentStepData.component === 'interests' && userProfile.interests?.length === 0)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  (currentStepData.component === 'welcome' && (!userProfile.name || !userProfile.email)) ||
                  (currentStepData.component === 'goals' && userProfile.goals?.length === 0) ||
                  (currentStepData.component === 'experience' && !userProfile.experience) ||
                  (currentStepData.component === 'interests' && userProfile.interests?.length === 0)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
