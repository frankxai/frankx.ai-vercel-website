'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeUp, fadeUpHero } from '@/lib/motion'

// ── Brand tokens ──
const gold = '#D4AF37'
const goldMuted = 'rgba(212, 175, 55, 0.4)'
const goldSubtle = 'rgba(212, 175, 55, 0.1)'

// ── Data ──

const gaps = [
  { problem: 'JARVIS has no persistent memory', consequence: 'Every conversation starts from zero' },
  { problem: 'UBC has no personality protocol', consequence: 'Indistinguishable from ChatGPT' },
  { problem: 'OpenClaw has no guardrails', consequence: 'One bad response = trust collapse' },
  { problem: 'Hashems has no AI operating layer', consequence: '67 years of knowledge trapped in heads' },
  { problem: 'No technical co-founder', consequence: 'Vision stays a vision' },
]

const products = [
  {
    num: '01',
    title: 'Conscious AI Guardrails Framework',
    desc: 'Production-ready protocol for agent personality, ethics, memory continuity. The difference between a demo and a product.',
    value: 'Makes Trinity investable — this IS the technical moat.',
  },
  {
    num: '02',
    title: 'ACOS Trinity Edition',
    desc: 'Multi-agent orchestration. Content, community, coaching, client intake — all automated through coordinated AI agents.',
    value: '3-person team produces output of 15. €600K equivalent labor value.',
  },
  {
    num: '03',
    title: 'Hashems 1959 Intelligence System',
    desc: '67 years of business knowledge encoded into 25+ MCP tools. Any team member queries institutional memory via natural language.',
    value: 'Pays for the alliance on day one. THE case study for every SMB prospect.',
  },
  {
    num: '04',
    title: 'Guardian Agent Products',
    desc: '4 specialized AI agents (Wellness, Strategy, Creative, Transformation) — each with distinct personality, expertise, and guardrails.',
    value: 'Revenue from day one. Each agent targets a different market segment.',
  },
  {
    num: '05',
    title: 'Template & Agent Marketplace',
    desc: 'Joint revenue on every Vercel template, n8n workflow, and agent blueprint. Community distributes, both sides earn.',
    value: 'Passive revenue that scales with community growth.',
  },
]

const roiStreams = [
  { product: 'Guardian Agent Subscriptions', revenue: '€2,450/mo', detail: '50 users × €49', desc: 'Revenue from day one — each agent targets a different market segment' },
  { product: 'SMB Intelligence Systems', revenue: '€4,500/mo', detail: '3 clients/quarter', desc: 'Hashems becomes THE case study for every SMB prospect' },
  { product: 'ACOS White-Label (Coaches)', revenue: '€3,980/mo', detail: '20 coaches × €199', desc: 'Coaches deploy your branded AI system to their clients' },
  { product: 'Workshop Templates', revenue: '€2,910/mo', detail: '30 sales × €97', desc: 'Digital products that sell while you sleep' },
  { product: 'Conscious Business Course', revenue: '€7,455/mo', detail: '15 sales × €497', desc: 'Premium course powered by Guardian AI mentorship' },
]

const timeline = [
  {
    year: 'Year 1',
    subtitle: 'Foundation',
    items: [
      'Guardian agents deploy — Trinity has AI products on day one.',
      'Hashems goes AI-native. The case study that sells every future deal.',
      'Trinity generates €21K+/mo in product revenue by month 9.',
      'Technical moat established — Trinity becomes investable.',
      'FrankX.ai content drives inbound leads for Trinity products.',
    ],
  },
  {
    year: 'Year 2',
    subtitle: 'Scale',
    items: [
      'Guardian marketplace hits 200+ paying subscribers.',
      'Trinity raises seed round — Arcanea architecture is the moat.',
      'White-label ACOS powers 50+ coaches under Trinity brand.',
      'Ahmed\'s network becomes a distribution channel for AI products.',
      'Trinity revenue: €250K+ and growing.',
    ],
  },
  {
    year: 'Year 3',
    subtitle: 'Ecosystem',
    items: [
      'Trinity AI = the conscious AI platform for entrepreneurs.',
      'Marketplace generates passive revenue at scale.',
      'Ahmed speaks globally as the face of conscious AI business.',
      'The alliance model replicates — Trinity licenses to partners.',
      'From startup to ecosystem. From vision to movement.',
    ],
  },
]

