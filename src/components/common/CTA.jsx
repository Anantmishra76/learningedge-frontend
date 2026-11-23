import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="section-padding">
        <div className="section-container flex flex-col items-center gap-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-brand-700">
            <FaUserGraduate />
          </div>
          <h2 className="text-3xl font-medium leading-tight text-slate-900 lg:text-4xl">
            Start Building Your Future
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Join LearningEdge, choose your first course, and begin learning with
            practical lessons today.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
            Explore Our Courses
          </button>
        </div>
      </section>
    </>
  );
};

export default CTA;
