/**
 * v0-generated variant: About Page
 * Generated: 2026-02-08 via v0-1.5-lg with extended thinking
 * Chat: vf8toBMjzWP
 * Demo: https://demo-kzmjven0djm9woxa21xi.vusercontent.net
 * Source file: app/about/page.tsx
 * 
 * Reference design — adapt best patterns to production codebase.
 */

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Twitter, Mail, FileText } from 'lucide-react'

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end])

  return (
    <div ref={ref}>
      <span className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        {count}
        {suffix}
      </span>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              background:
                'radial-gradient(circle at 30% 30%, oklch(0.578 0.207 307.72 / 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, oklch(0.714 0.107 222.64 / 0.3) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            Frank
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-muted-foreground font-light tracking-wide"
          >
            AI Architect. Creator. Builder.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* The Story Section */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold text-balance">I build AI systems that actually work.</h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At Oracle, I architect enterprise AI systems that handle production workloads at scale.
                The kind of systems where reliability isn't optional and every decision matters. I've
                learned that great AI isn't about flashy demos — it's about building something people can
                depend on every single day.
              </p>

              <p>
                Beyond the enterprise world, I create. Over 500 AI-generated songs exploring the
                intersection of technology and art. Digital products that solve real problems. Each
                project is an experiment in pushing the boundaries of what's possible when you combine
                technical precision with creative vision.
              </p>

              <p>
                I build tools that others use: frankx.ai, ACOS, and various open-source projects. I
                write to share what I learn — 70+ articles breaking down AI architecture, patterns, and
                real-world lessons. The goal is simple: make complex things understandable and share the
                knowledge freely.
              </p>

              <p>
                This is the intersection where enterprise rigor meets creative experimentation. Where
                production systems inform artistic projects, and creative thinking shapes technical
                solutions. No buzzwords. No hype. Just building things that matter.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* By The Numbers Section */}
      <section className="py-32 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-20"
          >
            By The Numbers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: '+', label: 'AI Songs' },
              { value: 40, suffix: '+', label: 'AI Agents' },
              { value: 70, suffix: '+', label: 'Articles' },
              { value: 630, suffix: '+', label: 'Skills Built' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-xl text-muted-foreground mt-4">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Believe Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-20"
          >
            What I Believe
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Build what matters',
                description:
                  'Ship real things. Results over philosophy. The best ideas mean nothing without execution. Focus on creating value that people can actually use.',
                gradient: 'from-primary/20 to-primary/5',
              },
              {
                title: 'Excellence in craft',
                description:
                  'Every detail counts. No shortcuts. Quality compounds over time. Whether it\'s code, design, or content — do it right or don\'t do it at all.',
                gradient: 'from-accent/20 to-accent/5',
              },
              {
                title: 'Share the knowledge',
                description:
                  'Open source. Free tools. Public research. Learning happens in public. When you share what you know, everyone wins. Build in the open, learn together.',
                gradient: 'from-chart-3/20 to-chart-3/5',
              },
            ].map((belief, i) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card
                  className={`p-8 h-full bg-gradient-to-br ${belief.gradient} backdrop-blur-sm border-border/50 hover:border-border transition-colors`}
                >
                  <h3 className="text-2xl font-bold mb-4">{belief.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{belief.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      <section className="py-32 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-20"
          >
            What I'm Working On Now
          </motion.h2>

          <div className="space-y-4">
            {[
              { name: 'ACOS v7', status: 'active', color: 'emerald' },
              { name: 'Research Hub', status: 'active', color: 'emerald' },
              { name: 'AI Architect Academy', status: 'building', color: 'accent' },
              { name: 'Inner Circle', status: 'coming soon', color: 'muted' },
            ].map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <Badge
                      variant="secondary"
                      className={
                        project.status === 'active'
                          ? 'bg-chart-4/20 text-chart-4 border-chart-4/30'
                          : project.status === 'building'
                            ? 'bg-accent/20 text-accent border-accent/30'
                            : 'bg-muted/50 text-muted-foreground border-border/30'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-20"
          >
            Connect
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Github,
                label: 'GitHub',
                href: 'https://github.com/frankx',
                description: 'Open source projects',
              },
              {
                icon: Twitter,
                label: 'Twitter / X',
                href: 'https://twitter.com/frankx',
                description: 'Thoughts and updates',
              },
              {
                icon: FileText,
                label: 'Blog',
                href: 'https://frankx.ai/blog',
                description: 'Articles and research',
              },
              {
                icon: Mail,
                label: 'Email',
                href: 'mailto:frank@frankx.ai',
                description: 'Get in touch',
              },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="block"
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/70 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{link.label}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-24" />
    </main>
  )
}
