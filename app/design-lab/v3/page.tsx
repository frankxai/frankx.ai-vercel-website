'use client'

import { useState, useRef } from 'react'
import PremiumCard from '@/components/ui/PremiumCard'
import AuroraGradient from '@/components/ui/AuroraGradient'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { MorphingBackground, MagneticHover, FloatingElement, ParallaxContainer } from '@/components/ui/AdvancedAnimations'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { CursorSpotlight } from '@/components/ui/CursorSpotlight'
import ShimmerButton from '@/components/ui/magic-ui/shimmer-button'
import Marquee from '@/components/ui/magic-ui/marquee'
import {
  ArrowRight, Sparkles, Zap, Layers, Eye, Globe,
  Diamond, Star, Crown, Code2, Palette, Terminal,
  BarChart3, Shield, Cpu, Users, ChevronRight,
  Play, Search, Plus, Check, X, Menu,
  ArrowUpRight, Download, Mail, Bell, Settings,
  Rocket, Target, TrendingUp, Heart, Share2,
  MessageSquare, BookOpen, Wand2, Bot, Braces,
  Layout, Figma, PenTool, LayoutGrid, Monitor,
  Smartphone, Moon, ExternalLink, Copy, GitBranch,
  Boxes, Database, Lock, Cloud, Activity
} from 'lucide-react'

// ============================================================================
// SHARED MICRO-COMPONENTS
// ============================================================================

function TemplateLabel({ label, site, color }: { label: string; site: string; color: string }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold">{label}</span>
      </div>
      <span className="text-[10px] text-white/15 font-mono">Inspired by {site}</span>
    </div>
  )
}

function TemplateDivider({ label }: { label: string }) {
  return (
    <div className="relative py-24 md:py-32">
      <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="px-6 py-2 rounded-full bg-[#030712] border border-white/[0.06] text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  )
}

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }} />
  )
}

// ============================================================================
// SECTION 0 — V3 HERO
// ============================================================================

