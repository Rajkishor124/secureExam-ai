import { useEffect, useState } from "react";
import API from "../services/api";
import Input from "../components/ui/Input";
import AdminSidebar, { MobileMenuButton } from "../components/admin/AdminSidebar";
import Card from "../components/ui/Card";

function AddQuestion() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exams, setExams] = useState([]);

  const [formData, setFormData] = useState({
    examId: "",
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    marks: "",
  });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/exams/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExams(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExams();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const questionData = {
        examId: formData.examId,
        questionText: formData.questionText,
        options: [
          formData.option1,
          formData.option2,
          formData.option3,
          formData.option4,
        ],
        correctAnswer: formData.correctAnswer,
        marks: formData.marks,
      };

      await API.post("/exams/question/add", questionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Question Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-72">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <MobileMenuButton onClick={() => setSidebarOpen(true)} />
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Add Question</h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
              Admin
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Add Question</h2>
            <p className="text-gray-500 mt-1">Create a new question for an existing exam.</p>
          </div>

          <Card className="max-w-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Exam Select */}
              <div className="mb-5">
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Select Exam
                </label>
                <select
                  name="examId"
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-lg w-full px-4 py-3 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="text-gray-500">Select Exam</option>
                  {exams.map((exam) => (
                    <option key={exam._id} value={exam._id}>
                      {exam.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question Text */}
              <div className="mb-5">
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Question
                </label>
                <textarea
                  name="questionText"
                  placeholder="Enter your question here"
                  onChange={handleChange}
                  rows={4}
                  className="bg-white border border-gray-300 rounded-lg w-full px-4 py-3 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input type="text" name="option1" label="Option 1" placeholder="Option 1" onChange={handleChange} required />
                <Input type="text" name="option2" label="Option 2" placeholder="Option 2" onChange={handleChange} required />
                <Input type="text" name="option3" label="Option 3" placeholder="Option 3" onChange={handleChange} required />
                <Input type="text" name="option4" label="Option 4" placeholder="Option 4" onChange={handleChange} required />
              </div>

              <Input type="text" name="correctAnswer" label="Correct Answer" placeholder="Enter the correct answer" onChange={handleChange} required />
              <Input type="number" name="marks" label="Marks" placeholder="e.g. 5" onChange={handleChange} required />

              <button
                type="submit"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-all duration-200 shadow-md mt-4"
              >
                Add Question
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;