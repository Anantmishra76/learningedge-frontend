import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/constants";
import Footer from "../components/common/Footer";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const initialAccountType =
    searchParams.get("role")?.toLowerCase() === "instructor"
      ? ACCOUNT_TYPE.INSTRUCTOR
      : ACCOUNT_TYPE.STUDENT;

  const [accountType, setAccountType] = useState(initialAccountType);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const accountOptions = [
    { label: "Student", value: ACCOUNT_TYPE.STUDENT },
    { label: "Instructor", value: ACCOUNT_TYPE.INSTRUCTOR },
  ];

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition  placeholder:text-slate-400";

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(setSignupData({ ...formData, accountType }));
    dispatch(sendOtp(email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <>
      <main className="min-h-[calc(100vh-3.5rem)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <section className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
              Join LearningEdge
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Create your account and start learning today.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Access courses, track progress, and learn from instructors in one
              focused e-learning platform.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                Learn at your own pace
              </p>
              <p className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                Build practical skills
              </p>
            </div>
          </section>

          <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Sign up</h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose your role and verify your email with OTP.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-100 p-1">
              {accountOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAccountType(option.value)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                    accountType === option.value
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}>
                  {option.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleOnSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    First name
                  </span>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    placeholder="Anant"
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Last name
                  </span>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    placeholder="Mishra"
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email address
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </span>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Create a password"
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }>
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm password
                </span>
                <div className="relative">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm your password"
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }>
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
                Continue to email verification
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-brand-500 hover:underline">
                Log in
              </Link>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Signup;
