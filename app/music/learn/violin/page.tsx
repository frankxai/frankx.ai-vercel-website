'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

const TEACHERS = [
  {
    name: 'Esther Abrami',
    channel: '@EstherAbrami',
    description:
      'Französische Geigenspielerin. Macht klassische Musik zugänglich und cool. Zeigt, wie das Leben als professionelle Musikerin aussieht. Wunderschönes Spiel.',
    tags: ['Klassik', 'Inspiration', 'Lifestyle'],
    color: 'violet',
    url: 'https://www.youtube.com/@EstherAbrami',
  },
  {
    name: 'Hilary Hahn',
    channel: '@hilaryhahn',
    description:
      'Eine der besten Geigerinnen der Welt. Grammy-Gewinnerin. Teilt Übungsroutinen, Konzerteinblicke und Tipps für junge Musiker.',
    tags: ['Weltklasse', 'Praxis', 'Tipps'],
    color: 'rose',
    url: 'https://www.youtube.com/@hilaryhahn',
  },
  {
    name: 'TwoSet Violin',
    channel: '@TwoSetViolin',
    description:
      'Zwei Geiger aus Australien. Lustig, lehrreich, inspirierend. Zeigen, dass Geige üben auch Spaß machen kann.',
    tags: ['Humor', 'Motivation', 'Community'],
    color: 'amber',
    url: 'https://www.youtube.com/@TwoSetViolin',
  },
  {
    name: 'Violin MD',
    channel: '@ViolinMD',
    description:
      'Klar strukturierte Lektionen für Anfänger. Von der Haltung bis zum ersten Stück — alles Schritt für Schritt erklärt.',
    tags: ['Anfänger', 'Technik', 'Lektionen'],
    color: 'emerald',
    url: 'https://www.youtube.com/@ViolinMD',
  },
]

const FIRST_PIECES = [
  { name: 'Twinkle Twinkle Little Star', difficulty: '⭐', style: 'Suzuki Methode #1', emoji: '⭐' },
  { name: 'Ode an die Freude', difficulty: '⭐', style: 'Offene Saiten + 1. Lage', emoji: '🎵' },
  { name: 'Lightly Row', difficulty: '⭐', style: 'Suzuki Methode #2', emoji: '🚣' },
  { name: 'Allegro (Suzuki)', difficulty: '⭐⭐', style: '1. Lage', emoji: '🏃' },
  { name: 'Gavotte (Gossec)', difficulty: '⭐⭐', style: 'Barock', emoji: '💃' },
  { name: 'Czardas', difficulty: '⭐⭐⭐', style: 'Ungarisch', emoji: '🔥' },
]

const PRACTICE_TIPS = [
  { tip: 'Halte den Bogen locker — wie ein kleines Vögelchen, das du halten willst, ohne es zu drücken.', emoji: '🐦' },
  { tip: 'Übe offene Saiten, bis dein Ton klar und gleichmäßig klingt. Das ist das Fundament.', emoji: '🏗️' },
  { tip: 'Höre dir Profis an. Dein Ohr lernt mit, auch wenn deine Finger noch üben.', emoji: '👂' },
  { tip: 'Stelle dich vor einen Spiegel. So siehst du deine Haltung und den Bogenwinkel.', emoji: '🪞' },
  { tip: 'Spiele Tonleitern mit dem Metronom. Langsam starten, dann schneller werden.', emoji: '⏱️' },
  { tip: 'Die Intonation kommt mit der Zeit. Geduld ist das wichtigste Instrument.', emoji: '🧘' },
]

const VIOLIN_FACTS = [
  'Die Violine hat nur 4 Saiten, aber einen Tonumfang von über 4 Oktaven.',
  'Eine Stradivarius-Geige von 1721 wurde für 15,9 Millionen Dollar verkauft.',
  'Der Bogen einer Geige besteht aus etwa 150-200 Pferdehaaren.',
  'Antonio Vivaldi war Geigenlehrer, bevor er „Die vier Jahreszeiten" komponierte.',
  'Die Geige ist über 500 Jahre alt — sie wurde im 16. Jahrhundert in Italien entwickelt.',
  'Niccolò Paganini konnte so schnell spielen, dass man glaubte, er hätte einen Pakt mit dem Teufel.',
]

const INSPIRING_VIOLINISTS = [
  { name: 'Karolina Protsenko', desc: 'Begann mit 6, spielt auf der Straße, Millionen Fans', emoji: '🌟' },
  { name: 'Lindsey Stirling', desc: 'Geige + Tanz + Elektronische Musik = pure Energie', emoji: '⚡' },
  { name: 'Itzhak Perlman', desc: 'Einer der größten Geiger aller Zeiten, inspirierend und warm', emoji: '❤️' },
  { name: 'Anne-Sophie Mutter', desc: 'Deutsche Weltklasse-Geigerin, Debüt mit 13 bei den Berliner Philharmonikern', emoji: '🇩🇪' },
]

