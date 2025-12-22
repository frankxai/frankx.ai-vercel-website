import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials | FrankX',
  description: 'See what creators are saying about FrankX courses, Vibe OS, and the Creator Realm community.',
}

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Music Producer',
    quote: "Vibe OS transformed how I approach creative sessions. I'm producing tracks 3x faster.",
    avatar: '🎵',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Content Creator',
    quote: 'The AI Music Academy gave me skills I never thought possible. My audience loves it.',
    avatar: '🎸',
  },
  {
    name: 'Emma Thompson',
    role: 'YouTuber',
    quote: "FrankX's approach to AI is refreshing - powerful tools that enhance rather than replace creativity.",
    avatar: '🎬',
  },
  {
    name: 'David Kim',
    role: 'Podcast Host',
    quote: "The Creator Realm community is incredible. Best investment I've made in my creative journey.",
    avatar: '🎙️',
  },
  {
    name: 'Lisa Anderson',
    role: 'Musician',
    quote: "I was skeptical about AI music, but Frank's system opened up entirely new creative possibilities.",
    avatar: '🎹',
  },
  {
    name: 'James Wilson',
    role: 'Producer',
    quote: 'The quality of AI-generated tracks from these workflows is genuinely impressive.',
    avatar: '🎧',
  },
]

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <section className="relative px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-blue-900/20" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
            Creator Testimonials
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto mb-16">
            Real stories from creators who have transformed their workflow with FrankX tools and community.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
