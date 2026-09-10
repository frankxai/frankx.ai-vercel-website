import Image from 'next/image'

type Collection = 'ai-work-surfaces' | 'app-builders'

type Mark =
  | { name: string; src: string; width: number; height: number; status: 'verified-asset' }
  | { name: string; status: 'name-only' }

const collections: Record<Collection, { eyebrow: string; marks: Mark[] }> = {
  'ai-work-surfaces': {
    eyebrow: 'AI work surfaces named in this guide',
    marks: [
      { name: 'OpenAI', src: '/images/brands/openai.svg', width: 512, height: 126, status: 'verified-asset' },
      { name: 'Anthropic', src: '/images/brands/anthropic.svg', width: 512, height: 58, status: 'verified-asset' },
      { name: 'Google', src: '/images/brands/google.svg', width: 512, height: 168, status: 'verified-asset' },
      { name: 'xAI', src: '/images/logos/xai.svg', width: 24, height: 24, status: 'verified-asset' },
      { name: 'Meta', src: '/images/brands/meta.svg', width: 512, height: 104, status: 'verified-asset' },
      { name: 'Mistral AI', src: '/images/brands/official-2026/mistral-emblem.png', width: 1252, height: 893, status: 'verified-asset' },
    ],
  },
  'app-builders': {
    eyebrow: 'App-builder landscape named in this guide',
    marks: [
      { name: 'v0', src: '/images/brands/official-2026/v0-dark.svg', width: 252, height: 120, status: 'verified-asset' },
      { name: 'Replit', status: 'name-only' },
      { name: 'Lovable', src: '/images/brands/official-2026/lovable-full-white.png', width: 1920, height: 349, status: 'verified-asset' },
      { name: 'Bolt', status: 'name-only' },
      { name: 'Base44', status: 'name-only' },
    ],
  },
}

export default function PlatformMarkGrid({ collection }: { collection: Collection }) {
  const group = collections[collection]

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#070a0f] shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-7">
        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300/75">
          {group.eyebrow}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
        {group.marks.map((mark) => (
          <div
            key={mark.name}
            className="flex min-h-28 flex-col items-center justify-center gap-3 bg-[#0a0d13] px-5 py-6"
          >
            {mark.status === 'verified-asset' ? (
              <Image
                src={mark.src}
                alt={`${mark.name} logo`}
                width={mark.width}
                height={mark.height}
                unoptimized
                className="h-9 w-auto max-w-[150px] object-contain"
              />
            ) : (
              <span className="text-xl font-semibold tracking-tight text-white">{mark.name}</span>
            )}
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
              {mark.status === 'verified-asset' ? 'Exact asset' : 'Name only'}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="px-5 py-4 text-center text-xs leading-relaxed text-white/40 sm:px-7">
        Marks identify platforms discussed editorially. They belong to their owners and do not imply sponsorship or endorsement. Names replace marks whose official source asset has not cleared the media ledger.
      </figcaption>
    </figure>
  )
}
