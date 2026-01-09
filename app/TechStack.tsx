import { Code2 } from 'lucide-react';

export default function TechStack() {
  const stack = [
    "TypeScript", "Node.js", "React", "Next.js", "AWS", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "Redis"
  ];

  return (
    <section className="w-full border-y border-slate-900 bg-slate-950/50 overflow-hidden py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
        <span className="text-xs font-mono text-slate-500 uppercase whitespace-nowrap">Core Technologies ::</span>
        
        <div className="flex-1 overflow-hidden relative group">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...stack, ...stack].map((tech, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/50 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                <Code2 className="w-3 h-3 opacity-50" />
                <span className="text-sm font-mono font-semibold">
                {tech}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-950 to-transparent" />
        </div>
      </div>
    </section>
  );
}