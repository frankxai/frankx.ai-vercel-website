'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const INSTRUMENTS = [
  {
    slug: 'piano',
    name: 'Klavier / Piano',
    emoji: '🎹',
    gradient: 'from-rose-100 to-pink-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    description: 'Das vielseitigste Instrument — Melodie und Harmonie in deinen Händen.',
    funFact: 'Ein Klavier hat 88 Tasten, 52 weiße und 36 schwarze.',
    difficulty: 'Einfach zu starten',
    ageRange: 'Ab 4 Jahren',
  },
  {
    slug: 'violin',
    name: 'Geige / Violin',
    emoji: '🎻',
    gradient: 'from-violet-100 to-purple-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    description: 'Die Stimme des Orchesters — voller Emotion und Ausdruck.',
    funFact: 'Eine Geige besteht aus über 70 einzelnen Teilen aus Holz.',
    difficulty: 'Braucht Geduld',
    ageRange: 'Ab 5 Jahren',
  },
  {
    slug: null,
    name: 'Gitarre / Guitar',
    emoji: '🎸',
    gradient: 'from-amber-100 to-orange-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    description: 'Drei Akkorde und die Wahrheit — das Lagerfeuer-Instrument.',
    funFact: 'Die älteste bekannte Gitarre ist über 3.500 Jahre alt.',
    difficulty: 'Einfach zu starten',
    ageRange: 'Ab 6 Jahren',
  },
  {
    slug: null,
    name: 'Singen / Voice',
    emoji: '🎤',
    gradient: 'from-emerald-100 to-teal-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    description: 'Das erste Instrument der Menschheit — deine eigene Stimme.',
    funFact: 'Deine Stimmbänder schwingen bis zu 1.000 Mal pro Sekunde beim Singen.',
    difficulty: 'Jeder kann anfangen',
    ageRange: 'Ab 3 Jahren',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function LearnMusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50/30 to-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎵</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Musik Lernen
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Die besten Lehrer, die besten Übungen, die besten Instrumente —
            alles an einem Ort. Für Anfänger jeden Alters.
          </p>
        </motion.header>

        {/* Instrument Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2"
        >
          {INSTRUMENTS.map((inst) => {
            const Card = (
              <motion.div
                key={inst.name}
                variants={fadeUp}
                className={`group rounded-3xl border ${inst.border} bg-gradient-to-br ${inst.gradient} p-6 shadow-sm transition-all duration-300 ${inst.slug ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : 'opacity-60 grayscale-[30%]'}`}
              >
                <div className="text-center">
                  <span className="text-5xl">{inst.emoji}</span>
                  <h2 className={`mt-3 text-2xl font-bold ${inst.text}`}>{inst.name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{inst.description}</p>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm">
                    <span>💡</span>
                    <span className="text-slate-600">{inst.funFact}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span className="rounded-full bg-white/80 px-3 py-1">{inst.difficulty}</span>
                    <span className="rounded-full bg-white/80 px-3 py-1">{inst.ageRange}</span>
                  </div>
                </div>

                {inst.slug ? (
                  <div className={`mt-4 text-center text-sm font-medium ${inst.text}`}>
                    Kurs starten →
                  </div>
                ) : (
                  <div className="mt-4 text-center text-xs text-slate-400">
                    Bald verfügbar
                  </div>
                )}
              </motion.div>
            )

            return inst.slug ? (
              <Link key={inst.name} href={`/alea/musik/${inst.slug}`}>
                {Card}
              </Link>
            ) : (
              <div key={inst.name}>{Card}</div>
            )
          })}
        </motion.div>

        {/* Why Music Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-slate-800">🧠 Warum Musik lernen?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { emoji: '🎯', title: 'Konzentration', desc: 'Musik trainiert Fokus und Ausdauer — besser als jede App.' },
              { emoji: '💪', title: 'Selbstvertrauen', desc: 'Ein Lied spielen zu können, das fühlt sich wie eine Superkraft an.' },
              { emoji: '🌍', title: 'Sprache', desc: 'Musik ist die einzige Sprache, die alle Menschen verstehen.' },
              { emoji: '🧮', title: 'Mathematik', desc: 'Rhythmus ist Mathematik zum Anfassen — Brüche, Muster, Strukturen.' },
              { emoji: '❤️', title: 'Gefühle', desc: 'Musik hilft dir, Gefühle auszudrücken, die Worte nicht fassen können.' },
              { emoji: '🤝', title: 'Gemeinschaft', desc: 'Zusammen Musik machen verbindet — im Chor, in der Band, im Orchester.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-2xl">{item.emoji}</p>
                <p className="mt-1 font-bold text-slate-800">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Link to Alea */}
        <div className="mt-12 text-center">
          <Link
            href="/alea"
            className="inline-block rounded-full bg-violet-100 px-6 py-3 text-sm font-medium text-violet-700 transition hover:bg-violet-200"
          >
            ← Zurück zu Aleas Welt
          </Link>
        </div>
      </div>
    </div>
  )
}
