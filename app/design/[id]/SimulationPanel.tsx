'use client';

import { useState } from 'react';
import { Zap, X, AlertTriangle, CheckCircle, TrendingUp, AlertCircle, Info, ChevronDown, ChevronRight } from 'lucide-react';
import type { SimulationResult, Severity } from '@/lib/types';

const SEVERITY_CONFIG: Record<Severity, { color: string; bg: string; border: string; icon: typeof AlertTriangle }> = {
  critical: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', icon: AlertTriangle },
  high:     { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', icon: AlertCircle },
  medium:   { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', icon: Info },
  low:      { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/30', icon: Info },
};

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#f87171';
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r="36" fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="44" cy="44" r="36" fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="18" fontFamily="monospace" fontWeight="bold">
          {score}
        </text>
      </svg>
      <span className="font-mono text-xs text-slate-500">Architecture Score</span>
    </div>
  );
}

interface Props {
  designId: string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getElements: () => any[];
  onClose: () => void;
}

export default function SimulationPanel({ designId: _designId, title, description, getElements, onClose }: Props) {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    bottlenecks: true,
    failures: true,
    strengths: false,
    recommendations: true,
    tradeoffs: false,
  });

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const runSimulation = async () => {
    setLoading(true);
    setResult(null);
    setStreamText('');
    setError(null);

    try {
      const elements = getElements();
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements, title, description }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setStreamText(accumulated);
      }

      // Find the JSON block (skip thinking output)
      const jsonMatch = accumulated.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed: SimulationResult = JSON.parse(jsonMatch[0]);
        setResult(parsed);
        setStreamText('');
      } else {
        throw new Error('No JSON in response');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex-none flex items-center justify-between px-4 h-12 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-lime-400" />
          <span className="font-mono font-bold text-sm text-slate-200">AI Simulation</span>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Run Button */}
        {!result && !loading && (
          <div className="p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-lime-500/10 border border-lime-500/20 flex items-center justify-center">
              <Zap className="w-7 h-7 text-lime-400" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-slate-200 mb-1">Run Architecture Simulation</h3>
              <p className="text-slate-500 text-sm">
                Claude AI will analyze your canvas for bottlenecks, failure scenarios, and architectural trade-offs.
              </p>
            </div>
            <button
              onClick={runSimulation}
              className="w-full py-3 bg-lime-500 text-slate-950 font-mono font-bold text-sm rounded-sm hover:bg-lime-400 transition-colors"
            >
              ⚡ Run Simulation
            </button>
            <p className="text-slate-600 text-xs">Powered by Claude Opus 4.6</p>
          </div>
        )}

        {/* Loading / Streaming */}
        {loading && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              <span className="font-mono text-sm text-lime-400">Analyzing architecture...</span>
            </div>
            {streamText && (
              <div className="bg-slate-900 border border-slate-800 rounded-sm p-3 font-mono text-xs text-slate-500 max-h-48 overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words">{streamText.slice(-500)}</pre>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-6">
            <div className="bg-red-900/20 border border-red-800/40 rounded-sm p-4 font-mono text-sm text-red-400 mb-4">
              {error}
            </div>
            <button onClick={runSimulation} className="w-full py-2 bg-slate-800 border border-slate-700 text-slate-300 font-mono text-sm rounded-sm hover:bg-slate-700 transition-colors">
              Retry
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="p-4 space-y-4">
            {/* Score */}
            <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-sm p-4">
              <ScoreGauge score={result.score} />
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-sm leading-relaxed">{result.summary}</p>
              </div>
            </div>

            {/* Bottlenecks */}
            <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
              <button
                onClick={() => toggle('bottlenecks')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-mono text-sm font-bold text-slate-200">
                    Bottlenecks <span className="text-red-400">({result.bottlenecks.length})</span>
                  </span>
                </div>
                {expanded.bottlenecks ? <ChevronDown className="w-4 h-4 text-slate-600" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
              </button>
              {expanded.bottlenecks && (
                <div className="px-4 pb-4 space-y-2">
                  {result.bottlenecks.length === 0 && (
                    <p className="text-slate-600 text-sm font-mono">No bottlenecks detected.</p>
                  )}
                  {result.bottlenecks.map((b, i) => {
                    const cfg = SEVERITY_CONFIG[b.severity] ?? SEVERITY_CONFIG.medium;
                    const Icon = cfg.icon;
                    return (
                      <div key={i} className={`rounded-sm border p-3 ${cfg.bg} ${cfg.border}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                          <span className={`font-mono text-xs font-bold uppercase ${cfg.color}`}>{b.severity}</span>
                          <span className="font-mono text-xs text-slate-300 font-bold">{b.component}</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{b.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Failure Scenarios */}
            <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
              <button
                onClick={() => toggle('failures')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-mono text-sm font-bold text-slate-200">
                    Failure Scenarios <span className="text-orange-400">({result.failureScenarios.length})</span>
                  </span>
                </div>
                {expanded.failures ? <ChevronDown className="w-4 h-4 text-slate-600" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
              </button>
              {expanded.failures && (
                <div className="px-4 pb-4 space-y-2">
                  {result.failureScenarios.map((f, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className="text-orange-400 flex-none font-mono">→</span>
                      <span className="text-slate-400 leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Strengths */}
            <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
              <button
                onClick={() => toggle('strengths')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-lime-400" />
                  <span className="font-mono text-sm font-bold text-slate-200">
                    Strengths <span className="text-lime-400">({result.strengths.length})</span>
                  </span>
                </div>
                {expanded.strengths ? <ChevronDown className="w-4 h-4 text-slate-600" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
              </button>
              {expanded.strengths && (
                <div className="px-4 pb-4 space-y-2">
                  {result.strengths.map((s, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className="text-lime-400 flex-none font-mono">✓</span>
                      <span className="text-slate-400 leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
              <button
                onClick={() => toggle('recommendations')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-sm font-bold text-slate-200">
                    Recommendations <span className="text-cyan-400">({result.recommendations.length})</span>
                  </span>
                </div>
                {expanded.recommendations ? <ChevronDown className="w-4 h-4 text-slate-600" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
              </button>
              {expanded.recommendations && (
                <div className="px-4 pb-4 space-y-2">
                  {result.recommendations.map((r, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className="text-cyan-400 flex-none font-mono">{i + 1}.</span>
                      <span className="text-slate-400 leading-relaxed">{r}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tradeoffs */}
            {result.tradeoffs && result.tradeoffs.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
                <button
                  onClick={() => toggle('tradeoffs')}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-mono text-sm font-bold text-slate-200">
                      Trade-offs <span className="text-indigo-400">({result.tradeoffs.length})</span>
                    </span>
                  </div>
                  {expanded.tradeoffs ? <ChevronDown className="w-4 h-4 text-slate-600" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
                </button>
                {expanded.tradeoffs && (
                  <div className="px-4 pb-4 space-y-3">
                    {result.tradeoffs.map((t, i) => (
                      <div key={i}>
                        <div className="font-mono text-xs text-indigo-400 font-bold mb-1">{t.type}</div>
                        <p className="text-slate-400 text-xs leading-relaxed">{t.analysis}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Re-run */}
            <button
              onClick={runSimulation}
              className="w-full py-2 bg-slate-900 border border-slate-700 text-slate-400 font-mono text-xs rounded-sm hover:border-lime-500/40 hover:text-lime-400 transition-all"
            >
              ⚡ Re-run Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
