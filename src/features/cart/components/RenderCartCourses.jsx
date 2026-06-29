import { RiDeleteBin6Line } from "react-icons/ri"
import { Rating } from "@smastrom/react-rating"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "@/features/cart/slice/cartSlice"
import Img from '@/components/common/Img';

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="space-y-6">
      {cart.map((course) => (
        <div
          key={course._id}
          className="cart-item group bg-richblack-800/50 backdrop-blur-sm border border-richblack-700 rounded-xl p-6 hover:border-richblack-600 transition-all duration-300 hover:shadow-lg hover:shadow-richblack-900/20"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Course Thumbnail */}
            <div className="flex-shrink-0">
              <Img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-32 w-48 lg:h-36 lg:w-52 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
              />
            </div>

            {/* Course Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors duration-200">
                  {course?.courseName}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {course?.category?.name}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                  
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={4.8}
                      readOnly
                      items={5}
                    />
                  </div>
                  <span className="text-slate-500 text-sm">
                    ({course?.ratingAndReviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-2xl font-bold text-yellow-400">
                  ₹{course?.price}
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  className="cart-button cart-focus flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white border border-red-600 hover:border-red-700 rounded-lg transition-all duration-200 group/remove"
                >
                  <RiDeleteBin6Line className="group-hover/remove:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

