import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="
      w-64
      min-h-screen
      bg-slate-950
      border-r
      border-slate-800
      p-6
    ">

      <h1 className="
        text-2xl
        font-bold
        text-blue-500
        mb-10
      ">
        SecureExam AI
      </h1>

      <div className="space-y-4">

        <Link
          to="/admin"
          className="block hover:text-blue-500"
        >
          Dashboard
        </Link>

        <Link
          to="/create-exam"
          className="block hover:text-blue-500"
        >
          Create Exam
        </Link>

        <Link
          to="/add-question"
          className="block hover:text-blue-500"
        >
          Add Questions
        </Link>

        <Link
          to="/admin/results"
          className="
    block
    hover:text-blue-500
  "
        >
          Results
        </Link>

        <button
          onClick={logout}
          className="
            mt-10
            text-red-400
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminSidebar;