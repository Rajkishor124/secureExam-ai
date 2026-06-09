import API from "./api";


// GET ALL EXAMS
export const getAllExams = async () => {

  const token = localStorage.getItem("token");

  const response = await API.get(
    "/exams/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// GET QUESTIONS
export const getQuestions = async (examId) => {

  const token = localStorage.getItem("token");

  const response = await API.get(
    `/exams/questions/${examId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// SUBMIT EXAM
export const submitExam = async (examData) => {

  const token = localStorage.getItem("token");

  const response = await API.post(
    "/exams/submit",
    examData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};