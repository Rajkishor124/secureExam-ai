import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { loginUser } from "../services/authService";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
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
                await loginUser(formData);

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if (
                data.user.role === "admin"
            ) {

                navigate("/admin");

            } else {

                navigate("/dashboard");

            }

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                "Login Failed"
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
      px-6">
            <div className="
        max-w-7xl
        w-full
        grid
        lg:grid-cols-2
        gap-12
        items-center">

                {/* LEFT SECTION */}

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
            leading-tight">
                        Secure
                        <span className="text-blue-500">
                            {" "}Exam AI
                        </span>
                    </h1>
                    <p className=" mt-6 text-slate-400 text-lg ">
                        Smart online examination
                        platform with secure
                        authentication, timer-based
                        tests and anti-cheating
                        mechanisms.
                    </p>

                    <div className=" mt-10 space-y-4">

                        <div>
                            ✅ Secure Authentication
                        </div>

                        <div>
                            ✅ Real-Time Monitoring
                        </div>

                        <div>
                            ✅ Instant Evaluation
                        </div>

                        <div>
                            ✅ Online Examination
                        </div>

                    </div>

                </motion.div>

                {/* RIGHT SECTION */}

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

                    <Card className="p-1">

                        <h2 className="
              text-4xl
              font-bold
              mb-2
            ">
                            Welcome Back
                        </h2>

                        <p className="
              text-slate-400
              mb-8
            ">
                            Sign in to continue
                        </p>

                        <form
                            onSubmit={handleSubmit}
                        >

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
                                        className="px-4 text-slate-400">
                                        {
                                            showPassword
                                                ? "Hide"
                                                : "Show"
                                        }
                                    </button>

                                </div>

                            </div>

                            <Button disabled={loading}>
                                {loading ? "Logging In...": "Login" }
                            </Button>
                        </form>
                        <p className="mt-6 text-center text-slate-400">Don't have an account?
                            <Link to="/register" className=" text-blue-500 ml-2">Register</Link>
                        </p>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;