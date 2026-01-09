'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Terminal, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
}

export default function AITerminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: "ClickFix.dev System v2.0.4 initialized...\nI am the automated assistant. Ask me about our services, or type 'help'.",
      sender: 'system'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    const newMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulated AI Response Logic
    setTimeout(() => {
      let response = "Command not recognized. Try asking about 'services', 'audit', or 'pricing'.";
      const lower = userText.toLowerCase();

      if (lower.includes('help') || lower.includes('hello') || lower.includes('hi')) {
        response = "Available commands:\n- 'services': List engineering tiers.\n- 'audit': Learn about system diagnostics.\n- 'contact': Schedule a discussion.\n- 'clear': Clear terminal.";
      } else if (lower.includes('clear')) {
        setMessages([{ id: Date.now().toString(), text: "Terminal cleared.", sender: 'system' }]);
        return;
      } else if (lower.includes('service') || lower.includes('offer')) {
        response = "We offer three specialized engineering tiers:\n\n1. [The Blueprint] - Architecture & Design reviews.\n2. [The Overhaul] - Legacy migration & API scaling.\n3. [The Launchpad] - High-scale event prep & integrations.\n\nWhich one interests you?";
      } else if (lower.includes('blueprint')) {
        response = ">> THE BLUEPRINT\nComprehensive architecture reviews and system design documents. Perfect for ensuring your stack can handle future scale before you build it.";
      } else if (lower.includes('overhaul')) {
        response = ">> THE OVERHAUL\nSurgical refactors on live systems. We migrate monoliths to microservices and optimize API throughput without downtime.";
      } else if (lower.includes('launchpad')) {
        response = ">> THE LAUNCHPAD\nCritical path engineering for high-traffic events (Black Friday) or complex external integrations (Buy with Prime).";
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('book')) {
        response = "You can initiate an engagement using the form at the bottom of the page, or email directly at hello@clickfix.dev.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: response, sender: 'system' }]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh] ring-1 ring-cyan-500/20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-sm font-bold tracking-wider">TERMINAL_UPLINK</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-red-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-slate-950" onClick={() => document.getElementById('terminal-input')?.focus()}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-sm ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 text-slate-200 border border-slate-700' 
                  : 'text-cyan-400'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.sender === 'system' && <span className="text-lime-400 mr-2">➜</span>}
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <span className="text-lime-400 font-mono animate-pulse">_</span>
            <input
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 font-mono text-sm placeholder:text-slate-600 p-0"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}