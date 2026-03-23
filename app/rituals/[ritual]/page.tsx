'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowLeft,
  Calendar,
  Heart,
  Zap,
  Stars,
  Play,
  Pause,
  RotateCcw,
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
  Trophy,
  Flame as FireIcon,
  Brain,
  MessageSquare,
  Bot,
  ChevronRight,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// RITUAL DATA
// ═══════════════════════════════════════════════════════════════════════════════

const rituals = {
  morning: {
    id: 'morning',
    title: 'Morning Activation',
    tagline: 'Begin with Fire',
    icon: Sunrise,
    accentClass: 'from-amber-500 to-orange-600',
    glowClass: 'shadow-amber-500/30',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    description: 'Ignite your creative system before the world wakes. Sound frequencies, breathwork, intention setting.',
    longDescription: 'The morning ritual is your foundation for creative excellence. Before checking messages, before the world demands your attention, you create the conditions for flow. This ritual primes your nervous system, clarifies your intention, and generates the energy you need to create at your highest level.',
    duration: '15-30 min',
    videoId: 'faTGTgid8Uc', // Morning routine video
    protocols: [
      {
        name: 'Sunrise Frequency Bath',
        time: 600, // 10 min in seconds
        icon: Volume2,
        description: 'Listen to 528Hz frequencies while allowing natural light to enter your space. Let the sound wash through you.',
        aiPrompt: 'Guide me through a 10-minute sunrise frequency meditation with 528Hz tones.',
      },
      {
        name: 'Intention Ceremony',
        time: 300, // 5 min
        icon: Feather,
        description: 'Write your single most important creative intention for today. What will you create? What will you ship?',
        aiPrompt: 'Help me clarify my creative intention for today. Ask me probing questions to surface what matters most.',
      },
      {
        name: 'Activation Breathwork',
        time: 600, // 10 min
        icon: Wind,
        description: 'Wim Hof style breathing: 30 deep breaths, hold, exhale. Repeat 3 rounds. This oxygenates your brain for peak creativity.',
        aiPrompt: 'Guide me through 3 rounds of activation breathwork with timing cues.',
      },
    ],
    weeklyFocus: 'Perfect for Monday Week Ignition',
    nextRitual: 'flow',
  },
  flow: {
    id: 'flow',
    title: 'Creative Flow State',
    tagline: 'Enter the Zone',
    icon: Flame,
    accentClass: 'from-orange-500 to-red-600',
    glowClass: 'shadow-orange-500/30',
    borderClass: 'border-orange-500/30',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    description: 'Transition rituals that signal your nervous system. Remove friction. Enter flow.',
    longDescription: 'Flow doesn\'t happen by accident. It\'s engineered through environmental cues and transition rituals that tell your brain: it\'s time to create. This ritual clears the mental cache, eliminates distractions, and creates the conditions where your best work emerges.',
    duration: '5-15 min',
    videoId: null,
    protocols: [
      {
        name: 'Flow Activation Track',
        time: 300,
        icon: Music,
        description: 'Play your designated flow state music. This becomes a Pavlovian cue for deep work.',
        aiPrompt: 'Recommend flow state music tracks for creative coding and writing work.',
      },
      {
        name: 'Space Clearing Protocol',
        time: 180,
        icon: Wind,
        description: 'Clear your physical space. Close tabs. Put phone in another room. Create a sanctuary for focus.',
        aiPrompt: 'Help me create a distraction-free environment checklist for deep creative work.',
      },
      {
        name: 'Vision Priming',
        time: 300,
        icon: Eye,
        description: 'Spend 5 minutes visualizing yourself completing today\'s creative work. See the finished product.',
        aiPrompt: 'Guide me through a creative visualization exercise for my current project.',
      },
    ],
    weeklyFocus: 'Use before any creative session',
    nextRitual: 'music',
  },
  music: {
    id: 'music',
    title: 'Studio Sessions',
    tagline: 'Tune Your Instrument',
    icon: Music,
    accentClass: 'from-violet-500 to-purple-600',
    glowClass: 'shadow-violet-500/30',
    borderClass: 'border-violet-500/30',
    textClass: 'text-violet-400',
    bgClass: 'bg-violet-500/10',
    description: 'Sonic rituals for producers and musicians. Tune your ears, prime creativity, enter the studio mindset.',
    longDescription: 'Before you create music, you must become the instrument. This ritual tunes your ears, explores sonic possibilities, and sets a clear production intention. Whether you\'re working with Suno AI or traditional DAWs, these protocols prepare you for peak musical output.',
    duration: '10-20 min',
    videoId: null,
    protocols: [
      {
        name: 'Ear Tuning Sweep',
        time: 300,
        icon: Headphones,
        description: 'Listen to a frequency sweep from 20Hz to 20kHz. Then play reference tracks in your target genre.',
        aiPrompt: 'Help me select 3 reference tracks for my current music production genre.',
      },
      {
        name: 'Genre Mood Exploration',
        time: 600,
        icon: Compass,
        description: 'Explore 3-5 tracks in your target genre. Note what makes them work. What emotion do they evoke?',
        aiPrompt: 'Analyze the sonic elements that make [genre] tracks emotionally impactful.',
      },
      {
        name: 'Production Intention',
        time: 300,
        icon: Target,
        description: 'Write down: What track are you making? What emotion should it evoke? Who is it for?',
        aiPrompt: 'Help me write a detailed Suno AI prompt for my next track based on my genre and emotional goals.',
      },
    ],
    weeklyFocus: 'Perfect before Suno AI sessions',
    nextRitual: 'focus',
  },
  focus: {
    id: 'focus',
    title: 'Deep Work Focus',
    tagline: 'Eliminate All Else',
    icon: Target,
    accentClass: 'from-cyan-500 to-blue-600',
    glowClass: 'shadow-cyan-500/30',
    borderClass: 'border-cyan-500/30',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    description: 'Protocols for builders. Block distractions, sharpen focus, ship meaningful work.',
    longDescription: 'Deep work is the superpower of our age. While others fragment their attention across notifications and meetings, you will build. This ritual creates an impenetrable focus bubble where your most important work gets done.',
    duration: '10-25 min',
    videoId: null,
    protocols: [
      {
        name: 'Focus Frequency Stack',
        time: 600,
        icon: Volume2,
        description: 'Start binaural beats or brown noise. This creates an auditory cocoon that blocks external distractions.',
        aiPrompt: 'Recommend the best focus music or ambient sounds for coding and writing.',
      },
      {
        name: 'Deep Work Block Setup',
        time: 300,
        icon: Clock,
        description: 'Set a 90-minute timer. Define exactly what you will complete. No switching tasks.',
        aiPrompt: 'Help me break down my current project into a single 90-minute deep work block.',
      },
      {
        name: 'Single Task Lock',
        time: 300,
        icon: Target,
        description: 'Write your ONE task on paper. Close all unrelated apps. This is your only focus for the next 90 minutes.',
        aiPrompt: 'Help me identify my single highest-leverage task for this deep work session.',
      },
    ],
    weeklyFocus: 'Use multiple times per day',
    nextRitual: 'transition',
  },
  transition: {
    id: 'transition',
    title: 'Neural Reset',
    tagline: 'Clear the Cache',
    icon: Waves,
    accentClass: 'from-emerald-500 to-teal-600',
    glowClass: 'shadow-emerald-500/30',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    description: 'Audio-based reset between work sessions. Clear mental cache. Start completely fresh.',
    longDescription: 'Your brain needs transitions. Working continuously without reset leads to diminished creativity and decision fatigue. This ritual clears the mental residue from your last session so you can approach your next task with fresh eyes.',
    duration: '3-10 min',
    videoId: null,
    protocols: [
      {
        name: 'Neural Reset Sound',
        time: 180,
        icon: Waves,
        description: 'Listen to nature sounds or pink noise. Let your mind wander without direction.',
        aiPrompt: 'Recommend calming reset sounds for between work sessions.',
      },
      {
        name: 'Micro-Movement',
        time: 300,
        icon: Wind,
        description: 'Stand up. Stretch. Walk around. Get blood flowing to refresh your neural pathways.',
        aiPrompt: 'Guide me through a 5-minute desk stretch routine to reset my body and mind.',
      },
      {
        name: 'Context Switch',
        time: 120,
        icon: Compass,
        description: 'Mentally close the last project. Open space for what comes next.',
        aiPrompt: 'Help me mentally close out my last work session and prepare for the next.',
      },
    ],
    weeklyFocus: 'Between all work sessions',
    nextRitual: 'evening',
  },
  evening: {
    id: 'evening',
    title: 'Evening Integration',
    tagline: 'Close with Clarity',
    icon: Sunset,
    accentClass: 'from-indigo-500 to-purple-700',
    glowClass: 'shadow-indigo-500/30',
    borderClass: 'border-indigo-500/30',
    textClass: 'text-indigo-400',
    bgClass: 'bg-indigo-500/10',
    description: 'Wind down with intention. Capture insights. Signal your system that creation is complete.',
    longDescription: 'How you end the day determines how you begin the next. This ritual captures your wins, processes what you learned, and plants seeds for tomorrow\'s creation. It signals to your nervous system that creative work is done, allowing true rest.',
    duration: '15-30 min',
    videoId: null,
    protocols: [
      {
        name: 'Frequency Descent',
        time: 600,
        icon: Moon,
        description: 'Play calming frequencies that bring your energy down. 432Hz or theta waves work well.',
        aiPrompt: 'Recommend evening wind-down music or frequencies for creative recovery.',
      },
      {
        name: 'Win Capture',
        time: 600,
        icon: BookOpen,
        description: 'Write 3 wins from today. What did you create? What did you ship? What did you learn?',
        aiPrompt: 'Help me reflect on my creative day and identify my top 3 wins.',
      },
      {
        name: 'Tomorrow Seed',
        time: 300,
        icon: Feather,
        description: 'Plant one seed for tomorrow. What is the first creative act you\'ll do?',
        aiPrompt: 'Help me identify the perfect first creative task for tomorrow morning.',
      },
    ],
    weeklyFocus: 'Every evening to close the creative day',
    nextRitual: 'morning',
  },
};

