import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../../assets/logomm.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const leftLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  const rightLinks = [
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-500 bg-white/70 dark:bg-black/50 backdrop-blur-lg shadow-sm border-b border-gray-200/20 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center relative">

        {/* Mobile: Logo */}
        <div className="flex flex-col items-center md:hidden">
          <img src={logo} alt="Logo" className="h-9 w-auto" />
          <p
            className="text-sm font-semibold text-black dark:text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Design Studio
          </p>
        </div>

        {/* Left Links (PC only) */}
        <div className="hidden md:flex space-x-8 absolute left-6">
          {leftLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="relative text-black dark:text-gray-200 font-medium tracking-wide transition-all duration-300 hover:text-yellow-500
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo (PC only) */}
        <div className="hidden md:flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <p
            className="text-md font-bold text-black dark:text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Design Studio
          </p>
        </div>

        {/* Right Links + Buttons (PC only) */}
        <div className="hidden md:flex space-x-8 absolute right-6 items-center">
          {rightLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="relative text-black dark:text-gray-200 font-medium tracking-wide transition-all duration-300 hover:text-yellow-500
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}

          {/* Book Button */}
          <button className="px-5 py-2 rounded-full bg-yellow-500 dark:bg-yellow-400 text-black font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-300 shadow-lg transition-all duration-300">
            Book a Consultation
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} className="dark:text-white" /> : <Menu size={28} className="dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-lg border-t border-gray-300/20 dark:border-gray-700/30 animate-slideDown">
          <div className="flex flex-col space-y-8 justify-center items-center py-6">
            {[...leftLinks, ...rightLinks].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-lg text-gray-800 dark:text-gray-200 hover:text-yellow-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="px-5 py-2 rounded-full bg-yellow-500 dark:bg-yellow-400 text-black font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-300 shadow-lg transition-all duration-300">
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
