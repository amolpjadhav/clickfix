'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Trophy, ChevronUp, Tag, Plus, X, ArrowRight, Search, Filter } from 'lucide-react';
import type { Design } from '@/lib/types';

const TYPE_COLORS: Record<string, string> = {
  challenge: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  blueprint: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  design: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
};

type FilterType = 'all' | 'challenge' | 'blueprint' | 'design';

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'just now';
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

interface DesignCardProps {
  design: Design;
  onVote: (id: string) => void;
  votedIds: Set<string>;
}

function DesignCard({ design, onVote, votedIds }: DesignCardProps) {
  const voted = votedIds.has(design.id);
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-sm p-5 transition-all group">
      {/* Vote + Type Row */}
      <div className="flex items-start gap-3">
        {/* Upvote */}
        <button
          onClick={() => onVote(design.id)}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-sm border transition-all flex-none ${
            voted
              ? 'bg-lime-500/15 border-lime-500/40 text-lime-400'
              : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-lime-500/40 hover:text-lime-400'
          }`}
        >
          <ChevronUp className="w-4 h-4" />
          <span className="font-mono text-xs font-bold">{design.votes + (voted ? 0 : 0)}</span>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`font-mono text-xs px-2 py-0.5 rounded-sm border capitalize ${TYPE_COLORS[design.type]}`}>
              {design.type}
            </span>
            {design.isBadged && (
              <span className="flex items-center gap-1 font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-sm">
                <Trophy className="w-3 h-3" /> Standardized Blueprint
              </span>
            )}
          </div>

          <Link href={`/design/${design.id}`} className="block group/link">
            <h3 className="font-mono font-bold text-slate-100 group-hover/link:text-cyan-400 transition-colors mb-1 leading-tight">
              {design.title}
            </h3>
          </Link>
          <p className="text-slate-500 text-sm line-clamp-2 mb-3">{design.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {design.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="flex items-center gap-1 font-mono text-xs text-slate-600 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-sm">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-600">
              by <span className="text-slate-400">{design.author}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-600">{timeAgo(design.createdAt)}</span>
              <Link
                href={`/design/${design.id}`}
                className="flex items-center gap-1 font-mono text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    fetch('/api/designs')
      .then((r) => r.json())
      .then((data) => { setDesigns(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleVote = async (id: string) => {
    const userId = 'feed-user';
    await fetch(`/api/designs/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    setVotedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setDesigns((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, votes: votedIds.has(id) ? d.votes - 1 : d.votes + 1 }
          : d
      )
    );
  };

  const filtered = designs.filter((d) => {
    const matchType = filter === 'all' || d.type === filter;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  const FILTER_TABS: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: designs.length },
    { value: 'challenge', label: 'Challenges', count: designs.filter((d) => d.type === 'challenge').length },
    { value: 'blueprint', label: 'Blueprints', count: designs.filter((d) => d.type === 'blueprint').length },
    { value: 'design', label: 'Designs', count: designs.filter((d) => d.type === 'design').length },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono font-bold text-slate-200">ClickFix.dev</span>
            </Link>
            <span className="text-slate-700">/</span>
            <span className="font-mono text-slate-300">Community Feed</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/design" className="font-mono text-sm text-slate-400 hover:text-slate-200 transition-colors">
              My Designs
            </Link>
            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 font-mono text-sm font-bold rounded-sm hover:bg-cyan-400 transition-colors"
            >
              <Plus className="w-4 h-4" /> Post Challenge
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-mono font-bold text-3xl text-slate-100 mb-2">Design Feed</h1>
          <p className="text-slate-400">
            Post system design challenges, share reusable blueprints, and get Bar Raiser reviews from principal engineers.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search designs, tags..."
              className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-10 pr-4 py-2 font-mono text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-sm p-1">
            <Filter className="w-3.5 h-3.5 text-slate-600 mx-2" />
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-3 py-1.5 font-mono text-xs rounded-sm transition-all ${
                  filter === tab.value
                    ? 'bg-slate-700 text-slate-200'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1.5 text-slate-600">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        {loading && (
          <div className="py-12 text-center font-mono text-sm text-slate-600">Loading designs...</div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center">
            <div className="font-mono text-4xl mb-4 opacity-30">⬡</div>
            <p className="font-mono text-slate-500">No designs found</p>
            <p className="font-mono text-xs text-slate-700 mt-1">Try a different filter or search term</p>
          </div>
        )}
        <div className="space-y-4">
          {filtered
            .sort((a, b) => b.votes - a.votes)
            .map((design) => (
              <DesignCard key={design.id} design={design} onVote={handleVote} votedIds={votedIds} />
            ))}
        </div>
      </div>

      {/* Post Challenge Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-sm w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-4 right-4 text-slate-600 hover:text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-mono font-bold text-xl text-slate-100 mb-2">Post a Challenge</h2>
            <p className="text-slate-500 text-sm mb-6">
              Create a system design challenge for the community to solve with architectural blueprints.
            </p>
            <div className="flex gap-3">
              <Link
                href="/design/new?type=challenge"
                onClick={() => setShowPostModal(false)}
                className="flex-1 py-3 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-sm font-bold rounded-sm hover:bg-amber-500/30 transition-colors text-center"
              >
                Post Challenge
              </Link>
              <Link
                href="/design/new?type=blueprint"
                onClick={() => setShowPostModal(false)}
                className="flex-1 py-3 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-sm font-bold rounded-sm hover:bg-cyan-500/30 transition-colors text-center"
              >
                Share Blueprint
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
