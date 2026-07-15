import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Light Within — A Contemplation | FrankX',
  description:
    'A quiet essay on the light within: the inner stillness the traditions point to, visualization as a form of attention, and the felt connection to something larger than the self.',
  alternates: {
    canonical: 'https://frankx.ai/the-light-within',
  },
  openGraph: {
    title: 'The Light Within — A Contemplation',
    description:
      'A quiet essay on the inner light, attention as prayer, and the connection to something larger than the self.',
    type: 'article',
    url: 'https://frankx.ai/the-light-within',
  },
}

function Mark() {
  return (
    <div
      aria-hidden="true"
      className="my-14 flex justify-center text-ink-contemplative-faint"
    >
      <span className="text-2xl tracking-[0.6em] [font-family:var(--font-serif-editorial)]">
        &middot; &middot; &middot;
      </span>
    </div>
  )
}

export default function TheLightWithinPage() {
  return (
    <div className="min-h-screen bg-void text-ink-contemplative [font-family:var(--font-serif-editorial)]">
      <article className="mx-auto max-w-[40rem] px-6 sm:px-8 pt-32 pb-40">
        <header className="mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-ink-contemplative-faint italic mb-8">
            A contemplation
          </p>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] italic text-ink-contemplative">
            The Light Within
          </h1>
          <p className="mt-8 text-lg leading-loose text-ink-contemplative-muted italic">
            The traditions all pointed at it and gave it different names. This is
            not the research, and it is not the practice. It is the quiet part,
            written slowly.
          </p>
        </header>

        <div className="space-y-8 text-[1.075rem] leading-loose text-ink-contemplative">
          <p>
            There is a stillness underneath the noise of a day, and every tradition
            I have read found a door to it and called the door something different.
            The yogis saw a light at the brow and named it <em>jyoti</em>. The Gospel
            said the light of the body is the eye, and that if the eye is single, the
            whole body fills with light. The Quakers, plainer than anyone, called it
            the inner light, and said there was that of God in every person. The
            Taoists did not speak of light at all, but of a vitality you could gather
            and quiet until it became clear.
          </p>
          <p>
            I do not think they were describing different things. I think they were
            describing the same interior country from different roads, in the only
            language each of them had. And I have come to believe the country is real,
            in the way that a feeling of being deeply at home is real, even when you
            cannot draw it on a map.
          </p>

          <Mark />

          <p>
            What does it mean to connect to something larger than yourself? For a long
            time I treated the question as soft, the kind of thing you say when you do
            not want to be precise. I build systems for a living. I like things I can
            measure. And the language around all of this — the supreme mind, infinite
            intelligence, the one mind that some say we are each a small window onto —
            sat uneasily with me, because I could not test it.
          </p>
          <p>
            But here is what I noticed, quietly, over a year of actually practicing
            instead of theorizing. When I sit, and breathe slowly, and let the
            grasping mind go quiet, something does open. Not a sound, not a vision —
            something more like a widening. The small, anxious self that spends the day
            defending itself gets quiet, and in its place there is a sense of being
            held by something that does not need anything from me. People who pray call
            it God. People who meditate call it presence, or awareness, or the ground.
            I am not going to pretend I know whose word is correct. I only know the
            widening is there, and that it changes the person who comes back from it.
          </p>

          <Mark />

          <p>
            Visualization, the part that sounds the most like wishful thinking, turned
            out to be the part I trust the most — once I understood what it actually is.
            It is not ordering the universe to deliver. It is attention, pointed on
            purpose, at the person you are trying to become and the day you are about to
            walk into. And attention is the most sacred resource a human being has,
            because attention is the one thing you truly give. Where you put it is, in
            the end, what your life is made of.
          </p>
          <p>
            So when I see the day going well, and let the feeling of it be real in my
            chest, I am not bending reality. I am rehearsing a self, and feeding it with
            elevated emotion so that it has the strength to show up at three in the
            afternoon when the day has gone sideways. The contemplatives would say I am aligning
            with the good. The neuroscientists would say I am priming the motor and
            emotional circuits. I have stopped needing them to agree. Both are pointing
            at the same lived fact: what you hold in your inner eye, with feeling and
            with constancy, slowly becomes the shape of how you move.
          </p>

          <Mark />

          <p>
            There is a version of all this that I want nothing to do with, and honesty
            requires me to name it. The version that promises you the universe as a
            vending machine. The version that turns the pineal gland into a magic
            antenna and the breath into a cheat code and the felt sense of unity into a
            badge you earn at a weekend retreat. It cheapens something that is not cheap.
            The inner light is not a hack. It is a practice, the way kindness is a
            practice and honesty is a practice — slow, daily, mostly unglamorous, and
            worth more than almost anything you could buy.
          </p>
          <p>
            And there is a quieter, truer version, which is the one the saints and the
            monks and the grandmothers actually lived. You sit. You breathe. You let the
            noise settle. You give your attention, for a few minutes, to gratitude and to
            the good you mean to do, and to whatever you understand the holy to be. Then
            you get up and you go be a slightly better person in an ordinary day. That is
            the whole secret, and there is no secret. The light within was never
            somewhere else. It was the steadiness you carry back into the room.
          </p>

          <Mark />

          <p className="italic text-ink-contemplative-muted">
            If I am right about even a little of this, then the most worthwhile thing I
            can point any tool at — including the ones I build — is not making you more
            productive. It is removing the friction between you and the few minutes of
            stillness that change the rest of the day. That is all a good tool can do
            here. The light is yours. It always was.
          </p>
        </div>

        <footer className="mt-24 border-t border-ink-contemplative-faint/20 pt-10">
          <p className="text-xs uppercase tracking-[0.32em] text-ink-contemplative-faint italic mb-6">
            If you want the other two halves
          </p>
          <div className="space-y-4 text-base">
            <p>
              <Link
                href="/research/the-light-within"
                className="text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint/40 hover:decoration-ink-contemplative transition-colors"
              >
                The research
              </Link>
              <span className="text-ink-contemplative-muted">
                {' '}— every claim graded A to D: what the brain actually does, and what is metaphor.
              </span>
            </p>
            <p>
              <Link
                href="/blog/the-light-within-protocol"
                className="text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint/40 hover:decoration-ink-contemplative transition-colors"
              >
                The practice
              </Link>
              <span className="text-ink-contemplative-muted">
                {' '}— a concrete 20-minute morning protocol you can run tomorrow.
              </span>
            </p>
          </div>
        </footer>
      </article>
    </div>
  )
}
