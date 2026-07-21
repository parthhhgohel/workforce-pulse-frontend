import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import HeadlineMetrics from "./components/HeadlineMetrics";
import DataQualityPanel from "./components/DataQualityPanel";
import DepartmentFilter from "./components/DepartmentFilter";
import BreakdownChart from "./components/BreakdownChart";
import AutomationRanking from "./components/AutomationRanking";
import EmployeeList from "./components/EmployeeList";
import EmployeeDrilldown from "./components/EmployeeDrilldown";
import TrendChart from "./components/TrendChart";
import AnomalyCallout from "./components/AnomalyCallout";
import ExportButton from "./components/ExportButton";
import ChatFAB from "./components/ChatFAB";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function App() {
  const [department, setDepartment] = useState(null);
  const [taskCategory, setTaskCategory] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="min-h-screen bg-cream-bg">
      <Header />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4 }}>
          <HeadlineMetrics department={department} taskCategory={taskCategory} />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.05 }}>
          <DataQualityPanel />
        </motion.div>

        <motion.div
          initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
        >
          <DepartmentFilter selected={department} onChange={setDepartment} />
          <ExportButton department={department} taskCategory={taskCategory} />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.15 }}>
          <AnomalyCallout />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.2 }}>
          <BreakdownChart department={department} onSelectTask={setTaskCategory} />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.25 }}>
          <AutomationRanking department={department} />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.3 }}>
          <TrendChart />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.4, delay: 0.35 }}>
          <EmployeeList department={department} taskCategory={taskCategory} onSelectEmployee={setSelectedEmployee} />
        </motion.div>

        {selectedEmployee && (
          <EmployeeDrilldown employeeId={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
        )}
      </main>
      <ChatFAB />
    </div>
  );
}