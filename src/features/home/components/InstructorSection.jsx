import React from "react";
import { useNavigate } from "react-router-dom";
import Instructor from "@/assets/Images/Instructor-optimized.jpeg";

const InstructorSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding">
      <div className="section-container flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
            <div className="relative w-[min(100%,400px)] border-b-2 border-l-2 border-brand-500/50 p-3">
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
              Share what you know with learners. Create engaging courses, support student progress, and grow your teaching
            career with powerful tools designed for educators.
          </p>

          <button
            type="button"
            onClick={() => navigate("/signup?role=instructor")}
            className="mt-8 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
            Start teaching today
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
