'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import InteractivePiano, { SONGS } from '@/components/music/InteractivePiano'

// ── Song Collections ────────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    title: 'Studio Ghibli',
    emoji: '🎬',
    color: 'from-emerald-500/10 to-cyan-500/5',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
    songs: [
      { name: 'Always With Me (Spirited Away)', composer: 'Joe Hisaishi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=always+with+me+spirited+away+piano+easy' },
      { name: 'One Summer\'s Day (Spirited Away)', composer: 'Joe Hisaishi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=one+summers+day+spirited+away+piano' },
      { name: 'Merry-Go-Round of Life (Howl\'s Moving Castle)', composer: 'Joe Hisaishi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=merry+go+round+of+life+piano' },
      { name: 'My Neighbor Totoro (Path of Wind)', composer: 'Joe Hisaishi', difficulty: 1, sheet: 'https://musescore.com/sheetmusic?text=my+neighbor+totoro+path+of+wind+piano' },
      { name: 'Kiki\'s Delivery Service (A Town with an Ocean View)', composer: 'Joe Hisaishi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=town+ocean+view+kiki+piano' },
      { name: 'Princess Mononoke (Legend of Ashitaka)', composer: 'Joe Hisaishi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=legend+ashitaka+piano' },
      { name: 'Castle in the Sky (Carrying You)', composer: 'Joe Hisaishi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=carrying+you+castle+in+the+sky+piano' },
      { name: 'The Wind Rises', composer: 'Joe Hisaishi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=wind+rises+hisaishi+piano' },
    ],
  },
  {
    title: 'Film & TV Scores',
    emoji: '🎥',
    color: 'from-violet-500/10 to-purple-500/5',
    border: 'border-violet-500/20',
    accent: 'text-violet-400',
    songs: [
      { name: 'Comptine d\'un autre été (Amélie)', composer: 'Yann Tiersen', difficulty: 3, sheet: 'https://musescore.com/user/107279/scores/116268' },
      { name: 'Interstellar (Main Theme)', composer: 'Hans Zimmer', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=interstellar+main+theme+piano' },
      { name: 'Schindler\'s List (Theme)', composer: 'John Williams', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=schindlers+list+piano' },
      { name: 'The Godfather (Main Theme)', composer: 'Nino Rota', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=godfather+theme+piano+easy' },
      { name: 'Game of Thrones (Main Theme)', composer: 'Ramin Djawadi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=game+of+thrones+piano+easy' },
      { name: 'Pirates of the Caribbean', composer: 'Hans Zimmer', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=pirates+caribbean+piano' },
    ],
  },
  {
    title: 'Classical Essentials',
    emoji: '🎹',
    color: 'from-blue-500/10 to-indigo-500/5',
    border: 'border-blue-500/20',
    accent: 'text-blue-400',
    songs: [
      { name: 'Für Elise', composer: 'Beethoven', difficulty: 2, sheet: 'https://musescore.com/user/19710/scores/33816' },
      { name: 'Clair de Lune', composer: 'Debussy', difficulty: 4, sheet: 'https://musescore.com/sheetmusic?text=clair+de+lune+piano' },
      { name: 'Moonlight Sonata (1st Movement)', composer: 'Beethoven', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=moonlight+sonata+piano' },
      { name: 'Canon in D', composer: 'Pachelbel', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=canon+in+d+piano+easy' },
      { name: 'Prelude in C Major', composer: 'J.S. Bach', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=prelude+c+major+bach+piano' },
      { name: 'Gymnopédie No. 1', composer: 'Satie', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=gymnopedie+1+piano' },
      { name: 'River Flows in You', composer: 'Yiruma', difficulty: 3, sheet: 'https://musescore.com/user/13340/scores/6142311' },
      { name: 'Nuvole Bianche', composer: 'Einaudi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=nuvole+bianche+piano' },
    ],
  },
  {
    title: 'Pop & Modern',
    emoji: '🎤',
    color: 'from-rose-500/10 to-pink-500/5',
    border: 'border-rose-500/20',
    accent: 'text-rose-400',
    songs: [
      { name: 'Someone Like You', composer: 'Adele', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=someone+like+you+piano+easy' },
      { name: 'All of Me', composer: 'John Legend', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=all+of+me+john+legend+piano' },
      { name: 'Clocks', composer: 'Coldplay', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=clocks+coldplay+piano' },
      { name: 'Bohemian Rhapsody', composer: 'Queen', difficulty: 4, sheet: 'https://musescore.com/sheetmusic?text=bohemian+rhapsody+piano' },
      { name: 'A Thousand Years', composer: 'Christina Perri', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=thousand+years+piano+easy' },
      { name: 'Hallelujah', composer: 'Leonard Cohen', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=hallelujah+piano+easy' },
    ],
  },
  {
    title: 'Beginner Fundamentals',
    emoji: '🌱',
    color: 'from-amber-500/10 to-yellow-500/5',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    songs: [
      { name: 'Twinkle Twinkle Little Star', composer: 'Traditional', difficulty: 1, sheet: 'https://musescore.com/user/27638568/scores/5685498' },
      { name: 'Ode to Joy', composer: 'Beethoven', difficulty: 1, sheet: 'https://musescore.com/user/169696/scores/163396' },
      { name: 'Happy Birthday', composer: 'Traditional', difficulty: 1, sheet: 'https://musescore.com/user/2803921/scores/847121' },
      { name: 'Mary Had a Little Lamb', composer: 'Traditional', difficulty: 1, sheet: 'https://musescore.com/sheetmusic?text=mary+had+little+lamb+piano+easy' },
      { name: 'Jingle Bells', composer: 'Traditional', difficulty: 1, sheet: 'https://musescore.com/sheetmusic?text=jingle+bells+piano+easy' },
      { name: 'Amazing Grace', composer: 'Traditional', difficulty: 1, sheet: 'https://musescore.com/sheetmusic?text=amazing+grace+piano+easy' },
    ],
  },
  {
    title: 'Anime & Japanese',
    emoji: '🌸',
    color: 'from-pink-500/10 to-rose-500/5',
    border: 'border-pink-500/20',
    accent: 'text-pink-400',
    songs: [
      { name: 'Zankyou no Terror (Lullaby)', composer: 'Yoko Kanno', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=zankyou+no+terror+lullaby+piano' },
      { name: 'Unravel (Tokyo Ghoul)', composer: 'TK from Ling Tosite Sigure', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=unravel+tokyo+ghoul+piano' },
      { name: 'Gurenge (Demon Slayer)', composer: 'LiSA', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=gurenge+demon+slayer+piano' },
      { name: 'Sparkle (Your Name)', composer: 'RADWIMPS', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=sparkle+your+name+radwimps+piano' },
      { name: 'A Cruel Angel\'s Thesis (Evangelion)', composer: 'Yoko Takahashi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=cruel+angels+thesis+evangelion+piano' },
      { name: 'Blue Bird (Naruto)', composer: 'Ikimono-gakari', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=blue+bird+naruto+piano' },
      { name: 'Again (FMAB)', composer: 'YUI', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=again+fullmetal+alchemist+piano' },
      { name: 'The Rumbling (Attack on Titan)', composer: 'SiM', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=the+rumbling+attack+on+titan+piano' },
      { name: 'Departures (Clannad)', composer: 'Riya', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=departures+clannad+piano' },
      { name: 'Nandemonaiya (Your Name)', composer: 'RADWIMPS', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=nandemonaiya+your+name+piano' },
    ],
  },
  {
    title: 'More Ghibli',
    emoji: '🍃',
    color: 'from-teal-500/10 to-green-500/5',
    border: 'border-teal-500/20',
    accent: 'text-teal-400',
    songs: [
      { name: 'The Path of Wind (Totoro)', composer: 'Joe Hisaishi', difficulty: 1, sheet: 'https://musescore.com/sheetmusic?text=path+of+wind+totoro+piano+easy' },
      { name: 'A Town with an Ocean View (Kiki)', composer: 'Joe Hisaishi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=town+ocean+view+kiki+delivery+piano' },
      { name: 'Ponyo on the Cliff by the Sea', composer: 'Joe Hisaishi', difficulty: 1, sheet: 'https://musescore.com/sheetmusic?text=ponyo+cliff+by+the+sea+piano+easy' },
      { name: 'Arrietty\'s Song (Borrower Arrietty)', composer: 'Cécile Corbel', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=arriettys+song+piano' },
      { name: 'The Name of Life (Spirited Away)', composer: 'Joe Hisaishi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=name+of+life+spirited+away+piano' },
      { name: 'Summer (Kikujiro)', composer: 'Joe Hisaishi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=summer+kikujiro+hisaishi+piano' },
      { name: 'Nausicaä Requiem', composer: 'Joe Hisaishi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=nausicaa+requiem+hisaishi+piano' },
      { name: 'From Up on Poppy Hill (Theme)', composer: 'Joe Hisaishi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=from+up+on+poppy+hill+piano' },
    ],
  },
  {
    title: 'Chopin & Romantic',
    emoji: '🌹',
    color: 'from-red-500/10 to-rose-500/5',
    border: 'border-red-500/20',
    accent: 'text-red-400',
    songs: [
      { name: 'Nocturne Op.9 No.2', composer: 'Chopin', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=nocturne+op+9+no+2+chopin+piano' },
      { name: 'Waltz in C# Minor', composer: 'Chopin', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=waltz+c+sharp+minor+chopin+piano' },
      { name: 'Prelude in E Minor Op.28', composer: 'Chopin', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=prelude+e+minor+op+28+chopin+piano' },
      { name: 'Liebestraum No.3', composer: 'Liszt', difficulty: 4, sheet: 'https://musescore.com/sheetmusic?text=liebestraum+no+3+liszt+piano' },
      { name: 'Arabesque No.1', composer: 'Debussy', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=arabesque+no+1+debussy+piano' },
      { name: 'Reverie', composer: 'Debussy', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=reverie+debussy+piano' },
    ],
  },
  {
    title: 'Modern & Uplifting',
    emoji: '🌅',
    color: 'from-sky-500/10 to-blue-500/5',
    border: 'border-sky-500/20',
    accent: 'text-sky-400',
    songs: [
      { name: 'Experience', composer: 'Ludovico Einaudi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=experience+einaudi+piano' },
      { name: 'Nuvole Bianche', composer: 'Ludovico Einaudi', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=nuvole+bianche+einaudi+piano' },
      { name: 'Una Mattina', composer: 'Ludovico Einaudi', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=una+mattina+einaudi+piano' },
      { name: 'Near Light', composer: 'Ólafur Arnalds', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=near+light+olafur+arnalds+piano' },
      { name: 'Saman', composer: 'Ólafur Arnalds', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=saman+olafur+arnalds+piano' },
      { name: 'Kiss the Rain', composer: 'Yiruma', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=kiss+the+rain+yiruma+piano' },
      { name: 'May Be', composer: 'Yiruma', difficulty: 2, sheet: 'https://musescore.com/sheetmusic?text=may+be+yiruma+piano' },
      { name: 'The Heart Asks Pleasure First (The Piano)', composer: 'Michael Nyman', difficulty: 3, sheet: 'https://musescore.com/sheetmusic?text=heart+asks+pleasure+first+nyman+piano' },
    ],
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PianoSongsPage() {
  return (
    <div className="min-h-screen bg-[#060810]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-5xl">🎹</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Piano Songs & Sheet Music
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Play songs directly in your browser, then download free sheet music to learn them for real. Studio Ghibli, anime, film scores, classical, romantic, modern, pop, and beginner pieces.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/music-lab/piano"
              className="rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/30"
            >
              Open Grand Piano 🎹
            </Link>
            <Link
              href="/music/learn/piano"
              className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:bg-white/15"
            >
              Learn Piano →
            </Link>
          </div>
        </motion.header>

        {/* Interactive Piano with Built-in Songs */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-8">
            <h2 className="mb-4 text-center text-xl font-bold text-white">Try It — Play or Listen</h2>
            <InteractivePiano showLabels />
          </div>
        </motion.section>

        {/* Song Collections */}
        {COLLECTIONS.map((collection) => (
          <motion.section key={collection.title} {...fadeUp} className="mb-12">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <span className="text-2xl">{collection.emoji}</span>
              {collection.title}
              <span className="text-sm font-normal text-white/30">({collection.songs.length} songs)</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {collection.songs.map((song) => (
                <div
                  key={song.name}
                  className={`rounded-xl border ${collection.border} bg-gradient-to-br ${collection.color} p-4 transition hover:bg-white/[0.04]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-white truncate">{song.name}</p>
                      <p className="mt-0.5 text-sm text-white/40">{song.composer}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="flex gap-0.5">
                        {Array.from({ length: 4 }, (_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 w-2.5 rounded-full ${
                              i < song.difficulty ? 'bg-white/40' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </span>
                      <a
                        href={song.sheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`rounded-full bg-white/10 px-3 py-1 text-xs font-medium ${collection.accent} transition hover:bg-white/20`}
                      >
                        Sheet
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Sheet Music Sources */}
        <motion.section {...fadeUp} className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-white">Where to Find More Sheet Music</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'MuseScore', url: 'https://musescore.com', desc: 'Largest free sheet music community', icon: '🎵' },
              { name: 'IMSLP', url: 'https://imslp.org', desc: 'Public domain classical scores', icon: '📚' },
              { name: 'Piano Juku', url: 'https://pianojuku.info/en/free-sheet-ghibli-matome/', desc: 'Free Ghibli arrangements', icon: '🎬' },
              { name: 'Sheet Music Library', url: 'https://sheetmusiclibrary.website', desc: 'Curated piano collections', icon: '📄' },
            ].map((src) => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
              >
                <span className="text-2xl">{src.icon}</span>
                <p className="mt-2 font-medium text-white group-hover:text-cyan-400">{src.name}</p>
                <p className="mt-1 text-xs text-white/40">{src.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <div className="mb-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <p className="text-3xl font-black text-white">66</p>
              <p className="text-xs text-white/40">Curated Songs</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">9</p>
              <p className="text-xs text-white/40">Collections</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">6</p>
              <p className="text-xs text-white/40">Auto-Play Songs</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">4</p>
              <p className="text-xs text-white/40">Sheet Sources</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/music-lab/piano" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            🎹 Grand Piano
          </Link>
          <Link href="/music/learn/piano" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            📖 Learn Piano
          </Link>
          <Link href="/music-lab" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            ← Music Lab
          </Link>
          <Link href="/music/tools" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">
            🛠️ Music Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
