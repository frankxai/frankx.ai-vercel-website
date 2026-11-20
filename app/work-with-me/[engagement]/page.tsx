import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import ReplayDecision from '@/components/advisory/ReplayDecision'
import ScopePicker from '@/components/advisory/ScopePicker'
import ScheduleLink from '@/components/advisory/ScheduleLink'
import { paidAppointment, reviewedDecisionSchedule } from '@/lib/advisory-booking'

const offers = {
  'decision-review': {
    name: 'AI Architecture Decision Review',
    headline: 'Decide what your AI product needs before the next build.',
    lead: 'Bring me one choice your team needs to make. We’ll compare the evidence for each option and settle on a test your engineer can run.',
    format: '30 minutes · One decision-maker',
    prepare: 'One redacted page or diagram, the two options and the date the decision is due.',
    result: 'A one-page recommendation by the next business day, with the next test and the evidence that would change my mind.',
  },
  intensive: {
    name: 'AI Product & Architecture Intensive',
    headline: 'Give your engineer a pilot they can run.',
    lead: 'When a customer wants a pilot, bring the person who owns the workflow and the engineer who will implement it. We’ll work through one real case together.',
    format: '90 minutes · Up to three participants',
    prepare: 'One customer workflow, an example of a successful outcome and the way the team handles it today.',
    result: 'Within three business days, a system sketch, a manual baseline, an outline of the acceptance cases and a fourteen-day pilot plan.',
  },
  'architecture-partner': {
    name: 'Architecture Partner',
    headline: 'Keep a decision record your team can act on.',
    lead: 'For founders and CTOs I’ve already worked with. We review the decisions coming up in your pilot and keep the reasoning available to the engineer doing the work.',
    format: '30-day engagement · Four reviews',
    prepare: 'A completed engagement, a backlog of decisions and one internal owner with time to implement.',
    result: 'A maintained decision log, reviewed pilot evidence and a month-end memo. At handover we agree whether to stop, renew or change the scope.',
  },
} as const

type OfferKey = keyof typeof offers
type PageProps = { params: Promise<{ engagement: string }> }
function isOffer(value: string): value is OfferKey { return Object.hasOwn(offers, value) }

export function generateStaticParams() { return Object.keys(offers).map(engagement => ({ engagement })) }
export const dynamicParams = false
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { engagement } = await params
  if (!isOffer(engagement)) notFound()
  const offer = offers[engagement]
  return { title: offer.name, description: offer.lead, alternates: { canonical: '/work-with-me/' + engagement } }
}

const small = 'text-xs font-medium uppercase tracking-[0.16em] text-cyan-300'
const link = 'inline-flex min-h-11 items-center gap-1 text-cyan-300 underline underline-offset-4'

function SampleMemo() {
  return <aside aria-labelledby="sample-title" className="self-start rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-slate-900 to-[#0a1017] p-6 sm:p-8">
    <p className={small}>Worked example · Synthetic</p>
    <h2 id="sample-title" className="mt-5 font-serif text-3xl text-white">Should we add a second model?</h2>
    <p className="mt-4 text-slate-300">The support team has twelve redacted tickets and a working demo. Nobody has scored the current model on those tickets.</p>
    <div className="my-6 border-y border-white/15 py-5">
      <p className="text-sm font-semibold text-cyan-200">Decision</p><p className="mt-2 text-lg text-white">Keep the current route for the first replay.</p>
    </div>
    <details className="group">
      <summary className="min-h-11 cursor-pointer text-slate-100">What would change the decision?</summary>
      <p className="mt-2 text-slate-300">Have an engineer grade both routes blind. Reopen routing if the second model resolves at least two more failures within the team’s review budget. The team sets that threshold before the replay.</p>
      <ReplayDecision />
    </details>
  </aside>
}

export default async function EngagementPage({ params }: PageProps) {
  const { engagement } = await params
  if (!isOffer(engagement)) notFound()
  const offer = offers[engagement]
  const review = engagement === 'decision-review'
  const booking = review ? paidAppointment(reviewedDecisionSchedule) : null
  return <main className="min-h-screen bg-[#0a0a0b] text-slate-200">
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 lg:pt-36">
      <Link href="/work-with-me" className={link}>Work with Frank</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <header>
          <p className={small}>{offer.name}</p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-5xl leading-[1.08] tracking-tight text-white sm:text-6xl">{offer.headline}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{offer.lead}</p>
          <p className="mt-5 font-medium text-white">{offer.format}</p>
          <a href="#request" className={link}>{booking ? 'See booking details' : 'Discuss your brief'} <ArrowUpRight size={16} aria-hidden /></a>
        </header>
        {review ? <SampleMemo /> : <aside className="self-start rounded-2xl border border-white/15 p-7">
          <h2 className="font-serif text-3xl text-white">What you keep</h2><p className="mt-4 leading-7 text-slate-300">{offer.result}</p>
          <Link className={link} href="/ai-architect-academy">Inspect the architecture patterns</Link>
        </aside>}
      </div>
      <section className="mt-14 grid gap-8 border-y border-white/15 py-8 sm:grid-cols-2">
        <div><h2 className="text-xl font-semibold text-white">What to bring</h2><p className="mt-2 leading-7">{offer.prepare}</p></div>
        <div><h2 className="text-xl font-semibold text-white">{review ? 'What you keep' : 'Who does the work'}</h2><p className="mt-2 leading-7">{review ? offer.result : 'Frank runs the review. Your team owns implementation. Starlight can scope engineering separately when you need delivery support.'}</p></div>
      </section>
      <section id="request" className="grid scroll-mt-24 gap-8 border-b border-white/15 py-12 lg:grid-cols-2">
        <div><h2 className="font-serif text-3xl text-white">{booking ? 'Book the review' : 'Discuss your brief'}</h2>
          <p className="mt-4 max-w-md leading-7">{booking ? 'Google Calendar shows available times in your timezone. Complete payment there to confirm your appointment.' : 'Describe the decision, the person responsible and when you need an answer. Frank will confirm scope and availability. Keep sensitive material out of the inquiry.'}</p>
          {review && !booking && <p className="mt-4 text-sm text-slate-400">Paid booking is currently closed. An inquiry reserves no time.</p>}
          <Link className={link} href="/workshops/for-educators">See Frank’s teaching materials</Link>
        </div>
        {booking ? <div><p className="text-2xl font-semibold text-white">{booking.fee} <span className="text-sm">{booking.taxLabel}</span></p><ScheduleLink href={booking.href} /></div> : <ContactForm defaultIntent="advisory" />}
      </section>
      <section className="py-10"><ScopePicker /></section>
    </div>
  </main>
}
