import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { markLectureAsComplete } from "@/features/courses/services/courseDetailsAPI"
import { updateCompletedLectures } from "@/features/courses/slice/viewCourseSlice"
import { setCourseViewSidebar } from "@/features/dashboard/slice/sidebarSlice"

import IconBtn from "@/components/common/IconBtn"

import { HiMenuAlt1, HiChevronLeft, HiChevronRight, HiRefresh, HiCheck } from 'react-icons/hi'


const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()

  const navigate = useNavigate()
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)
  const { courseViewSidebar } = useSelector((state) => state.sidebar)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      
      if (!courseSectionData.length) {
        return
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        if (filteredVideoData) setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseId, courseEntireData.thumbnail, courseSectionData, navigate, sectionId, subSectionId])

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {

    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)


    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {

    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  // handle Lecture Completion
  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  // Test video URL accessibility
  const testVideoUrl = async (url) => {
    if (!url) return false;
    
    try {
      // For external URLs (YouTube, Vimeo, etc.), just check if URL is valid
      if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')) {
        return true;
      }
      
      // For local files, try to fetch the video
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error("Video URL test failed:", error);
      return false;
    }
  };

  useEffect(() => {
    if (videoData?.videoUrl) {
      const finalUrl = videoData.videoUrl.startsWith('/') ? `http://localhost:5000${videoData.videoUrl}` : videoData.videoUrl;
      testVideoUrl(finalUrl);
    }
  }, [videoData]);

  // Hide video content on mobile when sidebar is open
  if (courseViewSidebar && window.innerWidth <= 640) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 text-slate-900 max-w-4xl mx-auto px-4 py-6">

      {/* Mobile sidebar toggle */}
      <div className="sm:hidden text-slate-700 absolute left-4 top-4 z-10 cursor-pointer bg-white p-2 rounded-full shadow-lg border border-slate-200" onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}>
        {!courseViewSidebar && <HiMenuAlt1 size={24} />}
      </div>

      {!videoData ? (
        <div className="relative">
          <img
            src={previewSource}
            alt="Course Preview"
            className="h-full w-full rounded-xl object-cover shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
        </div>
      ) : !videoData?.videoUrl ? (
        <div className="flex items-center justify-center h-64 bg-white border border-slate-200 rounded-xl">
          <div className="text-center">
            <p className="text-slate-900 text-lg mb-4">Video URL not available</p>
            <p className="text-slate-600 text-sm">Video Data: {JSON.stringify(videoData, null, 2)}</p>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <video
            ref={playerRef}
            src={videoData?.videoUrl?.startsWith('/') ? `http://localhost:5000${videoData.videoUrl}` : videoData?.videoUrl}
            controls
            style={{ width: '100%', height: '400px', borderRadius: '0.75rem' }}
            crossOrigin="anonymous"
            onEnded={() => setVideoEnded(true)}
            onError={(error) => {
              console.error("Video player error:", error)
            }}
            onLoadStart={() => {
              setVideoLoading(true)
            }}
            onLoadedData={() => {
              setVideoLoading(false)
            }}
            onPlay={() => {
              setVideoLoading(false)
            }}
          />

          {/* Video Loading Overlay */}
          {videoLoading && (
            <div className="absolute inset-0 z-[50] bg-black/50 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-sm">Loading video...</p>
              </div>
            </div>
          )}

          {/* Video End Overlay */}
          {videoEnded && (
            <div className="absolute inset-0 z-[100] bg-gradient-to-t from-black/90 via-black/70 to-black/50 flex flex-col items-center justify-center p-6 rounded-xl">
              <div className="text-center space-y-6 max-w-md">
                <h3 className="text-2xl font-bold text-white mb-4">Video Completed!</h3>

                <div className="flex flex-wrap justify-center gap-4">
                  <IconBtn
                    onclick={() => {
                      if (playerRef?.current) {
                        playerRef.current.currentTime = 0
                        setVideoEnded(false)
                      }
                    }}
                    text="Rewatch"
                    customClasses="bg-richblack-700 hover:bg-richblack-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-richblack-800 disabled:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiRefresh size={20} />
                  </IconBtn>

                  <IconBtn
                    disabled={loading || completedLectures.includes(subSectionId)}
                    onclick={() => handleLectureCompletion()}
                    text={completedLectures.includes(subSectionId) ? "Completed" : (!loading ? "Mark As Completed" : "Loading...")}
                    customClasses="bg-richblack-700 hover:bg-richblack-600 text-white disabled:bg-richblack-800 disabled:text-gray-300 font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {completedLectures.includes(subSectionId) ? (
                      <HiCheck size={20} />
                    ) : !loading ? (
                      <HiCheck size={20} />
                    ) : null}
                  </IconBtn>

                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="bg-richblack-700 hover:bg-richblack-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-richblack-800 disabled:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <HiChevronLeft size={20} />
                      Previous
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="bg-richblack-700 hover:bg-richblack-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-richblack-800 disabled:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next
                      <HiChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video Information */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          {videoData?.title}
        </h1>
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
          <p className="text-slate-600 leading-relaxed text-base">
            {videoData?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails

