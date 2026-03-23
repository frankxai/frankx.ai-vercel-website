'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Rocket, 
  Music, 
  FileText, 
  Check, 
  ArrowRight, 
  Star,
  Sparkles,
  Network,
  Zap,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const expertiseAreas = [
  { name: 'AI Systems', value: 95, color: '#AB47C7' },
  { name: 'Architecture', value: 92, color: '#43BFE3' },
  { name: 'Creator Strategy', value: 88, color: '#F59E0B' },
  { name: 'Music Production', value: 85, color: '#10B981' },
  { name: 'Content Systems', value: 90, color: '#8B5CF6' },
  { name: 'Monetization', value: 87, color: '#EC4899' }
]

const tiers = [
  {
    name: 'Strategy Session',
    price: '$297',
    duration: '1 hour',
    color: '#43BFE3',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    features: [
      'AI stack audit & analysis',
      'Architecture review & recommendations',
      'Growth roadmap planning',
      'Q&A and strategic guidance',
      'Action plan document'
    ],
    cta: 'Book Strategy Call'
  },
  {
    name: 'Builder Sprint',
    price: '$1,997',
    duration: '4 weeks',
    color: '#AB47C7',
    gradient: 'from-purple-500/10 to-pink-500/10',
    popular: true,
    features: [
      'Weekly 1-on-1 coaching sessions',
      'Custom AI agent setup & deployment',
      'Architecture design & implementation',
      'Shipping accountability & review',
      'Slack access for async support',
      'Code reviews & debugging help'
    ],
    cta: 'Start Building'
  },
  {
    name: 'Architect Residency',
    price: '$4,800',
    duration: '12 weeks',
    color: '#F59E0B',
    gradient: 'from-amber-500/10 to-orange-500/10',
    features: [
      'Full AI transformation roadmap',
      'Enterprise architecture design',
      'Bi-weekly deep-dive sessions',
      'Ongoing support & consulting',
      'Team training & documentation',
      'Priority access to Frank',
      'Launch support & optimization'
    ],
    cta: 'Transform Your Business'
  }
]

const coverageAreas = [
  {
    icon: Brain,
    title: 'AI Systems Architecture',
    description: 'Agent orchestration, MCP integration, Claude Code workflows, and production-ready AI systems.',
    color: '#AB47C7'
  },
  {
    icon: Rocket,
    title: 'Creator Business Strategy',
    description: 'Product development, funnel optimization, monetization strategies, and sustainable growth.',
    color: '#43BFE3'
  },
  {
    icon: Music,
    title: 'Music Production with AI',
    description: 'Suno workflows, AI-assisted composition, production techniques, and creative automation.',
    color: '#F59E0B'
  },
  {
    icon: FileText,
    title: 'Content Systems',
    description: 'SEO optimization, automated publishing pipelines, research workflows, and content strategy.',
    color: '#10B981'
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your current systems, goals, and challenges to create a custom roadmap.',
    icon: Target
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Design your AI architecture, define milestones, and create an actionable implementation plan.',
    icon: Network
  },
  {
    number: '03',
    title: 'Build',
    description: 'Hands-on implementation with guidance, code reviews, and real-time problem solving.',
    icon: Zap
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy with confidence, optimize performance, and establish sustainable growth systems.',
    icon: Rocket
  }
]

const outcomes = [
  { label: 'AI Systems Launched', value: '50+', icon: Rocket },
  { label: 'Revenue Generated', value: '$2.4M+', icon: TrendingUp },
  { label: 'Creators Coached', value: '100+', icon: Users },
  { label: 'Satisfaction Rate', value: '98%', icon: Star }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'AI Product Lead',
    avatar: 'SC',
    content: 'Frank transformed how we think about AI architecture. His guidance helped us ship a production-ready agent system in 4 weeks. Worth every penny.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Creator & Developer',
    avatar: 'MR',
    content: 'The Builder Sprint was incredible. Frank helped me launch my SaaS product and build a content system that generates 50K+ monthly visitors. Game changer.',
    rating: 5
  },
  {
    name: 'Emily Thompson',
    role: 'Technical Founder',
    avatar: 'ET',
    content: 'Best investment in my business. Frank\'s expertise in AI systems and creator strategy is unmatched. He knows exactly what works in production.',
    rating: 5
  }
]

