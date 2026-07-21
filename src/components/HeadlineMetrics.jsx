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

  if (!data) return <div className="text-outline text-sm">Loading metrics...</div>;

  return (
    <section className="card-enter grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-cream-bg rounded-card p-8 border-l-4 border-primary shadow-editorial relative overflow-hidden min-h-[160px] flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <Clock size={22} className="text-primary" />
          <span className="text-label-sm text-outline uppercase tracking-wider">Hours Recoverable / Month</span>
        </div>
        <span className="font-numeric text-metric-lg text-primary">{data.hours_recoverable}</span>
      </div>

      <div className="bg-cream-bg rounded-card p-8 border-l-4 border-amber-gold shadow-editorial relative overflow-hidden min-h-[160px] flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <Banknote size={22} className="text-amber-gold" />
          <span className="text-label-sm text-outline uppercase tracking-wider">Rupees Recoverable / Month</span>
        </div>
        <span className="font-numeric text-metric-lg text-amber-gold">
          ₹{data.rupees_recoverable.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="md:col-span-2">
        <button
          onClick={() => setShowMethod(!showMethod)}
          className="flex items-center gap-2 text-primary text-label-sm hover:underline"
        >
          <ChevronDown size={15} className={`transition-transform duration-300 ${showMethod ? "rotate-180" : ""}`} />
          {showMethod ? "Hide" : "Show"} methodology
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${showMethod ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <p className="p-5 bg-[#F2EEE6] rounded-xl border border-outline-variant/30 text-on-surface-variant text-sm leading-relaxed">
              {data.methodology}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}