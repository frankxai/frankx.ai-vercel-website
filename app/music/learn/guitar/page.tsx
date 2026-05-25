'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const youtubeChannels = [
  {
    name: 'Justin Guitar',
    handle: '@JustinGuitar',
    url: 'https://www.youtube.com/@JustinGuitar',
    lang: 'EN',
    desc: 'The gold standard for beginner guitar. Free structured courses covering chords, strumming, and songs — used by millions of self-taught guitarists worldwide.',
  },
  {
    name: 'Marty Music',
    handle: '@MartyMusic',
    url: 'https://www.youtube.com/@MartyMusic',
    lang: 'EN',
    desc: 'Song tutorial specialist with a friendly, encouraging teaching style. Breaks down popular songs into easy-to-follow chord progressions and strumming patterns.',
  },
  {
    name: 'Andy Guitar',
    handle: '@AndyGuitar',
    url: 'https://www.youtube.com/@AndyGuitar',
    lang: 'EN',
    desc: 'UK-based teacher with excellent beginner courses. Clear explanations, well-structured playlists, and a warm teaching approach that builds confidence fast.',
  },
  {
    name: 'Paul Davids',
    handle: '@PaulDavids',
    url: 'https://www.youtube.com/@PaulDavids',
    lang: 'EN',
    desc: 'Intermediate to advanced content with cinematic production quality. Deep dives into tone, technique, and music theory that make you a more complete guitarist.',
  },
  {
    name: 'Bernth',
    handle: '@Bernth',
    url: 'https://www.youtube.com/@Bernth',
    lang: 'EN',
    desc: 'Technical exercises, shredding tutorials, and progressive practice routines. Ideal for players ready to push their speed, accuracy, and fretboard knowledge.',
  },
  {
    name: 'Sandercas',
    handle: '@sandercas',
    url: 'https://www.youtube.com/@sandercas',
    lang: 'DE',
    desc: 'German guitar teacher with detailed lessons covering acoustic and electric styles. Great for German-speaking learners who want structured, methodical instruction.',
  },
]

const essentialChords = [
  { name: 'G Major', fingers: 'Index on 2nd fret A string, middle on 3rd fret low E, ring on 3rd fret high E' },
  { name: 'C Major', fingers: 'Index on 1st fret B string, middle on 2nd fret D, ring on 3rd fret A' },
  { name: 'D Major', fingers: 'Index on 2nd fret G string, ring on 3rd fret B, middle on 2nd fret high E' },
  { name: 'A Major', fingers: 'Index on 2nd fret D, middle on 2nd fret G, ring on 2nd fret B string' },
  { name: 'E Major', fingers: 'Index on 1st fret G string, middle on 2nd fret A, ring on 2nd fret D' },
  { name: 'E Minor', fingers: 'Middle on 2nd fret A string, ring on 2nd fret D — the easiest chord' },
  { name: 'A Minor', fingers: 'Index on 1st fret B string, middle on 2nd fret D, ring on 2nd fret G' },
  { name: 'D Minor', fingers: 'Index on 1st fret high E, middle on 2nd fret G, ring on 3rd fret B' },
]

