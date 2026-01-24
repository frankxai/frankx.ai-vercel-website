'use client';

import { lazy, Suspense, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Book, FileText, ArrowRight, Clock, Sparkles, Music, Zap, Stars, Eye, Bookmark, Crown, BookOpen, Lightbulb, GraduationCap, Bell } from 'lucide-react';
import { bookMetadata, chapters, essays } from './metadata';
import { EmailSignup } from '@/components/email-signup';

// Lazy load 3D book for performance
const Book3D = lazy(() => import('./components/Book3D'));

// Premium motion presets for consistent feel
const premiumTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const hoverScale = {
  scale: 1.02,
  transition: premiumTransition,
};

const tapScale = {
  scale: 0.98,
  transition: premiumTransition,
};

// Book fallback while loading (also used for mobile)
function BookFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Main Book */}
        <div className="relative w-44 h-60 sm:w-48 sm:h-64 transform rotate-3 perspective-1000">
          {/* Book Cover */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-xl shadow-2xl">
            {/* Gold Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-l-xl" />

            {/* Gold Edge Lines */}
            <div className="absolute top-6 left-4 right-4 h-0.5 bg-amber-400/60" />
            <div className="absolute bottom-6 left-4 right-4 h-0.5 bg-amber-400/60" />

            {/* Title Area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="text-amber-200/80 text-xs uppercase tracking-[0.2em] mb-2 font-sans">The</div>
              <div className="text-amber-100 text-lg sm:text-xl font-serif font-bold text-center leading-tight">
                Golden Age
              </div>
              <div className="text-amber-100 text-base sm:text-lg font-serif font-bold text-center">
                of Creators
              </div>
              <div className="w-12 h-0.5 bg-amber-400/60 my-3" />
              <div className="text-amber-300/70 text-xs uppercase tracking-wider font-sans">Frank</div>
            </div>
          </div>

          {/* Book Pages (Side) */}
          <div className="absolute right-0 top-2 bottom-2 w-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-r-sm transform translate-x-1" />
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-8 bg-amber-500/20 rounded-full blur-2xl -z-10 animate-pulse" />

        {/* Floating Particles */}
        <div className="absolute -top-4 -right-4 w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-2 -left-4 w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-1/2 -right-6 w-1 h-1 bg-amber-300/40 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
}

