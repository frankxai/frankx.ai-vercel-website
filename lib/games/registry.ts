/**
 * Games Lab Registry
 *
 * Single source of truth for all games. Used by:
 * - /games hub page (PlayNow section)
 * - NavigationMega (Games dropdown)
 * - SEO metadata generation
 * - Quality gate enforcement
 */

export type GameStatus = 'live' | 'beta' | 'coming-soon' | 'archived'
export type GameEngine = 'react' | 'canvas2d' | 'r3f' | 'phaser' | 'babylon'
export type GameCategory = 'puzzle' | 'action' | 'word' | 'strategy' | 'arcade' | 'rpg'

export interface GameQualityMetrics {
  fpsTarget: number           // 60 for desktop, 30 minimum for mobile
  touchTargetSize: number     // minimum px (48 per WCAG)
  bundleOverhead: string      // e.g. '0KB', '200KB (Phaser)'
  firstPaint: string          // target load time
  inputLatency: string        // target response time
  mobileScore: 1 | 2 | 3 | 4 | 5  // 1=poor, 5=excellent
  desktopScore: 1 | 2 | 3 | 4 | 5
}

export interface GameEntry {
  slug: string
  title: string
  description: string
  shortDescription: string     // for nav menus (< 40 chars)
  href: string
  status: GameStatus
  category: GameCategory
  engine: GameEngine
  color: string                // tailwind color key
  icon: string                 // lucide icon name
  controls: {
    touch: boolean
    keyboard: boolean
    swipe: boolean
  }
  features: string[]
  quality: GameQualityMetrics
  releaseDate: string
  version: string
}

