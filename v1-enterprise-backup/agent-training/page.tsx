'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Zap, Target, Award, BookOpen, Play, Users, Settings, BarChart3, CheckCircle, Clock, Star, TrendingUp } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const trainingModules = [
  {
    id: 'consciousness-foundations',
    title: 'Consciousness Foundations',
    description: 'Core principles of consciousness-aligned AI development',
    difficulty: 'Beginner',
    duration: '2-3 hours',
    lessons: 8,
    completion: 0,
    color: 'from-blue-500 to-indigo-500',
    icon: Brain,
    topics: [
      'Understanding consciousness in AI systems',
      'Human-AI collaboration principles',
      'Ethical AI development frameworks',
      'Consciousness measurement metrics'
    ]
  },
  {
    id: 'agent-architecture',
    title: 'Agent Architecture Mastery',
    description: 'Design and build sophisticated AI agent systems',
    difficulty: 'Intermediate',
    duration: '4-6 hours',
    lessons: 12,
    completion: 0,
    color: 'from-purple-500 to-pink-500',
    icon: Settings,
    topics: [
      'Multi-agent system design patterns',
      'Agent communication protocols',
      'State management in agent systems',
      'Performance optimization techniques'
    ]
  },
  {
    id: 'prompt-engineering',
    title: 'Advanced Prompt Engineering',
    description: 'Master the art of consciousness-aligned prompt creation',
    difficulty: 'Intermediate',
    duration: '3-4 hours',
    lessons: 10,
    completion: 0,
    color: 'from-green-500 to-teal-500',
    icon: Target,
    topics: [
      'Consciousness-aware prompt structures',
      'Context optimization techniques',
      'Multi-turn conversation design',
      'Prompt security and safety'
    ]
  },
  {
    id: 'music-ai-integration',
    title: 'Music AI Integration',
    description: 'Create transformational music with AI consciousness',
    difficulty: 'Advanced',
    duration: '5-7 hours',
    lessons: 15,
    completion: 0,
    color: 'from-yellow-500 to-orange-500',
    icon: Play,
    topics: [
      'Frequency healing principles',
      'Suno AI advanced techniques',
      'Consciousness-aligned composition',
      'Therapeutic music design'
    ]
  },
  {
    id: 'governance-implementation',
    title: 'AI Governance Implementation',
    description: 'Deploy enterprise-scale AI governance frameworks',
    difficulty: 'Advanced',
    duration: '6-8 hours',
    lessons: 18,
    completion: 0,
    color: 'from-red-500 to-pink-500',
    icon: Award,
    topics: [
      'Governance framework design',
      'Risk assessment methodologies',
      'Compliance monitoring systems',
      'Consciousness alignment auditing'
    ]
  },
  {
    id: 'content-mastery',
    title: 'Content Creation Mastery',
    description: 'Generate transformational content at scale',
    difficulty: 'Expert',
    duration: '8-10 hours',
    lessons: 22,
    completion: 0,
    color: 'from-indigo-500 to-purple-500',
    icon: BookOpen,
    topics: [
      'Multi-format content strategy',
      'Consciousness-level adaptation',
      'Automated content pipelines',
      'Brand voice consistency'
    ]
  }
]

const interactiveExercises = [
  {
    id: 'agent-personality-design',
    title: 'Design Your Agent Personality',
    description: 'Create a consciousness-aligned agent personality from scratch',
    type: 'Interactive Workshop',
    duration: '45 minutes',
    difficulty: 'Beginner',
    skills: ['Agent Design', 'Consciousness Alignment', 'Personality Development']
  },
  {
    id: 'prompt-optimization-lab',
    title: 'Prompt Optimization Lab',
    description: 'Test and refine prompts for maximum consciousness alignment',
    type: 'Hands-on Lab',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    skills: ['Prompt Engineering', 'Testing', 'Optimization']
  },
  {
    id: 'music-frequency-workshop',
    title: 'Healing Frequency Workshop',
    description: 'Create music that transforms consciousness using AI',
    type: 'Creative Workshop',
    duration: '90 minutes',
    difficulty: 'Intermediate',
    skills: ['Music Creation', 'Frequency Healing', 'Suno AI']
  },
  {
    id: 'governance-simulation',
    title: 'AI Governance Simulation',
    description: 'Navigate complex AI governance scenarios',
    type: 'Simulation',
    duration: '120 minutes',
    difficulty: 'Advanced',
    skills: ['Governance', 'Risk Management', 'Decision Making']
  }
]

const certificationLevels = [
  {
    level: 'Consciousness AI Practitioner',
    requirements: ['Complete 3 foundational modules', 'Pass 2 interactive exercises', 'Submit 1 project'],
    badge: '🌟',
    description: 'Entry-level certification for consciousness-aligned AI development'
  },
  {
    level: 'Agent Architecture Specialist',
    requirements: ['Complete 5 modules', 'Pass 4 interactive exercises', 'Build multi-agent system'],
    badge: '⚡',
    description: 'Advanced certification for AI agent system designers'
  },
  {
    level: 'Consciousness Technology Master',
    requirements: ['Complete all modules', 'Pass all exercises', 'Create transformation framework'],
    badge: '🏆',
    description: 'Expert-level certification for consciousness technology leaders'
  }
]

