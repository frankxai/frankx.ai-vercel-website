'use client'

import { motion } from 'framer-motion'

interface Master {
  name: string
  lifeYears: string
  role: string
  work: string
  workYear: string
  quote: string
  source: string
}

const MASTERS: Master[] = [
  {
    name: 'Mieko Kamiya',
    lifeYears: '1914–1979',
    role: 'Japanese psychiatrist who founded the modern study of ikigai',
    work: 'Ikigai-ni-Tsuite (生きがいについて)',
    workYear: '1966',
    quote:
      'Ikigai is the most universal feeling of meaning we have — the quiet sense that one’s life is worth living.',
    source: 'Ikigai-ni-Tsuite, Misuzu Shobo, 1966',
  },
  {
    name: 'Ken Mogi',
    lifeYears: 'b. 1962',
    role: 'Neuroscientist at the Sony Computer Science Laboratories',
    work: 'The Little Book of Ikigai',
    workYear: '2017',
    quote:
      'Ikigai is something for which you wake up every morning. It is not the same as success — small things are enough.',
    source: 'The Little Book of Ikigai, Quercus, 2017',
  },
  {
    name: 'García & Miralles',
    lifeYears: 'contemporary',
    role: 'Spanish authors who interviewed the centenarians of Ogimi, Okinawa',
    work: 'Ikigai: The Japanese Secret to a Long and Happy Life',
    workYear: '2016',
    quote:
      'Our intuition and curiosity are very powerful internal compasses to help us connect with our ikigai.',
    source: 'Ikigai, Penguin Random House, 2016',
  },
]

/**
 * Cultural-depth panel for the Ikigai workshop. Replaces the hectoring
 * red/green "Most people get this wrong" boxes with quiet, sourced
 * authority. Names the Western-Venn misconception honestly.
 *
 * Design intent: Ma (negative space), kanji as anchor, serif accents
 * for human authority. No emoji, no exclamation marks, no slop.
 */
export function IkigaiWisdom() {
  return (
    <section className="pb-16 scroll-mt-24" aria-labelledby="wisdom-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Kanji anchor — Japanese typography as visual centerpiece */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="text-[88px] sm:text-[120px] leading-none font-light text-white/90 tracking-[-0.04em] mb-2 select-none">
              生<span className="text-violet-300/90">き</span>甲<span className="text-amber-300/90">斐</span>
            </div>
            <div className="text-xs uppercase tracking-[0.32em] text-zinc-500 mb-1">i&middot;ki&middot;gai</div>
            <p className="text-sm text-zinc-400 italic [font-family:var(--font-serif-editorial)]">
              <span className="text-zinc-300">iki</span> &mdash; to live.{' '}
              <span className="text-zinc-300">kai</span> &mdash; a reason, a worth, a value.
            </p>
          </div>

          {/* The honest note about the Western Venn */}
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="text-[15px] text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
              The four-circle Venn the West loves was drawn in 2014, fusing a Japanese
              word with a career-coaching framework. The original concept is quieter &mdash;
              the small, daily reason a life feels worth waking up to.
            </p>
            <p className="text-[13px] text-zinc-500 mt-3">
              We use the Venn as scaffolding. The depth comes from the masters below.
            </p>
          </div>

          {/* Three masters — real, cited, no fabrication */}
          <div className="grid md:grid-cols-3 gap-5">
            {MASTERS.map((m, i) => (
              <motion.figure
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col"
              >
                <blockquote className="flex-1">
                  <p className="text-[15px] text-zinc-200 leading-relaxed [font-family:var(--font-serif-editorial)] italic mb-4">
                    &ldquo;{m.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="pt-4 border-t border-white/[0.04]">
                  <div className="text-sm font-semibold text-white">{m.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-zinc-500 mt-0.5">
                    {m.lifeYears}
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{m.role}</p>
                  <p className="text-[11px] text-zinc-500 mt-2 italic [font-family:var(--font-serif-editorial)]">
                    {m.work}, {m.workYear}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
