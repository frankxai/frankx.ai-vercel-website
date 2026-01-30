'use client';

import { useState } from 'react';
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
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  ArrowRight,
} from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import InteractiveCard from '@/components/ui/InteractiveCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { cn } from '@/lib/utils';

interface Pillar {
  id: string;
  title: string;
  icon: typeof Zap;
  description: string;
  fullDescription: string;
  assessmentQuestion: string;
  resources: string[];
  color: string;
  image: string;
}

const pillars: Pillar[] = [
  {
    id: 'energy',
    title: 'Energy',
    icon: Zap,
    description: 'Master your physical and vital energy through breathwork, nutrition, and movement.',
    fullDescription: 'Energy is the foundation of all achievement. This pillar covers your physical vitality, sleep quality, exercise routines, and the biochemical rhythms that govern your daily performance. By optimizing your energy systems, you unlock unprecedented capacity for creative and intellectual work.',
    assessmentQuestion: 'How would you rate your current energy levels throughout the day?',
    resources: [
      'Morning Energy Ritual Guide',
      'Sleep Optimization Protocol',
      'Breathwork Techniques for Focus',
      'Nutritional Guidelines for Cognitive Performance',
    ],
    color: 'amber',
    image: '/images/soulbook/pillar-vitality.png',
  },
  {
    id: 'mind',
    title: 'Mind',
    icon: Brain,
    description: 'Develop mental clarity, cognitive edge, and psychological resilience.',
    fullDescription: 'The Mind pillar encompasses your cognitive capabilities, thought patterns, and mental models. It includes meditation practices, mindfulness techniques, cognitive training exercises, and strategies for managing stress, anxiety, and psychological blocks that limit your potential.',
    assessmentQuestion: 'What mental patterns most frequently hold you back from peak performance?',
    resources: [
      'Meditation Foundation Course',
      'Cognitive Reframing Techniques',
      'Focus Enhancement Strategies',
      'Stress Management Toolkit',
    ],
    color: 'gold',
    image: '/images/soulbook/pillar-consciousness.png',
  },
  {
    id: 'soul',
    title: 'Soul',
    icon: Sparkles,
    description: 'Connect with your deeper purpose and spiritual essence.',
    fullDescription: 'The Soul pillar addresses your connection to meaning, purpose, and the transcendent. It explores your values, your sense of mission, and the alignment between your actions and your deepest convictions. This is where lasting fulfillment and inner peace are cultivated.',
    assessmentQuestion: 'What activities make you lose track of time and feel most alive?',
    resources: [
      'Values Discovery Workbook',
      'Purpose Alignment Framework',
      'Gratitude Practice Guide',
      'Spiritual Growth Meditation Series',
    ],
    color: 'amber',
    image: '/images/soulbook/pillar-emotional-mastery.png',
  },
  {
    id: 'craft',
    title: 'Craft',
    icon: Wrench,
    description: 'Build mastery in your skills and professional capabilities.',
    fullDescription: 'Craft represents your professional competence and skill development. This pillar focuses on deliberate practice, continuous learning, and the pursuit of mastery in your chosen field. It encompasses technical skills, soft skills, and the habits that compound into exceptional performance.',
    assessmentQuestion: 'What skill, if mastered, would most transform your life and work?',
    resources: [
      'Deliberate Practice Framework',
      'Skill Acquisition Roadmap',
      'Professional Development Plan',
      'Mastery Tracking System',
    ],
    color: 'gold',
    image: '/images/soulbook/pillar-creation.png',
  },
  {
    id: 'capital',
    title: 'Capital',
    icon: TrendingUp,
    description: 'Build and manage financial, social, and intellectual capital.',
    fullDescription: 'Capital encompasses all forms of wealth generation and preservation. This includes financial assets, social capital (your network and relationships), intellectual capital (knowledge and ideas), and the skills required to multiply and protect these resources across all dimensions.',
    assessmentQuestion: 'What aspect of capital building feels most neglected in your current life?',
    resources: [
      'Financial Freedom Blueprint',
      'Network Building Playbook',
      'Intellectual Property Strategy',
      'Investment Fundamentals Guide',
    ],
    color: 'amber',
    image: '/images/soulbook/pillar-purpose.png',
  },
  {
    id: 'circle',
    title: 'Circle',
    icon: Users,
    description: 'Cultivate meaningful relationships and community connections.',
    fullDescription: 'The Circle pillar addresses your most important relationships and community. It covers romantic partnerships, friendships, family dynamics, professional networks, and your broader community involvement. Quality relationships are among the strongest predictors of happiness and success.',
    assessmentQuestion: 'Which relationships deserve more of your intentional investment?',
    resources: [
      'Relationship Investment Framework',
      'Communication Mastery Guide',
      'Community Building Strategy',
      'Boundary Setting Protocol',
    ],
    color: 'gold',
    image: '/images/soulbook/pillar-relationships.png',
  },
  {
    id: 'legacy',
    title: 'Legacy',
    icon: Archive,
    description: 'Create lasting impact and contribute to future generations.',
    fullDescription: 'Legacy encompasses your contribution to future generations and the mark you will leave on the world. This pillar explores your impact on others, your creative output, your mentorship of others, and the systems and structures that will continue your work long after you are gone.',
    assessmentQuestion: 'What do you want people to say about your life and work at your memorial?',
    resources: [
      'Impact Mapping Workshop',
      'Mentorship Program Design',
      'Creative Output Strategy',
      'Generativity Planning Guide',
    ],
    color: 'amber',
    image: '/images/soulbook/pillar-identity.png',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function PillarCard({
  pillar,
  isExpanded,
  onToggle,
}: {
  pillar: Pillar;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = pillar.icon;

  return (
    <motion.div variants={itemVariants}>
      <InteractiveCard
        glowColor={pillar.color === 'amber' ? 'yellow' : 'cyan'}
        intensity="medium"
        className="h-full"
      >
        <GlassmorphicCard
          variant="premium"
          gradient={pillar.color === 'amber' ? 'aurora' : 'purple'}
          border="subtle"
          className="h-full"
        >
          <div className="p-6">
            {/* Header */}
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={onToggle}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    pillar.color === 'amber'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-gold-500/20 text-gold-400'
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{pillar.description}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-slate-700/50">
                    {/* Pillar Visual */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {pillar.fullDescription}
                    </p>

                    {/* Assessment Question Preview */}
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-medium text-amber-400">
                          Assessment Question
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 italic">
                        {pillar.assessmentQuestion}
                      </p>
                    </div>

                    {/* Resources */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-gold-400" />
                        <span className="text-sm font-medium text-gold-400">
                          Resources
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {pillar.resources.map((resource, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-slate-400"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <PremiumButton
                      variant="ghost"
                      size="sm"
                      className="w-full group"
                      ariaLabel={`Explore ${pillar.title} pillar in depth`}
                    >
                      Explore {pillar.title} in Depth
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </PremiumButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassmorphicCard>
      </InteractiveCard>
    </motion.div>
  );
}

export default function SevenPillarsPage() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const handleToggle = (pillarId: string) => {
    setExpandedPillar(expandedPillar === pillarId ? null : pillarId);
  };

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/soulbook/seven-pillars.png"
            alt="The 7 Pillars of Conscious Living"
            fill
            className="object-cover opacity-40"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/30" />
        </div>
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center w-full pb-16 pt-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              The Soulbook Framework
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The 7 Pillars of{' '}
              <span className="bg-gradient-to-r from-amber-400 via-gold-400 to-amber-400 bg-clip-text text-transparent">
                Conscious Living
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              A comprehensive framework for building an extraordinary life through
              intentional development across seven interconnected dimensions of human
              excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumButton variant="primary" size="lg">
                Take the Assessment
              </PremiumButton>
              <PremiumButton variant="ghost" size="lg">
                Explore the Vault
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillar Cards Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                isExpanded={expandedPillar === pillar.id}
                onToggle={() => handleToggle(pillar.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassmorphicCard variant="luxury" gradient="aurora" border="glow" className="p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Life?
              </h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Start your journey today by taking our comprehensive assessment and
                discovering which pillars need your immediate attention.
              </p>
              <PremiumButton variant="primary" size="lg">
                Begin Your Assessment
              </PremiumButton>
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}
