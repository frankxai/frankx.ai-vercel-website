import { EmailSignup } from '@/components/email-signup'

export default function VibeOSFinalCTA() {
  return (
    <section id="interest" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(6,182,212,0.16),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="rounded-[2rem] border border-cyan-400/20 bg-space/80 p-7 backdrop-blur-sm sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300/70">Vibe OS interest</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Tell me if this should be built</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
            Join for one Vibe OS release update. After signup, you can optionally share your role, the job you need done, and what you would expect it to cost. This is not an app account or a purchase.
          </p>
          <div className="mt-8">
            <EmailSignup
              listType="courses-waitlist"
              source="/products/vibe-os"
              intent="vibe-os"
              intentLabel="Vibe OS"
              buttonText="Register interest"
              placeholder="you@company.com"
              showName
              askDemand
            />
          </div>
        </div>
      </div>
    </section>
  )
}
