// Cost Breakdown Component with Interactive Charts
'use client';

import { useState } from 'react';

export function CostBreakdown() {
  const [view, setView] = useState<'monthly' | 'annual'>('monthly');

  const costData = [
    { category: 'Compute (OKE + GPU)', monthly: 18104, annual: 217248, percentage: 18.6, color: 'bg-purple-500' },
    { category: 'Storage (Object + Block)', monthly: 17510, annual: 210120, percentage: 18.0, color: 'bg-orange-500' },
    { category: 'Database (ATP + ADW)', monthly: 37980, annual: 455760, percentage: 39.0, color: 'bg-blue-500' },
    { category: 'Networking + CDN', monthly: 16120, annual: 193440, percentage: 16.6, color: 'bg-green-500' },
    { category: 'AI & ML', monthly: 3878, annual: 46536, percentage: 4.0, color: 'bg-pink-500' },
    { category: 'Monitoring & Security', monthly: 1229, annual: 14748, percentage: 1.3, color: 'bg-yellow-500' },
    { category: 'Real-Time & Integration', monthly: 1100, annual: 13200, percentage: 1.1, color: 'bg-indigo-500' },
    { category: 'Backup & DR', monthly: 1382, annual: 16584, percentage: 1.4, color: 'bg-red-500' },
  ];

  const total = view === 'monthly' ? 97303 : 1167636;
  const optimizedTotal = view === 'monthly' ? 90053 : 1080636;

  return (
    <div className="space-y-8">
      {/* Toggle View */}
      <div className="flex items-center justify-between">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            onClick={() => setView('monthly')}
            className={`px-6 py-2 font-medium transition-colors ${
              view === 'monthly'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView('annual')}
            className={`px-6 py-2 font-medium transition-colors ${
              view === 'annual'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Annual
          </button>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">Total Infrastructure Cost</div>
          <div className="text-3xl font-bold text-gray-900">
            ${optimizedTotal.toLocaleString()}
            <span className="text-sm text-gray-500 ml-2">
              ({view === 'monthly' ? '/month' : '/year'})
            </span>
          </div>
          <div className="text-sm text-green-600 mt-1">
            Optimized from ${total.toLocaleString()} (7.5% savings)
          </div>
        </div>
      </div>

      {/* Cost Breakdown Chart */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Cost Distribution</h3>
        <div className="space-y-4">
          {costData.map((item) => (
            <div key={item.category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${(view === 'monthly' ? item.monthly : item.annual).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all duration-500 flex items-center justify-end pr-3`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    <span className="text-xs font-medium text-white">{item.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-green-800 mb-2">Projected Revenue</h4>
          <div className="text-3xl font-bold text-green-900">$10M</div>
          <div className="text-sm text-green-700 mt-1">per month</div>
          <div className="text-xs text-green-600 mt-2">1M users × $10 ARPU</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Infrastructure Cost Ratio</h4>
          <div className="text-3xl font-bold text-blue-900">0.90%</div>
          <div className="text-sm text-blue-700 mt-1">of revenue</div>
          <div className="text-xs text-blue-600 mt-2">✓ Below 2% industry benchmark</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-purple-800 mb-2">Gross Margin</h4>
          <div className="text-3xl font-bold text-purple-900">84.60%</div>
          <div className="text-sm text-purple-700 mt-1">after infrastructure</div>
          <div className="text-xs text-purple-600 mt-2">World-class profitability</div>
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Cost Optimization Strategies</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Reserved Capacity (1-Year)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Pre-commit to 50% of compute resources for 36% discount
            </p>
            <div className="text-lg font-bold text-green-600">Save $39,000/year</div>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Auto-Scaling & Preemptible</h4>
            <p className="text-sm text-gray-600 mb-2">
              Scale down non-prod environments at night, use preemptible instances
            </p>
            <div className="text-lg font-bold text-blue-600">Save $15,000/year</div>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">Storage Tiering</h4>
            <p className="text-sm text-gray-600 mb-2">
              Auto-move content to Infrequent Access tier after 90 days
            </p>
            <div className="text-lg font-bold text-orange-600">Save $8,000/year</div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">CDN Optimization</h4>
            <p className="text-sm text-gray-600 mb-2">
              Longer cache TTLs, aggressive compression (reduce bandwidth 30%)
            </p>
            <div className="text-lg font-bold text-purple-600">Save $25,000/year</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total Annual Savings:</span>
            <span className="text-2xl font-bold text-green-600">$87,000 (7.5%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
