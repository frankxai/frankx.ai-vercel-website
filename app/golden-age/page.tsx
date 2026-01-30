'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book, ArrowRight, Clock, Sparkles, Music, Zap, Stars, BookOpen } from 'lucide-react';
import { bookMetadata, chapters, essays } from './metadata';
import { EmailSignup } from '@/components/email-signup';

export default function GoldenAgePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section - Full-bleed cinematic hero with AI-generated art */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/golden-age/hero-golden-age.png"
            alt="The Golden Age of Creators - A creator conducting an orchestra of creative energy"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Gradient overlays for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
        </div>

        {/* Animated ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-200 text-sm font-medium border border-amber-400/30"
            >
              <Music className="w-4 h-4 animate-pulse" />
              <span>When Creation Calls, Everything Changes</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            {/* Title */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent leading-tight drop-shadow-2xl">
              {bookMetadata.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              {bookMetadata.subtitle}
            </p>

            {/* Story Hook */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                <span className="text-2xl font-serif text-amber-400">2 AM.</span> Studio lights glow. An idea hits — that electric moment when you <em className="font-semibold not-italic text-white">know</em> something wants to be created through you.
                <br /><br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-semibold">This book is for creators ready to answer that call</span> — with AI as your amplifier, not your replacement.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-8 pt-4"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">AI Songs Created</div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{chapters.length}</div>
                <div className="text-sm text-gray-400">Chapters</div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Oracle AI</div>
                <div className="text-sm text-gray-400">Expertise</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/golden-age/chapter-01-when-creation-calls"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 focus:outline-none focus:ring-4 focus:ring-amber-500/50 cursor-pointer"
              >
                <Zap className="w-5 h-5" />
                <span>Start Chapter 1</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#chapters"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-medium hover:border-white/60 hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all backdrop-blur-sm cursor-pointer"
              >
                <Book className="w-5 h-5" />
                <span>Browse All Chapters</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade to white/dark */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Book Chapters Section - Now with chapter art */}
      <section id="chapters" className="py-20 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-4 mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              The Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Each chapter is a session. Read in order, or drop in where you need it most. The path unfolds as you walk it.
            </p>
          </div>

          <div className="space-y-8">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {chapter.published ? (
                  <Link
                    href={`/golden-age/${chapter.slug}`}
                    className="group block overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/10 transition-all focus:outline-none focus:ring-4 focus:ring-amber-500/50 cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Chapter Image */}
                      {chapter.image && (
                        <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                          <Image
                            src={chapter.image}
                            alt={`Chapter ${chapter.number}: ${chapter.title}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 320px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-slate-900/30 md:block hidden" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
                          {/* Chapter number overlay */}
                          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-amber-500/90 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{chapter.number}</span>
                          </div>
                        </div>
                      )}

                      {/* Chapter Content */}
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-mono font-medium text-amber-600 dark:text-amber-400">
                                Chapter {chapter.number}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                                <Clock className="w-3.5 h-3.5" />
                                {chapter.readingTime}
                              </span>
                            </div>

                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                              {chapter.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {chapter.description}
                            </p>

                            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium text-sm pt-2">
                              <BookOpen className="w-4 h-4" />
                              <span>Read Chapter</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="overflow-hidden bg-gray-50/80 dark:bg-slate-900/50 backdrop-blur-sm border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-2xl">
                    <div className="flex flex-col md:flex-row">
                      {chapter.image && (
                        <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 overflow-hidden opacity-50 grayscale">
                          <Image
                            src={chapter.image}
                            alt={`Chapter ${chapter.number}: ${chapter.title} (Coming Soon)`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 320px"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-mono font-medium text-gray-400 dark:text-gray-600">
                                Chapter {chapter.number}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-500">
                                {chapter.readingTime}
                              </span>
                            </div>

                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-400 dark:text-gray-600">
                              {chapter.title}
                            </h3>

                            <p className="text-gray-500 dark:text-gray-600 leading-relaxed">
                              {chapter.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="max-w-xs mx-auto flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-300 dark:to-amber-700" />
        <Sparkles className="w-5 h-5 text-amber-500" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-300 dark:to-amber-700" />
      </div>

      {/* Related Essays Section */}
      <section id="essays" className="py-20 bg-gray-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-4 mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Studio Notes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
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
                  className="group block h-full p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/50 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                        {essay.category}
                      </span>

                      <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {essay.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {essay.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {essay.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {essay.readingTime}
                      </span>

                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Notifications Signup */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/20 dark:via-slate-950 dark:to-orange-950/20 border-t border-amber-200 dark:border-amber-900/30">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center space-y-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-sm font-medium border border-amber-200 dark:border-amber-800">
              <Stars className="w-4 h-4" />
              <span>New Chapters Weekly</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Get Notified When New Chapters Drop
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
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

      {/* Call to Action - with hero image background */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/golden-age/hero-golden-age.png"
            alt=""
            fill
            className="object-cover object-top opacity-30 dark:opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/80 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Your Next Session Awaits
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            That voice inside you? The one that knows you&apos;re meant to create something? It&apos;s time to listen. Chapter 1 starts here.
          </p>
          <Link
            href="/golden-age/chapter-01-when-creation-calls"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl cursor-pointer"
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
