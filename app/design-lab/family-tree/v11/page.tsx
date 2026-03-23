'use client'

import { ResponsiveSunburst } from '@nivo/sunburst'
import { familyNodes, sideColors } from '@/lib/family-tree-data'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface SunburstNode {
  id: string
  name: string
  color: string
  role?: string
  side?: string
  value?: number
  children?: SunburstNode[]
}

// Transform family data into Nivo sunburst format
function transformToSunburstData(): SunburstNode {
  // Find grandparents and organize by side
  const gorteGrandparents = familyNodes.filter(n => n.generation === 0 && n.side === 'gorte')
  const riemerGrandparents = familyNodes.filter(n => n.generation === 0 && n.side === 'riemer')

  // Find parents
  const mama = familyNodes.find(n => n.id === 'dora-riemer')!
  const papa = familyNodes.find(n => n.id === 'witali-riemer')!

  // Find partner
  const partner = familyNodes.find(n => n.id === 'tien')!

  return {
    id: 'frank-riemer',
    name: 'Frank Riemer',
    color: sideColors.current.hex,
    role: "That's me",
    side: 'current',
    children: [
      {
        id: 'dora-riemer',
        name: 'Dora Riemer',
        color: sideColors.bridge.hex,
        role: mama.role,
        side: mama.side,
        children: gorteGrandparents.map(gp => ({
          id: gp.id,
          name: gp.name,
          color: sideColors.gorte.hex,
          role: gp.role,
          side: gp.side,
          value: 1,
        }))
      },
      {
        id: 'witali-riemer',
        name: 'Witali Riemer',
        color: sideColors.bridge.hex,
        role: papa.role,
        side: papa.side,
        children: riemerGrandparents.map(gp => ({
          id: gp.id,
          name: gp.name,
          color: sideColors.riemer.hex,
          role: gp.role,
          side: gp.side,
          value: 1,
        }))
      },
      {
        id: 'tien',
        name: 'Tien',
        color: sideColors.partner.hex,
        role: partner.role,
        side: partner.side,
        value: 1,
      }
    ]
  }
}

export default function FamilyTreeV11() {
  const data = transformToSunburstData()

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link
          href="/design-lab/family-tree"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to variants
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">V11 — Sunburst</h1>
          <p className="text-white/60">Nivo concentric ring visualization</p>
        </div>

        {/* Generation Ring Labels */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
            <span className="text-sm text-white/80">Center: You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-white/80">Ring 1: Parents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-white/80">Ring 2: Grandparents (Maternal)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-sm text-white/80">Ring 2: Grandparents (Paternal)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <span className="text-sm text-white/80">Ring 1: Partner</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sunburst Chart */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border border-white/10 p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                height: 'calc(100vh - 320px)',
                minHeight: '600px'
              }}
            >
              <ResponsiveSunburst
                data={data}
                identity="id"
                value="value"
                cornerRadius={3}
                borderWidth={2}
                borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                colors={{ scheme: 'nivo' }}
                childColor={{ from: 'color' }}
                enableArcLabels={true}
                arcLabel={(d) => {
                  // Show just first name for cleaner look
                  const firstName = d.data.name.split(' ')[0]
                  return firstName
                }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#ffffff"
                theme={{
                  background: 'transparent',
                  text: {
                    fill: '#ffffff',
                    fontSize: 12,
                  },
                  tooltip: {
                    container: {
                      background: '#1a1a1f',
                      color: '#ffffff',
                      fontSize: 14,
                      borderRadius: 8,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '12px 16px',
                    },
                  },
                }}
                tooltip={({ id, value, color, data }) => {
                  const node = data as SunburstNode

                  // Get family line info
                  let familyLine = ''
                  if (node.side === 'gorte') familyLine = 'Maternal (Gorte)'
                  else if (node.side === 'riemer') familyLine = 'Paternal (Riemer)'
                  else if (node.side === 'bridge') familyLine = 'Parents'
                  else if (node.side === 'current') familyLine = 'Current Generation'
                  else if (node.side === 'partner') familyLine = 'Partner'

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: color
                          }}
                        />
                        <strong style={{ fontSize: 15 }}>{node.name}</strong>
                      </div>
                      {node.role && (
                        <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 13 }}>
                          {node.role}
                        </div>
                      )}
                      {familyLine && (
                        <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}>
                          {familyLine}
                        </div>
                      )}
                    </div>
                  )
                }}
              />
            </div>
          </div>

          {/* Side Legend */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl border border-white/10 p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 className="text-lg font-semibold mb-4">Family Lines</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: sideColors.current.hex }}
                  />
                  <div>
                    <div className="font-medium">Current</div>
                    <div className="text-sm text-white/60">You (center)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: sideColors.bridge.hex }}
                  />
                  <div>
                    <div className="font-medium">Parents</div>
                    <div className="text-sm text-white/60">Dora & Witali</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: sideColors.gorte.hex }}
                  />
                  <div>
                    <div className="font-medium">Gorte</div>
                    <div className="text-sm text-white/60">Maternal line</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: sideColors.riemer.hex }}
                  />
                  <div>
                    <div className="font-medium">Riemer</div>
                    <div className="text-sm text-white/60">Paternal line</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: sideColors.partner.hex }}
                  />
                  <div>
                    <div className="font-medium">Partner</div>
                    <div className="text-sm text-white/60">Tien</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-semibold mb-3 text-white/80">Chart Structure</h4>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• Center: Frank (you)</div>
                  <div>• Inner ring: Parents & Partner</div>
                  <div>• Outer ring: Grandparents</div>
                  <div>• Hover for details</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
