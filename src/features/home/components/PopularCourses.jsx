import Course_Slider from "@/features/courses/components/Course_Slider";

const PopularCourses = ({ courses }) => {
  const popularCourses = [...(courses || [])]
    .sort(
      (a, b) =>
        (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0),
    )
    .slice(0, 10);

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <h2 className="text-3xl font-semibold text-slate-900">
          Popular Courses
        </h2>

        <Course_Slider Courses={popularCourses} />
      </div>
    </section>
  );
};

export default PopularCourses;
