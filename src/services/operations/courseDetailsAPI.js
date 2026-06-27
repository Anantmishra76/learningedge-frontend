import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  CREATE_NEW_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_PAGE_DETAILS_API
} = courseEndpoints


// ================ createNewCategory ================
export const createNewCategory = async (name, description, token) => {
  const toastId = toast.loading("Loading...")

  try {
    await apiConnector("POST", CREATE_NEW_CATEGORY, { name, description }, {
      Authorization: `Bearer ${token}`,
    })
    toast.success("New category created successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
}


// ================ delete Category ================
export const deleteCategory = async (categoryId, token) => {
  const toastId = toast.loading("Loading...")

  try {
    await apiConnector("DELETE", DELETE_CATEGORY, { categoryId }, {
      Authorization: `Bearer ${token}`,
    })
    toast.success("Category deleted successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
}



// ================ get All Courses ================
/**
 * Fetches all courses.
 * @returns {Array} List of all courses
 */
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []

  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ fetch Course Details ================
/**
 * Fetches details of a specific course.
 * @param {string} courseId - ID of the course
 * @returns {Object} Course details
 */
export const fetchCourseDetails = async (courseId) => {
  let result = null;

  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId, })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    result = error.response.data
  }
  return result
}

// ================ fetch Course Categories ================
/**
 * Fetches all course categories.
 * @returns {Array} List of course categories
 */
export const fetchCourseCategories = async () => {
  let result = []

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  return result
}


// ================ get Category Page Details ================
/**
 * Fetches details for a category page.
 * @param {string} categoryId - ID of the category
 * @returns {Object} Category page details
 */
export const getCategoryPageDetails = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector("POST", GET_CATEGORY_PAGE_DETAILS_API, { 
      categoryId 
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Category Page Details")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ add Course Details ================
/**
 * Adds details for a new course.
 * @param {Object} data - Course data
 * @param {string} token - Authorization token
 * @returns {Object} Created course data
 */
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null;

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }

    result = response?.data?.data
    toast.success("Course details added successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ edit Course Details ================
/**
 * Edits details of an existing course.
 * @param {Object} data - Updated course data
 * @param {string} token - Authorization token
 * @returns {Object} Updated course data
 */
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }

    result = response?.data?.data
    toast.success("Course details updated successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ create Section ================
/**
 * Creates a new section in a course.
 * @param {Object} data - Section data
 * @param {string} token - Authorization token
 * @returns {Object} Updated course details
 */
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }

    result = response?.data?.updatedCourseDetails
    toast.success("Course section created successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ create SubSection ================
/**
 * Creates a new subsection (lecture) in a course.
 * @param {Object} data - Subsection data
 * @param {string} token - Authorization token
 * @returns {Object} Subsection data
 */
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }

    result = response?.data?.data
    toast.success("Lecture added successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ Update Section ================
/**
 * Updates an existing section in a course.
 * @param {Object} data - Updated section data
 * @param {string} token - Authorization token
 * @returns {Object} Updated section data
 */
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }

    result = response?.data?.data
    toast.success("Course section updated successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ Update SubSection ================
/**
 * Updates an existing subsection (lecture) in a course.
 * @param {Object} data - Updated subsection data
 * @param {string} token - Authorization token
 * @returns {Object} Updated subsection data
 */
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }

    result = response?.data?.data
    toast.success("Lecture updated successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ delete Section ================
/**
 * Deletes a section from a course.
 * @param {Object} data - Section data to delete
 * @param {string} token - Authorization token
 * @returns {Object} Updated course data
 */
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }

    result = response?.data?.data
    toast.success("Course section deleted successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}


// ================ delete SubSection ================
/**
 * Deletes a subsection (lecture) from a course.
 * @param {Object} data - Subsection data to delete
 * @param {string} token - Authorization token
 * @returns {Object} Updated course data
 */
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    result = response?.data?.data
    toast.success("Lecture deleted successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ================ fetch Instructor Courses ================
/**
 * Fetches courses created by the instructor.
 * @param {string} token - Authorization token
 * @returns {Array} List of instructor's courses
 */
export const fetchInstructorCourses = async (token) => {
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
  return result
}


// ================ delete Course ================
/**
 * Deletes a course.
 * @param {Object} data - Course data to delete
 * @param {string} token - Authorization token
 */
export const deleteCourse = async (data, token) => {
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course deleted successfully.")
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
  }
}


// ================ get Full Details Of Course ================
/**
 * Fetches full details of a course for authenticated users.
 * @param {string} courseId - ID of the course
 * @param {string} token - Authorization token
 * @returns {Object} Full course details
 */
export const getFullDetailsOfCourse = async (courseId, token) => {
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    result = error.response.data
  }
  return result
}


// ================ mark Lecture As Complete ================
/**
 * Marks a lecture as completed.
 * @param {Object} data - Lecture completion data
 * @param {string} token - Authorization token
 * @returns {boolean} Success status
 */
export const markLectureAsComplete = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture marked as completed.")
    result = true
  } catch (error) {
    toast.error("Something went wrong: " + error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}


// ================ create Course Rating  ================
/**
 * Creates a rating and review for a course.
 * @param {Object} data - Rating data including courseId, rating, review
 * @param {string} token - Authorization token
 * @returns {boolean} Success status
 */
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting your review...")
  let success = false
  
  try {
    // Validate inputs
    if (!token) {
      throw new Error("Authentication required. Please login again.")
    }
    
    if (!data.courseId) {
      throw new Error("Course ID is required")
    }
    
    if (!data.rating || data.rating === 0) {
      throw new Error("Rating is required")
    }

    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    
    
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Create Rating")
    }
    
    toast.success("Review submitted successfully.")
    success = true
    
  } catch (error) {
    success = false
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      toast.error("Your session has expired. Please login again.")
    } else if (error.response?.status === 403) {
      toast.error("You do not have permission to rate this course.")
    } else if (error.response?.status === 400) {
      toast.error("Invalid rating data. Please check your input.")
    } else {
      toast.error(error.message || "Failed to submit review. Please try again.")
    }
  }
  
  toast.dismiss(toastId)
  return success
}

