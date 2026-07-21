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
      <div className="p-3 sm:p-4 md:p-8 border-b border-outline-variant/20">
        <h2 className="font-display text-base sm:text-lg md:text-headline-md text-primary">
          Employees {taskCategory && <span className="text-outline font-body text-xs sm:text-sm">— "{taskCategory}"</span>}
        </h2>
      </div>
      {loading ? (
        <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center text-xs sm:text-sm text-outline">Loading...</div>
      ) : employees.length === 0 ? (
        <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center text-xs sm:text-sm text-outline">No employees match this filter.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F2EEE6] text-outline text-[9px] sm:text-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4">Employee</th>
                <th className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4">Role</th>
                <th className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 hidden sm:table-cell">Total Min</th>
                <th className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 text-right">Rep %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {employees.map((e) => (
                <tr
                  key={e.employee_id}
                  onClick={() => onSelectEmployee(e.employee_id)}
                  className={`cursor-pointer hover:bg-[#F2EEE6] transition-colors text-xs sm:text-sm ${top3Ids.includes(e.employee_id) ? "bg-amber-gold/5" : ""}`}
                >
                  <td className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 flex items-center gap-1.5 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[9px] sm:text-xs shrink-0">
                      {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-primary flex items-center gap-0.5 truncate">
                        {e.name} {top3Ids.includes(e.employee_id) && <Star size={10} className="fill-amber-gold text-amber-gold shrink-0 sm:w-3 sm:h-3" />}
                      </p>
                      <p className="text-[9px] text-outline truncate">{e.employee_id}</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 text-on-surface-variant truncate">{e.role}</td>
                  <td className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 text-on-surface-variant hidden sm:table-cell">{e.total_minutes_logged}</td>
                  <td className="px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 text-right font-semibold text-primary">{e.repetitive_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}