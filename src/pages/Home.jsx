import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaChartLine,
  FaLaptopCode,
  FaRoute,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import CTAButton from "../components/core/HomePage/Button";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HighlightText from "../components/core/HomePage/HighlightText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import { fadeIn } from "../components/common/motionFrameVarients";
import { getAllCourses } from "../services/operations/courseDetailsAPI";
import bg from "../assets/Images/122.jpg";

import Hero from "./Hero";

const whyChooseUs = [
  {
    icon: FaLaptopCode,
    title: "Project-based courses",
    description:
      "Practice with real coding tasks so every lesson turns into a usable skill.",
  },
  {
    icon: FaUsers,
    title: "Expert instructors",
    description:
      "Learn from mentors who explain concepts clearly and focus on practical work.",
  },
  {
    icon: FaChartLine,
    title: "Progress tracking",
    description:
      "Follow your completed lectures and continue exactly where you left off.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose a path",
    description:
      "Browse courses or learning tracks that match your current skill level.",
  },
  {
    step: "02",
    title: "Learn by building",
    description:
      "Watch lessons, write code, complete projects, and apply each concept.",
  },
  {
    step: "03",
    title: "Track your growth",
    description:
      "Complete lectures, revisit content, and keep improving your portfolio.",
  },
];

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

   <>
      <Hero />

      <section className="bg-white py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl">
              Featured <HighlightText text="Courses" />
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Start with practical courses designed to help you build real
              coding confidence.
            </p>
          </motion.div>

          {allCourses ? (
            <Course_Slider Courses={allCourses} />
          ) : (
            <div className="py-8 text-center text-slate-700">
              Loading courses...
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <CTAButton active={true} linkto="/all-courses">
              <div className="flex items-center gap-3">
                <FaBookOpen />
                Explore Full Catalog
              </div>
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="bg-richblack-5 py-12">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl">
              Learning <HighlightText text="Paths" />
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Pick a focused track and follow a clearer route from beginner
              concepts to job-ready projects.
            </p>
          </div>
          <ExploreMore />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl">
              Why Choose <HighlightText text="LearningEdge" />
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whyChooseUs.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-lg border border-richblack-100 bg-white p-6 text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-xl">
                  <Icon />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-richblack-5 py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl">
              How It <HighlightText text="Works" />
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
              A simple learning flow that keeps your attention on progress.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-richblack-100 bg-white p-6 text-slate-900 shadow-sm">
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-4xl font-bold text-blue-200">
                    {item.step}
                  </span>
                  <FaRoute className="text-2xl text-yellow-50" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-richblack-5 px-4 py-16">
        <InstructorSection />
        <ReviewSlider />
      </div>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-6 text-center">
          <FaUserGraduate className="text-5xl text-yellow-50" />
          <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl">
            Start Building Your <HighlightText text="Coding Future" />
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Join LearningEdge, choose your first course, and begin learning with
            practical lessons today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <CTAButton active={true} linkto="/signup">
              Create Account
            </CTAButton>
            <CTAButton active={false} linkto="/all-courses">
              Browse Courses
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
  </>
  );
};

export default Home;
