import React from "react";
import { BarChart3, ShieldCheck, Target, Workflow } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Learn at Your Own Pace",
    desc: "Access flexible courses anytime, anywhere, and build skills with lessons designed for real understanding.",
    color: "bg-slate-100 text-brand-700",
  },
  {
    icon: Workflow,
    title: "Practical Course Structure",
    desc: "Follow organized modules, hands-on projects, quizzes, and resources that make every topic easier to master.",
    color: "bg-slate-100 text-brand-700",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Learning Environment",
    desc: "Study on a secure and reliable platform built to support smooth video lessons, progress tracking, and assessments.",
    color: "bg-slate-100 text-brand-700",
  },
  {
    icon: BarChart3,
    title: "Track Your Growth",
    desc: "Monitor your progress, complete milestones, and stay motivated as you move closer to your learning goals.",
    color: "bg-slate-100 text-brand-700",
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

          <div className="mx-auto mt-4 h-0.5 w-12 bg-brand-600"></div>
        </div>

        <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:gap-x-16">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex flex-col gap-4 border-b border-slate-200 py-5 sm:flex-row sm:gap-5 sm:py-6">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>

                <div>
                  <h3 className="mb-2 text-base font-medium leading-snug text-slate-900 sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-6">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
