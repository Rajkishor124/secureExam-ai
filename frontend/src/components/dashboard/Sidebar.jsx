import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

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
          to="/dashboard"
          className="block hover:text-blue-500"
        >
          Dashboard
        </Link>

        <Link
          to="/dashboard"
          className="block hover:text-blue-500"
        >
          Exams
        </Link>

        <Link
          to="/results"
          className="block hover:text-blue-500"
        >
          Results
        </Link>

        <Link
          to="/profile"
          className="block hover:text-blue-500"
        >
          Profile
        </Link>

        <button
          onClick={logout}
          className="
            mt-10
            text-red-400
            hover:text-red-500
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;