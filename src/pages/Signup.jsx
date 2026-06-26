import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Tab from "../components/common/Tab"
import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.")
      return
    }

    dispatch(setSignupData({ ...formData, accountType }))
    dispatch(sendOtp(email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-xl w-full relative z-10">
        <div className="bg-richblack-800/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-richblack-700/50 hover:border-richblack-600/70 transition-all duration-300 hover:shadow-yellow-400/10">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-slate-900 mb-2 bg-gradient-to-r from-richblack-5 to-richblack-100 bg-clip-text">
            Your Edge Starts Here
          </h1>
          <p className="text-base leading-relaxed text-slate-700 mb-4">
            join a community of learners pushing boundaries and building futures
          </p>

          <div className="mt-2">
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-slate-900 text-sm font-medium mb-1">
                    First Name <span className="text-pink-200">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    className="w-full rounded-lg bg-richblack-800 p-2.5 text-slate-900 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-slate-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-slate-900 text-sm font-medium mb-1">
                    Last Name <span className="text-pink-200">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    className="w-full rounded-lg bg-richblack-800 p-2.5 text-slate-900 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-900 text-sm font-medium mb-1">
                  Email Address <span className="text-pink-200">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-lg bg-richblack-800 p-2.5 text-slate-900 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col relative">
                  <label className="text-slate-900 text-sm font-medium mb-1">
                    Create Password <span className="text-pink-200">*</span>
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="w-full rounded-lg bg-richblack-800 p-2.5 pr-12 text-slate-900 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-slate-500 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                <div className="flex flex-col relative">
                  <label className="text-slate-900 text-sm font-medium mb-1">
                    Confirm Password <span className="text-pink-200">*</span>
                  </label>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="w-full rounded-lg bg-richblack-800 p-2.5 pr-12 text-slate-900 outline-none border border-richblack-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-slate-500 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 mx-auto block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-4 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-blue-700 focus:from-blue-600 focus:to-blue-700 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
