'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator,
  Brain,
  Target,
  BarChart3,
  Shield,
  Zap,
  Users,
  FileText,
  Settings,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Star,
  Download,
  Play,
  Sparkles,
  Search,
  Filter,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import {
  StaggerContainer,
  StaggerItem,
  MagneticHover,
  GlowPulse,
  InteractiveCard
} from '@/components/ui/AdvancedAnimations'

type Tool = {
  id: string
  title: string
  description: string
  category: 'calculator' | 'generator' | 'analyzer' | 'planner' | 'simulator'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeEstimate: string
  icon: any
  color: string
  features: string[]
  href: string
  isPremium: boolean
  isNew: boolean
  usageCount: number
  rating: number
}

const tools: Tool[] = [
  {
    id: 'roi-calculator',
    title: 'AI ROI Calculator',
    description: 'Calculate the return on investment for your AI initiatives with detailed financial modeling.',
    category: 'calculator',
    difficulty: 'intermediate',
    timeEstimate: '10 minutes',
    icon: Calculator,
    color: 'from-green-500 to-emerald-500',
    features: ['Cost-benefit analysis', 'Timeline projections', 'Risk assessment', 'Executive reports'],
    href: '/tools/roi-calculator',
    isPremium: false,
    isNew: true,
    usageCount: 1247,
    rating: 4.9
  },
  {
    id: 'prompt-optimizer',
    title: 'Prompt Optimizer',
    description: 'Enhance your AI prompts for better results using proven optimization techniques.',
    category: 'generator',
    difficulty: 'beginner',
    timeEstimate: '5 minutes',
    icon: Brain,
    color: 'from-purple-500 to-violet-500',
    features: ['Real-time optimization', 'Multiple AI models', 'Performance scoring', 'Template library'],
    href: '/tools/prompt-optimizer',
    isPremium: false,
    isNew: false,
    usageCount: 3421,
    rating: 4.8
  },
  {
    id: 'strategy-canvas',
    title: 'AI Strategy Canvas',
    description: 'Visual planning tool for designing comprehensive AI implementation strategies.',
    category: 'planner',
    difficulty: 'intermediate',
    timeEstimate: '30 minutes',
    icon: Target,
    color: 'from-blue-500 to-indigo-500',
    features: ['Visual mapping', 'Stakeholder analysis', 'Timeline planning', 'Export options'],
    href: '/tools/strategy-canvas',
    isPremium: true,
    isNew: false,
    usageCount: 892,
    rating: 4.7
  },
  {
    id: 'risk-analyzer',
    title: 'AI Risk Analyzer',
    description: 'Comprehensive risk assessment for AI implementations and deployments.',
    category: 'analyzer',
    difficulty: 'advanced',
    timeEstimate: '20 minutes',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    features: ['Risk scoring', 'Mitigation strategies', 'Compliance check', 'Action plans'],
    href: '/tools/risk-analyzer',
    isPremium: true,
    isNew: true,
    usageCount: 634,
    rating: 4.9
  },
  {
    id: 'agent-builder',
    title: 'Agent Configuration Builder',
    description: 'Design and configure AI agents with our intuitive visual interface.',
    category: 'simulator',
    difficulty: 'advanced',
    timeEstimate: '45 minutes',
    icon: Settings,
    color: 'from-cyan-500 to-teal-500',
    features: ['Drag & drop interface', 'Testing environment', 'Export configs', 'Template gallery'],
    href: '/tools/agent-builder',
    isPremium: true,
    isNew: false,
    usageCount: 456,
    rating: 4.6
  },
  {
    id: 'performance-tracker',
    title: 'AI Performance Tracker',
    description: 'Monitor and optimize the performance of your AI systems and workflows.',
    category: 'analyzer',
    difficulty: 'intermediate',
    timeEstimate: '15 minutes',
    icon: BarChart3,
    color: 'from-yellow-500 to-orange-500',
    features: ['Real-time monitoring', 'Performance metrics', 'Trend analysis', 'Alerts system'],
    href: '/tools/performance-tracker',
    isPremium: false,
    isNew: false,
    usageCount: 1876,
    rating: 4.5
  },
  {
    id: 'content-generator',
    title: 'AI Content Generator',
    description: 'Generate high-quality content using advanced AI with custom templates.',
    category: 'generator',
    difficulty: 'beginner',
    timeEstimate: '5 minutes',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    features: ['Multiple content types', 'Custom templates', 'Bulk generation', 'Quality scoring'],
    href: '/tools/content-generator',
    isPremium: false,
    isNew: false,
    usageCount: 5234,
    rating: 4.4
  },
  {
    id: 'team-readiness',
    title: 'Team Readiness Assessment',
    description: 'Evaluate your team\'s readiness for AI adoption and identify training needs.',
    category: 'analyzer',
    difficulty: 'beginner',
    timeEstimate: '25 minutes',
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    features: ['Skills assessment', 'Training recommendations', 'Readiness scoring', 'Action plans'],
    href: '/tools/team-readiness',
    isPremium: true,
    isNew: true,
    usageCount: 723,
    rating: 4.8
  }
]

