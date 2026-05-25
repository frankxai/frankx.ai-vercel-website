'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ── Virtual Pet State ───────────────────────────────────────────────────────

type Mood = 'happy' | 'hungry' | 'sleepy' | 'playful' | 'purring'

const MOOD_DATA: Record<Mood, { emoji: string; label: string; color: string; message: string }> = {
  happy: { emoji: '😺', label: 'Glücklich', color: 'text-emerald-600', message: 'Mia ist glücklich! Sie schnurrt leise.' },
  hungry: { emoji: '😿', label: 'Hungrig', color: 'text-amber-600', message: 'Mia hat Hunger... Gib ihr etwas zu essen!' },
  sleepy: { emoji: '😸', label: 'Müde', color: 'text-violet-600', message: 'Mia gähnt... Sie möchte schlafen.' },
  playful: { emoji: '😻', label: 'Verspielt', color: 'text-rose-600', message: 'Mia will spielen! Sie jagt ihren Schwanz.' },
  purring: { emoji: '🥰', label: 'Schnurrend', color: 'text-pink-600', message: 'Mmmmrrrrr... Mia schnurrt ganz laut!' },
}

const FOOD_ITEMS = [
  { name: 'Fisch', emoji: '🐟', mood: 'happy' as Mood },
  { name: 'Milch', emoji: '🥛', mood: 'happy' as Mood },
  { name: 'Thunfisch', emoji: '🐠', mood: 'purring' as Mood },
  { name: 'Leckerli', emoji: '🍪', mood: 'playful' as Mood },
]

const PLAY_ITEMS = [
  { name: 'Wollknäuel', emoji: '🧶', mood: 'playful' as Mood },
  { name: 'Maus', emoji: '🐭', mood: 'happy' as Mood },
  { name: 'Feder', emoji: '🪶', mood: 'playful' as Mood },
  { name: 'Streicheln', emoji: '🤚', mood: 'purring' as Mood },
]

// ── Cat Facts ───────────────────────────────────────────────────────────────

const CAT_FACTS = [
  { de: 'Katzen schlafen 12–16 Stunden am Tag.', en: 'Cats sleep 12–16 hours a day.', emoji: '😴' },
  { de: 'Katzen können bis zu 50 km/h schnell laufen.', en: 'Cats can run up to 50 km/h.', emoji: '💨' },
  { de: 'Katzen schnurren mit einer Frequenz, die Knochen heilen kann.', en: 'Cats purr at a frequency that can heal bones.', emoji: '💖' },
  { de: 'Katzen haben über 20 verschiedene Miau-Töne.', en: 'Cats have over 20 different meow sounds.', emoji: '🗣️' },
  { de: 'Katzen können im Dunkeln 6x besser sehen als Menschen.', en: 'Cats can see 6x better in the dark than humans.', emoji: '👀' },
  { de: 'Katzen trinken, indem sie ihre Zunge wie einen Löffel biegen.', en: 'Cats drink by curling their tongue like a spoon.', emoji: '👅' },
  { de: 'Neugeborene Kätzchen können weder sehen noch hören.', en: 'Newborn kittens can neither see nor hear.', emoji: '🐱' },
  { de: 'Katzen haben 230 Knochen — mehr als Menschen (206).', en: 'Cats have 230 bones — more than humans (206).', emoji: '🦴' },
  { de: 'Die älteste Katze der Welt wurde 38 Jahre alt.', en: 'The oldest cat ever lived to be 38 years old.', emoji: '🎂' },
  { de: 'Katzen verbringen 30–50% des Tages mit Fellpflege.', en: 'Cats spend 30–50% of the day grooming.', emoji: '✨' },
]

const CAT_BREEDS = [
  { name: 'Britisch Kurzhaar', emoji: '🇬🇧', trait: 'Ruhig und verschmust', color: 'bg-blue-50 border-blue-200' },
  { name: 'Maine Coon', emoji: '🦁', trait: 'Riesig und sanft', color: 'bg-amber-50 border-amber-200' },
  { name: 'Perserkatze', emoji: '👑', trait: 'Elegant und flauschig', color: 'bg-rose-50 border-rose-200' },
  { name: 'Siamkatze', emoji: '💎', trait: 'Gesprächig und klug', color: 'bg-violet-50 border-violet-200' },
  { name: 'Ragdoll', emoji: '🧸', trait: 'Wie ein Stofftier', color: 'bg-pink-50 border-pink-200' },
  { name: 'Bengalkatze', emoji: '🐆', trait: 'Wild und abenteuerlich', color: 'bg-emerald-50 border-emerald-200' },
]

