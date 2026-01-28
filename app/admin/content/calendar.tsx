'use client';

import { useState, useMemo } from 'react';
import type { ContentItem, ContentPillar } from '@/lib/content/types';

interface ContentCalendarProps {
  content: ContentItem[];
  onSelectContent: (content: ContentItem) => void;
  onMoveContent: (slug: string, direction: 'prev' | 'next') => void;
}

const PILLAR_COLORS: Record<ContentPillar, string> = {
  'Agentic Creator Mastery': 'bg-blue-500',
  'Conscious AI & Soul Frequency': 'bg-purple-500',
  'Music & Sound as Consciousness Technology': 'bg-pink-500',
  'Creator Productivity Systems': 'bg-emerald-500',
  'AI for Families & Professionals': 'bg-amber-500'
};

export function ContentCalendar({ content, onSelectContent, onMoveContent }: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 15)); // Jan 15, 2026
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = new Date(year, month, 1).getDay();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const contentByDay = useMemo(() => {
    const map = new Map<number, ContentItem[]>();
    content.forEach(item => {
      const day = parseInt(item.date.split('-')[2]);
      const existing = map.get(day) || [];
      map.set(day, [...existing, item]);
    });
    return map;
  }, [content]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];
  
  for (let i = 0; i < firstDayOffset; i++) {
    currentWeek.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <button 
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold text-white">{monthName}</h2>
        
        <button 
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-slate-700/50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {weeks.map((week, weekIndex) => (
          week.map((day, dayIndex) => {
            const dayContent = day ? contentByDay.get(day) : [];
            const isToday = day === new Date().getDate() && 
                           month === new Date().getMonth() && 
                           year === new Date().getFullYear();
            
            return (
              <div 
                key={`${weekIndex}-${dayIndex}`}
                className={`min-h-[100px] p-2 border-b border-r border-slate-700/30 ${
                  day ? 'bg-slate-800/30' : 'bg-slate-900/50'
                } ${isToday ? 'ring-2 ring-inset ring-cosmic-purple' : ''}`}
              >
                {day && (
                  <>
                    <span className={`text-sm ${isToday ? 'text-cosmic-purple font-bold' : 'text-slate-400'}`}>
                      {day}
                    </span>
                    
                    <div className="mt-1 space-y-1">
                      {dayContent?.slice(0, 2).map(item => (
                        <button
                          key={item.slug}
                          onClick={() => onSelectContent(item)}
                          className={`w-full text-left text-xs px-1.5 py-0.5 rounded truncate transition-colors ${
                            PILLAR_COLORS[item.pillar] || 'bg-slate-500'
                          } hover:opacity-80 text-white`}
                          title={item.title}
                        >
                          {item.title}
                        </button>
                      ))}
                      {dayContent && dayContent.length > 2 && (
                        <div className="text-xs text-slate-500 pl-1">
                          +{dayContent.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex flex-wrap gap-3">
          {Object.entries(PILLAR_COLORS).map(([pillar, color]) => (
            <div key={pillar} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-xs text-slate-400">{pillar.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
