/**
 * ViewCourse slice for managing course viewing state
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    /**
     * Sets the course section data
     * @param {Object} state - Current state
     * @param {Object} action - Action containing section data
     */
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    /**
     * Sets the entire course data
     * @param {Object} state - Current state
     * @param {Object} action - Action containing course data
     */
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    /**
     * Sets the total number of lectures
     * @param {Object} state - Current state
     * @param {Object} action - Action containing total lectures count
     */
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    /**
     * Sets the completed lectures array
     * @param {Object} state - Current state
     * @param {Object} action - Action containing completed lectures
     */
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    /**
     * Updates the completed lectures by adding a new lecture
     * @param {Object} state - Current state
     * @param {Object} action - Action containing lecture to add
     */
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer