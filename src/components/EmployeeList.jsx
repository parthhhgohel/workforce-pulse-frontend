import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import api from "../api";

export default function EmployeeList({ department, taskCategory, onSelectEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = {};
    if (department) params.department = department;
    if (taskCategory) params.task_category = taskCategory;
    api.get("/employees/", { params })
      .then((res) => !cancelled && setEmployees(res.data.employees))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [department, taskCategory]);

  const top3Ids = [...employees].sort((a, b) => b.repetitive_percentage - a.repetitive_percentage).slice(0, 3).map((e) => e.employee_id);

  return (
    <section className="bg-white rounded-card shadow-editorial overflow-hidden card-enter">
      <div className="p-8 border-b border-outline-variant/20">
        <h2 className="font-display text-headline-md text-primary">
          Employees {taskCategory && <span className="text-outline font-body text-sm">— filtered by "{taskCategory}"</span>}
        </h2>
      </div>
      {loading ? (
        <div className="h-40 flex items-center justify-center text-sm text-outline">Loading...</div>
      ) : employees.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-sm text-outline">No employees match this filter.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F2EEE6] text-outline text-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Employee</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Total Minutes</th>
                <th className="px-8 py-4 text-right">Repetitive %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {employees.map((e) => (
                <tr
                  key={e.employee_id}
                  onClick={() => onSelectEmployee(e.employee_id)}
                  className={`cursor-pointer hover:bg-[#F2EEE6] transition-colors ${top3Ids.includes(e.employee_id) ? "bg-amber-gold/5" : ""}`}
                >
                  <td className="px-8 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                      {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-primary flex items-center gap-1 text-sm">
                        {e.name} {top3Ids.includes(e.employee_id) && <Star size={12} className="fill-amber-gold text-amber-gold" />}
                      </p>
                      <p className="text-[11px] text-outline">{e.employee_id}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-on-surface-variant text-sm">{e.role}</td>
                  <td className="px-8 py-4 text-on-surface-variant text-sm">{e.total_minutes_logged}</td>
                  <td className="px-8 py-4 text-right text-sm font-semibold text-primary">{e.repetitive_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}