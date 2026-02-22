'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Brain,
  Sparkles,
  Wrench,
  TrendingUp,
  Users,
  Archive,
  Plus,
  ChevronRight,
  Calendar,
  TrendingUp as TrendingUpIcon,
  Target,
  BookOpen,
  Settings,
  RefreshCw,
  Flame,
  Award,
  Check,
} from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import InteractiveCard from '@/components/ui/InteractiveCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { cn } from '@/lib/utils';

interface JournalEntry {
  id: string;
  pillarId: string;
  content: string;
  date: string;
}

interface Goal {
  id: string;
  pillarId: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface PillarProgress {
  pillarId: string;
  score: number;
  lastUpdated: string;
}

interface UserStreak {
  current: number;
  longest: number;
  lastActivity: string;
}

const pillarConfig = [
  { id: 'energy', title: 'Energy', icon: Zap, color: 'amber' },
  { id: 'mind', title: 'Mind', icon: Brain, color: 'gold' },
  { id: 'soul', title: 'Soul', icon: Sparkles, color: 'amber' },
  { id: 'craft', title: 'Craft', icon: Wrench, color: 'gold' },
  { id: 'capital', title: 'Capital', icon: TrendingUp, color: 'amber' },
  { id: 'circle', title: 'Circle', icon: Users, color: 'gold' },
  { id: 'legacy', title: 'Legacy', icon: Archive, color: 'amber' },
];

const STORAGE_KEYS = {
  JOURNAL: 'soulbook_vault_journal',
  GOALS: 'soulbook_vault_goals',
  PROGRESS: 'soulbook_vault_progress',
  STREAK: 'soulbook_vault_streak',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function calculatePillarScores(progress: PillarProgress[]): Record<string, number> {
  return Object.fromEntries(
    pillarConfig.map((pillar) => {
      const found = progress.find((p) => p.pillarId === pillar.id);
      return [pillar.id, found?.score || 0];
    })
  );
}

function getOverallProgress(progress: PillarProgress[]): number {
  if (progress.length === 0) return 0;
  const total = progress.reduce((sum, p) => sum + Math.min(p.score, 100), 0);
  return Math.round(total / progress.length);
}

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'journal' | 'goals'>('overview');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [progress, setProgress] = useState<PillarProgress[]>([]);
  const [streak, setStreak] = useState<UserStreak>({
    current: 0,
    longest: 0,
    lastActivity: '',
  });
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('energy');
  const [newGoal, setNewGoal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const idCounter = useRef(0);

  const getNextId = (prefix: string) => {
    idCounter.current += 1;
    return `${prefix}-${idCounter.current}`;
  };

  useEffect(() => {
    setJournalEntries(getFromStorage(STORAGE_KEYS.JOURNAL, []));
    setGoals(getFromStorage(STORAGE_KEYS.GOALS, []));
    setProgress(getFromStorage(STORAGE_KEYS.PROGRESS, []));
    setStreak(getFromStorage(STORAGE_KEYS.STREAK, { current: 0, longest: 0, lastActivity: '' }));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.JOURNAL, journalEntries);
    }
  }, [journalEntries, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.GOALS, goals);
    }
  }, [goals, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.PROGRESS, progress);
    }
  }, [progress, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.STREAK, streak);
    }
  }, [streak, isLoading]);

  const handleAddJournalEntry = () => {
    if (!newJournalEntry.trim()) return;

    const entry: JournalEntry = {
      id: getNextId(selectedPillar),
      pillarId: selectedPillar,
      content: newJournalEntry,
      date: new Date().toISOString(),
    };

    setJournalEntries((prev) => [entry, ...prev]);
    setNewJournalEntry('');
    updateStreak();
  };

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;

    const goal: Goal = {
      id: getNextId(selectedPillar),
      pillarId: selectedPillar,
      title: newGoal,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setGoals((prev) => [...prev, goal]);
    setNewGoal('');
    updateStreak();
  };

  const handleToggleGoal = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g))
    );
    updateStreak();
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const handleUpdateProgress = (pillarId: string, score: number) => {
    setProgress((prev) => {
      const existing = prev.find((p) => p.pillarId === pillarId);
      if (existing) {
        return prev.map((p) =>
          p.pillarId === pillarId ? { ...p, score, lastUpdated: new Date().toISOString() } : p
        );
      }
      return [...prev, { pillarId, score, lastUpdated: new Date().toISOString() }];
    });
    updateStreak();
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (streak.lastActivity !== today) {
      const newStreak = {
        current: streak.lastActivity ? streak.current + 1 : 1,
        longest: Math.max(streak.longest, streak.current + 1),
        lastActivity: today,
      };
      setStreak(newStreak);
    }
  };

  const pillarScores = calculatePillarScores(progress);
  const overallProgress = getOverallProgress(progress);
  const completedGoals = goals.filter((g) => g.completed).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/soulbook/hero-vault.png"
            alt="Soulbook vault background"
            fill
            className="object-cover opacity-20"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/70 to-[#0a0a0b]" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
                  Your Personal Dashboard
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  The Soulbook <span className="text-amber-400">Vault</span>
                </h1>
                <p className="text-slate-400">
                  Track your progress, journal your journey, and achieve your goals.
                </p>
              </div>

              <div className="flex gap-4">
                <GlassmorphicCard
                  variant="premium"
                  gradient="aurora"
                  border="subtle"
                  className="p-4 text-center min-w-[120px]"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold text-white">{streak.current}</span>
                  </div>
                  <p className="text-xs text-slate-400">Day Streak</p>
                </GlassmorphicCard>
                <GlassmorphicCard
                  variant="premium"
                  gradient="aurora"
                  border="subtle"
                  className="p-4 text-center min-w-[120px]"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-gold-500" />
                    <span className="text-2xl font-bold text-white">{completedGoals}</span>
                  </div>
                  <p className="text-xs text-slate-400">Goals Done</p>
                </GlassmorphicCard>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl w-fit">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'journal', label: 'Journal', icon: BookOpen },
                { id: 'goals', label: 'Goals', icon: TrendingUpIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Overall Progress */}
                <GlassmorphicCard variant="premium" gradient="aurora" border="glow" className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Overall Progress</h2>
                      <p className="text-slate-400">Your journey across all 7 pillars</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-amber-400">{overallProgress}%</div>
                      <p className="text-sm text-slate-400">Complete</p>
                    </div>
                  </div>

                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-gold-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-8">
                    {pillarConfig.map((pillar) => {
                      const Icon = pillar.icon;
                      const score = pillarScores[pillar.id] || 0;

                      return (
                        <div
                          key={pillar.id}
                          className="text-center p-4 bg-slate-800/30 rounded-xl"
                        >
                          <div
                            className={cn(
                              'inline-flex p-2 rounded-lg mb-2',
                              pillar.color === 'amber'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-gold-500/20 text-gold-400'
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-slate-400 mb-1">{pillar.title}</p>
                          <p className="text-lg font-bold text-white">{score}%</p>
                        </div>
                      );
                    })}
                  </div>
                </GlassmorphicCard>

                {/* Pillar Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pillarConfig.map((pillar) => {
                    const Icon = pillar.icon;
                    const score = pillarScores[pillar.id] || 0;
                    const pillarGoals = goals.filter((g) => g.pillarId === pillar.id);
                    const pillarEntries = journalEntries.filter((e) => e.pillarId === pillar.id);

                    return (
                      <InteractiveCard
                        key={pillar.id}
                        glowColor={pillar.color === 'amber' ? 'yellow' : 'cyan'}
                        intensity="medium"
                      >
                        <GlassmorphicCard
                          variant="premium"
                          gradient={pillar.color === 'amber' ? 'aurora' : 'purple'}
                          border="subtle"
                          className="p-6"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className={cn(
                                'p-2 rounded-lg',
                                pillar.color === 'amber'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-gold-500/20 text-gold-400'
                              )}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                              <p className="text-sm text-slate-400">
                                {score}% complete
                              </p>
                            </div>
                          </div>

                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                            <motion.div
                              className={cn(
                                'h-full',
                                pillar.color === 'amber'
                                  ? 'bg-amber-500'
                                  : 'bg-gold-500'
                              )}
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                          </div>

                          <div className="flex justify-between text-sm text-slate-400 mb-4">
                            <span>{pillarGoals.length} goals</span>
                            <span>{pillarEntries.length} entries</span>
                          </div>

                          <PremiumButton
                            variant="ghost"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setSelectedPillar(pillar.id);
                              setActiveTab('journal');
                            }}
                          >
                            Add Entry
                          </PremiumButton>
                        </GlassmorphicCard>
                      </InteractiveCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'journal' && (
              <motion.div
                key="journal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Journal Input */}
                <div className="lg:col-span-1">
                  <GlassmorphicCard
                    variant="premium"
                    gradient="aurora"
                    border="subtle"
                    className="p-6 sticky top-8"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">New Entry</h3>

                    <div className="mb-4">
                      <label className="block text-sm text-slate-400 mb-2">
                        Pillar
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {pillarConfig.slice(0, 7).map((pillar) => {
                          const Icon = pillar.icon;
                          return (
                            <button
                              key={pillar.id}
                              onClick={() => setSelectedPillar(pillar.id)}
                              className={cn(
                                'p-2 rounded-lg transition-all',
                                selectedPillar === pillar.id
                                  ? pillar.color === 'amber'
                                    ? 'bg-amber-500/30 text-amber-400'
                                    : 'bg-gold-500/30 text-gold-400'
                                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
                              )}
                              title={pillar.title}
                            >
                              <Icon className="w-5 h-5 mx-auto" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-slate-400 mb-2">
                        Your thoughts
                      </label>
                      <textarea
                        value={newJournalEntry}
                        onChange={(e) => setNewJournalEntry(e.target.value)}
                        placeholder="Reflect on your progress, challenges, or insights..."
                        className="w-full h-40 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                      />
                    </div>

                    <PremiumButton
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={handleAddJournalEntry}
                      disabled={!newJournalEntry.trim()}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Entry
                    </PremiumButton>
                  </GlassmorphicCard>
                </div>

                {/* Journal Entries */}
                <div className="lg:col-span-2 space-y-4">
                  {journalEntries.length === 0 ? (
                    <GlassmorphicCard
                      variant="default"
                      gradient="custom"
                      border="subtle"
                      className="p-12 text-center"
                    >
                      <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No entries yet
                      </h3>
                      <p className="text-slate-400">
                        Start journaling to track your journey across the 7 pillars.
                      </p>
                    </GlassmorphicCard>
                  ) : (
                    journalEntries.map((entry) => {
                      const pillar = pillarConfig.find((p) => p.id === entry.pillarId);
                      const Icon = pillar?.icon || Sparkles;
                      const date = new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });

                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <GlassmorphicCard
                            variant="premium"
                            gradient={pillar?.color === 'amber' ? 'aurora' : 'purple'}
                            border="subtle"
                            className="p-6"
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={cn(
                                  'p-2 rounded-lg flex-shrink-0',
                                  pillar?.color === 'amber'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-gold-500/20 text-gold-400'
                                )}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-white">
                                    {pillar?.title}
                                  </span>
                                  <span className="text-slate-500 text-sm">•</span>
                                  <span className="text-slate-400 text-sm">{date}</span>
                                </div>
                                <p className="text-slate-300">{entry.content}</p>
                              </div>
                            </div>
                          </GlassmorphicCard>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'goals' && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Goal Input */}
                <div className="lg:col-span-1">
                  <GlassmorphicCard
                    variant="premium"
                    gradient="aurora"
                    border="subtle"
                    className="p-6 sticky top-8"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">New Goal</h3>

                    <div className="mb-4">
                      <label className="block text-sm text-slate-400 mb-2">
                        Pillar
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {pillarConfig.slice(0, 7).map((pillar) => {
                          const Icon = pillar.icon;
                          return (
                            <button
                              key={pillar.id}
                              onClick={() => setSelectedPillar(pillar.id)}
                              className={cn(
                                'p-2 rounded-lg transition-all',
                                selectedPillar === pillar.id
                                  ? pillar.color === 'amber'
                                    ? 'bg-amber-500/30 text-amber-400'
                                    : 'bg-gold-500/30 text-gold-400'
                                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
                              )}
                              title={pillar.title}
                            >
                              <Icon className="w-5 h-5 mx-auto" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-slate-400 mb-2">
                        Goal
                      </label>
                      <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="What do you want to achieve?"
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>

                    <PremiumButton
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={handleAddGoal}
                      disabled={!newGoal.trim()}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Goal
                    </PremiumButton>
                  </GlassmorphicCard>
                </div>

                {/* Goals List */}
                <div className="lg:col-span-2 space-y-4">
                  {goals.length === 0 ? (
                    <GlassmorphicCard
                      variant="default"
                      gradient="custom"
                      border="subtle"
                      className="p-12 text-center"
                    >
                      <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No goals yet
                      </h3>
                      <p className="text-slate-400">
                        Set your first goal to start tracking your progress.
                      </p>
                    </GlassmorphicCard>
                  ) : (
                    goals.map((goal) => {
                      const pillar = pillarConfig.find((p) => p.id === goal.pillarId);

                      return (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <GlassmorphicCard
                            variant="premium"
                            gradient={pillar?.color === 'amber' ? 'aurora' : 'purple'}
                            border="subtle"
                            className="p-6"
                          >
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => handleToggleGoal(goal.id)}
                                className={cn(
                                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                                  goal.completed
                                    ? 'bg-amber-500 border-amber-500'
                                    : 'border-slate-600 hover:border-amber-500'
                                )}
                              >
                                {goal.completed && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </button>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={cn(
                                      'text-sm font-medium',
                                      pillar?.color === 'amber'
                                        ? 'text-amber-400'
                                        : 'text-gold-400'
                                    )}
                                  >
                                    {pillar?.title}
                                  </span>
                                </div>
                                <p
                                  className={cn(
                                    'text-slate-200',
                                    goal.completed && 'line-through text-slate-500'
                                  )}
                                >
                                  {goal.title}
                                </p>
                              </div>

                              <button
                                onClick={() => handleDeleteGoal(goal.id)}
                                className="text-slate-500 hover:text-red-400 transition-colors p-2"
                                aria-label="Delete goal"
                              >
                                <Settings className="w-5 h-5" />
                              </button>
                            </div>
                          </GlassmorphicCard>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
