import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'AI and the Contemplative Traditions — Research | FrankX',
  description:
    'A sober look at AI as an instrument in spiritual practice: what is actually happening, what the contemplative traditions say about new tools, and the failure modes to respect.',
  alternates: {
    canonical: 'https://frankx.ai/research/ai-contemplative-practice',
  },
  openGraph: {
    title: 'AI and the Contemplative Traditions — Research',
    description:
      'What is real, what the traditions actually say, and the failure modes to respect when using AI in spiritual practice.',
    type: 'article',
    url: 'https://frankx.ai/research/ai-contemplative-practice',
  },
}

const researchQuestions = [
  'Does AI assistance deepen a contemplative practice, or substitute for it?',
  'What is the historical precedent for new tools (the codex, print, recorded sound) entering spiritual practice?',
  'Where is the boundary between scaffolding a practice and outsourcing it?',
  'Which functions — discernment, confession, community, authority — resist delegation to a machine?',
  'How do the failure modes (spiritual bypassing, parasocial dependence) manifest specifically with conversational AI?',
]

const findings = [
  {
    name: 'The tool is never the sacred thing',
    description:
      'Across traditions, devotional tools — prayer beads, the codex, the printed vernacular Bible, recorded chant — were each, in their era, accused of cheapening the sacred, and each ultimately expanded access to it. The consistent pattern: the instrument carries no holiness of its own; its only spiritual value is whether it places the practitioner in front of the practice more often, with fewer excuses. Conversational AI is the newest instance of a very old pattern, and is best evaluated by the same test.',
  },
  {
    name: 'Friction removal, not meaning production',
    description:
      'The observed value of AI in practice is the removal of three frictions: the absence of a patient guide for difficult texts, the failure to keep a daily reflective appointment, and the lack of an available interlocutor for live questions. In each case the machine supplies context, continuity, and dialogue — not interpretation, devotion, or wisdom. When the practitioner retains meaning-making, the practice is amplified; when it is handed over, the practice hollows out.',
  },
  {
    name: 'The structured daily review, instrumented',
    description:
      'The Ignatian examen (a five-step daily review, ~16th century), the Stoic evening journal (Seneca, Marcus Aurelius), and Buddhist reflective practice converge on a shared mechanism: a fixed-time, honest review of the day. The dominant historical failure of these practices is not difficulty but lapse — they are abandoned. A conversational agent configured to prompt one question at a time, without summarizing or advising, functions as an adherence aid for an ancient practice, addressing the lapse problem directly.',
  },
  {
    name: 'The delegation boundary',
    description:
      'Four functions recur across traditions as irreducibly relational and therefore resistant to delegation: moral discernment of a specific life, confession and absolution, membership in a community, and spiritual authority. Delegating these to an agreeable, tireless, always-available system is not neutral — it removes the formative friction these functions depend on, and substitutes a counterfeit for an interpersonal act. The boundary is consistent across contemplative traditions and is the load-bearing safeguard.',
  },
]

const failureModes = [
  {
    name: 'Spiritual bypassing',
    description:
      'Using continuous reading and reflection to avoid the harder work of actual change — a documented risk in contemplative practice generally, amplified by an endlessly available study partner.',
  },
  {
    name: 'Outsourced discernment',
    description:
      'Allowing a confident-sounding model to make moral or vocational calls, which removes the very reps the practice exists to build. The fluency of the output is unrelated to its wisdom.',
  },
  {
    name: 'Parasocial dependence',
    description:
      'Mistaking a tireless, agreeable interlocutor for a relationship or for a teacher. The 24/7 availability and low friction can quietly displace the harder, realer, irreplaceable human community.',
  },
]

