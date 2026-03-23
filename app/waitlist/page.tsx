import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Waitlist | FrankX',
  description:
    'Join the FrankX waitlist for planned courses, product launches, and early-access announcements.',
  path: '/waitlist',
})

type WaitlistPageProps = {
  searchParams?: {
    intent?: string
  }
}

const intentLabelMap: Record<string, string> = {
  'course-conscious-ai-foundations': 'Conscious AI Foundations',
  'course-agent-architecture-systems': 'Agent Architecture Systems',
  'course-creator-business-systems': 'Creator Business Systems',
}

export default function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const intent = searchParams?.intent ?? ''
  const selectedIntentLabel = intentLabelMap[intent]

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-3xl px-6 py-20 pt-28 space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70">FrankX Waitlist</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get early access updates</h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Join once and get launch updates for planned courses and product releases.
          </p>
        </header>

        {selectedIntentLabel && (
          <section className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-100/90">
            Interest tagged: <span className="font-semibold">{selectedIntentLabel}</span>
          </section>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <EmailSignup
            listType="courses-waitlist"
            showName
            buttonText="Join Waitlist"
            placeholder="you@company.com"
          />
        </section>
      </div>
    </main>
  )
}
