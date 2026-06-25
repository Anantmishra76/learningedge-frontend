import React, { useState } from "react";
import { HomePageExplore } from "../../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

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
    <div className="min-h-screen flex flex-col justify-center py-8">
      {/* Explore more section */}
      <div>
        <div className="text-3xl lg:text-4xl font-semibold text-center my-6">
        Build with Code

          <HighlightText text={"Lead with Vision"} />
          <p className="text-center text-richblack-300 text-base lg:text-lg font-semibold mt-1">
           Ideas are just the beginning start building

          </p>
        </div>
      </div>

      {/* Tabs Section */}
      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap gap-2 lg:gap-5 -mt-2 mx-auto w-max max-w-full bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={` text-[12px] lg:text-[16px] flex flex-row items-center gap-1 lg:gap-2 ${currentTab === ele
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
                } px-3 lg:px-7 py-[5px] lg:py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden -mt-2 mx-auto w-max max-w-full relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full min-w-[200px] bg-richblack-800 text-richblack-200 p-3 rounded-lg font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
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
          <div className="absolute top-full left-0 right-0 mt-1 bg-richblack-800 rounded-lg shadow-lg z-10 overflow-hidden">
            {tabsName.map((ele, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setMyCards(ele)}
                  className={`px-3 py-2 text-sm cursor-pointer transition-all duration-200 ${
                    currentTab === ele
                      ? "bg-richblack-900 text-richblack-5 font-medium"
                      : "text-richblack-200 hover:bg-richblack-700"
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
      <div className="gap-6 justify-center flex flex-wrap w-full text-black mt-8 lg:px-0 px-3">
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
      <div className='flex flex-row gap-7 justify-center mt-8'>
        <a href="/signup" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
          Learn more
        </a>
      </div>
    </div>
  )
}

export default ExploreMore;
