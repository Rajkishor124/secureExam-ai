import { useState } from "react";
import API from "../services/api";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import AdminSidebar, { MobileMenuButton } from "../components/admin/AdminSidebar";
import Card from "../components/ui/Card";

function CreateExam() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    allowReattempt: false,
    maxAttempts: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        allowReattempt: formData.allowReattempt,
        maxAttempts: formData.allowReattempt ? Number(formData.maxAttempts) : 1,
      };
      await API.post("/exams/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Exam Created Successfully");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
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
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Create Exam</h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
              Admin
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Create New Exam</h2>
            <p className="text-gray-500 mt-1">Set up a new examination with title, description, and duration.</p>
          </div>

          <Card className="max-w-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="title"
                label="Exam Title"
                placeholder="Enter exam title"
                onChange={handleChange}
                required
              />

              <div className="mb-5">
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the exam content and objectives"
                  onChange={handleChange}
                  rows={4}
                  className="bg-white border border-gray-300 rounded-lg w-full px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <Input
                type="number"
                name="duration"
                label="Duration (minutes)"
                placeholder="e.g. 60"
                onChange={handleChange}
                required
              />

              {/* Re-attempt Configuration */}
              <div className="mb-6 mt-2 border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">Allow Re-attempts</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Enable students to retake this exam multiple times
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowReattempt"
                      checked={formData.allowReattempt}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900" />
                  </label>
                </div>

                {/* Max Attempts Selector (visible when re-attempt is enabled) */}
                {formData.allowReattempt && (
                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <label className="block mb-2.5 text-sm font-semibold text-gray-700">
                      Maximum Attempts
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Select how many times a student can attempt this exam (1 to 3)
                    </p>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, maxAttempts: num })}
                          className={`w-14 h-14 rounded-xl border-2 text-lg font-bold transition-all duration-200 flex items-center justify-center ${
                            Number(formData.maxAttempts) === num
                              ? "border-blue-900 bg-blue-900 text-white shadow-md"
                              : "border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {Number(formData.maxAttempts) === 1
                        ? "Students get 1 attempt (same as no re-attempt)"
                        : `Students can attempt this exam up to ${formData.maxAttempts} times`}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-all duration-200 shadow-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Exam"}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateExam;