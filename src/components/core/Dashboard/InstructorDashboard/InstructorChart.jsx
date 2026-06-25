import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"
import { motion } from "framer-motion"
import { FaUsers, FaRupeeSign } from "react-icons/fa"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  // Generate chart colors
  const generateChartColors = (numColors) => {
    const colors = [
       'rgba(65, 195, 164, 0.8)',   // Blue
      'rgba(255, 206, 86, 0.8)',   // Yellow
     
      'rgba(255, 99, 132, 0.8)',   // Red
      'rgba(27, 110, 110, 0.8)',   // Green
      'rgba(153, 102, 255, 0.8)',  // Purple
      'rgba(255, 159, 64, 0.8)',   // Orange
      'rgba(199, 199, 199, 0.8)',  // Grey
      'rgba(83, 102, 255, 0.8)',   // Indigo
    ]
    const borders = colors.map(color => color.replace('0.8', '1'))

    return {
      backgrounds: colors.slice(0, numColors),
      borders: borders.slice(0, numColors)
    }
  }

  const colors = generateChartColors(courses.length)

  // Chart data
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: colors.backgrounds,
        borderColor: colors.borders,
        borderWidth: 2,
        hoverBackgroundColor: colors.backgrounds.map(color => color.replace('0.8', '1')),
        hoverBorderColor: colors.borders,
        hoverBorderWidth: 3,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: colors.backgrounds,
        borderColor: colors.borders,
        borderWidth: 2,
        hoverBackgroundColor: colors.backgrounds.map(color => color.replace('0.8', '1')),
        hoverBorderColor: colors.borders,
        hoverBorderWidth: 3,
      },
    ],
  }

  // Chart options
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 18,
          usePointStyle: true,
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
          color: "#e2e8f0",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        titleColor: "#b29e69ff",
        bodyColor: "#e2e8f0",
        borderColor: "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            let label = context.label || ""
            if (label) {
              label += ": "
            }
            if (currChart === "students") {
              label += context.parsed + " students"
            } else {
              label += "₹" + context.parsed
            }
            return label
          },
        },
      },
    },
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col gap-y-5 rounded-2xl bg-richblack-700 p-4 sm:p-6 h-full overflow-hidden shadow-lg"
    >
      {/* Chart Toggle Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 font-semibold">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrChart("students")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm sm:text-base transition-all duration-200 ${
            currChart === "students"
              ? "bg-caribbeangreen-200 text-black shadow-lg"
              : "bg-richblack-600 text-yellow-100 hover:bg-richblack-500"
          }`}
        >
          <FaUsers className="text-sm" />
          Students
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrChart("income")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm sm:text-base transition-all duration-200 ${
            currChart === "income"
              ? "bg-caribbeangreen-200 text-black shadow-lg"
              : "bg-richblack-600 text-yellow-100 hover:bg-richblack-500"
          }`}
        >
          <FaRupeeSign className="text-sm" />
          Income
        </motion.button>
      </div>

      {/* Chart Section */}
      <div className="relative mx-auto flex-1 w-full max-w-[95%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl min-h-[250px] sm:min-h-[320px]">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </motion.div>
  )
}