const CAT_STORIES = [
  {
    title: 'Mia und der Mondschmetterling',
    emoji: '🦋',
    text: 'Eines Nachts sah Mia einen Schmetterling, der im Mondlicht leuchtete. Sie schlich ganz leise durch den Garten, über nasses Gras und unter Rosenbüschen hindurch. Der Schmetterling landete auf ihrer Nase — und in diesem Moment konnte Mia die Träume aller schlafenden Kinder hören. Sie hörte ein Mädchen namens Alea, das von einer kleinen grauen Katze träumte. Mia lächelte. „Eines Tages", flüsterte sie.',
  },
  {
    title: 'Das Kätzchen, das Musik machte',
    emoji: '🎵',
    text: 'In einer kleinen Stadt lebte ein Kätzchen, das jede Nacht auf das Klavier im Wohnzimmer sprang. Es lief über die Tasten — plink, plonk, pling! Die Nachbarn dachten, ein Geist spiele Klavier. Aber es war nur ein kleines Kätzchen, das seine eigene Melodie erfand. Und weißt du was? Die Melodie war so schön, dass alle Hunde in der Straße aufhörten zu bellen und zuhörten.',
  },
  {
    title: 'The Kitten Who Caught a Star',
    emoji: '⭐',
    text: 'High up on a rooftop, a tiny kitten named Luna watched the stars every night. One evening, a star fell right into her paws! It was warm and glowing. "What do I do with you?" she asked. The star whispered: "Make a wish." Luna closed her eyes and wished for something wonderful — a friend. The next morning, she found another kitten on the rooftop, looking at the sky. They became best friends forever.',
  },
]

// ── Cat Name Generator ──────────────────────────────────────────────────────

const CAT_NAME_PARTS_1 = ['Luna', 'Mia', 'Nala', 'Bella', 'Suki', 'Mochi', 'Kira', 'Yuki', 'Nuri', 'Lila', 'Mimi', 'Cleo', 'Zara', 'Finja', 'Nola']
const CAT_NAME_PARTS_2 = ['Sternchen', 'Pfötchen', 'Schnurr', 'Flöckchen', 'Samtpfote', 'Mondschein', 'Silberstreif', 'Glückskätzchen', 'Traumfänger', 'Blütenstaub']

