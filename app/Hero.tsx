'use client';

import { ArrowRight, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-4 pb-16 md:pt-8 md:pb-24 lg:pt-12 lg:pb-32 overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Value Prop */}
        <div 
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white font-mono animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Digital Handyman <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
              for Web & Mobile.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            I build end-to-end web and mobile applications and provide ongoing maintenance. I handle the engineering so you can focus on your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#contact" className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono rounded-sm transition-all flex items-center justify-center gap-2">
              BOOK CONSULTATION
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 font-mono rounded-sm transition-all flex items-center justify-center">
              VIEW SERVICES
            </a>
          </div>

          {/* Trust Signals / Stats */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <h3 className="text-2xl font-bold text-white font-mono">$10.4B</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Revenue Impact</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-mono">200+</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Technical Interviews</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-mono">10 Yrs</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider">System Design</p>
            </div>
          </div>
        </div>

        {/* Right Column: The "Digital Workshop" Visual */}
        <div 
          className="relative hidden lg:block"
        >
          {/* Abstract Terminal Window */}
          <div className="relative rounded-lg bg-slate-900 border border-slate-800 shadow-2xl shadow-cyan-900/20 p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              <span className="ml-auto text-xs text-slate-600">clickfix_diagnostics.sh</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2 text-slate-400">
                <span className="text-cyan-400">➜</span>
                <span>analyzing_architecture...</span>
              </div>
              <div className="text-yellow-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>WARNING: Latency spike detected (p99 &gt; 500ms)</span>
              </div>
              <div className="flex gap-2 text-slate-400">
                <span className="text-cyan-400">➜</span>
                <span>executing_fix --strategy=overhaul</span>
              </div>
              <div className="text-lime-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>OPTIMIZATION COMPLETE</span>
              </div>
              <div className="animate-pulse text-cyan-400">_</div>
            </div>
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/5 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
}