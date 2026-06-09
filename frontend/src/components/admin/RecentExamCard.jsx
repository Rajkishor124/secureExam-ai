function RecentExamCard({ exam }) {

  return (
    <div className="
      bg-slate-800
      p-6
      rounded-2xl
    ">

      <h2 className="
        text-xl
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

      <p className="mt-3">
        Duration:
        {" "}
        {exam.duration}
        mins
      </p>

    </div>
  );
}

export default RecentExamCard;