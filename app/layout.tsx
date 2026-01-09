import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Spotlight from "./Spotlight";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClickFix.dev | High-Scale Engineering Solutions",
  description: "Digital debt is stalling your growth. I engineer the fix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {/* Subtle Grid Background for Industrial feel */}
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <Spotlight />
        {children}
      </body>
    </html>
  );
}
