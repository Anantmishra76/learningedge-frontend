
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


function Template({ title, description1, description2, formType }) {

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-xl w-full relative z-10">
        {/* Form Section */}
        <div className="bg-richblack-800/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-richblack-700/50 hover:border-richblack-600/70 transition-all duration-300 hover:shadow-yellow-400/10">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-richblack-5 mb-2 bg-gradient-to-r from-richblack-5 to-richblack-100 bg-clip-text">
            {title}
          </h1>
          <p className="text-base leading-relaxed text-richblack-100 mb-4">
            <span>{description1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              {description2}
            </span>
          </p>

          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  )
}

export default Template