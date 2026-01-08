'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Send, Calendar, Linkedin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  challenge: z.string().min(10, "Please describe the technical challenge briefly"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Payload:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 md:p-12 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left: Context & Direct Links */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-mono text-white">
              Ready to <span className="text-cyan-400">scale</span>?
            </h2>
            <p className="text-slate-400">
              Skip the recruiter spam. If you have a complex architectural problem or need a senior partner to unblock your roadmap, let's talk.
            </p>
            <div className="space-y-4 pt-4">
              <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-lime-400 transition-colors group">
                <div className="p-2 bg-slate-800 rounded-md group-hover:bg-slate-800/80">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm">Book a 15min Discovery</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                <div className="p-2 bg-slate-800 rounded-md group-hover:bg-slate-800/80">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm">Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right: The Form */}
          <div>
            {isSuccess ? (
              <div 
                className="h-full flex flex-col items-center justify-center text-center space-y-4 bg-slate-950/50 rounded-lg p-8 border border-lime-500/30"
              >
                <div className="w-12 h-12 rounded-full bg-lime-500/20 flex items-center justify-center text-lime-400">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Received</h3>
                <p className="text-slate-400 text-sm">I'll review your architecture brief and reply within 24 hours.</p>
                <button onClick={() => setIsSuccess(false)} className="text-cyan-400 text-sm hover:underline mt-4">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase">Name</label>
                    <input {...register("name")} className="w-full bg-slate-950 border border-slate-800 rounded-sm p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Jane Doe" />
                    {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase">Company</label>
                    <input {...register("company")} className="w-full bg-slate-950 border border-slate-800 rounded-sm p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Acme Inc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Email</label>
                  <input {...register("email")} className="w-full bg-slate-950 border border-slate-800 rounded-sm p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="jane@acme.com" />
                  {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">The Challenge</label>
                  <textarea {...register("challenge")} rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-sm p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="We are experiencing high latency during peak loads..." />
                  {errors.challenge && <span className="text-red-400 text-xs">{errors.challenge.message}</span>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 rounded-sm transition-all flex items-center justify-center gap-2 mt-2">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>TRANSMIT REQUEST <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}