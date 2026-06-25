import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API, GET_PAYMENT_HISTORY_API } = profileEndpoints


// ================ get User Details  ================
/**
 * Fetches user details.
 * @param {string} token - Authorization token
 * @param {function} navigate - Navigation function
 * @returns {function} Thunk function for dispatching
 */
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, { Authorization: `Bearer ${token}`, })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Unable to load user details. Please refresh the page.")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// ================ get User Enrolled Courses  ================
/**
 * Fetches courses enrolled by the user.
 * @param {string} token - Authorization token
 * @returns {Array} List of enrolled courses
 */
export async function getUserEnrolledCourses(token) {
  let result = []
  try {
    const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, { token }, { Authorization: `Bearer ${token}`, })

    console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Unable to load enrolled courses. Please try again later.")
  }
  return result
}

// ================ get Instructor Data  ================
/**
 * Fetches data for the instructor.
 * @param {string} token - Authorization token
 * @returns {Array} Instructor's courses
 */
export async function getInstructorData(token) {
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Unable to load instructor data. Please try again later.")
  }
  return result
}

// ================ get Payment History  ================
/**
 * Fetches user's payment history.
 * @param {string} token - Authorization token
 * @returns {Array} List of payment records
 */
export async function getPaymentHistory(token) {
  let result = []
  try {
    const response = await apiConnector("GET", GET_PAYMENT_HISTORY_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_PAYMENT_HISTORY_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_PAYMENT_HISTORY_API API ERROR............", error)
    toast.error("Unable to load payment history. Please try again later.")
  }
  return result
}
