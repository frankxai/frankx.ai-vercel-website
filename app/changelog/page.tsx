'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Types
interface CommitData {
  hash: string;
  message: string;
  date: string;
  repo: string;
  category: string;
}

interface DayActivity {
  date: string;
  commits: number;
  repos: string[];
}

// Generate mock data for the contribution graph (will be replaced by API)
function generateContributionData(): DayActivity[] {
  const days: DayActivity[] = [];
  const now = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Simulate varying commit activity
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCommits = isWeekend ? 2 : 5;
    const variance = Math.random() * 10;
    const commits = Math.max(0, Math.floor(baseCommits + variance - 3));

    const possibleRepos = ['FrankX', 'Arcanea', 'oracle-work', 'vibe-os', 'claude-mem'];
    const activeRepos = possibleRepos.filter(() => Math.random() > 0.6);

    days.push({
      date: date.toISOString().split('T')[0],
      commits,
      repos: activeRepos,
    });
  }

  return days;
}

// Contribution intensity color
function getIntensityColor(commits: number): string {
  if (commits === 0) return 'bg-zinc-800';
  if (commits <= 2) return 'bg-emerald-900';
  if (commits <= 5) return 'bg-emerald-700';
  if (commits <= 10) return 'bg-emerald-500';
  return 'bg-emerald-400';
}

// Category icon
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    feature: '🚀',
    fix: '🔧',
    docs: '📝',
    refactor: '♻️',
    test: '🧪',
    chore: '🔨',
    style: '💅',
    perf: '⚡',
  };
  return icons[category] || '📦';
}

// Recent commits (mock data)
const recentCommits: CommitData[] = [
  { hash: '8313670', message: 'feat: Add 8 premium hero images (Batch 2)', date: '2026-01-27', repo: 'Production', category: 'feature' },
  { hash: 'ea2dc81', message: 'feat: Complete ACOS content series', date: '2026-01-27', repo: 'Production', category: 'feature' },
  { hash: 'd749f35', message: 'feat: Add ACOS philosophy articles', date: '2026-01-27', repo: 'Production', category: 'feature' },
  { hash: 'a50e2a0', message: 'fix: ESLint + security headers', date: '2026-01-27', repo: 'Production', category: 'fix' },
  { hash: 'b1738ea', message: 'feat: Observability stack article', date: '2026-01-27', repo: 'Production', category: 'feature' },
  { hash: '78ff1f4', message: 'fix: Sync WCAG improvements', date: '2026-01-27', repo: 'FrankX', category: 'fix' },
  { hash: '97dd4d5', message: 'feat: Brand DNA integration', date: '2026-01-27', repo: 'FrankX', category: 'feature' },
  { hash: '2ba2755', message: 'feat: ACOS deep-dive articles (batch 2)', date: '2026-01-26', repo: 'Production', category: 'feature' },
];

export default function ChangelogPage() {
  const [contributionData, setContributionData] = useState<DayActivity[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayActivity | null>(null);

  useEffect(() => {
    setContributionData(generateContributionData());
  }, []);

  // Group by weeks for the grid
  const weeks: DayActivity[][] = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }

  // Stats
  const totalCommits = contributionData.reduce((sum, d) => sum + d.commits, 0);
  const activeDays = contributionData.filter(d => d.commits > 0).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = contributionData.length - 1; i >= 0; i--) {
      if (contributionData[i].commits > 0) streak++;
      else break;
    }
    return streak;
  })();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/" className="text-zinc-500 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Development Changelog</h1>
          <p className="text-zinc-400">
            Real-time progress tracking across all FrankX projects
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="bg-zinc-900 rounded-lg p-4 animate-fade-in-up opacity-0 motion-reduce:animate-none"
            >
              <div className="text-3xl font-bold text-emerald-400">{totalCommits.toLocaleString()}</div>
              <div className="text-zinc-500 text-sm">Total Commits (1yr)</div>
            </div>
            <div
              className="bg-zinc-900 rounded-lg p-4 animate-fade-in-up opacity-0 motion-reduce:animate-none"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="text-3xl font-bold text-blue-400">{activeDays}</div>
              <div className="text-zinc-500 text-sm">Active Days</div>
            </div>
            <div
              className="bg-zinc-900 rounded-lg p-4 animate-fade-in-up opacity-0 motion-reduce:animate-none"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-3xl font-bold text-purple-400">{currentStreak}</div>
              <div className="text-zinc-500 text-sm">Current Streak</div>
            </div>
            <div
              className="bg-zinc-900 rounded-lg p-4 animate-fade-in-up opacity-0 motion-reduce:animate-none"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-3xl font-bold text-amber-400">6</div>
              <div className="text-zinc-500 text-sm">Active Repos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold mb-4">Contribution Activity</h2>

          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getIntensityColor(day.commits)} cursor-pointer hover:ring-2 hover:ring-white/30 animate-scale-in opacity-0 motion-reduce:animate-none`}
                      title={`${day.date}: ${day.commits} commits`}
                      onClick={() => setSelectedDay(day)}
                      style={{ animationDelay: `${(weekIndex * 0.01 + dayIndex * 0.01).toFixed(2)}s` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-sm text-zinc-500">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-zinc-800" />
            <div className="w-3 h-3 rounded-sm bg-emerald-900" />
            <div className="w-3 h-3 rounded-sm bg-emerald-700" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
            <span>More</span>
          </div>

          {/* Selected day details */}
          {selectedDay && (
            <div
              className="mt-4 p-4 bg-zinc-900 rounded-lg animate-fade-in-up motion-reduce:animate-none"
            >
              <div className="font-semibold">{selectedDay.date}</div>
              <div className="text-zinc-400">
                {selectedDay.commits} commits
                {selectedDay.repos.length > 0 && (
                  <> in {selectedDay.repos.join(', ')}</>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Commits */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Recent Commits</h2>

        <div className="space-y-2">
          {recentCommits.map((commit, index) => (
            <div
              key={commit.hash}
              className="flex items-center gap-4 p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors animate-fade-in-up opacity-0 motion-reduce:animate-none"
              style={{ animationDelay: `${(index * 0.05).toFixed(2)}s` }}
            >
              <span className="text-2xl">{getCategoryIcon(commit.category)}</span>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm text-zinc-500">{commit.hash}</div>
                <div className="truncate">{commit.message}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm text-emerald-400">{commit.repo}</div>
                <div className="text-xs text-zinc-500">{commit.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View more link */}
        <div className="mt-6 text-center">
          <a
            href="https://github.com/frankxai/frankx-logs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Full Logs on GitHub
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          Powered by AI Session Logging System • Updated in real-time
        </div>
      </div>
    </div>
  );
}
