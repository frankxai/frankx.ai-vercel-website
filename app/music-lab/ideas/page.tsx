'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Lightbulb,
  Copy,
  Check,
  ArrowLeft,
  Music2,
  Zap,
  Guitar,
  Mic2,
  Radio,
  Sparkles,
  Heart,
  Globe,
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface SongIdea {
  id: string
  title: string
  genre: string
  mood: string
  prompt: string
  tags: string[]
  color: string
  accent: string
  border: string
  icon: React.ElementType
}

// ============================================================================
// DATA
// ============================================================================

const songIdeas: SongIdea[] = [
  {
    id: 'anime-rock-distance',
    title: 'Distance & Friendship',
    genre: 'Anime Rock / J-Rock',
    mood: 'Energetic, Youthful, Inspiring',
    prompt:
      'Energetic anime rock, driving live drums intro with punchy kick and snare, bright electric guitar riff upfront, deep bass foundation, emotional male Japanese vocal with immediate melodic hook, raw but warm tone, youthful urgency, chorus lifts fast with strong forward momentum, band-in-a-room feel, melodic but gritty, Japanese lyrics with English mix, cool metaphors about friendship and distance',
    tags: ['J-Rock', 'Male Vocal', 'Japanese', 'Live Band', 'Anime'],
    color: 'from-red-500/15 to-orange-600/10',
    accent: 'text-red-400',
    border: 'border-red-500/20 hover:border-red-400/30',
    icon: Zap,
  },
  {
    id: 'house-wanderlust',
    title: 'Wanderlust',
    genre: 'House / Trance / DnB Fusion',
    mood: 'Hypnotic, Confident, Effortless',
    prompt:
      'House dance remix, trance and drum and bass fusion, duet with funk male vocal and angelic female vocalist in high airy register with rhythmic flow, hypnotic rolling bassline, deep sub bass, repetitive groove, head-nod tempo, vocals weave into the beat, confident and effortless delivery, radio club mix, wandering the world come travel with me from down under to the mountains mmh-mm',
    tags: ['House', 'Trance', 'DnB', 'Duet', 'Club'],
    color: 'from-cyan-500/15 to-blue-600/10',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-400/30',
    icon: Globe,
  },
  {
    id: 'punk-dare-to-dream',
    title: 'Dare to Dream',
    genre: 'Punk Rock',
    mood: 'Bold, Defiant, Explosive',
    prompt:
      'Punk rock hit song, electric guitar virtuoso with blazing riffs and aggressive picking, fast driving tempo, raw powerful vocals, anthemic chorus you can scream along to, tight rhythm section, rebellious energy with soaring melodic hooks, stadium-sized production with garage edge, bold and defiant, daring to dream and refusing to settle, explosive energy from the first note to the last',
    tags: ['Punk', 'Guitar Virtuoso', 'Anthemic', 'Raw'],
    color: 'from-amber-500/15 to-yellow-600/10',
    accent: 'text-amber-400',
    border: 'border-amber-500/20 hover:border-amber-400/30',
    icon: Guitar,
  },
  {
    id: 'arcanean-vibe-gods',
    title: 'Arcanean Vibe Gods',
    genre: 'JP Hip Hop / RU Hip Hop / DnB',
    mood: 'Sophisticated, Cool, High Energy',
    prompt:
      'Sophisticated synth-driven Japanese hip hop meets Russian hip hop, soulful male and female vocals trading verses, bass-heavy drum and bass foundation, cool confident delivery, high energy with dynamic ranges, rich layered production, rap and soul fusion, profound metaphors about being Arcanean Vibe Gods, tonight we vibe tonight we celebrate that we create that we are alive mhh hmm',
    tags: ['JP Hip Hop', 'RU Hip Hop', 'DnB', 'Soul', 'Duet'],
    color: 'from-violet-500/15 to-purple-600/10',
    accent: 'text-violet-400',
    border: 'border-violet-500/20 hover:border-violet-400/30',
    icon: Sparkles,
  },
  {
    id: 'cyborg-love',
    title: 'Cyborg Love Song',
    genre: 'Experimental Pop / Electro',
    mood: 'Futuristic, Intimate, Refined',
    prompt:
      'Experimental pop electro, sexy beautiful female vocal as human cyborg singing of her love for humans, bass-heavy driving beats, sophisticated instrumental arrangement, clean polished production with no noise, futuristic synth textures, warm emotional undertones beneath digital precision, intimate yet powerful delivery, cinematic depth, modern and refined, delicate vocal runs',
    tags: ['Experimental', 'Pop', 'Electro', 'Female Vocal', 'Cinematic'],
    color: 'from-pink-500/15 to-rose-600/10',
    accent: 'text-pink-400',
    border: 'border-pink-500/20 hover:border-pink-400/30',
    icon: Heart,
  },
  {
    id: 'sophisticated-female-hiphop',
    title: 'Sophisticated Vibe',
    genre: 'Hip Hop',
    mood: 'Smooth, Confident, Magnetic',
    prompt:
      'Sophisticated hip hop, female vocals hitting soaring high notes with effortless range, bass-heavy production with deep sub frequencies, smooth confident flow, vibing energy throughout, lush melodic layers over crisp modern drums, rhythmic bounce with elegant phrasing, atmospheric pads underneath, polished intimate mix, head-nod groove, cool and magnetic delivery',
    tags: ['Hip Hop', 'Female Vocal', 'Bass Heavy', 'Smooth'],
    color: 'from-emerald-500/15 to-teal-600/10',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-400/30',
    icon: Mic2,
  },
  {
    id: 'divine-beauty-edm',
    title: 'Divine Beauty',
    genre: 'EDM / Pop',
    mood: 'Sensual, Euphoric, Bold',
    prompt:
      'Sexy female EDM pop anthem, bass-heavy drops with powerful sub bass, sultry confident female vocal celebrating the divine beauty of her body, driving four-on-the-floor beat, shimmering synth melodies, euphoric build-ups and drops, polished radio-ready production, sensual energy, hypnotic groove, club-ready with emotional depth, bold and unapologetic, feeling every curve',
    tags: ['EDM', 'Pop', 'Female Vocal', 'Club', 'Bass Heavy'],
    color: 'from-fuchsia-500/15 to-pink-600/10',
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/20 hover:border-fuchsia-400/30',
    icon: Radio,
  },
]

