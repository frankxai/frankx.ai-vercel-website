'use client'

import { useState } from 'react'

export default function ReplayDecision() {
  const [additional, setAdditional] = useState(0)
  const [withinBudget, setWithinBudget] = useState(true)
  const reopen = additional >= 2 && withinBudget
  return (
    <figure className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
      <figcaption className="text-sm font-semibold text-white">Replay the same twelve tickets</figcaption>
      <svg viewBox="0 0 340 96" className="my-3 w-full" role="img" aria-label="The same tickets run through the current and candidate models. A reviewer grades both blind.">
        <g fill="none" strokeWidth="1.5"><path d="M53 47 H76 Q84 47 84 39 V25 Q84 18 92 18 H114 M53 47 H76 Q84 47 84 55 V68 Q84 76 92 76 H114 M212 18 H224 Q232 18 232 26 V39 Q232 47 240 47 H258 M212 76 H224 Q232 76 232 68 V55 Q232 47 240 47 H258" stroke="#668896" /></g>
        <g fill="#152932" stroke="#3d6677"><rect x="114" y="4" width="98" height="29" rx="5"/><rect x="114" y="61" width="98" height="29" rx="5"/></g>
        <g fill="#e6f6fa" fontSize="12" fontFamily="system-ui" textAnchor="middle"><text x="26" y="51">Tickets</text><text x="163" y="23">Current</text><text x="163" y="80">Candidate</text><text x="296" y="51">Blind review</text></g>
      </svg>
      <label className="block text-sm" htmlFor="replay-gain">Additional failures resolved</label>
      <select className="mt-2 w-full rounded-md border border-slate-600 bg-slate-950 p-2 text-white" id="replay-gain"
        value={additional} onChange={e => setAdditional(Number(e.target.value))}>
        {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={withinBudget}
        onChange={e => setWithinBudget(e.target.checked)} /> Within the agreed review budget</label>
      <output className="block border-t border-white/15 pt-3 text-sm text-cyan-200" aria-live="polite">
        {reopen ? 'Reopen the routing decision. The candidate meets both conditions.' : 'Keep the current route. The candidate must resolve two more failures within budget.'}
      </output>
    </figure>
  )
}
