import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Heart, TreePine, MapPin, History } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stammbaum — Riemer-Gorte',
  description:
    'Der Stammbaum der Familie Riemer-Gorte. Von Christian Riemer in Karaganda über vier Generationen bis nach Amsterdam.',
  robots: { index: false, follow: false },
}

interface FamilyMember {
  name: string
  bornName?: string
  role: string
  location?: string
  color: string
  borderColor: string
  textColor: string
  details?: string[]
  historyLink?: string
}

const urgroßeltern: FamilyMember[] = [
  {
    name: 'Christian Riemer',
    role: 'Urgroßvater',
    location: 'Karaganda, Kasachstan',
    color: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    details: ['Geb. 1914', 'Wolgadeutscher', 'Trudarmee-Überlebender'],
    historyLink: '/familie/geschichte/wolgadeutsche',
  },
]

const gorteGroßeltern: FamilyMember[] = [
  {
    name: 'David Gorte',
    role: 'Opa',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    details: ['Großvater mütterlicherseits'],
  },
  {
    name: 'Dorothea Gorte',
    bornName: 'geb. Prager',
    role: 'Oma',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    details: ['Großmutter mütterlicherseits'],
  },
]

const riemerGroßeltern: FamilyMember[] = [
  {
    name: 'Alexander Riemer',
    role: 'Opa',
    color: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    details: ['Großvater väterlicherseits', 'Sohn von Christian Riemer'],
  },
  {
    name: 'Paulina Riemer',
    role: 'Oma',
    color: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    details: ['Großmutter väterlicherseits'],
  },
]

const eltern: FamilyMember[] = [
  {
    name: 'Dora Riemer',
    bornName: 'geb. Gorte',
    role: 'Mama',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    details: ['Tochter von David & Dorothea'],
  },
  {
    name: 'Witali Riemer',
    role: 'Papa',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    details: ['Sohn von Alexander & Paulina'],
  },
]

const ich: FamilyMember = {
  name: 'Frank Riemer',
  role: 'Das bin ich',
  location: 'Amsterdam',
  color: 'bg-violet-500/10',
  borderColor: 'border-violet-500/40',
  textColor: 'text-violet-400',
  details: ['AI Architect', 'Musik-Produzent', 'Erbauer dieses Hubs'],
}

const partnerin: FamilyMember = {
  name: 'Tien',
  role: 'Partnerin',
  location: 'Amsterdam',
  color: 'bg-rose-500/10',
  borderColor: 'border-rose-500/30',
  textColor: 'text-rose-400',
}