const faqs = [
  {
    question: 'Who is this coaching for?',
    answer: 'This coaching is for technical creators, developers, and founders who want to build production-ready AI systems, grow their creator business, or transform their technical expertise into revenue. You should have basic programming knowledge and be ready to implement.'
  },
  {
    question: 'What makes your coaching different?',
    answer: 'I combine deep technical expertise in AI systems with proven creator business strategies. I\'ve built production AI systems generating millions in revenue and have coached 100+ creators. You get hands-on architecture guidance plus business strategy that actually works.'
  },
  {
    question: 'How quickly can I see results?',
    answer: 'Most clients ship their first AI system within 2-4 weeks of starting. Strategy Session clients leave with a clear roadmap they can execute immediately. Builder Sprint clients typically launch within the 4-week period. Architect Residency clients see transformation across their entire business.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'I stand behind my coaching 100%. If you complete the first session and feel you didn\'t receive value, I\'ll issue a full refund. My goal is your success, not just taking payment.'
  },
  {
    question: 'What tech stack do you recommend?',
    answer: 'I\'m tech-agnostic but specialize in modern AI stacks: Claude/GPT-4, Next.js, TypeScript, Vercel, MCP, and production-ready frameworks. I help you choose the right tools for your specific goals and constraints.'
  },
  {
    question: 'Can I upgrade between tiers?',
    answer: 'Absolutely! Many clients start with a Strategy Session and upgrade to Builder Sprint or Architect Residency. Your initial session fee is credited toward any upgrade within 30 days.'
  }
]

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />
        </div>
        
        <div className="container relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Premium AI Architecture Coaching</span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-6 text-balance">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AI Vision
                </span>{' '}
                Into Reality
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl text-pretty leading-relaxed">
                1-on-1 coaching for technical creators and founders. Ship production-ready AI systems, scale your creator business, and master modern architecture.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 border-border/50 hover:bg-card bg-transparent">
                  View Pricing
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['#AB47C7', '#43BFE3', '#F59E0B', '#10B981'].map((color, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">100+ creators coached</div>
                  <div className="text-muted-foreground">98% satisfaction rate</div>
                </div>
              </div>
            </motion.div>
            
            {/* Expertise Radar Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glass Card Background */}
                <div className="absolute inset-0 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 p-8">
                  {/* Expertise Circles */}
                  <div className="relative h-full w-full flex items-center justify-center">
                    {expertiseAreas.map((area, index) => {
                      const angle = (index * 360) / expertiseAreas.length - 90
                      const radius = 45
                      const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
                      const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
                      
                      return (
                        <motion.div
                          key={area.name}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                          className="absolute"
                          style={{ 
                            left: `${x}%`, 
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div 
                            className="relative rounded-2xl p-4 backdrop-blur-sm border border-border/30"
                            style={{ 
                              backgroundColor: `${area.color}15`,
                              boxShadow: `0 0 20px ${area.color}20`
                            }}
                          >
                            <div className="text-center min-w-[100px]">
                              <div 
                                className="text-2xl font-bold mb-1"
                                style={{ color: area.color }}
                              >
                                {area.value}%
                              </div>
                              <div className="text-xs font-medium text-foreground/80">
                                {area.name}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                    
                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                        FX
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coaching Tiers */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">Choose Your Path</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Whether you need strategic guidance, hands-on building support, or full transformation, there's a tier for you.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`relative overflow-hidden h-full bg-gradient-to-br ${tier.gradient} border-border/50 backdrop-blur-sm hover:border-border transition-all duration-300 group`}
                >
                  {tier.popular && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${tier.color}20` }}
                    >
                      <Shield className="h-6 w-6" style={{ color: tier.color }} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.duration}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold" style={{ color: tier.color }}>
                        {tier.price}
                      </span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check 
                            className="h-5 w-5 shrink-0 mt-0.5" 
                            style={{ color: tier.color }} 
                          />
                          <span className="text-sm text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full h-12 font-semibold group-hover:scale-[1.02] transition-transform"
                      style={{ 
                        backgroundColor: tier.color,
                        color: '#0F172A'
                      }}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">What We Cover</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Comprehensive coaching across AI systems, creator strategy, and technical excellence.
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {coverageAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-border/50 hover:border-border transition-all duration-300 group h-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div 
                        className="absolute top-0 right-0 h-32 w-32 rounded-full blur-[60px]"
                        style={{ backgroundColor: `${area.color}30` }}
                      />
                    </div>
                    
                    <div className="relative p-8">
                      <div 
                        className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${area.color}20` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: area.color }} />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">The Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A proven framework that takes you from strategy to shipped product.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent hidden lg:block" 
              style={{ transform: 'translateY(-50%)' }} 
            />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    <Card className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">Proven Results</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Real outcomes from creators and founders who've transformed their businesses.
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-4">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon
              return (
                <motion.div
                  key={outcome.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-border/50 hover:border-border transition-all duration-300 group text-center p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative">
                      <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        {outcome.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{outcome.label}</div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">What Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Hear from creators who've transformed their businesses through coaching.
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-border/50 hover:border-border transition-all duration-300 group h-full">
                  <div className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    <p className="text-foreground/90 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border/50 backdrop-blur-xl">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/20 blur-[100px]" />
              </div>
              
              <div className="relative p-12 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/20 mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4 md:text-4xl">Ready to Transform Your Business?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                  Book a free 15-minute consultation to discuss your goals and see if coaching is right for you. No pressure, just strategy.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border/50 hover:bg-card bg-transparent">
                    View Full Schedule
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  🔒 Calendar integration available · 📅 Flexible scheduling · ⚡ Usually respond within 2 hours
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Everything you need to know about coaching with Frank.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-border/50">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              FrankX
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Premium AI Architecture Coaching & Creator Mentorship
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 FrankX. All rights reserved. · <a href="#" className="hover:text-foreground transition-colors">Privacy</a> · <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
