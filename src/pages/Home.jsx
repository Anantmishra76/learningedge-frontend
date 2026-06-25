// Core React imports and state management
import React, { useEffect, useState } from "react";

// Custom components
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";

// Common components
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import Course_Slider from "../components/core/Catalog/Course_Slider";

// API
import { getAllCourses } from "../services/operations/courseDetailsAPI";

// Icons
import { FaBookOpen } from "react-icons/fa";

// Animation
import { motion } from "framer-motion";
import { fadeIn } from "./../components/common/motionFrameVarients";
import bg from "../assets/Images/122.jpg"

// Image
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Home = () => {
  const [allCourses, setAllCourses] = useState(null);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const result = await getAllCourses();
        setAllCourses(result);
      } catch (error) {
        console.log("Error fetching all courses:", error);
        setAllCourses([]);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <React.Fragment>
      <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute inset-0">
          <LazyLoadImage
            src={bg}
            alt="Background"
            className="h-full w-full object-cover"
            effect="opacity"
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] w-11/12 max-w-maxContent items-center justify-center px-4 py-20 text-white sm:px-6">
          <div className="flex max-w-4xl flex-col items-center text-center">
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Boost Your Career with
              <div className="mt-3">
                <HighlightText text={"Coding Expertise"} />
              </div>
            </motion.div>

            <motion.p
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-7 text-richblack-200 sm:text-lg sm:leading-8">
              Learn anytime, anywhere with interactive projects, real-world
              coding, and expert mentorship designed to accelerate your growth.
            </motion.p>

            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="min-w-[170px]">Get Started</div>
              </CTAButton>

              <CTAButton active={false} linkto={"/all-courses"}>
                <div className="min-w-[170px]">Explore Courses</div>
              </CTAButton>
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-richblack-100">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                Project-based learning
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                Mentor support
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                Flexible schedule
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Remaining code unchanged */}
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
          <div>
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="text-3xl lg:text-4xl font-semibold">
                  Ignite your
                  <HighlightText text={" programming journey "} />
                  our expert-led courses
                </div>
              }
              subheading={
                "Our courses are crafted and led by seasoned professionals..."
              }
              codeblock={`<<!DOCTYPE html>...`}
              codeColor={"text-white"}
              backgroundGradient={"code-block1-grad"}
            />
          </div>

          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                  No waiting,
                  <HighlightText text={" just coding"} />
                </div>
              }
              subheading={"Dive right in—our interactive platform..."}
              ctabtn1={{
                btnText: "Continue Lesson",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-white"}
              codeblock={`import React from "react";...`}
              backgroundGradient={"code-block2-grad"}
            />
          </div>

          <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
            <div className="mx-auto w-11/12 max-w-maxContent py-12">
              <motion.div
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                className="text-center mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Explore Our <HighlightText text={"Learning Paths"} />
                </h2>
              </motion.div>

              {allCourses ? (
                <Course_Slider Courses={allCourses} />
              ) : (
                <div className="text-white text-center py-8">
                  Loading courses...
                </div>
              )}
            </div>

            <div className="w-11/12 mx-auto flex justify-center py-8">
              <CTAButton active={true} linkto={"/all-courses"}>
                <div className="flex items-center gap-3">
                  <FaBookOpen />
                  Explore Full Catalog
                </div>
              </CTAButton>
            </div>

            <ExploreMore />
          </div>
        </div>
      </div>

      <div className="bg-richblack-5">
        <TimelineSection />
        <InstructorSection />
        <ReviewSlider />
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Home;
