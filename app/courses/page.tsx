'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  TrendingUp,
  Brain,
  Target,
  Shield,
  Zap,
  Download,
  Heart,
  Globe,
  Code,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import {
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  GlowPulse,
  FloatingElement
} from '@/components/ui/AdvancedAnimations'

type Course = {
  id: string
  title: string
  description: string
  instructor: string
  instructorTitle: string
  category: 'fundamentals' | 'advanced' | 'business' | 'technical' | 'ethics'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessonsCount: number
  studentsCount: number
  rating: number
  reviewsCount: number
  price: number
  originalPrice?: number
  thumbnail: string
  tags: string[]
  skills: string[]
  certificateIncluded: boolean
  downloadableResources: boolean
  liveSupport: boolean
  isPremium: boolean
  isNew: boolean
  isBestseller: boolean
  completionRate: number
  learningObjectives: string[]
  prerequisites: string[]
  href: string
}

const courses: Course[] = [
  {
    id: 'conscious-ai-foundations',
    title: 'Creative AI Foundations',
    description: 'Master the philosophical and practical foundations of conscious AI implementation, designed by our Agent Team for ethical and effective AI adoption.',
    instructor: 'FrankX Agent Team',
    instructorTitle: 'Collective Intelligence',
    category: 'fundamentals',
    level: 'beginner',
    duration: '6 hours',
    lessonsCount: 24,
    studentsCount: 12847,
    rating: 4.9,
    reviewsCount: 2341,
    price: 0,
    thumbnail: '/images/courses/foundations.jpg',
    tags: ['Ethics', 'Philosophy', 'Strategy'],
    skills: ['AI Ethics', 'Strategic Thinking', 'Decision Making'],
    certificateIncluded: true,
    downloadableResources: true,
    liveSupport: true,
    isPremium: false,
    isNew: false,
    isBestseller: true,
    completionRate: 87,
    learningObjectives: [
      'Understand the principles of conscious AI',
      'Develop ethical AI implementation strategies',
      'Create responsible AI governance frameworks',
      'Apply conscious decision-making to AI projects'
    ],
    prerequisites: [],
    href: '/courses/conscious-ai-foundations'
  },
  {
    id: 'prompt-engineering-mastery',
    title: 'Prompt Engineering Mastery',
    description: 'Advanced techniques for crafting effective AI prompts across different models and use cases. From basic commands to complex multi-agent orchestration.',
    instructor: 'Dr. Sarah Chen',
    instructorTitle: 'AI Researcher & Prompt Architect',
    category: 'technical',
    level: 'intermediate',
    duration: '8 hours',
    lessonsCount: 32,
    studentsCount: 8392,
    rating: 4.8,
    reviewsCount: 1576,
    price: 197,
    originalPrice: 297,
    thumbnail: '/images/courses/prompt-engineering.jpg',
    tags: ['Prompting', 'Optimization', 'Multi-model'],
    skills: ['Prompt Design', 'Model Understanding', 'Output Optimization'],
    certificateIncluded: true,
    downloadableResources: true,
    liveSupport: true,
    isPremium: true,
    isNew: true,
    isBestseller: false,
    completionRate: 92,
    learningObjectives: [
      'Master advanced prompting techniques',
      'Optimize prompts for different AI models',
      'Design complex multi-step prompt chains',
      'Debug and improve prompt performance'
    ],
    prerequisites: ['Basic AI familiarity', 'Completed Foundations course'],
    href: '/courses/prompt-engineering-mastery'
  },
  {
    id: 'ai-business-strategy',
    title: 'AI Business Strategy & Implementation',
    description: 'Comprehensive guide to developing and executing AI strategies that drive real business value. Includes ROI frameworks, change management, and scaling principles.',
    instructor: 'Marcus Rodriguez',
    instructorTitle: 'Fortune 500 AI Strategy Consultant',
    category: 'business',
    level: 'intermediate',
    duration: '12 hours',
    lessonsCount: 48,
    studentsCount: 5234,
    rating: 4.7,
    reviewsCount: 892,
    price: 497,
    originalPrice: 697,
    thumbnail: '/images/courses/business-strategy.jpg',
    tags: ['Strategy', 'ROI', 'Change Management'],
    skills: ['Strategic Planning', 'ROI Analysis', 'Team Leadership'],
    certificateIncluded: true,
    downloadableResources: true,
    liveSupport: true,
    isPremium: true,
    isNew: false,
    isBestseller: true,
    completionRate: 78,
    learningObjectives: [
      'Develop comprehensive AI strategies',
      'Calculate and optimize AI ROI',
      'Lead successful AI transformations',
      'Scale AI initiatives across organizations'
    ],
    prerequisites: ['Business experience', 'Leadership role'],
    href: '/courses/ai-business-strategy'
  },
  {
    id: 'agent-architecture-deep-dive',
    title: 'Agent Architecture Deep Dive',
    description: 'Technical masterclass on designing, building, and orchestrating sophisticated AI agent systems. Based on the FrankX.ai Agent Team architecture.',
    instructor: 'Engineering Team',
    instructorTitle: 'FrankX.ai Core Architects',
    category: 'advanced',
    level: 'advanced',
    duration: '16 hours',
    lessonsCount: 64,
    studentsCount: 2156,
    rating: 4.9,
    reviewsCount: 467,
    price: 997,
    originalPrice: 1497,
    thumbnail: '/images/courses/agent-architecture.jpg',
    tags: ['Architecture', 'Systems', 'Advanced'],
    skills: ['System Design', 'Agent Orchestration', 'Performance Optimization'],
    certificateIncluded: true,
    downloadableResources: true,
    liveSupport: true,
    isPremium: true,
    isNew: true,
    isBestseller: false,
    completionRate: 85,
    learningObjectives: [
      'Design scalable agent architectures',
      'Implement multi-agent coordination',
      'Optimize agent performance and reliability',
      'Deploy production-ready agent systems'
    ],
    prerequisites: ['Programming experience', 'AI fundamentals', 'System design knowledge'],
    href: '/courses/agent-architecture-deep-dive'
  },
  {
    id: 'ai-ethics-governance',
    title: 'AI Ethics & Governance',
    description: 'Navigate the complex landscape of AI ethics, legal considerations, and governance frameworks. Essential for responsible AI deployment.',
    instructor: 'Prof. Jennifer Park',
    instructorTitle: 'AI Ethics Researcher & Policy Expert',
    category: 'ethics',
    level: 'intermediate',
    duration: '10 hours',
    lessonsCount: 40,
    studentsCount: 6789,
    rating: 4.8,
    reviewsCount: 1234,
    price: 297,
    originalPrice: 397,
    thumbnail: '/images/courses/ethics-governance.jpg',
    tags: ['Ethics', 'Governance', 'Compliance'],
    skills: ['Ethical Reasoning', 'Policy Development', 'Risk Assessment'],
    certificateIncluded: true,
    downloadableResources: true,
    liveSupport: true,
    isPremium: true,
    isNew: false,
    isBestseller: false,
    completionRate: 91,
    learningObjectives: [
      'Understand AI ethics frameworks',
      'Develop governance policies',
      'Assess and mitigate AI risks',
      'Ensure compliant AI deployments'
    ],
    prerequisites: ['Basic AI knowledge'],
    href: '/courses/ai-ethics-governance'
  },
  {
    id: 'family-ai-education',
    title: 'Family AI Education & Safety',
    description: 'Comprehensive guide for parents and educators on introducing AI concepts safely and effectively to children and families.',
    instructor: 'Maya Thompson',
    instructorTitle: 'EdTech Specialist & Parent Educator',
    category: 'fundamentals',
    level: 'beginner',
    duration: '4 hours',
    lessonsCount: 16,
    studentsCount: 3456,
    rating: 4.9,
    reviewsCount: 678,
    price: 97,
    originalPrice: 147,
    thumbnail: '/images/courses/family-education.jpg',
    tags: ['Family', 'Education', 'Safety'],
    skills: ['Child Education', 'Safety Protocols', 'Age-appropriate Content'],
    certificateIncluded: true,
    downloadableResources: true,
    liveSupport: true,
    isPremium: false,
    isNew: true,
    isBestseller: false,
    completionRate: 95,
    learningObjectives: [
      'Introduce AI concepts to children',
      'Establish family AI safety protocols',
      'Create age-appropriate AI learning experiences',
      'Foster healthy AI relationships in families'
    ],
    prerequisites: [],
    href: '/courses/family-ai-education'
  }
]

