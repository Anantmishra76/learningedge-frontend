import React from "react"

import FoundingStory from "@/assets/Images/foundingstory.jpg"
import BannerImage1 from "@/assets/Images/Aboutus1.jpeg"
import BannerImage2 from "@/assets/Images/Aboutus2.jpeg"
import BannerImage3 from "@/assets/Images/Aboutus3.jpeg"

import Footer from "@/components/common/Footer"
import LearningGrid from "@/features/about/components/LearningGrid"
import StatsComponent from "@/features/about/components/Stats"
import HighlightText from "@/features/about/components/HighlightText"
import Img from "@/components/common/Img"

import { motion } from 'framer-motion'
import { fadeIn } from "@/components/common/motionFrameVarients"

import { FaBookOpen, FaBullseye, FaRocket } from 'react-icons/fa'


const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f5f3ed]">

        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-center gap-6 sm:gap-8 md:gap-10 text-center text-slate-900 py-12 sm:py-16 md:py-20">
          <motion.header className="mx-auto lg:w-[80%]">
            <motion.div
              variants={fadeIn('down', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mb-4 text-3xl font-medium leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
                <span className="text-brand-700">
                Driving Innovation
              </span>
              <br />
              <span className="text-slate-900">in Online Education for a</span>
              <br />
              <HighlightText text={"Brighter Future"} />
            </motion.div>

            <motion.p
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-4 text-sm sm:text-base md:text-lg font-light text-slate-600 lg:w-[90%] leading-relaxed"
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
                <section className="py-8 sm:py-12 md:py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <Img src={BannerImage1} alt="LearningEdge learners" className="w-full max-w-sm h-auto max-h-48 rounded-xl object-cover" />
            <Img src={BannerImage2} alt="LearningEdge learning community" className="w-full max-w-sm h-auto max-h-48 rounded-xl object-cover" />
            <Img src={BannerImage3} alt="LearningEdge online learning" className="w-full max-w-sm h-auto max-h-48 rounded-xl object-cover" />
          </div>
        </div>
      </section>
          </motion.div> 
        </div>
      </section>
      {/* Founding Story and Vision/Mission Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white relative overflow-hidden">
        <div className="relative mx-auto w-11/12 max-w-maxContent">
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 md:p-8">
                <motion.div
                  variants={fadeIn('right', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                      <FaBookOpen className="text-white text-lg" />
                    </div>
                    <h2 className="text-xl font-medium text-slate-900 sm:text-2xl md:text-3xl">
                      Our Founding Story
                    </h2>
                  </div>

                  <div className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
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
                  <Img
                    src={FoundingStory}
                    alt="The LearningEdge founding story"
                    className="relative w-full h-auto rounded-2xl border border-slate-200"
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
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 md:p-8">
                <motion.div
                  variants={fadeIn('up', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                      <FaBullseye className="text-white text-lg" />
                    </div>
                       <h3 className="text-xl font-medium text-slate-900 sm:text-2xl md:text-3xl">
                      Our Vision
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    With this vision in mind, we set out on a journey to create an
                    e-learning platform that would revolutionize the way people
                    learn. Our team of dedicated experts worked tirelessly to
                    develop a robust and intuitive platform that combines
                    cutting-edge technology with engaging content, fostering a
                    dynamic and interactive learning experience.
                  </p>
                </motion.div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 md:p-8">
                <motion.div
                  variants={fadeIn('up', 0.4)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                      <FaRocket className="text-white text-lg" />
                    </div>
                      <h3 className="text-xl font-medium text-slate-900 sm:text-2xl md:text-3xl">
                      Our mission
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-10 sm:py-16 md:py-0 bg-slate-50 relative overflow-hidden">
        <div className="relative">
          <StatsComponent />
        </div>
      </section>

      {/* Learning Grid and Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">

        <div className="relative mx-auto w-11/12 max-w-maxContent">
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="mb-4 text-2xl font-medium text-slate-900 sm:text-3xl md:text-4xl">
              Explore Our Learning Ecosystem
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
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

