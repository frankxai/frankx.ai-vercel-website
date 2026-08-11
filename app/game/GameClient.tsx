'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Flame,
  Gem,
  HeartHandshake,
  LockKeyhole,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sword,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'

type QuestKind = 'boss' | 'main' | 'side'
type GameId = 'boss' | 'launch' | 'focus' | 'learning' | 'body' | 'social'

type Quest = {
  id: string
  title: string
  note: string
  kind: QuestKind
  xp: number
  done: boolean
}

type PlayerState = {
  xp: number
  explorerTokens: number
  streak: number
  activeGame: GameId
  quests: Quest[]
  vault: string[]
}

const STORAGE_KEY = 'frankx-quest-os-v1'

const starterState: PlayerState = {
  xp: 720,
  explorerTokens: 2,
  streak: 4,
  activeGame: 'boss',
  quests: [
    {
      id: 'boss-1',
      title: 'Ship the boring thing that unlocks revenue',
      note: 'Choose one avoided task with a concrete external win condition. No side quests until it clears.',
      kind: 'boss',
      xp: 250,
      done: false,
    },
    {
      id: 'main-1',
      title: 'Close one nearly-finished loop',
      note: 'Publish, send, invoice, deploy, decide, or archive it. Completion beats expansion.',
      kind: 'main',
      xp: 140,
      done: false,
    },
    {
      id: 'side-1',
      title: 'Capture new ideas without switching context',
      note: 'Put every tempting direction into the Explorer Vault instead of changing campaigns.',
      kind: 'side',
      xp: 60,
      done: false,
    },
  ],
  vault: [],
}

const games = [
  {
    id: 'boss' as const,
    name: 'Boss Fight',
    icon: Sword,
    tagline: 'One avoided, high-consequence task. Kill it before novelty unlocks.',
    rule: 'One boss. One explicit win condition. Explorer Mode stays locked until completion.',
    reward: '+250 XP · +1 Explorer Token',
  },
  {
    id: 'launch' as const,
    name: 'Launch Raid',
    icon: Rocket,
    tagline: 'Convert a product into a sequence of externally verifiable gates.',
    rule: 'Landing → checkout → delivery → first buyer. The next gate matters more than polishing.',
    reward: '+500 XP per shipped raid',
  },
  {
    id: 'focus' as const,
    name: 'Deep Work Run',
    icon: Zap,
    tagline: 'A focused run with one artifact at the finish line.',
    rule: 'No inbox, no research branch, no tab that does not serve the current artifact.',
    reward: '+100 XP per clean run',
  },
  {
    id: 'learning' as const,
    name: 'Learning Forge',
    icon: BookOpen,
    tagline: 'Turn curiosity into demonstrated skill instead of passive consumption.',
    rule: 'Learn against a live build and finish with proof: an artifact, explanation, or implementation.',
    reward: '+120 XP per proof',
  },
  {
    id: 'body' as const,
    name: 'Body Streak',
    icon: Flame,
    tagline: 'Keep physical state as a multiplier rather than another giant project.',
    rule: 'Simple minimums. Protect continuity. Heroic sessions are optional.',
    reward: '+50 XP · streak multiplier',
  },
  {
    id: 'social' as const,
    name: 'Social Quest',
    icon: HeartHandshake,
    tagline: 'Use collaboration and social commitments as execution gravity.',
    rule: 'Create one meaningful outward action: invite, host, help, follow up, or collaborate.',
    reward: '+80 XP per meaningful action',
  },
]

function getLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 500) + 1)
}

