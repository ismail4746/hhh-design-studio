import React from "react";
import heroImg from "../../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover md:object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1
          className="text-4xl md:text-6xl font-bold text-white tracking-wide mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Crafting <span className="text-yellow-500">Spaces</span> That Inspire
        </h1>
        <p
          className="text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-2xl mx-auto mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Premium Architecture & Interior Design solutions tailored for
          elegance, functionality, and timeless appeal.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition">
          Explore Our Work
        </button>
      </div>
    </section>
  );
}
