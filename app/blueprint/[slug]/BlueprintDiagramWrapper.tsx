'use client'

import dynamic from 'next/dynamic'

// Dynamic import must be in a client component for ssr: false
const BlueprintDiagram = dynamic(() => import('./BlueprintDiagram'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-2xl border border-white/10 bg-slate-900/80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">Loading interactive diagram...</span>
      </div>
    </div>
  ),
})

interface BlueprintComponent {
  id: string
  name: string
  type: string
  description: string
  cloudService?: string
}

interface BlueprintFlow {
  id: string
  from: string
  to: string
  label?: string
  dataType?: string
}

interface Props {
  components: BlueprintComponent[]
  flows: BlueprintFlow[]
  title?: string
}

export function BlueprintDiagramWrapper({ components, flows, title }: Props) {
  return <BlueprintDiagram components={components} flows={flows} title={title} />
}

export default BlueprintDiagramWrapper
