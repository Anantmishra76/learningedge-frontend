import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaTrophy } from "react-icons/fa";

const Stats = [
  { count: "5K", label: "Active Students", icon: FaUserGraduate },
  { count: "10+", label: "Mentors", icon: FaChalkboardTeacher },
  { count: "200+", label: "Courses", icon: FaBookOpen },
  { count: "50+", label: "Awards", icon: FaTrophy },
];

const StatsComponenet = () => {
  return (
    <div className="bg-richblack-700">
      {/* Stats */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {Stats.map((data, index) => {
            const IconComponent = data.icon;
            return (
              <div className="flex flex-col py-10 items-center" key={index}>
                <IconComponent className="text-4xl text-blue-400 mb-2" />
                <h1 className="text-[30px] font-bold text-richblack-5">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-[16px] text-richblack-500">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;