'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowRight,
    Brain,
    Music,
    BookOpen,
    Sparkles,
    Download,
    GraduationCap,
    Workflow
} from 'lucide-react'

import {
    ParallaxContainer,
    StaggerContainer,
    StaggerItem,
    ScrollProgress
} from '@/components/ui/AdvancedAnimations'
import { Pill, SectionHeading } from '@/components/ui/primitives'
import { trackEvent } from '@/lib/analytics'
import type { BlogPost } from '@/lib/types/blog'
import BlogCardCompact from '@/components/blog/BlogCardCompact'
import AnimatedMesh from '@/components/ui/AnimatedMesh'
import ShimmerText from '@/components/ui/ShimmerText'
import PremiumButton from '@/components/ui/PremiumButton'

interface StudentFocusHomeProps {
    featuredPosts: BlogPost[]
}

export default function StudentFocusHome({ featuredPosts }: StudentFocusHomeProps) {
    return (
        <main id="main" className="flex-1 pt-32 text-white">
            <ScrollProgress />

            {/* ========================================
          HERO SECTION - Student Hub Focus
      ======================================== */}
            <section
                id="hero"
                className="relative overflow-hidden pt-24 pb-32 min-h-[90vh] flex items-center"
            >
                {/* Background */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/images/hero-ai-hub-v4.png"
                        alt="FrankX AI Command Center"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                        quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
                </div>

                <AnimatedMesh variant="hero" speed="slow" className="opacity-60" />

                <ParallaxContainer offset={30}>
                    <div className="relative mx-auto max-w-7xl px-6">
                        <StaggerContainer staggerDelay={0.2}>
                            <div className="text-center space-y-10">

                                <StaggerItem>
                                    <Pill
                                        variant="brand"
                                        icon={<GraduationCap className="h-4 w-4" />}
                                        className="mx-auto"
                                    >
                                        Student Workshop Edition
                                    </Pill>
                                </StaggerItem>

                                <StaggerItem>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] tracking-tight max-w-6xl mx-auto">
                                        <span className="block text-white/90 text-2xl md:text-3xl font-normal mb-6 leading-relaxed tracking-normal">
                                            Welcome to the Age of Intelligence
                                        </span>
                                        <ShimmerText
                                            as="span"
                                            shimmerColor="multi"
                                            speed="slow"
                                            className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-extrabold"
                                        >
                                            Build Your AI Advantage
                                        </ShimmerText>
                                    </h1>
                                </StaggerItem>

                                <StaggerItem>
                                    <p className="text-xl md:text-2xl text-slate-200 mt-8 max-w-4xl mx-auto leading-[1.6] tracking-wide">
                                        A self-guided workshop to help you find your Ikigai, map your career track, and build a portfolio that stands out in the AI era.
                                    </p>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
                                        <PremiumButton
                                            href="/students"
                                            variant="primary"
                                            size="lg"
                                            glow
                                            magnetic
                                            onClick={() => trackEvent('home_cta', { destination: 'students' })}
                                            className="group shadow-[0_0_50px_rgba(6,182,212,0.25)]"
                                        >
                                            Start the Workshop
                                            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </PremiumButton>
                                    </div>
                                </StaggerItem>
                            </div>
                        </StaggerContainer>
                    </div>
                </ParallaxContainer>
            </section>

            {/* ========================================
          LATEST INTELLIGENCE (Safe to keep)
      ======================================== */}
            <section className="py-24 px-6 bg-slate-950/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <SectionHeading
                            eyebrow="From the Lab"
                            title="Latest Intelligence"
                            description="Experiments, workflows, and insights from my journey."
                        />
                    </div>

                    {featuredPosts.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {featuredPosts.slice(0, 3).map((post, index) => (
                                <BlogCardCompact key={post.slug} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500">
                            <p>Loading intelligence feed...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ========================================
          COMING SOON / WAITLIST
      ======================================== */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <Pill variant="brand" className="mx-auto mb-6">Coming Soon</Pill>
                    <h2 className="text-3xl font-bold text-white mb-6">FrankX Product Suite</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-12">
                        We are currently building the next generation of creator tools.
                        Vibe OS, Agentic Creator OS, and the Creative AI Toolkit are opening to waitlist members soon.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                            <Workflow className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
                            <h3 className="font-bold text-white">Creator OS</h3>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                            <Sparkles className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
                            <h3 className="font-bold text-white">AI Toolkit</h3>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                            <Music className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                            <h3 className="font-bold text-white">Vibe OS</h3>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
