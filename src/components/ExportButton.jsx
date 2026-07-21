import { FileDown } from "lucide-react";

export default function ExportButton({ department, taskCategory }) {
  const download = () => {
    const params = new URLSearchParams();
    if (department) params.set("department", department);
    if (taskCategory) params.set("task_category", taskCategory);
    const base = import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1";
    window.open(`${base}/export/pdf/?${params.toString()}`, "_blank");
  };
  return (
    <button
      onClick={download}
      className="flex items-center gap-2 bg-primary hover:bg-primary-container px-6 py-2.5 rounded-lg text-white text-label-sm transition-all active:scale-95"
    >
      <FileDown size={16} />
      Export Report PDF
    </button>
  );
}