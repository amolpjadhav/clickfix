'use client';

import { Search, Wrench, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    icon: Search,
    num: "01",
    title: "Discovery & Planning",
    desc: "We start by discussing your vision, requirements, and business goals. I analyse technical feasibility and create a clear, prioritised roadmap with milestones.",
    accent: "cyan",
    detail: "~1–2 weeks",
  },
  {
    icon: Wrench,
    num: "02",
    title: "Development",
    desc: "I build your application using industry best practices, with regular demos and async updates so you're always in the loop — no black boxes.",
    accent: "lime",
    detail: "ongoing sprints",
  },
  {
    icon: TrendingUp,
    num: "03",
    title: "Launch & Support",
    desc: "I handle the deployment to production and provide ongoing support, monitoring, and iterations to ensure your users have a seamless experience.",
    accent: "indigo",
    detail: "long-term",
  },
] as const;

const AC = {
  cyan:   { text: "text-cyan-400",   border: "border-cyan-500/40",   bg: "bg-cyan-400/10",   num: "text-cyan-400/20"   },
  lime:   { text: "text-lime-400",   border: "border-lime-500/40",   bg: "bg-lime-400/10",   num: "text-lime-400/20"   },
  indigo: { text: "text-indigo-400", border: "border-indigo-500/40", bg: "bg-indigo-400/10", num: "text-indigo-400/20" },
} as const;

function StepCard({ step, i, delay }: { step: typeof STEPS[number]; i: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const a = AC[step.accent];
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`group relative bg-slate-950 border ${a.border} rounded-sm p-7 transition-all duration-500
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Step number — large watermark */}
      <div className={`absolute -top-3 -right-2 font-mono font-bold text-7xl ${a.num} select-none pointer-events-none leading-none`}>
        {step.num}
      </div>

      {/* Step badge */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border ${a.border} ${a.bg} mb-5`}>
        <span className={`font-mono text-xs font-bold ${a.text}`}>STEP {i + 1}</span>
        <span className="text-slate-600 font-mono text-xs">·</span>
        <span className="font-mono text-xs text-slate-500">{step.detail}</span>
      </div>

      <div className={`w-10 h-10 rounded-lg ${a.bg} border ${a.border} flex items-center justify-center mb-5`}>
        <Icon className={`w-5 h-5 ${a.text}`} />
      </div>

      <h3 className="font-mono font-bold text-xl text-white mb-3">{step.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="w-full py-24 bg-slate-900/20 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-white mb-4">
            How We{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">Work Together</span>.
          </h2>
          <p className="text-slate-400">
            A transparent, collaborative process designed to take your idea from concept to reality — with you in the loop every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* connector line — desktop only */}
          <div className="hidden md:block absolute top-1/2 left-[16.6%] right-[16.6%] h-px bg-linear-to-r from-cyan-500/20 via-lime-500/20 to-indigo-500/20 pointer-events-none -translate-y-1/2 z-0" />
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} i={i} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
