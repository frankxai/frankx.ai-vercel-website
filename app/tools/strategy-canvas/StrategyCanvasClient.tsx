'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, Download, Eye, Target } from 'lucide-react'

const canvasElements = [
  {
    id: 'vision',
    title: 'AI Vision & Goals',
    description: 'Define your AI transformation objectives and success metrics',
    questions: [
      'What business outcomes do you want to achieve with AI?',
      'How will you measure AI success?',
      'What is your 3-year AI vision?'
    ],
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400'
  },
  {
    id: 'stakeholders',
    title: 'Key Stakeholders',
    description: 'Identify champions, decision makers, and end users',
    questions: [
      'Who are your AI initiative sponsors?',
      'Which teams will be most impacted?',
      'Who needs to be involved in decisions?'
    ],
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400'
  },
  {
    id: 'resources',
    title: 'Resources & Capabilities',
    description: 'Assess current assets, skills, and infrastructure',
    questions: [
      'What data assets do you have?',
      'What technical capabilities exist?',
      'What skills gaps need to be addressed?'
    ],
    color: 'from-emerald-500/20 to-green-500/20',
    textColor: 'text-emerald-400'
  },
  {
    id: 'challenges',
    title: 'Challenges & Risks',
    description: 'Identify obstacles and mitigation strategies',
    questions: [
      'What are your biggest AI adoption barriers?',
      'What risks need to be managed?',
      'Where might you face resistance?'
    ],
    color: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-400'
  },
  {
    id: 'opportunities',
    title: 'Use Cases & Opportunities',
    description: 'Map high-impact AI applications for your business',
    questions: [
      'Which processes could benefit from automation?',
      'Where can AI enhance decision-making?',
      'What new capabilities could AI enable?'
    ],
    color: 'from-yellow-500/20 to-amber-500/20',
    textColor: 'text-yellow-400'
  },
  {
    id: 'roadmap',
    title: 'Implementation Roadmap',
    description: 'Plan your AI journey with clear phases and milestones',
    questions: [
      'What are your quick wins (0-6 months)?',
      'Which medium-term goals (6-18 months)?',
      'What are your long-term objectives (18+ months)?'
    ],
    color: 'from-indigo-500/20 to-purple-500/20',
    textColor: 'text-indigo-400'
  }
]

const templates = [
  {
    title: 'Enterprise AI Strategy Canvas',
    description: 'Comprehensive framework for large organizations planning AI transformation',
    features: ['Multi-stakeholder analysis', 'Risk assessment matrix', 'Governance planning', 'Change management'],
    downloadUrl: '/templates/enterprise-ai-strategy-canvas.pdf'
  },
  {
    title: 'Startup AI Strategy Canvas',
    description: 'Lean framework for startups integrating AI into their product or operations',
    features: ['MVP AI features', 'Resource optimization', 'Growth strategies', 'Technical roadmap'],
    downloadUrl: '/templates/startup-ai-strategy-canvas.pdf'
  },
  {
    title: 'Creator AI Strategy Canvas',
    description: 'Specialized framework for creators and content businesses using AI tools',
    features: ['Content automation', 'Brand consistency', 'Workflow optimization', 'Monetization strategies'],
    downloadUrl: '/templates/creator-ai-strategy-canvas.pdf'
  }
]

const examples = [
  {
    company: 'TechCorp Enterprise',
    industry: 'Software Development',
    challenge: 'Manual code review processes slowing development velocity',
    solution: 'Implemented AI-powered code analysis and automated testing pipeline',
    results: '60% faster code reviews, 40% reduction in bugs, improved developer satisfaction'
  },
  {
    company: 'Creative Agency',
    industry: 'Marketing & Design',
    challenge: 'Scaling creative output while maintaining quality and brand consistency',
    solution: 'AI-assisted design workflows and content generation with brand guidelines',
    results: '3x content output, maintained brand consistency, freed creatives for strategic work'
  },
  {
    company: 'Healthcare Startup',
    industry: 'Healthcare Technology',
    challenge: 'Analyzing large volumes of patient data for insights',
    solution: 'AI-powered analytics platform with predictive health modeling',
    results: 'Early detection improved by 35%, reduced diagnostic time by 50%'
  }
]

