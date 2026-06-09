function AdminBanner() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (
    <div className="
      bg-linear-to-r
      from-indigo-600
      to-blue-600
      p-8
      rounded-3xl
      mb-8
    ">

      <h1 className="
        text-4xl
        font-bold
      ">
        Welcome Admin,
        {" "}
        {user?.name}
      </h1>

      <p className="mt-3">
        Manage exams, questions and
        student assessments.
      </p>

    </div>
  );
}

export default AdminBanner;