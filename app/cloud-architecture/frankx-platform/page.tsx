// FrankX Creator Platform - Cloud Architecture Analysis
// Path: /cloud-architecture/frankx-platform/page.tsx

import { Metadata } from 'next';
import {
  ArchitectureOverview,
  CostBreakdown,
  GenAISetup,
  TechnicalSpecs,
  ImplementationRoadmap,
  VideoGallery
} from './components';

export const metadata: Metadata = {
  title: 'FrankX Platform Cloud Architecture | Multi-Cloud Analysis',
  description: 'Independent cloud architecture analysis for AI-powered creator platform with cost optimization',
  openGraph: {
    title: 'FrankX Platform Cloud Architecture Study',
    description: 'Hybrid cloud strategy analysis: Vercel + OCI for 60-70% cost savings',
    images: ['/og-cloud-architecture.jpg'],
  },
};

export default function FrankXCloudArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FrankX
              </div>
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm font-medium text-gray-900">
                Cloud Architecture Study
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#overview" className="text-sm font-medium text-gray-700 hover:text-purple-600">
                Overview
              </a>
              <a href="#architecture" className="text-sm font-medium text-gray-700 hover:text-purple-600">
                Architecture
              </a>
              <a href="#cost" className="text-sm font-medium text-gray-700 hover:text-purple-600">
                Cost Analysis
              </a>
              <a href="#genai" className="text-sm font-medium text-gray-700 hover:text-purple-600">
                GenAI Strategy
              </a>
              <a href="#roadmap" className="text-sm font-medium text-gray-700 hover:text-purple-600">
                Roadmap
              </a>
            </nav>
            <a
              href="/"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-md hover:from-purple-700 hover:to-blue-700"
            >
              Back to FrankX
            </a>
          </div>
        </div>
      </header>

      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-amber-800">
            📊 <strong>Independent Analysis:</strong> This is an educational architecture study for the FrankX creator platform.
            Pricing estimates based on <a href="https://www.oracle.com/cloud/price-list/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-900">Oracle Cloud Infrastructure Price List (Jan 2026)</a>.
            Not affiliated with or endorsed by Oracle Corporation.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              FrankX Creator Platform
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Cloud Architecture Analysis: AI Music Academy & Creator Ecosystem
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">250K</div>
                <div className="text-sm text-purple-100">Target Users (24mo)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">$12K</div>
                <div className="text-sm text-purple-100">Est. Monthly Cost (50K users)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">60-70%</div>
                <div className="text-sm text-purple-100">Potential Savings vs Single-Cloud</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">2.7%</div>
                <div className="text-sm text-purple-100">Infrastructure Cost Ratio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section id="overview" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Architecture Overview</h2>

          {/* Pricing Accuracy Notice */}
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">📌 Pricing Accuracy & Verification</h3>
            <p className="text-sm text-blue-800 mb-4">
              All cost estimates are based on current public pricing as of January 2026.
              Please verify with official sources before making decisions:
            </p>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                <strong>OCI Pricing:</strong>{' '}
                <a
                  href="https://www.oracle.com/cloud/price-list/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  Oracle Cloud Infrastructure Price List
                </a>
              </li>
              <li>
                <strong>OCI GenAI Pricing:</strong>{' '}
                <a
                  href="https://www.oracle.com/artificial-intelligence/generative-ai/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  Generative AI Service Pricing
                </a>
              </li>
              <li>
                <strong>GPU Instances:</strong>{' '}
                <a
                  href="https://www.oracle.com/cloud/compute/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  Compute Pricing (GPU shapes: VM.GPU.A10.1, VM.GPU.A10.2)
                </a>
              </li>
              <li>
                <strong>Autonomous Database:</strong>{' '}
                <a
                  href="https://www.oracle.com/autonomous-database/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  Autonomous Database Pricing
                </a>
              </li>
              <li>
                <strong>Vercel Pricing:</strong>{' '}
                <a
                  href="https://vercel.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  Vercel Pro & Enterprise Plans
                </a>
              </li>
            </ul>
            <p className="text-xs text-blue-700 mt-4">
              💡 <strong>Note:</strong> Actual costs may vary based on usage patterns, reserved capacity discounts,
              and negotiated enterprise pricing. Use OCI Cost Estimator tool for personalized quotes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Vision</h3>
              <p className="text-gray-600 mb-6">
                FrankX is revolutionizing the creator economy with an AI-native platform combining
                music production (Suno AI), creator coaching, content tools, and community features.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">50,000+ creators generating AI music with Suno</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">10,000+ course enrollments (coaching programs)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">AI-powered content tools & creator coaching</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hybrid Cloud Strategy</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Current (All-Vercel)</span>
                    <span className="text-lg font-bold text-gray-900">$18K-25K/mo</span>
                  </div>
                  <div className="text-xs text-gray-500">High compute & storage costs at scale</div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Hybrid (Vercel + OCI)</span>
                    <span className="text-lg font-bold text-green-600">$10K-14K/mo</span>
                  </div>
                  <div className="text-xs text-gray-500">Backend/data to OCI, frontend stays Vercel</div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Estimated Annual Savings</span>
                    <span className="text-2xl font-bold text-purple-600">$96K-132K</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Infrastructure cost ratio: ~2.7% (industry best practice) ✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hybrid Strategy Diagram */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Recommended Hybrid Architecture</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">V</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Vercel (Frontend)</h4>
                    <div className="text-sm text-gray-600">Optimized DX</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Next.js 15 with App Router</li>
                  <li>✓ Edge network (300+ PoPs)</li>
                  <li>✓ Automatic deployments</li>
                  <li>✓ Best developer experience</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                  Est. Cost: ~$490/month @ 50K users
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">O</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">OCI (Backend & Data)</h4>
                    <div className="text-sm text-gray-600">Cost optimization</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Serverless Functions (APIs)</li>
                  <li>✓ Autonomous Database (auto-scale)</li>
                  <li>✓ Object Storage (music/video)</li>
                  <li>✓ Generative AI Services</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                  Est. Cost: ~$2,360/month @ 50K users
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section id="architecture" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Architecture</h2>
          <ArchitectureOverview />
        </div>
      </section>

      {/* Cost Breakdown */}
      <section id="cost" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cost Analysis & ROI</h2>
          <CostBreakdown />

          {/* 3-Year Savings Projection */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">3-Year Total Cost of Ownership Estimate</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">Year 1 Estimated Savings</div>
                <div className="text-3xl font-bold text-green-600 mb-1">$96K-132K</div>
                <div className="text-xs text-gray-500">vs projected all-Vercel baseline</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">Year 2 Estimated Savings</div>
                <div className="text-3xl font-bold text-green-600 mb-1">$150K-200K</div>
                <div className="text-xs text-gray-500">with reserved capacity discounts</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">Year 3 Estimated Savings</div>
                <div className="text-3xl font-bold text-green-600 mb-1">$180K-240K</div>
                <div className="text-xs text-gray-500">with 3-year commitment pricing</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-green-200 text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Cumulative 3-Year Estimated Savings</div>
              <div className="text-5xl font-bold text-green-600">$426K-572K</div>
              <p className="text-xs text-gray-500 mt-2">
                ⚠️ Estimates based on current public pricing. Actual savings depend on usage patterns,
                negotiations, and market conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GenAI Strategy */}
      <section id="genai" className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Generative AI for Creators</h2>
          <GenAISetup />

          {/* Creator Use Cases */}
          <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">AI-Powered Creator Tools</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Music Generation</h4>
                <p className="text-sm text-gray-600 mb-3">Suno API integration for AI music creation with prompt optimization</p>
                <div className="text-xs text-purple-600 font-medium">500,000+ tracks/year target</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Content Tools</h4>
                <p className="text-sm text-gray-600 mb-3">Generative AI for blog outlines, captions, SEO optimization</p>
                <div className="text-xs text-blue-600 font-medium">1M+ AI assists/month @ scale</div>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Creator Coaching</h4>
                <p className="text-sm text-gray-600 mb-3">LLM-powered personalized growth advice and music prompt suggestions</p>
                <div className="text-xs text-pink-600 font-medium">24/7 AI coaching assistant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
          <TechnicalSpecs />
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cloud Provider Resources</h2>
          <VideoGallery />
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section id="roadmap" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">8-Week Implementation Roadmap</h2>
          <ImplementationRoadmap />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in FrankX's Cloud Strategy?</h2>
          <p className="text-xl text-purple-100 mb-8">
            This architecture analysis demonstrates potential 60-70% cost savings with hybrid cloud approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-md hover:bg-gray-100"
            >
              Explore FrankX Platform
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900 border border-white/20"
            >
              Discuss Your Architecture
            </a>
          </div>
          <div className="mt-8 text-sm text-purple-100">
            <p>Estimated Timeline: 8 weeks | Target Cost: ~$12K/month @ 50K users | Projected ROI: $96K-132K savings Year 1</p>
            <p className="text-xs mt-2 opacity-75">All estimates subject to verification with actual usage and pricing</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                FrankX
              </div>
              <p className="text-sm">
                Independent cloud architecture analysis for educational purposes.
              </p>
              <p className="text-xs mt-2">
                © 2026 FrankX. Not affiliated with Oracle Corporation.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Cloud Providers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.oracle.com/cloud/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Oracle Cloud Infrastructure</a></li>
                <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Vercel Platform</a></li>
                <li><a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">AWS (Comparison)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">FrankX</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
