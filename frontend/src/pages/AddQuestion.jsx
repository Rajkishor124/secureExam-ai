import { useEffect, useState } from "react";



import API from "../services/api";

import Input from "../components/ui/Input";

function AddQuestion() {

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


  // FETCH EXAMS
  useEffect(() => {

    const fetchExams = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get(
          "/exams/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExams(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchExams();

  }, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

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

      await API.post(
        "/exams/question/add",
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Question Added Successfully");

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl mb-8 font-bold text-blue-500">
        Add Question
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl"
      >

        <select
          name="examId"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        >

          <option value="">
            Select Exam
          </option>

          {
            exams.map((exam) => (

              <option
                key={exam._id}
                value={exam._id}
              >
                {exam.title}
              </option>

            ))
          }

        </select>

        <textarea
          name="questionText"
          placeholder="Question"
          border = "1px solid White"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <Input
          type="text"
          name="option1"
          placeholder="Option 1"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <Input
          type="text"
          name="option2"
          placeholder="Option 2"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white "
          required
        />

        <Input    
          type="text"
          name="option3"
          placeholder="Option 3"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <Input
          type="text"
          name="option4"
          placeholder="Option 4"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <Input
          type="text"
          name="correctAnswer"
          placeholder="Correct Answer"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white "
          required
        />

        <Input
          type="number"
          name="marks"
          placeholder="Marks"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <button
          className="bg-green-500 px-6 py-3 rounded"
        >
          Add Question
        </button>

      </form>

    </div>
  );
}

export default AddQuestion;