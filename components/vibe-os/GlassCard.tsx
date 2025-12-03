import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'hover' | 'deep'
}

export function GlassCard({
    children,
    className,
    variant = 'default',
    ...props
}: GlassCardProps) {
    const variants = {
        default: 'bg-glass-surface border border-glass-stroke backdrop-blur-md',
        hover: 'bg-glass-surface border border-glass-stroke backdrop-blur-md hover:bg-slate-800/50 hover:border-aurora-500/30 transition-all duration-300',
        deep: 'bg-midnight-900/80 border border-glass-stroke backdrop-blur-xl shadow-vibe-depth'
    }

    return (
        <div
            className={cn(
                'rounded-2xl relative overflow-hidden',
                variants[variant],
                className
            )}
            {...props}
        >
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-glass-highlight to-transparent opacity-50" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