export default function GameClient() {
  const [state, setState] = useState<PlayerState>(starterState)
  const [hydrated, setHydrated] = useState(false)
  const [tab, setTab] = useState<'today' | 'games' | 'vault'>('today')
  const [questDraft, setQuestDraft] = useState('')
  const [ideaDraft, setIdeaDraft] = useState('')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setState(JSON.parse(saved) as PlayerState)
    } catch {
      // Fall back to the starter state when browser persistence is unavailable.
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [hydrated, state])

  const level = getLevel(state.xp)
  const progress = state.xp % 500
  const completed = useMemo(() => state.quests.filter((quest) => quest.done).length, [state.quests])
  const bossOpen = state.quests.some((quest) => quest.kind === 'boss' && !quest.done)
  const activeGame = games.find((game) => game.id === state.activeGame) ?? games[0]
  const ActiveIcon = activeGame.icon

  function clearQuest(id: string) {
    setState((current) => {
      const quest = current.quests.find((item) => item.id === id)
      if (!quest || quest.done) return current
      return {
        ...current,
        xp: current.xp + quest.xp,
        explorerTokens: current.explorerTokens + (quest.kind === 'boss' ? 1 : 0),
        quests: current.quests.map((item) => (item.id === id ? { ...item, done: true } : item)),
      }
    })
  }

  function addQuest() {
    const title = questDraft.trim()
    if (!title) return
    setState((current) => ({
      ...current,
      quests: [
        ...current.quests,
        {
          id: `quest-${Date.now()}`,
          title,
          note: 'Define the external win condition before starting.',
          kind: 'main',
          xp: 100,
          done: false,
        },
      ],
    }))
    setQuestDraft('')
  }

  function vaultIdea() {
    const idea = ideaDraft.trim()
    if (!idea) return
    setState((current) => ({ ...current, vault: [idea, ...current.vault] }))
    setIdeaDraft('')
  }

  return (
    <main className="min-h-screen bg-[#07080b] text-white selection:bg-[#AB47C7]/40">
      <section className="relative overflow-hidden border-b border-white/[0.08] px-6 pb-10 pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(171,71,199,0.18),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(67,191,227,0.16),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                <Sparkles className="h-3.5 w-3.5 text-[#43BFE3]" /> Quest OS · Player One
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">Turn attention into finished reality.</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
                Quest is the universal action layer. Games change the constraint, reward, urgency, and social context around real work.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-2 backdrop-blur-xl">
              <Stat icon={Trophy} label="Level" value={String(level)} />
              <Stat icon={Gem} label="Explorer" value={String(state.explorerTokens)} />
              <Stat icon={Flame} label="Streak" value={`${state.streak}d`} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/35">Current campaign</div>
                  <div className="mt-2 text-2xl font-semibold">Level {level} · Execution Architect</div>
                </div>
                <div className="rounded-xl bg-[#43BFE3]/10 px-3 py-2 text-sm font-medium text-[#7ddcf6]">{state.xp} XP</div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3]" style={{ width: `${Math.max(3, (progress / 500) * 100)}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-white/35">
                <span>{progress}/500 to next level</span>
                <span>{completed} quests cleared</span>
              </div>
            </div>

            <div className={`rounded-3xl border p-5 md:p-6 ${bossOpen ? 'border-[#AB47C7]/35 bg-[#AB47C7]/[0.08]' : 'border-emerald-400/20 bg-emerald-400/[0.06]'}`}>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  {bossOpen ? <LockKeyhole className="h-5 w-5 text-[#d782ec]" /> : <ShieldCheck className="h-5 w-5 text-emerald-300" />}
                </div>
                <div>
                  <div className="text-sm font-semibold">Explorer Gate</div>
                  <div className="text-xs text-white/45">Novelty is earned by closure.</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                {bossOpen ? 'Explorer Mode stays locked while the Boss Fight is alive. Capture novelty in the Vault instead.' : 'Boss cleared. Spend an Explorer Token deliberately on research, invention, or a new experiment.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex gap-2">
          {(['today', 'games', 'vault'] as const).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${tab === item ? 'bg-white text-black' : 'border border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.06] hover:text-white'}`}>
              {item}
            </button>
          ))}
        </div>

        {tab === 'today' && (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div><div className="text-xs uppercase tracking-[0.18em] text-white/35">Today</div><h2 className="mt-1 text-2xl font-semibold">Quest Board</h2></div>
                <Target className="h-5 w-5 text-white/30" />
              </div>
              <div className="space-y-3">
                {state.quests.map((quest) => <QuestCard key={quest.id} quest={quest} onClear={clearQuest} />)}
              </div>
              <div className="mt-4 flex gap-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-2">
                <input
                  value={questDraft}
                  onChange={(event) => setQuestDraft(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && addQuest()}
                  placeholder="Add a concrete quest…"
                  className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2 text-sm placeholder:text-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#43BFE3]"
                />
                <button onClick={addQuest} className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"><Plus className="h-4 w-4" /> Add</button>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/35">Active ruleset</div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="rounded-xl bg-[#43BFE3]/10 p-2.5"><ActiveIcon className="h-5 w-5 text-[#7ddcf6]" /></div>
                  <div><div className="font-semibold">{activeGame.name}</div><div className="text-xs text-white/40">{activeGame.reward}</div></div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{activeGame.rule}</p>
                <button onClick={() => setTab('games')} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#7ddcf6] hover:text-white">Change game <ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
                <Brain className="h-5 w-5 text-[#d782ec]" />
                <h3 className="mt-4 font-semibold">Operating law</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">Do not suppress exploration. Route it. Closure creates permission for novelty; novelty feeds the next chosen quest.</p>
              </div>
            </aside>
          </div>
        )}

        {tab === 'games' && (
          <div>
            <div className="mb-6 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-white/35">Rulesets</div>
              <h2 className="mt-1 text-2xl font-semibold">Choose the game the work needs.</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/50">The objective stays real. Only the surrounding mechanics change: urgency, feedback, proof, social pressure, or streak protection.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {games.map((game) => {
                const Icon = game.icon
                const selected = state.activeGame === game.id
                return (
                  <button key={game.id} onClick={() => setState((current) => ({ ...current, activeGame: game.id }))} className={`rounded-3xl border p-5 text-left transition ${selected ? 'border-[#43BFE3]/40 bg-[#43BFE3]/[0.07]' : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-xl bg-white/[0.06] p-2.5"><Icon className="h-5 w-5 text-white/75" /></div>
                      {selected && <span className="inline-flex items-center gap-1 rounded-full bg-[#43BFE3]/10 px-2 py-1 text-[11px] font-medium text-[#7ddcf6]"><Check className="h-3 w-3" /> Active</span>}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{game.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{game.tagline}</p>
                    <div className="mt-5 border-t border-white/[0.07] pt-4 text-xs text-white/35">{game.reward}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'vault' && (
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-[#AB47C7]/25 bg-[#AB47C7]/[0.06] p-6">
              <Gem className="h-6 w-6 text-[#d782ec]" />
              <h2 className="mt-5 text-2xl font-semibold">Explorer Vault</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">Novelty goes here when it arrives at the wrong time. Capture it without letting it steal the active campaign.</p>
              <div className="mt-6 flex gap-2 rounded-2xl border border-white/10 bg-black/20 p-2">
                <input
                  value={ideaDraft}
                  onChange={(event) => setIdeaDraft(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && vaultIdea()}
                  placeholder="Capture the tempting idea…"
                  className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2 text-sm placeholder:text-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#43BFE3]"
                />
                <button onClick={vaultIdea} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90">Vault it</button>
              </div>
            </div>
            <div>
              <div className="mb-4"><div className="text-xs uppercase tracking-[0.18em] text-white/35">Stored possibilities</div><h3 className="mt-1 text-xl font-semibold">Ideas waiting for permission</h3></div>
              {state.vault.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-white/35">The vault is empty. Good. Keep shipping.</div>
              ) : (
                <div className="space-y-3">{state.vault.map((idea, index) => <div key={`${idea}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">{idea}</div>)}</div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

function Stat({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: string }) {
  return (
    <div className="min-w-[84px] rounded-xl px-3 py-2 text-center">
      <Icon className="mx-auto h-4 w-4 text-white/35" />
      <div className="mt-1.5 text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/30">{label}</div>
    </div>
  )
}

function QuestCard({ quest, onClear }: { quest: Quest; onClear: (id: string) => void }) {
  const Icon = quest.kind === 'boss' ? Sword : quest.kind === 'main' ? Target : Sparkles
  return (
    <div className={`rounded-2xl border p-4 transition md:p-5 ${quest.done ? 'border-emerald-400/15 bg-emerald-400/[0.035] opacity-65' : quest.kind === 'boss' ? 'border-[#AB47C7]/25 bg-[#AB47C7]/[0.045]' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-white/[0.05] p-2.5">{quest.done ? <Check className="h-5 w-5 text-emerald-300" /> : <Icon className="h-5 w-5 text-[#7ddcf6]" />}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div><div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">{quest.kind} quest</div><h3 className={`mt-1 font-semibold ${quest.done ? 'line-through text-white/40' : 'text-white'}`}>{quest.title}</h3></div>
            <div className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-white/45">+{quest.xp} XP</div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/45">{quest.note}</p>
          {!quest.done && <button onClick={() => onClear(quest.id)} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white hover:text-black"><Check className="h-3.5 w-3.5" /> Mark cleared</button>}
        </div>
      </div>
    </div>
  )
}
