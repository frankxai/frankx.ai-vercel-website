import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Heart,
  BookOpen,
  MessageCircle,
  Sparkles,
  Lightbulb,
  Star,
  ArrowRight,
  Mail,
  PenLine,
  Quote,
  Laptop,
  TreePine,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fur Opa & Oma',
  description:
    'Ein besonderer Platz fur unsere Grosseltern. Inspiration, Bucher-Empfehlungen und eine Einladung eure Geschichten zu teilen.',
  robots: { index: false, follow: false },
}

const bookQuotes = [
  {
    quote:
      'Wer den Hafen nicht kennt, in den er segeln will, fur den ist kein Wind der richtige.',
    author: 'Seneca',
    book: 'Briefe an Lucilius',
  },
  {
    quote:
      'Das Gluck deines Lebens hangt von der Beschaffenheit deiner Gedanken ab.',
    author: 'Marc Aurel',
    book: 'Selbstbetrachtungen',
  },
  {
    quote:
      'Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.',
    author: 'Seneca',
    book: 'Briefe an Lucilius',
  },
  {
    quote: 'In der Mitte von Schwierigkeiten liegen die Moglichkeiten.',
    author: 'Albert Einstein',
    book: '',
  },
  {
    quote:
      'Die einzige Art, grossartige Arbeit zu leisten, ist zu lieben, was man tut.',
    author: 'Steve Jobs',
    book: '',
  },
  {
    quote: 'Das Leben ist zu kurz, um klein zu denken.',
    author: 'Tim Ferriss',
    book: 'Die 4-Stunden-Woche',
  },
]

const aiPrompts = [
  {
    title: 'Eure Lebensgeschichte',
    prompt:
      'Hilf mir, die Geschichte meines Lebens aufzuschreiben. Fang mit meiner Kindheit an und stelle mir Fragen, die mir helfen, mich zu erinnern. Frag nach besonderen Momenten, Freundschaften und Erfahrungen.',
    icon: PenLine,
    description: 'Lasst euch von der KI durch eure Erinnerungen fuhren',
  },
  {
    title: 'Familienrezepte',
    prompt:
      'Ich mochte unsere Familienrezepte dokumentieren. Hilf mir, sie Schritt fur Schritt aufzuschreiben. Frag nach Zutaten, besonderen Tricks und der Geschichte hinter jedem Rezept.',
    icon: Heart,
    description: 'Bewahrt die Rezepte der Familie auf',
  },
  {
    title: 'Weisheiten weitergeben',
    prompt:
      'Hilf mir, die wichtigsten Lektionen aufzuschreiben, die ich im Leben gelernt habe. Stell mir Fragen uber Herausforderungen, Entscheidungen und was ich anders machen wurde. Das mochte ich fur meine Enkel festhalten.',
    icon: Lightbulb,
    description: 'Teilt eure Lebensweisheiten mit den nachsten Generationen',
  },
  {
    title: 'Fragen an die KI',
    prompt:
      'Ich bin neugierig auf kunstliche Intelligenz. Erklare mir einfach und auf Deutsch: Was ist KI? Was kann sie? Wie nutzt mein Enkel Frank sie bei seiner Arbeit? Sei geduldig und verwende keine Fachbegriffe.',
    icon: Laptop,
    description: 'Lernt mehr uber Franks Welt der KI',
  },
]

const storyIdeas = [
  'Wie habt ihr euch kennengelernt?',
  'Was war euer liebster Urlaub?',
  'Welche Kindheitserinnerung ist am lebendigsten?',
  'Was hat euch das Leben uber Freundschaft gelehrt?',
  'Welches Rezept kommt von euren Eltern?',
  'Was wurdet ihr eurem jungeren Ich raten?',
  'Was macht euch heute noch am glucklichsten?',
  'Welche Tradition sollte die Familie bewahren?',
]

function QuoteCard({
  quote,
  author,
  book,
}: {
  quote: string
  author: string
  book: string
}) {
  return (
    <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-5 transition-all hover:border-amber-500/20">
      <Quote className="mb-3 h-5 w-5 text-amber-400/40" />
      <p className="mb-3 text-sm leading-relaxed italic text-white/70">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="text-xs text-white/40">
        <span className="font-medium text-amber-400/70">{author}</span>
        {book && <span> &middot; {book}</span>}
      </div>
    </div>
  )
}

function PromptCard({
  title,
  prompt,
  icon: Icon,
  description,
}: {
  title: string
  prompt: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}) {
  return (
    <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5 transition-all hover:border-emerald-500/20">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-emerald-400" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="mb-3 text-xs text-white/40">{description}</p>
      <div className="rounded-lg border border-white/5 bg-black/30 p-3">
        <p className="font-mono text-xs leading-relaxed text-white/50">
          {prompt}
        </p>
      </div>
      <p className="mt-2 text-[10px] text-white/20">
        Kopiert diesen Text und fugt ihn bei ChatGPT oder Claude ein
      </p>
    </div>
  )
}

