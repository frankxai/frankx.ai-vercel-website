'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Brain,
  Users,
  Command,
  Layers,
  ArrowRight,
  Download,
  Github
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import {
  StaggerContainer,
  StaggerItem,
  GlowPulse
} from '@/components/ui/AdvancedAnimations'

const visuals = [
  {
    id: 'v3-frankx-system',
    title: 'FrankX Superintelligent System',
    description: 'Golden phoenix rising with orbital rings of 96 cyan skill crystals, 45 purple agent constellations, and 42 golden command spheres. Starlight hub at center.',
    image: '/images/acos/v3-frankx-system.png',
    category: 'Imagen 4 Ultra • 8K'
  },
  {
    id: 'v3-arcanea-ecosystem',
    title: 'Arcanea Intelligence OS',
    description: 'Isometric floating island architecture with crystal temple, Skill Forge, Agent Towers, Command Center, and Creation Factory connected by energy bridges.',
    image: '/images/acos/v3-arcanea-ecosystem.png',
    category: 'Imagen 4 Ultra • Isometric'
  },
  {
    id: 'v3-golden-age',
    title: 'Golden Age of Co-Creation',
    description: 'Human creator with 7 spirit animals in double helix: dragon, phoenix, crystal, wave, void, wind, stars. Content streams flowing outward beneath divine light.',
    image: '/images/acos/v3-golden-age.png',
    category: 'Imagen 4 Ultra • Cinematic'
  },
  {
    id: 'v2-frankx-system',
    title: 'FrankX System (V2)',
    description: 'Earlier version generated with Gemini 2.5 Flash Image and 6-layer Guardian prompts.',
    image: '/images/acos/v2-frankx-system.png',
    category: 'V2 • Gemini Flash'
  },
  {
    id: 'guardian-council',
    title: 'Guardian Council',
    description: '5 AI Guardians in pentagon formation: Dragon Forge, Crystal Architect, Ocean Memory, Void Gazer, Vision Artist.',
    image: '/images/acos/guardian-council.png',
    category: 'V1 • Basic'
  },
  {
    id: 'starlight-orchestrator',
    title: 'Starlight Orchestrator',
    description: 'The central ACOS hub with 7 holographic pillars representing Skills, Agents, Commands, Workflows, and Intelligence.',
    image: '/images/acos/starlight-orchestrator.png',
    category: 'V1 • Basic'
  }
]

const stats = [
  { label: 'Skills', value: '96', icon: Sparkles, color: 'from-cyan-500 to-blue-500' },
  { label: 'Agents', value: '45', icon: Users, color: 'from-purple-500 to-violet-500' },
  { label: 'Commands', value: '42', icon: Command, color: 'from-amber-500 to-orange-500' },
  { label: 'Workflows', value: '∞', icon: Layers, color: 'from-emerald-500 to-teal-500' }
]

export default function ACOSPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8">
                <Brain className="w-4 h-4 mr-2" />
                Agentic Creator Operating System
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                ACOS v6.0
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                The Operating System for Golden Age Creators
              </p>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                A superintelligent agent system that amplifies human creativity through AI collaboration.
                96 skills, 45 specialized agents, 42 commands — all orchestrated through natural language.
              </p>
            </div>
          </StaggerItem>

          {/* Stats */}
          <StaggerItem>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat) => (
                <GlassmorphicCard key={stat.label} variant="premium" className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </GlassmorphicCard>
              ))}
            </div>
          </StaggerItem>

          {/* Visual Gallery */}
          <StaggerItem>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-100 to-purple-200 bg-clip-text text-transparent">
                System Visuals
              </h2>
              <p className="text-slate-400">
                Generated with Imagen 4 Ultra • 8K Hyper-Detailed • Professional Concept Art
              </p>
            </div>
          </StaggerItem>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {visuals.map((visual, index) => (
              <StaggerItem key={visual.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassmorphicCard variant="luxury" hover className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={visual.image}
                        alt={visual.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="text-xs text-purple-300 uppercase tracking-wider mb-2 block">
                          {visual.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {visual.title}
                        </h3>
                        <p className="text-sm text-slate-300 line-clamp-2">
                          {visual.description}
                        </p>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              </StaggerItem>
            ))}
          </div>

          {/* CTA Section */}
          <StaggerItem>
            <GlassmorphicCard variant="luxury" className="p-12 text-center">
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-purple-200 bg-clip-text text-transparent">
                Ready to Amplify Your Creativity?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                ACOS is open source and available now. Join the Golden Age of human-AI co-creation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowPulse color="purple">
                  <PremiumButton variant="luxury" size="xl" href="https://github.com/frankxai/agentic-creator-os">
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </PremiumButton>
                </GlowPulse>
                <PremiumButton variant="ghost" size="xl" href="/contact">
                  Get Started
                </PremiumButton>
              </div>
            </GlassmorphicCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
