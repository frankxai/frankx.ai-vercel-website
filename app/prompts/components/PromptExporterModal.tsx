'use client';

import React, { useState } from 'react';
import { PromptChain } from '@/data/prompt-chains-matrix';

interface PromptExporterModalProps {
  chain: PromptChain;
  isOpen: boolean;
  onClose: () => void;
}

type ExportTab = 'claude-xml' | 'cursor-rules' | 'openai-json' | 'acos-spec';

export default function PromptExporterModal({
  chain,
  isOpen,
  onClose,
}: PromptExporterModalProps) {
  const [activeTab, setActiveTab] = useState<ExportTab>('claude-xml');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'claude-xml':
        return chain.claudeXmlSnippet;
      case 'cursor-rules':
        return chain.cursorRulesSnippet;
      case 'openai-json':
        return chain.openAiJsonSnippet;
      case 'acos-spec':
        return chain.acosSpecSnippet;
      default:
        return chain.claudeXmlSnippet;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extMap: Record<ExportTab, string> = {
      'claude-xml': 'xml',
      'cursor-rules': 'cursorrules',
      'openai-json': 'json',
      'acos-spec': 'yaml',
    };
    const filename = `${chain.slug}.${extMap[activeTab]}`;
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-mono font-bold">
              &lt;/&gt;
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Export Production Code & Specs
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {chain.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/20 overflow-x-auto">
          <button
            onClick={() => setActiveTab('claude-xml')}
            className={`px-3.5 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'claude-xml'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🟣 Claude XML Format
          </button>
          <button
            onClick={() => setActiveTab('cursor-rules')}
            className={`px-3.5 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'cursor-rules'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ .cursorrules
          </button>
          <button
            onClick={() => setActiveTab('openai-json')}
            className={`px-3.5 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'openai-json'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🟢 OpenAI JSON Schema
          </button>
          <button
            onClick={() => setActiveTab('acos-spec')}
            className={`px-3.5 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'acos-spec'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🏛️ ACOS v11 Spec
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950">
          <div className="relative">
            <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {getActiveCode()}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/40">
          <span className="text-xs text-slate-400 font-mono">
            Format: <span className="text-white font-semibold">{activeTab}</span> · Zero formatting errors
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Download File
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
            >
              {copied ? '✓ Copied to Clipboard' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
