import { Target, Bot, CheckCircle, Palette, Share2 } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Choose Your Intent',
    description:
      'Select the emotion, genre, or use case for your track. Deep work focus? Creative brainstorm? Cinematic energy? The system adapts.',
    icon: Target,
    gradient: 'from-cyan-500 to-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  {
    number: 2,
    title: 'AI Generates Prompts',
    description:
      'The Music Producer agent crafts Suno-ready prompts with precise BPM, key, mode, and instrumentation — calibrated for your intended cognitive state.',
    icon: Bot,
    gradient: 'from-cyan-500 to-violet-500',
    glow: 'shadow-violet-500/20',
  },
  {
    number: 3,
    title: 'Create & Validate',
    description:
      'Generate your track in Suno, then run it through the 15-point quality rubric. Composition, production, flow state optimization, commercial viability — all scored.',
    icon: CheckCircle,
    gradient: 'from-violet-500 to-violet-400',
    glow: 'shadow-violet-500/20',
  },
  {
    number: 4,
    title: 'Visual & Branding',
    description:
      'AI-generated album art via Gemini or Midjourney. KlingAI animation templates for social media loops. Complete visual identity in minutes.',
    icon: Palette,
    gradient: 'from-violet-500 to-emerald-500',
    glow: 'shadow-emerald-500/20',
  },
  {
    number: 5,
    title: 'Distribute & Monetize',
    description:
      'Push to Spotify, Apple Music, TikTok, and YouTube with the distribution playbook. Licensing pathways and revenue optimization included.',
    icon: Share2,
    gradient: 'from-emerald-500 to-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
]

export default function VibeOSHowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
            The Workflow
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            How Vibe OS{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            From idea to distributed track in 5 steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Connector Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px sm:left-8">
            <div className="h-full w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500 opacity-30" />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step) => {
              const Icon = step.icon

              return (
                <div key={step.number} className="relative flex gap-6 sm:gap-8">
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} shadow-lg ${step.glow} sm:h-16 sm:w-16`}
                    >
                      <span className="text-lg font-bold text-white sm:text-xl">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Content Card */}
                  <div className="spotlight-card flex-1 p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`inline-flex rounded-xl bg-gradient-to-br ${step.gradient} p-2.5 shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white sm:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
