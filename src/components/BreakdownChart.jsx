import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../api";

const DIMENSIONS = [
  { key: "department", label: "Dept" },
  { key: "task_category", label: "Task" },
  { key: "app", label: "App" },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-outline-variant/40 rounded-lg shadow-editorial px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
      <p className="font-semibold text-primary mb-0.5 sm:mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-on-surface-variant text-[10px] sm:text-xs">
          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1" style={{ background: p.fill }} />
          {p.name}: {p.value} min
        </p>
      ))}
    </div>
  );
}

export default function BreakdownChart({ department, onSelectTask }) {
  const [dimension, setDimension] = useState("task_category");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = { by: dimension };
    if (department) params.department = department;
    api.get("/metrics/breakdown/", { params })
      .then((res) => {
        if (cancelled) return;
        const field = dimension === "app" ? "app_used" : dimension;
        const rows = res.data.breakdown.map((r) => ({
          name: r[field] || "Unknown",
          repetitive: r.repetitive_minutes,
          other: Math.max(r.total_minutes - r.repetitive_minutes, 0),
        }));
        setData(rows.slice(0, 10));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [dimension, department]);

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-card shadow-editorial card-enter">
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-0 md:flex-row md:justify-between md:items-center mb-4 sm:mb-6 md:mb-8">
        <div>
          <span className="text-[10px] sm:text-label-sm text-outline uppercase tracking-wider">Resource Utilization</span>
          <h2 className="font-display text-base sm:text-lg md:text-headline-md text-primary">Time Breakdown</h2>
        </div>
        <div className="flex bg-[#F2EEE6] rounded-lg p-0.5 sm:p-1 w-fit">
          {DIMENSIONS.map((d) => (
            <button
              key={d.key}
              onClick={() => setDimension(d.key)}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-label-sm transition-colors ${
                dimension === d.key ? "bg-white shadow-sm text-primary" : "text-outline hover:text-primary"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-40 sm:h-48 md:h-64 flex items-center justify-center text-xs sm:text-sm text-outline">Loading chart...</div>
      ) : data.length === 0 ? (
        <div className="h-40 sm:h-48 md:h-64 flex items-center justify-center text-xs sm:text-sm text-outline">No data for this filter.</div>
      ) : (
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : window.innerWidth < 1024 ? 280 : 300}>
          <BarChart data={data} onClick={(e) => {
            if (dimension === "task_category" && e?.activeLabel) onSelectTask(e.activeLabel);
          }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3EBE7" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#727973" }} angle={-20} textAnchor="end" height={50} axisLine={{ stroke: "#c1c8c2" }} />
            <YAxis tick={{ fontSize: 10, fill: "#727973" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(24,56,41,0.06)" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="repetitive" stackId="a" fill="#183829" name="Repetitive" cursor="pointer" animationDuration={600} />
            <Bar dataKey="other" stackId="a" fill="#E3EBE7" name="Non-repetitive" radius={[4, 4, 0, 0]} cursor="pointer" animationDuration={600} animationBegin={150} />
          </BarChart>
        </ResponsiveContainer>
      )}
      {dimension === "task_category" && (
        <p className="text-[9px] sm:text-xs text-outline mt-2 sm:mt-3">Click a bar to filter the employee list by that task.</p>
      )}
    </div>
  );
}