'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { trackEvent } from '@/lib/analytics';
import { submitNewsletter } from '@/lib/newsletter/submit-newsletter';

interface EmailCaptureFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  title = 'Join Our Community',
  description = 'Get the latest insights, resources, and updates delivered to your inbox.',
  buttonText = 'Subscribe',
  className,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const result = await submitNewsletter(email);
    if (!result.ok) {
      setErrorMessage(result.message);
      setStatus('error');
      return;
    }

    trackEvent('lead_submitted', {
      surface: 'email_capture_form',
      offer_id: 'frankx_newsletter',
      source: 'frankx_site',
    });
    setStatus('success');
    setEmail('');
  };

  return (
    <GlassmorphicCard variant="premium" className={className}>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 mb-6">{description}</p>
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-4 text-lg font-semibold text-green-300"
          >
            Thank you for subscribing!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  required
                  disabled={status === 'submitting'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'submitting' ? 'Subscribing…' : buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            {status === 'error' && (
              <p id="newsletter-error" role="alert" className="text-sm text-rose-300">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default EmailCaptureForm;
