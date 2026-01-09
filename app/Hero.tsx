'use client';

import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-4 pb-16 md:pt-8 md:pb-24 lg:pt-12 lg:pb-32 overflow-hidden">
      
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Value Prop */}
        <div 
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white font-mono animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Digital Handyman <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
              for Web & Mobile.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            I build end-to-end web and mobile applications and provide ongoing maintenance. I handle the engineering so you can focus on your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
      </div>
    </section>
  );
}