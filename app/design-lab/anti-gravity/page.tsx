'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AntigravityPage() {
    const agents = [
        { name: "Antigravity", role: "Architect", color: "purple", img: "/images/agents/starlight-architect.svg" },  // Using Starlight as placeholder
        { name: "Creation Engine", role: "Builder", color: "blue", img: "/images/agents/creation-engine.svg" },
        { name: "Frequency", role: "Alchemist", color: "pink", img: "/images/agents/frequency-alchemist.svg" },
        { name: "Oracle", role: "Advisor", color: "amber", img: "/images/agents/luminor-oracle.svg" },
    ];

    return (
        <div className="min-h-screen bg-[#030005] text-white selection:bg-purple-500/30 overflow-x-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(120,50,255,0.08),transparent_60%)] pointer-events-none" />
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            <main className="relative z-10 mx-auto max-w-7xl px-6 py-24">

                {/* Header Section */}
                <header className="mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
                    />

                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                        ANTIGRAVITY
                    </h1>
                    <div className="flex items-center gap-4 mt-8">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-wider">
                            System Online
                        </span>
                        <span className="text-neutral-500 text-sm font-mono">v2.0.4 • Creator OS</span>
                    </div>
                </header>

                {/* Agents Grid */}
                <section className="mb-32">
                    <h2 className="text-sm font-mono text-neutral-500 mb-8 uppercase tracking-widest">Active Agents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {agents.map((agent, i) => (
                            <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative p-6 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl hover:bg-neutral-900/60 hover:border-white/10 transition-all"
                            >
                                {/* Image Placeholder / Fallback */}
                                <div className="relative w-16 h-16 mb-6 rounded-2xl bg-white/5 overflow-hidden p-2">
                                    <Image
                                        src={agent.img}
                                        alt={agent.name}
                                        width={64}
                                        height={64}
                                        className="object-contain" // Simplified; assuming Next.js Image works with SVG
                                    />
                                </div>

                                <h3 className="text-xl font-medium text-white group-hover:text-purple-300 transition-colors">
                                    {agent.name}
                                </h3>
                                <p className="text-sm text-neutral-500 font-mono mt-1">{agent.role}</p>

                                {/* Status Indicator */}
                                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* System Diagnostics */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="col-span-2 p-8 rounded-[2rem] bg-neutral-900/20 border border-white/5 backdrop-blur-md">
                        <h3 className="text-lg font-medium mb-6">System Diagnostics</h3>
                        <div className="space-y-4 font-mono text-sm text-neutral-400">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span>Design System Integrity</span>
                                <span className="text-white">99.8%</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span>Mascot Integration</span>
                                <span className="text-white">Complete</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span>Narrative Coherence</span>
                                <span className="text-white">Optimal</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-900/20 to-transparent border border-white/5 backdrop-blur-md flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-lg font-medium">Turbo Mode</h3>
                        <p className="text-sm text-neutral-500 mt-2 max-w-[200px]">
                            High-performance rendering enabled for all sub-systems.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}
