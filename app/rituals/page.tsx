'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sun,
  Moon,
  Music,
  Sparkles,
  Clock,
  Zap,
  ArrowRight,
  Calendar,
  Heart,
  Brain,
  Coffee,
  Flame,
  Stars,
  Play,
  BookOpen,
  Target,
  Lightbulb,
  Timer,
  Waves,
  Volume2,
  Headphones,
  Sunrise,
  Sunset,
  Crown
} from 'lucide-react';
import { EmailSignup } from '@/components/email-signup';

// Premium motion presets (matching Golden Age)
const premiumTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const hoverScale = {
  scale: 1.02,
  transition: premiumTransition,
};

const tapScale = {
  scale: 0.98,
  transition: premiumTransition,
};

// Ritual Categories Data
const ritualCategories = [
  {
    id: 'morning',
    title: 'Morning Activation',
    subtitle: 'Start with Intention',
    icon: Sunrise,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 via-transparent to-orange-500/10',
    description: 'Energize your creative system with sound frequencies, breathwork, and intention setting before the world wakes up.',
    duration: '15-30 min',
    rituals: [
      { name: 'Sunrise Frequency Bath', duration: '10 min', type: 'audio' },
      { name: 'Creative Intention Setting', duration: '5 min', type: 'journal' },
      { name: 'Energy Activation Breathwork', duration: '5-10 min', type: 'practice' },
    ],
    featured: true,
  },
  {
    id: 'creative-flow',
    title: 'Creative Flow State',
    subtitle: 'Enter the Zone',
    icon: Flame,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 via-transparent to-red-500/10',
    description: 'Transition rituals that signal your nervous system it\'s time to create. Remove friction. Enter flow.',
    duration: '5-15 min',
    rituals: [
      { name: 'Flow State Activation Track', duration: '5 min', type: 'audio' },
      { name: 'Workspace Clearing Protocol', duration: '3 min', type: 'practice' },
      { name: 'Creative Vision Priming', duration: '5 min', type: 'journal' },
    ],
  },
  {
    id: 'music-creation',
    title: 'Music Creation Sessions',
    subtitle: 'Studio Rituals',
    icon: Music,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-500/10 via-transparent to-purple-500/10',
    description: 'Sonic rituals for producers and musicians. Tune your ears, prime your creativity, and enter the studio mindset.',
    duration: '10-20 min',
    rituals: [
      { name: 'Ear Tuning Frequency Sweep', duration: '5 min', type: 'audio' },
      { name: 'Genre Mood Board Exploration', duration: '10 min', type: 'practice' },
      { name: 'Production Intention Setting', duration: '5 min', type: 'journal' },
    ],
  },
  {
    id: 'focus-deep-work',
    title: 'Focus & Deep Work',
    subtitle: 'Eliminate Distraction',
    icon: Target,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/10 via-transparent to-blue-500/10',
    description: 'Protocols for knowledge workers and builders. Block distractions, sharpen focus, and ship meaningful work.',
    duration: '10-25 min',
    rituals: [
      { name: 'Focus Frequency Stack', duration: '10 min', type: 'audio' },
      { name: 'Deep Work Block Setup', duration: '5 min', type: 'practice' },
      { name: 'Single Task Commitment', duration: '5 min', type: 'journal' },
    ],
  },
  {
    id: 'transition',
    title: 'Transition Rituals',
    subtitle: 'Reset Between Sessions',
    icon: Waves,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-500/10 via-transparent to-teal-500/10',
    description: 'Audio-based reset protocols between different types of work. Clear the mental cache. Start fresh.',
    duration: '3-10 min',
    rituals: [
      { name: 'Neural Reset Soundscape', duration: '3 min', type: 'audio' },
      { name: 'Micro-Movement Break', duration: '5 min', type: 'practice' },
      { name: 'Context Switch Protocol', duration: '2 min', type: 'practice' },
    ],
  },
  {
    id: 'evening',
    title: 'Evening Integration',
    subtitle: 'Close with Clarity',
    icon: Sunset,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-500/10 via-transparent to-purple-600/10',
    description: 'Wind down with intention. Review wins, capture insights, and signal your system that the creative day is complete.',
    duration: '15-30 min',
    rituals: [
      { name: 'Evening Frequency Descent', duration: '10 min', type: 'audio' },
      { name: 'Win & Insight Capture', duration: '10 min', type: 'journal' },
      { name: 'Tomorrow Intention Seed', duration: '5 min', type: 'practice' },
    ],
  },
];

