import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";

import { apiConnector } from "@/services/apiConnector";
import { ratingsEndpoints } from "@/services/apis";
import Img from "./Img";

const TRUNCATE = 20;

function truncate(text = "") {
  const words = text.trim().split(" ");
  return words.length > TRUNCATE
    ? `${words.slice(0, TRUNCATE).join(" ")}...`
    : text;
}

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          fill="currentColor"
          className={`h-4 w-4 ${
            index < count ? "text-yellow-50" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const name =
    `${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`.trim() ||
    "Student";
  const avatar =
    review?.user?.image ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

  return (
    <article className="relative flex h-full w-full flex-col rounded-xl  bg-white/90 p-6">
      <StarRating count={parseInt(review.rating)} />

      <p className="flex mt-2 text-gray-600">{truncate(review?.review)}</p>

      <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <Img
          src={avatar}
          alt={name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold leading-tight text-gray-900">
            {name}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ReviewSlider() {
  const [reviews, setReviews] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActive] = useState(0);

  useEffect(() => {
    apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
      .then(({ data }) => data?.success && setReviews(data.data))
      .catch(() => setReviews([]));
  }, []);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="overflow-hidden bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="mb-3 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-4xl">
            Review from our Learners
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[A11y, Autoplay]}
            loop={reviews.length > 3}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12"
            onSwiper={setSwiper}
            onSlideChange={(swiperInstance) =>
              setActive(swiperInstance.realIndex)
            }
            a11y={{
              prevSlideMessage: "Previous review",
              nextSlideMessage: "Next review",
            }}>
            {reviews.map((review, index) => (
              <SwiperSlide key={review?._id || index} className="flex! h-auto!">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous review"
            onClick={() => swiper?.slidePrev()}
            className="absolute left-0 top-[42%] z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white md:flex">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => swiper?.slideNext()}
            className="absolute right-0 top-[42%] z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white md:flex">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-1 flex justify-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={review?._id || index}
                type="button"
                aria-label={`Go to review ${index + 1}`}
                onClick={() => swiper?.slideToLoop(index)}
                className={`mt-2 h-2 rounded-full bg-blue-600 transition-all duration-300 ${
                  activeIndex === index ? "w-6 opacity-100" : "w-2 opacity-30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Review() {
  return <ReviewSlider />;
}
