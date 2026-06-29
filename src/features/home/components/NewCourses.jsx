import Course_Slider from "@/features/courses/components/Course_Slider";

const NewCourses = ({ courses }) => {
  const newCourses = [...(courses || [])]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 10);

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <h2 className="text-3xl font-semibold text-slate-900">
          Newly Added Courses
        </h2>

        <Course_Slider Courses={newCourses} />
      </div>
    </section>
  );
};

export default NewCourses;
