import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaTiktok, FaYoutube } from "react-icons/fa"; // Added for TikTok & YouTube
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logomm.png";
import OptimizedImg from "../common/OptimizedImg";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-black/90 text-white relative overflow-hidden">
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1f2f] via-transparent to-[#0d2a45] opacity-70 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
                {/* Logo and Description */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-3">
                        <OptimizedImg
                            src={logo}
                            alt="Logo"
                            className="h-10 w-auto relative z-10"
                            loading="lazy"
                            style={{ filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.8))' }}
                        />
                        <span className="text-xl font-bold tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                            HHH Design Studio
                        </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Crafting architectural and interior designs that transform spaces into experiences. Premium, elegant, and timeless.
                    </p>

                    {/* Social Media Links */}
                    <div className="flex space-x-4 mt-4 text-xl">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/share/1AygEBaNnx/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-white transition"
                        >
                            <Facebook />
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/hhhdesign_studio1?igsh=a3cycThveGVhc2k%3D&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-white transition"
                        >
                            <Instagram />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="http://www.linkedin.com/in/hhh-design-studio-083619379"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-white transition"
                        >
                            <Linkedin />
                        </a>

                        {/* TikTok */}
                        <a
                            href="https://www.tiktok.com/@hhh.design.studio?_t=ZS-8yz7zVfTR4S&_r=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-white transition"
                        >
                            <FaTiktok />
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://youtube.com/@hhhdesignstudio01?si=3_LGtAyGCgM-iIpc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-white transition"
                        >
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col space-y-2">
                    <h4 className="text-yellow-400 font-semibold mb-4">Quick Links</h4>
                    <a href="/" className="text-gray-300 hover:text-yellow-400 transition">Home</a>
                    <a href="/about" className="text-gray-300 hover:text-yellow-400 transition">About</a>
                    <a href="/services" className="text-gray-300 hover:text-yellow-400 transition">Services</a>
                    <a href="/portfolio" className="text-gray-300 hover:text-yellow-400 transition">Portfolio</a>
                    <a href="/project" className="text-gray-300 hover:text-yellow-400 transition">Projects</a>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col space-y-2">
                    <h4 className="text-yellow-400 font-semibold mb-4">Contact</h4>
                    <p className="text-gray-300 text-sm">Address: FF 138,139 First Floor Defence Shopping Mall Main Boulevard Dha Lahore Pakistan</p>
                    <p className="text-gray-300 text-sm">Email: hhhdesignstudio@outlook.com</p>
                    <p className="text-gray-300 text-sm">Phone: +92 321-7500253</p>
                    <p className="text-gray-300 text-sm">Phone: +92 302-4599748</p>
                    <button
                        onClick={() => navigate("/contactDetails")}
                        className="mt-8 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                        Contact Us
                    </button>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700/30 mt-8 py-4 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} HHH Design Studio. All rights reserved.
            </div>
        </footer>
    );
}
