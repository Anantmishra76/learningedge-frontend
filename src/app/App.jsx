import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Layout components
import Navbar from "@/components/common/Navbar";
import AppRoutes from "./routes";
import { HiArrowNarrowUp } from "react-icons/hi";

/**
 * Main App Component - Root component handling routing and global UI
 * Manages all application routes with role-based access control
 * Provides scroll-to-top functionality and global layout
 * @returns {JSX.Element} The main application component
 */
function App() {
  // Scroll to top functionality
  const location = useLocation();

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when location object changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Scroll to top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll-to-top button visibility
  const [showArrow, setShowArrow] = useState(false);

  const handleArrow = () => {
    if (window.scrollY > 500) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleArrow);
    return () => {
      window.removeEventListener("scroll", handleArrow);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-600 flex flex-col font-sans pt-14 overflow-x-hidden">
      <Navbar />

      {/* Scroll to top button - appears when scrolled down */}
      <button
        onClick={() => window.scrollTo(0, 0)}
        className={`bg-brand-500 hover:bg-brand-600 hover:scale-110 p-3 text-lg text-white rounded-2xl fixed right-3 z-10 shadow-lg duration-500 ease-in-out ${showArrow ? "bottom-6" : "-bottom-24"}`}>
        <HiArrowNarrowUp />
      </button>

      <AppRoutes />
    </div>
  );
}

export default App;