type RitualKey = keyof typeof rituals;

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
  // Reset if it's a new day
  if (parsed.date !== getToday()) {
    return { date: getToday(), completed: [], protocolsCompleted: {} };
  }
  return parsed;
}

function saveProgress(progress: DailyProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ritualProgress', JSON.stringify(progress));
}

function getStreak(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem('ritualStreak');
  return stored ? parseInt(stored, 10) : 0;
}

function incrementStreak() {
  if (typeof window === 'undefined') return;
  const lastCompleted = localStorage.getItem('lastRitualCompletion');
  const today = getToday();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastCompleted === today) return; // Already incremented today

  let streak = getStreak();
  if (lastCompleted === yesterdayStr) {
    streak += 1;
  } else if (lastCompleted !== today) {
    streak = 1; // Reset streak
  }

  localStorage.setItem('ritualStreak', streak.toString());
  localStorage.setItem('lastRitualCompletion', today);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROTOCOL TIMER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function ProtocolTimer({
  protocol,
  index,
  isCompleted,
  onComplete,
  accentClass,
  textClass,
}: {
  protocol: typeof rituals.morning.protocols[0];
  index: number;
  isCompleted: boolean;
  onComplete: () => void;
  accentClass: string;
  textClass: string;
}) {
  const [timeLeft, setTimeLeft] = useState(protocol.time);
  const [isRunning, setIsRunning] = useState(false);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const Icon = protocol.icon;

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((protocol.time - timeLeft) / protocol.time) * 100;

  const handleReset = () => {
    setTimeLeft(protocol.time);
    setIsRunning(false);
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isCompleted
          ? 'border-emerald-500/40 bg-emerald-500/5'
          : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
      }`}
    >
      {/* Progress bar background */}
      {!isCompleted && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${accentClass} opacity-10`}
          style={{ width: `${progress}%` }}
        />
      )}

      <div className="relative p-5 lg:p-6">
        <div className="flex items-start gap-4">
          {/* Step number / completion */}
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400'
                : `bg-gradient-to-br ${accentClass} p-[1px]`
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white/90" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-grow space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-white">{protocol.name}</h4>
                <p className="text-sm text-white/50 mt-1">{protocol.description}</p>
              </div>
              <span className={`text-2xl font-mono font-bold ${isCompleted ? 'text-emerald-400' : textClass}`}>
                {isCompleted ? '✓' : formatTime(timeLeft)}
              </span>
            </div>

            {/* Controls */}
            {!isCompleted && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isRunning
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : `bg-gradient-to-r ${accentClass} text-black hover:opacity-90`
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      {timeLeft < protocol.time ? 'Resume' : 'Start'}
                    </>
                  )}
                </button>

                {timeLeft < protocol.time && (
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={onComplete}
                  className="ml-auto px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium text-sm hover:bg-emerald-500/20 transition-all"
                >
                  Mark Complete
                </button>
              </div>
            )}

            {/* AI Prompt Section */}
            <div className="pt-2 border-t border-white/[0.04]">
              <button
                onClick={() => setShowAiPrompt(!showAiPrompt)}
                className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                AI Guidance
                <ChevronRight className={`w-3 h-3 transition-transform ${showAiPrompt ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {showAiPrompt && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/20"
                  >
                    <p className="text-xs text-violet-300 font-medium mb-2">Ask Claude:</p>
                    <p className="text-sm text-white/70 italic">"{protocol.aiPrompt}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// YOUTUBE EMBED COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function RitualDetailPage() {
  const params = useParams();
  const ritualSlug = params.ritual as string;

  // Validate ritual exists
  if (!rituals[ritualSlug as RitualKey]) {
    notFound();
  }

  const ritual = rituals[ritualSlug as RitualKey];
  const Icon = ritual.icon;

  // Progress state
  const [progress, setProgress] = useState<DailyProgress>({ date: getToday(), completed: [], protocolsCompleted: {} });
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setStreak(getStreak());
  }, []);

  const completedProtocols = progress.protocolsCompleted[ritual.id] || [];
  const isRitualComplete = progress.completed.includes(ritual.id);
  const allProtocolsComplete = completedProtocols.length === ritual.protocols.length;

  const handleProtocolComplete = (protocolName: string) => {
    const newProgress = { ...progress };
    if (!newProgress.protocolsCompleted[ritual.id]) {
      newProgress.protocolsCompleted[ritual.id] = [];
    }
    if (!newProgress.protocolsCompleted[ritual.id].includes(protocolName)) {
      newProgress.protocolsCompleted[ritual.id].push(protocolName);
    }
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleRitualComplete = () => {
    const newProgress = { ...progress };
    if (!newProgress.completed.includes(ritual.id)) {
      newProgress.completed.push(ritual.id);
      incrementStreak();
      setStreak(getStreak());
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-center space-y-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 3, duration: 0.3 }}
              >
                <Trophy className="w-24 h-24 text-amber-400 mx-auto" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">Ritual Complete!</h2>
              <p className="text-white/60">
                {streak > 1 ? `${streak} day streak!` : 'First step on your journey'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-60">
          <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${ritual.accentClass} opacity-[0.07] rounded-full blur-[150px]`} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/rituals"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rituals
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ritual.accentClass} p-[1px]`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${ritual.textClass}`}>
                  {ritual.tagline}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">{ritual.title}</h1>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-sm text-white/50">
                <Timer className="w-4 h-4" />
                {ritual.duration}
              </span>
              <span className="flex items-center gap-2 text-sm text-white/50">
                <Calendar className="w-4 h-4" />
                {ritual.weeklyFocus}
              </span>
              {isRitualComplete && (
                <span className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed Today
                </span>
              )}
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg text-white/60 leading-relaxed max-w-2xl">
              {ritual.longDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          VIDEO SECTION (for rituals with video)
          ════════════════════════════════════════════════════════════════════════ */}
      {ritual.videoId && (
        <section className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-amber-400" />
                Morning Routine Guide
              </h2>
              <YouTubeEmbed videoId={ritual.videoId} title={`${ritual.title} Video Guide`} />
              <p className="text-sm text-white/40">
                Watch this video to understand the morning activation ritual, then follow the timed protocols below.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          PROTOCOLS SECTION
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Protocols</h2>
              <span className="text-sm text-white/50">
                {completedProtocols.length}/{ritual.protocols.length} complete
              </span>
            </div>

            <div className="space-y-4">
              {ritual.protocols.map((protocol, index) => (
                <ProtocolTimer
                  key={protocol.name}
                  protocol={protocol}
                  index={index}
                  isCompleted={completedProtocols.includes(protocol.name)}
                  onComplete={() => handleProtocolComplete(protocol.name)}
                  accentClass={ritual.accentClass}
                  textClass={ritual.textClass}
                />
              ))}
            </div>

            {/* Complete Ritual CTA */}
            {allProtocolsComplete && !isRitualComplete && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleRitualComplete}
                className={`w-full py-5 rounded-2xl bg-gradient-to-r ${ritual.accentClass} text-black font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity`}
              >
                <Trophy className="w-6 h-6" />
                Complete {ritual.title} Ritual
              </motion.button>
            )}

            {isRitualComplete && (
              <div className="text-center py-8 space-y-4">
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="text-xl font-semibold">Ritual Complete</span>
                </div>
                {ritual.nextRitual && (
                  <Link
                    href={`/rituals/${ritual.nextRitual}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:bg-white/[0.03] transition-colors"
                  >
                    Next: {rituals[ritual.nextRitual as RitualKey].title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          AI COMPANION SECTION
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 lg:p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-violet-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">AI Ritual Companion</h3>
                <p className="text-white/50">
                  Need guidance? Claude can help you with any part of this ritual. Try these prompts:
                </p>
                <div className="space-y-2">
                  {ritual.protocols.map((p) => (
                    <div
                      key={p.name}
                      className="p-3 rounded-lg bg-black/40 border border-white/[0.04] text-sm text-white/70"
                    >
                      "{p.aiPrompt}"
                    </div>
                  ))}
                </div>
                <Link
                  href="/agents"
                  className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Connect with your AI Agent Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STREAK & PROGRESS FOOTER
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <FireIcon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">Current Streak</p>
                <p className="text-2xl font-bold text-white">{streak} days</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white/50">Today's Progress</p>
                <p className="text-lg font-semibold text-white">
                  {progress.completed.length}/6 rituals
                </p>
              </div>
              <Link
                href="/rituals"
                className="px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
