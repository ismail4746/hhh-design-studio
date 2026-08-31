import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logomm.png";
import OptimizedImg from "../common/OptimizedImg";

const LEFT_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
];

const RIGHT_LINKS = [
  { name: "Portfolio", path: "/portfolio" },
  { name: "Projects", path: "/project" },
];

const EMAIL = "hhhdesignstudio@outlook.com";
const PHONE_LABEL = "+92 321 7500253";
const PHONE_HREF = "tel:+923217500253";

function DesktopLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative py-1 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
          isActive ? "text-[#8C6E1E]" : "text-[#14181F] hover:text-[#8C6E1E]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            aria-hidden="true"
            className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-[#D4AF37] transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent the page behind the mobile panel from scrolling
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 top-0 z-50 w-full backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF9F7]/95 shadow-[0_10px_34px_-16px_rgba(15,23,32,0.45)]"
          : "bg-[#FAF9F7]/85"
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? "h-[64px] md:h-[74px]" : "h-[72px] md:h-[96px]"
        }`}
      >
        {/* Left links (desktop) */}
        <div className="hidden items-center gap-9 md:flex lg:gap-11">
          {LEFT_LINKS.map((link) => (
            <DesktopLink key={link.path} to={link.path}>
              {link.name}
            </DesktopLink>
          ))}
        </div>

        {/* Brand lockup */}
        <Link
          to="/"
          aria-label="HHH Design Studio — home"
          className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <OptimizedImg
            src={logo}
            alt="HHH Design Studio logo"
            loading="eager"
            priority={true}
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-9 md:h-11" : "h-10 md:h-14"
            }`}
          />
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#14181F] md:text-[10px]">
            Design Studio
          </span>
        </Link>

        {/* Right links + CTA (desktop) */}
        <div className="hidden items-center gap-9 md:flex lg:gap-11">
          {RIGHT_LINKS.map((link) => (
            <DesktopLink key={link.path} to={link.path}>
              {link.name}
            </DesktopLink>
          ))}

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E7C766] to-[#C9A227] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(201,162,39,0.85)]"
          >
            Design Your Vision
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14181F]/[0.12] text-[#14181F] transition-colors duration-300 hover:border-[#D4AF37] hover:text-[#8C6E1E] md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Gold hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent"
      />

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#FAF9F7]/95 backdrop-blur-xl md:hidden"
          >
            <div className="px-6 py-6">
              <ul className="flex flex-col">
                {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
                  <li key={link.path} className="border-b border-[#14181F]/[0.08]">
                    <NavLink
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center py-3.5 text-sm font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? "text-[#8C6E1E]" : "text-[#14181F] hover:text-[#8C6E1E]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={`mr-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                              isActive ? "mr-3 w-5" : "w-0 group-hover:mr-3 group-hover:w-5"
                            }`}
                          />
                          {link.name}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 text-sm text-[#14181F]/70 transition-colors duration-300 hover:text-[#8C6E1E]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#C9A227]" />
                  {PHONE_LABEL}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-sm text-[#14181F]/70 transition-colors duration-300 hover:text-[#8C6E1E]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#C9A227]" />
                  <span className="break-all">{EMAIL}</span>
                </a>
              </div>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#E7C766] to-[#C9A227] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-black transition-shadow duration-300 hover:shadow-[0_12px_26px_-10px_rgba(201,162,39,0.85)]"
              >
                Design Your Vision
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
