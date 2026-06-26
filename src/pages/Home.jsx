import "react-lazy-load-image-component/src/effects/opacity.css";

import Footer from "../components/common/Footer";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Hero from "./Hero";
import FeaturedCourses from "../components/FeaturedCourses";
import CTA from "../components/common/CTA";
import Review from "../components/common/Review";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <WhyChooseUs />
      <InstructorSection />
      <Review />
      <CTA />

      <Footer />
    </>
  );
};

export default Home;
