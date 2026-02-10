'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AgentsPage() {
  const agents = [
    {
      name: "Starlight Architect",
      role: "System Visionary",
      description: "Orchestrates the entire FrankX ecosystem with cosmic precision.",
      image: "/images/agents/starlight-architect.svg",
      color: "from-purple-500/20 to-blue-500/20"
    },
    {
      name: "Creation Engine",
      role: "Product Builder",
      description: "Turns raw ideas into shipped products. Master of execution.",
      image: "/images/agents/creation-engine.svg",
      color: "from-blue-500/20 to-teal-500/20"
    },
    {
      name: "Frequency Alchemist",
      role: "Vibe Engineer",
      description: "Ensures emotional resonance in every interaction.",
      image: "/images/agents/frequency-alchemist.svg",
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      name: "Luminor Oracle",
      role: "Strategic Advisor",
      description: "Sees the future of the creator economy and guides the ship.",
      image: "/images/agents/luminor-oracle.svg",
      color: "from-amber-500/20 to-orange-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />

      <main className="container mx-auto px-6 py-24 relative z-10">
        <header className="mb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter"
          >
            The Squad
          </motion.h1>
          <p className="mt-6 text-xl text-neutral-400 max-w-2xl mx-auto">
            Your specialized AI team. Autonomous, aligned, and ready to build.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/5 p-10`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 flex items-start gap-8">
                <div className="w-24 h-24 shrink-0 rounded-2xl bg-black/50 border border-white/10 p-4 backdrop-blur-sm">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{agent.name}</h2>
                  <div className="text-sm font-mono text-purple-400 mt-1 uppercase tracking-wider">{agent.role}</div>
                  <p className="mt-4 text-neutral-400 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
