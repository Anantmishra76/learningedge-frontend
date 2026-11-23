import { Link } from "react-router-dom";
import Img from "@/components/common/Img";

function Course_Card({ course }) {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="group block w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-[border-color,box-shadow] duration-150 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
      <div className="aspect-video w-full min-w-0 max-w-full overflow-hidden bg-richblack-700">
        <Img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="flex min-h-32 w-full min-w-0 max-w-full flex-col gap-2 p-4 sm:p-5">
        <p className="line-clamp-2 text-base font-medium leading-snug text-slate-900">
          {course?.courseName}
        </p>

        <p className="flex items-center gap-2 text-sm text-slate-600">
          {/* ponytail: swap for your icon component if available */}
          <svg
            width="16"
            height="16"
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

        <p className="mt-auto pt-1 text-sm font-medium tabular-nums text-slate-900">
          ₹ {course?.price}
        </p>
      </div>
    </Link>
  );
}

export default Course_Card;
