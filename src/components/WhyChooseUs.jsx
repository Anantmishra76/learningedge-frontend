import React from "react";
import { BarChart3, ShieldCheck, Target, Workflow } from "lucide-react";
import img from "../assets/Images/whyus.jpg";

const features = [
  {
    icon: Target,
    title: "Learn at Your Own Pace",
    desc: "Access flexible courses anytime, anywhere, and build skills with lessons designed for real understanding.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Workflow,
    title: "Practical Course Structure",
    desc: "Follow organized modules, hands-on projects, quizzes, and resources that make every topic easier to master.",
    color: "bg-brand-100 text-brand-600",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Learning Environment",
    desc: "Study on a secure and reliable platform built to support smooth video lessons, progress tracking, and assessments.",
    color: "bg-pink-100 text-pink-500",
  },
  {
    icon: BarChart3,
    title: "Track Your Growth",
    desc: "Monitor your progress, complete milestones, and stay motivated as you move closer to your learning goals.",
    color: "bg-caribbeangreen-100 text-caribbeangreen-500",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl">
            Why Choose Us?
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent-500 sm:w-20"></div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-4 sm:space-y-5">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-lg border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:gap-5 sm:p-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl ${item.color}`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-800 sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl border-4 border-brand-500 bg-white p-2 shadow-xl sm:border-[6px] sm:p-3">
              <img
                src={img}
                alt="Why Choose Us"
                className="h-72 w-full rounded-xl object-cover sm:h-96 sm:rounded-3xl lg:h-136"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
