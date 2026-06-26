import { useMemo } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function RatingStars({ Review_Count, Star_Size }) {
  const starCount = useMemo(() => {
    const wholeStars = Math.floor(Review_Count) || 0;
    return {
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    };
  }, [Review_Count]);

  return (
    <div className="flex gap-1 text-yellow-50">
      {starCount.full >= 0 &&
        [...new Array(starCount.full)].map((_, i) => (
          <TiStarFullOutline key={i} size={Star_Size || 20} />
        ))}
      {starCount.half >= 0 &&
        [...new Array(starCount.half)].map((_, i) => (
          <TiStarHalfOutline key={i} size={Star_Size || 20} />
        ))}
      {starCount.empty >= 0 &&
        [...new Array(starCount.empty)].map((_, i) => (
          <TiStarOutline key={i} size={Star_Size || 20} />
        ))}
    </div>
  );
}

export default RatingStars;
