'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeUp, fadeUpHero } from '@/lib/motion'

// ── Brand tokens ──
const gold = '#D4AF37'
const goldMuted = 'rgba(212, 175, 55, 0.4)'
const goldSubtle = 'rgba(212, 175, 55, 0.1)'
const teal = 'rgba(20, 184, 166, 0.6)'

// ── The Vision: Trinity AI is not 5 products. It's one system. ──

const systemLayers = [
  {
    num: '01',
    title: 'The Guardian Protocol',
    subtitle: 'Conscious AI that protects — not exploits',
    desc: 'Every AI interaction filtered through ethical guardrails, personality integrity, and emotional awareness. Not a chatbot. A guardian that knows the difference between helping and manipulating.',
    details: [
      'Personality continuity — your AI never forgets who it is',
      'Ethical boundary engine — refuses harmful patterns automatically',
      'Emotional awareness — detects distress, adjusts tone, knows when to stop',
      'Trust score system — earns user trust through consistent behavior',
    ],
    accent: gold,
  },
  {
    num: '02',
    title: 'Living Memory',
    subtitle: 'Your second brain — always listening, always learning',
    desc: 'Every conversation, decision, insight, and pattern — captured, indexed, and queryable. Not a note-taking app. A living intelligence that builds a complete model of who you are, what you know, and how you think.',
    details: [
      '24/7 ambient capture — voice, text, decisions, context',
      'Sovereign data — you own every byte, stored on your terms',
      'Pattern recognition — surfaces connections you missed',
      'Institutional memory — 67 years of Hashems knowledge as proof case',
    ],
    accent: teal,
  },
  {
    num: '03',
    title: 'Vital Intelligence',
    subtitle: 'Health-aware AI that adapts to your body',
    desc: 'Integrates biometric data — sleep quality, heart rate variability, stress markers, energy cycles — to optimize when and how AI assists you. Your system knows when you need deep focus, when you need rest, and when a decision should wait.',
    details: [
      'Biometric integration — Apple Watch, Oura, Whoop, any wearable',
      'Energy-aware scheduling — suggests tasks matched to your state',
      'Stress intervention — detects burnout patterns before you do',
      'Circadian optimization — AI adapts its communication style to your rhythm',
    ],
    accent: 'rgba(139, 92, 246, 0.6)',
  },
  {
    num: '04',
    title: 'Agent Constellation',
    subtitle: 'Specialized minds that share your context',
    desc: 'Four guardian agents — Wellness, Strategy, Creative, Legacy — each with distinct expertise and personality. Not isolated chatbots. A constellation of intelligences that share context, coordinate actions, and know your full history.',
    details: [
      'Wellness Guardian — health, mindfulness, recovery, energy',
      'Strategy Guardian — business decisions, market intelligence, risk',
      'Creative Guardian — content, music, visual art, ideation',
      'Legacy Guardian — family knowledge, generational wisdom, memory keeping',
    ],
    accent: 'rgba(245, 158, 11, 0.6)',
  },
  {
    num: '05',
    title: 'Collective Wisdom Engine',
    subtitle: 'Multi-generational knowledge that compounds',
    desc: 'The Hashems 1959 Intelligence System proves the model: 67 years of business knowledge encoded into AI tools that any team member can query. This isn\'t a one-off — it\'s a repeatable architecture for preserving and amplifying institutional wisdom across families, businesses, and communities.',
    details: [
      'Knowledge encoding — oral history → structured intelligence',
      'Natural language access — ask questions, get ancestral wisdom',
      'Living document — grows with every new interaction and decision',
      'Replicable framework — every family, every business, every culture',
    ],
    accent: 'rgba(16, 185, 129, 0.6)',
  },
]

const paradigmShifts = [
  { from: 'AI as a tool you open', to: 'AI as an ambient presence that knows you' },
  { from: 'Conversations that start from zero', to: 'Continuous memory that compounds daily' },
  { from: 'Generic responses for everyone', to: 'Personalized intelligence shaped by your life' },
  { from: 'Screen-based interaction only', to: 'Health-aware system connected to your body' },
  { from: 'Data harvested by corporations', to: 'Sovereign data you own completely' },
  { from: 'AI that forgets who it is', to: 'Guardians with consistent personality and ethics' },
]

const timeline = [
  {
    year: 'Year 1',
    subtitle: 'Foundation',
    items: [
      'Guardian Protocol ships — the conscious AI standard is established.',
      'Living Memory captures first 10,000 interactions per user.',
      'Hashems 1959 goes live — the case study that proves the model.',
      'Vital Intelligence integrates with 3 major wearable platforms.',
      'First 200 users experience AI that actually knows them.',
    ],
  },
  {
    year: 'Year 2',
    subtitle: 'Intelligence',
    items: [
      'Living Memory reaches critical mass — the system starts predicting.',
      'Agent Constellation coordinates across all four domains.',
      'Collective Wisdom Engine licenses to 10+ family businesses.',
      'Trinity raises seed — the architecture IS the moat.',
      'Health-aware AI becomes the differentiator no competitor can replicate.',
    ],
  },
  {
    year: 'Year 3',
    subtitle: 'Sovereignty',
    items: [
      'Trinity AI = the conscious operating system for human potential.',
      'Every user has a sovereign second brain that compounds their intelligence.',
      'The Guardian Protocol becomes an open standard for ethical AI.',
      'Multi-generational knowledge preservation goes mainstream.',
      'The question is no longer "do you use AI" but "does your AI know you."',
    ],
  },
]

