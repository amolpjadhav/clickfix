'use client';

import { ArrowRight, FileText, Mail, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from './data';
import { useState } from 'react';

export default function Blog() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="blog" className="w-full py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-lime-400" />
              <span className="font-mono text-sm text-lime-400 tracking-wider uppercase">// Engineering Log</span>
            </div>
            <h2 className="text-3xl font-bold text-white font-mono">
              Technical <span className="text-cyan-400">Insights</span>
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-slate-400 font-mono text-sm hover:text-white transition-colors">
            VIEW ARCHIVE <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col h-full bg-slate-900/20 border border-slate-800 p-6 rounded-sm hover:border-lime-500/50 transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded-sm bg-cyan-500/10">
                  {post.tag}
                </span>
                <span className="text-xs font-mono text-slate-500">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-lime-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              
              <div className="pt-6 border-t border-slate-800/50 flex items-center text-slate-300 text-sm font-mono font-bold group-hover:text-white transition-colors">
                READ POST <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Subscribe Form */}
        <div className="mt-16 p-8 bg-slate-900/30 border border-slate-800 rounded-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <Mail className="w-5 h-5 text-lime-400" />
                Subscribe to Engineering Blog
              </h3>
              <p className="text-slate-400 text-sm">
                Get technical deep dives and architecture patterns delivered to your inbox. No spam, just code.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dev@example.com"
                required
                className="bg-slate-950 border border-slate-800 text-slate-200 px-4 py-2 rounded-sm focus:outline-none focus:border-cyan-500 w-full md:w-64 font-mono text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-4 py-2 rounded-sm hover:bg-cyan-500 hover:text-slate-950 transition-all font-mono text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <Check className="w-4 h-4" /> SUBSCRIBED
                  </>
                ) : (
                  <>
                    SUBSCRIBE <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}