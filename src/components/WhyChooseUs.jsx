import React from "react";
import { BarChart3, ShieldCheck, Target, Workflow } from "lucide-react";
import img from "../assets/Images/whyus.jpg";

const features = [
  {
    icon: Target,
    title: "Strategy-First Development",
    desc: "We start with your business goals, users, and workflows so every website, app, or system solves a real problem.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Workflow,
    title: "Systems Built Around Your Operations",
    desc: "From ERP and HRMS to dashboards and automation, we create connected tools that reduce manual work and improve visibility.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure, Scalable Architecture",
    desc: "Our solutions are built for performance, reliability, and long-term maintainability as your business grows.",
    color: "bg-red-100 text-red-500",
  },
  {
    icon: BarChart3,
    title: "Focused on Business Outcomes",
    desc: "We align design, development, SEO, and automation around better leads, smoother operations, and measurable growth.",
    color: "bg-green-100 text-green-600",
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

          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-500 sm:w-20"></div>
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

                    <p className="text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl border-4 border-sky-500 bg-white p-2 shadow-xl sm:border-[6px] sm:p-3">
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
