import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <h1 className="mb-8 text-4xl font-bold text-richblack-5 font-boogaloo bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Your Cart
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg font-medium text-richblack-300">
          {totalItems} {totalItems === 1 ? 'Course' : 'Courses'} in Cart
        </p>
        {totalItems > 0 && (
          <p className="text-sm text-richblack-400">
            Total: <span className="text-yellow-400 font-semibold">₹{total}</span>
          </p>
        )}
      </div>
      {total > 0 ? (
        <div className="cart-layout flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <RenderCartCourses />
          </div>
          <div className="cart-summary lg:w-96">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 bg-richblack-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-16 h-16 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-richblack-200 mb-2">Your cart is empty</h2>
          <p className="text-richblack-400 text-center mb-6">Add some courses to get started on your learning journey!</p>
          <button
            onClick={() => navigate('/all-courses')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  )
}