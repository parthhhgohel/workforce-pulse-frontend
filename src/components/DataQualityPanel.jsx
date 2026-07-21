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
        className="w-full px-8 py-4 bg-[#F2EEE6] border-b border-outline-variant/20 flex justify-between items-center"
      >
        <span className="text-label-sm font-semibold text-primary flex items-center gap-2">
          <ShieldCheck size={15} />
          Data Quality - {data.rows_dropped} dropped, {data.rows_flagged} flagged
        </span>
        <ChevronDown size={16} className={`text-outline transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-outline-variant/20">
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
    <div className="p-6 text-center">
      <Icon size={16} className={`${color} mx-auto mb-2`} />
      <p className="text-label-sm text-outline mb-1 uppercase">{label}</p>
      <p className="font-numeric text-headline-md text-primary">{value}</p>
      {sub && <p className="text-xs text-outline mt-1">{sub}</p>}
    </div>
  );
}