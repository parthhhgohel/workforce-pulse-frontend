import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import api from "../api";

export default function EmployeeDrilldown({ employeeId, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get(`/metrics/employee/${employeeId}/`)
      .then((res) => !cancelled && setProfile(res.data))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [employeeId]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#001d36]/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white rounded-card shadow-editorial p-4 sm:p-6 md:p-8 w-full max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {loading || !profile ? (
            <div className="h-32 sm:h-40 flex items-center justify-center text-xs sm:text-sm text-outline">Loading profile...</div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
                <div className="min-w-0">
                  <h3 className="font-display text-lg sm:text-2xl text-primary truncate">{profile.name}</h3>
                  <p className="text-xs sm:text-sm text-outline truncate">{profile.role} — {profile.department} ({profile.employee_id})</p>
                </div>
                <button onClick={onClose} className="text-outline hover:text-primary transition-colors shrink-0"><X size={16} className="sm:w-5 sm:h-5" /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                <div className="bg-cream-bg rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-primary">
                  <p className="text-[9px] sm:text-label-sm text-outline mb-0.5 sm:mb-1">Total Minutes</p>
                  <p className="font-numeric text-lg sm:text-2xl text-primary">{profile.total_minutes}</p>
                </div>
                <div className="bg-cream-bg rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-amber-gold">
                  <p className="text-[9px] sm:text-label-sm text-outline mb-0.5 sm:mb-1">Repetitive Share</p>
                  <p className="font-numeric text-lg sm:text-2xl text-amber-gold">{profile.repetitive_percentage}%</p>
                </div>
              </div>

              <h4 className="text-[9px] sm:text-label-sm text-outline uppercase mb-1.5 sm:mb-2">Top Tasks</h4>
              <ul className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-6">
                {profile.top_tasks.map((t) => (
                  <li key={t.task_category} className="text-xs sm:text-sm text-on-surface-variant flex justify-between border-b border-outline-variant/20 pb-1 sm:pb-1.5">
                    <span className="truncate">{t.task_category}</span>
                    <span className="text-outline ml-2 whitespace-nowrap">{t.m} min</span>
                  </li>
                ))}
              </ul>

              {profile.peer_comparison_repetitive_pct !== null ? (
                <div className="bg-primary-container/10 border border-primary/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-primary leading-relaxed">
                  Peers in the same role ({profile.peer_count}) average{" "}
                  <strong>{profile.peer_comparison_repetitive_pct}%</strong> repetitive time, vs{" "}
                  <strong>{profile.repetitive_percentage}%</strong> for {profile.name}.
                </div>
              ) : (
                <p className="text-[9px] sm:text-xs text-outline">No peers with the same role to compare against.</p>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}