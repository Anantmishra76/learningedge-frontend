// Icons
import { Link } from "react-router-dom"

import Img from './../../common/Img';



function Course_Card({ course }) {
  return (
    <div className='hover:scale-[1.02] transition-all duration-300 ease-out transform will-change-transform'>
      <Link to={`/courses/${course._id}`}>
        <div className="rounded-xl border border-richblack-100 bg-white p-3 shadow-sm overflow-hidden">
          <div className="rounded-lg overflow-hidden aspect-video">
            <Img
              src={course?.thumbnail}
              alt="course thumnail"
              className="w-full h-full rounded-xl object-cover transition-transform duration-300 ease-out"
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl font-semibold text-slate-900">{course?.courseName}</p>
            <p className="text-sm text-slate-600">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
        
            <p className="text-xl font-semibold text-slate-900">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card