const categories = [
  { id: 'all', label: 'All Courses', icon: BookOpen, color: 'text-slate-400' },
  { id: 'fundamentals', label: 'Fundamentals', icon: Heart, color: 'text-green-400' },
  { id: 'technical', label: 'Technical', icon: Code, color: 'text-blue-400' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'text-purple-400' },
  { id: 'advanced', label: 'Advanced', icon: Brain, color: 'text-red-400' },
  { id: 'ethics', label: 'Ethics', icon: Shield, color: 'text-yellow-400' }
]

const levels = [
  { id: 'beginner', label: 'Beginner', color: 'text-green-400 bg-green-500/20' },
  { id: 'intermediate', label: 'Intermediate', color: 'text-yellow-400 bg-yellow-500/20' },
  { id: 'advanced', label: 'Advanced', color: 'text-red-400 bg-red-500/20' }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'price'>('popular')

  const filteredCourses = courses
    .filter(course => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      const matchesLevel = !selectedLevel || course.level === selectedLevel
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesLevel && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.studentsCount - a.studentsCount
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'price':
          return a.price - b.price
        default:
          return 0
      }
    })

  const getLevelColor = (level: Course['level']) => {
    const levelData = levels.find(l => l.id === level)
    return levelData?.color || 'text-slate-400 bg-slate-500/20'
  }

  const getCategoryIcon = (category: Course['category']) => {
    const categoryData = categories.find(c => c.id === category)
    return categoryData?.icon || BookOpen
  }

  const getCategoryColor = (category: Course['category']) => {
    const categoryData = categories.find(c => c.id === category)
    return categoryData?.color || 'text-slate-400'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <StaggerContainer>
          <StaggerItem>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
                <BookOpen className="w-4 h-4 mr-2" />
                Agent Team Curated Learning
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-blue-200 to-slate-300 bg-clip-text text-transparent">
                Master Creative AI
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Comprehensive courses designed by our Agent Team to guide you from AI novice to conscious AI practitioner
              </p>

              {/* Course Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <FloatingElement duration={8} offset={10}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-blue-300 mb-2">
                      {courses.length}+
                    </div>
                    <div className="text-slate-400 text-sm">Expert Courses</div>
                  </div>
                </FloatingElement>
                <FloatingElement duration={9} offset={12}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-green-300 mb-2">
                      35K+
                    </div>
                    <div className="text-slate-400 text-sm">Students Taught</div>
                  </div>
                </FloatingElement>
                <FloatingElement duration={7} offset={8}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">
                      4.8/5
                    </div>
                    <div className="text-slate-400 text-sm">Average Rating</div>
                  </div>
                </FloatingElement>
                <FloatingElement duration={10} offset={14}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-cyan-300 mb-2">
                      89%
                    </div>
                    <div className="text-slate-400 text-sm">Completion Rate</div>
                  </div>
                </FloatingElement>
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
                      placeholder="Search courses, skills, or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
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
                          ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                          : 'bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:bg-slate-700/30'
                      )}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Level & Sort */}
                <div className="flex gap-2">
                  <select
                    value={selectedLevel || ''}
                    onChange={(e) => setSelectedLevel(e.target.value || null)}
                    className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="">All Levels</option>
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price">Price: Low to High</option>
                  </select>
                </div>
              </div>
            </GlassmorphicCard>
          </StaggerItem>

          {/* Courses Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <StaggerItem key={course.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <InteractiveCard>
                    <GlassmorphicCard
                      variant="luxury"
                      hover
                      className="h-full flex flex-col relative overflow-hidden"
                    >
                      {/* Course Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={cn('w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center',
                            course.category === 'fundamentals' ? 'from-green-500 to-emerald-500' :
                            course.category === 'technical' ? 'from-blue-500 to-indigo-500' :
                            course.category === 'business' ? 'from-purple-500 to-violet-500' :
                            course.category === 'advanced' ? 'from-red-500 to-orange-500' :
                            'from-yellow-500 to-amber-500'
                          )}>
                            {(() => {
                              const Icon = getCategoryIcon(course.category)
                              return <Icon className="w-8 h-8 text-white" />
                            })()}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {course.isNew && (
                            <span className="px-2 py-1 bg-green-500/90 text-white text-xs rounded-full font-medium">
                              New
                            </span>
                          )}
                          {course.isBestseller && (
                            <span className="px-2 py-1 bg-orange-500/90 text-white text-xs rounded-full font-medium">
                              Bestseller
                            </span>
                          )}
                        </div>

                        <div className="absolute top-4 right-4">
                          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getLevelColor(course.level))}>
                            {course.level}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-2 text-slate-100 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-slate-300 text-sm mb-3 line-clamp-3">
                            {course.description}
                          </p>
                          <div className="text-xs text-slate-400">
                            by {course.instructor} • {course.instructorTitle}
                          </div>
                        </div>

                        {/* Course Stats */}
                        <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <Play className="w-3 h-3 mr-1" />
                            {course.lessonsCount} lessons
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {course.studentsCount.toLocaleString()}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-slate-200 ml-1">{course.rating}</span>
                          </div>
                          <span className="text-xs text-slate-400">({course.reviewsCount} reviews)</span>
                          <div className="ml-auto">
                            <span className="text-xs text-slate-400">{course.completionRate}% completion</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-1">
                            {course.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                            {course.skills.length > 3 && (
                              <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded">
                                +{course.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex items-center gap-4 mb-6 text-xs text-slate-400">
                          {course.certificateIncluded && (
                            <span className="flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              Certificate
                            </span>
                          )}
                          {course.downloadableResources && (
                            <span className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              Resources
                            </span>
                          )}
                          {course.liveSupport && (
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              Support
                            </span>
                          )}
                        </div>

                        {/* Price & CTA */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              {course.price === 0 ? (
                                <span className="text-2xl font-bold text-green-300">Free</span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-slate-100">${course.price}</span>
                                  {course.originalPrice && (
                                    <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className={cn('text-xs px-2 py-1 rounded', getCategoryColor(course.category), 'bg-current bg-opacity-20')}>
                              {categories.find(c => c.id === course.category)?.label}
                            </div>
                          </div>

                          <PremiumButton
                            variant={course.isPremium ? "luxury" : "primary"}
                            size="lg"
                            href={course.href}
                            className="w-full"
                          >
                            {course.price === 0 ? 'Start Learning' : 'Enroll Now'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </PremiumButton>
                        </div>
                      </div>

                      {/* Premium Glow */}
                      {course.isPremium && (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 rounded-2xl pointer-events-none" />
                      )}
                    </GlassmorphicCard>
                  </InteractiveCard>
                </motion.div>
              </StaggerItem>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <StaggerItem>
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-4">No courses found</h3>
                <p className="text-slate-400 mb-8">Try adjusting your filters or search terms</p>
                <PremiumButton
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedLevel(null)
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
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-blue-200 bg-clip-text text-transparent">
                  Ready to Transform Your AI Journey?
                </h2>
                <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                  Join thousands of students who've already mastered conscious AI with our comprehensive learning platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GlowPulse color="blue">
                    <PremiumButton variant="luxury" size="xl" href="/courses/conscious-ai-foundations">
                      Start Free Foundation Course
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </PremiumButton>
                  </GlowPulse>
                  <PremiumButton variant="ghost" size="xl" href="/assessment/advanced">
                    <Target className="w-5 h-5 mr-2" />
                    Take Skill Assessment
                  </PremiumButton>
                </div>
                <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-400">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    30-day money back guarantee
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-400" />
                    Industry-recognized certificates
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-400" />
                    Expert instructor support
                  </span>
                </div>
              </GlassmorphicCard>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}