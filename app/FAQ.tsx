export default function FAQ() {
  const faqs = [
    {
      q: "What exactly is 'Digital Debt'?",
      a: "It's the accumulation of quick fixes, outdated libraries, and architectural shortcuts that eventually slow down development and cause outages. I pay this debt down so you can move fast again."
    },
    {
      q: "Do you work with early-stage startups?",
      a: "Yes, typically Series A/B startups that have found product-market fit but are now struggling to scale their MVP codebase."
    },
    {
      q: "Are you an agency?",
      a: "No. I am a solo principal engineer. You work directly with me, not a junior developer managed by an account executive."
    }
  ];

  return (
    <section id="faq" className="w-full py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white font-mono mb-12 text-center">
          System <span className="text-lime-400">Queries</span>
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-800 bg-slate-900/30 rounded-sm p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2 font-mono">
                <span className="text-cyan-400 mr-2">?</span>
                {faq.q}
              </h3>
              <p className="text-slate-400 pl-6 border-l border-slate-800 ml-1.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}