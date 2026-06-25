import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints



// ================ update User Profile Image  ================
/**
 * Updates the user's profile image.
 * @param {string} token - Authorization token
 * @param {FormData} formData - Form data containing the image
 * @returns {function} Thunk function for dispatching
 */
export function updateUserProfileImage(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile picture updated successfully.")
      dispatch(setUser(response.data.data));

      // below line is must - if not code - then as we refresh the page after changing profile image then old profile image will show 
      // as we only changes in user(store) not in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Unable to update profile picture. Please try again.")
    }
    toast.dismiss(toastId)
  }
}

// ================ update Profile  ================
/**
 * Updates the user's profile information.
 * @param {string} token - Authorization token
 * @param {Object} formData - Profile data
 * @returns {function} Thunk function for dispatching
 */
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data?.updatedUserDetails?.image
        ? response.data.updatedUserDetails?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

      dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }))

      localStorage.setItem("user", JSON.stringify({ ...response.data.updatedUserDetails, image: userImage }));
      toast.success("Profile updated successfully.")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Unable to update profile. Please try again.")
    }
    toast.dismiss(toastId)
  }
}


// ================ change Password  ================
/**
 * Changes the user's password.
 * @param {string} token - Authorization token
 * @param {Object} formData - Password change data
 */
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password changed successfully.")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error("Password change failed: " + (error.response.data.message || "Please try again."))
  }
  toast.dismiss(toastId)
}

// ================ delete Profile ================
/**
 * Deletes the user's profile.
 * @param {string} token - Authorization token
 * @param {function} navigate - Navigation function
 * @returns {function} Thunk function for dispatching
 */
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile deleted successfully.")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Unable to delete profile. Please try again or contact support.")
    }
    toast.dismiss(toastId)
  }
}