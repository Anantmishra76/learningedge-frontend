// LoginForm component for user login
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-6"
    >
      <label className="w-full">
        <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-medium">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-xl bg-richblack-800 p-4 text-richblack-5 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 hover:border-richblack-600"
        />
      </label>

      <label className="relative">
        <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-medium">
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
          className="w-full rounded-xl bg-richblack-800 p-4 pr-12 text-richblack-5 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 hover:border-richblack-600"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-[42px] z-[10] cursor-pointer hover:text-blue-400 transition-colors duration-200"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs text-blue-100 hover:text-blue-200 transition-colors duration-200">
            Forgot Password?
          </p>
        </Link>
      </label>


      <button
        type="submit"
        className="mt-8 mx-auto block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-4 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-blue-700 focus:from-blue-600 focus:to-blue-700 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm