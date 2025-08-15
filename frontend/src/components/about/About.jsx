// AboutSection.jsx
import React from "react";
import img from "../../assets/img1.jpg";

const About = () => {
  return (
    <section className="bg-gray-200 dark:bg-neutral-900  text-white py-20 px-6 md:px-16 lg:px-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wide mb-6 text-gray-900 dark:text-white">
            Crafting Timeless Spaces
          </h2>
          <p className="text-lg leading-relaxed text-gray-900 dark:text-neutral-300 mb-8">
            At <span className="text-yellow-600 dark:text-yellow-400 font-semibold">HHH Design Studio</span>, 
            we believe architecture and interior design are more than just structures — 
            they are experiences. Our designs blend minimalism with luxury, 
            ensuring every project reflects both elegance and functionality.
          </p>
          <p className="text-lg leading-relaxed text-gray-900 dark:text-neutral-400 mb-10">
            With over a decade of expertise, we have transformed spaces into 
            masterpieces, focusing on harmony, proportion, and materials that last 
            a lifetime. Whether it’s a modern penthouse, a cozy residence, or a 
            corporate workspace — our vision remains the same: **Excellence in Design**.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg">
            Learn More
          </button>
        </div>

        {/* Right Image */}
        <div className="relative group">
          <img
            src={img}
            alt="Luxury Interior"
            className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
