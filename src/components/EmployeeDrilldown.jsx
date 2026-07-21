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
        className="fixed inset-0 bg-[#001d36]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white rounded-card shadow-editorial p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {loading || !profile ? (
            <div className="h-40 flex items-center justify-center text-sm text-outline">Loading profile...</div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display text-2xl text-primary">{profile.name}</h3>
                  <p className="text-sm text-outline">{profile.role} — {profile.department} ({profile.employee_id})</p>
                </div>
                <button onClick={onClose} className="text-outline hover:text-primary transition-colors"><X size={18} /></button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cream-bg rounded-xl p-4 border-l-4 border-primary">
                  <p className="text-label-sm text-outline mb-1">Total Minutes</p>
                  <p className="font-numeric text-2xl text-primary">{profile.total_minutes}</p>
                </div>
                <div className="bg-cream-bg rounded-xl p-4 border-l-4 border-amber-gold">
                  <p className="text-label-sm text-outline mb-1">Repetitive Share</p>
                  <p className="font-numeric text-2xl text-amber-gold">{profile.repetitive_percentage}%</p>
                </div>
              </div>

              <h4 className="text-label-sm text-outline uppercase mb-2">Top Tasks</h4>
              <ul className="space-y-1.5 mb-6">
                {profile.top_tasks.map((t) => (
                  <li key={t.task_category} className="text-sm text-on-surface-variant flex justify-between border-b border-outline-variant/20 pb-1.5">
                    <span>{t.task_category}</span>
                    <span className="text-outline">{t.m} min</span>
                  </li>
                ))}
              </ul>

              {profile.peer_comparison_repetitive_pct !== null ? (
                <div className="bg-primary-container/10 border border-primary/10 rounded-xl p-4 text-sm text-primary">
                  Peers in the same role ({profile.peer_count}) average{" "}
                  <strong>{profile.peer_comparison_repetitive_pct}%</strong> repetitive time, vs{" "}
                  <strong>{profile.repetitive_percentage}%</strong> for {profile.name}.
                </div>
              ) : (
                <p className="text-xs text-outline">No peers with the same role to compare against.</p>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}