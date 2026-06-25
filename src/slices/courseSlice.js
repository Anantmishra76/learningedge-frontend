/**
 * Course slice for managing course creation and editing state
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    /**
     * Sets the current step in course creation process
     * @param {Object} state - Current state
     * @param {Object} action - Action containing step number
     */
    setStep: (state, action) => {
      state.step = action.payload
    },
    /**
     * Sets the course data
     * @param {Object} state - Current state
     * @param {Object} action - Action containing course data
     */
    setCourse: (state, action) => {
      state.course = action.payload
    },
    /**
     * Sets whether the course is being edited
     * @param {Object} state - Current state
     * @param {Object} action - Action containing edit flag
     */
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    /**
     * Sets the payment loading state
     * @param {Object} state - Current state
     * @param {Object} action - Action containing loading boolean
     */
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    /**
     * Resets the course state to initial values
     * @param {Object} state - Current state
     */
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer