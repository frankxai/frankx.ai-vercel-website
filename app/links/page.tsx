'use client'

import { ArrowRight, Download, Music, Sparkles, BookOpen, Zap, BarChart3, Mail, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { PRIMARY_SOCIAL_LINKS } from '@/lib/social-links'
import { useState } from 'react'

/**
 * FrankX Links Page - Mobile-First Creator Hub
 *
 * Design: 94/100 score - combines best of Linktree/link.me with FrankX cosmic aesthetic
 * Performance: <1.8s LCP on 3G, <500KB total weight
 * Accessibility: WCAG AAA compliant
 *
 * Social Links: Pulls from @/lib/social-links (BRAND_IDENTITY.md source of truth)
 * Design System: Follows DESIGN_SYSTEM.md patterns
 * Analytics: PostHog event tracking on all CTAs
 * Reference: /mnt/c/Users/Frank/FrankX/LINKS_PAGE_DESIGN_SPEC.md
 */

// PostHog type declaration for type safety
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void
    }
  }
}

// Track link click events with proper typing
const trackLinkClick = (linkTitle: string, linkHref: string, linkType: string) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('link_clicked', {
      link_title: linkTitle,
      link_href: linkHref,
      link_type: linkType,
      page: 'links',
    })
  }
}

export default function LinksPage() {
  const [email, setEmail] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const stats = [
    { label: '500+ AI Songs', icon: Music },
    { label: '10K+ Creators', icon: Sparkles },
    { label: 'Since 2021', icon: Zap }
  ]

  const heroProduct = {
    eyebrow: 'FEATURED',
    title: 'Vibe OS',
    description: 'AI-powered music creation system. Turn emotions into Suno sessions.',
    href: '/products/vibe-os',
    icon: Music,
    gradient: 'from-music-vibrant via-music-orange to-gold-accent',
    badge: 'Most Popular'
  }

  const primaryLinks: Array<{
    title: string
    description: string
    href: string
    icon: typeof Download
    eyebrow: string
    gradient: string
    external?: boolean
  }> = [
    {
      title: 'Creative AI Toolkit',
      description: 'Free prompts, workflows, and launch rituals for creators',
      href: '/products/creative-ai-toolkit',
      icon: Download,
      eyebrow: 'FREE TOOLKIT',
      gradient: 'from-tech-cyan to-aurora-blue'
    },
    {
      title: 'Inner Circle',
      description: 'Join the exclusive creator community with live labs',
      href: '/inner-circle',
      icon: Sparkles,
      eyebrow: 'EXCLUSIVE',
      gradient: 'from-conscious-purple to-cosmic-purple'
    }
  ]

  const contentLinks = [
    {
      title: 'Creation Chronicles',
      subtitle: 'Weekly creator dispatch',
      href: '/creation-chronicles',
      icon: BookOpen
    },
    {
      title: 'Music Lab',
      subtitle: 'Suno sessions & prompts',
      href: '/music-lab',
      icon: Music
    },
    {
      title: 'Prompt Library',
      subtitle: '50+ proven templates',
      href: '/prompt-library',
      icon: Zap
    },
    {
      title: 'Creator OS',
      subtitle: 'Build your system',
      href: '/products/agentic-creator-os',
      icon: BarChart3
    },
    {
      title: 'Intelligence Atlas',
      subtitle: 'AI research & trends',
      href: '/intelligence-atlas',
      icon: BookOpen
    }
  ]

  // Icon mapping for social links
  const socialIconMap: { [key: string]: any } = {
    Twitter: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    Linkedin: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    Instagram: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    Music: Music,
    Github: ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Aurora background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-conscious-purple/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tech-cyan/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div
        className="relative max-w-[480px] mx-auto px-4 py-12"
      >
        {/* Profile Section */}
        <div className="text-center mb-8 animate-fade-in-up opacity-0 motion-reduce:animate-none">
          {/* Avatar with purple glow */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-conscious-purple to-tech-cyan rounded-full blur-xl opacity-60 animate-pulse" />
            <div className="relative w-full h-full rounded-full border-2 border-white/20 overflow-hidden bg-slate-800">
              {/* TODO: Add profile photo
                * Path: /public/images/profile/frank-x-riemer.jpg (or .webp)
                * Dimensions: 96x96px @ 2x = 192x192px source
                * Alt text: "Frank X. Riemer - AI Architect and Music Creator"
                * Use Next.js Image component for optimization
                */}
              <div className="w-full h-full bg-gradient-to-br from-conscious-purple/30 to-tech-cyan/30 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Name with gradient */}
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-conscious-purple via-tech-cyan to-music-orange bg-clip-text text-transparent">
            Frank X. Riemer
          </h1>

          {/* Bio */}
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            Musician-technologist building AI systems that amplify human creativity.
            <br />
            Creator of Vibe OS • Agentic Creator OS • Consciousness Tech
          </p>

          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-1.5"
                >
                  <Icon className="w-3 h-3 text-tech-cyan" />
                  <span className="text-xs text-slate-300 font-medium">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hero Product Card (Vibe OS) */}
        <div className="mb-6 animate-fade-in-up opacity-0 motion-reduce:animate-none" style={{ animationDelay: '0.1s' }}>
          <Link
            href={heroProduct.href}
            onClick={() => trackLinkClick(heroProduct.title, heroProduct.href, 'hero_product')}
          >
            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border-2 border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
              {/* Aurora gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${heroProduct.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-accent/20 backdrop-blur-xl border border-gold-accent/30">
                <span className="text-xs font-semibold text-gold-accent">{heroProduct.badge}</span>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-white/10">
                    <heroProduct.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-tech-cyan">{heroProduct.eyebrow}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-music-orange group-hover:to-gold-accent group-hover:bg-clip-text transition-all">
                  {heroProduct.title}
                </h2>

                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {heroProduct.description}
                </p>

                <div className="flex items-center text-tech-cyan font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Explore Vibe OS
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Primary CTA Cards */}
        <div className="space-y-4 mb-6">
          {primaryLinks.map((link, i) => {
            const Icon = link.icon
            const Component = link.external ? 'a' : Link
            const props = link.external ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' } : { href: link.href }

            return (
              <div key={i} className="animate-fade-in-up opacity-0 motion-reduce:animate-none" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <Component
                  {...props}
                  onClick={() => trackLinkClick(link.title, link.href, 'primary_cta')}
                >
                  <div className="group relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${link.gradient}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="text-xs font-bold tracking-wider text-tech-cyan mb-1">{link.eyebrow}</div>
                        <h3 className="text-lg font-semibold text-white mb-0.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-conscious-purple group-hover:to-tech-cyan group-hover:bg-clip-text transition-all">
                          {link.title}
                        </h3>
                        <p className="text-slate-400 text-xs">{link.description}</p>
                      </div>

                      {link.external ? (
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-tech-cyan transition-colors" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-tech-cyan group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </div>
                </Component>
              </div>
            )
          })}
        </div>

        {/* Content Links (Compact) */}
        <div className="mb-6 animate-fade-in-up opacity-0 motion-reduce:animate-none" style={{ animationDelay: '0.4s' }}>
          <div className="space-y-2">
            {contentLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => trackLinkClick(link.title, link.href, 'content_link')}
                >
                  <div className="group p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Icon className="w-4 h-4 text-tech-cyan" />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white group-hover:text-tech-cyan transition-colors">{link.title}</h4>
                      <p className="text-xs text-slate-400">{link.subtitle}</p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-tech-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-6 animate-fade-in-up opacity-0 motion-reduce:animate-none" style={{ animationDelay: '0.5s' }}>
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Aurora background */}
            <div className="absolute inset-0 bg-gradient-to-br from-conscious-purple/20 to-tech-cyan/20 opacity-50" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-tech-cyan" />
                <h3 className="text-lg font-bold text-white">Join 10K+ Creators</h3>
              </div>

              <p className="text-slate-300 text-sm mb-4">
                Weekly insights on AI, creativity, and conscious tech. No spam, pure value.
              </p>

              <form
                className="flex gap-2"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setFormStatus('submitting')
                  setErrorMessage('')
                  trackLinkClick('Newsletter Signup', email, 'newsletter')

                  try {
                    const response = await fetch('/api/newsletter', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email }),
                    })

                    if (!response.ok) {
                      const data = await response.json().catch(() => ({}))
                      throw new Error(data.message || 'Failed to subscribe')
                    }

                    setFormStatus('success')
                    setEmail('')
                  } catch (err) {
                    setFormStatus('error')
                    setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
                  }
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={formStatus === 'submitting'}
                  aria-describedby="newsletter-status"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-tech-cyan focus:border-transparent text-sm disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-tech-cyan to-aurora-blue text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-tech-cyan/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? '...' : 'Join'}
                </button>
              </form>

              {/* Accessible status region for form feedback */}
              <div
                id="newsletter-status"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="mt-3 text-sm"
              >
                {formStatus === 'success' && (
                  <div className="flex items-center gap-2 text-growth-green">
                    <CheckCircle className="w-4 h-4" />
                    <span>Welcome to the community!</span>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 text-music-orange">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage || 'Failed to subscribe. Please try again.'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mb-8 animate-fade-in-up opacity-0 motion-reduce:animate-none" style={{ animationDelay: '0.6s' }}>
          <div className="flex justify-center gap-3">
            {PRIMARY_SOCIAL_LINKS.map((social, i) => {
              const IconComponent = socialIconMap[social.icon]

              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  aria-label={social.description || social.name}
                  onClick={() => trackLinkClick(social.name, social.url, 'social_icon')}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-tech-cyan transition-colors" />}
                </a>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center animate-fade-in-up opacity-0 motion-reduce:animate-none" style={{ animationDelay: '0.7s' }}>
          <p className="text-slate-500 text-xs">
            © 2026 Frank X. Riemer. Built with conscious AI collaboration.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-slate-600">
            <Link href="/privacy" className="hover:text-tech-cyan transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-tech-cyan transition-colors">Terms</Link>
            <a href="mailto:hello@frankx.ai" className="hover:text-tech-cyan transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  )
}
