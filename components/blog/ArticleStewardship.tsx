import type { BlogStewardship } from '@/lib/blog'

export const DEFAULT_STEWARDSHIP_NOTE =
  'Prepared with care by Frank\u2019s AI studio team. Specialist agents help gather primary sources, check current model versions and pricing, test code paths, and maintain diagrams so Frank can focus his firsthand architecture work and teaching on what helps you build. Frank reviews and owns the perspective and recommendations on this page.'

type ArticleStewardshipProps = {
  stewardship: BlogStewardship
  authorName?: string
  lastUpdated?: string
}

/**
 * Renders transparent, reader-respectful provenance showing which human editor,
 * studio agent roles, language models, and skills contributed to an article.
 */
export function ArticleStewardship({
  stewardship,
  authorName,
  lastUpdated,
}: ArticleStewardshipProps) {
  const humanLead = stewardship.humanLead || authorName || 'Frank Riemer'
  const verifiedAt = stewardship.verifiedAt || lastUpdated
  const note = stewardship.note?.trim() || DEFAULT_STEWARDSHIP_NOTE
  const roles = Array.isArray(stewardship.roles) ? stewardship.roles : []
  const models = Array.isArray(stewardship.models) ? stewardship.models : []
  const skills = Array.isArray(stewardship.skills) ? stewardship.skills : []

  return (
    <aside
      aria-label="Studio stewardship and AI transparency"
      className="mt-12 rounded-2xl border border-emerald-500/20 bg-white/[0.025] p-6 backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          />
          <h2 className="text-sm font-semibold tracking-tight text-white">
            Studio stewardship &amp; AI transparency
          </h2>
        </div>

        {verifiedAt && (
          <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Verified {verifiedAt}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/75">{note}</p>

      <dl className="mt-5 grid gap-4 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-white/50">
            Human direction &amp; review
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-white/90">{humanLead}</dd>
        </div>

        {roles.length > 0 && (
          <div>
            <dt className="text-xs font-medium text-white/50">
              Contributing studio roles
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {roles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-xs text-white/75"
                >
                  {role}
                </span>
              ))}
            </dd>
          </div>
        )}

        {models.length > 0 && (
          <div>
            <dt className="text-xs font-medium text-white/50">
              Models &amp; harnesses
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {models.map((model) => (
                <span
                  key={model}
                  className="inline-flex items-center rounded-md border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-xs text-cyan-200"
                >
                  {model}
                </span>
              ))}
            </dd>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <dt className="text-xs font-medium text-white/50">Skills applied</dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-200"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  )
}
