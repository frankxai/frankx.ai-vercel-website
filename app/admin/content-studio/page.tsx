'use client';

import { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  Linkedin,
  Twitter,
  RefreshCw,
  Copy,
  ExternalLink,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Users,
  Zap,
  Hash,
  FileText,
  Download
} from 'lucide-react';

interface Tweet {
  text: string;
  charCount: number;
  index: number;
}

interface ContentItem {
  id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'youtube';
  status: 'draft' | 'scheduled' | 'published';
  caption: string;
  captionWithHashtags: string;
  hashtags: string[];
  charCount: number;
  imagePath?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  blogUrl?: string;
  createdAt: string;
  bestTime?: string;
  targetAudience?: string;
  engagementHook?: string;
  tweets?: Tweet[];
}

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
  instagram: Linkedin,
  youtube: Linkedin,
};

const platformColors = {
  linkedin: 'bg-blue-600',
  twitter: 'bg-sky-500',
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  youtube: 'bg-red-600',
};

const LINKEDIN_CHAR_LIMIT = 3000;
const TWITTER_CHAR_LIMIT = 280;

export default function ContentStudioPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [includeHashtags, setIncludeHashtags] = useState(true);

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

  const copyToClipboard = async (text: string, id: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToast(label ? `Copied ${label}!` : 'Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openPlatform = (platform: string, prefill?: string) => {
    if (platform === 'linkedin') {
      // LinkedIn share URL
      window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');
    } else if (platform === 'twitter') {
      const url = prefill
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(prefill)}`
        : 'https://twitter.com/compose/tweet';
      window.open(url, '_blank');
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.click();
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
                <p className="text-sm text-slate-400">{linkedinCount} LinkedIn + {twitterCount} Twitter ready to post</p>
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
              const charLimit = item.platform === 'linkedin' ? LINKEDIN_CHAR_LIMIT : TWITTER_CHAR_LIMIT;
              const isOverLimit = item.charCount > charLimit;

              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-4 flex items-start gap-4">
                    {/* Image Preview - uses thumbnail (12KB) instead of full (600KB) */}
                    {(item.thumbnailUrl || item.imageUrl) ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-700 relative group">
                        <img
                          src={item.thumbnailUrl || item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          onClick={() => downloadImage(item.imageUrl!, `${item.id}.png`)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <Download className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-8 h-8 text-slate-500" />
                      </div>
                    )}

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`p-1.5 ${platformColors[item.platform]} rounded-lg`}>
                          <PlatformIcon className="w-3.5 h-3.5 text-white" />
                        </span>
                        <h3 className="font-medium text-white truncate">{item.title}</h3>
                      </div>

                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {item.caption.split('\n')[0]}
                      </p>

                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        {/* Character count */}
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                          isOverLimit ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                        }`}>
                          <FileText className="w-3 h-3" />
                          {item.charCount.toLocaleString()}/{charLimit.toLocaleString()}
                        </span>

                        {item.bestTime && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700 text-slate-400">
                            <Clock className="w-3 h-3" />
                            {item.bestTime}
                          </span>
                        )}

                        {item.tweets && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-sky-500/20 text-sky-400">
                            <Hash className="w-3 h-3" />
                            {item.tweets.length} tweets
                          </span>
                        )}

                        {item.hashtags && item.hashtags.length > 0 && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                            <Hash className="w-3 h-3" />
                            {item.hashtags.length} hashtags
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => copyToClipboard(
                          includeHashtags ? item.captionWithHashtags : item.caption,
                          item.id,
                          'post'
                        )}
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
                            Copy Post
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => openPlatform(item.platform, item.platform === 'twitter' ? item.tweets?.[0]?.text : undefined)}
                        className="px-4 py-2 rounded-xl font-medium text-sm bg-slate-700 hover:bg-slate-600 text-white transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open {item.platform === 'linkedin' ? 'LinkedIn' : 'Twitter'}
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
                      {/* Metadata Panel */}
                      {(item.targetAudience || item.engagementHook || item.blogUrl) && (
                        <div className="mb-4 p-3 bg-slate-800/50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          {item.targetAudience && (
                            <div className="flex items-start gap-2">
                              <Users className="w-4 h-4 text-amber-400 mt-0.5" />
                              <div>
                                <span className="text-slate-500 text-xs block">Target Audience</span>
                                <span className="text-slate-300">{item.targetAudience}</span>
                              </div>
                            </div>
                          )}
                          {item.engagementHook && (
                            <div className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-amber-400 mt-0.5" />
                              <div>
                                <span className="text-slate-500 text-xs block">Engagement Hook</span>
                                <span className="text-slate-300">{item.engagementHook}</span>
                              </div>
                            </div>
                          )}
                          {item.blogUrl && (
                            <div className="flex items-start gap-2">
                              <ExternalLink className="w-4 h-4 text-amber-400 mt-0.5" />
                              <div>
                                <span className="text-slate-500 text-xs block">Source Article</span>
                                <a href={item.blogUrl} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 break-all">
                                  {item.blogUrl.replace('https://www.frankx.ai/blog/', '')}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-4">
                        {/* Full Image */}
                        {item.imageUrl && (
                          <div className="w-64 flex-shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full rounded-xl"
                            />
                            <button
                              onClick={() => downloadImage(item.imageUrl!, `${item.id}.png`)}
                              className="mt-2 w-full py-2 text-center text-sm bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Download Image
                            </button>
                          </div>
                        )}

                        {/* Content Area */}
                        <div className="flex-1 min-w-0">
                          {/* Twitter Threads - Individual Tweets */}
                          {item.tweets && item.tweets.length > 0 ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                  Thread ({item.tweets.length} tweets)
                                </span>
                                <button
                                  onClick={() => copyToClipboard(item.caption, `${item.id}-all`, 'full thread')}
                                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                                >
                                  <Copy className="w-3 h-3" />
                                  Copy all
                                </button>
                              </div>
                              {item.tweets.map((tweet) => (
                                <div key={tweet.index} className="bg-slate-800/50 rounded-xl p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-sky-400">
                                      Tweet {tweet.index}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs ${tweet.charCount > 280 ? 'text-red-400' : 'text-slate-500'}`}>
                                        {tweet.charCount}/280
                                      </span>
                                      <button
                                        onClick={() => copyToClipboard(tweet.text, `${item.id}-${tweet.index}`, `Tweet ${tweet.index}`)}
                                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                                      >
                                        <Copy className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{tweet.text}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* LinkedIn Posts */
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Post Copy
                                  </span>
                                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={includeHashtags}
                                      onChange={(e) => setIncludeHashtags(e.target.checked)}
                                      className="w-3 h-3 rounded border-slate-600"
                                    />
                                    Include hashtags
                                  </label>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(
                                    includeHashtags ? item.captionWithHashtags : item.caption,
                                    item.id,
                                    'post'
                                  )}
                                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                                >
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </button>
                              </div>
                              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans bg-slate-800/50 rounded-xl p-4 max-h-96 overflow-y-auto">
                                {includeHashtags ? item.captionWithHashtags : item.caption}
                              </pre>

                              {/* Hashtags */}
                              {item.hashtags && item.hashtags.length > 0 && (
                                <div className="mt-3">
                                  <span className="text-xs text-slate-500 block mb-2">Hashtags (click to copy)</span>
                                  <div className="flex flex-wrap gap-2">
                                    {item.hashtags.map((tag, i) => (
                                      <button
                                        key={i}
                                        onClick={() => copyToClipboard(tag, `${item.id}-tag-${i}`, tag)}
                                        className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded-full text-amber-400 transition-colors"
                                      >
                                        {tag}
                                      </button>
                                    ))}
                                    <button
                                      onClick={() => copyToClipboard(item.hashtags.join(' '), `${item.id}-tags`, 'all hashtags')}
                                      className="px-2 py-1 text-xs bg-amber-500/20 hover:bg-amber-500/30 rounded-full text-amber-400 transition-colors"
                                    >
                                      Copy all
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
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

        {/* Workflow Guide */}
        <div className="mt-8 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
          <h3 className="text-sm font-medium text-white mb-4">Content Workflow</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold">1</span>
                Generate
              </div>
              <code className="block p-2 bg-slate-900/50 rounded-lg text-slate-400 text-xs">
                claude &quot;/content-studio social [slug]&quot;
              </code>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold">2</span>
                Review & Copy
              </div>
              <p className="text-slate-400 text-xs">
                Preview content, download image, copy text to clipboard
              </p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold">3</span>
                Post
              </div>
              <p className="text-slate-400 text-xs">
                Click &quot;Open LinkedIn/Twitter&quot;, paste content, add image, publish
              </p>
            </div>
          </div>
        </div>

        {/* Cost Info */}
        <div className="mt-4 text-center text-xs text-slate-500">
          Images generated via Nano Banana (~$0.02/image). Dashboard hosting: Free (Vercel). No ongoing costs.
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