// Weekly Rituals
const weeklyRituals = [
  {
    day: 'Monday',
    name: 'Week Activation',
    description: 'Set weekly creative intentions and theme',
    icon: Zap,
  },
  {
    day: 'Wednesday',
    name: 'Mid-Week Calibration',
    description: 'Course correct and refocus energy',
    icon: Target,
  },
  {
    day: 'Friday',
    name: 'Creative Review',
    description: 'Celebrate wins and capture learnings',
    icon: Stars,
  },
  {
    day: 'Sunday',
    name: 'Soul Alignment',
    description: 'Connect with purpose and vision',
    icon: Heart,
  },
];

// Ritual Type Icons
const ritualTypeIcons = {
  audio: Volume2,
  journal: BookOpen,
  practice: Play,
};

// Premium Bento Card for Rituals
function RitualCard({
  ritual,
  index,
  isFeatured = false
}: {
  ritual: typeof ritualCategories[0];
  index: number;
  isFeatured?: boolean;
}) {
  const Icon = ritual.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={hoverScale}
      whileTap={tapScale}
      className={isFeatured ? 'md:col-span-2 lg:row-span-2' : ''}
    >
      <Link
        href={`#${ritual.id}`}
        className={`group relative flex flex-col h-full overflow-hidden rounded-3xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-500 hover:border-${ritual.color}-400/60 dark:hover:border-${ritual.color}-500/60 hover:shadow-2xl hover:shadow-${ritual.color}-500/10 ${
          isFeatured ? 'p-8 lg:p-10' : 'p-6 lg:p-8'
        }`}
      >
        {/* Premium glassmorphism gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${ritual.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Subtle glow effect */}
        <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${ritual.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />

        <div className="relative flex flex-col h-full justify-between gap-4">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${ritual.gradient} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Timer className="w-3.5 h-3.5" />
                {ritual.duration}
              </span>
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-semibold uppercase tracking-wider text-${ritual.color}-600 dark:text-${ritual.color}-400`}>
                {ritual.subtitle}
              </span>
              <h3 className={`font-serif text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-${ritual.color}-700 dark:group-hover:text-${ritual.color}-300 transition-colors`}>
                {ritual.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className={`text-gray-600 dark:text-gray-400 leading-relaxed ${
            isFeatured ? 'text-base lg:text-lg' : 'text-sm lg:text-base line-clamp-3'
          }`}>
            {ritual.description}
          </p>

          {/* Ritual List (for featured) */}
          {isFeatured && (
            <div className="space-y-3 mt-2">
              {ritual.rituals.map((r, i) => {
                const TypeIcon = ritualTypeIcons[r.type as keyof typeof ritualTypeIcons];
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-gray-700/50">
                    <TypeIcon className={`w-4 h-4 text-${ritual.color}-500`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-grow">{r.name}</span>
                    <span className="text-xs text-gray-500">{r.duration}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer CTA */}
          <div className="flex items-center justify-between pt-2">
            <div className={`flex items-center gap-2 text-sm font-medium text-${ritual.color}-600 dark:text-${ritual.color}-400 group-hover:text-${ritual.color}-700 dark:group-hover:text-${ritual.color}-300 transition-colors`}>
              <Headphones className="w-4 h-4" />
              <span>Explore Ritual</span>
            </div>
            <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-${ritual.color}-600 dark:group-hover:text-${ritual.color}-400 group-hover:translate-x-1 transition-all`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function RitualsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-void">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden"
      >
        {/* Premium Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-slate-950 to-void" />
        <div className="absolute inset-0">
          {/* Ambient orbs */}
          <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/3 rounded-full blur-[200px]" />
        </div>

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/15 to-amber-500/15 text-violet-300 text-sm font-medium border border-violet-500/30 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
              <span className="font-serif-italic">Sacred Creative Practices</span>
              <Music className="w-4 h-4 text-amber-400" />
            </motion.div>

            {/* Title */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-r from-white via-violet-200 to-amber-200 bg-clip-text text-transparent">
                Creative Rituals
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              Transform your creative practice with intentional routines, sonic frequencies, and state-shifting protocols.
            </p>

            {/* Story Hook */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-amber-400 to-transparent rounded-full hidden md:block" />
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed md:pl-6 text-left">
                <span className="text-2xl font-serif text-violet-400 font-medium">Most creators wait for inspiration.</span>{' '}
                <span className="text-gray-400">The ones who ship consistently? They</span>{' '}
                <em className="font-serif-italic text-amber-300 not-italic">create the conditions</em>{' '}
                <span className="text-gray-400">for inspiration to show up. That's what rituals do.</span>
              </p>
            </motion.div>

            {/* Premium Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              {[
                { value: '6', label: 'Ritual Types' },
                { value: '18+', label: 'Protocols' },
                { value: 'Daily', label: 'Practice' },
              ].map((stat, i) => (
                <div key={stat.label} className="relative group">
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-violet-500/30">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={hoverScale} whileTap={tapScale}>
                <Link
                  href="#rituals"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl font-semibold overflow-hidden transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 focus:outline-none focus:ring-4 focus:ring-violet-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Explore Rituals</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={hoverScale} whileTap={tapScale}>
                <Link
                  href="/products/vibe-os"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 border border-white/20 text-white rounded-2xl font-medium hover:bg-white/5 hover:border-white/30 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all backdrop-blur-sm"
                >
                  <Music className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span>Vibe OS Integration</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
      </motion.section>

      {/* Ritual Categories - Premium Bento Grid */}
      <section id="rituals" className="py-24 scroll-mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-slate-950/50 to-void" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium border border-violet-500/20">
              <Clock className="w-4 h-4" />
              Daily Practices
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
                Ritual
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Each ritual is a portal into creative flow. Start where you are.{' '}
              <span className="font-serif-italic text-violet-400/80">Consistency transforms everything.</span>
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {ritualCategories.map((ritual, index) => (
              <RitualCard
                key={ritual.id}
                ritual={ritual}
                index={index}
                isFeatured={ritual.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Rhythm Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-amber-950/10 to-void" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
              <Calendar className="w-4 h-4" />
              Weekly Cadence
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              The Creator's{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Week
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              Beyond daily rituals, these weekly touchpoints keep your creative momentum building.
            </p>
          </motion.div>

          {/* Weekly Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weeklyRituals.map((ritual, index) => {
              const Icon = ritual.icon;
              return (
                <motion.div
                  key={ritual.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={hoverScale}
                  className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-amber-500/30"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                        {ritual.day}
                      </span>
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {ritual.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {ritual.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vibe OS Integration Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-violet-950/20 to-void" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-violet-500/8 rounded-full blur-[200px]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            {/* Card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-amber-500/10 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-violet-500/20 rounded-[2rem]" />

            <div className="relative p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium border border-violet-500/30">
                    <Crown className="w-4 h-4" />
                    <span>Powered by Vibe OS</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    Rituals Come{' '}
                    <span className="bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
                      Alive with Sound
                    </span>
                  </h2>

                  <p className="text-gray-400 leading-relaxed">
                    Every ritual in this system is designed to work with Vibe OS—our AI-powered music creation platform. Get custom frequency tracks, production sessions, and sonic landscapes that match your creative state.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={hoverScale} whileTap={tapScale}>
                      <Link
                        href="/products/vibe-os"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl"
                      >
                        <Music className="w-5 h-5" />
                        Explore Vibe OS
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-4">
                  {[
                    { icon: Volume2, title: 'Frequency Stacks', desc: 'Curated playlists for each ritual type' },
                    { icon: Brain, title: 'State Matching', desc: 'AI selects music based on your intention' },
                    { icon: Headphones, title: 'Custom Tracks', desc: 'Generate unique sonic landscapes' },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <feature.icon className="w-6 h-6 text-violet-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-cyan-950/10 to-void" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-cyan-500/8 rounded-full blur-[200px]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-cyan-500/10 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-cyan-500/20 rounded-[2rem]" />

            <div className="relative p-8 lg:p-12">
              <div className="text-center space-y-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium border border-cyan-500/30"
                >
                  <Lightbulb className="w-4 h-4 animate-pulse" />
                  <span>Free Ritual Guide</span>
                  <Stars className="w-4 h-4" />
                </motion.div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Get the Complete{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    Ritual Playbook
                  </span>
                </h2>

                <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
                  Download our comprehensive guide with every ritual protocol, frequency recommendations, and integration tips.{' '}
                  <span className="font-serif-italic text-cyan-400/80">Start transforming your practice today.</span>
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <EmailSignup
                  listType="newsletter"
                  placeholder="Enter your email"
                  buttonText="Get the Ritual Playbook"
                  redirectTo="/thank-you"
                  showName={false}
                />
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>PDF download</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Audio companions</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-void to-void" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Creative Practice{' '}
              <span className="bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
                Starts Now
              </span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Don't wait for the perfect moment. Choose one ritual.{' '}
              <span className="font-serif-italic text-violet-400/80">Start today.</span>{' '}
              Watch consistency transform your creative life.
            </p>

            <motion.div whileHover={hoverScale} whileTap={tapScale} className="inline-block">
              <Link
                href="#rituals"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Choose Your First Ritual</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="pt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4" />
              <span>Join 5,000+ creators practicing daily</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
