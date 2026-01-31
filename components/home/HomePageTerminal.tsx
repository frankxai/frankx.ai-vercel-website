'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Terminal, Music2, Code2, BookOpen, Zap } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * V4: Dark Terminal
 *
 * Design philosophy: Hacker aesthetic, monospace typography, minimal,
 * command-line inspired UI, green/amber on black, matrix vibes.
 * Inspired by: Terminal, Warp, Fig, Raycast (dark mode)
 */

// Typewriter effect
function Typewriter({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(text)
      return
    }

    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, delay)

    return () => clearInterval(timer)
  }, [text, delay, shouldReduceMotion])

  return (
    <span>
      {displayed}
      <span className="animate-pulse">_</span>
    </span>
  )
}

export default function HomePageTerminal() {
  const shouldReduceMotion = useReducedMotion()

  const commands = [
    { cmd: 'whoami', output: 'frank.riemer // AI Architect @ Oracle' },
    { cmd: 'ls projects/', output: 'music-lab/  prompts/  guides/  tools/' },
    { cmd: 'cat stats.json', output: '{ "songs": 12000, "prompts": 500, "open_source": true }' },
  ]

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      {/* Scanlines effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,0,0.03) 1px, rgba(0,255,0,0.03) 2px)',
        }}
      />

      {/* Hero - Terminal style */}
      <section className="min-h-screen flex items-center px-6 md:px-12">
        <div className="max-w-5xl mx-auto w-full py-20">
          {/* Terminal window */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#21262d] border-b border-[#30363d]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-4 text-xs text-[#8b949e]">frankx@oracle ~ </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* ASCII Art */}
              <pre className="text-[#58a6ff] text-xs md:text-sm leading-tight">
{`╔═══════════════════════════════════════════════════════╗
║  ███████╗██████╗  █████╗ ███╗   ██╗██╗  ██╗██╗  ██╗   ║
║  ██╔════╝██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝╚██╗██╔╝   ║
║  █████╗  ██████╔╝███████║██╔██╗ ██║█████╔╝  ╚███╔╝    ║
║  ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██╔═██╗  ██╔██╗    ║
║  ██║     ██║  ██║██║  ██║██║ ╚████║██║  ██╗██╔╝ ██╗   ║
║  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ║
╚═══════════════════════════════════════════════════════╝`}
              </pre>

              {/* Command outputs */}
              {commands.map((item, i) => (
                <motion.div
                  key={item.cmd}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className="space-y-1"
                >
                  <div>
                    <span className="text-[#27c93f]">→</span>
                    <span className="text-[#8b949e] ml-2">$</span>
                    <span className="text-[#c9d1d9] ml-2">{item.cmd}</span>
                  </div>
                  <div className="text-[#8b949e] pl-6">{item.output}</div>
                </motion.div>
              ))}

              {/* Main headline */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pt-4"
              >
                <div className="text-[#27c93f] text-lg md:text-xl mb-4">
                  <Typewriter text="> Building intelligent systems in the Golden Age of AI" />
                </div>

                <p className="text-[#8b949e] max-w-2xl leading-relaxed mb-8">
                  AI Architect at Oracle. Creator of 12K+ songs with Suno.
                  Everything I build goes here—open, documented, <span className="text-[#27c93f]">yours to fork</span>.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/start"
                    onClick={() => trackEvent('terminal_hero_cta', { type: 'primary' })}
                    className="group inline-flex items-center gap-2 bg-[#238636] text-white px-6 py-3 rounded font-medium hover:bg-[#2ea043] transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                    ./explore.sh
                  </Link>
                  <Link
                    href="/music-lab"
                    className="inline-flex items-center gap-2 text-[#58a6ff] px-6 py-3 border border-[#30363d] rounded hover:border-[#58a6ff] transition-colors"
                  >
                    <Music2 className="w-4 h-4" />
                    music-lab/
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats as code blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { key: 'songs', value: '12000', color: '#27c93f' },
              { key: 'prompts', value: '500+', color: '#58a6ff' },
              { key: 'role', value: '"oracle_ai"', color: '#d29922' },
              { key: 'source', value: 'true', color: '#a371f7' },
            ].map((stat) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#161b22] border border-[#30363d] rounded p-4"
              >
                <div className="text-xs text-[#8b949e] mb-1">{stat.key}:</div>
                <div className="text-xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-[#8b949e] text-sm mb-8">
            <span className="text-[#27c93f]">$</span> ls -la ./projects/
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'music-lab', desc: 'Daily creative practice with Suno', icon: Music2, color: '#a371f7', href: '/music-lab' },
              { name: 'prompts', desc: '50+ battle-tested AI prompts', icon: Code2, color: '#27c93f', href: '/prompt-library' },
              { name: 'guides', desc: 'Technical tutorials & walkthroughs', icon: BookOpen, color: '#58a6ff', href: '/guides' },
              { name: 'tools', desc: 'AI architecture & systems', icon: Zap, color: '#d29922', href: '/ai-architect' },
            ].map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={item.href}
                  className="group block bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded" style={{ backgroundColor: `${item.color}20` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#c9d1d9] font-medium">{item.name}/</span>
                        <ArrowRight className="w-4 h-4 text-[#8b949e] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-[#8b949e]">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-12 border-t border-[#30363d]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <pre className="text-[#27c93f] text-sm mb-8">
{`# Ready to build?
$ git clone https://frankx.ai/start
$ cd your-project
$ ./build.sh`}
            </pre>

            <Link
              href="/start"
              className="inline-flex items-center gap-2 bg-[#238636] text-white px-8 py-4 rounded font-medium hover:bg-[#2ea043] transition-colors"
            >
              <Terminal className="w-4 h-4" />
              Initialize Project
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
