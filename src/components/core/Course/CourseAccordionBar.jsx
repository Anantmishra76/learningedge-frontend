import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

import { IoMdArrowDropdown } from "react-icons/io"


export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const active = isActive?.includes(course._id)



  return (
    <div className='overflow-hidden border border-solid border-richblack-600 bg-richblack-700 hover:bg-richblack-600 text-slate-900 last:mb-0 duration-200 '>
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]`}
          onClick={() => { handleActive(course._id) }}
        >
          <div className="flex items-center gap-2">
            <i
              className={isActive.includes(course._id) ? "rotate-180 duration-300" : "rotate-0 duration-300"}
            >
              <IoMdArrowDropdown size={25} />
            </i>
            <p>{course?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-yellow-25">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`grid overflow-hidden bg-richblack-900 transition-all duration-[0.35s] ease-[ease] ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="text-textHead flex min-h-0 flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

