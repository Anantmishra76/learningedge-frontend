import { motion } from "framer-motion";
import { fadeIn } from "@/components/common/motionFrameVarients";
import Course_Slider from "@/features/courses/components/Course_Slider";

const FeaturedCourses = ({ courses }) => {
  return (
    <>
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
              Featured Courses
            </h2>
          </motion.div>

          {courses ? (
            <Course_Slider Courses={courses} />
          ) : (
            <div className="py-8 text-center text-slate-700">
              Loading courses...
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedCourses;
