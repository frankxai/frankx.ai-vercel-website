import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Light Within: Visualization, Breath, and the Brain — Research | FrankX',
  description:
    'What the contemplative traditions called the inner light, and what neuroscience can and cannot confirm about visualization, breathwork, coherence, and gamma states. Evidence-graded research on Robbins priming, SOMA breath, and Dispenza-style meditation — and why inner attention goes load-bearing in the AI era.',
  keywords: [
    'does visualization reduce stress',
    'gamma brain waves meditation evidence',
    'pineal gland activation science',
    'soma breath benefits',
    'joe dispenza meditation research',
    'tony robbins priming',
    'what is the light within',
    'heart rate variability breathing',
  ],
  alternates: {
    canonical: 'https://frankx.ai/research/the-light-within',
  },
  openGraph: {
    title: 'The Light Within: Visualization, Breath, and the Brain',
    description:
      'What the traditions called the inner light, and what the brain science can actually confirm about visualization, breath, coherence, and gamma states.',
    type: 'article',
    url: 'https://frankx.ai/research/the-light-within',
  },
}

type Grade = 'A' | 'B' | 'C' | 'D'

const GRADE_LABEL: Record<Grade, string> = {
  A: 'A · peer-reviewed',
  B: 'B · clinical / industry',
  C: 'C · mixed evidence',
  D: 'D · traditional / editorial',
}

const GRADE_TONE: Record<Grade, string> = {
  A: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/[0.06]',
  B: 'text-sky-300 border-sky-400/30 bg-sky-400/[0.06]',
  C: 'text-amber-300 border-amber-400/30 bg-amber-400/[0.06]',
  D: 'text-zinc-300 border-white/15 bg-white/[0.04]',
}

interface Lineage {
  glyph: string
  tradition: string
  era: string
  name: string
  claim: string
  testable: string
}

const LINEAGES: Lineage[] = [
  {
    glyph: 'ज्योति',
    tradition: 'Yogic',
    era: 'c. 1500 BCE → present',
    name: 'Prana, the chakras, and the ājñā ("third eye")',
    claim:
      'A subtle energy (prāṇa) moves through channels (nāḍī) and centers (chakra). Concentration at the ājñā center, between the brows, is said to steady the mind and open inner sight (jyoti, "light"). Breath regulation (prāṇāyāma) is the lever.',
    testable:
      'The "energy channels" have no anatomical correlate. But the breath techniques are measurable: slow, paced breathing reliably shifts heart-rate variability and autonomic balance. The brow-point focus is a concentration anchor — testable as attention training, not as an organ.',
  },
  {
    glyph: '氣',
    tradition: 'Taoist',
    era: 'c. 400 BCE → present',
    name: 'Qi and the dāntián',
    claim:
      'Qi (vital force) is cultivated and circulated through breath, posture, and attention, gathered in the lower dāntián below the navel. Qigong and neidan ("inner alchemy") refine it toward stillness and health.',
    testable:
      'Qi as a measurable substance has never been demonstrated. The practices that cultivate it — slow breathing, gentle movement, sustained attention — produce documented effects on stress markers and balance. The map is metaphor; some of the territory is real.',
  },
  {
    glyph: 'ΦΩΣ',
    tradition: 'Christian contemplative',
    era: 'c. 4th century → present',
    name: 'The inner light and hesychast prayer',
    claim:
      'The Gospel line "the light of the body is the eye" (Matthew 6:22) and the hesychast tradition of the Christian East hold that stillness (hēsychia) and repeated prayer open the person to an uncreated light. The Quakers later named it the "inner light" — that of God in everyone.',
    testable:
      'The theological claim is outside science by design. The practice — repetition, stillness, paced breath tied to a phrase — is the same structural method other traditions use, and produces the same kind of measurable downshift.',
  },
  {
    glyph: '松果',
    tradition: 'The pineal thread',
    era: '1641 → present',
    name: 'Descartes’ "seat of the soul" to the modern "activation" claim',
    claim:
      'Descartes named the pineal gland the seat of the soul in 1641 because it sits alone on the midline. Twentieth-century esoteric writers fused this with the yogic third eye, and modern teachers speak of "activating" or "decalcifying" the pineal to reach higher states.',
    testable:
      'The pineal is real and important — it secretes melatonin and governs circadian rhythm. The leap from melatonin gland to spiritual antenna is not supported. This is the lineage where metaphor most often gets mistaken for anatomy.',
  },
]

interface Mechanism {
  title: string
  body: string
  grade: Grade
  source: string
}

const MECHANISMS: Mechanism[] = [
  {
    title: 'Mental imagery recruits the same circuits as doing',
    body:
      'Vivid visualization activates motor and visual cortex much as real action does. In Pascual-Leone’s classic study, people who only imagined practicing a piano sequence showed motor-map changes similar to those who physically played. Imagery is not "just imagination" to the brain — it is rehearsal.',
    grade: 'A',
    source: 'Pascual-Leone et al., 1995',
  },
  {
    title: 'Slow, paced breath moves the autonomic nervous system',
    body:
      'Breathing at roughly six breaths per minute maximizes heart-rate variability and shifts the balance toward the parasympathetic ("rest") branch via the vagus nerve. This is the most reliable, most replicated mechanism behind every breath practice in this research — yogic, Taoist, or modern.',
    grade: 'A',
    source: 'Zaccaro et al., 2018 (systematic review)',
  },
  {
    title: 'Attention training quiets the default mode network',
    body:
      'The default mode network is the brain’s self-referential, mind-wandering system — the engine of rumination. Experienced meditators show reduced default-mode activity during and outside practice. This is a plausible neural correlate of "the mind getting quiet."',
    grade: 'A',
    source: 'Brewer et al., 2011 (PNAS)',
  },
  {
    title: 'Long-term adepts can produce high-amplitude gamma',
    body:
      'In Lutz & Davidson’s study, Tibetan monks with tens of thousands of practice hours generated unusually high-amplitude, long-range gamma synchrony (~25–42 Hz) during compassion meditation. This is real and striking — but it is a finding about decades-deep practitioners, not a switch a beginner flips in a weekend.',
    grade: 'A',
    source: 'Lutz, Greischar, Davidson et al., 2004 (PNAS)',
  },
  {
    title: 'Sustained practice changes brain structure',
    body:
      'Eight weeks of mindfulness training has been associated with measurable changes in gray-matter density in regions tied to learning, memory, and emotion regulation. The effect sizes are modest and some replications are weaker, but the direction is consistent: practice leaves a trace.',
    grade: 'B',
    source: 'Hölzel et al., 2011; mixed replications',
  },
  {
    title: 'Elevated emotion plus imagery may aid consolidation',
    body:
      'Pairing a clear mental image with a strong, positive felt-emotion is the core move in priming and "mental rehearsal." Emotion modulates memory and motivation, so the pairing is biologically plausible. But the specific claims that elevated emotion "changes your epigenetics" in a single session are not established.',
    grade: 'C',
    source: 'plausible mechanism, contested specifics',
  },
]

interface Protocol {
  name: string
  by: string
  what: string
  mechanism: string
  caveat: string
  grade: Grade
}

