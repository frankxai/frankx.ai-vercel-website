'use client';

import { lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Book, ArrowRight, Clock, Sparkles, Music, Zap, Stars, Library, BookOpen } from 'lucide-react';
import { bookMetadata, chapters, essays } from './metadata';
import { EmailSignup } from '@/components/email-signup';

// Lazy load 3D book for performance
const Book3D = lazy(() => import('./components/Book3D'));

// Premium book fallback while loading / for mobile
function BookFallback() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
      <div className="relative book-glow-effect">
        {/* Premium book visual */}
        <div className="relative w-48 h-64 md:w-56 md:h-72 transform rotate-2 hover:rotate-0 transition-transform duration-500">
          {/* Book shadow */}
          <div className="absolute inset-0 bg-amber-900/30 rounded-lg blur-2xl transform translate-x-4 translate-y-4" />

          {/* Book cover */}
          <div className="relative w-full h-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-lg shadow-2xl overflow-hidden">
            {/* Leather texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            {/* Gold border */}
            <div className="absolute inset-3 border-2 border-amber-400/40 rounded" />

            {/* Center emblem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-amber-400/50 rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 border border-amber-400/40 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-300/70" />
                  </div>
                </div>
              </div>
            </div>

            {/* Title bar */}
            <div className="absolute bottom-10 left-3 right-3 h-1 bg-amber-400/40 rounded" />

            {/* Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-950 to-amber-900">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-amber-400/40" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-amber-400/40" />
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-amber-400/40" />
            </div>

            {/* Page edges */}
            <div className="absolute right-0 top-2 bottom-2 w-2 bg-gradient-to-r from-amber-100 to-amber-200" />
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -inset-16 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      </div>
    </div>
  );
}

// Mobile book component (always visible on mobile, 3D only on desktop)
function MobileBookFallback() {
  return (
    <div className="lg:hidden w-full py-8 flex justify-center">
      <div className="relative">
        {/* Subtle glow */}
        <div className="absolute -inset-8 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />

        {/* Stylized book */}
        <div className="relative w-32 h-44 transform rotate-3">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-lg shadow-xl">
            <div className="absolute inset-2 border border-amber-400/30 rounded" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-300/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoldenAgePage() {
  const publishedChapters = chapters.filter(c => c.published);
  const upcomingChapters = chapters.filter(c => !c.published);

  return (
    <div className="min-h-screen bg-white dark:bg-void">
      {/* Hero Section - Premium with 3D Book */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-amber-950/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100/80 to-orange-100/60 dark:from-amber-900/30 dark:to-orange-900/20 text-amber-900 dark:text-amber-200 text-sm font-medium border border-amber-200/50 dark:border-amber-800/50"
              >
                <Music className="w-4 h-4 animate-pulse" />
                <span>When Creation Calls, Everything Changes</span>
                <Sparkles className="w-4 h-4" />
              </motion.div>

              {/* Title - Using display font */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 dark:from-white dark:via-amber-300 dark:to-white bg-clip-text text-transparent">
                  {bookMetadata.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                {bookMetadata.subtitle}
              </p>

              {/* Story Hook */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-reading text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  <span className="font-display text-2xl text-amber-600 dark:text-amber-400">2 AM.</span> Studio lights glow. An idea hits—that electric moment when you <em className="font-semibold not-italic text-gray-900 dark:text-white">know</em> something wants to be created through you.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8"
              >
                <div className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">AI Songs</div>
                </div>
                <div className="h-10 w-px bg-amber-300/50 dark:bg-amber-700/50" />
                <div className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{publishedChapters.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Published</div>
                </div>
                <div className="h-10 w-px bg-amber-300/50 dark:bg-amber-700/50" />
                <div className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Oracle</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">AI Expert</div>
                </div>
              </motion.div>

              {/* Mobile Book Preview */}
              <MobileBookFallback />

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/golden-age/chapter-01-when-creation-calls"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/25 focus:outline-none focus:ring-4 focus:ring-amber-500/50 cursor-pointer"
                >
                  <Zap className="w-5 h-5" />
                  <span>Start Chapter 1</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#chapters"
                  className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl font-medium hover:border-amber-500 dark:hover:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-colors cursor-pointer"
                >
                  <Book className="w-5 h-5" />
                  <span>All Chapters</span>
                </Link>

                <Link
                  href="/golden-age/research"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors cursor-pointer"
                >
                  <Library className="w-4 h-4" />
                  <span>Research Hub</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - 3D Book (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <Suspense fallback={<BookFallback />}>
                <Book3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Chapters Section */}
      <section id="chapters" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4 mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              The Journey
            </h2>
            <p className="font-reading text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Each chapter is a session. Read in order, or drop in where you need it most. The path unfolds as you walk it.
            </p>
          </div>

          {/* Published Chapters */}
          <div className="space-y-5 mb-12">
            {publishedChapters.map((chapter, index) => (
              <motion.div
                key={chapter.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/golden-age/${chapter.slug}`}
                  className="group block p-8 bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-xl hover:shadow-amber-500/10 transition-all focus:outline-none focus:ring-4 focus:ring-amber-500/20 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          Chapter {chapter.number}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          {chapter.readingTime}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                        {chapter.title}
                      </h3>

                      <p className="font-reading text-gray-600 dark:text-gray-400 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-700 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Chapters */}
          {upcomingChapters.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/30 to-amber-300/30 dark:via-amber-700/20 dark:to-amber-700/20" />
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">Coming Soon</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/30 to-amber-300/30 dark:via-amber-700/20 dark:to-amber-700/20" />
              </div>

              <div className="space-y-4">
                {upcomingChapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    className="p-6 bg-gray-50/80 dark:bg-slate-900/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">
                            Chapter {chapter.number}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-500">
                            {chapter.readingTime}
                          </span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-400 dark:text-gray-600">
                          {chapter.title}
                        </h3>

                        <p className="font-reading text-gray-500 dark:text-gray-600 leading-relaxed">
                          {chapter.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Related Essays Section */}
      <section id="essays" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-950 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4 mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Studio Notes
            </h2>
            <p className="font-reading text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Companion essays from the creative trenches. Strategy, implementation, and real-world intelligence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {essays.map((essay, index) => (
              <motion.div
                key={essay.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${essay.slug}`}
                  className="group block h-full p-6 bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wide border border-indigo-200/50 dark:border-indigo-800/50">
                        {essay.category}
                      </span>

                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                        {essay.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {essay.subtitle}
                      </p>
                    </div>

                    <p className="font-reading text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {essay.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {essay.readingTime}
                      </span>

                      <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Notifications Signup */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/20 dark:via-slate-950 dark:to-orange-950/10 border-t border-amber-200/30 dark:border-amber-900/30">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center space-y-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-sm font-medium border border-amber-200/50 dark:border-amber-800/50">
              <Stars className="w-4 h-4" />
              <span>New Chapters Weekly</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Get Notified When New Chapters Drop
            </h2>
            <p className="font-reading text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Join 5,000+ creators receiving weekly chapters, music drops, and studio intelligence. No spam, just creation fuel.
            </p>
          </div>

          <EmailSignup
            listType="creation-chronicles"
            placeholder="Your email address"
            buttonText="Get Chapter Updates"
            redirectTo="/thank-you"
            showName={false}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Your Next Session Awaits
          </h2>
          <p className="font-reading text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            That voice inside you? The one that knows you're meant to create something? It's time to listen. Chapter 1 starts here.
          </p>
          <Link
            href="/golden-age/chapter-01-when-creation-calls"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/25 cursor-pointer"
          >
            <Zap className="w-5 h-5" />
            <span>Begin Chapter 1</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
