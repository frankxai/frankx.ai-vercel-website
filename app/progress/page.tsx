'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Zap, Brain, Heart, Hammer, Coins, Users, Crown,
  Flame, Trophy, BookOpen, Search, Target, Sparkles,
  ChevronRight, Calendar, TrendingUp, Award
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import { cn } from '@/lib/utils'

// Import progress data
import progressData from '@/data/progress.json'

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ElementType> = {
  Zap, Brain, Heart, Hammer, Coins, Users, Crown,
  Flame, Search, Trophy, Target, BookOpen
}

// Rarity color mapping
const rarityColors: Record<string, string> = {
  common: 'from-slate-400 to-slate-500',
  uncommon: 'from-green-400 to-emerald-500',
  rare: 'from-blue-400 to-cyan-500',
  epic: 'from-purple-400 to-violet-500',
  legendary: 'from-yellow-400 to-amber-500'
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

// Progress bar component with animation
function AnimatedProgressBar({
  progress,
  max,
  colorClass,
  height = 'h-2'
}: {
  progress: number
  max: number
  colorClass: string
  height?: string
}) {
  const percentage = Math.min((progress / max) * 100, 100)

  return (
    <div className={cn("w-full bg-slate-800/60 rounded-full overflow-hidden", height)}>
      <motion.div
        className={cn("h-full bg-gradient-to-r rounded-full", colorClass)}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  )
}

// Pillar Card component
function PillarCard({
  pillarKey,
  pillar
}: {
  pillarKey: string
  pillar: typeof progressData.pillars.energy
}) {
  const IconComponent = iconMap[pillar.icon] || Zap
  const isActive = pillar.streak > 0

  return (
    <GlassmorphicCard
      variant="premium"
      gradient="aurora"
      border={isActive ? 'accent' : 'subtle'}
      hover
      className="p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-xl bg-gradient-to-br",
            pillar.color,
            "shadow-lg"
          )}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{pillar.name}</h3>
            <p className="text-xs text-slate-400">Level {pillar.level}</p>
          </div>
        </div>

        {pillar.streak > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-medium text-orange-300">{pillar.streak}d</span>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mb-4 line-clamp-2">
        {pillar.description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">XP Progress</span>
          <span className="text-slate-300 font-medium">
            {pillar.xp.toLocaleString()} / {pillar.xpToNext.toLocaleString()}
          </span>
        </div>
        <AnimatedProgressBar
          progress={pillar.xp}
          max={pillar.xpToNext}
          colorClass={pillar.color}
        />
      </div>
    </GlassmorphicCard>
  )
}

// Quest Card component
function QuestCard({ quest }: { quest: typeof progressData.activeQuests[0] }) {
  const pillarData = progressData.pillars[quest.pillar as keyof typeof progressData.pillars]
  const IconComponent = pillarData ? iconMap[pillarData.icon] : Target

  return (
    <GlassmorphicCard variant="default" gradient="midnight" border="subtle" className="p-4">
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-lg bg-gradient-to-br shrink-0",
          pillarData?.color || 'from-purple-500 to-violet-500'
        )}>
          <IconComponent className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate">{quest.title}</h4>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{quest.description}</p>

          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">
                {quest.progress}/{quest.maxProgress} steps
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                +{quest.xpReward} XP
              </span>
            </div>
            <AnimatedProgressBar
              progress={quest.progress}
              max={quest.maxProgress}
              colorClass={pillarData?.color || 'from-purple-500 to-violet-500'}
              height="h-1.5"
            />
          </div>
        </div>
      </div>
    </GlassmorphicCard>
  )
}

// Achievement Badge component
function AchievementBadge({ achievement }: { achievement: typeof progressData.achievements[0] }) {
  const IconComponent = iconMap[achievement.icon] || Trophy

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className={cn(
        "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center",
        "shadow-lg border border-white/10",
        rarityColors[achievement.rarity]
      )}>
        <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <div className="bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 min-w-[160px] text-center shadow-xl">
          <p className="text-sm font-medium text-white">{achievement.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{achievement.description}</p>
          <p className="text-xs text-emerald-400 mt-1">+{achievement.xpBonus} XP</p>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-900/95 rotate-45 border-r border-b border-white/10" />
      </div>
    </motion.div>
  )
}

