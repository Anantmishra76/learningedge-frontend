import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import IconBtn from './../../common/IconBtn';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"

import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"

import { IoMdClose } from 'react-icons/io'
import { HiMenuAlt1 } from 'react-icons/hi'
import { MdOutlineSchool } from "react-icons/md"



export default function VideoDetailsSidebar({ setReviewModal }) {

  const [activeStatus, setActiveStatus] = useState([]) // store array of open section ids
  const [videoBarActive, setVideoBarActive] = useState("") // store curr SubSection Id
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)


  const { courseViewSidebar } = useSelector(state => state.sidebar)


  // set which section - subSection is selected 
  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      const currentSectionId = courseSectionData?.[currentSectionIndx]?._id
      
      // Ensure the current section is always open
      setActiveStatus((prev) =>
        currentSectionId && !prev.includes(currentSectionId) ? [...prev, currentSectionId] : prev
      )
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, sectionId, subSectionId])




  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-r-richblack-600 bg-richblack-800 shadow-xl">
        {/* Header Section */}
        <div className="flex flex-col border-b border-richblack-600 bg-richblack-800">
          {/* Top Bar with Controls */}
          <div className="flex items-center justify-between px-5 py-3">
            {/* Mobile sidebar toggle */}
            <div
              className="sm:hidden text-white cursor-pointer p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 transition-all duration-200 hover:scale-105"
              onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
            >
              {courseViewSidebar ? <IoMdClose size={20} /> : <HiMenuAlt1 size={20} />}
            </div>

            {/* Back to dashboard button */}
            <button
              onClick={() => { navigate(`/dashboard/enrolled-courses`) }}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-richblack-100 text-slate-700 hover:bg-richblack-200 hover:scale-110 transition-all duration-200 shadow-lg"
              title="Back to Dashboard"
            >
              <IoIosArrowBack size={20} />
            </button>
          </div>

                        {/* Course Info Section */}
          <div className="px-5 pb-4">
            <div className="flex flex-col space-y-4">
              {/* Course Title */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <MdOutlineSchool className="text-blue-400 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 leading-tight">
                  {courseEntireData?.courseName}
                </h2>
              </div>
            

              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Progress</span>
                  <span className="text-blue-400 font-semibold">
                    {completedLectures?.length} / {totalNoOfLectures} ({totalNoOfLectures > 0 ? Math.round((completedLectures?.length / totalNoOfLectures) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-richblack-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-300 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${totalNoOfLectures > 0 ? (completedLectures?.length / totalNoOfLectures) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-richblack-600 scrollbar-track-richblack-800">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-1 text-sm text-slate-900"
              key={index}
            >
              {/* Section Header */}
              <div 
                className="flex justify-between bg-richblack-700 hover:bg-richblack-600 px-5 py-3 transition-colors duration-200 border-l-4 border-transparent hover:border-blue-400 cursor-pointer"
                onClick={() => {
                  // Toggle section: if already active, remove it; if not active, add it
                  setActiveStatus(prev => {
                    if (prev.includes(section?._id)) {
                      return prev.filter(id => id !== section?._id)
                    } else {
                      return [...prev, section?._id]
                    }
                  })
                }}
              >
                <div className="w-[70%] font-semibold text-slate-700">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-500 bg-richblack-800 px-3 py-1 rounded-full flex items-center justify-center whitespace-nowrap">
                    {section?.subSection.length} video{section?.subSection.length !== 1 ? 's' : ''}
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${activeStatus.includes(section?._id) ? "rotate-0" : "rotate-180"
                      }`}
                  >
                    <BsChevronDown className="text-slate-500" />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus.includes(section?._id) && (
                <div className="bg-richblack-800/50 border-l border-richblack-600 transition-all duration-300 ease-in-out">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`flex items-center gap-3 px-5 py-2 cursor-pointer transition-all duration-200 ${videoBarActive === topic._id
                          ? "bg-blue-200 font-semibold text-slate-800 border-r-4 border-blue-400"
                          : "hover:bg-richblack-700 text-slate-600 hover:text-white"
                        }`}
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to parent section
                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                        setVideoBarActive(topic._id)
                        if (courseViewSidebar && window.innerWidth <= 640) {
                          dispatch(setCourseViewSidebar(false))
                        }
                      }}
                    >
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => { }}
                          className="peer sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 border-white transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center ${
                          completedLectures.includes(topic?._id)
                            ? 'bg-caribbeangreen-200 shadow-lg shadow-caribbeangreen-200/30'
                            : videoBarActive === topic._id
                            ? 'bg-blue-400/10 shadow-md shadow-blue-400/20'
                            : 'bg-richblack-700 hover:bg-richblack-600'
                        }`}>
                          {completedLectures.includes(topic?._id) && (
                            <svg 
                              className="w-3 h-3 text-caribbeangreen-200" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="flex-1 text-sm leading-tight">{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Review Section */}
        <div className="mt-auto p-4 border-t border-richblack-600 bg-richblack-800">
          <IconBtn
            text="Add Review"
            onclick={() => setReviewModal(true)}
            customClasses="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-center"
          />
        </div>
      </div>
    </>
  )
}