const PROTOCOLS: Protocol[] = [
  {
    name: 'Priming',
    by: 'Tony Robbins',
    what:
      'A ~10-minute morning sequence: a few rounds of rapid breathing, then three movements of gratitude (feel each fully), then a visualization of the day and outcomes, held with strong emotion. Done daily, before the phone.',
    mechanism:
      'Combines three things with real support: paced/active breath (autonomic shift), gratitude (associated with lower stress reactivity), and emotion-laden mental rehearsal (imagery recruits action circuits). The stacking is sensible even if the packaging is high-energy.',
    caveat:
      'Marketed with big promises. The components are sound; the "state change in minutes guarantees results" framing outruns the evidence. Treat it as a reliable downshift-and-focus ritual, not a magic lever.',
    grade: 'B',
  },
  {
    name: 'SOMA Breath',
    by: 'Niraj Naik',
    what:
      'A rhythmic-breathing system: paced breathing to music, rounds of faster breathing followed by breath retention (intermittent hypoxia), and a guided visualization or "manifestation" segment.',
    mechanism:
      'The rhythmic and retention work plausibly trains CO₂ tolerance and vagal tone, in the same family as documented breath methods. Breath retention produces real, felt physiological shifts.',
    caveat:
      'Breath-holding and hyperventilation rounds carry genuine risk — never practice in or near water, or while driving, and skip the intense rounds if pregnant, epileptic, or with cardiovascular conditions. The "manifestation" framing is belief, not mechanism.',
    grade: 'C',
  },
  {
    name: 'Coherence & energy-center meditation',
    by: 'Dr. Joe Dispenza',
    what:
      'Long guided meditations: heart-focused "coherence" breathing, sequential attention to the body’s "energy centers," and sustained visualization of a future self held with elevated emotion. Week-long retreats run EEG/HRV measurement and report gamma spikes.',
    mechanism:
      'The coherence breathing and attention work map onto the well-supported HRV and default-mode findings. Deep, long, emotionally vivid meditation in trained practitioners can plausibly produce the gamma seen in adept-meditator studies.',
    caveat:
      'The retreat measurements are not peer-reviewed controlled trials, and the stronger claims — spontaneous healing, "tuning to the quantum field" — are not established science. The practice can be genuinely calming and focusing; the metaphysical explanation is a separate matter from whether the exercise helps.',
    grade: 'C',
  },
]

interface Outcome {
  marker: string
  finding: string
  grade: Grade
}

const OUTCOMES: Outcome[] = [
  {
    marker: 'Perceived stress & anxiety',
    finding:
      'Slow breathing and mindfulness-based programs consistently lower self-reported stress and state anxiety. This is the strongest, most replicated outcome across the whole field.',
    grade: 'A',
  },
  {
    marker: 'Heart-rate variability / vagal tone',
    finding:
      'Paced breathing (~6 breaths/min) reliably raises HRV in-session, a marker of parasympathetic engagement. Whether daily practice durably raises resting HRV is promising but less settled.',
    grade: 'A',
  },
  {
    marker: 'Cortisol',
    finding:
      'Several meditation and breath trials report lower cortisol, but results are heterogeneous and sensitive to study design. Real signal, noisy literature.',
    grade: 'B',
  },
  {
    marker: 'Immune & inflammatory markers',
    finding:
      'Some controlled breathwork studies (e.g., the Wim Hof line of research) show measurable shifts in inflammatory response. Intriguing and replicated in narrow settings; far from a general claim.',
    grade: 'C',
  },
]

interface Myth {
  claim: string
  reality: string
}

const MYTHS: Myth[] = [
  {
    claim: 'There is a literal crystal in the pineal gland you can "activate."',
    reality:
      'The pineal contains calcite microcrystals and calcifies with age, which is where the imagery comes from. There is no evidence these function as a receiver, antenna, or gateway to higher states. The pineal’s established job is melatonin and circadian timing.',
  },
  {
    claim: 'The pineal produces DMT to open the "third eye."',
    reality:
      'Trace DMT has been detected in rodent pineal tissue, but there is no evidence the human pineal releases meaningful DMT during meditation, or that it explains visionary experience. This is a popular leap built on a thin thread of data.',
  },
  {
    claim: 'Reaching gamma means you have touched the one mind / universal consciousness.',
    reality:
      'Gamma is a frequency band tied to attention and binding, and adept meditators can produce a lot of it. That is a neural fact, not a metaphysical proof. The felt sense of unity is real as experience; reading it as literal cosmology is interpretation, not measurement.',
  },
  {
    claim: 'Visualizing an outcome with enough emotion makes it physically manifest.',
    reality:
      'Imagery improves preparation, motivation, and performance — that is well-supported. The further claim that thought directly alters external reality by field effects is not. The honest version: visualization changes the visualizer, who then acts differently.',
  },
]

interface FAQItem {
  question: string
  answer: string
}

