'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Users,
  Rocket,
  Brain,
  Code,
  Heart,
  Headphones,
  Zap,
  CheckCircle,
  Lightbulb,
  Compass,
  Globe,
  ShieldCheck,
  BarChart4
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const heroStats = [
  {
    label: 'Enterprise Systems Shipped',
    value: '200+',
    detail: 'Oracle-grade AI initiatives delivered with soul alignment'
  },
  {
    label: 'Suno Creations',
    value: '500',
    detail: 'Transformational tracks produced with AI-human co-creation'
  },
  {
    label: 'Creator Transformations',
    value: '1,000+',
    detail: 'Leaders, families, and artists activating intelligence rituals'
  }
]

const audienceCards = [
  {
    icon: Users,
    title: 'Families & Friends',
    description:
      'Navigate AI conversations with confidence, safety, and shared rituals.',
    color: 'from-blue-50 to-indigo-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Rocket,
    title: 'Founders & Entrepreneurs',
    description:
      'Design conscious products, funnels, and agent workflows that scale impact.',
    color: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Brain,
    title: 'Technologists & Leaders',
    description:
      'Evolve from builder to Oracle-level strategist who orchestrates intelligence.',
    color: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600'
  },
  {
    icon: Headphones,
    title: 'Creators & Facilitators',
    description:
      'Blend Suno, music, and community into immersive transformation experiences.',
    color: 'from-orange-50 to-rose-50',
    iconColor: 'text-orange-600'
  }
]

const pillars = [
  {
    icon: Brain,
    title: 'Technical Mastery',
    description:
      'Architect systems, automations, and agents that are robust, auditable, and kind to humans.',
    gradient: 'linear-gradient(135deg, rgba(37,99,235,0.85) 0%, rgba(15,23,42,0.9) 100%)'
  },
  {
    icon: Heart,
    title: 'Soul Alignment',
    description:
      'Ensure every build amplifies purpose, nervous-system safety, and creative expression.',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.9) 0%, rgba(76,29,149,0.85) 100%)'
  },
  {
    icon: Sparkles,
    title: 'Creative Expression',
    description:
      'Use AI as a collaborator that expands stories, music, and experiences beyond human limits.',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.9) 0%, rgba(190,24,93,0.85) 100%)'
  }
]

const journeyBlueprint = [
  {
    step: '01',
    title: 'Sense',
    description:
      'Audit your current brand, data, and rituals. Map fears, opportunities, and desired transformations.',
    icon: Compass
  },
  {
    step: '02',
    title: 'Systemize',
    description:
      'Design the intelligence operating system: agents, templates, live experiences, and measurement loops.',
    icon: Code
  },
  {
    step: '03',
    title: 'Sound',
    description:
      'Compose vibrational assets, narrative arcs, and micro-funnels that invite people into the journey.',
    icon: Headphones
  },
  {
    step: '04',
    title: 'Scale',
    description:
      'Launch, instrument, and iterate using conscious KPIs that balance revenue, resonance, and rest.',
    icon: BarChart4
  }
]

const curatedStories = [
  {
    title: 'The Intelligence Revolution Playbook',
    description: 'A $10T strategy map for technologists, founders, and creators.',
    href: '/blog/intelligence-revolution-2025',
    image: '/images/blog/intelligence-revolution-hero.svg',
    tag: 'Cornerstone',
    gradient: 'linear-gradient(135deg, #020617 0%, #1e1b4b 55%, #38bdf8 100%)'
  },
  {
    title: "AI Doesn't Have To Be Soulless",
    description: 'Lessons from 15 years of Oracle AI + 500 collaborative songs.',
    href: '/blog/ai-doesnt-have-to-be-soulless',
    image: '/images/blog/ai-soul-story.svg',
    tag: 'Story',
    gradient: 'linear-gradient(135deg, #1f103a 0%, #312e81 55%, #ec4899 100%)'
  },
  {
    title: 'Soul Frequency Framework',
    description: 'Find the creative signature AI should amplify, not replace.',
    href: '/blog/soul-frequency-framework',
    image: '/images/blog/soul-frequency-framework.svg',
    tag: 'Framework',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #0e7490 55%, #34d399 100%)'
  }
]

const resources = [
  {
    icon: Sparkles,
    title: 'Soul Frequency Assessment',
    description: '7-minute blueprint for your intelligence operating system.',
    href: '/soul-frequency-assessment',
    tag: 'New',
    color: 'text-purple-600'
  },
  {
    icon: Heart,
    title: 'Soul Frequency Quiz',
    description: 'Discover your unique creator archetype.',
    href: '/soul-frequency-quiz',
    tag: 'Assessment',
    color: 'text-fuchsia-600'
  },
  {
    icon: Rocket,
    title: "Founder�s AI Playbook",
    description: 'Offer architecture + launch templates for conscious ventures.',
    href: '/founder-playbook',
    tag: 'Strategy',
    color: 'text-green-600'
  },
  {
    icon: Users,
    title: 'AI Basics for Families',
    description: 'Simple language, real scenarios, conversation guides.',
    href: '/family-guide',
    tag: 'Guide',
    color: 'text-blue-600'
  }
]

