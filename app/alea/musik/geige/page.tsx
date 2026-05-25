'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

// ── Structured Curriculum ───────────────────────────────────────────────────

const LEVELS = [
  {
    id: 'stufe1',
    level: 'Stufe 1',
    title: 'Haltung & offene Saiten',
    emoji: '🌱',
    color: 'emerald',
    ageNote: 'Ab 5 Jahren · Erste 4 Wochen',
    skills: [
      'Geige richtig halten — Kinn auf die Kinnstütze',
      'Bogen halten — locker wie ein kleines Vögelchen',
      'Die 4 offenen Saiten: G, D, A, E',
      'Gleichmäßige Bogenstriche üben',
      'Pizzicato — Zupfen mit dem Finger',
    ],
    songs: [
      { name: 'Twinkle Twinkle (Suzuki #1)', notes: 'A A E E | F# F# E —', style: 'Die Suzuki-Methode beginnt hier', sheet: 'https://musescore.com/user/27638568/scores/5685498' },
      { name: 'Offene Saiten Lied', notes: 'G — D — | A — E —', style: 'Jede Saite einzeln, gleichmäßig', sheet: 'https://musescore.com/sheetmusic?text=open+strings+violin+beginner' },
      { name: 'Lightly Row (Suzuki #2)', notes: 'E E D D | C C D —', style: 'Erste Finger auf der A-Saite', sheet: 'https://musescore.com/sheetmusic?text=lightly+row+violin' },
    ],
    videos: [
      { title: 'Erste Geigenstunde — Antoine Morales', channel: 'Antoine Morales', url: 'https://www.youtube.com/@AntoineMoralesViolin', desc: 'Profigeiger erklärt Haltung, Bogenhaltung und erste Töne auf Deutsch' },
      { title: 'Geige stimmen — Anfänger-Anleitung', channel: 'Antoine Morales', url: 'https://www.antoinemorales.com/geige-stimmen/', desc: 'Schritt-für-Schritt mit empfohlener App' },
    ],
  },
  {
    id: 'stufe2',
    level: 'Stufe 2',
    title: 'Erste Lage & Melodien',
    emoji: '🌿',
    color: 'cyan',
    ageNote: 'Monat 2–3 · Wenn offene Saiten sicher klingen',
    skills: [
      '1. Finger (Zeigefinger) auf jeder Saite',
      '2. und 3. Finger dazu — Tonleitern spielen',
      'D-Dur Tonleiter in der 1. Lage',
      'Saubere Intonation — richtig treffen',
      'Legato — fließende Bogenführung',
    ],
    songs: [
      { name: 'Alle meine Entchen', notes: 'D E F# G | A A —', style: 'D-Dur, 1. Lage', sheet: 'https://musescore.com/sheetmusic?text=alle+meine+entchen+violin' },
      { name: 'Hänschen klein', notes: 'A F# F# | G E E', style: 'Einfache Melodie mit 3 Fingern', sheet: 'https://musescore.com/sheetmusic?text=hanschen+klein+violin' },
      { name: 'Allegro (Suzuki #5)', notes: 'A-Dur', style: 'Schnelleres Tempo, fröhlich', sheet: 'https://musescore.com/sheetmusic?text=allegro+suzuki+violin' },
    ],
    videos: [
      { title: 'Suzuki Violin Book 1 — alle Stücke', channel: 'Violinspiration', url: 'https://www.youtube.com/@violinspiration', desc: 'Julia Bushkova erklärt jedes Suzuki-Stück mit Tipps zur Technik' },
      { title: 'D-Dur Tonleiter für Anfänger', channel: 'Violin MD', url: 'https://www.youtube.com/@ViolinMD', desc: 'Tonleitern sind das Fundament — hier lernst du sie richtig' },
    ],
  },
  {
    id: 'stufe3',
    level: 'Stufe 3',
    title: 'Ausdruck & erste Klassik',
    emoji: '🌳',
    color: 'violet',
    ageNote: 'Ab Monat 4 · Wenn die 1. Lage sicher sitzt',
    skills: [
      'Vibrato — Töne zum Schwingen bringen',
      'Dynamik — leise und laut spielen',
      'Verschiedene Bogenstriche: Détaché, Staccato',
      'G-Dur und A-Dur Tonleitern',
      'Stücke ausdrucksvoll vortragen',
    ],
    songs: [
      { name: 'Gavotte (Gossec)', notes: 'G-Dur', style: 'Barock — elegant und tänzerisch', sheet: 'https://musescore.com/sheetmusic?text=gavotte+gossec+violin' },
      { name: 'Ode an die Freude', notes: 'D-Dur', style: 'Beethoven, aber spielbar!', sheet: 'https://musescore.com/user/169696/scores/163396' },
      { name: 'Czardas (Monti)', notes: 'D-Moll → D-Dur', style: 'Ungarisch, feurig, ein Traumstück', sheet: 'https://musescore.com/sheetmusic?text=czardas+monti+violin' },
    ],
    videos: [
      { title: 'Vibrato lernen — Anfänger', channel: 'Violinspiration', url: 'https://www.youtube.com/@violinspiration', desc: 'Vibrato ist was die Geige singen lässt — hier lernst du es' },
      { title: 'Hilary Hahn Practice Routine', channel: 'Hilary Hahn', url: 'https://www.youtube.com/@hilaryhahn', desc: 'Wie eine Weltklasse-Geigerin übt — Inspiration pur' },
    ],
  },
]

