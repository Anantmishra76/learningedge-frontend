import React from "react"

import FoundingStory from "../assets/Images/foundingstory.jpg"
import BannerImage1 from "../assets/Images/Aboutus1.jpeg"
import BannerImage2 from "../assets/Images/Aboutus2.jpeg"
import BannerImage3 from "../assets/Images/Aboutus3.jpeg"

import Footer from "../components/common/Footer"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import Img from "../components/common/Img"

import { motion } from 'framer-motion'
import { fadeIn } from "../components/common/motionFrameVarients"

import { FaBookOpen, FaBullseye, FaRocket } from 'react-icons/fa'


const About = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-richblack-900 to-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 via-transparent to-transparent"></div>

        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-center gap-6 sm:gap-8 md:gap-10 text-center text-white py-12 sm:py-16 md:py-20">
          <motion.header className="mx-auto lg:w-[80%]">
            <motion.div
              variants={fadeIn('down', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Driving Innovation
              </span>
              <br />
              <span className="text-white">in Online Education for a</span>
              <br />
              <HighlightText text={"Brighter Future"} />
            </motion.div>

            <motion.p
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-4 text-sm sm:text-base md:text-lg font-light text-richblack-100 lg:w-[90%] leading-relaxed drop-shadow-sm"
            >
              LearningEdge is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </motion.p>
          </motion.header>

          <motion.div
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="flex justify-center items-center gap-4 mt-6"
          >
                <section className="py-8 sm:py-12 md:py-16 bg-richblack-900">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <Img src={BannerImage1} alt="Banner 1" className="w-full max-w-sm h-auto max-h-48 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300" />
            <Img src={BannerImage2} alt="Banner 2" className="w-full max-w-sm h-auto max-h-48 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300" />
            <Img src={BannerImage3} alt="Banner 3" className="w-full max-w-sm h-auto max-h-48 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>
          </motion.div> 
        </div>
      </section>
      {/* Founding Story and Vision/Mission Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto w-11/12 max-w-maxContent">
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="flex-1 bg-gradient-to-br from-richblack-800/80 to-richblack-700/80 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <motion.div
                  variants={fadeIn('right', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <FaBookOpen className="text-white text-lg" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Our Founding Story
                    </h2>
                  </div>

                  <div className="space-y-3 text-sm sm:text-base text-richblack-100 leading-relaxed drop-shadow-sm">
                    <p>
                      Our e-learning platform was born out of a shared vision and
                      passion for transforming education. It all began with a group of
                      educators, technologists, and lifelong learners who recognized
                      the need for accessible, flexible, and high-quality learning
                      opportunities in a rapidly evolving digital world.
                    </p>
                    <p>
                      As experienced educators ourselves, we witnessed firsthand the
                      limitations and challenges of traditional education systems. We
                      believed that education should not be confined to the walls of a
                      classroom or restricted by geographical boundaries. We
                      envisioned a platform that could bridge these gaps and empower
                      individuals from all walks of life to unlock their full
                      potential.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={fadeIn('left', 0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.1 }}
                className="flex-1 relative"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Img
                    src={FoundingStory}
                    alt="FoundingStory"
                    className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/20 transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300 overflow-hidden">
                <motion.div
                  variants={fadeIn('up', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <FaBullseye className="text-white text-lg" />
                    </div>
                       <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Our Vision
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-richblack-100 leading-relaxed drop-shadow-sm">
                    With this vision in mind, we set out on a journey to create an
                    e-learning platform that would revolutionize the way people
                    learn. Our team of dedicated experts worked tirelessly to
                    develop a robust and intuitive platform that combines
                    cutting-edge technology with engaging content, fostering a
                    dynamic and interactive learning experience.
                  </p>
                </motion.div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-300 overflow-hidden">
                <motion.div
                  variants={fadeIn('up', 0.4)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <FaRocket className="text-white text-lg" />
                    </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Our mission
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-richblack-100 leading-relaxed drop-shadow-sm">
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-10 sm:py-16 md:py-0 bg-gradient-to-r from-richblack-800 via-richblack-700 to-richblack-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-600/10 via-red-600/10 to-pink-600/10"></div>
        </div>
        <div className="relative">
          <StatsComponenet />
        </div>
      </section>

      {/* Learning Grid and Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-richblack-800 to-richblack-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto w-11/12 max-w-maxContent">
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Explore Our Learning Ecosystem
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-richblack-200 max-w-3xl mx-auto drop-shadow-sm">
              Discover the comprehensive tools and features that make LearningEdge the perfect platform for your educational journey.
            </p>
          </motion.div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
            >
              <LearningGrid />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default About