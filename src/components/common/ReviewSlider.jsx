// ReviewSlider component for displaying customer reviews in a carousel
import { useEffect, useState } from "react"
import Img from "./Img"
import RatingStars from "./RatingStars"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"
import HighlightText from "../core/HomePage/HighlightText"

function ReviewSlider() {
  const [reviews, setReviews] = useState(null)
  const truncateWords = 15

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  if (!reviews) return null

  return (
    <div className="w-full py-6 md:py-10 lg:py-12 bg-grey-5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-5 left-5 w-20 h-20 md:w-32 md:h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 right-5 w-24 h-24 md:w-40 md:h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-60 md:h-60 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-maxContent mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-richblack-800 mb-3 tracking-tight">
            <HighlightText text={"What Our Students Say"} />
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-richblack-200 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover how our courses have transformed learning experiences for
            thousands of students
          </p>
       
        </div>

        {/* Reviews Slider */}
        <div className="relative px-6 lg:px-12">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            speed={900}
            loop={reviews?.length > 3}
            autoplay={
              reviews?.length > 3
                ? {
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet bg-black w-3 h-3 rounded-full mx-1 opacity-50 hover:opacity-75 transition-opacity",
              bulletActiveClass:
                "swiper-pagination-bullet-active bg-gradient-to-r from-blue-400 to-purple-500 w-4 h-4 mx-1 opacity-100",
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            grabCursor={true}
            slidesPerGroup={1}
            watchOverflow={true}
            modules={[Pagination, Autoplay, Navigation]}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-12"
          >
            {reviews.map((review, i) => {
              const cardStyles = [
                "bg-gradient-to-br from-richblack-800 to-richblack-900 border-l-4 border-blue-400",
                "bg-gradient-to-br from-richblack-800 to-richblack-900 border-l-4 border-purple-400",
                "bg-gradient-to-br from-richblack-800 to-richblack-900 border-l-4 border-green-400",
                "bg-gradient-to-br from-richblack-800 to-richblack-900 border-l-4 border-blue-400",
              ]
              const currentStyle = cardStyles[i % cardStyles.length]

              return (
                <SwiperSlide key={i} className="h-auto">
                  <div
                    className={`${currentStyle} rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 p-5 flex flex-col h-full relative overflow-hidden group`}
                  >
                    {/* Pattern Overlay */}
                    <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <linearGradient
                            id={`grad${i}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: "#3B82F6", stopOpacity: 0.3 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#8B5CF6", stopOpacity: 0.3 }}
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M20,20 L80,20 L80,80 L20,80 Z"
                          fill={`url(#grad${i})`}
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <circle cx="30" cy="30" r="2" fill="currentColor" />
                        <circle cx="50" cy="30" r="2" fill="currentColor" />
                        <circle cx="70" cy="30" r="2" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Review Text */}
                    <div className="flex-1 mb-4">
                      <div className="bg-richblack-700/60 rounded-lg p-4 shadow-inner border border-white/10 backdrop-blur-sm h-full">
                        <p className="text-richblack-100 text-sm md:text-base font-medium leading-relaxed group-hover:text-white transition-colors duration-500 line-clamp-4">
                          {review?.review.split(" ").length > truncateWords
                            ? `${review?.review
                                .split(" ")
                                .slice(0, truncateWords)
                                .join(" ")}...`
                            : review?.review}
                        </p>
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="flex flex-wrap items-center gap-3 bg-richblack-700/60 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                      <div className="relative">
                        <Img
                          src={
                            review?.user?.image
                              ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                          }
                          alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white/20 shadow-lg"
                        />
                        {/* Verified Badge */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border border-white flex items-center justify-center shadow-md">
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm md:text-base truncate">
                          {`${review?.user?.firstName}`}
                        </h3>
                        <p className="text-richblack-300 text-xs md:text-sm font-medium">
                          Verified Student
                        </p>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full px-3 py-1 shadow-md border border-white/20 flex-shrink-0 w-full justify-start sm:w-auto sm:mt-0 mt-1">
                        <span className="text-xs md:text-sm font-bold text-white">
                          {review.rating}
                        </span>
                        <RatingStars Review_Count={parseInt(review.rating)} Star_Size={16} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* Pagination Dots */}
          <div className="swiper-pagination mt-8 flex justify-center"></div>

          {/* Navigation Buttons */}
          {reviews?.length > 3 && (
            <>
              <button className="custom-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-richblack-700 hover:bg-richblack-600 rounded-full shadow-lg items-center justify-center text-white transition-all duration-300 hover:scale-110">
                <FaChevronLeft />
              </button>
              <button className="custom-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-richblack-700 hover:bg-richblack-600 rounded-full shadow-lg items-center justify-center text-white transition-all duration-300 hover:scale-110">
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-6">
          <p className="text-sm md:text-base text-richblack-300 font-medium">
            Showing{" "}
            <span className="font-bold text-richblack-500">
              {reviews?.length}
            </span>{" "}
            verified reviews from our students
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider
