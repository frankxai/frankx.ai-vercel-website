'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

const TEACHERS = [
  {
    name: 'Nahre Sol',
    channel: '@nahresol',
    description:
      'Pianistin und Musiktheoretikerin. Erklärt wie große Komponisten denken — von Bach bis Jazz. Wunderschönes Spiel, kluge Analysen.',
    tags: ['Theorie', 'Klassik', 'Komposition'],
    color: 'rose',
    url: 'https://www.youtube.com/@nahresol',
  },
  {
    name: 'Pianote',
    channel: '@Pianote',
    description:
      'Die freundlichste Klavierschule im Internet. Schritt-für-Schritt-Lektionen von Anfänger bis Fortgeschrittene. Lisa Witt macht es leicht.',
    tags: ['Anfänger', 'Pop', 'Akkorde'],
    color: 'amber',
    url: 'https://www.youtube.com/@Pianote',
  },
  {
    name: 'Piano Superhuman',
    channel: '@PianoSuperhuman',
    description:
      'Lerne in Rekordzeit mit visuellen Anleitungen. Synthesia-Style Videos mit echten Spieltipps. Ideal zum Nachspielen.',
    tags: ['Visual', 'Songs', 'Nachspielen'],
    color: 'violet',
    url: 'https://www.youtube.com/@PianoSuperhuman',
  },
  {
    name: 'Rousseau',
    channel: '@Rousseau',
    description:
      'Millionen Views für einen Grund: die schönsten Klavierstücke der Welt, visuell dargestellt. Inspiration pur.',
    tags: ['Klassik', 'Visualisierung', 'Inspiration'],
    color: 'emerald',
    url: 'https://www.youtube.com/@Rousseau',
  },
]

const FIRST_SONGS = [
  { name: 'Alle meine Entchen', difficulty: '⭐', keys: 'Nur weiße Tasten', emoji: '🦆' },
  { name: 'Twinkle Twinkle Little Star', difficulty: '⭐', keys: 'C-Dur', emoji: '⭐' },
  { name: 'Happy Birthday', difficulty: '⭐⭐', keys: 'C-Dur', emoji: '🎂' },
  { name: 'Für Elise (Anfang)', difficulty: '⭐⭐', keys: 'A-Moll', emoji: '🎵' },
  { name: 'Ode an die Freude', difficulty: '⭐⭐', keys: 'C-Dur', emoji: '🎶' },
  { name: 'River Flows in You', difficulty: '⭐⭐⭐', keys: 'A-Dur', emoji: '🌊' },
]

const PRACTICE_TIPS = [
  { tip: 'Jeden Tag 10 Minuten ist besser als einmal pro Woche eine Stunde.', emoji: '⏰' },
  { tip: 'Spiele langsam und richtig, bevor du schnell spielst.', emoji: '🐢' },
  { tip: 'Lerne beide Hände getrennt, bevor du sie zusammenbringst.', emoji: '🙌' },
  { tip: 'Höre dir das Stück an, bevor du es spielst. Dein Ohr lernt mit.', emoji: '👂' },
  { tip: 'Fehler sind keine Fehler — sie sind Wegweiser.', emoji: '🗺️' },
  { tip: 'Setz dich gerade hin. Deine Handgelenke schweben über den Tasten.', emoji: '🪑' },
]

const PIANO_FACTS = [
  'Das Klavier wurde 1700 in Italien von Bartolomeo Cristofori erfunden.',
  'Der volle Name ist „Pianoforte" — leise und laut.',
  'Ein Konzertflügel hat über 12.000 Einzelteile.',
  'Die längste Klaviertaste-Anschlagfolge: 88 Tasten in 3,47 Sekunden.',
  'Mozart schrieb sein erstes Klavierstück mit 5 Jahren.',
]

