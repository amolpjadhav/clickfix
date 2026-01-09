export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Scale",
      desc: "Migrated a monolithic Shopify setup to a headless Next.js architecture, handling 50k+ concurrent users during flash sales.",
      tags: ["Next.js", "Shopify", "Redis"],
    },
    {
      title: "FinTech Dashboard",
      desc: "Real-time analytics dashboard for a crypto trading platform with sub-millisecond updates and WebSocket integration.",
      tags: ["React", "WebSockets", "D3.js"],
    },
    {
      title: "Healthcare Portal",
      desc: "HIPAA-compliant patient portal with end-to-end encryption, secure document handling, and role-based access control.",
      tags: ["Node.js", "PostgreSQL", "AWS"],
    }
  ];

  return (
    <section id="work" className="w-full py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white font-mono mb-12">
          Selected <span className="text-cyan-400">Work</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group p-6 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all rounded-sm hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded-sm border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}