const categories = [
  { id: 'all', label: 'All Tools', icon: Sparkles },
  { id: 'calculator', label: 'Calculators', icon: Calculator },
  { id: 'generator', label: 'Generators', icon: Zap },
  { id: 'analyzer', label: 'Analyzers', icon: BarChart3 },
  { id: 'planner', label: 'Planners', icon: Target },
  { id: 'simulator', label: 'Simulators', icon: Settings }
]

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = !selectedDifficulty || tool.difficulty === selectedDifficulty

    return matchesCategory && matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: Tool['difficulty']) => {
    const colors = {
      beginner: 'text-green-400 bg-green-500/20',
      intermediate: 'text-yellow-400 bg-yellow-500/20',
      advanced: 'text-red-400 bg-red-500/20'
    }
    return colors[difficulty]
  }

  const getCategoryColor = (category: Tool['category']) => {
    const colors = {
      calculator: 'text-green-400',
      generator: 'text-purple-400',
      analyzer: 'text-blue-400',
      planner: 'text-cyan-400',
      simulator: 'text-orange-400'
    }
    return colors[category]
  }

  return (
    <div className="min-h-screen bg-void text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <StaggerContainer>
          <StaggerItem>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8">
                <Zap className="w-4 h-4 mr-2" />
                Interactive AI Tools
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-purple-200 to-slate-300 bg-clip-text text-transparent">
                Hands-On AI Tools
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Professional-grade tools designed by our Agent Team to accelerate your AI implementation journey
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">
                    {tools.length}+
                  </div>
                  <div className="text-slate-400 text-sm">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-cyan-300 mb-2">
                    50K+
                  </div>
                  <div className="text-slate-400 text-sm">Monthly Uses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-green-300 mb-2">
                    4.8/5
                  </div>
                  <div className="text-slate-400 text-sm">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-orange-300 mb-2">
                    100%
                  </div>
                  <div className="text-slate-400 text-sm">Free to Start</div>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Filters */}
          <StaggerItem>
            <GlassmorphicCard variant="premium" className="p-8 mb-12">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                        selectedCategory === category.id
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                          : 'bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:bg-slate-700/30'
                      )}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex gap-2">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === level ? null : level)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize',
                        selectedDifficulty === level
                          ? getDifficultyColor(level as Tool['difficulty'])
                          : 'bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:bg-slate-700/30'
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </GlassmorphicCard>
          </StaggerItem>

          {/* Tools Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <StaggerItem key={tool.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <InteractiveCard>
                    <GlassmorphicCard
                      variant="luxury"
                      hover
                      className="h-full p-8 flex flex-col relative overflow-hidden"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center', tool.color)}>
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex flex-col gap-2">
                          {tool.isNew && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                              New
                            </span>
                          )}
                          {tool.isPremium && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 mb-6">
                        <h3 className="text-xl font-bold mb-3 text-slate-100">
                          {tool.title}
                        </h3>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                          {tool.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {tool.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-slate-400">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                          {tool.features.length > 3 && (
                            <div className="text-sm text-slate-500">
                              +{tool.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
                        <div className="flex items-center gap-4">
                          <span className={cn('px-2 py-1 rounded-full', getDifficultyColor(tool.difficulty))}>
                            {tool.difficulty}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {tool.timeEstimate}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-400" />
                            {tool.rating}
                          </span>
                          <span className={getCategoryColor(tool.category)}>
                            {tool.usageCount.toLocaleString()} uses
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex gap-3">
                        <PremiumButton
                          variant={tool.isPremium ? "luxury" : "primary"}
                          size="lg"
                          href={tool.href}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {tool.isPremium ? 'Try Premium' : 'Use Tool'}
                        </PremiumButton>
                        <PremiumButton
                          variant="ghost"
                          size="lg"
                          href={`${tool.href}/docs`}
                        >
                          <BookOpen className="w-4 h-4" />
                        </PremiumButton>
                      </div>

                      {/* Glow Effect for Premium Tools */}
                      {tool.isPremium && (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 rounded-2xl pointer-events-none" />
                      )}
                    </GlassmorphicCard>
                  </InteractiveCard>
                </motion.div>
              </StaggerItem>
            ))}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <StaggerItem>
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-4">No tools found</h3>
                <p className="text-slate-400 mb-8">Try adjusting your filters or search terms</p>
                <PremiumButton
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedDifficulty(null)
                  }}
                >
                  Clear Filters
                </PremiumButton>
              </div>
            </StaggerItem>
          )}

          {/* CTA Section */}
          <StaggerItem>
            <div className="mt-20">
              <GlassmorphicCard variant="luxury" className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-purple-200 bg-clip-text text-transparent">
                  Need a Custom Tool?
                </h2>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                  Our Agent Team can create custom tools tailored to your specific needs and industry requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GlowPulse color="purple">
                    <PremiumButton variant="luxury" size="xl" href="/contact">
                      Request Custom Tool
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </PremiumButton>
                  </GlowPulse>
                  <PremiumButton variant="ghost" size="xl" href="/tools/builder">
                    <Settings className="w-5 h-5 mr-2" />
                    Tool Builder (Coming Soon)
                  </PremiumButton>
                </div>
              </GlassmorphicCard>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}