const FAQ: FAQItem[] = [
  {
    question: 'Does visualization actually do anything, or is it wishful thinking?',
    answer:
      'It does something specific and measurable. Vivid mental imagery activates the same motor and visual circuits as real action, which is why mental rehearsal improves motor performance and why athletes and surgeons use it. What it does not do is alter the outside world directly. The honest mechanism: visualization rehearses and changes you, and the changed you acts differently. That is enough to matter, and it is not magic.',
  },
  {
    question: 'Which single exercise reduces stress the most reliably?',
    answer:
      'Slow, paced breathing at roughly six breaths per minute. It is the most replicated finding in this entire research: it raises heart-rate variability and shifts the autonomic balance toward the parasympathetic branch within minutes, through the vagus nerve. Every breath tradition in this piece — yogic prāṇāyāma, Taoist qigong, SOMA, Dispenza coherence — is a variation on that one lever.',
  },
  {
    question: 'Is "pineal gland activation" real?',
    answer:
      'The pineal gland is real and important — it makes melatonin and regulates your circadian clock. The idea that you can "activate" or "decalcify" it to reach higher states, or that it works as a spiritual antenna or third eye, is not supported by evidence. The brow-point focus used in those practices is a useful attention anchor; the organ-level claims are metaphor mistaken for anatomy.',
  },
  {
    question: 'Can a beginner reach the gamma states the Tibetan monks showed?',
    answer:
      'Not at those amplitudes, not quickly. The famous Lutz and Davidson finding was in monks with tens of thousands of hours of practice. Beginners do shift their brain state with breath and attention — that is real and quick — but the high-amplitude, long-range gamma synchrony in that study is the signature of decades of training, not a weekend switch.',
  },
  {
    question: 'Is the Joe Dispenza work scientifically validated?',
    answer:
      'Partly, and it depends which claim. The practices — coherence breathing, sustained attention, emotionally vivid visualization — sit on top of well-supported mechanisms (HRV, quieter default-mode network, adept-meditator gamma). The retreat measurements are not peer-reviewed controlled trials, and the strongest claims about spontaneous healing or tuning to a quantum field are not established science. The exercise can genuinely calm and focus you; that is separate from the metaphysical explanation attached to it.',
  },
  {
    question: 'Is breathwork safe?',
    answer:
      'Slow paced breathing is very safe for almost everyone. The intense methods — fast breathing rounds and breath retention found in SOMA and similar systems — carry real risk. Never do them in or near water or while driving (fainting risk), and avoid the intense rounds if you are pregnant, epileptic, or have cardiovascular conditions. Gentle paced breathing gives you most of the stress benefit with none of that risk.',
  },
  {
    question: 'Where does AI fit into a practice like this?',
    answer:
      'As friction-removal, not as the practice. A model can keep the appointment (a reliable morning prompt), pace a session, hold a guided visualization script, and run an honest evening reflection — the same way a good prayer book or a bell once did. It cannot do the practice for you, and the moment you treat it as an oracle or a guru you have left the path. The full boundary is in The Higher Self Protocol.',
  },
  {
    question: 'Why does this matter more in the AI era?',
    answer:
      'When machines do more of the external doing, the internal capacities — attention, meaning, emotional regulation, the ability to choose a state on purpose — stop being optional extras and become the load-bearing skills. Inner work used to be a luxury for the contemplative few. It is becoming basic equipment for everyone.',
  },
]

interface Source {
  cite: string
  context: string
  grade: Grade
}

