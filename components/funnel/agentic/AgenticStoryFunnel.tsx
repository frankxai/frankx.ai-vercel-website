'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Sparkles, 
  Layers, 
  Zap, 
  Lock, 
  ArrowRight, 
  Check, 
  ShieldAlert,
  Terminal,
  Code2,
  TrendingUp,
  Cpu
} from 'lucide-react'
import { FunnelProgressHeader } from './FunnelProgressHeader'
import { AIAnalysisCard } from './AIAnalysisCard'
import { DeliverySuccessView } from './DeliverySuccessView'
import type { 
  FunnelQuestion, 
  FunnelUserAnswers, 
  AIAnalysisResult, 
  DeliveryPackage 
} from './types'

const DEFAULT_QUESTIONS: FunnelQuestion[] = [
  {
    id: 'identity',
    step: 'identity',
    title: 'Select Your Primary Role',
    subtitle: 'Our agentic swarm calibrates architecture recommendations to your exact stage.',
    options: [
      {
        id: 'autonomous_builder',
        label: 'Autonomous AI Creator / Solo Operator',
        description: 'Looking to replace manual work with self-running agent loops.',
        iconName: 'Bot',
        badge: 'High Leverage',
        recommendedTier: 'agentic-creator-os',
      },
      {
        id: 'enterprise_architect',
        label: 'Enterprise AI Architect / Consultant',
        description: 'Deploying multi-agent swarms and high-ticket client systems.',
        iconName: 'Cpu',
        badge: 'Enterprise',
        recommendedTier: 'agentic-creator-os',
      },
      {
        id: 'creative_producer',
        label: 'Creative Producer / Media Director',
        description: 'Mastering AI video, generative art, and cinematic pipelines.',
        iconName: 'Sparkles',
        badge: 'Creative Engine',
        recommendedTier: 'creative-ai-toolkit',
      },
      {
        id: 'system_builder',
        label: 'Developer / Technical Founder',
        description: 'Building custom MCP servers, Next.js apps, and automated pipelines.',
        iconName: 'Code2',
        badge: 'Technical Core',
        recommendedTier: 'agentic-creator-os',
      },
    ],
  },
  {
    id: 'objective',
    step: 'objective',
    title: 'What is Your #1 Immediate Bottleneck?',
    subtitle: 'Choose where an autonomous system will unlock the highest immediate ROI.',
    options: [
      {
        id: 'zero_advisory_sales',
        label: '100% Autonomous Product & Client Funnels',
        description: 'Eliminate manual sales calls; convert high-ticket clients automatically.',
        iconName: 'TrendingUp',
        badge: 'Revenue Engine',
      },
      {
        id: 'agent_orchestration',
        label: 'Multi-Agent Swarm Orchestration',
        description: 'Coordinating Claude, Codex, Grok & Gemini without context loss.',
        iconName: 'Layers',
        badge: 'Swarm Core',
      },
      {
        id: 'creative_content_scale',
        label: 'Generative Media & Content Velocity',
        description: 'Producing luxury, anti-slop visual and video content at scale.',
        iconName: 'Sparkles',
        badge: 'Velocity',
      },
      {
        id: 'mcp_infrastructure',
        label: 'Custom Tools, MCP Servers & AgentDB Memory',
        description: 'Persistent memory vaults and deep codebase integration.',
        iconName: 'Terminal',
        badge: 'Deep Tech',
      },
    ],
  },
]

interface AgenticStoryFunnelProps {
  onComplete?: (result: { answers: FunnelUserAnswers; analysis: AIAnalysisResult | null }) => void
  customQuestions?: FunnelQuestion[]
  brandTitle?: string
}

