'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  BarChart3,
  Download,
  Share2,
  ArrowRight,
  Info,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
  Brain,
  Shield
} from 'lucide-react'

import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import {
  StaggerContainer,
  StaggerItem,
  RevealAnimation,
  GlowPulse
} from '@/components/ui/AdvancedAnimations'

type CalculatorInputs = {
  // Cost Inputs
  implementationCost: number
  monthlyToolCosts: number
  trainingCosts: number
  maintenanceCosts: number
  teamSize: number
  averageSalary: number

  // Benefit Inputs
  timeSavingsPercent: number
  qualityImprovementPercent: number
  errorReductionPercent: number
  revenueIncreasePercent: number
  customerSatisfactionImprovement: number

  // Timeline
  implementationMonths: number
  evaluationPeriodYears: number
}

type ROIResults = {
  totalInvestment: number
  totalBenefits: number
  netBenefit: number
  roiPercentage: number
  paybackMonths: number
  breakEvenMonth: number
  yearlyBenefits: number[]
  yearlyInvestments: number[]
  riskScore: number
  confidenceLevel: number
}

const defaultInputs: CalculatorInputs = {
  implementationCost: 50000,
  monthlyToolCosts: 2000,
  trainingCosts: 15000,
  maintenanceCosts: 1000,
  teamSize: 10,
  averageSalary: 75000,
  timeSavingsPercent: 20,
  qualityImprovementPercent: 15,
  errorReductionPercent: 30,
  revenueIncreasePercent: 10,
  customerSatisfactionImprovement: 25,
  implementationMonths: 3,
  evaluationPeriodYears: 3
}

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs)
  const [results, setResults] = useState<ROIResults | null>(null)
  const [activeTab, setActiveTab] = useState<'calculator' | 'results' | 'report'>('calculator')

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const calculateROI = useCallback((): ROIResults => {
    const {
      implementationCost,
      monthlyToolCosts,
      trainingCosts,
      maintenanceCosts,
      teamSize,
      averageSalary,
      timeSavingsPercent,
      qualityImprovementPercent,
      errorReductionPercent,
      revenueIncreasePercent,
      customerSatisfactionImprovement,
      implementationMonths,
      evaluationPeriodYears
    } = inputs

    // Calculate total investment
    const totalMonths = evaluationPeriodYears * 12
    const totalToolCosts = monthlyToolCosts * totalMonths
    const totalMaintenanceCosts = maintenanceCosts * totalMonths
    const totalInvestment = implementationCost + totalToolCosts + trainingCosts + totalMaintenanceCosts

    // Calculate annual benefits
    const annualSalaryCosts = teamSize * averageSalary
    const timeSavingsBenefit = annualSalaryCosts * (timeSavingsPercent / 100)

    // Quality improvements (estimated as productivity gains)
    const qualityBenefit = annualSalaryCosts * (qualityImprovementPercent / 100) * 0.5

    // Error reduction (estimated cost of errors)
    const errorCostReduction = annualSalaryCosts * 0.1 * (errorReductionPercent / 100)

    // Revenue increase (conservative estimate)
    const assumedRevenue = annualSalaryCosts * 3 // 3x salary as revenue contribution
    const revenueBenefit = assumedRevenue * (revenueIncreasePercent / 100)

    // Customer satisfaction (estimated business impact)
    const customerBenefit = assumedRevenue * 0.05 * (customerSatisfactionImprovement / 100)

    const totalAnnualBenefits = timeSavingsBenefit + qualityBenefit + errorCostReduction + revenueBenefit + customerBenefit
    const totalBenefits = totalAnnualBenefits * evaluationPeriodYears

    // Calculate metrics
    const netBenefit = totalBenefits - totalInvestment
    const roiPercentage = (netBenefit / totalInvestment) * 100

    // Calculate payback period
    const monthlyBenefits = totalAnnualBenefits / 12
    const monthlyInvestment = totalInvestment / totalMonths
    const netMonthlyBenefit = monthlyBenefits - monthlyInvestment
    const paybackMonths = netMonthlyBenefit > 0 ? totalInvestment / monthlyBenefits : totalMonths

    // Calculate break-even point
    const breakEvenMonth = implementationMonths + paybackMonths

    // Risk assessment
    const riskFactors = [
      timeSavingsPercent > 50 ? 0.2 : 0,
      revenueIncreasePercent > 25 ? 0.15 : 0,
      teamSize < 5 ? 0.1 : 0,
      implementationMonths > 6 ? 0.1 : 0,
      monthlyToolCosts > averageSalary * teamSize * 0.1 ? 0.1 : 0
    ]
    const riskScore = Math.min(1, riskFactors.reduce((a, b) => a + b, 0))

    // Confidence level (inverse of risk)
    const confidenceLevel = Math.max(0.5, 1 - riskScore)

    // Year-by-year breakdown
    const yearlyBenefits: number[] = []
    const yearlyInvestments: number[] = []

    for (let year = 0; year < evaluationPeriodYears; year++) {
      yearlyBenefits.push(totalAnnualBenefits)
      const yearInvestment = year === 0
        ? implementationCost + trainingCosts + (monthlyToolCosts + maintenanceCosts) * 12
        : (monthlyToolCosts + maintenanceCosts) * 12
      yearlyInvestments.push(yearInvestment)
    }

    return {
      totalInvestment,
      totalBenefits,
      netBenefit,
      roiPercentage,
      paybackMonths,
      breakEvenMonth,
      yearlyBenefits,
      yearlyInvestments,
      riskScore,
      confidenceLevel
    }
  }, [inputs])

  useEffect(() => {
    setResults(calculateROI())
  }, [calculateROI])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getROIColor = (roi: number) => {
    if (roi >= 200) return 'text-green-400'
    if (roi >= 100) return 'text-yellow-400'
    if (roi >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const getRiskLevel = (score: number) => {
    if (score <= 0.2) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (score <= 0.5) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  return (
    <div className="min-h-screen bg-void text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <StaggerContainer>
          <StaggerItem>
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.6)]">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-green-200 to-slate-300 bg-clip-text text-transparent">
                AI ROI Calculator
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Calculate the return on investment for your AI initiatives with comprehensive financial modeling and risk assessment.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300 mb-2">15 min</div>
                  <div className="text-slate-400 text-sm">Complete Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300 mb-2">97%</div>
                  <div className="text-slate-400 text-sm">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-2">5K+</div>
                  <div className="text-slate-400 text-sm">Calculations Run</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-300 mb-2">Free</div>
                  <div className="text-slate-400 text-sm">Executive Report</div>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Navigation Tabs */}
          <StaggerItem>
            <div className="flex justify-center mb-8">
              <div className="flex bg-slate-800/50 rounded-xl p-1">
                {[
                  { id: 'calculator', label: 'Calculator', icon: Calculator },
                  { id: 'results', label: 'Results', icon: BarChart3 },
                  { id: 'report', label: 'Report', icon: Download }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      'flex items-center px-6 py-3 rounded-lg transition-all duration-200',
                      activeTab === tab.id
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'text-slate-400 hover:text-slate-300'
                    )}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Inputs */}
            {activeTab === 'calculator' && (
              <>
                <div className="lg:col-span-2 space-y-8">
                  {/* Cost Inputs */}
                  <StaggerItem>
                    <GlassmorphicCard variant="premium" className="p-8">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-100">
                        <DollarSign className="w-6 h-6 mr-3 text-red-400" />
                        Investment Costs
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Initial Implementation Cost
                          </label>
                          <input
                            type="number"
                            value={inputs.implementationCost}
                            onChange={(e) => updateInput('implementationCost', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Monthly Tool Costs
                          </label>
                          <input
                            type="number"
                            value={inputs.monthlyToolCosts}
                            onChange={(e) => updateInput('monthlyToolCosts', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Training Costs
                          </label>
                          <input
                            type="number"
                            value={inputs.trainingCosts}
                            onChange={(e) => updateInput('trainingCosts', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Monthly Maintenance
                          </label>
                          <input
                            type="number"
                            value={inputs.maintenanceCosts}
                            onChange={(e) => updateInput('maintenanceCosts', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </StaggerItem>

                  {/* Team Information */}
                  <StaggerItem>
                    <GlassmorphicCard variant="premium" className="p-8">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-100">
                        <Users className="w-6 h-6 mr-3 text-blue-400" />
                        Team Information
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Team Size
                          </label>
                          <input
                            type="number"
                            value={inputs.teamSize}
                            onChange={(e) => updateInput('teamSize', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Average Annual Salary
                          </label>
                          <input
                            type="number"
                            value={inputs.averageSalary}
                            onChange={(e) => updateInput('averageSalary', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </StaggerItem>

                  {/* Benefit Projections */}
                  <StaggerItem>
                    <GlassmorphicCard variant="premium" className="p-8">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-100">
                        <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                        Expected Benefits
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Time Savings (%)
                          </label>
                          <input
                            type="number"
                            value={inputs.timeSavingsPercent}
                            onChange={(e) => updateInput('timeSavingsPercent', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Quality Improvement (%)
                          </label>
                          <input
                            type="number"
                            value={inputs.qualityImprovementPercent}
                            onChange={(e) => updateInput('qualityImprovementPercent', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Error Reduction (%)
                          </label>
                          <input
                            type="number"
                            value={inputs.errorReductionPercent}
                            onChange={(e) => updateInput('errorReductionPercent', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Revenue Increase (%)
                          </label>
                          <input
                            type="number"
                            value={inputs.revenueIncreasePercent}
                            onChange={(e) => updateInput('revenueIncreasePercent', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </StaggerItem>

                  {/* Timeline */}
                  <StaggerItem>
                    <GlassmorphicCard variant="premium" className="p-8">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-100">
                        <Clock className="w-6 h-6 mr-3 text-purple-400" />
                        Timeline
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Implementation Period (months)
                          </label>
                          <input
                            type="number"
                            value={inputs.implementationMonths}
                            onChange={(e) => updateInput('implementationMonths', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Evaluation Period (years)
                          </label>
                          <input
                            type="number"
                            value={inputs.evaluationPeriodYears}
                            onChange={(e) => updateInput('evaluationPeriodYears', Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </StaggerItem>
                </div>

                {/* Live Results Preview */}
                <div className="space-y-6">
                  <StaggerItem>
                    <GlassmorphicCard variant="luxury" className="p-8 sticky top-24">
                      <h3 className="text-xl font-semibold mb-6 text-slate-100">Live Results</h3>
                      {results && (
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className={cn('text-3xl font-bold mb-2', getROIColor(results.roiPercentage))}>
                              {formatPercent(results.roiPercentage)}
                            </div>
                            <div className="text-slate-400 text-sm">ROI</div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-lg font-semibold text-green-300 mb-1">
                                {formatCurrency(results.netBenefit)}
                              </div>
                              <div className="text-slate-400 text-xs">Net Benefit</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-yellow-300 mb-1">
                                {Math.round(results.paybackMonths)} mo
                              </div>
                              <div className="text-slate-400 text-xs">Payback Period</div>
                            </div>
                          </div>

                          <div className="border-t border-slate-700 pt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-slate-400">Investment</span>
                              <span className="text-red-300">{formatCurrency(results.totalInvestment)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-slate-400">Benefits</span>
                              <span className="text-green-300">{formatCurrency(results.totalBenefits)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-semibold">
                              <span className="text-slate-200">Net Result</span>
                              <span className={getROIColor(results.roiPercentage)}>
                                {formatCurrency(results.netBenefit)}
                              </span>
                            </div>
                          </div>

                          <div>
                            <PremiumButton
                              variant="luxury"
                              size="lg"
                              onClick={() => setActiveTab('results')}
                              className="w-full"
                            >
                              View Detailed Results
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </PremiumButton>
                          </div>
                        </div>
                      )}
                    </GlassmorphicCard>
                  </StaggerItem>
                </div>
              </>
            )}

            {/* Results View */}
            {activeTab === 'results' && results && (
              <div className="lg:col-span-3">
                <StaggerItem>
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Key Metrics */}
                    <div className="lg:col-span-2 space-y-8">
                      <GlassmorphicCard variant="luxury" className="p-8">
                        <h2 className="text-2xl font-semibold mb-8 text-slate-100">Key Metrics</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="text-center">
                            <div className={cn('text-4xl font-bold mb-3', getROIColor(results.roiPercentage))}>
                              {formatPercent(results.roiPercentage)}
                            </div>
                            <div className="text-slate-400 mb-2">Return on Investment</div>
                            <div className="text-xs text-slate-500">
                              {results.roiPercentage > 100 ? 'Excellent' :
                               results.roiPercentage > 50 ? 'Good' :
                               results.roiPercentage > 0 ? 'Positive' : 'Negative'} ROI
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-4xl font-bold text-green-300 mb-3">
                              {formatCurrency(results.netBenefit)}
                            </div>
                            <div className="text-slate-400 mb-2">Net Benefit</div>
                            <div className="text-xs text-slate-500">
                              Over {inputs.evaluationPeriodYears} years
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-300 mb-3">
                              {Math.round(results.paybackMonths)}
                            </div>
                            <div className="text-slate-400 mb-2">Payback (Months)</div>
                            <div className="text-xs text-slate-500">
                              {results.paybackMonths <= 12 ? 'Fast' :
                               results.paybackMonths <= 24 ? 'Moderate' : 'Slow'} recovery
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-4xl font-bold text-cyan-300 mb-3">
                              {formatPercent(results.confidenceLevel * 100)}
                            </div>
                            <div className="text-slate-400 mb-2">Confidence Level</div>
                            <div className="text-xs text-slate-500">
                              Based on risk assessment
                            </div>
                          </div>
                        </div>
                      </GlassmorphicCard>

                      {/* Investment Breakdown */}
                      <GlassmorphicCard variant="premium" className="p-8">
                        <h3 className="text-xl font-semibold mb-6 text-slate-100">Investment vs Benefits</h3>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-300">Total Investment</span>
                              <span className="text-red-300 font-semibold">{formatCurrency(results.totalInvestment)}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3">
                              <div className="bg-red-500 h-3 rounded-full" style={{ width: '100%' }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-300">Total Benefits</span>
                              <span className="text-green-300 font-semibold">{formatCurrency(results.totalBenefits)}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3">
                              <div
                                className="bg-green-500 h-3 rounded-full"
                                style={{
                                  width: `${Math.min(100, (results.totalBenefits / results.totalInvestment) * 100)}%`
                                }}
                              />
                            </div>
                          </div>

                          <div className="border-t border-slate-700 pt-4">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-200 font-semibold">Net Benefit</span>
                              <span className={cn('font-bold text-lg', getROIColor(results.roiPercentage))}>
                                {formatCurrency(results.netBenefit)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </GlassmorphicCard>
                    </div>

                    {/* Risk Assessment */}
                    <div className="space-y-8">
                      <GlassmorphicCard variant="premium" className="p-6">
                        <h3 className="text-lg font-semibold mb-6 text-slate-100 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                          Risk Assessment
                        </h3>
                        {(() => {
                          const risk = getRiskLevel(results.riskScore)
                          return (
                            <div className="text-center">
                              <div className={cn('text-2xl font-bold mb-3', risk.color)}>
                                {risk.level}
                              </div>
                              <div className="text-slate-400 mb-4">Risk Level</div>
                              <div className={cn('px-3 py-2 rounded-full text-sm', risk.bg, risk.color)}>
                                {formatPercent(results.riskScore * 100)} risk score
                              </div>
                            </div>
                          )
                        })()}
                      </GlassmorphicCard>

                      <GlassmorphicCard variant="premium" className="p-6">
                        <h3 className="text-lg font-semibold mb-6 text-slate-100">Key Insights</h3>
                        <div className="space-y-4 text-sm">
                          {results.roiPercentage > 200 && (
                            <div className="flex items-start gap-3">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">Exceptional ROI indicates strong business case</span>
                            </div>
                          )}
                          {results.paybackMonths <= 12 && (
                            <div className="flex items-start gap-3">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">Fast payback period reduces investment risk</span>
                            </div>
                          )}
                          {results.riskScore > 0.5 && (
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">Consider phased implementation to reduce risk</span>
                            </div>
                          )}
                          {inputs.timeSavingsPercent > 30 && (
                            <div className="flex items-start gap-3">
                              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">High time savings - ensure change management</span>
                            </div>
                          )}
                        </div>
                      </GlassmorphicCard>

                      <GlassmorphicCard variant="premium" className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-slate-100">Actions</h3>
                        <div className="space-y-3">
                          <PremiumButton variant="luxury" size="sm" className="w-full" onClick={() => setActiveTab('report')}>
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </PremiumButton>
                          <PremiumButton variant="ghost" size="sm" className="w-full">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Results
                          </PremiumButton>
                          <PremiumButton variant="ghost" size="sm" className="w-full" href="/tools/strategy-canvas">
                            <Target className="w-4 h-4 mr-2" />
                            Plan Strategy
                          </PremiumButton>
                        </div>
                      </GlassmorphicCard>
                    </div>
                  </div>
                </StaggerItem>
              </div>
            )}

            {/* Report View */}
            {activeTab === 'report' && results && (
              <div className="lg:col-span-3">
                <StaggerItem>
                  <GlassmorphicCard variant="luxury" className="p-12">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-green-200 bg-clip-text text-transparent">
                        Executive AI ROI Report
                      </h2>
                      <p className="text-slate-400">Generated by FrankX.ai Agent Team Intelligence</p>
                    </div>

                    <div className="space-y-12">
                      {/* Executive Summary */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-slate-100">Executive Summary</h3>
                        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                          <p className="text-slate-300 leading-relaxed mb-4">
                            Based on the provided parameters, this AI initiative demonstrates a{' '}
                            <span className={getROIColor(results.roiPercentage)}>
                              {results.roiPercentage > 100 ? 'strong' :
                               results.roiPercentage > 50 ? 'positive' : 'marginal'}
                            </span>{' '}
                            business case with an estimated ROI of{' '}
                            <span className="font-semibold">{formatPercent(results.roiPercentage)}</span>{' '}
                            over {inputs.evaluationPeriodYears} years.
                          </p>
                          <p className="text-slate-300 leading-relaxed">
                            The investment will break even after approximately{' '}
                            <span className="font-semibold">{Math.round(results.breakEvenMonth)} months</span>,
                            generating a net benefit of{' '}
                            <span className="font-semibold text-green-300">{formatCurrency(results.netBenefit)}</span>{' '}
                            for the organization.
                          </p>
                        </div>
                      </div>

                      {/* Financial Overview */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-slate-100">Financial Overview</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 text-center">
                            <div className="text-2xl font-bold text-red-300 mb-2">
                              {formatCurrency(results.totalInvestment)}
                            </div>
                            <div className="text-slate-400 text-sm">Total Investment</div>
                          </div>
                          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 text-center">
                            <div className="text-2xl font-bold text-green-300 mb-2">
                              {formatCurrency(results.totalBenefits)}
                            </div>
                            <div className="text-slate-400 text-sm">Total Benefits</div>
                          </div>
                          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 text-center">
                            <div className={cn('text-2xl font-bold mb-2', getROIColor(results.roiPercentage))}>
                              {formatCurrency(results.netBenefit)}
                            </div>
                            <div className="text-slate-400 text-sm">Net Benefit</div>
                          </div>
                        </div>
                      </div>

                      {/* Year-by-Year Analysis */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-slate-100">Year-by-Year Analysis</h3>
                        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                          <div className="grid gap-4">
                            {results.yearlyBenefits.map((benefit, index) => (
                              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-b-0">
                                <span className="text-slate-300">Year {index + 1}</span>
                                <div className="flex items-center gap-6 text-sm">
                                  <span className="text-red-300">
                                    Investment: {formatCurrency(results.yearlyInvestments[index])}
                                  </span>
                                  <span className="text-green-300">
                                    Benefits: {formatCurrency(benefit)}
                                  </span>
                                  <span className={getROIColor((benefit - results.yearlyInvestments[index]) / results.yearlyInvestments[index] * 100)}>
                                    Net: {formatCurrency(benefit - results.yearlyInvestments[index])}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-slate-100">Strategic Recommendations</h3>
                        <div className="space-y-4">
                          {results.roiPercentage > 100 && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                              <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-semibold text-green-300 mb-2">Proceed with Implementation</h4>
                                  <p className="text-green-200 text-sm">
                                    Strong ROI justifies immediate investment. Consider accelerating timeline to capture benefits sooner.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-blue-300 mb-2">Change Management Focus</h4>
                                <p className="text-blue-200 text-sm">
                                  With {formatPercent(inputs.timeSavingsPercent)} time savings projected, invest in comprehensive change management and training.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                              <Brain className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-purple-300 mb-2">Start with FrankX.ai Products</h4>
                                <p className="text-purple-200 text-sm">
                                  Consider beginning with our Creative AI Toolkit and Agentic Creator OS Blueprint to de-risk implementation.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next Steps */}
                      <div className="text-center pt-8 border-t border-slate-700/30">
                        <h3 className="text-xl font-semibold mb-6 text-slate-100">Ready to Begin?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <GlowPulse color="green">
                            <PremiumButton variant="luxury" size="xl" href="/products">
                              Explore AI Products
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </PremiumButton>
                          </GlowPulse>
                          <PremiumButton variant="ghost" size="xl" href="/contact">
                            Get Implementation Help
                          </PremiumButton>
                        </div>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </StaggerItem>
              </div>
            )}
          </div>
        </StaggerContainer>
      </div>
    </div>
  )
}