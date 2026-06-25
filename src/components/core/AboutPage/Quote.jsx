import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white max-w-4xl">
        "At LearningEdge, we believe that education should transcend boundaries and
        ignite <HighlightText text={"passion for learning"} />. Our mission is to empower
        every individual with <span className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-transparent bg-clip-text font-bold">
            cutting-edge knowledge
        </span> and foster a
        <span className="bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] text-transparent bg-clip-text font-bold">
            {" "}global community of lifelong learners
        </span> who shape tomorrow's world through innovation and collaboration.
    </div>
  )
}

export default Quote