function PersonCard({
  person,
  size = 'md',
}: {
  person: FamilyMember
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  return (
    <div
      className={`rounded-xl border ${person.borderColor} ${person.color} ${sizeClasses[size]} transition-all duration-200 hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className={`font-semibold text-white ${size === 'lg' ? 'text-lg' : 'text-base'}`}
          >
            {person.name}
          </h3>
          {person.bornName && (
            <p className="mt-0.5 text-xs text-white/30">{person.bornName}</p>
          )}
        </div>
        <span
          className={`text-xs font-medium ${person.textColor} rounded-full bg-white/5 px-2 py-0.5`}
        >
          {person.role}
        </span>
      </div>

      {person.location && (
        <div className="mt-2 flex items-center gap-1 text-xs text-white/30">
          <MapPin className="h-3 w-3" />
          {person.location}
        </div>
      )}

      {person.details && (
        <div className="mt-3 space-y-1">
          {person.details.map((detail) => (
            <p key={detail} className="text-xs text-white/40">
              {detail}
            </p>
          ))}
        </div>
      )}

      {person.historyLink && (
        <Link
          href={person.historyLink}
          className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400/60 transition-colors hover:text-amber-400"
        >
          <History className="h-3 w-3" />
          Geschichte erfahren
        </Link>
      )}
    </div>
  )
}

function ConnectionLine({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-3">
      <div className="h-8 w-px bg-white/10" />
      <span className="my-1 text-[10px] uppercase tracking-widest text-white/20">
        {label}
      </span>
      <div className="h-8 w-px bg-white/10" />
    </div>
  )
}

function GroßelternPaar({
  members,
  label,
}: {
  members: FamilyMember[]
  label: string
}) {
  return (
    <div className="mb-2">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/20">
        {label}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {members.map((gp) => (
          <PersonCard key={gp.name} person={gp} />
        ))}
      </div>
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-1 text-xs text-rose-400/40">
          <Heart className="h-3 w-3" />
          <span>verheiratet</span>
        </div>
      </div>
    </div>
  )
}

export default function StammbaumPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/15 via-transparent to-transparent" />
          <div className="absolute left-1/3 top-20 h-[300px] w-[300px] rounded-full bg-emerald-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-28">
          <Link
            href="/familie"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Familie Hub
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <TreePine className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stammbaum
            </h1>
          </div>

          <p className="max-w-xl text-white/50">
            Die Gorte- und Riemer-Familienlinien. Von Christian Riemer in
            Karaganda über vier Generationen bis nach Amsterdam.
          </p>
        </div>
      </section>

      {/* Stammbaum-Visualisierung */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        {/* Generation -1: Urgroßeltern */}
        <div className="mx-auto max-w-md">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/20">
            Urgroßeltern &middot; Riemer-Linie
          </p>
          <PersonCard person={urgroßeltern[0]} />
        </div>

        <ConnectionLine label="Vater von" />

        {/* Generation 0: Beide Großelternpaare */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <GroßelternPaar
            members={gorteGroßeltern}
            label="Großeltern &middot; Gorte-Linie (mütterlicherseits)"
          />
          <GroßelternPaar
            members={riemerGroßeltern}
            label="Großeltern &middot; Riemer-Linie (väterlicherseits)"
          />
        </div>

        {/* Verbindungslinien */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-amber-500/20" />
              <span className="text-[9px] text-amber-400/40">Gorte</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/15">
              Eltern von
            </span>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-cyan-500/20" />
              <span className="text-[9px] text-cyan-400/40">Riemer</span>
            </div>
          </div>
        </div>

        {/* Generation 1: Eltern */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/20">
              Eltern &middot; Familie Riemer
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {eltern.map((parent) => (
                <PersonCard key={parent.name} person={parent} />
              ))}
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-1 text-xs text-rose-400/40">
                <Heart className="h-3 w-3" />
                <span>verheiratet</span>
              </div>
            </div>
          </div>

          <ConnectionLine label="Eltern von" />

          {/* Generation 2: Frank + Tien */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/20">
              Aktuelle Generation
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <PersonCard person={ich} size="lg" />
              <div className="flex flex-col">
                <PersonCard person={partnerin} />
                <div className="mt-3 flex items-center gap-1 text-xs text-rose-400/40 sm:ml-4">
                  <Heart className="h-3 w-3" />
                  <span>Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legende */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h3 className="mb-4 text-sm font-medium text-white/60">
            Familienlinien
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-cyan-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">Riemer-Linie</p>
                <p className="text-xs text-white/30">
                  Christian → Alexander & Paulina (väterlicherseits)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">Gorte-Linie</p>
                <p className="text-xs text-white/30">
                  David & Dorothea (mütterlicherseits)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">Brücke</p>
                <p className="text-xs text-white/30">
                  Dora & Witali, beide Linien vereint
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-violet-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">
                  Aktuelle Generation
                </p>
                <p className="text-xs text-white/30">
                  Frank & Tien in Amsterdam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hinweis */}
        <p className="mt-8 text-center text-xs italic text-white/20">
          Dieser Stammbaum wächst, wenn weitere Familienmitglieder und
          Verbindungen dokumentiert werden.
          <br />
          Möchtest du jemanden hinzufügen? Sag Frank Bescheid.
        </p>
      </section>
    </main>
  )
}
