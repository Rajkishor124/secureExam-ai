import API from "./api";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllResults = async () => {

  const response = await API.get(
    "/results",
    getToken()
  );

  return response.data;
};

export const getResultsByExam = async (
  examId
) => {

  const response = await API.get(
    `/results/exam/${examId}`,
    getToken()
  );

  return response.data;
};