'use client'

import { Toaster as Sonner } from 'sonner'

/**
 * Toast Notification System
 * Using Sonner with glassmorphic styling
 *
 * Usage:
 * import { toast } from 'sonner'
 *
 * toast.success('Creator account created!')
 * toast.error('Failed to save changes')
 * toast.info('New AI tool available')
 * toast.warning('Your session will expire soon')
 * toast.promise(promise, { loading: 'Saving...', success: 'Saved!', error: 'Failed!' })
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-slate-900/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:border-white/10 group-[.toaster]:text-white group-[.toaster]:shadow-2xl',
          description: 'group-[.toast]:text-white/70',
          actionButton:
            'group-[.toast]:bg-emerald-500 group-[.toast]:text-white group-[.toast]:hover:bg-emerald-600',
          cancelButton:
            'group-[.toast]:bg-white/10 group-[.toast]:text-white group-[.toast]:hover:bg-white/20',
          success:
            'group-[.toaster]:border-emerald-500/30 group-[.toaster]:bg-emerald-500/10 group-[.toaster]:text-emerald-400',
          error:
            'group-[.toaster]:border-red-500/30 group-[.toaster]:bg-red-500/10 group-[.toaster]:text-red-400',
          warning:
            'group-[.toaster]:border-amber-500/30 group-[.toaster]:bg-amber-500/10 group-[.toaster]:text-amber-400',
          info:
            'group-[.toaster]:border-cyan-500/30 group-[.toaster]:bg-cyan-500/10 group-[.toaster]:text-cyan-400',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
