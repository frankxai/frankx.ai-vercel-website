'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Sparkles } from 'lucide-react'

import {
  agentProtocols,
  heroCta,
  heroHighlights,
  heroStats,
  heroSubtext,
  heroSupportLink,
  keywordClusters,
  projectMilestones,
  quickActions,
  resourceCollections,
  segmentProfiles,
  testimonials,
  testimonialIcon,
  updateEntries
} from '@/lib/hub'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

const statusStyles: Record<'shipping' | 'in-progress' | 'incubating', string> = {
  shipping: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200',
  'in-progress': 'border-amber-400/50 bg-amber-500/10 text-amber-200',
  incubating: 'border-sky-400/50 bg-sky-500/10 text-sky-200'
}

const TestimonialIcon = testimonialIcon

export default function HomePage() {
  return (
    <main
      id="main"
      className="flex-1 bg-gradient-to-b from-slate-950 via-[#030712] to-[#01040a] text-slate-100 pt-32"
    >
      {/* Hero Section */}
      <section id="hub" className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#020617] opacity-95" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(circle at 78% 12%, rgba(255,255,255,0.05), transparent 45%), radial-gradient(circle at 48% 78%, rgba(56,189,248,0.22), transparent 60%)'
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(circle,_rgba(129,140,248,0.35),_transparent_65%)] blur-3xl opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-12%] top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.45),_transparent_60%)] blur-3xl opacity-70"
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            className="grid lg:grid-cols-[1.15fr,0.85fr] gap-14 items-start"
            initial="initial"
            animate="whileInView"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="space-y-6 text-white">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                FrankX Agent Collective
              </span>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-balance">
                Conscious intelligence systems built with you by the FrankX agent team
              </h1>
              <div className="space-y-3 text-lg text-slate-100/90">
                {heroSubtext.map((line) => (
                  <p key={line} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href={heroCta.primary.href}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 text-slate-950 font-semibold shadow-[0_25px_60px_rgba(56,189,248,0.35)] hover:shadow-[0_20px_45px_rgba(168,85,247,0.35)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-200 focus-visible:ring-offset-slate-950"
                >
                  {heroCta.primary.label}
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
                <Link
                  href={heroCta.secondary.href}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-slate-950"
                >
                  {heroCta.secondary.label}
                  <ArrowUpRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </div>
              <div className="text-sm text-white/70">
                <span className="font-semibold">Need a quick overview?</span>{' '}
                <Link
                  href={heroSupportLink.href}
                  className="inline-flex items-center gap-1 text-white hover:text-slate-100 font-medium"
                >
                  {heroSupportLink.label}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 pt-6">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 rounded-2xl p-5 backdrop-blur-xl text-sm shadow-[0_20px_45px_rgba(15,23,42,0.55)]"
                  >
                    <div className="text-3xl font-semibold text-white">{stat.value}</div>
                    <div className="uppercase tracking-widest text-white/70 mt-2 text-xs">{stat.label}</div>
                    <p className="mt-3 text-white/70 leading-relaxed">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/15 via-white/5 to-transparent border border-white/20 rounded-3xl p-8 backdrop-blur-2xl text-white space-y-10 shadow-[0_35px_80px_rgba(15,23,42,0.7)]"
            >
              <div>
                <h2 className="text-2xl font-semibold">What lives here</h2>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Every visit surfaces evolving intelligence, resources, and rituals designed for you and the agents
                  you deploy. Start with a quick action or explore the highlights.
                </p>
              </div>
              <div className="grid gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 hover:bg-white/10 transition shadow-[0_12px_30px_rgba(15,23,42,0.45)]"
                  >
                    <action.icon className="w-5 h-5 mt-0.5 text-white/80" aria-hidden="true" />
                    <div>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        {action.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" aria-hidden="true" />
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed mt-1">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="space-y-4">
                {heroHighlights.map((highlight) => (
                  <div key={highlight.title} className="flex gap-3 items-start">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                      <highlight.icon className="w-5 h-5 text-white/80" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{highlight.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed mt-1">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* Segment Profiles */}
      <section id="segments" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-[#030712]/95 to-[#020617]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Designed for every circle
            </span>
            <h2 className="mt-4 text-4xl font-semibold text-balance">Your people, your work, your agents—aligned in one hub</h2>
            <p className="mt-4 text-slate-300">
              Whether you are briefing executives, hosting a family workshop, or shipping a new release, these
              pathways show you where to begin and how to integrate each experience.
            </p>
          </motion.div>
          <div className="mt-14 grid lg:grid-cols-2 gap-8">
            {segmentProfiles.map((profile) => (
              <motion.article
                key={profile.id}
                className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl shadow-[0_25px_70px_rgba(15,23,42,0.6)]"
                {...fadeUp}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <profile.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{profile.title}</h3>
                    <p className="mt-2 text-sm text-slate-200 leading-relaxed">{profile.description}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate-300 leading-relaxed">{profile.transformation}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {profile.needs.map((need) => (
                    <li key={need} className="flex items-start gap-2 text-slate-200">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-300" aria-hidden="true" />
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {profile.ctas.map((cta) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                    >
                      {cta.label}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                  {profile.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-white/20 px-3 py-1">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Updates */}
      <section id="updates" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#020617] to-[#01050b]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_rgba(168,85,247,0.2),_transparent_65%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-white text-balance">Latest intelligence drops</h2>
            <p className="mt-4 text-white/70">
              Stay ahead with the newest essays, resources, and program milestones. Each update is
              designed to be actionable for you and the teams—or AI agents—you lead.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {updateEntries.map((entry) => (
              <motion.article
                key={entry.href}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl shadow-[0_22px_60px_rgba(15,23,42,0.58)]"
                {...fadeUp}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                  {entry.type}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  <Link href={entry.href} className="hover:text-primary-600 dark:hover:text-sky-300 transition">
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{entry.summary}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-white/60">
                  <span>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Link href={entry.href} className="inline-flex items-center gap-1 font-semibold">
                    Read
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#01040a] via-[#020617] to-[#030712]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,_rgba(59,130,246,0.18),_transparent_60%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-balance">Resource universes for every mission</h2>
            <p className="mt-4 text-slate-300">
              Choose the path that matches your current momentum. Every item links directly into the
              operating system we build together.
            </p>
          </motion.div>
          <div className="mt-14 grid lg:grid-cols-3 gap-8">
            {resourceCollections.map((collection) => (
              <motion.article
                key={collection.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl flex flex-col shadow-[0_25px_70px_rgba(15,23,42,0.6)]"
                {...fadeUp}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold">{collection.title}</h3>
                <p className="mt-3 text-sm text-slate-200 leading-relaxed">{collection.description}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-slate-300">Ideal for</p>
                <p className="mt-1 text-sm text-slate-100/80 leading-relaxed">{collection.focus}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {collection.items.map((item) => (
                    <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/15 transition shadow-[0_16px_40px_rgba(15,23,42,0.5)]"
                    >
                        <div>
                          <p className="font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-white/70">{item.type}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Keyword Clusters */}
      <section id="search" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#01040a] to-[#020617]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,_rgba(14,165,233,0.18),_transparent_60%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-white text-balance">
              Built around the searches you and your agents run
            </h2>
            <p className="mt-4 text-white/70">
              These keyword constellations guide the site architecture, ensuring every query leads to
              depth, clarity, and an action you can take next.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {keywordClusters.map((cluster) => (
              <motion.article
                key={cluster.cluster}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl shadow-[0_20px_55px_rgba(15,23,42,0.55)]"
                {...fadeUp}
              >
                <h3 className="text-xl font-semibold text-white">{cluster.cluster}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{cluster.intent}</p>
                <div className="mt-4 text-xs text-primary-700 dark:text-sky-300 font-semibold uppercase tracking-widest">
                  Primary Keyword
                </div>
                <p className="text-sm text-white mt-1">{cluster.primaryKeyword}</p>
                <div className="mt-4 text-xs uppercase tracking-widest text-white/60">
                  Supporting Signals
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cluster.supportingKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-primary-50 text-primary-700 dark:bg-sky-500/10 dark:text-sky-200 px-3 py-1 text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link
                  href={cluster.link}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-sky-300 hover:underline"
                >
                  Explore cornerstone content
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#01040a] via-[#020617] to-[#050a15]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(236,72,153,0.18),_transparent_65%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-balance">Ship logs & manuscripts in motion</h2>
            <p className="mt-4 text-slate-300">
              Track the releases, books, and platform upgrades as they move from incubation to launch.
              Every milestone includes a doorway into the work.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {projectMilestones.map((milestone) => (
              <motion.article
                key={milestone.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl shadow-[0_24px_65px_rgba(15,23,42,0.6)]"
                {...fadeUp}
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${statusStyles[milestone.status]}`}
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  {milestone.status.replace('-', ' ')}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{milestone.title}</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">{milestone.description}</p>
                <p className="mt-3 text-xs text-white/60 uppercase tracking-widest">Focus</p>
                <p className="text-sm text-white/75">{milestone.focus}</p>
                {milestone.eta && (
                  <p className="mt-4 text-xs text-white/60">{milestone.eta}</p>
                )}
                {milestone.cta && (
                  <Link
                    href={milestone.cta.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                  >
                    {milestone.cta.label}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Protocols */}
      <section id="agents" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#030712] to-[#01040a]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(147,51,234,0.2),_transparent_60%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-white text-balance">
              Protocols that your AI agents can plug into today
            </h2>
            <p className="mt-4 text-white/70">
              Each protocol includes structures, prompts, and guardrails so human teams and automated
              agents stay in sync.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {agentProtocols.map((protocol) => (
              <motion.article
                key={protocol.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl shadow-[0_24px_65px_rgba(15,23,42,0.6)]"
                {...fadeUp}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 dark:bg-sky-500/20 dark:text-sky-200 flex items-center justify-center">
                    <protocol.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{protocol.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
                      {protocol.focus}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70 leading-relaxed">{protocol.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {protocol.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-white/75">
                      <Check className="w-4 h-4 mt-0.5 text-primary-600 dark:text-sky-300" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={protocol.link.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-sky-300 hover:underline"
                >
                  {protocol.link.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#01040a] via-[#020617] to-[#030712]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(59,130,246,0.18),_transparent_65%)] opacity-60"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto text-white">
          <motion.div className="max-w-3xl" {...fadeUp}>
            <h2 className="text-4xl font-semibold text-balance">Trusted across communities and boardrooms</h2>
            <p className="mt-4 text-slate-300">
              Stories from the leaders, families, and creators who now run intelligence systems that feel
              deeply human.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl shadow-[0_24px_65px_rgba(15,23,42,0.6)]"
                {...fadeUp}
              >
                <TestimonialIcon className="w-8 h-8 text-sky-300" aria-hidden="true" />
                <p className="mt-4 text-sm text-white/80 leading-relaxed">“{testimonial.quote}”</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/70">{testimonial.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28 px-6 text-white">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#312e81] to-[#020617]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.28),_transparent_65%)] opacity-70"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-semibold text-balance">Ready to co-create your conscious intelligence network?</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Invite your collaborators, families, and leadership councils into an operating system that blends
            research, music, narrative, and engineering. The FrankX agent collective builds alongside you every
            step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/soul-frequency-assessment"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 text-slate-950 font-semibold shadow-[0_25px_60px_rgba(56,189,248,0.35)] hover:shadow-[0_20px_45px_rgba(168,85,247,0.35)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-200 focus-visible:ring-offset-slate-950"
            >
              Begin with the assessment
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
            <Link
              href="mailto:hello@frankx.ai?subject=Conscious%20AI%20Collaboration"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-slate-950"
            >
              Request a strategy session
              <ArrowUpRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
