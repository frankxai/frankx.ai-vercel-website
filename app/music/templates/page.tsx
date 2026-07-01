import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Suno Prompt Templates — Research-Backed AI Music Prompts | FrankX',
  description:
    'Copy-paste Suno AI prompt templates for focus, energy, relaxation, creativity, and more. Based on vibe-os music psychology research. Free, no signup.',
  keywords: ['suno prompt templates', 'ai music prompts', 'suno ai', 'music psychology', 'vibe os', 'focus music', 'deep focus'],
}

const TEMPLATES = [
  {
    state: 'Deep Focus',
    icon: '🧠',
    bpm: '70–80 BPM',
    mode: 'Minor or modal',
    science: 'Low tempo reduces motor arousal; minor mode reduces emotional salience — both lower distraction from the task.',
    evidence: 'strong',
    prompt: 'Lo-fi instrumental, 75 BPM, D minor, soft rhodes piano, light vinyl crackle, no vocals, ambient texture, mellow bass, gentle percussion, focus music, clean production',
  },
  {
    state: 'Morning Energy',
    icon: '☀️',
    bpm: '110–130 BPM',
    mode: 'Major',
    science: 'Tempo above 120 BPM matches and then slightly exceeds resting heart rate, driving arousal upward. Major mode amplifies positive valence.',
    evidence: 'strong',
    prompt: 'Upbeat pop, 125 BPM, A major, acoustic guitar, driving drums, bright synth pad, energetic, morning vibes, positive, clean mix, no lyrics, instrumental',
  },
  {
    state: 'Creative Flow',
    icon: '✨',
    bpm: '80–100 BPM',
    mode: 'Major or Dorian',
    science: 'Moderate tempo keeps arousal in the optimal zone for divergent thinking. Dorian mode (minor with raised 6th) balances focus and openness.',
    evidence: 'preliminary',
    prompt: 'Cinematic ambient, 90 BPM, C Dorian, piano melody, orchestral strings, light electronic percussion, creative, inspiring, clear texture, instrumental, no drop',
  },
  {
    state: 'Stress Relief',
    icon: '🌊',
    bpm: '60–70 BPM',
    mode: 'Major, soft',
    science: 'Tempo near or below resting heart rate triggers parasympathetic entrainment. 528 Hz-tuned tracks show preliminary anxiety-reduction signals.',
    evidence: 'preliminary',
    prompt: 'Healing ambient, 65 BPM, F major, soft piano, nature sounds, gentle pads, 528 Hz tuning, calm, stress relief, therapeutic, no percussion, flowing',
  },
  {
    state: 'Workout / High Energy',
    icon: '💪',
    bpm: '140–160 BPM',
    mode: 'Minor, driving',
    science: 'Synchronization between music tempo and movement cadence reduces perceived exertion and increases endurance output (RAS effect).',
    evidence: 'strong',
    prompt: 'Electronic workout music, 150 BPM, E minor, heavy kick drum, driving bass, energetic synth lead, aggressive, powerful, gym music, high intensity, no breakdown',
  },
  {
    state: 'Deep Sleep Prep',
    icon: '🌙',
    bpm: '55–65 BPM',
    mode: 'Major, minimal',
    science: 'Tempo at or below resting heart rate + minimal dynamics = progressive relaxation. Avoid loud transients that trigger orienting response.',
    evidence: 'strong',
    prompt: 'Sleep music, 60 BPM, G major, soft piano, gentle strings, ambient pads, very quiet, no percussion, slow decay, sleep therapy, minimal, peaceful',
  },
  {
    state: 'Study / Retention',
    icon: '📖',
    bpm: '60–80 BPM',
    mode: 'Neutral/modal',
    science: 'Background music at 70 BPM with no lyrics and predictable structure produces the lowest cognitive interference while maintaining alertness.',
    evidence: 'strong',
    prompt: 'Classical study music, 70 BPM, C major, solo piano, clean acoustic, no ornamentation, Bach-style counterpoint, quiet background music, study session, no strings, minimal dynamics',
  },
  {
    state: 'Heart Coherence',
    icon: '💚',
    bpm: '65 BPM',
    mode: 'Major, warm',
    science: 'Heart rate variability (HRV) coherence is linked to 0.1 Hz oscillations (~6 breaths/min). Music at ~65 BPM can guide breath pacing toward this range.',
    evidence: 'preliminary',
    prompt: 'Healing binaural ambient, 65 BPM, F major, warm pad, slow chord progression, 639 Hz tuning, heart coherence meditation, no melody, gentle, breathing guide',
  },
]

const EVIDENCE_COLORS: Record<string, string> = {
  strong: 'text-emerald-400',
  preliminary: 'text-amber-400',
  anecdotal: 'text-gray-400',
}

export default function MusicTemplatesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-6">
            Free templates
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Suno Prompt Templates
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-4 leading-relaxed">
            Copy-paste prompts for 8 mental states. Each one includes the research rationale so you understand
            why the BPM and mode choices work — not just what to type.
          </p>
          <p className="text-sm text-gray-500">
            Based on the{' '}
            <a href="https://github.com/frankxai/vibe-os" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
              vibe-os
            </a>
            {' '}research library. Evidence grades: <span className="text-emerald-400">strong</span> = multiple RCTs,{' '}
            <span className="text-amber-400">preliminary</span> = small studies / mechanistic plausibility.
          </p>
        </div>
      </section>

      {/* Templates */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {TEMPLATES.map((t) => (
            <div
              key={t.state}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-semibold">{t.state}</h2>
                    <span className="text-xs text-gray-500">{t.bpm} · {t.mode}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t.science}{' '}
                    <span className={`font-medium ${EVIDENCE_COLORS[t.evidence]}`}>
                      [{t.evidence} evidence]
                    </span>
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                  <p className="font-mono text-sm text-gray-200 leading-relaxed">{t.prompt}</p>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs text-gray-600 select-none">copy prompt →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upsell */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-blue-950/20 p-8">
            <h2 className="text-xl font-bold mb-3">Want the full system?</h2>
            <p className="text-gray-400 mb-6 max-w-xl">
              The Suno Music Mastery guide covers genre-specific prompt engineering, style stacking,
              structure syntax, and production techniques across 12+ genres.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products/vibe-os"
                className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors font-medium text-sm"
              >
                Suno Mastery Guide — $37
              </Link>
              <Link
                href="/music-intelligence"
                className="px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm text-gray-300"
              >
                Music Intelligence System →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
