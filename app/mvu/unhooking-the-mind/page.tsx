import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  Footprints,
  HeartHandshake,
  Moon,
  Scale,
} from 'lucide-react'

import { UnhookingTracker } from '@/components/mvu/UnhookingTracker'
import { createMetadata } from '@/lib/seo'

const PAGE_PATH = '/mvu/unhooking-the-mind'
const PAGE_URL = `https://frankx.ai${PAGE_PATH}`

export const metadata: Metadata = createMetadata({
  title: 'How to Stop Identifying With Thoughts',
  description:
    'A grounded field guide to unhooking thought patterns through body care, self-inquiry, kind action, and clear boundaries—without spiritual escape.',
  path: PAGE_PATH,
  image: '/mvu/unhooking-the-mind/opengraph-image',
  type: 'article',
  publishedTime: '2026-07-27',
  authors: ['Frank Riemer'],
  keywords: [
    'how to stop identifying with thoughts',
    'unhook thought patterns',
    'self inquiry meditation',
    'Buddhist not self practice',
    'non attachment practice',
    'loving kindness and boundaries',
  ],
})

const CLEAR = [
  {
    letter: 'C',
    title: 'Care for conditions',
    body: 'Sleep, movement, nourishment, and breath change what the nervous system can hold. Begin with the organism, not an argument.',
  },
  {
    letter: 'L',
    title: 'Locate the hook',
    body: 'Separate observable facts from body sensation, feeling tone, automatic story, and the impulse that follows.',
  },
  {
    letter: 'E',
    title: 'Examine the construction',
    body: 'Ask which outcome or identity is being protected. Then look: can a permanent owner of the thought actually be found?',
  },
  {
    letter: 'A',
    title: 'Act without separation',
    body: 'Choose the kindest truthful action available. Kindness includes reciprocity, non-harm, and an honest boundary.',
  },
  {
    letter: 'R',
    title: 'Release and repair',
    body: 'Release identity from the result. If the pattern caused harm, repair it. Keep the lesson; do not build a self from it.',
  },
] as const

const HOOKS = [
  ['Result', '“I can be at peace after this works.”'],
  ['Control', '“If I manage every variable, I will be safe.”'],
  ['Comparison', '“Their progress says something about my worth.”'],
  ['Possession', '“If I lose this, I lose part of myself.”'],
  ['Avoidance', '“Discomfort means I should leave the moment.”'],
  ['Spiritual status', '“I am the one who has moved beyond ego.”'],
] as const

const DAYS = [
  ['Day 1', 'Body before biography', 'Walk for twenty minutes. Name sensations without explaining them.'],
  ['Day 2', 'Facts before story', 'Write one difficult event twice: what a camera saw, then what the mind added.'],
  ['Day 3', 'Meet the beneficiary', 'When urgency appears, ask which identity expects to profit or be protected.'],
  ['Day 4', 'Release one result', 'Take the next clean action, then stop checking for the response for a defined period.'],
  ['Day 5', 'No inner competition', 'Notice one comparison. Convert it into appreciation, information, or a boundary.'],
  ['Day 6', 'Kindness with edges', 'Offer one non-transactional kindness and state one necessary no.'],
  ['Day 7', 'Review without a score', 'Look for earlier noticing, shorter recovery, and repairs—not spiritual achievement.'],
] as const

const SOURCES = [
  {
    label: 'Satipaṭṭhāna Sutta · MN 10',
    note: 'Mindfulness of body, feelings, mind, and patterns.',
    href: 'https://suttacentral.net/mn10/en/sujato',
  },
  {
    label: 'Anattalakkhaṇa Sutta · SN 22.59',
    note: 'The not-self examination of changing experience.',
    href: 'https://suttacentral.net/sn22.59/en/sujato',
  },
  {
    label: 'Ānanda Sutta · SN 44.10',
    note: 'Why early Buddhist teaching resists a simple self/no-self slogan.',
    href: 'https://suttacentral.net/sn44.10/en/sujato',
  },
  {
    label: 'Karaṇīyamettā Sutta · Snp 1.8',
    note: 'A primary text for goodwill without hostility.',
    href: 'https://suttacentral.net/snp1.8/en/mills',
  },
  {
    label: 'Who Am I? · Ramana Maharshi',
    note: 'The Advaita self-inquiry most directly echoed by the master-key question.',
    href: 'https://archive.arunachala.org/docs/collected-worm/who-ai/',
  },
  {
    label: 'WHO · Physical activity',
    note: 'Health guidance supporting regular movement and reduced sedentary time.',
    href: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
  },
  {
    label: 'CDC · Adult sleep facts',
    note: 'Public-health context for sleep as a condition of functioning.',
    href: 'https://www.cdc.gov/sleep/about/index.html',
  },
] as const

function ArticleJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Unhooking the Mind: Self-Inquiry Without Spiritual Escape',
    description:
      'A grounded practice for seeing a thought without turning it into an instruction.',
    datePublished: '2026-07-27',
    author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
    publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
    mainEntityOfPage: PAGE_URL,
    isPartOf: { '@type': 'CollectionPage', name: 'MVU Field Journal', url: 'https://frankx.ai/mvu' },
    about: ['self-inquiry', 'not-self', 'thought patterns', 'loving-kindness'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function UnhookingTheMindPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090907] text-white">
      <ArticleJsonLd />

      <article>
        <header className="relative border-b border-white/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-300/[0.06] blur-[120px]"
          />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-6 sm:pb-28 lg:px-8">
            <Link
              href="/mvu"
              className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              MVU field journal
            </Link>

            <div className="mt-16 grid gap-14 lg:grid-cols-[1.14fr_0.86fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/70">
                  Tallinn 2026 · Day 8 · field note 01
                </p>
                <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl">
                  Unhooking
                  <br />
                  the mind.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">
                  A thought can appear without becoming an instruction. The work
                  is to notice the hook, return to the body, examine the owner,
                  and choose an action that does not deepen separation.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#practice"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-[#090907] transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                  >
                    Begin the practice
                    <ArrowDown className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href="/downloads/mvu-unhooking-practice-kit-v0.1.0.zip"
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-amber-300/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download the practice kit
                  </a>
                </div>
              </div>

              <figure className="relative border-l border-amber-300/25 pl-7 sm:pl-10">
                <p className="font-serif text-2xl italic leading-[1.5] text-white/80 sm:text-3xl">
                  “Who is the one who needs this thought to be true?”
                </p>
                <figcaption className="mt-6 text-xs leading-5 text-white/38">
                  A working inquiry, not a demand for a clever answer.
                </figcaption>
              </figure>
            </div>

            <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-5 text-white/38 sm:flex-row sm:items-center sm:justify-between">
              <p>Frank Riemer field notes · speaker attribution pending verification</p>
              <p>Independent reflection · not an official Mindvalley transcript</p>
            </div>
          </div>
        </header>

        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/65">
                The central distinction
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                The thought is real.
                <br />
                Its command is optional.
              </h2>
            </div>
            <div className="max-w-2xl space-y-6 text-base leading-8 text-white/62">
              <p>
                Most hooks begin innocently: a result matters, a person stays
                silent, someone else advances, discomfort rises. Then thought
                adds a beneficiary—an image of “me” that must win, control,
                escape, or become spiritually superior.
              </p>
              <p>
                Unhooking does not mean suppressing thought, becoming passive,
                or pretending nothing matters. It means seeing the sequence
                early enough to choose. Care for the body. Name what is
                happening. Investigate the identity being defended. Act with
                kindness and a clear edge.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0c09]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/65">
                  One inquiry · two traditions
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Similar move.
                  <br />
                  Different claim.
                </h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
                <div className="bg-[#090907] p-7 sm:p-8">
                  <p className="text-sm font-semibold text-amber-200">Advaita self-inquiry</p>
                  <p className="mt-4 text-sm leading-7 text-white/57">
                    “Who am I?” turns attention toward the presumed owner of
                    experience. Ramana Maharshi’s method is the closest source
                    match for the “master key” language in these field notes.
                  </p>
                </div>
                <div className="bg-[#090907] p-7 sm:p-8">
                  <p className="text-sm font-semibold text-amber-200">Early Buddhist analysis</p>
                  <p className="mt-4 text-sm leading-7 text-white/57">
                    Experience is examined as changing and not fit to be held as
                    “mine,” “I,” or a permanent self. It is not simply the slogan
                    “there is no self.”
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-3xl border-l border-amber-300/30 pl-5 text-sm leading-7 text-white/48">
              This guide uses the shared practical move—stop automatic
              identification—without collapsing two distinct traditions into
              one doctrine.
            </p>
          </div>
        </section>

        <section id="practice" className="scroll-mt-20 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/65">
                CLEAR · a five-move practice
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Move from reaction to choice.
              </h2>
              <p className="mt-6 text-base leading-7 text-white/55">
                Do not use the inquiry to leave the body. Use it to return to
                reality with more freedom and less harm.
              </p>
            </div>

            <ol className="mt-14 border-t border-white/10">
              {CLEAR.map((step, index) => (
                <li
                  key={step.letter}
                  className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[5rem_0.8fr_1.2fr] sm:items-baseline sm:py-9"
                >
                  <span className="font-mono text-3xl text-amber-300/80">{step.letter}</span>
                  <h3 className="text-lg font-semibold text-white">
                    {String(index + 1).padStart(2, '0')} · {step.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/52">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0c09]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/65">
                  Six common hooks
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  The pattern changes clothes.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/52">
                  The content varies. The contract is familiar: obey me now and
                  you may become whole later.
                </p>
              </div>
              <ol className="border-t border-white/10">
                {HOOKS.map(([title, script], index) => (
                  <li
                    key={title}
                    className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[3rem_0.55fr_1.45fr] sm:gap-5"
                  >
                    <span className="font-mono text-xs text-amber-300/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm font-semibold text-white/85">{title}</h3>
                    <p className="text-sm leading-6 text-white/45">{script}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <UnhookingTracker />
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 lg:grid-cols-3">
              <div className="bg-[#0d0c09] p-7 sm:p-9">
                <Footprints className="h-5 w-5 text-amber-300" aria-hidden />
                <h2 className="mt-7 text-xl font-semibold">Take care of the body.</h2>
                <p className="mt-4 text-sm leading-7 text-white/52">
                  Movement, rest, food, and breath are not beneath inner work.
                  They are the conditions in which attention operates.
                </p>
              </div>
              <div className="bg-[#0d0c09] p-7 sm:p-9">
                <Moon className="h-5 w-5 text-amber-300" aria-hidden />
                <h2 className="mt-7 text-xl font-semibold">Remove less. Notice earlier.</h2>
                <p className="mt-4 text-sm leading-7 text-white/52">
                  “Erase every unconscious pattern” is a fantasy of control.
                  Progress is earlier recognition, less automatic enactment,
                  and faster repair.
                </p>
              </div>
              <div className="bg-[#0d0c09] p-7 sm:p-9">
                <HeartHandshake className="h-5 w-5 text-amber-300" aria-hidden />
                <h2 className="mt-7 text-xl font-semibold">Choose kindness with edges.</h2>
                <p className="mt-4 text-sm leading-7 text-white/52">
                  Non-separation does not require agreement, access, or forced
                  reconciliation. A loving response may be a generous yes or a
                  clean no.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0c09]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div>
              <Scale className="h-5 w-5 text-amber-300" aria-hidden />
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                The spiritual ego is still a contract.
              </h2>
            </div>
            <div className="max-w-2xl space-y-6 text-base leading-8 text-white/58">
              <p>
                Material striving can become spiritual striving without losing
                its structure: achievement, status, certainty, and a future
                version of the self who will finally be untouchable.
              </p>
              <p>
                A useful test is ordinary life. Are you more honest, more able
                to repair, less competitive inside, and more available to the
                person in front of you? If not, the practice may have become
                another identity to defend.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/65">
                Seven days · no score
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Make the insight survive Monday.
              </h2>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2">
              {DAYS.map(([day, title, practice], index) => (
                <li
                  key={day}
                  className={`bg-[#0d0c09] p-6 sm:p-8 ${
                    index === DAYS.length - 1 ? 'md:col-span-2' : ''
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300/60">
                    {day}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/50">{practice}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/downloads/mvu-unhooking-practice-kit-v0.1.0.zip"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-[#090907] transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download tracker + weekly review
              </a>
              <Link
                href="/skills"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/65 transition-colors hover:border-amber-300/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Explore FrankX skills
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0c09]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <BookOpen className="h-5 w-5 text-amber-300" aria-hidden />
                <h2 className="mt-6 text-3xl font-semibold tracking-tight">Sources and limits</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/48">
                  The source layer is part of the practice. These notes are a
                  synthesis, not a verbatim teaching, clinical protocol, or
                  promise to eliminate thoughts.
                </p>
              </div>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {SOURCES.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid gap-2 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:grid-cols-[0.8fr_1.2fr_auto] sm:items-center sm:gap-6"
                    >
                      <span className="text-sm font-semibold text-white/80 transition-colors group-hover:text-amber-200">
                        {source.label}
                      </span>
                      <span className="text-sm leading-6 text-white/42">{source.note}</span>
                      <ExternalLink className="h-4 w-4 text-white/25" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 text-xs leading-6 text-white/38 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            Independent participant field guide by FrankX · not organized,
            sponsored, or endorsed by Mindvalley.
          </p>
          <Link
            href="/mvu"
            className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-amber-200"
          >
            Return to the MVU journal
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </footer>
      </article>
    </main>
  )
}
