// Root reducer combining all Redux slices
import { combineReducers, configureStore } from "@reduxjs/toolkit"

import authReducer from "@/features/auth/slice/authSlice"
import cartReducer from "@/features/cart/slice/cartSlice"
import courseReducer from "@/features/courses/slice/courseSlice"
import profileReducer from "@/features/dashboard/slice/profileSlice"
import viewCourseReducer from "@/features/courses/slice/viewCourseSlice"

import sidebarSlice from "@/features/dashboard/slice/sidebarSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  course: courseReducer,
  cart: cartReducer,
  viewCourse: viewCourseReducer,
  sidebar: sidebarSlice
})

export default rootReducer

export const store = configureStore({
  reducer: rootReducer,
})