function CatNameGenerator() {
  const [name, setName] = useState('')
  const generate = () => {
    const first = CAT_NAME_PARTS_1[Math.floor(Math.random() * CAT_NAME_PARTS_1.length)]
    const useSurname = Math.random() > 0.4
    const surname = useSurname ? ' ' + CAT_NAME_PARTS_2[Math.floor(Math.random() * CAT_NAME_PARTS_2.length)] : ''
    setName(first + surname)
  }
  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        {name && (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 rounded-2xl bg-white/80 p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">Dein Katzenname:</p>
            <p className="mt-1 text-3xl font-black text-violet-600">{name}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={generate}
        className="rounded-full bg-violet-100 px-8 py-4 text-lg font-bold text-violet-700 shadow-sm transition hover:bg-violet-200 active:scale-95"
      >
        {name ? 'Neuer Name! 🐱' : 'Katzennamen erfinden! 🐱'}
      </button>
    </div>
  )
}

// ── Virtual Pet Component ───────────────────────────────────────────────────

function VirtualPet() {
  const [mood, setMood] = useState<Mood>('happy')
  const [hearts, setHearts] = useState(0)
  const [showAction, setShowAction] = useState('')

  const doAction = useCallback((action: string, newMood: Mood) => {
    setShowAction(action)
    setMood(newMood)
    setHearts((h) => h + 1)
    setTimeout(() => setShowAction(''), 1500)
  }, [])

  // Mia gets hungry after 30 seconds of no interaction
  useEffect(() => {
    const timer = setTimeout(() => setMood('hungry'), 30000)
    return () => clearTimeout(timer)
  }, [hearts])

  const moodInfo = MOOD_DATA[mood]

  return (
    <div className="mx-auto max-w-sm text-center">
      {/* Mia Image */}
      <div className="relative mx-auto mb-4 h-64 w-64">
        <Image
          src="/images/alea/katze-mia-mascot_thumb.jpeg"
          alt="Mia das Kätzchen"
          width={256}
          height={256}
          className="rounded-3xl shadow-lg"
          priority
        />
        <AnimatePresence>
          {showAction && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -40, scale: 1.5 }}
              exit={{ opacity: 0, y: -80 }}
              className="absolute left-1/2 top-0 -translate-x-1/2 text-4xl"
            >
              {showAction}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mood Display */}
      <div className="mb-4">
        <p className="text-2xl">{moodInfo.emoji}</p>
        <p className={`text-lg font-bold ${moodInfo.color}`}>{moodInfo.label}</p>
        <p className="text-base text-slate-600">{moodInfo.message}</p>
        <p className="mt-1 text-sm text-rose-400">💖 × {hearts}</p>
      </div>

      {/* Feed Actions */}
      <div className="mb-3">
        <p className="mb-2 text-sm font-medium text-slate-500">Füttern:</p>
        <div className="flex justify-center gap-2">
          {FOOD_ITEMS.map((food) => (
            <button
              key={food.name}
              onClick={() => doAction(food.emoji, food.mood)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl shadow-sm transition hover:bg-amber-100 active:scale-90"
              aria-label={`${food.name} geben`}
            >
              {food.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Play Actions */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-500">Spielen:</p>
        <div className="flex justify-center gap-2">
          {PLAY_ITEMS.map((play) => (
            <button
              key={play.name}
              onClick={() => doAction(play.emoji, play.mood)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl shadow-sm transition hover:bg-rose-100 active:scale-90"
              aria-label={`Mit ${play.name} spielen`}
            >
              {play.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Cat Fact Carousel ───────────────────────────────────────────────────────

function CatFactCarousel() {
  const [index, setIndex] = useState(0)
  const fact = CAT_FACTS[index]
  const next = () => setIndex((i) => (i + 1) % CAT_FACTS.length)

  return (
    <div className="mx-auto max-w-md text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="rounded-2xl bg-white/80 p-6 shadow-sm"
        >
          <p className="text-4xl">{fact.emoji}</p>
          <p lang="de" className="mt-3 text-lg font-bold text-slate-800">{fact.de}</p>
          <p lang="en" className="mt-2 text-base text-slate-500">{fact.en}</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={next}
        className="mt-4 rounded-full bg-amber-100 px-6 py-3 text-base font-bold text-amber-700 transition hover:bg-amber-200 active:scale-95"
      >
        Nächster Fakt! 🐾
      </button>
      <p className="mt-2 text-sm text-slate-500">{index + 1} / {CAT_FACTS.length}</p>
    </div>
  )
}

// ── Section Wrapper ─────────────────────────────────────────────────────────

function Section({ id, emoji, title, bg, children }: { id: string; emoji: string; title: string; bg?: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl p-6 sm:p-10 ${bg || 'bg-white/70'} shadow-lg backdrop-blur-sm`}
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-800 sm:text-3xl">
        <span className="mr-2">{emoji}</span>{title}
      </h2>
      {children}
    </motion.section>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function KatzePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-amber-50/50 to-violet-50/30">
      <div className="relative z-10 mx-auto max-w-3xl space-y-8 px-4 py-12 sm:py-20">
        {/* Back nav */}
        <div>
          <Link href="/alea" className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-3 text-sm font-bold text-rose-700 shadow-sm transition hover:bg-rose-200 active:scale-95">
            <span>🎂</span> Aleas Welt
          </Link>
        </div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Image
            src="/images/alea/katze-spielend_thumb.jpeg"
            alt="Verspieltes Kätzchen"
            width={600}
            height={400}
            className="mx-auto rounded-3xl shadow-xl"
            priority
          />
          <h1 className="mt-6 bg-gradient-to-r from-rose-600 via-amber-500 to-violet-600 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl">
            Mias Katzenwelt
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Dein eigenes virtuelles Kätzchen — füttere es, spiele mit ihm, lerne alles über Katzen!
          </p>
        </motion.header>

        {/* ── Virtual Pet ─────────────────────────────────────────── */}
        <Section id="pet" emoji="🐱" title="Dein Kätzchen Mia" bg="bg-gradient-to-br from-rose-50/80 to-amber-50/80">
          <p className="mb-6 text-center text-base text-slate-600">
            Mia ist dein virtuelles Kätzchen! Füttere sie, spiele mit ihr, und mach sie glücklich.
          </p>
          <VirtualPet />
        </Section>

        {/* ── Cat Facts ───────────────────────────────────────────── */}
        <Section id="facts" emoji="🧠" title="Katzenwissen" bg="bg-gradient-to-br from-amber-50/80 to-white/80">
          <p className="mb-6 text-center text-base text-slate-600">
            Wusstest du das? Tippe für den nächsten Fakt!
          </p>
          <CatFactCarousel />
        </Section>

        {/* ── Cat Name Generator ──────────────────────────────────── */}
        <Section id="names" emoji="✨" title="Katzennamen-Generator" bg="bg-gradient-to-br from-violet-50/80 to-pink-50/80">
          <p className="mb-6 text-center text-base text-slate-600">
            Welchen Namen würdest du deiner Katze geben?
          </p>
          <CatNameGenerator />
        </Section>

        {/* ── Cat Breeds ──────────────────────────────────────────── */}
        <Section id="breeds" emoji="🐈" title="Katzenrassen" bg="bg-gradient-to-br from-cyan-50/80 to-emerald-50/80">
          <p className="mb-6 text-center text-base text-slate-600">
            Es gibt über 70 verschiedene Katzenrassen! Hier sind einige besondere:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CAT_BREEDS.map((breed) => (
              <div key={breed.name} className={`rounded-2xl border ${breed.color} p-4 shadow-sm`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{breed.emoji}</span>
                  <div>
                    <p className="text-lg font-bold text-slate-800">{breed.name}</p>
                    <p className="text-base text-slate-600">{breed.trait}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Cat Stories ──────────────────────────────────────────── */}
        <Section id="stories" emoji="📖" title="Katzengeschichten" bg="bg-gradient-to-br from-amber-50/80 to-rose-50/80">
          <div className="space-y-6">
            {CAT_STORIES.map((story) => (
              <div key={story.title} className="rounded-2xl bg-white/70 p-6 shadow-sm">
                <h3 className="mb-3 flex items-center justify-center gap-2 text-lg font-bold text-amber-700">
                  <span className="text-2xl">{story.emoji}</span>
                  {story.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-700">{story.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Sleeping Mia (goodnight image) ──────────────────────── */}
        <Section id="goodnight" emoji="🌙" title="Gute Nacht, Mia" bg="bg-gradient-to-br from-indigo-50/80 to-violet-50/80">
          <Image
            src="/images/alea/katze-schlafend_thumb.jpeg"
            alt="Mia schläft auf einer Wolke"
            width={600}
            height={400}
            className="mx-auto rounded-3xl shadow-lg"
          />
          <p className="mt-4 text-center font-serif text-lg italic text-slate-600">
            Schlaf gut, kleine Mia. Träum von Sternen und Schmetterlingen.
          </p>
          <p className="mt-2 text-center font-serif text-lg italic text-slate-600">
            Und du auch, liebe Alea. 💖
          </p>
        </Section>

        {/* ── What More We Could Build ─────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-violet-100/60 to-rose-100/60 p-6 text-center shadow-lg backdrop-blur-sm sm:p-10"
        >
          <h2 className="text-2xl font-bold text-violet-800">🌱 Bald in Mias Welt</h2>
          <p className="mt-4 text-base text-slate-600">Jedes Jahr kommt etwas Neues dazu!</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { emoji: '🎮', title: 'Katzen-Abenteuer Spiel', desc: 'Ein kleines Spiel, in dem Mia Abenteuer erlebt' },
              { emoji: '📸', title: 'Katzenfoto-Galerie', desc: 'Die süßesten Katzenfotos der Welt' },
              { emoji: '🎨', title: 'Katzen-Malbuch', desc: 'Katzenbilder zum Ausmalen auf dem iPad' },
              { emoji: '📚', title: 'Katzenbücher', desc: 'Die besten Bücher über Katzen für Kinder' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/60 p-4 text-left">
                <span className="text-2xl">{item.emoji}</span>
                <p className="mt-1 font-bold text-slate-800">{item.title}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <Link href="/alea" className="text-sm text-violet-500 hover:text-violet-700">
            ← Zurück zu Aleas Welt
          </Link>
          <p className="mt-2 text-xs text-slate-400">frankx.ai/alea/katze</p>
        </footer>
      </div>
    </div>
  )
}
