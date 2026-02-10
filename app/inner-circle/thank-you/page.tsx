import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail } from 'lucide-react'

export const metadata = {
  title: 'Inner Circle Access | FrankX.AI',
  description: 'Access details for Inner Circle members.',
  robots: { index: false, follow: false },
}

export default function InnerCircleThankYou() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center rounded-3xl border border-white/10 bg-white/[0.03] p-10">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-7 h-7 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">You’re in the Inner Circle.</h1>
        <p className="text-white/60 mb-6">
          Check your email for your Vault access link. Save it—this is your doorway to weekly drops and labs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/vault"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition-all"
          >
            Go to the Vault
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="mailto:hello@frankx.ai"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-white/70 hover:text-white hover:border-white/30 transition-all"
          >
            Need help?
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
