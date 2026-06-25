import { useEffect, useRef, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Data and assets
import { NavbarLinks } from "../../../data/navbar-links";
import LearningEdgeLOGO from '../../assets/Logo/my_logo.png';

// API functions
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';

// Components
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown';

// Icons
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  // State for navigation data and UI
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false); // 👈 for mobile dropdown

  // Fetch course categories for dropdown menu
  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCatalogOpen(false); // reset catalog state on navigation
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Check if current route matches a given path
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Navbar hide/show on scroll functionality
  const [showNavbar, setShowNavbar] = useState('top');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollYRef.current) {
          setShowNavbar('hide');
        } else {
          setShowNavbar('show');
        }
      } else {
        setShowNavbar('top');
      }

      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar}`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          {/* Logo */}
          <Link to="/">
            <img src={LearningEdgeLOGO} width={160} height={42} loading='lazy' alt="LearningEdge Logo" className="w-32 sm:w-40 md:w-44 lg:w-48" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className='hidden md:flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-1 px-3 shadow-lg"
                        : "text-richblack-25 rounded-xl p-1 px-3"
                    }`}
                  >
                    <p>{link.title}</p>
                    <MdKeyboardArrowDown />
                    {/* Dropdown menu */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em]
                            flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible
                            group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <p className="text-center">No Categories Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "text-richblack-25"} rounded-xl p-1 px-3`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right side elements */}
          <div className='flex gap-x-2 sm:gap-x-4 items-center'>
            {user && user?.accountType === "Student" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-[2rem] sm:text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-1 sm:p-2 duration-200" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-center text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Login/Signup */}
            <div className='hidden sm:flex gap-x-2 items-center'>
              {token === null && (
                <Link to="/login">
                  <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md text-sm ${
                    matchRoute('/login') ? 'border-[2.5px] border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'border border-richblack-700 bg-richblack-800'
                  }`}>
                    Log in
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md text-sm ${
                    matchRoute('/signup') ? 'border-[2.5px] border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'border border-richblack-700 bg-richblack-800'
                  }`}>
                    Sign Up
                  </button>
                </Link>
              )}
            </div>

            {token !== null && <div className="hidden md:block"><ProfileDropDown /></div>}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-richblack-25 text-2xl p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[20] bg-richblack-900 bg-opacity-98 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b border-richblack-700 bg-richblack-800">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={LearningEdgeLOGO} width={140} height={35} loading='lazy' alt="LearningEdge Logo" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-richblack-25 text-2xl p-2 hover:bg-richblack-700 rounded-lg transition-colors"
                aria-label="Close mobile menu"
              >
                <AiOutlineClose />
              </button>
            </div>

            {/* Mobile navigation links */}
            <div className="flex-1 overflow-y-auto bg-richblack-900">
              <ul className='flex flex-col p-6 space-y-6 text-richblack-25'>
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div>
                        <button
                          onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                          className={`flex w-full items-center justify-between text-xl font-semibold py-3 px-4 rounded-lg transition-all ${
                            matchRoute("/catalog/:catalogName")
                              ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                              : "text-richblack-25 hover:text-blue-400 hover:bg-richblack-800"
                          }`}
                        >
                          {link.title}
                          <MdKeyboardArrowDown
                            className={`transition-transform duration-200 ${isCatalogOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {/* Collapsible submenu */}
                        {isCatalogOpen && (
                          <div className="pl-6 space-y-2 mt-2 max-h-60 overflow-y-auto">
                            {loading ? (
                              <p className="text-sm text-richblack-300">Loading...</p>
                            ) : subLinks.length ? (
                              subLinks.map((subLink, i) => (
                                <Link
                                  key={i}
                                  to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                  className="block text-base text-richblack-200 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-richblack-800 transition-all"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subLink.name}
                                </Link>
                              ))
                            ) : (
                              <p className="text-sm text-richblack-300">No Courses Found</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-xl font-semibold py-3 px-4 rounded-lg transition-all ${
                          matchRoute(link?.path)
                            ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                            : "text-richblack-25 hover:text-blue-400 hover:bg-richblack-800"
                        }`}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile login/signup or profile section */}
              <div className="p-6 border-t-2 border-richblack-700 bg-richblack-800">
                {token === null ? (
                  <div className="flex flex-col gap-4 items-center">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-1/2">
                      <button className={`w-full px-6 py-4 text-richblack-100 rounded-lg font-semibold text-lg transition-all
                       ${matchRoute('/login')
                          ? 'border-2 border-blue-500 text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
                          : 'border border-richblack-600 bg-richblack-700 hover:bg-richblack-600'}`}
                      >
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-1/2">
                      <button className={`w-full px-6 py-4 text-richblack-100 rounded-lg font-semibold text-lg transition-all
                       ${matchRoute('/signup')
                          ? 'border-2 border-blue-500 text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
                          : 'border border-richblack-600 bg-richblack-700 hover:bg-richblack-600'}`}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div onClick={() => setIsMobileMenuOpen(false)}>
                    <MobileProfileDropDown />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
