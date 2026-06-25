/**
 * Formats a date string into a human-readable format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string in "Month Day, Year" format or null if invalid
 */
export const formattedDate = (date) => {
  // Check if date is null, undefined, or invalid
  if (!date || date === "null" || date === "undefined") {
    return null
  }

  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime()) || dateObj.getTime() === 0) {
    return null
  }

  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}