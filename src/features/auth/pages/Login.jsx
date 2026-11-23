import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "@/features/auth/services/authAPI";
import Footer from "@/components/common/Footer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <>
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <h1 className="mb-2 text-2xl font-medium leading-tight text-slate-900 lg:text-3xl">
              Sign In to LearningEdge
            </h1>

            <form
              onSubmit={handleOnSubmit}
              className="mt-6 flex w-full flex-col gap-y-6">
              <label className="w-full">
                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-slate-900 font-medium">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </label>

              <label className="relative">
                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-slate-900 font-medium">
                  Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-[42px] z-[10] cursor-pointer hover:text-blue-400 transition-colors duration-200">
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                <Link to="/forgot-password">
                  <p className="mt-2 ml-auto max-w-max text-xs text-yellow-400 hover:text-blue-200 transition-colors duration-200">
                    Forgot Password?
                  </p>
                </Link>
              </label>

              <button
                type="submit"
                className="mx-auto mt-6 block rounded-lg bg-brand-700 px-5 py-3 font-medium text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
