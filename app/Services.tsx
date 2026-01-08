'use client';

import { DraftingCompass, Cpu, Rocket, Check, ArrowRight, Terminal } from "lucide-react";

const services = [
  {
    id: "blueprint",
    title: "The Blueprint",
    subtitle: "Architecture & Design",
    description: "Stop building on shaky foundations. I provide comprehensive architecture reviews and system design documents to ensure your stack can handle future scale.",
    icon: DraftingCompass,
    accentColor: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/50",
    glowColor: "group-hover:shadow-cyan-500/20",
    features: ["System Architecture Audit", "Database Schema Optimization", "Microservices Strategy"]
  },
  {
    id: "overhaul",
    title: "The Overhaul",
    subtitle: "Refactoring & Scaling",
    description: "Legacy code slowing you down? I execute surgical refactors on live systems, migrating monoliths to microservices and optimizing API throughput without downtime.",
    icon: Cpu,
    accentColor: "text-lime-400",
    borderColor: "group-hover:border-lime-500/50",
    glowColor: "group-hover:shadow-lime-500/20",
    features: ["GraphQL/REST API Scaling", "Legacy Migration (Strangler Fig)", "Thundering Herd Mitigation"]
  },
  {
    id: "launchpad",
    title: "The Launchpad",
    subtitle: "High-Scale Integrations",
    description: "Preparing for a major event or integration? I engineer the critical paths for high-traffic externalizations like complex integrations or Black Friday events.",
    icon: Rocket,
    accentColor: "text-indigo-400",
    borderColor: "group-hover:border-indigo-500/50",
    glowColor: "group-hover:shadow-indigo-500/20",
    features: ["3rd Party Integration Architecture", "Load Testing & Capacity Planning", "Event-Driven Architecture"]
  }
];

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 md:mb-16">
          <div
            className="flex items-center gap-2 mb-4"
          >
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-sm text-cyan-400 tracking-wider uppercase">// Engineering Protocols</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-white font-mono"
          >
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">upgrade path</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const Icon = service.icon;
  return (
    <div
      className={`group relative h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-sm transition-all duration-300 hover:-translate-y-2 ${service.borderColor} hover:shadow-2xl ${service.glowColor}`}
    >
      {/* Tech Corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-700 group-hover:border-slate-500 transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-700 group-hover:border-slate-500 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-700 group-hover:border-slate-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-700 group-hover:border-slate-500 transition-colors" />

      <div className="mb-6">
        <div className={`w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${service.accentColor}`} />
        </div>
        <h3 className="text-2xl font-bold text-white font-mono mb-1">{service.title}</h3>
        <p className={`text-xs font-mono uppercase tracking-widest ${service.accentColor} opacity-80`}>{service.subtitle}</p>
      </div>

      <p className="text-slate-400 leading-relaxed mb-8 min-h-[80px]">{service.description}</p>

      <ul className="space-y-3 mb-8">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <Check className={`w-4 h-4 mt-0.5 ${service.accentColor}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}