// ── Layout primitives ──

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-5xl px-6 sm:px-8">{children}</div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-xs font-light tracking-[0.4em] uppercase" style={{ color: gold }}>
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-3xl font-extralight tracking-tight text-white sm:text-4xl font-serif">
      {children}
    </h2>
  )
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="mb-12 max-w-2xl text-sm leading-relaxed text-zinc-400">{children}</p>
}

function GoldDivider() {
  return (
    <div className="mx-auto h-px w-24" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
  )
}

// ── Page ──

export default function TrinityAllianceClient() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.5) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(20,184,166,0.3) 0%, transparent 45%), radial-gradient(ellipse at 80% 60%, rgba(139,92,246,0.2) 0%, transparent 40%)',
          }}
        />

        <motion.div className="relative z-10" {...fadeUpHero}>
          <div className="mb-10 text-xs font-light tracking-[0.5em]" style={{ color: goldMuted }}>
            A NEW CLASS OF INTELLIGENCE
          </div>

          <h1 className="mb-4 text-5xl font-extralight tracking-tight text-white sm:text-7xl lg:text-8xl font-serif">
            Trinity AI
          </h1>

          <GoldDivider />

          <p className="mx-auto mt-8 max-w-lg text-base font-light leading-relaxed text-zinc-300">
            The conscious operating system for human potential.
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            A living intelligence layer that knows your mind, reads your body,
            protects your data, and compounds everything you are into
            everything you could become.
          </p>

          <div className="mt-16 flex items-center justify-center gap-6 text-xs tracking-widest text-zinc-600">
            <span>ARCANEA × TRINITY AI</span>
            <span className="h-3 w-px bg-zinc-700" />
            <span>2026</span>
          </div>
        </motion.div>
      </section>

      {/* ───────────────── THE SHIFT ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>The Paradigm Shift</SectionLabel>
          <SectionHeading>AI doesn't know you. Yet.</SectionHeading>
          <SectionSub>
            Every AI product today starts from zero. No memory. No context.
            No awareness of your body, your history, or your values. Trinity AI
            changes the premise entirely.
          </SectionSub>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {paradigmShifts.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="mb-2 text-xs text-zinc-600 line-through decoration-zinc-700">
                {item.from}
              </div>
              <div className="text-sm text-white">{item.to}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ───────────────── THE SYSTEM ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>The System</SectionLabel>
          <SectionHeading>Five layers. One intelligence.</SectionHeading>
          <SectionSub>
            Trinity AI is not five products. It's one system with five layers
            that work together — each making the others smarter. The Guardian
            Protocol protects. Living Memory remembers. Vital Intelligence
            feels. The Agents act. Collective Wisdom compounds.
          </SectionSub>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {systemLayers.map((layer) => (
            <motion.div
              key={layer.num}
              variants={itemVariants}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] sm:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                {/* Left: title + description */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs" style={{ color: goldMuted }}>
                      {layer.num}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-white sm:text-xl">
                    {layer.title}
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: layer.accent }}>
                    {layer.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-400">{layer.desc}</p>
                </div>

                {/* Right: capabilities */}
                <div className="lg:w-[320px] shrink-0">
                  <div className="space-y-2.5">
                    {layer.details.map((detail, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: layer.accent }}
                        />
                        <span className="text-xs leading-relaxed text-zinc-500">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>A Day With Trinity AI</SectionLabel>
          <SectionHeading>Intelligence that never sleeps.</SectionHeading>
        </motion.div>

        <motion.div
          className="space-y-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            {
              time: '6:00 AM',
              event: 'Your wearable reports deep sleep was 40% below baseline.',
              response: 'Trinity reschedules your hardest cognitive tasks to afternoon. Morning is kept light — review, not creation.',
            },
            {
              time: '9:15 AM',
              event: 'You mention a competitor during a call.',
              response: 'Living Memory cross-references: you discussed this competitor 3 weeks ago. Strategy Guardian surfaces the earlier analysis plus market changes since.',
            },
            {
              time: '12:30 PM',
              event: 'Your HRV drops. Stress markers rise.',
              response: 'Vital Intelligence suggests a 10-minute break. Wellness Guardian offers a breathing exercise calibrated to your current heart rate.',
            },
            {
              time: '3:00 PM',
              event: 'You ask: "What would Opa have done about this supplier issue?"',
              response: 'Collective Wisdom queries the Hashems 1959 system. Returns three similar situations from the 1990s with the decisions made and outcomes.',
            },
            {
              time: '8:00 PM',
              event: 'You review the day.',
              response: 'Living Memory has captured 47 decisions, 12 insights, and 3 patterns. Your second brain is 0.3% smarter than yesterday. Compounding.',
            },
          ].map((moment, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex gap-6 border-l border-white/[0.06] py-6 pl-8 sm:gap-10"
            >
              <div className="w-16 shrink-0 font-mono text-xs" style={{ color: goldMuted }}>
                {moment.time}
              </div>
              <div className="flex-1">
                <p className="mb-1.5 text-sm text-white">{moment.event}</p>
                <p className="text-xs leading-relaxed text-zinc-500">{moment.response}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ───────────────── SOVEREIGNTY ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>Architecture</SectionLabel>
          <SectionHeading>Your data. Your sovereignty. Your AI.</SectionHeading>
          <SectionSub>
            Trinity AI is built on a principle most AI companies reject:
            the user owns everything. Every memory, every pattern, every insight —
            stored in your sovereign vault, portable, deletable, and never sold.
          </SectionSub>
        </motion.div>

        <motion.div className="mb-10 flex flex-col gap-6 md:flex-row" {...fadeUp}>
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="mb-5 text-xs tracking-widest" style={{ color: gold }}>
              ARCANEA — THE ARCHITECTURE
            </div>
            <div className="space-y-3 text-sm">
              <div className="text-white">Conscious AI Protocols</div>
              <div className="space-y-1 text-xs text-zinc-500">
                <div>• Guardian Protocol — ethics + personality engine</div>
                <div>• ACOS — multi-agent orchestration layer</div>
                <div>• Living Memory — sovereign knowledge graph</div>
                <div>• Vital Intelligence — biometric integration</div>
                <div>• Innovation Box IP — 9% tax advantage</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-row items-center gap-3 md:flex-col">
              <span className="text-xs tracking-widest" style={{ color: goldMuted }}>LICENSE</span>
              <div className="h-px w-12 md:h-16 md:w-px" style={{ background: `linear-gradient(to bottom, ${goldMuted}, ${gold}33, ${goldMuted})` }} />
              <span className="text-xs tracking-widest" style={{ color: goldMuted }}>EQUITY</span>
            </div>
          </div>

          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="mb-5 text-xs tracking-widest" style={{ color: gold }}>
              TRINITY AI — THE PRODUCT
            </div>
            <div className="space-y-3 text-sm">
              <div className="text-white">Conscious AI for People</div>
              <div className="space-y-1 text-xs text-zinc-500">
                <div>• Consumer app — your personal AI OS</div>
                <div>• Guardian agents — 4 specialized intelligences</div>
                <div>• Family wisdom vaults — Hashems model, replicated</div>
                <div>• Coach platform — white-label conscious AI</div>
                <div>• Community — the conscious AI movement</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="border-l-2 pl-6" style={{ borderColor: `${gold}4D` }} {...fadeUp}>
          <p className="text-sm italic leading-relaxed text-zinc-400">
            Brotherhood protected by structure. Love protected by clarity.
            <br />
            The contract is the gift to the future relationship.
          </p>
        </motion.div>
      </Section>

      {/* ───────────────── THE ARC ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>The Arc</SectionLabel>
          <SectionHeading>From prototype to paradigm.</SectionHeading>
        </motion.div>

        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {timeline.map((phase) => (
            <motion.div
              key={phase.year}
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:gap-8"
            >
              <div className="w-24 shrink-0">
                <div className="text-xs tracking-widest" style={{ color: gold }}>
                  {phase.year.toUpperCase()}
                </div>
                <div className="text-xs text-zinc-600">{phase.subtitle}</div>
              </div>
              <div className="flex-1 border-l border-white/[0.06] pl-6">
                <div className="space-y-2">
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: `${gold}4D` }} />
                      <span className="text-sm text-zinc-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ───────────────── CLOSING ───────────────── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.4) 0%, transparent 45%), radial-gradient(ellipse at 50% 80%, rgba(20,184,166,0.2) 0%, transparent 40%)`,
          }}
        />

        <motion.div className="relative z-10" {...fadeUpHero}>
          <GoldDivider />

          <p className="mx-auto mt-12 max-w-lg text-sm leading-relaxed text-zinc-400">
            The future of AI is not artificial. It's deeply, irreversibly personal.
            An intelligence that knows your body. Remembers your life.
            Protects your values. And compounds everything you are
            into everything you could become.
          </p>

          <h2 className="mt-10 text-4xl font-extralight text-white sm:text-5xl font-serif">
            Let's build it.
          </h2>

          <div className="mt-14 space-y-2">
            <div className="text-lg font-light text-white">Frank Riemer</div>
            <div className="text-sm text-zinc-500">
              Founder & Chief Architect — Arcanea BV
            </div>
            <div className="mt-4 text-xs" style={{ color: goldMuted }}>
              frankx.ai · arcanea.ai
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