export default function StrategyCanvasClient() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [completedElements, setCompletedElements] = useState<Set<string>>(new Set())

  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId === selectedElement ? null : elementId)
  }

  const markComplete = (elementId: string) => {
    setCompletedElements((prev) => {
      const next = new Set(prev)
      next.add(elementId)
      return next
    })
  }

  return (
    <>
      <header className="space-y-8">
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <Link href="/tools" className="hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Tools
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span>AI Strategy Canvas</span>
        </nav>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-purple-300">
            <Target className="h-5 w-5" />
            Strategic Planning Tool
          </div>
          <h1 className="text-5xl font-bold text-white md:text-6xl leading-tight">
            AI Strategy Canvas
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Plan your AI transformation with a comprehensive visual framework. Map stakeholders, resources, opportunities, and create actionable implementation roadmaps.
          </p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Interactive Strategy Canvas</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Click on each section to explore key questions and build your AI strategy step by step.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {canvasElements.map((element) => {
            const isCompleted = completedElements.has(element.id)
            const isSelected = selectedElement === element.id

            return (
              <div key={element.id} className="space-y-4">
                <article
                  className={`rounded-3xl border p-6 backdrop-blur cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 scale-105'
                      : isCompleted
                      ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => handleElementClick(element.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${element.color} flex items-center justify-center`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Brain className={`w-6 h-6 ${element.textColor}`} />
                      )}
                    </div>
                    {isSelected && (
                      <Eye className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{element.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{element.description}</p>
                </article>

                {isSelected && (
                  <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/5 via-slate-900 to-slate-950 p-6 animate-in slide-in-from-top duration-300">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Questions to Consider:</h4>
                    <ul className="space-y-3 mb-6">
                      {element.questions.map((question, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <span className="text-purple-300 text-sm font-semibold">{index + 1}</span>
                          </div>
                          <span className="text-white/80 text-sm">{question}</span>
                        </li>
                      ))}
                    </ul>
                    {!isCompleted && (
                      <button
                        type="button"
                        onClick={() => markComplete(element.id)}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-sm font-semibold transition-all duration-300"
                      >
                        Mark as Complete
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center py-8">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5">
            <span className="text-white/70 text-sm">Progress:</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${(completedElements.size / canvasElements.length) * 100}%` }}
                />
              </div>
              <span className="text-white text-sm font-semibold">
                {completedElements.size}/{canvasElements.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Download Strategy Templates</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Pre-built templates for different organization types and use cases. Start with a framework tailored to your specific needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {templates.map((template) => (
            <article key={template.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="text-2xl font-semibold text-white mb-4">{template.title}</h3>
              <p className="text-white/70 mb-6 leading-relaxed">{template.description}</p>
              <ul className="space-y-2 mb-8">
                {template.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={template.downloadUrl}
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white/90 font-semibold transition-all duration-300 hover:bg-white/10"
              >
                <Download className="w-4 h-4" />
                Download Template
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Strategy Success Stories</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how organizations have used strategic AI planning to achieve transformative results.
          </p>
        </div>

        <div className="space-y-8">
          {examples.map((example, index) => (
            <article key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="grid gap-8 lg:grid-cols-3">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{example.company}</h3>
                  <p className="text-cyan-300 text-sm mb-4">{example.industry}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-white/80 mb-2">Challenge</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{example.challenge}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/80 mb-2">Solution</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{example.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/80 mb-2">Results</h4>
                  <p className="text-emerald-300 text-sm leading-relaxed font-medium">{example.results}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-slate-900 to-slate-950">
        <h2 className="text-4xl font-bold text-white">Ready to Build Your AI Strategy?</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Get expert guidance to accelerate your AI transformation. Our team helps you turn strategy into results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 hover:-translate-y-1"
          >
            Get Strategy Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/tools/roi-calculator"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
          >
            Calculate AI ROI
          </Link>
        </div>
      </section>
    </>
  )
}
