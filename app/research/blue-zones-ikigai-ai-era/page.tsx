import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blue Zones, Ikigai, and the AI Era — Research | FrankX',
  description:
    'What 110-year-olds in Okinawa understand about meaning that AI is now forcing the rest of us to learn. Research on Blue Zones, ikigai origins, the 2014 Western Venn, and why ikigai becomes load-bearing when machines do the work.',
  alternates: {
    canonical: 'https://frankx.ai/research/blue-zones-ikigai-ai-era',
  },
  openGraph: {
    title: 'Blue Zones, Ikigai, and the AI Era',
    description:
      'What 110-year-olds in Okinawa understand about meaning that AI is now forcing the rest of us to learn.',
    type: 'article',
    url: 'https://frankx.ai/research/blue-zones-ikigai-ai-era',
  },
}

interface Master {
  name: string
  lifeYears: string
  role: string
  work: string
  year: string
  contribution: string
}

const ORIGINS: Master[] = [
  {
    name: 'Mieko Kamiya',
    lifeYears: '1914–1979',
    role: 'Japanese psychiatrist at Nagashima Aiseien leprosarium',
    work: 'Ikigai-ni-Tsuite (生きがいについて)',
    year: '1966',
    contribution:
      'The foundational psychiatric study. Distinguished ikigai-no-taishō (the object that gives meaning) from ikigai-kan (the felt sense of having meaning). Clinically observed that loss of ikigai-kan tracked with depression risk in her patients. Forty years before the West translated her work.',
  },
  {
    name: 'Dan Buettner',
    lifeYears: 'b. 1960',
    role: 'National Geographic explorer, Blue Zones researcher',
    work: 'The Blue Zones (book + Nat Geo cover)',
    year: '2005',
    contribution:
      'Identified five geographic regions with exceptional centenarian rates — Sardinia (1999), Okinawa (2004), Nicoya (2007), Ikaria (2009), Loma Linda (ongoing). The 2005 Nat Geo cover "The Secrets of a Long Life" named ikigai as the Okinawan longevity factor and put the word in front of a Western audience for the first time.',
  },
  {
    name: 'Héctor García & Francesc Miralles',
    lifeYears: 'contemporary',
    role: 'Spanish authors, residents of Tokyo and Barcelona',
    work: 'Ikigai: The Japanese Secret to a Long and Happy Life',
    year: '2016',
    contribution:
      'Travelled to Ogimi village in Okinawa ("village of longevity"). Interviewed centenarians. Surfaced the Okinawan practical wisdom: stay active, eat plant-rich, belong to your moai (right tribe), find your ikigai. The book that put ikigai on the global bestseller list — 3M+ copies, 60+ languages.',
  },
  {
    name: 'Ken Mogi',
    lifeYears: 'b. 1962',
    role: 'Neuroscientist, Sony Computer Science Laboratories',
    work: 'The Little Book of Ikigai',
    year: '2017',
    contribution:
      'Neuroscience-grounded reframe. Five pillars of ikigai: start small, release yourself, harmony & sustainability, joy of little things, be in the here and now. Named the quiet daily-meaning version of ikigai — explicitly NOT the career-optimization Venn that had become viral by 2017.',
  },
]

interface Pillar {
  kanji: string
  romaji: string
  english: string
  body: string
}

const POWER_NINE_OKINAWA: Pillar[] = [
  {
    kanji: '動',
    romaji: 'undō',
    english: 'Natural movement',
    body: 'Okinawan elders garden into their nineties. Movement is woven into the day — not a 6am gym ritual, but the structural way the house, garden, and village are arranged.',
  },
  {
    kanji: '甲斐',
    romaji: 'ikigai',
    english: 'Purpose (the reason to wake)',
    body: 'Buettner\'s research surfaced ikigai as the longevity factor in Okinawa and "plan de vida" as its parallel in Nicoya, Costa Rica. Same finding, two cultures: a daily reason to get out of bed extends life.',
  },
  {
    kanji: '少',
    romaji: 'shō',
    english: 'Hara hachi bu — eat to 80%',
    body: 'Confucian-derived practice: stop eating when 80% full. The 20% you don\'t eat is the metabolic margin that compounds over fifty years.',
  },
  {
    kanji: '草',
    romaji: 'sō',
    english: 'Plant-forward diet',
    body: 'Sweet potato, soy, bitter melon, seaweed, small fish. Okinawan diet is mostly plants, occasional fish, rare meat. Calorie-dense food is the exception, not the rule.',
  },
  {
    kanji: '茶',
    romaji: 'cha',
    english: 'Wine at 5 (Okinawa: awamori or tea)',
    body: 'Daily moderate alcohol in community context (Sardinia: Cannonau; Ikaria: red wine; Okinawa: awamori or jasmine tea). The pattern isn\'t the substance — it\'s the daily downshift ritual with others.',
  },
  {
    kanji: '組',
    romaji: 'moai',
    english: 'Belong to the right tribe',
    body: 'A moai is a lifelong committed friend group in Okinawa — 5-6 people who pool resources, show up, and stay in your life until one of you dies. Belonging is structural, not optional.',
  },
  {
    kanji: '家',
    romaji: 'ie',
    english: 'Family first',
    body: 'Multi-generational households. Grandparents living with grandchildren reduces childhood mortality and grandparent depression in the same arrangement.',
  },
  {
    kanji: '信',
    romaji: 'shin',
    english: 'Faith / belong to a community',
    body: 'Buettner found centenarians overwhelmingly belonged to a faith community. The specific religion mattered less than the structural weekly belonging.',
  },
  {
    kanji: '楽',
    romaji: 'raku',
    english: 'Downshift — manage stress',
    body: 'Each Blue Zone had a daily ritual to dissipate stress: nap, prayer, ancestor remembrance, friend gatherings. Not stress-prevention — stress-dissipation, daily, reliable.',
  },
]

interface FAQItem {
  question: string
  answer: string
}

const FAQ: FAQItem[] = [
  {
    question: 'Is the four-circle Venn diagram really "wrong"?',
    answer:
      'It is useful scaffolding, not the original Japanese concept. The Venn was drawn by Marc Winn in 2014, who adapted it from Andrés Zuzunaga\'s 2011 "purpose" Venn and labelled the center "Ikigai." Neither Mieko Kamiya (1966), Dan Buettner (2005), nor the Okinawans Buettner interviewed describe ikigai as the intersection of four circles. The honest framing: the Venn is a Western career-coaching scaffold, useful as an entry, that should not be conflated with the Japanese concept.',
  },
  {
    question: 'Do Okinawans actually use the word "ikigai" daily?',
    answer:
      'Yes. The word appears in everyday Japanese conversation, not only in self-help contexts. Buettner\'s interviews and Garcia & Miralles\' Ogimi village fieldwork both confirm Okinawans frame their daily reason-to-get-up as their ikigai — gardening, caring for grandchildren, contributing to the moai. It is closer to "what gets me out of bed" than to "my career calling."',
  },
  {
    question: 'Does the Blue Zones research hold up under scrutiny?',
    answer:
      'Mixed. Saul Justin Newman\'s 2024 working paper documented data-quality issues in claimed centenarian rates (pension fraud, missing birth records) in some Blue Zones. The core finding — that certain regions show longer healthspan via plant-forward diet, daily movement, structural community, and purpose — survives the critique. The questionable part is centenarian count precision; the practical wisdom about daily meaning, food, movement, and belonging remains useful even if the demographic statistics are noisier than originally reported.',
  },
  {
    question: 'Why does the AI era make ikigai more relevant, not less?',
    answer:
      'When machines remove the structural force behind routine work, the question "what should I do today?" becomes load-bearing for the first time in human economic history. For most people, work was meaning by default — you did it because you had to, and meaning was assumed. AI inverts this. The Okinawan question — what is worth waking up for, when nothing forces you — becomes the central question of post-AI work. The ikigai practice is no longer a self-help curiosity; it is the operating-system question of the next decade.',
  },
  {
    question: 'Where do I start?',
    answer:
      'The Ikigai workshop is the practical translation of this research into a 75-minute walk. Ten chapters, thirteen prompts that work in any AI assistant, four post-workshop cadences (daily, weekly, monthly, yearly). It is free, gated by no paywall, and works equally well as self-guided practice or live-cohort experience.',
  },
]

