import React from 'react'

export function AuroraBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-midnight-950">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-vibe-midnight opacity-80" />

            {/* Aurora Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-aurora-500/20 blur-[100px] animate-aurora-flow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-aurora-400/10 blur-[100px] animate-pulse-slow" />

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-vibe-noise opacity-20 mix-blend-overlay" />
        </div>
    )
}
