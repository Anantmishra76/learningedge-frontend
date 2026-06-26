import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";
import { ImGithub, ImLinkedin2 } from "react-icons/im";

import LearningEdgeLogo from "../../assets/Logo/my_logo.png";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const footerLinkClass =
  "text-[14px] cursor-pointer text-slate-600 hover:text-brand-500 transition-all duration-200";
const footerTitleClass = "text-slate-900 font-semibold text-[16px]";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-6 py-8 text-slate-600 lg:flex-row lg:gap-8 lg:py-14">
        <div className="flex w-full flex-col border-b border-slate-200 pb-5 lg:flex-row">
          <div className="flex w-full flex-col flex-wrap justify-between gap-3 pl-3 sm:flex-row lg:w-[50%] lg:border-r lg:border-slate-200 lg:pr-5">
            <div className="mb-7 flex w-full flex-col gap-3 sm:w-[48%] lg:w-[30%]">
              <img
                src={LearningEdgeLogo}
                alt="LearningEdge Logo"
                className="w-32 object-contain sm:w-40"
              />
              <h1 className={footerTitleClass}>Company</h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele) => (
                  <Link key={ele} to="/" className={footerLinkClass}>
                    {ele}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex gap-3 text-lg">
                <svg className="w-5 cursor-pointer hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="facebook">
                  <path fill="#1976D2" d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"></path>
                  <path fill="#FAFAFA" fillRule="evenodd" d="M13.5 8H11V6c0-.552.448-.5 1-.5h1V3h-2a3 3 0 0 0-3 3v2H6v2.5h2V16h3v-5.5h1.5l1-2.5z" clipRule="evenodd"></path>
                </svg>
                <svg className="w-5 cursor-pointer hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="google">
                  <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.641-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                  <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                  <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                  <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                </svg>
                <svg className="w-5 cursor-pointer hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.24 102.59" id="twitter">
                  <path fill="#1da1f2" d="M40.58,115.3c47.64,0,73.69-39.47,73.69-73.69,0-1.12,0-2.24-.07-3.35a52.7,52.7,0,0,0,12.92-13.41,51.7,51.7,0,0,1-14.87,4.08A26,26,0,0,0,123.63,14.6a51.9,51.9,0,0,1-16.45,6.29A25.92,25.92,0,0,0,63.05,44.51,73.53,73.53,0,0,1,9.67,17.45a25.92,25.92,0,0,0,8,34.58A25.71,25.71,0,0,1,6,48.78c0,.11,0,.22,0,.33A25.91,25.91,0,0,0,26.73,74.5a25.86,25.86,0,0,1-11.7.44,25.93,25.93,0,0,0,24.2,18A52,52,0,0,1,7.06,104a52.72,52.72,0,0,1-6.18-.36,73.32,73.32,0,0,0,39.7,11.63" transform="translate(-.88 -12.7)"></path>
                </svg>
                <svg className="w-5 cursor-pointer hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="youtube">
                  <g fillRule="evenodd" clipRule="evenodd">
                    <path fill="#F44336" d="M15.32 4.06c-.434-.772-.905-.914-1.864-.968C12.498 3.027 10.089 3 8.002 3c-2.091 0-4.501.027-5.458.091-.957.055-1.429.196-1.867.969C.23 4.831 0 6.159 0 8.497v.008c0 2.328.23 3.666.677 4.429.438.772.909.912 1.866.977.958.056 3.368.089 5.459.089 2.087 0 4.496-.033 5.455-.088.959-.065 1.43-.205 1.864-.977.451-.763.679-2.101.679-4.429v-.008c0-2.339-.228-3.667-.68-4.438z"></path>
                    <path fill="#FAFAFA" d="M6 11.5v-6l5 3z"></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mb-7 w-full sm:w-[48%] lg:w-[30%]">
              <h1 className={footerTitleClass}>Resources</h1>
              <div className="mt-2 flex flex-col gap-2">
                {Resources.map((ele) => (
                  <Link key={ele} to="/" className={footerLinkClass}>
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className={`${footerTitleClass} mt-7`}>Support</h1>
              <Link to="/" className={`${footerLinkClass} mt-2 block`}>
                Help Center
              </Link>
            </div>

            <div className="mb-7 w-full sm:w-[48%] lg:w-[30%]">
              <h1 className={footerTitleClass}>Plans</h1>
              <div className="mt-2 flex flex-col gap-2">
                {Plans.map((ele) => (
                  <Link key={ele} to="/" className={footerLinkClass}>
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className={`${footerTitleClass} mt-7`}>Community</h1>
              <div className="mt-2 flex flex-col gap-2">
                {Community.map((ele) => (
                  <Link key={ele} to="/" className={footerLinkClass}>
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col flex-wrap justify-between gap-3 pl-3 sm:flex-row lg:w-[50%] lg:pl-5">
            {FooterLink2.map((ele) => (
              <div key={ele.title} className="mb-7 w-full sm:w-[48%] lg:w-[30%]">
                <h1 className={footerTitleClass}>{ele.title}</h1>
                <div className="mt-2 flex flex-col gap-2">
                  {ele.links.map((link) => (
                    <Link key={link.title} to="/" className={footerLinkClass}>
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center pb-8 text-sm text-slate-600 lg:pb-14">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {BottomFooter.map((ele, ind) => (
              <Link
                key={ele}
                to="/"
                className={`${BottomFooter.length - 1 === ind ? "" : "border-r border-slate-200"} px-3 hover:text-brand-500 transition-all duration-200`}
              >
                {ele}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
              <span className="text-sm">© All rights reserved</span>
              <Link
                to="http://www.github.com/Anantmishra121"
                target="_blank"
                className="text-sm font-medium text-brand-500 hover:underline"
              >
                Anant Mishra
              </Link>
              <span className="text-sm">2025 LearningEdge</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="http://www.linkedin.com/in/anant-mishra76"
              className="rounded-full p-3 text-slate-700 duration-300 hover:bg-slate-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImLinkedin2 size={17} />
            </a>
            <a
              href="http://www.github.com/Anantmishra121"
              className="rounded-full p-3 text-slate-700 duration-300 hover:bg-slate-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImGithub size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

