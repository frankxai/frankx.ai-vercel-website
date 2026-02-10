'use client';

import { useState, useEffect } from 'react';
import { ContentCalendar } from './calendar';
import { PipelineBoard } from './pipeline';
import type { ContentItem, ContentStatus, ContentMetrics } from '@/lib/content/types';

type ViewMode = 'calendar' | 'pipeline' | 'list';

export default function ContentAdminPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState({ ideas: 0, drafts: 0, reviews: 0, editing: 0, seo: 0, published: 0 });
  const [metrics, setMetrics] = useState<ContentMetrics | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [contentRes, statsRes, metricsRes] = await Promise.all([
        fetch('/api/admin/content'),
        fetch('/api/admin/content/stats'),
        fetch('/api/admin/content/metrics')
      ]);
      
      const contentData = await contentRes.json();
      const statsData = await statsRes.json();
      const metricsData = await metricsRes.json();
      
      setContent(contentData);
      setStats(statsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (slug: string, status: ContentStatus) => {
    try {
      await fetch(`/api/admin/content/${slug}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      // Optimistic update
      setContent(prev => prev.map(c => 
        c.slug === slug ? { ...c, status } : c
      ));
      setStats(prev => ({
        ...prev,
        [status]: prev[status as keyof typeof prev] + 1,
        [content.find(c => c.slug === slug)?.status || 'idea']: 
          Math.max(0, prev[content.find(c => c.slug === slug)?.status as keyof typeof prev || 'idea'] - 1)
      }));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-400">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Manage your 2026 content strategy • {metrics?.totalPosts || 0} posts • {metrics?.totalWords?.toLocaleString() || 0} words
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              {(['calendar', 'pipeline', 'list'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === mode 
                      ? 'bg-cosmic-purple text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            
            <button className="px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 text-white rounded-lg font-medium transition-colors">
              + New Content
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-white">{metrics.totalPosts}</div>
              <div className="text-sm text-slate-400">Total Posts</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-emerald-400">{metrics.avgSeoScore}%</div>
              <div className="text-sm text-slate-400">Avg SEO Score</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-cosmic-purple">{stats.ideas + stats.drafts}</div>
              <div className="text-sm text-slate-400">In Progress</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-amber-400">{(metrics.totalWords / 2000).toFixed(0)}h</div>
              <div className="text-sm text-slate-400">Reading Content</div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {viewMode === 'calendar' && (
          <ContentCalendar 
            content={content}
            onSelectContent={setSelectedContent}
            onMoveContent={() => {}}
          />
        )}

        {viewMode === 'pipeline' && (
          <PipelineBoard 
            content={content}
            stats={stats}
            onSelectContent={setSelectedContent}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {viewMode === 'list' && (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Pillar</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">SEO</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {content.map(item => (
                  <tr 
                    key={item.slug} 
                    className="hover:bg-slate-700/30 cursor-pointer"
                    onClick={() => setSelectedContent(item)}
                  >
                    <td className="px-4 py-3 text-white font-medium">{item.title}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{item.pillar.split(' ')[0]}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.seoScore >= 80 ? 'bg-green-500' :
                              item.seoScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.seoScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{item.seoScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Content Detail Modal */}
        {selectedContent && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedContent(null)}
          >
            <div 
              className="bg-slate-900 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedContent.title}</h2>
                    <p className="text-slate-400 mt-1">{selectedContent.description}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedContent(null)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Pillar</label>
                    <p className="text-white">{selectedContent.pillar}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Status</label>
                    <p className="text-white capitalize">{selectedContent.status}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Word Count</label>
                    <p className="text-white">{selectedContent.wordCount.toLocaleString()} words</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Reading Time</label>
                    <p className="text-white">{selectedContent.readingTime}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">SEO Score</label>
                    <p className="text-white">{selectedContent.seoScore}%</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Author</label>
                    <p className="text-white">{selectedContent.author}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-slate-500 uppercase">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedContent.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-slate-500 uppercase">Reading Goal</label>
                  <p className="text-white mt-1">{selectedContent.readingGoal}</p>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-700 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 text-white rounded-lg font-medium transition-colors">
                  Edit Content
                </button>
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors">
                  View Live
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
