import { ShieldCheck, Bell, UserCircle } from "lucide-react";
import logoMark from "../assets/workforce-pulse-icon.png";

export default function Header() {
  return (
    <header className="w-full bg-primary-container text-white py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:gap-4 md:gap-0 md:flex-row md:justify-between md:items-end">
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
          <img src={logoMark} alt="Workforce Pulse" className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 object-contain rounded-lg sm:rounded-xl bg-white/5 p-1 shrink-0" />
          <div className="flex-1">
            <span className="text-amber-gold text-xs sm:text-label-sm tracking-[0.2em] uppercase block mb-1 sm:mb-2">
              Internal · COO Briefing
            </span>
            <h1 className="font-display text-xl sm:text-2xl md:text-display-lg leading-tight">Workforce Pulse</h1>
            <p className="text-pale-sage text-xs sm:text-sm mt-1 max-w-lg line-clamp-2 sm:line-clamp-none">
              Where time and money leak — and what to automate first.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-primary px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 border border-white/10 text-xs sm:text-label-sm whitespace-nowrap">
            <ShieldCheck size={14} className="text-amber-gold sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Live System Data</span>
            <span className="sm:hidden">Live Data</span>
          </div>
          <button className="p-1 sm:p-2 hover:bg-primary rounded-full transition-colors"><Bell size={16} className="sm:w-5 sm:h-5" /></button>
          <button className="p-1 sm:p-2 hover:bg-primary rounded-full transition-colors"><UserCircle size={16} className="sm:w-5 sm:h-5" /></button>
        </div>
      </div>
    </header>
  );
}