export const games: GameEntry[] = [
  {
    slug: 'crystal-match',
    title: 'Crystal Match',
    description: 'Swap and match colorful crystals in this Candy Crush-style puzzle. Combos, cascades, and 30-move challenge.',
    shortDescription: 'Match-3 puzzle game',
    href: '/games/crystal-match',
    status: 'live',
    category: 'puzzle',
    engine: 'react',
    color: 'fuchsia',
    icon: 'Sparkles',
    controls: { touch: true, keyboard: false, swipe: true },
    features: ['Match-3 mechanics', 'Cascade combos (5x)', 'High score persistence', '30-move challenge'],
    quality: {
      fpsTarget: 60,
      touchTargetSize: 48,
      bundleOverhead: '0KB',
      firstPaint: '<1s',
      inputLatency: '<50ms',
      mobileScore: 5,
      desktopScore: 5,
    },
    releaseDate: '2026-02-15',
    version: '1.0.0',
  },
  {
    slug: 'neon-runner',
    title: 'Neon Runner',
    description: '3D endless runner through a neon world. Swipe to dodge, jump, and slide — Subway Surfers meets cyberpunk.',
    shortDescription: '3D endless runner',
    href: '/games/neon-runner',
    status: 'live',
    category: 'action',
    engine: 'canvas2d',
    color: 'cyan',
    icon: 'Zap',
    controls: { touch: true, keyboard: true, swipe: true },
    features: ['3-lane dodging', 'Jump & slide', 'Coin collection', 'Progressive speed'],
    quality: {
      fpsTarget: 60,
      touchTargetSize: 48,
      bundleOverhead: '0KB',
      firstPaint: '<1s',
      inputLatency: '<16ms',
      mobileScore: 5,
      desktopScore: 5,
    },
    releaseDate: '2026-02-15',
    version: '1.0.0',
  },
  {
    slug: 'memory-match',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards. Three difficulty levels, star ratings, and a timer.',
    shortDescription: 'Card memory game',
    href: '/games/memory-match',
    status: 'live',
    category: 'puzzle',
    engine: 'react',
    color: 'violet',
    icon: 'Puzzle',
    controls: { touch: true, keyboard: false, swipe: false },
    features: ['3 difficulty levels', 'Star rating system', 'Timer tracking', 'Card flip animations'],
    quality: {
      fpsTarget: 60,
      touchTargetSize: 56,
      bundleOverhead: '0KB (Framer Motion shared)',
      firstPaint: '<1s',
      inputLatency: '<50ms',
      mobileScore: 5,
      desktopScore: 5,
    },
    releaseDate: '2026-02-14',
    version: '1.0.0',
  },
  {
    slug: 'word-forge',
    title: 'Word Forge',
    description: 'Guess the 5-letter word in 6 tries. Color-coded clues guide your next guess. Daily challenge + unlimited practice.',
    shortDescription: 'Daily word puzzle',
    href: '/games/word-forge',
    status: 'live',
    category: 'word',
    engine: 'react',
    color: 'emerald',
    icon: 'Type',
    controls: { touch: true, keyboard: true, swipe: false },
    features: ['Daily challenge', 'Unlimited practice', 'On-screen keyboard', 'Streak tracking', 'Share results'],
    quality: {
      fpsTarget: 60,
      touchTargetSize: 44,
      bundleOverhead: '0KB',
      firstPaint: '<1s',
      inputLatency: '<30ms',
      mobileScore: 5,
      desktopScore: 5,
    },
    releaseDate: '2026-02-15',
    version: '1.0.0',
  },
  {
    slug: 'neon-2048',
    title: '2048 Neon',
    description: 'Slide numbered tiles on a grid to combine them and reach 2048. Neon-lit strategy puzzle with undo support.',
    shortDescription: 'Sliding number puzzle',
    href: '/games/neon-2048',
    status: 'live',
    category: 'puzzle',
    engine: 'react',
    color: 'amber',
    icon: 'Grid3x3',
    controls: { touch: true, keyboard: true, swipe: true },
    features: ['4x4 grid', 'Swipe controls', 'Undo move', 'Best score tracking', 'Win at 2048'],
    quality: {
      fpsTarget: 60,
      touchTargetSize: 64,
      bundleOverhead: '0KB',
      firstPaint: '<1s',
      inputLatency: '<30ms',
      mobileScore: 5,
      desktopScore: 5,
    },
    releaseDate: '2026-02-15',
    version: '1.0.0',
  },
  {
    slug: 'snake-neon',
    title: 'Snake Neon',
    description: 'Classic snake reimagined with neon trails and power-ups. Swipe or arrow keys. How long can you survive?',
    shortDescription: 'Classic snake reimagined',
    href: '/games/snake-neon',
    status: 'live',
    category: 'arcade',
    engine: 'canvas2d',
    color: 'lime',
    icon: 'Waypoints',
    controls: { touch: true, keyboard: true, swipe: true },
    features: ['Neon trail effects', 'Progressive speed', 'Score tracking', 'Swipe + keyboard'],
    quality: {
      fpsTarget: 60,
      touchTargetSize: 48,
      bundleOverhead: '0KB',
      firstPaint: '<1s',
      inputLatency: '<16ms',
      mobileScore: 5,
      desktopScore: 5,
    },
    releaseDate: '2026-02-15',
    version: '1.0.0',
  },
]

// Helpers
export function getGameBySlug(slug: string): GameEntry | undefined {
  return games.find(g => g.slug === slug)
}

export function getLiveGames(): GameEntry[] {
  return games.filter(g => g.status === 'live')
}

export function getGamesByCategory(category: GameCategory): GameEntry[] {
  return games.filter(g => g.category === category)
}

export function getQualityReport(): { total: number; passing: number; avgMobile: number; avgDesktop: number } {
  const live = getLiveGames()
  const passing = live.filter(g => g.quality.mobileScore >= 4 && g.quality.desktopScore >= 4).length
  const avgMobile = live.reduce((sum, g) => sum + g.quality.mobileScore, 0) / live.length
  const avgDesktop = live.reduce((sum, g) => sum + g.quality.desktopScore, 0) / live.length
  return { total: live.length, passing, avgMobile, avgDesktop }
}
