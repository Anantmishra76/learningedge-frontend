import React from "react";
import HighlightText from "@/features/about/components/HighlightText";
import { motion } from "framer-motion";
import { fadeIn } from "@/components/common/motionFrameVarients";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Explore courses across technology, business, and creative fields. Study lessons and course materials at a pace that works for you.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
      description:
      "Courses are organized into sections and lessons, with resources to support your study.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
      description:
      "Learn through video lessons and course materials on a schedule that works for you.",
  },
  {
    order: 3,
      heading: "Course progress",
    description:
      "Keep track of your progress as you complete course sections and lessons.",
  },
  {
    order: 4,
      heading: "Course resources",
    description:
      "Use the materials included with a course as you work through each topic.",
  },
  {
    order: 5,
      heading: "Learn at your pace",
    description:
      "Return to your enrolled courses and continue learning on your schedule.",
  },
];

const LearningGrid = () => {

  return (
    <div className="mx-auto mb-12 grid w-full max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
      {LearningGridArray.map((card, i) => {
        return (
          <motion.div
            key={i}
            variants={fadeIn('up', 0.2 + i * 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className={`${i === 0 ? "lg:col-span-2 bg-white" : card.order % 2 === 1 ? "bg-white" : "bg-slate-50"} ${card.order === 3 ? "lg:col-start-2" : ""} min-h-[216px]`}
          >
            {card.order < 0 ? (
              <div className="flex h-full flex-col justify-center gap-3 p-6 sm:p-8">
                <div className="max-w-[18ch] text-3xl font-medium leading-tight text-slate-900 sm:text-4xl">
                  <span>
                    {card.heading}
                  </span>
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  {card.description}
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-6 p-6">
                <h3 className="text-base font-medium text-slate-900">{card.heading}</h3>

                <p className="text-sm leading-6 text-slate-600">
                  {card.description}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default LearningGrid;

