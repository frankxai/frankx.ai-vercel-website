'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, TrendingUp, Lightbulb, Link2, Sparkles, ExternalLink } from 'lucide-react';
import type { MoodBoardItem } from '../data';

interface MoodBoardProps {
  items: MoodBoardItem[];
  title?: string;
}

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  amber: {
    bg: 'bg-amber-50/80 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-900 dark:text-amber-100',
    glow: 'from-amber-400/20',
  },
  emerald: {
    bg: 'bg-emerald-50/80 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-900 dark:text-emerald-100',
    glow: 'from-emerald-400/20',
  },
  indigo: {
    bg: 'bg-indigo-50/80 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-900 dark:text-indigo-100',
    glow: 'from-indigo-400/20',
  },
  orange: {
    bg: 'bg-orange-50/80 dark:bg-orange-950/40',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-900 dark:text-orange-100',
    glow: 'from-orange-400/20',
  },
  purple: {
    bg: 'bg-purple-50/80 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-900 dark:text-purple-100',
    glow: 'from-purple-400/20',
  },
  blue: {
    bg: 'bg-blue-50/80 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-900 dark:text-blue-100',
    glow: 'from-blue-400/20',
  },
  gold: {
    bg: 'bg-yellow-50/80 dark:bg-yellow-950/40',
    border: 'border-yellow-300 dark:border-yellow-700',
    text: 'text-yellow-900 dark:text-yellow-100',
    glow: 'from-yellow-400/20',
  },
};

const typeIcons = {
  quote: Quote,
  statistic: TrendingUp,
  concept: Lightbulb,
  connection: Link2,
  image: Sparkles,
};

function MoodBoardCard({ item, index }: { item: MoodBoardItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorClasses[item.color || 'amber'];
  const Icon = typeIcons[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute -inset-2 bg-gradient-to-br ${colors.glow} to-transparent rounded-3xl blur-xl`}
      />

      {/* Card */}
      <div
        className={`relative p-5 rounded-2xl ${colors.bg} ${colors.border} border-2 backdrop-blur-sm transition-all duration-300 ${
          isHovered ? 'shadow-lg -translate-y-1' : ''
        }`}
      >
        {/* Type indicator */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.border} border`}>
            <Icon className={`w-4 h-4 ${colors.text}`} />
          </div>
          <span className={`text-xs font-medium uppercase tracking-wider ${colors.text} opacity-70`}>
            {item.type}
          </span>
        </div>

        {/* Content */}
        <div className={`${colors.text}`}>
          {item.type === 'quote' ? (
            <blockquote className="font-serif text-lg italic leading-relaxed">
              "{item.content}"
            </blockquote>
          ) : item.type === 'statistic' ? (
            <p className="font-bold text-xl leading-tight">{item.content}</p>
          ) : (
            <p className="font-medium leading-relaxed">{item.content}</p>
          )}
        </div>

        {/* Source */}
        {item.source && (
          <p className={`mt-3 text-xs ${colors.text} opacity-60`}>— {item.source}</p>
        )}

        {/* Connection indicators */}
        {item.connections && item.connections.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            <Link2 className={`w-3 h-3 ${colors.text} opacity-50`} />
            <span className={`text-xs ${colors.text} opacity-50`}>
              {item.connections.length} connections
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MoodBoard({ items, title = 'Visual Research Board' }: MoodBoardProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredItems = filter
    ? items.filter((item) => item.type === filter)
    : items;

  const types = [...new Set(items.map((item) => item.type))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              filter === null
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {types.map((type) => {
            const Icon = typeIcons[type as keyof typeof typeIcons];
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === type
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <MoodBoardCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
