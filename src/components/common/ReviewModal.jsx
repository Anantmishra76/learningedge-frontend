import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { FiAlertCircle } from "react-icons/fi";
import { Rating, Star as StarShape } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { createRating } from "@/features/courses/services/courseDetailsAPI";
import Img from "./Img";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function ReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const [rating, setRating] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { courseExperience: "", courseRating: 0 },
  });

  useEffect(() => setValue("courseRating", rating), [rating, setValue]);

  const close = () => setReviewModal(false);

  const onSubmit = async (data) => {
    if (!token || !user || !courseEntireData?._id) {
      toast.error("Missing session or course info - please refresh.");
      return;
    }

    if (!data.courseRating) {
      toast.error("Select a rating first.");
      return;
    }

    setSubmitting(true);
    try {
      const ok = await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token,
      );

      if (ok) close();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/50 backdrop-blur-sm"
      onClick={close}>
      <div
        className="w-11/12 max-w-[480px] overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Rate this course
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700">
            <RxCross2 size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 flex items-center gap-3">
            <Img
              src={user?.image}
              alt={user?.firstName}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400">Posting publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 py-5">
              <Rating
                style={{ maxWidth: 148 }}
                itemStyles={{
                  itemShapes: StarShape,
                  activeFillColor: "#facc15",
                  inactiveFillColor: "#e5e7eb",
                }}
                value={rating}
                onChange={(value) => {
                  setRating(value);
                  setValue("courseRating", value);
                }}
                spaceBetween="small"
                spaceInside="medium"
              />
              <span className="text-xs font-medium text-gray-500">
                {rating > 0 ? RATING_LABELS[rating] : "Tap to rate"}
              </span>
            </div>

            <div>
              <label
                htmlFor="courseExperience"
                className="mb-1 block text-xs font-medium text-gray-600">
                Your review <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="courseExperience"
                rows={4}
                placeholder="What did you think of the course?"
                {...register("courseExperience", {
                  required: "Please share your experience",
                })}
                className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
              {errors.courseExperience && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <FiAlertCircle size={12} /> {errors.courseExperience.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={close}
                disabled={isSubmitting}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
                {isSubmitting && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
