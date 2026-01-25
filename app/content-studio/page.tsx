'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PenTool, Sparkles, Download, Send, BarChart3, Settings, Wand2, FileText, Mail, MessageSquare, BookOpen, GraduationCap } from 'lucide-react'

const agents = [
  {
    id: 'technical-translator',
    name: 'Technical Translator',
    description: 'Makes Oracle-level AI expertise accessible to creators',
    specialties: ['AI Tool Integration', 'Creator Education', 'Technical Tutorials'],
    color: 'from-blue-500 to-indigo-500',
    icon: '🔧'
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    description: 'Frank\'s music creation approach with Suno AI mastery',
    specialties: ['Suno AI', 'Ambient Frequencies', 'Music as Creative Tech'],
    color: 'from-purple-500 to-pink-500',
    icon: '🎵'
  },
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    description: 'Creator-focused content that transforms and profits ethically',
    specialties: ['Creator Content', 'Transformation Stories', 'Community Building'],
    color: 'from-green-500 to-teal-500',
    icon: '⚡'
  },
  {
    id: 'soul-strategist',
    name: 'Soul Strategist',
    description: 'Creative transformation strategy aligned with soul purpose',
    specialties: ['Creative Strategy', 'Soul Purpose', 'Artistic Development'],
    color: 'from-yellow-500 to-orange-500',
    icon: '✨'
  }
]

const contentTypes = [
  {
    id: 'blog',
    name: 'Blog Post',
    description: 'In-depth articles that educate and transform',
    icon: FileText,
    estimatedTime: '30-60 min'
  },
  {
    id: 'email',
    name: 'Email Campaign',
    description: 'Personalized communication that builds relationships',
    icon: Mail,
    estimatedTime: '15-30 min'
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Engaging posts for platform-specific audiences',
    icon: MessageSquare,
    estimatedTime: '5-15 min'
  },
  {
    id: 'ebook',
    name: 'eBook',
    description: 'Comprehensive guides for lead generation',
    icon: BookOpen,
    estimatedTime: '2-4 hours'
  },
  {
    id: 'course',
    name: 'Course Module',
    description: 'Educational content for transformation programs',
    icon: GraduationCap,
    estimatedTime: '1-3 hours'
  }
]

const audiences = [
  { id: 'executives', name: 'C-Suite Executives', description: 'Strategic leaders driving AI transformation' },
  { id: 'creators', name: 'Content Creators', description: 'Artists, writers, and creative professionals' },
  { id: 'families', name: 'Families', description: 'Parents navigating AI with children' },
  { id: 'developers', name: 'Developers', description: 'Technical professionals building AI systems' }
]

const depthLevels = [
  { id: 'awareness', name: 'Awareness', description: 'Gentle introduction to core concepts' },
  { id: 'understanding', name: 'Understanding', description: 'Deeper exploration with practical examples' },
  { id: 'integration', name: 'Integration', description: 'Practical implementation guidance' },
  { id: 'mastery', name: 'Mastery', description: 'Advanced techniques and frameworks' }
]

