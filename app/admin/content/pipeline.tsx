'use client';

import { useState } from 'react';
import type { ContentItem, ContentStatus, PipelineStats } from '@/lib/content/types';

interface PipelineBoardProps {
  content: ContentItem[];
  stats: PipelineStats;
  onSelectContent: (content: ContentItem) => void;
  onUpdateStatus: (slug: string, status: ContentStatus) => void;
}

const STATUS_LABELS: Record<ContentStatus, { label: string; color: string }> = {
  idea: { label: 'Ideas', color: 'from-slate-500 to-slate-600' },
  draft: { label: 'Drafts', color: 'from-amber-500 to-amber-600' },
  review: { label: 'Review', color: 'from-purple-500 to-purple-600' },
  edit: { label: 'Editing', color: 'from-blue-500 to-blue-600' },
  seo: { label: 'SEO', color: 'from-emerald-500 to-emerald-600' },
  published: { label: 'Published', color: 'from-green-500 to-green-600' }
};

const STATUS_ORDER: ContentStatus[] = ['idea', 'draft', 'review', 'edit', 'seo', 'published'];

export function PipelineBoard({ content, stats, onSelectContent, onUpdateStatus }: PipelineBoardProps) {
  const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);

  const handleDragStart = (item: ContentItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: ContentStatus) => {
    if (draggedItem) {
      onUpdateStatus(draggedItem.slug, status);
      setDraggedItem(null);
    }
  };

  const getContentByStatus = (status: ContentStatus) => 
    content.filter(c => c.status === status);

  const statValues = [
    { label: 'Ideas', value: stats.ideas, color: 'text-slate-400' },
    { label: 'Drafts', value: stats.drafts, color: 'text-amber-400' },
    { label: 'Review', value: stats.reviews, color: 'text-purple-400' },
    { label: 'Editing', value: stats.editing, color: 'text-blue-400' },
    { label: 'SEO', value: stats.seo, color: 'text-emerald-400' },
    { label: 'Published', value: stats.published, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statValues.map(stat => (
          <div 
            key={stat.label}
            className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50"
          >
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUS_ORDER.map(status => {
          const items = getContentByStatus(status);
          const config = STATUS_LABELS[status];
          
          return (
            <div
              key={status}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
              className="flex-shrink-0 w-72 bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden"
            >
              {/* Column Header */}
              <div className={`bg-gradient-to-r ${config.color} p-3`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{config.label}</span>
                  <span className="bg-white/20 text-white text-sm px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
                {items.map(item => (
                  <div
                    key={item.slug}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    onClick={() => onSelectContent(item)}
                    className={`bg-slate-700/50 p-3 rounded-lg border border-slate-600/50 cursor-grab active:cursor-grabbing hover:bg-slate-700/70 transition-all ${
                      draggedItem?.slug === item.slug ? 'opacity-50' : ''
                    }`}
                  >
                    <h4 className="font-medium text-white text-sm line-clamp-2">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-400">{item.pillar.split(' ')[0]}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{item.readingTime}</span>
                    </div>
                    {item.seoScore > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-600 rounded-full overflow-hidden">
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
                    )}
                  </div>
                ))}
                
                {items.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    Drop content here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg p-4">
        <p className="text-sm text-cosmic-purple">
          💡 Drag and drop content cards to move them through the pipeline. Click on any card to view details.
        </p>
      </div>
    </div>
  );
}
