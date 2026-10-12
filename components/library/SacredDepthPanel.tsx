import type { SacredDepth } from '@/data/sacred-depth';

const rightsLabel: Record<SacredDepth['translation']['rightsBasis'], string> = {
  'public-domain': 'Rights ledger: recorded as a public-domain translation',
  quotation: 'Short attributed quotation',
  'locator-only': 'No wording reproduced',
};

function claimBasis(label: string, value: string): 'Established' | 'Emerging' | 'Experiential' | 'Symbolic' {
  if (label === 'First full reading') return 'Experiential';
  if (label === 'Language' || label === 'Form') return 'Established';
  if (/belief|Revealed by/i.test(value)) return 'Symbolic';
  if (/debat|contest|proposed|usually dated|most often|argue/i.test(value)) return 'Emerging';
  return 'Established';
}

export function SacredDepthPanel({ depth }: { depth: SacredDepth }) {
  const facts = [
    { label: 'Origin', value: depth.facts.origin },
    { label: 'Language', value: depth.facts.language },
    { label: 'Form', value: depth.facts.form },
    { label: 'First full reading', value: depth.facts.firstRead },
  ].map(fact => ({ ...fact, basis: claimBasis(fact.label, fact.value) }));
  const locatorOnly = depth.translation.rightsBasis === 'locator-only';
  return <section aria-labelledby="sacred-depth-heading" className="mx-auto max-w-3xl px-6 pb-14">
    <div className="border-t border-white/15 pt-8">
      <h2 id="sacred-depth-heading" className="text-2xl font-semibold text-white">At a glance</h2>
      <dl className="mt-5 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {facts.map(fact => <div key={fact.label} className="bg-[#0a0a0b] p-4">
          <dt className="text-xs uppercase tracking-[0.14em] text-emerald-200/75">{fact.label}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-white/80"><span className="text-emerald-200">{fact.basis}.</span> {fact.value}</dd>
        </div>)}
      </dl>

      <div className="mt-8 rounded-xl border border-white/10 p-5">
        {locatorOnly
          ? <p className="text-sm leading-relaxed text-white/70">No wording from this translation is reproduced on this page.</p>
          : <p className="text-xs uppercase tracking-[0.14em] text-white/55">Translation quoted on this page</p>}
        <p className="mt-2 text-base text-white">
          <a href={depth.translation.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-300">{depth.translation.title}</a>
          <span className="text-white/65"> — {depth.translation.translator}, {depth.translation.year}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/65"><span className="text-emerald-200">{rightsLabel[depth.translation.rightsBasis]}.</span> {depth.translation.rightsNote}</p>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.04] p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-white">{depth.practice.title}</h3>
          <span className="text-xs uppercase tracking-[0.14em] text-emerald-200/70">{depth.practice.duration}</span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-white/75">{depth.practice.instruction}</p>
      </div>
    </div>
  </section>;
}
