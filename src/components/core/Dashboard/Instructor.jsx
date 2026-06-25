import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import Img from './../../common/Img'

// Icons
import { FaBook, FaUsers, FaRupeeSign, FaPlus, FaChartLine, FaEye } from "react-icons/fa"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  // get Instructor Data
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

  // skeleton loading
  const skItem = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-5 w-full flex flex-col justify-between rounded-xl"
      >
        <div className="flex flex-col lg:flex-row border p-3 sm:p-4 border-richblack-600 gap-4 lg:gap-0">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            <div className="mt-3 flex gap-x-3 sm:gap-x-5">
              <p className="w-[150px] sm:w-[200px] h-4 rounded-xl skeleton"></p>
              <p className="w-[80px] sm:w-[100px] h-4 rounded-xl skeleton"></p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-16 sm:h-24 rounded-xl mt-5 skeleton"></div>
              <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          <div className="lg:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>

        <div className="flex flex-col gap-y-6 mt-5">
          <div className="flex justify-between items-center px-3 sm:px-5">
            <p className="text-base sm:text-lg font-bold text-richblack-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline">View All</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-3 sm:px-0">
            <p className="h-[150px] sm:h-[201px] w-full rounded-xl skeleton"></p>
            <p className="h-[150px] sm:h-[201px] w-full rounded-xl skeleton"></p>
            <p className="h-[150px] sm:h-[201px] w-full rounded-xl skeleton"></p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="px-3 sm:px-6 lg:px-8 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-richblack-800 to-richblack-700 rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-richblack-5 leading-snug">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-base sm:text-lg text-richblack-200">
              Ready to inspire and educate? Let’s make learning amazing today.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
           
          </motion.div>
        </div>
      </motion.div>

      {loading ? (
        <div>{skItem()}</div>
      ) : courses.length > 0 ? (
        <div className="space-y-10">
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                  <p className="text-3xl sm:text-4xl font-bold mt-1">{courses.length}</p>
                </div>
                <FaBook className="text-3xl sm:text-4xl text-blue-200" />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Students</p>
                  <p className="text-3xl sm:text-4xl font-bold mt-1">{totalStudents || 0}</p>
                </div>
                <FaUsers className="text-3xl sm:text-4xl text-green-200" />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Income</p>
                  <p className="text-3xl sm:text-4xl font-bold mt-1">₹{totalAmount || 0}</p>
                </div>
                <FaRupeeSign className="text-3xl sm:text-4xl text-purple-200" />
              </div>
            </motion.div>
          </motion.div>

          {/* Chart + Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-richblack-800 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaChartLine className="text-blue-400 text-lg sm:text-xl" />
              <h2 className="text-lg sm:text-xl font-bold text-richblack-5">Analytics Overview</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Chart */}
              <div className="flex-1 min-w-[250px]">
                {totalAmount > 0 || totalStudents > 0 ? (
                  <InstructorChart courses={instructorData} />
                ) : (
                  <div className="rounded-xl bg-richblack-700 p-6 text-center">
                    <FaChartLine className="text-4xl text-richblack-400 mx-auto mb-4" />
                    <p className="text-base sm:text-lg font-semibold text-richblack-300">Enough Data is not Available to visualize </p>
                    <p className="text-sm text-richblack-400 mt-2">Start creating courses to see analytics</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="lg:w-80 space-y-4">
                <h3 className="text-lg font-semibold text-richblack-5 mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/dashboard/add-course"
                    className="flex items-center gap-3 p-4 bg-richblack-700 rounded-xl hover:bg-richblack-600 transition-all duration-200 group"
                  >
                    <FaPlus className="text-blue-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-richblack-5">Create Course</p>
                      <p className="text-sm text-richblack-400">Add a new course to your catalog</p>
                    </div>
                  </Link>
                  <Link
                    to="/dashboard/my-courses"
                    className="flex items-center gap-3 p-4 bg-richblack-700 rounded-xl hover:bg-richblack-600 transition-all duration-200 group"
                  >
                    <FaEye className="text-blue-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-richblack-5">View All Courses</p>
                      <p className="text-sm text-richblack-400">Manage your existing courses</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-richblack-800 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FaBook className="text-blue-400 text-lg sm:text-xl" />
                <h2 className="text-lg sm:text-xl font-bold text-richblack-5">Recent Courses</h2>
              </div>
              <Link
                to="/dashboard/my-courses"
                className="text-blue-400 hover:text-blue-300 font-medium text-xs sm:text-sm transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-richblack-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="relative">
                    <Img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <p className="text-xs font-medium text-white">₹{course.price}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-richblack-5 mb-2 line-clamp-2 text-sm sm:text-base">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-richblack-400">
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-xs" />
                        {course.studentsEnrolled.length} students
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-richblack-800 to-richblack-700 rounded-2xl p-10 sm:p-12 text-center shadow-xl"
        >
          <div className="max-w-md mx-auto">
            <FaBook className="text-5xl sm:text-6xl text-richblack-400 mx-auto mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-richblack-5 mb-4">
              Start Your Teaching Journey
            </h2>
            <p className="text-richblack-300 mb-8 text-sm sm:text-base">
              You haven’t created any courses yet. Share your knowledge and inspire learners around the world.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/add-course"
                className="inline-flex items-center gap-2 bg-blue-50 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <FaPlus className="text-sm sm:text-lg" />
                Create Your First Course
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
