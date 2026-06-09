function SubmitButton({
  handleSubmit,
  submitted,
}) {

  return (
    <button
      onClick={handleSubmit}
      disabled={submitted}
      className={`px-6 py-3 rounded text-white font-bold ${
        submitted
          ? "bg-gray-500"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {
        submitted
          ? "Submitted"
          : "Submit Exam"
      }
    </button>
  );
}

export default SubmitButton;