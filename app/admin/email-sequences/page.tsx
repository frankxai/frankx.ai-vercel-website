import { Mail, Users, Send, TrendingUp, CheckCircle2, XCircle } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Email Sequences Dashboard',
  description: 'Manage automated email campaigns and subscriber engagement',
  path: '/admin/email-sequences'
})

export default function EmailSequencesPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-7xl">
            
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Email Sequences</h1>
              <p className="text-white/60 max-w-2xl">
                Automated email campaigns that nurture subscribers from signup to conversion.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Users className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="text-sm text-white/50">Total Subscribers</div>
                </div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-emerald-400 mt-1">+0% this month</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Send className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="text-sm text-white/50">Emails Sent (30d)</div>
                </div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-white/40 mt-1">0 pending</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <TrendingUp className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="text-sm text-white/50">Avg Open Rate</div>
                </div>
                <div className="text-3xl font-bold">--%</div>
                <div className="text-sm text-white/40 mt-1">Target: >40%</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="text-sm text-white/50">Conversions</div>
                </div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-white/40 mt-1">0% conversion rate</div>
              </div>
            </div>

            {/* Active Sequences */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Active Sequences</h2>
              
              <div className="grid gap-6">
                {/* Welcome Series */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">Welcome Series</h3>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-white/60">
                        5-email onboarding sequence • Triggers on signup
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-white/50">Active subscribers</div>
                    </div>
                  </div>

                  {/* Sequence Steps */}
                  <div className="space-y-2 mb-4">
                    {[
                      { order: 1, subject: 'Your free AI tool is ready', delay: 'Immediate', status: 'scheduled' },
                      { order: 2, subject: 'The 3 AI articles that changed how I build systems', delay: '3 days', status: 'scheduled' },
                      { order: 3, subject: 'How I went from developer to AI architect', delay: '7 days', status: 'scheduled' },
                      { order: 4, subject: 'The system I use to design complex AI architectures', delay: '14 days', status: 'scheduled' },
                      { order: 5, subject: 'Month 1 complete - here\'s what\'s next', delay: '30 days', status: 'scheduled' }
                    ].map((step) => (
                      <div key={step.order} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-xs font-medium text-white/60">
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{step.subject}</div>
                          <div className="text-xs text-white/40">{step.delay}</div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <CheckCircle2 className="h-4 w-4" />
                          0 sent
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-sm text-white/50 mb-1">Open Rate</div>
                      <div className="text-lg font-semibold">--%</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">Click Rate</div>
                      <div className="text-lg font-semibold">--%</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">Completion</div>
                      <div className="text-lg font-semibold">0%</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">Unsubscribe</div>
                      <div className="text-lg font-semibold">0%</div>
                    </div>
                  </div>
                </div>

                {/* Placeholder for future sequences */}
                <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.01] p-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white/40" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white/60">More Sequences Coming Soon</h3>
                  <p className="text-sm text-white/40 max-w-md mx-auto">
                    Nurture campaigns, re-engagement flows, and product-specific sequences.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 mx-auto mb-4">
                  <Send className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white/60">No emails sent yet</h3>
                <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
                  Add subscribers to start sending automated sequences.
                </p>
                <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
                  <Users className="h-4 w-4" />
                  Add First Subscriber
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