// Premium Bento Card Component
function BentoCard({
  chapter,
  index,
  size = 'normal'
}: {
  chapter: typeof chapters[0];
  index: number;
  size?: 'featured' | 'normal' | 'compact';
}) {
  const isFeatured = size === 'featured';
  const isCompact = size === 'compact';

  if (!chapter.published) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className={`group relative overflow-hidden rounded-3xl border border-dashed border-gray-300/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-slate-900/30 backdrop-blur-sm ${
          isFeatured ? 'col-span-2 row-span-2 p-8 lg:p-10' : isCompact ? 'p-5' : 'p-6 lg:p-8'
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-xs font-medium text-gray-400 dark:text-gray-600">
              Chapter {chapter.number} · Coming Soon
            </span>
            <h3 className={`font-serif font-bold text-gray-400 dark:text-gray-600 ${
              isFeatured ? 'text-2xl lg:text-3xl' : isCompact ? 'text-lg' : 'text-xl lg:text-2xl'
            }`}>
              {chapter.title}
            </h3>
          </div>
          <p className={`text-gray-400 dark:text-gray-600 leading-relaxed ${isCompact ? 'text-sm line-clamp-2' : ''}`}>
            {chapter.description}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={hoverScale}
      whileTap={tapScale}
      className={`${isFeatured ? 'col-span-2 row-span-2' : ''}`}
    >
      <Link
        href={`/golden-age/${chapter.slug}`}
        className={`group relative flex flex-col h-full overflow-hidden rounded-3xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/60 dark:hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10 ${
          isFeatured ? 'p-8 lg:p-10' : isCompact ? 'p-5' : 'p-6 lg:p-8'
        }`}
      >
        {/* Premium glassmorphism gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-orange-50/30 dark:from-amber-900/10 dark:via-transparent dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Subtle glow effect */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-400/20 via-transparent to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

        <div className="relative flex flex-col h-full justify-between gap-4">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200/50 dark:border-amber-700/50">
                  <Bookmark className="w-3 h-3" />
                  Chapter {chapter.number}
                </span>
                {index === 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    Start Here
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {chapter.readingTime}
              </span>
            </div>

            <h3 className={`font-serif font-bold text-gray-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors ${
              isFeatured ? 'text-2xl lg:text-3xl' : isCompact ? 'text-lg' : 'text-xl lg:text-2xl'
            }`}>
              {chapter.title}
            </h3>
          </div>

          {/* Description */}
          <p className={`text-gray-600 dark:text-gray-400 leading-relaxed flex-grow ${
            isCompact ? 'text-sm line-clamp-2' : isFeatured ? 'text-base lg:text-lg' : 'text-sm lg:text-base line-clamp-3'
          }`}>
            {chapter.description}
          </p>

          {/* Footer CTA */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              <Eye className="w-4 h-4" />
              <span>Read Chapter</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function GoldenAgePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-void">
      {/* Hero Section - Premium with 3D Book */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden"
      >
        {/* Premium Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />
        <div className="absolute inset-0">
          {/* Ambient orbs */}
          <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/3 rounded-full blur-[200px]" />
        </div>

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Badge with Music Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-300 text-sm font-medium border border-amber-500/30 backdrop-blur-sm"
              >
                <Music className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-serif-italic">When Creation Calls, Everything Changes</span>
                <Sparkles className="w-4 h-4 text-orange-400" />
              </motion.div>

              {/* Title with Premium Gradient */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  {bookMetadata.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-gray-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                {bookMetadata.subtitle}
              </p>

              {/* Story Hook - Premium italic styling */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-amber-400 to-transparent rounded-full hidden lg:block" />
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed lg:pl-6">
                  <span className="text-3xl font-serif text-amber-400 font-medium">2 AM.</span>{' '}
                  <span className="text-gray-400">Studio lights glow. An idea hits—that electric moment when you</span>{' '}
                  <em className="font-serif-italic text-amber-300 not-italic">know</em>{' '}
                  <span className="text-gray-400">something wants to be created through you.</span>
                </p>
              </motion.div>

              {/* Premium Stats - Glass cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                {[
                  { value: '500+', label: 'AI Songs' },
                  { value: chapters.filter(c => c.published).length.toString(), label: 'Chapters' },
                  { value: 'Oracle', label: 'AI Expert' },
                ].map((stat, i) => (
                  <div key={stat.label} className="relative group">
                    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-amber-500/30">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                    {i < 2 && <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden sm:block" />}
                  </div>
                ))}
              </motion.div>

              {/* Premium CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.div whileHover={hoverScale} whileTap={tapScale}>
                  <Link
                    href="/golden-age/chapter-01-when-creation-calls"
                    className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold overflow-hidden transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Zap className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Start Chapter 1</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={hoverScale} whileTap={tapScale}>
                  <Link
                    href="#chapters"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 border border-white/20 text-white rounded-2xl font-medium hover:bg-white/5 hover:border-white/30 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all backdrop-blur-sm"
                  >
                    <Book className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    <span>All Chapters</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Mobile Book Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:hidden py-8"
            >
              <BookFallback className="h-[280px] sm:h-[320px]" />
            </motion.div>

            {/* Right Column - 3D Book (Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <Suspense fallback={<BookFallback className="h-[400px] md:h-[500px] lg:h-[600px]" />}>
                <Book3D />
              </Suspense>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
      </motion.section>

      {/* Book Chapters Section - Premium Bento Grid */}
      <section id="chapters" className="py-24 scroll-mt-20 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-space/50 to-void" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
              <BookOpen className="w-4 h-4" />
              The Journey
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Your Path to{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Creative Mastery
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Each chapter is a session. Read in order, or drop in where you need it most.{' '}
              <span className="font-serif-italic text-amber-400/80">The path unfolds as you walk it.</span>
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {chapters.map((chapter, index) => (
              <BentoCard
                key={chapter.slug}
                chapter={chapter}
                index={index}
                size={index === 0 ? 'featured' : index > 4 ? 'compact' : 'normal'}
              />
            ))}
          </div>

          {/* Reading Progress Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-gray-400">
                  {chapters.filter(c => c.published).length} of {chapters.length} chapters available
                </span>
              </div>
              <div className="h-4 w-px bg-gray-700" />
              <span className="text-sm text-amber-400 font-medium">
                ~{chapters.filter(c => c.published).reduce((acc, c) => {
                  const mins = parseInt(c.readingTime) || 5;
                  return acc + mins;
                }, 0)} min total read time
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Essays Section - Premium Cards */}
      <section id="essays" className="py-24 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-slate-900/80 to-void" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">
              <Lightbulb className="w-4 h-4" />
              Studio Notes
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Companion{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Essays
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Real-world intelligence from the creative trenches. Strategy, implementation, and insights you can apply today.
            </p>
          </motion.div>

          {/* Essays Grid - Premium Bento */}
          <div className="grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {essays.map((essay, index) => (
              <motion.div
                key={essay.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={hoverScale}
                whileTap={tapScale}
              >
                <Link
                  href={`/blog/${essay.slug}`}
                  className="group flex flex-col h-full p-6 lg:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  {/* Premium gradient hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative space-y-4 flex flex-col h-full">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                        <GraduationCap className="w-3 h-3" />
                        {essay.category}
                      </span>

                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {essay.title}
                      </h3>

                      <p className="text-sm text-gray-500 font-serif-italic">
                        {essay.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                      {essay.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {essay.readingTime}
                      </span>

                      <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Notifications Signup - Premium Glass Card */}
      <section className="py-24 relative overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-amber-950/10 to-void" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-amber-500/8 rounded-full blur-[200px]" />

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Premium glass card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            {/* Card background with glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-amber-500/20 rounded-[2rem]" />

            {/* Animated border glow */}
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />

            <div className="relative p-8 lg:p-12">
              <div className="text-center space-y-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-500/20 text-amber-300 text-sm font-medium border border-amber-500/30"
                >
                  <Bell className="w-4 h-4 animate-pulse" />
                  <span>New Chapters Weekly</span>
                  <Stars className="w-4 h-4" />
                </motion.div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Get Notified When{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    New Chapters Drop
                  </span>
                </h2>

                <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
                  Join <span className="text-amber-400 font-semibold">5,000+ creators</span> receiving weekly chapters, music drops, and studio intelligence.{' '}
                  <span className="font-serif-italic text-gray-500">No spam, just creation fuel.</span>
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <EmailSignup
                  listType="creation-chronicles"
                  placeholder="Enter your email"
                  buttonText="Get Chapter Updates"
                  redirectTo="/thank-you"
                  showName={false}
                />
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Premium Hero-style */}
      <section className="py-24 relative overflow-hidden">
        {/* Premium gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-void to-void" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Next Session{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Awaits
              </span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              That voice inside you? The one that knows you're meant to create something?{' '}
              <span className="font-serif-italic text-amber-400/80">It's time to listen.</span>{' '}
              Chapter 1 starts here.
            </p>

            <motion.div whileHover={hoverScale} whileTap={tapScale} className="inline-block">
              <Link
                href="/golden-age/chapter-01-when-creation-calls"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Zap className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Begin Chapter 1</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Book preview indicator */}
            <div className="pt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>Free to read · No signup required</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