export default function ContentStudioPage() {
  const [selectedAgent, setSelectedAgent] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedAudience, setSelectedAudience] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [topic, setTopic] = useState('')
  const [length, setLength] = useState('medium')
  const [includeKeywords, setIncludeKeywords] = useState(true)
  const [includeCTA, setIncludeCTA] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)

  const canGenerate = selectedAgent && selectedType && selectedAudience && topic.trim()

  const handleGenerate = async () => {
    if (!canGenerate) return

    setIsGenerating(true)
    setGeneratedContent(null)

    try {
      const response = await fetch('/api/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedType,
          agent: selectedAgent,
          topic: topic,
          audience: selectedAudience,
          consciousness_level: selectedLevel || 'understanding',
          length: length,
          format: 'markdown',
          include_cta: includeCTA,
          seo_keywords: includeKeywords ? undefined : []
        })
      })

      if (response.ok) {
        const content = await response.json()
        setGeneratedContent(content)
      } else {
        console.error('Content generation failed')
      }
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
<main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20 mb-6">
              <PenTool className="h-10 w-10 text-purple-200" />
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Creator Toolkit
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Frank's AI-powered creator tools. Generate high-quality content with specialized agents
              designed to amplify your creative expression, not replace it.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🎨 Creator-Focused
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🎵 Music-First Approach
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                ⚡ Frank's Proven Methods
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Content Configuration */}
              <div className="lg:col-span-2 space-y-8">
                {/* Agent Selection */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">Choose Your AI Agent</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {agents.map((agent) => (
                      <div
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                          selectedAgent === agent.id
                            ? 'border-purple-500/50 bg-purple-500/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{agent.icon}</span>
                          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{agent.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Type Selection */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">Content Type</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    {contentTypes.map((type) => {
                      const IconComponent = type.icon
                      return (
                        <div
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`cursor-pointer rounded-2xl border p-6 text-center transition-all ${
                            selectedType === type.id
                              ? 'border-blue-500/50 bg-blue-500/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-3">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                          <p className="text-sm text-white/70 mb-2">{type.description}</p>
                          <div className="text-xs text-white/50">{type.estimatedTime}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Topic and Settings */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">Content Configuration</h2>

                  <div className="space-y-6">
                    {/* Topic Input */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Topic or Theme
                      </label>
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'AI-powered music creation for healing'"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    {/* Audience Selection */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Target Audience
                      </label>
                      <div className="grid gap-3 md:grid-cols-2">
                        {audiences.map((audience) => (
                          <div
                            key={audience.id}
                            onClick={() => setSelectedAudience(audience.id)}
                            className={`cursor-pointer rounded-xl border p-4 transition-all ${
                              selectedAudience === audience.id
                                ? 'border-green-500/50 bg-green-500/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <h4 className="font-medium text-white">{audience.name}</h4>
                            <p className="text-sm text-white/70">{audience.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Depth Level */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Depth Level
                      </label>
                      <div className="grid gap-3 md:grid-cols-2">
                        {depthLevels.map((level) => (
                          <div
                            key={level.id}
                            onClick={() => setSelectedLevel(level.id)}
                            className={`cursor-pointer rounded-xl border p-4 transition-all ${
                              selectedLevel === level.id
                                ? 'border-yellow-500/50 bg-yellow-500/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <h4 className="font-medium text-white">{level.name}</h4>
                            <p className="text-sm text-white/70">{level.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Length */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Content Length
                      </label>
                      <div className="grid gap-3 grid-cols-3">
                        {['short', 'medium', 'long'].map((lengthOption) => (
                          <div
                            key={lengthOption}
                            onClick={() => setLength(lengthOption)}
                            className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                              length === lengthOption
                                ? 'border-indigo-500/50 bg-indigo-500/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <div className="font-medium text-white capitalize">{lengthOption}</div>
                            <div className="text-sm text-white/70">
                              {lengthOption === 'short' ? '~500 words' :
                               lengthOption === 'medium' ? '~1500 words' : '~3000 words'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeKeywords}
                          onChange={(e) => setIncludeKeywords(e.target.checked)}
                          className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500/20"
                        />
                        <span className="text-sm text-white/80">Include SEO Keywords</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeCTA}
                          onChange={(e) => setIncludeCTA(e.target.checked)}
                          className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500/20"
                        />
                        <span className="text-sm text-white/80">Include Call to Action</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generation Panel */}
              <div className="space-y-8">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sticky top-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">Generate Content</h2>

                  <div className="space-y-6">
                    <button
                      onClick={handleGenerate}
                      disabled={!canGenerate || isGenerating}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition ${
                        canGenerate && !isGenerating
                          ? 'bg-purple-500 hover:bg-purple-400 text-white'
                          : 'bg-white/10 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" />
                          Generate Content
                        </>
                      )}
                    </button>

                    {generatedContent && (
                      <div className="space-y-4">
                        <div className="rounded-xl bg-white/5 p-4">
                          <div className="text-sm text-white/60 mb-2">Generated Title</div>
                          <div className="font-medium text-white">{generatedContent.title}</div>
                        </div>

                        <div className="rounded-xl bg-white/5 p-4">
                          <div className="text-sm text-white/60 mb-2">Statistics</div>
                          <div className="space-y-1 text-sm text-white/80">
                            <div>Read Time: {generatedContent.estimated_read_time} min</div>
                            <div>Quality Score: {generatedContent.consciousness_alignment_score}/10</div>
                            <div>Keywords: {generatedContent.keywords?.length || 0}</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 px-4 py-3 text-sm font-semibold text-white transition">
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 px-4 py-3 text-sm font-semibold text-white transition">
                            <Send className="h-4 w-4" />
                            Share
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Content Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Content Generated</span>
                      <span className="text-sm font-medium text-white">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Avg Quality Score</span>
                      <span className="text-sm font-medium text-white">8.6/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Top Performing Agent</span>
                      <span className="text-sm font-medium text-white">Creation Engine</span>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-3 text-sm font-semibold text-white transition"
                  >
                    <BarChart3 className="h-4 w-4" />
                    View Full Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Generated Content Display */}
        {generatedContent && (
          <section className="px-6 pt-20">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Generated Content</h2>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-purple-500 hover:bg-purple-400 px-4 py-2 text-sm font-semibold text-white transition">
                      <Settings className="h-4 w-4" />
                      Edit
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 px-4 py-2 text-sm font-semibold text-white transition">
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h1>{generatedContent.title}</h1>
                  <div className="whitespace-pre-wrap">{generatedContent.content}</div>

                  {generatedContent.call_to_action && (
                    <div className="mt-8 p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <h3 className="text-lg font-semibold text-purple-200 mb-2">Call to Action</h3>
                      <p className="text-white/80">{generatedContent.call_to_action}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-sm text-white/50">
                    {generatedContent.agent_signature}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
</div>
  )
}