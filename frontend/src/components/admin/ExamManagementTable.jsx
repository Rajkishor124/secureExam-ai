import { useState } from "react";

import {
  deleteExam,
  updateExam,
} from "../../services/adminService";

import EditExamModal from "./EditExamModal";

function ExamManagementTable({
  exams,
  refreshExams,
}) {

  const [selectedExam,
    setSelectedExam] =
    useState(null);

  const handleDelete =
    async (examId) => {

      const confirmDelete =
        window.confirm(
          "Delete this exam?"
        );

      if (!confirmDelete) return;

      try {

        await deleteExam(examId);

        refreshExams();

      } catch (error) {

        console.log(error);

      }
    };

  const handleSave =
    async (updatedExam) => {

      try {

        await updateExam(
          selectedExam._id,
          updatedExam
        );

        setSelectedExam(null);

        refreshExams();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <>

      <div className="
        bg-slate-800
        rounded-2xl
        overflow-hidden
      ">

        <table className="
          w-full
        ">

          <thead>

            <tr className="
              bg-slate-700
            ">

              <th className="p-4">
                Exam
              </th>

              <th>
                Duration
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              exams.map((exam) => (

                <tr
                  key={exam._id}
                  className="
                    border-b
                    border-slate-700
                  "
                >

                  <td className="p-4">
                    {exam.title}
                  </td>

                  <td>
                    {exam.duration}
                    mins
                  </td>

                  <td>

                    <div className="
                      flex
                      gap-2
                    ">

                      <button
                        onClick={() =>
                          setSelectedExam(exam)
                        }
                        className="
                          bg-blue-500
                          px-3
                          py-1
                          rounded
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            exam._id
                          )
                        }
                        className="
                          bg-red-500
                          px-3
                          py-1
                          rounded
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

      {
        selectedExam && (

          <EditExamModal
            exam={selectedExam}
            onClose={() =>
              setSelectedExam(null)
            }
            onSave={handleSave}
          />

        )
      }

    </>
  );
}

export default ExamManagementTable;