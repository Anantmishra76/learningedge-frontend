import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from '../../../assets/Images/timeline_img.png'

import Img from './../../common/Img';

import { motion } from 'framer-motion'
import { fadeIn } from '../../common/motionFrameVarients';



const timeline = [
    {
        Logo: Logo1,
        heading: "Expert Instruction",
        Description: "Learn from industry professionals with years of experience",
    },
    {
        Logo: Logo2,
        heading: "Interactive Learning",
        Description: "Engage with hands-on projects and real-world applications",
    },
    {
        Logo: Logo3,
        heading: "Flexible Schedule",
        Description: "Study at your own pace with 24/7 access to course materials",
    },

    {
        Logo: Logo4,
        heading: "Career Growth",
        Description: "Build skills that advance your professional development",
    },
];

const TimelineSection = () => {
    return (
        <div className="py-8 md:py-16 px-4">
            <div className='flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center max-w-7xl mx-auto'>

                <motion.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='w-full lg:w-[45%] flex flex-col gap-6 md:gap-8'>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-4 md:gap-6 group hover:scale-105 transition-all duration-300' key={index}>

                                    <div className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full bg-gradient-to-br from-richblue-500 to-richblue-700 flex justify-center items-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:from-richblue-400 group-hover:to-richblue-600 flex-shrink-0'>
                                        <Img src={element.Logo} className="w-5 h-5 md:w-6 md:h-6 filter brightness-0 invert" alt={`${element.heading} icon`} />
                                    </div>

                                    <div className="flex-1">
                                        <h2 className='font-bold text-[18px] md:text-[20px] text-richblue-300 mb-1 md:mb-2 group-hover:text-richblue-200 transition-colors duration-300'>{element.heading}</h2>
                                        <p className='text-sm md:text-base text-richblack-300 leading-relaxed group-hover:text-richblack-200 transition-colors duration-300'>{element.Description}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </motion.div>

                <motion.div
                    variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='relative w-full lg:w-[55%] flex flex-col justify-center items-center mt-8 lg:mt-0 gap-6'>

                    <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[550px]">
                        <Img src={timelineImage}
                            alt="timelineImage"
                            className='object-cover h-fit scale-x-[-1] w-full rounded-2xl 
                                     transform transition-transform duration-500 ease-out
                                     hover:scale-110'
                        />
                    </div>

                    <div className='bg-gradient-to-r from-caribbeangreen-700 to-caribbeangreen-600 flex flex-col sm:flex-row text-white py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6
                            rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-sm border border-caribbeangreen-500/30 w-[90%] sm:w-auto max-w-[350px] sm:max-w-none
                            transition-all duration-300 ease-out
                            hover:scale-105 hover:shadow-3xl hover:border-caribbeangreen-400/50
                            hover:from-caribbeangreen-600 hover:to-caribbeangreen-500 cursor-pointer'>
                        <div className='flex flex-row gap-2 sm:gap-3 md:gap-5 items-center border-b sm:border-b-0 sm:border-r border-caribbeangreen-300 pb-3 sm:pb-0 pr-0 sm:pr-4 md:pr-6 mb-3 sm:mb-0'>
                            <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-caribbeangreen-100 bg-clip-text text-transparent'>5+</p>
                            <p className='text-caribbeangreen-200 text-xs sm:text-xs lg:text-sm font-medium leading-tight'>Years of<br />Experience</p>
                        </div>

                        <div className='flex gap-2 sm:gap-3 md:gap-5 items-center pl-0 sm:pl-4 md:pl-6'>
                            <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-caribbeangreen-100 bg-clip-text text-transparent'>100+</p>
                            <p className='text-caribbeangreen-200 text-xs sm:text-xs lg:text-sm font-medium leading-tight'>Types of<br />Courses</p>
                        </div>

                    </div>

                </motion.div>
            </div>
        </div>
    )
}

export default TimelineSection
