/**
 * Attendee self-serve portal.
 *
 * Route: /workshops/me/[token]
 *
 * Auth: stateless HMAC token (see lib/workshop-portal.ts).
 *
 * MVP choice: "Post your takeaway" logs to stdout via server action
 * rather than writing to engagements.json at runtime. Rationale:
 * Next.js RSC can't safely write files at runtime on Vercel (read-only
 * filesystem). The server action prints the submission to the Vercel
 * function log where Frank can review and add to engagements.json
 * via the CLI tools. A database write can replace this in a future
 * iteration without changing the UI contract.
 */

import { notFound } from 'next/navigation'
import { verifyToken } from '@/lib/workshop-portal'
import { FrankXOSHeader } from '@/components/os/FrankXOSHeader'
import peopleData from '@/data/crm/people.json'
import workshopsData from '@/data/crm/workshops.json'
import engagementsData from '@/data/crm/engagements.json'
import Link from 'next/link'
import {
  Calendar,
  Download,
  Share2,
  User,
  CheckCircle,
  Clock,
  ExternalLink,
} from 'lucide-react'

// ─── Server action (MVP: log to stdout) ──────────────────────────

async function submitTakeaway(formData: FormData) {
  'use server'
  const personId   = formData.get('person_id') as string
  const workshopId = formData.get('workshop_id') as string
  const platform   = formData.get('platform') as string
  const url        = formData.get('url') as string
  const text       = formData.get('text') as string

  // MVP: log the submission so Frank can manually add to engagements.json.
  // Replace with a direct engagements.json write or database upsert in v2.
  console.log('[portal-submission]', JSON.stringify({
    type: 'content-posted',
    person_id: personId,
    workshop_id: workshopId,
    date: new Date().toISOString().slice(0, 10),
    details: { platform, content_url: url, original_text: text, reposted_by_frank: false },
    created_at: new Date().toISOString(),
  }))
}

// ─── Data types ─────────────────────────────────────────────────

interface CRMPerson {
  id: string
  name: string
  email?: string
  role?: string
  org_ids?: string[]
  tags?: string[]
}

interface CRMWorkshop {
  id: string
  title: string
  date: string
  format?: string
  slug?: string
  mode?: string
  city?: string
  country?: string
  notes_path?: string
}

interface CRMEngagement {
  id: string
  person_id: string
  workshop_id: string
  type: string
  date: string
  details?: {
    platform?: string
    content_url?: string
    reposted_by_frank?: boolean
  }
}

// ─── Sub-components ───────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs text-zinc-500 w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-zinc-200">{value}</span>
    </div>
  )
}

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 ${className}`}>
      {children}
    </div>
  )
}

function AmplificationStatus({ engagements }: { engagements: CRMEngagement[] }) {
  const contentPosts = engagements.filter(e => e.type === 'content-posted')

  if (contentPosts.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Clock className="w-4 h-4" aria-hidden="true" />
        <span>No content posted yet</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {contentPosts.map(e => (
        <div key={e.id} className="flex items-start gap-3">
          {e.details?.reposted_by_frank ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
          ) : (
            <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
          )}
          <div>
            <div className="text-sm text-zinc-200 capitalize">{e.details?.platform ?? 'Unknown platform'}</div>
            {e.details?.content_url && (
              <a
                href={e.details.content_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 mt-0.5"
              >
                View post <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
            <div className="text-xs text-zinc-600 mt-0.5">
              {e.details?.reposted_by_frank ? 'Amplified by Frank' : 'Pending amplification'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Takeaway form ────────────────────────────────────────────────

function TakeawayForm({ personId, workshopId }: { personId: string; workshopId: string }) {
  return (
    <form action={submitTakeaway} className="space-y-4">
      <input type="hidden" name="person_id" value={personId} />
      <input type="hidden" name="workshop_id" value={workshopId} />

      <div>
        <label htmlFor="platform" className="block text-xs text-zinc-400 mb-1.5">
          Platform
        </label>
        <select
          id="platform"
          name="platform"
          required
          className="w-full rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-white/20"
        >
          <option value="" disabled>Select platform</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitter">Twitter / X</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>

      <div>
        <label htmlFor="url" className="block text-xs text-zinc-400 mb-1.5">
          Link to your post
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://linkedin.com/posts/..."
          className="w-full rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-xs text-zinc-400 mb-1.5">
          Your post text (optional — helps Frank write a better amplification)
        </label>
        <textarea
          id="text"
          name="text"
          rows={4}
          placeholder="Paste the text of your post here..."
          className="w-full rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20"
      >
        Submit takeaway
      </button>

      <p className="text-xs text-zinc-600">
        Frank reviews submissions and amplifies standout posts within the 14-day window.
      </p>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────

export default async function AttendeePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  // Check env config
  if (!process.env.WORKSHOP_PORTAL_SECRET) {
    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <FrankXOSHeader customLabel="Attendee portal" />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-3">Portal not configured</h1>
          <p className="text-zinc-400 text-sm">
            The attendee portal requires server configuration.
            Contact Frank at{' '}
            <a href="mailto:frank@frankx.ai" className="text-zinc-300 underline underline-offset-2">
              frank@frankx.ai
            </a>{' '}
            if you received a link that should work.
          </p>
        </div>
      </main>
    )
  }

  // Verify token
  const payload = verifyToken(token)
  if (!payload) {
    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <FrankXOSHeader customLabel="Attendee portal" />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-3">Link expired or invalid</h1>
          <p className="text-zinc-400 text-sm">
            This link may have expired or been used incorrectly.
            Reach Frank at{' '}
            <a href="mailto:frank@frankx.ai" className="text-zinc-300 underline underline-offset-2">
              frank@frankx.ai
            </a>{' '}
            to get a fresh link.
          </p>
        </div>
      </main>
    )
  }

  const { personId, workshopId } = payload

  // Load CRM data
  const people = peopleData as CRMPerson[]
  const workshops = workshopsData as CRMWorkshop[]
  const engagements = engagementsData as CRMEngagement[]

  const person   = people.find(p => p.id === personId)
  const workshop = workshops.find(w => w.id === workshopId)

  if (!person || !workshop) {
    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <FrankXOSHeader customLabel="Attendee portal" />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-3">Link expired or invalid</h1>
          <p className="text-zinc-400 text-sm">
            Contact Frank at{' '}
            <a href="mailto:frank@frankx.ai" className="text-zinc-300 underline underline-offset-2">
              frank@frankx.ai
            </a>{' '}
            for a fresh link.
          </p>
        </div>
      </main>
    )
  }

  const firstName = person.name.split(' ')[0]

  // Filter engagements for this person + this workshop
  const myEngagements = engagements.filter(
    e => e.person_id === personId && e.workshop_id === workshopId
  )

  const workshopSlug = workshop.slug ?? workshopId
  const workshopPageUrl = `/workshops/${workshopSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '').split('-').slice(0, -1).join('-') || workshopSlug}`

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <FrankXOSHeader customLabel="Attendee portal" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        {/* Greeting */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-zinc-500" aria-hidden="true" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Your portal</span>
          </div>
          <h1 className="text-3xl font-semibold text-zinc-50">
            Hi {firstName}
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Everything from the {workshop.title} session, in one place.
          </p>
        </div>

        {/* Workshop info */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-zinc-500" aria-hidden="true" />
            <h2 className="text-sm font-medium text-zinc-300">Workshop</h2>
          </div>
          <div className="space-y-2.5">
            <InfoRow label="Name" value={workshop.title} />
            <InfoRow label="Date" value={workshop.date} />
            {workshop.mode && <InfoRow label="Format" value={workshop.mode} />}
            {workshop.city && (
              <InfoRow label="Location" value={`${workshop.city}${workshop.country ? `, ${workshop.country}` : ''}`} />
            )}
          </div>
        </SectionCard>

        {/* Content kit */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-4 h-4 text-zinc-500" aria-hidden="true" />
            <h2 className="text-sm font-medium text-zinc-300">Content kit</h2>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            Your post-workshop content kit — LinkedIn draft, Twitter thread, blog recap template, and the framework one-pager.
          </p>
          {/* Placeholder — PDF generation is deferred per spec */}
          <div className="rounded-lg border border-dashed border-white/[0.12] px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">
              Content kit PDF coming within 24h of workshop delivery.
              Frank will email it to{' '}
              {person.email ? (
                <span className="text-zinc-400">{person.email}</span>
              ) : (
                <span className="text-zinc-400">your registered address</span>
              )}.
            </p>
          </div>
          <div className="mt-3">
            <Link
              href={workshopPageUrl}
              className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              Workshop page <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </SectionCard>

        {/* Amplification status */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-4 h-4 text-zinc-500" aria-hidden="true" />
            <h2 className="text-sm font-medium text-zinc-300">Your amplification loop</h2>
          </div>
          <AmplificationStatus engagements={myEngagements} />
        </SectionCard>

        {/* Post takeaway */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-4 h-4 text-zinc-500" aria-hidden="true" />
            <h2 className="text-sm font-medium text-zinc-300">Post your takeaway</h2>
          </div>
          <p className="text-sm text-zinc-400 mb-5">
            Published something about the session? Share it here. Frank amplifies standout posts within the 14-day window.
          </p>
          <TakeawayForm personId={personId} workshopId={workshopId} />
        </SectionCard>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-zinc-600">
            Questions?{' '}
            <a href="mailto:frank@frankx.ai" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              frank@frankx.ai
            </a>
          </p>
        </div>

      </div>
    </main>
  )
}
