// VerifyEmail Page Component - Email verification with OTP
import { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Components
import Loading from "../components/common/Loading"

// API functions
import { sendOtp, signUp } from "../services/operations/authAPI"

function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redirect to signup if no signup data exists
  useEffect(() => {
    if (!signupData) {
      navigate("/signup")
    }
  }, [navigate, signupData])

  // Handle OTP verification and signup
  const handleVerifyAndSignup = (e) => {
    e.preventDefault()
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
  }

  return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-[500px] w-full relative z-10">
          <div className="bg-richblack-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-richblack-700/50">
            <h1 className="text-slate-900 font-semibold text-[1.875rem] leading-[2.375rem] text-center mb-4">
              Verify Email
            </h1>

            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-slate-700 text-center">
              A verification code has been sent to you. Enter the code below
            </p>

            <form onSubmit={handleVerifyAndSignup}>
              <div className="flex justify-center mb-8">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-xl text-slate-900 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-500 transition-all duration-200 hover:bg-richblack-700"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 8px",
                  }}
                />
              </div>

              <button
                type="submit"
                className="mt-8 mx-auto block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-4 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-blue-700 focus:from-blue-600 focus:to-blue-700 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Verify Email
              </button>
            </form>

            <div className="mt-8 flex items-center justify-between">
              <Link to="/signup">
                <p className="text-slate-900 flex items-center gap-x-2 hover:text-slate-700 transition-colors duration-200">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>

              <button
                className="flex items-center text-blue-100 gap-x-2 hover:text-blue-200 transition-colors duration-200"
                onClick={() => dispatch(sendOtp(signupData.email, navigate), setOtp(''))}
              >
                <RxCountdownTimer />
                Resend it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail

