import React from "react";
import { Link } from "react-router-dom";
import { ImGithub, ImLinkedin2 } from "react-icons/im";

import BrandLogo from "./BrandLogo";

const quickLinks = [
  { title: "Home", link: "/" },
  { title: "Courses", link: "/all-courses" },
  { title: "About", link: "/about" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-11/12 max-w-7xl flex-col items-center justify-between gap-8 py-10 md:flex-row">
        {/* Left */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" aria-label="LearningEdge home">
            <BrandLogo />
          </Link>

          <p className="mt-4 max-w-xs text-center text-sm leading-6 text-slate-500 md:text-left">
            Learn new skills, build your future, and grow with high-quality
            online courses.
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
              {item.title}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com/in/anant-mishra76"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-600 hover:text-blue-600">
            <ImLinkedin2 size={18} />
          </a>

          <a
            href="https://github.com/Anantmishra76"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-black hover:text-black">
            <ImGithub size={18} />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-11/12 max-w-7xl flex-col items-center justify-between gap-3 py-5 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} LearningEdge. All rights reserved.</p>

          <div className="flex gap-2">
            <Link to="/" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-slate-800">
              Privacy
            </Link>

            <Link to="/" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-slate-800">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
