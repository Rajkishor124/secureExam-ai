import { useState } from "react";

import API from "../services/api";

import Input from "../components/ui/Input";

import { useNavigate } from "react-router-dom";

function CreateExam() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

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

      await API.post(
        "/exams/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Exam Created Successfully");

      navigate("/admin");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl mb-8 font-bold text-blue-500">
        Create Exam
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl"
      >

        <Input
          type="text"
          name="title"
          placeholder="Exam Title"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <textarea
          name="description"
          placeholder="Exam Description"
          border = "1px solid White"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <Input
          type="number"
          name="duration"
          placeholder="Duration in Minutes"
          onChange={handleChange}
          className="w-full p-3 rounded mb-4 text-white"
          required
        />

        <button
          className="bg-blue-500 px-6 py-3 rounded"
        >
          Create Exam
        </button>

      </form>

    </div>
  );
}

export default CreateExam;