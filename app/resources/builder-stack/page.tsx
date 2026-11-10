import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata } from '@/lib/seo'
import { builderEmbeds } from '@/lib/tools/builder-embeds'

export const metadata = createMetadata({
  title: 'Builder stack',
  description:
    'Design and build with Figma, Framer, Webflow, Canva, and Notion. Publish and get paid with ElevenLabs, Gamma, and Descript. Closed programs stay closed. No account required.',
  path: '/resources/builder-stack',
})

export default function BuilderStackPage() {
  const embeds = builderEmbeds()
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-white">
      <p className="text-sm text-white/60">For people who design sites and people who publish them</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight">Tools you can open today</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
        Each name is a product other companies ship. The line under it is the job. Editorial means FrankX is not paid for the click. A sponsored control would say so, and the disclosure would sit beside that control. Brand pictures appear only from a permitted brand kit or a dated first-party screenshot stored on this site.
      </p>

      <section
        aria-labelledby="elevenlabs-architecture-spotlight"
        className="mt-10 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.04] p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Verified Partner Reference · Voice &amp; Audio Architecture
          </p>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70">
            Verified 2026-11-05 · PartnerStack
          </span>
        </div>
        <h2 id="elevenlabs-architecture-spotlight" className="mt-3 text-2xl font-semibold text-white">
          ElevenLabs Voice Synthesis &amp; Founder Journal Briefing Slice
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Use ElevenLabs for asynchronous narration, multilingual dubbing, and our consent-gated{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-emerald-200">/journal</code>{' '}
          audio briefing workflow (<code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-emerald-200">eleven_multilingual_v2</code>{' '}
          at 1 credit/char or <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-emerald-200">eleven_flash_v2_5</code>{' '}
          at 0.5 credits/char and ~75ms model latency).
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <TrackedLink
            href="/guides/elevenlabs-voice-guide"
            eventName="partner_resource_clicked"
            eventProperties={{
              partner: 'elevenlabs',
              surface: 'builder_stack_spotlight',
              action: 'open_technical_guide',
            }}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/25"
          >
            Read ElevenLabs Architecture Guide &amp; Workbench
          </TrackedLink>
          <TrackedLink
            href="/go/elevenlabs"
            prefetch={false}
            target="_blank"
            rel="sponsored noopener"
            eventName="partner_resource_clicked"
            eventProperties={{
              partner: 'elevenlabs',
              surface: 'builder_stack_spotlight',
              action: 'open_partner_hop',
            }}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Open ElevenLabs Partner Link (/go/elevenlabs)
          </TrackedLink>
          <TrackedLink
            href="/downloads/elevenlabs-audio-briefing-spec.md"
            eventName="partner_resource_clicked"
            eventProperties={{
              partner: 'elevenlabs',
              surface: 'builder_stack_spotlight',
              action: 'download_briefing_spec',
            }}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 px-3.5 py-2 text-xs text-white/75 underline hover:text-white"
          >
            Download Briefing Spec (.md)
          </TrackedLink>
        </div>
        <p className="mt-3 text-xs leading-5 text-white/65">
          Disclosure: <code className="text-white/80">/go/elevenlabs</code> is an affiliate link. FrankX may earn a 22% recurring commission for 12 months on Starter ($5/mo), Creator ($22/mo), Pro ($99/mo), and Scale ($330/mo), or 11% for 12 months on Business ($1,320/mo) at no extra cost to you. Enterprise plans are excluded.
        </p>
      </section>

      <ul className="mt-10 space-y-6">
        {embeds.map((embed) => (
          <li key={embed.id} className="border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-wide text-white/50">{embed.audience === 'design' ? 'Design and build' : 'Publish and get paid'}</p>
            <h2 className="mt-2 text-2xl">{embed.name}</h2>
            <p className="mt-2 text-base leading-7 text-white/80">{embed.job}</p>
            <p className="mt-2 text-sm text-white/60">{embed.relationshipLabel}</p>
            {embed.image ? (
              <img src={embed.image} alt="" width={48} height={48} className="mt-3" />
            ) : (
              <p className="mt-3 text-sm text-white/50">{embed.name}</p>
            )}
            <a href={embed.href} rel={embed.rel} className="mt-3 inline-block text-sm underline">
              {embed.sponsored ? 'Open partner link' : 'Open the product'}
            </a>
            {embed.sponsored && embed.disclosure ? (
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{embed.disclosure}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  )
}
