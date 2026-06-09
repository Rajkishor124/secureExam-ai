import { useNavigate } from "react-router-dom";

function ExamCard({ exam }) {

  const navigate = useNavigate();

  return (
    <div className="
      bg-slate-800
      p-6
      rounded-2xl
      hover:scale-[1.02]
      transition
    ">

      <h2 className="
        text-2xl
        font-semibold
      ">
        {exam.title}
      </h2>

      <p className="
        text-slate-400
        mt-2
      ">
        {exam.description}
      </p>

      <p className="mt-4">

        Duration:
        {" "}
        {exam.duration}
        {" "}
        mins

      </p>

      <button
        onClick={() =>
          navigate(`/exam/${exam._id}`)
        }
        className="
          mt-4
          bg-blue-500
          px-5
          py-2
          rounded-xl
        "
      >
        Start Exam
      </button>

    </div>
  );
}

export default ExamCard;