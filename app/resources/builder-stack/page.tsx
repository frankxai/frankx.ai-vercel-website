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
