import { useState } from "react";
import { deleteExam, updateExam } from "../../services/adminService";
import EditExamModal from "./EditExamModal";

function ExamManagementTable({ exams, refreshExams }) {
  const [selectedExam, setSelectedExam] = useState(null);
  const [examToDelete, setExamToDelete] = useState(null);

  const confirmDelete = async () => {
    if (!examToDelete) return;
    try {
      await deleteExam(examToDelete);
      refreshExams();
    } catch (error) {
      console.log(error);
    } finally {
      setExamToDelete(null);
    }
  };

  const handleSave = async (updatedExam) => {
    try {
      await updateExam(selectedExam._id, updatedExam);
      setSelectedExam(null);
      refreshExams();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-gov">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Exam
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Duration
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Re-attempts
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-900 font-medium">{exam.title}</td>
                  <td className="p-4 text-gray-600">{exam.duration} mins</td>
                  <td className="p-4">
                    {exam.allowReattempt ? (
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                        </svg>
                        {exam.maxAttempts} attempts
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedExam(exam)}
                        className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setExamToDelete(exam._id)}
                        className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedExam && (
        <EditExamModal
          exam={selectedExam}
          onClose={() => setSelectedExam(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {examToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Exam?</h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Are you sure you want to delete this exam? All associated questions and results will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setExamToDelete(null)}
                className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-red-700 transition-all duration-200 shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExamManagementTable;