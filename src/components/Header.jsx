import { ShieldCheck, Bell, UserCircle } from "lucide-react";
import logoMark from "../assets/workforce-pulse-icon.png";

export default function Header() {
  return (
    <header className="w-full bg-primary-container text-white py-8 px-6 md:px-10 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex items-center gap-4">
          <img src={logoMark} alt="Workforce Pulse" className="w-18 h-18 object-contain rounded-xl bg-white/5 p-1 shrink-0" />
          <div>
            <span className="text-amber-gold text-label-sm tracking-[0.2em] uppercase block mb-2">
              Internal · COO Briefing
            </span>
            <h1 className="font-display text-display-lg leading-tight">Workforce Pulse</h1>
            <p className="text-pale-sage text-sm mt-1 max-w-lg">
              Where time and money leak — and what to automate first.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <ShieldCheck size={16} className="text-amber-gold" />
            <span className="text-label-sm">Live System Data</span>
          </div>
          <button className="p-2 hover:bg-primary rounded-full transition-colors"><Bell size={18} /></button>
          <button className="p-2 hover:bg-primary rounded-full transition-colors"><UserCircle size={18} /></button>
        </div>
      </div>
    </header>
  );
}