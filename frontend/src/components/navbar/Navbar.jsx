import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logomm.png";
import OptimizedImg from "../common/OptimizedImg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const leftLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  const rightLinks = [
    { name: "Portfolio", path: "/portfolio" },
    { name: "Projects", path: "/project" },
  ];

  const linkClasses = ({ isActive }) =>
    `relative font-medium tracking-wide transition-all duration-300 
     ${isActive ? "text-yellow-500 after:w-full" : "text-black dark:text-gray-200 after:w-0"} 
     hover:text-yellow-500 
     after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-md border-b border-gray-200/20 dark:border-gray-700/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between relative">

        {/* Left Links (Desktop) */}
        <div className="hidden md:flex space-x-10 items-center">
          {leftLinks.map((link, index) => (
            <NavLink key={index} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <OptimizedImg src={logo} alt="Logo" className="h-12 w-auto" loading="lazy" />
          <p
            className="text-md font-bold text-black dark:text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Design Studio
          </p>
        </div>

        {/* Right Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          {rightLinks.map((link, index) => (
            <NavLink key={index} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => navigate("/contactDetails")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Design Your Vision
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={28} className="text-black dark:text-white" />
            ) : (
              <Menu size={28} className="text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-xl border-t border-gray-300/20 dark:border-gray-700/30 animate-slideDown">
          <div className="flex flex-col space-y-6 justify-center items-center py-5">
            {[...leftLinks, ...rightLinks].map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg ${
                    isActive ? "text-yellow-500" : "text-gray-800 dark:text-gray-200"
                  } hover:text-yellow-500 transition-all duration-300`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={() => {
                navigate("/contactDetails");
                setMenuOpen(false);
              }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Design Your Vision
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
