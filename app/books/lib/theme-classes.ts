/**
 * Theme-to-Tailwind class lookup maps.
 *
 * Tailwind JIT cannot process dynamic template literals like `text-${color}-500`.
 * This module provides pre-defined class strings for each book theme color,
 * ensuring all classes are statically analyzable.
 */

export interface ThemeClasses {
  // Progress bar
  progressGradient: string;
  // Text
  textPrimary: string;
  textAccent: string;
  // Borders
  borderPrimary: string;
  borderAccent: string;
  // Backgrounds
  bgPrimary: string;
  bgAccent: string;
  bgPage: string;
  // Blockquote
  blockquoteBorder: string;
  blockquoteBg: string;
  blockquoteText: string;
  // Links
  linkColor: string;
  // Badge
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  // Active TOC item
  tocActive: string;
  // Hover
  hoverBorder: string;
  hoverRing: string;
  // Gradient text
  gradientText: string;
  // Decorative chapter number
  chapterNumberColor: string;
}

const themeMap: Record<string, ThemeClasses> = {
  'love-and-poetry': {
    progressGradient: 'bg-gradient-to-r from-rose-500 via-pink-400 to-violet-500',
    textPrimary: 'text-rose-400',
    textAccent: 'text-amber-300',
    borderPrimary: 'border-rose-500',
    borderAccent: 'border-amber-500',
    bgPrimary: 'bg-rose-500/10',
    bgAccent: 'bg-amber-500/10',
    bgPage: 'bg-[#0a0a0f]',
    blockquoteBorder: 'border-rose-400',
    blockquoteBg: 'bg-rose-900/10',
    blockquoteText: 'text-rose-100',
    linkColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/20',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-400/30',
    tocActive: 'bg-rose-500/20 text-rose-200',
    hoverBorder: 'hover:border-rose-500',
    hoverRing: 'focus:ring-rose-500/50',
    gradientText: 'bg-gradient-to-r from-rose-300 via-pink-200 to-violet-300 bg-clip-text text-transparent',
    chapterNumberColor: 'text-rose-400',
  },
  'spartan-mindset': {
    progressGradient: 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500',
    textPrimary: 'text-red-400',
    textAccent: 'text-stone-300',
    borderPrimary: 'border-red-600',
    borderAccent: 'border-stone-500',
    bgPrimary: 'bg-red-600/10',
    bgAccent: 'bg-stone-500/10',
    bgPage: 'bg-[#030712]',
    blockquoteBorder: 'border-red-500',
    blockquoteBg: 'bg-red-900/10',
    blockquoteText: 'text-red-100',
    linkColor: 'text-red-400',
    badgeBg: 'bg-red-600/20',
    badgeText: 'text-red-300',
    badgeBorder: 'border-red-500/30',
    tocActive: 'bg-red-600/20 text-red-200',
    hoverBorder: 'hover:border-red-600',
    hoverRing: 'focus:ring-red-600/50',
    gradientText: 'bg-gradient-to-r from-red-300 via-orange-200 to-amber-300 bg-clip-text text-transparent',
    chapterNumberColor: 'text-red-500',
  },
  'golden-age': {
    progressGradient: 'bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-500',
    textPrimary: 'text-amber-400',
    textAccent: 'text-indigo-300',
    borderPrimary: 'border-amber-500',
    borderAccent: 'border-indigo-500',
    bgPrimary: 'bg-amber-500/10',
    bgAccent: 'bg-indigo-500/10',
    bgPage: 'bg-[#0F172A]',
    blockquoteBorder: 'border-amber-500',
    blockquoteBg: 'bg-amber-900/10',
    blockquoteText: 'text-amber-100',
    linkColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/30',
    tocActive: 'bg-amber-500/20 text-amber-200',
    hoverBorder: 'hover:border-amber-500',
    hoverRing: 'focus:ring-amber-500/50',
    gradientText: 'bg-gradient-to-r from-amber-300 via-orange-200 to-indigo-300 bg-clip-text text-transparent',
    chapterNumberColor: 'text-amber-400',
  },
  'self-development': {
    progressGradient: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500',
    textPrimary: 'text-emerald-400',
    textAccent: 'text-cyan-300',
    borderPrimary: 'border-emerald-500',
    borderAccent: 'border-cyan-500',
    bgPrimary: 'bg-emerald-500/10',
    bgAccent: 'bg-cyan-500/10',
    bgPage: 'bg-[#030f0a]',
    blockquoteBorder: 'border-emerald-500',
    blockquoteBg: 'bg-emerald-900/10',
    blockquoteText: 'text-emerald-100',
    linkColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-400/30',
    tocActive: 'bg-emerald-500/20 text-emerald-200',
    hoverBorder: 'hover:border-emerald-500',
    hoverRing: 'focus:ring-emerald-500/50',
    gradientText: 'bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent',
    chapterNumberColor: 'text-emerald-400',
  },
  imagination: {
    progressGradient: 'bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-400',
    textPrimary: 'text-violet-400',
    textAccent: 'text-cyan-300',
    borderPrimary: 'border-violet-500',
    borderAccent: 'border-cyan-500',
    bgPrimary: 'bg-violet-500/10',
    bgAccent: 'bg-cyan-500/10',
    bgPage: 'bg-[#0a0a12]',
    blockquoteBorder: 'border-violet-400',
    blockquoteBg: 'bg-violet-900/10',
    blockquoteText: 'text-violet-100',
    linkColor: 'text-violet-400',
    badgeBg: 'bg-violet-500/20',
    badgeText: 'text-violet-300',
    badgeBorder: 'border-violet-400/30',
    tocActive: 'bg-violet-500/20 text-violet-200',
    hoverBorder: 'hover:border-violet-500',
    hoverRing: 'focus:ring-violet-500/50',
    gradientText: 'bg-gradient-to-r from-violet-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent',
    chapterNumberColor: 'text-violet-400',
  },
  manifestation: {
    progressGradient: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-purple-500',
    textPrimary: 'text-amber-300',
    textAccent: 'text-purple-300',
    borderPrimary: 'border-amber-400',
    borderAccent: 'border-purple-500',
    bgPrimary: 'bg-amber-400/10',
    bgAccent: 'bg-purple-500/10',
    bgPage: 'bg-[#0f0a05]',
    blockquoteBorder: 'border-amber-400',
    blockquoteBg: 'bg-amber-900/10',
    blockquoteText: 'text-amber-100',
    linkColor: 'text-amber-300',
    badgeBg: 'bg-amber-400/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-300/30',
    tocActive: 'bg-amber-400/20 text-amber-200',
    hoverBorder: 'hover:border-amber-400',
    hoverRing: 'focus:ring-amber-400/50',
    gradientText: 'bg-gradient-to-r from-amber-200 via-yellow-100 to-purple-300 bg-clip-text text-transparent',
    chapterNumberColor: 'text-amber-300',
  },
};

export function getThemeClasses(themeId: string): ThemeClasses {
  return themeMap[themeId] ?? themeMap['golden-age'];
}
