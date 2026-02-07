'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Brain,
  Zap,
  Heart,
  TrendingUp,
  Users,
  Archive,
  Check,
  ArrowRight,
} from 'lucide-react';
import PremiumCard from '@/components/ui/PremiumCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    pillarScores: Record<string, number>;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'When do you feel most alive and energized?',
    options: [
      {
        label: 'After a great workout or physical activity',
        value: 'physical',
        pillarScores: { energy: 3, mind: 1, soul: 1, craft: 0, capital: 0, circle: 0, legacy: 0 },
      },
      {
        label: 'When solving complex problems or learning something new',
        value: 'mental',
        pillarScores: { energy: 0, mind: 3, soul: 1, craft: 2, capital: 1, circle: 0, legacy: 0 },
      },
      {
        label: 'When connecting deeply with someone I care about',
        value: 'relational',
        pillarScores: { energy: 0, mind: 0, soul: 2, craft: 0, capital: 0, circle: 3, legacy: 1 },
      },
      {
        label: 'When creating something meaningful that will outlast me',
        value: 'legacy',
        pillarScores: { energy: 1, mind: 1, soul: 3, craft: 2, capital: 1, circle: 1, legacy: 3 },
      },
    ],
  },
  {
    id: 2,
    question: 'What keeps you up at night?',
    options: [
      {
        label: 'Not enough time to accomplish everything I want',
        value: 'time',
        pillarScores: { energy: 2, mind: 1, soul: 1, craft: 3, capital: 2, circle: 1, legacy: 1 },
      },
      {
        label: 'Financial worries and not building enough wealth',
        value: 'financial',
        pillarScores: { energy: 1, mind: 1, soul: 0, craft: 2, capital: 3, circle: 1, legacy: 1 },
      },
      {
        label: 'Feeling disconnected from my purpose or meaning',
        value: 'purpose',
        pillarScores: { energy: 1, mind: 2, soul: 3, craft: 1, capital: 0, circle: 1, legacy: 2 },
      },
      {
        label: 'Relationships that need attention and repair',
        value: 'relationships',
        pillarScores: { energy: 0, mind: 1, soul: 2, craft: 0, capital: 0, circle: 3, legacy: 1 },
      },
    ],
  },
  {
    id: 3,
    question: 'If you could improve one area of your life immediately, what would it be?',
    options: [
      {
        label: 'My physical health and energy levels',
        value: 'health',
        pillarScores: { energy: 3, mind: 1, soul: 1, craft: 1, capital: 1, circle: 1, legacy: 0 },
      },
      {
        label: 'My mental clarity and focus',
        value: 'clarity',
        pillarScores: { energy: 1, mind: 3, soul: 1, craft: 2, capital: 1, circle: 0, legacy: 0 },
      },
      {
        label: 'My sense of purpose and fulfillment',
        value: 'purpose',
        pillarScores: { energy: 1, mind: 1, soul: 3, craft: 1, capital: 0, circle: 1, legacy: 2 },
      },
      {
        label: 'My relationships and community',
        value: 'community',
        pillarScores: { energy: 0, mind: 0, soul: 2, craft: 0, capital: 0, circle: 3, legacy: 1 },
      },
    ],
  },
  {
    id: 4,
    question: 'How do you typically spend your free time?',
    options: [
      {
        label: 'Working on passion projects or skill development',
        value: 'work',
        pillarScores: { energy: 1, mind: 2, soul: 2, craft: 3, capital: 2, circle: 0, legacy: 1 },
      },
      {
        label: 'With friends, family, or in community',
        value: 'social',
        pillarScores: { energy: 1, mind: 0, soul: 2, craft: 0, capital: 1, circle: 3, legacy: 1 },
      },
      {
        label: 'Learning, reading, or personal growth activities',
        value: 'learning',
        pillarScores: { energy: 1, mind: 3, soul: 1, craft: 2, capital: 1, circle: 0, legacy: 1 },
      },
      {
        label: 'Spiritual practices, meditation, or self-reflection',
        value: 'spiritual',
        pillarScores: { energy: 2, mind: 2, soul: 3, craft: 0, capital: 0, circle: 1, legacy: 1 },
      },
    ],
  },
  {
    id: 5,
    question: 'What does success look like for you?',
    options: [
      {
        label: 'Financial abundance and freedom',
        value: 'financial',
        pillarScores: { energy: 1, mind: 1, soul: 0, craft: 2, capital: 3, circle: 1, legacy: 1 },
      },
      {
        label: 'Mastery and recognition in my field',
        value: 'mastery',
        pillarScores: { energy: 1, mind: 2, soul: 1, craft: 3, capital: 1, circle: 1, legacy: 2 },
      },
      {
        label: 'Making a meaningful impact on others',
        value: 'impact',
        pillarScores: { energy: 1, mind: 1, soul: 3, craft: 1, capital: 1, circle: 2, legacy: 3 },
      },
      {
        label: 'Inner peace and living in alignment with my values',
        value: 'peace',
        pillarScores: { energy: 2, mind: 2, soul: 3, craft: 1, capital: 0, circle: 1, legacy: 1 },
      },
    ],
  },
];

interface LifeBookResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pillars: string[];
  icon: typeof Sparkles;
  color: string;
}

