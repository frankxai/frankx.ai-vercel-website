'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Users, MessageCircle, TrendingUp, Award, Clock, ChevronRight, Play, Quote, ArrowRight, Filter, Search, Heart, Share2, Bookmark, Calendar, Globe, MapPin, Badge, Trophy, Target, Zap } from 'lucide-react'

interface SuccessStory {
  id: string
  user: {
    name: string
    title: string
    company: string
    avatar: string
    location: string
    joinDate: string
  }
  story: {
    title: string
    description: string
    achievement: string
    metrics: {
      timeToResult: string
      improvement: string
      roi: string
    }
    tags: string[]
    featured: boolean
  }
  engagement: {
    likes: number
    comments: number
    shares: number
  }
}

interface ExpertInsight {
  id: string
  expert: {
    name: string
    title: string
    company: string
    avatar: string
    expertise: string[]
    followers: number
  }
  content: {
    type: 'article' | 'video' | 'podcast' | 'interview'
    title: string
    description: string
    duration?: string
    publishDate: string
    thumbnail: string
  }
  engagement: {
    views: number
    likes: number
    comments: number
    bookmarks: number
  }
  trending: boolean
}

interface CommunityStats {
  totalMembers: number
  activeToday: number
  successStories: number
  expertInsights: number
  monthlyGrowth: number
  avgEngagement: number
}