const colorMap: Record<string, { bg: string; text: string; tag: string }> = {
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', tag: 'bg-rose-100 text-rose-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', tag: 'bg-amber-100 text-amber-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', tag: 'bg-violet-100 text-violet-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', tag: 'bg-emerald-100 text-emerald-600' },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PianoLearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-6xl">🎹</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Klavier Lernen
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-500">
            88 Tasten, unendliche Möglichkeiten. Vom ersten Ton bis zum ersten Song —
            hier findest du alles, was du brauchst.
          </p>
        </motion.header>

        <div className="mb-10 rounded-2xl border border-rose-200 bg-white/80 px-5 py-4 text-sm leading-6 text-slate-600" role="note">
          <strong className="text-slate-800">Hinweis für Familien:</strong> Diese Seite speichert keine Namen,
          E-Mail-Adressen oder Aufnahmen. Jüngere Lernende sollten externe Videos und Dienste nur gemeinsam mit
          einem Elternteil, einer Aufsichtsperson oder einer Lehrkraft öffnen.
        </div>

        {/* Quick Start */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-r from-rose-100/80 to-pink-100/80 p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-rose-800">🚀 Sofort Starten</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-4 text-center">
              <p className="text-3xl">1️⃣</p>
              <p className="mt-2 font-bold text-slate-800">Finde Mittel-C</p>
              <p className="mt-1 text-sm text-slate-500">Die weiße Taste links von den zwei schwarzen, genau in der Mitte.</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 text-center">
              <p className="text-3xl">2️⃣</p>
              <p className="mt-2 font-bold text-slate-800">Spiele C-D-E-F-G</p>
              <p className="mt-1 text-sm text-slate-500">Fünf Finger, fünf Tasten. Das ist deine erste Tonleiter!</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 text-center">
              <p className="text-3xl">3️⃣</p>
              <p className="mt-2 font-bold text-slate-800">Spiele dein erstes Lied</p>
              <p className="mt-1 text-sm text-slate-500">&quot;Alle meine Entchen&quot; — nur weiße Tasten: C D E F G G G</p>
            </div>
          </div>
        </motion.section>

        {/* Teachers */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎓 Ausgewählte Lehrer auf YouTube</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEACHERS.map((teacher) => {
              const c = colorMap[teacher.color]
              return (
                <a
                  key={teacher.name}
                  href={teacher.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-2xl ${c.bg} border border-transparent p-5 shadow-sm transition hover:shadow-md hover:border-white active:scale-[0.98]`}
                >
                  <h3 className={`text-lg font-bold ${c.text}`}>{teacher.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{teacher.channel}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{teacher.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {teacher.tags.map((tag) => (
                      <span key={tag} className={`rounded-full ${c.tag} px-2 py-0.5 text-xs font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>
        </motion.section>

        {/* First Songs */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎶 Deine ersten Lieder</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {FIRST_SONGS.map((song) => (
              <div
                key={song.name}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
              >
                <span className="text-2xl">{song.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{song.name}</p>
                  <p className="text-xs text-slate-400">{song.keys}</p>
                </div>
                <span className="text-sm">{song.difficulty}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practice Tips */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-amber-50/80 to-rose-50/80 p-8 shadow-sm"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">💡 Übe-Tipps</h2>
          <div className="space-y-3">
            {PRACTICE_TIPS.map((tip) => (
              <div key={tip.tip} className="flex items-start gap-3 rounded-xl bg-white/70 p-4">
                <span className="text-xl">{tip.emoji}</span>
                <p className="text-sm leading-relaxed text-slate-700">{tip.tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Fun Facts */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🤓 Wusstest du?</h2>
          <div className="space-y-3">
            {PIANO_FACTS.map((fact, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-violet-50 p-4">
                <span className="text-sm font-bold text-violet-400">{i + 1}</span>
                <p className="text-sm text-slate-700">{fact}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Listen to Uncle Frank's Piano */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-cyan-50/80 to-violet-50/80 p-8 text-center shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-800">🎧 Klavier von Onkel Frank</h2>
          <p className="mt-2 text-slate-500">Golden Frequencies — neoklassisches Klavier und ruhige Ambient-Stücke</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amber-100 px-6 py-3 font-medium text-amber-700 transition hover:bg-amber-200 active:scale-95"
            >
              Golden Frequencies Playlist 🎧
            </a>
            <a
              href="https://suno.com/playlist/3b265675-b95e-48ec-a2ed-140f6962c54d"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-violet-100 px-6 py-3 font-medium text-violet-700 transition hover:bg-violet-200 active:scale-95"
            >
              Instrumental Magic 🎹
            </a>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/violin"
            className="rounded-full bg-violet-100 px-6 py-3 text-sm font-medium text-violet-700 transition hover:bg-violet-200"
          >
            🎻 Geige lernen →
          </Link>
          <Link
            href="/music/learn"
            className="rounded-full bg-slate-100 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
          >
            ← Alle Instrumente
          </Link>
          <Link
            href="/alea"
            className="rounded-full bg-rose-100 px-6 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-200"
          >
            ← Aleas Welt
          </Link>
        </div>
      </div>
    </div>
  )
}
