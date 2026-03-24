'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Terminal, ArrowLeft, Tag, X } from 'lucide-react';

const TYPE_OPTIONS = [
  { value: 'design', label: 'Design', desc: 'Personal architecture design' },
  { value: 'challenge', label: 'Challenge', desc: 'Post a design challenge for the community' },
  { value: 'blueprint', label: 'Blueprint', desc: 'Share a reusable architecture pattern' },
] as const;

const SUGGESTED_TAGS = [
  'distributed-systems', 'microservices', 'caching', 'databases',
  'api-gateway', 'load-balancer', 'message-queue', 'cdn',
  'authentication', 'real-time', 'event-driven', 'high-availability',
];

export default function NewDesignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'design' | 'challenge' | 'blueprint'>('design');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const addTag = (tag: string) => {
    const t = tag.toLowerCase().trim().replace(/\s+/g, '-');
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, type, tags, author: 'You', authorId: 'current-user' }),
      });
      const design = await res.json();
      router.push(`/design/${design.id}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-3">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono font-bold text-slate-200">ClickFix.dev</span>
          <span className="text-slate-700">/</span>
          <Link href="/design" className="font-mono text-slate-400 hover:text-slate-200 text-sm transition-colors">
            Design Platform
          </Link>
          <span className="text-slate-700">/</span>
          <span className="font-mono text-slate-200 text-sm">New</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/design" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Designs
        </Link>

        <h1 className="font-mono font-bold text-3xl text-slate-100 mb-8">Create New Design</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type */}
          <div>
            <label className="block font-mono text-sm text-slate-400 mb-3">Type</label>
            <div className="grid grid-cols-3 gap-3">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setType(opt.value)}
                  className={`p-3 text-left rounded-sm border transition-all ${
                    type === opt.value
                      ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="font-mono font-bold text-sm">{opt.label}</div>
                  <div className="text-xs mt-1 opacity-70">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-mono text-sm text-slate-400 mb-2">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design a Buy with Prime Returns System"
              className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 font-mono text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono text-sm text-slate-400 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the system requirements, constraints, and success criteria..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 font-mono text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-mono text-sm text-slate-400 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 font-mono text-xs text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-1 rounded-sm">
                  <Tag className="w-2.5 h-2.5" /> {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-400 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mb-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); } }}
                placeholder="Add a tag and press Enter"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-sm px-4 py-2 font-mono text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 font-mono text-sm rounded-sm hover:bg-slate-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="font-mono text-xs text-slate-500 bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-slate-300 px-2 py-1 rounded-sm transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="w-full py-3 bg-cyan-500 text-slate-950 font-mono font-bold text-sm rounded-sm hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Open Design Studio →'}
          </button>
        </form>
      </div>
    </div>
  );
}
