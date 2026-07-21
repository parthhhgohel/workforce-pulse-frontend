import { useState, useEffect } from "react";
import { Clock, Banknote, ChevronDown } from "lucide-react";
import api from "../api";

export default function HeadlineMetrics({ department, taskCategory }) {
  const [data, setData] = useState(null);
  const [showMethod, setShowMethod] = useState(false);

  useEffect(() => {
    const params = {};
    if (department) params.department = department;
    if (taskCategory) params.task_category = taskCategory;
    api.get("/metrics/headline/", { params }).then((res) => setData(res.data));
  }, [department, taskCategory]);

  if (!data) return <div className="text-outline text-xs sm:text-sm">Loading metrics...</div>;

  return (
    <section className="card-enter grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
      <div className="bg-cream-bg rounded-card p-4 sm:p-6 md:p-8 border-l-4 border-primary shadow-editorial relative overflow-hidden min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <Clock size={18} className="sm:w-6 sm:h-6 md:w-6 md:h-6 text-primary" />
          <span className="text-[10px] sm:text-label-sm text-outline uppercase tracking-wider">Hours Recoverable</span>
        </div>
        <span className="font-numeric text-lg sm:text-2xl md:text-metric-lg text-primary">{data.hours_recoverable}</span>
      </div>

      <div className="bg-cream-bg rounded-card p-4 sm:p-6 md:p-8 border-l-4 border-amber-gold shadow-editorial relative overflow-hidden min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <Banknote size={18} className="sm:w-6 sm:h-6 md:w-6 md:h-6 text-amber-gold" />
          <span className="text-[10px] sm:text-label-sm text-outline uppercase tracking-wider">Rupees Recoverable</span>
        </div>
        <span className="font-numeric text-lg sm:text-2xl md:text-metric-lg text-amber-gold">
          ₹{data.rupees_recoverable.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="sm:col-span-2">
        <button
          onClick={() => setShowMethod(!showMethod)}
          className="flex items-center gap-1.5 text-primary text-xs sm:text-label-sm hover:underline"
        >
          <ChevronDown size={13} className={`transition-transform duration-300 sm:w-4 sm:h-4 ${showMethod ? "rotate-180" : ""}`} />
          {showMethod ? "Hide" : "Show"} methodology
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${showMethod ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-3" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <p className="p-3 sm:p-4 md:p-5 bg-[#F2EEE6] rounded-lg sm:rounded-xl border border-outline-variant/30 text-on-surface-variant text-xs sm:text-sm leading-relaxed">
              {data.methodology}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}