'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ── count-up ─────────────────────────────────────────────────────── */
function useCountUp(target: number, dec: number, go: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    const t0 = Date.now(), dur = 2000;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setV(parseFloat((e * target).toFixed(dec)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, target, dec]);
  return v;
}

/* ── terminal lines ───────────────────────────────────────────────── */
const TERMINAL = [
  { text: '$ git push origin main --force-with-lease', dim: false },
  { text: '✓ CI passed  (47s)', dim: true },
  { text: '✓ Deployed to prod  (18ms p99)', dim: true },
  { text: '✓ 99.97% uptime  ·  0 incidents', dim: true },
];

/* ── stat card ────────────────────────────────────────────────────── */
function StatCard({
  prefix, target, dec, suffix, label, accent, go,
}: {
  prefix: string; target: number; dec: number; suffix: string; label: string;
  accent: string; go: boolean;
}) {
  const v = useCountUp(target, dec, go);
  const display = go ? (dec > 0 ? v.toFixed(dec) : Math.round(v)) : '—';
  return (
    <div className={`flex-1 rounded-xl border bg-slate-900/60 backdrop-blur-sm px-5 py-4 flex flex-col gap-1 ${accent}`}>
      <span className="font-mono font-black text-2xl text-white leading-none tracking-tight">
        {prefix}{display}{suffix}
      </span>
      <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const [go, setGo]           = useState(false);
  const [termIdx, setTermIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Stats counter on view
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.2 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  // Terminal reveal
  useEffect(() => {
    if (!mounted) return;
    TERMINAL.forEach((_, i) => setTimeout(() => setTermIdx(i + 1), 800 + i * 550));
  }, [mounted]);

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] max-w-7xl mx-auto px-6 flex flex-col gap-4 pb-6 overflow-hidden">

      {/* ── TOP STRIP ──────────────────────────────────────────────── */}
      <div className="flex-none flex items-center gap-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-lime-400 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-lime-400" />
          </span>
          <span className="font-mono text-xs text-slate-400">Available for new projects</span>
        </div>
        <div className="h-px flex-1 bg-slate-800/70" />
        <span className="font-mono text-xs text-slate-600 tracking-widest uppercase">Solo Product Engineer</span>
        <div className="h-px w-10 bg-slate-800/70" />
        <span className="font-mono text-xs text-slate-600">Est. 2015</span>
      </div>

      {/* ── MAIN GRID — fills the rest ─────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] grid-rows-[1fr_auto] gap-4 min-h-0">

        {/* ══ LEFT: headline cell ══════════════════════════════════════ */}
        <div className="flex flex-col justify-between min-h-0 overflow-hidden">

          {/* Giant fluid headline */}
          <h1
            className="font-mono font-black uppercase leading-[0.9] tracking-tight text-white mt-auto"
            style={{ fontSize: 'clamp(3.4rem, 9.5vw, 9.8rem)' }}
          >
            Full‑Stack<br />
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-cyan-300 to-lime-400"
            >
              Product
            </span><br />
            Engineer.
          </h1>

          {/* Sub-copy + CTAs */}
          <div className="mt-auto pt-6 space-y-5 border-t border-slate-800/60">
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
              10 years shipping web &amp; mobile systems for startups at Series&nbsp;A–B scale.
              Architecture, development, and ongoing support — all under one roof.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group flex items-center gap-2 px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-sm rounded-sm transition-colors"
              >
                BOOK A CALL
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#work"
                className="group flex items-center gap-2 px-7 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-sm rounded-sm transition-all"
              >
                SEE MY WORK
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* ══ RIGHT: bento stack (desktop) ═════════════════════════════ */}
        <div className="hidden lg:flex flex-col gap-3 min-h-0" ref={statsRef}>

          {/* Stats row */}
          <div className="flex gap-3">
            <StatCard prefix="$" target={10.4} dec={1} suffix="B" label="Revenue Impact"
              accent="border-cyan-500/20" go={go} />
            <StatCard prefix="" target={10} dec={0} suffix="yr" label="Experience"
              accent="border-slate-700" go={go} />
          </div>

          <div className="flex gap-3">
            <StatCard prefix="" target={200} dec={0} suffix="+" label="Tech Interviews"
              accent="border-slate-700" go={go} />
            <StatCard prefix="" target={99.9} dec={1} suffix="%" label="Avg SLA"
              accent="border-lime-500/20" go={go} />
          </div>

          {/* Terminal card — fills remaining height */}
          <div className="flex-1 rounded-xl border border-slate-700/60 bg-slate-950/90 overflow-hidden flex flex-col min-h-0">
            {/* chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-900/60 flex-none">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-lime-500/70" />
              </div>
              <span className="font-mono text-xs text-slate-600 ml-1">~ prod deploy</span>
            </div>
            {/* lines */}
            <div className="flex-1 p-4 font-mono text-xs space-y-2 overflow-hidden">
              {TERMINAL.slice(0, termIdx).map((line, i) => (
                <div
                  key={i}
                  className={`transition-all duration-400 ${
                    i === termIdx - 1 ? 'opacity-100' : 'opacity-60'
                  } ${line.dim ? 'text-lime-400' : 'text-slate-300'}`}
                >
                  {line.text}
                  {i === termIdx - 1 && termIdx < TERMINAL.length && (
                    <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-slate-300 animate-blink align-middle" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* "Let's work" micro-CTA card */}
          <a
            href="#contact"
            className="group flex items-center justify-between px-5 py-4 rounded-xl border border-slate-700 hover:border-cyan-500/40 bg-slate-900/60 hover:bg-slate-900 transition-all"
          >
            <div>
              <p className="font-mono font-bold text-sm text-white">Start a project →</p>
              <p className="font-mono text-xs text-slate-500 mt-0.5">Free 30-min discovery call</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>

        {/* ══ BOTTOM: dual-direction tech ticker, spans full width ══════ */}
        <div className="col-span-full flex-none overflow-hidden relative h-8">
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap h-full">
            {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker',
              'Kubernetes', 'GraphQL', 'tRPC', 'Prisma', 'Vercel', 'Tailwind CSS',
              'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker',
              'Kubernetes', 'GraphQL', 'tRPC', 'Prisma', 'Vercel', 'Tailwind CSS'].map((t, i) => (
              <span key={i} className="font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors shrink-0 flex items-center gap-2">
                <span className="w-0.5 h-0.5 rounded-full bg-slate-700" />
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