const testimonials = [
  {
    quote:
      'Frank helped us turn a scattered set of offers into a coherent intelligence system. We shipped a new funnel, an AI concierge, and grew revenue 3x without burnout.',
    name: 'Zoe Carter',
    role: 'Founder � Conscious Leadership Lab'
  },
  {
    quote:
      'Our Oracle team finally has language and rituals for building AI that honors people. The Soul Frequency work has become part of onboarding.',
    name: 'David Lin',
    role: 'Sr. Director � Fortune 100 Enterprise'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-28" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 dark:from-slate-900 via-primary-800 dark:via-indigo-900 to-secondary-700 dark:to-blue-700" />
          <div className="absolute inset-0 opacity-60" style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 50% 80%, rgba(255,63,152,0.18), transparent 50%)'
          }} />
          <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr,0.9fr] gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-caption text-white/90 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" /> 
                Conscious AI Systems for Humans Who Lead with Heart
              </span>
              <h1 id="hero-heading" className="mt-6 text-display-1 md:text-display-2 lg:text-6xl font-bold leading-tight text-white text-balance">
                Build Intelligence Experiences that Feel Human, Sound Alive, and Scale with Integrity
              </h1>
              <p className="mt-5 text-body-large text-slate-200/90 leading-relaxed max-w-xl">
                I help technologists, founders, and creators architect the rituals, automations, and musical experiences that transform audiences into communities. Together we turn Oracle-grade AI into a soul-aligned operating system.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/soul-frequency-assessment"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800"
                >
                  Start with the Assessment
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/blog/intelligence-revolution-2025"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800"
                >
                  Read the Revolution Playbook
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wide text-white/60 mt-1">{stat.label}</div>
                    <p className="text-sm text-white/70 mt-3 leading-relaxed">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Your Intelligence Journey</h2>
              <p className="text-slate-200 text-sm leading-relaxed mb-6">
                Every collaboration follows a proven rhythm that integrates strategy, nervous system care, and shipping energy. We design together, build together, and launch with clear rituals.
              </p>
              <div className="space-y-6">
                {journeyBlueprint.map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="mt-1 flex items-center justify-center w-12 h-12 rounded-full bg-white/15 text-white font-semibold">
                      {item.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5 text-white/80" />
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Audience */}
        <section className="bg-slate-950 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-white/70 mb-4">
                <Users className="w-4 h-4" /> Who We Serve
              </span>
              <h2 className="text-4xl font-bold text-white">Intelligence is for Every Conscious Leader</h2>
              <p className="mt-4 text-slate-300">
                Whether you are designing enterprise platforms, guiding families, scaling a creative studio, or launching a new brand, we build a system that honors your people.
              </p>
            </motion.div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceCards.map((audience) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl p-6 bg-gradient-to-br ${audience.color} text-slate-900 shadow-lg`}
                >
                  <audience.icon className={`w-8 h-8 ${audience.iconColor} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{audience.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{audience.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Method Pillars */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">The FrankX Method</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl p-8 text-white bg-gradient-to-br border border-white/10" style={{ background: pillar.gradient }}>
                  <pillar.icon className="w-9 h-9 mb-5" />
                  <h3 className="text-2xl font-semibold mb-3">{pillar.title}</h3>
                  <p className="text-sm text-slate-100/80 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl font-bold text-white">Vision, Story, Systems</h2>
                <p className="text-slate-300 max-w-2xl mt-3">
                  Dive into cornerstone essays and playbooks that reveal how to combine enterprise AI, soul frequency design, and community experiences into a single operating system.
                </p>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition">
                Browse all articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {curatedStories.map((story) => (
                <div key={story.href} className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
                  <div className="absolute inset-0" style={{ backgroundImage: story.gradient, opacity: 0.7 }} />
                  <div className="relative p-8 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-white/70">{story.tag}</span>
                      <h3 className="text-2xl font-semibold text-white mt-3 mb-3">{story.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed">{story.description}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <img src={story.image} alt={story.title} className="w-16 h-16 rounded-xl border border-white/20 object-cover" />
                      <Link href={story.href} className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
                        Read the story
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl font-bold text-white">What Partners Are Experiencing</h2>
                <p className="text-slate-300 mt-4 max-w-xl">
                  From enterprise teams to conscious creators, the work blends performance with depth. These stories reflect the transformation we design for your audience�and for you.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-5 py-4 text-sm text-white/80">
                <ShieldCheck className="w-5 h-5" />
                <span>Oracle security-compliant workflows & humane automation</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white/8 border border-white/10 rounded-3xl p-8 backdrop-blur">
                  <Lightbulb className="w-7 h-7 text-white/80 mb-4" />
                  <p className="text-lg text-white/90 leading-relaxed mb-6">�{testimonial.quote}�</p>
                  <div className="text-sm text-white/70">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div>{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white">Resources for Your Next Step</h2>
              <p className="text-slate-300 mt-3">Pick the door that resonates today. Each experience feeds the intelligence operating system we will build together.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:bg-white/10 transition"
                >
                  <div className={`text-xs font-semibold ${resource.color} uppercase tracking-widest`}>{resource.tag}</div>
                  <resource.icon className={`w-9 h-9 mt-4 mb-3 ${resource.color}`} />
                  <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                  <p className="text-sm text-white/70 mt-3 flex-1 leading-relaxed">{resource.description}</p>
                  <Link href={resource.href} className="text-sm font-semibold text-white/80 hover:text-white mt-6">Explore ?</Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Architect Your Conscious Intelligence Era?</h2>
            <p className="text-lg mb-8 opacity-90">
              We bring Oracle-grade execution, Suno-powered creativity, and nervous-system aware design to every engagement. Your next chapter can be both prosperous and deeply human.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/soul-frequency-assessment"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Begin with the Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="mailto:hello@frankx.ai?subject=Conscious%20AI%20Collaboration"
                className="inline-flex items-center px-8 py-4 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition"
              >
                Request a Strategy Session
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
