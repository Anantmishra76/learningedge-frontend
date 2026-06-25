/**
 * Calculates the average rating from an array of rating objects
 * @param {Array} ratingArr - Array of objects containing rating values
 * @returns {number} Average rating rounded to 1 decimal place, or 0 if invalid
 */
export default function GetAvgRating(ratingArr) {
  // Handle undefined, null, or empty arrays
  if (!ratingArr || ratingArr.length === 0) return 0
  
  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    // Ensure curr.rating is a valid number
    const rating = Number(curr?.rating) || 0
    acc += rating
    return acc
  }, 0)

  const multiplier = Math.pow(10, 1)
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier

  // Ensure we return a valid number, not NaN
  return isNaN(avgReviewCount) ? 0 : avgReviewCount
}