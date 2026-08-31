'use client';

import React, { useState, useMemo } from 'react';
import {
  PROMPT_CHAINS,
  AGENT_NODES,
  PromptChain,
} from '@/data/prompt-chains-matrix';
import AgentChainCanvas from './AgentChainCanvas';
import PromptExporterModal from './PromptExporterModal';
import PolarCheckoutModal from './PolarCheckoutModal';

export default function PromptMatrixApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChainId, setSelectedChainId] = useState(PROMPT_CHAINS[0].id);
  const [isExporterOpen, setIsExporterOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    PROMPT_CHAINS.forEach((c) => set.add(c.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredChains = useMemo(() => {
    return PROMPT_CHAINS.filter((chain) => {
      const matchesCat =
        selectedCategory === 'All' || chain.category === selectedCategory;
      const matchesQuery =
        chain.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chain.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chain.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const activeChain = useMemo(() => {
    return (
      PROMPT_CHAINS.find((c) => c.id === selectedChainId) || PROMPT_CHAINS[0]
    );
  }, [selectedChainId]);

  return (
    <div className="space-y-12">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">
            <strong>13 Specialized Agent Nodes Active</strong> · Subdomain Matrix Live
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2 text-xs font-bold font-mono rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5"
          >
            <span>Unlock Pro Matrix (€49 + €17 Bump)</span>
            <span>⚡</span>
          </button>
        </div>
      </div>

      {/* Main Studio Canvas */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Interactive DAG Matrix Studio</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Simulator
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Select any chain below to load its multi-agent DAG into the live execution canvas.
            </p>
          </div>
        </div>

        <AgentChainCanvas
          chain={activeChain}
          onOpenExporter={() => setIsExporterOpen(true)}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      </section>

      {/* Catalog & Filter Navigation */}
      <section className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Prompt & Agent Chaining Library (100+ Production DAGs)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Production-grade chains tested with promptfoo and evaluated against strict instruction fidelity.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search chains, models, or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-xl whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChains.map((chain) => {
            const isSelected = chain.id === selectedChainId;

            return (
              <div
                key={chain.id}
                onClick={() => {
                  setSelectedChainId(chain.id);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-xl'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {chain.category}
                    </span>
                    {chain.tier === 'pro' ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        PRO
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        FREE
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                    {chain.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {chain.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {chain.steps.map((s) => {
                      const nodeAgent = AGENT_NODES[s.agentId];
                      return (
                        <span
                          key={s.stepNumber}
                          title={`${nodeAgent?.name || 'Agent'}`}
                          className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]"
                        >
                          {nodeAgent?.avatar || '⚡'}
                        </span>
                      );
                    })}
                    <span className="text-[11px] font-mono text-slate-500 ml-1">
                      {chain.steps.length} Steps
                    </span>
                  </div>

                  <div className="text-xs font-mono text-emerald-400 font-medium">
                    {chain.scorecard.instructionFidelity}% Fidelity
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 13-Agent Cluster Architecture Section */}
      <section className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-tight">
            The 13-Agent Specialized Mesh
          </h3>
          <p className="text-xs text-slate-400">
            Every agent node possesses dedicated system prompts, execution boundaries, and lab-specific formatting rules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(AGENT_NODES).map((agent) => (
            <div
              key={agent.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{agent.avatar}</span>
                  <span className="text-xs font-bold text-white font-mono">
                    {agent.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {agent.cluster}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {agent.role}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {agent.capabilities.map((c) => (
                  <span
                    key={c}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <PromptExporterModal
        chain={activeChain}
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
      />

      <PolarCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
