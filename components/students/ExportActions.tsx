'use client'

import { useState } from 'react'
import { Download, Upload, Trash2, FileText } from 'lucide-react'
import demoPlan from '@/data/students/demo-plan.json'

export default function ExportActions() {
    const [status, setStatus] = useState<string>('')

    const SCOPE = 'workshop.v1.'

    const getValue = (key: string) => localStorage.getItem(SCOPE + key) || ''

    const buildMarkdown = () => {
        const lines: string[] = []
        const push = (s = '') => lines.push(s)

        push('# Students in the Age of Intelligence — Personal Plan')
        push('')
        push(`Exported: ${new Date().toLocaleString()}`)
        push('')

        // Ikigai
        push('---')
        push('## Ikigai')
        push('')
        push('### What I love'); push(getValue('ikigai.love')); push('')
        push("### What I'm good at"); push(getValue('ikigai.good')); push('')
        push('### What pays'); push(getValue('ikigai.pays')); push('')
        push('### What the world needs'); push(getValue('ikigai.needs')); push('')
        push('### Ikigai statement'); push(getValue('ikigai.statement')); push('')

        // Analysis
        push('---')
        push('## Personality & Interest Analysis (redacted source)')
        push(getValue('analysis.source')); push('')

        // Roles
        push('---')
        push('## Role & Company Navigator')
        push('### Target role tracks'); push(getValue('roles.tracks')); push('')
        push('### Target companies'); push(getValue('roles.companies')); push('')

        // Plan
        push('---')
        push('## 30/60/90 Plan')
        push('### 30 Days')
        push('- Learn'); push(getValue('plan.30.learn'))
        push('- Build'); push(getValue('plan.30.build'))
        push('- Publish'); push(getValue('plan.30.publish'))
        push('- Network'); push(getValue('plan.30.network')); push('')
        push('### 60 Days')
        push('- Learn'); push(getValue('plan.60.learn'))
        push('- Build'); push(getValue('plan.60.build'))
        push('- Publish'); push(getValue('plan.60.publish'))
        push('- Network'); push(getValue('plan.60.network')); push('')
        push('### 90 Days')
        push('- Learn'); push(getValue('plan.90.learn'))
        push('- Build'); push(getValue('plan.90.build'))
        push('- Publish'); push(getValue('plan.90.publish'))
        push('- Network'); push(getValue('plan.90.network')); push('')

        // Portfolio
        push('---')
        push('## Portfolio')
        push('### Selected project ideas'); push(getValue('portfolio.ideas')); push('')
        push('### Project spec'); push(getValue('portfolio.spec')); push('')

        // Social
        push('---')
        push('## Social Positioning')
        push('### Headline'); push(getValue('social.headline')); push('')
        push('### Bio'); push(getValue('social.bio')); push('')
        push('### Topic pillars'); push(getValue('social.pillars')); push('')
        push('### Content calendar'); push(getValue('social.calendar')); push('')
        push('### Elevator pitch'); push(getValue('social.pitch')); push('')
        push('### Cold outreach'); push(getValue('social.outreach')); push('')

        // Agent
        push('---')
        push('## Custom GPT / Agent')
        push(getValue('agent.spec')); push('')

        push('---')
        push('_Generated with the FrankX Student Hub. Your data remains local by default._')

        return lines.join('\n')
    }

    const handleExport = () => {
        const md = buildMarkdown()
        const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
        const a = document.createElement('a')
        const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
        a.href = URL.createObjectURL(blob)
        a.download = `frankx-student-plan-${ts}.md`
        document.body.appendChild(a)
        a.click()
        a.remove()
        setStatus('Exported!')
        setTimeout(() => setStatus(''), 2000)
    }

    const handleClear = () => {
        if (confirm('Clear all locally stored data? This cannot be undone.')) {
            Object.keys(localStorage).forEach(k => {
                if (k.startsWith(SCOPE)) localStorage.removeItem(k)
            })
            // Force update components
            window.dispatchEvent(new Event('storage'))
            // Also dispatch custom event for same-tab
            const keys = Object.keys(demoPlan).filter(k => k !== '_meta')
            keys.forEach(k => {
                window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key: SCOPE + k, value: '' } }))
            })

            setStatus('Cleared')
            setTimeout(() => setStatus(''), 2000)
        }
    }

    const handleLoadExample = () => {
        if (confirm('Load example data? This will overwrite your current inputs.')) {
            Object.entries(demoPlan).forEach(([key, value]) => {
                if (key === '_meta') return
                const fullKey = SCOPE + key
                localStorage.setItem(fullKey, value as string)
                // Dispatch event so components update
                window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key: fullKey, value } }))
            })
            setStatus('Loaded Example')
            setTimeout(() => setStatus(''), 2000)
        }
    }

    return (
        <div className="flex flex-wrap gap-4 items-center">
            <button
                onClick={handleExport}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-500 shadow-lg shadow-primary-900/20"
            >
                <Download className="h-4 w-4" />
                Export Plan (Markdown)
            </button>

            <button
                onClick={handleLoadExample}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
                <FileText className="h-4 w-4" />
                Load Example
            </button>

            <button
                onClick={handleClear}
                className="flex items-center gap-2 rounded-xl border border-red-900/30 bg-red-950/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
            >
                <Trash2 className="h-4 w-4" />
                Clear Data
            </button>

            {status && <span className="text-sm font-medium text-emerald-400 animate-pulse">{status}</span>}
        </div>
    )
}
