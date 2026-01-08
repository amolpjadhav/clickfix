'use client';

export default function TechStack() {
  const stack = [
    "TypeScript", "Node.js", "React", "Next.js", "AWS", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "Redis"
  ];

  return (
    <section className="w-full border-y border-slate-900 bg-slate-950/50 overflow-hidden py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
        <span className="text-xs font-mono text-slate-500 uppercase whitespace-nowrap">Core Technologies ::</span>
        
        <div className="flex-1 overflow-hidden relative">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...stack, ...stack].map((tech, i) => (
              <span key={i} className="text-sm font-mono text-slate-400 font-semibold">
                {tech}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-950 to-transparent" />
        </div>
      </div>
      <style jsx>{`
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}