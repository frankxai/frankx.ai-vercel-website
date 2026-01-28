import { ArrowRight, Brain, CheckCircle2, Clock, Cpu, Globe, Layers, Share, Sparkles, Star, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentic Creator OS v2.0: Create Anything, Everywhere | FrankX.AI',
  description: '25+ workflows. 30+ templates. 7 platforms. The complete AI-powered creator operating system for social media, Web3, and content creation.',
  openGraph: {
    title: 'Agentic Creator OS v2.0 Launch',
    description: 'Create anything, everywhere with the most comprehensive creator workflow system ever built.',
    type: 'article',
  },
}

const keyTakeaways = [
  '25+ production-ready workflows for social media, Web3, and content creation',
  '30+ premium templates with fill-in-the-blank simplicity',
  '7-platform distribution from a single prompt',
  'Web3-native support for NFT, DAO, DeFi, and FarCaster',
  'Claude Code native — no complex setup required',
  '100x faster content production'
]

const features = [
  {
    icon: Share,
    title: 'Social Media Mastery',
    description: 'Twitter threads, LinkedIn posts, Instagram carousels, TikTok scripts — all optimized for viral engagement.'
  },
  {
    icon: Globe,
    title: 'Web3 & Blockchain',
    description: 'FarCaster community building, NFT launches, DAO governance, DeFi education — built for the decentralized age.'
  },
  {
    icon: Layers,
    title: 'Cross-Platform Distribution',
    description: 'One content → all platforms. AI adapts your message for each platform\'s unique requirements.'
  },
  {
    icon: Zap,
    title: 'Viral Content Engine',
    description: 'Psychology-based templates that maximize shares, saves, and engagement.'
  },
  {
    icon: Cpu,
    title: 'MCP-Native Architecture',
    description: 'Built on Model Context Protocol for seamless Claude Code integration.'
  },
  {
    icon: Brain,
    title: 'Enterprise-Grade',
    description: 'Fact-checking, compliance, and risk warnings built into every workflow.'
  }
]

const workflowCategories = [
  {
    name: 'Social Media',
    count: '7 workflows',
    items: ['Twitter Threads', 'LinkedIn Posts', 'Instagram Carousels', 'Cross-Platform', 'Viral Engine', 'Command Center']
  },
  {
    name: 'Web3 & Blockchain',
    count: '14 workflows',
    items: ['FarCaster', 'NFT Launch', 'DAO Governance', 'DeFi Education', 'Crypto News', 'Web3 Master']
  },
  {
    name: 'Content Creation',
    count: '10+ templates',
    items: ['Blog Posts', 'Email Campaigns', 'Video Scripts', 'Landing Pages', 'Case Studies']
  },
  {
    name: 'Business Operations',
    count: '4 workflows',
    items: ['Client Onboarding', 'SEO Audit', 'Website Creation', 'Project Management']
  }
]

const stats = [
  { value: '25+', label: 'Workflows' },
  { value: '30+', label: 'Templates' },
  { value: '7', label: 'Platforms' },
  { value: '100x', label: 'Faster' }
]

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'YouTube', 'FarCaster', 'TikTok', 'Email', 'Medium', 'Discord']

