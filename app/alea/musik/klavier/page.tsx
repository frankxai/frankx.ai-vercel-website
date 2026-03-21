'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

// ── Structured Curriculum Data ──────────────────────────────────────────────

const LEVELS = [
  {
    id: 'stufe1',
    level: 'Stufe 1',
    title: 'Die ersten Töne',
    emoji: '🌱',
    color: 'emerald',
    ageNote: 'Ab 5 Jahren · Erste 4 Wochen',
    skills: [
      'Die Tasten kennenlernen (weiß & schwarz)',
      'Mittel-C finden — die wichtigste Taste',
      'Richtige Sitzhaltung am Klavier',
      'Fünf Finger: C-D-E-F-G mit der rechten Hand',
      'Erste einfache Melodien nur mit weißen Tasten',
    ],
    songs: [
      { name: 'Alle meine Entchen', keys: 'C D E F G G | A A A A | G —', notes: 'Nur weiße Tasten, nur rechte Hand', sheet: 'https://www.spielend-klavier-lernen.de/wp-content/uploads/Alle-meine-Entchen.pdf' },
      { name: 'Hänschen klein', keys: 'G E E — | F D D —', notes: '5 Töne, gleichmäßiger Rhythmus', sheet: 'https://musescore.com/user/30120025/scores/5402556' },
      { name: 'Twinkle Twinkle Little Star', keys: 'C C G G | A A G —', notes: 'Wie "Morgen kommt der Weihnachtsmann"', sheet: 'https://musescore.com/user/27638568/scores/5685498' },
    ],
    videos: [
      { title: 'Deine 1. Klavierstunde — Thomas Forschbach', channel: 'werdemusiker', url: 'https://www.youtube.com/@werdemusiker', desc: 'Der perfekte Einstieg: wo ist Mittel-C, wie sitze ich richtig, erste Töne' },
      { title: 'Anfängerkurs Teil 1 — Fanny Engelhart', channel: 'Fanny Engelhart', url: 'https://www.youtube.com/@FannyEngelhart', desc: 'Kostenloser 3-teiliger Anfängerkurs, sehr geduldig und motivierend' },
    ],
  },
  {
    id: 'stufe2',
    level: 'Stufe 2',
    title: 'Beide Hände',
    emoji: '🌿',
    color: 'cyan',
    ageNote: 'Monat 2–3 · Wenn Stufe 1 sicher sitzt',
    skills: [
      'Linke Hand dazu — einfache Bassnoten',
      'Noten lesen: Violinschlüssel (rechte Hand)',
      'Taktarten verstehen: 3/4 und 4/4',
      'Dynamik: leise (piano) und laut (forte)',
      'Erste Akkorde: C-Dur, G-Dur, F-Dur',
    ],
    songs: [
      { name: 'Bruder Jakob', keys: 'C D E C | C D E C', notes: 'Beide Hände im Wechsel', sheet: 'https://musescore.com/user/3510556/scores/1110486' },
      { name: 'Happy Birthday', keys: 'G G A G | C B —', notes: 'Perfekt für Geburtstage!', sheet: 'https://musescore.com/user/2803921/scores/847121' },
      { name: 'Ode an die Freude', keys: 'E E F G | G F E D', notes: 'Von Beethoven — aber einfach!', sheet: 'https://musescore.com/user/169696/scores/163396' },
    ],
    videos: [
      { title: 'Noten lesen lernen — OKTAV', channel: 'OKTAV', url: 'https://www.youtube.com/@OKTAVapp', desc: 'Carmen Manera erklärt Notenlesen klar und pädagogisch fundiert' },
      { title: 'Akkorde für Anfänger — Zapiano', channel: 'Zapiano', url: 'https://www.youtube.com/@Zapiano', desc: 'Sven Haefliger: 300+ Videos, die "3-Minuten Piano Practice" Reihe ist perfekt' },
    ],
  },
  {
    id: 'stufe3',
    level: 'Stufe 3',
    title: 'Erste richtige Stücke',
    emoji: '🌳',
    color: 'violet',
    ageNote: 'Ab Monat 4 · Wenn beide Hände klappen',
    skills: [
      'Pedal benutzen (Haltepedal)',
      'Tonleitern: C-Dur, G-Dur, D-Dur',
      'Bassschlüssel lesen (linke Hand)',
      'Ausdrucksvoll spielen: Tempo und Gefühl',
      'Eigene Lieblingsstücke aussuchen und üben',
    ],
    songs: [
      { name: 'Für Elise (Anfang)', keys: 'E D# E D# E | B D C A', notes: 'Der berühmteste Klavieranfang der Welt', sheet: 'https://musescore.com/user/19710/scores/33816' },
      { name: 'Comptine d\'un autre été (Amélie)', keys: 'E-Moll Arpeggio', notes: 'Wunderschöner Filmklassiker', sheet: 'https://musescore.com/user/107279/scores/116268' },
      { name: 'River Flows in You (Yiruma)', keys: 'A-Dur', notes: 'Eines der beliebtesten Klavierstücke', sheet: 'https://musescore.com/user/85429/scores/108957' },
    ],
    videos: [
      { title: 'Für Elise — Tutorial', channel: 'werdemusiker', url: 'https://www.youtube.com/@werdemusiker', desc: 'Schritt-für-Schritt Erklärung mit Fingertechnik' },
      { title: 'Klaviermusik zum Entspannen', channel: 'Zapiano', url: 'https://www.youtube.com/@Zapiano', desc: 'Lerne einfache aber schöne Stücke spielen' },
    ],
  },
]

const TEACHERS = [
  {
    name: 'Thomas Forschbach',
    channel: '@werdemusiker',
    lang: '🇩🇪 Deutsch',
    subscribers: '350.000+',
    description: 'Deutschlands bekanntester Klavier-YouTuber. Über 1.500 Live-Auftritte, erklärt präzise mit Kameraführung von oben auf die Tasten. Song-Tutorials + Musiktheorie.',
    tags: ['Anfänger', 'Song-Tutorials', 'Theorie'],
    url: 'https://www.youtube.com/@werdemusiker',
    best: 'Deine 1. Klavierstunde',
  },
  {
    name: 'Fanny Engelhart',
    channel: '@FannyEngelhart',
    lang: '🇩🇪 Deutsch',
    subscribers: '100.000+',
    description: 'Sehr geduldig und motivierend — wie eine nette Lehrerin. 14 Jahre Musikschule, seit 2008 online. Kostenloser 3-teiliger Anfängerkurs. Perfekt für Kinder!',
    tags: ['Kinder', 'Anfänger', 'Geduldig'],
    url: 'https://www.youtube.com/@FannyEngelhart',
    best: 'Anfängerkurs Teil 1',
  },
  {
    name: 'Zapiano (Sven Haefliger)',
    channel: '@Zapiano',
    lang: '🇩🇪 Deutsch',
    subscribers: '200.000+',
    description: '300+ Videos. Die "3-Minuten Piano Practice" Reihe ist genial — kurze Übungen für zwischendurch. Pop, Jazz, Klassik alles dabei.',
    tags: ['Kurze Übungen', 'Pop & Jazz', 'Fortgeschrittene'],
    url: 'https://www.youtube.com/@Zapiano',
    best: '3-Minuten Piano Practice',
  },
  {
    name: 'OKTAV (Carmen Manera)',
    channel: '@OKTAVapp',
    lang: '🇩🇪 Deutsch',
    subscribers: '50.000+',
    description: 'Pädagogisch fundiert. Basics wie Noten lesen, Haltung am Klavier. Tipps für Anfänger und Fortgeschrittene. Sehr klar strukturiert.',
    tags: ['Noten lesen', 'Basics', 'Pädagogisch'],
    url: 'https://www.youtube.com/@OKTAVapp',
    best: 'Noten lesen lernen',
  },
]

const SHEET_MUSIC_SOURCES = [
  { name: 'MuseScore', url: 'https://musescore.com/', desc: 'Größte kostenlose Notensammlung der Welt. Suche nach Lied → PDF drucken.', emoji: '🎵' },
  { name: 'Klavierkranich', url: 'https://klavierkrani.ch/klaviernoten-fuer-anfaenger-kinder-pdf/', desc: 'Kostenlose Anfänger-Noten als PDF, speziell für Kinder zusammengestellt.', emoji: '📄' },
  { name: 'MoupMoup', url: 'https://www.moupmoup.de/kinderlieder-noten/', desc: 'Deutsche Kinderlieder-Noten zum Ausdrucken. Alle Klassiker.', emoji: '🎶' },
  { name: 'IMSLP', url: 'https://imslp.org/', desc: 'Alle klassischen Stücke kostenlos (Beethoven, Mozart, Bach...).', emoji: '📚' },
]

const PRACTICE_TIPS = [
  { tip: 'Jeden Tag 10 Minuten ist besser als einmal pro Woche eine Stunde.', emoji: '⏰' },
  { tip: 'Spiele langsam und richtig, bevor du schnell spielst.', emoji: '🐢' },
  { tip: 'Lerne beide Hände getrennt, bevor du sie zusammenbringst.', emoji: '🙌' },
  { tip: 'Höre dir das Stück an, bevor du es spielst. Dein Ohr lernt mit.', emoji: '👂' },
  { tip: 'Fehler sind Wegweiser — sie zeigen dir, was du als Nächstes üben kannst.', emoji: '🗺️' },
  { tip: 'Setz dich gerade hin. Deine Handgelenke schweben über den Tasten.', emoji: '🪑' },
]

