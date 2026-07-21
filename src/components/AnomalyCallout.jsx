import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import api from "../api";

export default function AnomalyCallout() {
  const [anomaly, setAnomaly] = useState(undefined);

  useEffect(() => {
    api.get("/metrics/anomaly/").then((res) => setAnomaly(res.data.anomaly));
  }, []);

  if (!anomaly) return null;

  return (
    <div className="bg-rust-50 p-6 rounded-card border border-rust-400/20 flex items-start gap-5 card-enter">
      <div className="bg-rust-400 p-3 rounded-full text-white shrink-0">
        <AlertTriangle size={18} />
      </div>
      <div>
        <h3 className="font-numeric text-lg text-rust-400">
          Anomaly Detected: {anomaly.employee_id} - {anomaly.task_category}
        </h3>
        <p className="text-rust-700 text-sm mt-1">{anomaly.justification} ({anomaly.date})</p>
      </div>
    </div>
  );
}