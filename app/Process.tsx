import { Search, Wrench, TrendingUp } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: Search,
      title: "Diagnostic Audit",
      desc: "I dive deep into your codebase and infrastructure to identify bottlenecks, security risks, and architectural flaws."
    },
    {
      icon: Wrench,
      title: "Surgical Repair",
      desc: "I execute high-impact fixes and refactors. No complete rewrites—just targeted engineering to stabilize your system."
    },
    {
      icon: TrendingUp,
      title: "Scale & Handover",
      desc: "Once stable, I optimize for growth and provide detailed documentation so your team can maintain velocity."
    }
  ];

  return (
    <section id="process" className="w-full py-24 bg-slate-900/20 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono mb-4">
            Engagement <span className="text-cyan-400">Protocol</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            A transparent, results-driven workflow designed to minimize disruption and maximize system stability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative p-6 border border-slate-800 bg-slate-950 rounded-sm">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono text-cyan-400">
                0{i + 1}
              </div>
              <step.icon className="w-8 h-8 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}