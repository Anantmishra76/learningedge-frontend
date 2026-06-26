import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import hero from "../assets/hero.jpg";

const slides = [
  { id: 1, img: hero, alt: "Coding" },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
    alt: "Data science",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    alt: "Design",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    alt: "Cloud",
  },
];

export default function Hero() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <div className="relative pt-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          speed={600}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
          }}
          pagination={{ clickable: true }}
          style={{ height: "480px" }}>
          {slides.map((s) => (
            <SwiperSlide key={s.id} style={{ height: "480px" }}>
              <img
                src={s.img}
                alt={s.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="swiper-btn-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/80 border border-gray-700 hover:bg-gray-800 flex items-center justify-center transition-colors mt-8"
          aria-label="Previous slide">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="swiper-btn-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/80 border border-gray-700 hover:bg-gray-800 flex items-center justify-center transition-colors mt-8"
          aria-label="Next slide">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* trust bar + categories unchanged */}
      <div className="border-y border-gray-800 bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6 md:gap-10 items-center justify-center md:justify-start text-sm text-gray-400">
          {[
            ["12M+", "Students worldwide"],
            ["85K+", "Courses available"],
            ["4,000+", "Expert instructors"],
            ["30", "Day money-back"],
          ].map(([n, l]) => (
            <div key={l} className="flex items-center gap-2">
              <span className="text-white font-semibold">{n}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-lg font-semibold text-gray-200 mb-6">
          Browse categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            "Development",
            "Design",
            "Data Science",
            "Business",
            "Marketing",
            "DevOps",
          ].map((c) => (
            <button
              key={c}
              className="text-sm text-gray-300 border border-gray-700 hover:border-violet-500 hover:text-violet-400 rounded px-3 py-2.5 text-center transition-colors">
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