const lifeBooks: LifeBookResult[] = [
  {
    id: 'creator',
    title: 'The Creator\'s Path',
    subtitle: 'Mastery Through Making',
    description:
      'You are driven by the need to create and build. Your Life Book focuses on developing your craft, leaving a legacy through your work, and achieving mastery that inspires others.',
    pillars: ['craft', 'legacy', 'soul'],
    icon: Sparkles,
    color: 'amber',
  },
  {
    id: 'connector',
    title: 'The Connector\'s Way',
    subtitle: 'Strength Through Relationships',
    description:
      'You thrive on meaningful connections and community. Your Life Book emphasizes building your circle, nurturing relationships, and creating value through collaboration.',
    pillars: ['circle', 'soul', 'legacy'],
    icon: Heart,
    color: 'gold',
  },
  {
    id: 'builder',
    title: 'The Builder\'s Blueprint',
    subtitle: 'Wealth Through Systems',
    description:
      'You are focused on building tangible results and wealth. Your Life Book centers on capital accumulation, creating systems that generate value, and financial freedom.',
    pillars: ['capital', 'craft', 'energy'],
    icon: TrendingUp,
    color: 'amber',
  },
  {
    id: 'sage',
    title: 'The Sage\'s Journey',
    subtitle: 'Wisdom Through Understanding',
    description:
      'You seek understanding and mental clarity above all. Your Life Book prioritizes mind development, continuous learning, and sharing wisdom with others.',
    pillars: ['mind', 'soul', 'legacy'],
    icon: Brain,
    color: 'gold',
  },
  {
    id: 'warrior',
    title: 'The Warrior\'s Code',
    subtitle: 'Power Through Discipline',
    description:
      'You believe in disciplined action and physical excellence. Your Life Book focuses on energy mastery, mental toughness, and achieving goals through consistent effort.',
    pillars: ['energy', 'mind', 'craft'],
    icon: Zap,
    color: 'amber',
  },
  {
    id: 'guardian',
    title: 'The Guardian\'s Legacy',
    subtitle: 'Protection Through Stewardship',
    description:
      'You are called to protect, guide, and leave something for future generations. Your Life Book emphasizes legacy building, mentorship, and creating lasting systems.',
    pillars: ['legacy', 'circle', 'capital'],
    icon: Archive,
    color: 'gold',
  },
];

const calculateResult = (answers: Record<number, string>): LifeBookResult => {
  const scores: Record<string, number> = {
    energy: 0,
    mind: 0,
    soul: 0,
    craft: 0,
    capital: 0,
    circle: 0,
    legacy: 0,
  };

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find((q) => q.id === parseInt(questionId));
    if (question) {
      const selectedOption = question.options.find((o) => o.value === answerValue);
      if (selectedOption) {
        Object.entries(selectedOption.pillarScores).forEach(([pillar, score]) => {
          scores[pillar] += score;
        });
      }
    }
  });

  const pillarScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([pillar]) => pillar);

  const matchingBook = lifeBooks.find((book) =>
    book.pillars.every((p) => pillarScores.includes(p))
  );

  return matchingBook || lifeBooks[0];
};

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<LifeBookResult | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const calculatedResult = calculateResult(answers);
      setResult(calculatedResult);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const canProceed = answers[currentQuestion] !== undefined;

  if (showResult && result) {
    const Icon = result.icon;

    return (
      <div className="min-h-screen bg-[#030712] py-20 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/soulbook/hero-assessment.png"
            alt="Soulbook assessment background"
            fill
            className="object-cover opacity-20"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/80 to-[#030712]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <PremiumCard glass="heavy" gradient="purple" className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div
                  className={cn(
                    'inline-flex p-4 rounded-2xl mb-6',
                    result.color === 'amber'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-gold-500/20 text-gold-400'
                  )}
                >
                  <Icon className="w-12 h-12" />
                </div>
                <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
                  Your Life Book
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {result.title}
                </h1>
                <p className="text-xl text-gold-400">{result.subtitle}</p>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto">
                {result.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {result.pillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="bg-slate-800/50 rounded-lg p-4 text-center"
                  >
                    <span className="capitalize text-amber-400 font-medium">{pillar}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PremiumButton variant="primary" size="lg" className="group">
                  Start Your {result.title}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </PremiumButton>
                <PremiumButton variant="ghost" size="lg">
                  Explore All Life Books
                </PremiumButton>
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion - 1];
  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/soulbook/hero-assessment.png"
          alt="Soulbook assessment background"
          fill
          className="object-cover opacity-15"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/70 to-[#030712]" />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-gold-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Counter */}
      <div className="relative z-10 pt-8 pb-4 px-4 text-center">
        <span className="text-slate-500 text-sm">
          Question {currentQuestion} of {questions.length}
        </span>
      </div>

      {/* Question Section */}
      <section className="relative z-10 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PremiumCard gradient="gold" mouseGlow={true} shine={true}>
              <PremiumCard glass="medium" className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  {question.question}
                </h2>

                <div className="space-y-4">
                  {question.options.map((option, idx) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(option.value)}
                      className={cn(
                        'w-full p-4 rounded-xl text-left transition-all duration-200',
                        'border border-slate-700/50 bg-slate-800/30',
                        'hover:bg-slate-800/60 hover:border-amber-500/30',
                        'focus:outline-none focus:ring-2 focus:ring-amber-500/50',
                        answers[currentQuestion] === option.value &&
                          'bg-amber-500/10 border-amber-500/50'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                            answers[currentQuestion] === option.value
                              ? 'border-amber-500 bg-amber-500'
                              : 'border-slate-600'
                          )}
                        >
                          {answers[currentQuestion] === option.value && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-slate-200">{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </PremiumCard>
            </PremiumCard>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="relative z-10 py-8 px-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <PremiumButton
            variant="ghost"
            size="md"
            onClick={handlePrevious}
            disabled={currentQuestion === 1}
            className={currentQuestion === 1 ? 'opacity-50' : ''}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </PremiumButton>

          <PremiumButton
            variant="primary"
            size="md"
            onClick={handleNext}
            disabled={!canProceed}
            className={!canProceed ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {currentQuestion === questions.length ? 'See Results' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </PremiumButton>
        </div>
      </section>
    </div>
  );
}
