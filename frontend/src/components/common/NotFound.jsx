import React from "react";
import { Link } from "react-router-dom";

// Real 404 page. Previously an unknown URL rendered an empty shell that still
// returned 200, which Google treats as a "soft 404" and counts against the site.
export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-black px-4 py-24">
      <div className="text-center max-w-xl">
        <p
          className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </p>
        <h1
          className="text-2xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          This page could not be found
        </h1>
        <p
          className="text-gray-300 mb-8 leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          The page you are looking for may have been moved or no longer exists.
          Explore our work or get in touch instead.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105"
          >
            Back to home
          </Link>
          <Link
            to="/project"
            className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            View our projects
          </Link>
        </div>
      </div>
    </section>
  );
}