const TEACHERS = [
  {
    name: 'Antoine Morales',
    channel: '@AntoineMoralesViolin',
    lang: '🇩🇪 Deutsch',
    description: 'Profigeiger und Autor. Erfinder der "Geigenpyramide" Methode. Erklärt auf Deutsch mit viel Geduld. Besonders gut: Haltung, Intonation, Stimmtechnik.',
    tags: ['Deutsch', 'Methodik', 'Anfänger'],
    url: 'https://www.youtube.com/@AntoineMoralesViolin',
  },
  {
    name: 'Violinspiration (Julia Bushkova)',
    channel: '@violinspiration',
    lang: '🇬🇧 English (klar)',
    description: 'Die beste Geigenlehrerin auf YouTube. Erklärt jedes Suzuki-Stück, zeigt Fingertechnik, gibt Übetipps. Über 20 Jahre Erfahrung.',
    tags: ['Suzuki', 'Technik', 'Übetipps'],
    url: 'https://www.youtube.com/@violinspiration',
  },
  {
    name: 'TwoSet Violin',
    channel: '@TwoSetViolin',
    lang: '🇬🇧 English',
    description: 'Zwei Geiger aus Australien. Lustig, motivierend, ehrlich. Zeigen, dass Geige üben auch Spaß machen kann. Perfekt zum Inspirieren.',
    tags: ['Humor', 'Motivation', 'Inspiration'],
    url: 'https://www.youtube.com/@TwoSetViolin',
  },
  {
    name: 'Hilary Hahn',
    channel: '@hilaryhahn',
    lang: '🇬🇧 English',
    description: 'Eine der besten Geigerinnen der Welt. 3× Grammy-Gewinnerin. Teilt Übe-Routinen und Konzerteinblicke. Zeigt: Weltklasse beginnt mit Basics.',
    tags: ['Weltklasse', 'Inspiration', 'Praxis'],
    url: 'https://www.youtube.com/@hilaryhahn',
  },
]

const INSPIRING_VIOLINISTS = [
  { name: 'Karolina Protsenko', desc: 'Begann mit 6, spielt auf der Straße, Millionen Fans weltweit', emoji: '🌟', url: 'https://www.youtube.com/@KarolinaProtsenko' },
  { name: 'Anne-Sophie Mutter', desc: 'Deutsche Weltklasse-Geigerin, Debüt mit 13 bei den Berliner Philharmonikern', emoji: '🇩🇪', url: 'https://www.youtube.com/results?search_query=anne+sophie+mutter+violin' },
  { name: 'Lindsey Stirling', desc: 'Geige + Tanz + elektronische Musik = pure Energie', emoji: '⚡', url: 'https://www.youtube.com/@lindseystirling' },
  { name: 'David Garrett', desc: 'Deutscher Geiger — Crossover zwischen Klassik und Rock', emoji: '🎸', url: 'https://www.youtube.com/results?search_query=david+garrett+violin' },
]

const SHEET_MUSIC_SOURCES = [
  { name: 'MuseScore', url: 'https://musescore.com/', desc: 'Suche nach Lied + "violin" → kostenlose Noten drucken.', emoji: '🎵' },
  { name: 'IMSLP', url: 'https://imslp.org/', desc: 'Alle klassischen Geigenstücke kostenlos (Vivaldi, Bach, Mozart).', emoji: '📚' },
  { name: 'Violinspiration Noten', url: 'https://violinspiration.com/free-violin-sheet-music/', desc: 'Kostenlose Geigennoten sortiert nach Schwierigkeitsgrad.', emoji: '📄' },
]

