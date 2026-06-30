import { useState, useEffect, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LearningEdgeLOGO from "@/assets/logos/my_logo.png";
import { fetchCourseCategories } from "@/features/courses/services/courseDetailsAPI";
import ProfileDropDown from "@/features/auth/components/ProfileDropDown";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((s) => s.auth);
  const { user } = useSelector((s) => s.profile);
  const { totalItems } = useSelector((s) => s.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const visibleRef = useRef(true);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    fetchCourseCategories()
      .then(setSubLinks)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (animationFrameRef.current) return;

      animationFrameRef.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const shouldShow = currentY < 200 || currentY < lastY.current;

        if (visibleRef.current !== shouldShow) {
          visibleRef.current = shouldShow;
          setVisible(shouldShow);
        }

        lastY.current = currentY;
        animationFrameRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const match = (path) => matchPath({ path }, location.pathname);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 h-14 flex items-center justify-center border-b border-slate-200 bg-white text-slate-900 shadow-sm transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="w-11/12 max-w-maxContent flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={LearningEdgeLOGO}
              alt="Logo"
              className="h-12 w-auto max-w-[180px] object-contain"
              loading="lazy"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-x-6 text-slate-600">
            <li>
              <Link
                to="/"
                className={`px-3 py-1 rounded-xl ${match("/") ? "bg-brand-500 text-white" : "hover:text-brand-500"}`}>
                Home
              </Link>
            </li>
            <li>
              <div className="group relative flex items-center gap-1 cursor-pointer px-3 py-1 rounded-xl">
                <span
                  className={
                    match("/catalog/:catalogName")
                      ? "text-brand-500"
                      : "group-hover:text-brand-500"
                  }>
                  Catalog
                </span>
                <MdKeyboardArrowDown />

                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:translate-y-0 absolute top-full left-1/2 -translate-x-1/2 translate-y-2 transition-all w-48 bg-white text-slate-900 rounded-lg border border-slate-200 p-2 z-50 shadow-lg">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45" />
                  {subLinks.length ? (
                    subLinks.map((s, i) => (
                      <Link
                        key={i}
                        to={`/catalog/${s.name.toLowerCase().replace(/ /g, "-")}`}
                        className="block px-4 py-2 rounded hover:bg-slate-100">
                        {s.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-center text-sm">
                      No categories
                    </p>
                  )}
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/about"
                className={`px-3 py-1 rounded-xl ${match("/about") ? "bg-brand-500 text-white" : "hover:text-brand-500"}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`px-3 py-1 rounded-xl ${match("/contact") ? "bg-brand-500 text-white" : "hover:text-brand-500"}`}>
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/blog"
                className={`px-3 py-1 rounded-xl ${match("/blog") ? "bg-brand-500 text-white" : "hover:text-brand-500"}`}>
                Blogs
              </Link>
            </li>
          </ul>

          {/* Right */}
          <div className="flex items-center gap-x-3">
            {user?.accountType === "Student" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-3xl text-slate-700" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-500 rounded-full text-xs text-white grid place-items-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {!token && (
              <>
                <Link to="/login" className="hidden sm:block">
                  <button
                    className={`px-3 py-1.5 rounded text-sm border ${match("/login") ? "bg-brand-500 border-brand-500 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"}`}>
                    Log in
                  </button>
                </Link>
                <Link to="/signup" className="hidden sm:block">
                  <button
                    className={`px-3 py-1.5 rounded text-sm border ${match("/signup") ? "bg-brand-500 border-brand-500 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"}`}>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {token && (
              <div className="hidden md:block">
                <ProfileDropDown />
              </div>
            )}
            <button
              className="md:hidden text-2xl text-slate-700"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-white flex flex-col pt-14">
          <ul className="flex flex-col p-6 gap-4 flex-1 overflow-y-auto">
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`block text-lg font-semibold py-2 px-3 rounded-lg ${match("/") ? "bg-brand-500 text-white" : "text-slate-700"}`}>
                Home
              </Link>
            </li>
            <li>
              <details className="group">
                <summary className="list-none flex items-center justify-between text-lg font-semibold py-2 px-3 rounded-lg text-slate-700 cursor-pointer">
                  Catalog{" "}
                  <MdKeyboardArrowDown className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-4 mt-1 space-y-1">
                  {subLinks.map((s, i) => (
                    <Link
                      key={i}
                      to={`/catalog/${s.name.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 px-3 text-slate-600 hover:text-brand-500 rounded-lg">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </details>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={`block text-lg font-semibold py-2 px-3 rounded-lg ${match("/about") ? "bg-brand-500 text-white" : "text-slate-700"}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={`block text-lg font-semibold py-2 px-3 rounded-lg ${match("/contact") ? "bg-brand-500 text-white" : "text-slate-700"}`}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className={`block text-lg font-semibold py-2 px-3 rounded-lg ${match("/blog") ? "bg-brand-500 text-white" : "text-slate-700"}`}>
                Blogs
              </Link>
            </li>
          </ul>
          <div className="p-6 border-t border-slate-200 flex gap-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1">
                  <button className="w-full py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold">
                    Log in
                  </button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1">
                  <button className="w-full py-3 rounded-lg bg-brand-500 text-white font-semibold">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropDown />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
