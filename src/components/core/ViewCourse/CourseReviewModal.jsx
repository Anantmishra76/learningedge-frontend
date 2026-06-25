import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { Rating } from "@smastrom/react-rating"
import "@smastrom/react-rating/style.css"
import { Star } from "@smastrom/react-rating"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { FiStar } from "react-icons/fi"

import { createRating } from "../../../services/operations/courseDetailsAPI"

import Img from './../../common/Img';

const StarIcon = Star

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseExperience: "",
      courseRating: 0
    }
  })

  useEffect(() => {
    setValue("courseRating", rating)
  }, [rating, setValue])

  const ratingChanged = (newRating) => {
    console.log("New rating selected:", newRating)
    setRating(newRating)
    setValue("courseRating", newRating)
    // Clear any previous error messages when the user selects a rating
    if (newRating > 0) {
      toast.dismiss() // Dismiss any existing error toasts
    }
  }

  const onSubmit = async (data) => {
    // Log the current rating value for debugging
    console.log("Current rating value:", data.courseRating)
    
    // Check if user is authenticated
    if (!token) {
      toast.error("Please login to submit a review")
      return
    }

    if (!user) {
      toast.error("User information not found. Please refresh and try again.")
      return
    }

    if (!courseEntireData?._id) {
      toast.error("Course information not found. Please refresh and try again.")
      return
    }

    if (!data.courseRating || data.courseRating === 0) {
      toast.error("Please provide a rating before submitting")
      return
    }

    setIsSubmitting(true)
    
    try {
      const success = await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      )
      
      if (success) {
        setReviewModal(false)
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      // API function already shows error toast, no need to show another one
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={() => setReviewModal(false)}
    >
      <div 
        className="my-6 w-11/12 max-w-[600px] rounded-2xl bg-white shadow-2xl border border-pure-greys-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Modal Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-caribbeangreen-400 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <FiStar className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Rate This Course</h2>
                  <p className="text-blue-100 text-xs">Help others with your feedback</p>
                </div>
              </div>
              <button 
                onClick={() => setReviewModal(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300 group"
              >
                <RxCross2 className="text-xl text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* User Info Card */}
            <div className="flex items-center gap-3 p-4 bg-pure-greys-5 rounded-xl mb-6">
              <Img
                src={user?.image}
                alt={user?.firstName + " profile"}
                className="aspect-square w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <p className="font-semibold text-richblack-800 capitalize">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-richblack-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-caribbeangreen-400 rounded-full"></span>
                  Posting publicly
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Rating Section */}
              <div className="text-center p-4 bg-white rounded-xl border border-pure-greys-100">
                <h3 className="text-lg font-semibold text-richblack-800 mb-3">
                  Rate your experience
                </h3>
                <div className="flex flex-col items-center gap-3">
                  <Rating
                    style={{ maxWidth: "160px" }}
                    itemStyles={{
                      itemShapes: StarIcon,
                      activeFillColor: '#f59e0b',
                      inactiveFillColor: '#e5e7eb'
                    }}
                    value={rating}
                    onChange={ratingChanged}
                    items={5}
                    spaceBetween="small"
                    spaceInside="medium"
                  />
                  {rating > 0 && (
                    <p 
                      className="text-sm font-medium text-yellow-600"
                    >
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"} 
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </p>
                  )}
                  {rating === 0 && (
                    <p className="text-xs text-pink-500">Select a rating</p>
                  )}
                </div>
              </div>

              {/* Review Text Section */}
              <div>
                <label
                  className="block text-sm font-semibold text-richblack-700 mb-2"
                  htmlFor="courseExperience"
                >
                  Your review <span className="text-pink-400">*</span>
                </label>
                <textarea
                  id="courseExperience"
                  placeholder="Share your thoughts about the course..."
                  {...register("courseExperience", { 
                    required: "Please share your experience"
                  })}
                  className="w-full h-24 p-3 border-2 border-pure-greys-200 rounded-xl focus:border-blue-400 focus:outline-none transition-all duration-300 resize-none text-sm text-richblack-800 placeholder-richblack-400"
                />
                {errors.courseExperience && (
                  <span 
                    className="text-xs text-pink-500 flex items-center gap-1 mt-1"
                  >
                    <span>⚠️</span>
                    {errors.courseExperience.message}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setReviewModal(false)}
                  className="px-4 py-2 text-sm text-richblack-600 bg-pure-greys-100 hover:bg-pure-greys-200 rounded-lg font-medium transition-all duration-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-caribbeangreen-400 hover:from-blue-600 hover:to-caribbeangreen-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiStar className="text-sm" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
