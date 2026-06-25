import { useEffect } from "react";
import RenderSteps from "./RenderSteps"



export default function AddCourse() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex h-full w-full gap-x-6 justify-center">

      {/* Left Section - Title Fixed, Form Scrollable */}
      <div className="flex flex-col h-full min-w-0 w-full max-w-[700px]">
        <h1 className="mb-6 text-3xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left flex-shrink-0">
          Add Course
        </h1>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-4 scrollbar-hide">
          <RenderSteps />
        </div>
      </div>

      {/* Course Upload Tips - Fixed Sidebar */}
      <div className="hidden xl:block w-[320px] flex-shrink-0 h-fit max-h-[calc(100%-2rem)] overflow-y-auto rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>

        <ul className="ml-5 list-item list-disc space-y-2 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important updates to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  )
}