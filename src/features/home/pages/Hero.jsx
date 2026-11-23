import { useEffect, useRef } from "react";

const FONT_IMPORT = `@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap");`;

const display = "font-['Bricolage_Grotesque',sans-serif]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2441e0]";

export default function Hero({
  headline = "Build skills for the work you want to do.",
  subhead = "Learn online with practical courses in technology, design, business, and more. Follow clear lessons, practice with real projects, and get guidance as you grow.",
  primaryCta = { label: "Create your account", href: "/signup" },
  secondaryCta = { label: "Explore courses", href: "/all-courses" },
  fineprint = "Learn at your pace, from any device.",
  media = {
    type: "video",
    src: "https://videos.pexels.com/video-files/4443257/4443257-hd_1920_1080_25fps.mp4",
    alt: "Student taking notes during an online class",
  },
}) {
  const videoRef = useRef(null);
  const isVideo = media?.type === "video";

  // Respect reduced motion: don't autoplay, show native controls.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      video.pause();
      video.controls = true;
    }
  }, [isVideo, media?.src]);

  return (
    <section
      aria-labelledby="hero-title"
      className="box-border flex min-h-[100svh] items-center bg-[#eef2f4] bg-[linear-gradient(#d5dde2_1px,transparent_1px),linear-gradient(90deg,#d5dde2_1px,transparent_1px)] bg-[size:32px_32px] px-[clamp(20px,5vw,72px)] pb-8 pt-20 font-['Instrument_Sans',system-ui,sans-serif] text-lg leading-relaxed text-[#17233a]">
      <style>{FONT_IMPORT}</style>

      <div className="mx-auto grid max-w-[1200px] items-center gap-[clamp(40px,6vw,88px)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <h1
            id="hero-title"
            className={`${display} m-0 text-balance text-[clamp(2.6rem,6.4vw,5rem)] font-bold leading-none tracking-[-0.035em]`}>
            {headline}
          </h1>
          <p className="mt-7 max-w-[34em] text-[#4a5a70]">{subhead}</p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href={primaryCta.href}
              className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] border-2 border-transparent bg-[#2441e0] px-6 text-[17px] font-semibold text-white transition-colors hover:bg-[#1a31b8] motion-reduce:transition-none sm:w-auto ${focusRing}`}>
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] border-2 border-[#17233a] px-6 text-[17px] font-semibold text-[#17233a] transition-colors hover:bg-[#17233a] hover:text-white motion-reduce:transition-none sm:w-auto ${focusRing}`}>
              {secondaryCta.label}
            </a>
          </div>
          <p className="mt-4 text-[15px] text-[#4a5a70]">{fineprint}</p>
        </div>

        {/* Media */}
        <div className="overflow-hidden rounded-[14px] border-2 border-[#17233a] bg-[#d5dde2] shadow-[5px_5px_0_#17233a] lg:shadow-[8px_8px_0_#17233a]">
          <div className="aspect-video w-full lg:aspect-[1.08/1]">
            {isVideo ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={media.src}
                poster={media.poster || undefined}
                aria-label={media.alt}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                className="h-full w-full object-cover"
                src={media.src}
                alt={media.alt}
                loading="eager"
                fetchpriority="high"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
