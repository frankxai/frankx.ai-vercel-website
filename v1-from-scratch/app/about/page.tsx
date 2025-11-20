import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Frank',
  description: 'Musician since 5, Oracle AI Architect, Suno creator. My journey with music and AI.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
        </header>

        {/* Story */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-slate-300 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Music Journey</h2>
              <p>
                I started playing guitar and piano when I was 5 years old. Music has been
                a constant in my life—a way to explore, express, and experiment.
              </p>
              <p>
                Over the years, I've played in bands, composed original pieces, and spent
                countless hours in the creative flow that only music can provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The AI Path</h2>
              <p>
                By day, I work as an AI Architect at Oracle, where I design and build
                enterprise AI systems. I focus on agentic AI, production deployments,
                and helping organizations leverage AI effectively.
              </p>
              <p>
                The technical work fascinates me—there's an art to building systems that
                actually work at scale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Music Meets AI</h2>
              <p>
                When Suno emerged, it felt like these two worlds—music and AI—finally
                converged in a meaningful way. I started experimenting immediately.
              </p>
              <p>
                I've created thousands of tracks. Many are experiments, explorations of
                what's possible. Some are keepers that I'm genuinely proud of. All of them
                taught me something about the intersection of creativity and technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Why I Share</h2>
              <p>
                I learn by doing, and I remember by teaching. This site is where I document
                my journey—the workflows I've discovered, the techniques that work, the
                mistakes I've made, and the insights I've gained.
              </p>
              <p>
                Everything I share here is genuine. If I say a workflow works, it's because
                I use it. If I recommend an approach, it's because I've tested it.
              </p>
              <p>
                No BS. No selling courses I haven't taught. Just real experiments and real
                learnings, shared openly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Connect</h2>
              <p>
                I'm always interested in connecting with people who are exploring the
                intersection of creativity and technology.
              </p>
              <ul className="list-none space-y-2 text-cyan-400">
                <li>
                  <a
                    href="https://suno.com/@frankx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300"
                  >
                    Suno Profile →
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-cyan-300">
                    Read my blog →
                  </Link>
                </li>
                <li>
                  <Link href="/music" className="hover:text-cyan-300">
                    Listen to my music →
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-12 mt-12 border-t border-slate-800">
          <Link href="/" className="text-slate-400 hover:text-cyan-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
