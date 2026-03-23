import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Heart, TreePine, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Tree',
  description:
    'The Riemer-Gorte family tree. Tracing the connections between the Gorte and Riemer family lines.',
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
}

const gorteGrandparents: FamilyMember[] = [
  {
    name: 'David Gorte',
    role: 'Opa',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    details: ['Maternal grandfather'],
  },
  {
    name: 'Dorothea Gorte',
    bornName: 'geb. Prager',
    role: 'Oma',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    details: ['Maternal grandmother'],
  },
]

const riemerGrandparents: FamilyMember[] = [
  {
    name: 'Alexander Riemer',
    role: 'Opa',
    color: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    details: ['Paternal grandfather'],
  },
  {
    name: 'Paulina Riemer',
    role: 'Oma',
    color: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    details: ['Paternal grandmother'],
  },
]

const parents: FamilyMember[] = [
  {
    name: 'Dora Riemer',
    bornName: 'geb. Gorte',
    role: 'Mama',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    details: ['Daughter of David & Dorothea'],
  },
  {
    name: 'Witali Riemer',
    role: 'Papa',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    details: ['Son of Alexander & Paulina'],
  },
]

const self: FamilyMember = {
  name: 'Frank Riemer',
  role: "That's me",
  location: 'Amsterdam',
  color: 'bg-violet-500/10',
  borderColor: 'border-violet-500/40',
  textColor: 'text-violet-400',
  details: ['AI Architect', 'Music Creator', 'Builder of this hub'],
}

const partner: FamilyMember = {
  name: 'Tien',
  role: 'Partner',
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

function GrandparentPair({
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
          <span>married</span>
        </div>
      </div>
    </div>
  )
}

export default function FamilyTreePage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/15 via-transparent to-transparent" />
          <div className="absolute left-1/3 top-20 h-[300px] w-[300px] rounded-full bg-emerald-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-28">
          <Link
            href="/family"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Family Hub
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <TreePine className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Family Tree
            </h1>
          </div>

          <p className="max-w-xl text-white/50">
            The Gorte and Riemer family lines. Four grandparents, two parents,
            one builder in Amsterdam.
          </p>
        </div>
      </section>

      {/* Tree visualization */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        {/* Generation 1: Both Grandparent Pairs */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <GrandparentPair
            members={gorteGrandparents}
            label="Grandparents &middot; Gorte Line (Maternal)"
          />
          <GrandparentPair
            members={riemerGrandparents}
            label="Grandparents &middot; Riemer Line (Paternal)"
          />
        </div>

        {/* Connection lines converging */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-amber-500/20" />
              <span className="text-[9px] text-amber-400/40">Gorte</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/15">
              parents of
            </span>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-cyan-500/20" />
              <span className="text-[9px] text-cyan-400/40">Riemer</span>
            </div>
          </div>
        </div>

        {/* Generation 2: Parents */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/20">
              Parents &middot; Riemer Family
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {parents.map((parent) => (
                <PersonCard key={parent.name} person={parent} />
              ))}
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-1 text-xs text-rose-400/40">
                <Heart className="h-3 w-3" />
                <span>married</span>
              </div>
            </div>
          </div>

          <ConnectionLine label="parents of" />

          {/* Generation 3: Frank + Tien */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/20">
              Current Generation
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <PersonCard person={self} size="lg" />
              <div className="flex flex-col">
                <PersonCard person={partner} />
                <div className="mt-3 flex items-center gap-1 text-xs text-rose-400/40 sm:ml-4">
                  <Heart className="h-3 w-3" />
                  <span>partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="mb-4 text-sm font-medium text-white/60">
            Family Lines
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">Gorte Line</p>
                <p className="text-xs text-white/30">
                  David & Dorothea (maternal)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-cyan-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">Riemer Line</p>
                <p className="text-xs text-white/30">
                  Alexander & Paulina (paternal)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">Bridge</p>
                <p className="text-xs text-white/30">
                  Dora & Witali, joining both lines
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-violet-500/50" />
              <div>
                <p className="text-sm font-medium text-white/70">
                  Current Generation
                </p>
                <p className="text-xs text-white/30">
                  Frank & Tien in Amsterdam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-xs italic text-white/20">
          This tree will grow as more family members and connections are
          documented.
          <br />
          Want to add someone? Let Frank know.
        </p>
      </section>
    </main>
  )
}
