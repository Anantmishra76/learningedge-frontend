import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";
import { getAllCourses } from "../services/operations/courseDetailsAPI";
import Course_Slider from "../components/core/Catalog/Course_Slider";

const FeaturedCourses = () => {
  const [allCourses, setAllCourses] = useState(null);

  useEffect(() => {
    getAllCourses().then(setAllCourses);
  }, []);

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

          {allCourses ? (
            <Course_Slider Courses={allCourses} />
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
