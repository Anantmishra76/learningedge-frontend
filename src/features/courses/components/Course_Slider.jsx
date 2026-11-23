// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import Course_Card from "./Course_Card";

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          speed={800}
          effect="slide"
          loop={false}
          autoplay={false}
          modules={[FreeMode, Pagination]}
          grabCursor={true}
          centeredSlides={false}
          slidesPerGroup={1}
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
          className="smooth-slider min-w-0 max-w-full px-2 pt-8"
          style={{
            "--swiper-transition-timing-function":
              "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}>
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
  );
}

export default Course_Slider;
