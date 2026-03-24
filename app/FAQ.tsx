'use client';

import { useState, useRef, useEffect } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Do you build apps from scratch?",
    a: "Yes. I specialise in end-to-end development for both web and mobile platforms, taking your idea from concept to launch — including infrastructure, CI/CD, and monitoring.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, typically Series A/B startups that have found product-market fit but are now struggling to scale their MVP codebase. I help them move from 'it works' to 'it scales'.",
  },
  {
    q: "Are you an agency?",
    a: "No. I am a solo product engineer. You work directly with me — no account managers, no juniors doing the actual work.",
  },
  {
    q: "What does your tech stack look like?",
    a: "Primarily TypeScript, React / Next.js, Node.js, PostgreSQL, and AWS. I adapt to your existing stack where it makes sense, and recommend changes where they'll have the biggest impact.",
  },
  {
    q: "How do engagements typically start?",
    a: "We kick off with a free 30-minute discovery call. I'll ask about your current pain points, goals, and timeline. From there I'll put together a scope of work before any commitment is made.",
  },
];

function FAQItem({ item, index }: { item: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(open ? bodyRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      className={`border rounded-sm transition-all duration-300 ${
        open ? "border-slate-700 bg-slate-900/60" : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
      }`}
    >
      <button
        className="w-full flex items-start gap-4 p-6 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-mono text-xs text-slate-600 mt-1 flex-none w-5 text-right">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex-1 font-mono font-bold text-slate-200 leading-snug">{item.q}</span>
        <span className={`flex-none w-6 h-6 rounded-sm border flex items-center justify-center transition-all ml-2 mt-0.5 ${
          open ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400" : "border-slate-700 text-slate-500"
        }`}>
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div ref={bodyRef} className="px-6 pb-6 pl-13">
          <p className="text-slate-400 leading-relaxed text-sm">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="w-full py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-sm text-indigo-400 tracking-widest uppercase">// FAQ</span>
        </div>
        <h2 className="font-mono font-bold text-4xl md:text-5xl text-white mb-12">
          Common{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Questions</span>.
        </h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => <FAQItem key={i} item={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}
