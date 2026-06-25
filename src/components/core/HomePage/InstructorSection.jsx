import React from 'react'
import Instructor from '../../../assets/Images/Intructor_img.jpeg'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';

const InstructorSection = () => {
  return (
    <div className='mb-10 bg-richblack-5'>
      <div className='flex flex-col-reverse lg:flex-row gap-2 lg:gap-5 items-center'>

        <div className='lg:w-[50%] '>
          <Img
            src={Instructor}
            alt="Instructor"
            className='shadow-white rounded-full w-96 h-96 object-cover'
          />
        </div>

        <div className='lg:w-[50%] flex flex-col'>
          <div className='text-3xl lg:text-4xl font-semobold w-full mb-2 text-richblack-700 leading-tight'>
            Become an instructor today
            and 
            <HighlightText text={"inspire learners worldwide"} />
          </div>

          <p className='font-medium text-[16px] w-[80%] text-richblack-700 mb-12'>
            Instructors from around the world teach millions of students on LearningEdge. We provide the tools and skills to teach what you love.
          </p>

          <div className='w-fit mt-6'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-3 items-center px-2 py-1'>
                Start Your Teaching Journey
                <FaArrowRight className='text-sm' />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
