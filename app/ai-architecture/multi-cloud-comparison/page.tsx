// AI Architecture - Multi-Cloud Comparison for Creator Platforms
// Educational analysis of cloud options for AI-powered applications

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Architecture: Multi-Cloud Comparison | FrankX',
  description: 'Educational comparison of cloud architectures for AI-powered creator platforms. AWS, GCP, Azure, and OCI cost analysis.',
};

export default function AIArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FrankX
              </div>
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm font-medium text-gray-900">
                AI Architecture Research
              </span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-md hover:from-purple-700 hover:to-blue-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Architecture Research
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-4 max-w-3xl mx-auto">
            Multi-Cloud Comparison for AI-Powered Creator Platforms
          </p>
          <p className="text-sm text-purple-200 max-w-2xl mx-auto">
            Independent educational analysis comparing AWS, Google Cloud, Microsoft Azure, and Oracle Cloud
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Research in Progress</h2>
            <p className="text-blue-800 mb-4">
              Documenting multi-cloud architectures for AI-powered creator platforms. Coming soon:
            </p>
            <ul className="space-y-2 text-blue-800 mb-6">
              <li>✓ Cost Comparison: AWS vs GCP vs Azure vs OCI for AI workloads</li>
              <li>✓ Architecture Patterns: Serverless, containers, managed AI services</li>
              <li>✓ AI Service Comparison: LLM hosting, vector databases</li>
              <li>✓ Case Studies: FrankX platform decisions</li>
            </ul>
            <Link href="/contact" className="text-blue-700 underline hover:text-blue-900">
              Get notified when published →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
