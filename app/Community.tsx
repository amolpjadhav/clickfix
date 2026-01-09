import { Users, MessageSquare, Github, ArrowRight } from 'lucide-react';

export default function Community() {
  return (
    <section id="community" className="w-full py-24 border-t border-slate-900 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 font-mono text-xs">
          <Users className="w-3 h-3" />
          <span>COMMUNITY ACCESS OPEN</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white font-mono mb-6">
          Join the <span className="text-cyan-400">Engineering Collective</span>
        </h2>
        
        <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
          Don't debug in isolation. Join a network of senior engineers sharing architecture patterns, 
          scaling strategies, and war stories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a href="#" className="group p-6 bg-slate-950 border border-slate-800 hover:border-[#5865F2] rounded-sm transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-5 h-5 text-[#5865F2]" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-md bg-[#5865F2]/10 text-[#5865F2]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold font-mono">Discord Server</h3>
                <p className="text-slate-500 text-xs font-mono">Real-time chat & voice</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm text-left leading-relaxed">
              Daily discussions on system design, Next.js performance, and career growth.
            </p>
          </a>

          <a href="#" className="group p-6 bg-slate-950 border border-slate-800 hover:border-white rounded-sm transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-md bg-white/10 text-white">
                <Github className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold font-mono">GitHub Discussions</h3>
                <p className="text-slate-500 text-xs font-mono">Async Q&A & Knowledge Base</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm text-left leading-relaxed">
              Deep dives into code snippets, RFC reviews, and open source contributions.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}