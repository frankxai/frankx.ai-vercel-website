import teamData from '@/data/ai-architect/team.json'

export type TeamAgent = {
  id: string
  name: string
  purpose: string
  writes: string[]
  stops_when: string[]
  model: string
}

/**
 * The roster is generated from the plugin's own agent definitions, so this file
 * renders it and never restates it. Nothing here is editorial: the purpose, the
 * write scope, the stop conditions and the model tier are the agent's, verbatim.
 *
 * Order is the plugin's handoff chain rather than the file's alphabetical order,
 * so the column reads in the sequence a run actually executes.
 */
export const TEAM_AGENTS = teamData.agents as TeamAgent[]

export function orderedAgents(order: readonly string[]): TeamAgent[] {
  return order
    .map((id) => TEAM_AGENTS.find((agent) => agent.id === id))
    .filter((agent): agent is TeamAgent => Boolean(agent))
}

/** The source paragraphs are joined with a double space where a break was. */
const tidy = (text: string) => text.replace(/\s{2,}/g, ' ').trim()

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

export default function TeamRoster({ agents }: { agents: TeamAgent[] }) {
  return (
    <dl className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {agents.map((agent, index) => (
        <div
          key={agent.id}
          className="grid gap-4 py-8 lg:grid-cols-[220px_1fr] lg:gap-10"
        >
          <dt>
            <span className="font-mono text-xs text-emerald-300">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="mt-2 font-semibold text-white">{agent.name}</p>
            <p className="mt-1 font-mono text-xs text-slate-500">model: {agent.model}</p>
          </dt>
          <dd>
            <p className="max-w-2xl leading-7 text-slate-400">{tidy(agent.purpose)}</p>

            <p className="mt-5 font-mono text-xs uppercase tracking-wider text-white/50">
              Writes
            </p>
            <ul className="mt-2 space-y-1">
              {agent.writes.map((path) => (
                <li key={path} className="break-all font-mono text-xs text-slate-300">
                  {path}
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-xs uppercase tracking-wider text-white/50">
              Stops when
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {agent.stops_when[0]}
            </p>
            {agent.stops_when.length > 1 ? (
              <details className="mt-3">
                <summary
                  className={`cursor-pointer list-none rounded-lg text-sm text-slate-500 marker:hidden hover:text-white ${FOCUS_RING}`}
                >
                  {agent.stops_when.length - 1} more stop conditions
                </summary>
                <ul className="mt-3 max-w-2xl space-y-2">
                  {agent.stops_when.slice(1).map((condition) => (
                    <li key={condition} className="text-sm leading-6 text-slate-400">
                      {condition}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
