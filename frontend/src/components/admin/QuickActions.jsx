import { useNavigate } from "react-router-dom";

function QuickActions() {

  const navigate = useNavigate();

  return (
    <div className="
      bg-slate-800
      rounded-2xl
      p-6
      mb-10
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Quick Actions
      </h2>

      <div className="flex gap-4">

        <button
          onClick={() =>
            navigate("/create-exam")
          }
          className="
            bg-blue-500
            px-5
            py-3
            rounded-xl
          "
        >
          Create Exam
        </button>

        <button
          onClick={() =>
            navigate("/add-question")
          }
          className="
            bg-green-500
            px-5
            py-3
            rounded-xl
          "
        >
          Add Question
        </button>

      </div>

    </div>
  );
}

export default QuickActions;