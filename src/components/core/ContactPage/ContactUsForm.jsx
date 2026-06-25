import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from '../../../../data/countrycode.js'

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async () => {
    try {
      setLoading(true)
      // TODO: Implement API call to submit contact form
      setLoading(false)
    } catch (error) {
      console.log("ERROR WHILE CONTACT US - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-2 max-w-md mx-auto"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First Name and Last Name Fields */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-sm font-medium text-richblack-100">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="w-full rounded-lg bg-richblack-800 border border-richblack-600 p-2 text-white placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-xs text-yellow-400 flex items-center gap-1">
              <span className="text-red-500">⚠</span> Please enter your name.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-sm font-medium text-richblack-100">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="w-full rounded-lg bg-richblack-800 border border-richblack-600 p-2 text-white placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-richblack-100">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="w-full rounded-lg bg-richblack-800 border border-richblack-600 p-2 text-white placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-yellow-400 flex items-center gap-1">
            <span className="text-red-500">⚠</span> Please enter your Email address.
          </span>
        )}
      </div>

      {/* Phone Number Field with Country Code */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-sm font-medium text-richblack-100">
          Phone Number
        </label>

        <div className="flex items-stretch gap-3">
          <select
            name="countrycode"
            id="countrycode"
            className="w-[90px] rounded-lg bg-richblack-800 border border-richblack-600 p-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code} className="bg-richblack-800 text-white">
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>

          <input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            placeholder="Enter phone number"
            className="flex-1 min-w-0 rounded-lg bg-richblack-800 border border-richblack-600 p-2 text-white placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your Phone Number.",
              },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-xs text-yellow-400 flex items-center gap-1">
            <span className="text-red-500">⚠</span> {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-richblack-100">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="3"
          placeholder="Write your message here"
          className="w-full rounded-lg bg-richblack-800 border border-richblack-600 p-2 text-white placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-yellow-400 flex items-center gap-1">
            <span className="text-red-500">⚠</span> Please enter your Message.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`w-1/2 mx-auto mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-center text-sm font-bold text-white shadow-lg hover:from-blue-500 hover:to-blue-400 disabled:bg-richblack-600 disabled:cursor-not-allowed sm:text-base transition-all duration-200 hover:shadow-xl hover:scale-105`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </div>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  )
}

export default ContactUsForm
