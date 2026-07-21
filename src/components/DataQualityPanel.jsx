import { useState, useEffect } from "react";
import { ShieldCheck, Copy, Wrench, Ban, Flag, UserX, UserMinus, ChevronDown } from "lucide-react";
import api from "../api";

export default function DataQualityPanel() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get("/metrics/data-quality/").then((res) => setData(res.data)).catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="bg-white rounded-card shadow-editorial overflow-hidden card-enter">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 sm:px-4 md:px-8 py-3 sm:py-4 bg-[#F2EEE6] border-b border-outline-variant/20 flex justify-between items-center"
      >
        <span className="text-xs sm:text-label-sm font-semibold text-primary flex items-center gap-2">
          <ShieldCheck size={13} className="sm:w-4 sm:h-4" />
          <span className="truncate">Data Quality - {data.rows_dropped} dropped, {data.rows_flagged} flagged</span>
        </span>
        <ChevronDown size={14} className={`text-outline transition-transform duration-300 sm:w-4 sm:h-4 shrink-0 ml-2 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 divide-x divide-outline-variant/20">
            <Stat icon={Copy} label="Deduplicated" value={data.rows_deduplicated} color="text-primary" />
            <Stat icon={Wrench} label="Fixed" value={data.rows_fixed} color="text-primary" />
            <Stat icon={Ban} label="Dropped" value={data.rows_dropped} color="text-rust-400" />
            <Stat icon={Flag} label="Flagged" value={data.rows_flagged} color="text-rust-400" />
            <Stat icon={UserX} label="Orphaned rows" value={data.orphaned_activity_rows} sub={data.orphaned_employee_ids.join(", ")} color="text-rust-400" />
            <Stat icon={UserMinus} label="No activity" value={data.employees_no_activity} sub={data.no_activity_employee_ids.join(", ")} color="text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="p-3 sm:p-4 md:p-6 text-center">
      <Icon size={14} className={`${color} mx-auto mb-1 sm:mb-2 sm:w-4 sm:h-4`} />
      <p className="text-[9px] sm:text-label-sm text-outline mb-0.5 sm:mb-1 uppercase truncate">{label}</p>
      <p className="font-numeric text-base sm:text-lg md:text-headline-md text-primary">{value}</p>
      {sub && <p className="text-[7px] sm:text-xs text-outline mt-0.5 sm:mt-1 line-clamp-1">{sub}</p>}
    </div>
  );
}