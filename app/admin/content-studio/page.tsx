'use client';

import { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  RefreshCw,
  Copy,
  ExternalLink,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'youtube';
  status: 'draft' | 'scheduled' | 'published';
  caption: string;
  imagePath?: string;
  imageUrl?: string;
  blogUrl?: string;
  createdAt: string;
  bestTime?: string;
  targetAudience?: string;
}

// Toast component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-slide-up">
      <Check className="w-5 h-5" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

const platformIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

const platformColors = {
  linkedin: 'bg-blue-600',
  twitter: 'bg-sky-500',
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  youtube: 'bg-red-600',
};

export default function ContentStudioPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content-studio/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || []);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToast('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const filteredContent = selectedPlatform === 'all'
    ? content
    : content.filter(c => c.platform === selectedPlatform);

  const linkedinCount = content.filter(c => c.platform === 'linkedin').length;
  const twitterCount = content.filter(c => c.platform === 'twitter').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Content Studio</h1>
                <p className="text-sm text-slate-400">{linkedinCount} LinkedIn · {twitterCount} Twitter threads</p>
              </div>
            </div>
            <button
              onClick={loadContent}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Platform Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All', count: content.length },
            { key: 'linkedin', label: 'LinkedIn', count: linkedinCount },
            { key: 'twitter', label: 'Twitter', count: twitterCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setSelectedPlatform(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedPlatform === key
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedPlatform === key ? 'bg-amber-600' : 'bg-slate-700'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Content List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No content found</p>
            <p className="text-sm text-slate-500 mt-2">
              Generate content with: <code className="text-amber-400">claude &quot;/content-studio social [blog-slug]&quot;</code>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContent.map((item) => {
              const PlatformIcon = platformIcons[item.platform];
              const isExpanded = expandedId === item.id;
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-4 flex items-start gap-4">
                    {/* Image Preview */}
                    {item.imageUrl ? (
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-700">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-8 h-8 text-slate-500" />
                      </div>
                    )}

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`p-1.5 ${platformColors[item.platform]} rounded-lg`}>
                          <PlatformIcon className="w-3.5 h-3.5 text-white" />
                        </span>
                        <h3 className="font-medium text-white truncate">{item.title}</h3>
                      </div>

                      <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                        {item.caption.split('\n')[0]}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {item.bestTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.bestTime}
                          </span>
                        )}
                        {item.blogUrl && (
                          <a
                            href={item.blogUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View article
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => copyToClipboard(item.caption, item.id)}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                          isCopied
                            ? 'bg-green-500 text-white'
                            : 'bg-amber-500 hover:bg-amber-600 text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-slate-700/50 p-4 bg-slate-900/50">
                      <div className="flex gap-4">
                        {/* Full Image */}
                        {item.imageUrl && (
                          <div className="w-48 flex-shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full rounded-xl"
                            />
                            <button
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = item.imageUrl!;
                                link.download = `${item.id}.png`;
                                link.click();
                              }}
                              className="mt-2 w-full text-center text-xs text-slate-400 hover:text-amber-400 transition-colors"
                            >
                              Download image
                            </button>
                          </div>
                        )}

                        {/* Full Caption */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                              {item.platform === 'twitter' ? 'Thread' : 'Post Copy'}
                            </span>
                            <button
                              onClick={() => copyToClipboard(item.caption, item.id)}
                              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              Copy all
                            </button>
                          </div>
                          <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans bg-slate-800/50 rounded-xl p-4 max-h-96 overflow-y-auto">
                            {item.caption}
                          </pre>
                          {item.targetAudience && (
                            <p className="mt-3 text-xs text-slate-500">
                              <strong>Target:</strong> {item.targetAudience}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
          <h3 className="text-sm font-medium text-white mb-3">Generate more content</h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Run in Claude Code:</p>
            <code className="block p-3 bg-slate-900/50 rounded-lg text-amber-400 font-mono text-xs">
              claude &quot;/content-studio social enterprise-agent-roadmap&quot;
            </code>
            <p className="text-xs text-slate-500 mt-2">
              Replace with any blog slug from frankx.ai/blog/[slug]
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}
