'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Library,
  BookOpen,
  Sparkles,
  BarChart3,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  Quote,
  Search,
  ChevronRight,
  Globe,
  Users,
  Zap,
  Brain,
} from 'lucide-react';
import {
  bookResearchThemes,
  chapterResearch,
  futureChaptersOutline,
  getAllStatistics,
  getAllRecommendedBooks,
} from './data';

// Master Statistics Display
function MasterStats() {
  const stats = [
    { value: '$254B', label: 'Creator Economy (2025)', icon: TrendingUp, color: 'emerald' },
    { value: '207M', label: 'Global Creators', icon: Users, color: 'blue' },
    { value: '87%', label: 'Creators Using AI', icon: Brain, color: 'purple' },
    { value: '1,445%', label: 'Multi-Agent Inquiry Surge', icon: Zap, color: 'orange' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent rounded-2xl`} />
            <div className="relative p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 group-hover:border-amber-400 dark:group-hover:border-amber-600 transition-all">
              <Icon className={`w-6 h-6 mb-3 text-${stat.color}-500`} />
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Chapter Research Cards
function ChapterResearchCard({
  chapter,
  index,
}: {
  chapter: (typeof chapterResearch)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/golden-age/research/${chapter.chapterSlug}`}
        className="group block p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-xl transition-all"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 font-bold">
              {chapter.chapterNumber}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {chapter.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chapter.sources.length} sources • {chapter.statistics.length} stats
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Core Theme */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {chapter.coreTheme}
        </p>

        {/* Preview of content */}
        <div className="flex flex-wrap gap-2">
          {chapter.moodBoard.slice(0, 3).map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {item.type === 'quote' && <Quote className="w-3 h-3" />}
              {item.type === 'statistic' && <TrendingUp className="w-3 h-3" />}
              {item.type === 'concept' && <Lightbulb className="w-3 h-3" />}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          ))}
          {chapter.moodBoard.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{chapter.moodBoard.length - 3} more
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// Future Chapter Preview
function FutureChapterPreview({
  chapter,
  index,
}: {
  chapter: (typeof futureChaptersOutline)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-5 bg-gray-50/80 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 font-bold text-sm">
          {chapter.number}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {chapter.title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            {chapter.coreTheme}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {chapter.researchNeeds.slice(0, 2).map((need, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-500 bg-gray-200/50 dark:bg-gray-800/50 rounded-full"
              >
                <Search className="w-2.5 h-2.5" />
                {need}
              </span>
            ))}
            {chapter.researchNeeds.length > 2 && (
              <span className="text-xs text-gray-400">
                +{chapter.researchNeeds.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Master Source Category
function SourceCategory({
  category,
  index,
}: {
  category: (typeof bookResearchThemes.masterSources)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Globe className="w-4 h-4 text-amber-500" />
        {category.category}
      </h3>
      <div className="space-y-3">
        {category.sources.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-3 -mx-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors text-sm">
                {source.title}
              </p>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-500 flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {source.keyData}
            </p>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function ResearchHubPage() {
  const allBooks = getAllRecommendedBooks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-amber-950/10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/golden-age"
              className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Book</span>
            </Link>

            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
              <Library className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="font-medium text-amber-900 dark:text-amber-200 text-sm">
                Research Hub
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 via-orange-200/20 to-transparent dark:from-amber-500/10 dark:via-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-sm font-medium border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-4 h-4" />
              <span>The Golden Age of Creators</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Research Hub
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Every chapter is built on rigorous research. Explore the sources, statistics, and insights that inform
              <span className="text-amber-600 dark:text-amber-400 font-medium"> The Golden Age of Creators</span>.
            </p>

            {/* Core Narrative */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 max-w-xl mx-auto">
              <Quote className="w-6 h-6 text-amber-500 mb-3 mx-auto" />
              <p className="text-lg text-amber-900 dark:text-amber-100 font-serif italic">
                "{bookResearchThemes.coreNarrative}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Master Statistics */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <MasterStats />
      </section>

      {/* Chapter Research */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
              Chapter Research
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Deep dive into sources for each published chapter
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chapterResearch.map((chapter, index) => (
            <ChapterResearchCard key={chapter.chapterSlug} chapter={chapter} index={index} />
          ))}
        </div>
      </section>

      {/* Master Sources */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <Library className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
              Master Source Library
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Authoritative sources organized by theme
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {bookResearchThemes.masterSources.map((category, index) => (
            <SourceCategory key={category.category} category={category} index={index} />
          ))}
        </div>
      </section>

      {/* Future Chapters Preview */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl">
            <Lightbulb className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
              Coming Chapters
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Research foundations for upcoming content
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futureChaptersOutline.map((chapter, index) => (
            <FutureChapterPreview key={chapter.number} chapter={chapter} index={index} />
          ))}
        </div>
      </section>

      {/* Recommended Books */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
              Essential Reading List
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {allBooks.length} books that inform The Golden Age
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allBooks.map((book, index) => (
            <motion.a
              key={book.title}
              href={`https://www.amazon.com/s?k=${encodeURIComponent(book.title + ' ' + book.author)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-start gap-4 p-4 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer"
            >
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {book.relevance}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500 flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30 border-t border-amber-200 dark:border-amber-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Begin?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start with Chapter 1 and experience the research brought to life.
          </p>
          <Link
            href="/golden-age/chapter-01-when-creation-calls"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Zap className="w-5 h-5" />
            <span>Start Reading</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
