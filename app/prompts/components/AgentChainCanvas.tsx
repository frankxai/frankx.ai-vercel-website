'use client';

import React, { useState } from 'react';
import { PromptChain, AGENT_NODES } from '@/data/prompt-chains-matrix';

interface AgentChainCanvasProps {
  chain: PromptChain;
  onOpenExporter: () => void;
  onOpenCheckout: () => void;
}

export default function AgentChainCanvas({
  chain,
  onOpenExporter,
  onOpenCheckout,
}: AgentChainCanvasProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    chain.variables.forEach((v) => {
      initial[v.key] = v.defaultValue;
    });
    return initial;
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedSteps, setSimulatedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const activeStep = chain.steps[activeStepIndex] || chain.steps[0];
  const activeAgent = AGENT_NODES[activeStep.agentId] || AGENT_NODES.conductor;

  const handleVariableChange = (key: string, val: string) => {
    setVariableValues((prev) => ({ ...prev, [key]: val }));
  };

  const getInterpolatedInput = (template: string) => {
    let result = template;
    Object.entries(variableValues).forEach(([k, v]) => {
      result = result.replace(new RegExp(`{{${k}}}`, 'g'), v);
    });
    return result;
  };

  const handleSimulateExecution = () => {
    setIsSimulating(true);
    setSimulatedSteps([]);
    
    chain.steps.forEach((_, idx) => {
      setTimeout(() => {
        setSimulatedSteps((prev) => [...prev, idx]);
        setActiveStepIndex(idx);
        if (idx === chain.steps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 800);
    });
  };

  const handleCopyPrompt = () => {
    const text = getInterpolatedInput(activeStep.inputTemplate);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      {/* Left Column: DAG Chain Flow & Visual Nodes */}
      <div className="lg:w-1/2 flex flex-col justify-between space-y-6">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {chain.category}
              </span>
              {chain.tier === 'pro' && (
                <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  PRO MATRIX
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateExecution}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                    Executing DAG...
                  </>
                ) : (
                  <>
                    <span>▶</span>
                    <span>Test Run Chain</span>
                  </>
                )}
              </button>
              <button
                onClick={onOpenExporter}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <span>Export Code</span>
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            {chain.title}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {chain.summary}
          </p>

          {/* Visual DAG Nodes */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Multi-Agent DAG Flow ({chain.steps.length} Nodes)
            </p>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
              {chain.steps.map((step, idx) => {
                const nodeAgent = AGENT_NODES[step.agentId] || AGENT_NODES.conductor;
                const isSelected = activeStepIndex === idx;
                const isCompleted = simulatedSteps.includes(idx);

                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`relative flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    {/* Node status dot */}
                    <div
                      className={`absolute -left-[1.65rem] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-400 border-emerald-500 ring-4 ring-emerald-500/20'
                          : isSelected
                          ? 'bg-emerald-400 border-slate-900 ring-2 ring-emerald-400'
                          : 'bg-slate-900 border-slate-700'
                      }`}
                    />

                    <div className="text-lg">{nodeAgent.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-emerald-400 font-semibold">
                            Step {step.stepNumber}
                          </span>
                          <span className="text-xs font-mono text-slate-400 truncate">
                            {nodeAgent.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/50">
                          {nodeAgent.defaultModel}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-200 mt-0.5">
                        {step.actionName}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Variable Configuration Inputs */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Chain Variables & Arguments
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Auto-interpolates in real-time
            </span>
          </div>

          <div className="space-y-2.5">
            {chain.variables.map((variable) => (
              <div key={variable.key} className="space-y-1">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>{variable.label}</span>
                  <code className="text-[10px] text-slate-500">{`{{${variable.key}}}`}</code>
                </label>
                <input
                  type="text"
                  value={variableValues[variable.key] || ''}
                  onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  placeholder={variable.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Node Inspector, Live Prompt Preview & Quality Scorecard */}
      <div className="lg:w-1/2 flex flex-col justify-between space-y-6 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5">
        <div className="space-y-5">
          {/* Active Node Agent Meta */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shadow-inner">
                {activeAgent.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white font-mono">
                    {activeAgent.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activeAgent.cluster}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeAgent.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy Prompt'}
            </button>
          </div>

          {/* Interpolated Live Prompt Template Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Active Node Prompt Payload (Step {activeStep.stepNumber})
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Target: {activeAgent.defaultModel}
              </span>
            </div>
            <div className="relative group">
              <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-60 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {getInterpolatedInput(activeStep.inputTemplate)}
              </pre>
            </div>
          </div>

          {/* System Evaluation Metric & Output Contract */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Quality Assertion Metric
              </span>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                {activeStep.evalMetric}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Output State Key
              </span>
              <p className="text-xs text-emerald-400 mt-1 font-mono">
                {`state.${activeStep.outputKey}`}
              </p>
            </div>
          </div>

          {/* Red-Team Quality Scorecard */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <span>🛡️</span> Red-Team & Verification Scorecard
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                98.5% Aggregate Score
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Instruction Fidelity</span>
                  <span className="text-emerald-400">{chain.scorecard.instructionFidelity}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${chain.scorecard.instructionFidelity}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Jailbreak Resistance</span>
                  <span className="text-emerald-400">{chain.scorecard.jailbreakResistance}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${chain.scorecard.jailbreakResistance}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Token Efficiency</span>
                  <span className="text-emerald-400">{chain.scorecard.tokenEfficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${chain.scorecard.tokenEfficiency}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Hallucination Shield</span>
                  <span className="text-emerald-400">{chain.scorecard.hallucinationShield}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${chain.scorecard.hallucinationShield}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono">
            Est. Cost / Run: <span className="text-white font-bold">~$0.003</span> · Latency: <span className="text-white font-bold">~1.2s</span>
          </div>
          {chain.tier === 'pro' ? (
            <button
              onClick={onOpenCheckout}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5"
            >
              <span>Unlock Pro Matrix (€49)</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={onOpenExporter}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
            >
              <span>Export Production Code</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
