'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Terminal, Send, ChevronRight, GripHorizontal } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  isTyping?: boolean;
}

const QUICK_ACTIONS = [
  { label: "Services", cmd: "services" },
  { label: "Tech Stack", cmd: "stack" },
  { label: "Process", cmd: "process" },
  { label: "Book Call", cmd: "contact" },
];

export default function AITerminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: "ClickFix.dev System v2.1.0 initialized...\nI am your digital assistant. How can I help you build your next project?",
      sender: 'system'
    }
  ]);
  const [isSystemTyping, setIsSystemTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isSystemTyping]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure render before focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    };
  };

  if (!isOpen) return null;

  const processCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();
    let response = "Command not recognized. Try using the quick actions below.";

    if (lower.includes('help') || lower.includes('hello') || lower.includes('hi')) {
      response = "I can help you navigate our services. Try asking about:\n- 'Services': Web & Mobile development.\n- 'Process': How we work.\n- 'Stack': Technologies I use.\n- 'Contact': Start a project.";
    } else if (lower.includes('clear')) {
      setMessages([{ id: Date.now().toString(), text: "Terminal cleared.", sender: 'system' }]);
      return;
    } else if (lower.includes('service') || lower.includes('offer')) {
      response = "I provide three core services:\n\n1. System Architecture: Design & Strategy.\n2. Full-Stack Development: Web & Mobile builds.\n3. Maintenance: Long-term support.\n\nType 'development' or 'architecture' for details.";
    } else if (lower.includes('dev') || lower.includes('build')) {
      response = ">> FULL-STACK DEVELOPMENT\nI build end-to-end applications using React, Next.js, and Node.js. From MVP to production-grade scaling.";
    } else if (lower.includes('arch') || lower.includes('design')) {
      response = ">> SYSTEM ARCHITECTURE\nSolid foundations prevent technical debt. I help select the right stack and design scalable database schemas.";
    } else if (lower.includes('main') || lower.includes('support')) {
      response = ">> MAINTENANCE\nKeep your app healthy with security patches, performance tuning, and regular feature updates.";
    } else if (lower.includes('process') || lower.includes('work')) {
      response = ">> WORKFLOW\n1. Discovery & Planning\n2. Development (with regular updates)\n3. Launch & Support";
    } else if (lower.includes('stack') || lower.includes('tech')) {
      response = ">> CORE STACK\nTypeScript, React, Next.js, Node.js, PostgreSQL, AWS, Docker.";
    } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('book')) {
      response = "Ready to start? You can use the form at the bottom of the page, or email me directly at amol17jan@gmail.com.";
    }

    simulateTyping(response);
  };

  const simulateTyping = (text: string) => {
    setIsSystemTyping(true);
    const msgId = Date.now().toString();
    
    // Add empty message first
    setMessages(prev => [...prev, { id: msgId, text: '', sender: 'system', isTyping: true }]);

    let i = 0;
    const interval = setInterval(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === msgId 
          ? { ...msg, text: text.slice(0, i + 1) }
          : msg
      ));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsSystemTyping(false);
        setMessages(prev => prev.map(msg => 
            msg.id === msgId ? { ...msg, isTyping: false } : msg
        ));
      }
    }, 15); // Typing speed
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const newMsg: Message = { id: Date.now().toString(), text: text, sender: 'user' };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Small delay before system responds
    setTimeout(() => processCommand(text), 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
      <div 
        className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[80vh] ring-1 ring-cyan-500/20 animate-in zoom-in-95 duration-200 pointer-events-auto"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2 text-cyan-400">
            <GripHorizontal className="w-4 h-4 text-slate-600" />
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-sm font-bold tracking-wider">TERMINAL_UPLINK</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-red-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-slate-950" onClick={() => inputRef.current?.focus()}>
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
                  {msg.isTyping && <span className="inline-block w-2 h-4 ml-1 bg-lime-400 animate-pulse align-middle" />}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.cmd}
                onClick={() => handleSend(action.cmd)}
                className="px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 transition-colors whitespace-nowrap"
              >
                {action.label}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 text-lime-400" />
            <input
              ref={inputRef}
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