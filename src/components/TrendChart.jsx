import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../api";

export default function TrendChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/metrics/trend/")
      .then((res) => setData(res.data.trend.map((t) => ({ ...t, label: `Week ${t.week}` }))))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white p-4 sm:p-6 md:p-8 rounded-card shadow-editorial card-enter">
      <span className="text-[10px] sm:text-label-sm text-outline uppercase tracking-wider">Efficiency Momentum</span>
      <h2 className="font-display text-base sm:text-lg md:text-headline-md text-primary mb-4 sm:mb-6">Week-over-Week Trend</h2>
      {loading ? (
        <div className="h-40 sm:h-44 md:h-48 flex items-center justify-center text-xs sm:text-sm text-outline">Loading trend...</div>
      ) : (
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 200 : 240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3EBE7" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#727973" }} />
            <YAxis tick={{ fontSize: 10, fill: "#727973" }} unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="repetitive_share_pct" stroke="#183829" strokeWidth={2} dot={{ fill: "#c9a15a", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}