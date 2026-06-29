import React from "react";
import { useNavigate } from "react-router-dom";
import Instructor from "@/assets/images/Instructor-optimized.jpeg";

const InstructorSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding">
      <div className="section-container flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[340px] sm:w-[400px]">
            <img
              src={Instructor}
              alt="Instructor"
              className="relative z-10 w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="flex-1 max-w-xl text-center lg:text-left">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Become an instructor
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Share your knowledge with millions of learners around the world.
            Create engaging courses, inspire students, and grow your teaching
            career with powerful tools designed for educators.
          </p>

          <button
            type="button"
            onClick={() => navigate("/signup?role=instructor")}
            className="mt-8 rounded-md bg-black px-7 py-3 text-base font-semibold text-white transition hover:bg-slate-800">
            Start teaching today
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
