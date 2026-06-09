function QuestionCard({
  question,
  index,
  answers,
  handleSelect,
}) {

  return (
    <div className="bg-gray-800 p-6 rounded mb-6">

      <h2 className="text-xl mb-4">
        {index + 1}. {question.questionText}
      </h2>

      <div className="space-y-3">

        {
          question.options.map((option) => (

            <button
              key={option}
              onClick={() =>
                handleSelect(
                  question._id,
                  option
                )
              }
              className={`block w-full text-left p-3 rounded transition ${
                answers.find(
                  (a) =>
                    a.questionId === question._id &&
                    a.selectedAnswer === option
                )
                  ? "bg-blue-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {option}
            </button>

          ))
        }

      </div>

    </div>
  );
}

export default QuestionCard;