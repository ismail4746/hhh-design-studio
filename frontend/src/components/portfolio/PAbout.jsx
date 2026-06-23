import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaBriefcase,
  FaUserTie,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTiktok ,
} from "react-icons/fa";
import clientImg from "../../assets/aZ.jpeg";
import OptimizedImg from "../common/OptimizedImg";

export default function PAbout() {
  const [counters, setCounters] = useState({ years: 0, projects: 0, clients: 0 });
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const interval = 30;

          const animateCount = (target, key) => {
            let current = start;
            const increment = target / (duration / interval);
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
            }, interval);
          };

          animateCount(18, "years");
          animateCount(120, "projects");
          animateCount(80, "clients");
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-[#0f0f0f] relative overflow-hidden text-white"
    >
      {/* blurred rings */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#b8902d]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* heading */}
        <div className="text-center mb-14">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-sm tracking-[6px] uppercase text-gray-400"
          >
            Who We Are
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent"
          >
            About Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* left image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37] to-[#b8902d] blur-3xl opacity-30 rounded-3xl"></div>
            <div className="relative group rounded-3xl p-[4px] bg-gradient-to-tr from-[#D4AF37] to-[#b8902d] shadow-2xl">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl transform transition duration-500 group-hover:scale-105 group-hover:shadow-[#D4AF37]/50">
                <OptimizedImg
                  src={clientImg}
                  alt="Client"
                  className="rounded-3xl object-cover w-[350px] h-[450px] transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* right content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent mb-1 tracking-wide">
  MUHAMMAD AZEEM
</h2>
<p className="text-[#D4AF37] text-lg font-semibold mb-4">CEO</p>

            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              With over 18 years of experience in architecture,interior design & project management. I've led
              projects that merge creativity with functionality. From luxury villas to
              corporate spaces — my focus is timeless elegance and innovation.
            </p>

            {/* stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { icon: <FaAward />, value: counters.years, label: "Years Exp." },
                { icon: <FaBriefcase />, value: counters.projects, label: "Projects" },
                { icon: <FaUserTie />, value: counters.clients, label: "Clients" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-[#1a1a1a] rounded-xl hover:shadow-lg transition"
                >
                  <div className="text-4xl text-[#D4AF37] mx-auto mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold text-white">{stat.value}+</p>
                  <p className="text-gray-500 text-sm tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* contact + socials */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <a
                href="https://wa.me/923024599748?text=Hello%2C%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-white rounded-lg shadow-lg hover:scale-105 transition duration-300"
              >
                Contact Me
              </a>

              <a
                href="#team"
                className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition duration-300"
              >
                Our Team
              </a>

              <a
                href="https://instagram.com/hhhdesign_studio1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] text-3xl hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/share/1CJe1Y5xEv/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] text-3xl hover:scale-110 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/hhh-design-studio-083619379/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] text-3xl hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.tiktok.com/@hhh.design.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] text-3xl hover:scale-110 transition"
              >
                <FaTiktok />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
