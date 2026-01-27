'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Grid3X3,
  Plus,
  Sparkles,
  Send,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  FileText,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  RefreshCw,
  Eye,
  Trash2,
  Edit3
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'youtube';
  status: 'draft' | 'scheduled' | 'published' | 'generating';
  scheduledFor?: string;
  imagePath?: string;
  captionPath?: string;
  createdAt: string;
  blogSlug?: string;
}

interface ContentQueue {
  pending: QueueTask[];
  completed: QueueTask[];
}

interface QueueTask {
  id: string;
  type: 'generate_social' | 'generate_image' | 'publish';
  params: Record<string, string>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

const platformIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

const platformColors = {
  linkedin: 'bg-blue-500',
  twitter: 'bg-sky-500',
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  youtube: 'bg-red-500',
};

const statusColors = {
  draft: 'bg-gray-500',
  scheduled: 'bg-amber-500',
  published: 'bg-green-500',
  generating: 'bg-purple-500 animate-pulse',
};

export default function ContentStudioPage() {
  const [view, setView] = useState<'calendar' | 'grid'>('grid');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [queue, setQueue] = useState<ContentQueue>({ pending: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  useEffect(() => {
    loadContent();
    loadQueue();
  }, []);

  const loadContent = async () => {
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

  const loadQueue = async () => {
    try {
      const res = await fetch('/api/content-studio/queue');
      if (res.ok) {
        const data = await res.json();
        setQueue(data);
      }
    } catch (error) {
      console.error('Failed to load queue:', error);
    }
  };

  const triggerAction = async (action: string, params: Record<string, string> = {}) => {
    try {
      const res = await fetch('/api/content-studio/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, params }),
      });
      if (res.ok) {
        loadQueue();
      }
    } catch (error) {
      console.error('Failed to trigger action:', error);
    }
  };

  const filteredContent = selectedPlatform === 'all'
    ? content
    : content.filter(c => c.platform === selectedPlatform);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Content Studio</h1>
                <p className="text-sm text-slate-400">Visual content management + Claude Code automation</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    view === 'grid' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`p-2 rounded-md transition-colors ${
                    view === 'calendar' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>

              {/* Refresh */}
              <button
                onClick={() => { loadContent(); loadQueue(); }}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">

            {/* Quick Actions */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => triggerAction('generate_social_pack')}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border border-blue-500/30 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">Generate LinkedIn</span>
                </button>

                <button
                  onClick={() => triggerAction('generate_twitter_thread')}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-sky-500/20 to-sky-600/20 hover:from-sky-500/30 hover:to-sky-600/30 border border-sky-500/30 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-sky-500 rounded-xl group-hover:scale-110 transition-transform">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">Generate Thread</span>
                </button>

                <button
                  onClick={() => triggerAction('generate_images')}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border border-purple-500/30 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-purple-500 rounded-xl group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">Generate Images</span>
                </button>

                <button
                  onClick={() => triggerAction('remix_latest_blog')}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 border border-amber-500/30 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">Remix Blog</span>
                </button>
              </div>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['all', 'linkedin', 'twitter', 'instagram', 'youtube'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedPlatform === platform
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="bg-slate-800/50 rounded-2xl p-12 border border-slate-700/50 text-center">
                <div className="p-4 bg-slate-700/50 rounded-full w-fit mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No content yet</h3>
                <p className="text-slate-400 mb-6">Generate your first social content from the quick actions above</p>
                <button
                  onClick={() => triggerAction('generate_social_pack')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Generate Content
                </button>
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
                {filteredContent.map((item) => {
                  const PlatformIcon = platformIcons[item.platform];
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-colors group"
                    >
                      {/* Image Preview */}
                      {item.imagePath && (
                        <div className="aspect-video bg-slate-900 relative overflow-hidden">
                          <img
                            src={item.imagePath}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                          {/* Platform Badge */}
                          <div className={`absolute top-3 left-3 p-2 ${platformColors[item.platform]} rounded-lg`}>
                            <PlatformIcon className="w-4 h-4 text-white" />
                          </div>

                          {/* Status Badge */}
                          <div className={`absolute top-3 right-3 px-3 py-1 ${statusColors[item.status]} rounded-full text-xs font-medium text-white flex items-center gap-1`}>
                            {item.status === 'scheduled' && <Clock className="w-3 h-3" />}
                            {item.status === 'published' && <CheckCircle2 className="w-3 h-3" />}
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-medium text-white mb-2 line-clamp-2">{item.title}</h3>

                        {item.scheduledFor && (
                          <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
                            <Clock className="w-4 h-4" />
                            {new Date(item.scheduledFor).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex-1" />
                          <button className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1">
                            <Send className="w-3 h-3" />
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar - Queue */}
          <div className="space-y-6">
            {/* Task Queue */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Task Queue
              </h2>

              {queue.pending.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No pending tasks</p>
              ) : (
                <div className="space-y-3">
                  {queue.pending.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'processing' ? 'bg-amber-500 animate-pulse' : 'bg-slate-500'
                        }`} />
                        <span className="text-sm font-medium text-white">
                          {task.type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {new Date(task.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4">This Week</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500">
                    {content.filter(c => c.status === 'published').length}
                  </div>
                  <div className="text-sm text-slate-400">Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500">
                    {content.filter(c => c.status === 'scheduled').length}
                  </div>
                  <div className="text-sm text-slate-400">Scheduled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">
                    {content.filter(c => c.status === 'draft').length}
                  </div>
                  <div className="text-sm text-slate-400">Drafts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">
                    {queue.completed.length}
                  </div>
                  <div className="text-sm text-slate-400">Generated</div>
                </div>
              </div>
            </div>

            {/* Claude Code Status */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl p-6 border border-amber-500/30">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Claude Code
              </h2>
              <p className="text-sm text-slate-300 mb-4">
                Run the watcher on your desktop to process queued tasks automatically.
              </p>
              <code className="block p-3 bg-slate-900/50 rounded-lg text-xs text-amber-400 font-mono">
                claude &quot;/content-studio watch&quot;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