const PRACTICE_TIPS = [
  { tip: 'Halte den Bogen locker — wie ein kleines Vögelchen, das du halten möchtest.', emoji: '🐦' },
  { tip: 'Übe offene Saiten, bis dein Ton klar und gleichmäßig klingt. Das ist das Fundament.', emoji: '🏗️' },
  { tip: 'Höre dir Profis an. Dein Ohr lernt mit, auch wenn deine Finger noch üben.', emoji: '👂' },
  { tip: 'Stelle dich vor einen Spiegel. So siehst du Haltung und Bogenwinkel.', emoji: '🪞' },
  { tip: 'Spiele Tonleitern mit dem Metronom. Langsam starten, dann schneller werden.', emoji: '⏱️' },
  { tip: 'Die Intonation kommt mit der Zeit. Geduld ist dein wichtigstes Instrument.', emoji: '🧘' },
]

const levelColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ViolinLearnPage() {
  const [openLevel, setOpenLevel] = useState('stufe1')

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-rose-50/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Back nav */}
        <div className="mb-6">
          <Link href="/alea" className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-3 text-sm font-bold text-violet-700 shadow-sm transition hover:bg-violet-200 active:scale-95">
            <span>🎂</span> Aleas Welt
          </Link>
        </div>

        {/* Hero */}
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <p className="text-6xl">🎻</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Geige Lernen</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-600">
            Die Stimme des Orchesters. Kein Instrument kommt der menschlichen Stimme so nahe — und keines belohnt Geduld so sehr.
          </p>
        </motion.header>

        {/* The 4 Strings */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎵 Die vier Saiten</h2>
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {[
              { note: 'G', name: 'Die tiefste', color: 'bg-amber-100 text-amber-700', desc: 'Warm und dunkel' },
              { note: 'D', name: 'Die warme', color: 'bg-rose-100 text-rose-700', desc: 'Voll und rund' },
              { note: 'A', name: 'Die helle', color: 'bg-violet-100 text-violet-700', desc: 'Klar und strahlend' },
              { note: 'E', name: 'Die höchste', color: 'bg-cyan-100 text-cyan-700', desc: 'Brillant und hell' },
            ].map((s) => (
              <div key={s.note} className={`rounded-2xl ${s.color} p-4`}>
                <p className="text-3xl font-black">{s.note}</p>
                <p className="mt-1 text-sm font-medium">{s.name}</p>
                <p className="mt-1 text-sm opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Level Curriculum ────────────────────────────────────── */}
        <div className="mb-12 space-y-6">
          {LEVELS.map((level) => {
            const c = levelColors[level.color]
            const isOpen = openLevel === level.id
            return (
              <motion.section
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-3xl border ${c.border} ${c.bg} overflow-hidden shadow-sm`}
              >
                <button
                  onClick={() => setOpenLevel(isOpen ? '' : level.id)}
                  className="flex w-full items-center gap-4 p-6 text-left transition hover:bg-white/40"
                >
                  <span className="text-4xl">{level.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full ${c.badge} px-3 py-1 text-sm font-bold`}>{level.level}</span>
                      <span className="text-sm text-slate-500">{level.ageNote}</span>
                    </div>
                    <h2 className={`mt-1 text-2xl font-bold ${c.text}`}>{level.title}</h2>
                  </div>
                  <span className={`text-2xl transition-transform ${isOpen ? 'rotate-90' : ''}`}>→</span>
                </button>

                {isOpen && (
                  <div className="space-y-6 px-6 pb-6">
                    <div>
                      <h3 className="mb-3 text-lg font-bold text-slate-800">🎯 Das lernst du</h3>
                      <ul className="space-y-2">
                        {level.skills.map((skill) => (
                          <li key={skill} className="flex items-start gap-2 rounded-xl bg-white/60 p-3 text-base text-slate-700">
                            <span className="mt-0.5 text-emerald-500">✓</span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-bold text-slate-800">🎶 Stücke zum Üben</h3>
                      <div className="space-y-3">
                        {level.songs.map((song) => (
                          <div key={song.name} className="rounded-2xl bg-white/70 p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-lg font-bold text-slate-800">{song.name}</p>
                                <p className="mt-1 font-mono text-sm text-slate-500">{song.notes}</p>
                                <p className="mt-1 text-sm text-slate-600">{song.style}</p>
                              </div>
                              <a
                                href={song.sheet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-200 active:scale-95"
                              >
                                Noten 📄
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-bold text-slate-800">🎬 Videos für diese Stufe</h3>
                      <div className="space-y-3">
                        {level.videos.map((video) => (
                          <a
                            key={video.title}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-2xl bg-white/70 p-4 shadow-sm transition hover:bg-white hover:shadow-md active:scale-[0.98]"
                          >
                            <p className="font-bold text-slate-800">{video.title}</p>
                            <p className="mt-1 text-sm text-violet-600">{video.channel}</p>
                            <p className="mt-1 text-base text-slate-600">{video.desc}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.section>
            )
          })}
        </div>

        {/* ── Teachers ────────────────────────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎓 Geigenlehrer auf YouTube</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEACHERS.map((teacher) => (
              <a
                key={teacher.name}
                href={teacher.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-violet-50 border border-violet-100 p-5 shadow-sm transition hover:shadow-md hover:border-violet-200 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-violet-700">{teacher.name}</h3>
                  <span className="text-xs text-slate-500">{teacher.lang}</span>
                </div>
                <p className="mt-0.5 text-sm text-violet-500">{teacher.channel}</p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">{teacher.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {teacher.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-600">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* ── Inspiring Violinists ─────────────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-gradient-to-br from-rose-50/80 to-violet-50/80 p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🌟 Inspirierende Geiger*innen</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {INSPIRING_VIOLINISTS.map((v) => (
              <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 shadow-sm transition hover:bg-white hover:shadow-md active:scale-[0.98]">
                <span className="text-2xl">{v.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800">{v.name}</p>
                  <p className="text-sm text-slate-600">{v.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* ── Sheet Music Sources ──────────────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">📄 Wo gibt es Geigennoten?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {SHEET_MUSIC_SOURCES.map((source) => (
              <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100 active:scale-[0.98]">
                <span className="text-2xl">{source.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800">{source.name}</p>
                  <p className="text-sm text-slate-600">{source.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* ── Practice Tips ───────────────────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-gradient-to-br from-amber-50/80 to-violet-50/80 p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">💡 Übe-Tipps</h2>
          <div className="space-y-3">
            {PRACTICE_TIPS.map((tip) => (
              <div key={tip.tip} className="flex items-start gap-3 rounded-xl bg-white/70 p-4">
                <span className="text-xl">{tip.emoji}</span>
                <p className="text-base leading-relaxed text-slate-700">{tip.tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Uncle Frank's Music ─────────────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-gradient-to-br from-cyan-50/80 to-violet-50/80 p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">🎧 Orchestrale Musik von Onkel Frank</h2>
          <p className="mt-2 text-base text-slate-600">Arcanean Choir — orchestral, Geige und Chor, wie aus einem Märchenfilm</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="https://suno.com/playlist/898c6c67-1b25-495f-82ce-53d9139d9a25" target="_blank" rel="noopener noreferrer" className="rounded-full bg-violet-100 px-6 py-3 font-medium text-violet-700 transition hover:bg-violet-200 active:scale-95">
              Arcanean Choir 🎻
            </a>
            <a href="https://suno.com/playlist/0625352a-74c5-478a-933e-1204549efd36" target="_blank" rel="noopener noreferrer" className="rounded-full bg-rose-100 px-6 py-3 font-medium text-rose-700 transition hover:bg-rose-200 active:scale-95">
              Orchestral Beauty 🎶
            </a>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/alea/musik/klavier" className="rounded-full bg-rose-100 px-6 py-4 text-base font-bold text-rose-700 transition hover:bg-rose-200">
            🎹 Klavier lernen →
          </Link>
          <Link href="/alea/musik" className="rounded-full bg-slate-100 px-6 py-4 text-base font-medium text-slate-600 transition hover:bg-slate-200">
            ← Alle Instrumente
          </Link>
          <Link href="/alea" className="rounded-full bg-amber-100 px-6 py-4 text-base font-bold text-amber-700 transition hover:bg-amber-200">
            🎂 Aleas Welt
          </Link>
        </div>
      </div>
    </div>
  )
}
