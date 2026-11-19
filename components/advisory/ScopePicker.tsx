'use client'

import { useState } from 'react'
import { trackPrivacySafeAnalyticsEvent } from '@/lib/privacy-safe-analytics-client'

const choices = [
  { id: 'decision', label: 'Choose between two approaches', detail: 'Bring the decision, who owns it and one redacted page. A 30-minute review fits one choice.', href: '/work-with-me/decision-review#request', action: 'Discuss this decision' },
  { id: 'intensive', label: 'Design a pilot for one customer workflow', detail: 'Bring the customer use case and the engineer who will run the pilot.', href: '/work-with-me/intensive', action: 'Explore the intensive' },
  { id: 'partner', label: 'Review recurring architecture decisions', detail: 'For returning clients with an internal implementer and a backlog of decisions.', href: '/work-with-me/architecture-partner', action: 'Explore Architecture Partner' },
  { id: 'academy', label: 'Learn the method independently', detail: 'Start with the open curriculum and inspect an architecture pattern at your own pace.', href: '/ai-architect-academy', action: 'Open the Academy' },
  { id: 'host', label: 'Teach a university or accelerator cohort', detail: 'For programme directors planning a guest lecture, practical lab or student challenge.', href: '/partnerships/universities', action: 'Explore hosted programmes' },
] as const

export default function ScopePicker() {
  const [selected, setSelected] = useState<string>(choices[0].id)
  const choice = choices.find(item => item.id === selected)!
  return (
    <div className="max-w-xl">
      <label htmlFor="advisory-scope" className="block text-lg font-semibold text-white">What do you need to do?</label>
      <select id="advisory-scope" value={selected} onChange={event => {
        setSelected(event.target.value)
        trackPrivacySafeAnalyticsEvent('advisory_scope_selected', { scope: event.target.value })
      }} className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white">
        {choices.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
      <div aria-live="polite" className="mt-4">
        <p className="text-slate-300">{choice.detail}</p>
        <a href={choice.href} className="mt-2 inline-flex min-h-11 items-center text-cyan-300 underline underline-offset-4"
          onClick={() => trackPrivacySafeAnalyticsEvent('advisory_route_opened', { scope: choice.id })}>{choice.action}</a>
      </div>
    </div>
  )
}
