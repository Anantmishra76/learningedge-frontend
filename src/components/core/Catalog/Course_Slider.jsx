// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules"

import Course_Card from "./Course_Card"



function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          speed={800} // Smooth transition speed in milliseconds
          effect="slide" // Slide effect for smooth transitions
          loop={Courses.length > 3} // Only enable loop if more than 3 courses
          autoplay={
            Courses.length > 3
              ? {
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  waitForTransition: true, // Wait for transition to complete
                  stopOnLastSlide: false,
                }
              : false
          }
          modules={[FreeMode, Pagination, Autoplay]}
          grabCursor={true} // Show grab cursor on hover
          centeredSlides={false}
          slidesPerGroup={1} // Slide one at a time for smoother effect
          watchOverflow={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="max-h-[30rem] pt-8 px-2 smooth-slider"
          style={{
            '--swiper-transition-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth easing
          }}
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 ">
          <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
          <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
        </div>
      )}
    </>
  )
}

export default Course_Slider
