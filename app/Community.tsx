'use client';

import { Users, MessageSquare, Github, ArrowRight, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, go: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    const t0 = Date.now(), dur = 1600;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, target]);
  return v;
}

const STATS = [
  { value: 2400, suffix: "+", label: "Members" },
  { value: 180,  suffix: "+", label: "Threads / Week" },
  { value: 98,   suffix: "%", label: "Questions Answered" },
];

function StatBox({ s, go }: { s: typeof STATS[0]; go: boolean }) {
  const v = useCountUp(s.value, go);
  return (
    <div className="text-center">
      <div className="font-mono font-bold text-2xl text-white">{go ? v : 0}{s.suffix}</div>
      <div className="font-mono text-xs text-slate-500 mt-0.5">{s.label}</div>
    </div>
  );
}

export default function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section id="community" className="w-full py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 font-mono text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
            </span>
            COMMUNITY ACCESS OPEN
          </div>
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-white mb-4">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-cyan-400">Engineering Collective</span>.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Don&apos;t debug in isolation. Connect with senior engineers sharing
            architecture patterns, scaling strategies, and real war stories.
          </p>
        </div>

        {/* Stats bar */}
        <div ref={ref} className="flex items-center justify-center gap-12 mb-10 py-6 border-y border-slate-800">
          {STATS.map((s) => <StatBox key={s.label} s={s} go={go} />)}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <a
            href="#"
            className="group relative p-6 bg-slate-950 border border-slate-800 hover:border-[#5865F2]/60 rounded-sm transition-all hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#5865F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/20">
                  <MessageSquare className="w-5 h-5 text-[#5865F2]" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#5865F2] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-mono font-bold text-white mb-1">Discord Server</h3>
              <p className="font-mono text-xs text-slate-500 mb-3">Real-time chat &amp; voice</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Daily discussions on system design, Next.js performance, and engineering career growth.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Zap className="w-3 h-3 text-[#5865F2]" />
                <span className="font-mono text-xs text-slate-500">Active right now</span>
              </div>
            </div>
          </a>

          <a
            href="#"
            className="group relative p-6 bg-slate-950 border border-slate-800 hover:border-slate-500 rounded-sm transition-all hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-mono font-bold text-white mb-1">GitHub Discussions</h3>
              <p className="font-mono text-xs text-slate-500 mb-3">Async Q&amp;A &amp; Knowledge Base</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Deep dives into code snippets, RFC reviews, open-source contributions, and architecture ADRs.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Users className="w-3 h-3 text-slate-400" />
                <span className="font-mono text-xs text-slate-500">2,400+ contributors</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
