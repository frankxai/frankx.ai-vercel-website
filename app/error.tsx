'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6"
            animate={{
              rotate: [0, 5, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.6)]">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            System Intelligence Error
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Our AI agents encountered an unexpected situation.
            This is typically a temporary issue that resolves quickly.
          </p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <GlowCard color="violet"
            className="p-6 text-left"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-3">
              Error Details
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-400">Message:</span>
                <span className="text-slate-200 ml-2">{error.message || 'Unknown error'}</span>
              </div>
              {error.digest && (
                <div>
                  <span className="text-slate-400">Reference ID:</span>
                  <span className="text-slate-200 ml-2 font-mono">{error.digest}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400">Time:</span>
                <span className="text-slate-200 ml-2">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PremiumButton
              onClick={reset}
              variant="luxury"
              size="lg"
              glow
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </PremiumButton>

            <PremiumButton
              href="/"
              variant="secondary"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </PremiumButton>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlowCard color="emerald"
            className="p-6"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Need Immediate Help?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="text-center">
                <h4 className="font-medium text-slate-200 mb-2">Check System Status</h4>
                <p className="text-sm text-slate-400 mb-3">
                  See if this is a known issue affecting multiple users
                </p>
                <Link
                  href="https://status.frankx.ai"
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Status Page →
                </Link>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-slate-200 mb-2">Contact Support</h4>
                <p className="text-sm text-slate-400 mb-3">
                  Get direct help from our agent team
                </p>
                <Link
                  href={`mailto:support@frankx.ai?subject=Error Report&body=Error ID: ${error.digest || 'Unknown'}%0A%0AError Message: ${encodeURIComponent(error.message || 'Unknown error')}%0A%0APlease describe what you were trying to do when this error occurred:`}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm inline-flex items-center"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email Support
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 pt-6 border-t border-slate-700/30"
        >
          <p className="text-sm text-slate-500">
            This error has been automatically reported to our monitoring systems.
            Our agent team will investigate and resolve any systemic issues.
          </p>
        </motion.div>
      </div>
    </div>
  )
}