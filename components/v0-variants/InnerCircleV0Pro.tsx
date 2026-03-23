'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Shield,
  Zap,
  Users,
  Calendar,
  Book,
  Rocket,
  Sparkles,
  Crown,
  MessageSquare,
  Award,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Star,
} from 'lucide-react'

const MEMBERSHIP_TIERS = [
  {
    name: 'Signal',
    price: 'Free',
    priceMonthly: 0,
    description: 'Stay in the loop with AI updates',
    popular: false,
    features: [
      { text: 'Weekly AI newsletter', included: true },
      { text: 'Public blog access', included: true },
      { text: 'Community access', included: true },
      { text: 'Weekly live sessions', included: false },
      { text: 'Private community', included: false },
      { text: 'Early access to tools', included: false },
      { text: 'Template library', included: false },
      { text: 'Monthly masterclass', included: false },
      { text: '1-on-1 office hours', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom agent builds', included: false },
      { text: 'Revenue share', included: false },
    ],
    cta: 'Get Started',
    gradient: 'from-slate-600 to-slate-700',
  },
  {
    name: 'Inner Circle',
    price: '$47',
    priceMonthly: 47,
    description: 'For serious builders leveling up',
    popular: true,
    features: [
      { text: 'Weekly AI newsletter', included: true },
      { text: 'Public blog access', included: true },
      { text: 'Community access', included: true },
      { text: 'Weekly live sessions', included: true },
      { text: 'Private community', included: true },
      { text: 'Early access to tools', included: true },
      { text: 'Template library', included: true },
      { text: 'Monthly masterclass', included: true },
      { text: '1-on-1 office hours', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom agent builds', included: false },
      { text: 'Revenue share', included: false },
    ],
    cta: 'Join Inner Circle',
    gradient: 'from-[#AB47C7] to-[#43BFE3]',
  },
  {
    name: 'Alliance',
    price: '$297',
    priceMonthly: 297,
    description: 'Elite partnership for serious growth',
    popular: false,
    features: [
      { text: 'Weekly AI newsletter', included: true },
      { text: 'Public blog access', included: true },
      { text: 'Community access', included: true },
      { text: 'Weekly live sessions', included: true },
      { text: 'Private community', included: true },
      { text: 'Early access to tools', included: true },
      { text: 'Template library', included: true },
      { text: 'Monthly masterclass', included: true },
      { text: '1-on-1 office hours', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom agent builds', included: true },
      { text: 'Revenue share', included: true },
    ],
    cta: 'Join Alliance',
    gradient: 'from-[#F59E0B] to-[#10B981]',
  },
]

const TESTIMONIALS = [
  {
    initials: 'SL',
    name: 'Sarah Liu',
    role: 'Founder, DevTools AI',
    quote:
      'Inner Circle transformed how I build with AI. The weekly sessions and templates saved me months of trial and error.',
    gradient: 'from-purple-500 to-cyan-500',
  },
  {
    initials: 'MK',
    name: 'Marcus Kim',
    role: 'Solo Builder',
    quote:
      'The Alliance tier paid for itself in the first month. Direct access to Frank and revenue share opportunities are game-changing.',
    gradient: 'from-gold-500 to-emerald-500',
  },
  {
    initials: 'EP',
    name: 'Emma Patel',
    role: 'AI Product Designer',
    quote:
      'Best community for AI builders. The masterclasses alone are worth 10x the membership price.',
    gradient: 'from-cyan-500 to-purple-500',
  },
  {
    initials: 'JD',
    name: 'Jake Daniels',
    role: 'Startup CTO',
    quote:
      "Having Frank's team build custom agents for us accelerated our product roadmap by 6 months. Incredible value.",
    gradient: 'from-emerald-500 to-gold-500',
  },
]

const BENEFITS = [
  {
    icon: Calendar,
    title: 'Weekly Live Sessions',
    description: 'Join interactive sessions where we build, ship, and solve real AI challenges together.',
    color: 'text-[#AB47C7]',
  },
  {
    icon: Users,
    title: 'Private Community',
    description: 'Connect with elite builders, share insights, and collaborate on cutting-edge AI projects.',
    color: 'text-[#43BFE3]',
  },
  {
    icon: Rocket,
    title: 'Early Tool Access',
    description: 'Get first access to new AI tools, templates, and frameworks before public release.',
    color: 'text-[#F59E0B]',
  },
  {
    icon: Book,
    title: 'Template Library',
    description: 'Access production-ready templates, prompts, and workflows to ship faster.',
    color: 'text-[#10B981]',
  },
  {
    icon: Sparkles,
    title: 'Monthly Masterclass',
    description: 'Deep-dive sessions on advanced AI techniques, trends, and strategies from industry experts.',
    color: 'text-[#AB47C7]',
  },
  {
    icon: Crown,
    title: '1-on-1 Office Hours',
    description: 'Personal sessions to review your projects, solve problems, and strategize growth.',
    color: 'text-[#43BFE3]',
  },
]

const FAQS = [
  {
    question: 'Can I switch tiers later?',
    answer:
      'Absolutely! You can upgrade or downgrade your membership at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'What if I miss a live session?',
    answer:
      'All live sessions are recorded and available in the member portal. You can watch them anytime and still participate in the community discussion.',
  },
  {
    question: 'How does revenue share work in Alliance?',
    answer:
      'Alliance members get opportunities to collaborate on projects with revenue sharing agreements. Terms are discussed case-by-case based on contribution and project scope.',
  },
  {
    question: 'Is there a refund policy?',
    answer:
      'Yes! If you\'re not satisfied within the first 14 days of joining Inner Circle or Alliance, we\'ll refund your payment, no questions asked.',
  },
  {
    question: 'How are custom agents built?',
    answer:
      'Alliance members submit their requirements, and our team works with you to design, build, and deploy custom AI agents tailored to your specific needs.',
  },
]

function AnimatedShield() {
  return (
    <motion.div
      className="relative w-64 h-64 mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      
      {/* Shield container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          rotateY: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        {/* Glass shield background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10" />
        
        {/* Shield icon */}
        <Shield className="w-32 h-32 text-white z-10" strokeWidth={1.5} />
        
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] rounded-full"
            style={{
              left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
              top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
      
      {/* Inner shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

function PricingCard({ tier, index }: { tier: typeof MEMBERSHIP_TIERS[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group ${tier.popular ? 'lg:-mt-8' : ''}`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-3 h-3" fill="currentColor" />
            Most Popular
          </div>
        </div>
      )}

      <div
        className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full ${
          tier.popular ? 'lg:scale-105 border-[#AB47C7]/50 shadow-2xl shadow-[#AB47C7]/20' : ''
        }`}
      >
        {/* Glow effect for popular tier */}
        {tier.popular && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#AB47C7]/20 to-[#43BFE3]/20 rounded-2xl blur-xl opacity-50" />
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
            <p className="text-slate-400 text-sm">{tier.description}</p>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-white">{tier.price}</span>
              {tier.priceMonthly > 0 && <span className="text-slate-400">/month</span>}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all relative overflow-hidden group/btn ${
              tier.popular
                ? 'bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white shadow-lg shadow-[#AB47C7]/50'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tier.cta}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
            {tier.popular && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
              />
            )}
          </motion.button>

          {/* Features */}
          <div className="space-y-3">
            {tier.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                {feature.included ? (
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${feature.included ? 'text-white' : 'text-slate-500'}`}>
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-lg">{testimonial.initials}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-slate-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed">{testimonial.quote}</p>
    </motion.div>
  )
}

function BenefitCard({ benefit, index }: { benefit: typeof BENEFITS[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
    >
      <benefit.icon className={`w-10 h-10 ${benefit.color} mb-4 group-hover:scale-110 transition-transform`} />
      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
      <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
    </motion.div>
  )
}

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-[#AB47C7] transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-slate-400 leading-relaxed pb-6">{faq.answer}</p>
      </motion.div>
    </motion.div>
  )
}

function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const spotsRemaining = 12
  const totalSpots = 50

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(((totalSpots - spotsRemaining) / totalSpots) * 100)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold">Limited Spots Available</span>
        <span className="text-[#F59E0B] font-bold">{spotsRemaining} left</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3]"
        />
      </div>
      <p className="text-slate-400 text-sm mt-3">
        Join now to secure your spot in this month's cohort
      </p>
    </div>
  )
}

export default function InnerCirclePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#AB47C7]/30 rounded-full blur-[120px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-[#43BFE3]/30 rounded-full blur-[120px]"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm text-slate-300">Premium AI Community</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
          >
            Join the{' '}
            <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] bg-clip-text text-transparent">
              Inner Circle
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto text-balance"
          >
            The exclusive community for builders and creators who are serious about mastering AI and shipping products that matter.
          </motion.p>

          {/* Animated Shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedShield />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-[#AB47C7]/50 hover:shadow-xl hover:shadow-[#AB47C7]/60 transition-all flex items-center gap-2"
            >
              Join Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-slate-400"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-20 border-y border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '2,400+', label: 'Active Members', icon: Users, color: 'text-[#AB47C7]' },
              { number: '150+', label: 'Live Sessions', icon: Calendar, color: 'text-[#43BFE3]' },
              { number: '80+', label: 'Tools Shipped', icon: Rocket, color: 'text-[#F59E0B]' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#AB47C7]/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Choose Your Level
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto text-balance">
              From free updates to elite partnership. Pick the tier that matches your ambition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {MEMBERSHIP_TIERS.map((tier, index) => (
              <PricingCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <ProgressBar />
          </motion.div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-32 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              What You Get
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto text-balance">
              Everything you need to build, ship, and scale AI products faster than ever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Trusted by Top Builders
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto text-balance">
              Join thousands of creators who are shipping AI products at lightning speed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white/5 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to know about the Inner Circle.
            </p>
          </motion.div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            {FAQS.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/20 via-[#43BFE3]/20 to-[#F59E0B]/20 blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
          >
            <Award className="w-16 h-16 text-[#F59E0B] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Level Up?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto text-balance">
              Join the most ambitious AI builders in the world. Ship faster, learn deeper, and grow your impact.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-[#AB47C7]/50 hover:shadow-xl hover:shadow-[#AB47C7]/60 transition-all flex items-center gap-2"
              >
                Join Inner Circle
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat with Us
              </motion.button>
            </div>

            <p className="text-slate-500 text-sm mt-6">
              14-day money-back guarantee • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">
              © 2024 FrankX. Built for builders who ship.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
