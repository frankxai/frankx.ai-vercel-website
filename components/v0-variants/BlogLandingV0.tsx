/**
 * v0-generated variant: Blog Landing
 * Generated: 2026-02-08 via v0-1.5-lg with extended thinking
 * Chat: vDtmFp45TVR
 * Demo: https://demo-kzmp0oaq7ysi02dfvmnl.vusercontent.net
 * Source file: app/blog/page.tsx
 * 
 * Reference design — adapt best patterns to production codebase.
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Clock, Calendar, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

// Category configuration with color coding
const categories = [
  { id: 'all', name: 'All', color: 'rgba(171, 71, 199, 0.15)' },
  { id: 'ai-architecture', name: 'AI Architecture', color: 'rgba(171, 71, 199, 0.15)' },
  { id: 'creator-tools', name: 'Creator Tools', color: 'rgba(67, 191, 227, 0.15)' },
  { id: 'enterprise-ai', name: 'Enterprise AI', color: 'rgba(245, 158, 11, 0.15)' },
  { id: 'music-production', name: 'Music Production', color: 'rgba(16, 185, 129, 0.15)' },
  { id: 'mcp-agents', name: 'MCP & Agents', color: 'rgba(139, 92, 246, 0.15)' },
  { id: 'tutorials', name: 'Tutorials', color: 'rgba(67, 191, 227, 0.15)' },
]

// Category accent colors for borders
const categoryAccents: Record<string, string> = {
  'ai-architecture': '#AB47C7',
  'creator-tools': '#43BFE3',
  'enterprise-ai': '#F59E0B',
  'music-production': '#10B981',
  'mcp-agents': '#8B5CF6',
  'tutorials': '#43BFE3',
}

// Sample article data
const articles = [
  {
    id: 1,
    title: 'Building Production-Ready AI Agents with Model Context Protocol',
    category: 'mcp-agents',
    date: '2026-02-05',
    readTime: '12 min',
    preview: 'Deep dive into implementing MCP for creating robust, context-aware AI agents that scale. Learn patterns for state management, error handling, and multi-model orchestration.',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Music Production: AI-Powered Creative Workflows',
    category: 'music-production',
    date: '2026-02-03',
    readTime: '10 min',
    preview: 'How AI is revolutionizing music creation without replacing human artistry. Practical tools and techniques for modern producers.',
  },
  {
    id: 3,
    title: 'Enterprise AI Architecture: Lessons from 50+ Implementations',
    category: 'enterprise-ai',
    date: '2026-02-01',
    readTime: '15 min',
    preview: 'Hard-won insights on scaling AI systems in production environments. Security, compliance, and cost optimization strategies.',
  },
  {
    id: 4,
    title: 'Creator Tools That Actually Matter in 2026',
    category: 'creator-tools',
    date: '2026-01-28',
    readTime: '8 min',
    preview: 'Cutting through the noise to find tools that genuinely enhance creativity and productivity. No hype, just practical recommendations.',
  },
  {
    id: 5,
    title: 'AI Architecture Patterns: From Prototype to Production',
    category: 'ai-architecture',
    date: '2026-01-25',
    readTime: '14 min',
    preview: 'Essential patterns for building AI systems that don\'t crumble under real-world usage. Performance, reliability, and maintainability.',
  },
  {
    id: 6,
    title: 'Building Your First MCP Server: Complete Tutorial',
    category: 'tutorials',
    date: '2026-01-22',
    readTime: '20 min',
    preview: 'Step-by-step guide to creating a Model Context Protocol server. Code examples, best practices, and common pitfalls to avoid.',
  },
  {
    id: 7,
    title: 'The Economics of AI: What Actually Works',
    category: 'enterprise-ai',
    date: '2026-01-20',
    readTime: '11 min',
    preview: 'Real numbers on AI implementation costs, ROI, and how to build a sustainable AI business. No buzzwords, just data.',
  },
  {
    id: 8,
    title: 'Voice Synthesis in Music: Beyond the Uncanny Valley',
    category: 'music-production',
    date: '2026-01-18',
    readTime: '9 min',
    preview: 'Latest advances in AI voice synthesis for music production. Technical deep-dive with audio examples and production techniques.',
  },
  {
    id: 9,
    title: 'AI-Native Product Design: A New Paradigm',
    category: 'creator-tools',
    date: '2026-01-15',
    readTime: '13 min',
    preview: 'How to design products that embrace AI capabilities without sacrificing user experience. Case studies and design patterns.',
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.preview.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0]
  const regularArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-6 text-balance text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              The{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Blog</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-3 w-full bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ filter: 'blur(8px)', opacity: 0.5 }}
                />
                <motion.span
                  className="absolute -bottom-2 left-0 h-2 w-full bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-xl text-muted-foreground sm:text-2xl">
              Practical AI architecture, creator tools, and building what matters.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <Badge 
                variant="secondary" 
                className="bg-[rgba(171,71,199,0.1)] text-[#AB47C7] border border-[#AB47C7]/20 px-4 py-1.5 text-sm font-medium"
              >
                70+ Articles
              </Badge>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mx-auto max-w-2xl"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 bg-[rgba(255,255,255,0.03)] border-white/10 pl-12 text-base backdrop-blur-xl transition-all duration-300 hover:border-[#AB47C7]/30 focus:border-[#AB47C7]/50"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background gradient effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#AB47C7]/5 via-transparent to-transparent" />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="group relative overflow-hidden border-white/10 bg-[rgba(255,255,255,0.03)] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#AB47C7]/30 sm:p-12">
              <div
                className="absolute left-0 top-0 h-1 w-full transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, ${categoryAccents[featuredArticle.category]}, transparent)`,
                }}
              />
              
              <Badge
                className="mb-4 border-0"
                style={{ backgroundColor: categories.find((c) => c.id === featuredArticle.category)?.color }}
              >
                <span style={{ color: categoryAccents[featuredArticle.category] }}>
                  {categories.find((c) => c.id === featuredArticle.category)?.name}
                </span>
              </Badge>

              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-[#AB47C7] sm:text-4xl lg:text-5xl">
                {featuredArticle.title}
              </h2>

              <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border border-[#AB47C7]/30">
                    <AvatarFallback className="bg-[#AB47C7]/10 text-xs text-[#AB47C7]">F</AvatarFallback>
                  </Avatar>
                  <span>Frank</span>
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {featuredArticle.readTime}
                </div>
              </div>

              <p className="mb-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {featuredArticle.preview}
              </p>

              <Button
                size="lg"
                className="group/btn bg-[#AB47C7] text-white transition-all duration-300 hover:bg-[#AB47C7]/90 hover:shadow-[0_0_30px_rgba(171,71,199,0.3)]"
              >
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[rgba(171,71,199,0.15)] text-[#AB47C7] border border-[#AB47C7]/30 shadow-[0_0_20px_rgba(171,71,199,0.15)]'
                    : 'bg-[rgba(255,255,255,0.03)] text-muted-foreground border border-white/10 hover:border-white/20 hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="mb-16 space-y-8">
          {/* First row - 2 large cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {regularArticles.slice(0, 2).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-[rgba(171,71,199,0.1)] via-[rgba(67,191,227,0.05)] to-[rgba(245,158,11,0.05)] p-8 backdrop-blur-xl sm:p-12">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
              
              <div className="relative mx-auto max-w-2xl text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(171,71,199,0.2)] text-[#AB47C7]">
                  <Mail className="h-6 w-6" />
                </div>
                
                <h3 className="mb-3 text-balance text-2xl font-bold text-foreground sm:text-3xl">
                  Get weekly insights on AI architecture
                </h3>
                
                <p className="mb-6 text-pretty text-muted-foreground">
                  Join 10,000+ builders getting practical AI insights. No fluff, just actionable content.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 bg-[rgba(255,255,255,0.05)] border-white/10 backdrop-blur-sm sm:w-80"
                  />
                  <Button
                    size="lg"
                    className="h-12 bg-[#AB47C7] text-white transition-all duration-300 hover:bg-[#AB47C7]/90 hover:shadow-[0_0_30px_rgba(171,71,199,0.3)]"
                  >
                    Subscribe
                  </Button>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Remaining articles - 3 per row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {regularArticles.slice(2).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index + 2} />
            ))}
          </motion.div>
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-300 hover:border-[#AB47C7]/30 hover:bg-[rgba(171,71,199,0.05)]"
          >
            Load More Articles
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const category = categories.find((c) => c.id === article.category)
  const accentColor = categoryAccents[article.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden border-white/10 bg-[rgba(255,255,255,0.03)] p-6 backdrop-blur-xl transition-all duration-500 hover:border-[#AB47C7]/30 hover:bg-[rgba(255,255,255,0.05)]">
        {/* Category accent bar */}
        <div
          className="absolute left-0 top-0 h-1 w-full transition-all duration-500"
          style={{ backgroundColor: accentColor }}
        />

        {/* Image placeholder with gradient */}
        <div
          className="mb-4 aspect-video w-full overflow-hidden rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}10)`,
          }}
        />

        <Badge
          className="mb-3 w-fit border-0"
          style={{ backgroundColor: category?.color }}
        >
          <span style={{ color: accentColor }}>
            {category?.name}
          </span>
        </Badge>

        <h3 className="mb-3 text-balance text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#AB47C7]">
          {article.title}
        </h3>

        <p className="mb-4 flex-grow text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {article.preview}
        </p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
