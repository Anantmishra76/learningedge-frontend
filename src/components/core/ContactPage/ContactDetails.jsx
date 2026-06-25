import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "noreply.learnedge@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our Lucknow office.",
    details:
      "SMS Lucknow-226010",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "7678XXXXXX",
  },
]


const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="group flex flex-col gap-3 rounded-xl bg-gradient-to-br from-richblack-800 to-richblack-700 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border border-richblack-600"
            key={i}
          >
            <div className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md group-hover:bg-blue-500 transition-colors duration-300">
                <Icon size={24} />
              </div>
              <h1 className="text-xl font-semibold text-richblack-5 group-hover:text-blue-400 transition-colors duration-300">
                {ele?.heading}
              </h1>
            </div>

            <p className="font-medium text-richblack-300 ml-16">{ele?.description}</p>
            <p className="font-semibold text-richblack-100 ml-16 text-sm leading-relaxed">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails