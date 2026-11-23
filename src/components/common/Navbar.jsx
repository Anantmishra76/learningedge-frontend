import { useState, useEffect, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BrandLogo from "./BrandLogo";
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
        className={`fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-center border-b border-slate-200 bg-white text-slate-900 transition-transform duration-200 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          <Link to="/" className="flex items-center">
            <BrandLogo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-x-2 text-sm text-slate-600 md:flex">
            <li>
              <Link
                to="/"
                className={`flex min-h-11 items-center rounded-lg px-3 transition-colors ${match("/") ? "bg-slate-100 text-brand-700" : "hover:bg-slate-50 hover:text-slate-900"}`}>
                Home
              </Link>
            </li>
            <li>
                <div className="group relative flex min-h-11 cursor-pointer items-center gap-1 rounded-lg px-3 transition-colors hover:bg-slate-50">
                <span
                  className={
                    match("/catalog/:catalogName")
                      ? "text-brand-500"
                      : "group-hover:text-brand-500"
                  }>
                  Catalog
                </span>
                <MdKeyboardArrowDown />

                <div className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 opacity-0 shadow-lg transition-[opacity,transform] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
                className={`flex min-h-11 items-center rounded-lg px-3 transition-colors ${match("/about") ? "bg-slate-100 text-brand-700" : "hover:bg-slate-50 hover:text-slate-900"}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`flex min-h-11 items-center rounded-lg px-3 transition-colors ${match("/contact") ? "bg-slate-100 text-brand-700" : "hover:bg-slate-50 hover:text-slate-900"}`}>
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/blog"
                className={`flex min-h-11 items-center rounded-lg px-3 transition-colors ${match("/blog") ? "bg-slate-100 text-brand-700" : "hover:bg-slate-50 hover:text-slate-900"}`}>
                Blogs
              </Link>
            </li>
          </ul>

          {/* Right */}
          <div className="flex items-center gap-x-3">
            {user?.accountType === "Student" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-slate-700" />
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
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${match("/login") ? "bg-blue-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"}`}>
                    Log in
                  </button>
                </Link>
                <Link to="/signup" className="hidden sm:block">
                  <button
                    className={`rounded-lg border px-4 py-2 text-sm transition-colors ${match("/signup") ? "border-brand-700 bg-brand-700 text-white" : "border-brand-700 bg-brand-700 text-white hover:bg-brand-600"}`}>
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
              type="button"
              className="md:hidden grid size-10 place-items-center rounded-lg text-2xl text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((isOpen) => !isOpen)}>
              {mobileOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden fixed inset-x-0 bottom-0 top-14 z-20 bg-white flex flex-col">
          <ul className="flex flex-col p-6 gap-4 flex-1 overflow-y-auto">
            {token && (
              <li>
                <Link
                  to="/dashboard/my-profile"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base ${match("/dashboard/:section") ? "bg-slate-100 font-medium text-brand-700" : "text-slate-700"}`}>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base ${match("/") ? "bg-slate-100 font-medium text-brand-700" : "text-slate-700"}`}>
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
                className={`block rounded-lg px-3 py-3 text-base ${match("/about") ? "bg-slate-100 font-medium text-brand-700" : "text-slate-700"}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base ${match("/contact") ? "bg-slate-100 font-medium text-brand-700" : "text-slate-700"}`}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base ${match("/blog") ? "bg-slate-100 font-medium text-brand-700" : "text-slate-700"}`}>
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
