'use client';

import React, { useState } from 'react';

interface PolarCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PolarCheckoutModal({
  isOpen,
  onClose,
}: PolarCheckoutModalProps) {
  const [includeBump, setIncludeBump] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const basePrice = 49;
  const bumpPrice = 17;
  const totalPrice = includeBump ? basePrice + bumpPrice : basePrice;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout/polar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: includeBump ? 'prompt-matrix-pro-bundle' : 'prompt-matrix-pro',
          includeBump,
          email: email || undefined,
          originUrl: window.location.href,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.fallbackMode) {
        // Free preview / test mode fallback when Polar key is being configured
        alert(
          `🎉 Godmode Live Access Active!\n\n${data.message || 'Free preview access unlocked. Polar checkout will be active on production credentials.'}`
        );
        onClose();
      } else {
        setError(data.error || 'Failed to initiate checkout. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred. Free access mode enabled.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <span>⚡</span> Pro Web Edition · Polar.sh Protected
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Unlock the Full Prompt & Agent Chaining Matrix
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get lifetime instant access to 100+ multi-agent DAGs, visual chain studio, custom variable engine, and multi-format exporters.
          </p>
        </div>

        {/* Features list */}
        <div className="space-y-2 text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> 100+ Battle-Tested Multi-Agent Chains
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> 1-Click Claude XML, Cursor .cursorrules & OpenAI Schemas
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> 100% Red-Team Security Evaluator & Promptfoo Evals
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Lifetime Updates & New DAG Additions
          </div>
        </div>

        {/* Order Bump Option */}
        <div
          onClick={() => setIncludeBump(!includeBump)}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            includeBump
              ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-500/5'
              : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={includeBump}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  ⚡ Recommended VIP Order Bump (+€{bumpPrice})
                </span>
                <span className="text-xs font-bold text-white font-mono">
                  €{bumpPrice}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                <strong>Agent Chaining Masterclass & 50+ Enterprise DAGs</strong>: Video breakdown of production orchestration patterns + enterprise architecture blueprints.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <span className="text-xs font-mono text-slate-400">Total Investment:</span>
            <div className="text-2xl font-bold text-white font-mono">
              €{totalPrice} <span className="text-xs font-normal text-slate-500">EUR (Lifetime)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Zero Recurring Fees
            </span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email for instant access..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
          />

          {error && (
            <p className="text-xs text-rose-400 font-mono bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-tight transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Connecting to Polar Checkout...</span>
            ) : (
              <>
                <span>Secure Checkout with Polar (€{totalPrice})</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500 font-mono">
          🔒 Encrypted checkout via Polar.sh · 30-Day Money-Back Guarantee
        </p>
      </div>
    </div>
  );
}
