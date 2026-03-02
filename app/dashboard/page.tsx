'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Target,
  Award,
  Play,
  Download,
  MessageCircle,
  Calendar,
  Star,
  Lightbulb,
  Shield,
  BarChart3,
  Settings,
  Bell,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import {
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  MagneticHover,
  RevealAnimation,
  GlowPulse
} from '@/components/ui/AdvancedAnimations'

type UserProgress = {
  level: number
  experience: number
  maxExperience: number
  streak: number
  achievements: Achievement[]
  currentGoals: Goal[]
  recentActivity: Activity[]
  recommendations: Recommendation[]
  stats: UserStats
}

type Achievement = {
  id: string
  title: string
  description: string
  icon: any
  unlockedAt: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

type Goal = {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  dueDate: string
  category: string
}

type Activity = {
  id: string
  type: 'course' | 'tool' | 'community' | 'achievement'
  title: string
  description: string
  timestamp: string
  points: number
}

type Recommendation = {
  id: string
  type: 'course' | 'tool' | 'product' | 'community'
  title: string
  description: string
  reason: string
  priority: 'high' | 'medium' | 'low'
  href: string
  estimatedTime: string
}

type UserStats = {
  coursesCompleted: number
  toolsUsed: number
  communityContributions: number
  helpedOthers: number
  totalPoints: number
  rank: string
}

// Mock data - in real implementation, this would come from an API
const mockUserProgress: UserProgress = {
  level: 3,
  experience: 750,
  maxExperience: 1000,
  streak: 7,
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first AI assessment',
      icon: Target,
      unlockedAt: '2024-01-15',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Tool Master',
      description: 'Used 5 different AI tools',
      icon: Zap,
      unlockedAt: '2024-01-18',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Completed 3 learning modules',
      icon: Brain,
      unlockedAt: '2024-01-20',
      rarity: 'epic'
    }
  ],
  currentGoals: [
    {
      id: '1',
      title: 'Complete Agent Architecture Course',
      description: 'Master the fundamentals of AI agent systems',
      progress: 3,
      maxProgress: 8,
      dueDate: '2024-02-15',
      category: 'learning'
    },
    {
      id: '2',
      title: 'Implement First AI Workflow',
      description: 'Deploy a working AI system in your daily routine',
      progress: 1,
      maxProgress: 5,
      dueDate: '2024-02-01',
      category: 'implementation'
    },
    {
      id: '3',
      title: 'Community Contribution',
      description: 'Share your learnings with the community',
      progress: 0,
      maxProgress: 3,
      dueDate: '2024-01-31',
      category: 'community'
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'course',
      title: 'Prompt Engineering Fundamentals',
      description: 'Completed Module 2: Advanced Techniques',
      timestamp: '2024-01-22T10:30:00Z',
      points: 50
    },
    {
      id: '2',
      type: 'tool',
      title: 'AI Content Optimizer',
      description: 'Generated optimized content for social media',
      timestamp: '2024-01-22T09:15:00Z',
      points: 25
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Week Warrior',
      description: 'Maintained learning streak for 7 days',
      timestamp: '2024-01-22T08:00:00Z',
      points: 100
    }
  ],
  recommendations: [
    {
      id: '1',
      type: 'course',
      title: 'Advanced Prompt Engineering',
      description: 'Deep dive into sophisticated prompting techniques',
      reason: 'Based on your progress in fundamentals',
      priority: 'high',
      href: '/courses/advanced-prompt-engineering',
      estimatedTime: '2 hours'
    },
    {
      id: '2',
      type: 'tool',
      title: 'AI Strategy Canvas',
      description: 'Interactive tool for planning AI implementation',
      reason: 'Perfect for your strategic goals',
      priority: 'high',
      href: '/tools/strategy-canvas',
      estimatedTime: '30 minutes'
    },
    {
      id: '3',
      type: 'community',
      title: 'Expert Office Hours',
      description: 'Q&A session with AI implementation experts',
      reason: 'Get help with your current challenges',
      priority: 'medium',
      href: '/community/office-hours',
      estimatedTime: '1 hour'
    }
  ],
  stats: {
    coursesCompleted: 4,
    toolsUsed: 12,
    communityContributions: 3,
    helpedOthers: 7,
    totalPoints: 1250,
    rank: 'Conscious Practitioner'
  }
}

