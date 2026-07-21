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
    <section className="bg-white p-8 rounded-card shadow-editorial card-enter">
      <span className="text-label-sm text-outline uppercase tracking-wider">Efficiency Momentum</span>
      <h2 className="font-display text-headline-md text-primary mb-6">Week-over-Week Trend</h2>
      {loading ? (
        <div className="h-48 flex items-center justify-center text-sm text-outline">Loading trend...</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3EBE7" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#727973" }} />
            <YAxis tick={{ fontSize: 12, fill: "#727973" }} unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="repetitive_share_pct" stroke="#183829" strokeWidth={3} dot={{ fill: "#c9a15a", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}