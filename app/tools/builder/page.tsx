'use client'

import { ArrowLeft, ArrowRight, Bot, Brain, CheckCircle2, Code, Cpu, Database, GitBranch, Layers, Play, Settings, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { createMetadata } from '@/lib/seo'

const builderSteps = [
  {
    id: 'requirements',
    title: 'Define Requirements',
    description: 'Specify your AI system requirements and objectives',
    icon: Brain,
    fields: [
      { label: 'System Purpose', type: 'textarea', placeholder: 'Describe what your AI system should accomplish...' },
      { label: 'Target Users', type: 'text', placeholder: 'Who will use this system?' },
      { label: 'Key Features', type: 'textarea', placeholder: 'List essential features...' },
      { label: 'Success Metrics', type: 'text', placeholder: 'How will you measure success?' }
    ]
  },
  {
    id: 'architecture',
    title: 'Design Architecture',
    description: 'Choose components and design your system architecture',
    icon: Layers,
    fields: [
      { label: 'AI Model Type', type: 'select', options: ['LLM (Language Model)', 'Computer Vision', 'Recommendation System', 'Predictive Analytics', 'Custom ML Model'] },
      { label: 'Data Sources', type: 'textarea', placeholder: 'List your data sources...' },
      { label: 'Integration Points', type: 'textarea', placeholder: 'Systems to integrate with...' },
      { label: 'Scalability Requirements', type: 'text', placeholder: 'Expected usage scale...' }
    ]
  },
  {
    id: 'implementation',
    title: 'Implementation Plan',
    description: 'Create a detailed implementation roadmap',
    icon: Code,
    fields: [
      { label: 'Technology Stack', type: 'textarea', placeholder: 'Preferred technologies and frameworks...' },
      { label: 'Development Phases', type: 'textarea', placeholder: 'Break down development phases...' },
      { label: 'Resource Requirements', type: 'text', placeholder: 'Team size, timeline, budget...' },
      { label: 'Risk Mitigation', type: 'textarea', placeholder: 'Potential risks and mitigation strategies...' }
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment Strategy',
    description: 'Plan deployment, monitoring, and maintenance',
    icon: Settings,
    fields: [
      { label: 'Deployment Environment', type: 'select', options: ['Cloud (AWS/Azure/GCP)', 'On-Premises', 'Hybrid', 'Edge Computing'] },
      { label: 'Monitoring Strategy', type: 'textarea', placeholder: 'How will you monitor performance...' },
      { label: 'Maintenance Plan', type: 'textarea', placeholder: 'Ongoing maintenance and updates...' },
      { label: 'Scaling Strategy', type: 'text', placeholder: 'How will you handle growth...' }
    ]
  }
]

const templates = [
  {
    name: 'Customer Service AI',
    description: 'Intelligent chatbot with natural language processing',
    features: ['NLP conversation handling', 'Knowledge base integration', 'Escalation workflows', 'Analytics dashboard'],
    complexity: 'Medium',
    timeline: '8-12 weeks'
  },
  {
    name: 'Content Generation System',
    description: 'AI-powered content creation and optimization',
    features: ['Multi-format content generation', 'Brand voice consistency', 'SEO optimization', 'Content scheduling'],
    complexity: 'Medium',
    timeline: '6-10 weeks'
  },
  {
    name: 'Predictive Analytics Platform',
    description: 'Machine learning for business forecasting',
    features: ['Time series forecasting', 'Anomaly detection', 'Interactive dashboards', 'Automated reporting'],
    complexity: 'High',
    timeline: '12-16 weeks'
  },
  {
    name: 'Document Intelligence',
    description: 'AI-powered document processing and analysis',
    features: ['OCR and text extraction', 'Document classification', 'Information extraction', 'Workflow automation'],
    complexity: 'High',
    timeline: '10-14 weeks'
  }
]

const aiComponents = [
  {
    category: 'Language Models',
    components: ['OpenAI GPT', 'Anthropic Claude', 'Google PaLM', 'Local LLMs', 'Fine-tuned Models'],
    icon: Brain
  },
  {
    category: 'Data Processing',
    components: ['Vector Databases', 'ETL Pipelines', 'Real-time Streaming', 'Data Validation', 'Feature Engineering'],
    icon: Database
  },
  {
    category: 'Integration',
    components: ['REST APIs', 'GraphQL', 'Webhooks', 'Message Queues', 'Event Streaming'],
    icon: GitBranch
  },
  {
    category: 'Deployment',
    components: ['Container Orchestration', 'Auto Scaling', 'Load Balancing', 'CI/CD Pipelines', 'Monitoring'],
    icon: Cpu
  }
]

// This would need to be wrapped in a client component or use a different metadata approach
// export const metadata = createMetadata({
//   title: 'AI System Builder - Design & Plan AI Solutions | FrankX.AI',
//   description: 'Interactive tool to design, plan, and architect AI systems. From requirements to deployment with guided templates and best practices.',
//   keywords: ['ai system builder', 'ai architecture tool', 'ai planning', 'ai system design'],
//   path: '/tools/builder',
// })

export default function AIBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleInputChange = (stepId: string, fieldLabel: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [fieldLabel]: value
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < builderSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentStepData = builderSteps[currentStep]
  const StepIcon = currentStepData.icon

  return (
    <div className="min-h-screen bg-void text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Header */}
          <header className="space-y-8">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/tools" className="hover:text-white transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Tools
              </Link>
              <ArrowRight className="w-4 h-4" />
              <span>AI System Builder</span>
            </nav>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cyan-300">
                <Bot className="h-5 w-5" />
                Interactive AI Builder
              </div>
              <h1 className="text-5xl font-bold text-white md:text-6xl leading-tight">
                AI System Builder
              </h1>
              <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
                Design and architect your AI system with guided templates, best practices, and interactive planning tools.
                From requirements to deployment in a structured approach.
              </p>
            </div>
          </header>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5">
              {builderSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : index < currentStep
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  {index < builderSteps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 transition-all duration-300 ${
                        index < currentStep ? 'bg-emerald-500' : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto">
                <StepIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-4xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {currentStepData.description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="grid gap-6 md:grid-cols-2">
                  {currentStepData.fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-semibold text-white">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-cyan-400/50 focus:outline-none resize-none"
                          rows={4}
                          placeholder={field.placeholder}
                          value={formData[currentStepData.id]?.[field.label] || ''}
                          onChange={(e) => handleInputChange(currentStepData.id, field.label, e.target.value)}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white focus:border-cyan-400/50 focus:outline-none"
                          value={formData[currentStepData.id]?.[field.label] || ''}
                          onChange={(e) => handleInputChange(currentStepData.id, field.label, e.target.value)}
                        >
                          <option value="">Select an option...</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option} className="bg-slate-900">
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-cyan-400/50 focus:outline-none"
                          placeholder={field.placeholder}
                          value={formData[currentStepData.id]?.[field.label] || ''}
                          onChange={(e) => handleInputChange(currentStepData.id, field.label, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white/90 font-semibold transition-all duration-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <span className="text-white/60 text-sm">
                    Step {currentStep + 1} of {builderSteps.length}
                  </span>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === builderSteps.length - 1}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === builderSteps.length - 1 ? 'Complete' : 'Next'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* AI System Templates */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Pre-Built System Templates</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Jump-start your project with proven AI system architectures. Each template includes
                detailed specifications and implementation guides.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {templates.map((template, index) => (
                <article
                  key={index}
                  className={`rounded-3xl border p-8 backdrop-blur cursor-pointer transition-all duration-300 ${
                    selectedTemplate === template.name
                      ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedTemplate(selectedTemplate === template.name ? null : template.name)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white">{template.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        template.complexity === 'High'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : template.complexity === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}>
                        {template.complexity}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">{template.description}</p>

                  <div className="grid gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-2">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {template.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Timeline: <span className="text-cyan-300">{template.timeline}</span></span>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold hover:bg-cyan-500/30 transition-all duration-300">
                      <Play className="w-4 h-4" />
                      Use Template
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Component Library */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">AI Component Library</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Browse our library of AI components and integrations to build custom solutions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {aiComponents.map((category) => {
                const CategoryIcon = category.icon
                return (
                  <article key={category.category} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                      <CategoryIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.components.map((component, index) => (
                        <li key={index} className="text-white/70 text-sm hover:text-white cursor-pointer transition-colors">
                          • {component}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Need Expert Help Building Your AI System?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our team of AI architects can help you design, build, and deploy production-ready AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Get Expert Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/agentic-ai-center"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Learn About Our Services
              </Link>
            </div>
          </section>
        </div>
      </main>
</div>
  )
}