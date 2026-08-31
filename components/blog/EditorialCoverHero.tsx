import Image from 'next/image'

type EditorialCoverHeroProps = {
  title: string
  accent?: string
  art: string
  eyebrow?: string
  subtitle?: string
  category: string
  date: string
  readingTime: string
  capabilityPath?: string[]
  referenceLogo?: string
  referenceAlt?: string
  referenceLabel?: string
}

function splitTitle(title: string, accent?: string) {
  if (!accent) return { before: title, accent: '', after: '' }

  const accentIndex = title.toLocaleLowerCase('en-US').indexOf(accent.toLocaleLowerCase('en-US'))
  if (accentIndex === -1) return { before: title, accent: '', after: '' }

  return {
    before: title.slice(0, accentIndex).trim(),
    accent: title.slice(accentIndex, accentIndex + accent.length),
    after: title.slice(accentIndex + accent.length).trim(),
  }
}

export default function EditorialCoverHero({
  title,
  accent,
  art,
  eyebrow = 'Editorial intelligence',
  subtitle,
  category,
  date,
  readingTime,
  capabilityPath = [],
  referenceLogo,
  referenceAlt,
  referenceLabel,
}: EditorialCoverHeroProps) {
  const titleParts = splitTitle(title, accent)
  const publishedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section
      aria-label={`Editorial cover for ${title}`}
      className="relative isolate min-h-[660px] overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#07090a] shadow-[0_32px_100px_rgba(0,0,0,0.46)] sm:min-h-[620px] md:rounded-[2rem] lg:-mx-8 xl:-mx-40"
    >
      <Image
        src={art}
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 960px, calc(100vw - 48px)"
        className="object-cover object-[62%_center] opacity-80 sm:object-center sm:opacity-90"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,8,0.99)_0%,rgba(5,7,8,0.94)_35%,rgba(5,7,8,0.52)_66%,rgba(5,7,8,0.2)_100%)] sm:bg-[linear-gradient(90deg,rgba(5,7,8,0.98)_0%,rgba(5,7,8,0.9)_42%,rgba(5,7,8,0.34)_78%,rgba(5,7,8,0.12)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,8,0.5)_0%,transparent_28%,rgba(5,7,8,0.14)_58%,rgba(5,7,8,0.94)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 left-0 w-1 bg-emerald-400" aria-hidden="true" />

      <div className="relative flex min-h-[660px] flex-col p-6 sm:min-h-[620px] sm:p-9 md:p-12 lg:p-14">
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-center gap-3">
            <Image src="/favicon.svg" alt="" width={36} height={36} className="h-9 w-9" aria-hidden="true" />
            <div>
              <div className="font-display text-base font-bold tracking-[-0.025em] text-white sm:text-lg">
                FrankX.AI
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/45 sm:text-[10px]">
                Intelligence Dispatch
              </div>
            </div>
          </div>

          {referenceLogo && referenceAlt ? (
            <div className="flex max-w-[13rem] items-center gap-2.5 rounded-full border border-white/[0.12] bg-black/55 px-3 py-2 backdrop-blur-md">
              <Image src={referenceLogo} alt={referenceAlt} width={18} height={18} className="h-[18px] w-[18px] opacity-80" />
              <span className="hidden text-[10px] font-medium uppercase leading-tight tracking-[0.13em] text-white/55 sm:block">
                {referenceLabel || `${referenceAlt} ecosystem`}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-auto max-w-[52rem] pb-8 pt-16 sm:pb-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/[0.08] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200 sm:text-[11px]">
              {eyebrow}
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-emerald-300/35 to-transparent sm:block" aria-hidden="true" />
          </div>

          <h1 className="max-w-[50rem] font-display text-[clamp(2.65rem,7vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white [text-wrap:balance]">
            {titleParts.accent ? (
              <>
                <span className="block">{titleParts.before}</span>
                <span className="block text-[#39dfaa]">{titleParts.accent}</span>
                {titleParts.after ? <span className="block">{titleParts.after}</span> : null}
              </>
            ) : (
              title
            )}
          </h1>

          {subtitle ? (
            <p className="mt-6 max-w-[39rem] text-base font-medium leading-relaxed text-white/72 sm:text-lg md:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.18] pt-4 sm:flex-row sm:items-end sm:justify-between">
          {capabilityPath.length ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:text-[10px]">
              {capabilityPath.map((item, index) => (
                <span key={item} className="flex items-center gap-2">
                  <span className={index === 0 ? 'text-white/75' : index === capabilityPath.length - 1 ? 'text-emerald-300' : undefined}>
                    {item}
                  </span>
                  {index < capabilityPath.length - 1 ? <span className="text-emerald-300/60">→</span> : null}
                </span>
              ))}
            </div>
          ) : <span />}

          <div className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/42 sm:text-right sm:text-[10px]">
            {category} · {publishedDate} · {readingTime}
          </div>
        </div>
      </div>
    </section>
  )
}
