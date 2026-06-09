import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { registerUser } from "../services/authService";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
        await registerUser(formData);

      alert(data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="
      min-h-screen
      bg-linear-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        max-w-7xl
        w-full
        grid
        lg:grid-cols-2
        gap-12
        items-center
      ">

        {/* LEFT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <h1 className="
            text-6xl
            font-bold
            leading-tight
          ">

            Join
            <span className="text-blue-500">
              {" "}SecureExam AI
            </span>

          </h1>

          <p className="
            mt-6
            text-slate-400
            text-lg
          ">

            Create your account and
            experience a secure,
            modern online examination
            platform.

          </p>

          <div className="
            mt-10
            space-y-4
          ">

            <div>
              🚀 Easy Registration
            </div>

            <div>
              🔐 Secure Authentication
            </div>

            <div>
              ⏱ Smart Examination System
            </div>

            <div>
              📊 Instant Results
            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <Card className="p-10">

            <h2 className="
              text-4xl
              font-bold
              mb-2
            ">
              Create Account
            </h2>

            <p className="
              text-slate-400
              mb-8
            ">
              Register to continue
            </p>

            <form onSubmit={handleSubmit}>

              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

              <div className="mb-5">

                <label className="
                  block
                  mb-2
                  text-slate-300
                ">
                  Password
                </label>

                <div className="
                  flex
                  items-center
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-xl
                ">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      flex-1
                      bg-transparent
                      px-4
                      py-3
                      outline-none
                    "
                    placeholder="Enter password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      px-4
                      text-slate-400
                    "
                  >
                    {
                      showPassword
                        ? "Hide"
                        : "Show"
                    }
                  </button>

                </div>

              </div>

              <Button
                disabled={loading}
              >
                {
                  loading
                    ? "Creating Account..."
                    : "Register"
                }
              </Button>

            </form>

            <p className="
              mt-6
              text-center
              text-slate-400
            ">

              Already have an account?

              <Link
                to="/login"
                className="
                  text-blue-500
                  ml-2
                "
              >
                Login
              </Link>

            </p>

          </Card>

        </motion.div>

      </div>

    </div>
  );
}

export default Register;