const faqs = [
  {
    question: 'Is using AI for spiritual practice a genuinely new phenomenon?',
    answer:
      'The instrument is new; the pattern is not. Devotional tools — prayer beads, the codex, the printed vernacular Bible, recorded chant — each entered practice amid concern that they cheapened the sacred, and each expanded access to it. Conversational AI is best evaluated by the same historical test: does it place the practitioner in front of the practice more often, with fewer excuses?',
  },
  {
    question: 'What does the research suggest AI is actually good for here?',
    answer:
      'Friction removal in three areas: a patient guide for difficult sacred texts, continuity for a daily reflective appointment, and an available interlocutor for live questions. It supplies context, continuity, and dialogue — not interpretation, devotion, or wisdom.',
  },
  {
    question: 'What should never be delegated to an AI in a spiritual practice?',
    answer:
      'Four functions recur across traditions as resistant to delegation: moral discernment of a specific life, confession and absolution, membership in a community, and spiritual authority. These are relational and formative; delegating them removes the friction they depend on and substitutes a counterfeit for an interpersonal act.',
  },
  {
    question: 'What are the documented failure modes?',
    answer:
      'Three: spiritual bypassing (using reflection to avoid change), outsourced discernment (letting the model make moral calls), and parasocial dependence (mistaking an agreeable system for a relationship or teacher). Each is amplified by the always-available, low-friction nature of conversational AI.',
  },
  {
    question: 'Does this require a particular religious tradition?',
    answer:
      'No. The mechanisms studied — slow reading, structured daily review, attention training — appear across Christian, Buddhist, and Stoic sources and in secular contemplative practice. The findings concern the instrument and its boundaries, not the content of any one tradition.',
  },
]

export default function AIContemplativePracticePage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <JsonLd
        type="Article"
        data={{
          headline: 'AI and the Contemplative Traditions',
          description:
            'A sober look at AI as an instrument in spiritual practice: what is real, what the traditions say, and the failure modes to respect.',
          author: { '@type': 'Person', name: 'Frank', url: 'https://frankx.ai' },
          datePublished: '2026-06-12',
          dateModified: '2026-06-12',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://frankx.ai/research/ai-contemplative-practice',
          },
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/research"
          className="mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Research Hub
        </Link>

        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Research Domain
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            AI and the Contemplative Traditions
          </h1>
          <p className="text-sm text-zinc-500">June 2026</p>
        </header>

        {/* Abstract */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Abstract
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A growing number of people use conversational AI inside a spiritual
              practice — to read sacred texts, run a daily examination, or think
              through a moral question. The reaction splits between dismissal
              (&ldquo;AI spirituality&rdquo; as a gimmick) and overreach (the
              model as oracle or confessor). Both miss the useful question.
            </p>
            <p>
              This research treats AI as an <em>instrument</em> and asks the only
              question that has reliably mattered when a new tool meets an old
              practice: does it put the practitioner in front of the practice
              more often, with fewer excuses — and where does it instead remove
              friction that <em>should</em> be there?
            </p>
            <p>
              The companion essay series,{' '}
              <Link
                href="/blog/the-higher-self-protocol"
                className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-400"
              >
                The Higher Self Protocol
              </Link>
              , is the first-person, practical treatment. This page is the sober,
              sourced counterpart: the patterns, the boundary, and the failure
              modes.
            </p>
          </div>
        </section>

        {/* Key Research Questions */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Key Research Questions
          </h2>
          <ul className="space-y-3">
            {researchQuestions.map((question) => (
              <li key={question} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D4AF37]" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Findings */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Findings
          </h2>
          <div className="space-y-8">
            {findings.map((f) => (
              <div key={f.name}>
                <h3 className="mb-2 text-lg font-semibold text-white">{f.name}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Failure Modes */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Failure Modes
          </h2>
          <div className="space-y-8">
            {failureModes.map((f) => (
              <div key={f.name}>
                <h3 className="mb-2 text-lg font-semibold text-white">{f.name}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            FAQ
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Work */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Related Work
          </h2>
          <ul className="space-y-3">
            {[
              {
                href: '/blog/the-higher-self-protocol',
                label: 'The Higher Self Protocol (essay series, Part 1)',
              },
              {
                href: '/blog/01-ai-doesnt-have-to-be-soulless',
                label: "AI Doesn't Have To Be Soulless",
              },
              {
                href: '/blog/acos-philosophy-technology-amplifies',
                label: 'The Philosophy Behind ACOS: Technology That Amplifies',
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Status */}
        <footer className="border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">
            Active Research · The Higher Self Protocol · 2026
          </p>
        </footer>
      </div>
    </main>
  )
}
