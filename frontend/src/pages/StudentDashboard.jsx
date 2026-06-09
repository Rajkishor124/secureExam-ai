import { useEffect, useState } from "react";

import { getAllExams } from "../services/examService";

import Sidebar from "../components/dashboard/Sidebar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import ExamCard from "../components/dashboard/ExamCard";

function StudentDashboard() {

  const [exams, setExams] = useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchExams = async () => {

      try {

        const data =
          await getAllExams();

        setExams(data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchExams();

  }, []);

  return (
    <div className="
      flex
      bg-slate-900
      text-white
    ">

      <Sidebar />

      <div className="
        flex-1
        p-8
      ">

        <WelcomeBanner
          user={user}
        />

        <div className="
          grid
          md:grid-cols-4
          gap-6
          mb-10
        ">

          <StatCard
            title="Available Exams"
            value={exams.length}
          />

          <StatCard
            title="Completed"
            value="0"
          />

          <StatCard
            title="Average Score"
            value="0%"
          />

          <StatCard
            title="Active"
            value="Yes"
          />

        </div>

        <h2 className="
          text-3xl
          font-bold
          mb-6
        ">
          Available Exams
        </h2>

        <div className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        ">

          {
            exams.map((exam) => (

              <ExamCard
                key={exam._id}
                exam={exam}
              />

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;