/**
 * v0-generated variant: AI Academy
 * Generated: 2026-02-08 via v0-1.5-lg with extended thinking
 * Chat: kmqMZu6QQHA
 * Demo: https://demo-kzmqdniz3r3vtbckv0w2.vusercontent.net
 * Source file: app/ai-architect-academy/page.tsx
 * 
 * Reference design — adapt best patterns to production codebase.
 */

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Target, 
  Layers, 
  Rocket,
  CheckCircle2,
  Mail
} from 'lucide-react'

// Animated constellation background component
function ConstellationBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43BFE3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#AB47C7" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Animated constellation lines */}
        {[...Array(15)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#constellation-gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Constellation nodes */}
        {[...Array(30)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="2"
            fill="#43BFE3"
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function AcademyPage() {
  const [email, setEmail] = useState('')

  const learningPaths = [
    {
      title: 'Foundations',
      color: 'emerald',
      description: 'AI basics, prompt engineering, tool selection',
      icon: BookOpen,
      progress: 0
    },
    {
      title: 'Architecture',
      color: 'cyan',
      description: 'System design, multi-agent patterns, orchestration',
      icon: Layers,
      progress: 0
    },
    {
      title: 'Production',
      color: 'purple',
      description: 'Deployment, monitoring, scaling, enterprise patterns',
      icon: Rocket,
      progress: 0
    }
  ]

  const curriculum = [
    {
      module: 'AI Fundamentals',
      lessons: 5,
      duration: '2h 30m',
      difficulty: 'Beginner'
    },
    {
      module: 'Prompt Engineering',
      lessons: 4,
      duration: '2h',
      difficulty: 'Beginner'
    },
    {
      module: 'Agent Architecture',
      lessons: 6,
      duration: '3h 15m',
      difficulty: 'Intermediate'
    },
    {
      module: 'Multi-Agent Systems',
      lessons: 5,
      duration: '2h 45m',
      difficulty: 'Intermediate'
    },
    {
      module: 'Production Deployment',
      lessons: 4,
      duration: '2h 20m',
      difficulty: 'Advanced'
    },
    {
      module: 'Enterprise Patterns',
      lessons: 5,
      duration: '3h',
      difficulty: 'Advanced'
    }
  ]

  const outcomes = [
    {
      title: 'Production AI Agents',
      description: 'Build autonomous agents that solve real business problems',
      icon: Sparkles
    },
    {
      title: 'Multi-Agent Orchestration',
      description: 'Coordinate multiple specialized agents working together',
      icon: Layers
    },
    {
      title: 'Enterprise RAG Systems',
      description: 'Implement retrieval-augmented generation at scale',
      icon: Target
    },
    {
      title: 'Agentic Workflows',
      description: 'Design intelligent workflows that adapt and learn',
      icon: Rocket
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ConstellationBackground />
        
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge className="mb-6 px-4 py-2 text-sm bg-cyan/10 text-cyan border-cyan/20">
                {'🎓 Welcome to Academy'}
              </Badge>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-cyan via-cyan to-purple bg-clip-text text-transparent">
                {'AI Architect Academy'}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              {'Master the art of building production AI systems'}
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button size="lg" className="bg-cyan hover:bg-cyan/90 text-background">
                {'Start Learning — Free'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-cyan/30 hover:bg-cyan/10 bg-transparent">
                {'View Curriculum'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {'Choose Your Path'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {'Three comprehensive learning tracks to master AI architecture'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {learningPaths.map((path, index) => {
              const Icon = path.icon
              const colorClasses = {
                emerald: 'from-emerald/20 to-emerald/5 border-emerald/30',
                cyan: 'from-cyan/20 to-cyan/5 border-cyan/30',
                purple: 'from-purple/20 to-purple/5 border-purple/30'
              }
              
              return (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={`h-full bg-gradient-to-br ${colorClasses[path.color as keyof typeof colorClasses]} backdrop-blur-sm border hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-${path.color}/20 flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 text-${path.color}`} />
                      </div>
                      <CardTitle className="text-2xl">{path.title}</CardTitle>
                      <CardDescription className="text-base">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{'Progress'}</span>
                          <span>{path.progress}{'%'}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-${path.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${path.progress}%` }}
                            transition={{ delay: 0.5, duration: 1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Overview Section */}
      <section className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {'Comprehensive Curriculum'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {'29 lessons across 6 modules — from fundamentals to enterprise patterns'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {curriculum.map((item, index) => {
                const difficultyColors = {
                  'Beginner': 'bg-emerald/10 text-emerald border-emerald/30',
                  'Intermediate': 'bg-cyan/10 text-cyan border-cyan/30',
                  'Advanced': 'bg-purple/10 text-purple border-purple/30'
                }
                
                return (
                  <AccordionItem 
                    key={index} 
                    value={`module-${index}`}
                    className="border border-border/50 rounded-lg px-6 bg-card/30 backdrop-blur-sm"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left w-full">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {'Module '}{index + 1}{': '}{item.module}
                          </h3>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              <BookOpen className="mr-1 h-3 w-3" />
                              {item.lessons}{' lessons'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              {item.duration}
                            </Badge>
                            <Badge className={`text-xs ${difficultyColors[item.difficulty as keyof typeof difficultyColors]}`}>
                              {item.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <div className="space-y-2 text-muted-foreground">
                        <p>{'Detailed lessons covering:'}</p>
                        <ul className="space-y-2 ml-4">
                          {[...Array(item.lessons)].map((_, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-cyan mr-2 mt-0.5 flex-shrink-0" />
                              <span>{'Lesson '}{i + 1}{' content and exercises'}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-purple/10 via-card/50 to-cyan/10 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-3xl font-bold">
                    {'F'}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">
                      {'Meet Your Instructor'}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {'Frank — AI Architect with enterprise experience at Oracle, creator of ACOS'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan mb-1">{'500+'}</div>
                    <div className="text-sm text-muted-foreground">{'AI Songs Created'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple mb-1">{'40+'}</div>
                    <div className="text-sm text-muted-foreground">{'Agents Built'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald mb-1">{'70+'}</div>
                    <div className="text-sm text-muted-foreground">{'Articles Published'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Student Outcomes Section */}
      <section className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {'What You\'ll Be Able to Build'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {'Real-world AI systems that drive business value'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon
              return (
                <motion.div
                  key={outcome.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-card/50">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-cyan/20 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan" />
                      </div>
                      <CardTitle className="text-xl">{outcome.title}</CardTitle>
                      <CardDescription>
                        {outcome.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-cyan/10 via-purple/10 to-emerald/10 backdrop-blur-sm border-cyan/30">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl md:text-5xl font-bold mb-4">
                  {'Start Your Journey'}
                </CardTitle>
                <CardDescription className="text-lg">
                  {'Join the Academy and begin building production AI systems today. Free tier available.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50"
                      />
                    </div>
                    <Button size="lg" className="bg-cyan hover:bg-cyan/90 text-background">
                      {'Get Started Free'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {'No credit card required. Start learning immediately.'}
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
