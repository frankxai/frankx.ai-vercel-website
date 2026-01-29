import Link from 'next/link'
import { ArrowRight, Lock, Sparkles, Vault, Calendar, Mail } from 'lucide-react'
import { membershipConfig } from '@/lib/membership'

export const metadata = {
  title: 'Inner Circle Vault | FrankX.AI',
  description: 'Member access to the Inner Circle vault, weekly drops, and live labs.',
  robots: { index: false, follow: false },
}

export default function VaultPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-[0.2]" />
      <div className="absolute -top-[30%] right-[-10%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)] blur-[120px]" />
      <div className="relative z-10">
        <section className="pt-28 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70 mb-4">
                  Inner Circle Vault
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                  Member access to the systems that make shipping feel inevitable.
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mb-10">
                  The Vault is where weekly drops, templates, and live lab replays live. If you joined the Inner Circle,
                  your access link is in your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={membershipConfig.checkoutUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 font-semibold hover:bg-white/90 transition-all"
                  >
                    Claim Inner Circle Access
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={membershipConfig.supportUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 text-white/70 hover:text-white hover:border-white/30 transition-all"
                  >
                    Need help?
                    <Mail className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Access status</p>
                    <p className="text-lg font-semibold">Member-only</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <Vault className="w-4 h-4 text-emerald-400/70" />
                    Vault Library (systems + templates)
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400/70" />
                    Weekly Drops (new frameworks)
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-violet-400/70" />
                    Live Labs + replays
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/50">
                  After purchase you’ll receive an email with your access link. Save it—it unlocks the Vault, Labs, and Drops.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">How access works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Join Creation Chronicles',
                  description: 'Get the weekly system and stay in the loop.',
                  href: '/creation-chronicles',
                  cta: 'Join free',
                },
                {
                  step: '02',
                  title: 'Upgrade to Inner Circle',
                  description: 'Unlock the Vault, Labs, and Drops.',
                  href: membershipConfig.checkoutUrl,
                  cta: 'Unlock access',
                },
                {
                  step: '03',
                  title: 'Receive your access link',
                  description: 'Your email contains the Vault entry point.',
                  href: membershipConfig.supportUrl,
                  cta: 'Need help?',
                },
              ].map(item => (
                <div key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-xs text-white/40 mb-2">{item.step}</p>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{item.description}</p>
                  <Link href={item.href} className="text-sm text-emerald-400 hover:text-emerald-300">
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