const SOURCES: Source[] = [
  {
    cite:
      'Lutz, A., Greischar, L. L., Rawlings, N. B., Ricard, M., & Davidson, R. J. (2004). "Long-term meditators self-induce high-amplitude gamma synchrony during mental practice." PNAS, 101(46).',
    context: 'The foundational gamma-in-adept-meditators study. Often cited, frequently overstated.',
    grade: 'A',
  },
  {
    cite:
      'Zaccaro, A. et al. (2018). "How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing." Frontiers in Human Neuroscience, 12:353.',
    context: 'The best single review of why slow, paced breathing works on the autonomic system.',
    grade: 'A',
  },
  {
    cite:
      'Brewer, J. A. et al. (2011). "Meditation experience is associated with differences in default mode network activity and connectivity." PNAS, 108(50).',
    context: 'The default-mode-network basis for "the mind getting quiet."',
    grade: 'A',
  },
  {
    cite:
      'Pascual-Leone, A. et al. (1995). "Modulation of muscle responses evoked by transcranial magnetic stimulation during the acquisition of new fine motor skills." Journal of Neurophysiology, 74(3).',
    context: 'The classic demonstration that imagined practice changes the motor cortex.',
    grade: 'A',
  },
  {
    cite:
      'Hölzel, B. K. et al. (2011). "Mindfulness practice leads to increases in regional brain gray matter density." Psychiatry Research: Neuroimaging, 191(1).',
    context: 'Evidence that sustained practice changes structure. Effect sizes modest; replications mixed.',
    grade: 'B',
  },
  {
    cite:
      'Kox, M. et al. (2014). "Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans." PNAS, 111(20).',
    context: 'The Wim Hof breathwork study on inflammatory response. Narrow setting, real signal.',
    grade: 'B',
  },
  {
    cite:
      'Lopez-Sola, C. et al.; reviews of pineal physiology and the DMT hypothesis (Barker, S. A., 2018, "N,N-Dimethyltryptamine (DMT), an endogenous hallucinogen").',
    context: 'On what the pineal actually does, and why the DMT/third-eye leap is not supported.',
    grade: 'B',
  },
  {
    cite:
      'Dispenza, J. (2017). Becoming Supernatural. Hay House. / Robbins, T. — the Priming practice. / Naik, N. — SOMA Breath method.',
    context: 'The practitioner sources. Useful as practice manuals; not peer-reviewed evidence. Graded accordingly.',
    grade: 'D',
  },
]