const colorMap: Record<string, { bg: string; text: string; tag: string }> = {
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', tag: 'bg-rose-100 text-rose-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', tag: 'bg-amber-100 text-amber-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', tag: 'bg-violet-100 text-violet-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', tag: 'bg-emerald-100 text-emerald-600' },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ViolinLearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-rose-50/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-6xl">🎻</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Geige Lernen
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-500">
            Die Stimme des Orchesters. Kein Instrument kommt der menschlichen Stimme
            so nahe wie die Violine — und keines belohnt Geduld so sehr.
          </p>
        </motion.header>

        {/* Quick Start */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-r from-violet-100/80 to-purple-100/80 p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-violet-800">🚀 Sofort Starten</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-4 text-center">
              <p className="text-3xl">1️⃣</p>
              <p className="mt-2 font-bold text-slate-800">Haltung lernen</p>
              <p className="mt-1 text-sm text-slate-500">Kinn auf die Kinnstütze, Bogen locker halten. Das ist die Basis für alles.</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 text-center">
              <p className="text-3xl">2️⃣</p>
              <p className="mt-2 font-bold text-slate-800">Offene Saiten spielen</p>
              <p className="mt-1 text-sm text-slate-500">G, D, A, E — vier Saiten, vier Klänge. Übe gleichmäßige Bogenstriche.</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 text-center">
              <p className="text-3xl">3️⃣</p>
              <p className="mt-2 font-bold text-slate-800">Twinkle Twinkle</p>
              <p className="mt-1 text-sm text-slate-500">Die Suzuki-Methode beginnt hier. Millionen Kinder haben damit angefangen.</p>
            </div>
          </div>
        </motion.section>

        {/* The 4 Strings */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm"
        >
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
                <p className="mt-1 text-xs font-medium">{s.name}</p>
                <p className="mt-1 text-xs opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Teachers */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎓 Die besten Lehrer auf YouTube</h2>
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

        {/* Inspiring Violinists */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-rose-50/80 to-violet-50/80 p-8 shadow-sm"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🌟 Inspirierende Geiger*innen</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {INSPIRING_VIOLINISTS.map((v) => (
              <div key={v.name} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 shadow-sm">
                <span className="text-2xl">{v.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800">{v.name}</p>
                  <p className="text-xs text-slate-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* First Pieces */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-white/70 p-8 shadow-sm backdrop-blur-sm"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-800">🎶 Deine ersten Stücke</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {FIRST_PIECES.map((piece) => (
              <div key={piece.name} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <span className="text-2xl">{piece.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{piece.name}</p>
                  <p className="text-xs text-slate-400">{piece.style}</p>
                </div>
                <span className="text-sm">{piece.difficulty}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practice Tips */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-amber-50/80 to-violet-50/80 p-8 shadow-sm"
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
            {VIOLIN_FACTS.map((fact, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-violet-50 p-4">
                <span className="text-sm font-bold text-violet-400">{i + 1}</span>
                <p className="text-sm text-slate-700">{fact}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Listen to Uncle Frank's Orchestral */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-br from-cyan-50/80 to-violet-50/80 p-8 text-center shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-800">🎧 Orchestrale Musik von Onkel Frank</h2>
          <p className="mt-2 text-slate-500">Arcanean Choir — orchestral, fantasy, mit Geige und Chor</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="https://suno.com/playlist/898c6c67-1b25-495f-82ce-53d9139d9a25"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-violet-100 px-6 py-3 font-medium text-violet-700 transition hover:bg-violet-200 active:scale-95"
            >
              Arcanean Choir Playlist 🎻
            </a>
            <a
              href="https://suno.com/playlist/0625352a-74c5-478a-933e-1204549efd36"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-rose-100 px-6 py-3 font-medium text-rose-700 transition hover:bg-rose-200 active:scale-95"
            >
              Orchestral Beauty 🎶
            </a>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/piano"
            className="rounded-full bg-rose-100 px-6 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-200"
          >
            🎹 Klavier lernen →
          </Link>
          <Link
            href="/music/learn"
            className="rounded-full bg-slate-100 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
          >
            ← Alle Instrumente
          </Link>
          <Link
            href="/alea"
            className="rounded-full bg-amber-100 px-6 py-3 text-sm font-medium text-amber-600 transition hover:bg-amber-200"
          >
            ← Aleas Welt
          </Link>
        </div>
      </div>
    </div>
  )
}
