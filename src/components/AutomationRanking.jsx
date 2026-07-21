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
    <div className="bg-white p-8 rounded-card shadow-editorial card-enter">
      <span className="text-label-sm text-outline uppercase tracking-wider">Strategic Roadmap</span>
      <h2 className="font-display text-headline-md text-primary mb-6">Automation Priorities</h2>
      {loading ? (
        <div className="h-40 flex items-center justify-center text-sm text-outline">Loading...</div>
      ) : (
        <div className="space-y-6">
          {ranking.slice(0, 5).map((r, i) => (
            <div key={r.task_category}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-primary">#{i + 1} {r.task_category}</span>
                <span className="text-label-sm text-amber-gold">₹{r.rupee_impact_monthly.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-2 w-full bg-[#F2EEE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-amber-gold rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${r.priority_score * 100}%` }}
                />
              </div>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-[#F2EEE6] text-on-surface text-[10px] rounded uppercase font-bold">
                  {r.repetitive_share_pct}% Rep
                </span>
                <span className="px-2 py-0.5 bg-[#F2EEE6] text-on-surface text-[10px] rounded uppercase font-bold">
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