import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'V8 — CSS Scroll-Driven Timeline | Family Tree',
  description: 'Pure CSS scroll-driven animations. Zero JavaScript animation logic.',
}

export default function FamilyTreeV8() {
  // Group nodes by generation and spouse pairs
  const gen2 = familyNodes.filter(n => n.generation === 2)
  const gen1 = familyNodes.filter(n => n.generation === 1)
  const gen0 = familyNodes.filter(n => n.generation === 0)

  // Find spouse pairs
  const spousePairs = familyEdges
    .filter(e => e.type === 'spouse' || e.type === 'partner')
    .map(e => [e.source, e.target])

  // Helper to check if two nodes are spouses
  const areSpouses = (id1: string, id2: string): boolean => {
    return spousePairs.some(
      pair => (pair[0] === id1 && pair[1] === id2) || (pair[0] === id2 && pair[1] === id1)
    )
  }

  // Group generation into spouse pairs and singles
  const groupGeneration = (nodes: typeof familyNodes) => {
    const processed = new Set<string>()
    const groups: Array<typeof familyNodes> = []

    nodes.forEach(node => {
      if (processed.has(node.id)) return

      const spouse = nodes.find(n => !processed.has(n.id) && areSpouses(node.id, n.id))
      if (spouse) {
        groups.push([node, spouse])
        processed.add(node.id)
        processed.add(spouse.id)
      } else {
        groups.push([node])
        processed.add(node.id)
      }
    })

    return groups
  }

  const gen2Groups = groupGeneration(gen2)
  const gen1Groups = groupGeneration(gen1)
  const gen0Groups = groupGeneration(gen0)

  // Static CSS - safe to use dangerouslySetInnerHTML with no user input
  const scrollDrivenCSS = `
    @supports (animation-timeline: scroll()) {
      .scroll-fade-left {
        opacity: 0;
        transform: translateX(-60px);
        animation: fadeSlideLeft linear forwards;
        animation-timeline: view();
        animation-range: entry 0% entry 80%;
      }

      .scroll-fade-right {
        opacity: 0;
        transform: translateX(60px);
        animation: fadeSlideRight linear forwards;
        animation-timeline: view();
        animation-range: entry 0% entry 80%;
      }

      .scroll-scale-in {
        opacity: 0;
        transform: scale(0.9);
        animation: scaleIn linear forwards;
        animation-timeline: view();
        animation-range: entry 0% entry 70%;
      }

      .scroll-draw-line {
        transform: scaleY(0);
        transform-origin: top;
        animation: drawLine linear forwards;
        animation-timeline: view();
        animation-range: entry 0% cover 100%;
      }

      @keyframes fadeSlideLeft {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes fadeSlideRight {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes drawLine {
        to {
          transform: scaleY(1);
        }
      }

      /* Progress indicator at top */
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #06b6d4, #10b981, #f59e0b);
        transform-origin: left;
        transform: scaleX(0);
        animation: progressBar linear forwards;
        animation-timeline: scroll();
        animation-range: 0% 100%;
        z-index: 50;
      }

      @keyframes progressBar {
        to {
          transform: scaleX(1);
        }
      }
    }

    /* Fallback for browsers without scroll-driven animations */
    @supports not (animation-timeline: scroll()) {
      .scroll-fade-left,
      .scroll-fade-right,
      .scroll-scale-in,
      .scroll-draw-line {
        opacity: 1;
        transform: none;
      }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollDrivenCSS }} />

      <div className="min-h-screen bg-[#0a0a0f] text-white relative">
        {/* Scroll progress bar */}
        <div className="scroll-progress" />

        {/* Header */}
        <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/5 bg-[#0a0a0f]/80">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-2">
              V8 — Scroll-Driven Timeline
            </h1>
            <p className="text-white/60">
              Pure CSS, zero JavaScript animations. Scroll to journey through time.
            </p>
          </div>
        </div>

        {/* Main timeline */}
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          {/* Center spine line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/20 via-cyan-500/20 to-amber-500/20 -translate-x-1/2 scroll-draw-line" />

          {/* Generation 2: Current */}
          <div className="mb-32">
            <div className="flex items-center justify-center mb-16">
              <div className="text-center scroll-scale-in">
                <div className="text-sm font-mono text-violet-400 mb-2">GENERATION 2</div>
                <h2 className="text-3xl font-bold">Present</h2>
                <div className="text-white/40 text-sm">Amsterdam</div>
              </div>
            </div>

            {gen2Groups.map((group, groupIdx) => {
              const isSpousePair = group.length === 2
              return (
                <div
                  key={group[0].id}
                  className={`mb-12 flex items-center gap-6 ${
                    isSpousePair ? 'justify-center' : groupIdx % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {isSpousePair ? (
                    <>
                      {/* Left spouse */}
                      <div className="w-80 scroll-fade-left" style={{ animationDelay: '0ms' }}>
                        <div
                          className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderColor: sideColors[group[0].side].hex,
                          }}
                        >
                          <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[0].side].hex }}>
                            {group[0].side.toUpperCase()}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{group[0].name}</h3>
                          {group[0].bornName && (
                            <div className="text-sm text-white/50 mb-2">{group[0].bornName}</div>
                          )}
                          <div className="text-violet-400 text-sm font-medium mb-3">{group[0].role}</div>
                          {group[0].details && (
                            <div className="space-y-1">
                              {group[0].details.map((detail, i) => (
                                <div key={i} className="text-sm text-white/60">
                                  {detail}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Connection dot */}
                      <div className="relative z-10 scroll-scale-in" style={{ animationDelay: '100ms' }}>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 ring-4 ring-[#0a0a0f]" />
                      </div>

                      {/* Right spouse */}
                      <div className="w-80 scroll-fade-right" style={{ animationDelay: '0ms' }}>
                        <div
                          className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderColor: sideColors[group[1].side].hex,
                          }}
                        >
                          <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[1].side].hex }}>
                            {group[1].side.toUpperCase()}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{group[1].name}</h3>
                          {group[1].bornName && (
                            <div className="text-sm text-white/50 mb-2">{group[1].bornName}</div>
                          )}
                          <div className="text-rose-400 text-sm font-medium mb-3">{group[1].role}</div>
                          {group[1].details && (
                            <div className="space-y-1">
                              {group[1].details.map((detail, i) => (
                                <div key={i} className="text-sm text-white/60">
                                  {detail}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {groupIdx % 2 === 0 ? (
                        <>
                          <div className="w-80 scroll-fade-left">
                            <div
                              className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderColor: sideColors[group[0].side].hex,
                              }}
                            >
                              <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[0].side].hex }}>
                                {group[0].side.toUpperCase()}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{group[0].name}</h3>
                              {group[0].bornName && (
                                <div className="text-sm text-white/50 mb-2">{group[0].bornName}</div>
                              )}
                              <div className="text-violet-400 text-sm font-medium mb-3">{group[0].role}</div>
                              {group[0].details && (
                                <div className="space-y-1">
                                  {group[0].details.map((detail, i) => (
                                    <div key={i} className="text-sm text-white/60">
                                      {detail}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="relative z-10 scroll-scale-in">
                            <div className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-[#0a0a0f]" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative z-10 scroll-scale-in">
                            <div className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-[#0a0a0f]" />
                          </div>
                          <div className="w-80 scroll-fade-right">
                            <div
                              className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderColor: sideColors[group[0].side].hex,
                              }}
                            >
                              <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[0].side].hex }}>
                                {group[0].side.toUpperCase()}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{group[0].name}</h3>
                              {group[0].bornName && (
                                <div className="text-sm text-white/50 mb-2">{group[0].bornName}</div>
                              )}
                              <div className="text-violet-400 text-sm font-medium mb-3">{group[0].role}</div>
                              {group[0].details && (
                                <div className="space-y-1">
                                  {group[0].details.map((detail, i) => (
                                    <div key={i} className="text-sm text-white/60">
                                      {detail}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Generation 1: Parents */}
          <div className="mb-32">
            <div className="flex items-center justify-center mb-16">
              <div className="text-center scroll-scale-in">
                <div className="text-sm font-mono text-emerald-400 mb-2">GENERATION 1</div>
                <h2 className="text-3xl font-bold">Parents</h2>
                <div className="text-white/40 text-sm">The Bridge</div>
              </div>
            </div>

            {gen1Groups.map((group, groupIdx) => {
              const isSpousePair = group.length === 2
              return (
                <div key={group[0].id} className="mb-12 flex items-center gap-6 justify-center">
                  {isSpousePair ? (
                    <>
                      <div className="w-80 scroll-fade-left" style={{ animationDelay: '0ms' }}>
                        <div
                          className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderColor: sideColors[group[0].side].hex,
                          }}
                        >
                          <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[0].side].hex }}>
                            {group[0].side.toUpperCase()}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{group[0].name}</h3>
                          {group[0].bornName && (
                            <div className="text-sm text-white/50 mb-2">{group[0].bornName}</div>
                          )}
                          <div className="text-emerald-400 text-sm font-medium mb-3">{group[0].role}</div>
                          {group[0].details && (
                            <div className="space-y-1">
                              {group[0].details.map((detail, i) => (
                                <div key={i} className="text-sm text-white/60">
                                  {detail}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 scroll-scale-in" style={{ animationDelay: '100ms' }}>
                        <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#0a0a0f]" />
                      </div>

                      <div className="w-80 scroll-fade-right" style={{ animationDelay: '0ms' }}>
                        <div
                          className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderColor: sideColors[group[1].side].hex,
                          }}
                        >
                          <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[1].side].hex }}>
                            {group[1].side.toUpperCase()}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{group[1].name}</h3>
                          {group[1].bornName && (
                            <div className="text-sm text-white/50 mb-2">{group[1].bornName}</div>
                          )}
                          <div className="text-emerald-400 text-sm font-medium mb-3">{group[1].role}</div>
                          {group[1].details && (
                            <div className="space-y-1">
                              {group[1].details.map((detail, i) => (
                                <div key={i} className="text-sm text-white/60">
                                  {detail}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              )
            })}
          </div>

          {/* Generation 0: Grandparents */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-16">
              <div className="text-center scroll-scale-in">
                <div className="text-sm font-mono text-amber-400 mb-2">GENERATION 0</div>
                <h2 className="text-3xl font-bold">Grandparents</h2>
                <div className="text-white/40 text-sm">Roots</div>
              </div>
            </div>

            {/* Gorte grandparents */}
            <div className="mb-20">
              <div className="text-center mb-8 scroll-scale-in">
                <div className="text-amber-400 font-medium">Maternal — Gorte</div>
              </div>
              {gen0Groups
                .filter(g => g[0].side === 'gorte')
                .map(group => {
                  const isSpousePair = group.length === 2
                  return (
                    <div key={group[0].id} className="mb-12 flex items-center gap-6 justify-center">
                      {isSpousePair ? (
                        <>
                          <div className="w-80 scroll-fade-left" style={{ animationDelay: '0ms' }}>
                            <div
                              className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderColor: sideColors[group[0].side].hex,
                              }}
                            >
                              <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[0].side].hex }}>
                                {group[0].side.toUpperCase()}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{group[0].name}</h3>
                              {group[0].bornName && (
                                <div className="text-sm text-white/50 mb-2">{group[0].bornName}</div>
                              )}
                              <div className="text-amber-400 text-sm font-medium mb-3">{group[0].role}</div>
                              {group[0].details && (
                                <div className="space-y-1">
                                  {group[0].details.map((detail, i) => (
                                    <div key={i} className="text-sm text-white/60">
                                      {detail}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="relative z-10 scroll-scale-in" style={{ animationDelay: '100ms' }}>
                            <div className="w-4 h-4 rounded-full bg-amber-500 ring-4 ring-[#0a0a0f]" />
                          </div>

                          <div className="w-80 scroll-fade-right" style={{ animationDelay: '0ms' }}>
                            <div
                              className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderColor: sideColors[group[1].side].hex,
                              }}
                            >
                              <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[1].side].hex }}>
                                {group[1].side.toUpperCase()}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{group[1].name}</h3>
                              {group[1].bornName && (
                                <div className="text-sm text-white/50 mb-2">{group[1].bornName}</div>
                              )}
                              <div className="text-amber-400 text-sm font-medium mb-3">{group[1].role}</div>
                              {group[1].details && (
                                <div className="space-y-1">
                                  {group[1].details.map((detail, i) => (
                                    <div key={i} className="text-sm text-white/60">
                                      {detail}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  )
                })}
            </div>

            {/* Riemer grandparents */}
            <div className="mb-20">
              <div className="text-center mb-8 scroll-scale-in">
                <div className="text-cyan-400 font-medium">Paternal — Riemer</div>
              </div>
              {gen0Groups
                .filter(g => g[0].side === 'riemer')
                .map(group => {
                  const isSpousePair = group.length === 2
                  return (
                    <div key={group[0].id} className="mb-12 flex items-center gap-6 justify-center">
                      {isSpousePair ? (
                        <>
                          <div className="w-80 scroll-fade-left" style={{ animationDelay: '0ms' }}>
                            <div
                              className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderColor: sideColors[group[0].side].hex,
                              }}
                            >
                              <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[0].side].hex }}>
                                {group[0].side.toUpperCase()}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{group[0].name}</h3>
                              {group[0].bornName && (
                                <div className="text-sm text-white/50 mb-2">{group[0].bornName}</div>
                              )}
                              <div className="text-cyan-400 text-sm font-medium mb-3">{group[0].role}</div>
                              {group[0].details && (
                                <div className="space-y-1">
                                  {group[0].details.map((detail, i) => (
                                    <div key={i} className="text-sm text-white/60">
                                      {detail}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="relative z-10 scroll-scale-in" style={{ animationDelay: '100ms' }}>
                            <div className="w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#0a0a0f]" />
                          </div>

                          <div className="w-80 scroll-fade-right" style={{ animationDelay: '0ms' }}>
                            <div
                              className="p-6 rounded-xl backdrop-blur-sm border-l-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderColor: sideColors[group[1].side].hex,
                              }}
                            >
                              <div className="text-xs font-mono mb-2" style={{ color: sideColors[group[1].side].hex }}>
                                {group[1].side.toUpperCase()}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{group[1].name}</h3>
                              {group[1].bornName && (
                                <div className="text-sm text-white/50 mb-2">{group[1].bornName}</div>
                              )}
                              <div className="text-cyan-400 text-sm font-medium mb-3">{group[1].role}</div>
                              {group[1].details && (
                                <div className="space-y-1">
                                  {group[1].details.map((detail, i) => (
                                    <div key={i} className="text-sm text-white/60">
                                      {detail}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Footer spacer */}
          <div className="h-40" />
        </div>
      </div>
    </>
  )
}
