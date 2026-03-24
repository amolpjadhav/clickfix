'use client';

import { ArrowRight, FileText, Mail, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "./data";
import { useState } from "react";

const TAG_COLORS: Record<string, string> = {
  Performance: "text-lime-400 border-lime-500/30 bg-lime-500/8",
  Architecture: "text-cyan-400 border-cyan-500/30 bg-cyan-500/8",
  React: "text-indigo-400 border-indigo-500/30 bg-indigo-500/8",
};

export default function Blog() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="blog" className="w-full py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-lime-400" />
              <span className="font-mono text-sm text-lime-400 tracking-widest uppercase">// Engineering Log</span>
            </div>
            <h2 className="font-mono font-bold text-4xl md:text-5xl text-white">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-cyan-400">Insights</span>.
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-slate-500 font-mono text-sm hover:text-slate-300 transition-colors">
            VIEW ARCHIVE <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogPosts.map((post, i) => (
            <Link
              href={`/blog/${post.slug}`}
              key={i}
              className="group flex flex-col bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-sm overflow-hidden card-beam transition-all hover:-translate-y-1"
            >
              {/* Color bar */}
              <div className={`h-0.5 w-full ${
                i === 0 ? "bg-linear-to-r from-lime-500 to-cyan-500" :
                i === 1 ? "bg-linear-to-r from-cyan-500 to-indigo-500" :
                          "bg-linear-to-r from-indigo-500 to-lime-500"
              }`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <span className={`font-mono text-xs px-2.5 py-1 rounded-sm border ${TAG_COLORS[post.tag] ?? "text-slate-400 border-slate-700"}`}>
                    {post.tag}
                  </span>
                  <span className="font-mono text-xs text-slate-600">{post.readTime}</span>
                </div>

                <h3 className="font-mono font-bold text-lg text-slate-200 mb-3 group-hover:text-lime-400 transition-colors leading-snug flex-none">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">{post.excerpt}</p>

                <div className="flex items-center gap-2 font-mono text-sm text-slate-400 group-hover:text-white transition-colors pt-5 border-t border-slate-800/60">
                  READ POST <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Subscribe */}
        <div className="mt-14 p-8 bg-linear-to-br from-slate-900/60 to-slate-950/60 border border-slate-800 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/3 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-md">
              <h3 className="font-mono font-bold text-xl text-white flex items-center gap-2">
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
                className="bg-slate-950 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-sm focus:outline-none focus:border-cyan-500/60 w-full md:w-64 font-mono text-sm transition-colors"
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-5 py-2.5 rounded-sm hover:bg-cyan-500 hover:text-slate-950 transition-all font-mono text-sm font-bold flex items-center gap-2 min-w-36 justify-center disabled:opacity-60"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> :
                 status === "success" ? <><Check className="w-4 h-4" /> DONE</> :
                 <>SUBSCRIBE <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
