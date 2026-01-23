'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  BarChart3,
  Quote,
  Lightbulb,
  Library,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { getChapterResearch, chapterResearch, bookResearchThemes } from '../data';
import MoodBoard from '../components/MoodBoard';
import SourceLibrary from '../components/SourceLibrary';
import StatisticsBoard from '../components/StatisticsBoard';
import BookRecommendations from '../components/BookRecommendations';

interface ChapterResearchPageProps {
  params: Promise<{
    chapter: string;
  }>;
}

export default function ChapterResearchPage({ params }: ChapterResearchPageProps) {
  const { chapter } = use(params);
  const research = getChapterResearch(chapter);

  if (!research) {
    notFound();
  }

  // Find previous and next chapters for navigation
  const currentIndex = chapterResearch.findIndex((ch) => ch.chapterSlug === chapter);
  const prevChapter = currentIndex > 0 ? chapterResearch[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < chapterResearch.length - 1
      ? chapterResearch[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-amber-950/10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back navigation */}
            <div className="flex items-center gap-4">
              <Link
                href={`/golden-age/${chapter}`}
                className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Chapter</span>
              </Link>
            </div>

            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-2 text-sm">
              <Link
                href="/golden-age"
                className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
              >
                Golden Age
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                Chapter {research.chapterNumber} Research
              </span>
            </nav>

            {/* Research Hub Link */}
            <Link
              href="/golden-age/research"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            >
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Full Research Hub</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 dark:bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 dark:bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-sm font-medium border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-4 h-4" />
              <span>Chapter {research.chapterNumber} Research Hub</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {research.title}
            </h1>

            {/* Core Theme */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {research.coreTheme}
            </p>

            {/* Key Questions */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {research.keyQuestions.map((question, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  {question}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20 space-y-16">
        {/* Mood Board Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MoodBoard
            items={research.moodBoard}
            title="Visual Research Canvas"
          />
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatisticsBoard statistics={research.statistics} />
        </motion.section>

        {/* Sources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SourceLibrary sources={research.sources} />
        </motion.section>

        {/* Books Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BookRecommendations books={research.recommendedBooks} />
        </motion.section>

        {/* Chapter Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevChapter ? (
              <Link
                href={`/golden-age/research/${prevChapter.chapterSlug}`}
                className="group flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:-translate-x-1 transition-all" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Previous Research
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Ch {prevChapter.chapterNumber}: {prevChapter.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href={`/golden-age/${chapter}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Chapter</span>
            </Link>

            {nextChapter ? (
              <Link
                href={`/golden-age/research/${nextChapter.chapterSlug}`}
                className="group flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all hover:shadow-lg"
              >
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Next Research
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Ch {nextChapter.chapterNumber}: {nextChapter.title}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
