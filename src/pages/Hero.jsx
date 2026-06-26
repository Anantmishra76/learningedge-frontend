import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";

const slides = [
  { id: 1, img: hero, alt: "Coding" },
  {
    id: 2,
    img: hero2,
    alt: "Data science",
  },
  {
    id: 3,
    img: hero3,
    alt: "Design",
  },
  {
    id: 4,
    img: hero4,
    alt: "Cloud",
  },
];

export default function Hero() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-gray-950 text-white">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          speed={600}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{ clickable: true }}
          className="h-[320px] sm:h-[420px] lg:h-[520px]">
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
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
          ref={prevRef}
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          aria-label="Previous slide">
          <MdChevronLeft size={24} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          aria-label="Next slide">
          <MdChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
