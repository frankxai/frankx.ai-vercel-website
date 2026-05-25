import type { Metadata } from 'next'
import Link from 'next/link'
import {
  TreePine,
  Heart,
  BookOpen,
  MessageCircle,
  Users,
  ArrowRight,
  Sparkles,
  Home,
  History,
  GraduationCap,
  HandHeart,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Familie Hub — Riemer-Gorte',
  description: 'Ein lebendiger digitaler Raum für die Familie Riemer-Gorte. Generationen verbinden durch Geschichten, Erinnerungen und gemeinsame Inspiration.',
  robots: { index: false, follow: false },
}

const familieLinks = [
  {
    title: 'Stammbaum',
    description: 'Die Gorte- und Riemer-Familienlinien erkunden. Von Freudental (1729) über die Wolga und Karaganda bis Amsterdam.',
    href: '/familie/stammbaum',
    icon: TreePine,
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Unsere Geschichte',
    description: 'Wolgadeutsche, Trudarmee, Karaganda — die Geschichte unserer Vorfahren. Quellbasiert und transparent.',
    href: '/familie/geschichte',
    icon: History,
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Opa & Oma',
    description: 'Ein besonderer Platz für alle Großeltern. Inspiration, Zitate, und eine Einladung eure Geschichten zu teilen.',
    href: '/opa-und-oma',
    icon: Heart,
    color: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'border-rose-500/20 hover:border-rose-500/40',
    iconColor: 'text-rose-400',
  },
  {
    title: 'Interview-Kit',
    description: 'Fragenkataloge für die Gespräche mit Opa David, Oma Dorothea, Opa Alexander und Oma Paulina. Ausdruckbar.',
    href: '/familie/interview-kit',
    icon: MessageCircle,
    color: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'border-rose-500/20 hover:border-rose-500/40',
    iconColor: 'text-rose-400',
    badge: 'Zeitkritisch',
  },
  {
    title: 'Mitmachen',
    description: 'Teile Erinnerungen, Fotos, Korrekturen oder Forschungsfragen. Diese Geschichte gehört uns allen.',
    href: '/familie/mitmachen',
    icon: HandHeart,
    color: 'from-violet-500/20 to-violet-600/5',
    borderColor: 'border-violet-500/20 hover:border-violet-500/40',
    iconColor: 'text-violet-400',
  },
  {
    title: 'Selbst forschen',
    description: 'Wie man Vorfahren findet, ohne zu erfinden. Die Methode hinter unserer Familienforschung — mit KI und Archiven.',
    href: '/familie/forsche-selbst',
    icon: GraduationCap,
    color: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
    iconColor: 'text-cyan-400',
  },
]

export default function FamilieHubPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-[300px] w-[300px] rounded-full bg-amber-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-32 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60">
            <Home className="h-3.5 w-3.5" />
            <span>Riemer &middot; Gorte</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Familie Hub
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60">
            Ein lebendiger digitaler Raum für die Familie Riemer-Gorte. Generationen
            verbinden durch Geschichten, Erinnerungen und gemeinsame Inspiration.
            Gebaut mit Liebe von Frank.
          </p>
        </div>
      </section>

      {/* Familie Links */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {familieLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex flex-col rounded-2xl border ${link.borderColor} bg-gradient-to-br ${link.color} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
            >
              {link.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/70">
                  {link.badge}
                </span>
              )}

              <link.icon className={`mb-4 h-8 w-8 ${link.iconColor}`} />

              <h2 className="mb-2 text-xl font-semibold text-white">
                {link.title}
              </h2>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50">
                {link.description}
              </p>

              <div className="flex items-center gap-1 text-sm font-medium text-white/40 transition-colors group-hover:text-white/70">
                Entdecken
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Werte */}
      <section className="border-t border-white/[0.08] bg-white/[0.03]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">Warum es das gibt</h2>
            <p className="text-white/50">
              Dieser Hub ist kein soziales Netzwerk. Er ist ein Familienarchiv.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Verbindung</h3>
              <p className="text-sm text-white/40">
                Die Entfernung zwischen Amsterdam und Deutschland überbrücken. Nah bleiben, auch wenn wir getrennt sind.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <BookOpen className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Bewahrung</h3>
              <p className="text-sm text-white/40">
                Geschichten, Weisheiten und Erinnerungen festhalten, bevor sie verblassen. Ein Geschenk für zukünftige Generationen.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <Sparkles className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Inspiration</h3>
              <p className="text-sm text-white/40">
                Teilen was wir lernen. Einander ermutigen zu erkunden, zu erschaffen und zu wachsen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aktueller Forschungsstand */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-slate-500/15 bg-gradient-to-br from-slate-900/40 via-transparent to-transparent p-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400/70">
            Aktueller Forschungsstand
          </p>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Ein Kandidat aus 1729 — und 116 Jahre Lücke
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-white/50">
            Ein KI-Forschungsteam hat Johann Konrad Reimer gefunden — getauft 1729 in
            Freudental, Gründungssiedler der Kolonie Reinwald (1766). Ob er unser
            direkter Vorfahre ist, ist nicht bewiesen. Zwischen ihm und unserem
            gesicherten Urgroßvater Christian Riemer (1914, Karaganda) liegen 116 Jahre
            ohne dokumentierte Kette. Ein plausibler Kandidat, keine Tatsache.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/familie/geschichte/riemer-linie"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              Die Riemer-Linie ansehen
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/familie/geschichte/offene-fragen"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              Alle offenen Fragen
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA: Mitmachen */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
          <MessageCircle className="mx-auto mb-4 h-10 w-10 text-white/20" />
          <h2 className="mb-2 text-xl font-semibold text-white">Diese Geschichte gehört uns allen</h2>
          <p className="mb-6 text-white/40">
            Jede Erinnerung, jedes Foto, jede Korrektur macht unsere
            Familiengeschichte vollständiger. Du musst kein Experte sein.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/familie/mitmachen"
              className="inline-flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-5 py-2.5 text-sm font-medium text-rose-200 transition-all hover:bg-rose-500/20"
            >
              <Heart className="h-4 w-4" />
              Mitmachen
            </Link>
            <Link
              href="/opa-und-oma"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/10"
            >
              Opa & Oma Seite
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center">
          <p className="text-xs text-white/20">
            Mit Liebe gebaut von Frank in Amsterdam &middot; Für die Familie Riemer-Gorte
          </p>
        </div>
      </section>
    </main>
  )
}
