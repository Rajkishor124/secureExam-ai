import API from "./api";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const updateExam = async (
  examId,
  examData
) => {

  const response = await API.put(
    `/exams/${examId}`,
    examData,
    getToken()
  );

  return response.data;
};

export const deleteExam = async (
  examId
) => {

  const response = await API.delete(
    `/exams/${examId}`,
    getToken()
  );

  return response.data;
};

export const getAdminStats = async () => {

  const response = await API.get(
    "/admin/stats",
    getToken()
  );

  return response.data;
};