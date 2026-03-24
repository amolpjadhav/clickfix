import { getDesigns } from '@/lib/designStore';
import Link from 'next/link';
import { Plus, Layout, Users, Zap, Trophy, ArrowRight, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

const TYPE_COLORS: Record<string, string> = {
  challenge: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  blueprint: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  design: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
};

export default function DesignPage() {
  const designs = getDesigns();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-500 hover:text-slate-300 font-mono text-sm transition-colors">
              ← ClickFix.dev
            </Link>
            <span className="text-slate-700">/</span>
            <span className="font-mono font-bold text-slate-200">Design Platform</span>
          </div>
          <Link
            href="/feed"
            className="font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            Community Feed <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4">
            <Zap className="w-3 h-3" /> AI-Powered Architecture Reviews
          </div>
          <h1 className="font-mono font-bold text-4xl text-slate-100 mb-3">
            System Design Studio
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Draw distributed systems, get Bar Raiser feedback, and simulate your architecture
            with Claude AI. Collaborate live with your team.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { icon: Layout, label: 'Designs', value: designs.length.toString() },
            { icon: Users, label: 'Collaborators', value: '24' },
            { icon: Trophy, label: 'Blueprints Badged', value: designs.filter(d => d.isBadged).length.toString() },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-sm p-5">
              <Icon className="w-4 h-4 text-cyan-400 mb-2" />
              <div className="font-mono text-2xl font-bold text-slate-100">{value}</div>
              <div className="text-slate-500 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Create New Design CTA */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-mono font-bold text-xl text-slate-100">Your Designs</h2>
          <Link
            href="/design/new"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 font-mono text-sm font-bold rounded-sm hover:bg-cyan-400 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Design
          </Link>
        </div>

        {/* Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designs.map((design) => (
            <Link
              key={design.id}
              href={`/design/${design.id}`}
              className="group bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-sm p-5 transition-all hover:bg-slate-900/80"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`font-mono text-xs px-2 py-0.5 rounded-sm border capitalize ${TYPE_COLORS[design.type]}`}>
                  {design.type}
                </span>
                {design.isBadged && (
                  <span className="flex items-center gap-1 font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-sm">
                    <Trophy className="w-3 h-3" /> Blueprint
                  </span>
                )}
              </div>

              <h3 className="font-mono font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2 line-clamp-2">
                {design.title}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-4">{design.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {design.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="flex items-center gap-1 font-mono text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-sm">
                    <Tag className="w-2.5 h-2.5" /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>{design.author}</span>
                <span>▲ {design.votes}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