// ── Color helpers ───────────────────────────────────────────────────────────

const levelColors: Record<string, { bg: string; border: string; text: string; badge: string; light: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', light: 'bg-emerald-50/80' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700', light: 'bg-cyan-50/80' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700', light: 'bg-violet-50/80' },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PianoLearnPage() {
  const [openLevel, setOpenLevel] = useState('stufe1')

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Back nav */}
        <div className="mb-6">
          <Link href="/alea" className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-3 text-sm font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 active:scale-95">
            <span>🎂</span> Aleas Welt
          </Link>
        </div>

        {/* Hero */}
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <p className="text-6xl">🎹</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Klavier Lernen</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-600">
            88 Tasten, unendliche Möglichkeiten. Schritt für Schritt — von den ersten Tönen bis zu echten Stücken.
          </p>
          <p className="mt-2 text-base text-slate-500">
            Alle Lehrer sprechen Deutsch 🇩🇪 · Alle Noten sind kostenlos 📄
          </p>
        </motion.header>

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
                {/* Level Header — always visible */}
                <button
                  onClick={() => setOpenLevel(isOpen ? '' : level.id)}
                  className={`flex w-full items-center gap-4 p-6 text-left transition hover:bg-white/40`}
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

                {/* Level Content — expandable */}
                {isOpen && (
                  <div className="space-y-6 px-6 pb-6">
                    {/* Skills */}
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

                    {/* Songs with sheet music links */}
                    <div>
                      <h3 className="mb-3 text-lg font-bold text-slate-800">🎶 Lieder zum Üben</h3>
                      <div className="space-y-3">
                        {level.songs.map((song) => (
                          <div key={song.name} className="rounded-2xl bg-white/70 p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-lg font-bold text-slate-800">{song.name}</p>
                                <p className="mt-1 font-mono text-sm text-slate-500">{song.keys}</p>
                                <p className="mt-1 text-sm text-slate-600">{song.notes}</p>
                              </div>
                              <a
                                href={song.sheet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-200 active:scale-95"
                              >
                                Noten 📄
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Videos */}
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
                            <p className="mt-1 text-sm text-rose-600">{video.channel}</p>
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

        {/* ── German Teachers ─────────────────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎓 Deutsche Klavierlehrer auf YouTube</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEACHERS.map((teacher) => (
              <a
                key={teacher.name}
                href={teacher.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-rose-50 border border-rose-100 p-5 shadow-sm transition hover:shadow-md hover:border-rose-200 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-rose-700">{teacher.name}</h3>
                  <span className="text-xs text-slate-500">{teacher.lang}</span>
                </div>
                <p className="mt-0.5 text-sm text-rose-500">{teacher.channel} · {teacher.subscribers} Abonnenten</p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">{teacher.description}</p>
                <p className="mt-2 text-sm font-medium text-rose-600">Bestes Video: &quot;{teacher.best}&quot;</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {teacher.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* ── Where to Find Sheet Music ───────────────────────────── */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">📄 Wo gibt es Noten?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SHEET_MUSIC_SOURCES.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100 active:scale-[0.98]"
              >
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
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 rounded-3xl bg-gradient-to-br from-amber-50/80 to-rose-50/80 p-8 shadow-sm">
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
          <h2 className="text-2xl font-bold text-slate-800">🎧 Klavier von Onkel Frank</h2>
          <p className="mt-2 text-base text-slate-600">Neoclassical Piano und Healing Sounds — zum Träumen und Inspirieren</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052" target="_blank" rel="noopener noreferrer" className="rounded-full bg-amber-100 px-6 py-3 font-medium text-amber-700 transition hover:bg-amber-200 active:scale-95">
              Golden Frequencies 🎧
            </a>
            <a href="https://suno.com/playlist/3b265675-b95e-48ec-a2ed-140f6962c54d" target="_blank" rel="noopener noreferrer" className="rounded-full bg-violet-100 px-6 py-3 font-medium text-violet-700 transition hover:bg-violet-200 active:scale-95">
              Instrumental Magic 🎹
            </a>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/alea/musik/geige" className="rounded-full bg-violet-100 px-6 py-4 text-base font-bold text-violet-700 transition hover:bg-violet-200">
            🎻 Geige lernen →
          </Link>
          <Link href="/alea/musik" className="rounded-full bg-slate-100 px-6 py-4 text-base font-medium text-slate-600 transition hover:bg-slate-200">
            ← Alle Instrumente
          </Link>
          <Link href="/alea" className="rounded-full bg-rose-100 px-6 py-4 text-base font-bold text-rose-600 transition hover:bg-rose-200">
            🎂 Aleas Welt
          </Link>
        </div>
      </div>
    </div>
  )
}
