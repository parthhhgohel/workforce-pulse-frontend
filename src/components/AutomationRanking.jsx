import { useState, useEffect } from "react";
import api from "../api";

export default function AutomationRanking({ department }) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = {};
    if (department) params.department = department;
    api.get("/metrics/ranking/", { params })
      .then((res) => !cancelled && setRanking(res.data.ranking))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [department]);

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-card shadow-editorial card-enter">
      <span className="text-[10px] sm:text-label-sm text-outline uppercase tracking-wider">Strategic Roadmap</span>
      <h2 className="font-display text-base sm:text-lg md:text-headline-md text-primary mb-4 sm:mb-6">Automation Priorities</h2>
      {loading ? (
        <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center text-xs sm:text-sm text-outline">Loading...</div>
      ) : (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {ranking.slice(0, 5).map((r, i) => (
            <div key={r.task_category}>
              <div className="flex justify-between mb-1.5 sm:mb-2 gap-2">
                <span className="text-xs sm:text-sm font-semibold text-primary truncate">#{i + 1} {r.task_category}</span>
                <span className="text-[9px] sm:text-label-sm text-amber-gold whitespace-nowrap">₹{r.rupee_impact_monthly.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-[#F2EEE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-amber-gold rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${r.priority_score * 100}%` }}
                />
              </div>
              <div className="mt-1.5 sm:mt-2 flex gap-1 sm:gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-[#F2EEE6] text-on-surface text-[9px] sm:text-[10px] rounded uppercase font-bold whitespace-nowrap">
                  {r.repetitive_share_pct}% Rep
                </span>
                <span className="px-2 py-0.5 bg-[#F2EEE6] text-on-surface text-[9px] sm:text-[10px] rounded uppercase font-bold whitespace-nowrap">
                  {r.employee_count} People
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}