// Research/Blog item component
function ActivityItem({
  item,
  type
}: {
  item: typeof progressData.research[0] | typeof progressData.blogs[0]
  type: 'research' | 'blog'
}) {
  const pillarData = progressData.pillars[item.pillar as keyof typeof progressData.pillars]
  const date = 'date' in item ? item.date : item.publishedDate

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <div className={cn(
        "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0",
        pillarData?.color || 'from-slate-500 to-slate-600'
      )}>
        {type === 'research' ? (
          <Search className="w-4 h-4 text-white" />
        ) : (
          <BookOpen className="w-4 h-4 text-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white truncate">{item.title}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-500">{date}</span>
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded",
            item.status === 'completed' || item.status === 'published'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-yellow-500/20 text-yellow-400'
          )}>
            {item.status}
          </span>
        </div>
      </div>

      <span className="text-xs text-emerald-400 font-medium shrink-0">
        +{item.xpEarned} XP
      </span>
    </div>
  )
}

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { player, pillars, research, blogs, achievements, activeQuests } = progressData

  // Calculate overall progress percentage
  const totalPillarXP = Object.values(pillars).reduce((sum, p) => sum + p.xp, 0)
  const levelThreshold = player.overallLevel * 1000
  const progressToNextLevel = (player.totalXP % 1000) / 10

  return (
    <main className="min-h-screen bg-[#030712] pt-24 pb-16">
      {/* Aurora background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">Creator Journey</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  Progress Tracker
                </h1>
                <p className="text-slate-400 max-w-xl">
                  Track your growth across the 7 Pillars. Every skill developed, every article written,
                  every research completed brings you closer to mastery.
                </p>
              </div>

              {/* Player Card */}
              <GlassmorphicCard variant="luxury" gradient="purple" border="glow" className="p-6 min-w-[280px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{player.name}</h2>
                    <p className="text-sm text-purple-300">{player.title}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Level {player.overallLevel}</span>
                    <span className="text-white font-semibold">{player.totalXP.toLocaleString()} XP</span>
                  </div>
                  <AnimatedProgressBar
                    progress={progressToNextLevel}
                    max={100}
                    colorClass="from-purple-500 to-violet-500"
                    height="h-3"
                  />
                  <p className="text-xs text-slate-500 text-right">
                    {1000 - (player.totalXP % 1000)} XP to Level {player.overallLevel + 1}
                  </p>
                </div>
              </GlassmorphicCard>
            </div>
          </motion.div>

          {/* 7 Pillars Grid */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">The 7 Pillars</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.entries(pillars).map(([key, pillar]) => (
                <motion.div key={key} variants={itemVariants}>
                  <PillarCard pillarKey={key} pillar={pillar} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Two Column Layout: Quests + Achievements */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Active Quests */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Active Quests</h2>
                </div>
                <span className="text-sm text-slate-400">{activeQuests.length} active</span>
              </div>

              <div className="space-y-3">
                {activeQuests.map((quest) => (
                  <motion.div key={quest.id} variants={itemVariants}>
                    <QuestCard quest={quest} />
                  </motion.div>
                ))}

                {activeQuests.length === 0 && (
                  <GlassmorphicCard variant="default" className="p-6 text-center">
                    <p className="text-slate-400">No active quests. Time to start a new adventure!</p>
                  </GlassmorphicCard>
                )}
              </div>
            </motion.section>

            {/* Achievements */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Achievements</h2>
                </div>
                <span className="text-sm text-slate-400">{achievements.length} earned</span>
              </div>

              <GlassmorphicCard variant="premium" gradient="aurora" className="p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  {achievements.map((achievement) => (
                    <AchievementBadge key={achievement.id} achievement={achievement} />
                  ))}

                  {/* Locked achievement placeholders */}
                  {[...Array(Math.max(0, 6 - achievements.length))].map((_, i) => (
                    <div
                      key={`locked-${i}`}
                      className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-700/50" />
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Hover over badges to see details
                </p>
              </GlassmorphicCard>
            </motion.section>
          </div>

          {/* Research & Blogs Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Research */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Research</h2>
                </div>
                <Link
                  href="/research"
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <GlassmorphicCard variant="default" gradient="midnight" className="p-4">
                {research.length > 0 ? (
                  research.map((item) => (
                    <ActivityItem key={item.id} item={item} type="research" />
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-4">No research completed yet</p>
                )}
              </GlassmorphicCard>
            </motion.section>

            {/* Blogs */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Published Articles</h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <GlassmorphicCard variant="default" gradient="midnight" className="p-4">
                {blogs.length > 0 ? (
                  blogs.map((item) => (
                    <ActivityItem key={item.id} item={item} type="blog" />
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-4">No articles published yet</p>
                )}
              </GlassmorphicCard>
            </motion.section>
          </div>

          {/* CTA Section */}
          <motion.section variants={itemVariants} className="text-center">
            <GlassmorphicCard variant="luxury" gradient="purple" border="glow" className="p-8 lg:p-12">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Your Journey Continues
              </h2>
              <p className="text-slate-300 max-w-lg mx-auto mb-6">
                Every step forward is progress. Keep building, keep creating, keep growing.
                The path to mastery is walked one day at a time.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <PremiumButton variant="luxury" size="lg" href="/soulbook" glow>
                  Explore Soulbook
                </PremiumButton>
                <PremiumButton variant="ghost" size="lg" href="/blog">
                  Read Articles
                </PremiumButton>
              </div>
            </GlassmorphicCard>
          </motion.section>
        </motion.div>
      </div>
    </main>
  )
}
