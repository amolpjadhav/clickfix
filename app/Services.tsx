'use client';

import { DraftingCompass, Cpu, Rocket, Check, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    num: "01", id: "arch", accent: "cyan",
    title: "System Architecture", subtitle: "Design & Strategy",
    icon: DraftingCompass,
    description: "Robust, scalable systems from day one. Whether it's choosing the right database or designing microservices, I ensure your foundation is rock-solid before a single line of code.",
    features: ["Tech Stack Selection", "Database Schema Design", "Cloud Infrastructure Planning"],
  },
  {
    num: "02", id: "dev", accent: "lime",
    title: "Full-Stack Development", subtitle: "Web & Mobile Build",
    icon: Cpu,
    description: "End-to-end application development with modern stacks. Clean, maintainable code that drives your business forward — from scrappy MVP to production-grade scale.",
    features: ["React / Next.js Web Apps", "Mobile App Development", "API & Backend Services"],
  },
  {
    num: "03", id: "maint", accent: "indigo",
    title: "Maintenance & Support", subtitle: "Long-term Care",
    icon: Rocket,
    description: "Software needs constant care. Ongoing maintenance, performance optimisation, and feature updates to keep your app running smoothly as your user base grows.",
    features: ["Bug Fixes & Updates", "Performance Tuning", "Security Patching"],
  },
] as const;

const A = {
  cyan:   { text: "text-cyan-400",   border: "hover:border-cyan-500/50",   bg: "bg-cyan-400/10",   num: "text-cyan-400",   shadow: "hover:shadow-cyan-500/10"   },
  lime:   { text: "text-lime-400",   border: "hover:border-lime-500/50",   bg: "bg-lime-400/10",   num: "text-lime-400",   shadow: "hover:shadow-lime-500/10"   },
  indigo: { text: "text-indigo-400", border: "hover:border-indigo-500/50", bg: "bg-indigo-400/10", num: "text-indigo-400", shadow: "hover:shadow-indigo-500/10" },
} as const;

function Card({ svc, delay }: { svc: typeof SERVICES[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const a = A[svc.accent];
  const Icon = svc.icon;

  return (
    <div
      ref={ref}
      className={`group relative h-full bg-slate-900/50 border border-slate-800 rounded-sm p-8
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl card-beam gradient-border
        ${a.border} ${a.shadow}
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* corner accents */}
      {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((cls) => (
        <div key={cls} className={`absolute w-4 h-4 ${cls} border-slate-700 group-hover:border-slate-500 transition-colors`} />
      ))}

      {/* watermark number */}
      <div className={`absolute top-5 right-7 font-mono font-bold text-5xl ${a.num} opacity-[0.07] select-none group-hover:opacity-[0.14] transition-opacity`}>
        {svc.num}
      </div>

      {/* icon */}
      <div className={`w-11 h-11 rounded-lg border border-slate-800 ${a.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${a.text}`} />
      </div>

      <h3 className="font-mono font-bold text-xl text-white mb-0.5">{svc.title}</h3>
      <p className={`font-mono text-xs uppercase tracking-widest ${a.text} opacity-70 mb-5`}>{svc.subtitle}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-8">{svc.description}</p>

      <ul className="space-y-3">
        {svc.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
            <Check className={`w-4 h-4 flex-none ${a.text}`} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-sm text-cyan-400 tracking-widest uppercase">// Services</span>
          </div>
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-white">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-lime-400">Technical Services</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => <Card key={svc.id} svc={svc} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}
