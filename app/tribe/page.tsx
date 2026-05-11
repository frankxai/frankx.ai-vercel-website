import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Tribe — FrankX',
  description:
    'A living gratitude page for the people, family, friends, mentors, colleagues, and builders who helped make the work possible.',
  path: '/tribe',
  keywords: [
    'FrankX tribe',
    'creator gratitude',
    'friends and family',
    'AI creator journey',
    'personal operating system',
    'creative community',
  ],
})

const dedications = [
  {
    name: 'Tien',
    role: 'Love, home, tenderness',
    gift: 'You remind me that ambition means nothing when it is not held by care, presence, warmth, and devotion.',
  },
  {
    name: 'Family',
    role: 'Roots, sacrifice, belonging',
    gift: 'You gave me the first architecture: resilience, loyalty, memory, and the quiet force to keep becoming.',
  },
  {
    name: 'My Mother',
    role: 'Life, care, emotional strength',
    gift: 'You shaped the part of me that still believes love can be practical, protective, and endlessly generous.',
  },
  {
    name: 'My Brother',
    role: 'Grounding, humor, Croatia, reality checks',
    gift: 'You remind me that big visions need real rooms, real work, real laughter, and people who see through the performance.',
  },
  {
    name: 'Friends',
    role: 'Mirrors, movement, shared moments',
    gift: 'You gave contrast, energy, honest reflection, and the proof that a life is not built alone.',
  },
  {
    name: 'Mentors and elders',
    role: 'Standards, pressure, direction',
    gift: 'You raised the ceiling of what I considered possible and made excellence feel like a responsibility.',
  },
  {
    name: 'Oracle AI Center of Excellence',
    role: 'Professional crucible',
    gift: 'You sharpened the architect in me: enterprise pressure, client reality, cloud systems, AI strategy, and the discipline to translate intelligence into value.',
  },
  {
    name: 'Builders, creators, and collaborators',
    role: 'Momentum and craft',
    gift: 'You turned ideas into sharper questions, prototypes, pages, tools, songs, systems, and the next version of the work.',
  },
  {
    name: 'Future tribe',
    role: 'Readers, students, founders, seekers',
    gift: 'You are the reason the work cannot stay private. The systems, writings, songs, and tools are meant to become useful beyond me.',
  },
]

const artifacts = [
  {
    title: 'Poetry',
    body: 'Words became bridges: between gratitude and ambition, between shadow and light, between the life I had and the life I am building.',
  },
  {
    title: 'Insights',
    body: 'Each relationship became signal: where I was grasping, where I was growing, where I needed more truth, structure, courage, and love.',
  },
  {
    title: 'Articles',
    body: 'The conversations, pressure, and lived experiences became public thinking: essays, frameworks, notes, and maps for other builders.',
  },
  {
    title: 'Sites',
    body: 'FrankX, Starlight, Arcanea, and the wider creator stack are not solo monuments. They are crystallized from many encounters, mirrors, and gifts.',
  },
  {
    title: 'Systems',
    body: 'The real tribute is operational: cleaner pages, stronger rituals, better knowledge architecture, more useful tools, and work that compounds.',
  },
]

export default function TribePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.35),rgba(2,6,23,1))]" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
          <p className="mb-5 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
            Birthday dedication
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            The people who made the work possible.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            This page is a living thank-you to the people I love, respect, learn from, build with, and carry forward. My birthday is not only a day to be remembered. It is a day to remember.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Posture</p>
              <p className="mt-3 text-2xl font-semibold">Overflow, not hunger.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Gift</p>
              <p className="mt-3 text-2xl font-semibold">Gratitude made public.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Standard</p>
              <p className="mt-3 text-2xl font-semibold">Love without auditing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">The dedication</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">A clean monument, not a performance.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Some names are public. Some stay private. The point is not exposure. The point is honor. Every poem, article, system, site, and song carries traces of people who gave me love, pressure, contrast, care, challenge, beauty, and belief.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dedications.map((person) => (
            <article
              key={person.name}
              className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[0.075]"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">{person.role}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{person.name}</h3>
              <p className="mt-4 leading-7 text-slate-300">{person.gift}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-purple-300">What they unlocked</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">The artifacts are the thank-you.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Gratitude should not stay sentimental. It should become form. Better writing. Cleaner pages. Stronger products. More honest art. A life that makes the people around it glad they invested love, time, and attention.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {artifacts.map((artifact) => (
              <div key={artifact.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <h3 className="text-xl font-semibold text-white">{artifact.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{artifact.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">The vow</p>
        <blockquote className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          I do not need this life to prove I am loved. I use this life to become love in motion.
        </blockquote>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          To everyone who shaped me: thank you. I will make the work cleaner, braver, more beautiful, and more useful because you were part of the path.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-left text-slate-300">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Private by design</p>
          <p className="mt-3 leading-7">
            This page intentionally avoids private stories, sensitive details, and names that deserve consent before becoming public. The public layer honors the tribe. The private layer remains human.
          </p>
        </div>
      </section>
    </main>
  )
}
