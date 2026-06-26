import { Link } from "react-router-dom";
import Img from "./../../common/Img";

function Course_Card({ course }) {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="group block rounded-xl border border-richblack-700 bg-richblack-800 overflow-hidden hover:border-richblack-500 hover:-translate-y-0.5 transition-all duration-150">
      <div className="aspect-video overflow-hidden bg-richblack-700">
        <Img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2">
        <p className="text-sm font-medium text-richblack-5 leading-snug line-clamp-2">
          {course?.courseName}
        </p>

        <p className="text-xs text-richblack-300 flex items-center gap-1">
          {/* ponytail: swap for your icon component if available */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>

        <p className="text-sm font-semibold text-yellow-50">
          ₹ {course?.price}
        </p>
      </div>
    </Link>
  );
}

export default Course_Card;
