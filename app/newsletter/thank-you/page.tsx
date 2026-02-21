import { Suspense } from 'react'
import ThankYouContent from './ThankYouContent'

export default function NewsletterThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