export default function DashboardPage() {
  const [userProgress, setUserProgress] = useState<UserProgress>(mockUserProgress)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'learning' | 'tools' | 'community'>('overview')

  const getRarityColor = (rarity: Achievement['rarity']) => {
    const colors = {
      common: 'from-gray-500 to-gray-600',
      rare: 'from-blue-500 to-blue-600',
      epic: 'from-purple-500 to-purple-600',
      legendary: 'from-yellow-500 to-orange-500'
    }
    return colors[rarity]
  }

  const getPriorityColor = (priority: Recommendation['priority']) => {
    const colors = {
      high: 'border-red-500/30 bg-red-500/10',
      medium: 'border-yellow-500/30 bg-yellow-500/10',
      low: 'border-green-500/30 bg-green-500/10'
    }
    return colors[priority]
  }

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-100 via-purple-200 to-slate-300 bg-clip-text text-transparent">
                    Welcome back, Explorer
                  </h1>
                  <p className="text-slate-400">Continue your conscious AI journey</p>
                </div>
                <div className="flex items-center gap-4">
                  <PremiumButton variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </PremiumButton>
                  <PremiumButton variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </PremiumButton>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <GlowCard color="violet" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Level</p>
                      <p className="text-2xl font-bold text-purple-300">{userProgress.level}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{userProgress.experience}/{userProgress.maxExperience} XP</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(userProgress.experience / userProgress.maxExperience) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </GlowCard>

                <GlowCard color="violet" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Streak</p>
                      <p className="text-2xl font-bold text-orange-300">{userProgress.streak}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Days in a row</p>
                </GlowCard>

                <GlowCard color="violet" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Rank</p>
                      <p className="text-sm font-semibold text-cyan-300">{userProgress.stats.rank}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">{userProgress.stats.totalPoints} total points</p>
                </GlowCard>

                <GlowCard color="violet" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Achievements</p>
                      <p className="text-2xl font-bold text-green-300">{userProgress.achievements.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Unlocked</p>
                </GlowCard>
              </div>
            </div>
          </StaggerItem>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Goals & Recommendations */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Goals */}
              <StaggerItem>
                <GlowCard color="violet" className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-slate-100 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-purple-400" />
                      Current Goals
                    </h2>
                    <Link href="/goals" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {userProgress.currentGoals.map((goal, index) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MagneticHover intensity={0.1}>
                          <div className="p-4 rounded-xl border border-slate-700/30 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-slate-100 mb-1">{goal.title}</h3>
                                <p className="text-slate-400 text-sm">{goal.description}</p>
                              </div>
                              <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded capitalize">
                                {goal.category}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex-1 mr-4">
                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                  <span>Progress</span>
                                  <span>{goal.progress}/{goal.maxProgress}</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                  <motion.div
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(goal.progress / goal.maxProgress) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                  />
                                </div>
                              </div>
                              <PremiumButton variant="ghost" size="sm">
                                <Play className="w-4 h-4" />
                              </PremiumButton>
                            </div>
                          </div>
                        </MagneticHover>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </StaggerItem>

              {/* Personalized Recommendations */}
              <StaggerItem>
                <GlowCard color="violet" className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-slate-100 flex items-center">
                      <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
                      Recommended for You
                    </h2>
                    <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                      AI Curated
                    </span>
                  </div>
                  <div className="space-y-4">
                    {userProgress.recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={rec.href}>
                          <MagneticHover intensity={0.1}>
                            <div className={cn(
                              'p-6 rounded-xl border transition-all duration-200 hover:scale-[1.02]',
                              getPriorityColor(rec.priority)
                            )}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-slate-100">{rec.title}</h3>
                                    <span className={cn(
                                      'text-xs px-2 py-1 rounded-full',
                                      rec.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                      rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                      'bg-green-500/20 text-green-300'
                                    )}>
                                      {rec.priority} priority
                                    </span>
                                  </div>
                                  <p className="text-slate-400 text-sm mb-2">{rec.description}</p>
                                  <p className="text-slate-500 text-xs italic">{rec.reason}</p>
                                </div>
                                <div className="text-right ml-4">
                                  <p className="text-slate-400 text-xs">{rec.estimatedTime}</p>
                                  <ArrowRight className="w-4 h-4 text-slate-500 mt-1" />
                                </div>
                              </div>
                            </div>
                          </MagneticHover>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </StaggerItem>
            </div>

            {/* Right Column - Activity & Achievements */}
            <div className="space-y-8">
              {/* Recent Activity */}
              <StaggerItem>
                <GlowCard color="violet" className="p-6">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-cyan-400" />
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {userProgress.recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors"
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                          activity.type === 'course' ? 'bg-blue-500/20 text-blue-400' :
                          activity.type === 'tool' ? 'bg-green-500/20 text-green-400' :
                          activity.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        )}>
                          {activity.type === 'course' && <BookOpen className="w-4 h-4" />}
                          {activity.type === 'tool' && <Zap className="w-4 h-4" />}
                          {activity.type === 'achievement' && <Award className="w-4 h-4" />}
                          {activity.type === 'community' && <Users className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-200 text-sm">{activity.title}</p>
                          <p className="text-slate-400 text-xs">{activity.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-slate-500 text-xs">{formatRelativeTime(activity.timestamp)}</span>
                            <span className="text-green-400 text-xs">+{activity.points} XP</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </StaggerItem>

              {/* Latest Achievements */}
              <StaggerItem>
                <GlowCard color="violet" className="p-6">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
                    <Award className="w-5 h-5 mr-3 text-yellow-400" />
                    Recent Achievements
                  </h2>
                  <div className="space-y-4">
                    {userProgress.achievements.slice(-3).map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FloatingElement duration={8 + index} offset={5}>
                          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/30 bg-slate-800/30">
                            <div className={cn(
                              'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                              getRarityColor(achievement.rarity)
                            )}>
                              <achievement.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-slate-100 text-sm">{achievement.title}</h3>
                                <span className={cn(
                                  'text-xs px-2 py-0.5 rounded-full',
                                  achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                  achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                                  achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                                  'bg-gray-500/20 text-gray-300'
                                )}>
                                  {achievement.rarity}
                                </span>
                              </div>
                              <p className="text-slate-400 text-xs">{achievement.description}</p>
                            </div>
                          </div>
                        </FloatingElement>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <PremiumButton variant="ghost" size="sm" href="/achievements" className="w-full">
                      View All Achievements
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </PremiumButton>
                  </div>
                </GlowCard>
              </StaggerItem>

              {/* Quick Actions */}
              <StaggerItem>
                <GlowCard color="violet" className="p-6">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <PremiumButton variant="ghost" size="sm" href="/tools" className="flex-col h-20">
                      <Zap className="w-5 h-5 mb-1" />
                      Tools
                    </PremiumButton>
                    <PremiumButton variant="ghost" size="sm" href="/community" className="flex-col h-20">
                      <Users className="w-5 h-5 mb-1" />
                      Community
                    </PremiumButton>
                    <PremiumButton variant="ghost" size="sm" href="/courses" className="flex-col h-20">
                      <BookOpen className="w-5 h-5 mb-1" />
                      Learn
                    </PremiumButton>
                    <PremiumButton variant="ghost" size="sm" href="/assessment" className="flex-col h-20">
                      <Brain className="w-5 h-5 mb-1" />
                      Assess
                    </PremiumButton>
                  </div>
                </GlowCard>
              </StaggerItem>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </div>
  )
}

// Missing Trophy import - let's add it
function Trophy({ className }: { className?: string }) {
  return <Award className={className} />
}