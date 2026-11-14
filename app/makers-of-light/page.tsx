import type { Metadata } from 'next'
import Link from 'next/link'

import { siteConfig, defaultOpenGraphImages } from '@/lib/seo'

import {
  agentRules,
  commitments,
  creed,
  houses,
  knowledgeSystems,
  loop,
  missionContract,
  path,
  rightsRecord,
  scorecard,
  song,
  targets,
  tests,
} from './content'

const pageUrl = `${siteConfig.url}/makers-of-light`
const description =
  'Frank Riemer’s founding philosophy: five commitments, a path for makers, rules for agents, a scorecard, and the two tests he runs before every decision.'

export const metadata: Metadata = {
  title: 'Next gen of the makers of light',
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    images: defaultOpenGraphImages,
    title: 'Next gen of the makers of light',
    description:
      'A founding philosophy for people who make things, and the agents that work for them.',
    url: pageUrl,
    type: 'article',
  },
}

const eyebrow = 'font-mono text-xs uppercase tracking-[0.18em] text-amber-400'
const h2 =
  'mt-6 text-balance font-display text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl'
const focusRing =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-void'
const statusNote =
  'mt-8 border-l-2 border-amber-400/60 pl-4 font-mono text-xs leading-6 text-slate-400'

function pad(index: number) {
  return String(index + 1).padStart(2, '0')
}

function isExternal(href: string) {
  return href.startsWith('http')
}

