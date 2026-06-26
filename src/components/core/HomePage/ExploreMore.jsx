import React, { useState } from "react";
import { HomePageExplore } from "../../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free For All",
  "Beginner-Friendly Courses",
  "Trending Skills",
  "Skill Tracks",
  "Career pathways",
];


const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="flex flex-col py-4">
      {/* Explore more section */}
      <div>
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h3 className="text-2xl font-semibold text-slate-900 lg:text-4xl">
            Choose a path that matches your goal
          </h3>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Switch between course groups and compare what fits your next step.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      {/* Desktop Tabs */}
      <div className="mx-auto hidden w-max max-w-full flex-wrap gap-2 rounded-full border border-slate-200 bg-white p-1 text-slate-600 shadow-sm md:flex lg:gap-3">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`flex flex-row items-center gap-1 text-[12px] lg:gap-2 lg:text-[15px] ${currentTab === ele
                ? "bg-blue-500 text-white font-medium"
                : "text-slate-600"
                } cursor-pointer rounded-full px-3 py-[7px] transition-all duration-200 hover:bg-blue-500 hover:text-white lg:px-5`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="relative mx-auto w-full max-w-sm md:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 font-medium text-slate-700 shadow-sm">
          <span className="text-sm">{currentTab}</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            {tabsName.map((ele, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setMyCards(ele)}
                  className={`px-3 py-2 text-sm cursor-pointer transition-all duration-200 ${
                    currentTab === ele
                      ? "bg-blue-500 text-white font-medium"
                      : "text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {ele}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cards Group */}
      <div className="mt-8 grid w-full gap-6 text-black sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          )
        })}
      </div>

      {/* Learn More Button */}
      <div className='mt-8 flex flex-row justify-center gap-7'>
        <a href="/signup" className="rounded-md bg-brand-500 px-8 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-600">
          Start a learning path
        </a>
      </div>
    </div>
  )
}

export default ExploreMore;

