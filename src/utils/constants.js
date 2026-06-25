export const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
}

export const COURSE_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
}

/**
 * Utility function to calculate total duration from course content
 * @param {Array} courseContent - Array of course sections with subsections
 * @returns {string} Formatted duration string in "Xh Ym Zs" format
 */
export const calculateTotalDuration = (courseContent) => {
  if (!courseContent || !Array.isArray(courseContent)) return "0h 0m 0s";

  let totalSeconds = 0;

  courseContent.forEach(section => {
    if (section.subSection && Array.isArray(section.subSection)) {
      section.subSection.forEach(subSection => {
        // Check for various possible duration field names
        const duration = subSection.timeDuration || subSection.duration || subSection.videoDuration || subSection.length;

        if (duration) {
          // Handle different duration formats
          if (typeof duration === 'string') {
            // Try to match "Xh Ym Zs" format
            const match = duration.match(/(\d+)h\s*(\d+)m\s*(\d+)s/);
            if (match) {
              const hours = parseInt(match[1]);
              const minutes = parseInt(match[2]);
              const seconds = parseInt(match[3]);
              totalSeconds += hours * 3600 + minutes * 60 + seconds;
            } else {
              // Try to match "Xhr Ymin" format
              const match2 = duration.match(/(\d+)hr?\s*(\d+)min?/);
              if (match2) {
                const hours = parseInt(match2[1]);
                const minutes = parseInt(match2[2]);
                totalSeconds += hours * 3600 + minutes * 60;
              } else {
                // Try to match "X:Y:Z" format
                const match3 = duration.match(/(\d+):(\d+):(\d+)/);
                if (match3) {
                  const hours = parseInt(match3[1]);
                  const minutes = parseInt(match3[2]);
                  const seconds = parseInt(match3[3]);
                  totalSeconds += hours * 3600 + minutes * 60 + seconds;
                }
              }
            }
          } else if (typeof duration === 'number') {
            // Assume it's in seconds if it's a number
            totalSeconds += duration;
          }
        }
      });
    }
  });

  // If no duration found, try to estimate based on number of lectures (rough estimate)
  if (totalSeconds === 0 && courseContent.length > 0) {
    let totalLectures = 0;
    courseContent.forEach(section => {
      if (section.subSection && Array.isArray(section.subSection)) {
        totalLectures += section.subSection.length;
      }
    });
    // Estimate 10 minutes per lecture as a rough fallback
    totalSeconds = totalLectures * 600;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};