export default function OpaUndOmaPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-transparent" />
          <div className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute right-1/3 top-40 h-[300px] w-[300px] rounded-full bg-emerald-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-32 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300/80">
            <Heart className="h-3.5 w-3.5" />
            <span>Fur alle Opas & Omas</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Willkommen, liebe Grosseltern
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60">
            Diese Seite ist fur euch &mdash; fur Opa David & Oma Dorothea, und
            fur Opa Alexander & Oma Paulina. Hier findet ihr Inspiration, schone
            Zitate, und eine Einladung eure Geschichten mit mir zu teilen.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/family/tree"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <TreePine className="h-4 w-4" />
              Stammbaum ansehen
            </Link>
            <a
              href="#geschichten"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/20 px-5 py-2.5 text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/30"
            >
              <PenLine className="h-4 w-4" />
              Geschichten teilen
            </a>
          </div>
        </div>
      </section>

      {/* Grandparent Cards */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Gorte Side */}
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-6">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-amber-400/50">
              Familie Gorte &middot; Mamas Seite
            </p>
            <h3 className="text-lg font-semibold text-white">
              David & Dorothea Gorte
            </h3>
            <p className="mt-1 text-xs text-white/30">geb. Prager</p>
            <p className="mt-3 text-sm text-white/50">
              Franks Grosseltern mutterlicherseits. Eltern von Dora.
            </p>
          </div>

          {/* Riemer Side */}
          <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-6">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-cyan-400/50">
              Familie Riemer &middot; Papas Seite
            </p>
            <h3 className="text-lg font-semibold text-white">
              Alexander & Paulina Riemer
            </h3>
            <p className="mt-3 text-sm text-white/50">
              Franks Grosseltern vaterlicherseits. Eltern von Witali.
            </p>
          </div>
        </div>
      </section>

      {/* What Frank Does - Simple Explanation */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-violet-400" />
            <h2 className="text-xl font-semibold text-white">Was Frank macht</h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-white/50">
            <p>
              Euer Enkel Frank arbeitet als{' '}
              <strong className="text-white/70">KI-Architekt</strong> bei Oracle
              in Amsterdam. Das bedeutet, er hilft grossen Firmen dabei, kluge
              Computer-Systeme zu bauen, die selbststandig Aufgaben erledigen
              konnen.
            </p>
            <p>
              In seiner Freizeit macht er{' '}
              <strong className="text-white/70">Musik mit KI</strong> &mdash; er
              hat schon uber 500 Lieder erstellt! Ausserdem baut er diese
              Webseite und digitale Werkzeuge fur kreative Menschen.
            </p>
            <p>
              Diese Seite hier hat er speziell fur euch gebaut, weil eure
              Geschichten und Erfahrungen fur die ganze Familie wertvoll sind.
            </p>
          </div>
        </div>
      </section>

      {/* Book Quotes */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Schone Zitate</h2>
          </div>
          <p className="text-white/40">
            Worte die zum Nachdenken anregen. Jede Woche neue Inspiration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookQuotes.map((q) => (
            <QuoteCard key={q.quote.slice(0, 30)} {...q} />
          ))}
        </div>
      </section>

      {/* AI Prompts for Grandparents */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <Laptop className="h-5 w-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">KI ausprobieren</h2>
            </div>
            <p className="text-white/40">
              Hier sind Texte, die ihr bei ChatGPT oder Claude einfugen konnt.
              Die KI wird euch dann Fragen stellen und helfen, eure Gedanken
              aufzuschreiben.
            </p>
            <p className="mt-2 text-xs text-white/30">
              Tipp: Geht zu{' '}
              <strong className="text-white/50">chatgpt.com</strong> oder{' '}
              <strong className="text-white/50">claude.ai</strong> und kopiert
              einen der Texte unten.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {aiPrompts.map((p) => (
              <PromptCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Sharing Section */}
      <section id="geschichten" className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
            <MessageCircle className="h-7 w-7 text-amber-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Eure Geschichten sind wichtig
          </h2>
          <p className="text-white/40">
            Jede Erinnerung, jedes Rezept, jeder Ratschlag ist ein Geschenk fur
            die Familie. Hier sind ein paar Ideen, woruber ihr erzahlen konntet:
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {storyIdeas.map((idea, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10"
            >
              <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400/50" />
              <p className="text-sm text-white/60">{idea}</p>
            </div>
          ))}
        </div>

        {/* How to share */}
        <div className="mt-10 rounded-2xl border border-amber-500/15 bg-amber-500/5 p-8 text-center">
          <h3 className="mb-3 text-lg font-semibold text-white">
            So konnt ihr eure Geschichten teilen
          </h3>
          <div className="mx-auto max-w-lg space-y-3 text-sm text-white/50">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                1
              </span>
              <p>
                Schreibt eure Geschichte auf &mdash; oder sprecht sie ins Handy
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                2
              </span>
              <p>Schickt sie per WhatsApp, E-Mail oder Brief an Frank</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                3
              </span>
              <p>
                Frank sammelt alles und bewahrt es hier fur die ganze Familie auf
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:frank@frankx.ai?subject=Geschichte%20von%20Opa%20%26%20Oma"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/20 px-5 py-2.5 text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/30"
            >
              <Mail className="h-4 w-4" />
              E-Mail an Frank
            </a>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-sm text-white/30">
            Mit Liebe gebaut von eurem Enkel Frank in Amsterdam.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              href="/family"
              className="text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Family Hub
            </Link>
            <span className="text-white/10">&middot;</span>
            <Link
              href="/family/tree"
              className="text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Stammbaum
            </Link>
            <span className="text-white/10">&middot;</span>
            <Link
              href="/"
              className="text-xs text-white/20 transition-colors hover:text-white/40"
            >
              frankx.ai
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
