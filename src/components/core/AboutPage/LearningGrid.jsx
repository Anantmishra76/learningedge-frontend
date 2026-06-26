import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import { motion } from "framer-motion";
import { fadeIn } from "../../../components/common/motionFrameVarients";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "LearningEdge partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "LearningEdge partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "LearningEdge partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "LearningEdge partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "LearningEdge partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {

  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <motion.div
            key={i}
            variants={fadeIn('up', 0.2 + i * 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                  ? "bg-richblack-800 h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {card.heading}
                  </span>
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-slate-600 font-medium">
                  {card.description}
                </p>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-slate-900 text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">{card.heading}</h1>

                <p className="text-slate-600 font-medium">
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

