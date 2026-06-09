import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">

            Secure Online
            <span className="text-blue-500">
              {" "}Examinations
            </span>

          </h1>

          <p className="mt-6 text-gray-400 text-lg">

            Smart examination platform with
            secure authentication, timer-based
            tests, anti-cheating mechanisms and
            automated evaluation.

          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-600 hover:border-blue-500 transition px-6 py-3 rounded-xl"
            >
              Login
            </Link>

          </div>

        </motion.div>


      </div>

    </section>
  );
}

export default HeroSection;