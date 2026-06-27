import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiCreditCard, FiShield } from "react-icons/fi"

import IconBtn from "../../../common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id)
    const { buyCourse } = await import("../../../../services/operations/studentFeaturesAPI")
    await buyCourse(token, courses, user, navigate, dispatch)
  }

  const subtotal = cart.reduce((acc, course) => acc + course.price, 0)

  return (
    <div className="sticky top-6">
      <div className="bg-richblack-800/50 backdrop-blur-sm border border-richblack-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Subtotal ({cart.length} items)</span>
            <span className="text-slate-900 font-medium">₹{subtotal}</span>
          </div>
 
          <div className="border-t border-richblack-600 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-yellow-400">₹{total}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <IconBtn
            text="Proceed to Checkout"
            onclick={handleBuyCourse}
            customClasses="w-auto justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 border border-blue-500/20 mx-auto"
          />

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <FiShield className="w-4 h-4" />
            <span>Secure Payments </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <FiCreditCard className="w-4 h-4" />
            <span>We accept all major payment methods</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-richblack-900/50 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">What's included:</h3>
          <ul className="text-xs text-slate-500 space-y-1">
            <li>• Lifetime access to courses</li>
            <li>• Mobile and desktop access</li>
            <li>• 30-day money-back guarantee</li>
    
          </ul>
        </div>
      </div>
    </div>
  )
}

