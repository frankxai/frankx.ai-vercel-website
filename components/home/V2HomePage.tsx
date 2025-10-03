'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import dynamic from 'next/dynamic'

import {
  heroContent,
  quickWins,
  products,
  featuredPosts,
  communityCTA,
  expertiseSnippet
} from '@/lib/v2-hub'
import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'
import {
  ParallaxContainer,
  StaggerContainer,
  StaggerItem,
  MagneticHover,
  GlowPulse,
  ScrollProgress
} from '@/components/ui/AdvancedAnimations'
import { Surface, SectionHeading, Pill } from '@/components/ui/primitives'
import { trackEvent } from '@/lib/analytics'

export default function V2HomePage() {
  return (
    <main id="main" className="flex-1 pt-32 text-white">
      <ScrollProgress />

      {/* Hero - Golden Age + AI Center of Excellence */}
      <section id="hero" className="relative overflow-hidden pt-24 pb-32">
        <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
        <div className={clsx('absolute inset-0 opacity-50 blur-3xl', gradientPresets.heroAurora)} />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-60" aria-hidden />

        <ParallaxContainer offset={30}>
          <div className="relative mx-auto max-w-7xl px-6">
            <StaggerContainer staggerDelay={0.15}>
              <div className="text-center space-y-10">
                <StaggerItem>
                  <Pill variant="brand" className="mx-auto">
                    {heroContent.eyebrow}
                  </Pill>
                </StaggerItem>

                <StaggerItem>
                  <h1 className="text-heading-1 font-bold leading-tight text-balance max-w-6xl mx-auto">
                    <span className="bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent">
                      {heroContent.headline}
                    </span>
                  </h1>
                </StaggerItem>

                <StaggerItem>
                  <p className="text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                    {heroContent.subheadline}
                  </p>
                </StaggerItem>

                {/* Stats */}
                <StaggerItem>
                  <div className="flex justify-center gap-12 pt-4">
                    {heroContent.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </StaggerItem>

                {/* CTAs */}
                <StaggerItem>
                  <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-center">
                    <MagneticHover intensity={0.4}>
                      <GlowPulse color="cyan">
                        <Link
                          href={heroContent.primaryCTA.href}
                          onClick={() => trackEvent('v2_hero_primary_cta', { destination: heroContent.primaryCTA.href })}
                          className="btn-primary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                        >
                          {heroContent.primaryCTA.label}
                          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Link>
                      </GlowPulse>
                    </MagneticHover>

                    <MagneticHover intensity={0.3}>
                      <Link
                        href={heroContent.secondaryCTA.href}
                        onClick={() => trackEvent('v2_hero_secondary_cta', { destination: heroContent.secondaryCTA.href })}
                        className="btn-secondary inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:-translate-y-1"
                      >
                        {heroContent.secondaryCTA.label}
                        <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Link>
                    </MagneticHover>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </ParallaxContainer>
      </section>

      {/* Quick Wins - Instant Value */}
      <section id="quick-wins" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Start Creating in Minutes"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickWins.map((win, idx) => {
              const Icon = win.icon
              return (
                <motion.div
                  key={win.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={win.href}
                    onClick={() => trackEvent('quick_win_click', { type: win.type, title: win.title })}
                    className={clsx(
                      glassCardClasses.base,
                      'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
                      'hover:scale-105 hover:border-white/30'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-3">
                        <Icon className="h-6 w-6 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                          {win.title}
                        </h3>
                        <p className="text-sm text-neutral-400">{win.description}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-neutral-500 group-hover:text-primary-400 transition-colors" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured This Week */}
      <section id="featured" className="relative py-24 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Featured This Week"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hero Featured Post */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href={featuredPosts[0].href}
                className={clsx(
                  glassCardClasses.base,
                  'group block rounded-2xl p-8 h-full transition-all duration-300 hover:scale-[1.02]'
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                  {featuredPosts[0].category}
                </span>
                <h3 className="text-2xl font-bold mt-4 mb-3 group-hover:text-primary-400 transition-colors">
                  {featuredPosts[0].title}
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-4">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <time dateTime={featuredPosts[0].date}>{featuredPosts[0].date}</time>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Side Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1, 3).map((post, idx) => (
                <motion.div
                  key={post.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={post.href}
                    className={clsx(
                      glassCardClasses.base,
                      'group block rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]'
                    )}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-2 mb-2 group-hover:text-accent-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">{post.excerpt}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products - The OS/IS Stack */}
      <section id="products" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Creator Intelligence Systems"
            subtitle="Build your personal AI center of excellence"
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <Surface
                    variant="glass"
                    className="group relative overflow-hidden rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-4 w-fit mb-6">
                      <Icon className="h-8 w-8 text-primary-400" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-primary-400 font-medium mb-4">{product.tagline}</p>
                    <p className="text-neutral-300 mb-6 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {product.keyFeatures.slice(0, 3).map((feature) => (
                        <li key={feature} className="text-sm text-neutral-400 flex items-start gap-2">
                          <span className="text-primary-400 mt-1">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={product.href}
                      onClick={() => trackEvent('product_cta_click', { product: product.id })}
                      className="inline-flex items-center gap-2 font-semibold text-primary-400 group-hover:text-primary-300 transition-colors"
                    >
                      {product.cta}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Surface>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* From Frank's Studio */}
      <section id="from-frank" className="relative py-24 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="From Frank's Studio"
            subtitle="AI explorations, Creation Chronicles, and insights from the Golden Age"
            align="center"
            className="mb-12"
          />

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              Read All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise Snippet */}
      <section id="expertise" className="relative py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{expertiseSnippet.title}</h2>
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
              {expertiseSnippet.description}
            </p>
            <Link
              href={expertiseSnippet.cta.href}
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              {expertiseSnippet.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Join Community - Final CTA */}
      <section id="community" className="relative py-32 overflow-hidden">
        <div className={clsx('absolute inset-0', gradientPresets.heroPulse)} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">{communityCTA.title}</h2>
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
              {communityCTA.description}
            </p>

            <form className="max-w-md mx-auto mb-8">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={communityCTA.newsletterPlaceholder}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:border-primary-400 transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary px-8 py-4 rounded-xl font-semibold whitespace-nowrap"
                >
                  {communityCTA.submitLabel}
                </button>
              </div>
            </form>

            <div className="flex justify-center gap-6">
              {communityCTA.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  className="text-neutral-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
