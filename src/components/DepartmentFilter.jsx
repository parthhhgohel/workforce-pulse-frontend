const DEPARTMENTS = ["Operations", "Finance", "Sales", "Customer Support", "HR", "Marketing"];

export default function DepartmentFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-label-sm transition-colors whitespace-nowrap ${
          !selected ? "bg-primary text-white" : "bg-white border border-outline-variant text-on-surface-variant hover:bg-[#F2EEE6]"
        }`}
      >
        All
      </button>
      {DEPARTMENTS.map((dept) => (
        <button
          key={dept}
          onClick={() => onChange(dept)}
          className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-label-sm transition-colors whitespace-nowrap ${
            selected === dept ? "bg-primary text-white" : "bg-white border border-outline-variant text-on-surface-variant hover:bg-[#F2EEE6]"
          }`}
        >
          {dept}
        </button>
      ))}
    </div>
  );
}