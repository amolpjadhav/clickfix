import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Spotlight from "./Spotlight";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClickFix.dev | High-Scale Engineering Solutions",
  description: "Digital debt is stalling your growth. I engineer the fix.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-200`}>

        {/* Dot-grid texture */}
        <div
          className="fixed inset-0 z-[-2] opacity-[0.055]"
          style={{
            backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Cyan orb — top-left */}
        <div
          className="fixed top-[-25%] left-[-15%] w-200 h-200 rounded-full z-[-1] pointer-events-none animate-orb"
          style={{
            background: "radial-gradient(circle at center, rgba(34,211,238,0.07) 0%, transparent 60%)",
            filter: "blur(72px)",
          }}
        />

        {/* Indigo orb — bottom-right */}
        <div
          className="fixed bottom-[-20%] right-[-12%] w-162.5 h-162.5 rounded-full z-[-1] pointer-events-none animate-orb-2"
          style={{
            background: "radial-gradient(circle at center, rgba(99,102,241,0.07) 0%, transparent 60%)",
            filter: "blur(72px)",
          }}
        />

        {/* Lime accent orb — center */}
        <div
          className="fixed top-[55%] left-[55%] w-87.5 h-87.5 rounded-full z-[-1] pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(163,230,53,0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "orb-drift 18s ease-in-out infinite",
            animationDelay: "6s",
          }}
        />

        <Spotlight />
        {children}
      </body>
    </html>
  );
}