function ResearchSchema() {
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://frankx.ai/research/the-light-within#article',
        headline: 'The Light Within: Visualization, Breath, and the Brain',
        description:
          'Evidence-graded research on the inner light of the contemplative traditions and what neuroscience confirms about visualization, breathwork, coherence, and gamma states.',
        author: {
          '@type': 'Person',
          name: 'Frank Riemer',
          url: 'https://frankx.ai',
          jobTitle: 'AI Architect',
        },
        datePublished: '2026-06-22',
        dateModified: '2026-06-22',
        mainEntityOfPage: 'https://frankx.ai/research/the-light-within',
        about: [
          'Visualization',
          'Breathwork',
          'Heart rate variability',
          'Meditation neuroscience',
          'Gamma brain waves',
          'Pineal gland',
          'Stress reduction',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://frankx.ai/research/the-light-within#faq',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
}

function GradeBadge({ grade }: { grade: Grade }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${GRADE_TONE[grade]}`}
    >
      {GRADE_LABEL[grade]}
    </span>
  )
}

export default function TheLightWithinResearchPage() {
  return (
    <div className="min-h-screen bg-void text-white overflow-x-hidden">
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
            Research &middot; mind &middot; breath &middot; the inner light
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] [font-family:var(--font-serif-editorial)] italic mb-6">
            The Light Within.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic max-w-2xl">
            What the contemplative traditions called the inner light, and what the
            brain science can actually confirm about visualization, breath, and the
            states they reach for.
          </p>

          <p className="text-sm text-zinc-400 mt-6 max-w-2xl leading-relaxed">
            Updated 2026-06-22 &middot; 14-minute read &middot; Every claim graded A–D &middot;{' '}
            <Link
              href="/blog/the-light-within-protocol"
              className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
            >
              the practice walkthrough is here
            </Link>
          </p>
        </div>
      </section>

      {/* ─── Evidence key ─────────────────────────────────────────── */}
      <section className="py-8 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic">
            How to read the grades
          </p>
          <div className="flex flex-wrap gap-2.5">
            {(['A', 'B', 'C', 'D'] as Grade[]).map((g) => (
              <GradeBadge key={g} grade={g} />
            ))}
          </div>
          <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
            This piece separates what is well-supported from what is tradition,
            metaphor, or marketing. The practices can be worth doing even where the
            explanation attached to them is not established. The two questions stay
            separate on purpose.
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
                Every tradition that spoke of an inner light &mdash; yogic, Taoist,
                Christian &mdash; converged on the same three levers: <span className="text-white">breath,
                attention, and emotionally vivid imagery</span>. The maps differ; the methods rhyme.
              </li>
              <li>
                The methods have real, measurable effects &mdash; slow breath raises HRV,
                attention quiets the default-mode network, adept meditators produce gamma,
                imagery rehearses action. The <span className="text-white">anatomy stories</span> attached
                to them (energy channels, pineal crystals, the third eye) mostly do not survive scrutiny.
              </li>
              <li>
                As AI does more of the external doing, the internal capacities &mdash; choosing
                a state, holding attention, finding meaning &mdash; go from optional to load-bearing.
                The inner work becomes <span className="text-white">basic equipment</span>, not a luxury.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ─── 01 The claim ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            01 &middot; the claim, stated plainly
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            What people have always meant by the light within.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
            <p>
              Across cultures that never met, the same metaphor keeps surfacing. The
              yogis called it <em>jyoti</em>, an inner light seen at the brow. The Gospel of
              Matthew says &ldquo;the light of the body is the eye.&rdquo; The Quakers spoke of
              an &ldquo;inner light&rdquo; &mdash; that of God in everyone. The Taoists pointed not to
              light but to <em>Qi</em>, a vitality you could gather and quiet.
            </p>
            <p>
              The claim underneath all of them is modest when you strip the cosmology:
              there is a state a human being can enter &mdash; calm, lucid, awake, connected &mdash;
              and you can reach it on purpose, through practice. The traditions disagreed
              wildly about <em>what</em> the state was. They agreed remarkably about <em>how</em> to get there.
            </p>
            <p>
              This research takes both halves seriously. It honors the practices as
              centuries of careful, repeated observation. And it asks, for each one, the
              flat empirical question: <span className="text-white">when you do this, what actually happens
              in the body and the brain?</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── 02 The lineages ──────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
              02 &middot; four lineages, one method
            </p>
            <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
              The traditions that mapped the inner light.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Four lineages built detailed maps of inner experience. For each, the
              claim it makes &mdash; and the part of it that is actually testable.
            </p>
          </div>

          <ul className="space-y-5">
            {LINEAGES.map((l, i) => (
              <li
                key={l.tradition}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8"
              >
                <div className="flex items-start gap-5 mb-4">
                  <span
                    className="text-3xl sm:text-4xl text-white/85 leading-none [font-family:var(--font-jp-serif)]"
                    style={{ fontWeight: 200 }}
                    aria-hidden="true"
                  >
                    {l.glyph}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      {i + 1}. {l.tradition}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-400 mt-1 [font-family:var(--font-serif-editorial)] italic">
                      {l.era}
                    </p>
                  </div>
                </div>
                <p className="text-base text-zinc-200 leading-relaxed mb-4 [font-family:var(--font-serif-editorial)] italic">
                  {l.name}
                </p>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-1.5">The claim</p>
                <p className="text-base text-zinc-300 leading-relaxed mb-4">{l.claim}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  What&rsquo;s testable
                </p>
                <p className="text-base text-zinc-200 leading-relaxed">{l.testable}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 03 Mechanisms ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
              03 &middot; what the brain actually does
            </p>
            <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
              The mechanisms that survive scrutiny.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Strip the cosmology and these are the levers that have been measured.
              Each is graded by how strong the evidence is.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-5">
            {MECHANISMS.map((m) => (
              <li
                key={m.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 h-full flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <GradeBadge grade={m.grade} />
                  <span className="text-[11px] text-zinc-500 text-right leading-tight">
                    {m.source}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {m.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                  {m.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 04 Protocols ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
              04 &middot; the modern protocols
            </p>
            <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
              Three popular practices, examined honestly.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              The most widely-practiced modern systems are repackagings of the old
              levers. For each: what it is, the mechanism it rides on, and the honest caveat.
            </p>
          </div>

          <ol className="space-y-5">
            {PROTOCOLS.map((p) => (
              <li
                key={p.name}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {p.name}
                    <span className="text-zinc-400 text-base font-normal"> &middot; {p.by}</span>
                  </h3>
                  <GradeBadge grade={p.grade} />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  What it is
                </p>
                <p className="text-base text-zinc-200 leading-relaxed mb-4">{p.what}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  The mechanism
                </p>
                <p className="text-base text-zinc-300 leading-relaxed mb-4">{p.mechanism}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-300/70 mb-1.5">
                  The honest caveat
                </p>
                <p className="text-base text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                  {p.caveat}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 05 Outcomes ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            05 &middot; does it reduce stress?
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            Yes &mdash; and here is exactly through what.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
            The Blue Zones called it <em>raku</em>: a reliable daily downshift. The
            outcomes below are what the literature supports when you actually do the
            practice, ordered from most to least settled.
          </p>
          <ul className="space-y-4">
            {OUTCOMES.map((o) => (
              <li
                key={o.marker}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-white">{o.marker}</h3>
                  <GradeBadge grade={o.grade} />
                </div>
                <p className="text-base text-zinc-300 leading-relaxed">{o.finding}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 06 Myths ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            06 &middot; the myths, and what we don&rsquo;t know
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            Where the story outruns the evidence.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
            Respecting a practice means being honest about the claims wrapped around
            it. These are the four leaps that get made most often.
          </p>
          <ul className="space-y-5">
            {MYTHS.map((m) => (
              <li
                key={m.claim}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-rose-300/70 mb-1.5">
                  The claim
                </p>
                <p className="text-base text-zinc-200 leading-relaxed mb-3 [font-family:var(--font-serif-editorial)] italic">
                  &ldquo;{m.claim}&rdquo;
                </p>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  What&rsquo;s actually known
                </p>
                <p className="text-base text-zinc-300 leading-relaxed">{m.reality}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 07 Why now ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            07 &middot; why this matters now
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            The AI era makes inner work load-bearing.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
            <p>
              For most of history, the external world supplied the structure. The job
              told you what to do. The deadline set your focus. The scarcity organized
              your attention. Inner regulation was a luxury practiced by monks and a few
              disciplined outliers, because the world did the organizing for everyone else.
            </p>
            <p>
              As machines absorb more of the external doing &mdash; the drafting, the
              sorting, the answering &mdash; the structure they used to impose loosens. What
              is left is the part no machine can hold for you: which state you choose to
              work from, where you point your attention, what you find worth doing at all.
            </p>
            <p>
              These are precisely the capacities the contemplative traditions spent
              millennia training. The inner light was never about escaping the world. It
              was about meeting it from a steadier place. That skill is moving from the
              margins to the center.
            </p>
            <p>
              There is also a quieter point, and it is the one the next piece is about.
              The same tools that loosen the structure can, used carefully, help rebuild
              it on purpose &mdash; not by doing the practice for you, but by removing the
              friction that keeps you from starting.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 08 The practice ──────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3 [font-family:var(--font-serif-editorial)] italic">
            08 &middot; the practice
          </p>
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.15] mb-6 [font-family:var(--font-serif-editorial)] italic">
            The operational version lives here.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed mb-10">
            <p>
              This research is the why. The companion piece is the how: a concrete,
              ~20-minute morning practice that stacks the levers above &mdash; priming, paced
              breath, coherence, and emotionally vivid visualization &mdash; with an honest
              account of where a model helps and where it must never go.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blog/the-light-within-protocol"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Read the protocol
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </Link>
            <Link
              href="/the-light-within"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-zinc-200 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              The contemplation
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
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
                <div className="mb-2">
                  <GradeBadge grade={s.grade} />
                </div>
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
              href="/research/ai-contemplative-practice"
              prefetch={false}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                Adjacent research
              </p>
              <h3 className="text-base font-semibold text-white mb-2">
                AI and the Contemplative Traditions
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                What is real, what the traditions say, and the failure modes to respect
                when AI enters a spiritual practice.
              </p>
            </Link>
            <Link
              href="/research/blue-zones-ikigai-ai-era"
              prefetch={false}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                Sibling research
              </p>
              <h3 className="text-base font-semibold text-white mb-2">
                Blue Zones, Ikigai, and the AI Era
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The meaning question, traced from Okinawa &mdash; the outer companion to this
                inner one.
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
              href="/blog/the-higher-self-protocol"
              className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
            >
              The Higher Self Protocol
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
