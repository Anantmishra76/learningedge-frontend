import "react-lazy-load-image-component/src/effects/opacity.css";
import { useEffect, useState } from "react";

import Footer from "@/components/common/Footer";
import InstructorSection from "../components/InstructorSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Hero from "./Hero";
import FeaturedCourses from "../components/FeaturedCourses";
import CTA from "@/components/common/CTA";
import Review from "@/components/common/Review";

import PopularCourses from "../components/PopularCourses";
import NewCourses from "../components/NewCourses";
import TopRatedCourses from "../components/TopRatedCourses";
import CourseCategories from "../components/CourseCategory";
import { getAllCourses } from "@/features/courses/services/courseDetailsAPI";

const Home = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchHomeCourses = async () => {
      const data = await getAllCourses();
      setCourses(data || []);
    };

    fetchHomeCourses();
  }, []);

  return (
    <>
      <Hero />
      <FeaturedCourses courses={courses} />
      <PopularCourses courses={courses} />
      <NewCourses courses={courses} />
      <TopRatedCourses courses={courses} />
      <CourseCategories />
      <WhyChooseUs />
      <InstructorSection />
      <Review />
      <CTA />

      <Footer />
    </>
  );
};

export default Home;
