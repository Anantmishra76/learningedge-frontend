import React, { useEffect, useState } from 'react'

import Course_Card from '../components/core/Catalog/Course_Card'
import Footer from '../components/common/Footer'
import Loading from '../components/common/Loading'

import { getAllCourses } from '../services/operations/courseDetailsAPI'

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true)
      try {
        const courses = await getAllCourses()
        setAllCourses(courses || [])
      } catch (error) {
        console.error('Error fetching all courses:', error)
        setAllCourses([])
      }
      setLoading(false)
    }

    fetchAllCourses()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Header Section */}
      <div className="bg-richblack-800 py-8 sm:py-12 md:py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
            All Courses
          </h1>
          <p className="text-richblack-300 text-center text-sm sm:text-base lg:text-lg">
            Explore our complete catalog of courses and find the perfect learning path for you
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="mx-auto w-11/12 max-w-maxContent py-8 sm:py-12">
        {allCourses.length === 0 ? (
          <div className="text-center text-white py-12 sm:py-20">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">No Courses Available</h2>
            <p className="text-richblack-300 text-sm sm:text-base">
              We're working on adding more courses. Please check back later!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Available Courses ({allCourses.length})
              </h2>
              <p className="text-richblack-300 text-sm sm:text-base">
                Choose from our diverse range of courses
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {allCourses.map((course, index) => (
                <Course_Card
                  key={course._id || index}
                  course={course}
                  Height="h-[250px]"
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default AllCourses
