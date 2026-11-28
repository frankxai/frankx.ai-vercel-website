'use client'

import { useState } from 'react'
import { trackPrivacySafeAnalyticsEvent } from '@/lib/privacy-safe-analytics-client'

export default function ScheduleLink({ href }: { href: string }) {
  const [fits, setFits] = useState(false)
  return <div className="mt-5">
    <label className="flex items-start gap-3 text-slate-200">
      <input className="mt-1" type="checkbox" checked={fits} onChange={e => setFits(e.target.checked)} />
      <span>I own this decision and can bring one redacted page or diagram.</span>
    </label>
    <div aria-live="polite" className="mt-4">
      {fits ? <a href={href} referrerPolicy="no-referrer"
        onClick={() => trackPrivacySafeAnalyticsEvent('advisory_schedule_opened', { scope: 'decision' })}
        className="inline-flex min-h-12 items-center rounded-xl bg-cyan-200 px-5 font-semibold text-slate-950">
        Choose a time and pay
      </a> : <p className="text-sm text-slate-400">Confirm the scope to see available times.</p>}
    </div>
  </div>
}