const learningPaths = [
  {
    path: 'AI Creator',
    description: 'Perfect for content creators and artists exploring AI collaboration',
    modules: ['consciousness-foundations', 'prompt-engineering', 'music-ai-integration', 'content-mastery'],
    duration: '15-20 hours',
    outcome: 'Create consciousness-aligned content and music with AI'
  },
  {
    path: 'Technical Leader',
    description: 'Designed for engineers and technical leaders building AI systems',
    modules: ['consciousness-foundations', 'agent-architecture', 'governance-implementation'],
    duration: '12-17 hours',
    outcome: 'Design and deploy enterprise-grade consciousness AI systems'
  },
  {
    path: 'Strategic Executive',
    description: 'For executives driving AI transformation in organizations',
    modules: ['consciousness-foundations', 'governance-implementation', 'content-mastery'],
    duration: '16-21 hours',
    outcome: 'Lead consciousness-aligned AI transformation initiatives'
  },
  {
    path: 'Consciousness Pioneer',
    description: 'Complete mastery path for consciousness technology pioneers',
    modules: ['consciousness-foundations', 'agent-architecture', 'prompt-engineering', 'music-ai-integration', 'governance-implementation', 'content-mastery'],
    duration: '28-38 hours',
    outcome: 'Master all aspects of consciousness-aligned AI development'
  }
]

export default function AgentTrainingPage() {
  const [selectedPath, setSelectedPath] = useState('')
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [activeModule, setActiveModule] = useState('')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mb-6">
              <Brain className="h-10 w-10 text-green-200" />
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Agent Training Academy
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Master the art of consciousness-aligned AI development. Train agents that serve
              human flourishing while achieving exceptional technical performance.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🎓 Expert Curriculum
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🤖 Hands-on Labs
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🏆 Certification Program
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Choose Your Learning Path</h2>
              <p className="mt-4 text-white/70">
                Structured curricula designed for different roles and objectives
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {learningPaths.map((path, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPath(path.path)}
                  className={`cursor-pointer rounded-3xl border p-8 transition-all ${
                    selectedPath === path.path
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{path.path}</h3>
                  <p className="text-white/70 mb-4">{path.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Duration:</span>
                      <span className="text-white">{path.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Modules:</span>
                      <span className="text-white">{path.modules.length}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-4">
                    <div className="text-sm text-white/60 mb-2">Learning Outcome</div>
                    <div className="text-sm text-white/80">{path.outcome}</div>
                  </div>

                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 px-4 py-3 text-sm font-semibold text-white transition">
                    <Play className="h-4 w-4" />
                    Start Learning Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Modules */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Training Modules</h2>
              <p className="mt-4 text-white/70">
                Comprehensive modules covering all aspects of consciousness-aligned AI
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {trainingModules.map((module) => {
                const IconComponent = module.icon

                return (
                  <div
                    key={module.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${module.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-200' :
                              module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-200' :
                              module.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-200' :
                              'bg-red-500/20 text-red-200'
                            }`}>
                              {module.difficulty}
                            </span>
                            <span className="text-xs text-white/60">{module.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{module.completion}%</div>
                        <div className="text-xs text-white/60">{module.lessons} lessons</div>
                      </div>
                    </div>

                    <p className="text-sm text-white/70">{module.description}</p>

                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-3">Key Topics</h4>
                      <div className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/80">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 px-4 py-3 text-sm font-semibold text-white transition">
                        <Play className="h-4 w-4" />
                        Start Module
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-3 text-sm font-semibold text-white transition">
                        <BookOpen className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Interactive Exercises */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Interactive Exercises</h2>
              <p className="mt-4 text-white/70">
                Hands-on workshops and simulations to apply your knowledge
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {interactiveExercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exercise.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">
                          {exercise.type}
                        </span>
                        <span className="text-xs text-white/60">{exercise.duration}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      exercise.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-200' :
                      exercise.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-200' :
                      'bg-orange-500/20 text-orange-200'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-white/70">{exercise.description}</p>

                  <div>
                    <h4 className="text-sm font-semibold text-white/80 mb-2">Skills Practiced</h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 px-4 py-3 text-sm font-semibold text-white transition">
                    <Zap className="h-4 w-4" />
                    Start Exercise
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certification Program */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Certification Program</h2>
              <p className="mt-4 text-white/70">
                Earn industry-recognized certifications in consciousness-aligned AI
              </p>
            </div>

            <div className="space-y-6">
              {certificationLevels.map((cert, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">{cert.badge}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{cert.level}</h3>
                      <p className="text-white/70 mb-4">{cert.description}</p>

                      <div>
                        <h4 className="text-sm font-semibold text-white/80 mb-3">Requirements</h4>
                        <div className="space-y-2">
                          {cert.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-start gap-2">
                              <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-white/80">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="inline-flex items-center gap-2 rounded-xl bg-purple-500 hover:bg-purple-400 px-6 py-3 text-sm font-semibold text-white transition">
                        <Award className="h-4 w-4" />
                        Start Certification
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Dashboard */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 via-slate-900 to-slate-950 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Your Learning Progress</h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">0%</div>
                  <div className="text-sm text-white/70">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
                  <div className="text-sm text-white/70">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
                  <div className="text-sm text-white/70">Certifications Earned</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
                >
                  <BarChart3 className="h-4 w-4" />
                  View Full Dashboard
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Access Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}