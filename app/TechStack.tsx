const ROW_A = ["TypeScript", "Node.js", "React", "Next.js", "AWS", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "Redis"];
const ROW_B = ["Tailwind CSS", "Prisma", "tRPC", "Vercel", "Stripe", "WebSockets", "Terraform", "Supabase", "OpenAI", "Rust"];

function Badge({ tech, muted }: { tech: string; muted?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-md border font-mono text-sm font-medium whitespace-nowrap transition-colors select-none
      ${muted
        ? "bg-slate-950 border-slate-800/70 text-slate-600 hover:text-slate-400 hover:border-slate-700"
        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-none" />
      {tech}
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="w-full border-y border-slate-900 bg-slate-950/60 overflow-hidden py-5 space-y-3">
      <div className="relative">
        <div className="flex gap-3 animate-marquee">
          {[...ROW_A, ...ROW_A].map((t, i) => <Badge key={i} tech={t} />)}
        </div>
        <div className="absolute inset-y-0 left-0  w-16 bg-linear-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>
      <div className="relative">
        <div className="flex gap-3 animate-marquee-reverse">
          {[...ROW_B, ...ROW_B].map((t, i) => <Badge key={i} tech={t} muted />)}
        </div>
        <div className="absolute inset-y-0 left-0  w-16 bg-linear-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
