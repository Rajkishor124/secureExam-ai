import { useEffect, useState, useCallback } from "react";

import { getAllExams } from "../services/examService";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminBanner from "../components/admin/AdminBanner";
import AdminStatCard from "../components/admin/AdminStatCard";
import QuickActions from "../components/admin/QuickActions";
import ExamManagementTable from "../components/admin/ExamManagementTable";
import {getAdminStats} from "../services/adminService";

function AdminDashboard() {

  const [exams, setExams] = useState([]);
  const [stats, setStats] = useState({
    totalExams: 0,
    totalQuestions: 0,
    totalStudents: 0,
    totalAttempts: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchExams = useCallback(async () => {
    try {
      const data = await getAllExams();
      setExams(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const loadDashboardData = async () => {
      await fetchExams();
      await fetchStats();
    };

    loadDashboardData();
  }, [fetchExams, fetchStats]);


  return (
    <div className="
      flex
      bg-slate-900
      text-white
    ">

      <AdminSidebar />

      <div className="
        flex-1
        p-8
      ">

        <AdminBanner />

        <div className="
          grid
          md:grid-cols-4
          gap-6
          mb-10
        ">

          <AdminStatCard
            title="Total Exams"
            value={stats.totalExams}
          />

          <AdminStatCard
            title="Questions"
            value={stats.totalQuestions}
          />

          <AdminStatCard
            title="Students"
            value={stats.totalStudents}
          />

          <AdminStatCard
            title="Attempts"
            value={stats.totalAttempts}
          />

        </div>

        <QuickActions />

        <h2 className=" text-3xl font-bold mb-6">
          Exam Management
        </h2>

        <ExamManagementTable
          exams={exams}
          refreshExams={fetchExams}
        />

      </div>

    </div>
  );
}
export default AdminDashboard;