interface ForumTopic {
  id: string
  title: string
  category: string
  author: {
    name: string
    avatar: string
    level: number
  }
  replies: number
  views: number
  lastActivity: string
  tags: string[]
  pinned: boolean
  hot: boolean
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'stories' | 'insights' | 'forum' | 'events'>('stories')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null)

  const stats: CommunityStats = {
    totalMembers: 12847,
    activeToday: 1289,
    successStories: 486,
    expertInsights: 127,
    monthlyGrowth: 23.4,
    avgEngagement: 87.2
  }

  const successStories: SuccessStory[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        title: 'AI Product Manager',
        company: 'TechFlow Inc',
        avatar: '/placeholder-avatar-1.jpg',
        location: 'San Francisco, CA',
        joinDate: '2024-01-15'
      },
      story: {
        title: 'From Zero to AI Product Leader in 6 Months',
        description: 'How I transformed my career by mastering AI product management through strategic learning and community engagement.',
        achievement: 'Promoted to Senior AI Product Manager with 40% salary increase',
        metrics: {
          timeToResult: '6 months',
          improvement: '300% productivity',
          roi: '$75K salary increase'
        },
        tags: ['Product Management', 'Career Growth', 'AI Strategy'],
        featured: true
      },
      engagement: {
        likes: 247,
        comments: 32,
        shares: 18
      }
    },
    {
      id: '2',
      user: {
        name: 'Marcus Rodriguez',
        title: 'Data Scientist',
        company: 'Innovation Labs',
        avatar: '/placeholder-avatar-2.jpg',
        location: 'Austin, TX',
        joinDate: '2023-11-08'
      },
      story: {
        title: 'Building Enterprise AI Solutions That Actually Work',
        description: 'My journey from struggling with AI implementation to leading a team that delivered $2M in cost savings through strategic AI deployment.',
        achievement: 'Led team that saved company $2M through AI optimization',
        metrics: {
          timeToResult: '4 months',
          improvement: '150% efficiency',
          roi: '$2M cost savings'
        },
        tags: ['Data Science', 'Enterprise AI', 'Cost Optimization'],
        featured: true
      },
      engagement: {
        likes: 189,
        comments: 28,
        shares: 15
      }
    },
    {
      id: '3',
      user: {
        name: 'Emily Thompson',
        title: 'Marketing Director',
        company: 'Growth Dynamics',
        avatar: '/placeholder-avatar-3.jpg',
        location: 'New York, NY',
        joinDate: '2024-02-20'
      },
      story: {
        title: 'AI-Powered Marketing That Doubled Our Revenue',
        description: 'How mastering AI marketing tools and strategies helped our team achieve unprecedented growth and customer engagement.',
        achievement: 'Doubled company revenue through AI-driven marketing campaigns',
        metrics: {
          timeToResult: '8 months',
          improvement: '200% conversion',
          roi: '100% revenue growth'
        },
        tags: ['AI Marketing', 'Revenue Growth', 'Customer Engagement'],
        featured: false
      },
      engagement: {
        likes: 156,
        comments: 19,
        shares: 12
      }
    }
  ]

  const expertInsights: ExpertInsight[] = [
    {
      id: '1',
      expert: {
        name: 'Dr. Alex Kumar',
        title: 'Chief AI Officer',
        company: 'FutureTech Solutions',
        avatar: '/placeholder-expert-1.jpg',
        expertise: ['Machine Learning', 'AI Strategy', 'Neural Networks'],
        followers: 15420
      },
      content: {
        type: 'article',
        title: 'The Future of AI in Business: 5 Trends to Watch in 2024',
        description: 'Comprehensive analysis of emerging AI trends that will shape business strategies and competitive advantages in the coming year.',
        publishDate: '2024-03-15',
        thumbnail: '/placeholder-article-1.jpg'
      },
      engagement: {
        views: 8942,
        likes: 342,
        comments: 87,
        bookmarks: 156
      },
      trending: true
    },
    {
      id: '2',
      expert: {
        name: 'Lisa Park',
        title: 'AI Ethics Researcher',
        company: 'Stanford AI Lab',
        avatar: '/placeholder-expert-2.jpg',
        expertise: ['AI Ethics', 'Responsible AI', 'Policy'],
        followers: 12890
      },
      content: {
        type: 'video',
        title: 'Building Ethical AI Systems: A Practical Framework',
        description: 'Step-by-step guide to implementing ethical considerations in AI development and deployment processes.',
        duration: '28 min',
        publishDate: '2024-03-12',
        thumbnail: '/placeholder-video-1.jpg'
      },
      engagement: {
        views: 6721,
        likes: 289,
        comments: 45,
        bookmarks: 98
      },
      trending: false
    },
    {
      id: '3',
      expert: {
        name: 'James Wilson',
        title: 'Startup Founder & AI Consultant',
        company: 'AI Ventures',
        avatar: '/placeholder-expert-3.jpg',
        expertise: ['Startup Strategy', 'AI Implementation', 'Venture Capital'],
        followers: 9654
      },
      content: {
        type: 'podcast',
        title: 'From Idea to IPO: Building AI-First Companies',
        description: 'Insights from successful AI startup founders on navigating challenges, securing funding, and scaling AI-driven businesses.',
        duration: '45 min',
        publishDate: '2024-03-10',
        thumbnail: '/placeholder-podcast-1.jpg'
      },
      engagement: {
        views: 4532,
        likes: 198,
        comments: 32,
        bookmarks: 67
      },
      trending: true
    }
  ]

  const forumTopics: ForumTopic[] = [
    {
      id: '1',
      title: 'Best practices for implementing AI in small businesses',
      category: 'Business Strategy',
      author: {
        name: 'David Kim',
        avatar: '/placeholder-avatar-4.jpg',
        level: 7
      },
      replies: 23,
      views: 847,
      lastActivity: '2 hours ago',
      tags: ['Small Business', 'Implementation', 'ROI'],
      pinned: true,
      hot: true
    },
    {
      id: '2',
      title: 'Ethical considerations in AI decision-making systems',
      category: 'Ethics & Policy',
      author: {
        name: 'Rachel Green',
        avatar: '/placeholder-avatar-5.jpg',
        level: 9
      },
      replies: 18,
      views: 623,
      lastActivity: '4 hours ago',
      tags: ['Ethics', 'Decision Making', 'Policy'],
      pinned: false,
      hot: true
    },
    {
      id: '3',
      title: 'Comparing different LLM models for enterprise use',
      category: 'Technical Discussion',
      author: {
        name: 'Michael Chang',
        avatar: '/placeholder-avatar-6.jpg',
        level: 8
      },
      replies: 31,
      views: 1204,
      lastActivity: '6 hours ago',
      tags: ['LLM', 'Enterprise', 'Comparison'],
      pinned: false,
      hot: false
    }
  ]

  const categories = ['all', 'Product Management', 'Data Science', 'AI Marketing', 'Business Strategy', 'Technical', 'Ethics']

  const filteredStories = successStories.filter(story => {
    const matchesCategory = selectedCategory === 'all' || story.story.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
    const matchesSearch = story.story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.story.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
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
            Join the AI
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Leaders</span>
            <br />Community
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with thousands of AI professionals, share success stories, learn from experts,
            and accelerate your AI journey through peer collaboration and mentorship.
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { label: 'Members', value: stats.totalMembers.toLocaleString(), icon: Users },
              { label: 'Active Today', value: stats.activeToday.toLocaleString(), icon: TrendingUp },
              { label: 'Success Stories', value: stats.successStories.toString(), icon: Trophy },
              { label: 'Expert Insights', value: stats.expertInsights.toString(), icon: Star },
              { label: 'Monthly Growth', value: `+${stats.monthlyGrowth}%`, icon: Target },
              { label: 'Engagement', value: `${stats.avgEngagement}%`, icon: Zap }
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
            Join Community
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
                { id: 'stories', label: 'Success Stories', icon: Trophy },
                { id: 'insights', label: 'Expert Insights', icon: Star },
                { id: 'forum', label: 'Forum', icon: MessageCircle },
                { id: 'events', label: 'Events', icon: Calendar }
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
            {activeTab === 'stories' && (
              <motion.div
                key="stories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
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
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedCategory === category
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Success Stories Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border ${
                        story.story.featured ? 'border-yellow-300 ring-2 ring-yellow-300/20' : 'border-white/20'
                      } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                      onClick={() => setSelectedStory(story)}
                    >
                      {story.story.featured && (
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-600">Featured Story</span>
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {story.user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{story.user.name}</h3>
                          <p className="text-sm text-gray-600">{story.user.title}</p>
                          <p className="text-sm text-gray-500">{story.user.company}</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {story.story.title}
                      </h4>
                      <p className="text-gray-600 mb-4 line-clamp-3">{story.story.description}</p>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                        <p className="font-semibold text-gray-900 mb-2">{story.story.achievement}</p>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Time</p>
                            <p className="font-medium">{story.story.metrics.timeToResult}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Improvement</p>
                            <p className="font-medium">{story.story.metrics.improvement}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">ROI</p>
                            <p className="font-medium">{story.story.metrics.roi}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {story.engagement.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {story.engagement.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            {story.engagement.shares}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  {expertInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500"></div>
                        {insight.trending && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Trending
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                          {insight.content.type}
                        </div>
                        {insight.content.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {insight.expert.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{insight.expert.name}</h3>
                            <p className="text-sm text-gray-600">{insight.expert.title}</p>
                            <p className="text-sm text-gray-500">{insight.expert.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{insight.expert.followers.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">followers</p>
                          </div>
                        </div>

                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {insight.content.title}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-3">{insight.content.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{insight.content.publishDate}</span>
                          {insight.content.duration && <span>{insight.content.duration}</span>}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{insight.engagement.views.toLocaleString()} views</span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {insight.engagement.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bookmark className="w-4 h-4" />
                              {insight.engagement.bookmarks}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'forum' && (
              <motion.div
                key="forum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {forumTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                      topic.pinned ? 'ring-2 ring-blue-300/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {topic.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {topic.pinned && <Badge className="w-4 h-4 text-blue-600" />}
                          {topic.hot && <TrendingUp className="w-4 h-4 text-red-500" />}
                          <span className="text-sm text-gray-500">{topic.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>by {topic.author.name}</span>
                          <span>Level {topic.author.level}</span>
                          <span>{topic.lastActivity}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {topic.tags.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {topic.replies} replies
                          </span>
                          <span>{topic.views} views</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Events Coming Soon</h3>
                <p className="text-gray-600">We're working on exciting community events. Stay tuned!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedStory.user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStory.story.title}</h2>
                  <p className="text-lg text-gray-600 mt-1">{selectedStory.user.name}</p>
                  <p className="text-gray-500">{selectedStory.user.title} at {selectedStory.user.company}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {selectedStory.user.location}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-lg text-gray-900 leading-relaxed mb-4">{selectedStory.story.description}</p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievement</h4>
                  <p className="text-blue-600 font-medium">{selectedStory.story.achievement}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Time to Result</p>
                  <p className="font-semibold">{selectedStory.story.metrics.timeToResult}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Improvement</p>
                  <p className="font-semibold">{selectedStory.story.metrics.improvement}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="font-semibold">{selectedStory.story.metrics.roi}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedStory.engagement.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {selectedStory.engagement.comments} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    {selectedStory.engagement.shares} shares
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}