interface Source {
  cite: string
  context: string
}

const SOURCES: Source[] = [
  {
    cite:
      'Kamiya, Mieko (1966). Ikigai-ni-Tsuite (生きがいについて). Tokyo: Misuzu Shobo.',
    context: 'The foundational psychiatric study. Untranslated to English for decades.',
  },
  {
    cite:
      'Buettner, Dan (2005). "The Secrets of a Long Life." National Geographic, November 2005.',
    context: 'The cover story that introduced "ikigai" to Western audiences.',
  },
  {
    cite:
      'Buettner, Dan (2008). The Blue Zones: Lessons for Living Longer From the People Who\'ve Lived the Longest. National Geographic.',
    context:
      'The five-region framework + Power 9 longevity practices, with the Okinawan ikigai chapter.',
  },
  {
    cite:
      'Winn, Marc (2014). "What Is Your Ikigai?" The View Inside Me, May 2014.',
    context:
      'The blog post that birthed the four-circle Venn diagram by combining Andrés Zuzunaga\'s 2011 "purpose" Venn with the Japanese word ikigai. Not academic. Not Japanese. Useful scaffolding nonetheless.',
  },
  {
    cite:
      'García, Héctor & Miralles, Francesc (2016). Ikigai: The Japanese Secret to a Long and Happy Life. Penguin Random House.',
    context:
      'The Ogimi village fieldwork. Over 3 million copies sold; the book responsible for ikigai\'s global pop-culture moment.',
  },
  {
    cite: 'Mogi, Ken (2017). The Little Book of Ikigai. Quercus.',
    context:
      'The neuroscience-grounded reframe. Five pillars version that explicitly avoids the Western Venn framing.',
  },
  {
    cite:
      'Newman, Saul Justin (2024). "Supercentenarian and remarkable age records exhibit patterns indicative of clerical errors and pension fraud." bioRxiv preprint.',
    context:
      'The most-cited critique of Blue Zones centenarian-count methodology. Important to read alongside Buettner.',
  },
]

function ResearchSchema() {
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://frankx.ai/research/blue-zones-ikigai-ai-era#article',
        headline: 'Blue Zones, Ikigai, and the AI Era',
        description:
          'Research on Blue Zones, the origins of ikigai, the 2014 Western Venn, and why ikigai becomes load-bearing in the AI era.',
        author: {
          '@type': 'Person',
          name: 'Frank Riemer',
          url: 'https://frankx.ai',
          jobTitle: 'AI Architect',
        },
        datePublished: '2026-05-18',
        dateModified: '2026-05-18',
        mainEntityOfPage: 'https://frankx.ai/research/blue-zones-ikigai-ai-era',
        about: ['Ikigai', 'Blue Zones', 'Longevity research', 'Meaning in the AI era', 'Okinawan culture'],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://frankx.ai/research/blue-zones-ikigai-ai-era#faq',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  })
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
}

export default function BlueZonesIkigaiResearchPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ResearchSchema />

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/[0.04]">
        <div
          aria-hidden="true"
          className="absolute top-20 left-1/3 w-[60vw] h-[60vw] rounded-full bg-[#3b3380]/[0.05] blur-[180px] pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.32em] text-zinc-400 hover:text-zinc-200 transition-colors mb-10 [font-family:var(--font-serif-editorial)] italic rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All research
          </Link>

          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-6 [font-family:var(--font-serif-editorial)] italic">
            Research &middot; meaning &middot; longevity &middot; AI era
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] [font-family:var(--font-serif-editorial)] italic mb-6">
            Blue Zones, Ikigai, and the AI Era.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic max-w-2xl">
            What 110-year-olds in Okinawa understand about meaning that AI is now
            forcing the rest of us to learn.
          </p>

          <p className="text-sm text-zinc-400 mt-6 max-w-2xl leading-relaxed">
            Updated 2026-05-18 &middot; 12-minute read &middot; Sources at the bottom &middot;{' '}
            <Link
              href="/workshops/ikigai/v4"
              className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
            >
              practical translation in the Ikigai workshop
            </Link>
          </p>
        </div>
      </section>

      {/* ─── TL;DR ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic">
            TL;DR
          </p>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 sm:p-9">
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed mb-4">
              Three things this research argues:
            </p>
            <ol className="space-y-3 text-base text-zinc-300 leading-relaxed list-decimal list-inside marker:text-violet-300">
              <li>
                The four-circle Venn that defines &ldquo;ikigai&rdquo; on the internet is a 2014
                Western invention &mdash; useful as scaffolding, but it is not the Japanese concept.
              </li>
              <li>
                Real ikigai &mdash; as studied by Kamiya in 1966 and observed by Buettner in Okinawa &mdash;
                is the small, daily reason a life feels worth waking up to. It is one of the
                Power 9 longevity practices common to all five Blue Zones.
              </li>
              <li>
                When AI removes the structural force behind routine work, the Okinawan
                question &mdash; what is worth waking up for, when nothing forces you &mdash;
                becomes the central question of the next decade. The ikigai practice goes
                from self-help curiosity to operating-system load-bearing.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ─── The Okinawa Anomaly ──────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            01 &middot; the Okinawa anomaly
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            Why did Okinawans live so much longer?
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
            <p>
              In 2000, Dan Buettner went looking for the longest-lived populations on Earth.
              National Geographic funded the project. The team identified five regions where
              people consistently reached 100 with the cognitive function of a sixty-year-old
              in most developed countries.
            </p>
            <p>
              They called them <em>Blue Zones</em>. Sardinia first (1999). Then Okinawa (2004). Then
              Nicoya, Ikaria, Loma Linda. The November 2005 National Geographic cover, <em>The
              Secrets of a Long Life</em>, put one Japanese word on the newsstands of Whole Foods
              checkout counters worldwide: <span className="text-white">ikigai</span>.
            </p>
            <p>
              The diet was studied. The movement patterns were studied. The community structures
              were studied. The single factor that the Okinawan elders themselves pointed at,
              over and over, was not diet or exercise. It was <em>ikigai</em>. The small daily reason
              they got out of bed.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Power 9 ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
              02 &middot; the power nine
            </p>
            <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
              Nine practices common to all five Blue Zones.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Buettner&apos;s team found nine shared longevity practices across Sardinia, Okinawa,
              Nicoya, Ikaria, and Loma Linda. Ikigai is one of them. The others are below, with
              the Japanese kanji where the practice has a direct Okinawan correlate.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POWER_NINE_OKINAWA.map((p) => (
              <li
                key={p.romaji}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 h-full"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span
                    className="text-4xl text-white/85 leading-none [font-family:var(--font-jp-serif)]"
                    style={{ fontWeight: 200 }}
                    aria-hidden="true"
                  >
                    {p.kanji}
                  </span>
                  <div className="pt-1">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                      {p.romaji}
                    </p>
                    <p className="text-sm font-semibold text-white mt-1 leading-snug">
                      {p.english}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── The Four Sources ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
              03 &middot; the four people behind what the West calls ikigai
            </p>
            <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
              Four sources. Sixty years. Two countries. One word.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Most internet articles about ikigai trace the concept to a 2014 blog post or to
              the 2016 García &amp; Miralles book. The actual lineage is longer and starts with
              a Japanese psychiatrist working in a leprosarium.
            </p>
          </div>

          <ol className="space-y-5">
            {ORIGINS.map((m, i) => (
              <li
                key={m.name}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {i + 1}. {m.name}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.24em] text-zinc-400 [font-family:var(--font-serif-editorial)] italic">
                    {m.lifeYears} &middot; {m.year}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mb-3 leading-relaxed">{m.role}</p>
                <p className="text-base text-zinc-300 leading-relaxed mb-3 [font-family:var(--font-serif-editorial)] italic">
                  {m.work}, {m.year}
                </p>
                <p className="text-base text-zinc-200 leading-relaxed">{m.contribution}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── The 2014 Venn ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            04 &middot; the diagram everyone uses
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            The four-circle Venn was drawn in 2014. By a Westerner.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
            <p>
              The Venn diagram &mdash; love + good at + world needs + paid for = ikigai &mdash; was
              created by Marc Winn in a May 2014 blog post titled <em>What Is Your Ikigai?</em>.
            </p>
            <p>
              Winn took an existing 2011 &ldquo;purpose&rdquo; Venn by Spanish astrologer Andrés
              Zuzunaga, swapped the center label for the Japanese word, and posted it. The
              image went viral on LinkedIn within six months. Eight years later it had become
              the default visual representation of ikigai &mdash; with no connection to anyone
              named Kamiya, Buettner, García, Miralles, or any Okinawan.
            </p>
            <p>
              This matters less for purity and more for accuracy. The Venn implies ikigai is a
              career-optimization puzzle: find the intersection, win the game. The actual
              concept &mdash; from Kamiya, from the Okinawans, from Mogi &mdash; is much quieter.
              It is the small daily thing for which you bother to wake up.
            </p>
            <blockquote className="border-l-2 border-violet-400/40 pl-5 my-8 italic text-zinc-200 [font-family:var(--font-serif-editorial)]">
              &ldquo;Ikigai is something for which you wake up every morning. It is not the
              same as success &mdash; small things are enough.&rdquo;
              <footer className="not-italic text-sm text-zinc-400 mt-3">
                — Ken Mogi, <em>The Little Book of Ikigai</em>, 2017
              </footer>
            </blockquote>
            <p>
              The workshop on this site uses the Venn as <em>scaffolding</em> because it is the entry
              most Western attendees expect. It then names the misalignment in the first
              section and walks attendees through the deeper concept.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The AI Era Inversion ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            05 &middot; why this matters now
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            The AI era makes ikigai load-bearing.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
            <p>
              For most of recorded human economic history, the question <em>what should I do
              today?</em> was answered for you. Farm needed planting. Hospital needed staffing.
              Code needed writing. Spreadsheet needed filling. The work was meaning by
              default &mdash; not because the work was deep, but because it was forced. You did it
              because you had to.
            </p>
            <p>
              AI inverts this. When the machine writes the spreadsheet, drafts the email,
              summarises the meeting, generates the slide deck, codes the API, and edits
              the video, the structural force behind &ldquo;what should I do today&rdquo; collapses.
              The question stops being rhetorical. It becomes load-bearing.
            </p>
            <p>
              This is the Okinawan question. It is the question Kamiya&apos;s leprosarium patients
              had to answer when their working lives were forcibly stripped from them by
              disease. It is the question Buettner&apos;s Okinawan centenarians had answered every
              morning for ninety years because their economy never made it rhetorical for
              them.
            </p>
            <p>
              The reason ikigai went from self-help curiosity to operating-system question
              is not that the practice changed. The practice was always the practice. What
              changed is that AI removed the social structures that let most people avoid
              the practice.
            </p>
            <p className="text-zinc-100 [font-family:var(--font-serif-editorial)] italic">
              Now everyone gets to answer the Okinawan question. The 110-year-olds in Ogimi
              village have been training for this for a hundred years.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Practical translation ────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            06 &middot; the workshop
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            The practical translation lives here.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed mb-10">
            <p>
              The Ikigai workshop on this site is the operational version of this research.
              It compresses Kamiya, Mogi, García &amp; Miralles, and the Blue Zones research
              into a 75-minute walk &mdash; ten chapters, thirteen prompts that work in any AI
              assistant, four cadences for after.
            </p>
            <p>
              Four versions are live for design comparison. Pick the one that reads right
              for you. They run the same prompt registry; they differ in editorial register
              and structural depth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/workshops/ikigai/v4"
              className="group block rounded-2xl border border-violet-500/30 bg-violet-500/[0.04] hover:bg-violet-500/[0.08] hover:border-violet-500/50 p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-violet-200">
                  Recommended
                </p>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-violet-300 group-hover:text-violet-100 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                V4 &middot; Composed Canonical
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                The synthesis. V1 structure + V2 clarity + V3 cinematic depth +
                per-chapter meaning anchors + this research linked back. The deepest version.
              </p>
            </Link>
            <Link
              href="/workshops/ikigai-branding"
              className="group block rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.16] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                  Original canonical
                </p>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                V1 &middot; Original
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                The first canonical surface. Wizard-driven UX, 6 prompts, Workshop Path
                orientation. Still the URL search engines know.
              </p>
            </Link>
          </div>

          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <Link
              href="/workshops/ikigai/v2"
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.12] p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-1.5">
                V2 &middot; editorial clean
              </p>
              <p className="text-sm text-zinc-300 leading-snug">
                Wisdom panel + 13 prompts + serif accents. The clean editorial pass.
              </p>
            </Link>
            <Link
              href="/workshops/ikigai/v3"
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.12] p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-1.5">
                V3 &middot; editorial cinema
              </p>
              <p className="text-sm text-zinc-300 leading-snug">
                Black canvas + Japanese chapter framing + WCAG-elevated.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-10 [font-family:var(--font-serif-editorial)] italic">
            The questions readers keep sending.
          </h2>
          <dl className="space-y-6">
            {FAQ.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6"
              >
                <dt className="text-base sm:text-lg font-semibold text-white mb-3 leading-snug">
                  {item.question}
                </dt>
                <dd className="text-base text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)]">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── Sources ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            Sources
          </p>
          <h2 className="text-2xl sm:text-3xl text-white tracking-tight mb-8 [font-family:var(--font-serif-editorial)] italic">
            Cited works.
          </h2>
          <ul className="space-y-5">
            {SOURCES.map((s) => (
              <li key={s.cite} className="border-l-2 border-white/[0.08] pl-5">
                <p className="text-sm text-zinc-200 leading-relaxed mb-1.5">{s.cite}</p>
                <p className="text-sm text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                  {s.context}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Related ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            Related
          </p>
          <h2 className="text-2xl sm:text-3xl text-white tracking-tight mb-8 [font-family:var(--font-serif-editorial)] italic">
            Where to go next.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/library"
              prefetch={false}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                Library OS
              </p>
              <h3 className="text-base font-semibold text-white mb-2">
                The books, annotated.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Kamiya, Mogi, García &amp; Miralles, Buettner &mdash; the full reading list with
                quotes and chapter notes.
              </p>
            </Link>
            <Link
              href="/research/conscious-ai-operating-systems"
              prefetch={false}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                Adjacent research
              </p>
              <h3 className="text-base font-semibold text-white mb-2">
                Conscious AI Operating Systems
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The architectural answer to the meaning question. Sovereign AI as ikigai
                instrument, not ikigai replacement.
              </p>
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-between text-xs text-zinc-400">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
            >
              <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              All research
            </Link>
            <Link
              href="/workshops/ikigai/v4"
              className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
            >
              Walk the Ikigai workshop
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
