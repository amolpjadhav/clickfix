import Navbar from "./Navbar";
import Hero from "./Hero";
import TechStack from "./TechStack";
import Services from "./Services";
import Process from "./Process";
import FAQ from "./FAQ";
import ContactForm from "./ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <Hero />
      <TechStack />
      <Services />
      <Process />
      <FAQ />
      <ContactForm />
      
      <footer className="w-full py-8 text-center text-slate-600 text-sm font-mono border-t border-slate-900/50 mt-auto">
        <p>&copy; {new Date().getFullYear()} ClickFix.dev. All systems operational.</p>
      </footer>
    </main>
  );
}
  