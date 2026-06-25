import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-green-50 rounded-full">
            <AiOutlineLock className="text-2xl text-richblack-900" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-richblack-5">Change Password</h2>
            <p className="text-richblack-300 text-sm">Update your account password</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-richblack-5">
              Current Password <span className="text-pink-200">*</span>
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="w-full rounded-lg bg-richblack-700 p-3 pr-12 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("oldPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-5 transition-colors"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <span className="text-xs text-pink-200">Please enter your Current Password.</span>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-richblack-5">
              New Password <span className="text-pink-200">*</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="w-full rounded-lg bg-richblack-700 p-3 pr-12 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("newPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-5 transition-colors"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-xs text-pink-200">Please enter your New Password.</span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-richblack-5">
              Confirm New Password <span className="text-pink-200">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                className="w-full rounded-lg bg-richblack-700 p-3 pr-12 text-richblack-5 border border-richblack-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register("confirmNewPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-5 transition-colors"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <span className="text-xs text-pink-200">Please confirm your New Password.</span>
            )}
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
            text="Update Password"
            customClasses="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700"
          />
        </div>
      </div>
    </form>
  )
}