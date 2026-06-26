// ViewCourse Page Component - Main layout for course viewing
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

// Components
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"

// API functions
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"

// Redux actions
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
import { setCourseViewSidebar } from "../slices/sidebarSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  // Fetch and set course data on component mount
  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      if (!courseData?.courseDetails) {
        return
      }

      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))

      // Calculate total number of lectures
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
  }, [courseId, dispatch, token])

  // Handle responsive sidebar for small devices
  const { courseViewSidebar } = useSelector(state => state.sidebar)
  const [screenSize, setScreenSize] = useState(undefined)

  // Track screen size changes
  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleScreenSize)
    handleScreenSize()
    return () => window.removeEventListener('resize', handleScreenSize)
  }, [])

  // Toggle sidebar based on screen size
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setCourseViewSidebar(false))
    } else {
      dispatch(setCourseViewSidebar(true))
    }
  }, [dispatch, screenSize])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-slate-50">
        {/* Course sidebar */}
        {courseViewSidebar && (
          <div className="hidden sm:block">
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
          </div>
        )}

        {/* Mobile sidebar overlay */}
        {courseViewSidebar && (
          <div className="sm:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm" onClick={() => dispatch(setCourseViewSidebar(false))}>
            <div className="absolute left-0 top-0 h-full">
              <VideoDetailsSidebar setReviewModal={setReviewModal} />
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <div className="min-h-full">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Course review modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