export default function MakersOfLightPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Next gen of the makers of light',
    description,
    datePublished: '2026-11-11',
    dateModified: '2026-11-11',
    author: { '@type': 'Person', name: 'Frank Riemer', url: siteConfig.url },
    publisher: { '@type': 'Organization', name: 'FrankX', url: siteConfig.url },
    mainEntityOfPage: pageUrl,
  }

  return (
    <main className="min-h-screen bg-void text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="border-b border-white/10 px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>A founding philosophy · Frank Riemer</p>
          <h1 className="mt-8 max-w-6xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-[8.5rem]">
            Next gen of the{' '}
            <br />
            <span className="font-serif font-normal italic text-amber-300">
              makers of light.
            </span>
          </h1>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-2">
            <p className="max-w-xl text-pretty text-xl leading-8 text-slate-200 md:text-2xl md:leading-9">
              The line closes the chorus of {song.title}, a song I made in{' '}
              {song.made} about a world I had not built yet.
            </p>
            <div className="max-w-2xl">
              <p className="text-pretty text-lg leading-8 text-slate-400">
                I sang it for months before I heard what it said. It names the
                people I build for: people who make things and want what they
                make to leave others better off. This page is what I owe them,
                written down so you can hold me to it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#tests"
                  className="inline-flex min-h-12 items-center rounded-full bg-amber-300 px-7 text-sm font-semibold text-void transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-void"
                >
                  Read the two tests
                </a>
                <a
                  href={song.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 items-center text-sm text-slate-300 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white ${focusRing}`}
                >
                  Hear the song on Suno
                  <span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The lyric */}
      <section
        aria-labelledby="lyric-heading"
        className="px-5 py-20 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <figure>
            <blockquote className="font-serif text-[1.7rem] italic leading-tight text-white md:text-4xl lg:text-5xl lg:leading-[1.2]">
              {song.chorus.map((line, index) => (
                <span
                  key={line}
                  className={`block pl-6 -indent-6 md:pl-0 md:indent-0 ${
                    index === song.chorus.length - 1 ? 'text-amber-300' : ''
                  }`}
                >
                  {line}
                </span>
              ))}
            </blockquote>
            <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
              {song.title} · chorus
            </figcaption>
          </figure>
          <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[.5fr_1fr_1fr] lg:gap-12">
            <h2 id="lyric-heading" className={eyebrow}>
              Two halves, both kept
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              The first three lines are the party. Loud, a little ridiculous,
              and exactly how it feels when a room of people is making
              something at two in the morning.
            </p>
            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                The fourth line is the job. Makers build the thing they wished
                existed. Light is the direction: what you make should leave
                someone more able than you found them.
              </p>
              <p>
                I am keeping both. A creed with no music in it turns into a
                policy document, and nobody dances to those.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The creed */}
      <section
        aria-labelledby="creed-heading"
        className="border-y border-white/10 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="creed-heading" className={eyebrow}>
            The creed
          </h2>
          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {creed.map((line, index) => (
              <li
                key={line}
                className="grid grid-cols-[2.5rem_1fr] gap-4 py-7 md:grid-cols-[5rem_1fr] md:py-9"
              >
                <span className="pt-2 font-mono text-xs text-amber-400">
                  {pad(index)}
                </span>
                <span className="text-pretty font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-white md:text-4xl md:leading-tight">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Five commitments */}
      <section
        aria-labelledby="commitments-heading"
        className="px-5 py-20 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <p className={eyebrow}>Five commitments</p>
            <h2 id="commitments-heading" className={h2}>
              What the line obliges me to do.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Each one comes with a question you can put to anything I ship.
              If the answer is no, the work is not done.
            </p>
          </header>
          <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {commitments.map((item, index) => (
              <li
                key={item.name}
                className="grid gap-4 py-8 md:grid-cols-[60px_280px_1fr_1fr] md:gap-8"
              >
                <span className="font-mono text-xs text-amber-400">
                  {pad(index)}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">
                  {item.name}
                </h3>
                <p className="leading-7 text-slate-300">{item.promise}</p>
                <p className="leading-7 text-slate-400">
                  <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    Check
                  </span>
                  <span className="text-white">{item.check}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scale */}
      <section
        aria-labelledby="scale-heading"
        className="border-t border-white/10 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className={eyebrow}>Scale, honestly</p>
              <h2 id="scale-heading" className={h2}>
                Millions can watch. A thousand is the number that matters.
              </h2>
            </div>
            <div className="space-y-6 self-end text-lg leading-8 text-slate-300">
              <p>
                A 19-year-old illustrator, a 24-year-old developer, a
                30-year-old founder, and a 45-year-old teacher can meet the
                same idea and each see themselves in it.
              </p>
              <p>
                Some will buy. Some will collaborate. Some will learn for free
                and build something elsewhere. All of those count. The
                community is worth joining whether or not you ever pay me.
              </p>
            </div>
          </div>
          <dl className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-3">
            {targets.map((target) => (
              <div
                key={target.figure}
                className="flex flex-col-reverse justify-end border-b border-r border-white/10 p-6 md:p-8"
              >
                <dt className="mt-4 text-sm leading-6 text-slate-400">
                  {target.label}
                </dt>
                <dd className="font-display text-6xl font-semibold tabular-nums tracking-[-0.04em] text-white md:text-7xl">
                  {target.figure}
                </dd>
              </div>
            ))}
          </dl>
          <p className={statusNote}>
            Planning targets. None of these is measured reach or a forecast.
            Views count plays, so one person can be many of them.
          </p>
        </div>
      </section>

      {/* The maker path */}
      <section
        aria-labelledby="path-heading"
        className="border-y border-white/10 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <p className={eyebrow}>The path</p>
            <h2 id="path-heading" className={h2}>
              From first listen to teaching the next person.
            </h2>
          </header>
          <ol className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {path.map((item, index) => (
              <li
                key={item.step}
                className="border-b border-r border-white/10 p-6 lg:min-h-64"
              >
                <span className="font-mono text-xs text-amber-400">
                  {pad(index)}
                </span>
                <h3 className="mt-10 font-display text-xl font-semibold text-white lg:mt-20">
                  {item.step}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-12 lg:grid-cols-[.6fr_1fr]">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
                Who carries which part
              </h3>
              <p className="mt-5 max-w-md leading-7 text-slate-400">
                The first paid product can be one change: you arrive with an
                idea and leave with a finished asset you own and can sell. The
                whole platform can wait for that to work.
              </p>
            </div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {houses.map((house) => {
                const row = (
                  <>
                    <strong className="font-display text-lg font-semibold text-white">
                      {house.name}
                    </strong>
                    <span className="col-span-2 row-start-2 leading-7 text-slate-400 md:col-span-1 md:col-start-2 md:row-start-1">
                      {house.job}
                    </span>
                    <span
                      aria-hidden="true"
                      className="col-start-2 row-start-1 text-amber-400 md:col-start-3"
                    >
                      {isExternal(house.href) ? '↗' : '→'}
                    </span>
                  </>
                )
                const className = `grid grid-cols-[1fr_24px] gap-x-4 gap-y-2 py-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[220px_1fr_24px] md:gap-8 ${focusRing}`
                return (
                  <li key={house.name}>
                    {isExternal(house.href) ? (
                      <a
                        href={house.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {row}
                      </a>
                    ) : (
                      <Link href={house.href} className={className}>
                        {row}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Rights */}
      <section
        aria-labelledby="rights-heading"
        className="px-5 py-20 md:px-8 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.9fr_1fr]">
          <div>
            <p className={eyebrow}>Rights</p>
            <h2 id="rights-heading" className={h2}>
              You keep the title to what you make.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-300">
              <p>
                Every collaboration should carry a rights record the creator
                controls, agreed before the work starts. You can export your
                assets and the record whenever you want.
              </p>
              <p>
                Community work goes into model training or Arcanea canon only
                with your written yes.
              </p>
            </div>
            <p className={statusNote}>
              Status: a design commitment. The record format has not shipped.
            </p>
          </div>
          <div className="self-start border border-white/10 bg-white/[0.025]">
            <p
              translate="no"
              className="border-b border-white/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-slate-400"
            >
              rights_record
            </p>
            <dl className="divide-y divide-white/10">
              {rightsRecord.map(([field, meaning]) => (
                <div
                  key={field}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
                >
                  <dt
                    translate="no"
                    className="break-words font-mono text-sm text-amber-300"
                  >
                    {field}
                  </dt>
                  <dd className="text-sm leading-6 text-slate-300">
                    {meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Knowledge */}
      <section
        aria-labelledby="knowledge-heading"
        className="border-t border-white/10 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className={eyebrow}>Intelligence</p>
              <h2 id="knowledge-heading" className={h2}>
                Understand people without building a file on each one.
              </h2>
            </div>
            <div className="space-y-6 self-end text-lg leading-8 text-slate-300">
              <p>
                I want the most useful map I can build of what people know,
                need, make, and could make together. Four stores, each with
                its own rule, starting from Wikidata and Wikipedia for public
                knowledge.
              </p>
              <p>
                For people who are not born yet, I model scenarios and
                demographic projections. I do not invent individuals. On
                social platforms I use official APIs, permitted public
                information, what creators submit, and aggregate analytics.
              </p>
            </div>
          </div>
          <ul className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {knowledgeSystems.map((system, index) => (
              <li
                key={system.name}
                className="grid gap-3 py-7 md:grid-cols-[60px_260px_1fr_1fr] md:gap-8"
              >
                <span className="font-mono text-xs text-amber-400">
                  {pad(index)}
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {system.name}
                </h3>
                <p className="leading-7 text-slate-400">
                  <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    Holds
                  </span>
                  <span className="text-slate-300">{system.holds}</span>
                </p>
                <p className="leading-7 text-slate-400">
                  <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    Rule
                  </span>
                  <span className="text-white">{system.rule}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className={statusNote}>
            Status: proposed. What I can defend is how well the system helps
            people work together. Private facts about them are off the table.
          </p>
        </div>
      </section>

      {/* Humans and agents */}
      <section
        aria-labelledby="agents-heading"
        className="border-y border-white/10 bg-white/[0.025] px-5 py-20 md:px-8 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className={eyebrow}>Humans and agents</p>
            <h2 id="agents-heading" className={h2}>
              The next makers include agents working for people.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-300">
              <p>
                Agents already find services, hand off tasks, and buy things
                on someone’s behalf. I want that cooperation to be something
                you can trust, so every agent I run gets a mission contract.
              </p>
              <p>
                An outside agent earns trust one interaction at a time. A
                published agent card helps you find an agent. Identity and
                permission are checked separately, every time.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {agentRules.map((rule) => (
                <li
                  key={rule}
                  className="font-display text-xl font-semibold text-white"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start border border-white/10 bg-void">
            <p
              translate="no"
              className="border-b border-white/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-slate-400"
            >
              mission_contract
            </p>
            <dl className="divide-y divide-white/10">
              {missionContract.map(([field, meaning]) => (
                <div
                  key={field}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt
                    translate="no"
                    className="break-words font-mono text-sm text-amber-300"
                  >
                    {field}
                  </dt>
                  <dd className="text-sm leading-6 text-slate-300">
                    {meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-10">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
            The acceptance test
          </h3>
          <p className="mt-5 max-w-4xl text-pretty font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-white md:text-3xl">
            An authorized outside agent finds a Starlight capability, reads
            the terms, gets permission, runs inside its budget, returns a
            useful result, and leaves a receipt. The owner can inspect,
            revoke, and audit all of it.
          </p>
          <p className={statusNote}>
            Status: target architecture. I am not claiming a finished
            integration. Until this test passes end to end, adding agents
            adds complexity.
          </p>
        </div>
      </section>

      {/* Scorecard */}
      <section
        aria-labelledby="scorecard-heading"
        className="px-5 py-20 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <header className="max-w-4xl">
            <p className={eyebrow}>The scorecard</p>
            <h2 id="scorecard-heading" className={h2}>
              The number I care about: makers who shipped something they own.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Followers, impressions, and revenue all feed it. Six measures,
              in the order a person moves through them.
            </p>
          </header>
          <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {scorecard.map((row, index) => (
              <li
                key={row.measure}
                className="grid gap-2 py-6 md:grid-cols-[60px_320px_1fr] md:gap-8"
              >
                <span className="font-mono text-xs text-amber-400">
                  {pad(index)}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">
                  {row.measure}
                </h3>
                <p className="leading-7 text-slate-400">{row.evidence}</p>
              </li>
            ))}
          </ol>
          <ol
            aria-label="The operating loop"
            className="mt-10 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-slate-300 md:text-sm"
          >
            {loop.map((stage, index) => (
              <li key={stage} className="flex items-center gap-x-3">
                {stage}
                {index < loop.length - 1 && (
                  <span aria-hidden="true" className="text-amber-400">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className={statusNote}>
            This table has no numbers yet. When I have them, they go here
            with their source.
          </p>
        </div>
      </section>

      {/* The two tests */}
      <section
        id="tests"
        aria-labelledby="tests-heading"
        className="scroll-mt-24 bg-amber-300 px-5 py-20 text-void md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="tests-heading"
            className="font-mono text-xs uppercase tracking-[0.18em]"
          >
            Two tests · before I build, publish, buy, or automate
          </h2>
          <ol className="mt-10 space-y-10">
            {tests.map((test, index) => (
              <li
                key={test}
                className="grid gap-3 md:grid-cols-[5rem_1fr] md:gap-8"
              >
                <span className="pt-2 font-mono text-sm">{pad(index)}</span>
                <span className="text-balance font-display text-3xl font-semibold tracking-[-0.04em] md:text-5xl md:leading-[1.08]">
                  {test}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-14 max-w-3xl border-t border-void/20 pt-8 text-lg leading-8">
            The song is the anthem. This page is the constitution. The
            products are the instruments. The measure is how much light people
            make when I am not in the room.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/the-future-we-choose"
              className="border border-void/20 bg-void p-6 text-white transition-colors hover:bg-void/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-void focus-visible:ring-offset-4 focus-visible:ring-offset-amber-300"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300">
                Founder position
              </span>
              <span className="mt-10 block font-display text-2xl font-semibold">
                The future we choose
              </span>
            </Link>
            <Link
              href="/music"
              className="border border-void/30 p-6 transition-colors hover:bg-void/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-void focus-visible:ring-offset-4 focus-visible:ring-offset-amber-300"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                Where the line came from
              </span>
              <span className="mt-10 block font-display text-2xl font-semibold">
                The music
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
