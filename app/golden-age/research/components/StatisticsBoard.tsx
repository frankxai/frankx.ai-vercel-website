'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ExternalLink, BarChart3, ArrowUpRight } from 'lucide-react';

interface Statistic {
  stat: string;
  source: string;
  url: string;
}

interface StatisticsBoardProps {
  statistics: Statistic[];
  title?: string;
}

function StatCard({ stat, index }: { stat: Statistic; index: number }) {
  // Extract numbers from stat for visual emphasis
  const numbers = stat.stat.match(/[\d,.%$]+[BMK]?/g);
  const mainNumber = numbers?.[0] || '';

  return (
    <motion.a
      href={stat.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden cursor-pointer"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card */}
      <div className="relative p-6 bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-2xl border border-gray-200 dark:border-gray-800 group-hover:border-emerald-400 dark:group-hover:border-emerald-600 transition-all duration-300 group-hover:shadow-lg">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
        </div>

        {/* Main Number */}
        {mainNumber && (
          <div className="mb-2">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {mainNumber}
            </span>
            <ArrowUpRight className="inline-block ml-1 w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Full Stat */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-3">
          {stat.stat}
        </p>

        {/* Source */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {stat.source}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function StatisticsBoard({
  statistics,
  title = 'Key Statistics',
}: StatisticsBoardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl">
          <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click any stat to view the source
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((stat, index) => (
          <StatCard key={stat.url + index} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
}
