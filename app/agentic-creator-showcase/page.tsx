'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, Sparkles, Layers, Zap, Globe, Hash, 
  Twitter, Linkedin, Instagram, Youtube, MessageSquare,
  Coins, Users, BookOpen, Code, TrendingUp, Share2,
  Play, Copy, CheckCircle, Target, Settings, Wand2,
  Cpu, Database, Globe2, Mail, Video, FileText,
  ChevronRight, Star, Clock, BarChart3, MousePointer
} from 'lucide-react'

const workflowCategories = [
  {
    id: 'social-media',
    name: 'Social Media',
    icon: Share2,
    color: 'from-pink-500 to-rose-500',
    workflows: [
      { name: 'Twitter Threads', desc: 'Viral thread creation', count: '7 templates' },
      { name: 'LinkedIn Posts', desc: 'Thought leadership', count: '6 templates' },
      { name: 'Instagram Carousels', desc: 'Educational visuals', count: '5 templates' },
      { name: 'Cross-Platform', desc: 'One → All platforms', count: 'Auto-adapt' },
      { name: 'Viral Engine', desc: 'Shareable content', count: 'Psychology-based' },
      { name: 'Command Center', desc: 'Full management', count: 'Complete suite' }
    ]
  },
  {
    id: 'web3',
    name: 'Web3 & Blockchain',
    icon: Coins,
    color: 'from-violet-500 to-purple-500',
    workflows: [
      { name: 'FarCaster', desc: 'Web3-native content', count: 'Community builder' },
      { name: 'NFT Launch', desc: 'Collection announcements', count: 'Full campaign' },
      { name: 'DAO Governance', desc: 'Proposals & voting', count: 'Education + comms' },
      { name: 'DeFi Education', desc: 'Beginner tutorials', count: 'Progressive learning' },
      { name: 'Crypto News', desc: 'Market commentary', count: 'Analysis + opinion' },
      { name: 'Web3 Master', desc: 'Complete coordination', count: 'All-in-one' }
    ]
  },
  {
    id: 'content',
    name: 'Content Creation',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    workflows: [
      { name: 'Blog Posts', desc: 'SEO-optimized articles', count: '10 templates' },
      { name: 'Email Campaigns', desc: 'Newsletters & promos', count: '5 templates' },
      { name: 'Video Scripts', desc: 'YouTube, TikTok, Reels', count: '5 templates' },
      { name: 'Website Copy', desc: 'Landing pages', count: '5 templates' }
    ]
  },
  {
    id: 'business',
    name: 'Business Operations',
    icon: BriefcaseIcon,
    color: 'from-emerald-500 to-teal-500',
    workflows: [
      { name: 'Client Onboarding', desc: 'CRM & workflow', count: 'Automated' },
      { name: 'SEO Audit', desc: 'Technical SEO', count: 'Complete analysis' },
      { name: 'Website Creation', desc: 'Full dev workflow', count: 'From prompt to deploy' }
    ]
  }
]

const templates = [
  {
    category: 'Twitter/X',
    name: 'Expert Thread',
    description: 'Establish authority on any topic',
    time: '15 min',
    color: 'bg-blue-500'
  },
  {
    category: 'LinkedIn',
    name: 'Thought Leadership',
    description: 'Professional positioning posts',
    time: '30 min',
    color: 'bg-sky-500'
  },
  {
    category: 'FarCaster',
    name: 'Web3 Casts',
    description: 'Crypto-native short content',
    time: '5 min',
    color: 'bg-violet-500'
  },
  {
    category: 'Instagram',
    name: 'Educational Carousel',
    description: '10-slide visual guides',
    time: '30 min',
    color: 'bg-pink-500'
  },
  {
    category: 'Blog',
    name: 'Evergreen Authority',
    description: 'SEO-optimized long-form',
    time: '2 hours',
    color: 'bg-cyan-500'
  },
  {
    category: 'Email',
    name: 'Newsletter Weekly',
    description: 'Regular subscriber updates',
    time: '30 min',
    color: 'bg-orange-500'
  }
]

const stats = [
  { value: '25+', label: 'Workflows' },
  { value: '30+', label: 'Templates' },
  { value: '7', label: 'Platforms' },
  { value: '100x', label: 'Faster' }
]

