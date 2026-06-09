import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="
sticky
top-0
z-50
backdrop-blur-lg
bg-black/30
border-b
border-white/10
px-8
py-5
flex
justify-between
items-center
">

      <h1 className="text-2xl font-bold text-blue-500">
        SecureExam AI
      </h1>

      <div className="flex gap-6">

        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>

        <Link to="/register" className="hover:text-blue-400">
          Register
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;