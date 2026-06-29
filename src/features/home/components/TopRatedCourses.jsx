import Course_Slider from "@/features/courses/components/Course_Slider"
import GetAvgRating from "@/utils/avgRating"

const TopRatedCourses = ({ courses }) => {
  const topRatedCourses = [...(courses || [])]
    .sort(
      (a, b) =>
        GetAvgRating(b.ratingAndReviews) - GetAvgRating(a.ratingAndReviews)
    )
    .slice(0, 10)

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <h2 className="text-3xl font-semibold text-slate-900">
          Top Rated Courses
        </h2>

        <Course_Slider Courses={topRatedCourses} />
      </div>
    </section>
  )
}

export default TopRatedCourses
