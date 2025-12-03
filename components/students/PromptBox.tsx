'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface PromptBoxProps {
    promptText: string
    label?: string
}

export default function PromptBox({ promptText, label = 'AI Prompt' }: PromptBoxProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promptText)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="relative my-4 rounded-xl border border-slate-800 bg-slate-950/50 p-1">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-800/50 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <div className="p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 leading-relaxed">
                    {promptText}
                </pre>
            </div>
        </div>
    )
}
