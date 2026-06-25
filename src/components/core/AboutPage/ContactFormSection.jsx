import React from "react";
import ContactUsForm from '../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
      >
        Get in Touch
      </h1>
      <p
        className="text-richblack-200 text-sm sm:text-base md:text-lg drop-shadow-sm max-w-2xl mx-auto"
      >
        We'd love to hear from you. Please fill out this form and we'll get back to you soon.
      </p>

      <div
        className="mt-8 mx-auto"
      >
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