export default function AgenticCreatorOSLaunch() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Announcements</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-violet-300">
                <Sparkles className="h-4 w-4" />
                Major Launch
              </div>
              <h1 className="text-4xl font-bold text-white md:text-5xl leading-tight">
                Agentic Creator OS v2.0: Create Anything, Everywhere
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                25+ workflows. 30+ templates. 7 platforms. One AI-powered creator operating system 
                that transforms how you create, distribute, and grow your content.
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                8 min read
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Featured
              </div>
            </div>
          </header>

          {/* Key Takeaways */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20">
            <h2 className="text-lg font-semibold text-white mb-4">What&apos;s New in v2.0</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {keyTakeaways.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Introduction */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">The Creation Revolution</h2>
            <p className="text-white/70 leading-relaxed">
              Creating content for multiple platforms has always meant: learning each platform&apos;s quirks, 
              rewriting for different formats, and spending hours on distribution. But what if one AI 
              could handle all of it — while you focus on ideas?
            </p>
            <p className="text-white/70 leading-relaxed">
              Agentic Creator OS v2.0 is that AI. Built on Claude Code&apos;s Model Context Protocol, 
              it combines 25+ production-ready workflows with 30+ premium templates into a unified 
              creator operating system. From a single prompt, you can create, optimize, and distribute 
              content across Twitter, LinkedIn, Instagram, YouTube, FarCaster, TikTok, and email — 
              all in minutes instead of hours.
            </p>
          </section>

          {/* Feature Grid */}
          <section className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </section>

          {/* Workflow Categories */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Complete Workflow Suite</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {workflowCategories.map((category, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    <span className="text-xs text-violet-400 bg-violet-400/10 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="py-8">
            <div className="grid grid-cols-4 gap-6 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Platform Support */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Every Platform, One System</h2>
            <p className="text-white/70 leading-relaxed">
              Agentic Creator OS speaks every platform&apos;s language. From FarCaster&apos;s 320-character 
              limits to YouTube&apos;s SEO optimization, from Instagram&apos;s visual storytelling to 
              LinkedIn&apos;s professional tone — your AI adapts automatically.
            </p>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-sm text-white/70">
                  {platform}
                </span>
              ))}
            </div>
          </section>

          {/* Web3 Section */}
          <section className="p-8 rounded-2xl bg-gradient-to-br from-violet-900/20 to-[#02030b] border border-violet-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Web3 & Blockchain Native</h3>
                <p className="text-sm text-white/50">Built for the decentralized age</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              While other tools struggle with crypto terminology, Agentic Creator OS lives in Web3. 
              FarCaster community building. NFT collection launches. DAO governance proposals. 
              DeFi education. All with built-in compliance disclaimers, risk warnings, and 
              DYOR reminders — because responsible communication matters in this space.
            </p>
            <div className="flex flex-wrap gap-2">
              {['FarCaster', 'NFT', 'DAO', 'DeFi', 'Crypto', 'Metaverse'].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-violet-500/20 text-xs text-violet-300">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Usage Examples */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Simple to Use</h2>
            <p className="text-white/70 leading-relaxed">
              Just tell Agentic Creator OS what you want. It handles the rest.
            </p>
            <div className="space-y-4">
              {[
                { prompt: 'skill:content, create a twitter thread about AI in 2025', result: '7 perfectly crafted tweets' },
                { prompt: 'skill:marketing, run nft-collection-launch for MyNFT', result: 'Complete NFT launch campaign' },
                { prompt: 'skill:marketing, run cross-platform-distribution for my blog post', result: 'Content adapted for all 7 platforms' },
                { prompt: 'skill:marketing, create farcaster content about DAO governance', result: 'Web3-native community engagement' }
              ].map((example, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="font-mono text-sm text-violet-400 mb-2">{example.prompt}</div>
                  <div className="text-sm text-white/50">→ {example.result}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Templates Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">30+ Premium Templates</h2>
            <p className="text-white/70 leading-relaxed">
              Every template is production-ready. Fill in the brackets, and publish. 
              No more staring at blank pages.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Expert Twitter Thread', time: '15 min', platform: 'Twitter/X' },
                { name: 'Thought Leadership Post', time: '30 min', platform: 'LinkedIn' },
                { name: 'FarCaster Cast', time: '5 min', platform: 'FarCaster' },
                { name: 'Educational Carousel', time: '30 min', platform: 'Instagram' },
                { name: 'Evergreen Blog Post', time: '2 hours', platform: 'Blog' },
                { name: 'Weekly Newsletter', time: '30 min', platform: 'Email' }
              ].map((template, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-sm text-violet-400 mb-1">{template.platform}</div>
                  <div className="font-medium text-white">{template.name}</div>
                  <div className="text-xs text-white/50 mt-1">{template.time}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-8">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Creation?</h2>
              <p className="text-white/70 mb-6 max-w-lg mx-auto">
                Join thousands of creators using Agentic Creator OS to produce better content, faster.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/content-studio" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity">
                  <Zap className="h-4 w-4" />
                  Start Creating Free
                </Link>
                <Link href="/agentic-creator-showcase" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors">
                  View Showcase
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/40 text-center">
              Agentic Creator OS v2.0 — Part of the FrankX.AI Creator Ecosystem
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