function V3Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <MorphingBackground />
      <CursorSpotlight />
      <DotGrid />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={10} offset={20}>
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        </FloatingElement>
        <FloatingElement duration={14} offset={25}>
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.04] blur-[120px]" />
        </FloatingElement>
        <FloatingElement duration={8} offset={15}>
          <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />
        </FloatingElement>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[11px] font-semibold uppercase tracking-[0.2em] mb-8">
          <Diamond className="w-3.5 h-3.5" />
          Design Lab v3 &mdash; Template Collection
        </div>

        <SplitTextReveal
          text="Product-Grade Templates"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
          staggerDelay={0.05}
        />

        <p className="text-lg sm:text-xl text-white/30 max-w-3xl mx-auto mb-6 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
          Six world-class design systems replicated with zero external dependencies.
          Every template is a sellable product built entirely with PremiumCard + Tailwind + Framer Motion.
        </p>

        <p className="text-sm text-white/20 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
          Built by Claude Code &bull; Shipped to frankx.ai &bull; Each section = a standalone template
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '1.1s' }}>
          <MagneticHover intensity={0.12}>
            <ShimmerButton
              shimmerColor="#06B6D4"
              shimmerSize="0.08em"
              background="rgba(6, 182, 212, 0.1)"
              className="!border-cyan-500/30 !text-cyan-300 !text-sm !font-semibold !px-8 !py-3.5"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Browse Templates
            </ShimmerButton>
          </MagneticHover>
          <MagneticHover intensity={0.12}>
            <ShimmerButton
              shimmerColor="#A855F7"
              shimmerSize="0.05em"
              background="rgba(168, 85, 247, 0.06)"
              className="!border-purple-500/20 !text-white/50 !text-sm !font-medium !px-8 !py-3.5"
            >
              View Quests
              <ArrowRight className="w-4 h-4 ml-2" />
            </ShimmerButton>
          </MagneticHover>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex items-center justify-center gap-12 animate-fade-in opacity-0" style={{ animationDelay: '1.4s' }}>
          {[
            { value: '6', label: 'Templates' },
            { value: '0', label: 'External APIs' },
            { value: '∞', label: 'Combinations' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white/80">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/20">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
    </section>
  )
}

// ============================================================================
// TEMPLATE 1 — VERCEL-STYLE: Developer Platform Landing
// ============================================================================

function VercelTemplate() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <TemplateLabel label="Template 01" site="Vercel" color="bg-white" />

        {/* Vercel-style hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs text-white/50 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now available &mdash; v4.0
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-[0.95]">
            Develop.<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Preview.</span><br />
            Ship.
          </h2>

          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
            The platform for frontend developers. Instant deployments, zero config, global edge network.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button className="px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all">
              Start Deploying
            </button>
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              npx create-next-app
            </button>
          </div>
        </div>

        {/* Vercel-style feature grid */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {[
            { icon: Globe, title: 'Edge Network', desc: 'Deploy to 100+ edge locations worldwide. Every request served from the nearest node.', stat: '100+', statLabel: 'Regions' },
            { icon: Zap, title: 'Instant Rollbacks', desc: 'Every deployment is immutable. Roll back to any previous version with a single click.', stat: '<1s', statLabel: 'Rollback time' },
            { icon: Shield, title: 'DDoS Protection', desc: 'Enterprise-grade security built in. Automatic mitigation without configuration.', stat: '99.99%', statLabel: 'Uptime SLA' },
            { icon: GitBranch, title: 'Preview Deployments', desc: 'Every push gets its own URL. Share with your team before merging.', stat: '∞', statLabel: 'Previews' },
            { icon: Activity, title: 'Real-time Analytics', desc: 'Web Vitals, traffic, and performance data. No configuration required.', stat: '50ms', statLabel: 'P95 latency' },
            { icon: Lock, title: 'Automatic HTTPS', desc: 'Free SSL certificates provisioned and renewed automatically.', stat: '0', statLabel: 'Config needed' },
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-[#030712] hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <feature.icon className="w-5 h-5 text-white/30 mb-4 group-hover:text-white/60 transition-colors" />
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed mb-4">{feature.desc}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white/70">{feature.stat}</span>
                <span className="text-[10px] text-white/20 uppercase tracking-wider">{feature.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Vercel-style terminal */}
        <div className="mt-12 max-w-3xl mx-auto">
          <PremiumCard gradient="slate" glass="subtle" padding="p-0" className="overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-white/20 font-mono ml-2">~/project</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div className="text-white/30">$ <span className="text-emerald-400/80">npx vercel deploy</span></div>
              <div className="text-white/20">Deploying to production...</div>
              <div className="text-white/20">Build completed in <span className="text-cyan-400/70">2.4s</span></div>
              <div className="text-white/20">Deployed to <span className="text-purple-400/70">project-abc123.vercel.app</span></div>
              <div className="flex items-center gap-2 mt-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400/80">Production deployment ready</span>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEMPLATE 2 — LINEAR-STYLE: Project Management Tool
// ============================================================================

function LinearTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['All Issues', 'Active', 'Backlog']

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <TemplateLabel label="Template 02" site="Linear" color="bg-indigo-400" />

        {/* Linear-style hero */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Linear is a better way
            </span>
            <br />
            <span className="text-white">to build products</span>
          </h2>
          <p className="text-lg text-white/40 max-w-lg mx-auto mb-10">
            Meet the new standard for modern software development. Streamline issues, projects, and product roadmaps.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="px-8 py-3 rounded-lg bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-all">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg text-white/50 text-sm font-medium hover:text-white/70 transition-all flex items-center gap-2">
              See how it works
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Linear-style issue board */}
        <PremiumCard gradient="purple" glass="subtle" padding="p-0" className="overflow-hidden max-w-4xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-4">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === i ? 'text-white' : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-md hover:bg-white/5 text-white/30">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/5 text-white/30">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Issue list */}
          <div className="divide-y divide-white/[0.04]">
            {[
              { id: 'FX-142', title: 'Implement PremiumCard v3 API', priority: 'urgent', status: 'in-progress', assignee: 'FX' },
              { id: 'FX-141', title: 'Add tilt physics to card system', priority: 'high', status: 'done', assignee: 'AI' },
              { id: 'FX-140', title: 'Glassmorphism blur performance audit', priority: 'medium', status: 'in-progress', assignee: 'FX' },
              { id: 'FX-139', title: 'Design template marketplace research', priority: 'high', status: 'todo', assignee: 'AI' },
              { id: 'FX-138', title: 'Aurora gradient color calibration', priority: 'low', status: 'done', assignee: 'FX' },
              { id: 'FX-137', title: 'Shimmer button accessibility audit', priority: 'medium', status: 'todo', assignee: 'AI' },
            ].map(issue => (
              <div key={issue.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                  issue.status === 'done' ? 'bg-indigo-500 border-indigo-500' :
                  issue.status === 'in-progress' ? 'border-yellow-500/50' : 'border-white/15'
                }`}>
                  {issue.status === 'done' && <Check className="w-3 h-3 text-white" />}
                  {issue.status === 'in-progress' && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                </div>
                <span className="text-xs text-white/20 font-mono w-14 flex-shrink-0">{issue.id}</span>
                <span className={`text-sm flex-1 ${issue.status === 'done' ? 'text-white/30 line-through' : 'text-white/70'}`}>
                  {issue.title}
                </span>
                <div className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${
                  issue.priority === 'urgent' ? 'bg-red-500/10 text-red-400' :
                  issue.priority === 'high' ? 'bg-orange-500/10 text-orange-400' :
                  issue.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-white/5 text-white/30'
                }`}>
                  {issue.priority}
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                  {issue.assignee}
                </div>
              </div>
            ))}
          </div>
        </PremiumCard>
      </div>
    </section>
  )
}

// ============================================================================
// TEMPLATE 3 — STRIPE-STYLE: Developer API Platform
// ============================================================================

function StripeTemplate() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <TemplateLabel label="Template 03" site="Stripe" color="bg-violet-400" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Financial infrastructure for the{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">internet</span>
            </h2>
            <p className="text-lg text-white/40 mb-10 leading-relaxed">
              Millions of companies use our APIs to accept payments, send payouts, and manage their businesses online.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold hover:from-violet-400 hover:to-fuchsia-400 transition-all flex items-center gap-2">
                Start now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 text-white/50 text-sm font-medium hover:text-white/70 transition-all flex items-center gap-2">
                Contact sales
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: '99.99%', label: 'Uptime' },
                { value: '250M+', label: 'API requests/day' },
                { value: '135+', label: 'Currencies' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs text-white/25 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code sample */}
          <div className="relative">
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent rounded-3xl blur-2xl" />

            <PremiumCard gradient="purple" glass="medium" mouseGlow padding="p-0" className="overflow-hidden relative">
              {/* Tab bar */}
              <div className="flex items-center gap-1 px-4 pt-4 pb-0">
                {['Node.js', 'Python', 'cURL'].map((lang, i) => (
                  <button
                    key={lang}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      i === 0 ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="p-6 font-mono text-[13px] leading-relaxed space-y-1 overflow-x-auto">
                <div className="text-white/25">// Create a payment intent</div>
                <div><span className="text-violet-400">const</span> <span className="text-white/70">stripe</span> = <span className="text-cyan-400">require</span>(<span className="text-emerald-400">&apos;stripe&apos;</span>)(<span className="text-emerald-400">&apos;sk_live_...&apos;</span>);</div>
                <div className="h-2" />
                <div><span className="text-violet-400">const</span> <span className="text-white/70">paymentIntent</span> = <span className="text-violet-400">await</span> stripe.paymentIntents.<span className="text-cyan-400">create</span>({'{'}</div>
                <div className="pl-4"><span className="text-white/50">amount:</span> <span className="text-amber-400">2000</span>,</div>
                <div className="pl-4"><span className="text-white/50">currency:</span> <span className="text-emerald-400">&apos;usd&apos;</span>,</div>
                <div className="pl-4"><span className="text-white/50">payment_method_types:</span> [<span className="text-emerald-400">&apos;card&apos;</span>],</div>
                <div>{'}'});</div>
                <div className="h-2" />
                <div className="text-white/25">// Returns: pi_3MtwBw2eZvKYlo2C0jHdA3s5</div>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Stripe-style product grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Braces, name: 'Payments', desc: 'Accept payments globally', gradient: 'from-violet-500/10 to-fuchsia-500/10', border: 'border-violet-500/20', text: 'text-violet-400' },
            { icon: Shield, name: 'Fraud Detection', desc: 'ML-powered fraud prevention', gradient: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
            { icon: Users, name: 'Connect', desc: 'Marketplace payments', gradient: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
            { icon: BarChart3, name: 'Billing', desc: 'Subscription management', gradient: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
          ].map(product => (
            <div key={product.name} className={`group p-6 rounded-2xl bg-gradient-to-br ${product.gradient} border ${product.border} hover:scale-[1.02] transition-all cursor-pointer`}>
              <product.icon className={`w-8 h-8 ${product.text} mb-4`} />
              <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
              <p className="text-sm text-white/30 mb-4">{product.desc}</p>
              <div className={`text-sm ${product.text} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEMPLATE 4 — CANVA-STYLE: Template Gallery / Creative Platform
// ============================================================================

function CanvaTemplate() {
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = ['all', 'Presentations', 'Social Media', 'Videos', 'Logos', 'Docs']

  const templates = [
    { title: 'Modern Pitch Deck', category: 'Presentations', color: 'from-rose-500 to-pink-500', views: '12.4k' },
    { title: 'Instagram Story Pack', category: 'Social Media', color: 'from-violet-500 to-purple-500', views: '8.2k' },
    { title: 'YouTube Thumbnail', category: 'Social Media', color: 'from-red-500 to-orange-500', views: '15.1k' },
    { title: 'Brand Logo Kit', category: 'Logos', color: 'from-teal-500 to-cyan-500', views: '6.7k' },
    { title: 'Product Promo Video', category: 'Videos', color: 'from-amber-500 to-yellow-500', views: '4.3k' },
    { title: 'Resume Template', category: 'Docs', color: 'from-blue-500 to-indigo-500', views: '21.8k' },
    { title: 'Business Card', category: 'Docs', color: 'from-emerald-500 to-green-500', views: '9.5k' },
    { title: 'TikTok Video', category: 'Videos', color: 'from-pink-500 to-fuchsia-500', views: '18.3k' },
  ]

  const filtered = activeCategory === 'all' ? templates : templates.filter(t => t.category === activeCategory)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <TemplateLabel label="Template 04" site="Canva" color="bg-teal-400" />

        {/* Canva-style hero */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            What will you{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">design</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-full" />
            </span>
            {' '}today?
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto mt-4 mb-10">
            Start from thousands of professional templates, or create from scratch.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm py-4 pl-12 pr-4 text-left text-white/30 text-sm">
              Search templates, designs, formats...
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
              }`}
            >
              {cat === 'all' ? 'All Templates' : cat}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((template, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`aspect-[4/5] rounded-2xl bg-gradient-to-br ${template.color} mb-3 relative overflow-hidden`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 60%)',
                }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                  <button className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
                    Use Template
                  </button>
                </div>
                {/* View count */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-[10px] text-white/70 font-medium">
                  {template.views} uses
                </div>
              </div>
              <h3 className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{template.title}</h3>
              <p className="text-xs text-white/25">{template.category}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold hover:from-teal-400 hover:to-cyan-400 transition-all">
            Browse All Templates
          </button>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEMPLATE 5 — GOOGLE AI STUDIO / GEMINI-STYLE
// ============================================================================

function GeminiTemplate() {
  const [messages] = useState([
    { role: 'user', content: 'Explain quantum computing in simple terms.' },
    { role: 'assistant', content: 'Think of a regular computer as a coin that can be either heads or tails. A quantum computer is like a coin spinning in the air — it\'s both heads AND tails at the same time. This is called superposition.\n\nThis means quantum computers can explore many possibilities simultaneously, making them incredibly powerful for certain types of problems.' },
    { role: 'user', content: 'What problems can they solve better?' },
  ])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Gemini-style background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <TemplateLabel label="Template 05" site="Google AI Studio" color="bg-blue-400" />

        {/* Gemini hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Powered by Gemini Ultra</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Build with AI
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Prototype, test, and deploy AI applications with the most capable models.
          </p>
        </div>

        {/* Chat interface */}
        <div className="max-w-3xl mx-auto">
          <PremiumCard gradient="purple" glass="medium" padding="p-0" className="overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Gemini Ultra</div>
                  <div className="text-[10px] text-white/30">1M token context</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs text-white/30 hover:text-white/50 hover:bg-white/5 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-500/10 text-white/80 border border-blue-500/20'
                      : 'bg-white/[0.03] text-white/60 border border-white/[0.06]'
                  }`}>
                    {msg.content.split('\n\n').map((p, pi) => (
                      <p key={pi} className={pi > 0 ? 'mt-3' : ''}>{p}</p>
                    ))}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-3.5 h-3.5 text-white/50" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="px-6 pb-6">
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.02]">
                <Plus className="w-5 h-5 text-white/20" />
                <span className="flex-1 text-sm text-white/25">Ask anything...</span>
                <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Model cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: 'Gemini Ultra', desc: 'Most capable model', tokens: '1M context', color: 'from-blue-500/10 to-violet-500/10', border: 'border-blue-500/20' },
            { name: 'Gemini Pro', desc: 'Best for most tasks', tokens: '128K context', color: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20' },
            { name: 'Gemini Flash', desc: 'Fastest response', tokens: '1M context', color: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/20' },
          ].map(model => (
            <div key={model.name} className={`p-5 rounded-xl bg-gradient-to-br ${model.color} border ${model.border} hover:scale-[1.02] transition-all cursor-pointer`}>
              <h4 className="text-sm font-semibold text-white mb-1">{model.name}</h4>
              <p className="text-xs text-white/30 mb-2">{model.desc}</p>
              <span className="text-[10px] text-white/20 font-mono">{model.tokens}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TEMPLATE 6 — SAAS DASHBOARD: Analytics & Admin Panel
// ============================================================================

function DashboardTemplate() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <TemplateLabel label="Template 06" site="Modern SaaS" color="bg-emerald-400" />

        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            Dashboard{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Template</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Production-ready admin panel with real-time metrics, charts, and data tables.
          </p>
        </div>

        {/* Dashboard layout */}
        <PremiumCard gradient="emerald" glass="subtle" padding="p-0" className="overflow-hidden">
          {/* Dashboard nav */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">Acme Inc</span>
              </div>
              <nav className="hidden md:flex items-center gap-4">
                {['Overview', 'Analytics', 'Customers', 'Products'].map((item, i) => (
                  <span key={item} className={`text-sm ${i === 0 ? 'text-white font-medium' : 'text-white/30 hover:text-white/50 cursor-pointer transition-colors'}`}>
                    {item}
                  </span>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-white/5 text-white/30">
                <Bell className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
            </div>
          </div>

          <div className="p-6">
            {/* Metrics row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', up: true },
                { label: 'Subscriptions', value: '+2,350', change: '+180.1%', up: true },
                { label: 'Active Users', value: '12,234', change: '+19%', up: true },
                { label: 'Churn Rate', value: '2.1%', change: '-0.4%', up: false },
              ].map(metric => (
                <div key={metric.label} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/30 font-medium">{metric.label}</span>
                    <TrendingUp className={`w-3.5 h-3.5 ${metric.up ? 'text-emerald-400' : 'text-red-400 rotate-180'}`} />
                  </div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className={`text-xs mt-1 ${metric.up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {metric.change} from last month
                  </div>
                </div>
              ))}
            </div>

            {/* Chart area + Table */}
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
              {/* Chart placeholder */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
                  <select className="text-xs text-white/30 bg-transparent border border-white/10 rounded-md px-2 py-1">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
                {/* Chart bars */}
                <div className="flex items-end gap-2 h-48">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-emerald-500/30 to-emerald-400/10 transition-all hover:from-emerald-500/50 hover:to-emerald-400/20"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[8px] text-white/15">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent transactions */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white mb-4">Recent Sales</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Olivia Martin', email: 'olivia@email.com', amount: '+$1,999.00' },
                    { name: 'Jackson Lee', email: 'jackson@email.com', amount: '+$39.00' },
                    { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '+$299.00' },
                    { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                    { name: 'Sofia Davis', email: 'sofia@email.com', amount: '+$39.00' },
                  ].map(sale => (
                    <div key={sale.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/40">
                        {sale.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/70 truncate">{sale.name}</div>
                        <div className="text-[10px] text-white/20 truncate">{sale.email}</div>
                      </div>
                      <span className="text-sm font-medium text-emerald-400">{sale.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  )
}

// ============================================================================
// MARKETPLACE INFO — What to sell and where
// ============================================================================

function MarketplaceSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">
            <Target className="w-3.5 h-3.5" />
            Product Strategy
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Built to{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Sell</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Every template above is a standalone product. Here&apos;s the distribution strategy.
          </p>
        </div>

        {/* Marketplace cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: 'v0.dev',
              desc: 'Vercel\'s AI component marketplace. React + Next.js + Tailwind templates.',
              format: 'React/Next.js',
              pricing: '$0-49 per component',
              fit: 'Perfect — our exact stack',
              color: 'cyan',
            },
            {
              name: 'Gumroad',
              desc: 'Indie creator marketplace. Full template bundles with source code.',
              format: 'Any framework',
              pricing: '$19-199 per bundle',
              fit: 'Great for premium bundles',
              color: 'purple',
            },
            {
              name: 'Creative Market',
              desc: 'Design assets marketplace. UI kits, themes, and template packs.',
              format: 'Figma + Code',
              pricing: '$29-99 per product',
              fit: 'Design-forward templates',
              color: 'emerald',
            },
            {
              name: 'ThemeForest',
              desc: 'Largest template marketplace. Full website themes and admin panels.',
              format: 'HTML/React/Vue',
              pricing: '$19-79 per theme',
              fit: 'Dashboard + landing templates',
              color: 'gold',
            },
            {
              name: 'UI8',
              desc: 'Premium design assets. Component libraries and design systems.',
              format: 'Figma + React',
              pricing: '$48-200+ per product',
              fit: 'Premium component library',
              color: 'purple',
            },
            {
              name: 'GitHub Sponsors',
              desc: 'Open-source sponsorship. Free templates with premium tier.',
              format: 'Open Source',
              pricing: '$5-25/month',
              fit: 'Community growth engine',
              color: 'slate',
            },
          ].map(marketplace => (
            <PremiumCard key={marketplace.name} gradient={marketplace.color as 'cyan' | 'purple' | 'emerald' | 'gold' | 'slate'} mouseGlow padding="p-6">
              <h3 className="text-lg font-bold text-white mb-2">{marketplace.name}</h3>
              <p className="text-sm text-white/30 mb-4 leading-relaxed">{marketplace.desc}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/20">Format</span>
                  <span className="text-white/50 font-medium">{marketplace.format}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/20">Price Range</span>
                  <span className="text-white/50 font-medium">{marketplace.pricing}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/20">Our Fit</span>
                  <span className="text-emerald-400/70 font-medium">{marketplace.fit}</span>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* What sells best */}
        <PremiumCard gradient="gold" glass="subtle" mouseGlow padding="p-8 sm:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">What Sells Best</h3>
              <div className="space-y-4">
                {[
                  { rank: 1, item: 'Next.js + Tailwind SaaS Starters', revenue: 'High demand, $49-199', icon: Rocket },
                  { rank: 2, item: 'Dashboard / Admin Templates', revenue: 'Consistent sellers, $29-79', icon: LayoutGrid },
                  { rank: 3, item: 'Landing Page Templates', revenue: 'Volume sellers, $19-49', icon: Layout },
                  { rank: 4, item: 'Component Libraries', revenue: 'Recurring value, $48-200+', icon: Boxes },
                  { rank: 5, item: 'Email Templates (React Email)', revenue: 'Underserved market, $19-49', icon: Mail },
                ].map(item => (
                  <div key={item.rank} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
                      {item.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white/70">{item.item}</div>
                      <div className="text-xs text-white/25">{item.revenue}</div>
                    </div>
                    <item.icon className="w-4 h-4 text-white/15 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Our Advantages</h3>
              <div className="space-y-4">
                {[
                  { label: 'Zero dependencies beyond React + Tailwind', desc: 'No vendor lock-in, works everywhere' },
                  { label: 'PremiumCard unified API', desc: '20+ effects from one import' },
                  { label: 'Accessible by default', desc: 'WCAG 2.2, reduced-motion, keyboard nav' },
                  { label: 'Dark mode native', desc: 'Built dark-first, light mode as override' },
                  { label: 'AI-generated at scale', desc: 'Claude Code produces in minutes, not weeks' },
                ].map(advantage => (
                  <div key={advantage.label} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white/70">{advantage.label}</div>
                      <div className="text-xs text-white/25">{advantage.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  )
}

// ============================================================================
// CAPABILITIES MATRIX — What Claude can build
// ============================================================================

function CapabilitiesSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">
            <Cpu className="w-3.5 h-3.5" />
            Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            What Claude Code Can Build
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            A transparent look at capabilities, limitations, and what needs additional tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Can do */}
          <PremiumCard gradient="emerald" glass="subtle" padding="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Check className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Built-in Capabilities</h3>
            </div>
            <div className="space-y-3">
              {[
                'React/Next.js components',
                'Tailwind CSS styling',
                'Framer Motion animations',
                'Complex state management',
                'Form validation logic',
                'API route handlers',
                'TypeScript + type safety',
                'SVG generation',
                'CSS animations & keyframes',
                'Responsive layouts',
                'Dark/light mode systems',
                'Accessibility (a11y)',
                'SEO metadata + Schema',
                'MDX content generation',
                'Canvas 2D animations',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </PremiumCard>

          {/* Needs MCP */}
          <PremiumCard gradient="gold" glass="subtle" padding="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Wand2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">With MCP Tools</h3>
            </div>
            <div className="space-y-3">
              {[
                { item: 'AI image generation', tool: 'Nano Banana' },
                { item: 'Screenshot capture', tool: 'Playwright' },
                { item: 'Browser testing', tool: 'Playwright' },
                { item: 'Web scraping', tool: 'Playwright' },
                { item: 'Knowledge graphs', tool: 'Memory MCP' },
                { item: 'Notion integration', tool: 'Notion MCP' },
                { item: 'Email automation', tool: 'Gmail MCP' },
                { item: 'Slack messaging', tool: 'Slack MCP' },
                { item: 'Vercel deployment', tool: 'Vercel MCP' },
                { item: 'Domain management', tool: 'Vercel MCP' },
              ].map(({ item, tool }) => (
                <div key={item} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2 text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item}
                  </div>
                  <span className="text-[9px] text-amber-400/50 font-mono whitespace-nowrap">{tool}</span>
                </div>
              ))}
            </div>
          </PremiumCard>

          {/* Limitations */}
          <PremiumCard gradient="slate" glass="subtle" padding="p-6">
            <div className="flex items-center gap-2 mb-6">
              <X className="w-5 h-5 text-red-400/60" />
              <h3 className="text-lg font-bold text-white">Current Limitations</h3>
            </div>
            <div className="space-y-3">
              {[
                { item: 'WebGL/Three.js (complex)', note: 'Basic possible, no preview' },
                { item: 'Video rendering', note: 'Generate code, not video' },
                { item: 'Real user data', note: 'Mock data only' },
                { item: 'Live API integrations', note: 'Code only, no live keys' },
                { item: 'Backend databases', note: 'Schema + queries, not hosting' },
                { item: 'iOS/Android native', note: 'React Native possible' },
                { item: 'Real-time collaboration', note: 'Socket code, not infra' },
                { item: 'Payment processing', note: 'UI + Stripe code, not keys' },
              ].map(({ item, note }) => (
                <div key={item}>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {item}
                  </div>
                  <div className="text-[10px] text-white/15 ml-4 mt-0.5">{note}</div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA — Link to Quests
// ============================================================================

function BottomCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <ParallaxContainer offset={-20}>
          <PremiumCard gradient="cyan" glass="medium" mouseGlow shine tilt tiltIntensity={3} padding="p-12 sm:p-16">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-bold mb-4">Next Level</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Design Lab Quests
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-8">
              Daily challenges, capability documentation, and a transparent log of what we build.
              Follow along as Claude Code pushes the boundaries of what AI can create.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticHover intensity={0.12}>
                <ShimmerButton
                  shimmerColor="#06B6D4"
                  shimmerSize="0.08em"
                  background="rgba(6, 182, 212, 0.1)"
                  className="!border-cyan-500/30 !text-cyan-300 !text-sm !font-semibold !px-8 !py-3.5"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  View Quests
                </ShimmerButton>
              </MagneticHover>
              <MagneticHover intensity={0.12}>
                <ShimmerButton
                  shimmerColor="#A855F7"
                  shimmerSize="0.05em"
                  background="rgba(168, 85, 247, 0.06)"
                  className="!border-purple-500/20 !text-white/50 !text-sm !font-medium !px-8 !py-3.5"
                >
                  Back to v2 Lab
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ShimmerButton>
              </MagneticHover>
            </div>
          </PremiumCard>
        </ParallaxContainer>
      </div>
    </section>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function DesignLabV3Page() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/20">
      <V3Hero />
      <TemplateDivider label="Template 01 — Developer Platform" />
      <VercelTemplate />
      <TemplateDivider label="Template 02 — Project Management" />
      <LinearTemplate />
      <TemplateDivider label="Template 03 — API Platform" />
      <StripeTemplate />
      <TemplateDivider label="Template 04 — Creative Platform" />
      <CanvaTemplate />
      <TemplateDivider label="Template 05 — AI Chat Interface" />
      <GeminiTemplate />
      <TemplateDivider label="Template 06 — SaaS Dashboard" />
      <DashboardTemplate />
      <TemplateDivider label="Distribution Strategy" />
      <MarketplaceSection />
      <TemplateDivider label="Capabilities" />
      <CapabilitiesSection />
      <BottomCTA />
      <div className="h-20" />
    </div>
  )
}
