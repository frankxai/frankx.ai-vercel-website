'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Sunrise,
  Sunset,
  Flame,
  Target,
  Waves,
  Music,
  Sparkles,
  Clock,
  ArrowRight,
  Calendar,
  Heart,
  Zap,
  Stars,
  Play,
  BookOpen,
  Timer,
  Volume2,
  Headphones,
  Crown,
  Moon,
  Sun,
  Wind,
  Compass,
  Eye,
  Feather,
  CheckCircle2,
  Circle,
  TrendingUp,
  Bot,
} from 'lucide-react';
import { EmailSignup } from '@/components/email-signup';

// ═══════════════════════════════════════════════════════════════════════════════
// DARK OLED LUXURY DESIGN SYSTEM
// True blacks, gold accents, spotlight effects, premium typography
// ═══════════════════════════════════════════════════════════════════════════════

// Orchestrated stagger animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 28,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROGRESS TRACKING (localStorage)
// ═══════════════════════════════════════════════════════════════════════════════

interface DailyProgress {
  date: string;
  completed: string[];
  protocolsCompleted: Record<string, string[]>;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function loadProgress(): DailyProgress {
  if (typeof window === 'undefined') {
    return { date: getToday(), completed: [], protocolsCompleted: {} };
  }
  const stored = localStorage.getItem('ritualProgress');
  if (!stored) {
    return { date: getToday(), completed: [], protocolsCompleted: {} };
  }
  const parsed = JSON.parse(stored);
  if (parsed.date !== getToday()) {
    return { date: getToday(), completed: [], protocolsCompleted: {} };
  }
  return parsed;
}

function getStreak(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem('ritualStreak');
  return stored ? parseInt(stored, 10) : 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIME-BASED RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function getGreeting(): string {
  const timeOfDay = getTimeOfDay();
  const greetings = {
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    night: 'Good Night',
  };
  return greetings[timeOfDay];
}

function getRecommendedRitual(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) return 'morning';
  if (hour >= 9 && hour < 12) return 'flow';
  if (hour >= 12 && hour < 14) return 'transition';
  if (hour >= 14 && hour < 17) return 'focus';
  if (hour >= 17 && hour < 20) return 'music';
  return 'evening';
}

// ═══════════════════════════════════════════════════════════════════════════════
// RITUAL DATA - Each with distinct visual identity
// ═══════════════════════════════════════════════════════════════════════════════

const rituals = [
  {
    id: 'morning',
    title: 'Morning Activation',
    tagline: 'Begin with Fire',
    icon: Sunrise,
    accentClass: 'from-amber-500 to-orange-600',
    glowClass: 'shadow-amber-500/20',
    borderClass: 'hover:border-amber-500/40',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    description: 'Ignite your creative system before the world wakes. Sound frequencies, breathwork, intention setting.',
    duration: '15-30 min',
    protocols: [
      { name: 'Sunrise Frequency Bath', time: '10 min', icon: Volume2 },
      { name: 'Intention Ceremony', time: '5 min', icon: Feather },
      { name: 'Activation Breathwork', time: '10 min', icon: Wind },
    ],
    featured: true,
  },
  {
    id: 'flow',
    title: 'Creative Flow State',
    tagline: 'Enter the Zone',
    icon: Flame,
    accentClass: 'from-orange-500 to-red-600',
    glowClass: 'shadow-orange-500/20',
    borderClass: 'hover:border-orange-500/40',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    description: 'Transition rituals that signal your nervous system. Remove friction. Enter flow.',
    duration: '5-15 min',
    protocols: [
      { name: 'Flow Activation Track', time: '5 min', icon: Music },
      { name: 'Space Clearing Protocol', time: '3 min', icon: Wind },
      { name: 'Vision Priming', time: '5 min', icon: Eye },
    ],
  },
  {
    id: 'music',
    title: 'Studio Sessions',
    tagline: 'Tune Your Instrument',
    icon: Music,
    accentClass: 'from-violet-500 to-purple-600',
    glowClass: 'shadow-violet-500/20',
    borderClass: 'hover:border-violet-500/40',
    textClass: 'text-violet-400',
    bgClass: 'bg-violet-500/10',
    description: 'Sonic rituals for producers and musicians. Tune your ears, prime creativity, enter the studio mindset.',
    duration: '10-20 min',
    protocols: [
      { name: 'Ear Tuning Sweep', time: '5 min', icon: Headphones },
      { name: 'Genre Mood Exploration', time: '10 min', icon: Compass },
      { name: 'Production Intention', time: '5 min', icon: Target },
    ],
  },
  {
    id: 'focus',
    title: 'Deep Work Focus',
    tagline: 'Eliminate All Else',
    icon: Target,
    accentClass: 'from-cyan-500 to-blue-600',
    glowClass: 'shadow-cyan-500/20',
    borderClass: 'hover:border-cyan-500/40',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    description: 'Protocols for builders. Block distractions, sharpen focus, ship meaningful work.',
    duration: '10-25 min',
    protocols: [
      { name: 'Focus Frequency Stack', time: '10 min', icon: Volume2 },
      { name: 'Deep Work Block Setup', time: '5 min', icon: Clock },
      { name: 'Single Task Lock', time: '5 min', icon: Target },
    ],
  },
  {
    id: 'transition',
    title: 'Neural Reset',
    tagline: 'Clear the Cache',
    icon: Waves,
    accentClass: 'from-emerald-500 to-teal-600',
    glowClass: 'shadow-emerald-500/20',
    borderClass: 'hover:border-emerald-500/40',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    description: 'Audio-based reset between work sessions. Clear mental cache. Start completely fresh.',
    duration: '3-10 min',
    protocols: [
      { name: 'Neural Reset Sound', time: '3 min', icon: Waves },
      { name: 'Micro-Movement', time: '5 min', icon: Wind },
      { name: 'Context Switch', time: '2 min', icon: Compass },
    ],
  },
  {
    id: 'evening',
    title: 'Evening Integration',
    tagline: 'Close with Clarity',
    icon: Sunset,
    accentClass: 'from-indigo-500 to-purple-700',
    glowClass: 'shadow-indigo-500/20',
    borderClass: 'hover:border-indigo-500/40',
    textClass: 'text-indigo-400',
    bgClass: 'bg-indigo-500/10',
    description: 'Wind down with intention. Capture insights. Signal your system that creation is complete.',
    duration: '15-30 min',
    protocols: [
      { name: 'Frequency Descent', time: '10 min', icon: Moon },
      { name: 'Win Capture', time: '10 min', icon: BookOpen },
      { name: 'Tomorrow Seed', time: '5 min', icon: Feather },
    ],
  },
];

const weeklyRhythm = [
  { day: 'MON', name: 'Week Ignition', desc: 'Set the creative theme', icon: Zap, accent: 'text-amber-400' },
  { day: 'WED', name: 'Mid-Week Calibration', desc: 'Course correct energy', icon: Compass, accent: 'text-cyan-400' },
  { day: 'FRI', name: 'Victory Review', desc: 'Celebrate and capture', icon: Crown, accent: 'text-violet-400' },
  { day: 'SUN', name: 'Soul Alignment', desc: 'Connect with purpose', icon: Heart, accent: 'text-rose-400' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SPOTLIGHT CARD - Premium hover effect with gold cursor glow
// ═══════════════════════════════════════════════════════════════════════════════

function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(212,175,55,0.08)'
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight glow following cursor */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DAILY DASHBOARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function DailyDashboard({
  progress,
  streak,
  recommendedRitual,
}: {
  progress: DailyProgress;
  streak: number;
  recommendedRitual: string;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const recommended = rituals.find((r) => r.id === recommendedRitual);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[100px] -z-10" />

      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Greeting & Time */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-sm font-medium text-white/50 uppercase tracking-wider">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {getGreeting()}, <span className="text-amber-400">Creator</span>
            </h2>
            <p className="text-lg text-white/60">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </motion.div>

          {/* Daily Progress */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-white/50">Today's Progress</p>
              <p className="text-2xl font-bold text-white">
                {progress.completed.length}<span className="text-white/30">/6</span>
              </p>
              <div className="flex gap-1 mt-2">
                {rituals.map((r) => (
                  <div
                    key={r.id}
                    className={`w-6 h-1 rounded-full transition-all ${
                      progress.completed.includes(r.id)
                        ? 'bg-emerald-400'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Streak Counter */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/5 border border-amber-500/20 flex items-center justify-center">
              <Flame className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-white/50">Current Streak</p>
              <p className="text-2xl font-bold text-white">
                {streak} <span className="text-white/30">days</span>
              </p>
              <p className="text-xs text-white/40 mt-1">
                {streak > 0 ? 'Keep the fire alive!' : 'Start your streak today'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Recommended Ritual */}
        {recommended && !progress.completed.includes(recommended.id) && (
          <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-white/[0.04]">
            <Link
              href={`/rituals/${recommended.id}`}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.04] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${recommended.accentClass} p-[1px]`}>
                <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center">
                  <recommended.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Recommended Now
                </p>
                <p className="text-lg font-semibold text-white group-hover:text-amber-50 transition-colors">
                  {recommended.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RITUAL CARD - Premium glass with intentional design
// ═══════════════════════════════════════════════════════════════════════════════

function RitualCard({
  ritual,
  index,
  isFeatured = false,
  isCompleted = false,
}: {
  ritual: typeof rituals[0];
  index: number;
  isFeatured?: boolean;
  isCompleted?: boolean;
}) {
  const Icon = ritual.icon;

  return (
    <motion.div
      variants={itemVariants}
      className={isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
    >
      <SpotlightCard
        className={`group h-full rounded-[2rem] border bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl transition-all duration-500 hover:shadow-2xl ${
          isCompleted
            ? 'border-emerald-500/30 shadow-emerald-500/10'
            : `border-white/[0.06] ${ritual.borderClass} ${ritual.glowClass}`
        }`}
        glowColor={ritual.id === 'morning' ? 'rgba(251,191,36,0.08)' : 'rgba(212,175,55,0.06)'}
      >
        <Link href={`/rituals/${ritual.id}`} className="flex flex-col h-full p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            {/* Icon Badge */}
            <div className="relative">
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${ritual.accentClass} p-[1px]`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-xl">
                  <Icon className="w-6 h-6 text-white/90 stroke-[1.5]" />
                </div>
                {/* Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ritual.accentClass} opacity-40 blur-xl -z-10`} />
              </div>
              {/* Completed checkmark */}
              {isCompleted && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Duration Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
              <Timer className="w-3 h-3" />
              {ritual.duration}
            </span>
          </div>

          {/* Content */}
          <div className="flex-grow space-y-4">
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${ritual.textClass} mb-2`}>
                {ritual.tagline}
              </p>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                {ritual.title}
              </h3>
            </div>

            <p className="text-white/50 leading-relaxed text-sm lg:text-base">
              {ritual.description}
            </p>

            {/* Protocols (expanded for featured) */}
            {isFeatured && (
              <div className="space-y-2 pt-4">
                {ritual.protocols.map((protocol, i) => {
                  const ProtocolIcon = protocol.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.04] transition-colors"
                    >
                      <ProtocolIcon className={`w-4 h-4 ${ritual.textClass} stroke-[1.5]`} />
                      <span className="text-sm text-white/70 flex-grow">{protocol.name}</span>
                      <span className="text-xs text-white/50">{protocol.time}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between pt-6 mt-auto border-t border-white/[0.04]">
            <span className={`flex items-center gap-2 text-sm font-medium ${isCompleted ? 'text-emerald-400' : ritual.textClass}`}>
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Completed Today
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Begin Ritual
                </>
              )}
            </span>
            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function RitualsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Progress state
  const [progress, setProgress] = useState<DailyProgress>({ date: getToday(), completed: [], protocolsCompleted: {} });
  const [streak, setStreak] = useState(0);
  const [recommendedRitual, setRecommendedRitual] = useState('morning');

  useEffect(() => {
    setProgress(loadProgress());
    setStreak(getStreak());
    setRecommendedRitual(getRecommendedRitual());
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ════════════════════════════════════════════════════════════════════════
          DAILY DASHBOARD - Time-aware greeting and progress
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <DailyDashboard progress={progress} streak={streak} recommendedRitual={recommendedRitual} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          HERO SECTION - Dark OLED with Gold accents
          ════════════════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Absolute black base */}
        <div className="absolute inset-0 bg-black" />

        {/* Aurora mesh - subtle breathing gradients */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-amber-500/[0.07] rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/[0.05] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange-500/[0.04] rounded-full blur-[180px]" />
        </div>

        {/* Gold foil gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Gold badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
                <Sparkles className="w-4 h-4 stroke-[1.5]" />
                Daily Practice
                <Stars className="w-4 h-4 stroke-[1.5]" />
              </span>
            </motion.div>

            {/* Main title - Syne display font */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="block text-white">Creative</span>
              <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Rituals
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-white/55 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your creative practice through intentional routines,
              sonic frequencies, and state-shifting protocols.
            </motion.p>

            {/* Gold divider */}
            <motion.div variants={itemVariants} className="flex justify-center py-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
            </motion.div>

            {/* Philosophy quote */}
            <motion.blockquote
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto font-serif italic"
            >
              "Most creators wait for inspiration.
              <br />
              <span className="text-amber-400/80">The ones who ship create the conditions for it.</span>"
            </motion.blockquote>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-8 pt-8"
            >
              {[
                { value: '6', label: 'Rituals' },
                { value: '18', label: 'Protocols' },
                { value: '∞', label: 'Flow' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Link
                href="#rituals"
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all hover:shadow-lg hover:shadow-amber-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Choose Ritual
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/products/vibe-os"
                className="px-8 py-4 rounded-full border border-white/10 text-white/70 font-medium text-sm hover:bg-white/[0.03] hover:border-white/20 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Vibe OS Integration
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════════
          RITUALS GRID - Premium Bento Layout
          ════════════════════════════════════════════════════════════════════════ */}
      <section id="rituals" className="relative py-24 scroll-mt-20">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
              <Clock className="w-3 h-3" />
              Daily Practices
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Choose Your <span className="text-amber-400">Ritual</span>
            </h2>
            <p className="text-white/55 max-w-lg mx-auto">
              Each ritual is a portal into creative flow. Click to start your practice with guided timers and AI assistance.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {rituals.map((ritual, index) => (
              <RitualCard
                key={ritual.id}
                ritual={ritual}
                index={index}
                isFeatured={ritual.featured}
                isCompleted={progress.completed.includes(ritual.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          WEEKLY RHYTHM - Horizontal timeline
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/5 to-black" />

        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400 mb-6">
              <Calendar className="w-3 h-3" />
              Weekly Cadence
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              The Creator's <span className="text-amber-400">Week</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {weeklyRhythm.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.day}
                  variants={itemVariants}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-amber-500/20 transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-amber-500">{item.day}</span>
                      <Icon className={`w-5 h-5 ${item.accent} stroke-[1.5]`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-sm text-white/55">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          AI COMPANION SECTION
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SpotlightCard
            className="rounded-[2.5rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-black to-amber-500/[0.05] overflow-hidden"
            glowColor="rgba(139,92,246,0.08)"
          >
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-[0.15em]">
                    <Bot className="w-3.5 h-3.5" />
                    AI-Powered Practice
                  </span>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    Your AI<br />
                    <span className="text-violet-400">Ritual Companion</span>
                  </h2>

                  <p className="text-white/50 leading-relaxed">
                    Each ritual includes AI-powered guidance. Claude helps you through protocols,
                    answers questions, and adapts the practice to your creative needs.
                  </p>

                  <Link
                    href="/agents"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    Meet Your Agent Team
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    { icon: Volume2, title: 'Guided Protocols', desc: 'Step-by-step instructions with timers' },
                    { icon: Compass, title: 'Personalized Prompts', desc: 'AI prompts for each ritual phase' },
                    { icon: Headphones, title: 'Vibe OS Integration', desc: 'Custom soundscapes for your state' },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <feature.icon className="w-5 h-5 text-violet-400 stroke-[1.5] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                        <p className="text-xs text-white/55 mt-0.5">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          VIBE OS INTEGRATION - Premium feature card
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SpotlightCard
            className="rounded-[2.5rem] border border-white/[0.06] bg-gradient-to-br from-amber-500/[0.08] via-black to-violet-500/[0.05] overflow-hidden"
            glowColor="rgba(251,191,36,0.08)"
          >
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-[0.15em]">
                    <Crown className="w-3.5 h-3.5" />
                    Powered by Vibe OS
                  </span>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    Rituals Come Alive<br />
                    <span className="text-amber-400">with Sound</span>
                  </h2>

                  <p className="text-white/50 leading-relaxed">
                    Every ritual is designed to work with Vibe OS—our AI-powered music platform.
                    Get custom frequency tracks and sonic landscapes that match your creative state.
                  </p>

                  <Link
                    href="/products/vibe-os"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                  >
                    <Music className="w-4 h-4" />
                    Explore Vibe OS
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    { icon: Volume2, title: 'Frequency Stacks', desc: 'Curated playlists for each ritual' },
                    { icon: Compass, title: 'State Matching', desc: 'AI selects music for your intention' },
                    { icon: Headphones, title: 'Custom Tracks', desc: 'Generate unique sonic landscapes' },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <feature.icon className="w-5 h-5 text-amber-400 stroke-[1.5] mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                        <p className="text-xs text-white/55 mt-0.5">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          EMAIL CAPTURE - Ritual Playbook
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/5 to-black" />

        <div className="relative max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-[0.15em]">
              <BookOpen className="w-3.5 h-3.5" />
              Free Download
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Get the Complete<br />
              <span className="text-amber-400">Ritual Playbook</span>
            </h2>

            <p className="text-white/50 max-w-md mx-auto">
              Every protocol, frequency recommendation, and integration tip.
              Start transforming your practice today.
            </p>

            <div className="pt-4 max-w-sm mx-auto">
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="Get the Playbook"
                redirectTo="/thank-you"
                showName={false}
              />
            </div>

            <p className="text-xs text-white/50 pt-2">
              PDF guide + audio companions. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-8"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Your Practice<br />
              <span className="text-amber-400">Starts Now</span>
            </h2>

            <p className="text-xl text-white/55 max-w-xl mx-auto">
              Choose one ritual. Start today.
              Watch consistency transform your creative life.
            </p>

            <Link
              href={`/rituals/${recommendedRitual}`}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm uppercase tracking-wider hover:shadow-2xl hover:shadow-amber-500/30 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Start {rituals.find(r => r.id === recommendedRitual)?.title}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-sm text-white/50 flex items-center justify-center gap-2 pt-4">
              <Heart className="w-4 h-4" />
              Join 5,000+ creators practicing daily
            </p>
          </motion.div>
        </div>

        {/* Gold line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </section>
    </div>
  );
}
