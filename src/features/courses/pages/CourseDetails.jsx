import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "@/components/common/ConfirmationModal";
import Footer from "@/components/common/Footer";
import RatingStars from "@/components/common/RatingStars";
import CourseAccordionBar from "@/features/courses/components/CourseAccordionBar";
import CourseDetailsCard from "@/features/courses/components/CourseDetailsCard";

import { formatDate } from "@/services/formatDate";
import { fetchCourseDetails } from "@/features/courses/services/courseDetailsAPI";
import GetAvgRating from "@/utils/avgRating";

import {
  AiOutlineBook,
  AiOutlineTag,
  AiOutlineFileText,
} from "react-icons/ai";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCourseDetailsData = async () => {
      const res = await fetchCourseDetails(courseId);
      setResponse(res);
    };
    fetchCourseDetailsData();
  }, [courseId]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseDetails = response?.data?.courseDetails;
  const courseContent = courseDetails?.courseContent ?? [];
  const ratingAndReviews = courseDetails?.ratingAndReviews ?? [];
  const avgReviewCount = (() => {
    const count = GetAvgRating(ratingAndReviews);
    return isNaN(count) || count === undefined || count === null ? 0 : count;
  })();
  const totalNoOfLectures = courseContent.reduce(
    (total, section) => total + (section?.subSection?.length || 0),
    0,
  );

  if (paymentLoading || loading || !courseDetails) {
    return (
      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-8">
          <div className="h-10 w-64 rounded-xl skeleton mb-2"></div>
          <div className="h-5 w-96 rounded-xl skeleton"></div>
        </div>

        <div className="relative w-full bg-richblack-800 rounded-lg p-6 mb-8">
          <div className="grid min-h-[300px] justify-items-center lg:justify-items-start">
            <div className="h-10 w-10 rounded-full skeleton mb-5"></div>
            <div className="relative block max-h-[20rem] lg:hidden mb-4">
              <div className="aspect-auto w-full h-48 rounded-2xl skeleton"></div>
            </div>
            <div className="mb-5 flex flex-col justify-center gap-4 py-5">
              <div className="h-4 w-80 rounded-xl skeleton"></div>
              <div className="h-4 w-64 rounded-xl skeleton"></div>
              <div className="h-4 w-48 rounded-xl skeleton"></div>
              <div className="h-4 w-56 rounded-xl skeleton"></div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <div className="h-6 w-24 rounded-xl skeleton"></div>
              <div className="h-10 w-full rounded-xl skeleton"></div>
              <div className="h-10 w-full rounded-xl skeleton"></div>
            </div>
          </div>
          <div className="right-6 top-6 mx-auto hidden lg:block lg:absolute min-h-[400px] w-1/3 max-w-[350px]">
            <div className="h-full w-full rounded-xl skeleton"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 bg-richblack-800 p-2 rounded-lg border border-richblack-700">
          <div className="h-10 w-32 rounded-md skeleton"></div>
          <div className="h-10 w-40 rounded-md skeleton"></div>
          <div className="h-10 w-28 rounded-md skeleton"></div>
          <div className="h-10 w-36 rounded-md skeleton"></div>
          <div className="h-10 w-24 rounded-md skeleton"></div>
        </div>

        <div className="space-y-6">
          <div className="h-32 w-full rounded-xl skeleton"></div>
        </div>
      </div>
    );
  }

  const {
    courseName,
    courseDescription,
    whatYouWillLearn,
    studentsEnrolled,
    createdAt,
    tag,
  } = courseDetails;

  const tabs = [
    { id: "overview", label: "Overview", icon: AiOutlineBook },
    { id: "content", label: "Course Content", icon: AiOutlineFileText },
    { id: "learn", label: "What you'll learn", icon: AiOutlineFileText },
    { id: "tags", label: "Tags", icon: AiOutlineTag },
  ];

  const handleBuyCourse = async () => {
    if (token) {
      const coursesId = [courseId];
      const { buyCourse } = await import("@/features/cart/services/studentFeaturesAPI");
      buyCourse(token, coursesId, user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {courseName}
          </h1>
          <p className="text-slate-600">
            Explore the course information and curriculum
          </p>
        </div>

        {/* Hero Section */}
        <div className="relative w-full bg-richblack-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[300px]">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="flex flex-col gap-4 py-5 text-lg text-slate-900">
                <p className="text-slate-600">{courseDescription}</p>
                <div className="text-md flex flex-wrap items-center gap-2">
                  <span className="text-blue-400">{avgReviewCount || 0}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                  <span>{`(${ratingAndReviews?.length || 0} reviews)`}</span>
                  <span>{`${studentsEnrolled?.length || 0} students enrolled`}</span>
                </div>
                <div className="flex flex-wrap gap-5 text-lg">
                  <p className="flex items-center gap-2">
                    <BiInfoCircle /> Created at {formatDate(createdAt)}
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlineGlobeAlt /> English , Hindi
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center order-1 lg:order-2">
              <CourseDetailsCard
                course={response?.data?.courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div>
            <div className="flex flex-wrap gap-2 mb-8 bg-richblack-800 p-2 rounded-lg border border-richblack-700">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg"
                        : "text-slate-600 hover:text-slate-900 hover:bg-richblack-700"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {activeTab === "overview" && (
                <div className="animate-fade-in">
                  <div className="text-slate-900">
                    <h2 className="text-2xl font-semibold mb-4">
                      Course Overview
                    </h2>
                    <p className="text-slate-600">{courseDescription}</p>
                  </div>
                </div>
              )}
              {activeTab === "learn" && (
                <div className="animate-fade-in">
                  <div className="border border-richblack-600 p-6 rounded-lg">
                    <p className="text-2xl font-semibold mb-4 text-slate-900">
                      What you'll learn
                    </p>
                    <div className="space-y-2">
                      {whatYouWillLearn &&
                        whatYouWillLearn.split("\n").map((line, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">
                              {index + 1}.
                            </span>
                            <p className="text-slate-900">{line}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "tags" && (
                <div className="animate-fade-in">
                  <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold text-slate-900">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {tag &&
                        tag.map((item, ind) => (
                          <p
                            key={ind}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                          >
                            {item}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "content" && (
                <div className="animate-fade-in">
                  <div className="max-w-full">
                    <div className="flex flex-col gap-3">
                      <p className="text-2xl font-semibold text-slate-900">
                        Course Content
                      </p>
                      <div className="flex flex-wrap justify-between gap-2">
                        <div className="flex gap-2 text-sm text-slate-600">
                          <span>{courseContent.length} section(s)</span>
                          <span>{totalNoOfLectures} lecture(s)</span>
                          <span>{response.data?.totalDuration} Total Time</span>
                        </div>
                        <button
                          className="text-blue-400 text-sm hover:text-blue-300"
                          onClick={() => setIsActive([])}
                        >
                          Hide All Sections
                        </button>
                      </div>
                    </div>
                    <div className="py-4">
                      {courseContent?.map((course, index) => (
                        <CourseAccordionBar
                          course={course}
                          key={index}
                          isActive={isActive}
                          handleActive={handleActive}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex flex-wrap gap-2 mb-8 bg-richblack-800 p-2 rounded-lg border border-richblack-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg"
                      : "text-slate-600 hover:text-slate-900 hover:bg-richblack-700"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            {activeTab === "overview" && (
              <div className="animate-fade-in">
                <div className="text-slate-900">
                  <h2 className="text-2xl font-semibold mb-4">
                    Course Overview
                  </h2>
                  <p className="text-slate-600">{courseDescription}</p>
                </div>
              </div>
            )}
            {activeTab === "learn" && (
              <div className="animate-fade-in">
                <div className="border border-richblack-600 p-6 rounded-lg">
                  <p className="text-2xl font-semibold mb-4 text-slate-900">
                    What you'll learn
                  </p>
                  <div className="space-y-2">
                    {whatYouWillLearn &&
                      whatYouWillLearn.split("\n").map((line, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-yellow-25 font-bold">
                            {index + 1}.
                          </span>
                          <p className="text-slate-900">{line}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "tags" && (
              <div className="animate-fade-in">
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-bold text-slate-900">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tag &&
                      tag.map((item, ind) => (
                        <p
                          key={ind}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                        >
                          {item}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "content" && (
              <div className="animate-fade-in">
                <div className="max-w-full">
                  <div className="flex flex-col gap-3">
                    <p className="text-2xl font-semibold text-slate-900">
                      Course Content
                    </p>
                    <div className="flex flex-wrap justify-between gap-2">
                      <div className="flex gap-2 text-sm text-slate-600">
                        <span>{courseContent.length} section(s)</span>
                        <span>{totalNoOfLectures} lecture(s)</span>
                        <span>{response.data?.totalDuration} Total Time</span>
                      </div>
                      <button
                        className="text-yellow-25 text-sm hover:text-yellow-50"
                        onClick={() => setIsActive([])}
                      >
                        Hide All Sections
                      </button>
                    </div>
                  </div>
                  <div className="py-4">
                    {courseContent?.map((course, index) => (
                      <CourseAccordionBar
                        course={course}
                        key={index}
                        isActive={isActive}
                        handleActive={handleActive}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default CourseDetails;

