'use client';

import { Terminal, Menu, X } from 'lucide-react';
import { useState } from 'react';
import AITerminal from './AITerminal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => setIsTerminalOpen(true)} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group">
            <Terminal className="w-5 h-5 group-hover:animate-pulse" />
            <span className="font-mono font-bold tracking-tight text-slate-100">ClickFix.dev</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm text-slate-400">
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#process" className="hover:text-cyan-400 transition-colors">Process</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">Blog</a>
            <a href="#community" className="hover:text-cyan-400 transition-colors">Community</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
            <a href="#contact" className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-sm hover:bg-cyan-500 hover:text-slate-950 transition-all">
              Book Consultation
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-400" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 p-6 space-y-4 font-mono text-sm">
            <a href="#services" className="block text-slate-400 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#process" className="block text-slate-400 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Process</a>
            <a href="#blog" className="block text-slate-400 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Blog</a>
            <a href="#community" className="block text-slate-400 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Community</a>
            <a href="#faq" className="block text-slate-400 hover:text-cyan-400" onClick={() => setIsOpen(false)}>FAQ</a>
            <a href="#contact" className="block text-cyan-400 font-bold" onClick={() => setIsOpen(false)}>Book Consultation</a>
          </div>
        )}
      </nav>
      <AITerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  );
}