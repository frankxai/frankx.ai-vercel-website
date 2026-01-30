import { Metadata } from 'next'
import AuroraGradient from '@/components/ui/AuroraGradient'

export const metadata: Metadata = {
  title: 'Design System | FrankX.AI',
  description: 'FrankX design system components, gradients, and patterns.',
}

const gradientVariants = [
  {
    name: 'Default',
    variant: 'default' as const,
    description: 'The signature FrankX aurora gradient. Emerald, cyan, and amber create a balanced, professional look.',
    useCase: 'Hero sections, feature cards, general brand applications',
    colors: ['Emerald-500', 'Cyan-400', 'Amber-500'],
  },
  {
    name: 'Emerald',
    variant: 'emerald' as const,
    description: 'Focused green tones for growth, nature, and success themes.',
    useCase: 'Success states, growth metrics, environmental content',
    colors: ['Emerald-500', 'Emerald-400', 'Emerald-400'],
  },
  {
    name: 'Purple',
    variant: 'purple' as const,
    description: 'Creative and spiritual energy with purple and pink tones.',
    useCase: 'Soulbook content, creative sections, spiritual themes',
    colors: ['Purple-600', 'Purple-400', 'Pink-500'],
  },
  {
    name: 'Sunset',
    variant: 'sunset' as const,
    description: 'Warm, energetic gradient for calls-to-action and urgency.',
    useCase: 'CTAs, promotional banners, high-energy sections',
    colors: ['Orange-400', 'Amber-500', 'Red-500'],
  },
  {
    name: 'Ocean',
    variant: 'ocean' as const,
    description: 'Cool, professional blues for enterprise and calm content.',
    useCase: 'Enterprise pages, professional content, calm interfaces',
    colors: ['Cyan-500', 'Blue-500', 'Indigo-500'],
  },
  {
    name: 'Minimal',
    variant: 'minimal' as const,
    description: 'Subtle single-color glow for understated elegance.',
    useCase: 'Backgrounds, subtle accents, minimal interfaces',
    colors: ['Emerald-500'],
  },
]

const intensityLevels = ['subtle', 'normal', 'vibrant'] as const

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-6">
              Design System
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Aurora Gradient System
            </h1>
            <p className="text-lg text-white/60 max-w-3xl">
              The FrankX signature gradient creates depth and visual interest through layered
              radial gradients with a subtle noise texture. Available in six variants for
              different content contexts.
            </p>
          </div>

          {/* Gradient Variants */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">Gradient Variants</h2>
            <div className="grid gap-8">
              {gradientVariants.map((item) => (
                <div key={item.variant} className="grid lg:grid-cols-2 gap-6 items-stretch">
                  {/* Preview */}
                  <AuroraGradient
                    variant={item.variant}
                    className="rounded-2xl border border-white/10 p-8 min-h-[200px] flex flex-col justify-center"
                  >
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 w-fit mb-4">
                      {item.name}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Sample Heading
                    </h3>
                    <p className="text-white/70">
                      This is how content appears on the {item.name.toLowerCase()} gradient variant.
                    </p>
                  </AuroraGradient>

                  {/* Details */}
                  <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-8">
                    <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
                    <p className="text-white/60 mb-4">{item.description}</p>

                    <div className="mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Use Case</span>
                      <p className="text-white/70 text-sm mt-1">{item.useCase}</p>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Colors</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.colors.map((color, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-mono text-white/80 bg-white/10 rounded"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Code */}
                    <div className="mt-4 p-3 bg-slate-950 rounded-lg">
                      <code className="text-sm text-emerald-400">
                        {`<AuroraGradient variant="${item.variant}">`}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Intensity Levels */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-4">Intensity Levels</h2>
            <p className="text-white/60 mb-8 max-w-2xl">
              Control the gradient opacity with three intensity levels. Use subtle for backgrounds,
              normal for most UI, and vibrant for emphasis.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {intensityLevels.map((intensity) => (
                <AuroraGradient
                  key={intensity}
                  variant="default"
                  intensity={intensity}
                  className="rounded-2xl border border-white/10 p-8 text-center"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Intensity
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 capitalize">{intensity}</h3>
                  <p className="text-white/60 text-sm mt-2">
                    {intensity === 'subtle' && 'Opacity: 50%'}
                    {intensity === 'normal' && 'Opacity: 70%'}
                    {intensity === 'vibrant' && 'Opacity: 100%'}
                  </p>
                  <div className="mt-4 p-2 bg-slate-950/50 rounded">
                    <code className="text-xs text-emerald-400">
                      intensity=&quot;{intensity}&quot;
                    </code>
                  </div>
                </AuroraGradient>
              ))}
            </div>
          </section>

          {/* Noise Toggle */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-4">Noise Texture</h2>
            <p className="text-white/60 mb-8 max-w-2xl">
              The subtle noise texture adds organic depth. Disable it for a cleaner look.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <AuroraGradient
                variant="default"
                showNoise={true}
                className="rounded-2xl border border-white/10 p-8 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">With Noise</h3>
                <p className="text-white/60 text-sm">Default behavior - adds organic texture</p>
                <div className="mt-4 p-2 bg-slate-950/50 rounded">
                  <code className="text-xs text-emerald-400">showNoise=&#123;true&#125;</code>
                </div>
              </AuroraGradient>

              <AuroraGradient
                variant="default"
                showNoise={false}
                className="rounded-2xl border border-white/10 p-8 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Without Noise</h3>
                <p className="text-white/60 text-sm">Cleaner, smoother appearance</p>
                <div className="mt-4 p-2 bg-slate-950/50 rounded">
                  <code className="text-xs text-emerald-400">showNoise=&#123;false&#125;</code>
                </div>
              </AuroraGradient>
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Usage</h2>
            <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-8">
              <pre className="text-sm text-white/80 overflow-x-auto">
                <code>{`import AuroraGradient from '@/components/ui/AuroraGradient'

// Basic usage
<AuroraGradient className="rounded-3xl p-8">
  <h2>Your content</h2>
</AuroraGradient>

// With options
<AuroraGradient
  variant="purple"      // default | emerald | purple | sunset | ocean | minimal
  intensity="vibrant"   // subtle | normal | vibrant
  showNoise={true}      // true | false
  as="section"          // div | section | header | article
  className="rounded-xl border border-white/10"
>
  <YourContent />
</AuroraGradient>`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
