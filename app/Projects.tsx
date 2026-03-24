'use client';

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Briefcase } from "lucide-react";

const PROJECTS = [
  {
    id: "ecom",
    title: "E-Commerce Scale",
    label: "~/projects/ecom",
    desc: "Migrated a monolithic Shopify setup to a headless Next.js architecture, handling 50k+ concurrent users during flash sales with zero downtime.",
    tags: ["Next.js", "Shopify", "Redis", "Vercel"],
    metrics: [{ v: "50k+", l: "concurrent users" }, { v: "99.9%", l: "uptime" }, { v: "40%", l: "faster LCP" }],
    accent: "cyan",
  },
  {
    id: "fintech",
    title: "FinTech Dashboard",
    label: "~/projects/fintech",
    desc: "Real-time analytics dashboard for a crypto trading platform with sub-millisecond WebSocket updates and D3-powered visualisations.",
    tags: ["React", "WebSockets", "D3.js", "Postgres"],
    metrics: [{ v: "<1ms", l: "update latency" }, { v: "10M+", l: "data points/day" }, { v: "3x", l: "faster queries" }],
    accent: "lime",
  },
  {
    id: "health",
    title: "Healthcare Portal",
    label: "~/projects/health",
    desc: "HIPAA-compliant patient portal with end-to-end encryption, secure document handling, and role-based access control across 12 clinic sites.",
    tags: ["Node.js", "PostgreSQL", "AWS", "HIPAA"],
    metrics: [{ v: "12", l: "clinic sites" }, { v: "HIPAA", l: "compliant" }, { v: "0", l: "data breaches" }],
    accent: "indigo",
  },
] as const;

const ACCENT_MAP = {
  cyan:   { dot: "bg-cyan-400",   text: "text-cyan-400",   tag: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",   metric: "text-cyan-400"   },
  lime:   { dot: "bg-lime-400",   text: "text-lime-400",   tag: "text-lime-400 border-lime-500/30 bg-lime-500/5",   metric: "text-lime-400"   },
  indigo: { dot: "bg-indigo-400", text: "text-indigo-400", tag: "text-indigo-400 border-indigo-500/30 bg-indigo-500/5", metric: "text-indigo-400" },
} as const;

function ProjectCard({ p, delay }: { p: typeof PROJECTS[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const a = ACCENT_MAP[p.accent];

  return (
    <div
      ref={ref}
      className={`group relative bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-sm overflow-hidden card-beam transition-all duration-500 hover:-translate-y-1
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <div className={`w-2.5 h-2.5 rounded-full ${a.dot}`} />
          </div>
          <span className="font-mono text-xs text-slate-500">{p.label}</span>
        </div>
        <ArrowUpRight className={`w-3.5 h-3.5 ${a.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>

      <div className="p-6">
        <h3 className={`font-mono font-bold text-xl text-white group-hover:${a.text} transition-colors mb-3`}>{p.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.desc}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {p.metrics.map((m) => (
            <div key={m.l} className="bg-slate-950 border border-slate-800 rounded-sm p-2.5 text-center">
              <div className={`font-mono font-bold text-sm ${a.metric}`}>{m.v}</div>
              <div className="text-slate-600 text-xs mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className={`font-mono text-xs px-2 py-0.5 rounded-sm border ${a.tag}`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="w-full py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-lime-400" />
          <span className="font-mono text-sm text-lime-400 tracking-widest uppercase">// Selected Work</span>
        </div>
        <h2 className="font-mono font-bold text-4xl md:text-5xl text-white mb-12">
          What I&apos;ve{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-cyan-400">Shipped</span>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}
