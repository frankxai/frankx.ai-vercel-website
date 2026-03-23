'use client'

import { motion } from 'framer-motion'
import { Beaker, Calendar, PlayCircle, Download, ArrowRight, Users, Clock, Video, Sparkles, Code2, Brain, Zap, CheckCircle2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const stats = [
  { label: 'Labs Completed', value: '12' },
  { label: 'Attendees', value: '200+' },
  { label: 'Replay Access', value: '48h' }
]

const labFormats = [
  {
    icon: Code2,
    title: 'Live Build Labs',
    description: 'Co-working sessions where we build real products together in real-time',
    color: 'from-[#AB47C7] to-[#8B2FAC]',
    borderColor: 'border-[#AB47C7]/30',
    iconColor: 'text-[#AB47C7]'
  },
  {
    icon: Sparkles,
    title: 'Ritual Labs',
    description: 'Monthly momentum sessions to keep your projects moving forward',
    color: 'from-[#43BFE3] to-[#2D9FC3]',
    borderColor: 'border-[#43BFE3]/30',
    iconColor: 'text-[#43BFE3]'
  },
  {
    icon: Brain,
    title: 'Agent Deep Dives',
    description: 'Master Claude, Codex, and Gemini workflows with hands-on exploration',
    color: 'from-[#F59E0B] to-[#D97706]',
    borderColor: 'border-[#F59E0B]/30',
    iconColor: 'text-[#F59E0B]'
  }
]

const labFlow = [
  {
    phase: 'Before',
    icon: Download,
    title: 'Pre-Lab Brief',
    description: 'Get the context, setup requirements, and what we\'ll build',
    color: 'text-[#43BFE3]'
  },
  {
    phase: 'During',
    icon: Zap,
    title: 'Live Build',
    description: 'Real-time co-working with live problem-solving and collaboration',
    color: 'text-[#AB47C7]'
  },
  {
    phase: 'After',
    icon: CheckCircle2,
    title: 'Replay + Checklist',
    description: '48h replay access with implementation checklist to continue building',
    color: 'text-[#F59E0B]'
  }
]

const upcomingLabs = [
  {
    id: 1,
    type: 'Live Build Lab',
    title: 'Building AI Agents with Claude',
    date: 'Feb 15, 2026',
    time: '2:00 PM PST',
    duration: '2 hours',
    spots: 8,
    typeColor: 'bg-[#AB47C7]/10 text-[#AB47C7] border-[#AB47C7]/30'
  },
  {
    id: 2,
    type: 'Ritual Lab',
    title: 'Monthly Momentum Check-in',
    date: 'Feb 20, 2026',
    time: '10:00 AM PST',
    duration: '90 mins',
    spots: 12,
    typeColor: 'bg-[#43BFE3]/10 text-[#43BFE3] border-[#43BFE3]/30'
  },
  {
    id: 3,
    type: 'Agent Deep Dive',
    title: 'Gemini API Deep Dive',
    date: 'Feb 28, 2026',
    time: '1:00 PM PST',
    duration: '2.5 hours',
    spots: 6,
    typeColor: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
  }
]

const pastLabs = [
  {
    id: 1,
    title: 'Building RAG Systems from Scratch',
    date: 'Jan 28, 2026',
    thumbnail: '/placeholder.svg?height=400&width=600',
    duration: '2h 15m',
    attendees: 24
  },
  {
    id: 2,
    title: 'Advanced Prompt Engineering Workshop',
    date: 'Jan 15, 2026',
    thumbnail: '/placeholder.svg?height=400&width=600',
    duration: '1h 45m',
    attendees: 32
  },
  {
    id: 3,
    title: 'Building with Vercel AI SDK',
    date: 'Jan 8, 2026',
    thumbnail: '/placeholder.svg?height=400&width=600',
    duration: '2h 30m',
    attendees: 28
  },
  {
    id: 4,
    title: 'LangChain Production Patterns',
    date: 'Dec 20, 2025',
    thumbnail: '/placeholder.svg?height=400&width=600',
    duration: '2h',
    attendees: 19
  }
]

export default function LabsPage() {
  const [email, setEmail] = useState('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#AB47C7]/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#43BFE3]/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center max-w-4xl mx-auto" variants={itemVariants}>
            {/* Animated Beaker Icon */}
            <motion.div
              className="inline-flex items-center justify-center mb-8"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-[#AB47C7]/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Beaker className="w-20 h-20 text-[#AB47C7] relative z-10" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              FrankX <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] bg-clip-text text-transparent">Labs</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 text-balance leading-relaxed">
              {'Live build sessions, ritual labs, and agent deep dives for AI builders who ship.'}
            </p>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Lab Formats */}
        <motion.section
          className="container mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            {'Lab Formats'}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {labFormats.map((format, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border ${format.borderColor} p-8 h-full hover:shadow-2xl hover:shadow-[#AB47C7]/10 transition-all duration-500 group hover:-translate-y-2`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <format.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{format.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{format.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Lab Flow */}
        <motion.section
          className="container mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            {'How Labs Work'}
          </motion.h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#43BFE3] via-[#AB47C7] to-[#F59E0B] -translate-y-1/2 hidden md:block" />
              
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {labFlow.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    <Card className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-white/10 p-8 text-center hover:shadow-2xl hover:shadow-[#AB47C7]/10 transition-all duration-500 hover:-translate-y-2">
                      <Badge className={`${step.color} bg-transparent border mb-4`}>
                        {step.phase}
                      </Badge>
                      
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-4">
                        <step.icon className={`w-8 h-8 ${step.color}`} strokeWidth={2} />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Upcoming Labs Timeline */}
        <motion.section
          className="container mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            variants={itemVariants}
          >
            {'Upcoming Labs'}
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-center mb-12 text-lg"
            variants={itemVariants}
          >
            {'Reserve your spot and join the next session'}
          </motion.p>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-white/10 p-6 hover:border-[#AB47C7]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#AB47C7]/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge className={`${lab.typeColor} border`}>
                          {lab.type}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {lab.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lab.time}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{lab.title}</h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{lab.duration}</span>
                        <span className="text-[#10B981]">{lab.spots} spots left</span>
                      </div>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-[#AB47C7] to-[#8B2FAC] hover:from-[#8B2FAC] hover:to-[#AB47C7] text-white border-0 shadow-lg shadow-[#AB47C7]/20 whitespace-nowrap">
                      {'Register Now'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Past Labs Archive */}
        <motion.section
          className="container mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            variants={itemVariants}
          >
            {'Past Labs Archive'}
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-center mb-12 text-lg"
            variants={itemVariants}
          >
            {'Watch replays and catch up on what you missed'}
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {pastLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                variants={itemVariants}
              >
                <Card className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-[#43BFE3]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#43BFE3]/10 hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#AB47C7]/20 to-[#43BFE3]/20">
                    <img 
                      src={lab.thumbnail || "/placeholder.svg"} 
                      alt={lab.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{lab.date}</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#43BFE3] transition-colors duration-300">
                      {lab.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        {lab.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {lab.attendees} attended
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Registration CTA */}
        <motion.section
          className="container mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <Card className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-md border border-white/10 p-12 text-center relative overflow-hidden">
              {/* Animated Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/10 via-[#43BFE3]/10 to-[#F59E0B]/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {'Join the Next Lab'}
                </h2>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  {'Get early access to upcoming labs, exclusive resources, and the FrankX builder community.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500 focus:border-[#AB47C7] focus-visible:ring-[#AB47C7]/50"
                  />
                  <Button className="bg-gradient-to-r from-[#AB47C7] to-[#8B2FAC] hover:from-[#8B2FAC] hover:to-[#AB47C7] text-white border-0 shadow-lg shadow-[#AB47C7]/30 whitespace-nowrap px-8">
                    {'Get Access'}
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-6">
                  {'No spam. Unsubscribe anytime. Premium content for serious builders.'}
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
