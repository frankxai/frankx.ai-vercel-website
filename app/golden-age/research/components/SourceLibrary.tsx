'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Book,
  Video,
  Headphones,
  BarChart3,
  Wrench,
  ExternalLink,
  Star,
  Filter,
  Search,
} from 'lucide-react';
import type { ResearchSource } from '../data';

interface SourceLibraryProps {
  sources: ResearchSource[];
  title?: string;
}

const typeConfig: Record<
  string,
  { icon: typeof FileText; color: string; bgColor: string }
> = {
  article: {
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  study: {
    icon: BarChart3,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  book: {
    icon: Book,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  video: {
    icon: Video,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  podcast: {
    icon: Headphones,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  report: {
    icon: BarChart3,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  tool: {
    icon: Wrench,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
  },
};

const relevanceConfig = {
  primary: {
    badge: 'Primary Source',
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  supporting: {
    badge: 'Supporting',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  inspiration: {
    badge: 'Inspiration',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  },
};

function SourceCard({ source, index }: { source: ResearchSource; index: number }) {
  const config = typeConfig[source.type];
  const Icon = config.icon;
  const relevance = relevanceConfig[source.relevance];

  return (
    <motion.a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group block p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-2.5 rounded-xl ${config.bgColor} flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
              {source.title}
            </h4>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${relevance.color}`}>
              {relevance.badge}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {source.type}
            </span>
            {source.author && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {source.author}
              </span>
            )}
            {source.date && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {source.date}
              </span>
            )}
          </div>

          {/* Key Insight */}
          <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                {source.keyInsight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function SourceLibrary({
  sources,
  title = 'Research Sources',
}: SourceLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [relevanceFilter, setRelevanceFilter] = useState<string | null>(null);

  const types = [...new Set(sources.map((s) => s.type))];

  const filteredSources = sources.filter((source) => {
    const matchesSearch =
      searchQuery === '' ||
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.keyInsight.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === null || source.type === typeFilter;
    const matchesRelevance =
      relevanceFilter === null || source.relevance === relevanceFilter;
    return matchesSearch && matchesType && matchesRelevance;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <Book className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredSources.length} sources
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
        </div>
        <button
          type="button"
          onClick={() => setTypeFilter(null)}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            typeFilter === null
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {types.map((type) => {
          const config = typeConfig[type];
          const Icon = config.icon;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                typeFilter === type
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Relevance Filter */}
      <div className="flex flex-wrap gap-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">Relevance:</span>
        <button
          type="button"
          onClick={() => setRelevanceFilter(null)}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            relevanceFilter === null
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {Object.entries(relevanceConfig).map(([key, config]) => (
          <button
            key={key}
            type="button"
            onClick={() => setRelevanceFilter(key)}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              relevanceFilter === key
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {config.badge}
          </button>
        ))}
      </div>

      {/* Sources Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSources.map((source, index) => (
            <SourceCard key={source.url} source={source} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filteredSources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No sources match your filters
          </p>
        </div>
      )}
    </div>
  );
}
