'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, PlayCircle, TrendingUp, Users, Award, Calendar, MapPin, Building, CheckCircle, ArrowRight, Filter, Search, Heart, Share2, Bookmark, ExternalLink, Linkedin, Twitter, Globe, Target, Zap, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: string
  type: 'text' | 'video' | 'case_study' | 'interview'
  featured: boolean
  verified: boolean
  user: {
    name: string
    title: string
    company: string
    industry: string
    location: string
    avatar: string
    linkedinUrl?: string
    twitterUrl?: string
    websiteUrl?: string
    followers?: number
  }
  content: {
    headline: string
    description: string
    fullStory?: string
    videoUrl?: string
    videoDuration?: string
    audioUrl?: string
    audioDuration?: string
  }
  metrics: {
    rating: number
    results: {
      timeframe: string
      improvements: Array<{
        metric: string
        before: string
        after: string
        improvement: string
      }>
    }
    verified: boolean
  }
  tags: string[]
  category: 'Business Growth' | 'Productivity' | 'AI Implementation' | 'Creative Work' | 'Career Development' | 'Team Management'
  dateSubmitted: string
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  socialProof: {
    companySize: string
    revenueImpact?: string
    teamSize?: string
    clientsHelped?: string
  }
}

interface FilterState {
  category: string
  industry: string
  companySize: string
  rating: number
  type: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([])
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    industry: 'all',
    companySize: 'all',
    rating: 0,
    type: 'all'
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        type: 'case_study',
        featured: true,
        verified: true,
        user: {
          name: 'Sarah Chen',
          title: 'CEO',
          company: 'TechFlow Solutions',
          industry: 'Technology',
          location: 'San Francisco, CA',
          avatar: '/placeholder-avatar-1.jpg',
          linkedinUrl: 'https://linkedin.com/in/sarahchen',
          followers: 15200
        },
        content: {
          headline: 'How AI Transformation Increased Our Revenue by 300% in 6 Months',
          description: 'Our team struggled with efficiency and scaling challenges. After implementing FrankX\'s AI strategies, we completely transformed our operations and achieved unprecedented growth.',
          fullStory: 'When I first discovered FrankX\'s approach to conscious AI, I was skeptical. We were a mid-sized tech company struggling to scale efficiently. Our team was burning out, processes were chaotic, and growth had plateaued. The comprehensive AI implementation strategy changed everything. Within the first month, we had automated 60% of our repetitive tasks. By month three, our team productivity had doubled. By month six, we had achieved a 300% revenue increase and expanded our team by 40% without the usual growing pains. The conscious approach to AI meant we maintained our company culture while scaling exponentially.'
        },
        metrics: {
          rating: 5,
          results: {
            timeframe: '6 months',
            improvements: [
              { metric: 'Revenue Growth', before: '$2M ARR', after: '$8M ARR', improvement: '300%' },
              { metric: 'Team Productivity', before: '65%', after: '92%', improvement: '42%' },
              { metric: 'Customer Satisfaction', before: '3.2/5', after: '4.8/5', improvement: '50%' },
              { metric: 'Operational Efficiency', before: '40%', after: '85%', improvement: '112%' }
            ]
          },
          verified: true
        },
        tags: ['Revenue Growth', 'Team Scaling', 'Process Automation', 'AI Strategy'],
        category: 'Business Growth',
        dateSubmitted: '2024-03-15',
        engagement: {
          likes: 245,
          shares: 67,
          comments: 43
        },
        socialProof: {
          companySize: '50-100 employees',
          revenueImpact: '$6M increase',
          teamSize: '40% growth',
          clientsHelped: '500+ customers'
        }
      },
      {
        id: '2',
        type: 'video',
        featured: true,
        verified: true,
        user: {
          name: 'Marcus Rodriguez',
          title: 'Creative Director',
          company: 'Innovate Studios',
          industry: 'Creative',
          location: 'Austin, TX',
          avatar: '/placeholder-avatar-2.jpg',
          twitterUrl: 'https://twitter.com/marcusrod',
          followers: 8500
        },
        content: {
          headline: 'From Creative Block to Creative Breakthrough with AI',
          description: 'As a creative director, I was struggling with inspiration and efficiency. FrankX\'s creative AI workflows unlocked a new level of creativity I never thought possible.',
          videoUrl: 'https://example.com/video-2',
          videoDuration: '4:32'
        },
        metrics: {
          rating: 5,
          results: {
            timeframe: '3 months',
            improvements: [
              { metric: 'Project Completion Speed', before: '2 weeks', after: '4 days', improvement: '250%' },
              { metric: 'Client Satisfaction', before: '8.2/10', after: '9.8/10', improvement: '20%' },
              { metric: 'Creative Output', before: '3 projects/month', after: '12 projects/month', improvement: '300%' },
              { metric: 'Team Inspiration Score', before: '6/10', after: '9.5/10', improvement: '58%' }
            ]
          },
          verified: true
        },
        tags: ['Creative Process', 'AI Tools', 'Productivity', 'Innovation'],
        category: 'Creative Work',
        dateSubmitted: '2024-03-12',
        engagement: {
          likes: 189,
          shares: 45,
          comments: 28
        },
        socialProof: {
          companySize: '25-50 employees',
          clientsHelped: '100+ brands'
        }
      },
      {
        id: '3',
        type: 'text',
        featured: false,
        verified: true,
        user: {
          name: 'Dr. Emily Thompson',
          title: 'Research Director',
          company: 'MIT Innovation Lab',
          industry: 'Research',
          location: 'Boston, MA',
          avatar: '/placeholder-avatar-3.jpg',
          linkedinUrl: 'https://linkedin.com/in/emilythompson'
        },
        content: {
          headline: 'AI-Enhanced Research Methodology Accelerated Our Discoveries',
          description: 'Implementing AI in our research processes has dramatically improved our ability to analyze data, generate insights, and accelerate breakthrough discoveries.',
          fullStory: 'Our research team was drowning in data and struggling to find meaningful patterns. The AI research methodologies we learned transformed our approach entirely. We can now process months of work in days and our discovery rate has increased exponentially.'
        },
        metrics: {
          rating: 5,
          results: {
            timeframe: '4 months',
            improvements: [
              { metric: 'Research Speed', before: '6 months/study', after: '3 weeks/study', improvement: '800%' },
              { metric: 'Data Analysis Accuracy', before: '85%', after: '98%', improvement: '15%' },
              { metric: 'Publication Rate', before: '2/year', after: '12/year', improvement: '500%' },
              { metric: 'Grant Success Rate', before: '30%', after: '75%', improvement: '150%' }
            ]
          },
          verified: true
        },
        tags: ['Research', 'Data Analysis', 'Academic', 'Innovation'],
        category: 'AI Implementation',
        dateSubmitted: '2024-03-10',
        engagement: {
          likes: 156,
          shares: 34,
          comments: 19
        },
        socialProof: {
          companySize: '100+ employees'
        }
      },
      {
        id: '4',
        type: 'interview',
        featured: false,
        verified: true,
        user: {
          name: 'James Wilson',
          title: 'VP Operations',
          company: 'Global Logistics Inc',
          industry: 'Logistics',
          location: 'Chicago, IL',
          avatar: '/placeholder-avatar-4.jpg',
          websiteUrl: 'https://globallogistics.com'
        },
        content: {
          headline: 'Streamlined Operations and Reduced Costs by 40%',
          description: 'Our logistics operations were complex and costly. AI automation helped us optimize routes, predict maintenance, and improve customer satisfaction significantly.',
          audioUrl: 'https://example.com/audio-4',
          audioDuration: '12:45'
        },
        metrics: {
          rating: 5,
          results: {
            timeframe: '8 months',
            improvements: [
              { metric: 'Operational Costs', before: '$2.5M/quarter', after: '$1.5M/quarter', improvement: '40%' },
              { metric: 'Delivery Time', before: '5.2 days', after: '2.8 days', improvement: '46%' },
              { metric: 'Customer Satisfaction', before: '7.1/10', after: '9.3/10', improvement: '31%' },
              { metric: 'Maintenance Efficiency', before: '60%', after: '89%', improvement: '48%' }
            ]
          },
          verified: true
        },
        tags: ['Operations', 'Cost Reduction', 'Logistics', 'Efficiency'],
        category: 'Business Growth',
        dateSubmitted: '2024-03-08',
        engagement: {
          likes: 98,
          shares: 23,
          comments: 15
        },
        socialProof: {
          companySize: '500+ employees',
          revenueImpact: '$4M savings'
        }
      }
    ]
    setTestimonials(mockTestimonials)
    setFilteredTestimonials(mockTestimonials)
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = testimonials.filter(testimonial => {
      const matchesSearch =
        testimonial.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.content.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = filters.category === 'all' || testimonial.category === filters.category
      const matchesIndustry = filters.industry === 'all' || testimonial.user.industry === filters.industry
      const matchesCompanySize = filters.companySize === 'all' || testimonial.socialProof.companySize === filters.companySize
      const matchesRating = testimonial.metrics.rating >= filters.rating
      const matchesType = filters.type === 'all' || testimonial.type === filters.type

      return matchesSearch && matchesCategory && matchesIndustry && matchesCompanySize && matchesRating && matchesType
    })

    setFilteredTestimonials(filtered)
  }, [testimonials, searchQuery, filters])

  const categories = ['all', 'Business Growth', 'Productivity', 'AI Implementation', 'Creative Work', 'Career Development', 'Team Management']
  const industries = ['all', 'Technology', 'Creative', 'Research', 'Logistics', 'Healthcare', 'Finance', 'Education']
  const companySizes = ['all', '1-10 employees', '11-50 employees', '51-100 employees', '101-500 employees', '500+ employees']
  const types = ['all', 'text', 'video', 'case_study', 'interview']

  const featuredTestimonials = filteredTestimonials.filter(t => t.featured)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length)
  }

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
            Success
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Stories</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how professionals and organizations worldwide are transforming their work
            and achieving extraordinary results with AI-powered solutions.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { label: 'Success Stories', value: '500+', icon: Trophy },
              { label: 'Avg ROI Increase', value: '340%', icon: TrendingUp },
              { label: 'Companies Helped', value: '250+', icon: Building },
              { label: 'Satisfaction Rate', value: '98%', icon: Star }
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
        </motion.div>
      </section>

      {/* Featured Testimonials Carousel */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Success Stories</h2>
          {featuredTestimonials.length > 0 && (
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row gap-8 items-center"
                  >
                    <div className="lg:w-1/3">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                          {featuredTestimonials[currentSlide].user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {featuredTestimonials[currentSlide].verified && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900">{featuredTestimonials[currentSlide].user.name}</h3>
                        <p className="text-gray-600">{featuredTestimonials[currentSlide].user.title}</p>
                        <p className="text-gray-500">{featuredTestimonials[currentSlide].user.company}</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-2/3">
                      <div className="relative">
                        <Quote className="w-8 h-8 text-blue-600 mb-4" />
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">
                          {featuredTestimonials[currentSlide].content.headline}
                        </h4>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          {featuredTestimonials[currentSlide].content.description}
                        </p>

                        {/* Results */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {featuredTestimonials[currentSlide].metrics.results.improvements.slice(0, 4).map((improvement, index) => (
                            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{improvement.improvement}</div>
                              <div className="text-sm text-gray-600">{improvement.metric}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setSelectedTestimonial(featuredTestimonials[currentSlide])}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Read Full Story
                          </button>
                          {featuredTestimonials[currentSlide].type === 'video' && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <PlayCircle className="w-5 h-5" />
                              <span className="text-sm">{featuredTestimonials[currentSlide].content.videoDuration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex gap-2">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search success stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-4"
              >
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={filters.industry}
                      onChange={(e) => setFilters({...filters, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select
                      value={filters.companySize}
                      onChange={(e) => setFilters({...filters, companySize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type === 'all' ? 'All Types' : type.replace('_', ' ').toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Success Stories</h2>
            <p className="text-gray-600">{filteredTestimonials.length} stories found</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 12) * 0.1, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {testimonial.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{testimonial.user.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.user.title}</p>
                    <p className="text-sm text-gray-500">{testimonial.user.company}</p>
                  </div>
                  <div className="flex gap-1">
                    {testimonial.featured && (
                      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {testimonial.content.headline}
                </h4>
                <p className="text-gray-600 mb-4 line-clamp-3">{testimonial.content.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {testimonial.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {testimonial.type === 'video' && (
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>Video</span>
                      </div>
                    )}
                    {testimonial.type === 'case_study' && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>Case Study</span>
                      </div>
                    )}
                    <span>{testimonial.user.industry}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedTestimonial.user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {selectedTestimonial.verified && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{selectedTestimonial.user.name}</h1>
                      <p className="text-gray-600">{selectedTestimonial.user.title}</p>
                      <p className="text-gray-500">{selectedTestimonial.user.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{selectedTestimonial.user.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">Verified Review</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedTestimonial.content.headline}</h2>

                {selectedTestimonial.content.fullStory && (
                  <div className="prose max-w-none mb-8">
                    <p className="text-lg text-gray-600 leading-relaxed">{selectedTestimonial.content.fullStory}</p>
                  </div>
                )}

                {/* Results */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Measurable Results</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedTestimonial.metrics.results.improvements.map((improvement, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{improvement.metric}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-gray-500">Before: </span>
                            <span className="text-gray-900">{improvement.before}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">After: </span>
                            <span className="text-gray-900">{improvement.after}</span>
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <span className="text-2xl font-bold text-green-600">{improvement.improvement}</span>
                          <span className="text-gray-500 text-sm ml-1">improvement</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {selectedTestimonial.dateSubmitted}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Building className="w-4 h-4" />
                      {selectedTestimonial.socialProof.companySize}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
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