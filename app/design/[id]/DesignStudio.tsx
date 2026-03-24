'use client';

import dynamic from 'next/dynamic';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Terminal, Zap, MessageSquare, Save, Share2, Users, Circle, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Design } from '@/lib/types';
import SimulationPanel from './SimulationPanel';
import ReviewPanel from './ReviewPanel';

// Dynamic import — Excalidraw cannot run on the server
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => ({ default: mod.Excalidraw })),
  { ssr: false, loading: () => <CanvasLoader /> }
);

function CanvasLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#121212] text-slate-500 font-mono text-sm">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        Loading canvas...
      </div>
    </div>
  );
}

const MOCK_COLLABORATORS = [
  { id: 'c1', name: 'Sarah C.', color: '#22d3ee', online: true },
  { id: 'c2', name: 'Alex R.', color: '#a78bfa', online: true },
  { id: 'c3', name: 'Priya N.', color: '#34d399', online: false },
];

type ActivePanel = 'simulation' | 'review' | null;

interface Props {
  design: Design;
}

export default function DesignStudio({ design }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const excalidrawAPIRef = useRef<any>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [title, setTitle] = useState(design.title);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [elements, setElements] = useState<any[]>(design.elements || []);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save on element change
  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newElements: readonly any[], appState: any) => {
      setElements([...newElements]);
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(async () => {
        try {
          await fetch(`/api/designs/${design.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ elements: newElements, appState }),
          });
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        } catch {
          setSaveStatus('error');
        }
      }, 1500);
    },
    [design.id]
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const els = excalidrawAPIRef.current?.getSceneElements?.() ?? elements;
      const state = excalidrawAPIRef.current?.getAppState?.() ?? {};
      await fetch(`/api/designs/${design.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements: els, appState: state, title }),
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  // Expose API ref
  const excalidrawRef = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api: any) => { excalidrawAPIRef.current = api; },
    []
  );

  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      {/* Top Bar */}
      <div className="flex-none h-14 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-3 z-20">
        {/* Left: Logo + Back */}
        <Link href="/design" className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors mr-1">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Terminal className="w-4 h-4 text-cyan-400 flex-none" />
        <span className="font-mono font-bold text-slate-200 text-sm hidden sm:block">ClickFix</span>
        <ChevronRight className="w-3 h-3 text-slate-700 hidden sm:block" />

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-mono text-sm text-slate-200 bg-transparent border-none outline-none hover:bg-slate-900 focus:bg-slate-900 px-2 py-1 rounded-sm transition-colors min-w-0 flex-1 max-w-xs"
          onBlur={handleSave}
        />

        {/* Live Badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-lime-500/10 border border-lime-500/30 rounded-sm ml-auto">
          <Circle className="w-2 h-2 text-lime-400 fill-lime-400 animate-pulse" />
          <span className="font-mono text-xs text-lime-400">Live</span>
        </div>

        {/* Collaborators */}
        <div className="flex items-center gap-1">
          {MOCK_COLLABORATORS.filter((c) => c.online).map((c) => (
            <div
              key={c.id}
              title={c.name}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold text-slate-950"
              style={{ backgroundColor: c.color }}
            >
              {c.name[0]}
            </div>
          ))}
          <button
            title="Collaborators"
            className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <Users className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => togglePanel('simulation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-sm border transition-all ${
              activePanel === 'simulation'
                ? 'bg-lime-500/15 border-lime-500/50 text-lime-400'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-lime-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Simulate
          </button>

          <button
            onClick={() => togglePanel('review')}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-sm border transition-all ${
              activePanel === 'review'
                ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-indigo-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Review
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-sm border transition-all ${
              saveStatus === 'saved'
                ? 'border-lime-500/40 text-lime-400 bg-lime-500/10'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save'}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-sm border bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 transition-all"
            title="Copy link to clipboard"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <Excalidraw
            excalidrawAPI={excalidrawRef}
            initialData={{
              elements: design.elements || [],
              appState: {
                ...(design.appState || {}),
                theme: 'dark',
                viewBackgroundColor: '#121212',
              },
              scrollToContent: true,
            }}
            onChange={handleChange}
            UIOptions={{
              canvasActions: {
                saveToActiveFile: false,
                loadScene: true,
                export: { saveFileToDisk: true },
              },
            }}
          />

          {/* Canvas hint overlay — only when empty */}
          {elements.length === 0 && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="text-center text-slate-600 font-mono">
                <div className="text-5xl mb-4 opacity-30">⬡</div>
                <div className="text-sm opacity-50">Start drawing your system design</div>
                <div className="text-xs mt-1 opacity-30">Add Load Balancers, Databases, Services…</div>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        {activePanel && (
          <div className="flex-none w-96 border-l border-slate-800 flex flex-col bg-slate-950 overflow-hidden">
            {activePanel === 'simulation' && (
              <SimulationPanel
                designId={design.id}
                title={title}
                description={design.description}
                getElements={() => excalidrawAPIRef.current?.getSceneElements?.() ?? elements}
                onClose={() => setActivePanel(null)}
              />
            )}
            {activePanel === 'review' && (
              <ReviewPanel
                designId={design.id}
                onClose={() => setActivePanel(null)}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="flex-none h-6 bg-slate-950 border-t border-slate-800 flex items-center px-4 gap-4 font-mono text-xs text-slate-600">
        <span>{elements.length} elements</span>
        <span className="ml-auto flex items-center gap-2">
          {MOCK_COLLABORATORS.filter((c) => c.online).length} online
          <span className="text-slate-700">|</span>
          <span className={design.type === 'challenge' ? 'text-amber-500' : design.type === 'blueprint' ? 'text-cyan-500' : 'text-indigo-500'}>
            {design.type}
          </span>
        </span>
      </div>
    </div>
  );
}