// ============================================================================
// BACKGROUND
// ============================================================================

function IdeasBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />

      <motion.div
        className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ============================================================================
// PROMPT CARD
// ============================================================================

function PromptCard({ idea, index }: { idea: SongIdea; index: number }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(idea.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group p-6 rounded-2xl bg-gradient-to-br ${idea.color} border ${idea.border} transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <idea.icon className={`w-5 h-5 ${idea.accent}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{idea.title}</h3>
            <p className={`text-xs ${idea.accent} opacity-70`}>{idea.genre}</p>
          </div>
        </div>
        <span className="text-[10px] tracking-wider uppercase text-white/30">
          {idea.prompt.length} chars
        </span>
      </div>

      <p className="text-xs text-white/40 mb-3">{idea.mood}</p>

      <div className="relative">
        <p className="text-sm text-white/60 font-mono bg-white/5 rounded-lg p-4 leading-relaxed">
          {idea.prompt}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1.5">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

// ============================================================================
// HERO
// ============================================================================

function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/music-lab"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Music Lab
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              Song Ideas
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="text-white">Suno prompt</span>
            <br />
            <span className="font-serif-italic text-white/80">ideas lab</span>
          </h1>

          <p className="text-xl text-white/50 mb-4 max-w-2xl leading-relaxed">
            Production-ready Suno prompts crafted with the 5-layer prompt
            architecture. Each prompt is 300-400 characters, optimized for high-quality
            output. Copy, paste into Suno, create.
          </p>
          <p className="text-sm text-white/30 max-w-xl">
            Built on: Foundation + Mood + Instrumentation + Production +
            Intention
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// TIPS SECTION
// ============================================================================

function TipsSection() {
  return (
    <section className="pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            {
              title: 'Lead with genre & energy',
              desc: 'Start with the genre and energy level. Suno uses early tokens heavily to set the overall direction.',
            },
            {
              title: 'Specify 3-6 instruments',
              desc: 'Too few is vague, too many overwhelms. Name the instruments that define the sound.',
            },
            {
              title: 'Describe feel, not specs',
              desc: '"Raw but warm tone" works better than "3kHz EQ boost." Suno understands vibes, not mixing parameters.',
            },
          ].map((tip, i) => (
            <div
              key={tip.title}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/10"
            >
              <p className="text-sm font-medium text-white/80 mb-1">
                {tip.title}
              </p>
              <p className="text-xs text-white/40 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN
// ============================================================================

export default function MusicLabIdeasPage() {
  return (
    <main className="relative min-h-screen text-white">
      <IdeasBackground />

      <div className="relative z-10">
        <HeroSection />
        <TipsSection />

        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {songIdeas.map((idea, i) => (
                <PromptCard key={idea.id} idea={idea} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="text-white/30 text-sm mb-6">
                Prompts crafted using the Suno Prompt Architect 5-layer
                framework. Optimized for Suno v4+.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/music-lab"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/5 transition-all text-sm"
                >
                  <Music2 className="w-4 h-4" />
                  Back to Music Lab
                </Link>
                <Link
                  href="/products/vibe-os"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Vibe OS
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