const platforms = [
  { name: 'Twitter/X', icon: Twitter, color: 'text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-sky-500' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
  { name: 'FarCaster', icon: Globe2, color: 'text-purple-400' },
  { name: 'TikTok', icon: Video, color: 'text-black' },
  { name: 'Email', icon: Mail, color: 'text-orange-400' }
]

const demos = [
  {
    title: 'Create a Twitter Thread',
    prompt: 'skill:content, create a twitter thread about AI in 2025',
    description: 'Watch 7 perfectly crafted tweets appear'
  },
  {
    title: 'Launch NFT Collection',
    prompt: 'skill:marketing, run nft-collection-launch for MyNFT',
    description: 'Complete campaign in minutes'
  },
  {
    title: 'Cross-Post to All Platforms',
    prompt: 'skill:marketing, run cross-platform-distribution for my blog post',
    description: 'One content → 7 optimized versions'
  },
  {
    title: 'Build Web3 Community',
    prompt: 'skill:marketing, create farcaster content about DAO governance',
    description: 'Web3-native community engagement'
  }
]

function BriefcaseIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  )
}

export default function AgenticCreatorShowcase() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const copyPrompt = () => {
    navigator.clipboard.writeText(demos[activeDemo].prompt)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#02030b] text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-[#02030b] to-blue-900/20" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-violet-300 mb-8">
            <Sparkles className="h-4 w-4" />
            Agentic Creator OS v2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Create <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Anything</span>,<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Everywhere</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
            25+ workflows. 30+ templates. 7 platforms. One AI-powered creator operating system 
            for social media, Web3, and content creation.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/content-studio" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 text-white font-semibold hover:opacity-90 transition-opacity">
              <Wand2 className="h-5 w-5" />
              Start Creating
            </Link>
            <Link href="#workflows" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-white font-medium hover:bg-white/10 transition-colors">
              Explore Workflows
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Try It Now</h2>
            <p className="text-white/60">Click any demo to copy the prompt, then use it in Claude Code</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {demos.map((demo, i) => (
              <button
                key={i}
                onClick={() => setActiveDemo(i)}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  activeDemo === i 
                    ? 'border-violet-500/50 bg-violet-500/5' 
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{demo.title}</div>
                      <div className="text-sm text-white/50">{demo.description}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0a0a0f] rounded-lg p-3 font-mono text-sm text-violet-400">
                  {demo.prompt}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-xl border border-violet-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">Ready to try in Claude Code:</div>
                <div className="font-mono text-sm text-white mt-1">{demos[activeDemo].prompt}</div>
              </div>
              <button 
                onClick={copyPrompt}
                className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-white text-sm transition-colors"
              >
                {copiedPrompt ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedPrompt ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Categories */}
      <section id="workflows" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Complete Workflow Suite</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From social media to Web3, from content to commerce — 25+ workflows 
              that handle the entire creation lifecycle.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {workflowCategories.map((category, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <div className="text-sm text-white/50">{category.workflows.length} capabilities</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.workflows.map((workflow, j) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                      <div>
                        <div className="font-medium text-white">{workflow.name}</div>
                        <div className="text-sm text-white/50">{workflow.desc}</div>
                      </div>
                      <div className="text-xs text-violet-400 bg-violet-400/10 px-2 py-1 rounded">
                        {workflow.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">30+ Premium Templates</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Production-ready templates for every platform. Just fill in the brackets 
              and publish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${template.color} flex items-center justify-center`}>
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-xs text-white/50">{template.category}</div>
                </div>
                <div className="font-semibold text-white mb-1">{template.name}</div>
                <div className="text-sm text-white/60 mb-3">{template.description}</div>
                <div className="flex items-center gap-1 text-xs text-violet-400">
                  <Clock className="h-3 w-3" />
                  {template.time}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/agentic-creator-os/templates" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300">
              View all templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Create for Every Platform</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {platforms.map((platform, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                <platform.icon className={`h-5 w-5 ${platform.color}`} />
                <span className="text-sm text-white/70">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-gradient-to-b from-violet-900/10 to-[#02030b]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Workflow', desc: 'Select from 25+ pre-built workflows for any creation task' },
              { step: '2', title: 'Customize Input', desc: 'Fill in simple parameters — AI handles the complexity' },
              { step: '3', title: 'Publish Everywhere', desc: 'One-click distribution to all your platforms' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-[#02030b] border border-violet-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Creation?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Join thousands of creators using Agentic Creator OS to produce 
              better content, faster.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/content-studio" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 text-white font-semibold hover:opacity-90 transition-opacity">
                <Wand2 className="h-5 w-5" />
                Start Creating Free
              </Link>
              <Link href="/blog/agentic-creator-os-launch" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-white font-medium hover:bg-white/10 transition-colors">
                Read Announcement
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
