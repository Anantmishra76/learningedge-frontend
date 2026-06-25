import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="relative overflow-hidden border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col bg-gradient-to-br from-richblack-800 to-richblack-700 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        <h1 className="text-4xl leading-10 font-semibold text-richblack-5 mb-2">
          Got a Idea? We&apos;ve got the skills. Let&apos;s team up
        </h1>
        <p className="text-richblack-300 text-lg">
          Tell us more about yourself and what you&apos;ve got in mind.
        </p>

        <div className="mt-7">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;