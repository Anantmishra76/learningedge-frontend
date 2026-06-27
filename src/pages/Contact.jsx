import React from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const Contact = () => {
  return (
    <div>
      <section className="bg-slate-50 py-20 mt-10">
        <div className="mx-auto w-11/12 max-w-7xl">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
              Contact Us
            </span>

            <h1 className="mt-5 text-4xl font-bold text-slate-900">
              Need Help With Your Learning Journey?
            </h1>

            <p className="mt-4 text-slate-600">
              Have a question about courses, enrollment, payments, or teaching
              on LearningEdge? Send us a message and we will get back to you
              within 24 hours.
            </p>
          </div>

          {/* Content */}
          <div className="mt-16 grid gap-10 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help with your course or account..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <span>
                    I agree to the Terms of Service and Privacy Policy.
                  </span>
                </label>

                <button className="w-full rounded-xl bg-slate-900 py-4 font-medium text-white transition hover:bg-slate-800">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="mb-6 text-xl font-semibold text-slate-900">
                  LearningEdge Support
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Mail size={22} />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">Email</p>
                      <p className="text-slate-500">anantmishra727@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-xl bg-green-50 p-3 text-green-600">
                      <Phone size={22} />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">Phone</p>
                      <p className="text-slate-500">+91 7678649665</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">Office</p>

                      <p className="text-slate-500">xyz</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="mb-5 text-xl font-semibold text-slate-900">
                  How We Can Help
                </h3>

                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-600" />
                    Course and enrollment support
                  </li>

                  <li className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-600" />
                    Help with payments and purchase history
                  </li>

                  <li className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-600" />
                    Instructor and course creation guidance
                  </li>

                  <li className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-600" />
                    Account and profile assistance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