// ── Section wrapper ──

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-5xl px-6 sm:px-8">{children}</div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-4 text-xs font-light tracking-[0.4em] uppercase"
      style={{ color: gold }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-10 text-3xl font-extralight tracking-tight text-white sm:text-4xl font-serif">
      {children}
    </h2>
  )
}

// ── Divider ──

function GoldDivider() {
  return (
    <div
      className="mx-auto h-px w-24"
      style={{
        background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
      }}
    />
  )
}

// ── Page ──

export default function TrinityAllianceClient() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Ambient gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.5) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(20,184,166,0.25) 0%, transparent 50%)',
          }}
        />

        <motion.div className="relative z-10" {...fadeUpHero}>
          <div
            className="mb-8 text-xs font-light tracking-[0.5em]"
            style={{ color: goldMuted }}
          >
            STRATEGIC ALLIANCE PROPOSAL
          </div>

          <h1 className="mb-2 text-5xl font-extralight tracking-tight text-white sm:text-7xl font-serif">
            ARCANEA
          </h1>

          <div
            className="mb-2 text-xl tracking-[0.3em]"
            style={{ color: `${gold}60` }}
          >
            ×
          </div>

          <h1 className="mb-14 text-5xl font-extralight tracking-tight text-white sm:text-7xl font-serif">
            TRINITY AI
          </h1>

          <GoldDivider />

          <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed tracking-wider text-zinc-400">
            Two sovereign architectures. One shared infrastructure.
            <br />A partnership that compounds.
          </p>

          <div className="mt-16 text-xs tracking-widest text-zinc-600">
            APRIL 2026
          </div>
        </motion.div>
      </section>

      {/* ───────────────── THE GAP ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>The Gap</SectionLabel>
          <SectionHeading>
            Vision without architecture is a pitch deck.
          </SectionHeading>
        </motion.div>

        <motion.div
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {gaps.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex items-start gap-4"
            >
              <div
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full transition-transform group-hover:scale-150"
                style={{ backgroundColor: gold }}
              />
              <div>
                <span className="text-sm text-white/90">{item.problem}</span>
                <span className="ml-2 text-sm text-zinc-500">
                  → {item.consequence}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 border-l-2 pl-6"
          style={{ borderColor: `${gold}4D` }}
          {...fadeUp}
        >
          <p className="text-sm italic leading-relaxed text-zinc-400">
            Frank has spent 18 months building the exact architecture Trinity is
            missing. This isn't a search. It's a recognition.
          </p>
        </motion.div>
      </Section>

      {/* ───────────────── 5 PRODUCTS ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>What Arcanea Delivers</SectionLabel>
          <SectionHeading>Five products. Not hours.</SectionHeading>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((item) => (
            <motion.div
              key={item.num}
              variants={itemVariants}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-colors hover:border-[#D4AF37]/20"
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-0.5 font-mono text-xs"
                  style={{ color: goldMuted }}
                >
                  {item.num}
                </span>
                <div>
                  <h3 className="mb-1.5 text-sm font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-xs leading-relaxed text-zinc-500">
                    {item.desc}
                  </p>
                  <p className="text-xs" style={{ color: `${gold}B3` }}>
                    ↗ {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ───────────────── TRINITY'S ROI ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>Trinity's ROI</SectionLabel>
          <SectionHeading>
            The alliance pays for itself in 5 months.
          </SectionHeading>
        </motion.div>

        {/* Invest vs Generate comparison */}
        <motion.div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2" {...fadeUp}>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="mb-3 text-xs tracking-widest" style={{ color: `${gold}99` }}>
              AHMED INVESTS
            </div>
            <div className="text-3xl font-extralight text-white">
              €10K<span className="text-lg text-zinc-500">/mo</span>
            </div>
            <div className="text-xs text-zinc-500">Full-stack AI architecture, IP, and products</div>
          </div>
          <div className="rounded-xl border bg-white/[0.03] p-6" style={{ borderColor: `${gold}33` }}>
            <div className="mb-3 text-xs tracking-widest" style={{ color: `${gold}99` }}>
              TRINITY GENERATES
            </div>
            <div className="text-3xl font-extralight text-white">
              €21K+<span className="text-lg text-zinc-500">/mo</span>
            </div>
            <div className="text-xs text-zinc-500">By month 9 from Arcanea-powered products</div>
          </div>
        </motion.div>

        {/* Revenue streams */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {roiStreams.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="mb-0.5 text-sm text-white">{item.product}</div>
                <div className="text-xs text-zinc-600">{item.desc}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-600">{item.detail}</span>
                <span className="text-sm font-light text-white">{item.revenue}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison callout */}
        <motion.div className="mt-8 border-t border-white/[0.06] pt-6" {...fadeUp}>
          <p className="text-xs text-zinc-500">
            vs. hiring a senior AI engineer: €156–195K/year for ONE person with no frameworks, no IP, no architecture vision.
            With this alliance, Trinity gets an entire AI architecture team, proprietary frameworks, and 5 revenue-generating products.
          </p>
        </motion.div>
      </Section>

      {/* ───────────────── SOVEREIGNTY STRUCTURE ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>Sovereignty Structure</SectionLabel>
          <SectionHeading>Two kingdoms. One alliance.</SectionHeading>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col gap-6 md:flex-row"
          {...fadeUp}
        >
          {/* Frank's Domain */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div
              className="mb-5 text-xs tracking-widest"
              style={{ color: gold }}
            >
              FRANK'S DOMAIN
            </div>
            <div className="space-y-3 text-sm">
              <div className="text-zinc-400">
                Starlight Holding BV{' '}
                <span className="text-zinc-600">(parent)</span>
              </div>
              <div className="text-center text-zinc-600">↓</div>
              <div className="text-white">
                Arcanea BV{' '}
                <span className="text-zinc-600">(all ops + IP)</span>
              </div>
              <div className="text-center text-zinc-600">↓</div>
              <div className="space-y-1 text-xs text-zinc-500">
                <div>• Owns all frameworks & protocols</div>
                <div>• Innovation Box eligible (9%)</div>
                <div>• Licenses to Trinity + future clients</div>
                <div>• Revocable with 6mo notice</div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center">
            <div className="flex flex-row items-center gap-3 md:flex-col">
              <span
                className="text-xs tracking-widest"
                style={{ color: goldMuted }}
              >
                LICENSE
              </span>
              <div
                className="h-px w-12 md:h-16 md:w-px"
                style={{
                  background: `linear-gradient(to bottom, ${goldMuted}, ${gold}33, ${goldMuted})`,
                }}
              />
              <span
                className="text-xs tracking-widest"
                style={{ color: goldMuted }}
              >
                EQUITY
              </span>
            </div>
          </div>

          {/* Ahmed's Domain */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div
              className="mb-5 text-xs tracking-widest"
              style={{ color: gold }}
            >
              AHMED'S DOMAIN
            </div>
            <div className="space-y-3 text-sm">
              <div className="text-zinc-400">
                Trinity AI <span className="text-zinc-600">(entity)</span>
              </div>
              <div className="text-center text-zinc-600">↓</div>
              <div className="text-white">Products & Community</div>
              <div className="text-center text-zinc-600">↓</div>
              <div className="space-y-1 text-xs text-zinc-500">
                <div>• Deploys licensed architecture</div>
                <div>• Owns brand, community, content</div>
                <div>• Frank holds 15–20% equity</div>
                <div>• Non-exclusive terms</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="border-l-2 pl-6"
          style={{ borderColor: `${gold}4D` }}
          {...fadeUp}
        >
          <p className="text-sm italic leading-relaxed text-zinc-400">
            Brotherhood protected by structure. Love protected by clarity.
            <br />
            The contract is the gift to the future relationship.
          </p>
        </motion.div>
      </Section>

      {/* ───────────────── 3-YEAR ARC ───────────────── */}
      <Section>
        <motion.div {...fadeUp}>
          <SectionLabel>The Arc</SectionLabel>
          <SectionHeading>From alliance to ecosystem.</SectionHeading>
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
                      <div
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: `${gold}4D` }}
                      />
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
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.4) 0%, transparent 50%)`,
          }}
        />

        <motion.div className="relative z-10" {...fadeUpHero}>
          <GoldDivider />

          <h2 className="mt-12 text-4xl font-extralight text-white sm:text-5xl font-serif">
            Let's build.
          </h2>

          <div className="mt-12 space-y-2">
            <div className="text-lg font-light text-white">Frank Riemer</div>
            <div className="text-sm text-zinc-500">
              Founder & Chief Architect — Arcanea BV
            </div>
            <div
              className="mt-4 text-xs"
              style={{ color: goldMuted }}
            >
              frankx.ai · arcanea.ai
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
