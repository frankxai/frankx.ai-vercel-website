/**
 * v0-generated variant: Homepage Hero
 * Generated: 2026-02-08 via v0-1.5-lg with extended thinking
 * Chat: kp1UCsrMJI8
 * Demo: https://demo-kzmp73pqpq4yhafic577.vusercontent.net
 * Source file: app/page.tsx
 * 
 * Reference design — adapt best patterns to production codebase.
 */

'use client'

import { Button } from '@/components/ui/button'
import { LiquidGradient } from '@/components/liquid-gradient'
import { FloatingStatCard } from '@/components/floating-stat-card'
import { ScrollIndicator } from '@/components/scroll-indicator'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Liquid Gradient Background */}
      <LiquidGradient />

      {/* Floating Stat Cards */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <FloatingStatCard
          value="500+"
          label="AI Songs"
          delay={0}
          className="absolute left-[8%] top-[20%]"
        />
        <FloatingStatCard
          value="40+"
          label="Agents"
          delay={1}
          className="absolute right-[12%] top-[30%]"
        />
        <FloatingStatCard
          value="70+"
          label="Articles"
          delay={2}
          className="absolute left-[10%] bottom-[25%]"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Name with gradient */}
          <h1 className="mb-6 text-7xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl">
            <span className="text-gradient">Frank</span>
          </h1>

          {/* Tagline */}
          <p className="mb-4 text-balance text-2xl font-light tracking-wide text-white/90 sm:text-3xl md:text-4xl">
            {'Build what matters.'}
          </p>

          {/* Subtitle */}
          <p className="mb-12 text-pretty text-lg text-muted-foreground sm:text-xl">
            {'AI Architect. Creator. Builder.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA - Gradient Border */}
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full border-2 border-transparent bg-transparent px-8 py-6 text-base font-semibold text-white transition-all hover:scale-105 sm:text-lg"
              style={{
                backgroundImage:
                  'linear-gradient(#0F172A, #0F172A) padding-box, linear-gradient(135deg, #AB47C7, #43BFE3) border-box',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {'Explore My Work'}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>

            {/* Secondary CTA - Glassmorphic */}
            <Button
              size="lg"
              variant="outline"
              className="glassmorphic group rounded-full px-8 py-6 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-white/5 sm:text-lg bg-transparent"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {'Read the Blog'}
              </span>
            </Button>
          </div>

          {/* Mobile Stat Cards */}
          <div className="mt-16 grid grid-cols-3 gap-4 md:hidden">
            <FloatingStatCard value="500+" label="AI Songs" delay={0} />
            <FloatingStatCard value="40+" label="Agents" delay={1} />
            <FloatingStatCard value="70+" label="Articles" delay={2} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </main>
  )
}
