import { AlertTriangle } from "lucide-react";
import api from "../api";
import { useState, useEffect } from "react";

export default function AnomalyCallout() {
  const [anomaly, setAnomaly] = useState(undefined);

  useEffect(() => {
    api.get("/metrics/anomaly/").then((res) => setAnomaly(res.data.anomaly));
  }, []);

  if (!anomaly) return null;

  return (
    <div className="bg-rust-50 p-3 sm:p-4 md:p-6 rounded-card border border-rust-400/20 flex items-start gap-2.5 sm:gap-3 md:gap-5 card-enter">
      <div className="bg-rust-400 p-2 sm:p-2.5 md:p-3 rounded-full text-white shrink-0">
        <AlertTriangle size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
      </div>
      <div className="min-w-0">
        <h3 className="font-numeric text-xs sm:text-sm md:text-lg text-rust-400 break-words">
          Anomaly: {anomaly.employee_id} - {anomaly.task_category}
        </h3>
        <p className="text-rust-700 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 leading-relaxed">{anomaly.justification} ({anomaly.date})</p>
      </div>
    </div>
  );
}