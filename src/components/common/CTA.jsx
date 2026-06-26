import React from "react";
import { FaUserGraduate } from "react-icons/fa";

const CTA = () => {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container flex flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-3xl text-accent-500">
            <FaUserGraduate />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl">
            Start Building Your Future
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Join LearningEdge, choose your first course, and begin learning with
            practical lessons today.
          </p>

          <button className="mt-8 rounded-md bg-black px-7 py-3 text-base font-semibold text-white">
            Explore Our Courses
          </button>
        </div>
      </section>
    </>
  );
};

export default CTA;
