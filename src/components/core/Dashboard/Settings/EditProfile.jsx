import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AiOutlineUser } from "react-icons/ai"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 rounded-full">
            <AiOutlineUser className="text-2xl text-richblack-900" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-richblack-5">Personal Information</h2>
            <p className="text-richblack-300 text-sm">Update your personal details</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-richblack-5">
                First Name <span className="text-pink-200">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="text-xs text-pink-200">Please enter your first name.</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-richblack-5">
                Last Name <span className="text-pink-200">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="text-xs text-pink-200">Please enter your last name.</span>
              )}
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-richblack-5">
                Date of Birth <span className="text-pink-200">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="text-xs text-pink-200">{errors.dateOfBirth.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-richblack-5">
                Gender <span className="text-pink-200">*</span>
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele} className="bg-richblack-700">
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-xs text-pink-200">Please select your gender.</span>
              )}
            </div>
          </div>

          {/* Contact and About */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-richblack-5">
                Contact Number <span className="text-pink-200">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-xs text-pink-200">{errors.contactNumber.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="about" className="block text-sm font-medium text-richblack-5">
                About <span className="text-pink-200">*</span>
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="text-xs text-pink-200">Please enter your About.</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-richblack-700">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="px-6 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <IconBtn
            type="submit"
            text="Save Changes"
            customClasses="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700"
          />
        </div>
      </div>
    </form>
  )
}