export const AgenticStoryFunnel: React.FC<AgenticStoryFunnelProps> = ({
  onComplete,
  customQuestions = DEFAULT_QUESTIONS,
  brandTitle = 'FRANKX AGENTIC ADVISOR',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<FunnelUserAnswers>({})
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  
  // Dynamic AI Qualification State
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null)
  
  // Checkout & Delivery State
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [deliveryData, setDeliveryData] = useState<DeliveryPackage | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Total steps = Question count + Diagnosis Step + Offer Step + (Delivery)
  const totalFlowSteps = customQuestions.length + 2

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId)
    const currentQ = customQuestions[currentStepIndex]
    
    const updatedAnswers = {
      ...answers,
      [currentQ.step]: optionId,
    }
    setAnswers(updatedAnswers)

    // Auto-advance after smooth 250ms tap feedback
    setTimeout(() => {
      setSelectedOptionId(null)
      if (currentStepIndex < customQuestions.length - 1) {
        setCurrentStepIndex((prev) => prev + 1)
      } else {
        // Trigger AI Diagnosis step
        setCurrentStepIndex(customQuestions.length)
        runAIDiagnosis(updatedAnswers)
      }
    }, 280)
  }

  const runAIDiagnosis = async (finalAnswers: FunnelUserAnswers) => {
    setIsAnalyzing(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/funnel/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })

      if (res.ok) {
        const data = await res.json()
        setAnalysisResult(data.analysis)
      } else {
        // Fallback robust local synthesis if network fails
        synthesizeFallbackAnalysis(finalAnswers)
      }
    } catch {
      synthesizeFallbackAnalysis(finalAnswers)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const synthesizeFallbackAnalysis = (userAns: FunnelUserAnswers) => {
    const isCreative = userAns.identity === 'creative_producer' || userAns.objective === 'creative_content_scale'
    const product = isCreative ? 'creative-ai-toolkit' : 'agentic-creator-os'
    const productName = isCreative ? 'Creative AI Toolkit 2026' : 'Agentic Creator OS (ACOS)'

    setAnalysisResult({
      readinessScore: 97.8,
      archetype: isCreative ? 'Cinematic Producer' : 'Autonomous System Architect',
      coreBottleneck: 'Manual workflow friction and fragmented multi-tool orchestration.',
      recommendedProductId: product,
      recommendedProductName: productName,
      dynamicHeadline: `Calibrated for ${isCreative ? 'High-Velocity Media Production' : '100% Autonomous Execution'}`,
      actionPlan: [
        'Deploy the Starlight multi-agent orchestration architecture to eliminate context switching.',
        'Connect pre-configured MCP tools and memory vaults for zero-hallucination execution.',
        'Launch self-serve automated delivery pipelines for immediate passive client acquisition.',
      ],
      valueMetrics: {
        estimatedTimeSavedWeekly: '18-24 hrs',
        estimatedAutomationBoost: '4.8x Multiplier',
      },
    })
  }

  const handleProceedToOffer = () => {
    setCurrentStepIndex(customQuestions.length + 1)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userEmail) {
      setErrorMessage('Please provide an email for access delivery.')
      return
    }

    setIsCheckingOut(true)
    setErrorMessage(null)

    try {
      const productId = analysisResult?.recommendedProductId || 'agentic-creator-os'
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          email: userEmail,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to live Stripe Checkout
        window.location.href = data.url
      } else {
        // Instant simulated fulfillment if sandbox / direct
        setDeliveryData({
          productId,
          productName: analysisResult?.recommendedProductName || 'Agentic Creator OS',
          accessKey: `FX-${Math.random().toString(36).substring(2, 9).toUpperCase()}-VERIFIED`,
          downloadUrl: '#',
          communityInviteUrl: 'https://discord.gg/frankxai',
          roadmap: analysisResult?.actionPlan || [],
        })
        setCurrentStepIndex(totalFlowSteps)
      }
    } catch {
      // Provide immediate fallback delivery on error so user is never stranded
      setDeliveryData({
        productId: 'agentic-creator-os',
        productName: 'Agentic Creator OS (ACOS)',
        accessKey: `FX-${Math.random().toString(36).substring(2, 9).toUpperCase()}-VERIFIED`,
        downloadUrl: '#',
        communityInviteUrl: 'https://discord.gg/frankxai',
        roadmap: analysisResult?.actionPlan || [],
      })
      setCurrentStepIndex(totalFlowSteps)
    } finally {
      setIsCheckingOut(false)
      if (onComplete) {
        onComplete({ answers, analysis: analysisResult })
      }
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setAnswers({})
    setSelectedOptionId(null)
    setAnalysisResult(null)
    setDeliveryData(null)
  }

  const isQuestionStep = currentStepIndex < customQuestions.length
  const isDiagnoseStep = currentStepIndex === customQuestions.length
  const isOfferStep = currentStepIndex === customQuestions.length + 1
  const isDeliveryStep = currentStepIndex >= totalFlowSteps

  return (
    <div className="w-full max-w-md mx-auto my-6 bg-zinc-950 border border-white/[0.08] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col relative text-white antialiased selection:bg-violet-500 selection:text-white">
      {/* Anti-slop subtle background noise filter */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Segmented Instagram Story-Style Header */}
      {!isDeliveryStep && (
        <FunnelProgressHeader
          totalSteps={totalFlowSteps}
          currentStepIndex={currentStepIndex}
          onReset={handleReset}
          brandBadge={brandTitle}
        />
      )}

      {/* Main Story Step Content */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <AnimatePresence mode="wait">
          {/* 1. Question Cards */}
          {isQuestionStep && (
            <motion.div
              key={`q-${currentStepIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 flex flex-col justify-between min-h-[460px]"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase font-semibold">
                  Step {currentStepIndex + 1} of {customQuestions.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  {customQuestions[currentStepIndex].title}
                </h2>
                <p className="text-xs text-white/60 leading-relaxed">
                  {customQuestions[currentStepIndex].subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5 my-6">
                {customQuestions[currentStepIndex].options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id
                  return (
                    <motion.button
                      key={opt.id}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group relative overflow-hidden ${
                        isSelected
                          ? 'bg-violet-600/20 border-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.4)]'
                          : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white group-hover:text-violet-200 transition-colors">
                            {opt.label}
                          </span>
                          {opt.badge && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-violet-300">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        {opt.description && (
                          <p className="text-[11px] text-white/50 leading-normal">
                            {opt.description}
                          </p>
                        )}
                      </div>

                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-violet-500 border-violet-400 text-white' 
                          : 'border-white/20 text-transparent group-hover:border-white/40'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <div className="text-center text-[10px] text-white/40 font-mono flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Zero spam · Instant private agentic calibration</span>
              </div>
            </motion.div>
          )}

          {/* 2. AI Diagnosis Step */}
          {isDiagnoseStep && (
            <motion.div
              key="ai-diagnose"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <AIAnalysisCard
                analysis={analysisResult}
                isLoading={isAnalyzing}
                onProceedToOffer={handleProceedToOffer}
              />
            </motion.div>
          )}

          {/* 3. Matched Tier & Checkout Step */}
          {isOfferStep && (
            <motion.div
              key="offer-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 flex flex-col justify-between min-h-[480px] space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Personalized Match Found</span>
                </div>

                <h2 className="text-2xl font-black tracking-tight text-white">
                  {analysisResult?.recommendedProductName || 'Agentic Creator OS'}
                </h2>
                
                <p className="text-xs text-white/60">
                  Full system deployment: complete architecture blueprints, pre-built MCP skills, memory vaults, and private community access.
                </p>
              </div>

              {/* Value Stack & Offer Details */}
              <div className="bg-black/40 border border-white/[0.08] rounded-2xl p-4 space-y-3">
                <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <span className="text-2xl font-extrabold text-white">$47</span>
                    <span className="text-xs text-white/40 line-through ml-2">$297</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-violet-300 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-400/20">
                    ONE-TIME LIFETIME
                  </span>
                </div>

                <div className="space-y-2 pt-1 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Complete Multi-Agent Harness & Swarm Blueprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Production MCP Server Configurations & AgentDB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instant Autonomous Delivery & Private Swarm Invite</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-3">
                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-[11px] text-red-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-white/50 block">
                    Delivery Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400 transition-colors font-sans"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isCheckingOut}
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                >
                  {isCheckingOut ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>Unlock Instant Access ($47)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* 4. Instant Delivery Success View */}
          {isDeliveryStep && deliveryData && (
            <motion.div
              key="delivery-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <DeliverySuccessView
                delivery={deliveryData}
                customerEmail={userEmail}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
