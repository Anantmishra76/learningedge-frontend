import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineGlobeAlt,
  HiOutlinePhone,
} from "react-icons/hi2"
import { IoSendSharp } from "react-icons/io5"

import Footer from "../components/common/Footer"
import CountryCode from "../../data/countrycode.js"
import { apiConnector } from "../services/apiConnector"
import { contactusEndpoint } from "../services/apis"

const contactInfo = [
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Chat with us",
    text: "noreply.learnedge@gmail.com",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Visit us",
    text: "SMS Lucknow-226010",
  },
  {
    icon: HiOutlinePhone,
    title: "Call us",
    text: "Mon–Fri, 8 am – 5 pm",
  },
]

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        countrycode: "+91",
        phoneNo: "",
        message: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      toast.success("Message sent! We'll get back to you soon.")
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error("CONTACT US ERROR:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    "rounded-lg bg-richblack-800 border border-richblack-600 px-4 py-3 text-sm text-richblack-5 placeholder-richblack-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  const inputClass = `w-full ${inputBase}`

  return (
    <div className="min-h-screen bg-richblack-900">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-richblack-800 to-richblack-900 py-16 text-center">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-4">
          <h1 className="text-4xl font-bold text-richblack-5 sm:text-5xl">
            Contact <span className="text-blue-400">Us</span>
          </h1>
          <p className="mt-4 text-base text-richblack-300 sm:text-lg">
            Have a question or feedback? Fill out the form and our team will get
            back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ─── Main content ─── */}
      <section className="mx-auto -mt-6 max-w-5xl px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* ── Left: Info cards ── */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="group flex items-start gap-4 rounded-xl border border-richblack-700 bg-richblack-800/60 p-5 backdrop-blur transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 transition-colors group-hover:bg-blue-600/30">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-richblack-5">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-richblack-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-richblack-700 bg-richblack-800/60 p-6 backdrop-blur sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20 text-green-400">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-richblack-5">
                    Thank you!
                  </h3>
                  <p className="mt-2 text-richblack-300">
                    Your message has been sent. We'll respond shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  {/* Name row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-richblack-100">
                        First Name <span className="text-pink-300">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className={inputClass}
                        {...register("firstname", { required: true })}
                      />
                      {errors.firstname && (
                        <p className="mt-1 text-xs text-yellow-400">
                          First name is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-richblack-100">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className={inputClass}
                        {...register("lastname")}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-richblack-100">
                      Email <span className="text-pink-300">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-yellow-400">
                        Email is required
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-richblack-100">
                      Phone Number <span className="text-pink-300">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <select
                        className={`${inputBase} w-[120px] shrink-0`}
                        {...register("countrycode", { required: true })}
                        defaultValue="+91"
                      >
                        {CountryCode.map((c, i) => (
                          <option
                            key={i}
                            value={c.code}
                            className="bg-richblack-800"
                          >
                            {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="12345 67890"
                        className={`${inputBase} flex-1 min-w-0`}
                        {...register("phoneNo", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,12}$/,
                            message: "Enter a valid phone number (10-12 digits)",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNo && (
                      <p className="mt-1 text-xs text-yellow-400">
                        {errors.phoneNo.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-richblack-100">
                      Message <span className="text-pink-300">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your question or feedback here..."
                      className={`${inputClass} resize-none`}
                      {...register("message", { required: true })}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-yellow-400">
                        Message is required
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-blue-400 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <IoSendSharp size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact