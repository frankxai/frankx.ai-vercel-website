'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, Star, Award, CheckCircle, TrendingUp, Target, Zap, Brain, Shield, Heart, MessageCircle, Video, Phone, Globe, ArrowRight, Play, Download, ExternalLink, User, MapPin, Trophy, Bookmark, Share2, ChevronRight, X, Filter, Search } from 'lucide-react'

interface Coach {
  id: string
  name: string
  title: string
  expertise: string[]
  experience: string
  avatar: string
  rating: number
  reviews: number
  sessions: number
  languages: string[]
  timezone: string
  hourlyRate: number
  bio: string
  specializations: string[]
  certifications: string[]
  achievements: string[]
  availability: {
    days: string[]
    times: string[]
  }
  featured: boolean
  verified: boolean
}

interface Program {
  id: string
  type: 'coaching' | 'certification' | 'mentorship' | 'workshop'
  title: string
  subtitle: string
  description: string
  duration: string
  format: 'one-on-one' | 'group' | 'self-paced' | 'hybrid'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: string
  price: number
  originalPrice?: number
  currency: string
  features: string[]
  curriculum: {
    modules: Array<{
      title: string
      duration: string
      topics: string[]
    }>
  }
  outcomes: string[]
  prerequisites: string[]
  certification: {
    included: boolean
    name?: string
    accreditation?: string
    validity?: string
  }
  instructor: Coach
  schedule: {
    sessions: number
    frequency: string
    duration: string
  }
  support: {
    community: boolean
    oneOnOne: boolean
    resources: boolean
    lifetime: boolean
  }
  guarantee: {
    moneyBack: number
    satisfaction: boolean
    replacement: boolean
  }
  stats: {
    students: number
    completionRate: number
    satisfaction: number
    careerImpact: string
  }
  testimonials: Array<{
    student: string
    role: string
    company: string
    feedback: string
    rating: number
    outcome: string
  }>
  featured: boolean
  popular: boolean
  limited: boolean
}

export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState<'programs' | 'coaches' | 'certifications' | 'success'>('programs')
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all',
    level: 'all',
    format: 'all',
    price: 'all'
  })

  // Mock data
  const coaches: Coach[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'AI Strategy & Leadership Coach',
      expertise: ['AI Strategy', 'Leadership', 'Digital Transformation', 'Executive Coaching'],
      experience: '15+ years',
      avatar: '/placeholder-coach-1.jpg',
      rating: 4.9,
      reviews: 247,
      sessions: 1200,
      languages: ['English', 'Mandarin'],
      timezone: 'PST',
      hourlyRate: 350,
      bio: 'Former Chief AI Officer with deep experience helping executives navigate AI transformation and build high-performing teams.',
      specializations: ['C-Suite AI Strategy', 'Team Leadership', 'Change Management'],
      certifications: ['ICF Master Certified Coach', 'AI Ethics Certificate', 'Stanford Executive Program'],
      achievements: ['Coached 50+ executives', 'Led $100M+ AI initiatives', 'TEDx Speaker'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        times: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
      },
      featured: true,
      verified: true
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      title: 'Technical AI Implementation Specialist',
      expertise: ['AI Development', 'Machine Learning', 'System Architecture', 'Technical Leadership'],
      experience: '12+ years',
      avatar: '/placeholder-coach-2.jpg',
      rating: 4.8,
      reviews: 189,
      sessions: 850,
      languages: ['English', 'Spanish'],
      timezone: 'EST',
      hourlyRate: 275,
      bio: 'Former Google AI engineer specializing in practical AI implementation and technical team development.',
      specializations: ['AI Implementation', 'Code Review', 'Architecture Design'],
      certifications: ['Google Cloud AI Architect', 'AWS ML Specialist', 'Scrum Master'],
      achievements: ['Built AI systems for Fortune 500', '1000+ developers mentored', 'Open source contributor'],
      availability: {
        days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        times: ['10:00 AM', '1:00 PM', '3:00 PM', '6:00 PM']
      },
      featured: true,
      verified: true
    }
  ]

  const programs: Program[] = [
    {
      id: '1',
      type: 'coaching',
      title: 'Executive AI Leadership Program',
      subtitle: 'Transform Your Organization with AI',
      description: 'Comprehensive 12-week program designed for executives and senior leaders to master AI strategy, implementation, and organizational transformation.',
      duration: '12 weeks',
      format: 'hybrid',
      level: 'advanced',
      category: 'Leadership & Strategy',
      price: 12500,
      originalPrice: 15000,
      currency: 'USD',
      features: [
        '12 weekly 1-on-1 strategy sessions',
        'Group mastermind sessions',
        'AI transformation playbook',
        'ROI measurement framework',
        'Executive team workshops',
        'Lifetime community access'
      ],
      curriculum: {
        modules: [
          {
            title: 'AI Strategy Foundation',
            duration: '2 weeks',
            topics: ['AI Landscape Analysis', 'Strategic Planning', 'Competitive Intelligence']
          },
          {
            title: 'Implementation Roadmap',
            duration: '3 weeks',
            topics: ['Technology Assessment', 'Team Building', 'Change Management']
          },
          {
            title: 'Execution & Scale',
            duration: '4 weeks',
            topics: ['Pilot Programs', 'Performance Metrics', 'Scaling Strategy']
          },
          {
            title: 'Leadership Excellence',
            duration: '3 weeks',
            topics: ['Team Development', 'Communication', 'Future Vision']
          }
        ]
      },
      outcomes: [
        'Develop comprehensive AI strategy',
        'Build high-performing AI teams',
        'Achieve measurable ROI from AI initiatives',
        'Lead successful organizational transformation'
      ],
      prerequisites: ['C-Suite or VP level', '5+ years leadership experience', 'Basic AI familiarity'],
      certification: {
        included: true,
        name: 'Certified AI Executive Leader',
        accreditation: 'FrankX Institute',
        validity: 'Lifetime'
      },
      instructor: coaches[0],
      schedule: {
        sessions: 12,
        frequency: 'Weekly',
        duration: '90 minutes'
      },
      support: {
        community: true,
        oneOnOne: true,
        resources: true,
        lifetime: true
      },
      guarantee: {
        moneyBack: 30,
        satisfaction: true,
        replacement: true
      },
      stats: {
        students: 150,
        completionRate: 94,
        satisfaction: 4.9,
        careerImpact: '89% promoted within 12 months'
      },
      testimonials: [
        {
          student: 'Jennifer Walsh',
          role: 'CEO',
          company: 'TechFlow Inc',
          feedback: 'This program transformed our entire approach to AI. We achieved 300% ROI in the first 6 months.',
          rating: 5,
          outcome: 'Led $50M AI transformation'
        }
      ],
      featured: true,
      popular: true,
      limited: false
    },
    {
      id: '2',
      type: 'certification',
      title: 'AI Product Manager Certification',
      subtitle: 'Master AI Product Development',
      description: 'Comprehensive certification program for product managers looking to excel in AI product development and management.',
      duration: '8 weeks',
      format: 'self-paced',
      level: 'intermediate',
      category: 'Product Management',
      price: 3500,
      originalPrice: 4500,
      currency: 'USD',
      features: [
        'Self-paced learning modules',
        'Real-world case studies',
        'AI product portfolio project',
        'Mentor support sessions',
        'Peer collaboration groups',
        'Industry certification'
      ],
      curriculum: {
        modules: [
          {
            title: 'AI Product Fundamentals',
            duration: '2 weeks',
            topics: ['AI Product Lifecycle', 'Market Analysis', 'User Research']
          },
          {
            title: 'Technical Foundation',
            duration: '2 weeks',
            topics: ['AI/ML Basics', 'Data Requirements', 'Model Selection']
          },
          {
            title: 'Product Development',
            duration: '3 weeks',
            topics: ['Agile for AI', 'MVP Development', 'Testing Strategies']
          },
          {
            title: 'Launch & Scale',
            duration: '1 week',
            topics: ['Go-to-Market', 'Metrics', 'Continuous Improvement']
          }
        ]
      },
      outcomes: [
        'Develop AI product strategy',
        'Manage AI development teams',
        'Launch successful AI products',
        'Drive product-market fit'
      ],
      prerequisites: ['2+ years product management', 'Basic technical knowledge', 'Portfolio of products'],
      certification: {
        included: true,
        name: 'Certified AI Product Manager',
        accreditation: 'Product Management Institute',
        validity: '2 years'
      },
      instructor: coaches[1],
      schedule: {
        sessions: 8,
        frequency: 'Self-paced',
        duration: 'Flexible'
      },
      support: {
        community: true,
        oneOnOne: false,
        resources: true,
        lifetime: false
      },
      guarantee: {
        moneyBack: 14,
        satisfaction: true,
        replacement: false
      },
      stats: {
        students: 890,
        completionRate: 87,
        satisfaction: 4.7,
        careerImpact: '73% salary increase average'
      },
      testimonials: [
        {
          student: 'David Kim',
          role: 'Senior PM',
          company: 'Innovation Labs',
          feedback: 'The best investment in my career. Now leading AI products at a unicorn startup.',
          rating: 5,
          outcome: 'Promoted to VP Product'
        }
      ],
      featured: false,
      popular: true,
      limited: false
    }
  ]

  const certificationPrograms = programs.filter(p => p.type === 'certification')
  const coachingPrograms = programs.filter(p => p.type === 'coaching')

  const filteredPrograms = programs.filter(program => {
    if (filters.type !== 'all' && program.type !== filters.type) return false
    if (filters.level !== 'all' && program.level !== filters.level) return false
    if (filters.format !== 'all' && program.format !== filters.format) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium AI
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Coaching</span>
            <br />& Certification
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Accelerate your AI transformation with world-class coaching programs, industry-recognized certifications,
            and personalized mentorship from leading AI experts and practitioners.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { label: 'Success Rate', value: '94%', icon: Trophy },
              { label: 'Career Impact', value: '89%', icon: TrendingUp },
              { label: 'Expert Coaches', value: '50+', icon: Users },
              { label: 'Avg ROI', value: '340%', icon: Target }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
              >
                <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore Programs
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </motion.button>
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm rounded-t-xl">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'programs', label: 'All Programs', icon: Target },
                { id: 'coaches', label: 'Expert Coaches', icon: Users },
                { id: 'certifications', label: 'Certifications', icon: Award },
                { id: 'success', label: 'Success Stories', icon: Trophy }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative py-4 px-1 font-medium text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <motion.div
                key="programs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg mb-8">
                  <div className="grid md:grid-cols-4 gap-4">
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="coaching">Coaching</option>
                      <option value="certification">Certification</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="workshop">Workshop</option>
                    </select>
                    <select
                      value={filters.level}
                      onChange={(e) => setFilters({...filters, level: e.target.value})}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                    <select
                      value={filters.format}
                      onChange={(e) => setFilters({...filters, format: e.target.value})}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Formats</option>
                      <option value="one-on-one">1-on-1</option>
                      <option value="group">Group</option>
                      <option value="self-paced">Self-Paced</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    <select
                      value={filters.price}
                      onChange={(e) => setFilters({...filters, price: e.target.value})}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Prices</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="over-10k">Over $10,000</option>
                    </select>
                  </div>
                </div>

                {/* Programs Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredPrograms.map((program, index) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex gap-2 mb-2">
                              {program.featured && (
                                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                                  Featured
                                </span>
                              )}
                              {program.popular && (
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                                  Most Popular
                                </span>
                              )}
                              {program.limited && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                                  Limited Time
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {program.title}
                            </h3>
                            <p className="text-blue-600 font-medium mb-2">{program.subtitle}</p>
                            <p className="text-gray-600 mb-4">{program.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">{program.duration}</div>
                            <div className="text-xs text-gray-500">Duration</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">{program.format}</div>
                            <div className="text-xs text-gray-500">Format</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">{program.stats.satisfaction}</div>
                            <div className="text-xs text-gray-500">Rating</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Trophy className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">{program.stats.completionRate}%</div>
                            <div className="text-xs text-gray-500">Complete</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {program.instructor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{program.instructor.name}</p>
                              <p className="text-sm text-gray-600">{program.instructor.title}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${program.price.toLocaleString()}
                            </div>
                            {program.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${program.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {program.stats.students} students • {program.stats.careerImpact}
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Coaches Tab */}
            {activeTab === 'coaches' && (
              <motion.div
                key="coaches"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {coaches.map((coach, index) => (
                  <motion.div
                    key={coach.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedCoach(coach)}
                  >
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                          {coach.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {coach.verified && (
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{coach.name}</h3>
                        <p className="text-blue-600 font-medium mb-2">{coach.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{coach.rating}</span>
                          </div>
                          <span>{coach.reviews} reviews</span>
                          <span>{coach.sessions} sessions</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{coach.bio}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">${coach.hourlyRate}</div>
                        <div className="text-xs text-gray-500">per hour</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{coach.experience}</div>
                        <div className="text-xs text-gray-500">experience</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.expertise.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {coach.expertise.length > 3 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{coach.expertise.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {coach.languages.join(', ')} • {coach.timezone}
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Book Session
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Industry-Recognized Certifications</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Advance your career with certifications that are valued by top employers worldwide
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {certificationPrograms.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="text-center mb-6">
                        <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.certification.name}</h3>
                        <p className="text-sm text-gray-600">{cert.certification.accreditation}</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <span className="text-sm font-medium">{cert.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Format:</span>
                          <span className="text-sm font-medium capitalize">{cert.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Level:</span>
                          <span className="text-sm font-medium capitalize">{cert.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Validity:</span>
                          <span className="text-sm font-medium">{cert.certification.validity}</span>
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          ${cert.price.toLocaleString()}
                        </div>
                        {cert.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${cert.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Enroll Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Success Stories Tab */}
            {activeTab === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Transformation Stories</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Real results from professionals who transformed their careers with our programs
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {programs.flatMap(p => p.testimonials).map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                        "{testimonial.feedback}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.student}</p>
                          <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{testimonial.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProgram.title}</h1>
                    <p className="text-xl text-blue-600 font-medium">{selectedProgram.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-lg text-gray-600 mb-8">{selectedProgram.description}</p>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Curriculum</h3>
                      <div className="space-y-4">
                        {selectedProgram.curriculum.modules.map((module, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{module.title}</h4>
                              <span className="text-sm text-gray-500">{module.duration}</span>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {module.topics.map((topic, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Outcomes</h3>
                      <ul className="space-y-2">
                        {selectedProgram.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          ${selectedProgram.price.toLocaleString()}
                        </div>
                        {selectedProgram.originalPrice && (
                          <div className="text-lg text-gray-500 line-through">
                            ${selectedProgram.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <p className="text-sm text-gray-600 mt-2">One-time investment</p>
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all mb-4">
                        Enroll Now
                      </button>

                      <div className="text-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                        {selectedProgram.guarantee.moneyBack}-day money-back guarantee
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Program Stats</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Students:</span>
                          <span className="font-medium">{selectedProgram.stats.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completion Rate:</span>
                          <span className="font-medium">{selectedProgram.stats.completionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Satisfaction:</span>
                          <span className="font-medium">{selectedProgram.stats.satisfaction}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Career Impact:</span>
                          <span className="font-medium text-green-600">{selectedProgram.stats.careerImpact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}