const firstSongs = [
  { title: "Knockin' on Heaven's Door", artist: 'Bob Dylan', difficulty: 1, genre: 'Folk/Rock', note: '3 chords' },
  { title: 'Horse with No Name', artist: 'America', difficulty: 1, genre: 'Folk Rock', note: '2 chords' },
  { title: 'Wish You Were Here', artist: 'Pink Floyd', difficulty: 2, genre: 'Rock', note: 'Iconic intro' },
  { title: 'Wonderwall', artist: 'Oasis', difficulty: 2, genre: 'Britpop', note: 'Campfire classic' },
  { title: 'Hey There Delilah', artist: "Plain White T's", difficulty: 2, genre: 'Pop', note: 'Fingerpicking' },
  { title: 'Blackbird', artist: 'Beatles', difficulty: 3, genre: 'Folk', note: 'Fingerpicking mastery' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', difficulty: 3, genre: 'Rock', note: 'The journey' },
  { title: 'Nothing Else Matters', artist: 'Metallica', difficulty: 3, genre: 'Metal', note: 'Beautiful intro' },
  { title: 'Hallelujah', artist: 'Leonard Cohen', difficulty: 2, genre: 'Folk', note: 'Arpeggio pattern' },
  { title: 'Hotel California', artist: 'Eagles', difficulty: 4, genre: 'Rock', note: 'The ultimate' },
]

const tabSources = [
  { name: 'Ultimate Guitar', url: 'https://www.ultimate-guitar.com', desc: 'The largest guitar tab database on the internet — millions of user-submitted tabs, chords, and bass tabs with ratings and versions' },
  { name: 'Songsterr', url: 'https://www.songsterr.com', desc: 'Interactive tabs with realistic playback, tempo control, and instrument isolation. Hear how each part sounds before you play it' },
  { name: 'MuseScore', url: 'https://musescore.com', desc: 'Community sheet music library with classical guitar scores, notation playback, and transposition tools' },
  { name: 'Guitar Pro Tabs', url: 'https://www.guitarprotabs.org', desc: 'Free Guitar Pro format tabs — multi-track tablature with realistic RSE playback for detailed practice' },
]

const practiceTips = [
  { title: 'Build Calluses First', desc: 'Your fingertips will hurt for the first 2-3 weeks. Play through short sessions daily — calluses form faster with consistent, moderate pressure than marathon sessions.' },
  { title: 'Slow Chord Changes', desc: 'Practice switching between two chords at a glacial pace. Plant all fingers simultaneously. Speed comes from clean muscle memory, not rushing.' },
  { title: 'Metronome from Day One', desc: 'Start at 60 BPM and strum one chord per beat. Gradually increase tempo only when changes feel effortless. Rhythm is more important than speed.' },
  { title: 'Practice Standing Up', desc: 'If you plan to play live, practice standing regularly. The neck angle and hand position change — build both sitting and standing muscle memory.' },
  { title: 'Record Yourself Weekly', desc: 'Audio recordings reveal timing issues and muted strings your ears miss in real-time. Compare monthly recordings to track progress objectively.' },
  { title: 'Learn Songs You Love', desc: 'Motivation beats methodology. If you love a song, you will practice it obsessively. Choose songs that excite you within your current skill range.' },
]

const aiTools = [
  { name: 'Fender Play', desc: 'Structured video courses from Fender with bite-sized lessons, song tutorials, and progress tracking. Paid subscription with a polished learning path.' },
  { name: 'Yousician', desc: 'Gamified learning with real-time pitch detection through your microphone. Tracks accuracy, timing, and progression across exercises and songs.' },
  { name: 'Guitar Tuna', desc: 'Free chromatic tuner app with high accuracy. Also includes chord diagrams, a metronome, and basic chord games for beginners.' },
  { name: 'Chordify', desc: 'Upload or paste any song and get auto-detected chord progressions in real-time. Play along with synced chords — works with YouTube, Spotify, and uploads.' },
]

export default function GuitarLearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎸</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Learn Guitar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Acoustic, electric, or classical — the most popular instrument in the world. From your first open chord to fingerpicking mastery, everything you need to start playing guitar today.
          </p>
        </motion.header>

        {/* Why Guitar */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Why Guitar?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Portability',
                desc: 'Take it to the park, the beach, a campfire, or on a plane. Guitar goes wherever you go — the most portable full-range instrument.',
                icon: '🎒',
              },
              {
                title: 'Community',
                desc: 'More tabs, tutorials, and song breakdowns online than any other instrument. Millions of guitarists sharing knowledge freely across every platform.',
                icon: '🌍',
              },
              {
                title: 'Versatility',
                desc: 'Rock, blues, folk, classical, flamenco, jazz, country, metal — guitar is the backbone of nearly every genre of popular music.',
                icon: '🔥',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-2xl">{item.icon}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Getting Started */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Getting Started: 5-Step Quickstart</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Hold the Guitar + Proper Posture', desc: 'Sit with the guitar body on your right thigh (or left if left-handed). Keep your back straight, elbow relaxed, and thumb behind the neck — never gripping over the top.' },
              { step: 2, title: 'Learn 3 Essential Open Chords: G, C, D', desc: 'These three chords unlock hundreds of songs. Practice placing all fingers simultaneously and strumming cleanly — every string should ring out clearly.' },
              { step: 3, title: 'Master Basic Strumming Patterns', desc: 'Start with all downstrokes, then progress to the universal pattern: down-down-up-up-down-up. Keep your wrist loose and strum from the elbow, not the wrist.' },
              { step: 4, title: "Play Your First Song", desc: "Try \"Knockin\' on Heaven\'s Door\" — just G, D, Am, and C in a repeating loop. You will be playing a real song within your first week." },
              { step: 5, title: 'Build Calluses + Daily Practice Routine', desc: 'Play 15-20 minutes daily. Your fingertips will toughen within 2-3 weeks. Set a timer: 5 min chord changes, 10 min song practice, 5 min strumming exercises.' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Essential Open Chords */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Essential Open Chords</h2>
          <p className="mb-6 text-white/50">The 8 chords that unlock thousands of songs. Master these before moving to barre chords.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {essentialChords.map((chord) => (
              <div
                key={chord.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-bold text-amber-400">{chord.name}</h3>
                <p className="mt-2 text-sm text-white/50">{chord.fingers}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* YouTube Teachers */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Best YouTube Guitar Teachers</h2>
          <p className="mb-6 text-white/50">Curated channels for every learning style — from absolute beginner to advanced technique.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {youtubeChannels.map((ch) => (
              <a
                key={ch.handle}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-amber-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white group-hover:text-amber-400">{ch.name}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">{ch.lang}</span>
                </div>
                <p className="mt-1 text-xs text-white/30">{ch.handle}</p>
                <p className="mt-2 text-sm text-white/50">{ch.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* First 10 Songs */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Your First 10 Songs</h2>
          <p className="mb-6 text-white/50">Sorted by difficulty. Build confidence with early wins, then level up.</p>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="hidden grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/40 sm:grid">
              <span>Title</span>
              <span>Artist</span>
              <span>Note</span>
              <span>Level</span>
            </div>
            {firstSongs.map((song, i) => (
              <div
                key={song.title}
                className={`grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:gap-4 sm:items-center ${
                  i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.04]'
                }`}
              >
                <span className="font-medium text-white">{song.title}</span>
                <span className="text-sm text-white/50">{song.artist}</span>
                <span className="text-xs text-white/30">{song.note}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <span
                      key={j}
                      className={`h-1.5 w-3 rounded-full ${
                        j < song.difficulty ? 'bg-amber-400' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Free Tab & Sheet Music */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Free Tab &amp; Sheet Music</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tabSources.map((src) => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-amber-400/30"
              >
                <h3 className="font-semibold text-white group-hover:text-amber-400">{src.name}</h3>
                <p className="mt-2 text-sm text-white/50">{src.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Practice Tips */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Guitar Practice Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {practiceTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-amber-400">{tip.title}</h3>
                <p className="mt-2 text-sm text-white/50">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI Tools for Guitar */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">AI Tools for Guitar</h2>
          <p className="mb-6 text-white/50">Technology that listens, adapts, and accelerates your progress.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-amber-400">{tool.name}</h3>
                <p className="mt-2 text-sm text-white/50">{tool.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* How AI Helps Guitarists */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-8">
            <h2 className="text-2xl font-bold text-white">How AI Is Changing Guitar Learning</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              AI-powered apps can now listen to your playing through a microphone and provide instant feedback on chord accuracy, timing, and finger placement — capabilities that previously required a human teacher watching your hands. Chord detection algorithms identify what you are playing in real-time and compare it against the target, highlighting muted strings and buzzing frets.
            </p>
            <p className="mt-3 text-white/60 leading-relaxed">
              Practice tracking systems analyze your session data to surface weak spots and generate targeted exercises. Tools like Chordify can extract chord progressions from any audio source, letting you learn songs that have never been formally transcribed. AI tab generators are beginning to produce accurate tablature from raw audio, expanding the library of playable music exponentially.
            </p>
          </div>
        </motion.section>

        {/* Frank's Music */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Frank&apos;s Music</h2>
            <p className="mt-3 text-white/50">
              Explore AI-generated music across genres — from acoustic compositions to electronic productions.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/music"
                className="rounded-full bg-amber-500/20 px-6 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-amber-500/30"
              >
                Browse All Music
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/piano"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Learn Piano
          </Link>
          <Link
            href="/music/learn/violin"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Learn Violin
          </Link>
          <Link
            href="/music/learn"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            All Instruments
          </Link>
          <Link
            href="/music"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Music
          </Link>
        </div>
      </div>
    </div>
  )
}
